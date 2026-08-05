const User = require('../../models/User');
const Company = require('../../models/Company');
const Drive = require('../../models/Drive');
const Question = require('../../models/Question');
const Tip = require('../../models/Tip');
const Bookmark = require('../../models/Bookmark');

const parsePackage = (pkg) => {
  if (typeof pkg === 'number' && !Number.isNaN(pkg)) return pkg;
  const num = parseFloat(String(pkg || '').replace(/[^0-9.]/g, ''));
  return Number.isNaN(num) ? 0 : num;
};

exports.getDashboardStats = async () => {
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

  const [
    totalStudents,
    totalCompanies,
    totalDrives,
    totalQuestions,
    totalTips,
    totalBookmarks,
    activeCompanies,
    inactiveCompanies,
    publishedTips,
    drivesThisYear,
    studentsPlaced,
  ] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    Company.countDocuments(),
    Drive.countDocuments(),
    Question.countDocuments(),
    Tip.countDocuments(),
    Bookmark.countDocuments(),
    Company.countDocuments({ status: 'Active' }),
    Company.countDocuments({ status: 'Inactive' }),
    Tip.countDocuments({ status: 'Published' }),
    Drive.countDocuments({ date: { $gte: startOfYear, $lte: endOfYear } }),
    Drive.aggregate([
      { $group: { _id: null, total: { $sum: '$studentsPlaced' } } },
    ]),
  ]);

  return {
    totalStudents,
    totalCompanies,
    totalDrives,
    totalQuestions,
    totalTips,
    totalBookmarks,
    activeCompanies,
    inactiveCompanies,
    publishedTips,
    drivesThisYear,
    totalStudentsPlaced: studentsPlaced[0]?.total || 0,
  };
};

exports.getHighestPlacement = async () => {
  const drives = await Drive.find()
    .populate('company', 'name logo')
    .sort({ createdAt: -1 });

  let highestDrive = null;
  let maxPackage = 0;

  for (const drive of drives) {
    const pkg = parsePackage(drive.package);
    if (pkg > maxPackage) {
      maxPackage = pkg;
      highestDrive = drive;
    }
  }

  return highestDrive;
};

exports.getRecentDrives = async (limit = 5) => {
  return Drive.find()
    .sort({ date: -1 })
    .limit(parseInt(limit, 10))
    .populate('company', 'name logo')
    .populate('createdBy', 'name email');
};

exports.getPlacementStats = async () => {
  return Drive.aggregate([
    {
      $group: {
        _id: '$companyName',
        totalDrives: { $sum: 1 },
        totalPlaced: { $sum: '$studentsPlaced' },
      },
    },
    { $sort: { totalPlaced: -1 } },
    { $limit: 10 },
  ]);
};

exports.getDashboardOverview = async (limit = 5) => {
  const [stats, highestPlacement, recentDrives, placementStats] = await Promise.all([
    this.getDashboardStats(),
    this.getHighestPlacement(),
    this.getRecentDrives(limit),
    this.getPlacementStats(),
  ]);

  return {
    stats,
    highestPlacement,
    recentDrives,
    placementStats,
  };
};

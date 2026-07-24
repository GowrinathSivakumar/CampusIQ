const Company = require('../../models/Company');
const Drive = require('../../models/Drive');
const Question = require('../../models/Question');
const Tip = require('../../models/Tip');
const User = require('../../models/User');
const ApiResponse = require('../../utils/ApiResponse');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [totalCompanies, totalDrives, totalQuestions, totalTips, totalStudents] = await Promise.all([
      Company.countDocuments(),
      Drive.countDocuments(),
      Question.countDocuments(),
      Tip.countDocuments(),
      User.countDocuments({ role: 'student' }),
    ]);

    ApiResponse.success(res, {
      totalCompanies,
      totalDrives,
      totalQuestions,
      totalTips,
      totalStudents,
    });
  } catch (error) {
    next(error);
  }
};

exports.getHighestPlacement = async (req, res, next) => {
  try {
    const drives = await Drive.find()
      .populate('company', 'name logo')
      .sort({ createdAt: -1 });

    let highestDrive = null;
    let maxPackage = 0;

    for (const drive of drives) {
      const pkg = parseFloat(String(drive.package).replace(/[^0-9.]/g, ''));
      if (!isNaN(pkg) && pkg > maxPackage) {
        maxPackage = pkg;
        highestDrive = drive;
      }
    }

    ApiResponse.success(res, highestDrive || {});
  } catch (error) {
    next(error);
  }
};

exports.getRecentDrives = async (req, res, next) => {
  try {
    const { limit = 5 } = req.query;

    const drives = await Drive.find()
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .populate('company', 'name logo')
      .populate('createdBy', 'name email');

    ApiResponse.success(res, drives);
  } catch (error) {
    next(error);
  }
};

exports.getPlacementStats = async (req, res, next) => {
  try {
    const stats = await Drive.aggregate([
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

    ApiResponse.success(res, stats);
  } catch (error) {
    next(error);
  }
};

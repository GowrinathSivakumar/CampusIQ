const User = require('../../models/User');
const Drive = require('../../models/Drive');

const parsePackage = (pkg) => {
  if (typeof pkg === 'number' && !Number.isNaN(pkg)) return pkg;
  const num = parseFloat(String(pkg || '').replace(/[^0-9.]/g, ''));
  return Number.isNaN(num) ? 0 : num;
};

const yearRange = (year) => [
  new Date(year, 0, 1),
  new Date(year, 11, 31, 23, 59, 59),
];

const pctChange = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
};

exports.getSummary = async () => {
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const [startThisYear, endThisYear] = yearRange(currentYear);
  const [startLastYear, endLastYear] = yearRange(lastYear);

  const [
    drives,
    drivesThisYear,
    drivesLastYear,
    activeStudents,
    studentsThisYear,
    studentsLastYear,
  ] = await Promise.all([
    Drive.find(),
    Drive.find({ date: { $gte: startThisYear, $lte: endThisYear } }),
    Drive.find({ date: { $gte: startLastYear, $lte: endLastYear } }),
    User.countDocuments({ role: 'student' }),
    User.countDocuments({ role: 'student', createdAt: { $gte: startThisYear, $lte: endThisYear } }),
    User.countDocuments({ role: 'student', createdAt: { $gte: startLastYear, $lte: endLastYear } }),
  ]);

  const sumPlaced = (list) => list.reduce((acc, d) => acc + (d.studentsPlaced || 0), 0);
  const avgPkg = (list) => {
    if (list.length === 0) return 0;
    const total = list.reduce((acc, d) => acc + parsePackage(d.package), 0);
    return Math.round((total / list.length) * 100) / 100;
  };

  const totalPlacements = sumPlaced(drives);
  const placementsThisYear = sumPlaced(drivesThisYear);
  const placementsLastYear = sumPlaced(drivesLastYear);

  const placementRate = activeStudents > 0
    ? Math.min(100, Math.round((placementsThisYear / activeStudents) * 100))
    : 0;
  const placementRateLastYear = studentsLastYear > 0
    ? Math.min(100, Math.round((placementsLastYear / studentsLastYear) * 100))
    : 0;

  return {
    totalPlacements,
    activeStudents,
    avgPackage: avgPkg(drives),
    placementRate,
    change: {
      placements: pctChange(placementsThisYear, placementsLastYear),
      students: pctChange(activeStudents, studentsLastYear),
      avgPackage: pctChange(avgPkg(drivesThisYear), avgPkg(drivesLastYear)),
      placementRate: placementRate - placementRateLastYear,
    },
  };
};

exports.getYearlyTrends = async () => {
  const rows = await Drive.aggregate([
    {
      $group: {
        _id: { year: { $year: '$date' } },
        drives: { $sum: 1 },
        placed: { $sum: '$studentsPlaced' },
      },
    },
    { $sort: { '_id.year': 1 } },
  ]);

  return rows.map((row) => ({
    year: row._id.year,
    drives: row.drives,
    placed: row.placed,
  }));
};

exports.getCompanyWise = async () => {
  const rows = await Drive.aggregate([
    {
      $group: {
        _id: '$companyName',
        drives: { $sum: 1 },
        placed: { $sum: '$studentsPlaced' },
      },
    },
    { $sort: { placed: -1 } },
    { $limit: 10 },
  ]);

  return rows.map((row) => ({
    company: row._id || 'Unknown',
    drives: row.drives,
    placed: row.placed,
  }));
};

exports.getDepartmentWise = async () => {
  const rows = await Drive.aggregate([
    {
      $group: {
        _id: '$department',
        drives: { $sum: 1 },
        placed: { $sum: '$studentsPlaced' },
      },
    },
    { $sort: { placed: -1 } },
  ]);

  return rows.map((row) => ({
    department: row._id || 'All',
    drives: row.drives,
    placed: row.placed,
  }));
};

exports.exportDrivesCSV = async () => {
  const drives = await Drive.find().sort({ date: -1 });

  const escape = (value) => {
    const str = String(value ?? '');
    if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
    return str;
  };

  const header = ['Company', 'Role', 'Date', 'Students Placed', 'Package', 'Rounds', 'Department', 'Description'];
  const rows = drives.map((d) => [
    d.companyName,
    d.role,
    d.date ? d.date.toISOString().split('T')[0] : '',
    d.studentsPlaced,
    d.package,
    d.rounds,
    d.department,
    d.description,
  ]);

  return [header, ...rows].map((r) => r.map(escape).join(',')).join('\n');
};

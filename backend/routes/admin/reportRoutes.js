const express = require('express');
const router = express.Router();
const {
  getSummary,
  getYearlyTrends,
  getCompanyWise,
  getDepartmentWise,
  exportDrivesCSV,
} = require('../../controllers/admin/reportController');
const protect = require('../../middleware/auth');
const authorize = require('../../middleware/role');

router.use(protect, authorize('admin'));

router.get('/summary', getSummary);
router.get('/yearly-trends', getYearlyTrends);
router.get('/company-wise', getCompanyWise);
router.get('/department-wise', getDepartmentWise);
router.get('/export', exportDrivesCSV);

module.exports = router;

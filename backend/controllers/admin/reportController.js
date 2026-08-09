const reportService = require('../../services/admin/reportService');
const ApiResponse = require('../../utils/ApiResponse');

exports.getSummary = async (req, res, next) => {
  try {
    const summary = await reportService.getSummary();
    ApiResponse.success(res, summary);
  } catch (error) {
    next(error);
  }
};

exports.getYearlyTrends = async (req, res, next) => {
  try {
    const trends = await reportService.getYearlyTrends();
    ApiResponse.success(res, trends);
  } catch (error) {
    next(error);
  }
};

exports.getCompanyWise = async (req, res, next) => {
  try {
    const stats = await reportService.getCompanyWise();
    ApiResponse.success(res, stats);
  } catch (error) {
    next(error);
  }
};

exports.getDepartmentWise = async (req, res, next) => {
  try {
    const stats = await reportService.getDepartmentWise();
    ApiResponse.success(res, stats);
  } catch (error) {
    next(error);
  }
};

exports.exportDrivesCSV = async (req, res, next) => {
  try {
    const csv = await reportService.exportDrivesCSV();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="placement-report.csv"');
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

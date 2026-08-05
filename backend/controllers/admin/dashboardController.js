const dashboardService = require('../../services/admin/dashboardService');
const ApiResponse = require('../../utils/ApiResponse');

exports.getDashboard = async (req, res, next) => {
  try {
    const { limit = 5 } = req.query;
    const data = await dashboardService.getDashboardOverview(parseInt(limit, 10));
    ApiResponse.success(res, data, 'Dashboard data fetched successfully');
  } catch (error) {
    next(error);
  }
};

exports.getDashboardStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    ApiResponse.success(res, stats);
  } catch (error) {
    next(error);
  }
};

exports.getHighestPlacement = async (req, res, next) => {
  try {
    const highestDrive = await dashboardService.getHighestPlacement();
    ApiResponse.success(res, highestDrive || {});
  } catch (error) {
    next(error);
  }
};

exports.getRecentDrives = async (req, res, next) => {
  try {
    const { limit = 5 } = req.query;
    const drives = await dashboardService.getRecentDrives(parseInt(limit, 10));
    ApiResponse.success(res, drives);
  } catch (error) {
    next(error);
  }
};

exports.getPlacementStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getPlacementStats();
    ApiResponse.success(res, stats);
  } catch (error) {
    next(error);
  }
};

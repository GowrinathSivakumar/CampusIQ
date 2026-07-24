const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getHighestPlacement,
  getRecentDrives,
  getPlacementStats,
} = require('../../controllers/admin/dashboardController');
const protect = require('../../middleware/auth');

router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/highest-placement', getHighestPlacement);
router.get('/recent-drives', getRecentDrives);
router.get('/placement-stats', getPlacementStats);

module.exports = router;

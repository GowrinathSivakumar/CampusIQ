const express = require('express');
const router = express.Router();
const {
  getDrives,
  getDriveById,
  createDrive,
  updateDrive,
  deleteDrive,
} = require('../../controllers/admin/driveController');
const protect = require('../../middleware/auth');
const authorize = require('../../middleware/role');

router.use(protect);

router.get('/', getDrives);
router.get('/:id', getDriveById);
router.post('/', authorize('admin'), createDrive);
router.put('/:id', authorize('admin'), updateDrive);
router.delete('/:id', authorize('admin'), deleteDrive);

module.exports = router;

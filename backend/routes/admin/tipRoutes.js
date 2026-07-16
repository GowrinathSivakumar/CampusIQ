const express = require('express');
const router = express.Router();
const {
  getTips,
  getTipById,
  createTip,
  updateTip,
  deleteTip,
} = require('../../controllers/admin/tipController');
const protect = require('../../middleware/auth');
const authorize = require('../../middleware/role');

router.use(protect);

router.get('/', getTips);
router.get('/:id', getTipById);
router.post('/', authorize('admin'), createTip);
router.put('/:id', authorize('admin'), updateTip);
router.delete('/:id', authorize('admin'), deleteTip);

module.exports = router;

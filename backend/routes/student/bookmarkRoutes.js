const express = require('express');
const router = express.Router();
const {
  getBookmarks,
  addBookmark,
  removeBookmark,
} = require('../../controllers/student/bookmarkController');
const protect = require('../../middleware/auth');

router.use(protect);

router.get('/', getBookmarks);
router.post('/', addBookmark);
router.delete('/:id', removeBookmark);

module.exports = router;

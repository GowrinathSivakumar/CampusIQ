const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../../controllers/admin/questionController');
const protect = require('../../middleware/auth');
const authorize = require('../../middleware/role');

router.use(protect);

router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.post('/', authorize('admin'), createQuestion);
router.put('/:id', authorize('admin'), updateQuestion);
router.delete('/:id', authorize('admin'), deleteQuestion);

module.exports = router;

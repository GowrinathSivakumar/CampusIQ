const Question = require('../../models/Question');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');

exports.getQuestions = async (req, res, next) => {
  try {
    const { search, category, company, difficulty, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (search) filter.question = { $regex: search, $options: 'i' };
    if (category) filter.category = category;
    if (company) filter.company = company;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('createdBy', 'name email');

    const total = await Question.countDocuments(filter);

    ApiResponse.success(res, { questions, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    next(error);
  }
};

exports.getQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id).populate('createdBy', 'name email');
    if (!question) {
      throw ApiError.notFound('Question not found');
    }

    ApiResponse.success(res, question);
  } catch (error) {
    next(error);
  }
};

exports.createQuestion = async (req, res, next) => {
  try {
    const { question, category, company, difficulty, answer, tags } = req.body;

    if (!question || !category) {
      throw ApiError.badRequest('Question text and category are required');
    }

    const newQuestion = await Question.create({
      question,
      category,
      company,
      difficulty,
      answer,
      tags,
      createdBy: req.user._id,
    });

    ApiResponse.created(res, newQuestion, 'Question created successfully');
  } catch (error) {
    next(error);
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!question) {
      throw ApiError.notFound('Question not found');
    }

    ApiResponse.success(res, question, 'Question updated successfully');
  } catch (error) {
    next(error);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      throw ApiError.notFound('Question not found');
    }

    ApiResponse.noContent(res);
  } catch (error) {
    next(error);
  }
};

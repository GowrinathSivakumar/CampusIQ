const Bookmark = require('../../models/Bookmark');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');

exports.getBookmarks = async (req, res, next) => {
  try {
    const { type, page = 1, limit = 50 } = req.query;

    const filter = { user: req.user._id };
    if (type) filter.itemType = type;

    const bookmarks = await Bookmark.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('companyId', 'name industry location package status')
      .populate('questionId', 'question category company difficulty');

    const total = await Bookmark.countDocuments(filter);

    ApiResponse.success(res, { bookmarks, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    next(error);
  }
};

exports.addBookmark = async (req, res, next) => {
  try {
    const { itemType, companyId, questionId, guideTitle, guideType } = req.body;

    if (!itemType) {
      throw ApiError.badRequest('Bookmark type is required');
    }

    const existing = await Bookmark.findOne({
      user: req.user._id,
      itemType,
      ...(itemType === 'company' && { companyId }),
      ...(itemType === 'question' && { questionId }),
      ...(itemType === 'guide' && { guideTitle }),
    });

    if (existing) {
      throw ApiError.conflict('Already bookmarked');
    }

    const bookmark = await Bookmark.create({
      user: req.user._id,
      itemType,
      companyId,
      questionId,
      guideTitle,
      guideType,
    });

    ApiResponse.created(res, bookmark, 'Bookmark added successfully');
  } catch (error) {
    next(error);
  }
};

exports.removeBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!bookmark) {
      throw ApiError.notFound('Bookmark not found');
    }

    ApiResponse.noContent(res);
  } catch (error) {
    next(error);
  }
};

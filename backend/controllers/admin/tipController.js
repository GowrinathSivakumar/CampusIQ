const Tip = require('../../models/Tip');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');

exports.getTips = async (req, res, next) => {
  try {
    const { search, category, company, status, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) filter.category = category;
    if (company) filter.company = company;
    if (status) filter.status = status;

    const tips = await Tip.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('createdBy', 'name email');

    const total = await Tip.countDocuments(filter);

    ApiResponse.success(res, { tips, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    next(error);
  }
};

exports.getTipById = async (req, res, next) => {
  try {
    const tip = await Tip.findById(req.params.id).populate('createdBy', 'name email');
    if (!tip) {
      throw ApiError.notFound('Tip not found');
    }

    ApiResponse.success(res, tip);
  } catch (error) {
    next(error);
  }
};

exports.createTip = async (req, res, next) => {
  try {
    const { title, category, description, company, tags, status } = req.body;

    if (!title || !category || !description) {
      throw ApiError.badRequest('Title, category, and description are required');
    }

    const tip = await Tip.create({
      title,
      category,
      description,
      company,
      tags,
      status,
      createdBy: req.user._id,
    });

    ApiResponse.created(res, tip, 'Tip created successfully');
  } catch (error) {
    next(error);
  }
};

exports.updateTip = async (req, res, next) => {
  try {
    const tip = await Tip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tip) {
      throw ApiError.notFound('Tip not found');
    }

    ApiResponse.success(res, tip, 'Tip updated successfully');
  } catch (error) {
    next(error);
  }
};

exports.deleteTip = async (req, res, next) => {
  try {
    const tip = await Tip.findByIdAndDelete(req.params.id);
    if (!tip) {
      throw ApiError.notFound('Tip not found');
    }

    ApiResponse.noContent(res);
  } catch (error) {
    next(error);
  }
};

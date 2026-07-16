const Company = require('../../models/Company');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');

exports.getCompanies = async (req, res, next) => {
  try {
    const { search, industry, status, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (industry) filter.industry = industry;
    if (status) filter.status = status;

    const companies = await Company.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('createdBy', 'name email');

    const total = await Company.countDocuments(filter);

    ApiResponse.success(res, { companies, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    next(error);
  }
};

exports.getCompanyById = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id).populate('createdBy', 'name email');
    if (!company) {
      throw ApiError.notFound('Company not found');
    }

    ApiResponse.success(res, company);
  } catch (error) {
    next(error);
  }
};

exports.createCompany = async (req, res, next) => {
  try {
    const { name, type, industry, logo, website, location, description, package: pkg, status, tags } = req.body;

    if (!name || !industry) {
      throw ApiError.badRequest('Company name and industry are required');
    }

    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      throw ApiError.conflict('Company with this name already exists');
    }

    const company = await Company.create({
      name,
      type,
      industry,
      logo,
      website,
      location,
      description,
      package: pkg,
      status,
      tags,
      createdBy: req.user._id,
    });

    ApiResponse.created(res, company, 'Company created successfully');
  } catch (error) {
    next(error);
  }
};

exports.updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      throw ApiError.notFound('Company not found');
    }

    ApiResponse.success(res, company, 'Company updated successfully');
  } catch (error) {
    next(error);
  }
};

exports.deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      throw ApiError.notFound('Company not found');
    }

    ApiResponse.noContent(res);
  } catch (error) {
    next(error);
  }
};

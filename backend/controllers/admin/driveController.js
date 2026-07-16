const Drive = require('../../models/Drive');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');

exports.getDrives = async (req, res, next) => {
  try {
    const { search, company, year, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
      ];
    }
    if (company) filter.companyName = company;
    if (year) {
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31, 23, 59, 59);
      filter.date = { $gte: startOfYear, $lte: endOfYear };
    }

    const drives = await Drive.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('company', 'name logo')
      .populate('createdBy', 'name email');

    const total = await Drive.countDocuments(filter);

    ApiResponse.success(res, { drives, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    next(error);
  }
};

exports.getDriveById = async (req, res, next) => {
  try {
    const drive = await Drive.findById(req.params.id)
      .populate('company', 'name logo website')
      .populate('createdBy', 'name email');

    if (!drive) {
      throw ApiError.notFound('Drive not found');
    }

    ApiResponse.success(res, drive);
  } catch (error) {
    next(error);
  }
};

exports.createDrive = async (req, res, next) => {
  try {
    const { company, companyName, role, date, studentsPlaced, package: pkg, description } = req.body;

    if (!companyName || !role || !date) {
      throw ApiError.badRequest('Company name, role, and date are required');
    }

    const drive = await Drive.create({
      company,
      companyName,
      role,
      date,
      studentsPlaced,
      package: pkg,
      description,
      createdBy: req.user._id,
    });

    ApiResponse.created(res, drive, 'Drive created successfully');
  } catch (error) {
    next(error);
  }
};

exports.updateDrive = async (req, res, next) => {
  try {
    const drive = await Drive.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!drive) {
      throw ApiError.notFound('Drive not found');
    }

    ApiResponse.success(res, drive, 'Drive updated successfully');
  } catch (error) {
    next(error);
  }
};

exports.deleteDrive = async (req, res, next) => {
  try {
    const drive = await Drive.findByIdAndDelete(req.params.id);
    if (!drive) {
      throw ApiError.notFound('Drive not found');
    }

    ApiResponse.noContent(res);
  } catch (error) {
    next(error);
  }
};

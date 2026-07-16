const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: 200,
    },
    type: {
      type: String,
      enum: ['Software', 'Hardware'],
      default: 'Software',
    },
    industry: {
      type: String,
      required: [true, 'Industry is required'],
      trim: true,
    },
    logo: {
      type: String,
      default: null,
    },
    website: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500,
      default: '',
    },
    package: {
      type: Number,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    tags: {
      type: [String],
      validate: {
        validator: (v) => v.length <= 8,
        message: 'Cannot have more than 8 tags',
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

companySchema.index({ name: 'text', industry: 'text', tags: 'text' });

module.exports = mongoose.model('Company', companySchema);

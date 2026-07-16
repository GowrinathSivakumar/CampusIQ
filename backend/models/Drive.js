const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Drive date is required'],
    },
    studentsPlaced: {
      type: Number,
      default: 0,
      min: 0,
    },
    package: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 1000,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

driveSchema.index({ companyName: 'text', role: 'text' });

module.exports = mongoose.model('Drive', driveSchema);

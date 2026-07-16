const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Tip title is required'],
      trim: true,
      minlength: 5,
      maxlength: 300,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Technical', 'Soft Skills', 'Career', 'Aptitude', 'Coding', 'System Design', 'HR'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: 10,
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    tags: {
      type: [String],
      validate: {
        validator: (v) => v.length <= 5,
        message: 'Cannot have more than 5 tags',
      },
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

tipSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Tip', tipSchema);

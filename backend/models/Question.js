const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
      minlength: 10,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Technical', 'Coding', 'System Design', 'Aptitude', 'HR'],
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    answer: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      validate: {
        validator: (v) => v.length <= 5,
        message: 'Cannot have more than 5 tags',
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

questionSchema.index({ question: 'text', company: 'text', tags: 'text' });

module.exports = mongoose.model('Question', questionSchema);

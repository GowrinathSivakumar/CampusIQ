const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    itemType: {
      type: String,
      enum: ['company', 'question', 'guide'],
      required: [true, 'Bookmark type is required'],
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    guideTitle: {
      type: String,
      trim: true,
    },
    guideType: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

bookmarkSchema.index({ user: 1, itemType: 1, companyId: 1 }, { unique: true, partialFilterExpression: { itemType: 'company' } });
bookmarkSchema.index({ user: 1, itemType: 1, questionId: 1 }, { unique: true, partialFilterExpression: { itemType: 'question' } });
bookmarkSchema.index({ user: 1, itemType: 1, guideTitle: 1 }, { unique: true, partialFilterExpression: { itemType: 'guide' } });

module.exports = mongoose.model('Bookmark', bookmarkSchema);

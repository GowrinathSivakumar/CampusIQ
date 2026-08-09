const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      unique: true,
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    autoPublish: {
      type: Boolean,
      default: false,
    },
    analyticsTracking: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'light',
    },
    notificationPrefs: {
      type: Boolean,
      default: true,
    },
    privacy: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Preference', preferenceSchema);

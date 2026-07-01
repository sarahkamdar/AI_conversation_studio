const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500
    },
    currentVersion: {
      type: Number,
      default: 1,
      min: 1
    },
    status: {
      type: String,
      enum: ['Draft', 'Testing', 'Approved', 'Archived'],
      default: 'Draft'
    },
    owner: {
      type: String,
      required: true,
      trim: true
    },
    tags: {
      type: [
        {
          type: String,
          trim: true
        }
      ],
      default: []
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

promptSchema.index({ owner: 1 });
promptSchema.index({ status: 1 });
promptSchema.index({ owner: 1, status: 1 });
promptSchema.index({ isActive: 1 });
promptSchema.index({ tags: 1 });
promptSchema.index({ createdAt: -1 });

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;

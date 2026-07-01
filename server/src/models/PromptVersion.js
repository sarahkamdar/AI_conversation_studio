const mongoose = require('mongoose');

const promptVersionSchema = new mongoose.Schema(
  {
    promptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prompt',
      required: true
    },
    version: {
      type: Number,
      required: true,
      min: 1
    },
    promptText: {
      type: String,
      required: true,
      trim: true
    },
    expectedOutput: {
      type: String,
      trim: true
    },
    temperature: {
      type: Number,
      default: 0.7,
      min: 0,
      max: 2
    },
    model: {
      type: String,
      default: 'gpt-4.1-mini',
      trim: true
    },
    changeLog: {
      type: String,
      trim: true
    },
    createdBy: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

promptVersionSchema.index({ promptId: 1, version: 1 }, { unique: true });

const PromptVersion = mongoose.model('PromptVersion', promptVersionSchema);

module.exports = PromptVersion;

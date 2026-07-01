const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    testRunId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TestRun',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    createdBy: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

feedbackSchema.index({ testRunId: 1, createdAt: -1 });
feedbackSchema.index({ createdBy: 1, createdAt: -1 });
feedbackSchema.index({ rating: 1, createdAt: -1 });

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;

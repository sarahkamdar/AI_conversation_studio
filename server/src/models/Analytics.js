const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    totalRuns: {
      type: Number,
      default: 0,
      min: 0
    },
    averageScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    averageLatency: {
      type: Number,
      default: 0,
      min: 0
    },
    averageHallucination: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    averageGroundedness: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    successfulRuns: {
      type: Number,
      default: 0,
      min: 0
    },
    failedRuns: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

analyticsSchema.index({ date: -1 }, { unique: true });
analyticsSchema.index({ createdAt: -1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;

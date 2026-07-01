const mongoose = require('mongoose');

const testRunSchema = new mongoose.Schema(
  {
    promptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prompt',
      required: true
    },
    promptVersionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PromptVersion',
      required: true
    },
    knowledgeSourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KnowledgeSource'
    },
    response: {
      type: String,
      required: true,
      trim: true
    },
    latency: {
      type: Number,
      min: 0
    },
    tokenUsage: {
      type: Number,
      min: 0
    },
    cost: {
      type: Number,
      min: 0
    },
    overallScore: {
      type: Number,
      min: 0,
      max: 100
    },
    groundednessScore: {
      type: Number,
      min: 0,
      max: 100
    },
    hallucinationScore: {
      type: Number,
      min: 0,
      max: 100
    },
    clarityScore: {
      type: Number,
      min: 0,
      max: 100
    },
    completenessScore: {
      type: Number,
      min: 0,
      max: 100
    },
    lengthScore: {
      type: Number,
      min: 0,
      max: 100
    },
    status: {
      type: String,
      enum: ['Success', 'Failed', 'Partial'],
      default: 'Success',
      required: true
    },
    executedBy: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

testRunSchema.index({ promptId: 1, createdAt: -1 });
testRunSchema.index({ promptVersionId: 1, createdAt: -1 });
testRunSchema.index({ knowledgeSourceId: 1, createdAt: -1 });
testRunSchema.index({ executedBy: 1, createdAt: -1 });
testRunSchema.index({ status: 1, createdAt: -1 });

const TestRun = mongoose.model('TestRun', testRunSchema);

module.exports = TestRun;

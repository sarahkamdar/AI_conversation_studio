const mongoose = require('mongoose');

const knowledgeSourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      enum: ['PDF', 'DOCX', 'TXT', 'MARKDOWN', 'TEXT'],
      default: 'TEXT',
      required: true
    },
    originalFileName: {
      type: String,
      trim: true
    },
    storagePath: {
      type: String,
      trim: true
    },
    content: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['Processing', 'Ready', 'Failed'],
      default: 'Processing',
      required: true
    },
    wordCount: {
      type: Number,
      default: 0,
      min: 0
    },
    uploadedBy: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

knowledgeSourceSchema.index({ uploadedBy: 1, status: 1 });
knowledgeSourceSchema.index({ type: 1, status: 1 });
knowledgeSourceSchema.index({ title: 1 });
knowledgeSourceSchema.index({ createdAt: -1 });

const KnowledgeSource = mongoose.model('KnowledgeSource', knowledgeSourceSchema);

module.exports = KnowledgeSource;

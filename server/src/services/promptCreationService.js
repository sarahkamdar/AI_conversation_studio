const mongoose = require('mongoose');
const Prompt = require('../models/Prompt');
const PromptVersion = require('../models/PromptVersion');

const createPromptWithInitialVersion = async (data) => {
  const session = await mongoose.startSession();

  try {
    const result = await session.withTransaction(async () => {
      const [createdPrompt] = await Prompt.create(
        [
          {
            title: data.title,
            description: data.description,
            owner: data.owner,
            tags: data.tags
          }
        ],
        { session }
      );

      const [createdPromptVersion] = await PromptVersion.create(
        [
          {
            promptId: createdPrompt._id,
            version: 1,
            promptText: data.promptText,
            expectedOutput: data.expectedOutput,
            temperature: data.temperature,
            model: data.model,
            changeLog: data.changeLog,
            createdBy: data.createdBy
          }
        ],
        { session }
      );

      return {
        prompt: createdPrompt,
        promptVersion: createdPromptVersion
      };
    });

    return result;
  } catch (error) {
    throw new Error(`Failed to create prompt with initial version: ${error.message}`);
  } finally {
    session.endSession();
  }
};

module.exports = {
  createPromptWithInitialVersion
};

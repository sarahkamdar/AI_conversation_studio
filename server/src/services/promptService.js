const Prompt = require('../models/Prompt');

const createPrompt = async (data) => {
  try {
    const prompt = await Prompt.create(data);
    return prompt;
  } catch (error) {
    throw new Error(`Failed to create prompt: ${error.message}`);
  }
};

const getAllPrompts = async () => {
  try {
    return await Prompt.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Failed to fetch prompts: ${error.message}`);
  }
};

const getPromptById = async (id) => {
  try {
    const prompt = await Prompt.findById(id);

    if (!prompt) {
      throw new Error('Prompt not found');
    }

    return prompt;
  } catch (error) {
    if (error.message === 'Prompt not found') {
      throw error;
    }

    throw new Error(`Failed to fetch prompt: ${error.message}`);
  }
};

const updatePrompt = async (id, data) => {
  try {
    const prompt = await Prompt.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!prompt) {
      throw new Error('Prompt not found');
    }

    return prompt;
  } catch (error) {
    if (error.message === 'Prompt not found') {
      throw error;
    }

    throw new Error(`Failed to update prompt: ${error.message}`);
  }
};

const archivePrompt = async (id) => {
  try {
    const prompt = await Prompt.findByIdAndUpdate(
      id,
      {
        status: 'Archived',
        isActive: false
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!prompt) {
      throw new Error('Prompt not found');
    }

    return prompt;
  } catch (error) {
    if (error.message === 'Prompt not found') {
      throw error;
    }

    throw new Error(`Failed to archive prompt: ${error.message}`);
  }
};

module.exports = {
  createPrompt,
  getAllPrompts,
  getPromptById,
  updatePrompt,
  archivePrompt
};

const Prompt = require('../models/Prompt');

const create = async (data) => {
  try {
    return await Prompt.create(data);
  } catch (error) {
    throw new Error(`Failed to create prompt: ${error.message}`);
  }
};

const findById = async (id) => {
  try {
    return await Prompt.findById(id);
  } catch (error) {
    throw new Error(`Failed to find prompt by id: ${error.message}`);
  }
};

const findAll = async () => {
  try {
    return await Prompt.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Failed to find prompts: ${error.message}`);
  }
};

const update = async (id, data) => {
  try {
    return await Prompt.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  } catch (error) {
    throw new Error(`Failed to update prompt: ${error.message}`);
  }
};

const archive = async (id) => {
  try {
    return await Prompt.findByIdAndUpdate(
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
  } catch (error) {
    throw new Error(`Failed to archive prompt: ${error.message}`);
  }
};

module.exports = {
  create,
  findById,
  findAll,
  update,
  archive
};

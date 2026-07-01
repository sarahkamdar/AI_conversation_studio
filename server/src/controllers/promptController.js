const { createPromptWithInitialVersion } = require('../services/promptCreationService');

const createPrompt = async (req, res, next) => {
  try {
    const { prompt, promptVersion } = await createPromptWithInitialVersion(req.body);

    return res.status(201).json({
      success: true,
      message: 'Prompt created successfully',
      data: {
        prompt,
        version: promptVersion
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createPrompt
};

const express = require('express');
const promptValidation = require('../validators/promptValidator');
const { createPrompt } = require('../controllers/promptController');

const router = express.Router();

router.post('/api/prompts', promptValidation, createPrompt);

module.exports = router;

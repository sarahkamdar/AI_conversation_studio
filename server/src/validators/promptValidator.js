const { body } = require('express-validator');

const promptValidation = [
  body('title')
    .exists({ checkFalsy: true })
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('owner')
    .exists({ checkFalsy: true })
    .withMessage('Owner is required')
    .isString()
    .withMessage('Owner must be a string'),
  body('status')
    .optional()
    .isIn(['Draft', 'Testing', 'Approved', 'Archived'])
    .withMessage('Status must be Draft, Testing, Approved, or Archived'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings')
    .custom((tags) => Array.isArray(tags) && tags.every((tag) => typeof tag === 'string'))
    .withMessage('Tags must be an array of strings')
];

module.exports = promptValidation;

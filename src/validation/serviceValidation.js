const { body, param, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateObjectId = param('id')
  .isMongoId()
  .withMessage('Invalid service ID format');

const serviceValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Service name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Service name must be between 2 and 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Service description is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Service description must be between 10 and 500 characters'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Service category is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Service category must be between 2 and 50 characters'),

  body('price')
    .notEmpty()
    .withMessage('Service price is required')
    .isFloat({ min: 0 })
    .withMessage('Service price must be a positive number'),

  body('duration')
    .notEmpty()
    .withMessage('Service duration is required')
    .isInt({ min: 1 })
    .withMessage('Service duration must be a positive integer (in minutes)'),

  body('availability')
    .isBoolean()
    .withMessage('Service availability must be a boolean'),

  body('created_by')
    .trim()
    .notEmpty()
    .withMessage('Creator information is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Creator name must be between 2 and 50 characters')
];

module.exports = {
  validateRequest,
  validateObjectId,
  serviceValidationRules
};
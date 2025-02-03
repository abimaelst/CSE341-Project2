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
  .withMessage('Invalid product ID format');

const productValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),

  body('type')
    .trim()
    .notEmpty()
    .withMessage('Product type is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Product type must be between 2 and 50 characters'),

  body('value')
    .notEmpty()
    .withMessage('Product value is required')
    .isFloat({ min: 0 })
    .withMessage('Product value must be a positive number'),

  body('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isInt({ min: 0 })
    .withMessage('Product quantity must be a positive integer'),

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
  productValidationRules
};
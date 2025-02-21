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
  .withMessage('Invalid order ID format');

const orderValidationRules = [
  body('customerName')
    .trim()
    .notEmpty()
    .withMessage('Customer name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Customer name must be between 2 and 100 characters'),

  body('orderItems')
    .isArray()
    .withMessage('Order items must be an array')
    .notEmpty()
    .withMessage('Order must contain at least one item'),

  body('orderItems.*.productId')
    .isMongoId()
    .withMessage('Invalid product ID format'),

  body('orderItems.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),

  body('totalAmount')
    .isFloat({ min: 0 })
    .withMessage('Total amount must be a positive number'),

  body('status')
    .isIn(['pending', 'processing', 'completed', 'cancelled'])
    .withMessage('Invalid order status'),

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
  orderValidationRules
};
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
  .withMessage('Invalid user ID format');

const userValidationRules = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

  body('role')
    .trim()
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['admin', 'user', 'guest'])
    .withMessage('Invalid role. Must be admin, user, or guest'),

  body('created_at')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format. Use ISO 8601 format')
];

module.exports = {
  validateRequest,
  validateObjectId,
  userValidationRules
};


/**
 * Validation Middleware
 */

const { validationResult, body, param, query } = require('express-validator');
const { apiResponse } = require('../utils/helpers');

/**
 * Handle validation errors
 */
function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(e => e.msg);
    return res.status(400).json(apiResponse(false, messages[0], { errors: errors.array() }));
  }
  next();
}

// ============================================
// AUTH VALIDATORS
// ============================================

const registerRules = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name is required (max 100 characters)'),
  body('country')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Country must be under 100 characters')
];

const loginRules = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// ============================================
// USER VALIDATORS
// ============================================

const updateProfileRules = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be 1-100 characters'),
  body('country')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Country must be under 100 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio must be under 500 characters'),
  body('avatar_url')
    .optional()
    .isURL()
    .withMessage('Avatar URL must be a valid URL')
];

const changePasswordRules = [
  body('old_password')
    .notEmpty()
    .withMessage('Current password is required'),
  body('new_password')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters')
];

// ============================================
// POST VALIDATORS
// ============================================

const createPostRules = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Post content must be 1-2000 characters')
];

const postIdRules = [
  param('id')
    .isUUID()
    .withMessage('Invalid post ID')
];

// ============================================
// COMMENT VALIDATORS
// ============================================

const createCommentRules = [
  param('id')
    .isUUID()
    .withMessage('Invalid post ID'),
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be 1-1000 characters')
];

// ============================================
// PAGINATION VALIDATORS
// ============================================

const paginationRules = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be 1-100'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be non-negative')
];

// ============================================
// BILLING VALIDATORS
// ============================================

const updateCardRules = [
  body('payment_method_id')
    .notEmpty()
    .withMessage('Payment method ID is required')
];

// ============================================
// SETTINGS VALIDATORS
// ============================================

const themeRules = [
  body('theme')
    .isIn(['light', 'dark'])
    .withMessage('Theme must be "light" or "dark"')
];

module.exports = {
  handleValidation,
  registerRules,
  loginRules,
  updateProfileRules,
  changePasswordRules,
  createPostRules,
  postIdRules,
  createCommentRules,
  paginationRules,
  updateCardRules,
  themeRules
};

/**
 * Auth Routes
 */

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const {
  handleValidation,
  registerRules,
  loginRules
} = require('../middleware/validate');

// POST /auth/register
router.post(
  '/register',
  registerRules,
  handleValidation,
  asyncHandler(authController.register)
);

// POST /auth/login
router.post(
  '/login',
  loginRules,
  handleValidation,
  asyncHandler(authController.login)
);

// POST /auth/logout
router.post(
  '/logout',
  requireAuth,
  authController.logout
);

module.exports = router;

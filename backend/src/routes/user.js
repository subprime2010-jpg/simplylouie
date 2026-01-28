/**
 * User Routes
 */

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const {
  handleValidation,
  updateProfileRules,
  changePasswordRules
} = require('../middleware/validate');

// GET /user/me
router.get(
  '/me',
  requireAuth,
  userController.getProfile
);

// POST /user/update
router.post(
  '/update',
  requireAuth,
  updateProfileRules,
  handleValidation,
  userController.updateProfile
);

// POST /user/password
router.post(
  '/password',
  requireAuth,
  changePasswordRules,
  handleValidation,
  asyncHandler(userController.changePassword)
);

// GET /user/:id (public profile)
router.get(
  '/:id',
  userController.getUserById
);

module.exports = router;

/**
 * Settings Routes
 */

const express = require('express');
const router = express.Router();

const settingsController = require('../controllers/settingsController');
const { requireAuth } = require('../middleware/auth');
const { handleValidation, themeRules } = require('../middleware/validate');

// GET /settings
router.get(
  '/',
  requireAuth,
  settingsController.getSettings
);

// POST /settings/theme
router.post(
  '/theme',
  requireAuth,
  themeRules,
  handleValidation,
  settingsController.updateTheme
);

module.exports = router;

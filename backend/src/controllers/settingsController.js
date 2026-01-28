/**
 * Settings Controller
 */

const { User } = require('../models');
const { apiResponse } = require('../utils/helpers');

/**
 * GET /settings
 * Get all settings
 */
function getSettings(req, res) {
  const user = req.user;
  const stats = User.getStats(user.id);

  res.json(apiResponse(true, 'Settings retrieved', {
    user: {
      ...User.sanitize(user),
      stats
    },
    billing: {
      status: user.billing_status || 'trialing',
      plan: '$2/month',
      trial_ends_at: user.trial_ends_at
    },
    preferences: {
      theme: user.theme || 'light'
    }
  }));
}

/**
 * POST /settings/theme
 * Update theme preference
 */
function updateTheme(req, res) {
  const { theme } = req.body;

  User.updateTheme(req.user.id, theme);

  res.json(apiResponse(true, 'Theme updated', { theme }));
}

module.exports = {
  getSettings,
  updateTheme
};

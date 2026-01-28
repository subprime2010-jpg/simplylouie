/**
 * User Controller
 */

const { User } = require('../models');
const { apiResponse } = require('../utils/helpers');

/**
 * GET /user/me
 * Get current user profile
 */
function getProfile(req, res) {
  const stats = User.getStats(req.user.id);
  res.json(apiResponse(true, 'User retrieved', {
    ...User.sanitize(req.user),
    stats
  }));
}

/**
 * POST /user/update
 * Update user profile
 */
function updateProfile(req, res) {
  const { name, country, bio, avatar_url } = req.body;

  const updatedUser = User.update(req.user.id, { name, country, bio, avatar_url });

  res.json(apiResponse(true, 'Profile updated', User.sanitize(updatedUser)));
}

/**
 * POST /user/password
 * Change password
 */
async function changePassword(req, res) {
  const { old_password, new_password } = req.body;

  // Verify old password
  const validPassword = await User.verifyPassword(req.user, old_password);
  if (!validPassword) {
    return res.status(401).json(apiResponse(false, 'Current password is incorrect'));
  }

  // Update password
  await User.updatePassword(req.user.id, new_password);

  res.json(apiResponse(true, 'Password changed successfully'));
}

/**
 * GET /user/:id
 * Get user by ID (public profile)
 */
function getUserById(req, res) {
  const user = User.findById(req.params.id);

  if (!user) {
    return res.status(404).json(apiResponse(false, 'User not found'));
  }

  const stats = User.getStats(user.id);

  res.json(apiResponse(true, 'User retrieved', {
    id: user.id,
    name: user.name,
    country: user.country,
    bio: user.bio,
    avatar_url: user.avatar_url,
    created_at: user.created_at,
    stats
  }));
}

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  getUserById
};

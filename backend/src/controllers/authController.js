/**
 * Auth Controller
 */

const { User, Session } = require('../models');
const { generateToken } = require('../middleware/auth');
const { apiResponse } = require('../utils/helpers');
const { broadcast } = require('../websocket');
const config = require('../config');

/**
 * POST /auth/register
 * Register a new user
 */
async function register(req, res) {
  const { email, password, name, country } = req.body;

  // Check if email exists
  const existingUser = User.findByEmail(email);
  if (existingUser) {
    return res.status(409).json(apiResponse(false, 'Email already registered'));
  }

  // Create user
  const user = await User.create({ email, password, name, country });

  // Generate token and session
  const token = generateToken(user.id);
  Session.create(user.id, token, config.jwt.expiry);

  // Broadcast new user
  broadcast({
    type: 'NEW_USER',
    data: { name: user.name, country: user.country }
  });

  res.status(201).json(apiResponse(true, 'Registration successful', {
    token,
    user: User.sanitize(user)
  }));
}

/**
 * POST /auth/login
 * Login user
 */
async function login(req, res) {
  const { email, password } = req.body;

  // Find user
  const user = User.findByEmail(email);
  if (!user) {
    return res.status(401).json(apiResponse(false, 'Invalid email or password'));
  }

  // Verify password
  const validPassword = await User.verifyPassword(user, password);
  if (!validPassword) {
    return res.status(401).json(apiResponse(false, 'Invalid email or password'));
  }

  // Generate token and session
  const token = generateToken(user.id);
  Session.create(user.id, token, config.jwt.expiry);

  res.json(apiResponse(true, 'Login successful', {
    token,
    user: User.sanitize(user)
  }));
}

/**
 * POST /auth/logout
 * Logout user
 */
function logout(req, res) {
  Session.delete(req.token);
  res.json(apiResponse(true, 'Logout successful'));
}

module.exports = {
  register,
  login,
  logout
};

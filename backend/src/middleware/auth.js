/**
 * Authentication Middleware
 */

const jwt = require('jsonwebtoken');
const config = require('../config');
const { Session, User } = require('../models');
const { apiResponse } = require('../utils/helpers');

/**
 * Required authentication middleware
 * Fails if no valid token
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(apiResponse(false, 'Authorization required'));
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify JWT
    const decoded = jwt.verify(token, config.jwt.secret);

    // Validate session
    const session = Session.validate(token);
    if (!session) {
      return res.status(401).json(apiResponse(false, 'Session expired or invalid'));
    }

    // Get fresh user data
    const user = User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json(apiResponse(false, 'User not found'));
    }

    // Attach to request
    req.user = user;
    req.token = token;
    req.session = session;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json(apiResponse(false, 'Token expired'));
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json(apiResponse(false, 'Invalid token'));
    }
    return res.status(401).json(apiResponse(false, 'Authentication failed'));
  }
}

/**
 * Optional authentication middleware
 * Attaches user if valid token, but doesn't fail
 */
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      const session = Session.validate(token);

      if (session) {
        req.user = User.findById(decoded.userId);
        req.token = token;
        req.session = session;
      }
    } catch (error) {
      // Ignore errors for optional auth
    }
  }

  next();
}

/**
 * Generate JWT token
 */
function generateToken(userId) {
  return jwt.sign({ userId }, config.jwt.secret, { expiresIn: config.jwt.expiry });
}

module.exports = {
  requireAuth,
  optionalAuth,
  generateToken
};

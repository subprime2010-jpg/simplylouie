/**
 * SUPER-ADMIN AUTHENTICATION MIDDLEWARE
 * JWT + role="founder" verification
 */

const jwt = require('jsonwebtoken');

const config = {
  jwtSecret: process.env.JWT_SECRET || 'simplylouie-secret-change-in-production'
};

/**
 * Standard API response format
 */
function apiResponse(success, message, data = null) {
  return { success, message, data };
}

/**
 * Verify JWT token
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
}

/**
 * Admin Auth Middleware
 * Verifies JWT and checks role = "founder"
 */
function adminAuth(db) {
  return function(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json(apiResponse(false, 'Admin authorization required'));
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json(apiResponse(false, 'Invalid or expired admin token'));
    }

    // Check admin session exists
    const session = db.prepare('SELECT * FROM admin_sessions WHERE token = ?').get(token);
    if (!session) {
      return res.status(401).json(apiResponse(false, 'Admin session expired'));
    }

    // Get admin user
    const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(decoded.adminId);
    if (!admin) {
      return res.status(401).json(apiResponse(false, 'Admin not found'));
    }

    // Check role is founder
    if (admin.role !== 'founder') {
      return res.status(403).json(apiResponse(false, 'Founder access required'));
    }

    // Optional: IP whitelist check
    if (admin.ip_whitelist) {
      const allowedIPs = JSON.parse(admin.ip_whitelist);
      const clientIP = req.ip || req.connection.remoteAddress;
      if (allowedIPs.length > 0 && !allowedIPs.includes(clientIP)) {
        return res.status(403).json(apiResponse(false, 'IP not whitelisted'));
      }
    }

    req.admin = admin;
    req.adminToken = token;
    next();
  };
}

/**
 * Generate admin JWT token
 */
function generateAdminToken(adminId) {
  return jwt.sign({ adminId, isAdmin: true }, config.jwtSecret, { expiresIn: '24h' });
}

module.exports = {
  adminAuth,
  generateAdminToken,
  apiResponse,
  verifyToken
};

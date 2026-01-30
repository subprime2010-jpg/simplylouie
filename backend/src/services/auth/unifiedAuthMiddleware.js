/**
 * Unified Auth Middleware
 * Routes every authenticated API request through the correct auth path:
 *
 *   1. x-rapidapi-proxy-secret header present  ->  RapidAPI proxy flow
 *   2. x-api-key header / api_key query param   ->  Direct LOUIE API key flow
 *   3. Neither                                   ->  401
 *
 * After either flow succeeds, req.apiKey and req.usageCount are set
 * exactly the same way, so downstream handlers are unchanged.
 */

const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const createRapidApiMiddleware = require('./rapidapiMiddleware');

function hashApiKey(key) {
  return crypto.createHash('sha256').update(key).digest('hex');
}

function apiResponse(success, message, data = null) {
  return { success, message, data };
}

function createUnifiedAuthMiddleware(db) {
  // Build the RapidAPI middleware once (it prepares its own DB statements)
  const rapidapiMiddleware = createRapidApiMiddleware(db);

  // Prepare statements once for the direct-key path
  const stmts = {
    getKeyByHash: db.prepare('SELECT * FROM api_keys WHERE key_hash = ?'),
    getDailyUsage: db.prepare('SELECT * FROM api_usage_daily WHERE api_key_id = ? AND date = ?'),
    upsertDailyUsage: db.prepare(
      'INSERT INTO api_usage_daily (id, api_key_id, date, call_count) VALUES (?, ?, ?, 1) ON CONFLICT(api_key_id, date) DO UPDATE SET call_count = call_count + 1'
    ),
    updateKeyLastUsed: db.prepare('UPDATE api_keys SET last_used_at = CURRENT_TIMESTAMP WHERE id = ?'),
    logUsage: db.prepare(
      'INSERT INTO api_usage (id, api_key_id, endpoint, method, response_code, response_time, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
  };

  return function unifiedAuth(req, res, next) {
    // Path 1: RapidAPI proxy request
    if (req.headers['x-rapidapi-proxy-secret']) {
      return rapidapiMiddleware(req, res, next);
    }

    // Path 2: Direct LOUIE API key
    const apiKey = req.headers['x-api-key'] || req.query.api_key;

    if (!apiKey) {
      return res.status(401).json(apiResponse(false, 'API key required. Get one at simplylouie.com/api'));
    }

    const keyHash = hashApiKey(apiKey);
    const keyRecord = stmts.getKeyByHash.get(keyHash);

    if (!keyRecord) {
      return res.status(401).json(apiResponse(false, 'Invalid API key'));
    }

    if (!keyRecord.is_active) {
      return res.status(403).json(apiResponse(false, 'API key has been deactivated'));
    }

    // Rate-limit check
    const today = new Date().toISOString().split('T')[0];
    const dailyUsage = stmts.getDailyUsage.get(keyRecord.id, today);
    const currentUsage = dailyUsage ? dailyUsage.call_count : 0;

    if (currentUsage >= keyRecord.rate_limit) {
      return res.status(429).json(apiResponse(false, 'Rate limit exceeded. Upgrade your plan at simplylouie.com/api', {
        current_usage: currentUsage,
        limit: keyRecord.rate_limit,
        tier: keyRecord.tier,
        upgrade_url: 'https://simplylouie.com/api/upgrade'
      }));
    }

    // Update usage
    stmts.upsertDailyUsage.run(uuidv4(), keyRecord.id, today);
    stmts.updateKeyLastUsed.run(keyRecord.id);

    // Attach to request
    req.apiKey = keyRecord;
    req.usageCount = currentUsage + 1;

    // Log usage after response
    const startTime = Date.now();
    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      const ip = req.ip || req.connection.remoteAddress;
      stmts.logUsage.run(uuidv4(), keyRecord.id, req.path, req.method, res.statusCode, responseTime, ip);
    });

    next();
  };
}

module.exports = createUnifiedAuthMiddleware;

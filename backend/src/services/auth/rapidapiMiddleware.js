/**
 * RapidAPI Proxy Middleware
 * Handles requests coming through RapidAPI's proxy infrastructure.
 *
 * RapidAPI sends:
 *   X-RapidAPI-Proxy-Secret  - shared secret to verify the request is from RapidAPI
 *   X-RapidAPI-User          - subscriber's RapidAPI username
 *   X-RapidAPI-Subscription  - subscriber's plan tier on RapidAPI (BASIC, PRO, ULTRA, MEGA)
 *
 * This middleware:
 *   1. Verifies the proxy secret
 *   2. Maps the RapidAPI user to an internal LOUIE API key (auto-provisions if new)
 *   3. Injects req.apiKey and req.usageCount so downstream handlers work unchanged
 */

const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

// Map RapidAPI subscription tiers to internal LOUIE tiers
const RAPIDAPI_TIER_MAP = {
  BASIC: 'free',
  PRO: 'starter',
  ULTRA: 'pro',
  MEGA: 'enterprise'
};

const TIER_LIMITS = {
  free: 100,
  starter: 1000,
  pro: 10000,
  enterprise: 1000000
};

function createRapidApiMiddleware(db) {
  // Prepare statements scoped to this middleware
  const stmts = {
    getKeyByName: db.prepare('SELECT * FROM api_keys WHERE name = ? AND is_active = 1'),
    getKeyByHash: db.prepare('SELECT * FROM api_keys WHERE key_hash = ?'),
    createKey: db.prepare(
      'INSERT INTO api_keys (id, key_hash, key_prefix, name, owner_email, tier, rate_limit) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ),
    updateKeyTier: db.prepare('UPDATE api_keys SET tier = ?, rate_limit = ? WHERE id = ?'),
    updateKeyLastUsed: db.prepare('UPDATE api_keys SET last_used_at = CURRENT_TIMESTAMP WHERE id = ?'),
    getDailyUsage: db.prepare('SELECT * FROM api_usage_daily WHERE api_key_id = ? AND date = ?'),
    upsertDailyUsage: db.prepare(
      'INSERT INTO api_usage_daily (id, api_key_id, date, call_count) VALUES (?, ?, ?, 1) ON CONFLICT(api_key_id, date) DO UPDATE SET call_count = call_count + 1'
    ),
    logUsage: db.prepare(
      'INSERT INTO api_usage (id, api_key_id, endpoint, method, response_code, response_time, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
  };

  function hashApiKey(key) {
    return crypto.createHash('sha256').update(key).digest('hex');
  }

  function generateApiKey() {
    const prefix = 'sl_live_';
    const randomPart = crypto.randomBytes(24).toString('hex');
    return prefix + randomPart;
  }

  function apiResponse(success, message, data = null) {
    return { success, message, data };
  }

  /**
   * Look up or auto-provision a LOUIE API key for a RapidAPI subscriber.
   * Keys are stored with name = "rapidapi-<username>" for easy lookup.
   */
  function getOrCreateKey(rapidapiUser, louieTier) {
    const label = `rapidapi-${rapidapiUser}`;
    let keyRecord = stmts.getKeyByName.get(label);

    if (keyRecord) {
      // Update tier if the subscriber changed plans on RapidAPI
      const expectedLimit = TIER_LIMITS[louieTier] || TIER_LIMITS.free;
      if (keyRecord.tier !== louieTier) {
        stmts.updateKeyTier.run(louieTier, expectedLimit, keyRecord.id);
        keyRecord.tier = louieTier;
        keyRecord.rate_limit = expectedLimit;
      }
      return keyRecord;
    }

    // Auto-provision a new key
    const rawKey = generateApiKey();
    const keyHash = hashApiKey(rawKey);
    const keyPrefix = rawKey.substring(0, 12) + '...';
    const keyId = uuidv4();
    const rateLimit = TIER_LIMITS[louieTier] || TIER_LIMITS.free;

    stmts.createKey.run(
      keyId,
      keyHash,
      keyPrefix,
      label,                              // name = "rapidapi-<username>"
      `${rapidapiUser}@rapidapi.proxy`,   // synthetic email
      louieTier,
      rateLimit
    );

    return stmts.getKeyByHash.get(keyHash);
  }

  // ----- The actual middleware function -----
  return function rapidapiMiddleware(req, res, next) {
    const proxySecret = req.headers['x-rapidapi-proxy-secret'];

    if (!proxySecret) {
      return res.status(401).json(apiResponse(false, 'Missing RapidAPI proxy secret'));
    }

    // Verify proxy secret using timing-safe comparison
    const expected = process.env.RAPIDAPI_PROXY_SECRET || '';
    if (
      expected.length === 0 ||
      proxySecret.length !== expected.length ||
      !crypto.timingSafeEqual(Buffer.from(proxySecret), Buffer.from(expected))
    ) {
      return res.status(403).json(apiResponse(false, 'Invalid RapidAPI proxy secret'));
    }

    const rapidapiUser = req.headers['x-rapidapi-user'];
    if (!rapidapiUser) {
      return res.status(400).json(apiResponse(false, 'Missing X-RapidAPI-User header'));
    }

    const rapidapiSubscription = (req.headers['x-rapidapi-subscription'] || 'BASIC').toUpperCase();
    const louieTier = RAPIDAPI_TIER_MAP[rapidapiSubscription] || 'free';

    // Get or auto-provision a LOUIE key for this RapidAPI user
    let keyRecord;
    try {
      keyRecord = getOrCreateKey(rapidapiUser, louieTier);
    } catch (err) {
      console.error('RapidAPI key provisioning error:', err);
      return res.status(500).json(apiResponse(false, 'Failed to provision API key'));
    }

    if (!keyRecord) {
      return res.status(500).json(apiResponse(false, 'Key provisioning returned no record'));
    }

    // Rate-limit check (mirrors apiKeyAuth logic)
    const today = new Date().toISOString().split('T')[0];
    const dailyUsage = stmts.getDailyUsage.get(keyRecord.id, today);
    const currentUsage = dailyUsage ? dailyUsage.call_count : 0;

    if (currentUsage >= keyRecord.rate_limit) {
      return res.status(429).json(apiResponse(false, 'Rate limit exceeded', {
        current_usage: currentUsage,
        limit: keyRecord.rate_limit,
        tier: keyRecord.tier
      }));
    }

    // Update usage counters
    stmts.upsertDailyUsage.run(uuidv4(), keyRecord.id, today);
    stmts.updateKeyLastUsed.run(keyRecord.id);

    // Attach same fields that apiKeyAuth sets so downstream handlers work unchanged
    req.apiKey = keyRecord;
    req.usageCount = currentUsage + 1;

    // Log usage after response completes
    const startTime = Date.now();
    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      const ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;
      stmts.logUsage.run(uuidv4(), keyRecord.id, req.path, req.method, res.statusCode, responseTime, ip);
    });

    next();
  };
}

module.exports = createRapidApiMiddleware;

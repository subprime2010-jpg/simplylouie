/**
 * Session Model
 */

const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const { getDatabase } = require('../database');

class Session {
  /**
   * Create a new session
   */
  static create(userId, token, expiresIn = '7d') {
    const db = getDatabase();
    const id = uuidv4();
    const tokenHash = this.hashToken(token);

    // Calculate expiry
    const match = expiresIn.match(/^(\d+)([dhms])$/);
    let expiryMs = 7 * 24 * 60 * 60 * 1000; // Default 7 days

    if (match) {
      const value = parseInt(match[1], 10);
      const unit = match[2];
      const multipliers = { d: 86400000, h: 3600000, m: 60000, s: 1000 };
      expiryMs = value * multipliers[unit];
    }

    const expiresAt = new Date(Date.now() + expiryMs).toISOString();

    db.prepare('INSERT INTO sessions (id, user_id, token_hash, expires_at) VALUES (?, ?, ?, ?)')
      .run(id, userId, tokenHash, expiresAt);

    return { id, expiresAt };
  }

  /**
   * Validate session by token
   */
  static validate(token) {
    const db = getDatabase();
    const tokenHash = this.hashToken(token);

    const session = db.prepare(`
      SELECT s.*, u.*
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token_hash = ? AND s.expires_at > datetime('now')
    `).get(tokenHash);

    return session;
  }

  /**
   * Delete session (logout)
   */
  static delete(token) {
    const db = getDatabase();
    const tokenHash = this.hashToken(token);
    const result = db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(tokenHash);
    return result.changes > 0;
  }

  /**
   * Delete all sessions for a user
   */
  static deleteAllForUser(userId) {
    const db = getDatabase();
    db.prepare('DELETE FROM sessions WHERE user_id = ?').run(userId);
  }

  /**
   * Clean up expired sessions
   */
  static cleanup() {
    const db = getDatabase();
    const result = db.prepare("DELETE FROM sessions WHERE expires_at <= datetime('now')").run();
    return result.changes;
  }

  /**
   * Hash token for storage
   */
  static hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}

module.exports = Session;

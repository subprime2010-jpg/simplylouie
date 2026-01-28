/**
 * User Model
 */

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { getDatabase } = require('../database');
const config = require('../config');

class User {
  /**
   * Create a new user
   */
  static async create({ email, password, name, country }) {
    const db = getDatabase();
    const id = uuidv4();
    const passwordHash = await bcrypt.hash(password, config.bcrypt.rounds);
    const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const stmt = db.prepare(`
      INSERT INTO users (id, email, password_hash, name, country, trial_ends_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(id, email.toLowerCase(), passwordHash, name, country || null, trialEndsAt);

    return this.findById(id);
  }

  /**
   * Find user by ID
   */
  static findById(id) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  }

  /**
   * Find user by email
   */
  static findByEmail(email) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email.toLowerCase());
  }

  /**
   * Update user profile
   */
  static update(id, { name, country, bio, avatar_url }) {
    const db = getDatabase();
    const user = this.findById(id);
    if (!user) return null;

    const stmt = db.prepare(`
      UPDATE users
      SET name = ?, country = ?, bio = ?, avatar_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      name || user.name,
      country !== undefined ? country : user.country,
      bio !== undefined ? bio : user.bio,
      avatar_url !== undefined ? avatar_url : user.avatar_url,
      id
    );

    return this.findById(id);
  }

  /**
   * Update password
   */
  static async updatePassword(id, newPassword) {
    const db = getDatabase();
    const passwordHash = await bcrypt.hash(newPassword, config.bcrypt.rounds);

    const stmt = db.prepare(`
      UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `);

    stmt.run(passwordHash, id);
  }

  /**
   * Verify password
   */
  static async verifyPassword(user, password) {
    return bcrypt.compare(password, user.password_hash);
  }

  /**
   * Update theme preference
   */
  static updateTheme(id, theme) {
    const db = getDatabase();
    const stmt = db.prepare('UPDATE users SET theme = ? WHERE id = ?');
    stmt.run(theme, id);
  }

  /**
   * Update billing information
   */
  static updateBilling(id, { stripe_customer_id, stripe_subscription_id, billing_status }) {
    const db = getDatabase();
    const stmt = db.prepare(`
      UPDATE users
      SET stripe_customer_id = ?, stripe_subscription_id = ?, billing_status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(stripe_customer_id, stripe_subscription_id, billing_status, id);
  }

  /**
   * Sanitize user object (remove sensitive fields)
   */
  static sanitize(user) {
    if (!user) return null;
    const {
      password_hash,
      stripe_customer_id,
      stripe_subscription_id,
      ...safe
    } = user;
    return safe;
  }

  /**
   * Get user stats
   */
  static getStats(id) {
    const db = getDatabase();

    const postCount = db.prepare('SELECT COUNT(*) as count FROM posts WHERE user_id = ?').get(id);
    const likeCount = db.prepare(`
      SELECT COUNT(*) as count FROM likes l
      JOIN posts p ON l.post_id = p.id
      WHERE p.user_id = ?
    `).get(id);

    return {
      posts: postCount.count,
      likes_received: likeCount.count
    };
  }
}

module.exports = User;

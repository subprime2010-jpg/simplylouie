/**
 * Like Model
 */

const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../database');

class Like {
  /**
   * Toggle like on a post
   * Returns { liked: boolean, count: number }
   */
  static toggle(userId, postId) {
    const db = getDatabase();

    // Check if already liked
    const existing = db.prepare('SELECT id FROM likes WHERE user_id = ? AND post_id = ?').get(userId, postId);

    if (existing) {
      // Unlike
      db.prepare('DELETE FROM likes WHERE id = ?').run(existing.id);
    } else {
      // Like
      const id = uuidv4();
      db.prepare('INSERT INTO likes (id, user_id, post_id) VALUES (?, ?, ?)').run(id, userId, postId);
    }

    // Get new count
    const count = this.getCount(postId);

    return {
      liked: !existing,
      count
    };
  }

  /**
   * Check if user liked a post
   */
  static hasLiked(userId, postId) {
    const db = getDatabase();
    const like = db.prepare('SELECT id FROM likes WHERE user_id = ? AND post_id = ?').get(userId, postId);
    return !!like;
  }

  /**
   * Get like count for a post
   */
  static getCount(postId) {
    const db = getDatabase();
    const result = db.prepare('SELECT COUNT(*) as count FROM likes WHERE post_id = ?').get(postId);
    return result.count;
  }

  /**
   * Get users who liked a post
   */
  static getLikers(postId, { limit = 20, offset = 0 }) {
    const db = getDatabase();
    return db.prepare(`
      SELECT u.id, u.name, u.avatar_url, u.country
      FROM likes l
      JOIN users u ON l.user_id = u.id
      WHERE l.post_id = ?
      ORDER BY l.created_at DESC
      LIMIT ? OFFSET ?
    `).all(postId, limit, offset);
  }
}

module.exports = Like;

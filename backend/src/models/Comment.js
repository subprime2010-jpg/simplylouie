/**
 * Comment Model
 */

const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../database');
const { formatRelativeTime } = require('../utils/helpers');

class Comment {
  /**
   * Create a new comment
   */
  static create(userId, postId, content) {
    const db = getDatabase();
    const id = uuidv4();

    db.prepare('INSERT INTO comments (id, user_id, post_id, content) VALUES (?, ?, ?, ?)')
      .run(id, userId, postId, content.trim());

    return this.findById(id);
  }

  /**
   * Find comment by ID
   */
  static findById(id) {
    const db = getDatabase();
    return db.prepare(`
      SELECT c.*, u.name, u.avatar_url, u.country
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `).get(id);
  }

  /**
   * Get comments for a post
   */
  static getByPost(postId, { limit = 50, offset = 0 }) {
    const db = getDatabase();

    const comments = db.prepare(`
      SELECT c.*, u.name, u.avatar_url, u.country
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at ASC
      LIMIT ? OFFSET ?
    `).all(postId, limit, offset);

    return comments.map(c => ({
      id: c.id,
      content: c.content,
      created_at: c.created_at,
      relative_time: formatRelativeTime(c.created_at),
      author: {
        id: c.user_id,
        name: c.name,
        avatar_url: c.avatar_url,
        country: c.country
      }
    }));
  }

  /**
   * Get comment count for a post
   */
  static getCount(postId) {
    const db = getDatabase();
    const result = db.prepare('SELECT COUNT(*) as count FROM comments WHERE post_id = ?').get(postId);
    return result.count;
  }

  /**
   * Delete a comment
   */
  static delete(id, userId) {
    const db = getDatabase();
    const result = db.prepare('DELETE FROM comments WHERE id = ? AND user_id = ?').run(id, userId);
    return result.changes > 0;
  }

  /**
   * Format comment for response
   */
  static format(comment) {
    return {
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      relative_time: formatRelativeTime(comment.created_at),
      author: {
        id: comment.user_id,
        name: comment.name,
        avatar_url: comment.avatar_url,
        country: comment.country
      }
    };
  }
}

module.exports = Comment;

/**
 * Post Model
 */

const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../database');
const { formatRelativeTime } = require('../utils/helpers');

class Post {
  /**
   * Create a new post
   */
  static create(userId, content) {
    const db = getDatabase();
    const id = uuidv4();

    const stmt = db.prepare('INSERT INTO posts (id, user_id, content) VALUES (?, ?, ?)');
    stmt.run(id, userId, content.trim());

    return this.findById(id);
  }

  /**
   * Find post by ID
   */
  static findById(id) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM posts WHERE id = ?');
    return stmt.get(id);
  }

  /**
   * Get posts with pagination and enriched data
   */
  static getAll({ limit = 20, offset = 0, userId = null }) {
    const db = getDatabase();

    const posts = db.prepare(`
      SELECT
        p.*,
        u.name as author_name,
        u.country as author_country,
        u.avatar_url as author_avatar,
        u.bio as author_bio
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `).all(limit, offset);

    // Enrich with counts and user's like status
    return posts.map(post => this.enrich(post, userId));
  }

  /**
   * Get total post count
   */
  static count() {
    const db = getDatabase();
    return db.prepare('SELECT COUNT(*) as count FROM posts').get().count;
  }

  /**
   * Enrich post with additional data
   */
  static enrich(post, currentUserId = null) {
    const db = getDatabase();

    const likeCount = db.prepare('SELECT COUNT(*) as count FROM likes WHERE post_id = ?').get(post.id);
    const commentCount = db.prepare('SELECT COUNT(*) as count FROM comments WHERE post_id = ?').get(post.id);

    let userLiked = false;
    if (currentUserId) {
      const like = db.prepare('SELECT id FROM likes WHERE user_id = ? AND post_id = ?').get(currentUserId, post.id);
      userLiked = !!like;
    }

    return {
      id: post.id,
      content: post.content,
      created_at: post.created_at,
      relative_time: formatRelativeTime(post.created_at),
      author: {
        id: post.user_id,
        name: post.author_name,
        country: post.author_country,
        avatar_url: post.author_avatar,
        bio: post.author_bio
      },
      likes: likeCount.count,
      comments: commentCount.count,
      user_liked: userLiked
    };
  }

  /**
   * Delete a post
   */
  static delete(id, userId) {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM posts WHERE id = ? AND user_id = ?');
    const result = stmt.run(id, userId);
    return result.changes > 0;
  }

  /**
   * Get posts by user
   */
  static getByUser(userId, { limit = 20, offset = 0 }) {
    const db = getDatabase();

    const posts = db.prepare(`
      SELECT
        p.*,
        u.name as author_name,
        u.country as author_country,
        u.avatar_url as author_avatar,
        u.bio as author_bio
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `).all(userId, limit, offset);

    return posts.map(post => this.enrich(post, userId));
  }
}

module.exports = Post;

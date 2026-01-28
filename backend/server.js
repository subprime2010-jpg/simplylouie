/**
 * SIMPLYLOUIE BACKEND API
 * Node.js + Express + SQLite + JWT + WebSocket
 * Production-ready, clean architecture
 */

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Database = require('better-sqlite3');
const { WebSocketServer } = require('ws');
const http = require('http');

// ============================================
// CONFIGURATION
// ============================================

const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'simplylouie-secret-change-in-production',
  jwtExpiry: '7d',
  bcryptRounds: 10,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder',
  dbPath: process.env.DB_PATH || './simplylouie.db'
};

// ============================================
// DATABASE SETUP
// ============================================

const db = new Database(config.dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  -- Users table
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    country TEXT,
    bio TEXT,
    avatar_url TEXT,
    theme TEXT DEFAULT 'light',
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    billing_status TEXT DEFAULT 'trialing',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Posts table
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  -- Likes table
  CREATE TABLE IF NOT EXISTS likes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE(user_id, post_id)
  );

  -- Comments table
  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  );

  -- Sessions table (for token invalidation)
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  -- Create indexes for performance
  CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
  CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);
  CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
  CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
`);

// ============================================
// PREPARED STATEMENTS
// ============================================

const statements = {
  // Users
  createUser: db.prepare(`
    INSERT INTO users (id, email, password_hash, name, country)
    VALUES (?, ?, ?, ?, ?)
  `),
  getUserByEmail: db.prepare(`SELECT * FROM users WHERE email = ?`),
  getUserById: db.prepare(`SELECT * FROM users WHERE id = ?`),
  updateUser: db.prepare(`
    UPDATE users SET name = ?, country = ?, bio = ?, avatar_url = ?
    WHERE id = ?
  `),
  updatePassword: db.prepare(`UPDATE users SET password_hash = ? WHERE id = ?`),
  updateTheme: db.prepare(`UPDATE users SET theme = ? WHERE id = ?`),
  updateBilling: db.prepare(`
    UPDATE users SET stripe_customer_id = ?, stripe_subscription_id = ?, billing_status = ?
    WHERE id = ?
  `),

  // Sessions
  createSession: db.prepare(`INSERT INTO sessions (id, user_id, token) VALUES (?, ?, ?)`),
  deleteSession: db.prepare(`DELETE FROM sessions WHERE token = ?`),
  getSession: db.prepare(`SELECT * FROM sessions WHERE token = ?`),

  // Posts
  createPost: db.prepare(`INSERT INTO posts (id, user_id, content) VALUES (?, ?, ?)`),
  getPostById: db.prepare(`SELECT * FROM posts WHERE id = ?`),
  deletePost: db.prepare(`DELETE FROM posts WHERE id = ? AND user_id = ?`),

  // Likes
  createLike: db.prepare(`INSERT OR IGNORE INTO likes (id, user_id, post_id) VALUES (?, ?, ?)`),
  deleteLike: db.prepare(`DELETE FROM likes WHERE user_id = ? AND post_id = ?`),
  getLike: db.prepare(`SELECT * FROM likes WHERE user_id = ? AND post_id = ?`),
  getLikeCount: db.prepare(`SELECT COUNT(*) as count FROM likes WHERE post_id = ?`),

  // Comments
  createComment: db.prepare(`INSERT INTO comments (id, user_id, post_id, content) VALUES (?, ?, ?, ?)`),
  getCommentsByPost: db.prepare(`
    SELECT c.*, u.name, u.avatar_url, u.country
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.post_id = ?
    ORDER BY c.created_at ASC
  `),
  getCommentCount: db.prepare(`SELECT COUNT(*) as count FROM comments WHERE post_id = ?`)
};

// ============================================
// EXPRESS APP SETUP
// ============================================

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Standard API response format
 */
function apiResponse(success, message, data = null) {
  return { success, message, data };
}

/**
 * Generate JWT token
 */
function generateToken(userId) {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.jwtExpiry });
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
 * Format relative time
 */
function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}

/**
 * Sanitize user object (remove sensitive fields)
 */
function sanitizeUser(user) {
  if (!user) return null;
  const { password_hash, stripe_customer_id, stripe_subscription_id, ...safe } = user;
  return safe;
}

// ============================================
// AUTH MIDDLEWARE
// ============================================

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(apiResponse(false, 'Authorization required'));
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json(apiResponse(false, 'Invalid or expired token'));
  }

  // Check if session exists (for logout invalidation)
  const session = statements.getSession.get(token);
  if (!session) {
    return res.status(401).json(apiResponse(false, 'Session expired'));
  }

  const user = statements.getUserById.get(decoded.userId);
  if (!user) {
    return res.status(401).json(apiResponse(false, 'User not found'));
  }

  req.user = user;
  req.token = token;
  next();
}

// Optional auth (doesn't fail if no token)
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    const session = statements.getSession.get(token);

    if (decoded && session) {
      req.user = statements.getUserById.get(decoded.userId);
      req.token = token;
    }
  }

  next();
}

// ============================================
// AUTH ROUTES
// ============================================

/**
 * POST /auth/register
 * Register a new user
 */
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name, country } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json(apiResponse(false, 'Email, password, and name are required'));
    }

    if (password.length < 6) {
      return res.status(400).json(apiResponse(false, 'Password must be at least 6 characters'));
    }

    // Check if email exists
    const existingUser = statements.getUserByEmail.get(email.toLowerCase());
    if (existingUser) {
      return res.status(409).json(apiResponse(false, 'Email already registered'));
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, config.bcryptRounds);

    // Create user
    const userId = uuidv4();
    statements.createUser.run(userId, email.toLowerCase(), passwordHash, name, country || null);

    // Generate token
    const token = generateToken(userId);
    const sessionId = uuidv4();
    statements.createSession.run(sessionId, userId, token);

    // Get created user
    const user = statements.getUserById.get(userId);

    // Broadcast new user
    broadcast({ type: 'NEW_USER', data: { name, country } });

    res.status(201).json(apiResponse(true, 'Registration successful', {
      token,
      user: sanitizeUser(user)
    }));
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json(apiResponse(false, 'Registration failed'));
  }
});

/**
 * POST /auth/login
 * Login user
 */
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(apiResponse(false, 'Email and password are required'));
    }

    // Find user
    const user = statements.getUserByEmail.get(email.toLowerCase());
    if (!user) {
      return res.status(401).json(apiResponse(false, 'Invalid email or password'));
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json(apiResponse(false, 'Invalid email or password'));
    }

    // Generate token
    const token = generateToken(user.id);
    const sessionId = uuidv4();
    statements.createSession.run(sessionId, user.id, token);

    res.json(apiResponse(true, 'Login successful', {
      token,
      user: sanitizeUser(user)
    }));
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json(apiResponse(false, 'Login failed'));
  }
});

/**
 * POST /auth/logout
 * Logout user (invalidate token)
 */
app.post('/auth/logout', authMiddleware, (req, res) => {
  try {
    statements.deleteSession.run(req.token);
    res.json(apiResponse(true, 'Logout successful'));
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json(apiResponse(false, 'Logout failed'));
  }
});

// ============================================
// USER ROUTES
// ============================================

/**
 * GET /user/me
 * Get current user profile
 */
app.get('/user/me', authMiddleware, (req, res) => {
  res.json(apiResponse(true, 'User retrieved', sanitizeUser(req.user)));
});

/**
 * POST /user/update
 * Update user profile
 */
app.post('/user/update', authMiddleware, (req, res) => {
  try {
    const { name, country, bio, avatar_url } = req.body;

    statements.updateUser.run(
      name || req.user.name,
      country || req.user.country,
      bio || req.user.bio,
      avatar_url || req.user.avatar_url,
      req.user.id
    );

    const updatedUser = statements.getUserById.get(req.user.id);
    res.json(apiResponse(true, 'Profile updated', sanitizeUser(updatedUser)));
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json(apiResponse(false, 'Update failed'));
  }
});

/**
 * POST /user/password
 * Change password
 */
app.post('/user/password', authMiddleware, async (req, res) => {
  try {
    const { old_password, new_password } = req.body;

    if (!old_password || !new_password) {
      return res.status(400).json(apiResponse(false, 'Both old and new passwords are required'));
    }

    if (new_password.length < 6) {
      return res.status(400).json(apiResponse(false, 'New password must be at least 6 characters'));
    }

    // Verify old password
    const validPassword = await bcrypt.compare(old_password, req.user.password_hash);
    if (!validPassword) {
      return res.status(401).json(apiResponse(false, 'Current password is incorrect'));
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(new_password, config.bcryptRounds);
    statements.updatePassword.run(newPasswordHash, req.user.id);

    res.json(apiResponse(true, 'Password changed successfully'));
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json(apiResponse(false, 'Password change failed'));
  }
});

// ============================================
// POSTS ROUTES
// ============================================

/**
 * GET /posts
 * Get posts feed
 */
app.get('/posts', optionalAuth, (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const offset = parseInt(req.query.offset) || 0;

    // Get posts with user info
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

    // Enrich posts with like/comment counts and user's like status
    const enrichedPosts = posts.map(post => {
      const likeCount = statements.getLikeCount.get(post.id).count;
      const commentCount = statements.getCommentCount.get(post.id).count;
      const userLiked = req.user
        ? !!statements.getLike.get(req.user.id, post.id)
        : false;

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
        likes: likeCount,
        comments: commentCount,
        user_liked: userLiked
      };
    });

    // Get total count for pagination
    const totalCount = db.prepare('SELECT COUNT(*) as count FROM posts').get().count;

    res.json(apiResponse(true, 'Posts retrieved', {
      posts: enrichedPosts,
      pagination: {
        total: totalCount,
        limit,
        offset,
        has_more: offset + posts.length < totalCount
      }
    }));
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json(apiResponse(false, 'Failed to retrieve posts'));
  }
});

/**
 * POST /posts
 * Create a new post
 */
app.post('/posts', authMiddleware, (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json(apiResponse(false, 'Post content is required'));
    }

    if (content.length > 2000) {
      return res.status(400).json(apiResponse(false, 'Post content must be under 2000 characters'));
    }

    const postId = uuidv4();
    statements.createPost.run(postId, req.user.id, content.trim());

    const post = statements.getPostById.get(postId);

    const enrichedPost = {
      id: post.id,
      content: post.content,
      created_at: post.created_at,
      relative_time: 'Just now',
      author: {
        id: req.user.id,
        name: req.user.name,
        country: req.user.country,
        avatar_url: req.user.avatar_url,
        bio: req.user.bio
      },
      likes: 0,
      comments: 0,
      user_liked: false
    };

    // Broadcast new post
    broadcast({ type: 'NEW_POST', data: enrichedPost });

    res.status(201).json(apiResponse(true, 'Post created', enrichedPost));
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json(apiResponse(false, 'Failed to create post'));
  }
});

/**
 * POST /posts/:id/like
 * Toggle like on a post
 */
app.post('/posts/:id/like', authMiddleware, (req, res) => {
  try {
    const postId = req.params.id;

    // Check post exists
    const post = statements.getPostById.get(postId);
    if (!post) {
      return res.status(404).json(apiResponse(false, 'Post not found'));
    }

    // Check if already liked
    const existingLike = statements.getLike.get(req.user.id, postId);

    if (existingLike) {
      // Unlike
      statements.deleteLike.run(req.user.id, postId);
      const newCount = statements.getLikeCount.get(postId).count;

      broadcast({ type: 'UNLIKE', data: { postId, userId: req.user.id, likes: newCount } });

      res.json(apiResponse(true, 'Post unliked', { liked: false, likes: newCount }));
    } else {
      // Like
      const likeId = uuidv4();
      statements.createLike.run(likeId, req.user.id, postId);
      const newCount = statements.getLikeCount.get(postId).count;

      broadcast({ type: 'LIKE', data: { postId, userId: req.user.id, likes: newCount } });

      res.json(apiResponse(true, 'Post liked', { liked: true, likes: newCount }));
    }
  } catch (error) {
    console.error('Like error:', error);
    res.status(500).json(apiResponse(false, 'Failed to like post'));
  }
});

/**
 * POST /posts/:id/comment
 * Add comment to a post
 */
app.post('/posts/:id/comment', authMiddleware, (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json(apiResponse(false, 'Comment content is required'));
    }

    // Check post exists
    const post = statements.getPostById.get(postId);
    if (!post) {
      return res.status(404).json(apiResponse(false, 'Post not found'));
    }

    const commentId = uuidv4();
    statements.createComment.run(commentId, req.user.id, postId, content.trim());

    const comment = {
      id: commentId,
      content: content.trim(),
      created_at: new Date().toISOString(),
      author: {
        id: req.user.id,
        name: req.user.name,
        avatar_url: req.user.avatar_url,
        country: req.user.country
      }
    };

    // Broadcast new comment
    broadcast({ type: 'NEW_COMMENT', data: { postId, comment } });

    res.status(201).json(apiResponse(true, 'Comment added', comment));
  } catch (error) {
    console.error('Comment error:', error);
    res.status(500).json(apiResponse(false, 'Failed to add comment'));
  }
});

// ============================================
// COMMENTS ROUTES
// ============================================

/**
 * GET /posts/:id/comments
 * Get all comments for a post
 */
app.get('/posts/:id/comments', (req, res) => {
  try {
    const postId = req.params.id;

    // Check post exists
    const post = statements.getPostById.get(postId);
    if (!post) {
      return res.status(404).json(apiResponse(false, 'Post not found'));
    }

    const comments = statements.getCommentsByPost.all(postId).map(c => ({
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

    res.json(apiResponse(true, 'Comments retrieved', comments));
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json(apiResponse(false, 'Failed to retrieve comments'));
  }
});

// ============================================
// BILLING ROUTES (STRIPE INTEGRATION)
// ============================================

/**
 * GET /billing/status
 * Get billing status
 */
app.get('/billing/status', authMiddleware, (req, res) => {
  res.json(apiResponse(true, 'Billing status retrieved', {
    status: req.user.billing_status || 'trialing',
    plan: '$2/month',
    next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  }));
});

/**
 * POST /billing/update-card
 * Update payment method
 */
app.post('/billing/update-card', authMiddleware, async (req, res) => {
  try {
    const { payment_method_id } = req.body;

    if (!payment_method_id) {
      return res.status(400).json(apiResponse(false, 'Payment method ID is required'));
    }

    // In production, this would call Stripe API:
    // const stripe = require('stripe')(config.stripeSecretKey);
    // await stripe.customers.update(req.user.stripe_customer_id, {
    //   invoice_settings: { default_payment_method: payment_method_id }
    // });

    // For now, just simulate success
    statements.updateBilling.run(
      req.user.stripe_customer_id || `cus_${uuidv4().slice(0, 14)}`,
      req.user.stripe_subscription_id || `sub_${uuidv4().slice(0, 14)}`,
      'active',
      req.user.id
    );

    res.json(apiResponse(true, 'Payment method updated'));
  } catch (error) {
    console.error('Update card error:', error);
    res.status(500).json(apiResponse(false, 'Failed to update payment method'));
  }
});

/**
 * POST /billing/cancel
 * Cancel subscription
 */
app.post('/billing/cancel', authMiddleware, async (req, res) => {
  try {
    // In production, this would call Stripe API:
    // const stripe = require('stripe')(config.stripeSecretKey);
    // await stripe.subscriptions.update(req.user.stripe_subscription_id, {
    //   cancel_at_period_end: true
    // });

    statements.updateBilling.run(
      req.user.stripe_customer_id,
      req.user.stripe_subscription_id,
      'canceled',
      req.user.id
    );

    res.json(apiResponse(true, 'Subscription cancelled'));
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json(apiResponse(false, 'Failed to cancel subscription'));
  }
});

// ============================================
// SETTINGS ROUTES
// ============================================

/**
 * GET /settings
 * Get all settings
 */
app.get('/settings', authMiddleware, (req, res) => {
  res.json(apiResponse(true, 'Settings retrieved', {
    user: sanitizeUser(req.user),
    billing: {
      status: req.user.billing_status || 'trialing',
      plan: '$2/month'
    },
    preferences: {
      theme: req.user.theme || 'light'
    }
  }));
});

/**
 * POST /settings/theme
 * Update theme preference
 */
app.post('/settings/theme', authMiddleware, (req, res) => {
  try {
    const { theme } = req.body;

    if (!['light', 'dark'].includes(theme)) {
      return res.status(400).json(apiResponse(false, 'Theme must be "light" or "dark"'));
    }

    statements.updateTheme.run(theme, req.user.id);

    res.json(apiResponse(true, 'Theme updated', { theme }));
  } catch (error) {
    console.error('Update theme error:', error);
    res.status(500).json(apiResponse(false, 'Failed to update theme'));
  }
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', (req, res) => {
  res.json(apiResponse(true, 'SimplyLouie API is running', {
    version: '1.0.0',
    uptime: process.uptime()
  }));
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json(apiResponse(false, 'Endpoint not found'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json(apiResponse(false, 'Internal server error'));
});

// ============================================
// HTTP SERVER + WEBSOCKET
// ============================================

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

// Connected clients
const clients = new Set();

wss.on('connection', (ws, req) => {
  console.log('WebSocket client connected');
  clients.add(ws);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'CONNECTED',
    data: { message: 'Welcome to SimplyLouie real-time feed' }
  }));

  ws.on('close', () => {
    clients.delete(ws);
    console.log('WebSocket client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

/**
 * Broadcast message to all connected clients
 */
function broadcast(message) {
  const data = JSON.stringify(message);
  clients.forEach(client => {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(data);
    }
  });
}

// ============================================
// START SERVER
// ============================================

server.listen(config.port, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🐕 SimplyLouie API Server                           ║
║                                                       ║
║   HTTP:      http://localhost:${config.port}                  ║
║   WebSocket: ws://localhost:${config.port}/ws                 ║
║                                                       ║
║   People over profits. Change from the bottom up.     ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  db.close();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = { app, db };

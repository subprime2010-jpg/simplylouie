/**
 * Express Application Setup
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const config = require('./config');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/logger');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
app.use(rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  }
}));

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Request logging
app.use(requestLogger);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'SimplyLouie API is running',
    data: {
      version: '1.0.0',
      environment: config.env,
      uptime: process.uptime()
    }
  });
});

// API routes
app.use('/auth', routes.auth);
app.use('/user', routes.user);
app.use('/posts', routes.posts);
app.use('/billing', routes.billing);
app.use('/settings', routes.settings);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

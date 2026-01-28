/**
 * Posts Routes
 */

const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postsController');
const { requireAuth, optionalAuth } = require('../middleware/auth');
const {
  handleValidation,
  createPostRules,
  postIdRules,
  createCommentRules,
  paginationRules
} = require('../middleware/validate');

// GET /posts
router.get(
  '/',
  optionalAuth,
  paginationRules,
  handleValidation,
  postsController.getPosts
);

// POST /posts
router.post(
  '/',
  requireAuth,
  createPostRules,
  handleValidation,
  postsController.createPost
);

// GET /posts/:id
router.get(
  '/:id',
  optionalAuth,
  postIdRules,
  handleValidation,
  postsController.getPost
);

// DELETE /posts/:id
router.delete(
  '/:id',
  requireAuth,
  postIdRules,
  handleValidation,
  postsController.deletePost
);

// POST /posts/:id/like
router.post(
  '/:id/like',
  requireAuth,
  postIdRules,
  handleValidation,
  postsController.toggleLike
);

// POST /posts/:id/comment
router.post(
  '/:id/comment',
  requireAuth,
  createCommentRules,
  handleValidation,
  postsController.addComment
);

// GET /posts/:id/comments
router.get(
  '/:id/comments',
  postIdRules,
  paginationRules,
  handleValidation,
  postsController.getComments
);

module.exports = router;

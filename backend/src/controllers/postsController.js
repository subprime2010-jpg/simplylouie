/**
 * Posts Controller
 */

const { Post, Like, Comment, User } = require('../models');
const { apiResponse, parsePagination, paginationMeta } = require('../utils/helpers');
const { broadcast } = require('../websocket');

/**
 * GET /posts
 * Get posts feed
 */
function getPosts(req, res) {
  const { limit, offset } = parsePagination(req.query);
  const userId = req.user?.id || null;

  const posts = Post.getAll({ limit, offset, userId });
  const total = Post.count();

  res.json(apiResponse(true, 'Posts retrieved', {
    posts,
    pagination: paginationMeta(total, limit, offset)
  }));
}

/**
 * POST /posts
 * Create a new post
 */
function createPost(req, res) {
  const { content } = req.body;

  const post = Post.create(req.user.id, content);
  const enrichedPost = Post.enrich({
    ...post,
    author_name: req.user.name,
    author_country: req.user.country,
    author_avatar: req.user.avatar_url,
    author_bio: req.user.bio
  }, req.user.id);

  // Broadcast new post
  broadcast({
    type: 'NEW_POST',
    data: enrichedPost
  });

  res.status(201).json(apiResponse(true, 'Post created', enrichedPost));
}

/**
 * GET /posts/:id
 * Get a single post
 */
function getPost(req, res) {
  const post = Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json(apiResponse(false, 'Post not found'));
  }

  const author = User.findById(post.user_id);
  const enrichedPost = Post.enrich({
    ...post,
    author_name: author.name,
    author_country: author.country,
    author_avatar: author.avatar_url,
    author_bio: author.bio
  }, req.user?.id);

  res.json(apiResponse(true, 'Post retrieved', enrichedPost));
}

/**
 * DELETE /posts/:id
 * Delete a post
 */
function deletePost(req, res) {
  const deleted = Post.delete(req.params.id, req.user.id);

  if (!deleted) {
    return res.status(404).json(apiResponse(false, 'Post not found or not authorized'));
  }

  // Broadcast deletion
  broadcast({
    type: 'DELETE_POST',
    data: { postId: req.params.id }
  });

  res.json(apiResponse(true, 'Post deleted'));
}

/**
 * POST /posts/:id/like
 * Toggle like on a post
 */
function toggleLike(req, res) {
  const post = Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json(apiResponse(false, 'Post not found'));
  }

  const result = Like.toggle(req.user.id, req.params.id);

  // Broadcast like/unlike
  broadcast({
    type: result.liked ? 'LIKE' : 'UNLIKE',
    data: {
      postId: req.params.id,
      userId: req.user.id,
      likes: result.count
    }
  });

  res.json(apiResponse(true, result.liked ? 'Post liked' : 'Post unliked', result));
}

/**
 * POST /posts/:id/comment
 * Add comment to a post
 */
function addComment(req, res) {
  const { content } = req.body;
  const post = Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json(apiResponse(false, 'Post not found'));
  }

  const comment = Comment.create(req.user.id, req.params.id, content);
  const formattedComment = Comment.format(comment);

  // Broadcast new comment
  broadcast({
    type: 'NEW_COMMENT',
    data: {
      postId: req.params.id,
      comment: formattedComment
    }
  });

  res.status(201).json(apiResponse(true, 'Comment added', formattedComment));
}

/**
 * GET /posts/:id/comments
 * Get comments for a post
 */
function getComments(req, res) {
  const post = Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json(apiResponse(false, 'Post not found'));
  }

  const { limit, offset } = parsePagination(req.query, { limit: 50, maxLimit: 100 });
  const comments = Comment.getByPost(req.params.id, { limit, offset });

  res.json(apiResponse(true, 'Comments retrieved', comments));
}

module.exports = {
  getPosts,
  createPost,
  getPost,
  deletePost,
  toggleLike,
  addComment,
  getComments
};

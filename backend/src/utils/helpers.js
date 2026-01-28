/**
 * Utility Helper Functions
 */

/**
 * Standard API response format
 */
function apiResponse(success, message, data = null) {
  const response = { success, message };
  if (data !== null) {
    response.data = data;
  }
  return response;
}

/**
 * Format date to relative time string
 */
function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffSeconds < 60) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}

/**
 * Parse pagination from query params
 */
function parsePagination(query, defaults = { limit: 20, maxLimit: 100 }) {
  const limit = Math.min(
    parseInt(query.limit, 10) || defaults.limit,
    defaults.maxLimit
  );
  const offset = Math.max(parseInt(query.offset, 10) || 0, 0);

  return { limit, offset };
}

/**
 * Create pagination metadata
 */
function paginationMeta(total, limit, offset) {
  return {
    total,
    limit,
    offset,
    has_more: offset + limit < total,
    page: Math.floor(offset / limit) + 1,
    pages: Math.ceil(total / limit)
  };
}

module.exports = {
  apiResponse,
  formatRelativeTime,
  parsePagination,
  paginationMeta
};

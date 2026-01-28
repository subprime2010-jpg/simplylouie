# SimplyLouie Frontend API Integration Guide

## Setup

Add this script to any HTML file that needs API access:

```html
<script src="api.js"></script>
```

Or paste the API module directly into your `<script>` tag.

---

## API Configuration

```javascript
// ============================================
// SIMPLYLOUIE API CLIENT
// Paste this at the top of your <script> section
// ============================================

const API_BASE = 'http://localhost:3000';

// Get stored auth token
function getToken() {
  return localStorage.getItem('simplylouie_token');
}

// Store auth token
function setToken(token) {
  localStorage.setItem('simplylouie_token', token);
}

// Clear auth token (logout)
function clearToken() {
  localStorage.removeItem('simplylouie_token');
  localStorage.removeItem('simplylouie_user');
}

// Store user data
function setUser(user) {
  localStorage.setItem('simplylouie_user', JSON.stringify(user));
}

// Get stored user data
function getUser() {
  const data = localStorage.getItem('simplylouie_user');
  return data ? JSON.parse(data) : null;
}

// Check if logged in
function isLoggedIn() {
  return !!getToken();
}

// API request helper
async function api(endpoint, options = {}) {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}
```

---

## Authentication

### Register New User

```javascript
async function register(email, password, name, country) {
  try {
    const result = await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, country })
    });

    // Store token and user
    setToken(result.data.token);
    setUser(result.data.user);

    // Redirect to app
    window.location.href = '/superapp.html';
    
    return result;
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

// Usage in signup form:
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  await register(
    form.email.value,
    form.password.value,
    form.name.value,
    form.country.value
  );
});
```

### Login

```javascript
async function login(email, password) {
  try {
    const result = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    // Store token and user
    setToken(result.data.token);
    setUser(result.data.user);

    // Redirect to app
    window.location.href = '/superapp.html';
    
    return result;
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

// Usage in login form:
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  await login(form.email.value, form.password.value);
});
```

### Logout

```javascript
async function logout() {
  try {
    await api('/auth/logout', { method: 'POST' });
  } catch (error) {
    // Logout locally even if API fails
    console.error('Logout error:', error);
  } finally {
    clearToken();
    window.location.href = '/login.html';
  }
}

// Usage:
document.querySelector('.logout-btn').addEventListener('click', logout);
```

---

## User Profile

### Get Current User

```javascript
async function getCurrentUser() {
  try {
    const result = await api('/user/me');
    setUser(result.data);
    return result.data;
  } catch (error) {
    // Token expired or invalid
    if (error.message.includes('expired') || error.message.includes('Invalid')) {
      clearToken();
      window.location.href = '/login.html';
    }
    throw error;
  }
}

// Usage on page load:
document.addEventListener('DOMContentLoaded', async () => {
  if (!isLoggedIn()) {
    window.location.href = '/login.html';
    return;
  }
  
  const user = await getCurrentUser();
  document.querySelector('.user-name').textContent = user.name;
  document.querySelector('.user-country').textContent = user.country || '';
});
```

### Update Profile

```javascript
async function updateProfile(name, country, bio, avatarUrl) {
  try {
    const result = await api('/user/update', {
      method: 'POST',
      body: JSON.stringify({
        name,
        country,
        bio,
        avatar_url: avatarUrl
      })
    });

    setUser(result.data);
    alert('Profile updated!');
    return result.data;
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

// Usage in settings form:
document.querySelector('#profile-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  await updateProfile(
    form.name.value,
    form.country.value,
    form.bio.value,
    form.avatar_url.value
  );
});
```

### Change Password

```javascript
async function changePassword(oldPassword, newPassword) {
  try {
    await api('/user/password', {
      method: 'POST',
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword
      })
    });

    alert('Password changed successfully!');
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

// Usage:
document.querySelector('#password-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  await changePassword(form.old_password.value, form.new_password.value);
  form.reset();
});
```

---

## Posts (Community Feed)

### Get Posts

```javascript
async function getPosts(limit = 20, offset = 0) {
  try {
    const result = await api(`/posts?limit=${limit}&offset=${offset}`);
    return result.data;
  } catch (error) {
    console.error('Failed to load posts:', error);
    throw error;
  }
}

// Usage - render posts:
async function loadFeed() {
  const { posts, pagination } = await getPosts();
  const feedContainer = document.querySelector('.feed');
  
  feedContainer.innerHTML = posts.map(post => `
    <div class="post" data-id="${post.id}">
      <div class="post-header">
        <strong>${post.author.name}</strong>
        <span class="country">${post.author.country || ''}</span>
        <span class="time">${post.relative_time}</span>
      </div>
      <div class="post-content">${post.content}</div>
      <div class="post-actions">
        <button class="like-btn ${post.user_liked ? 'liked' : ''}" onclick="toggleLike('${post.id}')">
          ${post.user_liked ? '❤️' : '🤍'} ${post.likes}
        </button>
        <button class="comment-btn" onclick="showComments('${post.id}')">
          💬 ${post.comments}
        </button>
      </div>
    </div>
  `).join('');
}

// Load more posts (infinite scroll)
let currentOffset = 0;
async function loadMorePosts() {
  currentOffset += 20;
  const { posts } = await getPosts(20, currentOffset);
  // Append to existing feed...
}
```

### Create Post

```javascript
async function createPost(content) {
  try {
    const result = await api('/posts', {
      method: 'POST',
      body: JSON.stringify({ content })
    });

    // Prepend new post to feed
    const feedContainer = document.querySelector('.feed');
    const post = result.data;
    
    const postHtml = `
      <div class="post" data-id="${post.id}">
        <div class="post-header">
          <strong>${post.author.name}</strong>
          <span class="time">Just now</span>
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-actions">
          <button class="like-btn" onclick="toggleLike('${post.id}')">🤍 0</button>
          <button class="comment-btn" onclick="showComments('${post.id}')">💬 0</button>
        </div>
      </div>
    `;
    
    feedContainer.insertAdjacentHTML('afterbegin', postHtml);
    
    return result.data;
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

// Usage:
document.querySelector('#post-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const textarea = e.target.querySelector('textarea');
  await createPost(textarea.value);
  textarea.value = '';
});
```

### Like/Unlike Post

```javascript
async function toggleLike(postId) {
  try {
    const result = await api(`/posts/${postId}/like`, {
      method: 'POST'
    });

    // Update UI
    const postEl = document.querySelector(`.post[data-id="${postId}"]`);
    const likeBtn = postEl.querySelector('.like-btn');
    
    if (result.data.liked) {
      likeBtn.classList.add('liked');
      likeBtn.innerHTML = `❤️ ${result.data.likes}`;
    } else {
      likeBtn.classList.remove('liked');
      likeBtn.innerHTML = `🤍 ${result.data.likes}`;
    }

    return result.data;
  } catch (error) {
    alert(error.message);
    throw error;
  }
}
```

### Add Comment

```javascript
async function addComment(postId, content) {
  try {
    const result = await api(`/posts/${postId}/comment`, {
      method: 'POST',
      body: JSON.stringify({ content })
    });

    // Append comment to comments list
    const commentsContainer = document.querySelector(`#comments-${postId}`);
    const comment = result.data;
    
    commentsContainer.insertAdjacentHTML('beforeend', `
      <div class="comment">
        <strong>${comment.author.name}</strong>
        <p>${comment.content}</p>
      </div>
    `);

    // Update comment count
    const postEl = document.querySelector(`.post[data-id="${postId}"]`);
    const commentBtn = postEl.querySelector('.comment-btn');
    const count = parseInt(commentBtn.textContent.match(/\d+/)[0]) + 1;
    commentBtn.innerHTML = `💬 ${count}`;

    return result.data;
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

// Usage:
function handleCommentSubmit(postId, form) {
  const input = form.querySelector('input');
  addComment(postId, input.value);
  input.value = '';
}
```

### Get Comments for Post

```javascript
async function getComments(postId) {
  try {
    const result = await api(`/posts/${postId}/comments`);
    return result.data;
  } catch (error) {
    console.error('Failed to load comments:', error);
    throw error;
  }
}

// Usage - show comments modal:
async function showComments(postId) {
  const comments = await getComments(postId);
  
  const modal = document.querySelector('#comments-modal');
  const list = modal.querySelector('.comments-list');
  
  list.innerHTML = comments.map(c => `
    <div class="comment">
      <strong>${c.author.name}</strong>
      <span class="time">${c.relative_time}</span>
      <p>${c.content}</p>
    </div>
  `).join('') || '<p>No comments yet. Be the first!</p>';
  
  modal.dataset.postId = postId;
  modal.classList.add('open');
}
```

---

## Billing

### Get Billing Status

```javascript
async function getBillingStatus() {
  try {
    const result = await api('/billing/status');
    return result.data;
  } catch (error) {
    console.error('Failed to get billing status:', error);
    throw error;
  }
}

// Usage:
async function loadBillingInfo() {
  const billing = await getBillingStatus();
  
  document.querySelector('.billing-status').textContent = billing.status;
  document.querySelector('.billing-plan').textContent = billing.plan;
  document.querySelector('.next-billing').textContent = 
    new Date(billing.next_billing_date).toLocaleDateString();
}
```

### Update Payment Card

```javascript
async function updateCard(paymentMethodId) {
  try {
    await api('/billing/update-card', {
      method: 'POST',
      body: JSON.stringify({ payment_method_id: paymentMethodId })
    });

    alert('Payment method updated!');
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

// Usage with Stripe Elements:
// 1. Include Stripe.js: <script src="https://js.stripe.com/v3/"></script>
// 2. Create card element and handle submission:

const stripe = Stripe('pk_test_your_publishable_key');
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

document.querySelector('#card-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const { paymentMethod, error } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement
  });

  if (error) {
    alert(error.message);
    return;
  }

  await updateCard(paymentMethod.id);
});
```

### Cancel Membership

```javascript
async function cancelMembership() {
  if (!confirm('Are you sure you want to cancel? You\'ll lose access at the end of your billing period.')) {
    return;
  }

  try {
    await api('/billing/cancel', { method: 'POST' });
    
    // Redirect to cancellation page
    window.location.href = '/cancel.html';
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

// Usage:
document.querySelector('.cancel-btn').addEventListener('click', cancelMembership);
```

---

## Settings

### Get All Settings

```javascript
async function getSettings() {
  try {
    const result = await api('/settings');
    return result.data;
  } catch (error) {
    console.error('Failed to load settings:', error);
    throw error;
  }
}

// Usage:
async function loadSettingsPage() {
  const settings = await getSettings();
  
  // Populate user fields
  document.querySelector('#name').value = settings.user.name;
  document.querySelector('#email').value = settings.user.email;
  document.querySelector('#country').value = settings.user.country || '';
  document.querySelector('#bio').value = settings.user.bio || '';
  
  // Set theme toggle
  document.querySelector('#theme-toggle').checked = settings.preferences.theme === 'dark';
  
  // Show billing status
  document.querySelector('.billing-status').textContent = settings.billing.status;
}
```

### Update Theme

```javascript
async function updateTheme(theme) {
  try {
    await api('/settings/theme', {
      method: 'POST',
      body: JSON.stringify({ theme })
    });

    // Apply theme immediately
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Store preference locally for instant load
    localStorage.setItem('simplylouie_theme', theme);
  } catch (error) {
    console.error('Failed to update theme:', error);
    throw error;
  }
}

// Usage with toggle:
document.querySelector('#theme-toggle').addEventListener('change', (e) => {
  updateTheme(e.target.checked ? 'dark' : 'light');
});

// Apply saved theme on page load:
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('simplylouie_theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
});
```

---

## Real-Time Updates (WebSocket)

```javascript
// ============================================
// WEBSOCKET CONNECTION FOR LIVE UPDATES
// ============================================

let ws = null;

function connectWebSocket() {
  const token = getToken();
  const wsUrl = `ws://localhost:3000/ws${token ? `?token=${token}` : ''}`;
  
  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    console.log('WebSocket connected');
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    handleRealtimeUpdate(message);
  };

  ws.onclose = () => {
    console.log('WebSocket disconnected, reconnecting...');
    setTimeout(connectWebSocket, 3000);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
}

function handleRealtimeUpdate(message) {
  switch (message.type) {
    case 'NEW_POST':
      // Prepend new post to feed (if not from current user)
      const currentUser = getUser();
      if (message.data.author.id !== currentUser?.id) {
        prependPostToFeed(message.data);
      }
      break;

    case 'LIKE':
    case 'UNLIKE':
      // Update like count on post
      updatePostLikes(message.data.postId, message.data.likes);
      break;

    case 'NEW_COMMENT':
      // Update comment count and add to comments if modal is open
      updatePostComments(message.data.postId, message.data.comment);
      break;

    case 'NEW_USER':
      // Show welcome toast
      showToast(`${message.data.name} joined the movement!`);
      break;
  }
}

// Helper functions
function prependPostToFeed(post) {
  const feed = document.querySelector('.feed');
  if (!feed) return;
  
  // Create and insert post element...
}

function updatePostLikes(postId, count) {
  const likeBtn = document.querySelector(`.post[data-id="${postId}"] .like-btn`);
  if (likeBtn) {
    likeBtn.textContent = likeBtn.textContent.replace(/\d+/, count);
  }
}

function updatePostComments(postId, comment) {
  const commentBtn = document.querySelector(`.post[data-id="${postId}"] .comment-btn`);
  if (commentBtn) {
    const count = parseInt(commentBtn.textContent.match(/\d+/)[0]) + 1;
    commentBtn.textContent = `💬 ${count}`;
  }
}

function showToast(message) {
  // Implement toast notification...
}

// Connect on page load
document.addEventListener('DOMContentLoaded', connectWebSocket);
```

---

## Auth Guard (Protect Pages)

Add this to any page that requires login:

```javascript
// ============================================
// AUTH GUARD - Add to protected pages
// ============================================

(function authGuard() {
  if (!localStorage.getItem('simplylouie_token')) {
    window.location.href = '/login.html';
  }
})();
```

---

## Complete Example: Login Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Log In – SimplyLouie</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <!-- Your existing styles -->
</head>
<body>
  <div class="page">
    <h1>Welcome Back</h1>
    <p>Log in to continue your journey with the $2 movement.</p>

    <form id="login-form">
      <label>Email</label>
      <input type="email" name="email" placeholder="you@example.com" required />

      <label>Password</label>
      <input type="password" name="password" placeholder="Your password" required />

      <button class="btn-primary" type="submit">Log In</button>
      <p class="error-message" style="color: red; display: none;"></p>
    </form>

    <a href="/signup.html" class="link">Don't have an account? Join for $2/month</a>
  </div>

  <script>
    const API_BASE = 'http://localhost:3000';

    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const form = e.target;
      const errorEl = form.querySelector('.error-message');
      const submitBtn = form.querySelector('button');
      
      // Disable button while loading
      submitBtn.disabled = true;
      submitBtn.textContent = 'Logging in...';
      errorEl.style.display = 'none';

      try {
        const response = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email.value,
            password: form.password.value
          })
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message);
        }

        // Store auth data
        localStorage.setItem('simplylouie_token', data.data.token);
        localStorage.setItem('simplylouie_user', JSON.stringify(data.data.user));

        // Redirect to app
        window.location.href = '/superapp.html';

      } catch (error) {
        errorEl.textContent = error.message;
        errorEl.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Log In';
      }
    });
  </script>
</body>
</html>
```

---

## Quick Reference

| Action | Method | Endpoint | Auth Required |
|--------|--------|----------|---------------|
| Register | POST | `/auth/register` | No |
| Login | POST | `/auth/login` | No |
| Logout | POST | `/auth/logout` | Yes |
| Get Profile | GET | `/user/me` | Yes |
| Update Profile | POST | `/user/update` | Yes |
| Change Password | POST | `/user/password` | Yes |
| Get Posts | GET | `/posts` | No |
| Create Post | POST | `/posts` | Yes |
| Like Post | POST | `/posts/:id/like` | Yes |
| Add Comment | POST | `/posts/:id/comment` | Yes |
| Get Comments | GET | `/posts/:id/comments` | No |
| Get Billing | GET | `/billing/status` | Yes |
| Update Card | POST | `/billing/update-card` | Yes |
| Cancel | POST | `/billing/cancel` | Yes |
| Get Settings | GET | `/settings` | Yes |
| Update Theme | POST | `/settings/theme` | Yes |

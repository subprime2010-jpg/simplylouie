/**
 * SIMPLYLOUIE API CLIENT
 * Include this file in any HTML page: <script src="api.js"></script>
 */

const SimplyLouie = (function() {
  const API_BASE = 'http://localhost:3000';
  
  // TOKEN & USER STORAGE
  function getToken() {
    return localStorage.getItem('simplylouie_token');
  }

  function setToken(token) {
    localStorage.setItem('simplylouie_token', token);
  }

  function clearToken() {
    localStorage.removeItem('simplylouie_token');
    localStorage.removeItem('simplylouie_user');
  }

  function setUser(user) {
    localStorage.setItem('simplylouie_user', JSON.stringify(user));
  }

  function getUser() {
    const data = localStorage.getItem('simplylouie_user');
    return data ? JSON.parse(data) : null;
  }

  function isLoggedIn() {
    return !!getToken();
  }

  // API REQUEST HELPER
  async function request(endpoint, options) {
    options = options || {};
    const token = getToken();
    
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }
    
    Object.assign(headers, options.headers || {});
    options.headers = headers;

    const response = await fetch(API_BASE + endpoint, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  }

  // AUTH
  async function register(email, password, name, country) {
    const result = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password, name: name, country: country })
    });
    setToken(result.data.token);
    setUser(result.data.user);
    return result.data;
  }

  async function login(email, password) {
    const result = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password })
    });
    setToken(result.data.token);
    setUser(result.data.user);
    return result.data;
  }

  async function logout() {
    try {
      await request('/auth/logout', { method: 'POST' });
    } finally {
      clearToken();
    }
  }

  // USER
  async function getProfile() {
    const result = await request('/user/me');
    setUser(result.data);
    return result.data;
  }

  async function updateProfile(data) {
    const result = await request('/user/update', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    setUser(result.data);
    return result.data;
  }

  async function changePassword(oldPassword, newPassword) {
    return await request('/user/password', {
      method: 'POST',
      body: JSON.stringify({ old_password: oldPassword, new_password: newPassword })
    });
  }

  // POSTS
  async function getPosts(limit, offset) {
    limit = limit || 20;
    offset = offset || 0;
    const result = await request('/posts?limit=' + limit + '&offset=' + offset);
    return result.data;
  }

  async function createPost(content) {
    const result = await request('/posts', {
      method: 'POST',
      body: JSON.stringify({ content: content })
    });
    return result.data;
  }

  async function likePost(postId) {
    const result = await request('/posts/' + postId + '/like', { method: 'POST' });
    return result.data;
  }

  async function addComment(postId, content) {
    const result = await request('/posts/' + postId + '/comment', {
      method: 'POST',
      body: JSON.stringify({ content: content })
    });
    return result.data;
  }

  async function getComments(postId) {
    const result = await request('/posts/' + postId + '/comments');
    return result.data;
  }

  // BILLING
  async function getBillingStatus() {
    const result = await request('/billing/status');
    return result.data;
  }

  async function updateCard(paymentMethodId) {
    return await request('/billing/update-card', {
      method: 'POST',
      body: JSON.stringify({ payment_method_id: paymentMethodId })
    });
  }

  async function cancelMembership() {
    return await request('/billing/cancel', { method: 'POST' });
  }

  // SETTINGS
  async function getSettings() {
    const result = await request('/settings');
    return result.data;
  }

  async function updateTheme(theme) {
    await request('/settings/theme', {
      method: 'POST',
      body: JSON.stringify({ theme: theme })
    });
    localStorage.setItem('simplylouie_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  // WEBSOCKET
  var ws = null;
  var wsCallbacks = {};

  function connectRealtime(callbacks) {
    wsCallbacks = callbacks || {};
    var token = getToken();
    var wsUrl = 'ws://localhost:3000/ws';
    if (token) wsUrl += '?token=' + token;
    
    ws = new WebSocket(wsUrl);

    ws.onopen = function() {
      console.log('[SimplyLouie] Realtime connected');
      if (wsCallbacks.onConnect) wsCallbacks.onConnect();
    };

    ws.onmessage = function(event) {
      var message = JSON.parse(event.data);
      if (wsCallbacks.onMessage) wsCallbacks.onMessage(message);
    };

    ws.onclose = function() {
      console.log('[SimplyLouie] Realtime disconnected');
      if (wsCallbacks.onDisconnect) wsCallbacks.onDisconnect();
      setTimeout(function() { connectRealtime(wsCallbacks); }, 3000);
    };

    ws.onerror = function(error) {
      console.error('[SimplyLouie] Realtime error:', error);
    };

    return ws;
  }

  function disconnectRealtime() {
    if (ws) {
      ws.close();
      ws = null;
    }
  }

  // UTILITIES
  function requireAuth() {
    if (!isLoggedIn()) {
      window.location.href = '/login.html';
      return false;
    }
    return true;
  }

  function applyTheme() {
    var theme = localStorage.getItem('simplylouie_theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }

  // Apply theme immediately
  applyTheme();

  // PUBLIC API
  return {
    register: register,
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn,
    requireAuth: requireAuth,
    getUser: getUser,
    getProfile: getProfile,
    updateProfile: updateProfile,
    changePassword: changePassword,
    getPosts: getPosts,
    createPost: createPost,
    likePost: likePost,
    addComment: addComment,
    getComments: getComments,
    getBillingStatus: getBillingStatus,
    updateCard: updateCard,
    cancelMembership: cancelMembership,
    getSettings: getSettings,
    updateTheme: updateTheme,
    applyTheme: applyTheme,
    connectRealtime: connectRealtime,
    disconnectRealtime: disconnectRealtime
  };
})();

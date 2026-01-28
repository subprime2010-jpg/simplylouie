/**
 * SimplyLouie API Client
 * Handles all API communication with the backend
 */

const SimplyLouieAPI = (function() {
    'use strict';

    // Configuration
    const API_BASE = window.location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : 'https://api.simplylouie.com';

    const TOKEN_KEY = 'simplylouie_token';
    const USER_KEY = 'simplylouie_user';

    // ============================================
    // TOKEN MANAGEMENT
    // ============================================

    function getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    function setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    function removeToken() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }

    function getUser() {
        const data = localStorage.getItem(USER_KEY);
        return data ? JSON.parse(data) : null;
    }

    function setUser(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    function isAuthenticated() {
        return !!getToken();
    }

    // ============================================
    // HTTP CLIENT
    // ============================================

    async function request(endpoint, options = {}) {
        const url = `${API_BASE}${endpoint}`;

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    function get(endpoint) {
        return request(endpoint, { method: 'GET' });
    }

    function post(endpoint, body) {
        return request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    function put(endpoint, body) {
        return request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }

    function del(endpoint) {
        return request(endpoint, { method: 'DELETE' });
    }

    // ============================================
    // AUTH ENDPOINTS
    // ============================================

    async function register(data) {
        const response = await post('/api/auth/register', data);
        if (response.success && response.data.token) {
            setToken(response.data.token);
            setUser(response.data.user);
        }
        return response;
    }

    async function login(email, password) {
        const response = await post('/api/auth/login', { email, password });
        if (response.success && response.data.token) {
            setToken(response.data.token);
            setUser(response.data.user);
        }
        return response;
    }

    async function logout() {
        try {
            await post('/api/auth/logout', {});
        } catch (e) {
            // Ignore errors on logout
        }
        removeToken();
    }

    async function forgotPassword(email) {
        return post('/api/auth/forgot-password', { email });
    }

    async function resetPassword(token, password) {
        return post('/api/auth/reset-password', { token, password });
    }

    // ============================================
    // USER ENDPOINTS
    // ============================================

    async function getProfile() {
        const response = await get('/api/user/profile');
        if (response.success) {
            setUser(response.data);
        }
        return response;
    }

    async function updateProfile(data) {
        const response = await put('/api/user/profile', data);
        if (response.success) {
            setUser(response.data);
        }
        return response;
    }

    async function changePassword(currentPassword, newPassword) {
        return put('/api/user/password', { currentPassword, newPassword });
    }

    async function updateTheme(theme) {
        return put('/api/user/theme', { theme });
    }

    // ============================================
    // BILLING ENDPOINTS
    // ============================================

    async function getBillingStatus() {
        return get('/api/user/billing');
    }

    async function createCheckoutSession() {
        return post('/api/billing/create-checkout', {});
    }

    async function cancelSubscription() {
        return post('/api/billing/cancel', {});
    }

    async function resumeSubscription() {
        return post('/api/billing/resume', {});
    }

    // ============================================
    // COMMUNITY ENDPOINTS
    // ============================================

    async function getPosts(page = 1, limit = 20) {
        return get(`/api/posts?page=${page}&limit=${limit}`);
    }

    async function getPost(postId) {
        return get(`/api/posts/${postId}`);
    }

    async function createPost(content) {
        return post('/api/posts', { content });
    }

    async function deletePost(postId) {
        return del(`/api/posts/${postId}`);
    }

    async function likePost(postId) {
        return post(`/api/posts/${postId}/like`, {});
    }

    async function unlikePost(postId) {
        return del(`/api/posts/${postId}/like`);
    }

    async function getComments(postId) {
        return get(`/api/posts/${postId}/comments`);
    }

    async function addComment(postId, content) {
        return post(`/api/posts/${postId}/comments`, { content });
    }

    async function deleteComment(postId, commentId) {
        return del(`/api/posts/${postId}/comments/${commentId}`);
    }

    // ============================================
    // HEALTH CHECK
    // ============================================

    async function healthCheck() {
        try {
            const response = await get('/health');
            return response.success;
        } catch {
            return false;
        }
    }

    // ============================================
    // PUBLIC API
    // ============================================

    return {
        // Token Management
        getToken,
        setToken,
        removeToken,
        getUser,
        setUser,
        isAuthenticated,

        // Auth
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,

        // User
        getProfile,
        updateProfile,
        changePassword,
        updateTheme,

        // Billing
        getBillingStatus,
        createCheckoutSession,
        cancelSubscription,
        resumeSubscription,

        // Community
        getPosts,
        getPost,
        createPost,
        deletePost,
        likePost,
        unlikePost,
        getComments,
        addComment,
        deleteComment,

        // Health
        healthCheck
    };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimplyLouieAPI;
}

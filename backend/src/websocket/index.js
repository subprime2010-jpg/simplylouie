/**
 * WebSocket Server
 * Real-time updates for posts, likes, comments
 */

const { WebSocketServer } = require('ws');
const jwt = require('jsonwebtoken');
const config = require('../config');

let wss = null;
const clients = new Map(); // Map of ws -> user data

/**
 * Initialize WebSocket server
 */
function initWebSocket(server) {
  wss = new WebSocketServer({
    server,
    path: '/ws'
  });

  wss.on('connection', handleConnection);

  // Heartbeat interval
  setInterval(() => {
    wss.clients.forEach(ws => {
      if (ws.isAlive === false) {
        clients.delete(ws);
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  console.log('✅ WebSocket server initialized');

  return wss;
}

/**
 * Handle new WebSocket connection
 */
function handleConnection(ws, req) {
  ws.isAlive = true;

  // Try to authenticate from query string
  const url = new URL(req.url, `http://${req.headers.host}`);
  const token = url.searchParams.get('token');

  let userData = { authenticated: false };

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      userData = { authenticated: true, userId: decoded.userId };
    } catch (e) {
      // Invalid token, continue as anonymous
    }
  }

  clients.set(ws, userData);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'CONNECTED',
    data: {
      message: 'Connected to SimplyLouie real-time feed',
      authenticated: userData.authenticated
    }
  }));

  // Handle pong
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  // Handle messages
  ws.on('message', (data) => {
    handleMessage(ws, data);
  });

  // Handle close
  ws.on('close', () => {
    clients.delete(ws);
  });

  // Handle error
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
}

/**
 * Handle incoming WebSocket messages
 */
function handleMessage(ws, data) {
  try {
    const message = JSON.parse(data);

    switch (message.type) {
      case 'AUTHENTICATE':
        // Authenticate connection with token
        if (message.token) {
          try {
            const decoded = jwt.verify(message.token, config.jwt.secret);
            clients.set(ws, { authenticated: true, userId: decoded.userId });
            ws.send(JSON.stringify({
              type: 'AUTHENTICATED',
              data: { success: true }
            }));
          } catch (e) {
            ws.send(JSON.stringify({
              type: 'AUTHENTICATED',
              data: { success: false, message: 'Invalid token' }
            }));
          }
        }
        break;

      case 'PING':
        ws.send(JSON.stringify({ type: 'PONG' }));
        break;

      case 'SUBSCRIBE':
        // Subscribe to specific post updates
        const userData = clients.get(ws);
        if (userData) {
          userData.subscriptions = userData.subscriptions || [];
          if (message.postId) {
            userData.subscriptions.push(message.postId);
          }
        }
        break;

      default:
        // Unknown message type
        break;
    }
  } catch (e) {
    // Invalid JSON, ignore
  }
}

/**
 * Broadcast message to all connected clients
 */
function broadcast(message, filter = null) {
  if (!wss) return;

  const data = JSON.stringify(message);

  wss.clients.forEach(client => {
    if (client.readyState === 1) { // WebSocket.OPEN
      // Apply filter if provided
      if (filter) {
        const userData = clients.get(client);
        if (!filter(userData)) return;
      }

      client.send(data);
    }
  });
}

/**
 * Send message to specific user
 */
function sendToUser(userId, message) {
  if (!wss) return;

  const data = JSON.stringify(message);

  clients.forEach((userData, ws) => {
    if (userData.userId === userId && ws.readyState === 1) {
      ws.send(data);
    }
  });
}

/**
 * Get connected client count
 */
function getClientCount() {
  return wss ? wss.clients.size : 0;
}

/**
 * Get authenticated client count
 */
function getAuthenticatedCount() {
  let count = 0;
  clients.forEach(userData => {
    if (userData.authenticated) count++;
  });
  return count;
}

module.exports = {
  initWebSocket,
  broadcast,
  sendToUser,
  getClientCount,
  getAuthenticatedCount
};

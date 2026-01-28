/**
 * SimplyLouie API - Entry Point
 * People over profits. Change from the bottom up.
 */

require('dotenv').config();

const http = require('http');
const app = require('./app');
const { initWebSocket } = require('./websocket');
const { initDatabase } = require('./database');
const config = require('./config');

// Initialize database
initDatabase();

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket
initWebSocket(server);

// Start server
server.listen(config.port, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🐕 SimplyLouie API Server                           ║
║                                                       ║
║   Environment: ${config.env.padEnd(38)}║
║   HTTP:        http://localhost:${String(config.port).padEnd(22)}║
║   WebSocket:   ws://localhost:${String(config.port).padEnd(24)}║
║                                                       ║
║   People over profits. Change from the bottom up.     ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
const shutdown = () => {
  console.log('\n🛑 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

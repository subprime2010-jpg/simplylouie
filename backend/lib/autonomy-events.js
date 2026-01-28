/**
 * LOUIE Autonomy Event Buffers
 * Global event storage for monitoring, chaos, and recovery events
 * With SQLite persistence
 */

let db = null;
let saveStmt = null;

// Initialize with database connection
function init(database) {
  db = database;
  saveStmt = db.prepare(`
    INSERT INTO autonomy_events (type, module, payload, ts)
    VALUES (?, ?, ?, ?)
  `);
}

// GLOBAL EVENT BUFFERS (in-memory cache)
global.LOUIE_ALERTS = global.LOUIE_ALERTS || [];
global.LOUIE_DIFFS = global.LOUIE_DIFFS || [];
global.LOUIE_RECOVERY_EVENTS = global.LOUIE_RECOVERY_EVENTS || [];
global.LOUIE_CHAOS_EVENTS = global.LOUIE_CHAOS_EVENTS || [];
global.LOUIE_LOAD_EVENTS = global.LOUIE_LOAD_EVENTS || [];

const MAX_EVENTS = 100;

// Persist event to database
function saveAutonomyEvent(type, module, payload) {
  if (!db || !saveStmt) return;
  try {
    saveStmt.run(type, module, JSON.stringify(payload), Date.now());
  } catch (err) {
    console.error('Failed to save autonomy event:', err);
  }
}

// PUSH HELPERS
function pushAlert(msg) {
  const event = { msg, ts: Date.now() };
  global.LOUIE_ALERTS.push(event);
  if (global.LOUIE_ALERTS.length > MAX_EVENTS) {
    global.LOUIE_ALERTS.shift();
  }
  saveAutonomyEvent('alert', null, { msg });
}

function pushDiff(module, diff) {
  const event = { module, diff, ts: Date.now() };
  global.LOUIE_DIFFS.push(event);
  if (global.LOUIE_DIFFS.length > MAX_EVENTS) {
    global.LOUIE_DIFFS.shift();
  }
  saveAutonomyEvent('diff', module, { diff });
}

function pushRecovery(module, result) {
  const event = { module, result, ts: Date.now() };
  global.LOUIE_RECOVERY_EVENTS.push(event);
  if (global.LOUIE_RECOVERY_EVENTS.length > MAX_EVENTS) {
    global.LOUIE_RECOVERY_EVENTS.shift();
  }
  saveAutonomyEvent('recovery', module, { result });
}

function pushChaos(module, action) {
  const event = { module, action, ts: Date.now() };
  global.LOUIE_CHAOS_EVENTS.push(event);
  if (global.LOUIE_CHAOS_EVENTS.length > MAX_EVENTS) {
    global.LOUIE_CHAOS_EVENTS.shift();
  }
  saveAutonomyEvent('chaos', module, { action });
}

function pushLoad(burst) {
  const event = { burst, ts: Date.now() };
  global.LOUIE_LOAD_EVENTS.push(event);
  if (global.LOUIE_LOAD_EVENTS.length > MAX_EVENTS) {
    global.LOUIE_LOAD_EVENTS.shift();
  }
  saveAutonomyEvent('load', null, { burst });
}

// GETTERS (from memory)
function getAlerts(limit = 50) {
  return global.LOUIE_ALERTS.slice(-limit);
}

function getDiffs(limit = 50) {
  return global.LOUIE_DIFFS.slice(-limit);
}

function getRecoveryEvents(limit = 50) {
  return global.LOUIE_RECOVERY_EVENTS.slice(-limit);
}

function getChaosEvents(limit = 50) {
  return global.LOUIE_CHAOS_EVENTS.slice(-limit);
}

function getLoadEvents(limit = 50) {
  return global.LOUIE_LOAD_EVENTS.slice(-limit);
}

// GET FROM DATABASE (historical)
function getPersistedEvents(type, limit = 100) {
  if (!db) return [];
  try {
    const stmt = db.prepare(`
      SELECT * FROM autonomy_events
      WHERE type = ?
      ORDER BY ts DESC
      LIMIT ?
    `);
    return stmt.all(type, limit).map(row => ({
      id: row.id,
      type: row.type,
      module: row.module,
      payload: JSON.parse(row.payload || '{}'),
      ts: row.ts
    }));
  } catch (err) {
    console.error('Failed to get persisted events:', err);
    return [];
  }
}

function getAllPersistedEvents(limit = 100) {
  if (!db) return [];
  try {
    const stmt = db.prepare(`
      SELECT * FROM autonomy_events
      ORDER BY ts DESC
      LIMIT ?
    `);
    return stmt.all(limit).map(row => ({
      id: row.id,
      type: row.type,
      module: row.module,
      payload: JSON.parse(row.payload || '{}'),
      ts: row.ts
    }));
  } catch (err) {
    console.error('Failed to get all persisted events:', err);
    return [];
  }
}

// CLEAR HELPERS
function clearMemory() {
  global.LOUIE_ALERTS = [];
  global.LOUIE_DIFFS = [];
  global.LOUIE_RECOVERY_EVENTS = [];
  global.LOUIE_CHAOS_EVENTS = [];
  global.LOUIE_LOAD_EVENTS = [];
}

function clearPersisted(olderThanMs = 7 * 24 * 60 * 60 * 1000) {
  if (!db) return;
  try {
    const cutoff = Date.now() - olderThanMs;
    db.prepare('DELETE FROM autonomy_events WHERE ts < ?').run(cutoff);
  } catch (err) {
    console.error('Failed to clear persisted events:', err);
  }
}

// EXPORT
module.exports = {
  init,
  pushAlert,
  pushDiff,
  pushRecovery,
  pushChaos,
  pushLoad,
  getAlerts,
  getDiffs,
  getRecoveryEvents,
  getChaosEvents,
  getLoadEvents,
  getPersistedEvents,
  getAllPersistedEvents,
  clearMemory,
  clearPersisted
};

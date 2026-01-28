# Post-Launch Monitoring & Maintenance Blueprint
## SimplyLouie Operational Excellence

---

## 1. Monitoring Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MONITORING STACK                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ UptimeRobot  │  │   Sentry     │  │  Papertrail  │       │
│  │  (Uptime)    │  │  (Errors)    │  │   (Logs)     │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│         │                 │                 │                │
│         └─────────────────┼─────────────────┘                │
│                           │                                  │
│                    ┌──────▼───────┐                          │
│                    │   Alerts     │                          │
│                    │ (Slack/SMS)  │                          │
│                    └──────────────┘                          │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │           SimplyLouie Admin Dashboard            │       │
│  │              (louiesystem.com)                   │       │
│  │  - System Health    - User Metrics               │       │
│  │  - Intelligence     - Financials                 │       │
│  │  - Killswitches     - Feature Toggles            │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Monitoring Tools Setup

### 2.1 UptimeRobot (Free Tier)
**Purpose:** Uptime and availability monitoring

```
Monitors to Create:
1. simplylouie.com - Homepage
   - Type: HTTP(s)
   - URL: https://simplylouie.com
   - Interval: 5 minutes
   - Alert: Email + Slack

2. API Health Check
   - Type: HTTP(s)
   - URL: https://api.simplylouie.com/health
   - Interval: 5 minutes
   - Expected: {"status":"healthy"}

3. Admin Dashboard
   - Type: HTTP(s)
   - URL: https://louiesystem.com
   - Interval: 5 minutes

4. WebSocket Endpoint
   - Type: Port
   - URL: ws.simplylouie.com:443
   - Interval: 5 minutes
```

### 2.2 Sentry (Error Tracking)
**Purpose:** Real-time error detection and debugging

```javascript
// Add to server.js
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
});

// Error handler middleware
app.use(Sentry.Handlers.errorHandler());
```

Alert Rules:
- New error type → Immediate alert
- Error spike (10+ in 5 min) → Immediate alert
- Unhandled rejection → Immediate alert

### 2.3 Log Aggregation
**Purpose:** Centralized log management

PM2 logs with Papertrail:
```bash
# Install papertrail remote_syslog
wget https://github.com/papertrail/remote_syslog2/releases/download/v0.21/remote_syslog_linux_amd64.tar.gz
tar xzf remote_syslog_linux_amd64.tar.gz

# Configure /etc/log_files.yml
files:
  - /var/log/simplylouie/*.log
destination:
  host: logs.papertrailapp.com
  port: YOUR_PORT
  protocol: tls
```

---

## 3. Health Check Endpoints

### Built-in Endpoints
```
GET /health
Response: { "status": "healthy", "timestamp": "..." }

GET /api/claude/status
Response: { "success": true, "data": { "status": "operational", "version": "1.0.0" } }

GET /admin/metrics/system (Authenticated)
Response: {
  "success": true,
  "data": {
    "uptime": 86400,
    "memory": { "used": 512, "total": 4096 },
    "cpu": 15,
    "activeConnections": 42,
    "requestsPerMinute": 150
  }
}
```

### Custom Health Script
```bash
#!/bin/bash
# /opt/scripts/health-check.sh

API_STATUS=$(curl -s https://api.simplylouie.com/health | jq -r '.status')
DB_CONN=$(psql -U simplylouie -c "SELECT 1" -t 2>/dev/null)

if [ "$API_STATUS" != "healthy" ] || [ -z "$DB_CONN" ]; then
    echo "CRITICAL: Health check failed"
    # Send alert
    curl -X POST "https://hooks.slack.com/services/xxx" \
        -d '{"text":"SimplyLouie health check failed!"}'
    exit 1
fi

echo "OK: All systems operational"
exit 0
```

---

## 4. Alert Configuration

### Alert Tiers

| Tier | Severity | Response Time | Examples |
|------|----------|---------------|----------|
| P1 | Critical | 15 minutes | Site down, payment failures, data breach |
| P2 | High | 1 hour | Error rate > 5%, slow responses |
| P3 | Medium | 4 hours | Single endpoint issues, minor bugs |
| P4 | Low | 24 hours | Performance degradation, warnings |

### Alert Channels
```
P1 Alerts:
- Phone call (PagerDuty/Twilio)
- SMS
- Slack #alerts-critical
- Email

P2 Alerts:
- Slack #alerts-high
- Email

P3/P4 Alerts:
- Slack #alerts-general
```

### Slack Integration
```bash
# Create webhook at: https://api.slack.com/messaging/webhooks

# Alert script
send_alert() {
    local severity=$1
    local message=$2
    local channel=$3

    curl -X POST "https://hooks.slack.com/services/xxx" \
        -H "Content-Type: application/json" \
        -d "{
            \"channel\": \"$channel\",
            \"username\": \"SimplyLouie Alerts\",
            \"icon_emoji\": \":dog:\",
            \"text\": \"[$severity] $message\"
        }"
}
```

---

## 5. Performance Metrics

### Key Performance Indicators (KPIs)

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| Uptime | 99.9% | < 99.5% | < 99% |
| API Response Time (p50) | < 200ms | > 500ms | > 1000ms |
| API Response Time (p99) | < 1000ms | > 2000ms | > 5000ms |
| Error Rate | < 0.1% | > 1% | > 5% |
| Database Query Time | < 50ms | > 100ms | > 500ms |
| Memory Usage | < 70% | > 85% | > 95% |
| CPU Usage | < 50% | > 80% | > 95% |
| Active WebSocket Connections | N/A | > 1000 | > 5000 |

### PM2 Metrics Dashboard
```bash
# Real-time monitoring
pm2 monit

# Metrics summary
pm2 show simplylouie-api

# Memory usage over time
pm2 list
```

### Custom Metrics Collection
```javascript
// Add to server.js
const metrics = {
  requestCount: 0,
  errorCount: 0,
  responseTimeSum: 0,
};

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    metrics.requestCount++;
    metrics.responseTimeSum += Date.now() - start;
    if (res.statusCode >= 500) metrics.errorCount++;
  });
  next();
});

// Expose metrics endpoint
app.get('/metrics', adminAuth, (req, res) => {
  res.json({
    requests: metrics.requestCount,
    errors: metrics.errorCount,
    avgResponseTime: metrics.responseTimeSum / metrics.requestCount,
  });
});
```

---

## 6. Maintenance Procedures

### 6.1 Daily Tasks
```
□ Check monitoring dashboards (5 min)
□ Review error logs in Sentry (10 min)
□ Verify backup completed (2 min)
□ Check Stripe webhook delivery (5 min)
```

### 6.2 Weekly Tasks
```
□ Review performance metrics trends
□ Analyze user growth and engagement
□ Review and rotate logs
□ Security scan review
□ Database optimization check
□ Dependency security audit (npm audit)
```

### 6.3 Monthly Tasks
```
□ Full security audit
□ Performance load testing
□ Backup restoration test
□ SSL certificate expiry check
□ Update dependencies (minor versions)
□ Review and update documentation
□ Cost optimization review
```

### 6.4 Quarterly Tasks
```
□ Major dependency updates
□ Infrastructure review and scaling assessment
□ Disaster recovery drill
□ Security penetration testing
□ Compliance review
```

---

## 7. Incident Response

### Incident Severity Definitions

**SEV-1 (Critical):** Complete outage, payment processing down, data breach
**SEV-2 (Major):** Partial outage, significant feature broken, performance degradation
**SEV-3 (Minor):** Minor feature broken, isolated errors
**SEV-4 (Low):** Cosmetic issues, minor inconveniences

### Incident Response Workflow
```
1. DETECT
   └─→ Alert received
   └─→ User report
   └─→ Monitoring trigger

2. TRIAGE (< 5 min for SEV-1/2)
   └─→ Assess severity
   └─→ Identify affected systems
   └─→ Notify stakeholders

3. DIAGNOSE (< 15 min for SEV-1)
   └─→ Check logs: pm2 logs simplylouie-api
   └─→ Check metrics: pm2 monit
   └─→ Check database: psql simplylouie
   └─→ Check external services: Stripe status

4. MITIGATE
   └─→ Apply fix or rollback
   └─→ Enable killswitch if needed
   └─→ Scale resources if needed

5. RESOLVE
   └─→ Verify fix in production
   └─→ Monitor for recurrence
   └─→ Update status page

6. POST-MORTEM (within 48 hours)
   └─→ Document timeline
   └─→ Identify root cause
   └─→ Define preventive measures
   └─→ Update runbooks
```

### Rollback Commands
```bash
# Application rollback
pm2 stop simplylouie-api
cd /var/www/simplylouie
git checkout HEAD~1
cd backend && npm ci --production
pm2 start simplylouie-api

# Feature disable (via admin dashboard or API)
curl -X POST https://louiesystem.com/admin/toggles \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"feature":"problematic_feature","enabled":false}'

# Emergency killswitch
curl -X POST https://louiesystem.com/admin/killswitch \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"target":"feature_name","action":"disable","reason":"Emergency"}'
```

---

## 8. Backup & Recovery

### Backup Schedule
| Data | Frequency | Retention | Location |
|------|-----------|-----------|----------|
| Database | Every 6 hours | 30 days | S3 + local |
| Uploads | Daily | 90 days | S3 |
| Logs | Weekly | 90 days | S3 |
| Config | On change | Forever | Git |

### Backup Scripts
```bash
# /opt/scripts/backup-db.sh
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="/backups/db/simplylouie_${TIMESTAMP}.sql.gz"

pg_dump simplylouie | gzip > "$BACKUP_FILE"

# Upload to S3
aws s3 cp "$BACKUP_FILE" s3://simplylouie-backups/db/

# Cleanup old local backups (keep 7 days)
find /backups/db -name "*.sql.gz" -mtime +7 -delete

echo "Backup completed: $BACKUP_FILE"
```

### Recovery Procedures
```bash
# List available backups
aws s3 ls s3://simplylouie-backups/db/

# Download specific backup
aws s3 cp s3://simplylouie-backups/db/simplylouie_YYYYMMDD_HHMMSS.sql.gz /tmp/

# Restore database
pm2 stop simplylouie-api
gunzip < /tmp/simplylouie_YYYYMMDD_HHMMSS.sql.gz | psql simplylouie
pm2 start simplylouie-api
```

---

## 9. Security Monitoring

### Log Monitoring Patterns
```bash
# Watch for failed logins
grep "Login failed" /var/log/simplylouie/out.log | tail -20

# Watch for rate limiting
grep "Rate limit exceeded" /var/log/simplylouie/out.log

# Watch for suspicious activity
grep -E "(SQL|XSS|injection)" /var/log/simplylouie/out.log
```

### Security Alerts
- 5+ failed logins from same IP → Block IP
- Rate limit exceeded 3x → Review access pattern
- Admin login from new IP → SMS verification
- Suspicious query patterns → Immediate investigation

### Weekly Security Audit
```bash
# Check for dependency vulnerabilities
cd /var/www/simplylouie/backend
npm audit

# Check for exposed sensitive files
curl -I https://simplylouie.com/.env
curl -I https://simplylouie.com/.git

# Verify SSL configuration
curl -I https://simplylouie.com | grep -i "strict-transport-security"
```

---

## 10. Runbook Quick Reference

### Common Issues and Solutions

| Issue | Diagnosis | Solution |
|-------|-----------|----------|
| High memory usage | `pm2 monit` | `pm2 restart simplylouie-api` |
| Database connection errors | Check PostgreSQL: `systemctl status postgresql` | `systemctl restart postgresql` |
| SSL certificate expired | `certbot certificates` | `certbot renew` |
| Stripe webhooks failing | Check Stripe dashboard | Update webhook secret |
| WebSocket disconnections | Check nginx config | Increase proxy_read_timeout |
| Slow API responses | Check database queries | Add indexes, optimize queries |
| Disk space low | `df -h` | Clean logs, old backups |

### Emergency Commands
```bash
# Restart everything
pm2 restart all

# Full system status
pm2 list && systemctl status postgresql nginx

# Quick health check
curl -s https://simplylouie.com/health | jq

# View recent errors
pm2 logs simplylouie-api --lines 50 --err

# Check system resources
htop
df -h
free -m
```

---

*People over profits. Change from the bottom up.*

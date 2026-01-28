# SimplyLouie Deployment & Integration Plan
## louiesystem.com Production Deployment

---

## 1. Infrastructure Architecture

### Production Stack
```
┌─────────────────────────────────────────────────────────────┐
│                      CLOUDFLARE CDN                          │
│                  (DDoS Protection, SSL)                      │
└─────────────────────────────────┬───────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────┐
│                    LOAD BALANCER                             │
│              (nginx or cloud LB)                             │
└────────────┬────────────────────────────────┬───────────────┘
             │                                │
┌────────────▼────────────┐    ┌─────────────▼────────────────┐
│    APP SERVER 1         │    │      APP SERVER 2            │
│  (Node.js + Express)    │    │   (Node.js + Express)        │
│  - API Routes           │    │   - API Routes               │
│  - WebSocket            │    │   - WebSocket                │
│  - Admin Routes         │    │   - Admin Routes             │
└────────────┬────────────┘    └─────────────┬────────────────┘
             │                                │
             └────────────┬───────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    SHARED SERVICES                           │
├─────────────────┬───────────────────┬───────────────────────┤
│   PostgreSQL    │      Redis        │      S3/Minio         │
│  (Primary DB)   │  (Sessions/Cache) │  (File Storage)       │
└─────────────────┴───────────────────┴───────────────────────┘
```

### Domain Configuration
- **simplylouie.com** - Main app (user-facing)
- **louiesystem.com** - Admin dashboard (founder-only)
- **api.simplylouie.com** - API endpoints
- **ws.simplylouie.com** - WebSocket connections

---

## 2. Server Requirements

### Minimum Production Specs
| Component | Specification |
|-----------|---------------|
| CPU | 2 vCPU (4 recommended) |
| RAM | 4 GB (8 GB recommended) |
| Storage | 50 GB SSD |
| Network | 1 Gbps |
| OS | Ubuntu 22.04 LTS |

### Recommended Providers
1. **DigitalOcean** - Simple, affordable ($24-48/mo)
2. **Linode** - Good performance ($20-40/mo)
3. **Vultr** - Global regions ($20-40/mo)
4. **Railway.app** - Easy deployment ($20-50/mo)
5. **Render** - Auto-scaling ($25-75/mo)

---

## 3. Pre-Deployment Checklist

### Environment Setup
```bash
# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
npm install -g pm2

# Install nginx
sudo apt-get install -y nginx

# Install certbot for SSL
sudo apt-get install -y certbot python3-certbot-nginx
```

### Database Migration (SQLite to PostgreSQL)
```bash
# Install PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql << EOF
CREATE USER simplylouie WITH PASSWORD 'your_secure_password';
CREATE DATABASE simplylouie OWNER simplylouie;
GRANT ALL PRIVILEGES ON DATABASE simplylouie TO simplylouie;
EOF
```

### Environment Variables
Create `/root/simplylouie/backend/.env.production`:
```env
# Server
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://simplylouie:password@localhost:5432/simplylouie

# JWT
JWT_SECRET=generate_64_char_random_string_here
JWT_EXPIRES_IN=7d
ADMIN_JWT_SECRET=different_64_char_random_string

# Stripe (Production Keys)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Production)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxx
EMAIL_FROM=hello@simplylouie.com

# Redis
REDIS_URL=redis://localhost:6379

# S3 Storage
S3_BUCKET=simplylouie-uploads
S3_REGION=us-east-1
S3_ACCESS_KEY=...
S3_SECRET_KEY=...

# Security
CORS_ORIGINS=https://simplylouie.com,https://louiesystem.com
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# Admin
ADMIN_IP_WHITELIST=your.ip.here
FOUNDER_EMAIL=founder@louiesystem.com
```

---

## 4. Deployment Steps

### Step 1: Clone and Prepare
```bash
# Clone repository
cd /var/www
git clone https://github.com/simplylouie/simplylouie.git
cd simplylouie/backend

# Install dependencies
npm ci --production

# Copy environment file
cp .env.production .env
```

### Step 2: Database Setup
```bash
# Run migrations
npm run migrate

# Seed initial data (founder account)
npm run seed:founder
```

### Step 3: PM2 Configuration
Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'simplylouie-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: 'production'
    },
    error_file: '/var/log/simplylouie/error.log',
    out_file: '/var/log/simplylouie/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    max_memory_restart: '1G',
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: 10000
  }]
};
```

Start with PM2:
```bash
# Create log directory
sudo mkdir -p /var/log/simplylouie
sudo chown $USER:$USER /var/log/simplylouie

# Start application
pm2 start ecosystem.config.js --env production

# Save PM2 process list
pm2 save

# Setup PM2 startup script
pm2 startup
```

### Step 4: Nginx Configuration
Create `/etc/nginx/sites-available/simplylouie`:
```nginx
# API Server
upstream simplylouie_api {
    least_conn;
    server 127.0.0.1:3000;
}

# Main App - simplylouie.com
server {
    listen 80;
    server_name simplylouie.com www.simplylouie.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name simplylouie.com www.simplylouie.com;

    ssl_certificate /etc/letsencrypt/live/simplylouie.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/simplylouie.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    root /var/www/simplylouie/frontend;
    index index.html;

    # Static files
    location / {
        try_files $uri $uri/ /index.html;
        expires 1d;
        add_header Cache-Control "public, immutable";
    }

    # API proxy
    location /api/ {
        proxy_pass http://simplylouie_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
    }

    # WebSocket
    location /ws {
        proxy_pass http://simplylouie_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}

# Admin Dashboard - louiesystem.com
server {
    listen 80;
    server_name louiesystem.com www.louiesystem.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name louiesystem.com www.louiesystem.com;

    ssl_certificate /etc/letsencrypt/live/louiesystem.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/louiesystem.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

    # IP whitelist for admin (optional additional layer)
    # allow your.ip.address;
    # deny all;

    root /var/www/simplylouie;
    index superadmin.html;

    location / {
        try_files $uri $uri/ /superadmin.html;
    }

    # Admin API proxy
    location /admin/ {
        proxy_pass http://simplylouie_api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Security headers (stricter for admin)
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/simplylouie /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: SSL Certificates
```bash
sudo certbot --nginx -d simplylouie.com -d www.simplylouie.com
sudo certbot --nginx -d louiesystem.com -d www.louiesystem.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 5. Stripe Production Setup

### Webhook Configuration
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://api.simplylouie.com/api/stripe/webhook`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `charge.refunded`
4. Copy webhook signing secret to `.env`

### Product Setup
```bash
# Create $2/month subscription product in Stripe
stripe products create --name="SimplyLouie Membership" --description="Movement-aligned super-app access"
stripe prices create --product=prod_xxx --unit-amount=200 --currency=usd --recurring[interval]=month
```

---

## 6. DNS Configuration

### Required DNS Records
| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | YOUR_SERVER_IP | 300 |
| A | www | YOUR_SERVER_IP | 300 |
| A | api | YOUR_SERVER_IP | 300 |
| CNAME | ws | simplylouie.com | 300 |
| TXT | @ | v=spf1 include:sendgrid.net ~all | 3600 |
| TXT | _dmarc | v=DMARC1; p=reject; rua=mailto:dmarc@simplylouie.com | 3600 |

---

## 7. Monitoring Setup

### Health Check Endpoints
- `GET /health` - Basic health check
- `GET /api/claude/status` - API status
- `GET /admin/metrics/system` - System metrics (admin only)

### PM2 Monitoring
```bash
# View logs
pm2 logs simplylouie-api

# Monitor resources
pm2 monit

# View metrics
pm2 show simplylouie-api
```

### External Monitoring (Recommended)
- **UptimeRobot** - Free uptime monitoring
- **Sentry** - Error tracking
- **LogDNA/Papertrail** - Log aggregation

---

## 8. Backup Strategy

### Database Backups
```bash
# Daily PostgreSQL backup cron job
echo "0 3 * * * pg_dump simplylouie | gzip > /backups/db/simplylouie-\$(date +\%Y\%m\%d).sql.gz" | crontab -

# Retention: 30 days
find /backups/db -name "*.sql.gz" -mtime +30 -delete
```

### File Backups
```bash
# Sync uploads to S3
aws s3 sync /var/www/simplylouie/uploads s3://simplylouie-backups/uploads/
```

---

## 9. Security Hardening

### Firewall (UFW)
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Fail2Ban
```bash
sudo apt-get install -y fail2ban
sudo systemctl enable fail2ban
```

### Automatic Security Updates
```bash
sudo apt-get install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## 10. Rollback Procedure

### Quick Rollback
```bash
# Stop current version
pm2 stop simplylouie-api

# Checkout previous version
cd /var/www/simplylouie
git checkout HEAD~1

# Reinstall dependencies
cd backend && npm ci --production

# Restart
pm2 start simplylouie-api
```

### Database Rollback
```bash
# Restore from backup
gunzip < /backups/db/simplylouie-YYYYMMDD.sql.gz | psql simplylouie
```

---

## Deployment Command Summary

```bash
# Full deployment from scratch
ssh root@your-server

# 1. System setup
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs nginx certbot python3-certbot-nginx postgresql
npm install -g pm2

# 2. Clone and configure
cd /var/www
git clone https://github.com/simplylouie/simplylouie.git
cd simplylouie/backend
npm ci --production
cp .env.production .env
# Edit .env with production values

# 3. Database setup
sudo -u postgres createuser simplylouie -P
sudo -u postgres createdb simplylouie -O simplylouie
npm run migrate

# 4. Start application
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

# 5. Configure nginx
cp /var/www/simplylouie/deploy/nginx.conf /etc/nginx/sites-available/simplylouie
ln -s /etc/nginx/sites-available/simplylouie /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

# 6. SSL
certbot --nginx -d simplylouie.com -d www.simplylouie.com
certbot --nginx -d louiesystem.com -d www.louiesystem.com

# 7. Verify
curl https://simplylouie.com/health
curl https://api.simplylouie.com/api/claude/status
```

---

*People over profits. Change from the bottom up.*

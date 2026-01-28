# SimplyLouie GO-LIVE Checklist
## Pre-Launch Verification

---

## Pre-Launch (T-7 Days)

### Infrastructure
- [ ] Production server provisioned and hardened
- [ ] Domain DNS configured and propagated
- [ ] SSL certificates installed and auto-renewal configured
- [ ] Load balancer configured (if applicable)
- [ ] CDN/Cloudflare configured
- [ ] Firewall rules configured (UFW)
- [ ] Fail2Ban installed and configured

### Database
- [ ] PostgreSQL installed and configured
- [ ] Database migrations completed
- [ ] Founder account created
- [ ] Database backup strategy implemented
- [ ] Backup restoration tested

### Application
- [ ] All dependencies installed (npm ci --production)
- [ ] Environment variables configured (.env.production)
- [ ] PM2 configured with clustering
- [ ] PM2 startup script enabled
- [ ] Log rotation configured
- [ ] Static assets optimized (minified CSS/JS)

---

## Pre-Launch (T-3 Days)

### Security Audit
- [ ] All API endpoints authenticated properly
- [ ] JWT secrets are unique and secure (64+ chars)
- [ ] Admin routes protected with role="founder"
- [ ] CORS configured for production domains only
- [ ] Rate limiting enabled and tested
- [ ] SQL injection protection verified (parameterized queries)
- [ ] XSS protection headers configured
- [ ] CSRF protection implemented
- [ ] Passwords hashed with bcrypt (10+ rounds)
- [ ] Sensitive data not logged
- [ ] .env file excluded from git

### Stripe Integration
- [ ] Production Stripe keys configured
- [ ] Webhook endpoint registered in Stripe dashboard
- [ ] Webhook signature verification working
- [ ] $2/month product created in Stripe
- [ ] Test subscription flow completed
- [ ] Cancellation flow tested
- [ ] Failed payment handling tested

### Email System
- [ ] SMTP credentials configured
- [ ] Email templates reviewed
- [ ] Welcome email tested
- [ ] Password reset email tested
- [ ] Subscription confirmation email tested
- [ ] Email delivery verified (not going to spam)

---

## Pre-Launch (T-1 Day)

### Functional Testing
- [ ] User registration flow
- [ ] User login flow
- [ ] Password reset flow
- [ ] Profile update flow
- [ ] Post creation flow
- [ ] Like/unlike flow
- [ ] Comment flow
- [ ] Subscription signup flow
- [ ] Subscription cancellation flow
- [ ] Theme switching
- [ ] WebSocket real-time updates

### Admin Testing
- [ ] Admin login at louiesystem.com
- [ ] Dashboard data loading
- [ ] Financial metrics displaying
- [ ] Stripe integration panel working
- [ ] User management functions
- [ ] Feature toggles working
- [ ] Killswitch functions tested
- [ ] Document scanner working
- [ ] Intelligence section loading

### Performance Testing
- [ ] Page load times < 3 seconds
- [ ] API response times < 500ms
- [ ] WebSocket connection stable
- [ ] No memory leaks detected
- [ ] Database queries optimized
- [ ] Static asset caching working

### Mobile Testing
- [ ] Responsive design verified
- [ ] Touch interactions working
- [ ] Mobile forms usable
- [ ] No horizontal scrolling issues

---

## Launch Day (T-0)

### Final Pre-Launch (2 hours before)
- [ ] Clear all test data
- [ ] Verify production database is clean
- [ ] Check all services are running
- [ ] Verify DNS resolution
- [ ] Test SSL certificates
- [ ] Confirm monitoring is active

### Go-Live Sequence
```bash
# 1. Final deployment
cd /var/www/simplylouie
git pull origin main
cd backend && npm ci --production

# 2. Run final migrations
npm run migrate

# 3. Restart application
pm2 reload simplylouie-api

# 4. Verify health
curl https://simplylouie.com/health
curl https://api.simplylouie.com/api/claude/status

# 5. Verify admin access
curl -X POST https://louiesystem.com/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"founder@louiesystem.com","password":"YOUR_PASSWORD"}'
```

### Immediate Post-Launch (First 30 minutes)
- [ ] Verify homepage loads
- [ ] Test user registration
- [ ] Test user login
- [ ] Verify Stripe checkout
- [ ] Check admin dashboard access
- [ ] Monitor error logs: `pm2 logs simplylouie-api --lines 100`
- [ ] Check server resources: `htop`
- [ ] Verify WebSocket connections

### First Hour Monitoring
- [ ] Monitor for 5xx errors
- [ ] Watch database connections
- [ ] Check memory usage
- [ ] Verify no rate limit issues
- [ ] Monitor Stripe webhook delivery
- [ ] Check email delivery

---

## Post-Launch (T+24 Hours)

### Performance Review
- [ ] Review server metrics
- [ ] Check average response times
- [ ] Review error rate percentage
- [ ] Analyze traffic patterns
- [ ] Check database query performance

### User Feedback
- [ ] Monitor for user-reported issues
- [ ] Check social mentions
- [ ] Review support emails

### Financial Verification
- [ ] Verify Stripe payments processing
- [ ] Check subscription data in admin
- [ ] Verify revenue tracking accurate

---

## Emergency Contacts

| Role | Contact |
|------|---------|
| Primary Developer | [Your contact] |
| Server Admin | [Server admin contact] |
| Stripe Support | support.stripe.com |
| Domain Registrar | [Registrar contact] |

---

## Rollback Plan

### Quick Rollback (< 5 minutes)
```bash
# Stop current version
pm2 stop simplylouie-api

# Revert to previous commit
cd /var/www/simplylouie
git checkout HEAD~1

# Reinstall dependencies
cd backend && npm ci --production

# Restart
pm2 start simplylouie-api
```

### Full Rollback (if database changes)
```bash
# Stop application
pm2 stop simplylouie-api

# Restore database from backup
gunzip < /backups/db/simplylouie-YYYYMMDD.sql.gz | psql simplylouie

# Revert code
git checkout HEAD~1
cd backend && npm ci --production

# Restart
pm2 start simplylouie-api
```

---

## Launch Announcement Template

```
We're live! SimplyLouie is now available at simplylouie.com

Join the movement for just $2/month:
- Community posts and engagement
- Real-time updates
- Movement-aligned tech

People over profits. Change from the bottom up.

#SimplyLouie #TechForChange
```

---

## Success Metrics (First Week)

| Metric | Target |
|--------|--------|
| Uptime | > 99.5% |
| Avg Response Time | < 500ms |
| Error Rate | < 1% |
| User Signups | Track |
| Paid Subscriptions | Track |
| Churn Rate | Track |

---

*People over profits. Change from the bottom up.*

# Cron Job Configuration for Weather Alerts

## Overview

The weather alerts generation script (`backend/scripts/generate-weather-alerts.js`) should run periodically to automatically generate alerts for all active farms.

## Recommended Schedule

**Every 6 hours** (4 times per day):
- 00:00 UTC (midnight)
- 06:00 UTC (6 AM)
- 12:00 UTC (noon)
- 18:00 UTC (6 PM)

This balances:
- **Timeliness**: Alerts generated frequently enough to be useful
- **API Costs**: OpenWeatherMap API calls are limited
- **Server Load**: Reasonable frequency for processing

## Configuration Options

### Option 1: Railway Scheduled Tasks (Recommended for Production)

Railway supports scheduled tasks via `Procfile` or Railway dashboard.

**Method 1: Procfile**
```procfile
web: node server.js
worker: node scripts/generate-weather-alerts.js
```

Then configure the worker service to run on a schedule in Railway dashboard.

**Method 2: Railway Cron**
In Railway dashboard:
1. Go to your project
2. Add a new service
3. Select "Cron Job"
4. Set schedule: `0 */6 * * *` (every 6 hours)
5. Command: `node scripts/generate-weather-alerts.js`
6. Set working directory: `backend`

### Option 2: Linux Cron (Self-Hosted)

```bash
# Edit crontab
crontab -e

# Add line (runs every 6 hours)
0 */6 * * * cd /path/to/SmartFarm/backend && /usr/bin/node scripts/generate-weather-alerts.js >> /var/log/weather-alerts.log 2>&1
```

### Option 3: Node-Cron (Application-Level)

Add to `backend/server.js`:

```javascript
const cron = require('node-cron');

// Run every 6 hours
cron.schedule('0 */6 * * *', async () => {
    console.log('Running scheduled weather alerts generation...');
    try {
        const { main } = require('./scripts/generate-weather-alerts');
        await main();
    } catch (error) {
        console.error('Error in scheduled alert generation:', error);
    }
});
```

**Install node-cron**:
```bash
cd backend
npm install node-cron
```

### Option 4: GitHub Actions (CI/CD)

Create `.github/workflows/weather-alerts.yml`:

```yaml
name: Generate Weather Alerts

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:  # Allow manual trigger

jobs:
  generate-alerts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd backend
          npm install
      - name: Generate alerts
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          WEATHER_API_KEY: ${{ secrets.WEATHER_API_KEY }}
        run: |
          cd backend
          node scripts/generate-weather-alerts.js
```

## Environment Variables Required

```bash
DATABASE_URL=postgresql://user:password@host:port/database
WEATHER_API_KEY=your_openweather_api_key
NODE_ENV=production  # Optional
```

## Logging

The script logs to console. For production, redirect to log file:

```bash
node scripts/generate-weather-alerts.js >> /var/log/weather-alerts.log 2>&1
```

Or configure logging in the script:

```javascript
const fs = require('fs');
const logStream = fs.createWriteStream('/var/log/weather-alerts.log', { flags: 'a' });
console.log = (...args) => {
    const message = new Date().toISOString() + ' ' + args.join(' ') + '\n';
    logStream.write(message);
    process.stdout.write(message);
};
```

## Monitoring

### Check Last Run

```sql
-- Check last alert created
SELECT MAX(created_at) as last_alert_time 
FROM weather_alerts;

-- Check alerts created in last 24 hours
SELECT COUNT(*) as alerts_last_24h
FROM weather_alerts
WHERE created_at > NOW() - INTERVAL '24 hours';
```

### Health Check Endpoint

Add to `backend/server.js`:

```javascript
app.get('/api/weather-alerts/health', async (req, res) => {
    const dbPool = require('./utils/db-helpers').getPool();
    const result = await dbPool.query(`
        SELECT 
            MAX(created_at) as last_alert,
            COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as alerts_24h
        FROM weather_alerts
    `);
    
    res.json({
        success: true,
        lastAlert: result.rows[0].last_alert,
        alertsLast24h: result.rows[0].alerts_24h,
        cronStatus: 'active'
    });
});
```

## Testing the Cron Job

### Manual Test

```bash
cd backend
node scripts/generate-weather-alerts.js
```

**Expected Output**:
```
🌤️ Starting weather alerts generation...
Time: 2024-01-01T12:00:00.000Z
Processing weather alerts for 5 farms
Generated 3 weather alerts
✅ Weather alerts generation complete. Generated 3 alerts.
```

### Verify Results

```sql
-- Check alerts were created
SELECT 
    alert_type,
    severity,
    COUNT(*) as count
FROM weather_alerts
WHERE created_at > NOW() - INTERVAL '1 hour'
GROUP BY alert_type, severity;
```

## Troubleshooting

### Issue: Cron Job Not Running

**Check**:
1. Cron service is running: `systemctl status cron`
2. Crontab is correct: `crontab -l`
3. Logs show errors: `tail -f /var/log/weather-alerts.log`
4. Permissions: Script is executable
5. Paths: Use absolute paths in cron

### Issue: No Alerts Generated

**Check**:
1. Weather API key is set: `echo $WEATHER_API_KEY`
2. Database connection: Test `DATABASE_URL`
3. Farms have location: `SELECT id, latitude, longitude FROM farms WHERE latitude IS NOT NULL`
4. Weather API is accessible: Test API endpoint manually

### Issue: Too Many API Calls

**Solutions**:
- Increase cron interval (every 12 hours instead of 6)
- Cache weather data (already implemented in service)
- Use weather API with higher rate limits
- Process farms in batches

## Production Checklist

- [ ] Cron job configured in production environment
- [ ] Environment variables set (`DATABASE_URL`, `WEATHER_API_KEY`)
- [ ] Logging configured and monitored
- [ ] Health check endpoint accessible
- [ ] Manual test run successful
- [ ] Monitoring/alerts set up for failures
- [ ] Documentation updated with production schedule

---

## Quick Start for Production

1. **Set Environment Variables**:
   ```bash
   export DATABASE_URL="your_production_db_url"
   export WEATHER_API_KEY="your_api_key"
   ```

2. **Test Manual Run**:
   ```bash
   node backend/scripts/generate-weather-alerts.js
   ```

3. **Configure Cron** (choose one method above)

4. **Verify**:
   - Check logs after first run
   - Verify alerts in database
   - Test API endpoints return alerts

---

**Status**: Ready for production configuration! 🚀


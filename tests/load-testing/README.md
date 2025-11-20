# Load Testing Guide for SmartFarm

## Overview

This guide provides instructions for conducting load testing on the SmartFarm backend API to ensure it can handle production traffic.

## Prerequisites

- Node.js 18+ installed
- Access to staging/production API endpoint
- Load testing tool installed (see options below)

## Load Testing Tools

### Option 1: k6 (Recommended)
```bash
# Install k6
# macOS
brew install k6

# Linux
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6

# Windows
choco install k6
```

### Option 2: Artillery
```bash
npm install -g artillery
```

### Option 3: Apache JMeter
Download from: https://jmeter.apache.org/download_jmeter.cgi

## Test Scenarios

### Scenario 1: Baseline Load (100 concurrent users)
**Purpose:** Test normal operation under expected load

**Target:**
- 100 concurrent users
- 5 requests per user per minute
- Duration: 10 minutes

**Expected Results:**
- Response time < 500ms (p95)
- Error rate < 1%
- Database connections < 50

### Scenario 2: Moderate Load (500 concurrent users)
**Purpose:** Test system under moderate stress

**Target:**
- 500 concurrent users
- 5 requests per user per minute
- Duration: 15 minutes

**Expected Results:**
- Response time < 1000ms (p95)
- Error rate < 2%
- Database connections < 50
- Cache hit rate > 60%

### Scenario 3: High Load (1000 concurrent users)
**Purpose:** Test system limits

**Target:**
- 1000 concurrent users
- 5 requests per user per minute
- Duration: 20 minutes

**Expected Results:**
- Response time < 2000ms (p95)
- Error rate < 5%
- System remains stable
- No memory leaks

### Scenario 4: Spike Test
**Purpose:** Test system response to sudden traffic increase

**Target:**
- Start: 50 users
- Spike: 1000 users (instant)
- Duration: 5 minutes
- Return: 50 users

**Expected Results:**
- System recovers gracefully
- No crashes
- Response times stabilize within 2 minutes

## k6 Test Scripts

### Basic Load Test (`basic-load-test.js`)

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
    stages: [
        { duration: '2m', target: 100 },  // Ramp up to 100 users
        { duration: '5m', target: 100 },  // Stay at 100 users
        { duration: '2m', target: 200 },  // Ramp up to 200 users
        { duration: '5m', target: 200 },  // Stay at 200 users
        { duration: '2m', target: 0 },    // Ramp down to 0
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1s
        http_req_failed: ['rate<0.01'],    // Error rate should be less than 1%
        errors: ['rate<0.1'],
    },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:3000';

export default function () {
    // Health check
    let res = http.get(`${BASE_URL}/api/health`);
    check(res, {
        'health check status is 200': (r) => r.status === 200,
    }) || errorRate.add(1);

    sleep(1);

    // Simulate authenticated user requests
    const token = __ENV.AUTH_TOKEN || '';
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    // Get farms
    res = http.get(`${BASE_URL}/api/farms`, { headers });
    check(res, {
        'farms status is 200': (r) => r.status === 200,
        'farms response time < 500ms': (r) => r.timings.duration < 500,
    }) || errorRate.add(1);

    sleep(2);

    // Get crops
    res = http.get(`${BASE_URL}/api/crops?page=1&limit=20`, { headers });
    check(res, {
        'crops status is 200': (r) => r.status === 200,
        'crops has pagination': (r) => {
            const body = JSON.parse(r.body);
            return body.pagination !== undefined;
        },
    }) || errorRate.add(1);

    sleep(2);
}
```

### Stress Test (`stress-test.js`)

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 500 },
        { duration: '3m', target: 500 },
        { duration: '1m', target: 1000 },
        { duration: '3m', target: 1000 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed: ['rate<0.05'],
    },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:3000';

export default function () {
    const res = http.get(`${BASE_URL}/api/health`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}
```

### Spike Test (`spike-test.js`)

```javascript
import http from 'k6/http';
import { check } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 50 },
        { duration: '1s', target: 1000 },  // Spike!
        { duration: '30s', target: 1000 },
        { duration: '1s', target: 50 },     // Back to normal
        { duration: '30s', target: 50 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<3000'],
        http_req_failed: ['rate<0.1'],
    },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:3000';

export default function () {
    const res = http.get(`${BASE_URL}/api/health`);
    check(res, { 'status is 200': (r) => r.status === 200 });
}
```

## Running Tests

### Using k6

```bash
# Basic load test
k6 run tests/load-testing/basic-load-test.js

# With environment variables
API_URL=https://api.smartfarm.com AUTH_TOKEN=your-token k6 run tests/load-testing/basic-load-test.js

# Stress test
k6 run tests/load-testing/stress-test.js

# Spike test
k6 run tests/load-testing/spike-test.js

# Generate HTML report
k6 run --out json=results.json tests/load-testing/basic-load-test.js
k6-reporter --input results.json --output report.html
```

### Using Artillery

```bash
# Run test
artillery run tests/load-testing/artillery-config.yml

# Generate report
artillery run --output results.json tests/load-testing/artillery-config.yml
artillery report results.json
```

## Monitoring During Tests

### Key Metrics to Monitor

1. **Response Times**
   - p50 (median)
   - p95 (95th percentile)
   - p99 (99th percentile)
   - Max response time

2. **Error Rates**
   - HTTP error rate
   - Timeout rate
   - Database connection errors

3. **Throughput**
   - Requests per second
   - Successful requests per second
   - Failed requests per second

4. **Resource Usage**
   - CPU usage
   - Memory usage
   - Database connections
   - Network bandwidth

5. **Database Metrics**
   - Query execution time
   - Slow queries (>1 second)
   - Connection pool usage
   - Lock waits

### Monitoring Tools

- **Application Monitoring:** Sentry, New Relic, Datadog
- **Database Monitoring:** pg_stat_statements, pgAdmin
- **Server Monitoring:** htop, iotop, netstat
- **Load Balancer Metrics:** If using load balancer

## Interpreting Results

### Good Performance Indicators
- ✅ p95 response time < 1000ms
- ✅ Error rate < 1%
- ✅ No memory leaks
- ✅ Database connections stable
- ✅ Cache hit rate > 60%

### Warning Signs
- ⚠️ p95 response time > 2000ms
- ⚠️ Error rate > 5%
- ⚠️ Memory usage increasing steadily
- ⚠️ Database connection pool exhausted
- ⚠️ Slow queries (>1 second)

### Critical Issues
- 🔴 System crashes or becomes unresponsive
- 🔴 Database connection errors
- 🔴 Memory leaks (memory usage keeps increasing)
- 🔴 Response times > 5000ms
- 🔴 Error rate > 10%

## Optimization Based on Results

### If Response Times Are High
1. Check database query performance
2. Verify caching is working
3. Review connection pool settings
4. Check for N+1 query problems
5. Consider adding more indexes

### If Error Rates Are High
1. Check application logs
2. Review database connection limits
3. Verify rate limiting isn't too strict
4. Check for memory issues
5. Review error handling

### If Database Is Bottleneck
1. Optimize slow queries
2. Add missing indexes
3. Consider read replicas
4. Review connection pool size
5. Implement query result caching

## Test Checklist

Before running load tests:
- [ ] Staging environment matches production
- [ ] Database has representative data volume
- [ ] Monitoring is set up and working
- [ ] Backup plan in case of issues
- [ ] Team notified of testing window

During tests:
- [ ] Monitor key metrics continuously
- [ ] Watch for error spikes
- [ ] Check database performance
- [ ] Monitor server resources
- [ ] Document any anomalies

After tests:
- [ ] Analyze results
- [ ] Identify bottlenecks
- [ ] Create optimization plan
- [ ] Document findings
- [ ] Schedule follow-up tests

## Continuous Load Testing

### Recommended Schedule
- **Weekly:** Basic load test (100 users)
- **Monthly:** Moderate load test (500 users)
- **Quarterly:** High load test (1000+ users)
- **Before major releases:** Full test suite

### Automated Load Testing
Consider setting up CI/CD integration:
- Run basic load tests on every deployment
- Alert on performance regressions
- Track performance trends over time

## Resources

- [k6 Documentation](https://k6.io/docs/)
- [Artillery Documentation](https://www.artillery.io/docs)
- [JMeter Documentation](https://jmeter.apache.org/usermanual/)
- [Load Testing Best Practices](https://k6.io/docs/test-types/)

---

**Last Updated:** January 2024
**Status:** Ready for implementation


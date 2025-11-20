/**
 * Basic Load Test for SmartFarm API
 * Tests system under normal expected load (100-200 concurrent users)
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
    stages: [
        { duration: '2m', target: 100 },  // Ramp up to 100 users over 2 minutes
        { duration: '5m', target: 100 },  // Stay at 100 users for 5 minutes
        { duration: '2m', target: 200 },  // Ramp up to 200 users over 2 minutes
        { duration: '5m', target: 200 },  // Stay at 200 users for 5 minutes
        { duration: '2m', target: 0 },    // Ramp down to 0 over 2 minutes
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1s
        http_req_failed: ['rate<0.01'],    // Error rate should be less than 1%
        errors: ['rate<0.1'],
    },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:3000';

export default function () {
    // Health check endpoint (no auth required)
    let res = http.get(`${BASE_URL}/api/health`);
    const healthCheck = check(res, {
        'health check status is 200': (r) => r.status === 200,
        'health check response time < 200ms': (r) => r.timings.duration < 200,
    });
    
    if (!healthCheck) {
        errorRate.add(1);
    }

    sleep(1);

    // Simulate authenticated user requests
    // Note: In real tests, you'd need to authenticate first or use a valid token
    const token = __ENV.AUTH_TOKEN || '';
    const headers = {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    };

    // Test farms endpoint with pagination
    res = http.get(`${BASE_URL}/api/farms?page=1&limit=20`, { headers });
    const farmsCheck = check(res, {
        'farms status is 200 or 401': (r) => r.status === 200 || r.status === 401,
        'farms response time < 500ms': (r) => r.timings.duration < 500,
    });
    
    if (!farmsCheck && res.status !== 401) {
        errorRate.add(1);
    }

    sleep(2);

    // Test crops endpoint with pagination
    res = http.get(`${BASE_URL}/api/crops?page=1&limit=20`, { headers });
    const cropsCheck = check(res, {
        'crops status is 200 or 401': (r) => r.status === 200 || r.status === 401,
        'crops has pagination or auth error': (r) => {
            if (r.status === 401) return true;
            try {
                const body = JSON.parse(r.body);
                return body.pagination !== undefined || body.error !== undefined;
            } catch {
                return false;
            }
        },
    });
    
    if (!cropsCheck && res.status !== 401) {
        errorRate.add(1);
    }

    sleep(2);

    // Test livestock endpoint
    res = http.get(`${BASE_URL}/api/livestock?page=1&limit=20`, { headers });
    const livestockCheck = check(res, {
        'livestock status is 200 or 401': (r) => r.status === 200 || r.status === 401,
    });
    
    if (!livestockCheck && res.status !== 401) {
        errorRate.add(1);
    }

    sleep(2);
}


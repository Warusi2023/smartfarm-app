# Performance Gate (Release Checklist)

This document defines the minimum performance checks before production release.

## 1) Lighthouse audits

Run Lighthouse for:
- Landing/login page
- Main dashboard page
- One data-heavy screen (livestock or analytics)

How to run (Chrome DevTools):
1. Open page.
2. DevTools -> Lighthouse.
3. Device: Desktop and Mobile.
4. Categories: Performance, Accessibility, Best Practices, SEO.
5. Run and save report.

Suggested gate:
- Performance >= 80
- Accessibility >= 85
- Best Practices >= 85
- SEO >= 80

## 2) API response-time checks

Primary critical endpoints:
- `GET /api/health`
- `GET /api/farms`
- `GET /api/crops`
- `GET /api/livestock`
- `POST /api/auth/login` (with test credentials)

Existing instrumentation:
- Request latency metrics are captured in `backend/middleware/metrics-middleware.js`
- Aggregated metrics endpoint exists at `GET /api/metrics`

Scripted benchmark:
```bash
cd backend
API_URL=https://<your-backend-domain> node ../scripts/performance-test.js
```

Thresholds:
- Average response time: < 2000 ms
- Slow endpoint threshold: >= 2000 ms
- Failure threshold: any endpoint with non-2xx (except expected auth 401 in negative tests)

## 3) How to measure and track

1. Collect `scripts/performance-test.js` output.
2. Query `/api/metrics` and record latency/error rates.
3. Compare against previous baseline before release.

## 4) Prioritized bottlenecks observed

1. Frontend has mixed static and Vite paths, which can hide route-specific load regressions.
2. Some frontend requests always send `credentials: include`; verify this does not add cross-origin overhead where unnecessary.
3. Large dashboard scripts and third-party assets may affect first load and mobile scores.

## 5) Pass/Fail decision

Release candidate passes only if:
- Lighthouse thresholds are met on all three target pages.
- No critical endpoint exceeds threshold repeatedly.
- No sustained increase in error rate on `/api/metrics`.

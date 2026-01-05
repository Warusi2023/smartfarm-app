# Monitoring and Observability

## Overview

SmartFarm API includes comprehensive monitoring and observability features to track application health, performance, and errors. The system focuses on visibility and metrics collection.

## Components

### 1. Health Check Endpoints

#### Basic Health Check
- **Endpoint**: `GET /api/health`
- **Purpose**: Quick health status check
- **Response**: Basic status, timestamp, environment, version, uptime

#### Detailed Health Check
- **Endpoint**: `GET /api/health/detailed`
- **Purpose**: Comprehensive health status
- **Checks**:
  - Database connectivity and latency
  - Cache status (Redis/Memory)
  - Memory usage
- **Response**: Detailed status with individual check results

#### Readiness Probe
- **Endpoint**: `GET /api/health/ready`
- **Purpose**: Kubernetes readiness probe
- **Checks**: Database connectivity
- **Response**: `200` if ready, `503` if not ready

#### Liveness Probe
- **Endpoint**: `GET /api/health/live`
- **Purpose**: Kubernetes liveness probe
- **Checks**: Service is running
- **Response**: Always `200` if service is running

### 2. Metrics Collection

#### Metrics Endpoint
- **Endpoint**: `GET /api/metrics`
- **Formats**: JSON (default) or Prometheus
- **Query Parameter**: `?format=prometheus` for Prometheus format

#### Metrics Collected

**Overall Metrics:**
- Total requests
- Total errors
- Error rate percentage
- Uptime
- Overall latency statistics (min, max, avg, p50, p95, p99)
- Status code distribution

**Per-Endpoint Metrics:**
- Request count
- Error count
- Error rate percentage
- Latency statistics (min, max, avg, p50, p95, p99)

### 3. Request Tracking

All requests are automatically tracked via middleware:
- Request path and method
- Response status code
- Response latency
- Error detection (status >= 400)

### 4. Logging

Structured logging using Winston:
- Request completion logs (debug level)
- Slow request warnings (> 2 seconds)
- Error logging with context
- Consistent log format

## Usage

### Health Checks

```bash
# Basic health check
curl http://localhost:3000/api/health

# Detailed health check
curl http://localhost:3000/api/health/detailed

# Readiness probe
curl http://localhost:3000/api/health/ready

# Liveness probe
curl http://localhost:3000/api/health/live
```

### Metrics

```bash
# JSON format (default)
curl http://localhost:3000/api/metrics

# Prometheus format
curl http://localhost:3000/api/metrics?format=prometheus
```

## Metrics Format

### JSON Format

```json
{
  "overall": {
    "uptime": {
      "seconds": 3600,
      "formatted": "1h 0m 0s"
    },
    "requests": {
      "total": 1000,
      "errors": 10,
      "errorRate": "1.00"
    },
    "latency": {
      "min": 5,
      "max": 500,
      "avg": 50,
      "p50": 45,
      "p95": 200,
      "p99": 400
    },
    "statusCodes": {
      "200": 950,
      "404": 5,
      "500": 5
    }
  },
  "endpoints": {
    "GET /api/health": {
      "count": 100,
      "errors": 0,
      "errorRate": 0,
      "latency": {
        "min": 2,
        "max": 10,
        "avg": 5,
        "p50": 5,
        "p95": 8,
        "p99": 10
      }
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Prometheus Format

```
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total 1000

# HELP http_errors_total Total number of HTTP errors
# TYPE http_errors_total counter
http_errors_total 10

# HELP http_request_duration_seconds Request duration in seconds
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds{method="GET",path="/api/health",quantile="0.5"} 0.005
http_request_duration_seconds{method="GET",path="/api/health",quantile="0.95"} 0.008
http_request_duration_seconds{method="GET",path="/api/health",quantile="0.99"} 0.01
```

## Architecture

### Metrics Service (`backend/utils/metrics.js`)
- Singleton service for metrics collection
- In-memory storage (last 1000 latencies per endpoint)
- Automatic metric reset every hour
- Prometheus format support

### Metrics Middleware (`backend/middleware/metrics-middleware.js`)
- Tracks all requests automatically
- Records latency and status codes
- Detects errors
- Logs slow requests

### Health Check Service (`backend/utils/health-check.js`)
- Database connectivity checks
- Cache status checks
- Memory usage monitoring
- Kubernetes probe support

## Integration

### Kubernetes

```yaml
livenessProbe:
  httpGet:
    path: /api/health/live
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /api/health/ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

### Prometheus

Scrape metrics endpoint:
```yaml
scrape_configs:
  - job_name: 'smartfarm-api'
    metrics_path: '/api/metrics'
    params:
      format: ['prometheus']
    static_configs:
      - targets: ['localhost:3000']
```

## Best Practices

1. **Health Checks**: Use `/api/health/ready` for load balancer health checks
2. **Metrics**: Monitor error rates and p95/p99 latencies
3. **Logging**: Review slow request warnings (> 2 seconds)
4. **Alerts**: Set up alerts based on error rates and latency (future)

## Future Enhancements

- [ ] Alerting integration (Prometheus Alertmanager)
- [ ] Distributed tracing (OpenTelemetry)
- [ ] Custom business metrics
- [ ] Metrics export to external services
- [ ] Dashboard integration (Grafana)

## Notes

- Metrics are stored in-memory and reset every hour
- For production, consider exporting to external metrics store
- Health checks are lightweight and safe for frequent polling
- All metrics are automatically collected - no manual instrumentation needed


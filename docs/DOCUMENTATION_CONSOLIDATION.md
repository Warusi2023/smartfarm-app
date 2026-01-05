# Documentation Consolidation Guide

This document tracks the consolidation of SmartFarm documentation.

## Consolidation Strategy

### 1. Architecture Documentation
**Location:** `docs/architecture/`

**Consolidated Files:**
- `README.md` - Architecture overview
- `DATABASE_SCHEMA.md` - Database schema (to be created)
- `SECURITY.md` - Security architecture (to be created)

**Archived Files:**
- `PROJECT_STRUCTURE.md` → Archive
- `PROJECT_SUMMARY.md` → Archive
- `BACKEND_DIRECTORY_ANALYSIS.md` → Archive
- `CODEBASE_AUDIT_REPORT.md` → Archive

### 2. Setup & Deployment Documentation
**Location:** `docs/setup-deployment/`

**Consolidated Files:**
- `README.md` - Setup overview
- `DEPLOYMENT.md` - Deployment guide (to be created)
- `DATABASE_SETUP.md` - Database setup (to be created)
- `ENVIRONMENT_VARIABLES.md` - Environment config (to be created)
- `BACKEND_DEPLOYMENT.md` - Backend deployment (to be created)
- `FRONTEND_DEPLOYMENT.md` - Frontend deployment (to be created)
- `WEB_ANDROID_SYNC.md` - Cross-platform sync (to be created)

**Archived Files:**
- Multiple `DEPLOYMENT_*.md` files → Archive
- Multiple `NETLIFY_*.md` files → Archive
- Multiple `RAILWAY_*.md` files → Archive
- `QUICK_DEPLOYMENT_GUIDE.md` → Archive
- `COMPLETE_DEPLOYMENT_GUIDE.md` → Archive

### 3. API Reference Documentation
**Location:** `docs/api-reference/`

**Consolidated Files:**
- `README.md` - API overview
- `AUTHENTICATION.md` - Auth endpoints
- `FARMS.md` - Farm endpoints (to be created)
- `CROPS.md` - Crop endpoints (to be created)
- `LIVESTOCK.md` - Livestock endpoints (to be created)
- `WEATHER_ALERTS.md` - Weather endpoints (to be created)
- `AI_ADVISORY.md` - AI endpoints (to be created)
- `SUBSCRIPTIONS.md` - Subscription endpoints (to be created)
- `DAILY_TIPS.md` - Daily tips endpoints (to be created)
- `BIOLOGICAL_FARMING.md` - Biological farming endpoints (to be created)

**Archived Files:**
- `API_SETUP_*.md` files → Archive
- `API_CONFIGURATION_GUIDE.md` → Archive
- `API_CONNECTION_SETUP.md` → Archive

### 4. Feature Modules Documentation
**Location:** `docs/feature-modules/`

**Consolidated Files:**
- `README.md` - Features overview
- `weather-alerts.md` - Weather alerts feature
- `ai-advisory.md` - AI advisory feature
- `daily-tips.md` - Daily tips feature
- `subscriptions.md` - Subscriptions feature

**Archived Files:**
- `FEATURE_1_*.md` files → Archive
- `FEATURE1_*.md` files → Archive
- `WEATHER_ALERTS_*.md` files → Archive

## Files to Archive

The following files are duplicates, outdated, or should be archived:

### Implementation Summaries (Outdated)
- `*_IMPLEMENTATION_SUMMARY.md`
- `*_COMPLETE_SUMMARY.md`
- `*_COMPLETION_SUMMARY.md`
- `*_STATUS.md`
- `*_FIX_SUMMARY.md`

### Debug/Fix Documentation (Historical)
- `DEBUG_*.md`
- `FIX_*.md`
- `TROUBLESHOOTING_*.md`
- `*_FIX_COMPLETE.md`

### Deployment Execution Logs (Historical)
- `DEPLOYMENT_EXECUTION_*.md`
- `*_DEPLOYMENT_STATUS.md`

### Quick Fixes (Historical)
- `QUICK_*.md`
- `EASY_*.md`
- `IMMEDIATE_*.md`

## Archive Process

1. Move files to `docs/archive/` directory
2. Update references in consolidated documentation
3. Keep only current, relevant documentation in main directories

## Maintenance

- Review archived files quarterly
- Remove truly obsolete files after 6 months
- Update consolidated docs when features change
- Keep README files current


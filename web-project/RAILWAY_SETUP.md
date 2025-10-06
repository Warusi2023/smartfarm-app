# Railway Web Component Setup Guide

## Current Issue
The web component shows "Failed (2 days ago)" because Railway needs proper environment variables.

## Required Variables to Add in Railway:

### 1. Go to Railway Dashboard → Web Component → Variables Tab

### 2. Add these variables:
```
NODE_ENV = production
PORT = 3000
LOG_LEVEL = info
```

### 3. Optional Variables (if you want external APIs):
```
WEATHER_API_KEY = your_openweathermap_key_here
GOOGLE_MAPS_API_KEY = your_google_maps_key_here
```

## Why Variables Are Needed:
- Railway expects NODE_ENV for production mode
- PORT should be explicitly set (Railway provides this but sometimes needs it defined)
- LOG_LEVEL helps with debugging

## After Adding Variables:
1. Railway will automatically redeploy the web component
2. Check the "Deployments" tab for build logs
3. Web component should show "Deployed" status instead of "Failed"

## Alternative: Use Raw Editor
Click "{ } Raw Editor" button and paste:
```json
{
  "NODE_ENV": "production",
  "PORT": "3000",
  "LOG_LEVEL": "info"
}
```

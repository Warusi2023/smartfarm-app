# Railway Deployment Configuration

This file triggers Railway to redeploy the web component.

## Configuration Summary:
- Start Command: `node server.js`
- Port: Uses Railway's PORT environment variable
- Health Check: `/`
- Timeout: 60 seconds

## Last Updated:
$(date)

## Changes Made:
- Fixed configuration conflicts between railway.json and Procfile
- Standardized start command to use node server.js
- Added railway.toml for consistent deployment
- Version bumped to 1.0.2 to trigger redeploy

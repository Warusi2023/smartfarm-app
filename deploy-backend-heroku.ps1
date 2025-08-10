# Quick Heroku Backend Deployment
Write-Host "Deploying SmartFarm Backend to Heroku..." -ForegroundColor Green

# Navigate to backend
cd backend-api

# Create Heroku app
heroku create smartfarm-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_super_secret_jwt_key_2024
heroku config:set CORS_ORIGIN=https://your-app.netlify.app

# Deploy
git add .
git commit -m "Deploy SmartFarm API"
git push heroku main

Write-Host "Backend deployed to Heroku!" -ForegroundColor Green
Write-Host "URL: https://smartfarm-api.herokuapp.com" -ForegroundColor Cyan

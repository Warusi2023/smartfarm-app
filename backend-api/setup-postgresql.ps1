# SmartFarm PostgreSQL Database Setup Script

param(
    [string]$DBUser = "postgres",
    [string]$DBPassword = "",
    [string]$DBName = "smartfarm_dev",
    [string]$DBHost = "localhost",
    [string]$DBPort = "5432"
)

Write-Host "SmartFarm PostgreSQL Database Setup" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Create .env file
$envContent = @"
# Database Configuration
DB_USER=$DBUser
DB_PASSWORD=$DBPassword
DB_NAME=$DBName
DB_HOST=$DBHost
DB_PORT=$DBPort

# Test Database
DB_NAME_TEST=smartfarm_test

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000
NODE_ENV=development

# API Keys (optional)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Logging
LOG_LEVEL=info
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "✅ Environment file created: .env" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Install PostgreSQL if not already installed" -ForegroundColor White
Write-Host "2. Create database: CREATE DATABASE $DBName;" -ForegroundColor White
Write-Host "3. Run migrations: npm run db:migrate" -ForegroundColor White
Write-Host "4. Seed database: npm run db:seed" -ForegroundColor White
Write-Host "5. Test database: node database/test.js" -ForegroundColor White 
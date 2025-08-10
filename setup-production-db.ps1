# SmartFarm Production Database Setup
Write-Host "Setting up SmartFarm Production Database..." -ForegroundColor Green

# Database Configuration
$dbConfig = @{
    Host = "localhost"
    Port = 5432
    Database = "smartfarm_production"
    Username = "smartfarm_user"
    Password = "secure_password_2024"
}

Write-Host "Database Configuration:" -ForegroundColor Yellow
Write-Host "  Host: $($dbConfig.Host)" -ForegroundColor White
Write-Host "  Port: $($dbConfig.Port)" -ForegroundColor White
Write-Host "  Database: $($dbConfig.Database)" -ForegroundColor White
Write-Host "  Username: $($dbConfig.Username)" -ForegroundColor White
Write-Host ""

# Step 1: Check PostgreSQL installation
Write-Host "Step 1: Checking PostgreSQL Installation..." -ForegroundColor Yellow
try {
    $psqlVersion = psql --version 2>$null
    if ($psqlVersion) {
        Write-Host "  PASS: PostgreSQL is installed" -ForegroundColor Green
        Write-Host "  Version: $psqlVersion" -ForegroundColor Cyan
    } else {
        Write-Host "  FAIL: PostgreSQL not found" -ForegroundColor Red
        Write-Host "  Please install PostgreSQL from: https://www.postgresql.org/download/" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "  FAIL: PostgreSQL check failed" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: Create production database configuration
Write-Host "Step 2: Creating Production Database Configuration..." -ForegroundColor Yellow

$productionConfig = @"
// Production Database Configuration
module.exports = {
  development: {
    username: 'smartfarm_user',
    password: 'secure_password_2024',
    database: 'smartfarm_development',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    username: process.env.DB_USERNAME || 'smartfarm_user',
    password: process.env.DB_PASSWORD || 'secure_password_2024',
    database: process.env.DB_NAME || 'smartfarm_production',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 20,
      min: 5,
      acquire: 30000,
      idle: 10000
    },
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  }
};
"@

Set-Content -Path "backend-api/database/config-production.js" -Value $productionConfig
Write-Host "  PASS: Production database config created" -ForegroundColor Green

Write-Host ""

# Step 3: Create database setup script
Write-Host "Step 3: Creating Database Setup Script..." -ForegroundColor Yellow

$setupScript = @"
-- SmartFarm Production Database Setup
-- Run this script as PostgreSQL superuser

-- Create database user
CREATE USER smartfarm_user WITH PASSWORD 'secure_password_2024';

-- Create production database
CREATE DATABASE smartfarm_production OWNER smartfarm_user;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE smartfarm_production TO smartfarm_user;
GRANT CREATE ON DATABASE smartfarm_production TO smartfarm_user;

-- Connect to the database
\c smartfarm_production;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO smartfarm_user;
GRANT CREATE ON SCHEMA public TO smartfarm_user;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Verify setup
SELECT current_database(), current_user;
"@

Set-Content -Path "database-setup.sql" -Value $setupScript
Write-Host "  PASS: Database setup script created" -ForegroundColor Green

Write-Host ""

# Step 4: Create environment variables file
Write-Host "Step 4: Creating Environment Variables..." -ForegroundColor Yellow

$envVars = @"
# SmartFarm Production Environment Variables
NODE_ENV=production
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=smartfarm_production
DB_USERNAME=smartfarm_user
DB_PASSWORD=secure_password_2024

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_2024
JWT_EXPIRES_IN=7d

# API Keys (Configure these in production)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
OPENAI_API_KEY=your_openai_api_key

# CORS Configuration
CORS_ORIGIN=https://your-app.netlify.app

# Logging
LOG_LEVEL=info
"@

Set-Content -Path "backend-api/.env.production" -Value $envVars
Write-Host "  PASS: Production environment variables created" -ForegroundColor Green

Write-Host ""

# Step 5: Create database migration script
Write-Host "Step 5: Creating Database Migration Script..." -ForegroundColor Yellow

$migrationScript = @"
const { Sequelize } = require('sequelize');
const config = require('./database/config-production.js');

async function setupDatabase() {
  try {
    // Create sequelize instance
    const sequelize = new Sequelize(config.production);
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync all models
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Database models synchronized.');
    
    // Close connection
    await sequelize.close();
    console.log('✅ Database setup completed successfully.');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
"@

Set-Content -Path "backend-api/setup-database.js" -Value $migrationScript
Write-Host "  PASS: Database migration script created" -ForegroundColor Green

Write-Host ""

# Step 6: Create deployment instructions
Write-Host "Step 6: Creating Database Deployment Instructions..." -ForegroundColor Yellow

$instructions = @"
# PostgreSQL Production Database Setup Instructions

## Prerequisites:
1. PostgreSQL installed and running
2. Superuser access to PostgreSQL

## Setup Steps:

### 1. Install PostgreSQL (if not installed)
- Windows: Download from https://www.postgresql.org/download/windows/
- macOS: `brew install postgresql`
- Linux: `sudo apt-get install postgresql postgresql-contrib`

### 2. Start PostgreSQL Service
- Windows: Start from Services or `net start postgresql`
- macOS: `brew services start postgresql`
- Linux: `sudo systemctl start postgresql`

### 3. Create Database and User
```bash
# Connect as postgres user
sudo -u postgres psql

# Run the setup script
\i database-setup.sql

# Or manually:
CREATE USER smartfarm_user WITH PASSWORD 'secure_password_2024';
CREATE DATABASE smartfarm_production OWNER smartfarm_user;
GRANT ALL PRIVILEGES ON DATABASE smartfarm_production TO smartfarm_user;
```

### 4. Run Database Migration
```bash
cd backend-api
npm install
node setup-database.js
```

### 5. Verify Setup
```bash
psql -h localhost -U smartfarm_user -d smartfarm_production
# Enter password when prompted
```

## Production Considerations:
- Use strong passwords in production
- Enable SSL connections
- Set up database backups
- Configure connection pooling
- Monitor database performance

## Environment Variables:
Set these in your production environment:
- DB_HOST=your_db_host
- DB_PORT=5432
- DB_NAME=smartfarm_production
- DB_USERNAME=smartfarm_user
- DB_PASSWORD=your_secure_password
"@

Set-Content -Path "POSTGRESQL_SETUP_GUIDE.md" -Value $instructions
Write-Host "  PASS: Database setup guide created" -ForegroundColor Green

Write-Host ""

# Final summary
Write-Host "PostgreSQL Production Database Setup Complete!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host "Files Created:" -ForegroundColor Cyan
Write-Host "  - backend-api/database/config-production.js" -ForegroundColor White
Write-Host "  - database-setup.sql" -ForegroundColor White
Write-Host "  - backend-api/.env.production" -ForegroundColor White
Write-Host "  - backend-api/setup-database.js" -ForegroundColor White
Write-Host "  - POSTGRESQL_SETUP_GUIDE.md" -ForegroundColor White

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Install PostgreSQL if not already installed" -ForegroundColor White
Write-Host "2. Run database-setup.sql as superuser" -ForegroundColor White
Write-Host "3. Configure environment variables" -ForegroundColor White
Write-Host "4. Run database migration: node setup-database.js" -ForegroundColor White

Write-Host ""
Write-Host "Database setup ready for production! 🗄️" -ForegroundColor Green 
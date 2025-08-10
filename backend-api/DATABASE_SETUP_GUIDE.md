# SmartFarm PostgreSQL Database Setup Guide

## Overview

This guide provides step-by-step instructions for setting up and configuring the PostgreSQL database for the SmartFarm backend API.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## 1. PostgreSQL Installation

### Windows
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user
4. Add PostgreSQL to your system PATH

### macOS
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql

# Or using Postgres.app
# Download from https://postgresapp.com/
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## 2. Database Configuration

### Step 1: Create Database
```bash
# Connect to PostgreSQL as postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE smartfarm_dev;
CREATE DATABASE smartfarm_test;
CREATE USER smartfarm_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE smartfarm_dev TO smartfarm_user;
GRANT ALL PRIVILEGES ON DATABASE smartfarm_test TO smartfarm_user;
\q
```

### Step 2: Environment Configuration
1. Copy the environment example file:
   ```bash
   cp env.example .env
   ```

2. Update the `.env` file with your database credentials:
   ```env
   DB_USER=smartfarm_user
   DB_PASSWORD=your_secure_password
   DB_NAME=smartfarm_dev
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME_TEST=smartfarm_test
   ```

## 3. Installation and Setup

### Step 1: Install Dependencies
```bash
cd backend-api
npm install
```

### Step 2: Run Database Migrations
```bash
# Create database tables
npm run db:migrate
```

### Step 3: Seed Database with Sample Data
```bash
# Populate database with sample data
npm run db:seed
```

### Step 4: Test Database Operations
```bash
# Run database tests
node database/test.js
```

## 4. Database Management Commands

### Available Scripts
```bash
# Run migrations (create/update tables)
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Reset database (drop all tables and recreate)
npm run db:reset

# Test database operations
node database/test.js
```

### Manual Database Operations
```bash
# Connect to database
psql -h localhost -U smartfarm_user -d smartfarm_dev

# List tables
\dt

# View table structure
\d table_name

# Run SQL query
SELECT * FROM users LIMIT 5;

# Exit
\q
```

## 5. Database Schema

### Core Tables
- **users** - User accounts and authentication
- **farms** - Farm information and management
- **livestock** - Livestock records and health data
- **crops** - Crop planting and harvest data
- **inventory** - Farm supplies and equipment
- **financial_records** - Income and expense tracking
- **weather_data** - Weather monitoring data
- **documents** - File management and storage
- **analytics_data** - Performance metrics and analytics
- **employees** - Staff management
- **tasks** - Task assignment and tracking
- **equipment** - Equipment inventory and maintenance
- **maintenance_records** - Equipment maintenance history
- **user_sessions** - User session management

### Key Features
- **UUID Primary Keys** - Secure, globally unique identifiers
- **Foreign Key Relationships** - Data integrity and referential constraints
- **Indexes** - Optimized query performance
- **Timestamps** - Automatic creation and update tracking
- **JSONB Fields** - Flexible data storage for complex objects
- **ENUM Types** - Data validation for status fields

## 6. Database Models

### User Model
```javascript
{
  id: UUID (Primary Key),
  email: String (Unique),
  password: String (Hashed),
  firstName: String,
  lastName: String,
  role: ENUM('farmer', 'manager', 'admin'),
  status: ENUM('active', 'inactive', 'suspended'),
  permissions: JSONB,
  settings: JSONB,
  notificationPreferences: JSONB,
  lastLoginAt: DateTime,
  emailVerified: Boolean,
  phoneVerified: Boolean,
  twoFactorEnabled: Boolean,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Farm Model
```javascript
{
  id: UUID (Primary Key),
  name: String,
  description: Text,
  location: String,
  size: Decimal,
  type: ENUM('crop', 'livestock', 'mixed', 'organic', 'conventional'),
  status: ENUM('active', 'inactive', 'maintenance'),
  parentFarmId: UUID (Foreign Key),
  ownerId: UUID (Foreign Key to users),
  managerId: UUID (Foreign Key to users),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

## 7. Database Associations

### One-to-Many Relationships
- User → Farms (owner)
- User → Farms (manager)
- Farm → Livestock
- Farm → Crops
- Farm → Inventory
- Farm → Financial Records
- Farm → Weather Data
- Farm → Documents
- Farm → Analytics Data
- Farm → Employees
- Farm → Tasks
- Farm → Equipment
- Equipment → Maintenance Records

### Many-to-One Relationships
- Farms → User (owner)
- Farms → User (manager)
- Livestock → Farm
- Crops → Farm
- Inventory → Farm
- Financial Records → Farm
- Weather Data → Farm
- Documents → Farm
- Analytics Data → Farm
- Employees → Farm
- Tasks → Farm
- Equipment → Farm
- Maintenance Records → Equipment

## 8. Performance Optimization

### Indexes
The database includes optimized indexes for:
- Email lookups (users)
- Farm relationships (farms, livestock, crops, etc.)
- Status filtering (all status fields)
- Date-based queries (weather, financial, analytics)
- Foreign key relationships

### Query Optimization
- Use `include` for eager loading associations
- Implement pagination for large datasets
- Use `where` clauses with indexed fields
- Leverage `order` and `limit` for performance

## 9. Backup and Recovery

### Automated Backups
```bash
# Create backup
pg_dump -h localhost -U smartfarm_user -d smartfarm_dev > backup.sql

# Restore backup
psql -h localhost -U smartfarm_user -d smartfarm_dev < backup.sql
```

### Scheduled Backups
```bash
# Add to crontab for daily backups
0 2 * * * pg_dump -h localhost -U smartfarm_user -d smartfarm_dev > /backups/smartfarm_$(date +\%Y\%m\%d).sql
```

## 10. Troubleshooting

### Common Issues

#### Connection Refused
```bash
# Check PostgreSQL service status
sudo systemctl status postgresql

# Start PostgreSQL service
sudo systemctl start postgresql
```

#### Authentication Failed
```bash
# Check pg_hba.conf configuration
sudo nano /etc/postgresql/*/main/pg_hba.conf

# Restart PostgreSQL
sudo systemctl restart postgresql
```

#### Database Not Found
```bash
# List databases
psql -h localhost -U postgres -l

# Create database if missing
createdb -h localhost -U postgres smartfarm_dev
```

#### Permission Denied
```bash
# Grant permissions
psql -h localhost -U postgres
GRANT ALL PRIVILEGES ON DATABASE smartfarm_dev TO smartfarm_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO smartfarm_user;
```

## 11. Production Deployment

### Environment Variables
```env
NODE_ENV=production
DB_USER=production_user
DB_PASSWORD=secure_production_password
DB_NAME=smartfarm_prod
DB_HOST=production_host
DB_PORT=5432
JWT_SECRET=very_secure_jwt_secret
```

### Security Considerations
- Use strong passwords
- Enable SSL connections
- Configure firewall rules
- Regular security updates
- Monitor database logs
- Implement connection pooling

### Performance Monitoring
```bash
# Monitor database performance
SELECT * FROM pg_stat_activity;
SELECT * FROM pg_stat_database;
SELECT * FROM pg_stat_user_tables;
```

## 12. Support

For database-related issues:
1. Check the troubleshooting section
2. Review PostgreSQL logs
3. Verify environment configuration
4. Test database connectivity
5. Consult PostgreSQL documentation

## Next Steps

After completing the database setup:
1. Start the backend server: `npm start`
2. Test API endpoints: `node test-api.js`
3. Review API documentation: `API_DOCUMENTATION.md`
4. Configure frontend to connect to the API
5. Set up monitoring and logging 
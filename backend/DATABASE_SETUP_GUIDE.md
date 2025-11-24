# 🔧 Database Connection Setup Guide

## Quick Setup

Run the interactive setup script:

```bash
cd backend
npm run setup:db
```

This will guide you through:
1. ✅ Database connection configuration
2. ✅ Connection testing
3. ✅ Email service setup (optional)
4. ✅ JWT secret generation

---

## Manual Setup

### Option 1: Railway PostgreSQL (Recommended)

1. **Get Railway DATABASE_URL:**
   - Go to [Railway Dashboard](https://railway.app)
   - Select your Postgres service
   - Go to "Variables" tab
   - Copy the `DATABASE_URL` value

2. **Create `.env` file:**
   ```bash
   cd backend
   cp env.example .env
   ```

3. **Edit `.env` file:**
   ```env
   DATABASE_URL=postgresql://postgres:password@host:port/railway
   ```

### Option 2: Local PostgreSQL

1. **Install PostgreSQL** (if not installed)
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - Mac: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`

2. **Create database:**
   ```sql
   CREATE DATABASE smartfarm;
   CREATE USER smartfarm_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE smartfarm TO smartfarm_user;
   ```

3. **Set DATABASE_URL in `.env`:**
   ```env
   DATABASE_URL=postgresql://smartfarm_user:your_password@localhost:5432/smartfarm
   ```

---

## Test Connection

After setting up, test the connection:

```bash
npm run test:db
```

Expected output:
```
✅ DATABASE_URL is set
✅ Connected to PostgreSQL successfully!
✅ Users table exists
✅ Email verification columns exist
```

---

## Verify Database Schema

Ensure email verification columns exist:

```sql
-- Check if columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name IN ('is_verified', 'verification_token', 'verification_expires');

-- If missing, run migration:
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255),
ADD COLUMN IF NOT EXISTS verification_expires TIMESTAMP,
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);
```

---

## Troubleshooting

### Error: "DATABASE_URL is not set"

**Solution:**
1. Create `backend/.env` file
2. Add `DATABASE_URL=your_connection_string`
3. Or run: `npm run setup:db`

### Error: "Connection refused"

**Solutions:**
1. **Railway:** Check service is running and variables are set
2. **Local:** Ensure PostgreSQL is running:
   ```bash
   # Windows
   net start postgresql-x64-15
   
   # Mac/Linux
   sudo service postgresql start
   # or
   brew services start postgresql
   ```

3. **Check firewall:** Ensure port 5432 is open

### Error: "password authentication failed"

**Solutions:**
1. Verify credentials in DATABASE_URL
2. Check user has correct permissions
3. For Railway: Regenerate password in dashboard

### Error: "relation 'users' does not exist"

**Solution:** Run database migrations:
```bash
# In DBeaver or psql, run:
backend/database/migrations/000_run_all_migrations.sql
```

---

## Environment Variables

Complete `.env` file example:

```env
# Environment
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"
FRONTEND_URL=http://localhost:5500
```

---

## Next Steps

After database is configured:

1. ✅ **Test connection:** `npm run test:db`
2. ✅ **Test email verification:** `npm run test:email-verification`
3. ✅ **Start server:** `npm run dev`
4. ✅ **Check health:** `npm run health`

---

## Security Notes

⚠️ **Never commit `.env` file to Git!**

The `.env` file is already in `.gitignore`, but double-check:
- ✅ `.env` is in `.gitignore`
- ✅ Only commit `env.example` (without secrets)
- ✅ Use Railway variables for production

---

**Need Help?** See:
- `LOCAL_DEVELOPMENT_SETUP.md` - Full development setup
- `database/RAILWAY_SETUP_GUIDE.md` - Railway-specific guide
- `EMAIL_VERIFICATION_TEST_GUIDE.md` - Email verification testing


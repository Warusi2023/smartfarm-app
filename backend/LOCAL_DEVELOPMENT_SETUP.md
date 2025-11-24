# 🚀 Local Development Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# Copy example file
cp env.example .env
```

Then edit `.env` with your values:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database (use Railway Postgres connection string)
DATABASE_URL=postgresql://postgres:password@host:port/railway

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (for email verification)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"
FRONTEND_URL=http://localhost:5500

# Optional: Redis (if using caching)
REDIS_URL=redis://localhost:6379
```

### 3. Run the Server

```bash
# Development mode
npm run dev

# Or production mode
npm start
```

The server will start on `http://localhost:3000`

### 4. Test the Server

Open browser or use curl:
```bash
# Health check
curl http://localhost:3000/api/health

# Or visit in browser
http://localhost:3000/api/health
```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server (same as start)
- `npm run test:db` - Test database connection
- `npm run health` - Check server health endpoint

## Database Setup

Before running the server, make sure:

1. **Database tables are created** (run migrations in DBeaver)
2. **DATABASE_URL is set** in `.env` file
3. **Database is accessible** from your local machine

### Test Database Connection

```bash
npm run test:db
```

This will verify:
- Database connection
- Table existence
- Email verification fields
- Connection pool status

## Troubleshooting

### Error: "Cannot find module 'dotenv'"
```bash
npm install
```

### Error: "DATABASE_URL is not set"
- Create `.env` file
- Add `DATABASE_URL` from Railway

### Error: "Connection refused" or "ECONNREFUSED"
- Check Railway Postgres is running
- Verify DATABASE_URL is correct
- Check firewall/network settings

### Error: "relation does not exist"
- Run database migrations in DBeaver
- Use `000_run_all_migrations.sql` file

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3001
```

## Development Tips

1. **Hot Reload**: Currently not configured. Restart server after changes.
2. **Logs**: Check console output for errors
3. **Database**: Use DBeaver to inspect data
4. **API Testing**: Use Postman or curl to test endpoints

## Next Steps

After server starts:
1. ✅ Verify health endpoint works
2. ✅ Test database connection
3. ✅ Try registering a user
4. ✅ Check email verification works
5. ✅ Test AI advisory endpoints

---

**Need Help?** Check `backend/database/README.md` for database setup.


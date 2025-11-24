# 🔧 Fixing Current Issues

## Issues Found

1. ❌ **DATABASE_URL not set** - Need to create `.env` file
2. ❌ **AuthMiddleware error** - Fixed in `subscriptions.js`
3. ❌ **Port 3000 already in use** - Need to stop other process or use different port

---

## Quick Fix Steps

### Step 1: Create .env File

**Option A: Quick Setup Script**
```bash
cd backend
npm run setup:env
```

**Option B: Manual Setup**
```bash
cd backend
cp env.example .env
```

Then edit `.env` and add your Railway DATABASE_URL:
```env
DATABASE_URL=postgresql://postgres:password@host:port/railway
```

### Step 2: Get Railway DATABASE_URL

1. Go to [Railway Dashboard](https://railway.app)
2. Select your **Postgres** service
3. Click **"Variables"** tab
4. Copy the **`DATABASE_URL`** value
5. Paste it into `backend/.env` file

### Step 3: Fix Port Conflict

**Option A: Stop Process on Port 3000**

**Windows PowerShell:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace <PID> with actual PID)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Option B: Use Different Port**
```bash
# Set PORT environment variable
$env:PORT=3001; npm run dev

# Or edit .env file
PORT=3001
```

### Step 4: Test Everything

```bash
# Test database connection
npm run test:db

# Test email verification
npm run test:email-verification

# Start server
npm run dev
```

---

## Fixed Issues

### ✅ AuthMiddleware Error Fixed

The `subscriptions.js` file now correctly instantiates `AuthMiddleware`:
```javascript
this.authMiddleware = new AuthMiddleware(); // Fixed!
```

### ✅ Port Conflict Handling

Server now shows helpful error message when port is in use.

---

## Complete Setup Example

```bash
# 1. Navigate to backend
cd E:\Document\SmartFarm\backend

# 2. Create .env file (interactive)
npm run setup:env

# 3. When prompted, paste your Railway DATABASE_URL

# 4. Stop any process on port 3000 (if needed)
netstat -ano | findstr :3000
# Note the PID, then:
taskkill /PID <PID> /F

# 5. Test database
npm run test:db

# 6. Start server
npm run dev
```

---

## Verification

After setup, you should see:

```
✅ Database connected successfully
✅ Auth routes with email verification loaded
✅ Subscription routes loaded
✅ AI Advisory routes loaded
✅ Server running on http://0.0.0.0:3000
```

---

## Troubleshooting

### "DATABASE_URL is not set"
- ✅ Check `.env` file exists in `backend/` directory
- ✅ Verify `DATABASE_URL=` line is present
- ✅ No spaces around `=` sign

### "Port already in use"
- ✅ Stop other Node.js processes
- ✅ Use different port: `PORT=3001 npm run dev`
- ✅ Check what's using port: `netstat -ano | findstr :3000`

### "AuthMiddleware.authenticate is not a function"
- ✅ Fixed! Make sure you have latest code: `git pull`

---

**Need Help?** See:
- `QUICK_DATABASE_SETUP.md` - Quick database setup
- `DATABASE_SETUP_GUIDE.md` - Detailed database guide
- `LOCAL_DEVELOPMENT_SETUP.md` - Full development setup


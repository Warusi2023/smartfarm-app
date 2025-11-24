# ⚡ Quick Database Setup

## Method 1: Interactive Setup (Easiest)

```bash
cd backend
npm run setup:db
```

Follow the prompts to:
1. Choose Railway or Local PostgreSQL
2. Enter your DATABASE_URL
3. Test the connection
4. Configure email (optional)

---

## Method 2: Manual Setup (Fast)

### Step 1: Get Railway DATABASE_URL

1. Go to [Railway Dashboard](https://railway.app)
2. Select your **Postgres** service
3. Click **"Variables"** tab
4. Copy the **`DATABASE_URL`** value

### Step 2: Create `.env` file

```bash
cd backend
cp env.example .env
```

### Step 3: Edit `.env` file

Open `backend/.env` and set:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT/railway
```

**Example:**
```env
DATABASE_URL=postgresql://postgres:abc123@containers-us-west-123.railway.app:5432/railway
```

### Step 4: Test Connection

```bash
npm run test:db
```

---

## Method 3: One-Line Setup

If you have your DATABASE_URL ready:

**Windows PowerShell:**
```powershell
cd backend
$DATABASE_URL = "postgresql://postgres:password@host:port/railway"
@"
DATABASE_URL=$DATABASE_URL
NODE_ENV=development
PORT=3000
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
"@ | Out-File -FilePath .env -Encoding utf8
```

**Linux/Mac:**
```bash
cd backend
echo "DATABASE_URL=postgresql://postgres:password@host:port/railway" > .env
echo "NODE_ENV=development" >> .env
echo "PORT=3000" >> .env
echo "JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")" >> .env
```

---

## Verify Setup

After setup, test everything:

```bash
# Test database connection
npm run test:db

# Test email verification system
npm run test:email-verification
```

---

## Common Issues

### "DATABASE_URL is not set"
- ✅ Make sure `.env` file exists in `backend/` directory
- ✅ Check `.env` file has `DATABASE_URL=` line
- ✅ No spaces around `=` sign

### "Connection refused"
- ✅ Check Railway Postgres service is running
- ✅ Verify DATABASE_URL is correct
- ✅ Check network/firewall settings

### "password authentication failed"
- ✅ Verify password in DATABASE_URL
- ✅ Check for special characters (may need URL encoding)
- ✅ Regenerate password in Railway if needed

---

## Next Steps

✅ Database configured → Test email verification → Start server!

```bash
npm run test:email-verification  # Test email system
npm run dev                       # Start server
```


@echo off
REM SmartFarm Production Build Script

echo 🚀 Building SmartFarm for Production

REM Install dependencies
echo 📦 Installing dependencies...
npm ci --production

REM Run database migrations
echo 🗄️  Running database migrations...
npm run migrate

REM Seed database if needed
echo 🌱 Seeding database...
npm run seed

REM Start the application
echo 🚀 Starting application...
npm start

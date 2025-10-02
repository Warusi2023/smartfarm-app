#!/bin/bash
# SmartFarm Production Build Script

echo "🚀 Building SmartFarm for Production"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Run database migrations
echo "🗄️  Running database migrations..."
npm run migrate

# Seed database if needed
echo "🌱 Seeding database..."
npm run seed

# Start the application
echo "🚀 Starting application..."
npm start

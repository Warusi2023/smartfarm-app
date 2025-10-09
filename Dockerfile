# SmartFarm Backend Production Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm ci --only=production && npm cache clean --force

# Copy backend source code
WORKDIR /app
COPY backend/ ./backend/

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S smartfarm -u 1001

# Change ownership of the app directory
RUN chown -R smartfarm:nodejs /app
USER smartfarm

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start command
WORKDIR /app/backend
CMD ["node", "server-production.cjs"]

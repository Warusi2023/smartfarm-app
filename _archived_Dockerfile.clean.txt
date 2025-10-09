# SmartFarm Clean Build - No Husky Dependencies
FROM node:20-alpine

WORKDIR /app

# Install system packages
RUN apk add --no-cache postgresql-client curl

# Copy only the essential package files
COPY package.json ./
COPY web-project/package.json ./web-project/

# Install only production dependencies for web-project
WORKDIR /app/web-project
RUN npm install --omit=dev --no-audit --no-fund --silent

# Go back to app directory and copy source code
WORKDIR /app
COPY . .

# Create user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001

# Set permissions
RUN chown -R appuser:nodejs /app
USER appuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the web-project server
WORKDIR /app/web-project
CMD ["npm", "start"]

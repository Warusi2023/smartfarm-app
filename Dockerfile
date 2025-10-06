# Simple static file server for SmartFarm
FROM node:20-alpine

WORKDIR /app

# Copy only the necessary files
COPY web-project/server.js ./
COPY web-project/config.js ./
COPY web-project/public ./public

# Install only serve for static file serving
RUN npm install -g serve@14.2.1

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
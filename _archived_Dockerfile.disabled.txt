# Simple static file server for SmartFarm
FROM node:20-alpine

WORKDIR /app

# Copy the correct files from root directory
COPY server.js ./
COPY public ./public

# Install only serve for static file serving
RUN npm install -g serve@14.2.1

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
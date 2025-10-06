# ---------- Production runtime for Node.js static server ----------
FROM node:20-alpine AS production
WORKDIR /app

# Copy the web-project files
COPY web-project/package*.json ./
COPY web-project/server.js ./
COPY web-project/config.js ./
COPY web-project/public ./public

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HUSKY=0
ENV CI=1

# Expose the port
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]
# ---------- Base image ----------
FROM node:20-alpine AS base
WORKDIR /app

# Useful tools (curl/psql client if you need them)
RUN apk add --no-cache postgresql-client curl

# Copy only manifests first (cacheable)
COPY package*.json ./
COPY web-project/package*.json ./web-project/

# Disable husky during install in CI
ENV HUSKY=0
# No lifecycle scripts from dependencies during install
ENV npm_config_ignore_scripts=true
# Production install at root
RUN npm ci --omit=dev && npm cache clean --force || npm install --omit=dev && npm cache clean --force

# Production install for web-project
WORKDIR /app/web-project
RUN npm ci --omit=dev && npm cache clean --force || npm install --omit=dev && npm cache clean --force

# ---------- Build web ----------
FROM node:20-alpine AS build-web
WORKDIR /app

COPY --from=base /app /app
# Now copy the actual source
COPY . .

# Re-enable scripts only for explicit build steps (not for dependency install)
ENV npm_config_ignore_scripts=false
WORKDIR /app/web-project
# If you rely on Vite/React build
RUN npm run build

# ---------- Production runtime ----------
FROM node:20-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S smartfarm -u 1001

# Copy installs and built assets
COPY --from=base /app /app
COPY --from=build-web /app/web-project/dist /app/web-project/dist
COPY --chown=smartfarm:nodejs ./web-project/public /app/web-project/public
COPY --chown=smartfarm:nodejs package*.json ./

# Keep Husky disabled in runtime
ENV HUSKY=0
ENV NODE_ENV=production
ENV PORT=3000

# Switch to non-root user
USER smartfarm

# If your server entry is server.js in root:
CMD ["node", "server.js"]

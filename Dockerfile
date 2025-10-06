# -------- Base image
FROM node:20-alpine AS base
WORKDIR /app

# Disable npm progress noise and audits in CI
ENV NODE_ENV=production \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    NPM_CONFIG_LOGLEVEL=warn

# IMPORTANT: disable Husky hooks during container builds
# (Husky respects HUSKY=0 and will skip "prepare")
ENV HUSKY=0 CI=1

# -------- deps layer for root (if you have backend bits here)
FROM base AS deps-root
COPY package*.json ./
# Don't run lifecycle scripts in production layer (pre/prepare/post)
RUN npm ci --omit=dev --ignore-scripts

# -------- deps layer for web frontend
FROM base AS deps-web
WORKDIR /app/web-project
COPY web-project/package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# -------- build web
FROM base AS build-web
WORKDIR /app/web-project
COPY --from=deps-web /app/web-project/node_modules ./node_modules
# Copy the rest of the frontend source
COPY web-project/. .
# If you have a prebuild step, it will be skipped because of --ignore-scripts above
RUN npm run build

# -------- runtime (static server)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Tiny static server
RUN npm i -g serve@14.2.1

# Copy built assets
COPY --from=build-web /app/web-project/dist ./dist

# Railway will pass PORT; serve will bind to it
EXPOSE 8080
ENV PORT=8080
CMD ["serve", "-s", "dist", "-l", "8080"]

# Notes:
# - We never run npm install with scripts during build, so husky cannot break it.
# - HUSKY=0 ensures prepare is ignored even if scripts were allowed.
# - If you need SSR or a Node server instead of static, replace the last stage accordingly.

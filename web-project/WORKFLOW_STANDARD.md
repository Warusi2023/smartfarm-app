# SmartFarm Web Project - Standard Workflow

## 🎯 Standardized Development & Deployment

All web project commands and CI/CD configurations are standardized to run from the `web-project/` directory.

## 📋 Local Development

### Standard Commands

```bash
# Navigate to web project directory
cd web-project

# Install dependencies
npm install

# Start development server (Vite dev server)
npm run dev
# Server runs on http://localhost:5173

# Build for production
npm run build
# Output: dist/

# Preview production build locally
npm run preview
# Server runs on http://localhost:4173

# Start production server (serves dist/)
npm start
# Server runs on PORT (default: 4173)
```

### Quick Start

```bash
cd web-project && npm install && npm run dev
```

## 🚀 CI/CD Configuration

### Netlify

**Configuration:** `web-project/netlify.toml`

**Dashboard Settings:**
- **Base Directory:** `web-project`
- **Build Command:** `npm install && npm run build` (auto-detected from netlify.toml)
- **Publish Directory:** `dist` (auto-detected from netlify.toml)

**How it works:**
- Netlify sets base directory to `web-project/`
- Runs `npm install && npm run build` from `web-project/`
- Publishes `web-project/dist/` directory

### Vercel

**Configuration:** `web-project/vercel.json`

**Dashboard Settings:**
- **Root Directory:** `web-project`
- **Framework Preset:** Vite
- **Build Command:** `npm install && npm run build` (auto-detected)
- **Output Directory:** `dist` (auto-detected)

**How it works:**
- Vercel sets root directory to `web-project/`
- Runs `npm install && npm run build` from `web-project/`
- Serves `web-project/dist/` directory

### Railway

**Configuration:** `web-project/railway.toml`

**Dashboard Settings:**
- **Root Directory:** `web-project`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start` (production) or `npm run dev` (development)

**How it works:**
- Railway sets root directory to `web-project/`
- Runs build command from `web-project/`
- Starts server from `web-project/`

### GitHub Actions (if used)

**Example workflow:**

```yaml
name: Deploy Web

on:
  push:
    branches: [main]
    paths:
      - 'web-project/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        working-directory: ./web-project
        run: npm install
      
      - name: Build
        working-directory: ./web-project
        run: npm run build
      
      - name: Deploy
        # Add your deployment step here
```

## 📁 Project Structure

```
web-project/
├── public/          # Static assets (served as-is)
├── src/            # Source files (TypeScript, etc.)
├── dist/           # Build output (generated)
├── scripts/        # Build and deployment scripts
├── tests/          # Test files
├── package.json     # Dependencies and scripts
├── vite.config.ts   # Vite configuration
├── netlify.toml     # Netlify configuration
├── vercel.json      # Vercel configuration
└── railway.toml     # Railway configuration
```

## 🔧 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Vite dev server (http://localhost:5173) |
| `build` | `npm run build` | Build for production (output: `dist/`) |
| `preview` | `npm run preview` | Preview production build (http://localhost:4173) |
| `start` | `npm start` | Serve production build (uses `serve` package) |

## 🌐 Environment Variables

Create `.env` file in `web-project/` directory:

```bash
# API Configuration
VITE_API_URL=https://smartfarm-app-production.up.railway.app
VITE_API_BASE_URL=https://smartfarm-app-production.up.railway.app

# App Configuration
VITE_APP_NAME=SmartFarm
VITE_APP_VERSION=1.0.0
```

**Note:** Vite requires `VITE_` prefix for client-side environment variables.

## ✅ Verification Checklist

- [ ] All commands run from `web-project/` directory
- [ ] `npm run dev` starts development server
- [ ] `npm run build` creates `dist/` directory
- [ ] Netlify base directory set to `web-project`
- [ ] Vercel root directory set to `web-project`
- [ ] Railway root directory set to `web-project`
- [ ] CI/CD workflows use `working-directory: ./web-project`

## 📝 Notes

1. **Always run commands from `web-project/`**: All npm scripts assume they're run from the `web-project/` directory.

2. **CI/CD Base Directory**: All platforms should be configured to use `web-project/` as the base/root directory in their dashboard settings.

3. **Build Output**: Production builds output to `web-project/dist/`, which is served by production servers.

4. **Development Server**: Use `npm run dev` for local development. It uses Vite's HMR (Hot Module Replacement) for fast development.

5. **Production Server**: Use `npm start` to serve the built files locally, or deploy `dist/` to a static hosting service.

## 🐛 Troubleshooting

### "Command not found" errors
- Ensure you're in the `web-project/` directory
- Run `npm install` first

### Build fails in CI/CD
- Verify base directory is set to `web-project/` in platform dashboard
- Check that `package.json` exists in `web-project/`
- Ensure Node.js version matches (>=18.17 <=22)

### Port already in use
- Change port in `vite.config.ts` or use `--port` flag
- Kill process using the port: `lsof -ti:5173 | xargs kill` (macOS/Linux)


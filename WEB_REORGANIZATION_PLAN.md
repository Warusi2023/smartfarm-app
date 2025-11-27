# Web Project Reorganization Plan

## Files/Folders to Move to web-project/

### Configuration Files
1. `package.json` → `web-project/package.json` (check for conflicts)
2. `package-lock.json` → `web-project/package-lock.json` (check for conflicts)
3. `netlify.toml` → `web-project/netlify.toml` (merge with existing)
4. `playwright.config.js` → `web-project/playwright.config.js` (merge with existing)
5. `_headers` → `web-project/_headers` (merge with existing)
6. `Procfile` → `web-project/Procfile` (check for conflicts)
7. `nixpacks.toml` → `web-project/nixpacks.toml` (check for conflicts)

### Source Files
8. `public/` → `web-project/public/` (merge carefully - web-project already has public/)

### Dependencies
9. `node_modules/` → DELETE (will be regenerated from package.json)

### Environment Files
10. `frontend.env.example` → `web-project/frontend.env.example`
11. `frontend-production.env` → `web-project/frontend-production.env`

### Deployment Scripts (Web-related)
12. `deploy-netlify.ps1` → `web-project/scripts/deploy-netlify.ps1`
13. `deploy-to-netlify.ps1` → `web-project/scripts/deploy-to-netlify.ps1`
14. `deploy-web-version.ps1` → `web-project/scripts/deploy-web-version.ps1`
15. `deploy-web.ps1` → `web-project/scripts/deploy-web.ps1`
16. `deploy-frontend-netlify.ps1` → `web-project/scripts/deploy-frontend-netlify.ps1`
17. `quick-deploy-netlify.ps1` → `web-project/scripts/quick-deploy-netlify.ps1`
18. `quick-deploy.ps1` → `web-project/scripts/quick-deploy.ps1`
19. `deploy-static.ps1` → `web-project/scripts/deploy-static.ps1`
20. `deploy-simple.ps1` → `web-project/scripts/deploy-simple.ps1`
21. `deploy-to-platforms.ps1` → `web-project/scripts/deploy-to-platforms.ps1`
22. `deploy-now.ps1` → `web-project/scripts/deploy-now.ps1`
23. `deploy-production.ps1` → `web-project/scripts/deploy-production.ps1`
24. `deploy-complete.ps1` → `web-project/scripts/deploy-complete.ps1`
25. `simple-deploy.ps1` → `web-project/scripts/simple-deploy.ps1`

## Files to Keep at Root

- `LICENSE` - Repo-wide license
- `README.md` - If repo-wide (check content)
- `backend/` - Separate backend project
- `android-project/` - Separate Android project
- `backend-production.env` - Backend-specific
- `env.template` - Backend-specific (based on content)
- Other project folders (ios, shared, etc.)
- Repo-level documentation files

## Conflict Resolution Strategy

1. **package.json**: Compare both files, merge dependencies if needed
2. **netlify.toml**: Use web-project version as base, merge redirects/headers from root
3. **playwright.config.js**: Use web-project version (more complete)
4. **public/**: Merge directories, prefer web-project structure
5. **node_modules/**: Delete root version, regenerate from web-project/package.json

## Path Updates Needed

After moving files, update:
- `netlify.toml` - Update paths if they reference root
- `playwright.config.js` - Update test paths if needed
- Deployment scripts - Update paths to web-project/


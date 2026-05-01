# Legacy Deployment Scripts

These scripts are historical and are not part of the current production deploy path.

- They may reference deprecated entrypoints such as `server-production.cjs` or `server-simple.cjs`.
- They may contain outdated assumptions about env vars or infrastructure.

## MUST NOT use for current production deploys

Use canonical backend deploy docs and runtime only:
- `backend/package.json` (`npm start` -> `node server.js`)
- `backend/DEPLOYMENT.md`
- `backend/scripts/run-migrations.js` (`npm run migrate:prod`)

# LEGACY SCRIPT (do not use for release)
# This file previously embedded demo credentials and targeted deprecated backend-api paths.
# Canonical release path is backend/ with environment-injected secrets only.

Write-Host "ERROR: setup-production-db.ps1 is legacy and intentionally disabled." -ForegroundColor Red
Write-Host "Use backend/scripts/run-migrations.js via 'npm run migrate:prod' from backend/." -ForegroundColor Yellow
Write-Host "Provide DATABASE_URL/JWT_SECRET/API_SECRET through environment variables." -ForegroundColor Yellow
exit 1
# Provisions local Android secrets for :app builds (not for CI).
# Usage (from android-project/):
#   .\scripts\provision-android-secrets.ps1

$ErrorActionPreference = "Stop"
$appDir = (Resolve-Path (Join-Path $PSScriptRoot "..\app")).Path

$localProps = Join-Path $appDir "local.properties"
$localExample = Join-Path $appDir "local.properties.example"
if (-not (Test-Path $localProps) -and (Test-Path $localExample)) {
    Copy-Item $localExample $localProps
    Write-Host "Created app/local.properties from template. Update signing values before release builds."
}

$googleServices = Join-Path $appDir "google-services.json"
$googleExample = Join-Path $appDir "google-services.json.example"
if (-not (Test-Path $googleServices) -and (Test-Path $googleExample)) {
    Copy-Item $googleExample $googleServices
    Write-Host "Created app/google-services.json from placeholder. Replace with Firebase download for production."
}

if (Test-Path $googleServices) {
    Write-Host "OK: app/google-services.json present"
} else {
    Write-Host "Missing: app/google-services.json (download from Firebase Console)"
}

if (Test-Path $localProps) {
    Write-Host "OK: app/local.properties present"
} else {
    Write-Host "Missing: app/local.properties"
}

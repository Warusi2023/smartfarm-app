#!/usr/bin/env bash
# Provisions local Android secrets for :app builds (not for CI).
# Usage (from android-project/):
#   ./scripts/provision-android-secrets.sh

set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/../app" && pwd)"

if [[ ! -f "$APP_DIR/local.properties" && -f "$APP_DIR/local.properties.example" ]]; then
  cp "$APP_DIR/local.properties.example" "$APP_DIR/local.properties"
  echo "Created app/local.properties from template. Update signing values before release builds."
fi

if [[ ! -f "$APP_DIR/google-services.json" && -f "$APP_DIR/google-services.json.example" ]]; then
  cp "$APP_DIR/google-services.json.example" "$APP_DIR/google-services.json"
  echo "Created app/google-services.json from placeholder. Replace with Firebase download for production."
fi

if [[ -f "$APP_DIR/google-services.json" ]]; then
  echo "OK: app/google-services.json present"
else
  echo "Missing: app/google-services.json (download from Firebase Console)"
fi

if [[ -f "$APP_DIR/local.properties" ]]; then
  echo "OK: app/local.properties present"
else
  echo "Missing: app/local.properties"
fi

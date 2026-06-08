/**
 * API URL fix — single source of truth for backend origin (no trailing /api).
 * Exposes window.__SMARTFARM_RESOLVE_API_ORIGIN__ for api-client.js and sets globals.
 */
(function () {
  'use strict';

  var CANONICAL_ORIGIN = 'https://web-production-86d39.up.railway.app';
  var LEGACY_HOST_RE =
    /(?:^|\.)smartfarm-app-production\.up\.railway\.app|smartfarm-backend\.railway\.app/i;

  function normalizeToOrigin(url) {
    if (!url || typeof url !== 'string') {
      return '';
    }
    var s = url.trim().replace(/\/+$/, '');
    if (/\/api$/i.test(s)) {
      s = s.replace(/\/api$/i, '');
    }
    return s;
  }

  function isLegacyOrBlocked(origin) {
    if (!origin) {
      return true;
    }
    if (LEGACY_HOST_RE.test(origin)) {
      return true;
    }
    try {
      var host = window.location && window.location.hostname;
      var onLocalPage = host === 'localhost' || host === '127.0.0.1';
      var originIsLocal =
        /^https?:\/\/localhost\b/i.test(origin) ||
        /^https?:\/\/127\.0\.0\.1\b/i.test(origin);
      if (!onLocalPage && originIsLocal) {
        return true;
      }
    } catch (_) {}
    return false;
  }

  window.__SMARTFARM_RESOLVE_API_ORIGIN__ = function resolveApiOrigin() {
    try {
      var host = window.location && window.location.hostname;
      if (host && /(?:^|\.)smartfarm-app\.com$/i.test(host)) {
        return CANONICAL_ORIGIN;
      }
    } catch (_) {}

    var candidates = [
      window.__SMARTFARM_API_BASE__,
      window.VITE_API_BASE_URL,
      window.VITE_API_URL,
      CANONICAL_ORIGIN,
    ];
    var i;
    var resolved = CANONICAL_ORIGIN;
    for (i = 0; i < candidates.length; i++) {
      var o = normalizeToOrigin(candidates[i]);
      if (!o) {
        continue;
      }
      if (isLegacyOrBlocked(o)) {
        continue;
      }
      resolved = o;
      break;
    }
    return resolved;
  };

  var CORRECT_API_URL = window.__SMARTFARM_RESOLVE_API_ORIGIN__();

  window.VITE_API_BASE_URL = CORRECT_API_URL;
  window.VITE_API_URL = CORRECT_API_URL;
  window.__SMARTFARM_API_BASE__ = CORRECT_API_URL;

  console.log('API URL fix: forced backend origin to', CORRECT_API_URL);

  if (window.SmartFarmApiConfig) {
    window.SmartFarmApiConfig.baseUrl = CORRECT_API_URL;
  }

  if (window.SmartFarmAPI) {
    window.SmartFarmAPI.baseURL = CORRECT_API_URL;
  }

  window.verifyApiUrl = function () {
    var r = window.__SMARTFARM_RESOLVE_API_ORIGIN__();
    console.log('Resolved API origin:', r);
    console.log('  VITE_API_BASE_URL:', window.VITE_API_BASE_URL);
    console.log('  VITE_API_URL:', window.VITE_API_URL);
    console.log('  __SMARTFARM_API_BASE__:', window.__SMARTFARM_API_BASE__);
    return r === CANONICAL_ORIGIN || !isLegacyOrBlocked(r);
  };
})();

/**
 * SmartFarm API origin helpers (web).
 *
 * BASE_API_ORIGIN = scheme + host only (no trailing path). Per-request paths use /api/...
 * Set VITE_API_URL / VITE_API_BASE_URL to the origin only, e.g.:
 *   https://web-production-86d39.up.railway.app
 * Do not append /api — that causes /api/api/... when combined with getApiUrl-style builders.
 *
 * Canonical checklist: WEB_RELEASE_CHECKLIST.md (repo root).
 */
(function () {
  'use strict';
  if (window.SmartFarmApiOrigin) {
    return;
  }

  function normalizeApiOrigin(raw) {
    if (raw == null || typeof raw !== 'string') {
      return '';
    }
    var s = raw.trim().replace(/\/+$/, '');
    if (!s) {
      return '';
    }
    if (/\/api$/i.test(s)) {
      s = s.replace(/\/api$/i, '');
    }
    return s.replace(/\/+$/, '');
  }

  /**
   * @param {string} originRaw - API host origin (may wrongly end with /api; normalized)
   * @param {string} endpointRaw - e.g. "health", "/api/health", "farms", "weather-alerts/list"
   */
  function joinApiPath(originRaw, endpointRaw) {
    var origin = normalizeApiOrigin(originRaw);
    var ep = (endpointRaw || '').replace(/^\//, '');
    if (!origin) {
      if (!ep) {
        return '/api';
      }
      if (/^api\//i.test(ep) || ep.toLowerCase() === 'api') {
        return '/' + ep;
      }
      return '/api/' + ep;
    }
    if (!ep) {
      return origin + '/api';
    }
    if (/^api\//i.test(ep) || ep.toLowerCase() === 'api') {
      return origin + '/' + ep;
    }
    return origin + '/api/' + ep;
  }

  window.SmartFarmApiOrigin = {
    normalizeApiOrigin: normalizeApiOrigin,
    joinApiPath: joinApiPath,
  };
})();

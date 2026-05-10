/**
 * SmartFarm API client with centralized Bearer auth header handling.
 * Resolves API origin per request so env overrides cannot stick a stale base from cache.
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

  function resolveApiOriginFallback() {
    var candidates = [
      window.__SMARTFARM_API_BASE__,
      window.VITE_API_BASE_URL,
      window.VITE_API_URL,
      CANONICAL_ORIGIN,
    ];
    var i;
    for (i = 0; i < candidates.length; i++) {
      var o = normalizeToOrigin(candidates[i]);
      if (!o || isLegacyOrBlocked(o)) {
        continue;
      }
      return o;
    }
    return CANONICAL_ORIGIN;
  }

  function getApiOrigin() {
    if (typeof window.__SMARTFARM_RESOLVE_API_ORIGIN__ === 'function') {
      return window.__SMARTFARM_RESOLVE_API_ORIGIN__();
    }
    return resolveApiOriginFallback();
  }

  var AUTH_STORAGE_KEY = 'smartfarm_auth';

  var authToken = null;

  function persistAuth(token, user) {
    if (!token) {
      return;
    }
    try {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          token: token,
          user: user || null,
        })
      );
    } catch (_) {}
  }

  function setAuthToken(token, user) {
    authToken = token || null;
    if (authToken) {
      persistAuth(authToken, user);
    }
  }

  function getStoredToken() {
    try {
      var storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        var parsed = JSON.parse(storedAuth);
        if (parsed && parsed.token) {
          return parsed.token;
        }
      }
    } catch (_) {}
    return (
      localStorage.getItem('smartfarm_token') ||
      sessionStorage.getItem('smartfarm_token') ||
      null
    );
  }

  setAuthToken(getStoredToken());

  async function request(path, options) {
    options = options || {};
    var API_BASE = getApiOrigin();
    var method = options.method || 'GET';
    var body = options.body;
    var headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    if (authToken && !headers.Authorization) {
      headers.Authorization = 'Bearer ' + authToken;
    }

    var url = API_BASE.replace(/\/$/, '') + path;

    var res = await fetch(url, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    });

    var text = await res.text();
    var json = text ? JSON.parse(text) : null;

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        try {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        } catch (_) {}
      }
      throw json || new Error('Request failed with ' + res.status);
    }
    return json;
  }

  window.SmartFarmApiClient = {
    setAuthToken: setAuthToken,
    getAuthToken: function () {
      return authToken;
    },
    getApiOrigin: getApiOrigin,
    request: request,
    get: function (path) {
      return request(path, { method: 'GET' });
    },
    post: function (path, body) {
      return request(path, { method: 'POST', body: body });
    },
    put: function (path, body) {
      return request(path, { method: 'PUT', body: body });
    },
    del: function (path) {
      return request(path, { method: 'DELETE' });
    },
  };
})();

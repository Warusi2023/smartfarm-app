/**
 * SmartFarm API client with centralized Bearer auth header handling.
 * Works in static HTML pages.
 */
(function () {
  'use strict';

  const API_BASE =
    window.__SMARTFARM_API_BASE__ ||
    window.VITE_API_BASE_URL ||
    window.VITE_API_URL ||
    'https://web-production-86d39.up.railway.app';
  const AUTH_STORAGE_KEY = 'smartfarm_auth';

  let authToken = null;

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
    } catch (_) {
      // Ignore storage failures (private mode/quota) and continue with in-memory token.
    }
  }

  function setAuthToken(token, user) {
    authToken = token || null;
    if (authToken) {
      persistAuth(authToken, user);
    }
  }

  function getStoredToken() {
    try {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        if (parsed && parsed.token) {
          return parsed.token;
        }
      }
    } catch (_) {
      // Fall back to legacy token storage keys.
    }
    return (
      localStorage.getItem('smartfarm_token') ||
      sessionStorage.getItem('smartfarm_token') ||
      null
    );
  }

  // Initialize from storage so pages after login can send bearer auth automatically.
  setAuthToken(getStoredToken());

  async function request(path, options = {}) {
    const method = options.method || 'GET';
    const body = options.body;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    if (authToken && !headers.Authorization) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    const res = await fetch(`${API_BASE.replace(/\/$/, '')}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    });

    const text = await res.text();
    const json = text ? JSON.parse(text) : null;

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        try {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        } catch (_) {
          // Ignore storage errors during auth cleanup.
        }
      }
      throw json || new Error(`Request failed with ${res.status}`);
    }
    return json;
  }

  window.SmartFarmApiClient = {
    setAuthToken,
    getAuthToken: () => authToken,
    request,
    get: (path) => request(path, { method: 'GET' }),
    post: (path, body) => request(path, { method: 'POST', body }),
    put: (path, body) => request(path, { method: 'PUT', body }),
    del: (path) => request(path, { method: 'DELETE' }),
  };
})();


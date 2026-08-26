/**
 * Shared E2E API base URL resolution for the browser matrix.
 * Always resolves to the local mock API (127.0.0.1/localhost).
 * Never uses RAILWAY_API_BASE — that is railway-smoke only.
 */

function normalizeOrigin(url) {
  return String(url || '')
    .trim()
    .replace(/\/+$/, '')
    .replace(/\/api$/i, '');
}

function isLocalMockOrigin(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    return (
      (host === '127.0.0.1' || host === 'localhost') &&
      (parsed.protocol === 'http:' || parsed.protocol === 'https:')
    );
  } catch {
    return false;
  }
}

function getE2EApiBase() {
  // Accept env overrides only when they already point at the local mock.
  // Inherited Railway / production URLs are ignored so the matrix cannot
  // accidentally talk to live backends.
  const candidates = [
    process.env.PLAYWRIGHT_API_BASE,
    process.env.SMARTFARM_API_BASE,
    process.env.VITE_API_BASE_URL,
    process.env.VITE_API_URL
  ];

  for (const raw of candidates) {
    const normalized = normalizeOrigin(raw);
    if (normalized && isLocalMockOrigin(normalized)) {
      return normalized;
    }
  }

  const port = process.env.PLAYWRIGHT_API_PORT || '3099';
  const hostRaw = process.env.PLAYWRIGHT_API_HOST || '127.0.0.1';
  const host =
    hostRaw === 'localhost' || hostRaw === '127.0.0.1' ? hostRaw : '127.0.0.1';
  return `http://${host}:${port}`;
}

function apiUrl(path) {
  const base = getE2EApiBase();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

module.exports = {
  getE2EApiBase,
  apiUrl,
  isLocalMockOrigin
};

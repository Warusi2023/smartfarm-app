/**
 * Resolve a single canonical public frontend origin for email links and deep links.
 * Never use comma-separated CORS_ORIGINS as a single URL.
 */

const ENV_KEYS_EMAIL = [
    'PUBLIC_FRONTEND_URL',
    'FRONTEND_URL',
    'CLIENT_URL',
    'APP_URL'
];

/** @type {string|null} */
let resolvedOriginCache = null;

/**
 * @param {string} value
 * @returns {string|null} Normalized origin (no trailing slash) or null
 */
function isPlausiblePublicHost(hostname) {
    if (!hostname) return false;
    if (hostname === 'localhost') return true;
    return hostname.includes('.');
}

function normalizeOrigin(value) {
    if (!value || typeof value !== 'string') return null;
    const trimmed = value.trim();
    if (!trimmed || trimmed.includes(',')) return null;

    if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed) && !/^https?:\/\//i.test(trimmed)) {
        return null;
    }

    try {
        const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
        const parsed = new URL(withScheme);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
        if (!isPlausiblePublicHost(parsed.hostname)) return null;
        return parsed.origin;
    } catch {
        return null;
    }
}

/**
 * @param {string} raw
 * @returns {{ origin: string|null, hadMultiple: boolean, source: string }}
 */
function pickFirstOriginFromEnvValue(raw, source) {
    if (!raw || typeof raw !== 'string') {
        return { origin: null, hadMultiple: false, source };
    }
    const parts = raw.split(',').map((s) => s.trim()).filter(Boolean);
    const hadMultiple = parts.length > 1;

    for (const part of parts) {
        const origin = normalizeOrigin(part);
        if (origin) {
            return { origin, hadMultiple, source };
        }
    }
    return { origin: null, hadMultiple, source };
}

/**
 * @param {string} href
 * @returns {boolean}
 */
function isAbsoluteHttpUrl(href) {
    try {
        const parsed = new URL(href);
        return (
            (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
            Boolean(parsed.hostname) &&
            !href.includes(',')
        );
    } catch {
        return false;
    }
}

/**
 * @returns {string} Canonical frontend origin for absolute links in emails
 */
function resolvePublicFrontendUrl() {
    if (resolvedOriginCache) {
        return resolvedOriginCache;
    }

    for (const key of ENV_KEYS_EMAIL) {
        const raw = process.env[key];
        if (!raw) continue;

        const { origin, hadMultiple, source } = pickFirstOriginFromEnvValue(raw, key);
        if (origin) {
            if (hadMultiple) {
                console.warn(
                    `[frontendUrl] ${source} contains multiple URLs; using first valid origin only for email links: ${origin}`
                );
            }
            resolvedOriginCache = origin;
            return origin;
        }
        console.warn(`[frontendUrl] ${source} is set but no valid http(s) URL found`);
    }

    if (process.env.CORS_ORIGINS || process.env.ALLOWED_ORIGINS) {
        console.error(
            '[frontendUrl] CORS_ORIGINS/ALLOWED_ORIGINS must not be used for email links. Set PUBLIC_FRONTEND_URL to one canonical frontend origin.'
        );
    }

    const fallback = 'http://localhost:5173';
    console.warn(`[frontendUrl] No valid PUBLIC_FRONTEND_URL/FRONTEND_URL; falling back to ${fallback}`);
    resolvedOriginCache = fallback;
    return fallback;
}

/**
 * @param {string} pathname - e.g. /verify-email.html
 * @returns {string}
 */
function sanitizePathname(pathname) {
    if (!pathname || typeof pathname !== 'string') {
        throw new Error('[frontendUrl] pathname is required');
    }
    const trimmed = pathname.trim();
    const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    if (withLeading.includes('//')) {
        throw new Error('[frontendUrl] Invalid pathname: must not contain "//"');
    }
    return withLeading;
}

/**
 * @param {string} pathname - e.g. /verify-email.html
 * @param {Record<string, string>} [query]
 * @returns {string}
 */
function buildPublicFrontendUrl(pathname, query = {}) {
    const base = resolvePublicFrontendUrl();
    const path = sanitizePathname(pathname);
    const baseWithSlash = base.endsWith('/') ? base : `${base}/`;
    const url = new URL(path, baseWithSlash);

    for (const [key, value] of Object.entries(query)) {
        if (value != null && value !== '') {
            url.searchParams.set(key, String(value));
        }
    }

    const href = url.href;
    if (!isAbsoluteHttpUrl(href)) {
        throw new Error(`[frontendUrl] Invalid email link generated for path ${path}`);
    }
    return href;
}

/** Clear cached origin (tests only). */
function clearResolvedOriginCache() {
    resolvedOriginCache = null;
}

module.exports = {
    resolvePublicFrontendUrl,
    normalizeOrigin,
    pickFirstOriginFromEnvValue,
    buildPublicFrontendUrl,
    sanitizePathname,
    isAbsoluteHttpUrl,
    clearResolvedOriginCache,
    ENV_KEYS_EMAIL
};

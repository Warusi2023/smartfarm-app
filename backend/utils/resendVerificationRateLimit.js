/**
 * In-memory rate limits for POST /auth/resend-verification (per email + per IP).
 * No Redis required; suitable for single-instance Railway deploys.
 */

const DEFAULT_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_MAX_PER_EMAIL = 3;
const DEFAULT_MAX_PER_IP = 10;

/** @type {Map<string, { count: number, windowStart: number }>} */
const emailBuckets = new Map();
/** @type {Map<string, { count: number, windowStart: number }>} */
const ipBuckets = new Map();

function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
}

function normalizeIp(ip) {
    const raw = String(ip || '').split(',')[0].trim();
    return raw || 'unknown';
}

function pruneBucket(map, key, now, windowMs) {
    const entry = map.get(key);
    if (!entry) {
        return null;
    }
    if (now - entry.windowStart >= windowMs) {
        map.delete(key);
        return null;
    }
    return entry;
}

function inspectLimit(map, key, now, windowMs, max) {
    const entry = pruneBucket(map, key, now, windowMs);
    if (!entry) {
        return { allowed: true, retryAfterSec: 0, remaining: max };
    }
    if (entry.count >= max) {
        const retryAfterSec = Math.max(1, Math.ceil((entry.windowStart + windowMs - now) / 1000));
        return { allowed: false, retryAfterSec, remaining: 0 };
    }
    return { allowed: true, retryAfterSec: 0, remaining: max - entry.count };
}

function bump(map, key, now, windowMs) {
    const entry = pruneBucket(map, key, now, windowMs);
    if (!entry) {
        map.set(key, { count: 1, windowStart: now });
        return;
    }
    entry.count += 1;
}

/**
 * @param {{ email?: string, ip?: string, now?: number, windowMs?: number, maxPerEmail?: number, maxPerIp?: number }} opts
 */
function checkResendVerificationLimit(opts = {}) {
    const now = opts.now || Date.now();
    const windowMs = opts.windowMs || DEFAULT_WINDOW_MS;
    const maxPerEmail = opts.maxPerEmail || DEFAULT_MAX_PER_EMAIL;
    const maxPerIp = opts.maxPerIp || DEFAULT_MAX_PER_IP;
    const emailKey = normalizeEmail(opts.email);
    const ipKey = normalizeIp(opts.ip);

    const emailLimit = emailKey
        ? inspectLimit(emailBuckets, `email:${emailKey}`, now, windowMs, maxPerEmail)
        : { allowed: true, retryAfterSec: 0, remaining: maxPerEmail };
    const ipLimit = inspectLimit(ipBuckets, `ip:${ipKey}`, now, windowMs, maxPerIp);

    if (!emailLimit.allowed) {
        return { allowed: false, retryAfterSec: emailLimit.retryAfterSec, scope: 'email' };
    }
    if (!ipLimit.allowed) {
        return { allowed: false, retryAfterSec: ipLimit.retryAfterSec, scope: 'ip' };
    }
    return {
        allowed: true,
        retryAfterSec: 0,
        remainingEmail: emailLimit.remaining,
        remainingIp: ipLimit.remaining
    };
}

/**
 * Record a resend attempt after the request is accepted into processing.
 * @param {{ email?: string, ip?: string, now?: number, windowMs?: number }} opts
 */
function recordResendVerificationAttempt(opts = {}) {
    const now = opts.now || Date.now();
    const windowMs = opts.windowMs || DEFAULT_WINDOW_MS;
    const emailKey = normalizeEmail(opts.email);
    const ipKey = normalizeIp(opts.ip);
    if (emailKey) {
        bump(emailBuckets, `email:${emailKey}`, now, windowMs);
    }
    bump(ipBuckets, `ip:${ipKey}`, now, windowMs);
}

function __resetResendVerificationRateLimitForTests() {
    emailBuckets.clear();
    ipBuckets.clear();
}

module.exports = {
    checkResendVerificationLimit,
    recordResendVerificationAttempt,
    __resetResendVerificationRateLimitForTests,
    DEFAULT_WINDOW_MS,
    DEFAULT_MAX_PER_EMAIL,
    DEFAULT_MAX_PER_IP
};

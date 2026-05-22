const {
    normalizeOrigin,
    pickFirstOriginFromEnvValue,
    resolvePublicFrontendUrl,
    buildPublicFrontendUrl,
    sanitizePathname,
    isAbsoluteHttpUrl,
    clearResolvedOriginCache
} = require('../../utils/frontendUrl');

describe('frontendUrl', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = { ...originalEnv };
        delete process.env.PUBLIC_FRONTEND_URL;
        delete process.env.FRONTEND_URL;
        delete process.env.CLIENT_URL;
        delete process.env.APP_URL;
        delete process.env.CORS_ORIGINS;
        delete process.env.ALLOWED_ORIGINS;
        clearResolvedOriginCache();
    });

    afterAll(() => {
        process.env = originalEnv;
        clearResolvedOriginCache();
    });

    test('normalizeOrigin strips trailing slash and uses URL constructor', () => {
        expect(normalizeOrigin('https://www.smartfarm-app.com/')).toBe('https://www.smartfarm-app.com');
    });

    test('normalizeOrigin rejects non-http schemes', () => {
        expect(normalizeOrigin('ftp://files.example.com')).toBeNull();
    });

    test('normalizeOrigin rejects comma-containing single value', () => {
        expect(normalizeOrigin('https://a.com,https://b.com')).toBeNull();
    });

    test('pickFirstOriginFromEnvValue uses first valid URL from comma list', () => {
        const raw = 'https://www.smartfarm-app.com,https://smartfarm-app.com,https://smartfarm-app.netlify.app';
        const { origin, hadMultiple } = pickFirstOriginFromEnvValue(raw, 'FRONTEND_URL');
        expect(hadMultiple).toBe(true);
        expect(origin).toBe('https://www.smartfarm-app.com');
    });

    test('pickFirstOriginFromEnvValue trims whitespace around comma-separated values', () => {
        const raw = '  https://www.smartfarm-app.com , https://smartfarm-app.com ';
        const { origin } = pickFirstOriginFromEnvValue(raw, 'PUBLIC_FRONTEND_URL');
        expect(origin).toBe('https://www.smartfarm-app.com');
    });

    test('resolvePublicFrontendUrl prefers PUBLIC_FRONTEND_URL over FRONTEND_URL', () => {
        process.env.FRONTEND_URL = 'https://wrong.example.com';
        process.env.PUBLIC_FRONTEND_URL = 'https://www.smartfarm-app.com';
        expect(resolvePublicFrontendUrl()).toBe('https://www.smartfarm-app.com');
    });

    test('resolvePublicFrontendUrl uses first entry from comma-separated PUBLIC_FRONTEND_URL', () => {
        process.env.PUBLIC_FRONTEND_URL =
            'https://www.smartfarm-app.com,https://smartfarm-app.netlify.app';
        expect(resolvePublicFrontendUrl()).toBe('https://www.smartfarm-app.com');
    });

    test('resolvePublicFrontendUrl does not read CORS_ORIGINS', () => {
        process.env.CORS_ORIGINS =
            'https://www.smartfarm-app.com,https://smartfarm-app.netlify.app';
        clearResolvedOriginCache();
        expect(resolvePublicFrontendUrl()).toBe('http://localhost:5173');
    });

    test('buildPublicFrontendUrl produces absolute verify-email link without commas', () => {
        process.env.PUBLIC_FRONTEND_URL = 'https://www.smartfarm-app.com';
        const link = buildPublicFrontendUrl('/verify-email.html', { token: 'abc123' });
        expect(link).toBe('https://www.smartfarm-app.com/verify-email.html?token=abc123');
        expect(isAbsoluteHttpUrl(link)).toBe(true);
        expect(link).not.toContain(',');
        expect(link).not.toContain('//verify');
    });

    test('buildPublicFrontendUrl avoids double slash when base has trailing slash', () => {
        process.env.PUBLIC_FRONTEND_URL = 'https://www.smartfarm-app.com/';
        const link = buildPublicFrontendUrl('/verify-email.html', { token: 'x' });
        expect(link).toBe('https://www.smartfarm-app.com/verify-email.html?token=x');
    });

    test('buildPublicFrontendUrl accepts pathname without leading slash', () => {
        process.env.PUBLIC_FRONTEND_URL = 'https://www.smartfarm-app.com';
        const link = buildPublicFrontendUrl('verify-email.html', { token: 'x' });
        expect(link).toBe('https://www.smartfarm-app.com/verify-email.html?token=x');
    });

    test('sanitizePathname rejects double slashes in path', () => {
        expect(() => sanitizePathname('//verify-email.html')).toThrow(/must not contain/i);
    });

    test('invalid PUBLIC_FRONTEND_URL falls back to localhost (no comma in link)', () => {
        process.env.PUBLIC_FRONTEND_URL = 'not-a-valid-url';
        const link = buildPublicFrontendUrl('/verify-email.html', { token: 'secret-token-xyz' });
        expect(link).toMatch(/^https?:\/\/localhost:5173\/verify-email\.html\?token=/);
        expect(link).not.toContain(',');
    });

    test('buildPublicFrontendUrl recovers when FRONTEND_URL was comma-separated (CORS copy mistake)', () => {
        process.env.FRONTEND_URL =
            'https://www.smartfarm-app.com,https://smartfarm-app.com,https://smartfarm-app.netlify.app';
        const link = buildPublicFrontendUrl('/verify-email.html', { token: 't' });
        expect(link.startsWith('https://www.smartfarm-app.com/verify-email.html?token=')).toBe(true);
        expect(link.includes(',')).toBe(false);
    });
});

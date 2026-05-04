/**
 * Live production smoke: verifies deployed API responds on /api/health.
 * Set SMARTFARM_API_BASE to override (no trailing slash).
 */
const PROD_BASE = (process.env.SMARTFARM_API_BASE || 'https://web-production-86d39.up.railway.app').replace(
    /\/$/,
    ''
);

describe('Production /api/health', () => {
    it('returns JSON with an ok field', async () => {
        const res = await fetch(`${PROD_BASE}/api/health`, { method: 'GET' });
        expect(res.status).toBeGreaterThanOrEqual(200);
        expect(res.status).toBeLessThan(600);
        const ct = res.headers.get('content-type') || '';
        expect(ct).toMatch(/json/i);
        const body = await res.json();
        expect(body).toHaveProperty('ok');
        expect(typeof body.ok).toBe('boolean');
    }, 20000);
});

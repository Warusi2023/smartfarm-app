const { shouldProxyToApi } = require('../../scripts/api-proxy-utils');

describe('api proxy routing', () => {
    it('proxies /api and /api/* paths', () => {
        expect(shouldProxyToApi('/api')).toBe(true);
        expect(shouldProxyToApi('/api/auth/profile')).toBe(true);
        expect(shouldProxyToApi('/api/auth/me')).toBe(true);
        expect(shouldProxyToApi('/api/health')).toBe(true);
    });

    it('does not proxy static asset paths', () => {
        expect(shouldProxyToApi('/dashboard.html')).toBe(false);
        expect(shouldProxyToApi('/js/api-service.js')).toBe(false);
        expect(shouldProxyToApi('/')).toBe(false);
    });
});

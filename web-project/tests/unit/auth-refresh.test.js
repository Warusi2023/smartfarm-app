/**
 * Token refresh parsing and storage (api-service.js).
 */
const fs = require('fs');
const path = require('path');

const store = {};
const localStorage = {
    getItem: (k) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; }
};
const sessionStorage = {
    getItem: (k) => null,
    setItem: () => {},
    removeItem: () => {}
};

global.localStorage = localStorage;
global.sessionStorage = sessionStorage;
global.window = global;
global.document = { readyState: 'complete', addEventListener: () => {} };
global.fetch = jest.fn();

const src = fs.readFileSync(path.join(__dirname, '../../public/js/api-service.js'), 'utf8');
// eslint-disable-next-line no-eval
eval(src);
const SmartFarmAPIService = module.exports;

describe('SmartFarmAPIService refreshTokenSafely', () => {
    beforeEach(() => {
        Object.keys(store).forEach((k) => delete store[k]);
        store.smartfarm_refresh_token = 'refresh-old';
        store.smartfarm_remember = 'true';
        jest.clearAllMocks();
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                success: true,
                data: {
                    token: 'jwt-new',
                    refreshToken: 'refresh-new',
                    user: { id: 'u1', email: 'a@b.com' }
                }
            })
        });
    });

    it('reads nested data.token and rotates refresh token', async () => {
        const api = new SmartFarmAPIService();
        api.baseURL = 'https://api.example.com';
        api.isUsableJwt = () => true;

        const ok = await api.refreshTokenSafely();

        expect(ok).toBe(true);
        expect(fetch).toHaveBeenCalledWith(
            'https://api.example.com/api/auth/refresh',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ refreshToken: 'refresh-old' })
            })
        );
        expect(store.smartfarm_token).toBe('jwt-new');
        expect(store.smartfarm_refresh_token).toBe('refresh-new');
    });

    it('clears stale refresh token on 401', async () => {
        global.fetch.mockResolvedValue({ ok: false, status: 401 });
        const api = new SmartFarmAPIService();
        api.baseURL = 'https://api.example.com';

        const ok = await api.refreshTokenSafely();

        expect(ok).toBe(false);
        expect(store.smartfarm_refresh_token).toBeUndefined();
    });
});

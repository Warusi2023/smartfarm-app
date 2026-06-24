/**
 * Static checks for auth/traceability/pricing pages (no production calls).
 */
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../../public');

function readPublic(name) {
    return fs.readFileSync(path.join(publicDir, name), 'utf8');
}

describe('post-deploy auth and link pages', () => {
    it('forgot-password posts to /auth/forgot-password', () => {
        const html = readPublic('forgot-password.html');
        expect(html).toMatch(/\/auth\/forgot-password/);
        expect(html).toMatch(/data\.message/);
    });

    it('reset-password reads token query and posts newPassword', () => {
        const html = readPublic('reset-password.html');
        expect(html).toMatch(/get\('token'\)/);
        expect(html).toMatch(/\/auth\/reset-password/);
        expect(html).toMatch(/newPassword/);
    });

    it('traceability accepts product and id query params', () => {
        const html = readPublic('traceability.html');
        expect(html).toMatch(/get\('id'\)/);
        expect(html).toMatch(/get\('product'\)/);
    });

    it('pricing Features nav uses root hash anchor', () => {
        const html = readPublic('pricing.html');
        expect(html).toMatch(/href="\/#features"/);
    });
});

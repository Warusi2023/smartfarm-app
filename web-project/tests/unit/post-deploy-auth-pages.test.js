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

    it('login shows resend verification only after EMAIL_NOT_VERIFIED', () => {
        const html = readPublic('login.html');
        const resendJs = fs.readFileSync(
            path.join(publicDir, 'js/login-resend-verification.js'),
            'utf8'
        );
        expect(html).toMatch(/login-resend-verification\.js/);
        expect(html).toMatch(/loginResendVerificationMount/);
        expect(html).toMatch(/EMAIL_NOT_VERIFIED/);
        expect(resendJs).toMatch(/\/api\/auth\/resend-verification/);
        expect(resendJs).toMatch(/Resend verification email/);
    });
});

/**
 * Login resend-verification UI controller (EMAIL_NOT_VERIFIED path).
 * Uses a minimal DOM stub (no jsdom dependency).
 */
const fs = require('fs');
const path = require('path');

function createEl(tag, attrs) {
    const el = {
        tagName: String(tag).toUpperCase(),
        attrs: Object.assign({}, attrs || {}),
        children: [],
        style: {},
        className: '',
        textContent: '',
        hidden: false,
        disabled: false,
        _listeners: {},
        get classList() {
            const self = this;
            return {
                add(...names) {
                    const set = new Set(String(self.className || '').split(/\s+/).filter(Boolean));
                    names.forEach((n) => set.add(n));
                    self.className = Array.from(set).join(' ');
                },
                remove(...names) {
                    const set = new Set(String(self.className || '').split(/\s+/).filter(Boolean));
                    names.forEach((n) => set.delete(n));
                    self.className = Array.from(set).join(' ');
                }
            };
        },
        setAttribute(k, v) {
            this.attrs[k] = String(v);
        },
        getAttribute(k) {
            return this.attrs[k];
        },
        addEventListener(type, fn) {
            this._listeners[type] = this._listeners[type] || [];
            this._listeners[type].push(fn);
        },
        appendChild(child) {
            this.children.push(child);
            child.parentNode = this;
            return child;
        },
        querySelector(sel) {
            return queryAll(this).find((n) => matches(n, sel)) || null;
        },
        querySelectorAll(sel) {
            return queryAll(this).filter((n) => matches(n, sel));
        }
    };
    Object.defineProperty(el, 'innerHTML', {
        get() {
            return this._innerHTML || '';
        },
        set(html) {
            this._innerHTML = String(html);
            this.children = parseSimpleHtml(String(html));
            this.children.forEach((c) => {
                c.parentNode = this;
            });
        }
    });
    return el;
}

function parseSimpleHtml(html) {
    // Supports the small static tree written by createLoginResendController.
    const root = createEl('fragment');
    const open = /<(\w+)([^>]*)>/g;
    const stack = [root];
    let lastIndex = 0;
    let match;
    const tokens = [];
    const re = /<\/?([a-zA-Z0-9]+)([^>]*)>|([^<]+)/g;
    while ((match = re.exec(html))) {
        if (match[0].startsWith('</')) {
            stack.pop();
        } else if (match[1]) {
            const tag = match[1];
            const attrStr = match[2] || '';
            const attrs = {};
            const attrRe = /([a-zA-Z0-9:-]+)(?:="([^"]*)")?/g;
            let am;
            while ((am = attrRe.exec(attrStr))) {
                attrs[am[1]] = am[2] !== undefined ? am[2] : true;
            }
            const node = createEl(tag, attrs);
            if (attrs.id) node.id = attrs.id;
            if (attrs.class) node.className = attrs.class;
            if (attrs.hidden !== undefined) node.hidden = true;
            if (attrs.type) node.type = attrs.type;
            stack[stack.length - 1].appendChild(node);
            if (!match[0].endsWith('/>') && !['br', 'input', 'img', 'hr'].includes(tag)) {
                stack.push(node);
            }
            lastIndex = re.lastIndex;
        } else if (match[3]) {
            const text = match[3].replace(/\s+/g, ' ').trim();
            if (text && stack.length) {
                stack[stack.length - 1].textContent =
                    (stack[stack.length - 1].textContent || '') + text;
            }
        }
    }
    return root.children;
}

function queryAll(node) {
    const out = [];
    function walk(n) {
        (n.children || []).forEach((c) => {
            out.push(c);
            walk(c);
        });
    }
    walk(node);
    return out;
}

function matches(node, sel) {
    if (sel.startsWith('#')) {
        return node.id === sel.slice(1) || node.attrs.id === sel.slice(1);
    }
    if (sel.startsWith('.')) {
        return String(node.className || '')
            .split(/\s+/)
            .includes(sel.slice(1));
    }
    return String(node.tagName).toLowerCase() === sel.toLowerCase();
}

function loadApi() {
    const src = fs.readFileSync(
        path.join(__dirname, '../../public/js/login-resend-verification.js'),
        'utf8'
    );
    const module = { exports: {} };
    const window = { document: { body: createEl('body') } };
    // eslint-disable-next-line no-new-func
    const run = new Function(
        'window',
        'module',
        'globalThis',
        'setInterval',
        'clearInterval',
        'Date',
        `${src}\n; return module.exports || window.SmartFarmLoginResend;`
    );
    return run(window, module, window, setInterval, clearInterval, Date);
}

describe('login resend verification UI', () => {
    let api;
    let emailValue;
    let panel;
    let postJson;
    let controller;

    beforeEach(() => {
        jest.useFakeTimers();
        api = loadApi();
        emailValue = 'tuimalabe27@gmail.com';
        panel = createEl('div', { id: 'mount' });
        postJson = jest.fn();
        controller = api.createLoginResendController({
            panelEl: panel,
            getEmail: () => emailValue,
            postJson,
            now: () => Date.now(),
            cooldownMs: 60000
        });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('does not show the resend button until show() after unverified login', () => {
        const wrap = panel.querySelector('.login-resend-panel');
        expect(wrap.hidden).toBe(true);
        expect(controller.isVisible()).toBe(false);

        controller.show();
        expect(wrap.hidden).toBe(false);
        expect(controller.getButton().textContent).toMatch(/Resend verification email/i);
        expect(controller.getButton().disabled).toBe(false);
    });

    it('posts the login email field value to the resend endpoint', async () => {
        postJson.mockResolvedValue({
            success: true,
            code: 'VERIFICATION_EMAIL_SENT',
            message: 'Verification email sent successfully'
        });
        controller.show();
        await controller.resend();

        expect(postJson).toHaveBeenCalledWith('/api/auth/resend-verification', {
            email: 'tuimalabe27@gmail.com'
        });
    });

    it('shows confirmation and starts cooldown after successful resend', async () => {
        postJson.mockResolvedValue({
            success: true,
            code: 'VERIFICATION_EMAIL_SENT'
        });
        controller.show();
        await controller.resend();

        expect(controller.getStatusEl().textContent).toBe(
            'Verification email sent. Check your inbox and spam folder.'
        );
        expect(controller.getButton().disabled).toBe(true);
        expect(controller.getCountdownEl().textContent).toMatch(/Resend available in \d+s/);

        jest.advanceTimersByTime(61000);
        expect(controller.getButton().disabled).toBe(false);
        expect(controller.getCountdownEl().hidden).toBe(true);
    });

    it('shows a safe EMAIL_ERROR message and does not claim success', async () => {
        postJson.mockRejectedValue({
            success: false,
            code: 'EMAIL_ERROR',
            error: 'Failed to send verification email'
        });
        controller.show();
        await controller.resend();

        expect(controller.getStatusEl().textContent).toBe(
            'We could not send the verification email right now. Please try again shortly.'
        );
        expect(controller.getStatusEl().textContent.toLowerCase()).not.toContain(
            'verification email sent'
        );
    });

    it('disables the button when the email field is empty or invalid', () => {
        controller.show();
        emailValue = '';
        controller.syncButtonEnabled();
        expect(controller.getButton().disabled).toBe(true);

        emailValue = 'not-an-email';
        controller.syncButtonEnabled();
        expect(controller.getButton().disabled).toBe(true);

        emailValue = 'ok@example.com';
        controller.syncButtonEnabled();
        expect(controller.getButton().disabled).toBe(false);
    });

    it('hides the resend panel for already-verified / non-unverified flows', () => {
        controller.show();
        expect(controller.isVisible()).toBe(true);
        controller.hide();
        expect(controller.isVisible()).toBe(false);
        expect(panel.querySelector('.login-resend-panel').hidden).toBe(true);
    });
});

describe('login.html wires EMAIL_NOT_VERIFIED to resend UI', () => {
    const loginHtml = fs.readFileSync(
        path.join(__dirname, '../../public/login.html'),
        'utf8'
    );
    const resendJs = fs.readFileSync(
        path.join(__dirname, '../../public/js/login-resend-verification.js'),
        'utf8'
    );

    it('includes the resend mount, script, and EMAIL_NOT_VERIFIED handler', () => {
        expect(loginHtml).toMatch(/loginResendVerificationMount/);
        expect(loginHtml).toMatch(/login-resend-verification\.js/);
        expect(loginHtml).toMatch(/EMAIL_NOT_VERIFIED/);
        expect(loginHtml).toMatch(/handleUnverifiedLogin/);
        expect(resendJs).toMatch(/\/api\/auth\/resend-verification/);
        expect(resendJs).toMatch(/Resend verification email/);
        expect(resendJs).toMatch(/Verification email sent\. Check your inbox and spam folder\./);
    });
});

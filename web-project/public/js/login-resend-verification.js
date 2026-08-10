/**
 * Login-page helper: show "Resend verification email" when login fails with EMAIL_NOT_VERIFIED.
 * Uses the email already entered on the login form — no second email prompt.
 */
(function (root) {
    'use strict';

    var COOLDOWN_MS = 60000;
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function isValidEmail(email) {
        return EMAIL_RE.test(String(email || '').trim());
    }

    function escapeHtml(text) {
        return String(text || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /**
     * @param {object} options
     * @param {HTMLElement} options.panelEl - container for button + status
     * @param {function(): string} options.getEmail - reads login email field
     * @param {function(string, object): Promise<object>} options.postJson - POST helper
     * @param {function(string, string)=} options.showAlert - optional page alert
     * @param {function(): number=} options.now - injectable clock
     * @param {number=} options.cooldownMs
     */
    function createLoginResendController(options) {
        var panelEl = options.panelEl;
        var getEmail = options.getEmail;
        var postJson = options.postJson;
        var showAlert = options.showAlert || function () {};
        var nowFn = options.now || function () { return Date.now(); };
        var cooldownMs = options.cooldownMs || COOLDOWN_MS;

        var cooldownUntil = 0;
        var countdownTimer = null;
        var visible = false;

        panelEl.innerHTML =
            '<div class="login-resend-panel" hidden>' +
            '  <button type="button" class="btn btn-outline-primary w-100 login-resend-btn" id="loginResendVerificationBtn">' +
            '    Resend verification email' +
            '  </button>' +
            '  <p class="login-resend-countdown small text-muted mt-2 mb-0" id="loginResendCountdown" hidden></p>' +
            '  <p class="login-resend-status small mt-2 mb-0" id="loginResendStatus" role="status" aria-live="polite"></p>' +
            '</div>';

        var wrap = panelEl.querySelector('.login-resend-panel');
        var btn = panelEl.querySelector('#loginResendVerificationBtn');
        var countdownEl = panelEl.querySelector('#loginResendCountdown');
        var statusEl = panelEl.querySelector('#loginResendStatus');

        function setStatus(message, kind) {
            statusEl.textContent = message || '';
            statusEl.className = 'login-resend-status small mt-2 mb-0';
            if (kind === 'success') {
                statusEl.classList.add('text-success');
            } else if (kind === 'error') {
                statusEl.classList.add('text-danger');
            } else {
                statusEl.classList.add('text-muted');
            }
        }

        function syncButtonEnabled() {
            var emailOk = isValidEmail(getEmail());
            var cooling = nowFn() < cooldownUntil;
            btn.disabled = !visible || !emailOk || cooling;
        }

        function tickCountdown() {
            var remainingMs = cooldownUntil - nowFn();
            if (remainingMs <= 0) {
                cooldownUntil = 0;
                countdownEl.hidden = true;
                countdownEl.textContent = '';
                if (countdownTimer) {
                    clearInterval(countdownTimer);
                    countdownTimer = null;
                }
                syncButtonEnabled();
                return;
            }
            var secs = Math.ceil(remainingMs / 1000);
            countdownEl.hidden = false;
            countdownEl.textContent = 'Resend available in ' + secs + 's';
            syncButtonEnabled();
        }

        function startCooldown() {
            cooldownUntil = nowFn() + cooldownMs;
            tickCountdown();
            if (countdownTimer) {
                clearInterval(countdownTimer);
            }
            countdownTimer = setInterval(tickCountdown, 250);
        }

        function show() {
            visible = true;
            wrap.hidden = false;
            setStatus('', '');
            syncButtonEnabled();
        }

        function hide() {
            visible = false;
            wrap.hidden = true;
            setStatus('', '');
            syncButtonEnabled();
        }

        function isVisible() {
            return visible;
        }

        async function resend() {
            var email = String(getEmail() || '').trim();
            if (!isValidEmail(email)) {
                setStatus('Enter a valid email address above, then try again.', 'error');
                syncButtonEnabled();
                return { ok: false, reason: 'invalid_email' };
            }

            btn.disabled = true;
            btn.textContent = 'Sending...';
            setStatus('', '');

            try {
                var data = await postJson('/api/auth/resend-verification', { email: email });
                var code = (data && data.code) || '';

                if (data && data.success) {
                    if (code === 'ALREADY_VERIFIED') {
                        setStatus(data.message || 'Email is already verified. You can sign in.', 'success');
                        hide();
                        showAlert(data.message || 'Email is already verified. You can sign in.', 'success');
                        btn.textContent = 'Resend verification email';
                        return { ok: true, code: code };
                    }

                    setStatus(
                        'Verification email sent. Check your inbox and spam folder.',
                        'success'
                    );
                    startCooldown();
                    btn.textContent = 'Resend verification email';
                    syncButtonEnabled();
                    return { ok: true, code: code || 'VERIFICATION_EMAIL_SENT' };
                }

                var failCode = code || (data && data.error) || '';
                var failMsg =
                    failCode === 'EMAIL_ERROR' || failCode === 'Failed to send verification email'
                        ? 'We could not send the verification email right now. Please try again shortly.'
                        : (data && (data.message || data.error)) ||
                          'We could not send the verification email right now. Please try again shortly.';
                setStatus(failMsg, 'error');
                btn.textContent = 'Resend verification email';
                syncButtonEnabled();
                return { ok: false, code: failCode };
            } catch (err) {
                var errCode = (err && err.code) || '';
                var msg;
                if (errCode === 'EMAIL_ERROR') {
                    msg = 'We could not send the verification email right now. Please try again shortly.';
                } else if (errCode === 'RATE_LIMITED' || errCode === 'RATE_LIMIT_EXCEEDED') {
                    msg = (err && err.error) || 'Too many requests. Please try again shortly.';
                    if (err && typeof err.retryAfter === 'number' && err.retryAfter > 0) {
                        cooldownUntil = nowFn() + err.retryAfter * 1000;
                        tickCountdown();
                        if (!countdownTimer) {
                            countdownTimer = setInterval(tickCountdown, 250);
                        }
                    }
                } else {
                    msg = 'We could not send the verification email right now. Please try again shortly.';
                }
                setStatus(msg, 'error');
                btn.textContent = 'Resend verification email';
                syncButtonEnabled();
                return { ok: false, code: errCode || 'NETWORK_ERROR' };
            }
        }

        btn.addEventListener('click', function () {
            resend();
        });

        return {
            show: show,
            hide: hide,
            isVisible: isVisible,
            resend: resend,
            syncButtonEnabled: syncButtonEnabled,
            isValidEmail: isValidEmail,
            escapeHtml: escapeHtml,
            getButton: function () { return btn; },
            getStatusEl: function () { return statusEl; },
            getCountdownEl: function () { return countdownEl; },
            getCooldownUntil: function () { return cooldownUntil; }
        };
    }

    var api = {
        COOLDOWN_MS: COOLDOWN_MS,
        isValidEmail: isValidEmail,
        escapeHtml: escapeHtml,
        createLoginResendController: createLoginResendController
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }
    root.SmartFarmLoginResend = api;
})(typeof window !== 'undefined' ? window : globalThis);

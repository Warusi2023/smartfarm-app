/**
 * Login Redirect Fix — demo-only overrides.
 * When window.SMARTFARM_DEMO_MODE === true, replaces performLogin / processSocialLogin
 * with local demo behavior. Production must leave SMARTFARM_DEMO_MODE unset/false.
 */

(function() {
    'use strict';

    if (window.SMARTFARM_DEMO_MODE !== true) {
        console.log('🔐 Login redirect fix skipped (set SMARTFARM_DEMO_MODE=true for demo overrides)');
        return;
    }

    console.log('🔐 Login Redirect Fix initialized (DEMO MODE)');

    function fixRegularLogin() {
        const originalPerformLogin = window.performLogin;
        if (originalPerformLogin) {
            window.performLogin = function() {
                console.log('🔧 Fixed regular login function called');

                const email = document.getElementById('email')?.value;
                const password = document.getElementById('password')?.value;
                const rememberMe = document.getElementById('rememberMe')?.checked || false;

                if (!email || !password) {
                    showAlert('Please enter both email and password', 'danger');
                    return;
                }

                const btnText = document.querySelector('.btn-text');
                const loading = document.querySelector('.loading');
                if (btnText) btnText.style.display = 'none';
                if (loading) loading.classList.add('show');

                clearAllAuthData();

                const user = {
                    email: email,
                    firstName: email.split('@')[0],
                    lastName: 'User',
                    provider: 'email'
                };

                const token = 'email-token-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
                const loginTime = new Date().toISOString();

                if (rememberMe) {
                    localStorage.setItem('smartfarm_remember', 'true');
                    localStorage.setItem('smartfarm_user', JSON.stringify(user));
                    localStorage.setItem('smartfarm_token', token);
                    localStorage.setItem('smartfarm_loginTime', loginTime);
                } else {
                    sessionStorage.setItem('smartfarm_remember', 'false');
                    sessionStorage.setItem('smartfarm_user', JSON.stringify(user));
                    sessionStorage.setItem('smartfarm_token', token);
                    sessionStorage.setItem('smartfarm_loginTime', loginTime);
                }

                showAlert('Login successful! Redirecting to dashboard...', 'success');

                setTimeout(() => {
                    console.log('🔧 Redirecting to dashboard after regular login...');
                    window.location.href = 'dashboard.html?login=success&provider=email&timestamp=' + Date.now();
                }, 1500);
            };
        }
    }

    function fixSocialLogin() {
        const originalProcessSocialLogin = window.processSocialLogin;
        if (originalProcessSocialLogin) {
            window.processSocialLogin = function(user) {
                console.log('🔧 Fixed social login function called for:', user);

                const btnText = document.querySelector('.btn-text');
                const loading = document.querySelector('.loading');
                if (btnText) btnText.style.display = 'none';
                if (loading) loading.classList.add('show');

                clearAllAuthData();

                const token = 'social-token-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
                const rememberMe = document.getElementById('rememberMe')?.checked || true;
                const loginTime = new Date().toISOString();

                if (rememberMe) {
                    localStorage.setItem('smartfarm_remember', 'true');
                    localStorage.setItem('smartfarm_user', JSON.stringify(user));
                    localStorage.setItem('smartfarm_token', token);
                    localStorage.setItem('smartfarm_loginTime', loginTime);
                } else {
                    sessionStorage.setItem('smartfarm_remember', 'false');
                    sessionStorage.setItem('smartfarm_user', JSON.stringify(user));
                    sessionStorage.setItem('smartfarm_token', token);
                    sessionStorage.setItem('smartfarm_loginTime', loginTime);
                }

                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem('smartfarm_userData', JSON.stringify(user));
                storage.setItem('smartfarm_socialProvider', user.provider);

                showAlert(`Login successful with ${user.provider.charAt(0).toUpperCase() + user.provider.slice(1)}! Redirecting to dashboard...`, 'success');

                setTimeout(() => {
                    console.log('🔧 Redirecting to dashboard after social login...');
                    window.location.href = 'dashboard.html?login=success&provider=' + user.provider + '&timestamp=' + Date.now();
                }, 1500);
            };
        }
    }

    function clearAllAuthData() {
        const keys = [
            'smartfarm_user', 'smartfarm_token', 'smartfarm_remember',
            'smartfarm_loginTime', 'smartfarm_userData', 'smartfarm_socialProvider'
        ];

        keys.forEach(key => {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        });
    }

    function showAlert(message, type = 'info') {
        const alertContainer = document.getElementById('alertContainer');
        if (alertContainer) {
            alertContainer.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
        } else {
            console.log(`Alert: ${message}`);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                fixRegularLogin();
                fixSocialLogin();
                console.log('✅ Login redirect fixes applied (DEMO MODE)');
            }, 1000);
        });
    } else {
        setTimeout(() => {
            fixRegularLogin();
            fixSocialLogin();
            console.log('✅ Login redirect fixes applied (DEMO MODE)');
        }, 1000);
    }
})();

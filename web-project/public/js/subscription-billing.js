/**
 * Farm Pro billing — Stripe Checkout redirect and subscription status UI.
 */
(function (global) {
    'use strict';

    function getToken() {
        return localStorage.getItem('authToken') ||
            localStorage.getItem('smartfarm_token') ||
            sessionStorage.getItem('authToken') ||
            sessionStorage.getItem('smartfarm_token');
    }

    function apiUrl(path) {
        if (global.SmartFarmApiConfig && typeof global.SmartFarmApiConfig.url === 'function') {
            return global.SmartFarmApiConfig.url(path);
        }
        return path;
    }

    async function apiRequest(path, options) {
        const token = getToken();
        const headers = Object.assign(
            { 'Content-Type': 'application/json', Accept: 'application/json' },
            options && options.headers ? options.headers : {}
        );
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        const res = await fetch(apiUrl(path), Object.assign({}, options || {}, { headers }));
        const data = await res.json().catch(function () {
            return { success: false, error: 'Invalid response' };
        });
        if (!res.ok) {
            const err = new Error(data.error || data.message || 'Request failed');
            err.code = data.code;
            err.status = res.status;
            err.data = data;
            throw err;
        }
        return data;
    }

    async function getCurrentSubscription() {
        if (global.SmartFarmAPI && typeof global.SmartFarmAPI.getSubscription === 'function') {
            return global.SmartFarmAPI.getSubscription();
        }
        return apiRequest('/subscriptions/current');
    }

    async function logEvent(eventType, metadata) {
        try {
            await apiRequest('/subscriptions/events', {
                method: 'POST',
                body: JSON.stringify({ eventType: eventType, metadata: metadata || {} })
            });
        } catch (e) {
            console.warn('[billing] event log failed:', eventType, e.message);
        }
    }

    async function startFarmProCheckout() {
        const res = await apiRequest('/subscriptions/create-checkout-session', { method: 'POST', body: '{}' });
        if (!res.success || !res.data || !res.data.url) {
            throw new Error('Could not start checkout');
        }
        global.location.href = res.data.url;
    }

    function planLabel(sub) {
        if (!sub) return 'Unknown';
        if (sub.planName) return sub.planName;
        if (sub.plan === 'trial') return '30-Day Free Trial';
        if (sub.plan === 'professional' || sub.plan_type === 'professional') return 'Farm Pro';
        return sub.plan || '—';
    }

    function renderUpgradeBanner(sub) {
        var mount = document.getElementById('subscription-upgrade-banner');
        if (!mount || !sub) return;

        if (sub.status === 'trial_expired') {
            logEvent('trial_expired', { source: 'dashboard' });
            global.location.replace('subscription-management.html?reason=trial_expired');
            return;
        }

        if (sub.plan !== 'trial' || sub.status !== 'active') {
            mount.innerHTML = '';
            mount.classList.add('d-none');
            return;
        }

        var days = sub.daysRemaining != null ? sub.daysRemaining : 0;
        if (days > 7) {
            mount.innerHTML = '';
            mount.classList.add('d-none');
            return;
        }

        mount.classList.remove('d-none');
        mount.innerHTML =
            '<div class="alert alert-warning d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3" role="status">' +
            '<div><strong>Trial ending soon</strong> — ' + days + ' day' + (days === 1 ? '' : 's') + ' left. ' +
            'Upgrade to Farm Pro for $29/month (up to 3 farms).</div>' +
            '<button type="button" class="btn btn-success mt-2 mt-md-0" id="sfUpgradeBannerBtn">Upgrade to Farm Pro — $29/month</button>' +
            '</div>';

        var btn = document.getElementById('sfUpgradeBannerBtn');
        if (btn) {
            btn.addEventListener('click', function () {
                startFarmProCheckout().catch(function (err) {
                    alert(err.message || 'Could not start checkout. Try subscription-management.html.');
                });
            });
        }
    }

    async function initDashboardBilling() {
        if (!getToken()) return;
        try {
            var res = await getCurrentSubscription();
            if (res && res.success && res.data) {
                renderUpgradeBanner(res.data);
            }
            logEvent('dashboard_load', {});
        } catch (err) {
            if (err.code === 'TRIAL_EXPIRED' || (err.data && err.data.code === 'TRIAL_EXPIRED')) {
                global.location.replace('subscription-management.html?reason=trial_expired');
            }
        }
    }

    async function initCheckoutPage() {
        var params = new URLSearchParams(global.location.search);
        var plan = (params.get('plan') || 'professional').toLowerCase();

        if (plan === 'trial') {
            global.location.replace('register.html?plan=trial');
            return;
        }

        if (!getToken()) {
            global.location.replace('login.html?redirect=' + encodeURIComponent(global.location.pathname + global.location.search));
            return;
        }

        var statusEl = document.getElementById('checkoutStatus');
        if (statusEl) {
            statusEl.textContent = 'Redirecting to secure checkout…';
        }

        try {
            await startFarmProCheckout();
        } catch (err) {
            if (statusEl) {
                statusEl.textContent = err.message || 'Checkout unavailable. Open subscription management to try again.';
            }
            var retry = document.getElementById('checkoutRetry');
            if (retry) retry.classList.remove('d-none');
        }
    }

    async function initSubscriptionManagement() {
        var params = new URLSearchParams(global.location.search);
        var checkout = params.get('checkout');
        var reason = params.get('reason');

        if (!getToken()) {
            global.location.replace('login.html?redirect=subscription-management.html');
            return;
        }

        var planEl = document.getElementById('sfCurrentPlan');
        var statusEl = document.getElementById('sfPlanStatus');
        var trialEl = document.getElementById('sfTrialDays');
        var upgradeBtn = document.getElementById('sfUpgradeBtn');
        var alertEl = document.getElementById('sfBillingAlert');

        try {
            var res = await getCurrentSubscription();
            var sub = res && res.data ? res.data : null;

            if (planEl) planEl.textContent = planLabel(sub);
            if (statusEl) {
                statusEl.textContent = sub && sub.status ? sub.status.replace(/_/g, ' ') : '—';
            }

            if (trialEl) {
                if (sub && sub.plan === 'trial' && sub.daysRemaining != null) {
                    trialEl.textContent = sub.daysRemaining + ' day' + (sub.daysRemaining === 1 ? '' : 's') + ' remaining';
                    trialEl.parentElement.classList.remove('d-none');
                } else {
                    trialEl.parentElement.classList.add('d-none');
                }
            }

            var showUpgrade = sub && sub.canUpgrade !== false &&
                (sub.plan === 'trial' || sub.status === 'trial_expired' || sub.status === 'no_subscription');
            if (upgradeBtn) {
                upgradeBtn.classList.toggle('d-none', !showUpgrade);
                upgradeBtn.onclick = function () {
                    startFarmProCheckout().catch(function (err) {
                        alert(err.message || 'Could not start checkout');
                    });
                };
            }

            if (alertEl) {
                if (checkout === 'success') {
                    alertEl.className = 'alert alert-success';
                    alertEl.textContent = 'Payment received. Farm Pro activates shortly after Stripe confirms your subscription.';
                    alertEl.classList.remove('d-none');
                } else if (checkout === 'cancelled') {
                    alertEl.className = 'alert alert-secondary';
                    alertEl.textContent = 'Checkout cancelled. You can upgrade anytime.';
                    alertEl.classList.remove('d-none');
                } else if (reason === 'trial_expired' || (sub && sub.status === 'trial_expired')) {
                    alertEl.className = 'alert alert-danger';
                    alertEl.textContent = 'Your 30-day trial has ended. Upgrade to Farm Pro ($29/month) to keep using SmartFarm.';
                    alertEl.classList.remove('d-none');
                    logEvent('trial_expired', { source: 'subscription-management' });
                }
            }
        } catch (err) {
            if (alertEl) {
                alertEl.className = 'alert alert-danger';
                alertEl.textContent = err.message || 'Could not load subscription status.';
                alertEl.classList.remove('d-none');
            }
        }
    }

    global.SmartFarmBilling = {
        getCurrentSubscription: getCurrentSubscription,
        startFarmProCheckout: startFarmProCheckout,
        logEvent: logEvent,
        initDashboardBilling: initDashboardBilling,
        initCheckoutPage: initCheckoutPage,
        initSubscriptionManagement: initSubscriptionManagement
    };
})(window);

/**
 * W4-04 — Entity focus routing from farm command center deep links.
 */
(function (global) {
    'use strict';

    const STORAGE_KEY = 'smartfarm_command_center_focus';
    const HIGHLIGHT_CLASS = 'sf-entity-focus';
    const HIGHLIGHT_MS = 4000;

    function parseFocusParam(raw) {
        if (!raw || typeof raw !== 'string') return null;
        const idx = raw.indexOf(':');
        if (idx <= 0) return null;
        return {
            entityType: raw.slice(0, idx),
            entityId: decodeURIComponent(raw.slice(idx + 1))
        };
    }

    function readFocus() {
        try {
            const stored = global.sessionStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (_) {
            /* ignore */
        }
        const params = new URLSearchParams(global.location.search);
        const raw = params.get('fccFocus');
        if (!raw) return null;
        const parsed = parseFocusParam(raw);
        if (!parsed) return null;
        const cropId = params.get('cropId');
        return {
            entityType: parsed.entityType,
            entityId: parsed.entityId,
            cropId: cropId || null,
            navTarget: parsed.entityType,
            meta: {}
        };
    }

    function persistFocus(focus) {
        try {
            global.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(focus));
        } catch (_) {
            /* ignore */
        }
        const params = new URLSearchParams(global.location.search);
        params.set('fccFocus', focus.entityType + ':' + focus.entityId);
        if (focus.cropId) {
            params.set('cropId', focus.cropId);
        } else {
            params.delete('cropId');
        }
        const path = global.location.pathname;
        global.history.replaceState(null, '', path + '?' + params.toString());
    }

    function clearFocusFromUrl() {
        const params = new URLSearchParams(global.location.search);
        params.delete('fccFocus');
        params.delete('cropId');
        const q = params.toString();
        global.history.replaceState(null, '', global.location.pathname + (q ? '?' + q : ''));
        try {
            global.sessionStorage.removeItem(STORAGE_KEY);
        } catch (_) {
            /* ignore */
        }
    }

    function feedItemToFocus(item) {
        if (!item || !item.id) return null;
        const kind = item.kind || item.navTarget;
        let cropId = item.cropId || null;
        if (!cropId && (kind === 'crop-action' || kind === 'soil-test') && item.entityId) {
            cropId = item.entityId;
        }
        return {
            entityType: kind,
            entityId: String(item.id),
            cropId: cropId ? String(cropId) : null,
            navTarget: item.navTarget || kind,
            meta: {
                amount: item.amount,
                title: item.title,
                subtitle: item.subtitle,
                date: kind === 'manual-revenue' ? item.subtitle : null,
                description: kind === 'manual-revenue' ? item.title : null,
                typeLabel: item.typeLabel
            }
        };
    }

    function highlightElement(el, options) {
        if (!el) return false;
        const opts = options || {};
        el.classList.add(HIGHLIGHT_CLASS);
        el.classList.add('farm-action-deep-link-highlight');
        if (opts.tabFocus !== false) {
            el.setAttribute('tabindex', '-1');
            try {
                el.focus({ preventScroll: true });
            } catch (_) {
                /* ignore */
            }
        }
        el.scrollIntoView({
            behavior: opts.smooth === false ? 'auto' : 'smooth',
            block: opts.block || 'center'
        });
        global.setTimeout(function () {
            el.classList.remove(HIGHLIGHT_CLASS);
            el.classList.remove('farm-action-deep-link-highlight');
            el.removeAttribute('tabindex');
        }, opts.duration || HIGHLIGHT_MS);
        return true;
    }

    function showFocusBanner(container, html, options) {
        if (!container) return null;
        const existing = container.querySelector('.sf-focus-banner');
        if (existing) existing.remove();
        const banner = document.createElement('div');
        banner.className =
            'sf-focus-banner alert ' + (options && options.level === 'warning' ? 'alert-warning' : 'alert-info');
        banner.setAttribute('role', 'status');
        banner.innerHTML =
            html +
            '<button type="button" class="btn-close btn-sm float-end" aria-label="Dismiss"></button>';
        banner.querySelector('.btn-close').addEventListener('click', function () {
            banner.remove();
            clearFocusFromUrl();
        });
        container.insertBefore(banner, container.firstChild);
        highlightElement(banner, { tabFocus: false });
        return banner;
    }

    function showMissingMessage(anchor, label) {
        const msg = label
            ? 'This ' + label + ' is not in the current view. It may be older or filtered out.'
            : 'This entry is not in the current view.';
        if (anchor) {
            showFocusBanner(anchor, '<strong>Not in view.</strong> ' + escapeHtml(msg), {
                level: 'warning'
            });
        }
        return false;
    }

    function resolvePageUrl(focus) {
        const t = focus.entityType || focus.navTarget;
        if (t === 'manual-revenue' || t === 'farm-revenue') {
            return 'dashboard.html';
        }
        if (t === 'feed-mix-cost' || t === 'farm-cost') {
            return t === 'feed-mix-cost' ? 'livestock-management.html' : 'crop-management.html';
        }
        if (t === 'crop-action' || t === 'soil-test') {
            return 'crop-management.html';
        }
        return null;
    }

    function isDashboardPage() {
        return /dashboard\.html$/i.test(global.location.pathname) || global.location.pathname.endsWith('/dashboard');
    }

    function applyDashboardRevenueFocus(focus) {
        const card = document.getElementById('financialOverviewCard');
        const form = document.getElementById('revenueEntryForm');
        if (!card || !form) {
            return false;
        }
        const meta = focus.meta || {};
        const amountEl = document.getElementById('revenueAmount');
        const dateEl = document.getElementById('revenueDate');
        const descEl = document.getElementById('revenueDescription');
        if (meta.amount != null && amountEl) amountEl.value = meta.amount;
        if (meta.date && dateEl) dateEl.value = String(meta.date).slice(0, 10);
        if (meta.description && descEl) descEl.value = meta.description;

        const title = meta.description || meta.title || 'Revenue entry';
        showFocusBanner(
            card,
            '<strong>Focused:</strong> ' +
                escapeHtml(title) +
                (meta.amount != null ? ' · ' + escapeHtml(String(meta.amount)) : '') +
                (meta.date ? ' · ' + escapeHtml(String(meta.date)) : '') +
                '<br><span class="small">Review below — form fields prefilled when data was available.</span>'
        );
        highlightElement(form);
        clearFocusFromUrl();
        return true;
    }

    function applyLivestockFeedCostFocus(focus) {
        const anchor =
            document.getElementById('sfFeedCostFocusAnchor') ||
            document.getElementById('feedMixCalculatorModal');
        const meta = focus.meta || {};
        if (!anchor) {
            return false;
        }
        const row = document.querySelector(
            '[data-farm-cost-id="' + CSS.escape(focus.entityId) + '"]'
        );
        if (row) {
            highlightElement(row);
            clearFocusFromUrl();
            return true;
        }
        showFocusBanner(
            anchor,
            '<strong>Feed mix cost</strong> ' +
                escapeHtml(meta.title || '') +
                (meta.amount != null ? ' · ' + escapeHtml(String(meta.amount)) : '') +
                '<br><span class="small">Recorded cost — open the calculator below to add another.</span>'
        );
        highlightElement(anchor);
        clearFocusFromUrl();
        return true;
    }

    function applyCropManagementFocus(focus) {
        const cropId = focus.cropId;
        if (focus.entityType === 'soil-test' && cropId) {
            const soilBlock = document.querySelector(
                '[data-crop-soil-id="' + CSS.escape(String(cropId)) + '"]'
            );
            const card = soilBlock && soilBlock.closest('.crop-card');
            if (card) {
                highlightElement(card);
                clearFocusFromUrl();
                return true;
            }
            return showMissingMessage(
                document.getElementById('cropRecAlertsCard'),
                'soil test'
            );
        }
        if (focus.entityType === 'crop-action' && cropId) {
            if (global.CropRecommendationLog && typeof global.CropRecommendationLog.focusCropAction === 'function') {
                return global.CropRecommendationLog.focusCropAction(cropId, focus.entityId);
            }
            const card = document.querySelector('[data-crop-card-id="' + CSS.escape(String(cropId)) + '"]');
            if (card) {
                highlightElement(card);
                clearFocusFromUrl();
                return true;
            }
            return showMissingMessage(document.getElementById('cropRecAlertsCard'), 'crop action');
        }
        return false;
    }

    function escapeHtml(s) {
        return String(s || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function navigateFromFeedItem(item) {
        const focus = feedItemToFocus(item);
        if (!focus) {
            return false;
        }
        persistFocus(focus);

        if ((focus.entityType === 'manual-revenue' || focus.navTarget === 'manual-revenue') && isDashboardPage()) {
            applyDashboardRevenueFocus(focus);
            return true;
        }

        const page = resolvePageUrl(focus);
        if (!page) {
            return false;
        }
        const params = new URLSearchParams();
        params.set('fccFocus', focus.entityType + ':' + focus.entityId);
        if (focus.cropId) params.set('cropId', focus.cropId);
        global.location.href = page + '?' + params.toString();
        return true;
    }

    function tryConsume() {
        const focus = readFocus();
        if (!focus || !focus.entityId) {
            return false;
        }

        let ok = false;
        if (
            (focus.entityType === 'manual-revenue' || focus.entityType === 'farm-revenue') &&
            isDashboardPage()
        ) {
            ok = applyDashboardRevenueFocus(focus);
        } else if (focus.entityType === 'feed-mix-cost' && /livestock-management/i.test(global.location.pathname)) {
            ok = applyLivestockFeedCostFocus(focus);
        } else if (/crop-management/i.test(global.location.pathname)) {
            ok = applyCropManagementFocus(focus);
        }

        if (!ok && focus.navTarget) {
            ok = false;
        }
        return ok;
    }

    function tryConsumeWhenReady(attempts) {
        const max = attempts != null ? attempts : 24;
        let n = 0;
        function tick() {
            if (tryConsume()) {
                return;
            }
            n += 1;
            if (n < max) {
                global.setTimeout(tick, 250);
            } else {
                const focus = readFocus();
                if (focus) {
                    const anchor =
                        document.getElementById('farm-command-center') ||
                        document.getElementById('financialOverviewCard') ||
                        document.getElementById('sfFeedCostFocusAnchor') ||
                        document.getElementById('cropRecAlertsCard') ||
                        document.body;
                    showMissingMessage(anchor, focus.meta && focus.meta.typeLabel);
                    clearFocusFromUrl();
                }
            }
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', tick);
        } else {
            tick();
        }
    }

    global.CommandCenterFocus = {
        feedItemToFocus: feedItemToFocus,
        navigateFromFeedItem: navigateFromFeedItem,
        persistFocus: persistFocus,
        readFocus: readFocus,
        clearFocusFromUrl: clearFocusFromUrl,
        highlightElement: highlightElement,
        tryConsume: tryConsume,
        tryConsumeWhenReady: tryConsumeWhenReady,
        applyDashboardRevenueFocus: applyDashboardRevenueFocus,
        HIGHLIGHT_CLASS: HIGHLIGHT_CLASS
    };

    tryConsumeWhenReady();
})(typeof window !== 'undefined' ? window : global);

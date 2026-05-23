/**
 * Dashboard "Today on farm" panel — renders FarmActionCenter buckets.
 */
(function (global) {
    'use strict';

    const CONTAINER_ID = 'todayOnFarmPanel';
    const PRIORITY_CLASS = {
        critical: 'danger',
        high: 'warning',
        medium: 'primary',
        low: 'secondary'
    };

    const SOURCE_LABEL = {
        crop: 'Crop',
        weather: 'Weather',
        local: 'Weeding'
    };

    const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;
    let panelLoading = false;

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text == null ? '' : String(text);
        return div.innerHTML;
    }

    function formatDisplayDate(isoDate) {
        if (!isoDate) return '—';
        try {
            const d = new Date(isoDate + 'T12:00:00');
            return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        } catch (e) {
            return isoDate;
        }
    }

    function todayStr() {
        return global.FarmActionCenter
            ? global.FarmActionCenter.todayDateOnly()
            : todayStrLocalFallback();
    }

    function todayStrLocalFallback() {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    function errorMessage(err, fallback) {
        if (!err) return fallback;
        if (typeof err === 'string') return err;
        return err.message || err.error || fallback;
    }

    function bucketItems(items) {
        const today = todayStr();
        const buckets = { overdue: [], today: [], upcoming: [] };

        (items || []).forEach((item) => {
            if (!item || item.status !== 'pending') return;
            if (!item.dueDate || !DATE_ONLY_RE.test(item.dueDate)) return;
            if (item.dueDate < today) buckets.overdue.push(item);
            else if (item.dueDate === today) buckets.today.push(item);
            else buckets.upcoming.push(item);
        });

        const sortFn = (a, b) => {
            if (a.dueDate !== b.dueDate) return a.dueDate < b.dueDate ? -1 : 1;
            const pri = { critical: 0, high: 1, medium: 2, low: 3 };
            return (pri[a.priority] ?? 2) - (pri[b.priority] ?? 2);
        };
        buckets.overdue.sort(sortFn);
        buckets.today.sort(sortFn);
        buckets.upcoming.sort(sortFn);
        return buckets;
    }

    function sourceLink(item) {
        if (item.source === 'crop') return 'crop-management.html';
        if (item.source === 'weather') return 'weather-alerts.html';
        if (item.source === 'local') return 'weeding-management.html';
        return null;
    }

    function renderItemRow(item) {
        const pri = PRIORITY_CLASS[item.priority] || 'secondary';
        const src = SOURCE_LABEL[item.source] || item.source;
        const href = sourceLink(item);
        const titleHtml = href
            ? `<a href="${href}" class="text-decoration-none">${escapeHtml(item.title)}</a>`
            : escapeHtml(item.title);

        let actionBtn = '';
        if (item.source === 'crop' && item.status === 'pending') {
            actionBtn = `<button type="button" class="btn btn-link btn-sm p-0 ms-2" data-farm-action-done="${escapeHtml(item.id)}" title="Mark done">Done</button>`;
        } else if (item.source === 'weather' && item.status === 'pending') {
            actionBtn = `<button type="button" class="btn btn-link btn-sm p-0 ms-2" data-farm-action-read="${escapeHtml(item.id)}" title="Mark read">Read</button>`;
        } else if (item.source === 'local' && item.status === 'pending' && item.entityId) {
            actionBtn =
                `<button type="button" class="btn btn-link btn-sm p-0 ms-1" data-farm-action-local-done="${escapeHtml(item.entityId)}" title="Mark complete">Done</button>` +
                `<button type="button" class="btn btn-link btn-sm p-0 ms-1" data-farm-action-local-reschedule="${escapeHtml(item.entityId)}" data-farm-action-due="${escapeHtml(item.dueDate)}" title="Reschedule">Later</button>`;
        }

        return `<li class="list-group-item d-flex justify-content-between align-items-start gap-2">
          <div class="flex-grow-1">
            <div class="fw-semibold">${titleHtml}</div>
            <small class="text-muted">${escapeHtml(src)} · Due ${formatDisplayDate(item.dueDate)} · <span class="badge bg-${pri}">${escapeHtml(item.type)}</span></small>
          </div>
          <div class="flex-shrink-0">${actionBtn}</div>
        </li>`;
    }

    function renderBucket(title, items, borderClass) {
        if (!items.length) {
            return `<div class="mb-3">
              <h6 class="text-${borderClass} mb-1"><i class="fas fa-circle me-1 small"></i>${escapeHtml(title)}</h6>
              <p class="text-muted small mb-0 ps-3">None</p>
            </div>`;
        }
        return `<div class="mb-3">
          <h6 class="text-${borderClass} mb-2"><i class="fas fa-circle me-1 small"></i>${escapeHtml(title)} <span class="badge bg-${borderClass}">${items.length}</span></h6>
          <ul class="list-group list-group-flush border-start border-3 border-${borderClass} ps-2 mb-0">
            ${items.map(renderItemRow).join('')}
          </ul>
        </div>`;
    }

    function renderPanelBody(buckets) {
        const total = buckets.overdue.length + buckets.today.length + buckets.upcoming.length;
        if (total === 0) {
            return `<div class="text-center py-4 text-muted">
              <i class="fas fa-check-circle fa-2x mb-2 text-success"></i>
              <p class="mb-0">No pending farm actions right now.</p>
              <p class="small mb-0">Log crop advice or check back when weather alerts are generated.</p>
            </div>`;
        }
        return (
            renderBucket('Overdue', buckets.overdue, 'danger') +
            renderBucket('Due today', buckets.today, 'warning') +
            renderBucket('Upcoming', buckets.upcoming, 'primary')
        );
    }

    async function patchCropAlertDone(normalizedId) {
        const rawId = String(normalizedId).replace(/^crop:/, '');
        const path = '/api/crop-recommendations/alerts/' + encodeURIComponent(rawId);

        if (global.SmartFarmApiClient && typeof global.SmartFarmApiClient.request === 'function') {
            return global.SmartFarmApiClient.request(path, {
                method: 'PATCH',
                body: { status: 'done' }
            });
        }

        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
        const token =
            global.localStorage?.getItem('smartfarm_token') ||
            global.sessionStorage?.getItem('smartfarm_token') ||
            global.localStorage?.getItem('auth_token') ||
            global.sessionStorage?.getItem('auth_token');
        if (token) headers.Authorization = 'Bearer ' + token;

        let url = path;
        if (global.SmartFarmApiOrigin && typeof global.SmartFarmApiOrigin.joinApiPath === 'function') {
            const raw =
                global.SmartFarmApiConfig?.baseUrl ||
                global.__SMARTFARM_API_BASE__ ||
                'https://web-production-86d39.up.railway.app';
            const origin = global.SmartFarmApiOrigin.normalizeApiOrigin(raw);
            url = global.SmartFarmApiOrigin.joinApiPath(origin, 'crop-recommendations/alerts/' + rawId);
        } else {
            const base = String(
                global.SmartFarmApiConfig?.baseUrl || global.__SMARTFARM_API_BASE__ || ''
            )
                .replace(/\/+$/, '')
                .replace(/\/api$/i, '');
            url = base + path;
        }

        const res = await fetch(url, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ status: 'done' })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || 'Could not update alert');
        return data;
    }

    function localEntityId(normalizedId) {
        return String(normalizedId || '').replace(/^local:/, '');
    }

    function promptLocalRescheduleDate(currentDue) {
        const fallback = currentDue && DATE_ONLY_RE.test(currentDue) ? currentDue : todayStr();
        const input = global.prompt('New due date (YYYY-MM-DD):', fallback);
        if (input === null) return null;
        const trimmed = String(input).trim();
        if (!DATE_ONLY_RE.test(trimmed)) {
            throw new Error('Enter a date as YYYY-MM-DD');
        }
        return trimmed;
    }

    async function markWeatherRead(normalizedId) {
        const rawId = String(normalizedId).replace(/^weather:/, '');
        const service = global.weatherAlertsService;
        if (!service || typeof service.markAsRead !== 'function') {
            throw new Error('Weather alerts service unavailable');
        }
        const res = await service.markAsRead(rawId);
        if (res && res.success === false) {
            throw new Error(res.error || 'Could not mark weather alert read');
        }
        if (service.alertsCache) {
            service.alertsCache = null;
            service.cacheTimestamp = null;
        }
        return res;
    }

    function bindPanelActions(container) {
        container.querySelectorAll('[data-farm-action-done]').forEach((btn) => {
            btn.onclick = async function () {
                const id = btn.getAttribute('data-farm-action-done');
                btn.disabled = true;
                try {
                    await patchCropAlertDone(id);
                    await refreshTodayOnFarmPanel();
                } catch (e) {
                    btn.disabled = false;
                    if (typeof global.showAlert === 'function') {
                        global.showAlert(errorMessage(e, 'Update failed'), 'danger');
                    }
                }
            };
        });

        container.querySelectorAll('[data-farm-action-read]').forEach((btn) => {
            btn.onclick = async function () {
                const id = btn.getAttribute('data-farm-action-read');
                btn.disabled = true;
                try {
                    await markWeatherRead(id);
                    await refreshTodayOnFarmPanel();
                } catch (e) {
                    btn.disabled = false;
                    if (typeof global.showAlert === 'function') {
                        global.showAlert(errorMessage(e, 'Update failed'), 'danger');
                    }
                }
            };
        });

        container.querySelectorAll('[data-farm-action-local-done]').forEach((btn) => {
            btn.onclick = async function () {
                const entityId = btn.getAttribute('data-farm-action-local-done');
                if (!global.FarmActionCenter || typeof global.FarmActionCenter.markLocalWeedingTaskDone !== 'function') {
                    return;
                }
                btn.disabled = true;
                try {
                    global.FarmActionCenter.markLocalWeedingTaskDone(entityId);
                    await refreshTodayOnFarmPanel();
                } catch (e) {
                    btn.disabled = false;
                    if (typeof global.showAlert === 'function') {
                        global.showAlert(errorMessage(e, 'Update failed'), 'danger');
                    }
                }
            };
        });

        container.querySelectorAll('[data-farm-action-local-reschedule]').forEach((btn) => {
            btn.onclick = async function () {
                const entityId = btn.getAttribute('data-farm-action-local-reschedule');
                const currentDue = btn.getAttribute('data-farm-action-due');
                if (!global.FarmActionCenter || typeof global.FarmActionCenter.rescheduleLocalWeedingTask !== 'function') {
                    return;
                }
                try {
                    const nextDate = promptLocalRescheduleDate(currentDue);
                    if (!nextDate) return;
                    btn.disabled = true;
                    global.FarmActionCenter.rescheduleLocalWeedingTask(entityId, nextDate);
                    await refreshTodayOnFarmPanel();
                } catch (e) {
                    btn.disabled = false;
                    if (typeof global.showAlert === 'function') {
                        global.showAlert(errorMessage(e, 'Reschedule failed'), 'danger');
                    }
                }
            };
        });
    }

    async function refreshTodayOnFarmPanel() {
        const el = document.getElementById(CONTAINER_ID);
        if (!el || panelLoading) return;

        if (!global.FarmActionCenter || typeof global.FarmActionCenter.fetchAllFarmActions !== 'function') {
            el.innerHTML = '<p class="text-muted small mb-0">Action center module not loaded. Refresh the page.</p>';
            return;
        }

        panelLoading = true;
        el.setAttribute('aria-busy', 'true');
        el.innerHTML = '<p class="text-muted small mb-0"><span class="spinner-border spinner-border-sm me-1"></span> Loading farm actions…</p>';

        try {
            const items = await global.FarmActionCenter.fetchAllFarmActions({ includeLocal: true });
            const buckets = bucketItems(items);
            el.innerHTML = renderPanelBody(buckets);
            bindPanelActions(el);
        } catch (e) {
            el.innerHTML =
                '<p class="text-muted small mb-0">Could not load actions. ' +
                escapeHtml(errorMessage(e, 'Try again.')) +
                '</p>';
        } finally {
            panelLoading = false;
            el.removeAttribute('aria-busy');
        }
    }

    function initTodayOnFarmPanel() {
        const refreshBtn = document.getElementById('todayOnFarmRefresh');
        if (refreshBtn && !refreshBtn.dataset.todayOnFarmBound) {
            refreshBtn.dataset.todayOnFarmBound = '1';
            refreshBtn.addEventListener('click', function () {
                refreshTodayOnFarmPanel();
            });
        }
        return refreshTodayOnFarmPanel();
    }

    global.TodayOnFarmPanel = {
        init: initTodayOnFarmPanel,
        refresh: refreshTodayOnFarmPanel,
        bucketItems
    };

    document.addEventListener('DOMContentLoaded', function () {
        if (document.getElementById(CONTAINER_ID)) {
            initTodayOnFarmPanel();
        }
    });

    global.addEventListener('smartfarm:weeding-tasks-changed', function () {
        if (document.getElementById(CONTAINER_ID) && !panelLoading) {
            refreshTodayOnFarmPanel();
        }
    });
})(typeof window !== 'undefined' ? window : global);

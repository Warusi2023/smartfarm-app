/**
 * Farm command center (W4–W5) — inbox, checklist, weekly review, weather, priorities.
 */
(function (global) {
    'use strict';

    const ROOT_ID = 'farm-command-center';
    const PERIODS = [
        { id: 'today', label: 'Today' },
        { id: '7d', label: '7 days' },
        { id: '30d', label: '30 days' }
    ];
    const FEED_FILTERS = [
        { id: 'all', label: 'All' },
        { id: 'costs', label: 'Costs' },
        { id: 'revenue', label: 'Revenue' },
        { id: 'operations', label: 'Crops & soil' }
    ];

    let currentWindow = 'today';
    let feedFilter = 'all';
    let breakdownOpen = false;
    let lastPayload = null;

    /** Where attention / feed actions navigate (dashboard scroll or page). */
    const NAV = {
        'today-on-farm': { scroll: '#today-on-farm', focus: '#todayOnFarmRefresh' },
        revenue: { scroll: '#revenueEntryForm', focus: '#revenueAmount' },
        financials: { scroll: '#financialOverviewCard', onScroll: 'showFinancialDetails' },
        'soil-test': { page: 'crop-management.html' },
        'crop-action': { page: 'crop-management.html' },
        'feed-mix-cost': { page: 'livestock-management.html', dashboardFn: 'showDashboardFeedMixCalculator' },
        'farm-cost': { page: 'crop-management.html' },
        'manual-revenue': { scroll: '#revenueEntryForm', focus: '#revenueAmount' },
        'offline-queue': { scroll: '#fcc-offline-panel' },
        'weather-alerts': { page: 'weather-alerts.html' },
        'fcc-weather-scroll': { scroll: '.fcc-weather-section' }
    };

    const ATTENTION_FALLBACK = {
        'no-activity-period': { label: 'Review tasks', target: 'today-on-farm' },
        'stale-soil': { label: 'Add soil test', target: 'soil-test' },
        'no-soil-ever': { label: 'Add soil test', target: 'soil-test' },
        'costs-no-revenue': { label: 'Add revenue', target: 'revenue' },
        'net-slipping': { label: 'Review finances', target: 'financials' },
        'offline-queue': { label: 'Sync now', action: 'sync' }
    };

    /** W4-05 — operator inbox (severity, grouping, session seen state). */
    const SEEN_STORAGE_KEY = 'smartfarm_fcc_seen';
    const REC_DISMISS_KEY = 'smartfarm_fcc_rec_dismissed';
    const PRIORITY_DONE_KEY = 'smartfarm_fcc_priority_done';
    const WEEKLY_RESET_KEY = 'smartfarm_weekly_reset_v1';
    const FEED_CLUSTER_MS = 6 * 60 * 60 * 1000;

    let resetPanelOpen = false;
    let resetStep = 1;
    let resetCarryChoices = {};
    let resetDismissed = {};
    let resetFocusSelected = [];

    const SEVERITY_ORDER = { high: 0, medium: 1, low: 2 };

    const ATTENTION_META = {
        'offline-queue': { severity: 'high', groupKey: 'pending-sync', sortOrder: 100 },
        'stale-soil': { severity: 'medium', groupKey: 'soil-health', sortOrder: 80 },
        'no-soil-ever': { severity: 'medium', groupKey: 'soil-health', sortOrder: 85 },
        'costs-no-revenue': { severity: 'medium', groupKey: 'financial-pressure', sortOrder: 70 },
        'net-slipping': { severity: 'medium', groupKey: 'financial-pressure', sortOrder: 65 },
        'no-activity-period': { severity: 'low', groupKey: 'activity-gap', sortOrder: 20 }
    };

    const GROUP_HEADLINES = {
        'soil-health': 'Soil data needs attention',
        'financial-pressure': 'Costs need review'
    };

    function readJsonSession(key, fallback) {
        try {
            const raw = global.sessionStorage.getItem(key);
            if (!raw) return fallback;
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : fallback;
        } catch (_) {
            return fallback;
        }
    }

    function writeJsonSession(key, value) {
        try {
            global.sessionStorage.setItem(key, JSON.stringify(value));
        } catch (_) {
            /* ignore quota */
        }
    }

    function readSessionObject(key, fallback) {
        try {
            const raw = global.sessionStorage.getItem(key);
            if (!raw) {
                return fallback;
            }
            return JSON.parse(raw);
        } catch (_) {
            return fallback;
        }
    }

    function writeSessionObject(key, value) {
        try {
            global.sessionStorage.setItem(key, JSON.stringify(value));
        } catch (_) {
            /* ignore */
        }
    }

    function attentionSeenKey(item) {
        return 'att:' + (item.groupKey || item.code || 'unknown');
    }

    function feedSeenKey(id) {
        return 'feed:' + String(id || '');
    }

    function markSeen(key) {
        if (!key) return;
        const set = readJsonSession(SEEN_STORAGE_KEY, []);
        if (set.indexOf(key) < 0) {
            set.push(key);
            writeJsonSession(SEEN_STORAGE_KEY, set);
        }
    }

    function isSeen(key) {
        return readJsonSession(SEEN_STORAGE_KEY, []).indexOf(key) >= 0;
    }

    function dismissRecommendation(recId) {
        if (!recId) return;
        const set = readJsonSession(REC_DISMISS_KEY, []);
        if (set.indexOf(recId) < 0) {
            set.push(recId);
            writeJsonSession(REC_DISMISS_KEY, set);
        }
    }

    function enrichAttentionItem(item) {
        const meta = ATTENTION_META[item.code] || {
            severity: 'medium',
            groupKey: item.code,
            sortOrder: 50
        };
        let severity = item.severity || meta.severity;
        const queueCount = Number(item.queueCount) || 0;
        if (item.code === 'offline-queue') {
            severity = queueCount >= 3 ? 'high' : 'medium';
        }
        return Object.assign({}, item, {
            severity: severity,
            groupKey: item.groupKey || meta.groupKey,
            sortOrder: item.sortOrder != null ? item.sortOrder : meta.sortOrder
        });
    }

    function groupAttentionItems(items) {
        const groups = new Map();
        items.map(enrichAttentionItem).forEach(function (item) {
            const key = item.groupKey || item.code;
            if (!groups.has(key)) {
                groups.set(key, {
                    item: item,
                    mergedCodes: [item.code],
                    mergedMessages: [item.message],
                    count: 1
                });
                return;
            }
            const g = groups.get(key);
            g.count += 1;
            g.mergedCodes.push(item.code);
            if (item.message && g.mergedMessages.indexOf(item.message) < 0) {
                g.mergedMessages.push(item.message);
            }
            if (SEVERITY_ORDER[item.severity] < SEVERITY_ORDER[g.item.severity]) {
                g.item = Object.assign({}, g.item, {
                    severity: item.severity,
                    level: item.level,
                    message: item.message,
                    action: item.action,
                    code: item.code
                });
            }
            if ((item.sortOrder || 0) > (g.item.sortOrder || 0) && item.code !== 'offline-queue') {
                g.item = Object.assign({}, g.item, {
                    sortOrder: item.sortOrder,
                    action: item.action,
                    code: item.code
                });
            }
        });

        return Array.from(groups.values())
            .map(function (g) {
                const headline = GROUP_HEADLINES[g.item.groupKey];
                let message = g.item.message;
                let detailLine = '';
                if (headline) {
                    detailLine = g.mergedMessages.join(' · ');
                    message = headline;
                } else if (g.mergedCodes.length > 1 && g.item.groupKey === 'financial-pressure') {
                    message = 'Costs need review';
                    detailLine = g.mergedMessages.join(' · ');
                } else if (g.count > 1 && g.item.groupKey === 'pending-sync') {
                    detailLine = g.mergedMessages.join(' · ');
                }
                return Object.assign({}, g.item, {
                    message: message,
                    detailLine: detailLine,
                    mergedCount: g.count
                });
            })
            .sort(function (a, b) {
                const sev = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
                if (sev !== 0) return sev;
                return (b.sortOrder || 0) - (a.sortOrder || 0);
            });
    }

    function prepareAttentionList(serverItems) {
        const raw = getOfflineAttention().concat(Array.isArray(serverItems) ? serverItems : []);
        return groupAttentionItems(raw);
    }

    function pickRecommendedNextStep(grouped) {
        const dismissed = readJsonSession(REC_DISMISS_KEY, []);
        function isDismissed(id) {
            return dismissed.indexOf(id) >= 0;
        }

        const sync = grouped.find(function (a) {
            return a.groupKey === 'pending-sync' || a.code === 'offline-queue';
        });
        if (sync && !isDismissed('sync')) {
            return {
                id: 'sync',
                title: 'Sync pending writes',
                reason:
                    sync.detailLine ||
                    sync.message ||
                    'Offline changes are waiting to reach the server.',
                primary: { label: 'Sync now', action: 'sync' },
                secondary: { label: 'View queue', target: 'offline-queue' }
            };
        }

        const soil = grouped.find(function (a) {
            return a.groupKey === 'soil-health';
        });
        if (soil && !isDismissed('soil-test')) {
            return {
                id: 'soil-test',
                title: 'Add a soil test',
                reason: soil.detailLine || soil.message || 'Fresh soil data improves crop guidance.',
                primary: { label: 'Add soil test', target: 'soil-test' },
                secondary: { label: 'View crops', target: 'soil-test' }
            };
        }

        const fin = grouped.find(function (a) {
            return a.groupKey === 'financial-pressure';
        });
        if (fin && !isDismissed('financial')) {
            return {
                id: 'financial',
                title: 'Log revenue or review costs',
                reason: fin.detailLine || 'Margin signals suggest a quick financial check.',
                primary: { label: 'Add revenue', target: 'revenue' },
                secondary: { label: 'Review finances', target: 'financials' }
            };
        }

        const activity = grouped.find(function (a) {
            return a.groupKey === 'activity-gap';
        });
        if (activity && !isDismissed('activity')) {
            return {
                id: 'activity',
                title: "Log today's farm activity",
                reason: activity.message || 'No activity logged for this period yet.',
                primary: { label: 'Review tasks', target: 'today-on-farm' },
                secondary: { label: 'Log crop action', target: 'crop-action' }
            };
        }

        return null;
    }

    function clusterFeedItems(items) {
        if (!items || !items.length) return [];
        const sorted = items.slice().sort(function (a, b) {
            const ta = new Date(a.timestamp).getTime() || 0;
            const tb = new Date(b.timestamp).getTime() || 0;
            return tb - ta;
        });
        const clusters = [];
        let current = null;
        sorted.forEach(function (item) {
            const t = new Date(item.timestamp).getTime() || 0;
            if (
                current &&
                current.lead.kind === item.kind &&
                current.leadTime - t <= FEED_CLUSTER_MS
            ) {
                current.items.push(item);
            } else {
                current = { lead: item, leadTime: t, items: [item] };
                clusters.push(current);
            }
        });
        return clusters;
    }

    function money(n) {
        const symbol = global.currencyManager ? global.currencyManager.getSymbol() : '$';
        const v = Number(n) || 0;
        return `${symbol}${v.toFixed(v >= 100 ? 0 : 2)}`;
    }

    function formatTime(iso) {
        if (!iso) return '';
        try {
            const d = new Date(iso);
            if (Number.isNaN(d.getTime())) return String(iso).slice(0, 10);
            const now = new Date();
            const sameDay = d.toDateString() === now.toDateString();
            if (sameDay) {
                return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
            return d.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        } catch (_) {
            return String(iso).slice(0, 10);
        }
    }

    function trendHtml(pct, invert) {
        const p = Number(pct) || 0;
        if (Math.abs(p) < 0.05) {
            return '<span class="fcc-trend">—</span>';
        }
        const up = p > 0;
        const good = invert ? !up : up;
        const cls = good ? 'up' : 'down';
        const arrow = up ? '↑' : '↓';
        return `<span class="fcc-trend ${cls}">${arrow} ${Math.abs(p).toFixed(0)}%</span>`;
    }

    function feedIconClass(kind) {
        if (kind === 'feed-mix-cost' || kind === 'farm-cost') return 'cost';
        if (kind === 'manual-revenue') return 'revenue';
        if (kind === 'soil-test') return 'soil';
        return 'action';
    }

    function feedIcon(kind) {
        if (kind === 'feed-mix-cost' || kind === 'farm-cost') return 'fa-coins';
        if (kind === 'manual-revenue') return 'fa-hand-holding-dollar';
        if (kind === 'soil-test') return 'fa-flask';
        return 'fa-seedling';
    }

    function hasAuth() {
        return (
            typeof global.SmartFarmAPI !== 'undefined' &&
            typeof global.SmartFarmAPI.getAuthToken === 'function' &&
            !!global.SmartFarmAPI.getAuthToken()
        );
    }

    function escapeHtml(s) {
        return String(s || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function getOfflineAttention() {
        const items = [];
        if (global.OfflineWriteQueue && typeof global.OfflineWriteQueue.getPendingCount === 'function') {
            const n = global.OfflineWriteQueue.getPendingCount();
            if (n > 0) {
                const severity = n >= 3 ? 'high' : 'medium';
                items.push({
                    level: 'critical',
                    code: 'offline-queue',
                    severity: severity,
                    groupKey: 'pending-sync',
                    sortOrder: 100,
                    queueCount: n,
                    message:
                        n >= 3
                            ? `${n} writes waiting to sync — sync soon to avoid data drift.`
                            : `${n} write${n === 1 ? '' : 's'} waiting to sync.`,
                    action: { label: 'Sync now', action: 'sync' },
                    secondaryAction: { label: 'View queue', target: 'offline-queue' }
                });
            }
        }
        return items;
    }

    function renderOfflinePanel() {
        if (!global.OfflineWriteQueue || typeof global.OfflineWriteQueue.getPendingEntries !== 'function') {
            return '';
        }
        const entries = global.OfflineWriteQueue.getPendingEntries();
        if (!entries.length) {
            return '';
        }
        const lis = entries
            .map(
                (e) =>
                    `<li><span class="fcc-queue-type">${escapeHtml(e.label)}</span>` +
                    `<span class="fcc-queue-time">${formatTime(e.enqueuedAt)}</span></li>`
            )
            .join('');
        return `
            <div id="fcc-offline-panel" class="fcc-offline-panel">
                <div class="fcc-panel-title">Pending sync (${entries.length})</div>
                <ul class="fcc-queue-list">${lis}</ul>
                <div class="fcc-quick-actions mt-2">
                    <button type="button" class="btn btn-sm btn-primary" data-fcc-cmd="sync-now">
                        <i class="fas fa-cloud-upload-alt me-1"></i>Sync now
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-fcc-cmd="view-queue-bar">
                        <i class="fas fa-list me-1"></i>View queue bar
                    </button>
                </div>
            </div>`;
    }

    /** W5-01 — daily operating checklist (server + offline sync). */
    function formatRoutineDate(isoDate) {
        if (!isoDate) {
            return 'Never';
        }
        const d = String(isoDate).slice(0, 10);
        const today = new Date().toISOString().slice(0, 10);
        if (d === today) {
            return 'Today';
        }
        const yesterday = new Date();
        yesterday.setUTCDate(yesterday.getUTCDate() - 1);
        if (d === yesterday.toISOString().slice(0, 10)) {
            return 'Yesterday';
        }
        const then = new Date(d + 'T12:00:00Z');
        const now = new Date(today + 'T12:00:00Z');
        const days = Math.floor((now - then) / 86400000);
        if (days >= 1 && days < 14) {
            return days + ' day' + (days === 1 ? '' : 's') + ' ago';
        }
        try {
            return new Date(d + 'T12:00:00Z').toLocaleDateString([], { month: 'short', day: 'numeric' });
        } catch (_) {
            return d;
        }
    }

    function getOfflineSyncChecklistItem() {
        if (!global.OfflineWriteQueue || typeof global.OfflineWriteQueue.getPendingCount !== 'function') {
            return null;
        }
        const n = global.OfflineWriteQueue.getPendingCount();
        if (n <= 0) {
            return {
                id: 'clear-sync',
                label: 'Clear pending sync',
                state: 'done',
                reason: 'All writes are synced.',
                action: null
            };
        }
        return {
            id: 'clear-sync',
            label: 'Clear pending sync',
            state: 'attention',
            reason: n + ' write' + (n === 1 ? '' : 's') + ' waiting to upload.',
            action: { label: 'Sync now', action: 'sync' }
        };
    }

    function mergeDailyChecklist(payload) {
        const base = (payload && payload.dailyChecklist) || { items: [], progress: {}, routines: {} };
        const items = (base.items || []).slice();
        const syncItem = getOfflineSyncChecklistItem();
        if (syncItem) {
            items.push(syncItem);
        }
        const countsTowardProgress = function (item) {
            return item.state !== 'optional';
        };
        const applicable = items.filter(countsTowardProgress);
        const done = items.filter(function (i) {
            return i.state === 'done';
        }).length;
        const applicableDone = applicable.filter(function (i) {
            return i.state === 'done';
        }).length;
        return {
            items: items,
            progress: {
                done: done,
                total: items.length,
                applicable: applicable.length,
                applicableDone: applicableDone
            },
            routines: base.routines || {}
        };
    }

    function buildSignedOutChecklist() {
        const syncItem = getOfflineSyncChecklistItem();
        const items = syncItem ? [syncItem] : [];
        return {
            items: items,
            progress: {
                done: items.filter(function (i) {
                    return i.state === 'done';
                }).length,
                total: items.length,
                applicable: items.length,
                applicableDone: items.filter(function (i) {
                    return i.state === 'done';
                }).length
            },
            routines: {}
        };
    }

    function checklistActionHtml(action) {
        if (!action) {
            return '';
        }
        if (action.action === 'sync') {
            return actionButtonHtml(action.label, {
                class: 'btn-primary',
                data: 'data-fcc-cmd="sync-now"'
            });
        }
        return actionButtonHtml(action.label, {
            class: 'btn-primary',
            data: 'data-fcc-nav="' + escapeHtml(action.target) + '"'
        });
    }

    function renderChecklistRow(item) {
        const state = item.state || 'due';
        const stateLabel =
            state === 'done'
                ? 'Done'
                : state === 'attention'
                  ? 'Needs attention'
                  : state === 'optional'
                    ? 'Optional'
                    : 'Due';
        return `<li class="fcc-check-row fcc-check-${escapeHtml(state)}">
            <span class="fcc-check-status" aria-label="${escapeHtml(stateLabel)}">
                <i class="fas ${state === 'done' ? 'fa-check-circle' : state === 'attention' ? 'fa-exclamation-circle' : state === 'optional' ? 'fa-minus-circle' : 'fa-circle'}"></i>
            </span>
            <div class="fcc-check-body">
                <span class="fcc-check-label">${escapeHtml(item.label)}</span>
                <span class="fcc-check-reason">${escapeHtml(item.reason || '')}</span>
            </div>
            ${item.action ? '<div class="fcc-check-action">' + checklistActionHtml(item.action) + '</div>' : ''}
        </li>`;
    }

    function renderChecklist(payload) {
        const checklist = payload ? mergeDailyChecklist(payload) : buildSignedOutChecklist();
        const p = checklist.progress || {};
        const routines = checklist.routines || {};
        const items = checklist.items || [];
        if (!items.length) {
            return '<div class="fcc-empty">Sign in to see your daily checklist.</div>';
        }
        const pct =
            p.applicable > 0 ? Math.round((100 * (p.applicableDone || 0)) / p.applicable) : 100;
        const progressLabel =
            (p.applicableDone != null ? p.applicableDone : p.done) +
            ' of ' +
            (p.applicable || p.total) +
            ' done';
        const rows = items.map(renderChecklistRow).join('');
        const streak =
            routines.activityStreakDays > 0
                ? `<span class="fcc-routine-pill">${routines.activityStreakDays}-day activity streak</span>`
                : '';
        const freshness = `<div class="fcc-routine-freshness">
            <span>Activity: <strong>${escapeHtml(formatRoutineDate(routines.lastActivityDate))}</strong></span>
            <span>Soil: <strong>${escapeHtml(formatRoutineDate(routines.lastSoilTestDate))}</strong></span>
            <span>Revenue: <strong>${escapeHtml(formatRoutineDate(routines.lastRevenueDate))}</strong></span>
            ${streak}
        </div>`;
        return `<div class="fcc-checklist" role="region" aria-label="Today's checklist">
            <div class="fcc-checklist-head">
                <div class="fcc-checklist-progress" aria-label="Daily progress ${progressLabel}">
                    <svg class="fcc-check-ring" viewBox="0 0 36 36" aria-hidden="true">
                        <path class="fcc-check-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                        <path class="fcc-check-ring-fill" stroke-dasharray="${pct}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                    </svg>
                    <span class="fcc-check-progress-text">${escapeHtml(progressLabel)}</span>
                </div>
            </div>
            ${routines.lastActivityDate || routines.lastSoilTestDate || routines.lastRevenueDate || streak ? freshness : ''}
            <ul class="fcc-checklist-list">${rows}</ul>
        </div>`;
    }

    /** W5-03 — weather risk / opportunity row. */
    function weatherIconClass(state) {
        if (state === 'risk') {
            return 'fa-cloud-showers-heavy';
        }
        if (state === 'opportunity') {
            return 'fa-cloud-rain';
        }
        if (state === 'calm') {
            return 'fa-sun';
        }
        return 'fa-cloud';
    }

    function renderWeatherRiskRow(payload) {
        if (!payload) {
            return '<div class="fcc-weather-row fcc-weather-unavailable"><p class="mb-0 small text-muted">Sign in for weather-aware farm suggestions.</p></div>';
        }
        const w = payload.weatherRisk;
        if (!w) {
            return '';
        }
        const state = w.state || 'unavailable';
        const icon = weatherIconClass(state);
        const conditions =
            w.conditions && String(w.conditions).trim()
                ? `<span class="fcc-weather-conditions">${escapeHtml(w.conditions)}</span>`
                : '';
        let actionHtml = '';
        if (w.action && w.action.label && state !== 'unavailable') {
            if (w.action.target === 'weather-alerts') {
                actionHtml = actionButtonHtml(w.action.label, {
                    class: 'btn-outline-primary',
                    data: 'data-fcc-nav="weather-alerts"'
                });
            } else {
                actionHtml = actionButtonHtml(w.action.label, {
                    class: state === 'risk' ? 'btn-primary' : 'btn-outline-primary',
                    data: 'data-fcc-nav="' + escapeHtml(w.action.target) + '"'
                });
            }
        }
        return `<div class="fcc-weather-row fcc-weather-${escapeHtml(state)}" role="status" aria-label="Weather and risk">
            <span class="fcc-weather-icon" aria-hidden="true"><i class="fas ${icon}"></i></span>
            <div class="fcc-weather-body">
                <strong class="fcc-weather-summary">${escapeHtml(w.summary || '')}</strong>
                <p class="fcc-weather-recommendation">${escapeHtml(w.recommendation || '')}</p>
                ${conditions}
            </div>
            ${actionHtml ? '<div class="fcc-weather-action">' + actionHtml + '</div>' : ''}
        </div>`;
    }

    /** W5-04 — this week's priorities (server rules + client done state). */
    function priorityDoneStorageKey(weekKey) {
        return PRIORITY_DONE_KEY + ':' + (weekKey || 'unknown');
    }

    function getPriorityDoneSet(weekKey) {
        return readJsonSession(priorityDoneStorageKey(weekKey), []);
    }

    function markPriorityDone(priorityId, weekKey) {
        if (!priorityId || !weekKey) {
            return;
        }
        const set = getPriorityDoneSet(weekKey);
        if (set.indexOf(priorityId) < 0) {
            set.push(priorityId);
            writeJsonSession(priorityDoneStorageKey(weekKey), set);
        }
    }

    function isPriorityDone(priorityId, weekKey) {
        return getPriorityDoneSet(weekKey).indexOf(priorityId) >= 0;
    }

    function loadWeeklyResetState() {
        return readSessionObject(WEEKLY_RESET_KEY, null);
    }

    function saveWeeklyResetState(state) {
        writeSessionObject(WEEKLY_RESET_KEY, state);
    }

    function isResetCompleteForWeek(weekKey) {
        const s = loadWeeklyResetState();
        return !!(s && s.weekKey === weekKey && s.completedAt);
    }

    function getFocusPriorityIds(weekKey) {
        const s = loadWeeklyResetState();
        if (!s || s.weekKey !== weekKey) {
            return [];
        }
        return Array.isArray(s.focusPriorityIds) ? s.focusPriorityIds : [];
    }

    function getCarriedForwardIds(weekKey) {
        const s = loadWeeklyResetState();
        if (!s || s.weekKey !== weekKey) {
            return [];
        }
        return Array.isArray(s.carriedForwardIds) ? s.carriedForwardIds : [];
    }

    function needsWeeklyReset(payload) {
        if (!payload || !payload.weeklyReset) {
            return false;
        }
        const wr = payload.weeklyReset;
        const weekKey = wr.currentWeekKey;
        if (isResetCompleteForWeek(weekKey)) {
            return false;
        }
        const prevDone = loadWeeklyResetState();
        if (prevDone && prevDone.weekKey && prevDone.weekKey !== weekKey) {
            return true;
        }
        if (wr.suggestReset) {
            return true;
        }
        const carry = (wr.carryForwardCandidates || []).length;
        const unfinished = (wr.carryForwardCandidates || []).filter(function (c) {
            const prevKey = wr.lastWeekSnapshot && wr.lastWeekSnapshot.weekKey;
            return prevKey && !isPriorityDone(c.id, prevKey);
        });
        return unfinished.length > 0;
    }

    function mergeWeeklyPriorities(payload) {
        const base = (payload && payload.weeklyPriorities) || { items: [], weekKey: '', weekLabel: '' };
        const weekKey = base.weekKey || '';
        const carriedIds = getCarriedForwardIds(weekKey);
        const items = (base.items || []).slice();
        const carryPool =
            (payload && payload.weeklyReset && payload.weeklyReset.carryForwardCandidates) || [];
        carriedIds.forEach(function (id) {
            if (items.some(function (i) {
                return i.id === id;
            })) {
                return;
            }
            const c = carryPool.find(function (x) {
                return x.id === id;
            });
            if (c) {
                items.push({
                    id: c.id,
                    type: c.type || 'carry',
                    title: c.title,
                    reason: c.reason,
                    tag: 'ongoing',
                    state: 'open',
                    sortOrder: 88,
                    suggestedActions: c.suggestedActions || []
                });
            }
        });
        const queue =
            global.OfflineWriteQueue && typeof global.OfflineWriteQueue.getPendingCount === 'function'
                ? global.OfflineWriteQueue.getPendingCount()
                : 0;
        if (queue > 0 && !items.some(function (i) {
            return i.id === 'offline-backlog';
        })) {
            items.push({
                id: 'offline-backlog',
                type: 'sync',
                title: 'Reduce offline backlog',
                reason:
                    queue +
                    ' write' +
                    (queue === 1 ? '' : 's') +
                    ' waiting to sync — clear the queue when you have connectivity.',
                tag: 'ongoing',
                state: 'open',
                sortOrder: 95,
                suggestedActions: [
                    { label: 'Sync now', action: 'sync' },
                    { label: 'View queue', target: 'offline-queue' }
                ]
            });
        }
        items.sort(function (a, b) {
            const aCarry = carriedIds.indexOf(a.id) >= 0 ? 1 : 0;
            const bCarry = carriedIds.indexOf(b.id) >= 0 ? 1 : 0;
            if (aCarry !== bCarry) {
                return bCarry - aCarry;
            }
            const aFocus = getFocusPriorityIds(weekKey).indexOf(a.id) >= 0 ? 1 : 0;
            const bFocus = getFocusPriorityIds(weekKey).indexOf(b.id) >= 0 ? 1 : 0;
            if (aFocus !== bFocus) {
                return bFocus - aFocus;
            }
            return (b.sortOrder || 0) - (a.sortOrder || 0);
        });
        return {
            weekKey: base.weekKey,
            weekLabel: base.weekLabel,
            items: items.slice(0, 5),
            carriedForwardIds: carriedIds,
            focusPriorityIds: getFocusPriorityIds(weekKey)
        };
    }

    function priorityActionHtml(action) {
        if (!action) {
            return '';
        }
        if (action.action === 'sync') {
            return actionButtonHtml(action.label, {
                class: 'btn-primary btn-sm',
                data: 'data-fcc-cmd="sync-now"'
            });
        }
        return actionButtonHtml(action.label, {
            class: 'btn-primary btn-sm',
            data: 'data-fcc-nav="' + escapeHtml(action.target) + '"'
        });
    }

    function renderPriorityItem(item, weekKey, meta) {
        const done = isPriorityDone(item.id, weekKey);
        const stateClass = done ? 'fcc-priority-done' : 'fcc-priority-open';
        const tagLabel = item.tag === 'ongoing' ? 'Ongoing' : 'New';
        const carried =
            meta && meta.carriedForwardIds && meta.carriedForwardIds.indexOf(item.id) >= 0;
        const focus =
            meta && meta.focusPriorityIds && meta.focusPriorityIds.indexOf(item.id) >= 0;
        const extraBadges =
            (carried ? '<span class="fcc-priority-badge carried">Carried forward</span>' : '') +
            (focus ? '<span class="fcc-priority-badge focus">Focus</span>' : '');
        const actions = (item.suggestedActions || [])
            .slice(0, 2)
            .map(function (a) {
                if (a.action === 'sync') {
                    return priorityActionHtml({ label: a.label, action: 'sync' });
                }
                return priorityActionHtml(a);
            })
            .join('');
        const doneBtn = done
            ? ''
            : '<button type="button" class="btn btn-link btn-sm fcc-priority-done-btn" data-fcc-priority-done="' +
              escapeHtml(item.id) +
              '" data-fcc-week-key="' +
              escapeHtml(weekKey) +
              '">Mark done for this week</button>';
        return `<li class="fcc-priority-item ${stateClass}${focus ? ' fcc-priority-focus' : ''}" data-fcc-priority-id="${escapeHtml(item.id)}">
            <div class="fcc-priority-head">
                <span class="fcc-priority-tag ${escapeHtml(item.tag || 'new')}">${escapeHtml(tagLabel)}</span>
                ${extraBadges}
                <strong class="fcc-priority-title">${escapeHtml(item.title)}</strong>
            </div>
            <p class="fcc-priority-reason">${escapeHtml(item.reason || '')}</p>
            <div class="fcc-priority-actions">${actions}${doneBtn}</div>
        </li>`;
    }

    function renderWeeklyPriorities(payload) {
        if (!payload) {
            return '<div class="fcc-empty">Sign in to see this week&rsquo;s priorities.</div>';
        }
        const merged = mergeWeeklyPriorities(payload);
        const weekKey = merged.weekKey || '';
        const items = merged.items || [];
        if (!items.length) {
            return `<div class="fcc-priorities-calm" role="status">
                <p class="mb-0"><i class="fas fa-check me-2" aria-hidden="true"></i>No extra priorities this week — keep up daily routines and check weather as needed.</p>
            </div>`;
        }
        const lis = items.map(function (item) {
            return renderPriorityItem(item, weekKey, merged);
        }).join('');
        const weekSet = isResetCompleteForWeek(weekKey);
        const focusIds = merged.focusPriorityIds || [];
        const weekSetBanner = weekSet
            ? `<div class="fcc-week-set" role="status">
                <i class="fas fa-check-circle me-2" aria-hidden="true"></i>
                <strong>This week is set</strong>
                ${focusIds.length ? ' · Focus: ' + escapeHtml(focusIds.length) + ' priorities' : ''}
                <button type="button" class="btn btn-link btn-sm fcc-reset-reopen" data-fcc-cmd="open-reset">Review reset</button>
            </div>`
            : '';
        return `${weekSetBanner}<div class="fcc-priorities" role="region" aria-label="This week's priorities">
            <p class="fcc-priorities-intro text-muted small">${escapeHtml(merged.weekLabel || 'Last 7 days')} · up to ${items.length} focus areas</p>
            <ul class="fcc-priorities-list">${lis}</ul>
        </div>`;
    }

    function initResetWizardState(payload) {
        const wr = payload.weeklyReset || {};
        resetStep = 1;
        resetDismissed = {};
        resetCarryChoices = {};
        resetFocusSelected = [];
        (wr.carryForwardCandidates || []).forEach(function (c) {
            const prevKey = wr.lastWeekSnapshot && wr.lastWeekSnapshot.weekKey;
            const wasDone = prevKey && isPriorityDone(c.id, prevKey);
            if (!wasDone) {
                resetCarryChoices[c.id] = true;
            }
        });
        const existing = loadWeeklyResetState();
        if (existing && existing.weekKey === wr.currentWeekKey && existing.focusPriorityIds) {
            resetFocusSelected = existing.focusPriorityIds.slice(0, 3);
        }
    }

    function renderResetStepReview(payload) {
        const wr = payload.weeklyReset || {};
        const snap = wr.lastWeekSnapshot || {};
        const routines = snap.routines || {};
        const lines = (snap.summaryLines || []).map(function (line) {
            return '<li>' + escapeHtml(line) + '</li>';
        }).join('');
        const net = snap.net || {};
        const unfinished = (wr.carryForwardCandidates || []).filter(function (c) {
            const pk = snap.weekKey;
            return pk && !isPriorityDone(c.id, pk);
        });
        const unfinList = unfinished.length
            ? '<ul class="fcc-reset-list">' +
              unfinished
                  .map(function (c) {
                      return '<li><strong>' + escapeHtml(c.title) + '</strong> — ' + escapeHtml(c.reason) + '</li>';
                  })
                  .join('') +
              '</ul>'
            : '<p class="text-muted small mb-0">No open priorities carried from last period.</p>';
        return `<div class="fcc-reset-step" data-reset-step="1">
            <h4 class="fcc-reset-step-title">Review last week</h4>
            <p class="fcc-reset-step-lead">A brief look at the previous 7 days.</p>
            <div class="fcc-reset-review-grid">
                <div><span class="text-muted">Net</span><strong>${money(net.net)}</strong></div>
                <div><span class="text-muted">Activity</span><strong>${routines.activityDays || 0}/${routines.totalDays || 7} days</strong></div>
            </div>
            <ul class="fcc-reset-bullets">${lines}</ul>
            <div class="fcc-reset-unfinished">
                <div class="fcc-reset-subtitle">Still open from last period</div>
                ${unfinList}
            </div>
        </div>`;
    }

    function renderResetStepCarry(payload) {
        const wr = payload.weeklyReset || {};
        const candidates = wr.carryForwardCandidates || [];
        if (!candidates.length) {
            return `<div class="fcc-reset-step" data-reset-step="2">
                <h4 class="fcc-reset-step-title">Carry forward</h4>
                <p class="text-muted small">Nothing to carry from last period — continue to set this week&rsquo;s focus.</p>
            </div>`;
        }
        const rows = candidates
            .map(function (c) {
                const checked = resetCarryChoices[c.id] ? ' checked' : '';
                return `<label class="fcc-reset-carry-row">
                    <input type="checkbox" class="form-check-input" data-fcc-carry-id="${escapeHtml(c.id)}"${checked} />
                    <span>
                        <strong>${escapeHtml(c.title)}</strong>
                        <span class="d-block small text-muted">${escapeHtml(c.reason)}</span>
                    </span>
                </label>`;
            })
            .join('');
        return `<div class="fcc-reset-step" data-reset-step="2">
            <h4 class="fcc-reset-step-title">Carry forward what still matters</h4>
            <p class="fcc-reset-step-lead">Keep items that should stay on your radar this week.</p>
            ${rows}
            <p class="text-muted small mb-0">Weather-specific items only appear if conditions still apply.</p>
        </div>`;
    }

    function buildFocusOptions(payload) {
        const wr = payload.weeklyReset || {};
        const options = (wr.suggestedFocusOptions || []).slice();
        const seen = {};
        options.forEach(function (o) {
            seen[o.id] = true;
        });
        Object.keys(resetCarryChoices).forEach(function (id) {
            if (!resetCarryChoices[id] || seen[id]) {
                return;
            }
            const c = (wr.carryForwardCandidates || []).find(function (x) {
                return x.id === id;
            });
            if (c) {
                options.push({
                    id: c.id,
                    title: c.title,
                    reason: c.reason,
                    tag: 'ongoing'
                });
                seen[id] = true;
            }
        });
        return options;
    }

    function renderResetStepFocus(payload) {
        const wr = payload.weeklyReset || {};
        const options = buildFocusOptions(payload);
        const maxF = wr.maxFocusCount || 3;
        const rows = options
            .map(function (opt) {
                const checked = resetFocusSelected.indexOf(opt.id) >= 0 ? ' checked' : '';
                const disabled =
                    !checked && resetFocusSelected.length >= maxF ? ' disabled' : '';
                return `<label class="fcc-reset-focus-row">
                    <input type="checkbox" class="form-check-input" data-fcc-focus-id="${escapeHtml(opt.id)}"${checked}${disabled} />
                    <span>
                        <strong>${escapeHtml(opt.title)}</strong>
                        <span class="d-block small text-muted">${escapeHtml(opt.reason)}</span>
                    </span>
                </label>`;
            })
            .join('');
        return `<div class="fcc-reset-step" data-reset-step="3">
            <h4 class="fcc-reset-step-title">Start this week</h4>
            <p class="fcc-reset-step-lead">Choose up to <strong>${maxF}</strong> focus priorities for this week.</p>
            ${rows || '<p class="text-muted small">No suggested priorities — you are clear to run routines.</p>'}
        </div>`;
    }

    function renderResetPanel(payload) {
        if (!resetPanelOpen || !payload) {
            return '';
        }
        const step1 = resetStep === 1 ? renderResetStepReview(payload) : '';
        const step2 = resetStep === 2 ? renderResetStepCarry(payload) : '';
        const step3 = resetStep === 3 ? renderResetStepFocus(payload) : '';
        const backBtn =
            resetStep > 1
                ? '<button type="button" class="btn btn-sm btn-outline-secondary" data-fcc-cmd="reset-back">Back</button>'
                : '';
        const nextLabel = resetStep < 3 ? 'Continue' : 'Complete reset';
        const nextCmd = resetStep < 3 ? 'reset-next' : 'reset-complete';
        return `<div class="fcc-reset-panel" id="fcc-reset-panel">
            <div class="fcc-reset-steps-indicator">Step ${resetStep} of 3</div>
            ${step1}${step2}${step3}
            <div class="fcc-reset-actions">
                ${backBtn}
                <button type="button" class="btn btn-sm btn-primary" data-fcc-cmd="${nextCmd}">${nextLabel}</button>
                <button type="button" class="btn btn-sm btn-link text-muted" data-fcc-cmd="reset-cancel">Cancel</button>
            </div>
        </div>`;
    }

    function renderWeeklyResetSection(payload) {
        if (!payload || !payload.weeklyReset) {
            return '';
        }
        const weekKey = payload.weeklyReset.currentWeekKey;
        const complete = isResetCompleteForWeek(weekKey);
        const showEntry = needsWeeklyReset(payload) || complete;
        if (!showEntry && !resetPanelOpen) {
            return '';
        }
        let entry = '';
        if (!complete || needsWeeklyReset(payload)) {
            entry = `<div class="fcc-reset-entry">
                <div>
                    <strong>Weekly reset</strong>
                    <p class="mb-0 small text-muted">Review last week, carry forward what matters, and set up to 3 focus priorities.</p>
                </div>
                <button type="button" class="btn btn-sm btn-outline-primary" data-fcc-cmd="open-reset">Start weekly reset</button>
            </div>`;
        }
        return entry + renderResetPanel(payload);
    }

    function completeWeeklyReset(payload) {
        const wr = payload.weeklyReset || {};
        const weekKey = wr.currentWeekKey;
        const carriedForwardIds = Object.keys(resetCarryChoices).filter(function (id) {
            return resetCarryChoices[id];
        });
        saveWeeklyResetState({
            weekKey: weekKey,
            completedAt: new Date().toISOString(),
            carriedForwardIds: carriedForwardIds,
            dismissedCarryForwardIds: Object.keys(resetDismissed),
            focusPriorityIds: resetFocusSelected.slice(0, wr.maxFocusCount || 3)
        });
        resetPanelOpen = false;
        resetStep = 1;
    }

    function syncResetCarryFromDom(root) {
        if (!root) return;
        root.querySelectorAll('[data-fcc-carry-id]').forEach(function (input) {
            const id = input.getAttribute('data-fcc-carry-id');
            resetCarryChoices[id] = input.checked;
        });
        root.querySelectorAll('[data-fcc-focus-id]').forEach(function (input) {
            const id = input.getAttribute('data-fcc-focus-id');
            if (input.checked && resetFocusSelected.indexOf(id) < 0) {
                resetFocusSelected.push(id);
            }
            if (!input.checked) {
                resetFocusSelected = resetFocusSelected.filter(function (x) {
                    return x !== id;
                });
            }
        });
    }

    /** W5-02 — weekly review strip (7-day routines + net direction). */
    function renderRoutineDot(on, type) {
        const cls = on ? 'fcc-week-dot on' : 'fcc-week-dot';
        return `<span class="${cls} fcc-week-dot-${type}" aria-hidden="true"></span>`;
    }

    function renderWeeklyDayColumn(day, feedApplicable) {
        const r = day.routines || {};
        const todayClass = day.isToday ? ' fcc-week-day-today' : '';
        const rows =
            renderRoutineDot(r.activity, 'activity') +
            renderRoutineDot(r.soil, 'soil') +
            (feedApplicable ? renderRoutineDot(r.feed, 'feed') : '') +
            renderRoutineDot(r.revenue, 'revenue');
        return `<div class="fcc-week-day${todayClass}" title="${escapeHtml(day.tooltip || day.date)}">
            <div class="fcc-week-day-dots">${rows}</div>
            <span class="fcc-week-day-label">${escapeHtml(day.weekday)}</span>
        </div>`;
    }

    function renderWeeklyNetBlock(net) {
        if (!net) {
            return '';
        }
        const tw = net.thisWeek || {};
        const lw = net.lastWeek || {};
        const dir = net.direction || 'flat';
        const dirLabel =
            dir === 'up' ? 'Better than last week' : dir === 'down' ? 'Below last week' : 'Flat vs last week';
        const dirIcon = dir === 'up' ? '↑' : dir === 'down' ? '↓' : '→';
        return `<div class="fcc-weekly-net">
            <div class="fcc-weekly-net-row">
                <span class="fcc-weekly-net-label">This week net</span>
                <strong class="fcc-weekly-net-value">${money(tw.net)}</strong>
            </div>
            <div class="fcc-weekly-net-row sub">
                <span>Last week ${money(lw.net)}</span>
                <span class="fcc-weekly-net-dir ${dir}">${dirIcon} ${escapeHtml(dirLabel)}</span>
            </div>
        </div>`;
    }

    function renderWeeklyStrip(payload) {
        const weekly = payload && payload.weeklySummary;
        if (!weekly || !weekly.days || !weekly.days.length) {
            return '<div class="fcc-empty fcc-weekly-empty">Sign in to see your weekly review.</div>';
        }
        const feedApplicable = !!weekly.feedApplicable;
        const daysHtml = weekly.days.map(function (d) {
            return renderWeeklyDayColumn(d, feedApplicable);
        }).join('');
        const legendFeed = feedApplicable
            ? '<span><span class="fcc-week-dot on fcc-week-dot-feed"></span> Feed</span>'
            : '';
        const summary = weekly.summary || {};
        return `<div class="fcc-weekly-strip" role="region" aria-label="Weekly review">
            ${renderWeeklyNetBlock(weekly.net)}
            <div class="fcc-weekly-lane" aria-label="Last 7 days routines">
                ${daysHtml}
            </div>
            <div class="fcc-weekly-legend">
                <span><span class="fcc-week-dot on fcc-week-dot-activity"></span> Activity</span>
                <span><span class="fcc-week-dot on fcc-week-dot-soil"></span> Soil</span>
                ${legendFeed}
                <span><span class="fcc-week-dot on fcc-week-dot-revenue"></span> Revenue</span>
            </div>
            <p class="fcc-weekly-summary-text">
                ${escapeHtml(summary.activityLine || '')}
                <span class="fcc-weekly-summary-sep">·</span>
                ${escapeHtml(summary.soilLine || '')}
            </p>
        </div>`;
    }

    function resolveAttentionAction(item) {
        if (item.action && item.action.label) {
            return item.action;
        }
        const fb = ATTENTION_FALLBACK[item.code];
        if (fb) return fb;
        if (item.href) {
            return { label: 'View', target: item.href };
        }
        return null;
    }

    function actionButtonHtml(label, attrs) {
        return `<button type="button" class="btn btn-sm fcc-action-btn ${attrs.class || 'btn-primary'}" ${attrs.data}>${escapeHtml(label)}</button>`;
    }

    function renderRecommendedNextStep(grouped) {
        const rec = pickRecommendedNextStep(grouped);
        if (!rec) {
            return `<div class="fcc-next-step fcc-next-step-clear" role="status">
                <p class="fcc-next-step-clear-msg"><i class="fas fa-check-circle me-2" aria-hidden="true"></i>You&rsquo;re caught up — scan recent activity or finances below.</p>
            </div>`;
        }
        let primaryBtn = '';
        if (rec.primary.action === 'sync') {
            primaryBtn = actionButtonHtml(rec.primary.label, {
                class: 'btn-primary',
                data: `data-fcc-cmd="sync-now" data-fcc-rec-id="${escapeHtml(rec.id)}"`
            });
        } else {
            primaryBtn = actionButtonHtml(rec.primary.label, {
                class: 'btn-primary',
                data: `data-fcc-nav="${escapeHtml(rec.primary.target)}" data-fcc-rec-id="${escapeHtml(rec.id)}"`
            });
        }
        const secondaryBtn = rec.secondary
            ? rec.secondary.action === 'sync'
                ? actionButtonHtml(rec.secondary.label, {
                      class: 'btn-outline-secondary',
                      data: 'data-fcc-cmd="sync-now"'
                  })
                : actionButtonHtml(rec.secondary.label, {
                      class: 'btn-outline-secondary',
                      data: `data-fcc-nav="${escapeHtml(rec.secondary.target)}" data-fcc-rec-id="${escapeHtml(rec.id)}"`
                  })
            : '';
        const dismissBtn = `<button type="button" class="btn btn-link btn-sm fcc-dismiss-rec" data-fcc-dismiss-rec="${escapeHtml(rec.id)}">Dismiss for now</button>`;
        return `<div class="fcc-next-step" role="region" aria-label="Recommended next step">
            <div class="fcc-next-step-label">Recommended next step</div>
            <h3 class="fcc-next-step-title">${escapeHtml(rec.title)}</h3>
            <p class="fcc-next-step-reason">${escapeHtml(rec.reason)}</p>
            <div class="fcc-next-step-actions">
                ${primaryBtn}
                ${secondaryBtn}
                ${dismissBtn}
            </div>
        </div>`;
    }

    function renderAttention(serverItems) {
        const grouped = prepareAttentionList(serverItems);
        if (!grouped.length) {
            return '<div class="fcc-empty">All clear — nothing needs immediate attention.</div>';
        }
        const lis = grouped
            .map(function (item) {
                const seenKey = attentionSeenKey(item);
                const seenClass = isSeen(seenKey) ? ' fcc-seen' : '';
                const severityClass = 'fcc-severity-' + (item.severity || 'medium');
                const primary = resolveAttentionAction(item);
                const secondary = item.secondaryAction || null;
                let actionsHtml = '';
                if (item.code === 'offline-queue' || item.groupKey === 'pending-sync') {
                    actionsHtml =
                        actionButtonHtml('Sync now', {
                            class: 'btn-primary',
                            data: `data-fcc-cmd="sync-now" data-fcc-seen-key="${escapeHtml(seenKey)}"`
                        }) +
                        actionButtonHtml('View queue', {
                            class: 'btn-outline-secondary',
                            data: `data-fcc-cmd="view-offline-panel" data-fcc-seen-key="${escapeHtml(seenKey)}"`
                        });
                } else if (primary) {
                    if (primary.action === 'sync') {
                        actionsHtml = actionButtonHtml(primary.label, {
                            class: 'btn-primary',
                            data: `data-fcc-cmd="sync-now" data-fcc-seen-key="${escapeHtml(seenKey)}"`
                        });
                    } else {
                        actionsHtml = actionButtonHtml(primary.label, {
                            class: 'btn-primary',
                            data: `data-fcc-nav="${escapeHtml(primary.target)}" data-fcc-seen-key="${escapeHtml(seenKey)}"`
                        });
                    }
                    if (secondary && secondary.target) {
                        actionsHtml += actionButtonHtml(secondary.label, {
                            class: 'btn-outline-secondary',
                            data: `data-fcc-nav="${escapeHtml(secondary.target)}" data-fcc-seen-key="${escapeHtml(seenKey)}"`
                        });
                    }
                }
                const scopeBadge =
                    item.scope === 'global'
                        ? '<span class="fcc-scope-badge">Farm-wide</span>'
                        : item.scope === 'period'
                          ? '<span class="fcc-scope-badge period">This period</span>'
                          : '';
                const severityBadge =
                    '<span class="fcc-severity-badge ' +
                    escapeHtml(item.severity || 'medium') +
                    '" title="Priority">' +
                    escapeHtml((item.severity || 'medium').charAt(0).toUpperCase() + (item.severity || 'medium').slice(1)) +
                    '</span>';
                const detailHtml = item.detailLine
                    ? `<p class="fcc-attention-detail">${escapeHtml(item.detailLine)}</p>`
                    : '';
                const notNowBtn = `<button type="button" class="btn btn-link btn-sm fcc-attention-not-now" data-fcc-seen-key="${escapeHtml(seenKey)}">Not now</button>`;
                return `<li class="fcc-attention-item ${item.level || 'info'} ${severityClass}${seenClass}" data-fcc-attention-key="${escapeHtml(seenKey)}">
                    <i class="fas fa-circle-exclamation fcc-attention-icon" aria-hidden="true"></i>
                    <div class="fcc-attention-content">
                        <p class="fcc-attention-msg">${severityBadge}${scopeBadge}${escapeHtml(item.message)}</p>
                        ${detailHtml}
                        ${actionsHtml ? `<div class="fcc-attention-actions">${actionsHtml}${notNowBtn}</div>` : notNowBtn}
                    </div>
                </li>`;
            })
            .join('');
        return `<ul class="fcc-attention-list">${lis}</ul>`;
    }

    function filterFeedItems(items, filter) {
        if (!items || !filter || filter === 'all') {
            return items || [];
        }
        if (filter === 'costs') {
            return items.filter((i) => i.kind === 'feed-mix-cost' || i.kind === 'farm-cost');
        }
        if (filter === 'revenue') {
            return items.filter((i) => i.kind === 'manual-revenue');
        }
        if (filter === 'operations') {
            return items.filter((i) => i.kind === 'crop-action' || i.kind === 'soil-test');
        }
        return items;
    }

    function renderFeedFilters() {
        const buttons = FEED_FILTERS.map(
            (f) =>
                `<button type="button" class="btn btn-sm ${feedFilter === f.id ? 'btn-secondary active' : 'btn-outline-secondary'}" data-fcc-feed-filter="${f.id}">${f.label}</button>`
        ).join('');
        return `<div class="fcc-feed-filters btn-group flex-wrap" role="group" aria-label="Filter recent activity">${buttons}</div>`;
    }

    function renderFeed(items) {
        if (!items || !items.length) {
            const filterHint =
                feedFilter !== 'all' && lastPayload && lastPayload.recentActivity && lastPayload.recentActivity.length
                    ? ' Nothing matches this filter for the selected period.'
                    : '';
            return `<div class="fcc-empty">No recent activity yet.${filterHint}
                <div class="fcc-quick-actions fcc-empty-actions mt-2">
                    <button type="button" class="btn btn-sm btn-outline-primary" data-fcc-nav="crop-action">Log crop action</button>
                    <button type="button" class="btn btn-sm btn-outline-primary" data-fcc-nav="soil-test">Add soil test</button>
                </div></div>`;
        }
        const clusters = clusterFeedItems(items);
        const cards = clusters
            .map(function (cluster) {
                const item = cluster.lead;
                const similar = cluster.items.length - 1;
                const seenKey = feedSeenKey(item.id);
                const seenClass = isSeen(seenKey) ? ' fcc-seen' : '';
                const typeLabel = escapeHtml(item.typeLabel || item.kind || 'Activity');
                const nav = item.navTarget || item.kind || '';
                const amt =
                    item.amount != null
                        ? `<span class="fcc-feed-card-amt ${item.kind === 'manual-revenue' ? 'positive' : ''}">${item.kind === 'manual-revenue' ? '+' : ''}${money(item.amount)}</span>`
                        : '';
                const entity =
                    item.entityId != null && item.entityId !== ''
                        ? `<span class="fcc-feed-entity">${escapeHtml(String(item.entityId))}</span>`
                        : '';
                const similarNote =
                    similar > 0
                        ? ` <span class="fcc-similar-note">+${similar} similar</span>`
                        : '';
                return `<li>
                    <button type="button" class="fcc-feed-card${seenClass}" data-fcc-nav="${escapeHtml(nav)}" data-fcc-feed-id="${escapeHtml(item.id)}" data-fcc-feed-seen-key="${escapeHtml(seenKey)}" data-fcc-focus-type="${escapeHtml(item.kind || nav)}" title="Open this entry">
                        <span class="fcc-feed-card-icon ${feedIconClass(item.kind)}">
                            <i class="fas ${feedIcon(item.kind)}"></i>
                        </span>
                        <span class="fcc-feed-card-body">
                            <span class="fcc-feed-card-type">${typeLabel}${similarNote}</span>
                            <span class="fcc-feed-card-title">${escapeHtml(item.title)}</span>
                            <span class="fcc-feed-card-meta">${escapeHtml(item.subtitle)}${entity ? ' · ' + entity : ''} · ${formatTime(item.timestamp)}</span>
                        </span>
                        ${amt}
                        <span class="fcc-feed-chevron" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
                    </button>
                </li>`;
            })
            .join('');
        return `<ul class="fcc-feed-cards">${cards}</ul>`;
    }

    function renderFinanceQuickActions() {
        return `<div class="fcc-quick-actions" role="group" aria-label="Financial quick actions">
            <button type="button" class="btn btn-sm btn-primary" data-fcc-nav="revenue">
                <i class="fas fa-plus me-1"></i>Add revenue
            </button>
            <button type="button" class="btn btn-sm btn-outline-primary" data-fcc-nav="feed-mix-cost">
                <i class="fas fa-wheat-awn me-1"></i>Add feed cost
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary" data-fcc-cmd="financial-details">
                <i class="fas fa-chart-line me-1"></i>View details
            </button>
        </div>`;
    }

    function renderBreakdownList(items, emptyMsg) {
        if (!items || !items.length) {
            return `<p class="fcc-breakdown-empty">${escapeHtml(emptyMsg)}</p>`;
        }
        return `<ul class="fcc-breakdown-list">${items
            .map(
                (row) =>
                    `<li><button type="button" class="fcc-breakdown-row" data-fcc-feed-id="${escapeHtml(row.id)}" data-fcc-focus-type="${escapeHtml(row.kind || '')}">
                    <span>${escapeHtml(row.title)}</span><span class="fcc-breakdown-amt">${money(row.amount)}</span><span class="fcc-breakdown-date">${escapeHtml(String(row.subtitle || '').slice(0, 10))}</span>
                    </button></li>`
            )
            .join('')}</ul>`;
    }

    function renderFinancialBreakdown(data) {
        const bd = data.financialBreakdown || {};
        const totals = bd.totals || data.financials || {};
        const costs = bd.costs || [];
        const revenue = bd.revenue || [];
        const openClass = breakdownOpen ? 'fcc-breakdown-open' : '';

        return `
            <div id="fcc-breakdown-panel" class="fcc-breakdown-panel ${openClass}" ${breakdownOpen ? '' : 'hidden'}>
                <div class="fcc-breakdown-head">
                    <strong>Breakdown</strong>
                    <span class="text-muted small">${escapeHtml(data.windowLabel || '')}: ${money(totals.revenue)} rev · ${money(totals.costs)} costs · ${money(totals.net)} net</span>
                </div>
                <div class="fcc-breakdown-cols">
                    <div>
                        <div class="fcc-breakdown-subtitle">Costs (${costs.length})</div>
                        ${renderBreakdownList(costs, 'No costs in this period.')}
                    </div>
                    <div>
                        <div class="fcc-breakdown-subtitle">Revenue (${revenue.length})</div>
                        ${renderBreakdownList(revenue, 'No revenue in this period.')}
                    </div>
                </div>
            </div>`;
    }

    function renderFinance(data) {
        const f = data.financials || {};
        const t = data.trends || {};
        const periodLabel = data.windowLabel || 'This period';
        const net = Number(f.net) || 0;
        const bannerClass = net > 0 ? 'up' : net < 0 ? 'down' : 'flat';
        const bannerIcon = net > 0 ? 'fa-arrow-trend-up' : net < 0 ? 'fa-arrow-trend-down' : 'fa-minus';

        let driverLine = `No costs logged in ${escapeHtml(periodLabel.toLowerCase())} yet.`;
        if (data.largestCostDriver) {
            const d = data.largestCostDriver;
            const label = d.type === 'feed-mix' ? 'Feed mix' : d.type.replace(/-/g, ' ');
            driverLine = `Largest cost driver: <strong>${escapeHtml(label)}</strong> (${money(d.total)}, ${d.count} entries)`;
        }

        let revenueLine = 'No revenue entries in this period yet.';
        if (data.latestRevenue) {
            const r = data.latestRevenue;
            revenueLine = `Latest sale: <strong>${escapeHtml(r.title)}</strong> ${money(r.amount)} · ${escapeHtml(r.subtitle)}`;
        }

        const breakdownToggle = `<button type="button" class="btn btn-link btn-sm fcc-breakdown-toggle p-0" data-fcc-cmd="toggle-breakdown" aria-expanded="${breakdownOpen}">
            ${breakdownOpen ? 'Hide breakdown' : 'View breakdown'}
        </button>`;

        return `
            <div class="fcc-finance-block">
                <div class="fcc-finance-row">
                    <span>Revenue <span class="text-muted small">(${escapeHtml(periodLabel)})</span></span>
                    <span><strong>${money(f.revenue)}</strong> ${trendHtml(t.revenueChangePct, false)}</span>
                </div>
                <div class="fcc-finance-row">
                    <span>Costs <span class="text-muted small">(${escapeHtml(periodLabel)})</span></span>
                    <span><strong>${money(f.costs)}</strong> ${trendHtml(t.costsChangePct, true)}</span>
                </div>
                <div class="fcc-finance-row">
                    <span>Net</span>
                    <span><strong>${money(f.net)}</strong> ${trendHtml(t.netChangePct, false)}</span>
                </div>
                <div class="fcc-net-banner ${bannerClass}">
                    <i class="fas ${bannerIcon}"></i>
                    ${net >= 0 ? 'Ahead' : 'Behind'} for ${escapeHtml(periodLabel.toLowerCase())}
                </div>
                <div class="fcc-insight-line">${driverLine}</div>
                <div class="fcc-insight-line">${revenueLine}</div>
                <div class="mt-2">${breakdownToggle}</div>
            </div>
            ${renderFinancialBreakdown(data)}
            ${renderFinanceQuickActions()}`;
    }

    function renderStrip(stats, windowLabel) {
        const netClass = stats.netMovement >= 0 ? 'net-positive' : 'net-negative';
        return `
            <div class="fcc-strip" role="group" aria-label="Period activity summary">
                <div class="fcc-chip">
                    <div class="fcc-chip-label">Actions</div>
                    <div class="fcc-chip-value">${stats.actions}</div>
                    <div class="fcc-chip-meta">${windowLabel}</div>
                </div>
                <div class="fcc-chip">
                    <div class="fcc-chip-label">Soil tests</div>
                    <div class="fcc-chip-value">${stats.soilTests}</div>
                    <div class="fcc-chip-meta">${windowLabel}</div>
                </div>
                <div class="fcc-chip">
                    <div class="fcc-chip-label">Costs</div>
                    <div class="fcc-chip-value">${stats.costs}</div>
                    <div class="fcc-chip-meta">${money(stats.costTotal)}</div>
                </div>
                <div class="fcc-chip">
                    <div class="fcc-chip-label">Revenue</div>
                    <div class="fcc-chip-value">${stats.revenue}</div>
                    <div class="fcc-chip-meta">${money(stats.revenueTotal)}</div>
                </div>
                <div class="fcc-chip ${netClass}">
                    <div class="fcc-chip-label">Net movement</div>
                    <div class="fcc-chip-value">${money(stats.netMovement)}</div>
                    <div class="fcc-chip-meta">${windowLabel}</div>
                </div>
            </div>`;
    }

    function highlightEl(el) {
        if (!el) return;
        el.classList.add('fcc-highlight');
        global.setTimeout(function () {
            el.classList.remove('fcc-highlight');
        }, 2200);
    }

    function scrollToEl(el) {
        if (!el) return false;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        highlightEl(el);
        return true;
    }

    function runNav(target) {
        const key = String(target || '').trim();
        const cfg = NAV[key];
        if (!cfg) {
            if (key.indexOf('.html') >= 0) {
                global.location.href = key;
            }
            return;
        }

        if (cfg.dashboardFn && typeof global[cfg.dashboardFn] === 'function') {
            global[cfg.dashboardFn]();
            return;
        }

        if (cfg.page) {
            global.location.href = cfg.page;
            return;
        }

        if (cfg.scroll) {
            const el = document.querySelector(cfg.scroll);
            if (scrollToEl(el) && cfg.focus) {
                global.setTimeout(function () {
                    const focusEl = document.querySelector(cfg.focus);
                    if (focusEl && focusEl.focus) focusEl.focus();
                }, 400);
            }
            if (cfg.onScroll && typeof global[cfg.onScroll] === 'function') {
                global.setTimeout(function () {
                    global[cfg.onScroll]();
                }, 300);
            }
        }
    }

    async function runSyncNow() {
        if (!global.OfflineWriteQueue || typeof global.OfflineWriteQueue.flush !== 'function') {
            return;
        }
        const btn = document.querySelector('[data-fcc-cmd="sync-now"]');
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Syncing…';
        }
        try {
            await global.OfflineWriteQueue.flush({ reason: 'manual' });
        } catch (err) {
            console.warn('Queue sync:', err);
        } finally {
            refreshLocalSections();
            if (hasAuth()) {
                await refresh();
            } else {
                renderSignedOut();
            }
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-cloud-upload-alt me-1"></i>Sync now';
            }
        }
    }

    function showQueueBar() {
        const bar = document.getElementById('sf-offline-queue-bar');
        if (bar) {
            bar.classList.add('sf-offline-queue-visible');
            scrollToEl(bar);
        } else if (global.OfflineWriteQueue && global.OfflineWriteQueue.getPendingCount() > 0) {
            runNav('offline-queue');
        }
    }

    function bindActionHandlers(root) {
        if (!root) return;

        root.querySelectorAll('.fcc-feed-card, .fcc-breakdown-row').forEach((btn) => {
            btn.addEventListener('click', function () {
                const seenKey = btn.getAttribute('data-fcc-feed-seen-key');
                if (seenKey) markSeen(seenKey);
                const feedId = btn.getAttribute('data-fcc-feed-id');
                let item = null;
                if (feedId && lastPayload) {
                    const pool = (lastPayload.recentActivity || []).concat(
                        (lastPayload.financialBreakdown && lastPayload.financialBreakdown.costs) || [],
                        (lastPayload.financialBreakdown && lastPayload.financialBreakdown.revenue) || []
                    );
                    item = pool.find((i) => String(i.id) === String(feedId));
                }
                if (item && global.CommandCenterFocus && global.CommandCenterFocus.navigateFromFeedItem(item)) {
                    refreshInboxMounts();
                    return;
                }
                const nav = btn.getAttribute('data-fcc-nav');
                if (nav) runNav(nav);
                refreshInboxMounts();
            });
        });

        root.querySelectorAll('[data-fcc-seen-key]').forEach((btn) => {
            if (
                btn.classList.contains('fcc-feed-card') ||
                btn.classList.contains('fcc-breakdown-row') ||
                btn.classList.contains('fcc-dismiss-rec')
            ) {
                return;
            }
            btn.addEventListener('click', function () {
                const key = btn.getAttribute('data-fcc-seen-key');
                if (key) markSeen(key);
            });
        });

        root.querySelectorAll('.fcc-attention-not-now').forEach((btn) => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const key = btn.getAttribute('data-fcc-seen-key');
                if (key) markSeen(key);
                refreshInboxMounts();
            });
        });

        root.querySelectorAll('[data-fcc-dismiss-rec]').forEach((btn) => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                dismissRecommendation(btn.getAttribute('data-fcc-dismiss-rec'));
                refreshInboxMounts();
            });
        });

        root.querySelectorAll('[data-fcc-nav]').forEach((btn) => {
            if (btn.classList.contains('fcc-feed-card') || btn.classList.contains('fcc-breakdown-row')) {
                return;
            }
            btn.addEventListener('click', function () {
                runNav(btn.getAttribute('data-fcc-nav'));
            });
        });

        root.querySelectorAll('[data-fcc-cmd]').forEach((btn) => {
            btn.addEventListener('click', function () {
                const cmd = btn.getAttribute('data-fcc-cmd');
                if (cmd === 'sync-now') {
                    runSyncNow();
                } else if (cmd === 'view-queue-bar') {
                    showQueueBar();
                } else if (cmd === 'view-offline-panel') {
                    runNav('offline-queue');
                } else if (cmd === 'financial-details') {
                    if (typeof global.showFinancialDetails === 'function') {
                        global.showFinancialDetails();
                    } else {
                        runNav('financials');
                    }
                } else if (cmd === 'toggle-breakdown') {
                    toggleBreakdownUI();
                } else if (cmd === 'open-reset') {
                    resetPanelOpen = true;
                    initResetWizardState(lastPayload);
                    refreshResetMount();
                } else if (cmd === 'reset-cancel') {
                    resetPanelOpen = false;
                    resetStep = 1;
                    refreshResetMount();
                } else if (cmd === 'reset-back') {
                    syncResetCarryFromDom(root);
                    if (resetStep > 1) {
                        resetStep -= 1;
                    }
                    refreshResetMount();
                } else if (cmd === 'reset-next') {
                    syncResetCarryFromDom(root);
                    if (resetStep < 3) {
                        resetStep += 1;
                    }
                    refreshResetMount();
                } else if (cmd === 'reset-complete') {
                    syncResetCarryFromDom(root);
                    completeWeeklyReset(lastPayload);
                    refreshResetMount();
                    refreshInboxMounts();
                }
            });
        });

        const resetPanel = root.querySelector('#fcc-reset-panel');
        if (resetPanel) {
            resetPanel.querySelectorAll('[data-fcc-carry-id]').forEach(function (input) {
                input.addEventListener('change', function () {
                    const id = input.getAttribute('data-fcc-carry-id');
                    resetCarryChoices[id] = input.checked;
                });
            });
            resetPanel.querySelectorAll('[data-fcc-focus-id]').forEach(function (input) {
                input.addEventListener('change', function () {
                    const id = input.getAttribute('data-fcc-focus-id');
                    const maxF = (lastPayload && lastPayload.weeklyReset && lastPayload.weeklyReset.maxFocusCount) || 3;
                    if (input.checked) {
                        if (resetFocusSelected.indexOf(id) < 0 && resetFocusSelected.length < maxF) {
                            resetFocusSelected.push(id);
                        } else {
                            input.checked = false;
                        }
                    } else {
                        resetFocusSelected = resetFocusSelected.filter(function (x) {
                            return x !== id;
                        });
                    }
                    refreshResetMount();
                });
            });
        }

        root.querySelectorAll('[data-fcc-feed-filter]').forEach((btn) => {
            btn.addEventListener('click', function () {
                const f = btn.getAttribute('data-fcc-feed-filter');
                if (f && f !== feedFilter) {
                    feedFilter = f;
                    root.querySelectorAll('[data-fcc-feed-filter]').forEach((b) => {
                        b.classList.toggle('active', b.getAttribute('data-fcc-feed-filter') === feedFilter);
                        b.classList.toggle('btn-secondary', b.getAttribute('data-fcc-feed-filter') === feedFilter);
                        b.classList.toggle('btn-outline-secondary', b.getAttribute('data-fcc-feed-filter') !== feedFilter);
                    });
                    applyFeedFilterUI();
                }
            });
        });

        root.querySelectorAll('[data-fcc-period]').forEach((btn) => {
            btn.addEventListener('click', function () {
                const p = btn.getAttribute('data-fcc-period');
                if (p && p !== currentWindow) {
                    currentWindow = p;
                    breakdownOpen = false;
                    refresh();
                }
            });
        });

        root.querySelectorAll('.fcc-priority-done-btn').forEach((btn) => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const id = btn.getAttribute('data-fcc-priority-done');
                const weekKey = btn.getAttribute('data-fcc-week-key');
                markPriorityDone(id, weekKey);
                refreshInboxMounts();
            });
        });
    }

    function refreshResetMount() {
        const resetMount = document.getElementById('fcc-reset-mount');
        if (resetMount) {
            resetMount.innerHTML = renderWeeklyResetSection(lastPayload);
        }
        const root = document.getElementById(ROOT_ID);
        if (root) {
            bindActionHandlers(root);
        }
    }

    function refreshInboxMounts() {
        const grouped = prepareAttentionList(lastPayload ? lastPayload.attention : []);
        const nextMount = document.getElementById('fcc-next-step-mount');
        const attentionMount = document.getElementById('fcc-attention-mount');
        const checklistMount = document.getElementById('fcc-checklist-mount');
        const prioritiesMount = document.getElementById('fcc-priorities-mount');
        const resetMount = document.getElementById('fcc-reset-mount');
        if (nextMount) {
            nextMount.innerHTML = renderRecommendedNextStep(grouped);
        }
        if (attentionMount) {
            attentionMount.innerHTML = renderAttention(lastPayload ? lastPayload.attention : []);
        }
        if (checklistMount) {
            checklistMount.innerHTML = renderChecklist(lastPayload);
        }
        if (prioritiesMount) {
            prioritiesMount.innerHTML = renderWeeklyPriorities(lastPayload);
        }
        if (resetMount) {
            resetMount.innerHTML = renderWeeklyResetSection(lastPayload);
        }
        const root = document.getElementById(ROOT_ID);
        if (root) bindActionHandlers(root);
    }

    function refreshLocalSections() {
        const offlineMount = document.getElementById('fcc-offline-mount');
        if (offlineMount) {
            offlineMount.innerHTML = renderOfflinePanel();
        }
        refreshInboxMounts();
    }

    function periodLabelFromPayload(payload) {
        return payload.windowLabel || (currentWindow === '30d' ? 'Last 30 days' : currentWindow === '7d' ? 'Last 7 days' : 'Today');
    }

    function applyFeedFilterUI() {
        const mount = document.getElementById('fcc-feed-mount');
        if (!mount || !lastPayload) return;
        const filtered = filterFeedItems(lastPayload.recentActivity, feedFilter);
        mount.innerHTML = renderFeed(filtered);
        const root = document.getElementById(ROOT_ID);
        if (root) bindActionHandlers(root);
    }

    function toggleBreakdownUI() {
        breakdownOpen = !breakdownOpen;
        const panel = document.getElementById('fcc-breakdown-panel');
        const btn = document.querySelector('[data-fcc-cmd="toggle-breakdown"]');
        if (panel) {
            if (breakdownOpen) {
                panel.removeAttribute('hidden');
                panel.classList.add('fcc-breakdown-open');
            } else {
                panel.setAttribute('hidden', '');
                panel.classList.remove('fcc-breakdown-open');
            }
        }
        if (btn) {
            btn.setAttribute('aria-expanded', breakdownOpen ? 'true' : 'false');
            btn.textContent = breakdownOpen ? 'Hide breakdown' : 'View breakdown';
        }
    }

    function syncLegacyFinancialCards(data) {
        if (!data) return;
        const f = data.monthFinancials || data.financials;
        if (!f) return;
        const symbol = global.currencyManager ? global.currencyManager.getSymbol() : '$';
        const rev = Number(f.revenue) || 0;
        const costs = Number(f.costs) || 0;
        const net = Number(f.net) || 0;

        const revEl = document.getElementById('monthlyRevenue');
        const costEl = document.getElementById('monthlyCosts');
        const netEl = document.getElementById('netProfit');
        const roiEl = document.getElementById('monthlyROI');

        if (revEl) revEl.textContent = `${symbol}${rev.toFixed(0)}`;
        if (costEl) costEl.textContent = `${symbol}${costs.toFixed(0)}`;
        if (netEl) {
            netEl.textContent = `${symbol}${net.toFixed(0)}`;
            netEl.className = `metric-value profit ${net < 0 ? 'negative' : ''}`;
        }
        if (roiEl) {
            const roi = costs > 0 ? (net / costs) * 100 : 0;
            roiEl.textContent = `${roi.toFixed(1)}%`;
        }
        const helperEl = document.getElementById('financialHelperText');
        if (helperEl && f.helperText) {
            helperEl.textContent = f.helperText;
            helperEl.style.display = f.helperText ? 'block' : 'none';
        }
    }

    function render(payload) {
        const root = document.getElementById(ROOT_ID);
        if (!root) return;

        lastPayload = payload;
        if (payload.window) {
            currentWindow = payload.window;
        }
        const attentionGrouped = prepareAttentionList(payload.attention);
        const windowLabel = periodLabelFromPayload(payload);
        const stats = payload.periodStats || {
            actions: 0,
            soilTests: 0,
            costs: 0,
            revenue: 0,
            costTotal: 0,
            revenueTotal: 0,
            netMovement: 0
        };

        root.innerHTML = `
            <div class="fcc-card">
                <div class="fcc-header">
                    <div>
                        <h2 class="fcc-title"><i class="fas fa-compass me-2"></i>Farm command center</h2>
                        <p class="fcc-subtitle">What matters most, one clear next step, and supporting details.</p>
                    </div>
                    <div class="d-flex flex-wrap gap-2 align-items-center">
                        <div class="btn-group fcc-period-toggle" role="group" aria-label="Period">
                            ${PERIODS.map(
                                (p) =>
                                    `<button type="button" class="btn btn-outline-secondary ${currentWindow === p.id ? 'active' : ''}" data-fcc-period="${p.id}">${p.label}</button>`
                            ).join('')}
                        </div>
                        <button type="button" class="btn btn-sm btn-outline-primary fcc-refresh-btn" id="fccRefreshBtn" title="Refresh">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>
                <div id="fcc-offline-mount">${renderOfflinePanel()}</div>
                <div class="fcc-weather-section">
                    <div class="fcc-panel-title">Weather &amp; risk</div>
                    <div id="fcc-weather-mount">${renderWeatherRiskRow(payload)}</div>
                </div>
                <div class="fcc-weekly-section">
                    <div class="fcc-panel-title">Weekly review</div>
                    <div id="fcc-weekly-mount">${renderWeeklyStrip(payload)}</div>
                </div>
                <div class="fcc-reset-section">
                    <div id="fcc-reset-mount">${renderWeeklyResetSection(payload)}</div>
                </div>
                <div class="fcc-priorities-section">
                    <div class="fcc-panel-title">This week&rsquo;s priorities</div>
                    <div id="fcc-priorities-mount">${renderWeeklyPriorities(payload)}</div>
                </div>
                <div class="fcc-checklist-section">
                    <div class="fcc-panel-title">Today&rsquo;s checklist</div>
                    <div id="fcc-checklist-mount">${renderChecklist(payload)}</div>
                </div>
                ${renderStrip(stats, windowLabel)}
                <div class="fcc-grid">
                    <div>
                        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                            <div class="fcc-panel-title mb-0">What changed recently</div>
                            ${renderFeedFilters()}
                        </div>
                        <p class="text-muted small mb-2">Showing ${escapeHtml(windowLabel)} · tap a card to open</p>
                        <div id="fcc-feed-mount">${renderFeed(filterFeedItems(payload.recentActivity, feedFilter))}</div>
                    </div>
                    <div>
                        <div class="fcc-panel-title">Recommended next step</div>
                        <div id="fcc-next-step-mount">${renderRecommendedNextStep(attentionGrouped)}</div>
                        <div class="fcc-panel-title mt-3">Attention needed</div>
                        <div id="fcc-attention-mount">${renderAttention(payload.attention)}</div>
                        <div class="fcc-panel-title mt-3">Financial insight</div>
                        ${renderFinance(payload)}
                    </div>
                </div>
            </div>`;

        const refreshBtn = document.getElementById('fccRefreshBtn');
        if (refreshBtn) refreshBtn.addEventListener('click', refresh);

        bindActionHandlers(root);
        syncLegacyFinancialCards(payload);
    }

    function renderSignedOut() {
        const root = document.getElementById(ROOT_ID);
        if (!root) return;
        root.innerHTML = `
            <div class="fcc-card">
                <div class="fcc-header">
                    <div>
                        <h2 class="fcc-title"><i class="fas fa-compass me-2"></i>Farm command center</h2>
                        <p class="fcc-subtitle">Sign in to see live costs, revenue, and activity from your farm.</p>
                    </div>
                </div>
                <div id="fcc-offline-mount">${renderOfflinePanel()}</div>
                <div class="fcc-weather-section">
                    <div class="fcc-panel-title">Weather &amp; risk</div>
                    <div id="fcc-weather-mount">${renderWeatherRiskRow(null)}</div>
                </div>
                <div class="fcc-weekly-section">
                    <div class="fcc-panel-title">Weekly review</div>
                    <div id="fcc-weekly-mount">${renderWeeklyStrip(null)}</div>
                </div>
                <div class="fcc-reset-section">
                    <div id="fcc-reset-mount"></div>
                </div>
                <div class="fcc-priorities-section">
                    <div class="fcc-panel-title">This week&rsquo;s priorities</div>
                    <div id="fcc-priorities-mount">${renderWeeklyPriorities(null)}</div>
                </div>
                <div class="fcc-checklist-section">
                    <div class="fcc-panel-title">Today&rsquo;s checklist</div>
                    <div id="fcc-checklist-mount">${renderChecklist(null)}</div>
                </div>
                <div class="fcc-grid">
                    <div class="fcc-empty">Use email sign-in to unlock financials and synced soil tests.</div>
                    <div>
                        <div class="fcc-panel-title">Recommended next step</div>
                        <div id="fcc-next-step-mount">${renderRecommendedNextStep(prepareAttentionList([]))}</div>
                        <div class="fcc-panel-title mt-3">Attention needed</div>
                        <div id="fcc-attention-mount">${getOfflineAttention().length ? renderAttention([]) : '<div class="fcc-empty">Sign in to see personalized alerts.</div>'}</div>
                    </div>
                </div>
            </div>`;
        bindActionHandlers(root);
    }

    function renderError(message) {
        const root = document.getElementById(ROOT_ID);
        if (!root) return;
        root.innerHTML = `
            <div class="fcc-card">
                <p class="text-muted mb-2">${escapeHtml(message)}</p>
                <button type="button" class="btn btn-sm btn-outline-primary" id="fccRetryBtn">Retry</button>
            </div>`;
        document.getElementById('fccRetryBtn').addEventListener('click', refresh);
    }

    async function fetchPayload() {
        if (!hasAuth()) return null;
        if (typeof global.SmartFarmAPI.getCommandCenter !== 'function') {
            throw new Error('Command center API not available');
        }
        const res = await global.SmartFarmAPI.getCommandCenter({ window: currentWindow });
        if (!res || !res.success || !res.data) {
            throw new Error((res && res.error) || 'Could not load command center');
        }
        return res.data;
    }

    async function refresh() {
        const root = document.getElementById(ROOT_ID);
        if (!root) return;

        if (!hasAuth()) {
            renderSignedOut();
            return;
        }

        root.classList.add('fcc-loading');
        try {
            const data = await fetchPayload();
            render(data);
        } catch (err) {
            console.warn('Command center:', err);
            renderError(
                err && err.message
                    ? err.message
                    : 'Could not load command center. Check your connection and try again.'
            );
        } finally {
            root.classList.remove('fcc-loading');
        }
    }

    function init() {
        const root = document.getElementById(ROOT_ID);
        if (!root) return;

        refresh();

        global.addEventListener('smartfarm:write-replayed', function () {
            refresh();
        });

        global.addEventListener('smartfarm:queue-changed', function () {
            refreshLocalSections();
        });

        if (global.FarmSummary && typeof global.FarmSummary.setupFinancialReplayRefresh === 'function') {
            global.FarmSummary.setupFinancialReplayRefresh(refresh);
        }
    }

    global.FarmCommandCenter = {
        init: init,
        refresh: refresh,
        refreshLocalSections: refreshLocalSections,
        navigate: runNav,
        getLastPayload: function () {
            return lastPayload;
        },
        _inbox: {
            prepareAttentionList: prepareAttentionList,
            pickRecommendedNextStep: pickRecommendedNextStep,
            clusterFeedItems: clusterFeedItems,
            markSeen: markSeen,
            isSeen: isSeen
        },
        _checklist: {
            mergeDailyChecklist: mergeDailyChecklist,
            renderChecklist: renderChecklist
        },
        _weekly: {
            renderWeeklyStrip: renderWeeklyStrip
        },
        _priorities: {
            mergeWeeklyPriorities: mergeWeeklyPriorities,
            renderWeeklyPriorities: renderWeeklyPriorities,
            markPriorityDone: markPriorityDone
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(typeof window !== 'undefined' ? window : global);

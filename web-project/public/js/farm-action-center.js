/**
 * Farm Action Center — unified alert/task model for dashboard "Today on farm".
 * Normalizes crop recommendation alerts, weather alerts, and optional local tasks.
 */
(function (global) {
    'use strict';

    const SOURCES = {
        CROP: 'crop',
        WEATHER: 'weather',
        LOCAL: 'local'
    };

    const UNIFIED_LIVESTOCK_REMINDERS_KEY = 'unifiedLivestockReminders';
    const LEGACY_FEED_MIX_FOLLOWUPS_KEY = 'smartfarm_feed_mix_followups';

    /**
     * @typedef {Object} FarmAction
     * @property {string} id - Stable unique id (source-prefixed)
     * @property {string} title
     * @property {string} dueDate - YYYY-MM-DD
     * @property {string} type - alert/action category
     * @property {'crop'|'weather'|'local'} source
     * @property {string|null} entityId - cropId, farmId, or local task id
     * @property {string} status - e.g. pending, done, read
     * @property {string} priority - low | medium | high | critical
     */

    function getApiOrigin() {
        if (global.SmartFarmApiOrigin && typeof global.SmartFarmApiOrigin.normalizeApiOrigin === 'function') {
            const raw =
                global.SmartFarmApiConfig?.baseUrl ||
                global.__SMARTFARM_API_BASE__ ||
                'https://web-production-86d39.up.railway.app';
            return global.SmartFarmApiOrigin.normalizeApiOrigin(raw);
        }
        const raw =
            global.SmartFarmApiConfig?.baseUrl ||
            global.SmartFarmConfig?.API_BASE_URL ||
            global.__SMARTFARM_API_BASE__ ||
            'https://web-production-86d39.up.railway.app';
        return String(raw).trim().replace(/\/+$/, '').replace(/\/api$/i, '');
    }

    function joinApiPath(subPath) {
        const origin = getApiOrigin();
        if (global.SmartFarmApiOrigin && typeof global.SmartFarmApiOrigin.joinApiPath === 'function') {
            return global.SmartFarmApiOrigin.joinApiPath(origin, subPath);
        }
        const base = origin.replace(/\/$/, '');
        const tail = subPath.startsWith('/') ? subPath.slice(1) : subPath;
        return `${base}/api/${tail}`;
    }

    function getAuthToken() {
        return (
            global.localStorage?.getItem('smartfarm_token') ||
            global.sessionStorage?.getItem('smartfarm_token') ||
            global.localStorage?.getItem('auth_token') ||
            global.sessionStorage?.getItem('auth_token') ||
            null
        );
    }

    function toDateOnly(value) {
        if (!value) return null;
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
            return value.slice(0, 10);
        }
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return null;
        return d.toISOString().slice(0, 10);
    }

    function todayDateOnly() {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    function addDays(dateStr, days) {
        const d = new Date(dateStr + 'T12:00:00');
        d.setDate(d.getDate() + days);
        return d.toISOString().slice(0, 10);
    }

    function normalizePriority(value) {
        const v = String(value || 'medium').toLowerCase();
        if (v === 'critical') return 'critical';
        if (v === 'high') return 'high';
        if (v === 'low') return 'low';
        return 'medium';
    }

    function severityToPriority(severity) {
        return normalizePriority(severity);
    }

    function urgencyToPriority(urgency) {
        const u = String(urgency || '').toLowerCase();
        if (u === 'critical') return 'critical';
        if (u === 'urgent') return 'high';
        if (u === 'high') return 'high';
        if (u === 'low') return 'low';
        return 'medium';
    }

    /**
     * @param {object} alert - crop-recommendations alert row
     * @returns {FarmAction|null}
     */
    function normalizeCropAlert(alert) {
        if (!alert || alert.id == null) return null;
        const due = toDateOnly(alert.dueDate) || todayDateOnly();
        return {
            id: `crop:${alert.id}`,
            title: String(alert.title || 'Crop action reminder'),
            dueDate: due,
            type: String(alert.alertType || alert.type || 'general'),
            source: SOURCES.CROP,
            entityId: alert.cropId != null ? String(alert.cropId) : null,
            status: String(alert.status || 'pending'),
            priority: normalizePriority(alert.priority)
        };
    }

    /**
     * @param {object} alert - weather_alerts API row (snake_case)
     * @returns {FarmAction|null}
     */
    function normalizeWeatherAlert(alert) {
        if (!alert || alert.id == null) return null;
        if (alert.is_dismissed === true) return null;

        const due = toDateOnly(alert.expected_time || alert.expectedTime) || todayDateOnly();
        let status = 'pending';
        if (alert.is_read === true) status = 'read';
        if (alert.action_taken === true) status = 'done';

        return {
            id: `weather:${alert.id}`,
            title: String(alert.title || 'Weather alert'),
            dueDate: due,
            type: String(alert.alert_type || alert.alertType || 'weather'),
            source: SOURCES.WEATHER,
            entityId: alert.farm_id != null ? String(alert.farm_id) : null,
            status: status,
            priority: severityToPriority(alert.severity)
        };
    }

    /**
     * Parse dashboard weeding task schedule strings to YYYY-MM-DD (best effort).
     * @param {string} schedule
     * @returns {string}
     */
    function parseLocalScheduleDate(schedule) {
        const raw = String(schedule || '').trim();
        const s = raw.toLowerCase();
        const today = todayDateOnly();
        if (!raw) return today;

        if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
        const isoPrefix = toDateOnly(raw);
        if (isoPrefix && /^\d{4}-\d{2}-\d{2}$/.test(isoPrefix)) return isoPrefix;

        if (s === 'today') return today;
        if (s.includes('day after tomorrow')) return addDays(today, 2);
        if (s.includes('tomorrow')) return addDays(today, 1);
        if (s.includes('next week')) return addDays(today, 7);

        const daysMatch = s.match(/(\d+)\s*days?/);
        if (daysMatch) {
            const n = parseInt(daysMatch[1], 10);
            if (!Number.isNaN(n) && n >= 0 && n <= 366) return addDays(today, n);
        }

        const slashDate = raw.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
        if (slashDate) {
            const a = parseInt(slashDate[1], 10);
            const b = parseInt(slashDate[2], 10);
            const year = slashDate[3];
            let day;
            let month;
            if (a > 12) {
                day = a;
                month = b;
            } else if (b > 12) {
                month = a;
                day = b;
            } else {
                day = a;
                month = b;
            }
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }

        return isoPrefix || today;
    }

    /**
     * @param {object} task - unifiedWeedingTasks item
     * @returns {FarmAction|null}
     */
    function normalizeLocalTask(task) {
        if (!task) return null;
        const taskId = task.id != null ? String(task.id) : `local-${task.crop}-${task.field}`;
        const status = String(task.status || 'active').toLowerCase();
        if (status === 'completed' || status === 'done' || status === 'cancelled') return null;

        const crop = task.crop ? String(task.crop) : 'Crop';
        const field = task.field ? String(task.field) : '';
        const title = field ? `Weeding: ${crop} (${field})` : `Weeding: ${crop}`;
        const dueDate = parseLocalScheduleDate(task.schedule || task.dueDate);

        return {
            id: `local:${taskId}`,
            title: title,
            dueDate: dueDate,
            type: 'weeding',
            source: SOURCES.LOCAL,
            entityId: taskId,
            status: 'pending',
            priority: urgencyToPriority(task.urgency)
        };
    }

    function readLocalWeedingTasksRaw() {
        try {
            const raw = global.localStorage?.getItem('unifiedWeedingTasks');
            const tasks = raw ? JSON.parse(raw) : [];
            return Array.isArray(tasks) ? tasks : [];
        } catch (e) {
            if (typeof console !== 'undefined' && console.warn) {
                console.warn('[FarmActionCenter] Local tasks read failed:', e.message);
            }
            return [];
        }
    }

    function writeLocalWeedingTasksRaw(tasks) {
        global.localStorage?.setItem('unifiedWeedingTasks', JSON.stringify(tasks));
        try {
            global.dispatchEvent(new CustomEvent('smartfarm:weeding-tasks-changed'));
        } catch (e) {
            /* ignore */
        }
        if (typeof global.updateDashboardWeedingTasks === 'function') {
            global.updateDashboardWeedingTasks();
        }
        if (typeof global.syncWithIntelligentWeeding === 'function') {
            global.syncWithIntelligentWeeding();
        }
    }

    /**
     * Mark a unifiedWeedingTasks row complete (matches dashboard confirmWeedingTaskExecution).
     * @param {string} entityId - local task id (without local: prefix)
     */
    function markLocalWeedingTaskDone(entityId) {
        const id = String(entityId || '');
        if (!id) throw new Error('Weeding task id required');
        const tasks = readLocalWeedingTasksRaw();
        const idx = tasks.findIndex((t) => String(t.id) === id);
        if (idx === -1) throw new Error('Weeding task not found');
        tasks[idx].status = 'completed';
        tasks[idx].completedAt = new Date().toISOString();
        writeLocalWeedingTasksRaw(tasks);
        return tasks[idx];
    }

    /**
     * Reschedule a unifiedWeedingTasks row (stores YYYY-MM-DD for reliable re-parse).
     * @param {string} entityId
     * @param {string} schedule - YYYY-MM-DD or parseable schedule string
     */
    function rescheduleLocalWeedingTask(entityId, schedule) {
        const id = String(entityId || '');
        const nextSchedule = String(schedule || '').trim();
        if (!id) throw new Error('Weeding task id required');
        if (!nextSchedule) throw new Error('Schedule date required');

        const due = parseLocalScheduleDate(nextSchedule);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(due)) {
            throw new Error('Could not parse schedule date');
        }

        const tasks = readLocalWeedingTasksRaw();
        const idx = tasks.findIndex((t) => String(t.id) === id);
        if (idx === -1) throw new Error('Weeding task not found');
        tasks[idx].schedule = due;
        tasks[idx].lastUpdated = new Date().toISOString();
        writeLocalWeedingTasksRaw(tasks);
        return tasks[idx];
    }

    function dedupeAndSort(items) {
        const seen = new Set();
        const out = [];
        items.forEach((item) => {
            if (!item || !item.id || seen.has(item.id)) return;
            seen.add(item.id);
            out.push(item);
        });
        out.sort((a, b) => {
            if (a.dueDate !== b.dueDate) return a.dueDate < b.dueDate ? -1 : 1;
            const pri = { critical: 0, high: 1, medium: 2, low: 3 };
            return (pri[a.priority] ?? 2) - (pri[b.priority] ?? 2);
        });
        return out;
    }

    async function fetchCropAlerts() {
        const path = '/api/crop-recommendations/alerts';

        try {
            if (global.SmartFarmApiClient && typeof global.SmartFarmApiClient.get === 'function') {
                const res = await global.SmartFarmApiClient.get(path);
                return flattenCropAlertPayload(res?.data || res);
            }

            const headers = { Accept: 'application/json' };
            const token = getAuthToken();
            if (token) headers.Authorization = 'Bearer ' + token;

            const response = await fetch(joinApiPath('crop-recommendations/alerts'), {
                method: 'GET',
                headers
            });
            const body = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(body.error || body.message || 'Crop alerts request failed');
            }
            return flattenCropAlertPayload(body.data);
        } catch (err) {
            if (typeof console !== 'undefined' && console.warn) {
                console.warn('[FarmActionCenter] Crop alerts unavailable:', err.message);
            }
            return [];
        }
    }

    /**
     * @param {object} data - { overdue, today, upcoming, all, ... }
     * @returns {FarmAction[]}
     */
    function flattenCropAlertPayload(data) {
        if (!data || typeof data !== 'object') return [];

        const buckets = ['overdue', 'today', 'upcoming'];
        const collected = [];

        buckets.forEach((key) => {
            const list = data[key];
            if (!Array.isArray(list)) return;
            list.forEach((row) => {
                const norm = normalizeCropAlert(row);
                if (norm && norm.status === 'pending') collected.push(norm);
            });
        });

        if (collected.length === 0 && Array.isArray(data.all)) {
            data.all.forEach((row) => {
                const norm = normalizeCropAlert(row);
                if (norm && norm.status === 'pending') collected.push(norm);
            });
        }

        return collected;
    }

    async function fetchWeatherAlerts() {
        try {
            const service = global.weatherAlertsService || global.WeatherAlertsService;
            if (!service) return [];

            const instance = typeof service.getAlerts === 'function' ? service : new service();
            const response = await instance.getAlerts({ limit: 50 });

            if (!response || response.success === false) {
                return [];
            }

            const rows = Array.isArray(response.data) ? response.data : [];
            return rows
                .map(normalizeWeatherAlert)
                .filter(Boolean)
                .filter((a) => a.status === 'pending');
        } catch (err) {
            if (typeof console !== 'undefined' && console.warn) {
                console.warn('[FarmActionCenter] Weather alerts unavailable:', err.message);
            }
            return [];
        }
    }

    /**
     * @param {object[]} [localTasks] - optional; if omitted, not loaded (W1-04 will pass tasks)
     * @returns {FarmAction[]}
     */
    function normalizeLocalTasks(localTasks) {
        if (!Array.isArray(localTasks)) return [];
        return localTasks.map(normalizeLocalTask).filter(Boolean);
    }

    function formatSpeciesLabel(species) {
        const s = String(species || 'livestock').trim();
        if (!s) return 'Livestock';
        return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
    }

    function formatLifecycleLabel(lifecycle) {
        const label = String(lifecycle || '')
            .trim()
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());
        return label || 'General';
    }

    function buildFeedMixReminderId() {
        const d = todayDateOnly().replace(/-/g, '_');
        const suffix = String(Date.now() % 1000).padStart(3, '0');
        return `feedmix_${d}_${suffix}`;
    }

    /**
     * Days until feed-mix follow-up (default 7; 14 when lifecycle clearly longer-cycle).
     * @param {object} meta - { lifecycle, purpose }
     * @returns {number}
     */
    function feedMixFollowUpDays(meta) {
        const lifecycle = String(meta.lifecycle || '').toLowerCase();
        const purpose = String(meta.purpose || '').toLowerCase();
        if (/dairy|lactat|layer|milking|breed|cow_dairy/.test(lifecycle) || /dairy|lactat/.test(purpose)) {
            return 14;
        }
        return 7;
    }

    function migrateLegacyFeedMixFollowUps(rows) {
        try {
            const legacyRaw = global.localStorage?.getItem(LEGACY_FEED_MIX_FOLLOWUPS_KEY);
            if (!legacyRaw) return rows;
            const legacy = JSON.parse(legacyRaw);
            if (!Array.isArray(legacy) || !legacy.length) return rows;

            legacy.forEach((old) => {
                if (!old || old.id == null) return;
                const status = String(old.status || 'pending').toLowerCase();
                if (status === 'done' || status === 'completed') return;
                if (rows.some((r) => String(r.id) === String(old.id))) return;
                rows.push({
                    id: String(old.id).startsWith('feedmix_') ? String(old.id) : buildFeedMixReminderId(),
                    livestockType: formatSpeciesLabel(old.species),
                    group: formatLifecycleLabel(old.lifecycle),
                    title: 'Review feeding schedule',
                    dueDate: toDateOnly(old.dueDate) || todayDateOnly(),
                    status: 'pending',
                    priority: old.priority || 'medium',
                    sourceRef: 'feed-mix',
                    createdAt: old.savedAt || old.createdAt || new Date().toISOString()
                });
            });
            global.localStorage?.removeItem(LEGACY_FEED_MIX_FOLLOWUPS_KEY);
            writeLocalLivestockRemindersRaw(rows);
        } catch (e) {
            if (typeof console !== 'undefined' && console.warn) {
                console.warn('[FarmActionCenter] Legacy feed mix follow-up migration skipped:', e.message);
            }
        }
        return rows;
    }

    function readLocalLivestockRemindersRaw() {
        try {
            const raw = global.localStorage?.getItem(UNIFIED_LIVESTOCK_REMINDERS_KEY);
            let rows = raw ? JSON.parse(raw) : [];
            if (!Array.isArray(rows)) rows = [];
            if (!rows.length) {
                rows = migrateLegacyFeedMixFollowUps(rows);
            }
            return rows;
        } catch (e) {
            if (typeof console !== 'undefined' && console.warn) {
                console.warn('[FarmActionCenter] Livestock reminders read failed:', e.message);
            }
            return [];
        }
    }

    function writeLocalLivestockRemindersRaw(items) {
        global.localStorage?.setItem(UNIFIED_LIVESTOCK_REMINDERS_KEY, JSON.stringify(items));
        try {
            global.dispatchEvent(new CustomEvent('smartfarm:livestock-reminders-changed'));
        } catch (e) {
            /* ignore */
        }
    }

    /**
     * @param {object} reminder - unifiedLivestockReminders row
     * @returns {FarmAction|null}
     */
    function normalizeLocalLivestockReminder(reminder) {
        if (!reminder) return null;
        const status = String(reminder.status || 'pending').toLowerCase();
        if (status === 'done' || status === 'completed') return null;

        const entityId = reminder.id != null ? String(reminder.id) : null;
        if (!entityId) return null;

        const baseTitle = String(reminder.title || 'Review feeding schedule').trim();
        const livestockType = String(reminder.livestockType || 'Livestock').trim();
        const group = String(reminder.group || '').trim();
        const title = group
            ? `${baseTitle} — ${livestockType} (${group})`
            : `${baseTitle} — ${livestockType}`;

        return {
            id: `livestock-local:${entityId}`,
            title: title,
            dueDate: toDateOnly(reminder.dueDate) || todayDateOnly(),
            type: 'livestock-followup',
            source: SOURCES.LOCAL,
            entityId: entityId,
            status: 'pending',
            priority: normalizePriority(reminder.priority)
        };
    }

    function normalizeLocalLivestockReminders(reminders) {
        if (!Array.isArray(reminders)) return [];
        return reminders.map(normalizeLocalLivestockReminder).filter(Boolean);
    }

    /**
     * Create or refresh a follow-up after a successful feed mix save (localStorage only).
     * @param {object} feedMix - species, lifecycle, purpose, createdAt?, id?
     * @returns {object} stored reminder row
     */
    function createFeedMixFollowUpReminder(feedMix) {
        const species = String((feedMix && (feedMix.species || feedMix.livestockType)) || '').trim();
        if (!species) {
            throw new Error('Feed mix species is required for a follow-up reminder');
        }

        const lifecycle = String(feedMix.lifecycle || '');
        const livestockType = formatSpeciesLabel(species);
        const group = formatLifecycleLabel(lifecycle);
        const days = feedMixFollowUpDays({ lifecycle: lifecycle, purpose: feedMix.purpose });
        const dueDate = addDays(todayDateOnly(), days);
        const createdAt = feedMix.createdAt || new Date().toISOString();

        const rows = readLocalLivestockRemindersRaw();
        const existingIdx = rows.findIndex(
            (r) =>
                String(r.status || 'pending').toLowerCase() === 'pending' &&
                r.sourceRef === 'feed-mix' &&
                String(r.livestockType) === livestockType &&
                String(r.group) === group
        );

        const reminder = {
            id: existingIdx >= 0 ? rows[existingIdx].id : buildFeedMixReminderId(),
            livestockType: livestockType,
            group: group,
            title: 'Review feeding schedule',
            dueDate: dueDate,
            status: 'pending',
            priority: 'medium',
            sourceRef: 'feed-mix',
            createdAt: createdAt
        };

        if (existingIdx >= 0) {
            rows[existingIdx] = { ...rows[existingIdx], ...reminder };
        } else {
            rows.unshift(reminder);
        }

        writeLocalLivestockRemindersRaw(rows.slice(0, 40));
        return reminder;
    }

    /**
     * @param {string} id - raw reminder id (without livestock-local: prefix)
     */
    function markLocalLivestockReminderDone(id) {
        const entityId = String(id || '');
        if (!entityId) throw new Error('Reminder id required');
        const rows = readLocalLivestockRemindersRaw();
        const idx = rows.findIndex((r) => String(r.id) === entityId);
        if (idx === -1) throw new Error('Livestock reminder not found');
        rows[idx].status = 'done';
        rows[idx].completedAt = new Date().toISOString();
        writeLocalLivestockRemindersRaw(rows);
        return rows[idx];
    }

    /**
     * Fetch and merge all farm action sources.
     * @param {object} [options]
     * @param {boolean} [options.includeLocal=false] - weeding tasks + livestock reminders from localStorage
     * @param {object[]} [options.localTasks] - explicit local task list (overrides weeding storage only)
     * @returns {Promise<FarmAction[]>}
     */
    async function fetchAllFarmActions(options) {
        const opts = options || {};
        const includeLocal = opts.includeLocal === true;
        const localExplicit = opts.localTasks;

        const [cropItems, weatherItems] = await Promise.all([
            fetchCropAlerts(),
            fetchWeatherAlerts()
        ]);

        let localItems = [];
        if (Array.isArray(localExplicit)) {
            localItems = normalizeLocalTasks(localExplicit);
        } else if (includeLocal) {
            localItems = normalizeLocalTasks(readLocalWeedingTasksRaw()).concat(
                normalizeLocalLivestockReminders(readLocalLivestockRemindersRaw())
            );
        }

        return dedupeAndSort([].concat(cropItems, weatherItems, localItems));
    }

    global.FarmActionCenter = {
        SOURCES,
        normalizeCropAlert,
        normalizeWeatherAlert,
        normalizeLocalTask,
        normalizeLocalTasks,
        parseLocalScheduleDate,
        readLocalWeedingTasksRaw,
        markLocalWeedingTaskDone,
        rescheduleLocalWeedingTask,
        UNIFIED_LIVESTOCK_REMINDERS_KEY,
        feedMixFollowUpDays,
        readLocalLivestockRemindersRaw,
        writeLocalLivestockRemindersRaw,
        normalizeLocalLivestockReminder,
        normalizeLocalLivestockReminders,
        createFeedMixFollowUpReminder,
        markLocalLivestockReminderDone,
        fetchCropAlerts,
        fetchWeatherAlerts,
        fetchAllFarmActions,
        toDateOnly,
        todayDateOnly
    };
})(typeof window !== 'undefined' ? window : global);

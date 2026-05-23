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

    /**
     * Fetch and merge all farm action sources.
     * @param {object} [options]
     * @param {boolean} [options.includeLocal=false] - include unifiedWeedingTasks from localStorage
     * @param {object[]} [options.localTasks] - explicit local task list (overrides storage)
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
            localItems = normalizeLocalTasks(readLocalWeedingTasksRaw());
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
        fetchCropAlerts,
        fetchWeatherAlerts,
        fetchAllFarmActions,
        toDateOnly,
        todayDateOnly
    };
})(typeof window !== 'undefined' ? window : global);

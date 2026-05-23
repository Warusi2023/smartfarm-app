/**
 * Offline write queue (W3-01) — queue critical POSTs when the API is unreachable.
 */
(function (global) {
    'use strict';

    const STORAGE_KEY = 'smartfarm_offline_write_queue';
    const MAX_ENTRIES = 50;
    const MAX_ATTEMPTS = 12;
    const AUTO_FLUSH_MS = 45000;
    const BACKOFF_BASE_MS = 2000;

    const QUEUE_TYPES = {
        CROP_ACTION: 'crop-action',
        SOIL_TEST: 'soil-test'
    };

    /** POST paths enabled in W3-01 */
    const ENABLED = {
        [QUEUE_TYPES.CROP_ACTION]: {
            method: 'POST',
            path: '/crop-recommendations/actions',
            label: 'crop action'
        },
        [QUEUE_TYPES.SOIL_TEST]: {
            method: 'POST',
            path: '/crop-recommendations/soil-tests',
            label: 'soil test'
        }
    };

    let requestFn = null;
    let onQueuedFn = null;
    let onReplaySuccessFn = null;
    let onReplayFailFn = null;
    let getUserKeyFn = null;
    let showNoticeFn = null;
    let flushTimer = null;
    let flushing = false;

    function nowIso() {
        return new Date().toISOString();
    }

    function uuid() {
        if (global.crypto && crypto.randomUUID) return crypto.randomUUID();
        return 'q-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
    }

    function getUserKey() {
        if (getUserKeyFn) return getUserKeyFn();
        try {
            const t =
                global.localStorage?.getItem('smartfarm_token') ||
                global.sessionStorage?.getItem('smartfarm_token');
            if (!t) return 'anon';
            const parts = t.split('.');
            if (parts[1]) {
                const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
                return String(payload.sub || payload.id || payload.userId || 'jwt');
            }
        } catch (_) {
            /* ignore */
        }
        return 'anon';
    }

    function loadStore() {
        try {
            const raw = global.localStorage.getItem(STORAGE_KEY);
            const data = raw ? JSON.parse(raw) : { version: 1, entries: [] };
            if (!data || !Array.isArray(data.entries)) return { version: 1, entries: [] };
            return data;
        } catch (_) {
            return { version: 1, entries: [] };
        }
    }

    function saveStore(store) {
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }

    function getEntriesForUser() {
        const key = getUserKey();
        return loadStore().entries.filter((e) => e.userKey === key);
    }

    function isQueueableError(err) {
        if (!err) return false;
        const msg = String(err.message || err);
        if (isPermanentClientError(msg)) return false;
        if (
            msg.includes('Failed to fetch') ||
            msg.includes('NetworkError') ||
            msg.includes('Network request failed') ||
            msg.includes('timeout') ||
            msg.includes('aborted') ||
            err.name === 'TypeError' ||
            err.name === 'AbortError'
        ) {
            return true;
        }
        if (/\b502\b|\b503\b|\b504\b/.test(msg)) return true;
        return false;
    }

    function isPermanentClientError(msg) {
        return /invalid|required|sign in|unauthorized|401|403|404|not found|must be a/i.test(msg);
    }

    function enqueue(entry) {
        const store = loadStore();
        if (store.entries.some((e) => e.id === entry.id)) {
            return entry;
        }
        store.entries.push(entry);
        while (store.entries.length > MAX_ENTRIES) {
            store.entries.shift();
        }
        saveStore(store);
        updateStatusBar();
        return entry;
    }

    function removeEntry(id) {
        const store = loadStore();
        store.entries = store.entries.filter((e) => e.id !== id);
        saveStore(store);
        updateStatusBar();
    }

    function updateEntry(entry) {
        const store = loadStore();
        const idx = store.entries.findIndex((e) => e.id === entry.id);
        if (idx >= 0) {
            store.entries[idx] = entry;
            saveStore(store);
        }
        updateStatusBar();
    }

    function getPendingCount() {
        return getEntriesForUser().filter((e) => e.status === 'pending' || e.status === 'processing').length;
    }

    function showNotice(message, type) {
        if (showNoticeFn) showNoticeFn(message, type || 'info');
        else if (global.console) console.log('[OfflineWriteQueue]', type, message);
    }

    function ensureStatusBar() {
        let bar = document.getElementById('sf-offline-queue-bar');
        if (bar) return bar;
        if (!document.body) return null;
        bar = document.createElement('div');
        bar.id = 'sf-offline-queue-bar';
        bar.className = 'sf-offline-queue-bar';
        bar.setAttribute('role', 'status');
        bar.innerHTML =
            '<div class="sf-offline-queue-inner">' +
            '<i class="fas fa-cloud-upload-alt me-2" aria-hidden="true"></i>' +
            '<span id="sf-offline-queue-text"></span>' +
            '<button type="button" class="btn btn-sm btn-light ms-2" id="sf-offline-queue-retry">Retry now</button>' +
            '<button type="button" class="btn btn-sm btn-outline-light ms-1" id="sf-offline-queue-clear">Clear</button>' +
            '</div>';
        document.body.appendChild(bar);

        if (!document.getElementById('sf-offline-queue-styles')) {
            const style = document.createElement('style');
            style.id = 'sf-offline-queue-styles';
            style.textContent =
                '.sf-offline-queue-bar{display:none;position:fixed;bottom:0;left:0;right:0;z-index:1080;' +
                'background:#5d4037;color:#fff;padding:10px 16px;font-size:0.9rem;box-shadow:0 -2px 8px rgba(0,0,0,.15)}' +
                '.sf-offline-queue-bar.sf-offline-queue-visible{display:block}' +
                '.sf-offline-queue-inner{max-width:960px;margin:0 auto;display:flex;align-items:center;flex-wrap:wrap;gap:4px}' +
                '#sf-offline-queue-text{flex:1;min-width:180px}';
            document.head.appendChild(style);
        }

        document.getElementById('sf-offline-queue-retry').onclick = function () {
            flush({ reason: 'manual' });
        };
        document.getElementById('sf-offline-queue-clear').onclick = function () {
            if (
                global.confirm(
                    'Clear all queued writes for this browser? Unsynced data will be lost.'
                )
            ) {
                clearQueue();
            }
        };
        return bar;
    }

    function updateStatusBar() {
        const bar = ensureStatusBar();
        if (!bar) return;
        const n = getPendingCount();
        const text = document.getElementById('sf-offline-queue-text');
        if (n === 0) {
            bar.classList.remove('sf-offline-queue-visible');
            return;
        }
        bar.classList.add('sf-offline-queue-visible');
        if (text) {
            text.textContent =
                n === 1
                    ? '1 action waiting to sync when back online.'
                    : n + ' actions waiting to sync when back online.';
        }
    }

    /**
     * Try live POST; on queueable failure persist and return queued result.
     * @param {{ type: string, body: object, requestFn?: Function, label?: string }} opts
     */
    async function submit(opts) {
        const type = opts.type;
        const cfg = ENABLED[type];
        if (!cfg) {
            throw new Error('Unknown queue type: ' + type);
        }
        const clientRequestId = opts.clientRequestId || uuid();
        const body = Object.assign({}, opts.body || {}, { clientRequestId: clientRequestId });
        const doRequest =
            opts.requestFn ||
            (requestFn
                ? () => requestFn(cfg.method, cfg.path, body)
                : null);
        if (!doRequest) {
            throw new Error('OfflineWriteQueue: requestFn not configured');
        }

        try {
            const response = await doRequest();
            return { queued: false, response: response, clientRequestId: clientRequestId };
        } catch (err) {
            if (!isQueueableError(err)) {
                throw err;
            }
            const entry = {
                id: clientRequestId,
                type: type,
                method: cfg.method,
                path: cfg.path,
                body: body,
                label: opts.label || cfg.label,
                userKey: getUserKey(),
                createdAt: nowIso(),
                attempts: 0,
                lastAttemptAt: null,
                lastError: String(err.message || err),
                status: 'pending'
            };
            enqueue(entry);
            if (onQueuedFn) onQueuedFn(entry);
            const msg =
                (opts.label || cfg.label) +
                ' could not reach the server — saved on this device and will retry automatically.';
            showNotice(msg, 'warning');
            try {
                global.dispatchEvent(
                    new CustomEvent('smartfarm:write-queued', { detail: { entry: entry } })
                );
            } catch (_) {
                /* ignore */
            }
            scheduleFlushSoon();
            return { queued: true, clientRequestId: clientRequestId, entry: entry };
        }
    }

    function scheduleFlushSoon() {
        global.setTimeout(function () {
            flush({ reason: 'scheduled' });
        }, BACKOFF_BASE_MS);
    }

    async function flush(opts) {
        if (flushing || !requestFn) return { replayed: 0, failed: 0 };
        flushing = true;
        let replayed = 0;
        let failed = 0;
        try {
            const entries = getEntriesForUser().filter(
                (e) => e.status === 'pending' && e.attempts < MAX_ATTEMPTS
            );
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                const backoff = BACKOFF_BASE_MS * Math.min(8, Math.pow(2, entry.attempts || 0));
                if (entry.lastAttemptAt) {
                    const elapsed = Date.now() - new Date(entry.lastAttemptAt).getTime();
                    if (elapsed < backoff && (!opts || opts.reason !== 'manual')) {
                        continue;
                    }
                }
                entry.status = 'processing';
                entry.lastAttemptAt = nowIso();
                entry.attempts = (entry.attempts || 0) + 1;
                updateEntry(entry);

                try {
                    const response = await requestFn(entry.method, entry.path, entry.body);
                    removeEntry(entry.id);
                    replayed++;
                    if (onReplaySuccessFn) onReplaySuccessFn(entry, response);
                    try {
                        global.dispatchEvent(
                            new CustomEvent('smartfarm:write-replayed', {
                                detail: { entry: entry, response: response }
                            })
                        );
                    } catch (_) {
                        /* ignore */
                    }
                } catch (err) {
                    entry.lastError = String(err.message || err);
                    if (isPermanentClientError(entry.lastError)) {
                        entry.status = 'failed';
                    } else {
                        entry.status = 'pending';
                    }
                    updateEntry(entry);
                    failed++;
                    if (onReplayFailFn) onReplayFailFn(entry, err);
                }
            }
            if (replayed > 0) {
                showNotice(
                    replayed === 1
                        ? '1 queued action synced successfully.'
                        : replayed + ' queued actions synced successfully.',
                    'success'
                );
            }
        } finally {
            flushing = false;
            updateStatusBar();
        }
        return { replayed: replayed, failed: failed };
    }

    function clearQueue() {
        const key = getUserKey();
        const store = loadStore();
        store.entries = store.entries.filter((e) => e.userKey !== key);
        saveStore(store);
        updateStatusBar();
        showNotice('Offline write queue cleared for this browser.', 'info');
    }

    function startAutoFlush() {
        if (flushTimer) global.clearInterval(flushTimer);
        flushTimer = global.setInterval(function () {
            flush({ reason: 'interval' });
        }, AUTO_FLUSH_MS);
        global.addEventListener('online', function () {
            flush({ reason: 'online' });
        });
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                flush({ reason: 'load' });
            });
        } else {
            flush({ reason: 'load' });
        }
    }

    function init(options) {
        options = options || {};
        requestFn = options.request;
        onQueuedFn = options.onQueued || null;
        onReplaySuccessFn = options.onReplaySuccess || null;
        onReplayFailFn = options.onReplayFail || null;
        getUserKeyFn = options.getUserKey || null;
        showNoticeFn = options.showNotice || null;
        ensureStatusBar();
        updateStatusBar();
        startAutoFlush();
    }

    function isEnabledType(type) {
        return Boolean(ENABLED[type]);
    }

    global.OfflineWriteQueue = {
        init,
        submit,
        flush,
        clearQueue,
        getPendingCount,
        isEnabledType,
        isQueueableError,
        QUEUE_TYPES,
        STORAGE_KEY,
        MAX_ENTRIES
    };
})(typeof window !== 'undefined' ? window : global);

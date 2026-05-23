/**
 * W3-04 — OfflineWriteQueue contract: enabled endpoints attach clientRequestId on queue.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const QUEUE_SCRIPT = path.join(
    __dirname,
    '../../../web-project/public/js/offline-write-queue.js'
);

function loadOfflineWriteQueue() {
    const code = fs.readFileSync(QUEUE_SCRIPT, 'utf8');
    const storage = {};
    const sandbox = {
        localStorage: {
            getItem(key) {
                return storage[key] ?? null;
            },
            setItem(key, value) {
                storage[key] = value;
            },
            removeItem(key) {
                delete storage[key];
            }
        },
        document: {
            body: { appendChild: function () {} },
            head: { appendChild: function () {} },
            getElementById: function (id) {
                if (id === 'sf-offline-queue-text') {
                    return { textContent: '' };
                }
                if (id === 'sf-offline-queue-retry' || id === 'sf-offline-queue-clear') {
                    return { onclick: null };
                }
                return null;
            },
            createElement: function () {
                return {
                    id: '',
                    className: '',
                    classList: { add: function () {}, remove: function () {} },
                    setAttribute: function () {},
                    appendChild: function () {},
                    onclick: null,
                    innerHTML: ''
                };
            },
            readyState: 'complete',
            addEventListener: function () {}
        },
        crypto: {
            randomUUID: () => 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
        },
        CustomEvent: function CustomEvent(type, opts) {
            return { type, detail: (opts && opts.detail) || {} };
        },
        console,
        setTimeout: function () {
            return 0;
        },
        clearInterval: function () {},
        clearTimeout: function () {},
        setInterval: function () {
            return 0;
        },
        addEventListener: function () {},
        confirm: function () {
            return true;
        }
    };
    sandbox.window = sandbox;
    sandbox.global = sandbox;
    const context = vm.createContext(sandbox);
    vm.runInContext(code, context, { filename: 'offline-write-queue.js' });
    return { OfflineWriteQueue: sandbox.window.OfflineWriteQueue, storage };
}

describe('OfflineWriteQueue contract', () => {
    let OfflineWriteQueue;
    let queueStorage;

    beforeAll(() => {
        const loaded = loadOfflineWriteQueue();
        OfflineWriteQueue = loaded.OfflineWriteQueue;
        queueStorage = loaded.storage;
    });

    test('exposes all Week 3 queue-enabled write types', () => {
        expect(OfflineWriteQueue.QUEUE_TYPES.CROP_ACTION).toBe('crop-action');
        expect(OfflineWriteQueue.QUEUE_TYPES.SOIL_TEST).toBe('soil-test');
        expect(OfflineWriteQueue.QUEUE_TYPES.FEED_MIX_COST).toBe('feed-mix-cost');
        expect(OfflineWriteQueue.QUEUE_TYPES.FARM_REVENUE).toBe('farm-revenue');
        expect(OfflineWriteQueue.isEnabledType('crop-action')).toBe(true);
        expect(OfflineWriteQueue.isEnabledType('farm-revenue')).toBe(true);
    });

    test('submit attaches clientRequestId to body when network fails and enqueues', async () => {
        const calls = [];
        const notices = [];

        OfflineWriteQueue.init({
            request: function () {
                calls.push(Array.from(arguments));
                return Promise.reject(new Error('Failed to fetch'));
            },
            showNotice: function (msg) {
                notices.push(msg);
            },
            getUserKey: function () {
                return 'test-user';
            }
        });
        const body = { amount: 25, date: '2026-05-23', description: 'eggs' };
        const out = await OfflineWriteQueue.submit({
            type: OfflineWriteQueue.QUEUE_TYPES.FARM_REVENUE,
            body,
            label: 'Revenue'
        });

        expect(out.queued).toBe(true);
        expect(out.clientRequestId).toMatch(/^[a-zA-Z0-9_-]{8,128}$/);
        expect(calls).toHaveLength(1);
        expect(calls[0][0]).toBe('POST');
        expect(calls[0][1]).toBe('/farm-summary/revenue');
        expect(calls[0][2].amount).toBe(25);
        expect(calls[0][2].clientRequestId).toBe(out.clientRequestId);

        const persisted = JSON.parse(queueStorage[OfflineWriteQueue.STORAGE_KEY]);
        expect(persisted.entries).toHaveLength(1);
        expect(persisted.entries[0].body.clientRequestId).toBe(out.clientRequestId);
        expect(persisted.entries[0].path).toBe('/farm-summary/revenue');
        expect(notices.length).toBeGreaterThan(0);
    });

    test('does not queue validation-style permanent errors', async () => {
        OfflineWriteQueue.init({
            request: function () {
                return Promise.reject(new Error('amount must be a non-negative number'));
            },
            getUserKey: function () {
                return 'test-user';
            }
        });

        await expect(
            OfflineWriteQueue.submit({
                type: OfflineWriteQueue.QUEUE_TYPES.FEED_MIX_COST,
                body: { amount: -1 },
                label: 'Feed mix cost'
            })
        ).rejects.toThrow(/non-negative/);
    });
});

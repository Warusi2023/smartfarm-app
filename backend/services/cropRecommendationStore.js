/**
 * File-backed store for crop recommendation actions, soil tests, and alerts.
 */

const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const { computeNextDueDate } = require('./recommendationSchedule');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'crop_recommendation_data.json');

const EMPTY = () => ({
    recommendations: [],
    actions: [],
    soilTests: [],
    alerts: []
});

function ensureStore() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(EMPTY(), null, 2), 'utf8');
    }
}

function readStore() {
    ensureStore();
    try {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        if (!raw || !raw.trim()) {
            const empty = EMPTY();
            writeStore(empty);
            return empty;
        }
        const data = JSON.parse(raw);
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid store shape');
        }
        return {
            recommendations: Array.isArray(data.recommendations) ? data.recommendations : [],
            actions: Array.isArray(data.actions) ? data.actions : [],
            soilTests: Array.isArray(data.soilTests) ? data.soilTests : [],
            alerts: Array.isArray(data.alerts) ? data.alerts : []
        };
    } catch (e) {
        console.warn('[cropRecommendationStore] Resetting corrupt store:', e.message);
        const empty = EMPTY();
        try {
            writeStore(empty);
        } catch (writeErr) {
            console.warn('[cropRecommendationStore] Could not rewrite store:', writeErr.message);
        }
        return empty;
    }
}

function writeStore(data) {
    ensureStore();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function nowIso() {
    return new Date().toISOString();
}

class CropRecommendationStore {
    saveRecommendationSnapshot(payload) {
        const store = readStore();
        const rec = {
            id: payload.id || randomUUID(),
            cropId: String(payload.cropId),
            cropName: payload.cropName || '',
            variety: payload.variety || '',
            fieldId: payload.fieldId || payload.field || '',
            fieldName: payload.fieldName || payload.field || '',
            growthStage: payload.growthStage || '',
            recommendationPayload: payload.recommendationPayload || {},
            generatedAt: payload.generatedAt || nowIso(),
            source: payload.source || 'ai-advisory',
            userId: payload.userId || 'default-user'
        };
        store.recommendations.push(rec);
        writeStore(store);
        return rec;
    }

    createAction(payload) {
        const store = readStore();
        const action = {
            id: randomUUID(),
            recommendationId: payload.recommendationId || null,
            cropId: String(payload.cropId),
            fieldId: payload.fieldId || '',
            actionType: payload.actionType || 'general',
            recommendationText: payload.recommendationText || '',
            status: payload.status || 'scheduled',
            scheduledDate: payload.scheduledDate || null,
            completedDate: payload.completedDate || null,
            quantity: payload.quantity ?? null,
            unit: payload.unit || '',
            method: payload.method || '',
            notes: payload.notes || '',
            performedBy: payload.performedBy || '',
            nextDueDate: payload.nextDueDate || null,
            skipReason: payload.skipReason || null,
            userId: payload.userId || 'default-user',
            createdAt: nowIso(),
            updatedAt: nowIso()
        };

        const schedule = computeNextDueDate({
            status: action.status,
            completedDate: action.completedDate,
            scheduledDate: action.scheduledDate,
            applicationText: payload.applicationText || action.recommendationText,
            frequencyText: payload.frequencyText || '',
            actionType: action.actionType,
            title: payload.alertTitle
        });
        action.nextDueDate = payload.nextDueDate || schedule.nextDueDate;

        store.actions.push(action);

        let alert = null;
        if (['completed', 'scheduled', 'skipped'].includes(action.status)) {
            alert = {
                id: randomUUID(),
                cropId: action.cropId,
                recommendationActionId: action.id,
                recommendationId: action.recommendationId,
                title: schedule.title,
                alertType: schedule.alertType,
                dueDate: action.nextDueDate,
                priority: schedule.priority,
                status: 'pending',
                generatedFrom: schedule.generatedFrom,
                notes: schedule.intervalLabel,
                userId: action.userId,
                createdAt: nowIso(),
                updatedAt: nowIso()
            };
            store.alerts.push(alert);
        }

        writeStore(store);
        return { action, alert, schedule };
    }

    createSoilTestAlert(test, payload, storeIn) {
        const store = storeIn || readStore();
        const alert = {
            id: randomUUID(),
            cropId: String(test.cropId),
            recommendationActionId: null,
            recommendationId: null,
            title: 'Review fertilizer plan after soil test',
            alertType: 'soil_test',
            dueDate: test.testDate || (payload && payload.testDate) || nowIso().slice(0, 10),
            priority: 'medium',
            status: 'pending',
            generatedFrom: 'soil_test_saved',
            notes: 'Soil test recorded — review adjusted fertilizer advice',
            userId: test.userId || (payload && payload.userId) || 'default-user',
            createdAt: nowIso(),
            updatedAt: nowIso()
        };
        store.alerts.push(alert);
        if (!storeIn) {
            writeStore(store);
        }
        return alert;
    }

    saveSoilTest(payload) {
        const store = readStore();
        const test = {
            id: payload.id || randomUUID(),
            cropId: String(payload.cropId),
            fieldId: payload.fieldId || '',
            testDate: payload.testDate || nowIso().slice(0, 10),
            ph: payload.ph ?? null,
            nitrogen: payload.nitrogen ?? null,
            phosphorus: payload.phosphorus ?? null,
            potassium: payload.potassium ?? null,
            calcium: payload.calcium ?? null,
            magnesium: payload.magnesium ?? null,
            organicMatter: payload.organicMatter ?? null,
            moisture: payload.moisture ?? null,
            notes: payload.notes || '',
            source: payload.source || '',
            userId: payload.userId || 'default-user',
            createdAt: payload.createdAt || nowIso(),
            storage: payload.storage || 'file'
        };
        store.soilTests.push(test);
        const alert = this.createSoilTestAlert(test, payload, store);
        writeStore(store);
        return { test, alert };
    }

    getActionsByCrop(cropId, userId) {
        const store = readStore();
        return store.actions
            .filter((a) => String(a.cropId) === String(cropId))
            .filter((a) => !userId || a.userId === userId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    getLatestSoilTestFromFile(cropId, userId) {
        const tests = this.getHistoryByCrop(cropId, userId).soilTests;
        return tests.length ? tests[0] : null;
    }

    getHistoryByCrop(cropId, userId) {
        const store = readStore();
        const byCropUser = (row) =>
            String(row.cropId) === String(cropId) && (!userId || row.userId === userId);
        return {
            recommendations: store.recommendations
                .filter(byCropUser)
                .sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt)),
            actions: this.getActionsByCrop(cropId, userId),
            soilTests: store.soilTests
                .filter(byCropUser)
                .sort((a, b) => new Date(b.testDate) - new Date(a.testDate)),
            alerts: store.alerts
                .filter(byCropUser)
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        };
    }

    listAlerts(filters = {}) {
        const store = readStore();
        const today = nowIso().slice(0, 10);
        let list = [...store.alerts];
        if (filters.cropId) {
            list = list.filter((a) => String(a.cropId) === String(filters.cropId));
        }
        if (filters.userId) {
            list = list.filter((a) => a.userId === filters.userId);
        }
        if (filters.status) {
            list = list.filter((a) => a.status === filters.status);
        }
        list.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        return {
            all: list,
            today: list.filter((a) => a.status === 'pending' && a.dueDate === today),
            overdue: list.filter((a) => a.status === 'pending' && a.dueDate < today),
            upcoming: list.filter((a) => a.status === 'pending' && a.dueDate > today).slice(0, 20),
            completedRecently: list.filter((a) => a.status === 'done').slice(-10)
        };
    }

    updateAlert(alertId, updates, userId) {
        const store = readStore();
        const idx = store.alerts.findIndex((a) => a.id === alertId);
        if (idx === -1) return null;
        if (userId && store.alerts[idx].userId && store.alerts[idx].userId !== userId) {
            return null;
        }
        const allowed = {};
        if (updates.status !== undefined) allowed.status = updates.status;
        if (updates.notes !== undefined) allowed.notes = updates.notes;
        store.alerts[idx] = { ...store.alerts[idx], ...allowed, updatedAt: nowIso() };
        writeStore(store);
        return store.alerts[idx];
    }
}

module.exports = new CropRecommendationStore();

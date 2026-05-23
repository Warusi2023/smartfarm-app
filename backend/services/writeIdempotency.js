/**
 * Idempotent writes for offline queue replay (W3-02).
 * Persists processed clientRequestId + payload hash + cached API result in the crop JSON store.
 */

const crypto = require('crypto');
const { ConflictError, ValidationError } = require('../utils/errors');
const logger = require('../utils/logger');
const cropStore = require('./cropRecommendationStore');

const CLIENT_ID_RE = /^[a-zA-Z0-9_-]{8,128}$/;
const MAX_RECORDS = 500;

const PAYLOAD_KEYS = {
    'crop-action': [
        'cropId',
        'actionType',
        'status',
        'recommendationText',
        'scheduledDate',
        'completedDate',
        'quantity',
        'unit',
        'method',
        'notes',
        'performedBy',
        'nextDueDate',
        'skipReason',
        'costAmount',
        'costNote',
        'recommendationId',
        'fieldId'
    ],
    'soil-test': [
        'cropId',
        'fieldId',
        'testDate',
        'ph',
        'nitrogen',
        'phosphorus',
        'potassium',
        'calcium',
        'magnesium',
        'organicMatter',
        'moisture',
        'notes',
        'source',
        'farmId',
        'farm_id'
    ],
    'feed-mix-cost': [
        'amount',
        'dailyCost',
        'farmId',
        'farm_id',
        'feedMixId',
        'id',
        'livestockType',
        'species',
        'group',
        'lifecycle',
        'growthStage',
        'purpose'
    ],
    'farm-revenue': [
        'date',
        'amount',
        'description',
        'type',
        'farmId',
        'farm_id',
        'category',
        'cropName',
        'livestockType',
        'note'
    ]
};

function normalizeClientRequestId(value) {
    if (value == null || String(value).trim() === '') {
        return null;
    }
    const id = String(value).trim();
    if (!CLIENT_ID_RE.test(id)) {
        throw new ValidationError(
            'clientRequestId must be 8–128 characters (letters, numbers, underscore, hyphen)'
        );
    }
    return id;
}

function stablePayloadSlice(operation, body) {
    const keys = PAYLOAD_KEYS[operation];
    if (!keys || !body) return {};
    const out = {};
    keys.forEach((key) => {
        if (body[key] !== undefined && body[key] !== '') {
            out[key] = body[key];
        }
    });
    return out;
}

function hashPayload(operation, body) {
    const slice = stablePayloadSlice(operation, body);
    const json = JSON.stringify(slice, Object.keys(slice).sort());
    return crypto.createHash('sha256').update(json).digest('hex');
}

/**
 * @param {string} userId
 * @param {string} operation - crop-action | soil-test
 * @param {string} clientRequestId
 * @param {object} payload - request body for hashing
 * @param {() => Promise<object>} execute - returns API `data` object to cache
 */
async function runIdempotent({ userId, operation, clientRequestId, payload, execute }) {
    const key = normalizeClientRequestId(clientRequestId);
    if (!key) {
        const result = await execute();
        return { replayed: false, result };
    }

    const payloadHash = hashPayload(operation, payload);
    const existing = cropStore.getIdempotencyRecord(userId, operation, key);

    if (existing) {
        if (existing.payloadHash !== payloadHash) {
            logger.warn('Idempotency conflict: clientRequestId reused with different payload', {
                userId,
                operation,
                clientRequestId: key
            });
            throw new ConflictError(
                'This clientRequestId was already used with a different payload'
            );
        }
        logger.info('Idempotent replay: returning cached result', {
            userId,
            operation,
            clientRequestId: key
        });
        return { replayed: true, result: existing.result };
    }

    const result = await execute();
    cropStore.saveIdempotencyRecord({
        userId,
        operation,
        clientRequestId: key,
        payloadHash,
        result
    });
    return { replayed: false, result };
}

module.exports = {
    runIdempotent,
    normalizeClientRequestId,
    hashPayload,
    CLIENT_ID_RE
};

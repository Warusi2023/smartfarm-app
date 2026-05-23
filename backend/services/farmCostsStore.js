/**
 * Postgres persistence for farmcosts (W2-01 / W2-06).
 */

const { ServiceUnavailableError, BadRequestError } = require('../utils/errors');

function formatLivestockTypeLabel(value) {
    const s = String(value || '').trim();
    if (!s) return null;
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
}

function formatGroupLabel(lifecycle, purpose) {
    const life = String(lifecycle || '')
        .trim()
        .replace(/_/g, ' ');
    if (life) {
        return life.replace(/\b\w/g, (c) => c.toUpperCase());
    }
    const p = String(purpose || '').trim();
    return p || null;
}

/**
 * @param {import('pg').Pool|null} pool
 * @param {object} row
 * @param {string} row.userId
 * @param {string|null} [row.farmId]
 * @param {string} row.type
 * @param {number|string} row.amount
 * @param {object|null} [row.links]
 * @returns {Promise<object>}
 */
async function insertFarmCost(pool, row) {
    if (!pool) {
        throw new ServiceUnavailableError('Database connection not available');
    }

    const userId = row.userId;
    const type = String(row.type || '').trim();
    const amount = Number(row.amount);

    if (!userId) {
        throw new BadRequestError('userId is required');
    }
    if (!type) {
        throw new BadRequestError('type is required');
    }
    if (!Number.isFinite(amount) || amount < 0) {
        throw new BadRequestError('amount must be a non-negative number');
    }

    const links = row.links && typeof row.links === 'object' ? row.links : {};

    const result = await pool.query(
        `INSERT INTO farmcosts (user_id, farm_id, type, amount, links)
         VALUES ($1, $2, $3, $4, $5::jsonb)
         RETURNING id, user_id, farm_id, type, amount, links, created_at, updated_at`,
        [userId, row.farmId || null, type, amount, JSON.stringify(links)]
    );

    return result.rows[0];
}

/**
 * Build links JSON and insert a feed-mix cost row.
 * @param {import('pg').Pool|null} pool
 * @param {object} params
 * @returns {Promise<object>}
 */
async function insertFeedMixFarmCost(pool, params) {
    const amount =
        params.amount != null
            ? Number(params.amount)
            : params.dailyCost != null
              ? Number(params.dailyCost)
              : NaN;

    if (!Number.isFinite(amount) || amount < 0) {
        throw new BadRequestError('amount must be a non-negative number');
    }

    const livestockType =
        params.livestockType ||
        formatLivestockTypeLabel(params.species) ||
        null;
    const group =
        params.group ||
        formatGroupLabel(params.lifecycle || params.growthStage, params.purpose) ||
        null;

    const links = {
        source: 'feed-mix',
        feedMixId: params.feedMixId != null ? String(params.feedMixId) : null,
        livestockType: livestockType,
        group: group
    };
    if (params.clientRequestId) {
        links.clientRequestId = String(params.clientRequestId).trim();
    }
    if (params.clientRequestPayloadHash) {
        links.clientRequestPayloadHash = String(params.clientRequestPayloadHash);
    }

    Object.keys(links).forEach((key) => {
        if (links[key] == null || links[key] === '') delete links[key];
    });

    return insertFarmCost(pool, {
        userId: params.userId,
        farmId: params.farmId || null,
        type: 'feed-mix',
        amount: amount,
        links: links
    });
}

/**
 * Record optional spend from a crop recommendation action log (W2-05).
 * @param {import('pg').Pool|null} pool
 * @param {object} params
 * @returns {Promise<object>}
 */
async function insertCropActionFarmCost(pool, params) {
    const amount =
        params.amount != null
            ? Number(params.amount)
            : params.costAmount != null
              ? Number(params.costAmount)
              : NaN;

    if (!Number.isFinite(amount) || amount < 0) {
        throw new BadRequestError('amount must be a non-negative number');
    }
    if (amount === 0) {
        throw new BadRequestError('amount must be greater than zero');
    }

    const links = {
        source: 'crop-action',
        cropActionId: params.cropActionId != null ? String(params.cropActionId) : null,
        cropId: params.cropId != null ? String(params.cropId) : null,
        actionType: params.actionType || null,
        description: params.description || params.costNote || null,
        fieldId: params.fieldId != null ? String(params.fieldId) : null,
        alertId: params.alertId != null ? String(params.alertId) : null
    };

    Object.keys(links).forEach((key) => {
        if (links[key] == null || links[key] === '') delete links[key];
    });

    return insertFarmCost(pool, {
        userId: params.userId,
        farmId: params.farmId || null,
        type: 'crop-action',
        amount: amount,
        links: links
    });
}

/**
 * Idempotent replay lookup (W3-03) — clientRequestId stored in links JSONB.
 */
async function findByClientRequestId(pool, userId, clientRequestId) {
    if (!pool || !userId || !clientRequestId) {
        return null;
    }
    const key = String(clientRequestId).trim();
    const result = await pool.query(
        `SELECT id, user_id, farm_id, type, amount, links, created_at, updated_at
         FROM farmcosts
         WHERE user_id = $1 AND links->>'clientRequestId' = $2
         LIMIT 1`,
        [userId, key]
    );
    if (!result.rows[0]) {
        return null;
    }
    const row = result.rows[0];
    const links =
        row.links && typeof row.links === 'object'
            ? row.links
            : typeof row.links === 'string'
              ? JSON.parse(row.links)
              : {};
    return {
        row: row,
        storedPayloadHash: links.clientRequestPayloadHash || null
    };
}

module.exports = {
    insertFarmCost,
    insertFeedMixFarmCost,
    insertCropActionFarmCost,
    findByClientRequestId
};

/**
 * Postgres persistence for farmrevenue (W2-08).
 */

const { ServiceUnavailableError, BadRequestError } = require('../utils/errors');

const MAX_DESCRIPTION_LENGTH = 500;

function parseDateOnly(value) {
    if (!value) return null;
    const s = String(value).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return null;
    return d.toISOString().slice(0, 10);
}

/**
 * @param {import('pg').Pool|null} pool
 * @param {object} row
 * @returns {Promise<object>}
 */
async function insertFarmRevenue(pool, row) {
    if (!pool) {
        throw new ServiceUnavailableError('Database connection not available');
    }

    const userId = row.userId;
    const amount = Number(row.amount);
    const entryDate = parseDateOnly(row.date);
    const type = String(row.type || 'manual').trim() || 'manual';
    let description = row.description != null ? String(row.description).trim() : '';
    if (description.length > MAX_DESCRIPTION_LENGTH) {
        throw new BadRequestError(`description must be at most ${MAX_DESCRIPTION_LENGTH} characters`);
    }

    if (!userId) throw new BadRequestError('userId is required');
    if (!entryDate) throw new BadRequestError('date must be YYYY-MM-DD');
    if (!Number.isFinite(amount) || amount < 0) {
        throw new BadRequestError('amount must be a non-negative number');
    }

    const links = row.links && typeof row.links === 'object' ? row.links : null;

    const result = await pool.query(
        `INSERT INTO farmrevenue (user_id, farm_id, type, amount, description, links, date)
         VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::date)
         RETURNING id, user_id, farm_id, type, amount, description, links, date, created_at, updated_at`,
        [
            userId,
            row.farmId || null,
            type,
            amount,
            description || null,
            links ? JSON.stringify(links) : null,
            entryDate
        ]
    );

    return result.rows[0];
}

module.exports = {
    insertFarmRevenue,
    parseDateOnly,
    MAX_DESCRIPTION_LENGTH
};

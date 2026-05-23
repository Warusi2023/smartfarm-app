/**
 * Postgres persistence for soiltests (W2-01 / W2-02).
 */

const { ServiceUnavailableError, BadRequestError } = require('../utils/errors');

const UUID_RE =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(value) {
    return typeof value === 'string' && UUID_RE.test(value.trim());
}

function parseOptionalUuid(value) {
    if (value == null || String(value).trim() === '') {
        return null;
    }
    const s = String(value).trim();
    return isUuid(s) ? s : null;
}

function parseDateOnly(value) {
    if (!value) return null;
    const s = String(value).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return null;
    return d.toISOString().slice(0, 10);
}

function numOrNull(value) {
    if (value === null || value === undefined || value === '') return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
}

/**
 * Build nutrients JSONB from API payload (flat fields).
 * @param {object} payload
 */
function buildNutrients(payload) {
    const nutrients = {};
    const keys = [
        'ph',
        'nitrogen',
        'phosphorus',
        'potassium',
        'calcium',
        'magnesium',
        'organicMatter',
        'moisture'
    ];
    keys.forEach((key) => {
        const v = numOrNull(payload[key]);
        if (v !== null) {
            nutrients[key] = v;
        } else if (payload[key] != null && payload[key] !== '') {
            nutrients[key] = payload[key];
        }
    });
    if (payload.cropId != null && !parseOptionalUuid(payload.cropId)) {
        nutrients.cropIdRef = String(payload.cropId);
    }
    if (payload.fieldId != null && !parseOptionalUuid(payload.fieldId)) {
        nutrients.fieldNameRef = String(payload.fieldId);
    }
    return nutrients;
}

/**
 * Map DB row to file-store-compatible test object for API responses.
 */
function rowToApiTest(row, payload) {
    const nutrients =
        row.nutrients && typeof row.nutrients === 'object'
            ? row.nutrients
            : typeof row.nutrients === 'string'
              ? JSON.parse(row.nutrients)
              : {};

    return {
        id: row.id,
        cropId: row.crop_id || nutrients.cropIdRef || (payload && payload.cropId) || null,
        fieldId: row.field_id || nutrients.fieldNameRef || (payload && payload.fieldId) || '',
        testDate: row.test_date,
        ph: nutrients.ph ?? null,
        nitrogen: nutrients.nitrogen ?? null,
        phosphorus: nutrients.phosphorus ?? null,
        potassium: nutrients.potassium ?? null,
        calcium: nutrients.calcium ?? null,
        magnesium: nutrients.magnesium ?? null,
        organicMatter: nutrients.organicMatter ?? null,
        moisture: nutrients.moisture ?? null,
        notes: row.notes || '',
        source: row.source || '',
        userId: row.user_id,
        createdAt: row.created_at,
        storage: 'postgres'
    };
}

/**
 * @param {import('pg').Pool|null} pool
 * @param {object} row
 * @param {string} row.userId
 * @param {string} row.cropId - required for API; may be non-UUID (stored in nutrients.cropIdRef)
 * @returns {Promise<object>} API-shaped test
 */
async function insertSoilTest(pool, row) {
    if (!pool) {
        throw new ServiceUnavailableError('Database connection not available');
    }

    const userId = row.userId;
    if (!userId || !isUuid(userId)) {
        throw new BadRequestError('A valid authenticated user is required to save soil tests to the database');
    }

    const testDate = parseDateOnly(row.testDate) || parseDateOnly(new Date().toISOString());
    if (!testDate) {
        throw new BadRequestError('testDate must be a valid date');
    }

    const nutrients = buildNutrients(row);
    const cropIdUuid = parseOptionalUuid(row.cropId);
    const fieldIdUuid = parseOptionalUuid(row.fieldId);
    const farmIdUuid = parseOptionalUuid(row.farmId || row.farm_id);

    const source =
        String(row.source || '').trim() ||
        (row.viaAiAdvisory ? 'ai-advisory' : 'crop-recommendation');

    const notes = row.notes != null ? String(row.notes).trim() : null;

    const result = await pool.query(
        `INSERT INTO soiltests (user_id, farm_id, crop_id, field_id, test_date, nutrients, notes, source)
         VALUES ($1, $2, $3, $4, $5::date, $6::jsonb, $7, $8)
         RETURNING id, user_id, farm_id, crop_id, field_id, test_date, nutrients, notes, source, created_at, updated_at`,
        [
            userId,
            farmIdUuid,
            cropIdUuid,
            fieldIdUuid,
            testDate,
            JSON.stringify(nutrients),
            notes || null,
            source
        ]
    );

    return rowToApiTest(result.rows[0], row);
}

/**
 * Latest soil test for a crop (W2-03).
 * Matches crop_id UUID or nutrients.cropIdRef for non-UUID crop ids.
 */
async function getLatestSoilTestForCrop(pool, cropId, userId) {
    if (!pool) {
        throw new ServiceUnavailableError('Database connection not available');
    }
    if (!userId || !isUuid(userId)) {
        throw new BadRequestError('A valid authenticated user is required');
    }
    const cropKey = String(cropId).trim();
    if (!cropKey) {
        throw new BadRequestError('cropId is required');
    }

    const result = await pool.query(
        `SELECT id, user_id, farm_id, crop_id, field_id, test_date, nutrients, notes, source, created_at, updated_at
         FROM soiltests
         WHERE user_id = $1
           AND (
             crop_id::text = $2
             OR nutrients->>'cropIdRef' = $2
           )
         ORDER BY test_date DESC, created_at DESC
         LIMIT 1`,
        [userId, cropKey]
    );

    if (!result.rows[0]) {
        return null;
    }
    return rowToApiTest(result.rows[0], { cropId: cropKey });
}

module.exports = {
    insertSoilTest,
    getLatestSoilTestForCrop,
    buildNutrients,
    rowToApiTest,
    isUuid,
    parseOptionalUuid,
    parseDateOnly
};

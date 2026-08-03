/**
 * Postgres persistence for crops API (/api/crops).
 * Maps between client camelCase DTOs and the crops table.
 */

const { ServiceUnavailableError, BadRequestError, NotFoundError } = require('../utils/errors');

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

function dateToApi(value) {
    if (!value) return null;
    if (value instanceof Date) {
        if (Number.isNaN(value.getTime())) return null;
        return value.toISOString().slice(0, 10);
    }
    const s = String(value).trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

function numOrNull(value) {
    if (value === null || value === undefined || value === '') return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
}

function requirePool(pool) {
    if (!pool) {
        throw new ServiceUnavailableError('Database connection not available');
    }
}

/**
 * Map a crops row to the camelCase envelope shape used by Android + web.
 */
function rowToApi(row) {
    if (!row) return null;
    const plantedDate = dateToApi(row.planting_date);
    const expectedHarvestDate = dateToApi(row.expected_harvest_date);
    const notes = row.notes != null && String(row.notes).trim() !== '' ? String(row.notes) : null;
    const location =
        row.location != null && String(row.location).trim() !== ''
            ? String(row.location).trim()
            : null;
    const type =
        (row.category && String(row.category).trim() && String(row.category).trim() !== 'general'
            ? String(row.category).trim()
            : null) ||
        (row.variety && String(row.variety).trim()) ||
        null;

    return {
        id: String(row.id),
        name: row.name,
        variety: row.variety || null,
        type: type,
        farmId: row.farm_id ? String(row.farm_id) : null,
        plantedDate,
        plantingDate: plantedDate,
        expectedHarvestDate,
        harvestDate: expectedHarvestDate,
        area: row.area_planted != null ? Number(row.area_planted) : null,
        status: row.status || 'planted',
        notes,
        description: notes,
        field: location,
        location,
        createdAt: row.created_at ? new Date(row.created_at).toISOString() : null,
        updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : null
    };
}

async function resolveFarmId(pool, farmId) {
    const id = parseOptionalUuid(farmId);
    if (!id) return null;
    const result = await pool.query('SELECT id FROM farms WHERE id = $1 LIMIT 1', [id]);
    return result.rows[0] ? result.rows[0].id : null;
}

function normalizeCreatePayload(payload = {}) {
    const name = String(payload.name || payload.cropName || '').trim();
    if (!name) {
        throw new BadRequestError('name is required');
    }

    const variety =
        payload.variety != null && String(payload.variety).trim() !== ''
            ? String(payload.variety).trim()
            : null;
    const typeRaw =
        payload.type != null && String(payload.type).trim() !== ''
            ? String(payload.type).trim()
            : null;
    const category = typeRaw || variety || 'general';

    const plantedDate =
        parseDateOnly(payload.plantedDate || payload.plantingDate) ||
        new Date().toISOString().slice(0, 10);
    const expectedHarvestDate = parseDateOnly(
        payload.expectedHarvestDate || payload.harvestDate
    );

    const area = numOrNull(payload.area);
    const areaPlanted = area != null && area > 0 ? area : 0.01;

    const status =
        payload.status != null && String(payload.status).trim() !== ''
            ? String(payload.status).trim().toLowerCase()
            : 'planted';

    const notesRaw = payload.notes || payload.description || null;
    const notes =
        notesRaw != null && String(notesRaw).trim() !== '' ? String(notesRaw).trim() : null;

    const locationRaw = payload.field || payload.location || null;
    const location =
        locationRaw != null && String(locationRaw).trim() !== ''
            ? String(locationRaw).trim()
            : null;

    return {
        name,
        variety,
        category,
        cropType: typeRaw,
        plantedDate,
        expectedHarvestDate,
        areaPlanted,
        status,
        notes,
        location,
        farmIdRaw: payload.farmId
    };
}

async function listCrops(pool, { userId, farmId = null, page = 1, limit = 100 } = {}) {
    requirePool(pool);
    if (!userId || !isUuid(String(userId))) {
        throw new BadRequestError('Authenticated user is required');
    }

    const farmFilter = parseOptionalUuid(farmId);
    const safeLimit = Math.min(Math.max(Number(limit) || 100, 1), 200);
    const safePage = Math.max(Number(page) || 1, 1);
    const offset = (safePage - 1) * safeLimit;

    const result = await pool.query(
        `SELECT *
         FROM crops
         WHERE user_id = $1
           AND ($2::uuid IS NULL OR farm_id = $2)
         ORDER BY created_at DESC NULLS LAST, name ASC
         LIMIT $3 OFFSET $4`,
        [userId, farmFilter, safeLimit, offset]
    );

    return result.rows.map(rowToApi);
}

async function getCropById(pool, { userId, cropId }) {
    requirePool(pool);
    if (!userId || !isUuid(String(userId))) {
        throw new BadRequestError('Authenticated user is required');
    }
    if (!cropId || String(cropId).trim() === '') {
        throw new BadRequestError('crop id is required');
    }

    const result = await pool.query(
        `SELECT *
         FROM crops
         WHERE id::text = $1 AND user_id = $2
         LIMIT 1`,
        [String(cropId).trim(), userId]
    );

    if (!result.rows[0]) {
        throw new NotFoundError('Crop not found');
    }
    return rowToApi(result.rows[0]);
}

async function createCrop(pool, { userId, payload }) {
    requirePool(pool);
    if (!userId || !isUuid(String(userId))) {
        throw new BadRequestError('Authenticated user is required');
    }

    const normalized = normalizeCreatePayload(payload);
    const farmId = await resolveFarmId(pool, normalized.farmIdRaw);

    const result = await pool.query(
        `INSERT INTO crops (
            farm_id, user_id, name, variety, category,
            planting_date, expected_harvest_date, status, area_planted,
            notes, location
         ) VALUES (
            $1, $2, $3, $4, $5,
            $6::date, $7::date, $8, $9,
            $10, $11
         )
         RETURNING *`,
        [
            farmId,
            userId,
            normalized.name,
            normalized.variety,
            normalized.category,
            normalized.plantedDate,
            normalized.expectedHarvestDate,
            normalized.status,
            normalized.areaPlanted,
            normalized.notes,
            normalized.location
        ]
    );

    return rowToApi(result.rows[0]);
}

async function updateCrop(pool, { userId, cropId, payload }) {
    requirePool(pool);
    if (!userId || !isUuid(String(userId))) {
        throw new BadRequestError('Authenticated user is required');
    }
    if (!cropId || String(cropId).trim() === '') {
        throw new BadRequestError('crop id is required');
    }

    const existing = await pool.query(
        `SELECT id, farm_id, name, variety, category, planting_date, expected_harvest_date,
                status, area_planted, notes, location
         FROM crops
         WHERE id::text = $1 AND user_id = $2
         LIMIT 1`,
        [String(cropId).trim(), userId]
    );
    if (!existing.rows[0]) {
        throw new NotFoundError('Crop not found');
    }
    const row = existing.rows[0];
    const body = payload || {};

    const name =
        body.name != null && String(body.name).trim() !== ''
            ? String(body.name).trim()
            : row.name;
    const variety =
        body.variety !== undefined
            ? body.variety == null || String(body.variety).trim() === ''
                ? null
                : String(body.variety).trim()
            : row.variety;
    const typeRaw =
        body.type != null && String(body.type).trim() !== ''
            ? String(body.type).trim()
            : null;
    const category = typeRaw || (body.category != null ? String(body.category).trim() : null) || row.category || 'general';

    const plantedDate =
        parseDateOnly(body.plantedDate || body.plantingDate) || dateToApi(row.planting_date);
    const expectedHarvestDate =
        body.expectedHarvestDate !== undefined || body.harvestDate !== undefined
            ? parseDateOnly(body.expectedHarvestDate || body.harvestDate)
            : dateToApi(row.expected_harvest_date);

    const area = body.area !== undefined ? numOrNull(body.area) : Number(row.area_planted);
    const areaPlanted = area != null && area > 0 ? area : Number(row.area_planted) || 0.01;

    const status =
        body.status != null && String(body.status).trim() !== ''
            ? String(body.status).trim().toLowerCase()
            : row.status || 'planted';

    const notes =
        body.notes !== undefined || body.description !== undefined
            ? body.notes || body.description || null
            : row.notes;

    const location =
        body.field !== undefined || body.location !== undefined
            ? body.field || body.location || null
            : row.location;

    const farmId =
        body.farmId !== undefined ? await resolveFarmId(pool, body.farmId) : row.farm_id;

    const result = await pool.query(
        `UPDATE crops SET
            farm_id = $1,
            name = $2,
            variety = $3,
            category = $4,
            planting_date = $5::date,
            expected_harvest_date = $6::date,
            status = $7,
            area_planted = $8,
            notes = $9,
            location = $10,
            updated_at = CURRENT_TIMESTAMP
         WHERE id::text = $11 AND user_id = $12
         RETURNING *`,
        [
            farmId,
            name,
            variety,
            category,
            plantedDate,
            expectedHarvestDate,
            status,
            areaPlanted,
            notes,
            location,
            String(cropId).trim(),
            userId
        ]
    );

    return rowToApi(result.rows[0]);
}

async function deleteCrop(pool, { userId, cropId }) {
    requirePool(pool);
    if (!userId || !isUuid(String(userId))) {
        throw new BadRequestError('Authenticated user is required');
    }
    if (!cropId || String(cropId).trim() === '') {
        throw new BadRequestError('crop id is required');
    }

    const result = await pool.query(
        `DELETE FROM crops
         WHERE id::text = $1 AND user_id = $2
         RETURNING id`,
        [String(cropId).trim(), userId]
    );
    if (!result.rows[0]) {
        throw new NotFoundError('Crop not found');
    }
    return { id: String(result.rows[0].id) };
}

async function getCropStats(pool, { userId }) {
    requirePool(pool);
    if (!userId || !isUuid(String(userId))) {
        throw new BadRequestError('Authenticated user is required');
    }

    const result = await pool.query(
        `SELECT
            COUNT(*)::int AS total,
            COUNT(*) FILTER (
                WHERE COALESCE(status, '') NOT IN ('failed', 'FAILED', 'completed')
            )::int AS healthy,
            COUNT(*) FILTER (
                WHERE LOWER(COALESCE(status, '')) IN (
                    'ready_for_harvest', 'harvest_ready', 'harvesting'
                )
            )::int AS harvest_ready
         FROM crops
         WHERE user_id = $1`,
        [userId]
    );
    const row = result.rows[0] || {};
    return {
        totalCrops: row.total || 0,
        healthyCrops: row.healthy || 0,
        harvestReady: row.harvest_ready || 0
    };
}

module.exports = {
    rowToApi,
    normalizeCreatePayload,
    listCrops,
    getCropById,
    createCrop,
    updateCrop,
    deleteCrop,
    getCropStats,
    // exported for unit tests
    parseDateOnly,
    parseOptionalUuid,
    isUuid
};

/**
 * Postgres persistence for livestock API (/api/livestock).
 * Maps between client DTO aliases (web + Android) and the livestock table.
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

function textOrNull(value) {
    if (value == null) return null;
    const s = String(value).trim();
    return s === '' ? null : s;
}

function requirePool(pool) {
    if (!pool) {
        throw new ServiceUnavailableError('Database connection not available');
    }
}

/** Derive age in years from a birth date, for clients that only read `age`. */
function ageFromBirthDate(birthDate) {
    const iso = dateToApi(birthDate);
    if (!iso) return null;
    const birth = new Date(iso);
    const now = new Date();
    const years = Math.floor((now - birth) / (1000 * 60 * 60 * 24 * 365.25));
    return years >= 0 ? years : null;
}

/**
 * Map a livestock row to the envelope shape used by Android + web.
 * Emits both alias spellings so neither client drops records.
 */
function rowToApi(row) {
    if (!row) return null;
    const birthDate = dateToApi(row.birth_date);
    const notes = textOrNull(row.notes);
    const species = row.species || null;
    const tag = textOrNull(row.tag_number);
    const healthStatus = row.health_status || 'healthy';
    const location = textOrNull(row.location);

    return {
        id: String(row.id),
        name: row.name || tag || species || '',
        species,
        type: species,
        breed: row.breed || null,
        tag,
        tagNumber: tag,
        sex: row.gender || null,
        gender: row.gender || null,
        birthDate,
        age: ageFromBirthDate(row.birth_date),
        weight: row.weight != null ? Number(row.weight) : null,
        healthStatus,
        status: healthStatus,
        location,
        field: location,
        value: row.value != null ? Number(row.value) : null,
        productionPurpose: textOrNull(row.production_purpose),
        purpose: textOrNull(row.production_purpose),
        lifecycleStage: textOrNull(row.lifecycle_stage),
        lifecycle: textOrNull(row.lifecycle_stage),
        breedingStatus: textOrNull(row.breeding_status),
        sireTag: textOrNull(row.sire_tag),
        damTag: textOrNull(row.dam_tag),
        firstCalvingDate: dateToApi(row.first_calving_date),
        lastCalvingDate: dateToApi(row.last_calving_date),
        photo: row.photo || null,
        photoUrl: row.photo || null,
        notes,
        description: notes,
        healthNotes: notes,
        farmId: row.farm_id ? String(row.farm_id) : null,
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

/** Birth date may arrive directly or only as an age in years. */
function resolveBirthDate(payload = {}) {
    const explicit = parseDateOnly(payload.birthDate || payload.birth_date);
    if (explicit) return explicit;
    const age = numOrNull(payload.age);
    if (age == null || age < 0) return null;
    const d = new Date();
    d.setFullYear(d.getFullYear() - Math.floor(age));
    return d.toISOString().slice(0, 10);
}

function normalizeCreatePayload(payload = {}) {
    const species = textOrNull(payload.species || payload.type);
    if (!species) {
        throw new BadRequestError('type (species) is required');
    }

    const tag = textOrNull(payload.tag || payload.tagNumber || payload.tag_number);
    const name = textOrNull(payload.name) || tag || species;
    const notes = textOrNull(payload.notes || payload.description || payload.healthNotes);

    return {
        species: species.toLowerCase(),
        name,
        breed: textOrNull(payload.breed),
        tag,
        gender: (textOrNull(payload.sex || payload.gender) || '').toLowerCase() || null,
        birthDate: resolveBirthDate(payload),
        weight: numOrNull(payload.weight),
        healthStatus:
            (textOrNull(payload.healthStatus || payload.health_status || payload.status) ||
                'healthy').toLowerCase(),
        location: textOrNull(payload.location || payload.field),
        value: numOrNull(payload.value),
        productionPurpose: textOrNull(payload.productionPurpose || payload.purpose),
        lifecycleStage: textOrNull(payload.lifecycleStage || payload.lifecycle),
        breedingStatus: textOrNull(payload.breedingStatus),
        sireTag: textOrNull(payload.sireTag),
        damTag: textOrNull(payload.damTag),
        firstCalvingDate: parseDateOnly(payload.firstCalvingDate),
        lastCalvingDate: parseDateOnly(payload.lastCalvingDate),
        photo: payload.photo || payload.photoUrl || payload.photo_url || null,
        notes,
        farmIdRaw: payload.farmId
    };
}

async function listLivestock(pool, { userId, farmId = null, page = 1, limit = 100 } = {}) {
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
         FROM livestock
         WHERE user_id = $1
           AND ($2::uuid IS NULL OR farm_id = $2)
         ORDER BY created_at DESC NULLS LAST, tag_number ASC
         LIMIT $3 OFFSET $4`,
        [userId, farmFilter, safeLimit, offset]
    );

    return result.rows.map(rowToApi);
}

async function getLivestockById(pool, { userId, livestockId }) {
    requirePool(pool);
    if (!userId || !isUuid(String(userId))) {
        throw new BadRequestError('Authenticated user is required');
    }
    if (!livestockId || String(livestockId).trim() === '') {
        throw new BadRequestError('livestock id is required');
    }

    const result = await pool.query(
        `SELECT * FROM livestock WHERE id::text = $1 AND user_id = $2 LIMIT 1`,
        [String(livestockId).trim(), userId]
    );

    if (!result.rows[0]) {
        throw new NotFoundError('Livestock not found');
    }
    return rowToApi(result.rows[0]);
}

async function createLivestock(pool, { userId, payload }) {
    requirePool(pool);
    if (!userId || !isUuid(String(userId))) {
        throw new BadRequestError('Authenticated user is required');
    }

    const n = normalizeCreatePayload(payload);
    const farmId = await resolveFarmId(pool, n.farmIdRaw);

    const result = await pool.query(
        `INSERT INTO livestock (
            farm_id, user_id, species, name, breed, tag_number, gender,
            birth_date, weight, health_status, location, value,
            production_purpose, lifecycle_stage, breeding_status,
            sire_tag, dam_tag, first_calving_date, last_calving_date,
            photo, notes
         ) VALUES (
            $1, $2, $3, $4, $5, $6, $7,
            $8::date, $9, $10, $11, $12,
            $13, $14, $15,
            $16, $17, $18::date, $19::date,
            $20, $21
         )
         RETURNING *`,
        [
            farmId,
            userId,
            n.species,
            n.name,
            n.breed,
            n.tag,
            n.gender,
            n.birthDate,
            n.weight,
            n.healthStatus,
            n.location,
            n.value,
            n.productionPurpose,
            n.lifecycleStage,
            n.breedingStatus,
            n.sireTag,
            n.damTag,
            n.firstCalvingDate,
            n.lastCalvingDate,
            n.photo,
            n.notes
        ]
    );

    return rowToApi(result.rows[0]);
}

async function updateLivestock(pool, { userId, livestockId, payload }) {
    requirePool(pool);
    if (!userId || !isUuid(String(userId))) {
        throw new BadRequestError('Authenticated user is required');
    }
    if (!livestockId || String(livestockId).trim() === '') {
        throw new BadRequestError('livestock id is required');
    }

    const existing = await pool.query(
        `SELECT * FROM livestock WHERE id::text = $1 AND user_id = $2 LIMIT 1`,
        [String(livestockId).trim(), userId]
    );
    if (!existing.rows[0]) {
        throw new NotFoundError('Livestock not found');
    }
    const row = existing.rows[0];
    const body = payload || {};

    /** Keep the stored value unless the client explicitly sent a replacement. */
    function pick(keys, current, transform = textOrNull) {
        const provided = keys.find((k) => body[k] !== undefined);
        if (provided === undefined) return current;
        return transform(body[provided]);
    }

    const species = pick(['species', 'type'], row.species, (v) => {
        const s = textOrNull(v);
        return s ? s.toLowerCase() : row.species;
    });
    const tag = pick(['tag', 'tagNumber', 'tag_number'], row.tag_number);
    const name = pick(['name'], row.name) || tag || species;
    const gender = pick(['sex', 'gender'], row.gender, (v) => {
        const s = textOrNull(v);
        return s ? s.toLowerCase() : null;
    });

    let birthDate = dateToApi(row.birth_date);
    if (body.birthDate !== undefined || body.birth_date !== undefined || body.age !== undefined) {
        birthDate = resolveBirthDate(body) || birthDate;
    }

    const healthStatus = pick(
        ['healthStatus', 'health_status', 'status'],
        row.health_status,
        (v) => {
            const s = textOrNull(v);
            return s ? s.toLowerCase() : row.health_status;
        }
    );

    const result = await pool.query(
        `UPDATE livestock SET
            farm_id = $1,
            species = $2,
            name = $3,
            breed = $4,
            tag_number = $5,
            gender = $6,
            birth_date = $7::date,
            weight = $8,
            health_status = $9,
            location = $10,
            value = $11,
            production_purpose = $12,
            lifecycle_stage = $13,
            breeding_status = $14,
            sire_tag = $15,
            dam_tag = $16,
            first_calving_date = $17::date,
            last_calving_date = $18::date,
            photo = $19,
            notes = $20,
            updated_at = CURRENT_TIMESTAMP
         WHERE id::text = $21 AND user_id = $22
         RETURNING *`,
        [
            body.farmId !== undefined ? await resolveFarmId(pool, body.farmId) : row.farm_id,
            species,
            name,
            pick(['breed'], row.breed),
            tag,
            gender,
            birthDate,
            pick(['weight'], row.weight != null ? Number(row.weight) : null, numOrNull),
            healthStatus,
            pick(['location', 'field'], row.location),
            pick(['value'], row.value != null ? Number(row.value) : null, numOrNull),
            pick(['productionPurpose', 'purpose'], row.production_purpose),
            pick(['lifecycleStage', 'lifecycle'], row.lifecycle_stage),
            pick(['breedingStatus'], row.breeding_status),
            pick(['sireTag'], row.sire_tag),
            pick(['damTag'], row.dam_tag),
            pick(['firstCalvingDate'], dateToApi(row.first_calving_date), parseDateOnly),
            pick(['lastCalvingDate'], dateToApi(row.last_calving_date), parseDateOnly),
            body.photo !== undefined || body.photoUrl !== undefined || body.photo_url !== undefined
                ? body.photo || body.photoUrl || body.photo_url || null
                : row.photo,
            pick(['notes', 'description', 'healthNotes'], row.notes),
            String(livestockId).trim(),
            userId
        ]
    );

    return rowToApi(result.rows[0]);
}

async function deleteLivestock(pool, { userId, livestockId }) {
    requirePool(pool);
    if (!userId || !isUuid(String(userId))) {
        throw new BadRequestError('Authenticated user is required');
    }
    if (!livestockId || String(livestockId).trim() === '') {
        throw new BadRequestError('livestock id is required');
    }

    const result = await pool.query(
        `DELETE FROM livestock WHERE id::text = $1 AND user_id = $2 RETURNING id`,
        [String(livestockId).trim(), userId]
    );
    if (!result.rows[0]) {
        throw new NotFoundError('Livestock not found');
    }
    return { id: String(result.rows[0].id) };
}

async function getLivestockStats(pool, { userId }) {
    requirePool(pool);
    if (!userId || !isUuid(String(userId))) {
        throw new BadRequestError('Authenticated user is required');
    }

    const result = await pool.query(
        `SELECT
            COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE LOWER(COALESCE(health_status, '')) = 'healthy')::int AS healthy,
            COALESCE(SUM(value), 0)::float AS total_value
         FROM livestock
         WHERE user_id = $1`,
        [userId]
    );
    const row = result.rows[0] || {};
    return {
        totalAnimals: row.total || 0,
        healthyAnimals: row.healthy || 0,
        totalValue: row.total_value || 0
    };
}

module.exports = {
    rowToApi,
    normalizeCreatePayload,
    listLivestock,
    getLivestockById,
    createLivestock,
    updateLivestock,
    deleteLivestock,
    getLivestockStats,
    // exported for unit tests
    parseDateOnly,
    parseOptionalUuid,
    resolveBirthDate,
    isUuid
};

/**
 * Aquaculture units and daily logs (Phase 1).
 */

const aquacultureAlertService = require('./aquacultureAlertService');

function todayUtcDate() {
    return new Date().toISOString().slice(0, 10);
}

function mapUnitRow(row) {
    if (!row) {
        return null;
    }
    return {
        id: row.id,
        farmId: row.farm_id,
        userId: row.user_id,
        name: row.name,
        unitType: row.unit_type,
        species: row.species,
        speciesOther: row.species_other,
        capacityNotes: row.capacity_notes,
        isActive: row.is_active !== false,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

function mapLogRow(row) {
    if (!row) {
        return null;
    }
    return {
        id: row.id,
        unitId: row.unit_id,
        userId: row.user_id,
        logDate: row.log_date instanceof Date
            ? row.log_date.toISOString().slice(0, 10)
            : String(row.log_date).slice(0, 10),
        feedAmountKg: row.feed_amount_kg != null ? Number(row.feed_amount_kg) : null,
        mortalityCount: row.mortality_count != null ? Number(row.mortality_count) : 0,
        estimatedStockCount: row.estimated_stock_count != null ? Number(row.estimated_stock_count) : null,
        averageWeightG: row.average_weight_g != null ? Number(row.average_weight_g) : null,
        waterTempC: row.water_temp_c != null ? Number(row.water_temp_c) : null,
        ph: row.ph != null ? Number(row.ph) : null,
        dissolvedOxygenMgl: row.dissolved_oxygen_mgl != null ? Number(row.dissolved_oxygen_mgl) : null,
        notes: row.notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

class AquacultureService {
    constructor(dbPool) {
        this.dbPool = dbPool;
    }

    async assertFarmOwnership(userId, farmId) {
        const result = await this.dbPool.query(
            'SELECT id FROM farms WHERE id = $1 AND user_id = $2',
            [farmId, userId]
        );
        if (!result.rows[0]) {
            const err = new Error('Farm not found or access denied');
            err.code = 'FARM_NOT_FOUND';
            err.statusCode = 404;
            throw err;
        }
    }

    async getUnitForUser(userId, unitId) {
        const result = await this.dbPool.query(
            'SELECT * FROM aquaculture_units WHERE id = $1 AND user_id = $2',
            [unitId, userId]
        );
        if (!result.rows[0]) {
            const err = new Error('Aquaculture unit not found');
            err.code = 'UNIT_NOT_FOUND';
            err.statusCode = 404;
            throw err;
        }
        return mapUnitRow(result.rows[0]);
    }

    async getTodayLog(unitId) {
        const today = todayUtcDate();
        const result = await this.dbPool.query(
            'SELECT * FROM aquaculture_daily_logs WHERE unit_id = $1 AND log_date = $2',
            [unitId, today]
        );
        return result.rows[0] ? mapLogRow(result.rows[0]) : null;
    }

    buildStatus(unit, todayLog) {
        const hasLogToday = !!todayLog;
        return aquacultureAlertService.evaluateAlerts({
            log: todayLog,
            species: unit.species,
            hasLogToday
        });
    }

    async listUnits(userId, farmId) {
        await this.assertFarmOwnership(userId, farmId);
        const result = await this.dbPool.query(
            `SELECT * FROM aquaculture_units
             WHERE farm_id = $1 AND user_id = $2 AND is_active = TRUE
             ORDER BY name ASC`,
            [farmId, userId]
        );
        const units = [];
        for (const row of result.rows) {
            const unit = mapUnitRow(row);
            const todayLog = await this.getTodayLog(unit.id);
            const status = this.buildStatus(unit, todayLog);
            units.push({
                ...unit,
                todayLog,
                alerts: status.alerts,
                overallStatus: status.overallStatus
            });
        }
        return units;
    }

    async createUnit(userId, data) {
        await this.assertFarmOwnership(userId, data.farmId);
        const result = await this.dbPool.query(
            `INSERT INTO aquaculture_units (
                farm_id, user_id, name, unit_type, species, species_other, capacity_notes
             ) VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [
                data.farmId,
                userId,
                data.name,
                data.unitType,
                data.species,
                data.speciesOther || null,
                data.capacityNotes || null
            ]
        );
        const unit = mapUnitRow(result.rows[0]);
        const status = this.buildStatus(unit, null);
        return { ...unit, todayLog: null, alerts: status.alerts, overallStatus: status.overallStatus };
    }

    async getUnitDetail(userId, unitId) {
        const unit = await this.getUnitForUser(userId, unitId);
        const todayLog = await this.getTodayLog(unitId);
        const status = this.buildStatus(unit, todayLog);
        return {
            ...unit,
            todayLog,
            alerts: status.alerts,
            overallStatus: status.overallStatus
        };
    }

    async updateUnit(userId, unitId, updates) {
        await this.getUnitForUser(userId, unitId);
        const fields = [];
        const values = [unitId, userId];
        let idx = 3;

        if (updates.name !== undefined) {
            fields.push(`name = $${idx++}`);
            values.push(updates.name);
        }
        if (updates.capacityNotes !== undefined) {
            fields.push(`capacity_notes = $${idx++}`);
            values.push(updates.capacityNotes);
        }
        if (updates.isActive !== undefined) {
            fields.push(`is_active = $${idx++}`);
            values.push(!!updates.isActive);
        }

        if (fields.length === 0) {
            return this.getUnitDetail(userId, unitId);
        }

        fields.push('updated_at = NOW()');
        const result = await this.dbPool.query(
            `UPDATE aquaculture_units SET ${fields.join(', ')}
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            values
        );
        const unit = mapUnitRow(result.rows[0]);
        const todayLog = await this.getTodayLog(unitId);
        const status = this.buildStatus(unit, todayLog);
        return {
            ...unit,
            todayLog,
            alerts: status.alerts,
            overallStatus: status.overallStatus
        };
    }

    async listLogs(userId, unitId, fromDate, toDate) {
        await this.getUnitForUser(userId, unitId);
        const result = await this.dbPool.query(
            `SELECT * FROM aquaculture_daily_logs
             WHERE unit_id = $1 AND log_date >= $2 AND log_date <= $3
             ORDER BY log_date DESC`,
            [unitId, fromDate, toDate]
        );
        return result.rows.map(mapLogRow);
    }

    async upsertDailyLog(userId, unitId, data) {
        const unit = await this.getUnitForUser(userId, unitId);
        const logDate = data.logDate || todayUtcDate();

        const result = await this.dbPool.query(
            `INSERT INTO aquaculture_daily_logs (
                unit_id, user_id, log_date,
                feed_amount_kg, mortality_count, estimated_stock_count,
                average_weight_g, water_temp_c, ph, dissolved_oxygen_mgl, notes
             ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             ON CONFLICT (unit_id, log_date) DO UPDATE SET
                feed_amount_kg = EXCLUDED.feed_amount_kg,
                mortality_count = EXCLUDED.mortality_count,
                estimated_stock_count = EXCLUDED.estimated_stock_count,
                average_weight_g = EXCLUDED.average_weight_g,
                water_temp_c = EXCLUDED.water_temp_c,
                ph = EXCLUDED.ph,
                dissolved_oxygen_mgl = EXCLUDED.dissolved_oxygen_mgl,
                notes = EXCLUDED.notes,
                updated_at = NOW()
             RETURNING *`,
            [
                unitId,
                userId,
                logDate,
                data.feedAmountKg != null ? data.feedAmountKg : null,
                data.mortalityCount != null ? data.mortalityCount : 0,
                data.estimatedStockCount != null ? data.estimatedStockCount : null,
                data.averageWeightG != null ? data.averageWeightG : null,
                data.waterTempC != null ? data.waterTempC : null,
                data.ph != null ? data.ph : null,
                data.dissolvedOxygenMgl != null ? data.dissolvedOxygenMgl : null,
                data.notes || null
            ]
        );

        const log = mapLogRow(result.rows[0]);
        const isToday = logDate === todayUtcDate();
        const status = this.buildStatus(unit, isToday ? log : await this.getTodayLog(unitId));
        return {
            log,
            unitId,
            alerts: status.alerts,
            overallStatus: status.overallStatus
        };
    }

    async getFarmStatus(userId, farmId) {
        const units = await this.listUnits(userId, farmId);
        let overall = 'ok';
        for (const u of units) {
            const rank = aquacultureAlertService.SEVERITY_RANK[u.overallStatus] || 0;
            const cur = aquacultureAlertService.SEVERITY_RANK[overall] || 0;
            if (rank > cur) {
                overall = u.overallStatus;
            }
        }
        return {
            farmId,
            unitCount: units.length,
            overallStatus: overall,
            units
        };
    }
}

module.exports = AquacultureService;

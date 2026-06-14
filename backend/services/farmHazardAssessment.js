/**
 * Farm Hazard & Early Warning — impact-based assessment for command center.
 */

const farmWeatherRisk = require('./farmWeatherRisk');
const weatherHazardRules = require('../lib/weatherHazardRules');
const farmMitigationActions = require('../lib/farmMitigationActions');
const aquacultureHazardAdaptation = require('../lib/aquacultureHazardAdaptation');
const TH = require('../config/hazardThresholds');
const logger = require('../utils/logger');

/**
 * @param {import('pg').Pool|null} pool
 * @param {string} userId
 */
async function fetchFarmContext(pool, userId, hasLivestockSignal) {
    const ctx = {
        farmType: 'mixed',
        hasCrops: true,
        hasLivestock: !!hasLivestockSignal,
        hasAquaculture: false,
        aquacultureUnitCount: 0
    };
    if (!pool) {
        return aquacultureHazardAdaptation.normalizeFarmContext(ctx);
    }
    try {
        const farmRes = await pool.query(
            `SELECT farm_type FROM farms
             WHERE user_id = $1 AND is_active = TRUE
             ORDER BY updated_at DESC NULLS LAST LIMIT 1`,
            [userId]
        );
        if (farmRes.rows[0]) {
            const ft = String(farmRes.rows[0].farm_type || 'mixed').toLowerCase();
            ctx.farmType = ft;
            if (ft === 'crops') {
                ctx.hasCrops = true;
                ctx.hasLivestock = false;
            } else if (ft === 'livestock' || ft === 'dairy') {
                ctx.hasLivestock = true;
                ctx.hasCrops = false;
            } else if (ft === 'aquaculture') {
                ctx.hasAquaculture = true;
                ctx.hasCrops = false;
                ctx.hasLivestock = false;
            }
        }
        if (!ctx.hasLivestock) {
            ctx.hasLivestock = !!hasLivestockSignal;
        }
        const cropRes = await pool.query(
            `SELECT 1 FROM crops WHERE user_id = $1 LIMIT 1`,
            [userId]
        ).catch(() => ({ rows: [] }));
        if (cropRes.rows.length) {
            ctx.hasCrops = true;
        }
        const aqRes = await pool.query(
            `SELECT COUNT(*)::int AS count FROM aquaculture_units
             WHERE user_id = $1 AND is_active = TRUE`,
            [userId]
        ).catch(() => ({ rows: [{ count: 0 }] }));
        const aqCount = aqRes.rows[0] && aqRes.rows[0].count != null ? Number(aqRes.rows[0].count) : 0;
        if (aqCount > 0) {
            ctx.hasAquaculture = true;
            ctx.aquacultureUnitCount = aqCount;
        }
    } catch (err) {
        logger.warn('farmHazardAssessment: farm context lookup failed', { userId, err: err.message });
    }
    return aquacultureHazardAdaptation.normalizeFarmContext(ctx);
}

/**
 * @param {object|null} snapshot
 * @param {object} farmContext
 * @param {object|null} weatherRisk existing W5-03 block
 */
function buildHazardAssessmentFromSnapshot(snapshot, farmContext, weatherRisk) {
    const ctx = aquacultureHazardAdaptation.normalizeFarmContext(farmContext);

    if (!snapshot || !snapshot.available) {
        const reason =
            (weatherRisk && weatherRisk.recommendation) ||
            'Weather forecast unavailable — add farm coordinates and ensure weather is configured.';
        return unavailableAssessment(reason, weatherRisk, ctx);
    }

    const rawHazards = weatherHazardRules.evaluateWeatherHazards(snapshot, ctx);
    const adapted = aquacultureHazardAdaptation.adaptHazardsForAquaculture(rawHazards, ctx);
    const hazards = adapted.map((h) => {
        const actions = farmMitigationActions.getActionsForHazard(h.type, ctx);
        return { ...h, actions };
    });

    const overallSeverity = hazards.length
        ? weatherHazardRules.maxSeverity(hazards)
        : 'none';

    const weatherState = weatherRisk && weatherRisk.state ? weatherRisk.state : 'calm';

    const topActions = collectTopActions(hazards, overallSeverity, ctx);

    return {
        generatedAt: new Date().toISOString(),
        weatherState,
        overallSeverity,
        hazards,
        topActions,
        farmContext: {
            farmType: ctx.farmType,
            hasCrops: ctx.hasCrops,
            hasLivestock: ctx.hasLivestock,
            hasAquaculture: ctx.hasAquaculture,
            aquacultureUnitCount: ctx.aquacultureUnitCount,
            operationMode: ctx.operationMode
        }
    };
}

function collectTopActions(hazards, overallSeverity, farmContext) {
    const ctx = aquacultureHazardAdaptation.normalizeFarmContext(farmContext);
    if (!hazards.length || overallSeverity === 'none') {
        return farmMitigationActions.getCalmReminders(ctx);
    }
    const seen = new Set();
    const out = [];
    for (const h of hazards.slice(0, TH.summaryHazardLimit)) {
        for (const a of h.actions.doNow || []) {
            if (!seen.has(a)) {
                seen.add(a);
                out.push(a);
            }
            if (out.length >= TH.topActionLimit) {
                return out;
            }
        }
    }
    return out.length ? out : farmMitigationActions.getCalmReminders(ctx);
}

function unavailableAssessment(message, weatherRisk, farmContext) {
    const ctx = aquacultureHazardAdaptation.normalizeFarmContext(farmContext || {});
    let reason = message;
    if (ctx.hasAquaculture && reason && !/aquaculture|pond|tank/i.test(reason)) {
        reason += ' Manual pond and tank checks are still recommended.';
    }
    const topActions = ctx.hasAquaculture
        ? farmMitigationActions.getUnavailableReminders(ctx)
        : [];
    return {
        generatedAt: new Date().toISOString(),
        weatherState: weatherRisk && weatherRisk.state ? weatherRisk.state : 'unavailable',
        overallSeverity: 'none',
        hazards: [],
        topActions,
        unavailableReason: reason,
        farmContext: {
            farmType: ctx.farmType,
            hasCrops: ctx.hasCrops,
            hasLivestock: ctx.hasLivestock,
            hasAquaculture: ctx.hasAquaculture,
            aquacultureUnitCount: ctx.aquacultureUnitCount,
            operationMode: ctx.operationMode
        }
    };
}

/**
 * @param {import('pg').Pool|null} pool
 * @param {string} userId
 * @param {{ apiKey?: string, demoSnapshot?: object, hasLivestockSignal?: boolean, snapshot?: object, weatherRisk?: object }} [opts]
 */
async function getFarmHazardAssessment(pool, userId, opts) {
    const farmContext = await fetchFarmContext(pool, userId, opts && opts.hasLivestockSignal);

    if (opts && opts.snapshot) {
        const weatherRisk =
            opts.weatherRisk ||
            farmWeatherRisk.buildWeatherRiskFromSnapshot(opts.snapshot);
        return buildHazardAssessmentFromSnapshot(opts.snapshot, farmContext, weatherRisk);
    }

    if (opts && opts.demoSnapshot) {
        const weatherRisk = farmWeatherRisk.buildWeatherRiskFromSnapshot(opts.demoSnapshot);
        weatherRisk.source = 'demo';
        return buildHazardAssessmentFromSnapshot(opts.demoSnapshot, farmContext, weatherRisk);
    }

    const ctx = await farmWeatherRisk.getWeatherContext(pool, userId, {
        apiKey: opts && opts.apiKey
    });

    if (!ctx.snapshot) {
        return unavailableAssessment(
            ctx.weatherRisk && ctx.weatherRisk.recommendation
                ? ctx.weatherRisk.recommendation
                : 'Weather data unavailable.',
            ctx.weatherRisk,
            farmContext
        );
    }

    return buildHazardAssessmentFromSnapshot(ctx.snapshot, farmContext, ctx.weatherRisk);
}

module.exports = {
    getFarmHazardAssessment,
    buildHazardAssessmentFromSnapshot,
    fetchFarmContext,
    collectTopActions
};

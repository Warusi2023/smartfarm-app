/**
 * Aquaculture hazard adaptation layer (v1.1).
 * Extends hazard blocks and action lists without changing core rule engine.
 */

const aquacultureMitigationActions = require('./aquacultureMitigationActions');

/**
 * @param {{ hasCrops?: boolean, hasLivestock?: boolean, hasAquaculture?: boolean, farmType?: string }} ctx
 * @returns {'crop-only'|'livestock-only'|'mixed'|'aquaculture-only'|'mixed-with-aquaculture'}
 */
function deriveOperationMode(ctx) {
    const c = ctx || {};
    if (c.hasAquaculture) {
        if (!c.hasCrops && !c.hasLivestock) {
            return 'aquaculture-only';
        }
        return 'mixed-with-aquaculture';
    }
    if (c.hasCrops && !c.hasLivestock) {
        return 'crop-only';
    }
    if (c.hasLivestock && !c.hasCrops) {
        return 'livestock-only';
    }
    return 'mixed';
}

/**
 * @param {object} ctx
 * @returns {object} normalized farmContext with operationMode
 */
function normalizeFarmContext(ctx) {
    const base = {
        farmType: 'mixed',
        hasCrops: true,
        hasLivestock: false,
        hasAquaculture: false,
        aquacultureUnitCount: 0,
        ...(ctx || {})
    };
    base.operationMode = deriveOperationMode(base);
    return base;
}

/**
 * @param {object} affects
 * @param {string} hazardType
 * @param {object} ctx
 */
function enrichAquacultureAffects(affects, hazardType, ctx) {
    if (!ctx.hasAquaculture) {
        return affects;
    }
    const type = hazardType;
    return {
        ...affects,
        aquaculture: true,
        pondsTanks: ['heat', 'flood', 'drought', 'cold', 'wind'].includes(type),
        waterQuality: ['heat', 'flood', 'drought', 'cold'].includes(type),
        aerationPower: ['heat', 'flood', 'drought', 'wind'].includes(type),
        stockEscapeOverflow: ['flood', 'wind'].includes(type)
    };
}

/**
 * @param {object} hazard
 * @param {object} ctx
 */
function enrichAquacultureReason(hazard, ctx) {
    if (!ctx.hasAquaculture || !hazard.reason) {
        return hazard.reason;
    }
    const suffixByType = {
        heat: ' Pond and tank oxygen may drop as water warms.',
        flood: ' Pond overflow and stock escape risk increases with heavy rain.',
        wind: ' Aerators, nets, and tank covers may be exposed to damage.',
        drought: ' Pond levels and water exchange may need closer monitoring.',
        cold: ' Cold nights can slow fish and shrimp metabolism.'
    };
    const suffix = suffixByType[hazard.type];
    if (!suffix || hazard.reason.includes('Pond and tank')) {
        return hazard.reason;
    }
    return hazard.reason + suffix;
}

/**
 * Interleave action lists for mixed farms; aquaculture-only uses aquaculture copy.
 * @param {{ doNow: string[], next24h: string[], recovery: string[] }} base
 * @param {{ doNow: string[], next24h: string[], recovery: string[] }} aquaculture
 * @param {object} ctx
 */
function mergeMitigationActions(base, aquaculture, ctx) {
    const mode = ctx.operationMode || deriveOperationMode(ctx);

    if (!ctx.hasAquaculture) {
        return base;
    }

    if (mode === 'aquaculture-only') {
        return {
            doNow: aquaculture.doNow || [],
            next24h: aquaculture.next24h || [],
            recovery: aquaculture.recovery || []
        };
    }

    return {
        doNow: blendLists(aquaculture.doNow, base.doNow, 2, 2),
        next24h: blendLists(aquaculture.next24h, base.next24h, 2, 2),
        recovery: blendLists(aquaculture.recovery, base.recovery, 1, 2)
    };
}

function blendLists(primary, secondary, primaryMax, secondaryMax) {
    const seen = new Set();
    const out = [];
    const add = (item) => {
        if (!item || seen.has(item)) {
            return;
        }
        seen.add(item);
        out.push(item);
    };
    (primary || []).slice(0, primaryMax).forEach(add);
    (secondary || []).slice(0, secondaryMax).forEach(add);
    (primary || []).slice(primaryMax).forEach(add);
    (secondary || []).slice(secondaryMax).forEach(add);
    return out;
}

/**
 * @param {object} hazard raw hazard from weatherHazardRules
 * @param {object} ctx normalized farmContext
 */
function adaptHazardForAquaculture(hazard, ctx) {
    const affects = enrichAquacultureAffects(hazard.affects, hazard.type, ctx);
    return {
        ...hazard,
        affects,
        reason: enrichAquacultureReason(hazard, ctx)
    };
}

/**
 * @param {object[]} hazards
 * @param {object} ctx
 */
function adaptHazardsForAquaculture(hazards, ctx) {
    return (hazards || []).map((h) => adaptHazardForAquaculture(h, ctx));
}

module.exports = {
    deriveOperationMode,
    normalizeFarmContext,
    enrichAquacultureAffects,
    enrichAquacultureReason,
    mergeMitigationActions,
    adaptHazardForAquaculture,
    adaptHazardsForAquaculture
};

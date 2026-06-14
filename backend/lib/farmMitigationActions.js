/**
 * Mitigation action copy for farm hazards (v1 — editable strings).
 */

const aquacultureMitigationActions = require('./aquacultureMitigationActions');
const aquacultureHazardAdaptation = require('./aquacultureHazardAdaptation');

const BASE = {
    drought: {
        doNow: [
            'Inspect water storage tanks and trough levels.',
            'Prioritize irrigation for sensitive or newly planted crops.',
            'Check livestock water points — refill before peak heat.'
        ],
        next24h: [
            'Reduce grazing pressure on stressed paddocks.',
            'Review feed and fodder reserves for the next week.',
            'Schedule irrigation for early morning or evening.'
        ],
        recovery: [
            'Monitor soil moisture after any rain returns.',
            'Note crop stress areas for replanting or drought-tolerant options.',
            'Resume normal grazing gradually once pasture recovers.'
        ]
    },
    flood: {
        doNow: [
            'Clear drains, gutters, and field runoff paths.',
            'Move feed, chemicals, and equipment above likely flood level.',
            'Harvest market-ready produce early if fields may waterlog.'
        ],
        next24h: [
            'Relocate livestock from low-lying paddocks or yards.',
            'Secure gates and fences where water may flow.',
            'Avoid heavy machinery on saturated ground.'
        ],
        recovery: [
            'Inspect fields for erosion and standing water.',
            'Check stored feed for moisture damage.',
            'Log crop damage and plan replanting where needed.'
        ]
    },
    wind: {
        doNow: [
            'Secure loose roofing, tanks, shade cloth, and equipment.',
            'Move animals to sheltered pens or protected higher ground.',
            'Postpone exposed field work if winds are rising.'
        ],
        next24h: [
            'Harvest vulnerable near-mature crops if safe to do so.',
            'Store backup water and check power for pumps.',
            'Tie down trailers, bins, and temporary structures.'
        ],
        recovery: [
            'Inspect structures, fences, and greenhouse covers after the event.',
            'Check livestock for injury or stress.',
            'Clear debris from access paths and water points.'
        ]
    },
    heat: {
        doNow: [
            'Increase water access for livestock and poultry.',
            'Provide shade or improve ventilation in housing.',
            'Avoid transport or heavy handling during the hottest hours.'
        ],
        next24h: [
            'Shift field work to early morning or late afternoon.',
            'Monitor cattle, goats, and poultry for heat stress signs.',
            'Increase irrigation frequency for sensitive crops.'
        ],
        recovery: [
            'Watch for lingering heat stress over the next 48 hours.',
            'Resume normal routines gradually as temperatures drop.',
            'Note any crop wilting for follow-up irrigation planning.'
        ]
    },
    cold: {
        doNow: [
            'Protect seedlings, nurseries, and frost-sensitive crops.',
            'Move young or vulnerable animals to sheltered housing.',
            'Cover or move portable plants if frost is forecast.'
        ],
        next24h: [
            'Adjust irrigation timing — avoid wet foliage overnight if freezing.',
            'Ensure bedding and draft-free shelter for livestock.',
            'Delay transplanting until frost risk passes.'
        ],
        recovery: [
            'Inspect crops for frost burn after the cold night.',
            'Gradually return animals to normal outdoor routines.',
            'Log any damage for insurance or replanting decisions.'
        ]
    }
};

const CALM_ROUTINE = [
    'No major weather threat right now — keep routine field checks.',
    'Confirm water points and shelter are ready before the next forecast change.'
];

/**
 * @param {string} type drought|flood|wind|heat|cold
 * @param {object} farmContext
 * @returns {{ doNow: string[], next24h: string[], recovery: string[] }}
 */
function getActionsForHazard(type, farmContext) {
    const base = BASE[type] || { doNow: [], next24h: [], recovery: [] };
    const ctx = aquacultureHazardAdaptation.normalizeFarmContext(farmContext);
    const cropOnly = ctx.operationMode === 'crop-only';
    const livestockOnly = ctx.operationMode === 'livestock-only';

    const filter = (items) =>
        items.filter((text) => {
            if (cropOnly && /livestock|grazing|poultry|cattle|goats|animals/i.test(text)) {
                return false;
            }
            if (livestockOnly && /crop|transplant|irrigation for sensitive crops|seedlings|harvest.*produce/i.test(text)) {
                return false;
            }
            return true;
        });

    const filtered = {
        doNow: filter(base.doNow),
        next24h: filter(base.next24h),
        recovery: filter(base.recovery)
    };

    const aquaculture = aquacultureMitigationActions.getAquacultureActionsForHazard(type);
    return aquacultureHazardAdaptation.mergeMitigationActions(filtered, aquaculture, ctx);
}

function getCalmReminders(farmContext) {
    const ctx = aquacultureHazardAdaptation.normalizeFarmContext(farmContext);
    if (ctx.operationMode === 'aquaculture-only') {
        return aquacultureMitigationActions.getAquacultureCalmReminders();
    }
    if (ctx.hasAquaculture) {
        return aquacultureHazardAdaptation.mergeMitigationActions(
            { doNow: CALM_ROUTINE, next24h: [], recovery: [] },
            { doNow: aquacultureMitigationActions.getAquacultureCalmReminders(), next24h: [], recovery: [] },
            ctx
        ).doNow;
    }
    return CALM_ROUTINE.slice();
}

function getUnavailableReminders(farmContext) {
    const ctx = aquacultureHazardAdaptation.normalizeFarmContext(farmContext);
    if (ctx.hasAquaculture) {
        return aquacultureMitigationActions.getAquacultureUnavailableReminders();
    }
    return [];
}

module.exports = {
    getActionsForHazard,
    getCalmReminders,
    getUnavailableReminders,
    BASE
};

/**
 * Aquaculture mitigation actions (v1.1 — editable copy).
 * Categories: aeration_power, water_quality, pond_tank, overflow_escape, equipment
 */

const AQUACULTURE = {
    heat: {
        doNow: [
            'Monitor dissolved oxygen and water temperature on ponds and tanks.',
            'Inspect aerators and backup power — heat lowers oxygen carrying capacity.',
            'Reduce feeding rates if fish or shrimp show stress or low DO.'
        ],
        next24h: [
            'Increase aeration during the hottest hours if DO drops.',
            'Avoid handling or grading stock during peak heat.',
            'Shade exposed tanks where practical.'
        ],
        recovery: [
            'Resume normal feeding gradually as temperatures fall.',
            'Log any mortality and check filters and pumps.',
            'Review aerator runtime for the next warm spell.'
        ]
    },
    flood: {
        doNow: [
            'Secure pond edges, tank covers, and drainage outlets before heavy rain.',
            'Move pumps and electrical gear above likely flood level.',
            'Check overflow paths to prevent stock escape.'
        ],
        next24h: [
            'Reduce inflow if ponds are near capacity.',
            'Monitor turbidity and pH after heavy runoff enters ponds.',
            'Inspect embankments and cage moorings.'
        ],
        recovery: [
            'Test salinity, pH, and dissolved oxygen after storm runoff.',
            'Clear debris from inlet screens and drains.',
            'Log any stock losses or escape incidents.'
        ]
    },
    wind: {
        doNow: [
            'Secure aerators, tank covers, cage nets, and loose equipment.',
            'Verify backup power for aeration if grid may fail.',
            'Move feed and chemicals to sheltered storage.'
        ],
        next24h: [
            'Postpone pond work on exposed dikes if gusts are rising.',
            'Check cage and net pen moorings.',
            'Confirm generator fuel and extension cords are ready.'
        ],
        recovery: [
            'Inspect aeration lines, roofs, and electrical connections after the storm.',
            'Check for net damage or stock escape.',
            'Resume feeding only after water conditions stabilize.'
        ]
    },
    drought: {
        doNow: [
            'Check pond and tank water levels — top up from storage if levels drop.',
            'Inspect pumps and intake filters for blockages.',
            'Prioritize aeration on the most stocked units.'
        ],
        next24h: [
            'Plan water exchanges carefully to conserve supply.',
            'Reduce feeding if water volume or quality declines.',
            'Review backup water sources for critical ponds.'
        ],
        recovery: [
            'Monitor algae blooms as water volume recovers.',
            'Gradually restore normal feeding after levels stabilize.',
            'Note units that needed extra aeration during the dry spell.'
        ]
    },
    cold: {
        doNow: [
            'Monitor water temperature — cold slows metabolism and can stress shrimp.',
            'Reduce feeding if water temperature drops below species target range.',
            'Protect exposed piping and pumps from freezing where relevant.'
        ],
        next24h: [
            'Delay pond draining or large water exchanges during cold nights.',
            'Ensure shelter or covers limit wind chill on small tanks.',
            'Watch tilapia and shrimp units for reduced activity.'
        ],
        recovery: [
            'Gradually increase feeding as temperatures return to target range.',
            'Log any cold-related mortality by unit.',
            'Inspect heaters or covers if used.'
        ]
    }
};

const CALM = [
    'Confirm aerators are running and pond levels look normal.',
    'Log today\'s water temperature and dissolved oxygen if not done yet.'
];

const UNAVAILABLE = [
    'Weather forecast unavailable — manually check pond levels and aerators.',
    'Log dissolved oxygen and temperature on each active unit today.'
];

/**
 * @param {string} type
 * @returns {{ doNow: string[], next24h: string[], recovery: string[] }}
 */
function getAquacultureActionsForHazard(type) {
    return AQUACULTURE[type] || { doNow: [], next24h: [], recovery: [] };
}

function getAquacultureCalmReminders() {
    return CALM.slice();
}

function getAquacultureUnavailableReminders() {
    return UNAVAILABLE.slice();
}

module.exports = {
    getAquacultureActionsForHazard,
    getAquacultureCalmReminders,
    getAquacultureUnavailableReminders,
    AQUACULTURE
};

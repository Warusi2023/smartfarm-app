/**
 * Farm hazard assessment unit tests
 */
const {
    buildHazardAssessmentFromSnapshot,
    collectTopActions
} = require('../../services/farmHazardAssessment');
const { evaluateWeatherHazards } = require('../../lib/weatherHazardRules');

const baseSnapshot = {
    available: true,
    current: { temp: 22, windKmh: 12, description: 'clear sky' },
    today: {
        maxTemp: 24,
        minTemp: 18,
        maxWindKmh: 15,
        totalRainMm: 0,
        hasRain: false,
        hasThunderstorm: false,
        description: 'Clear'
    },
    tomorrow: {
        maxTemp: 26,
        minTemp: 19,
        maxWindKmh: 18,
        totalRainMm: 0,
        hasRain: false,
        hasThunderstorm: false,
        description: 'Clear'
    },
    dryWeek: false
};

const mixedFarm = {
    hasCrops: true,
    hasLivestock: true,
    farmType: 'mixed',
    hasAquaculture: false,
    operationMode: 'mixed'
};

describe('weatherHazardRules', () => {
    it('returns no hazards for calm weather', () => {
        const hazards = evaluateWeatherHazards(baseSnapshot, mixedFarm);
        expect(hazards.length).toBe(0);
    });

    it('returns heat warning when max temp exceeds threshold', () => {
        const hazards = evaluateWeatherHazards(
            {
                ...baseSnapshot,
                today: { ...baseSnapshot.today, maxTemp: 36 },
                tomorrow: { ...baseSnapshot.tomorrow, maxTemp: 37 }
            },
            mixedFarm
        );
        const heat = hazards.find((h) => h.type === 'heat');
        expect(heat).toBeDefined();
        expect(['warning', 'severe']).toContain(heat.severity);
    });

    it('returns flood warning for heavy rain', () => {
        const hazards = evaluateWeatherHazards(
            {
                ...baseSnapshot,
                tomorrow: {
                    ...baseSnapshot.tomorrow,
                    totalRainMm: 30,
                    hasRain: true
                }
            },
            mixedFarm
        );
        const flood = hazards.find((h) => h.type === 'flood');
        expect(flood).toBeDefined();
        expect(['warning', 'severe']).toContain(flood.severity);
    });

    it('returns drought watch for dry week pattern', () => {
        const hazards = evaluateWeatherHazards(
            {
                ...baseSnapshot,
                dryWeek: true,
                today: { ...baseSnapshot.today, maxTemp: 33 },
                tomorrow: { ...baseSnapshot.tomorrow, maxTemp: 34, totalRainMm: 0 }
            },
            mixedFarm
        );
        const drought = hazards.find((h) => h.type === 'drought');
        expect(drought).toBeDefined();
        expect(['watch', 'warning', 'severe']).toContain(drought.severity);
    });

    it('returns wind severe for thunderstorm', () => {
        const hazards = evaluateWeatherHazards(
            {
                ...baseSnapshot,
                tomorrow: { ...baseSnapshot.tomorrow, hasThunderstorm: true, maxWindKmh: 55 }
            },
            mixedFarm
        );
        const wind = hazards.find((h) => h.type === 'wind');
        expect(wind).toBeDefined();
        expect(wind.severity).toBe('severe');
    });

    it('returns cold warning for frost', () => {
        const hazards = evaluateWeatherHazards(
            {
                ...baseSnapshot,
                tomorrow: { ...baseSnapshot.tomorrow, minTemp: 1 }
            },
            mixedFarm
        );
        const cold = hazards.find((h) => h.type === 'cold');
        expect(cold).toBeDefined();
        expect(['warning', 'severe']).toContain(cold.severity);
    });
});

describe('farmHazardAssessment', () => {
    it('builds calm assessment with routine reminders', () => {
        const result = buildHazardAssessmentFromSnapshot(baseSnapshot, mixedFarm, {
            state: 'calm',
            ruleId: 'calm'
        });
        expect(result.overallSeverity).toBe('none');
        expect(result.hazards.length).toBe(0);
        expect(result.topActions.length).toBeGreaterThan(0);
    });

    it('includes unavailableReason when snapshot missing', () => {
        const result = buildHazardAssessmentFromSnapshot(null, mixedFarm, {
            state: 'unavailable',
            recommendation: 'Add farm coordinates.'
        });
        expect(result.unavailableReason).toContain('coordinates');
        expect(result.hazards).toEqual([]);
    });

    it('attaches mitigation actions to hazards', () => {
        const result = buildHazardAssessmentFromSnapshot(
            {
                ...baseSnapshot,
                today: { ...baseSnapshot.today, maxTemp: 36 },
                tomorrow: { ...baseSnapshot.tomorrow, maxTemp: 37 }
            },
            mixedFarm,
            { state: 'risk', ruleId: 'heat' }
        );
        expect(result.hazards.length).toBeGreaterThan(0);
        const heat = result.hazards.find((h) => h.type === 'heat');
        expect(heat.actions.doNow.length).toBeGreaterThan(0);
        expect(result.topActions.length).toBeGreaterThan(0);
    });

    it('collectTopActions prefers doNow from serious hazards', () => {
        const hazards = evaluateWeatherHazards(
            {
                ...baseSnapshot,
                tomorrow: { ...baseSnapshot.tomorrow, hasThunderstorm: true, maxWindKmh: 60 }
            },
            mixedFarm
        ).map((h) => ({
            ...h,
            actions: { doNow: [`Act on ${h.type}`], next24h: [], recovery: [] }
        }));
        const top = collectTopActions(hazards, 'severe', mixedFarm);
        expect(top.length).toBeGreaterThan(0);
    });
});

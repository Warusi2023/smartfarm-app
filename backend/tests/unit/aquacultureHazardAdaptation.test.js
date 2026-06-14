/**
 * Aquaculture hazard adaptation tests (v1.1)
 */
const aquacultureHazardAdaptation = require('../../lib/aquacultureHazardAdaptation');
const farmMitigationActions = require('../../lib/farmMitigationActions');
const {
    buildHazardAssessmentFromSnapshot
} = require('../../services/farmHazardAssessment');

const baseSnapshot = {
    available: true,
    current: { temp: 22, windKmh: 12, description: 'clear' },
    today: { maxTemp: 24, minTemp: 18, maxWindKmh: 15, totalRainMm: 0, hasRain: false, hasThunderstorm: false },
    tomorrow: { maxTemp: 26, minTemp: 19, maxWindKmh: 18, totalRainMm: 0, hasRain: false, hasThunderstorm: false },
    dryWeek: false
};

const aquacultureOnly = {
    farmType: 'aquaculture',
    hasCrops: false,
    hasLivestock: false,
    hasAquaculture: true,
    aquacultureUnitCount: 2,
    operationMode: 'aquaculture-only'
};

const mixedWithAq = {
    farmType: 'mixed',
    hasCrops: true,
    hasLivestock: false,
    hasAquaculture: true,
    aquacultureUnitCount: 1,
    operationMode: 'mixed-with-aquaculture'
};

describe('aquacultureHazardAdaptation', () => {
    it('derives operation modes', () => {
        expect(aquacultureHazardAdaptation.deriveOperationMode(aquacultureOnly)).toBe('aquaculture-only');
        expect(aquacultureHazardAdaptation.deriveOperationMode(mixedWithAq)).toBe('mixed-with-aquaculture');
        expect(aquacultureHazardAdaptation.deriveOperationMode({ hasCrops: true, hasLivestock: false })).toBe('crop-only');
    });

    it('enriches affects with aquaculture fields for heat', () => {
        const affects = aquacultureHazardAdaptation.enrichAquacultureAffects(
            { crops: false, livestock: false, water: true, infrastructure: true },
            'heat',
            aquacultureOnly
        );
        expect(affects.aquaculture).toBe(true);
        expect(affects.pondsTanks).toBe(true);
        expect(affects.waterQuality).toBe(true);
        expect(affects.aerationPower).toBe(true);
    });

    it('merges aquaculture-only actions without crop/livestock copy', () => {
        const merged = farmMitigationActions.getActionsForHazard('heat', aquacultureOnly);
        expect(merged.doNow.some((a) => /dissolved oxygen|aerator/i.test(a))).toBe(true);
        expect(merged.doNow.some((a) => /livestock|poultry/i.test(a))).toBe(false);
    });

    it('blends aquaculture and crop actions for mixed-with-aquaculture', () => {
        const merged = farmMitigationActions.getActionsForHazard('flood', mixedWithAq);
        expect(merged.doNow.some((a) => /pond|overflow|stock escape/i.test(a))).toBe(true);
        expect(merged.doNow.some((a) => /drain|produce|livestock/i.test(a))).toBe(true);
    });
});

describe('farmHazardAssessment aquaculture', () => {
    it('returns aquaculture heat actions for pond operation', () => {
        const result = buildHazardAssessmentFromSnapshot(
            {
                ...baseSnapshot,
                today: { ...baseSnapshot.today, maxTemp: 36 },
                tomorrow: { ...baseSnapshot.tomorrow, maxTemp: 37 }
            },
            aquacultureOnly,
            { state: 'risk', ruleId: 'heat' }
        );
        const heat = result.hazards.find((h) => h.type === 'heat');
        expect(heat).toBeDefined();
        expect(heat.affects.aquaculture).toBe(true);
        expect(heat.actions.doNow.some((a) => /aerator|dissolved oxygen/i.test(a))).toBe(true);
        expect(result.farmContext.operationMode).toBe('aquaculture-only');
    });

    it('returns storm actions for aquaculture wind/severe', () => {
        const result = buildHazardAssessmentFromSnapshot(
            {
                ...baseSnapshot,
                tomorrow: { ...baseSnapshot.tomorrow, hasThunderstorm: true, maxWindKmh: 60 }
            },
            aquacultureOnly,
            { state: 'risk', ruleId: 'wind_storm' }
        );
        const wind = result.hazards.find((h) => h.type === 'wind');
        expect(wind).toBeDefined();
        expect(wind.affects.stockEscapeOverflow).toBe(true);
        expect(wind.actions.doNow.some((a) => /aerator|net|cage/i.test(a))).toBe(true);
    });

    it('provides aquaculture offline reminders when weather unavailable', () => {
        const result = buildHazardAssessmentFromSnapshot(null, aquacultureOnly, {
            state: 'unavailable',
            recommendation: 'Weather service is not configured.'
        });
        expect(result.unavailableReason).toMatch(/pond|tank|Manual/i);
        expect(result.topActions.length).toBeGreaterThan(0);
        expect(result.topActions.some((a) => /aerator|dissolved oxygen/i.test(a))).toBe(true);
    });
});

/**
 * Grain legume IPM panel data unit tests.
 */

const { resolveCropPestProtection, normalizeCropKey } = require('../../data/cropPestProtection');
const { GRAIN_LEGUME_CROP_KEYS } = require('../../data/grainLegumePestProtection');

describe('grainLegumePestProtection', () => {
    test('includes all major grain legume crop keys', () => {
        expect(GRAIN_LEGUME_CROP_KEYS).toHaveLength(9);
        expect(GRAIN_LEGUME_CROP_KEYS).toEqual(
            expect.arrayContaining([
                'soybean', 'common_bean', 'pea', 'chickpea', 'lentil',
                'pigeon_pea', 'cowpea', 'broad_bean', 'groundnut'
            ])
        );
    });

    test('resolves common legume aliases', () => {
        expect(normalizeCropKey('Peanuts')).toBe('groundnut');
        expect(normalizeCropKey('Fava bean')).toBe('broad_bean');
        expect(normalizeCropKey('Pigeon pea')).toBe('pigeon_pea');
    });

    test('soybean panel flags wide maturity variation', () => {
        const panel = resolveCropPestProtection('Soybean');
        expect(panel.cropKey).toBe('soybean');
        expect(panel.maturityNotes).toMatch(/75–100 days/);
        expect(panel.maturityNotes).toMatch(/variety group/i);
    });

    test('pigeon pea panel notes long-season maturity range', () => {
        const panel = resolveCropPestProtection('Pigeon pea');
        expect(panel.cropKey).toBe('pigeon_pea');
        expect(panel.maturityNotes).toMatch(/180–280/);
        expect(panel.pests.some((p) => /pod borer/i.test(p.name))).toBe(true);
    });
});

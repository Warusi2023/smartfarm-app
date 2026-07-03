/**
 * Cereal IPM panel data unit tests.
 */

const { resolveCropPestProtection, normalizeCropKey } = require('../../data/cropPestProtection');
const { CEREAL_CROP_KEYS } = require('../../data/cerealPestProtection');

describe('cerealPestProtection', () => {
    test('includes all major cereal crop keys', () => {
        expect(CEREAL_CROP_KEYS).toEqual(
            expect.arrayContaining(['wheat', 'rice', 'maize', 'barley', 'sorghum', 'millet', 'oats', 'rye', 'triticale', 'buckwheat', 'fonio'])
        );
        expect(CEREAL_CROP_KEYS).toHaveLength(11);
    });

    test('resolves common cereal name aliases', () => {
        expect(normalizeCropKey('Corn')).toBe('maize');
        expect(normalizeCropKey('paddy rice')).toBe('rice');
        expect(normalizeCropKey('Pearl millet')).toBe('millet');
    });

    test('wheat panel is crop-specific not vegetable default', () => {
        const panel = resolveCropPestProtection('Wheat');
        expect(panel.cropKey).toBe('wheat');
        expect(panel.isDefaultTemplate).toBe(false);
        expect(panel.pests.length).toBeGreaterThanOrEqual(3);
        expect(panel.beneficials.length).toBeGreaterThanOrEqual(2);
        expect(panel.damageToLookFor.length).toBeGreaterThanOrEqual(3);
        expect(panel.chemicalActives.mainPestGroups).toMatch(/rust/i);
    });

    test('rice panel includes paddy-specific field signs', () => {
        const panel = resolveCropPestProtection('Rice');
        expect(panel.cropKey).toBe('rice');
        expect(panel.damageToLookFor.some((s) => /dead heart|whitehead/i.test(s))).toBe(true);
    });
});

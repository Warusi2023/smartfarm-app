/**
 * Root and tuber IPM panel data unit tests.
 */

const { resolveCropPestProtection, normalizeCropKey } = require('../../data/cropPestProtection');
const { ROOT_TUBER_CROP_KEYS } = require('../../data/rootTuberPestProtection');

describe('rootTuberPestProtection', () => {
    test('includes all major root and tuber crop keys', () => {
        expect(ROOT_TUBER_CROP_KEYS).toEqual(
            expect.arrayContaining([
                'potato', 'cassava', 'sweet_potato', 'yam', 'taro', 'aroid', 'sago_palm'
            ])
        );
        expect(ROOT_TUBER_CROP_KEYS).toHaveLength(7);
    });

    test('resolves common root crop aliases', () => {
        expect(normalizeCropKey('Manioc')).toBe('cassava');
        expect(normalizeCropKey('Sweet potatoes')).toBe('sweet_potato');
        expect(normalizeCropKey('Cocoyam')).toBe('taro');
    });

    test('potato panel includes maturity notes and late blight cues', () => {
        const panel = resolveCropPestProtection('Potato');
        expect(panel.cropKey).toBe('potato');
        expect(panel.isDefaultTemplate).toBe(false);
        expect(panel.maturityNotes).toMatch(/80–100 days/);
        expect(panel.damageToLookFor.some((s) => /late blight/i.test(s))).toBe(true);
    });

    test('cassava panel references mealybug biocontrol context', () => {
        const panel = resolveCropPestProtection('Cassava');
        expect(panel.cropKey).toBe('cassava');
        expect(panel.pests.some((p) => /mealybug/i.test(p.name))).toBe(true);
        expect(panel.maturityNotes).toMatch(/6–12 months/);
    });
});

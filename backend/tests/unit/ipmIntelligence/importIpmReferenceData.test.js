/**
 * IPM import script — classifier regression tests (token overlap / boundaries).
 */

const {
    inferPestType,
    inferBeneficialType,
    inferProductClass,
    IMPORT_KEYS
} = require('../../../scripts/import-ipm-reference-data');

describe('import-ipm-reference-data', () => {
    test('imports vegetable and cereal crop keys', () => {
        expect(IMPORT_KEYS).toContain('tomato');
        expect(IMPORT_KEYS).toContain('leafy_greens');
        expect(IMPORT_KEYS).toContain('wheat');
        expect(IMPORT_KEYS).toContain('maize');
        expect(IMPORT_KEYS).toContain('potato');
        expect(IMPORT_KEYS.length).toBeGreaterThanOrEqual(31);
    });

    describe('inferPestType', () => {
        test('detects core pest categories', () => {
            expect(inferPestType('Fall armyworm')).toBe('insect');
            expect(inferPestType('Northern leaf blight')).toBe('fungus');
            expect(inferPestType('Spider mites')).toBe('mite');
            expect(inferPestType('Root-knot nematodes')).toBe('nematode');
            expect(inferPestType('Cassava mosaic virus')).toBe('virus');
        });

        test('does not false-positive on rot/rust substrings inside unrelated names', () => {
            expect(inferPestType('Carrot fly')).toBe('insect');
            expect(inferPestType('Whiteflies')).toBe('insect');
            expect(inferPestType('Leaf-miner flies')).toBe('insect');
        });

        test('handles singular, plural, and hyphenated disease labels', () => {
            expect(inferPestType('Ear rot')).toBe('fungus');
            expect(inferPestType('Stem rots')).toBe('fungus');
            expect(inferPestType('Leaf-rust complex')).toBe('fungus');
        });
    });

    describe('inferBeneficialType', () => {
        test('detects biological products and parasitoids', () => {
            expect(inferBeneficialType('Bt and insecticidal soap')).toBe('biological_product');
            expect(inferBeneficialType('Parasitoid wasps')).toBe('parasitoid');
            expect(inferBeneficialType('Trichogramma-Wasp Pro release')).toBe('parasitoid');
        });

        test('does not confuse fly with butterfly or bee with beetles', () => {
            expect(inferBeneficialType('Ladybird beetles')).toBe('predator');
            expect(inferBeneficialType('Ladybird beetle')).toBe('predator');
            expect(inferBeneficialType('Hoverflies and lacewings')).toBe('predator');
            expect(inferBeneficialType('Syrphid fly')).toBe('predator');
            expect(inferBeneficialType('Monarch butterfly')).toBe('pollinator');
            expect(inferBeneficialType('Native bee strips')).toBe('pollinator');
        });

        test('handles hyphenated and branded beneficial names', () => {
            expect(inferBeneficialType('Green lacewing')).toBe('predator');
            expect(inferBeneficialType('Predatory mite')).toBe('predator');
            expect(inferBeneficialType('Neem-based biorational')).toBe('biological_product');
        });
    });

    describe('inferProductClass', () => {
        test('classifies common active ingredient families', () => {
            expect(inferProductClass('mancozeb')).toBe('fungicide');
            expect(inferProductClass('spinosad')).toBe('insecticide');
            expect(inferProductClass('glyphosate herbicide mix')).toBe('herbicide');
        });
    });
});

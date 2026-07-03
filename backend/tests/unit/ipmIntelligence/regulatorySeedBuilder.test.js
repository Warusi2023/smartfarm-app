const {
    buildRegulatorySeedEntries,
    ILLUSTRATIVE_SEED_SOURCE_REF,
    listSupportedSeedRegions
} = require('../../../services/ipmIntelligence/regulatorySeedBuilder');
const { IMPORT_KEYS } = require('../../../scripts/import-ipm-reference-data');
const { filterChemicalOptions } = require('../../../services/ipmIntelligence/regionFilter');

describe('regulatorySeedBuilder', () => {
    test('supports Fiji seed profile', () => {
        expect(listSupportedSeedRegions()).toContain('FJ');
    });

    test('builds one regulatory row per example active across all imported crops', () => {
        const entries = buildRegulatorySeedEntries('FJ');
        const cropKeys = new Set(entries.map((entry) => entry.cropKey));

        expect(entries.length).toBeGreaterThan(80);
        expect(cropKeys.size).toBe(IMPORT_KEYS.length);
        for (const entry of entries) {
            expect(entry.regionCode).toBe('FJ');
            expect(entry.status).toBe('allowed');
            expect(entry.sourceRef).toBe(ILLUSTRATIVE_SEED_SOURCE_REF);
            expect(entry.activeIngredient.trim().length).toBeGreaterThan(1);
        }
    });

    test('soybean Fiji seed matches imported chemical option strings', () => {
        const entries = buildRegulatorySeedEntries('FJ').filter((entry) => entry.cropKey === 'soybean');
        expect(entries).toHaveLength(3);
        expect(entries[0].activeIngredient).toMatch(/caterpillar/i);
    });

    test('seed entries unlock region-filtered example actives', () => {
        const entries = buildRegulatorySeedEntries('FJ').filter((entry) => entry.cropKey === 'cowpea');
        const chemicals = entries.map((entry) => ({
            active_ingredient: entry.activeIngredient,
            region_codes: ['*'],
            is_example_only: true
        }));
        const regulatoryRows = entries.map((entry) => ({
            region_code: entry.regionCode,
            active_ingredient: entry.activeIngredient,
            crop_key: entry.cropKey,
            status: entry.status
        }));

        const filtered = filterChemicalOptions(chemicals, regulatoryRows, 'FJ', 'cowpea');
        expect(filtered).toHaveLength(entries.length);
    });
});

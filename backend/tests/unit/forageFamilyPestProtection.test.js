const forageRecords = require('../../data/forageFamilyIpmRecords.json');
const {
    FORAGE_FAMILY_CONTRACT,
    FORAGE_FAMILY_IPM,
    FORAGE_FAMILY_ALIASES,
    FORAGE_FAMILY_CROP_KEYS
} = require('../../data/forageFamilyPestProtection');
const {
    readContractMetadata,
    transformRecord,
    transformAllRecords
} = require('../../data/forageFamilyIpmTransformer');
const {
    resolveCropPestProtection,
    normalizeCropKey,
    listPestProtectionCrops
} = require('../../data/cropPestProtection');

describe('forageFamilyIpmTransformer', () => {
    test('exposes contract metadata separately from panel records', () => {
        expect(readContractMetadata(forageRecords)).toEqual({
            schema_version: '1.0',
            climate_keys: ['tropical', 'dry', 'temperate', 'continental', 'polar', 'high_mountain'],
            advisory_scope_values: ['primary', 'marginal', 'out_of_scope']
        });
        expect(FORAGE_FAMILY_CONTRACT).toEqual(readContractMetadata(forageRecords));
    });

    test('projects each record into the panel shape', () => {
        const alfalfa = transformRecord(forageRecords.records.find((record) => record.crop_key === 'alfalfa'));
        expect(alfalfa).toMatchObject({
            cropName: 'Alfalfa / lucerne',
            pests: expect.any(Array),
            beneficials: expect.any(Array),
            chemicalActives: expect.objectContaining({
                actives: expect.any(Array),
                mainPestGroups: expect.any(String),
                safetyNote: expect.any(String)
            }),
            damageToLookFor: expect.any(Array),
            maturityNotes: expect.any(String)
        });
        expect(alfalfa.pests.length).toBeGreaterThan(0);
        expect(alfalfa.beneficials.length).toBeGreaterThan(0);
        expect(alfalfa.chemicalActives.actives.length).toBeGreaterThan(0);
    });

    test('transformAllRecords covers all source crop keys', () => {
        const projected = transformAllRecords(forageRecords);
        expect(Object.keys(projected).sort()).toEqual(
            forageRecords.records.map((record) => record.crop_key).sort()
        );
    });
});

describe('forageFamilyPestProtection', () => {
    test('includes all forage family crop keys', () => {
        expect(FORAGE_FAMILY_CROP_KEYS).toEqual(
            expect.arrayContaining(['alfalfa', 'clover_forage', 'silage_maize', 'pasture_grasses'])
        );
    });

    test('normalizes common forage aliases without overriding grain maize', () => {
        expect(normalizeCropKey('Lucerne')).toBe('alfalfa');
        expect(normalizeCropKey('Red clover')).toBe('clover_forage');
        expect(normalizeCropKey('Silage maize')).toBe('silage_maize');
        expect(normalizeCropKey('Perennial ryegrass')).toBe('pasture_grasses');
        expect(normalizeCropKey('Maize')).toBe('maize');
        expect(normalizeCropKey('Corn')).toBe('maize');
    });

    test('alfalfa and silage maize expose maturity notes and non-default IPM', () => {
        const alfalfa = resolveCropPestProtection('Alfalfa');
        expect(alfalfa.isDefaultTemplate).toBe(false);
        expect(alfalfa.maturityNotes).toMatch(/60-90 days/i);
        expect(alfalfa.pests.some((pest) => /disease/i.test(pest.name))).toBe(true);

        const silage = resolveCropPestProtection('Silage maize');
        expect(silage.cropKey).toBe('silage_maize');
        expect(silage.maturityNotes).toMatch(/30-38%/i);
    });

    test('forage crops appear in dedicated crop listing', () => {
        const list = listPestProtectionCrops();
        expect(list.some((crop) => crop.cropKey === 'alfalfa')).toBe(true);
        expect(list.some((crop) => crop.cropKey === 'pasture_grasses')).toBe(true);
    });

    test('panel payload is sourced from JSON projection', () => {
        expect(FORAGE_FAMILY_IPM.alfalfa).toEqual(transformRecord(
            forageRecords.records.find((record) => record.crop_key === 'alfalfa')
        ));
    });
});

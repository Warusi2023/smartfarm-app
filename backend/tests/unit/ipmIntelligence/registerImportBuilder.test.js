const { buildRegisterImportPlan } = require('../../../services/ipmIntelligence/registerImportBuilder');
const { FJ_REGISTER_CROP_KEYS } = require('../../../data/ipmRegulatory/fijiMaafRegister');
const { listRegisterRegions } = require('../../../data/ipmRegulatory/regions/index');
const {
    filterChemicalOptions,
    hasRegisterBackedRegulatory
} = require('../../../services/ipmIntelligence/regionFilter');
const { MAAF_FJ_REGISTER_SOURCE_PREFIX } = require('../../../data/ipmRegulatory/constants');

describe('registerImportBuilder', () => {
    test('lists Fiji in regional register modules', () => {
        expect(listRegisterRegions()).toContain('FJ');
    });

    test('builds register plan for all 31 IPM crops including cereals and vegetables', () => {
        const plan = buildRegisterImportPlan('FJ');
        expect(plan.regionCode).toBe('FJ');
        expect(plan.cropKeys).toEqual(FJ_REGISTER_CROP_KEYS);
        expect(plan.cropKeys.length).toBe(31);
        expect(plan.chemicals.length).toBe(plan.regulatory.length);
        expect(plan.chemicals.length).toBeGreaterThan(100);
    });

    test('cowpea register actives use MAAF source_ref provenance', () => {
        const plan = buildRegisterImportPlan('FJ');
        const cowpeaRows = plan.regulatory.filter((row) => row.cropKey === 'cowpea');
        expect(cowpeaRows.length).toBe(4);
        for (const row of cowpeaRows) {
            expect(row.sourceRef).toMatch(/^maaf:fj:/);
            expect(['allowed', 'restricted', 'requires_license']).toContain(row.status);
        }
        const btRow = cowpeaRows.find((row) => /bacillus thuringiensis/i.test(row.activeIngredient));
        expect(btRow?.sourceRef).toContain(MAAF_FJ_REGISTER_SOURCE_PREFIX);
        expect(btRow?.sourceRef).toContain('moa_bt_launch_2015');
    });

    test('register-backed regulatory rows suppress illustrative chemicals for Fiji', () => {
        const plan = buildRegisterImportPlan('FJ');
        const cowpeaChemicals = plan.chemicals.filter((row) => row.cropKey === 'cowpea');
        const regulatoryRows = plan.regulatory
            .filter((row) => row.cropKey === 'cowpea')
            .map((row) => ({
                region_code: row.regionCode,
                active_ingredient: row.activeIngredient,
                crop_key: row.cropKey,
                status: row.status,
                source_ref: row.sourceRef
            }));

        const illustrativeChemical = {
            active_ingredient: 'selective caterpillar products (Bt or similar where labeled)',
            region_codes: ['*'],
            is_example_only: true
        };
        const registerChemical = {
            active_ingredient: cowpeaChemicals[0].activeIngredient,
            region_codes: ['FJ'],
            is_example_only: false
        };

        expect(hasRegisterBackedRegulatory(regulatoryRows, 'FJ', 'cowpea')).toBe(true);
        const filtered = filterChemicalOptions(
            [illustrativeChemical, registerChemical],
            regulatoryRows,
            'FJ',
            'cowpea'
        );
        expect(filtered).toHaveLength(1);
        expect(filtered[0].is_example_only).toBe(false);
    });

    test('wheat and tomato crops have register-backed actives', () => {
        const plan = buildRegisterImportPlan('FJ');
        const wheat = plan.regulatory.filter((row) => row.cropKey === 'wheat');
        const tomato = plan.regulatory.filter((row) => row.cropKey === 'tomato');
        expect(wheat.length).toBe(4);
        expect(tomato.length).toBe(5);
        expect(wheat.every((row) => row.sourceRef.startsWith('maaf:fj:'))).toBe(true);
        expect(tomato.some((row) => /spinosad/i.test(row.activeIngredient))).toBe(true);
    });
});

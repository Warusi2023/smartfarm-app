/**
 * IPM repository — DB assembly and JS fallback.
 */

const {
    getPestProtectionPanel,
    listDedicatedPestProtectionCrops
} = require('../../../services/ipmIntelligence/ipmRepository');

describe('ipmIntelligence ipmRepository', () => {
    test('falls back to JS when pool is null', async () => {
        const panel = await getPestProtectionPanel(null, 'Tomato');
        expect(panel.dataSource).toBe('js_fallback');
        expect(panel.cropKey).toBe('tomato');
        expect(panel.pests.length).toBeGreaterThan(0);
        expect(panel.chemicalActives.actives.length).toBeGreaterThan(0);
    });

    test('falls back to JS when DB catalog is incomplete', async () => {
        const pool = {
            query: jest.fn(async (sql) => {
                if (sql.includes('ipm_crop_catalog')) {
                    return { rows: [{ crop_key: 'tomato', display_name: 'Tomato', population_status: 'planned', is_default_template: false }] };
                }
                return { rows: [] };
            })
        };

        const panel = await getPestProtectionPanel(pool, 'Tomato');
        expect(panel.dataSource).toBe('js_fallback');
        expect(pool.query).toHaveBeenCalled();
    });

    test('uses DB panel when catalog is complete', async () => {
        const pool = {
            query: jest.fn(async (sql) => {
                if (sql.includes('ipm_crop_catalog')) {
                    return {
                        rows: [{
                            crop_key: 'tomato',
                            display_name: 'Tomato',
                            population_status: 'complete',
                            is_default_template: false
                        }]
                    };
                }
                if (sql.includes('crop_ipm_field_signs')) {
                    return { rows: [{ sign_text: 'Bronze leaves → mites', region_codes: ['*'] }] };
                }
                if (sql.includes('crop_pests')) {
                    return {
                        rows: [{
                            pest_name_common: 'Aphids',
                            damage_description: 'Cluster on new growth',
                            region_codes: ['*']
                        }]
                    };
                }
                if (sql.includes('crop_beneficials')) {
                    return {
                        rows: [{
                            beneficial_name_common: 'Lacewings',
                            description: 'Aphid predators',
                            region_codes: ['*']
                        }]
                    };
                }
                if (sql.includes('crop_chemical_options')) {
                    return {
                        rows: [{
                            active_ingredient: 'spinosad',
                            region_codes: ['*'],
                            is_example_only: true,
                            main_pest_groups: 'aphids',
                            safety_note: 'Follow local label'
                        }]
                    };
                }
                if (sql.includes('crop_chemical_regulatory_status')) {
                    return {
                        rows: [{
                            region_code: 'KE',
                            active_ingredient: 'spinosad',
                            crop_key: 'tomato',
                            status: 'allowed'
                        }]
                    };
                }
                return { rows: [] };
            })
        };

        const panel = await getPestProtectionPanel(pool, 'Tomato', { regionCode: 'KE' });
        expect(panel.dataSource).toBe('database');
        expect(panel.pests[0].name).toBe('Aphids');
        expect(panel.chemicalActives.actives).toEqual(['spinosad']);
    });

    test('uses JS chemicals when region is omitted for DB panel', async () => {
        const pool = {
            query: jest.fn(async (sql) => {
                if (sql.includes('ipm_crop_catalog')) {
                    return {
                        rows: [{
                            crop_key: 'tomato',
                            display_name: 'Tomato',
                            population_status: 'complete',
                            is_default_template: false
                        }]
                    };
                }
                if (sql.includes('crop_ipm_field_signs')) {
                    return { rows: [{ sign_text: 'Sign', region_codes: ['*'] }] };
                }
                if (sql.includes('crop_pests')) {
                    return { rows: [{ pest_name_common: 'Aphids', damage_description: 'x', region_codes: ['*'] }] };
                }
                if (sql.includes('crop_beneficials')) {
                    return { rows: [{ beneficial_name_common: 'Lacewings', description: 'y', region_codes: ['*'] }] };
                }
                if (sql.includes('crop_chemical')) {
                    return { rows: [] };
                }
                return { rows: [] };
            })
        };

        const panel = await getPestProtectionPanel(pool, 'Tomato');
        expect(panel.dataSource).toBe('database');
        expect(panel._chemicalSource).toBe('js_fallback_no_region');
        expect(panel.chemicalActives.actives.length).toBeGreaterThan(0);
    });

    test('hides legacy lettuce key from dedicated crop list when family key is present', async () => {
        const pool = {
            query: jest.fn(async () => ({
                rows: [
                    { crop_key: 'leafy_greens', display_name: 'Leafy greens' },
                    { crop_key: 'lettuce', display_name: 'Lettuce' },
                    { crop_key: 'tomato', display_name: 'Tomato' }
                ]
            }))
        };

        const list = await listDedicatedPestProtectionCrops(pool);
        expect(list).toEqual([
            { cropKey: 'leafy_greens', cropName: 'Leafy greens' },
            { cropKey: 'tomato', cropName: 'Tomato' }
        ]);
    });
});

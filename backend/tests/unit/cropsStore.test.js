/**
 * Unit tests for cropsStore mapping / normalization (no live DB required).
 */

const {
    rowToApi,
    normalizeCreatePayload,
    parseDateOnly,
    parseOptionalUuid
} = require('../../services/cropsStore');

describe('cropsStore mapping', () => {
    test('normalizeCreatePayload maps Android/web aliases and defaults', () => {
        const normalized = normalizeCreatePayload({
            name: 'Cassava',
            variety: 'TME 419',
            farmId: 'not-a-uuid',
            plantedDate: '2026-07-15',
            expectedHarvestDate: '2026-11-01',
            area: 1.5,
            status: 'planted',
            notes: 'From Android',
            field: 'Nabainimua block'
        });

        expect(normalized.name).toBe('Cassava');
        expect(normalized.variety).toBe('TME 419');
        expect(normalized.category).toBe('TME 419');
        expect(normalized.plantedDate).toBe('2026-07-15');
        expect(normalized.expectedHarvestDate).toBe('2026-11-01');
        expect(normalized.areaPlanted).toBe(1.5);
        expect(normalized.location).toBe('Nabainimua block');
        expect(normalized.status).toBe('planted');
    });

    test('normalizeCreatePayload accepts plantingDate / harvestDate / description', () => {
        const normalized = normalizeCreatePayload({
            name: 'Tomato',
            type: 'vegetable',
            plantingDate: '2026-01-10',
            harvestDate: '2026-03-10',
            description: 'Web create',
            area: 0
        });
        expect(normalized.category).toBe('vegetable');
        expect(normalized.plantedDate).toBe('2026-01-10');
        expect(normalized.expectedHarvestDate).toBe('2026-03-10');
        expect(normalized.notes).toBe('Web create');
        expect(normalized.areaPlanted).toBe(0.01);
    });

    test('rowToApi emits dual date aliases for Android + web', () => {
        const api = rowToApi({
            id: '11111111-1111-4111-8111-111111111111',
            farm_id: '22222222-2222-4222-8222-222222222222',
            name: 'Cassava',
            variety: 'TME 419',
            category: 'general',
            planting_date: '2026-07-15',
            expected_harvest_date: '2026-11-01',
            area_planted: '1.25',
            status: 'planted',
            notes: 'hello',
            location: 'Field A',
            created_at: new Date('2026-07-15T01:00:00.000Z'),
            updated_at: new Date('2026-07-15T02:00:00.000Z')
        });

        expect(api.id).toBe('11111111-1111-4111-8111-111111111111');
        expect(api.farmId).toBe('22222222-2222-4222-8222-222222222222');
        expect(api.plantedDate).toBe('2026-07-15');
        expect(api.plantingDate).toBe('2026-07-15');
        expect(api.expectedHarvestDate).toBe('2026-11-01');
        expect(api.harvestDate).toBe('2026-11-01');
        expect(api.area).toBe(1.25);
        expect(api.field).toBe('Field A');
        expect(api.location).toBe('Field A');
        expect(api.notes).toBe('hello');
        expect(api.description).toBe('hello');
        expect(api.variety).toBe('TME 419');
    });

    test('parse helpers', () => {
        expect(parseDateOnly('2026-07-15')).toBe('2026-07-15');
        expect(parseOptionalUuid('22222222-2222-4222-8222-222222222222')).toBe(
            '22222222-2222-4222-8222-222222222222'
        );
        expect(parseOptionalUuid('abc')).toBeNull();
    });
});

describe('cropsStore persistence (mocked pool)', () => {
    const {
        createCrop,
        listCrops,
        getCropById,
        deleteCrop
    } = require('../../services/cropsStore');

    const userId = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    const farmId = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
    const cropId = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';

    function mockPool(handlers) {
        return {
            query: jest.fn(async (sql, params) => {
                for (const h of handlers) {
                    if (h.match(sql, params)) {
                        return h.result(sql, params);
                    }
                }
                throw new Error(`Unexpected query: ${sql}`);
            })
        };
    }

    test('createCrop inserts and returns API DTO', async () => {
        const pool = mockPool([
            {
                match: (sql) => /SELECT id FROM farms/i.test(sql),
                result: () => ({ rows: [{ id: farmId }] })
            },
            {
                match: (sql) => /INSERT INTO crops/i.test(sql),
                result: (_sql, params) => ({
                    rows: [
                        {
                            id: cropId,
                            farm_id: params[0],
                            user_id: params[1],
                            name: params[2],
                            variety: params[3],
                            category: params[4],
                            planting_date: params[5],
                            expected_harvest_date: params[6],
                            status: params[7],
                            area_planted: params[8],
                            notes: params[9],
                            location: params[10],
                            created_at: new Date('2026-08-03T00:00:00.000Z'),
                            updated_at: new Date('2026-08-03T00:00:00.000Z')
                        }
                    ]
                })
            }
        ]);

        const created = await createCrop(pool, {
            userId,
            payload: {
                name: 'Cassava',
                variety: 'TME 419',
                farmId,
                plantedDate: '2026-07-15',
                area: 2,
                notes: 'Android create'
            }
        });

        expect(created.id).toBe(cropId);
        expect(created.name).toBe('Cassava');
        expect(created.farmId).toBe(farmId);
        expect(created.plantedDate).toBe('2026-07-15');
        expect(created.plantingDate).toBe('2026-07-15');
        expect(created.area).toBe(2);
        expect(pool.query).toHaveBeenCalled();
    });

    test('listCrops / getCropById / deleteCrop use user scope', async () => {
        const pool = mockPool([
            {
                match: (sql) => /FROM crops/i.test(sql) && /LIMIT \$3 OFFSET \$4/i.test(sql),
                result: () => ({
                    rows: [
                        {
                            id: cropId,
                            farm_id: farmId,
                            user_id: userId,
                            name: 'Cassava',
                            variety: 'TME 419',
                            category: 'general',
                            planting_date: '2026-07-15',
                            expected_harvest_date: null,
                            status: 'planted',
                            area_planted: 2,
                            notes: null,
                            location: null,
                            created_at: new Date(),
                            updated_at: new Date()
                        }
                    ]
                })
            },
            {
                match: (sql) => /FROM crops/i.test(sql) && /LIMIT 1/i.test(sql),
                result: () => ({
                    rows: [
                        {
                            id: cropId,
                            farm_id: farmId,
                            user_id: userId,
                            name: 'Cassava',
                            variety: 'TME 419',
                            category: 'general',
                            planting_date: '2026-07-15',
                            expected_harvest_date: null,
                            status: 'planted',
                            area_planted: 2,
                            notes: null,
                            location: null,
                            created_at: new Date(),
                            updated_at: new Date()
                        }
                    ]
                })
            },
            {
                match: (sql) => /DELETE FROM crops/i.test(sql),
                result: () => ({ rows: [{ id: cropId }] })
            }
        ]);

        const listed = await listCrops(pool, { userId, farmId });
        expect(listed).toHaveLength(1);
        expect(listed[0].name).toBe('Cassava');

        const one = await getCropById(pool, { userId, cropId });
        expect(one.id).toBe(cropId);

        const deleted = await deleteCrop(pool, { userId, cropId });
        expect(deleted.id).toBe(cropId);
    });
});

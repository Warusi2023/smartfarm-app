/**
 * Unit tests for livestockStore mapping / normalization (no live DB required).
 */

const {
    rowToApi,
    normalizeCreatePayload,
    resolveBirthDate,
    parseDateOnly,
    parseOptionalUuid
} = require('../../services/livestockStore');

describe('livestockStore mapping', () => {
    test('normalizeCreatePayload keeps the web animal-detail fields', () => {
        const normalized = normalizeCreatePayload({
            name: 'Brahman NB-01',
            type: 'Cattle',
            breed: 'Brahman',
            tag: 'NB-01',
            sex: 'Female',
            birthDate: '2024-03-02',
            weight: 320,
            location: 'Paddock 2',
            value: 1800,
            purpose: 'dairy',
            lifecycle: 'heifer',
            sireTag: 'S-9',
            damTag: 'D-4',
            photo: 'data:image/png;base64,xyz',
            description: 'Female cattle - dairy'
        });

        expect(normalized.species).toBe('cattle');
        expect(normalized.name).toBe('Brahman NB-01');
        expect(normalized.tag).toBe('NB-01');
        expect(normalized.gender).toBe('female');
        expect(normalized.birthDate).toBe('2024-03-02');
        expect(normalized.weight).toBe(320);
        expect(normalized.location).toBe('Paddock 2');
        expect(normalized.value).toBe(1800);
        expect(normalized.productionPurpose).toBe('dairy');
        expect(normalized.lifecycleStage).toBe('heifer');
        expect(normalized.sireTag).toBe('S-9');
        expect(normalized.damTag).toBe('D-4');
        expect(normalized.notes).toBe('Female cattle - dairy');
        expect(normalized.healthStatus).toBe('healthy');
    });

    test('normalizeCreatePayload accepts snake_case and species aliases', () => {
        const normalized = normalizeCreatePayload({
            species: 'Goat',
            tag_number: 'G-7',
            gender: 'Male',
            birth_date: '2025-01-05',
            health_status: 'Sick'
        });

        expect(normalized.species).toBe('goat');
        expect(normalized.tag).toBe('G-7');
        expect(normalized.name).toBe('G-7');
        expect(normalized.gender).toBe('male');
        expect(normalized.birthDate).toBe('2025-01-05');
        expect(normalized.healthStatus).toBe('sick');
    });

    test('normalizeCreatePayload requires a species', () => {
        expect(() => normalizeCreatePayload({ name: 'No species' })).toThrow(
            /type \(species\) is required/i
        );
    });

    test('Android age-only create is converted to a birth date', () => {
        const birthDate = resolveBirthDate({ age: 3 });
        const expectedYear = new Date().getFullYear() - 3;
        expect(birthDate).not.toBeNull();
        expect(Number(birthDate.slice(0, 4))).toBe(expectedYear);
    });

    test('rowToApi emits both web and Android field aliases', () => {
        const api = rowToApi({
            id: '11111111-1111-4111-8111-111111111111',
            farm_id: '22222222-2222-4222-8222-222222222222',
            species: 'cattle',
            name: 'Brahman NB-01',
            breed: 'Brahman',
            tag_number: 'NB-01',
            gender: 'female',
            birth_date: '2024-03-02',
            weight: '320.50',
            health_status: 'healthy',
            location: 'Paddock 2',
            value: '1800',
            production_purpose: 'dairy',
            lifecycle_stage: 'heifer',
            breeding_status: 'open',
            sire_tag: 'S-9',
            dam_tag: 'D-4',
            first_calving_date: null,
            photo: null,
            notes: 'hello',
            created_at: new Date('2026-08-05T01:00:00.000Z'),
            updated_at: new Date('2026-08-05T02:00:00.000Z')
        });

        expect(api.id).toBe('11111111-1111-4111-8111-111111111111');
        expect(api.species).toBe('cattle');
        expect(api.type).toBe('cattle');
        expect(api.tag).toBe('NB-01');
        expect(api.tagNumber).toBe('NB-01');
        expect(api.sex).toBe('female');
        expect(api.gender).toBe('female');
        expect(api.birthDate).toBe('2024-03-02');
        expect(api.healthStatus).toBe('healthy');
        expect(api.status).toBe('healthy');
        expect(api.weight).toBe(320.5);
        expect(api.value).toBe(1800);
        expect(api.purpose).toBe('dairy');
        expect(api.productionPurpose).toBe('dairy');
        expect(api.lifecycle).toBe('heifer');
        expect(api.notes).toBe('hello');
        expect(api.description).toBe('hello');
        expect(api.farmId).toBe('22222222-2222-4222-8222-222222222222');
        expect(typeof api.age).toBe('number');
    });

    test('normalizeCreatePayload accepts photo and photoUrl aliases', () => {
        const fromPhoto = normalizeCreatePayload({
            type: 'cattle',
            photo: 'data:image/png;base64,abc'
        });
        expect(fromPhoto.photo).toBe('data:image/png;base64,abc');

        const fromUrl = normalizeCreatePayload({
            type: 'goat',
            photoUrl: 'https://cdn.example.com/goat.jpg'
        });
        expect(fromUrl.photo).toBe('https://cdn.example.com/goat.jpg');
    });

    test('rowToApi emits photo and photoUrl aliases', () => {
        const api = rowToApi({
            id: '11111111-1111-4111-8111-111111111111',
            species: 'cattle',
            photo: 'data:image/jpeg;base64,/9j/4AAQ'
        });
        expect(api.photo).toBe('data:image/jpeg;base64,/9j/4AAQ');
        expect(api.photoUrl).toBe('data:image/jpeg;base64,/9j/4AAQ');
    });

    test('rowToApi tolerates sparse rows without dropping the record', () => {
        const api = rowToApi({ id: 7, species: 'poultry' });
        expect(api.id).toBe('7');
        expect(api.name).toBe('poultry');
        expect(api.tag).toBeNull();
        expect(api.birthDate).toBeNull();
        expect(api.age).toBeNull();
        expect(api.healthStatus).toBe('healthy');
    });

    test('parse helpers', () => {
        expect(parseDateOnly('2026-07-15')).toBe('2026-07-15');
        expect(parseDateOnly('not-a-date')).toBeNull();
        expect(parseOptionalUuid('22222222-2222-4222-8222-222222222222')).toBe(
            '22222222-2222-4222-8222-222222222222'
        );
        expect(parseOptionalUuid('abc')).toBeNull();
    });
});

describe('livestockStore persistence (mocked pool)', () => {
    const {
        createLivestock,
        listLivestock,
        getLivestockById,
        deleteLivestock
    } = require('../../services/livestockStore');

    const userId = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
    const farmId = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
    const livestockId = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';

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

    test('createLivestock inserts every client field and returns the API DTO', async () => {
        const pool = mockPool([
            {
                match: (sql) => /SELECT id FROM farms/i.test(sql),
                result: () => ({ rows: [{ id: farmId }] })
            },
            {
                match: (sql) => /INSERT INTO livestock/i.test(sql),
                result: (_sql, params) => ({
                    rows: [
                        {
                            id: livestockId,
                            farm_id: params[0],
                            user_id: params[1],
                            species: params[2],
                            name: params[3],
                            breed: params[4],
                            tag_number: params[5],
                            gender: params[6],
                            birth_date: params[7],
                            weight: params[8],
                            health_status: params[9],
                            location: params[10],
                            value: params[11],
                            production_purpose: params[12],
                            lifecycle_stage: params[13],
                            breeding_status: params[14],
                            sire_tag: params[15],
                            dam_tag: params[16],
                            first_calving_date: params[17],
                            last_calving_date: params[18],
                            photo: params[19],
                            notes: params[20],
                            created_at: new Date('2026-08-05T00:00:00.000Z'),
                            updated_at: new Date('2026-08-05T00:00:00.000Z')
                        }
                    ]
                })
            }
        ]);

        const created = await createLivestock(pool, {
            userId,
            payload: {
                name: 'Brahman NB-01',
                type: 'Cattle',
                breed: 'Brahman',
                tag: 'NB-01',
                sex: 'Female',
                birthDate: '2024-03-02',
                weight: 320,
                location: 'Paddock 2',
                value: 1800,
                purpose: 'dairy',
                lifecycle: 'heifer',
                farmId
            }
        });

        expect(created.id).toBe(livestockId);
        expect(created.farmId).toBe(farmId);
        expect(created.tag).toBe('NB-01');
        expect(created.sex).toBe('female');
        expect(created.birthDate).toBe('2024-03-02');
        expect(created.value).toBe(1800);
        expect(created.productionPurpose).toBe('dairy');
    });

    test('list / getById / delete are scoped to the authenticated user', async () => {
        const row = {
            id: livestockId,
            farm_id: farmId,
            user_id: userId,
            species: 'cattle',
            name: 'Brahman NB-01',
            tag_number: 'NB-01',
            gender: 'female',
            birth_date: '2024-03-02',
            weight: 320,
            health_status: 'healthy',
            created_at: new Date(),
            updated_at: new Date()
        };

        const pool = mockPool([
            {
                match: (sql) => /FROM livestock/i.test(sql) && /LIMIT \$3 OFFSET \$4/i.test(sql),
                result: (_sql, params) => {
                    expect(params[0]).toBe(userId);
                    return { rows: [row] };
                }
            },
            {
                match: (sql) => /FROM livestock/i.test(sql) && /LIMIT 1/i.test(sql),
                result: () => ({ rows: [row] })
            },
            {
                match: (sql) => /DELETE FROM livestock/i.test(sql),
                result: () => ({ rows: [{ id: livestockId }] })
            }
        ]);

        const listed = await listLivestock(pool, { userId, farmId });
        expect(listed).toHaveLength(1);
        expect(listed[0].tag).toBe('NB-01');

        const one = await getLivestockById(pool, { userId, livestockId });
        expect(one.id).toBe(livestockId);

        const deleted = await deleteLivestock(pool, { userId, livestockId });
        expect(deleted.id).toBe(livestockId);
    });

    test('missing user id is rejected before touching the database', async () => {
        const pool = mockPool([]);
        await expect(listLivestock(pool, { userId: null })).rejects.toThrow(
            /Authenticated user is required/i
        );
        expect(pool.query).not.toHaveBeenCalled();
    });
});

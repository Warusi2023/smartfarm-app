/**
 * W3-04 — writeIdempotency guardrails (first write, replay, conflict).
 */

const idempotencyState = { records: [] };

jest.mock('../../services/cropRecommendationStore', () => ({
    getIdempotencyRecord(userId, operation, clientRequestId) {
        return (
            idempotencyState.records.find(
                (r) =>
                    r.userId === userId &&
                    r.operation === operation &&
                    r.clientRequestId === clientRequestId
            ) || null
        );
    },
    saveIdempotencyRecord(rec) {
        const i = idempotencyState.records.findIndex(
            (r) =>
                r.userId === rec.userId &&
                r.operation === rec.operation &&
                r.clientRequestId === rec.clientRequestId
        );
        if (i >= 0) {
            idempotencyState.records[i] = rec;
        } else {
            idempotencyState.records.push(rec);
        }
    }
}));

const writeIdempotency = require('../../services/writeIdempotency');
const { ConflictError, ValidationError } = require('../../utils/errors');

const USER = 'user-11111111-1111-1111-1111-111111111111';
const CLIENT_ID = 'client-req-abcdef12';

describe('writeIdempotency', () => {
    beforeEach(() => {
        idempotencyState.records.length = 0;
    });

    describe('normalizeClientRequestId', () => {
        test('returns null when omitted', () => {
            expect(writeIdempotency.normalizeClientRequestId(null)).toBeNull();
            expect(writeIdempotency.normalizeClientRequestId('')).toBeNull();
        });

        test('accepts valid id', () => {
            expect(writeIdempotency.normalizeClientRequestId(CLIENT_ID)).toBe(CLIENT_ID);
        });

        test('rejects too-short id', () => {
            expect(() => writeIdempotency.normalizeClientRequestId('short')).toThrow(ValidationError);
        });
    });

    describe('hashPayload', () => {
        test('is stable for equivalent bodies', () => {
            const a = writeIdempotency.hashPayload('farm-revenue', {
                amount: 100,
                date: '2026-05-01',
                description: 'sale'
            });
            const b = writeIdempotency.hashPayload('farm-revenue', {
                date: '2026-05-01',
                amount: 100,
                description: 'sale',
                clientRequestId: 'ignored-in-hash'
            });
            expect(a).toBe(b);
        });

        test('differs when material fields change', () => {
            const a = writeIdempotency.hashPayload('feed-mix-cost', { amount: 10, species: 'cattle' });
            const b = writeIdempotency.hashPayload('feed-mix-cost', { amount: 20, species: 'cattle' });
            expect(a).not.toBe(b);
        });
    });

    describe('runIdempotent', () => {
        test('without clientRequestId runs execute once and does not persist', async () => {
            const execute = jest.fn().mockResolvedValue({ id: 'row-1' });

            const out = await writeIdempotency.runIdempotent({
                userId: USER,
                operation: 'farm-revenue',
                clientRequestId: null,
                payload: { amount: 50 },
                execute
            });

            expect(execute).toHaveBeenCalledTimes(1);
            expect(out.replayed).toBe(false);
            expect(out.result).toEqual({ id: 'row-1' });
            expect(idempotencyState.records).toHaveLength(0);
        });

        test('first write persists cache and returns replayed false', async () => {
            const execute = jest.fn().mockResolvedValue({ id: 'cost-1', amount: 12 });

            const out = await writeIdempotency.runIdempotent({
                userId: USER,
                operation: 'feed-mix-cost',
                clientRequestId: CLIENT_ID,
                payload: { amount: 12, species: 'goat' },
                execute
            });

            expect(execute).toHaveBeenCalledTimes(1);
            expect(out.replayed).toBe(false);
            expect(out.result).toEqual({ id: 'cost-1', amount: 12 });
            expect(idempotencyState.records).toHaveLength(1);
            expect(idempotencyState.records[0].payloadHash).toBe(
                writeIdempotency.hashPayload('feed-mix-cost', { amount: 12, species: 'goat' })
            );
        });

        test('replay with same payload returns cached result without second execute', async () => {
            const execute = jest.fn().mockResolvedValue({ id: 'action-1' });
            const payload = {
                cropId: '3',
                actionType: 'fertilizer',
                status: 'completed',
                recommendationText: 'Apply N'
            };

            await writeIdempotency.runIdempotent({
                userId: USER,
                operation: 'crop-action',
                clientRequestId: CLIENT_ID,
                payload,
                execute
            });

            const replay = await writeIdempotency.runIdempotent({
                userId: USER,
                operation: 'crop-action',
                clientRequestId: CLIENT_ID,
                payload,
                execute
            });

            expect(execute).toHaveBeenCalledTimes(1);
            expect(replay.replayed).toBe(true);
            expect(replay.result).toEqual({ id: 'action-1' });
        });

        test('same clientRequestId with different payload throws ConflictError', async () => {
            const execute = jest.fn().mockResolvedValue({ id: 'soil-1' });

            await writeIdempotency.runIdempotent({
                userId: USER,
                operation: 'soil-test',
                clientRequestId: CLIENT_ID,
                payload: { cropId: '1', testDate: '2026-05-01', ph: 6.5 },
                execute
            });

            await expect(
                writeIdempotency.runIdempotent({
                    userId: USER,
                    operation: 'soil-test',
                    clientRequestId: CLIENT_ID,
                    payload: { cropId: '1', testDate: '2026-05-01', ph: 7.0 },
                    execute
                })
            ).rejects.toThrow(ConflictError);

            expect(execute).toHaveBeenCalledTimes(1);
        });

        test('scopes idempotency by userId', async () => {
            const execute = jest.fn()
                .mockResolvedValueOnce({ id: 'a' })
                .mockResolvedValueOnce({ id: 'b' });

            await writeIdempotency.runIdempotent({
                userId: USER,
                operation: 'farm-revenue',
                clientRequestId: CLIENT_ID,
                payload: { amount: 1, date: '2026-05-01' },
                execute
            });

            const otherUser = 'user-22222222-2222-2222-2222-222222222222';
            const out = await writeIdempotency.runIdempotent({
                userId: otherUser,
                operation: 'farm-revenue',
                clientRequestId: CLIENT_ID,
                payload: { amount: 1, date: '2026-05-01' },
                execute
            });

            expect(execute).toHaveBeenCalledTimes(2);
            expect(out.replayed).toBe(false);
            expect(out.result).toEqual({ id: 'b' });
        });
    });
});

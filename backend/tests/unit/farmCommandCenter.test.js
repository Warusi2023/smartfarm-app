/**
 * W4-01 farm command center service — attention + period helpers.
 */
const farmCommandCenter = require('../../services/farmCommandCenter');

describe('farmCommandCenter', () => {
    it('exports getCommandCenter', () => {
        expect(typeof farmCommandCenter.getCommandCenter).toBe('function');
    });

    it('todayUtc returns YYYY-MM-DD', () => {
        expect(farmCommandCenter.todayUtc()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('weekBoundsUtc spans 7 days', () => {
        const w = farmCommandCenter.weekBoundsUtc();
        expect(w.start <= w.end).toBe(true);
        const start = new Date(w.start + 'T12:00:00Z');
        const end = new Date(w.end + 'T12:00:00Z');
        const diff = (end - start) / 86400000;
        expect(diff).toBe(6);
    });

    it('normalizeWindow maps week to 7d', () => {
        expect(farmCommandCenter.normalizeWindow('week')).toBe('7d');
        expect(farmCommandCenter.normalizeWindow('30d')).toBe('30d');
    });

    it('resolveWindowBounds 30d spans 30 days', () => {
        const w = farmCommandCenter.resolveWindowBounds('30d');
        expect(w.window).toBe('30d');
        const start = new Date(w.start + 'T12:00:00Z');
        const end = new Date(w.end + 'T12:00:00Z');
        const diff = (end - start) / 86400000;
        expect(diff).toBe(29);
    });
});

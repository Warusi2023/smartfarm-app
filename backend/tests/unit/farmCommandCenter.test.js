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

    describe('buildDailyChecklist (W5-01)', () => {
        const today = '2026-05-23';

        it('marks activity done when today has logged events', () => {
            const checklist = farmCommandCenter.buildDailyChecklist({
                today,
                todayStats: { actions: 1, soilTests: 0, costs: 0, revenue: 0 },
                lastSoilDate: '2026-05-01',
                lastActivityDate: today,
                lastRevenueDate: null,
                hasLivestockSignal: false,
                feedMixToday: 0,
                activityStreak: 1
            });
            const activity = checklist.items.find((i) => i.id === 'log-activity');
            expect(activity.state).toBe('done');
        });

        it('marks soil attention when never tested', () => {
            const checklist = farmCommandCenter.buildDailyChecklist({
                today,
                todayStats: { actions: 0, soilTests: 0, costs: 0, revenue: 0 },
                lastSoilDate: null,
                lastActivityDate: null,
                lastRevenueDate: null,
                hasLivestockSignal: false,
                feedMixToday: 0,
                activityStreak: 0
            });
            const soil = checklist.items.find((i) => i.id === 'soil-status');
            expect(soil.state).toBe('attention');
        });

        it('marks feed cost optional without livestock signal', () => {
            const checklist = farmCommandCenter.buildDailyChecklist({
                today,
                todayStats: { actions: 0, soilTests: 0, costs: 0, revenue: 0 },
                lastSoilDate: today,
                lastActivityDate: null,
                lastRevenueDate: null,
                hasLivestockSignal: false,
                feedMixToday: 0,
                activityStreak: 0
            });
            const feed = checklist.items.find((i) => i.id === 'feed-cost');
            expect(feed.state).toBe('optional');
        });

        it('computes activity streak from date set', () => {
            const dates = new Set(['2026-05-23', '2026-05-22', '2026-05-21']);
            expect(farmCommandCenter.computeActivityStreak(dates, '2026-05-23')).toBe(3);
        });
    });

    describe('buildWeeklySummary (W5-02)', () => {
        const today = '2026-05-23';
        const weekStart = '2026-05-17';
        const weekEnd = '2026-05-23';

        it('enumerateDateRange returns 7 days', () => {
            const days = farmCommandCenter.enumerateDateRange(weekStart, weekEnd);
            expect(days.length).toBe(7);
            expect(days[0]).toBe(weekStart);
            expect(days[6]).toBe(weekEnd);
        });

        it('netDirection detects up, down, flat', () => {
            expect(farmCommandCenter.netDirection(100, 50)).toBe('up');
            expect(farmCommandCenter.netDirection(40, 80)).toBe('down');
            expect(farmCommandCenter.netDirection(50, 50.5)).toBe('flat');
        });

        it('builds day markers and summary lines', () => {
            const activityDates = new Set(['2026-05-20', '2026-05-23']);
            const soilDates = new Set(['2026-05-22']);
            const summary = farmCommandCenter.buildWeeklySummary({
                today,
                weekStart,
                weekEnd,
                activityDates,
                soilDates,
                feedDates: new Set(),
                revenueDates: new Set(['2026-05-23']),
                thisWeekFinancials: { revenue: 500, costs: 200, net: 300 },
                lastWeekFinancials: { revenue: 400, costs: 250, net: 150 },
                hasLivestockSignal: false,
                dayDetails: {}
            });
            expect(summary.days.length).toBe(7);
            expect(summary.summary.activityDays).toBe(2);
            expect(summary.summary.soilLoggedThisWeek).toBe(true);
            expect(summary.summary.activityLine).toBe('2/7 days with farm activity');
            expect(summary.net.direction).toBe('up');
            expect(summary.net.thisWeek.net).toBe(300);
        });
    });
});

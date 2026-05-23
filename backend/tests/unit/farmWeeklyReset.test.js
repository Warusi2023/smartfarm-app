/**
 * W6-01 weekly reset rules
 */
const farmWeeklyReset = require('../../services/farmWeeklyReset');

describe('farmWeeklyReset', () => {
    const lastWeekSnapshot = {
        weekKey: '2026-05-10',
        weekEnd: '2026-05-16',
        label: 'Previous 7 days',
        net: { revenue: 400, costs: 500, net: -100, priorNet: 50 },
        routines: {
            activityDays: 2,
            totalDays: 7,
            soilDays: 0,
            feedDays: 0,
            revenueDays: 1,
            feedApplicable: false
        },
        summaryLines: ['2/7 days with farm activity', 'No soil tests in that period']
    };

    it('filters weather carry-forward when weather is calm', () => {
        const candidates = farmWeeklyReset.buildCarryForwardCandidates(
            [
                {
                    id: 'weather-plan',
                    title: 'Plan weather',
                    reason: 'Rain',
                    suggestedActions: []
                },
                {
                    id: 'soil-health',
                    title: 'Soil',
                    reason: 'Stale',
                    suggestedActions: []
                }
            ],
            { state: 'calm' },
            [{ id: 'soil-health' }]
        );
        expect(candidates.some((c) => c.id === 'weather-plan')).toBe(false);
        expect(candidates.some((c) => c.id === 'soil-health')).toBe(true);
    });

    it('builds weekly reset context with carry candidates', () => {
        const ctx = farmWeeklyReset.buildWeeklyResetContext({
            currentWeekKey: '2026-05-17',
            weeklySummary: { label: 'Last 7 days' },
            weeklyPriorities: {
                items: [{ id: 'activity-logging', title: 'Log more', reason: 'Low days' }]
            },
            weatherRisk: { state: 'calm' },
            lastWeekSnapshot,
            lastWeekPriorityItems: [
                { id: 'soil-health', title: 'Soil', reason: 'No soil', suggestedActions: [] }
            ]
        });
        expect(ctx.currentWeekKey).toBe('2026-05-17');
        expect(ctx.maxFocusCount).toBe(3);
        expect(ctx.suggestedFocusOptions.length).toBe(1);
    });

    it('buildLastWeekSnapshot counts routine days', () => {
        const snap = farmWeeklyReset.buildLastWeekSnapshot({
            prevWeekStart: '2026-05-10',
            prevWeekEnd: '2026-05-16',
            prevFinancials: { revenue: 100, costs: 50, net: 50 },
            prevPriorFinancials: { net: 0 },
            activityDates: new Set(['2026-05-10', '2026-05-12']),
            soilDates: new Set(['2026-05-11']),
            feedDates: new Set(),
            revenueDates: new Set(['2026-05-10']),
            feedApplicable: true
        });
        expect(snap.routines.activityDays).toBe(2);
        expect(snap.routines.soilDays).toBe(1);
        expect(snap.net.net).toBe(50);
    });
});

/**
 * W6-02 focus progress rules
 */
const farmFocusProgress = require('../../services/farmFocusProgress');

function weekSummary(overrides) {
    const days = overrides.days || [
        { date: '2026-05-17', isToday: false, routines: { activity: true, soil: false, feed: false, revenue: false } },
        { date: '2026-05-18', isToday: false, routines: { activity: false, soil: false, feed: false, revenue: false } },
        { date: '2026-05-19', isToday: false, routines: { activity: false, soil: false, feed: false, revenue: false } },
        { date: '2026-05-20', isToday: false, routines: { activity: false, soil: false, feed: false, revenue: false } },
        { date: '2026-05-21', isToday: false, routines: { activity: false, soil: false, feed: false, revenue: false } },
        { date: '2026-05-22', isToday: true, routines: { activity: false, soil: false, feed: false, revenue: false } },
        { date: '2026-05-23', isToday: false, routines: { activity: false, soil: false, feed: false, revenue: false } }
    ];
    const activityDays = days.filter((d) => d.routines.activity).length;
    return {
        weekStart: '2026-05-17',
        days,
        summary: {
            activityDays,
            totalDays: days.length,
            soilLoggedThisWeek: days.some((d) => d.routines.soil)
        },
        net: {
            thisWeek: { revenue: 0, costs: 0, net: 0 },
            direction: 'flat',
            ...(overrides.net || {})
        },
        ...(overrides.extra || {})
    };
}

describe('farmFocusProgress', () => {
    it('marks activity-logging as needs-attention when pace lags', () => {
        const result = farmFocusProgress.computeFocusProgressForId('activity-logging', {
            weeklySummary: weekSummary({})
        });
        expect(result.progressState).toBe('needs-attention');
    });

    it('marks activity-logging completed at 4+ days', () => {
        const days = Array.from({ length: 7 }, (_, i) => ({
            date: `2026-05-${17 + i}`,
            isToday: i === 6,
            routines: { activity: i < 4, soil: false, feed: false, revenue: false }
        }));
        const result = farmFocusProgress.computeFocusProgressForId('activity-logging', {
            weeklySummary: weekSummary({ days })
        });
        expect(result.progressState).toBe('completed');
    });

    it('marks soil-health completed when soil logged this week', () => {
        const days = weekSummary({}).days.map((d, i) => ({
            ...d,
            routines: { ...d.routines, soil: i === 0 }
        }));
        const result = farmFocusProgress.computeFocusProgressForId('soil-health', {
            weeklySummary: weekSummary({ days })
        });
        expect(result.progressState).toBe('completed');
    });

    it('marks weather-plan needs-attention when risk and no activity', () => {
        const days = weekSummary({}).days.map((d) => ({
            ...d,
            routines: { activity: false, soil: false, feed: false, revenue: false }
        }));
        const result = farmFocusProgress.computeFocusProgressForId('weather-plan', {
            weeklySummary: weekSummary({ days }),
            weatherRisk: { state: 'risk', summary: 'Heavy rain' }
        });
        expect(result.progressState).toBe('needs-attention');
    });

    it('buildFocusProgress returns items for focus ids', () => {
        const block = farmFocusProgress.buildFocusProgress({
            weeklySummary: weekSummary({}),
            weatherRisk: { state: 'calm' },
            priorityItems: [{ id: 'activity-logging' }, { id: 'soil-health' }],
            focusPriorityIds: ['activity-logging']
        });
        expect(block.items).toHaveLength(1);
        expect(block.items[0].id).toBe('activity-logging');
    });
});

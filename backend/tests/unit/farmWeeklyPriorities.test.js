/**
 * W5-04 weekly priorities rules
 */
const { buildWeeklyPriorities } = require('../../services/farmWeeklyPriorities');

describe('farmWeeklyPriorities', () => {
    const baseWeekly = {
        weekStart: '2026-05-17',
        weekEnd: '2026-05-23',
        label: 'Last 7 days',
        feedApplicable: false,
        summary: {
            activityDays: 5,
            totalDays: 7,
            soilLoggedThisWeek: true,
            activityLine: '5/7 days with farm activity',
            soilLine: 'Soil logged this week'
        },
        net: {
            thisWeek: { revenue: 500, costs: 300, net: 200 },
            lastWeek: { revenue: 400, costs: 350, net: 50 },
            direction: 'up'
        },
        days: []
    };

    it('includes weather priority when risk state', () => {
        const result = buildWeeklyPriorities({
            weeklySummary: baseWeekly,
            weatherRisk: {
                state: 'risk',
                summary: 'High winds expected',
                recommendation: 'Secure equipment.',
                action: { label: 'Review tasks', target: 'today-on-farm' }
            },
            attention: [],
            lastSoilDate: '2026-05-20'
        });
        const weather = result.items.find((i) => i.id === 'weather-plan');
        expect(weather).toBeDefined();
        expect(weather.tag).toBe('new');
        expect(weather.title).toMatch(/weather/i);
    });

    it('includes soil priority when no soil this week', () => {
        const result = buildWeeklyPriorities({
            weeklySummary: {
                ...baseWeekly,
                summary: { ...baseWeekly.summary, soilLoggedThisWeek: false, soilLine: 'Soil not logged this week' }
            },
            weatherRisk: { state: 'calm' },
            attention: [{ groupKey: 'soil-health', code: 'stale-soil' }],
            lastSoilDate: '2026-01-01'
        });
        const soil = result.items.find((i) => i.id === 'soil-health');
        expect(soil).toBeDefined();
        expect(soil.tag).toBe('ongoing');
    });

    it('includes financial priority when both weeks negative', () => {
        const result = buildWeeklyPriorities({
            weeklySummary: {
                ...baseWeekly,
                net: {
                    thisWeek: { revenue: 100, costs: 400, net: -300 },
                    lastWeek: { revenue: 200, costs: 500, net: -300 },
                    direction: 'down'
                }
            },
            weatherRisk: { state: 'calm' },
            attention: [],
            lastSoilDate: '2026-05-20'
        });
        const fin = result.items.find((i) => i.id === 'financial-review');
        expect(fin).toBeDefined();
        expect(fin.reason).toMatch(/week/i);
    });

    it('includes activity logging when few active days', () => {
        const result = buildWeeklyPriorities({
            weeklySummary: {
                ...baseWeekly,
                summary: { ...baseWeekly.summary, activityDays: 2 }
            },
            weatherRisk: { state: 'calm' },
            attention: [],
            lastSoilDate: '2026-05-20'
        });
        expect(result.items.some((i) => i.id === 'activity-logging')).toBe(true);
    });

    it('limits to at most 5 priorities', () => {
        const result = buildWeeklyPriorities({
            weeklySummary: {
                ...baseWeekly,
                summary: { ...baseWeekly.summary, activityDays: 1, soilLoggedThisWeek: false },
                net: {
                    thisWeek: { revenue: 0, costs: 500, net: -500 },
                    lastWeek: { revenue: 0, costs: 400, net: -400 },
                    direction: 'down'
                }
            },
            weatherRisk: {
                state: 'opportunity',
                summary: 'Rain tomorrow',
                recommendation: 'Field work today.',
                action: { label: 'Add soil test', target: 'soil-test' }
            },
            attention: [
                { groupKey: 'soil-health', code: 'stale-soil' },
                { groupKey: 'financial-pressure', code: 'costs-no-revenue' }
            ],
            lastSoilDate: null
        });
        expect(result.items.length).toBeLessThanOrEqual(5);
    });
});

/**
 * W5-04 — Derive "this week's priorities" from weekly summary, weather, and attention.
 */

const MAX_PRIORITIES = 5;

function todayUtc() {
    return new Date().toISOString().slice(0, 10);
}

function daysSinceDate(isoDate, today) {
    if (!isoDate) {
        return null;
    }
    const a = new Date(String(isoDate).slice(0, 10) + 'T12:00:00Z');
    const b = new Date(today + 'T12:00:00Z');
    return Math.floor((b - a) / 86400000);
}

function hasAttentionGroup(attention, groupKey) {
    return (attention || []).some((a) => a.groupKey === groupKey);
}

function hasAttentionCode(attention, codes) {
    const set = new Set(codes);
    return (attention || []).some((a) => set.has(a.code));
}

/**
 * @param {object} input
 * @param {object} [input.weeklySummary]
 * @param {object} [input.weatherRisk]
 * @param {object[]} [input.attention]
 * @param {string|null} [input.lastSoilDate]
 * @returns {{ weekKey: string, weekLabel: string, items: object[] }}
 */
function buildWeeklyPriorities({ weeklySummary, weatherRisk, attention, lastSoilDate }) {
    const today = todayUtc();
    const weekKey = (weeklySummary && weeklySummary.weekStart) || today;
    const weekLabel = (weeklySummary && weeklySummary.label) || 'Last 7 days';
    const summary = (weeklySummary && weeklySummary.summary) || {};
    const net = (weeklySummary && weeklySummary.net) || {};
    const tw = net.thisWeek || {};
    const lw = net.lastWeek || {};

    const activityDays = Number(summary.activityDays) || 0;
    const totalDays = Number(summary.totalDays) || 7;
    const soilLoggedThisWeek = !!summary.soilLoggedThisWeek;

    const hasSoilAttention =
        hasAttentionGroup(attention, 'soil-health') ||
        hasAttentionCode(attention, ['stale-soil', 'no-soil-ever']);
    const hasFinAttention =
        hasAttentionGroup(attention, 'financial-pressure') ||
        hasAttentionCode(attention, ['costs-no-revenue', 'net-slipping']);

    const candidates = [];

    if (weatherRisk && (weatherRisk.state === 'risk' || weatherRisk.state === 'opportunity')) {
        const title =
            weatherRisk.state === 'risk'
                ? 'Plan around weather risk'
                : 'Use fair-weather windows';
        const actions = [];
        if (weatherRisk.action && weatherRisk.action.target) {
            actions.push({
                label: weatherRisk.action.label,
                target: weatherRisk.action.target
            });
        }
        actions.push({ label: 'View weather row', target: 'fcc-weather-scroll' });
        candidates.push({
            id: 'weather-plan',
            type: 'weather',
            title: title,
            reason: [weatherRisk.summary, weatherRisk.recommendation].filter(Boolean).join(' — '),
            tag: 'new',
            sortOrder: weatherRisk.state === 'risk' ? 100 : 90,
            suggestedActions: actions
        });
    }

    const soilDaysSince = daysSinceDate(lastSoilDate, today);
    const soilNeeded =
        !soilLoggedThisWeek || hasSoilAttention || soilDaysSince === null || soilDaysSince > 30;

    if (soilNeeded) {
        let reason = summary.soilLine || 'Soil data is sparse this week.';
        if (!lastSoilDate) {
            reason = 'No soil tests on record yet — fresh data improves guidance.';
        } else if (soilDaysSince != null && soilDaysSince > 30) {
            reason = `Last soil test ${soilDaysSince} days ago — schedule an update when you can.`;
        } else if (!soilLoggedThisWeek) {
            reason = 'No soil tests logged in the last 7 days.';
        }
        candidates.push({
            id: 'soil-health',
            type: 'soil',
            title: 'Soil health review',
            reason: reason,
            tag: hasSoilAttention ? 'ongoing' : 'new',
            sortOrder: hasSoilAttention ? 85 : 75,
            suggestedActions: [
                { label: 'Add soil test', target: 'soil-test' },
                { label: 'Open crops', target: 'soil-test' }
            ]
        });
    }

    const twNet = Number(tw.net) || 0;
    const lwNet = Number(lw.net) || 0;
    const twCosts = Number(tw.costs) || 0;
    const twRevenue = Number(tw.revenue) || 0;
    const marginPressure =
        (twNet < 0 && lwNet < 0) ||
        hasFinAttention ||
        (twCosts > twRevenue && twCosts > 0);

    if (marginPressure) {
        let reason;
        if (twNet < 0 && lwNet < 0) {
            reason = 'Costs exceeded revenue this week and last week — a quick margin check helps.';
        } else if (twCosts > twRevenue && twCosts > 0) {
            reason = "This week's costs are ahead of revenue.";
        } else {
            reason = 'Financial signals suggest reviewing costs and revenue.';
        }
        candidates.push({
            id: 'financial-review',
            type: 'financial',
            title: 'Review costs vs revenue',
            reason: reason,
            tag: hasFinAttention ? 'ongoing' : 'new',
            sortOrder: hasFinAttention ? 80 : 70,
            suggestedActions: [
                { label: 'Add revenue', target: 'revenue' },
                { label: 'View finances', target: 'financials' }
            ]
        });
    }

    if (activityDays < 4) {
        candidates.push({
            id: 'activity-logging',
            type: 'activity',
            title: 'Improve daily activity logging',
            reason: `Activity logged on ${activityDays} of ${totalDays} days — steadier records make weekly plans clearer.`,
            tag: hasAttentionGroup(attention, 'activity-gap') ? 'ongoing' : 'new',
            sortOrder: 60,
            suggestedActions: [
                { label: 'Log crop action', target: 'crop-action' },
                { label: 'Today on farm', target: 'today-on-farm' }
            ]
        });
    }

    if (weeklySummary && weeklySummary.feedApplicable && summary.soilLoggedThisWeek === false) {
        const feedDays = (weeklySummary.days || []).filter((d) => d.routines && d.routines.feed).length;
        if (feedDays === 0 && !candidates.some((c) => c.id === 'feed-tracking')) {
            candidates.push({
                id: 'feed-tracking',
                type: 'livestock',
                title: 'Tighten feed cost tracking',
                reason: 'Livestock feed activity expected but no feed costs logged this week.',
                tag: 'new',
                sortOrder: 55,
                suggestedActions: [{ label: 'Add feed cost', target: 'feed-mix-cost' }]
            });
        }
    }

    const byId = new Map();
    candidates.forEach((c) => {
        if (!byId.has(c.id)) {
            byId.set(c.id, c);
        }
    });

    const items = Array.from(byId.values())
        .sort((a, b) => b.sortOrder - a.sortOrder)
        .slice(0, MAX_PRIORITIES)
        .map((p) => ({
            id: p.id,
            type: p.type,
            title: p.title,
            reason: p.reason,
            tag: p.tag || 'new',
            state: 'open',
            suggestedActions: p.suggestedActions || []
        }));

    return {
        weekKey: weekKey,
        weekLabel: weekLabel,
        items: items
    };
}

module.exports = {
    buildWeeklyPriorities,
    MAX_PRIORITIES
};

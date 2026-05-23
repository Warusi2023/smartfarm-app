/**
 * W6-01 — Weekly reset / carry-forward context for command center.
 */

const farmWeeklyPriorities = require('./farmWeeklyPriorities');

const WEATHER_CARRY_IDS = new Set(['weather-plan']);

/**
 * @param {string} startDate YYYY-MM-DD (Monday or rolling window start)
 */
function weekKeyFromStart(startDate) {
    return String(startDate || '').slice(0, 10);
}

/**
 * Build activity date set limited to a window.
 */
function filterDateSetToRange(dateSet, startDate, endDate) {
    const out = new Set();
    if (!dateSet) {
        return out;
    }
    dateSet.forEach((d) => {
        if (d >= startDate && d <= endDate) {
            out.add(d);
        }
    });
    return out;
}

/**
 * @param {object} input
 */
function buildLastWeekSnapshot({
    prevWeekStart,
    prevWeekEnd,
    prevFinancials,
    prevPriorFinancials,
    activityDates,
    soilDates,
    feedDates,
    revenueDates,
    feedApplicable
}) {
    const days = [];
    const d = new Date(prevWeekStart + 'T12:00:00Z');
    const end = new Date(prevWeekEnd + 'T12:00:00Z');
    while (d <= end) {
        const key = d.toISOString().slice(0, 10);
        days.push({
            date: key,
            activity: activityDates.has(key),
            soil: soilDates.has(key),
            feed: feedDates.has(key),
            revenue: revenueDates.has(key)
        });
        d.setUTCDate(d.getUTCDate() + 1);
    }

    const activityDays = days.filter((x) => x.activity).length;
    const soilDays = days.filter((x) => x.soil).length;
    const feedDays = days.filter((x) => x.feed).length;
    const revenueDays = days.filter((x) => x.revenue).length;
    const totalDays = days.length || 7;

    const tw = prevFinancials || { revenue: 0, costs: 0, net: 0 };
    const lw = prevPriorFinancials || { revenue: 0, costs: 0, net: 0 };

    return {
        weekKey: weekKeyFromStart(prevWeekStart),
        weekEnd: prevWeekEnd,
        label: 'Previous 7 days',
        net: {
            revenue: tw.revenue,
            costs: tw.costs,
            net: tw.net,
            priorNet: lw.net
        },
        routines: {
            activityDays: activityDays,
            totalDays: totalDays,
            soilDays: soilDays,
            feedDays: feedDays,
            revenueDays: revenueDays,
            feedApplicable: !!feedApplicable
        },
        summaryLines: [
            `${activityDays}/${totalDays} days with farm activity`,
            soilDays > 0 ? `Soil logged on ${soilDays} day${soilDays === 1 ? '' : 's'}` : 'No soil tests in that period',
            feedApplicable
                ? feedDays > 0
                    ? `Feed costs on ${feedDays} day${feedDays === 1 ? '' : 's'}`
                    : 'No feed costs logged'
                : null,
            revenueDays > 0
                ? `Revenue on ${revenueDays} day${revenueDays === 1 ? '' : 's'}`
                : 'No revenue logged in that period'
        ].filter(Boolean)
    };
}

/**
 * Whether a prior-week priority may be carried forward.
 * @param {object} item
 * @param {object} weatherRisk current week weather
 * @param {object[]} currentPriorityItems
 */
function isCarryForwardRelevant(item, weatherRisk, currentPriorityItems) {
    if (!item || !item.id) {
        return { relevant: false, reason: 'Unknown item' };
    }
    if (WEATHER_CARRY_IDS.has(item.id)) {
        if (weatherRisk && (weatherRisk.state === 'risk' || weatherRisk.state === 'opportunity')) {
            return { relevant: true, reason: 'Weather still affects plans this week.' };
        }
        return {
            relevant: false,
            reason: 'Weather conditions have changed — no longer a carry-forward item.'
        };
    }
    const stillSuggested = (currentPriorityItems || []).some((p) => p.id === item.id);
    if (stillSuggested) {
        return { relevant: true, reason: 'Still reflected in this week’s farm signals.' };
    }
    if (item.id === 'offline-backlog') {
        return { relevant: true, reason: 'Sync backlog may still apply.' };
    }
    return {
        relevant: false,
        reason: 'This focus is less relevant for the new week.'
    };
}

/**
 * @param {object[]} lastWeekPriorityItems
 * @param {object} weatherRisk
 * @param {object[]} currentPriorityItems
 */
function buildCarryForwardCandidates(lastWeekPriorityItems, weatherRisk, currentPriorityItems) {
    return (lastWeekPriorityItems || [])
        .map((item) => {
            const check = isCarryForwardRelevant(item, weatherRisk, currentPriorityItems);
            return {
                id: item.id,
                type: item.type,
                title: item.title,
                reason: item.reason,
                relevant: check.relevant,
                relevanceNote: check.reason,
                suggestedActions: item.suggestedActions || []
            };
        })
        .filter((c) => c.relevant);
}

/**
 * @param {object} input
 * @returns {object} weeklyReset block for command-center API
 */
function buildWeeklyResetContext({
    currentWeekKey,
    weeklySummary,
    weeklyPriorities,
    weatherRisk,
    lastWeekSnapshot,
    lastWeekPriorityItems
}) {
    const carryForwardCandidates = buildCarryForwardCandidates(
        lastWeekPriorityItems,
        weatherRisk,
        (weeklyPriorities && weeklyPriorities.items) || []
    );

    const suggestedFocusOptions = ((weeklyPriorities && weeklyPriorities.items) || []).map((p) => ({
        id: p.id,
        title: p.title,
        reason: p.reason,
        tag: p.tag
    }));

    return {
        currentWeekKey: currentWeekKey,
        weekLabel: (weeklySummary && weeklySummary.label) || 'Last 7 days',
        lastWeekSnapshot: lastWeekSnapshot,
        carryForwardCandidates: carryForwardCandidates,
        suggestedFocusOptions: suggestedFocusOptions,
        maxFocusCount: 3,
        suggestReset:
            carryForwardCandidates.length > 0 || suggestedFocusOptions.length > 0
    };
}

/**
 * Build prior-week priorities for carry-forward (deterministic).
 */
function buildLastWeekPriorities({
    lastWeekSnapshot,
    weatherRisk,
    attention,
    lastSoilDate,
    weeklySummary
}) {
    const fakeSummary = {
        weekStart: lastWeekSnapshot.weekKey,
        weekEnd: lastWeekSnapshot.weekEnd,
        label: lastWeekSnapshot.label,
        feedApplicable: lastWeekSnapshot.routines.feedApplicable,
        summary: {
            activityDays: lastWeekSnapshot.routines.activityDays,
            totalDays: lastWeekSnapshot.routines.totalDays,
            soilLoggedThisWeek: lastWeekSnapshot.routines.soilDays > 0,
            activityLine: lastWeekSnapshot.summaryLines[0] || '',
            soilLine: lastWeekSnapshot.summaryLines[1] || ''
        },
        net: {
            thisWeek: lastWeekSnapshot.net,
            lastWeek: { net: lastWeekSnapshot.net.priorNet }
        },
        days: []
    };
    return farmWeeklyPriorities.buildWeeklyPriorities({
        weeklySummary: fakeSummary,
        weatherRisk: weatherRisk,
        attention: attention,
        lastSoilDate: lastSoilDate
    });
}

module.exports = {
    buildWeeklyResetContext,
    buildLastWeekSnapshot,
    buildCarryForwardCandidates,
    isCarryForwardRelevant,
    weekKeyFromStart,
    filterDateSetToRange,
    buildLastWeekPriorities
};

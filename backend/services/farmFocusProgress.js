/**
 * W6-02 — Lightweight progress for weekly focus priorities (derived from farm data).
 */

const PROGRESS_STATES = [
    'not-started',
    'in-progress',
    'on-track',
    'needs-attention',
    'completed'
];

const ACTIVITY_TARGET_DAYS = 4;

function daysElapsedInWeek(weeklySummary) {
    const days = (weeklySummary && weeklySummary.days) || [];
    if (!days.length) {
        return 7;
    }
    const todayIdx = days.findIndex((d) => d.isToday);
    return todayIdx >= 0 ? todayIdx + 1 : days.length;
}

function countRoutineDays(weeklySummary, key) {
    return ((weeklySummary && weeklySummary.days) || []).filter((d) => d.routines && d.routines[key]).length;
}

function checklistItemState(dailyChecklist, id) {
    const item = ((dailyChecklist && dailyChecklist.items) || []).find((i) => i.id === id);
    return item ? item.state : null;
}

function progressResult(progressState, metrics, hint) {
    return {
        progressState: progressState,
        label: labelForState(progressState),
        metrics: metrics || {},
        hint: hint || null
    };
}

function labelForState(state) {
    const map = {
        'not-started': 'Not started',
        'in-progress': 'In progress',
        'on-track': 'On track',
        'needs-attention': 'Needs attention',
        completed: 'Completed'
    };
    return map[state] || 'In progress';
}

/**
 * @param {object} ctx
 */
function progressActivityLogging(ctx) {
    const activityDays = Number(ctx.summary.activityDays) || 0;
    const totalDays = Number(ctx.summary.totalDays) || 7;
    const elapsed = ctx.daysElapsed;
    const metrics = { activityDays, totalDays, targetDays: ACTIVITY_TARGET_DAYS, daysElapsed: elapsed };

    if (activityDays >= ACTIVITY_TARGET_DAYS) {
        return progressResult('completed', metrics, `${activityDays}/${totalDays} days with activity.`);
    }
    const paceMin = Math.max(1, Math.floor((ACTIVITY_TARGET_DAYS * elapsed) / totalDays) - 1);
    if (activityDays === 0) {
        if (elapsed >= 4) {
            return progressResult('needs-attention', metrics, 'No activity logged yet this week.');
        }
        return progressResult('not-started', metrics, 'Start logging to build the habit.');
    }
    if (activityDays < paceMin && elapsed >= 5) {
        return progressResult(
            'needs-attention',
            metrics,
            `Only ${activityDays}/${ACTIVITY_TARGET_DAYS} target days so far.`
        );
    }
    if (activityDays >= paceMin) {
        return progressResult(
            'on-track',
            metrics,
            `${activityDays}/${totalDays} days — pacing toward ${ACTIVITY_TARGET_DAYS}+ days.`
        );
    }
    return progressResult('in-progress', metrics, `${activityDays}/${totalDays} days with activity.`);
}

function progressSoilHealth(ctx) {
    const soilDays = countRoutineDays(ctx.weeklySummary, 'soil');
    const soilLoggedThisWeek = !!ctx.summary.soilLoggedThisWeek || soilDays > 0;
    const soilToday = checklistItemState(ctx.dailyChecklist, 'soil-status') === 'done';
    const metrics = { soilTestsThisWeek: soilDays, soilLoggedThisWeek: soilLoggedThisWeek };

    if (soilLoggedThisWeek || soilToday) {
        return progressResult('completed', metrics, 'Soil data logged this week.');
    }
    if (ctx.daysElapsed >= 5) {
        return progressResult('needs-attention', metrics, 'No soil tests logged yet this week.');
    }
    if (checklistItemState(ctx.dailyChecklist, 'soil-status') === 'due') {
        return progressResult('in-progress', metrics, 'Soil review is on today’s checklist.');
    }
    return progressResult('not-started', metrics, 'Schedule a soil check when you can.');
}

function progressFinancialReview(ctx) {
    const revenueDays = countRoutineDays(ctx.weeklySummary, 'revenue');
    const feedDays = countRoutineDays(ctx.weeklySummary, 'feed');
    const tw = ctx.net.thisWeek || {};
    const direction = ctx.net.direction || 'flat';
    const metrics = {
        revenueDays,
        feedCostDays: feedDays,
        netThisWeek: tw.net,
        netDirection: direction
    };
    const hasRevenue = revenueDays > 0 || (Number(tw.revenue) || 0) > 0;
    const hasCosts = (Number(tw.costs) || 0) > 0 || feedDays > 0;

    if (hasRevenue && hasCosts && (Number(tw.net) || 0) >= 0) {
        return progressResult('completed', metrics, 'Costs and revenue logged; net is positive.');
    }
    if (direction === 'up' && hasRevenue && hasCosts) {
        return progressResult('on-track', metrics, 'Net is improving week over week.');
    }
    if (hasRevenue && hasCosts) {
        return progressResult('in-progress', metrics, 'Entries exist — review margin when you can.');
    }
    if (!hasRevenue && !hasCosts && ctx.daysElapsed >= 4) {
        return progressResult('needs-attention', metrics, 'No costs or revenue logged this week.');
    }
    if (hasCosts || hasRevenue) {
        return progressResult('in-progress', metrics, 'Partial financial logging this week.');
    }
    return progressResult('not-started', metrics, 'Log costs and revenue to track margin.');
}

function progressWeatherPlan(ctx) {
    const wr = ctx.weatherRisk || {};
    const activityDays = Number(ctx.summary.activityDays) || 0;
    const soilDays = countRoutineDays(ctx.weeklySummary, 'soil');
    const metrics = { weatherState: wr.state, activityDays, soilTestsThisWeek: soilDays };

    if (wr.state !== 'risk' && wr.state !== 'opportunity') {
        return progressResult('completed', metrics, 'Weather is calmer — less planning needed.');
    }
    if (activityDays >= 2 || soilDays >= 1) {
        return progressResult('on-track', metrics, 'Farm actions logged since the weather signal.');
    }
    if (activityDays >= 1) {
        return progressResult('in-progress', metrics, 'Some activity logged — keep aligning with conditions.');
    }
    if (ctx.daysElapsed >= 3) {
        return progressResult('needs-attention', metrics, 'Weather is active — log a related action when you can.');
    }
    return progressResult('not-started', metrics, 'Review weather and plan the next field action.');
}

function progressFeedTracking(ctx) {
    const feedDays = countRoutineDays(ctx.weeklySummary, 'feed');
    const metrics = { feedCostDays: feedDays };

    if (feedDays > 0) {
        return progressResult('completed', metrics, 'Feed costs logged this week.');
    }
    if (ctx.daysElapsed >= 5) {
        return progressResult('needs-attention', metrics, 'No feed costs logged yet this week.');
    }
    if (ctx.daysElapsed >= 2) {
        return progressResult('in-progress', metrics, 'Mid-week — feed costs not logged yet.');
    }
    return progressResult('not-started', metrics, 'Log feed when costs occur.');
}

function progressOfflineBacklog(ctx) {
    const pending = Number(ctx.pendingOfflineWrites) || 0;
    const metrics = { pendingOfflineWrites: pending };

    if (pending === 0) {
        return progressResult('completed', metrics, 'Offline queue is clear.');
    }
    if (pending <= 3) {
        return progressResult('in-progress', metrics, `${pending} write${pending === 1 ? '' : 's'} waiting to sync.`);
    }
    return progressResult('needs-attention', metrics, `${pending} items waiting — sync when online.`);
}

function progressGeneric(ctx) {
    const activityDays = Number(ctx.summary.activityDays) || 0;
    if (activityDays >= 3) {
        return progressResult('on-track', { activityDays }, 'Steady activity this week.');
    }
    if (activityDays >= 1) {
        return progressResult('in-progress', { activityDays }, 'Some activity logged.');
    }
    return progressResult('not-started', { activityDays }, 'Log activity to show progress.');
}

const PROGRESS_BY_ID = {
    'activity-logging': progressActivityLogging,
    'soil-health': progressSoilHealth,
    'financial-review': progressFinancialReview,
    'weather-plan': progressWeatherPlan,
    'feed-tracking': progressFeedTracking,
    'offline-backlog': progressOfflineBacklog
};

/**
 * @param {string} priorityId
 * @param {object} input
 */
function computeFocusProgressForId(priorityId, input) {
    const weeklySummary = input.weeklySummary || {};
    const summary = weeklySummary.summary || {};
    const ctx = {
        weeklySummary,
        dailyChecklist: input.dailyChecklist,
        weatherRisk: input.weatherRisk,
        summary,
        net: weeklySummary.net || {},
        daysElapsed: daysElapsedInWeek(weeklySummary),
        pendingOfflineWrites: input.pendingOfflineWrites
    };

    const fn = PROGRESS_BY_ID[priorityId] || progressGeneric;
    const result = fn(ctx);
    return {
        id: priorityId,
        type: priorityId,
        progressState: result.progressState,
        label: result.label,
        metrics: result.metrics,
        hint: result.hint
    };
}

/**
 * @param {object} weeklySummary
 * @param {object} lastWeekSnapshot
 */
function weeklySummaryFromSnapshot(lastWeekSnapshot) {
    if (!lastWeekSnapshot) {
        return null;
    }
    const r = lastWeekSnapshot.routines || {};
    return {
        weekStart: lastWeekSnapshot.weekKey,
        weekEnd: lastWeekSnapshot.weekEnd,
        label: lastWeekSnapshot.label || 'Previous 7 days',
        days: [],
        feedApplicable: !!r.feedApplicable,
        net: {
            thisWeek: lastWeekSnapshot.net || {},
            lastWeek: { net: (lastWeekSnapshot.net && lastWeekSnapshot.net.priorNet) || 0 },
            direction: 'flat'
        },
        summary: {
            activityDays: r.activityDays || 0,
            totalDays: r.totalDays || 7,
            soilLoggedThisWeek: (r.soilDays || 0) > 0,
            activityLine: lastWeekSnapshot.summaryLines && lastWeekSnapshot.summaryLines[0],
            soilLine: lastWeekSnapshot.summaryLines && lastWeekSnapshot.summaryLines[1]
        }
    };
}

/**
 * @param {object} input
 * @param {object} [input.weeklySummary]
 * @param {object} [input.dailyChecklist]
 * @param {object} [input.weatherRisk]
 * @param {object[]} [input.priorityItems]
 * @param {string[]} [input.focusPriorityIds]
 * @param {number} [input.pendingOfflineWrites]
 * @returns {{ weekKey: string, items: object[] }}
 */
function buildFocusProgress({
    weeklySummary,
    dailyChecklist,
    weatherRisk,
    priorityItems,
    focusPriorityIds,
    pendingOfflineWrites
}) {
    const items = priorityItems || [];
    const ids =
        focusPriorityIds && focusPriorityIds.length
            ? focusPriorityIds.slice(0, 3)
            : items.map((p) => p.id);

    const progressItems = ids.map((id) => {
        const row = computeFocusProgressForId(id, {
            weeklySummary,
            dailyChecklist,
            weatherRisk,
            pendingOfflineWrites
        });
        const match = items.find((p) => p.id === id);
        if (match && match.title) {
            row.title = match.title;
        }
        return row;
    });

    return {
        weekKey: (weeklySummary && weeklySummary.weekStart) || '',
        items: progressItems
    };
}

module.exports = {
    PROGRESS_STATES,
    buildFocusProgress,
    computeFocusProgressForId,
    weeklySummaryFromSnapshot,
    labelForState,
    daysElapsedInWeek
};

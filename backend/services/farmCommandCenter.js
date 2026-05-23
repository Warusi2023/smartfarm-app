/**
 * Farm command center aggregate (W4-01) — today/week counts, recent activity, financial insight.
 */

const cropStore = require('./cropRecommendationStore');
const soilTestsStore = require('./soilTestsStore');
const farmSummaryFinancials = require('./farmSummaryFinancials');
const farmWeatherRisk = require('./farmWeatherRisk');

function todayUtc() {
    return new Date().toISOString().slice(0, 10);
}

function weekBoundsUtc() {
    return resolveWindowBounds('7d');
}

/**
 * @param {string} raw - today | week | 7d | 30d
 * @returns {'today'|'7d'|'30d'}
 */
function normalizeWindow(raw) {
    const w = String(raw || 'today')
        .toLowerCase()
        .trim();
    if (w === 'week' || w === '7d' || w === '7') {
        return '7d';
    }
    if (w === '30d' || w === '30') {
        return '30d';
    }
    return 'today';
}

/**
 * @param {'today'|'7d'|'30d'} windowKey
 */
function resolveWindowBounds(windowKey) {
    const key = normalizeWindow(windowKey);
    const end = todayUtc();
    if (key === '7d') {
        const start = new Date();
        start.setUTCDate(start.getUTCDate() - 6);
        return {
            window: '7d',
            label: 'Last 7 days',
            start: start.toISOString().slice(0, 10),
            end: end
        };
    }
    if (key === '30d') {
        const start = new Date();
        start.setUTCDate(start.getUTCDate() - 29);
        return {
            window: '30d',
            label: 'Last 30 days',
            start: start.toISOString().slice(0, 10),
            end: end
        };
    }
    return {
        window: 'today',
        label: 'Today',
        start: end,
        end: end
    };
}

function previousPeriodBounds(startDate, endDate) {
    const s = new Date(startDate + 'T12:00:00Z');
    const e = new Date(endDate + 'T12:00:00Z');
    const days = Math.max(1, Math.round((e - s) / 86400000) + 1);
    const prevEnd = new Date(s);
    prevEnd.setUTCDate(prevEnd.getUTCDate() - 1);
    const prevStart = new Date(prevEnd);
    prevStart.setUTCDate(prevStart.getUTCDate() - (days - 1));
    return {
        start: prevStart.toISOString().slice(0, 10),
        end: prevEnd.toISOString().slice(0, 10)
    };
}

function itemInRange(timestamp, startDate, endDate) {
    const d = String(timestamp || '').slice(0, 10);
    if (!d || d.length < 10) return false;
    return d >= startDate && d <= endDate;
}

function previousMonthBounds() {
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = now.getUTCMonth();
    const start = new Date(Date.UTC(y, m - 1, 1));
    const end = new Date(Date.UTC(y, m, 0));
    return {
        start: start.toISOString().slice(0, 10),
        end: end.toISOString().slice(0, 10)
    };
}

function roundMoney(n) {
    return Math.round(Number(n) * 100) / 100;
}

function pctChange(current, previous) {
    const c = Number(current) || 0;
    const p = Number(previous) || 0;
    if (p === 0) {
        return c === 0 ? 0 : 100;
    }
    return roundMoney(((c - p) / p) * 100);
}

function countFileActionsInRange(userId, startDate, endDate) {
    const all = cropStore.listRecentActionsForUser(userId, 500);
    return all.filter((a) => {
        const d = String(a.completedDate || a.createdAt || '').slice(0, 10);
        return d >= startDate && d <= endDate;
    }).length;
}

function mapActionFeedItem(action) {
    const typeLabel = String(action.actionType || 'action').replace(/_/g, ' ');
    const cropId = action.cropId ? String(action.cropId) : null;
    return {
        kind: 'crop-action',
        typeLabel: 'Crop action',
        id: String(action.id),
        entityId: cropId,
        cropId: cropId,
        title: typeLabel.charAt(0).toUpperCase() + typeLabel.slice(1),
        subtitle: `Crop ${cropId || '—'} · ${action.status || 'logged'}`,
        amount: null,
        timestamp: action.createdAt || new Date().toISOString(),
        navTarget: 'crop-action',
        focusType: 'crop-action',
        focusId: String(action.id)
    };
}

function mapSoilFeedItem(test) {
    const ph = test.ph != null ? `pH ${test.ph}` : 'Soil test';
    const cropId = test.cropId ? String(test.cropId) : null;
    return {
        kind: 'soil-test',
        typeLabel: 'Soil test',
        id: String(test.id),
        entityId: cropId,
        cropId: cropId,
        title: ph,
        subtitle: `Crop ${cropId || '—'}`,
        amount: null,
        timestamp: test.createdAt || test.testDate || new Date().toISOString(),
        navTarget: 'soil-test',
        focusType: 'soil-test',
        focusId: String(test.id)
    };
}

function mapCostFeedItem(row) {
    const links =
        row.links && typeof row.links === 'object'
            ? row.links
            : typeof row.links === 'string'
              ? JSON.parse(row.links)
              : {};
    const type = String(row.type || 'cost');
    let title = 'Farm cost';
    if (type === 'feed-mix') {
        const lt = links.livestockType || 'livestock';
        title = `Feed mix: ${lt}`;
    } else if (type === 'crop-action') {
        title = 'Crop action cost';
    }
    const kind = type === 'feed-mix' ? 'feed-mix-cost' : 'farm-cost';
    return {
        kind: kind,
        typeLabel: type === 'feed-mix' ? 'Feed mix cost' : 'Farm cost',
        id: String(row.id),
        entityId: links.livestockType || links.cropId || null,
        cropId: links.cropId ? String(links.cropId) : null,
        title: title,
        subtitle:
            type === 'feed-mix' && links.group
                ? String(links.group)
                : new Date(row.created_at).toISOString().slice(0, 10),
        amount: roundMoney(row.amount),
        timestamp: row.created_at,
        navTarget: kind,
        focusType: kind,
        focusId: String(row.id)
    };
}

function mapRevenueFeedItem(row) {
    const desc = row.description ? String(row.description).slice(0, 60) : 'Manual revenue';
    return {
        kind: 'manual-revenue',
        typeLabel: 'Revenue',
        id: String(row.id),
        entityId: null,
        cropId: null,
        title: desc,
        subtitle: row.date || '',
        amount: roundMoney(row.amount),
        timestamp: row.created_at || row.date,
        navTarget: 'manual-revenue',
        focusType: 'manual-revenue',
        focusId: String(row.id)
    };
}

async function countCostsInRange(pool, userId, startDate, endDate) {
    const res = await pool.query(
        `SELECT COUNT(*)::int AS cnt FROM farmcosts
         WHERE user_id = $1 AND created_at::date >= $2::date AND created_at::date <= $3::date`,
        [userId, startDate, endDate]
    );
    return res.rows[0].cnt;
}

async function countRevenueInRange(pool, userId, startDate, endDate) {
    const res = await pool.query(
        `SELECT COUNT(*)::int AS cnt FROM farmrevenue
         WHERE user_id = $1 AND date >= $2::date AND date <= $3::date`,
        [userId, startDate, endDate]
    );
    return res.rows[0].cnt;
}

async function sumCostsInRange(pool, userId, startDate, endDate) {
    const res = await pool.query(
        `SELECT COALESCE(SUM(amount), 0)::numeric AS total FROM farmcosts
         WHERE user_id = $1 AND created_at::date >= $2::date AND created_at::date <= $3::date`,
        [userId, startDate, endDate]
    );
    return roundMoney(res.rows[0].total);
}

async function sumRevenueInRange(pool, userId, startDate, endDate) {
    const res = await pool.query(
        `SELECT COALESCE(SUM(amount), 0)::numeric AS total FROM farmrevenue
         WHERE user_id = $1 AND date >= $2::date AND date <= $3::date`,
        [userId, startDate, endDate]
    );
    return roundMoney(res.rows[0].total);
}

async function countSoilTestsInRange(pool, userId, startDate, endDate) {
    if (!soilTestsStore.isUuid(userId)) {
        return countFileSoilInRange(userId, startDate, endDate);
    }
    const res = await pool.query(
        `SELECT COUNT(*)::int AS cnt FROM soiltests
         WHERE user_id = $1 AND test_date >= $2::date AND test_date <= $3::date`,
        [userId, startDate, endDate]
    );
    return res.rows[0].cnt;
}

function countFileSoilInRange(userId, startDate, endDate) {
    const recent = cropStore.listRecentSoilTestsForUser(userId, 200);
    return recent.filter((t) => {
        const d = String(t.testDate || t.createdAt || '').slice(0, 10);
        return d >= startDate && d <= endDate;
    }).length;
}

async function fetchRecentCosts(pool, userId, limit, startDate, endDate) {
    const params = [userId];
    let dateFilter = '';
    if (startDate && endDate) {
        params.push(startDate, endDate);
        dateFilter = ' AND created_at::date >= $2::date AND created_at::date <= $3::date';
    }
    params.push(limit);
    const limitIdx = params.length;
    const res = await pool.query(
        `SELECT id, type, amount, links, created_at FROM farmcosts
         WHERE user_id = $1${dateFilter}
         ORDER BY created_at DESC LIMIT $${limitIdx}`,
        params
    );
    return res.rows.map(mapCostFeedItem);
}

async function fetchRecentRevenue(pool, userId, limit, startDate, endDate) {
    const params = [userId];
    let dateFilter = '';
    if (startDate && endDate) {
        params.push(startDate, endDate);
        dateFilter = ' AND date >= $2::date AND date <= $3::date';
    }
    params.push(limit);
    const limitIdx = params.length;
    const res = await pool.query(
        `SELECT id, amount, description, date, created_at FROM farmrevenue
         WHERE user_id = $1${dateFilter}
         ORDER BY created_at DESC LIMIT $${limitIdx}`,
        params
    );
    return res.rows.map(mapRevenueFeedItem);
}

function listActionsInRange(userId, startDate, endDate, limit) {
    return cropStore
        .listRecentActionsForUser(userId, 500)
        .filter((a) => itemInRange(a.completedDate || a.createdAt, startDate, endDate))
        .slice(0, limit)
        .map(mapActionFeedItem);
}

function listSoilInRange(userId, startDate, endDate, limit) {
    return cropStore
        .listRecentSoilTestsForUser(userId, 500)
        .filter((t) => itemInRange(t.testDate || t.createdAt, startDate, endDate))
        .slice(0, limit)
        .map(mapSoilFeedItem);
}

async function buildPeriodFinancials(pool, userId, startDate, endDate) {
    const [costs, revenue] = await Promise.all([
        sumCostsInRange(pool, userId, startDate, endDate),
        sumRevenueInRange(pool, userId, startDate, endDate)
    ]);
    return {
        periodStart: startDate,
        periodEnd: endDate,
        revenue: revenue,
        costs: costs,
        net: roundMoney(revenue - costs),
        helperText: null
    };
}

async function fetchRecentSoilDb(pool, userId, limit, startDate, endDate) {
    if (!soilTestsStore.isUuid(userId)) {
        return listSoilInRange(userId, startDate, endDate, limit);
    }
    const params = [userId];
    let dateFilter = '';
    if (startDate && endDate) {
        params.push(startDate, endDate);
        dateFilter = ' AND test_date >= $2::date AND test_date <= $3::date';
    }
    params.push(limit);
    const limitIdx = params.length;
    const res = await pool.query(
        `SELECT id, crop_id, field_id, test_date, nutrients, notes, source, created_at
         FROM soiltests WHERE user_id = $1${dateFilter}
         ORDER BY test_date DESC, created_at DESC LIMIT $${limitIdx}`,
        params
    );
    return res.rows.map((row) => mapSoilFeedItem(soilTestsStore.rowToApiTest(row, {})));
}

async function fetchLargestCostDriver(pool, userId, startDate, endDate) {
    const res = await pool.query(
        `SELECT type, SUM(amount)::numeric AS total, COUNT(*)::int AS cnt
         FROM farmcosts
         WHERE user_id = $1 AND created_at::date >= $2::date AND created_at::date <= $3::date
         GROUP BY type ORDER BY total DESC LIMIT 1`,
        [userId, startDate, endDate]
    );
    if (!res.rows[0]) {
        return null;
    }
    const row = res.rows[0];
    return {
        type: row.type,
        total: roundMoney(row.total),
        count: row.cnt
    };
}

async function fetchLatestRevenue(pool, userId) {
    const res = await pool.query(
        `SELECT id, amount, description, date, created_at FROM farmrevenue
         WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
        [userId]
    );
    return res.rows[0] ? mapRevenueFeedItem(res.rows[0]) : null;
}

async function countFeedMixCostsInRange(pool, userId, startDate, endDate) {
    const res = await pool.query(
        `SELECT COUNT(*)::int AS cnt FROM farmcosts
         WHERE user_id = $1 AND type = 'feed-mix'
           AND created_at::date >= $2::date AND created_at::date <= $3::date`,
        [userId, startDate, endDate]
    );
    return res.rows[0].cnt;
}

async function hasLivestockActivitySignal(pool, userId) {
    const start = new Date();
    start.setUTCDate(start.getUTCDate() - 60);
    const startDate = start.toISOString().slice(0, 10);
    const end = todayUtc();
    const cnt = await countFeedMixCostsInRange(pool, userId, startDate, end);
    return cnt > 0;
}

async function fetchLastRevenueDate(pool, userId) {
    const res = await pool.query(
        `SELECT MAX(COALESCE(date, created_at::date))::text AS d
         FROM farmrevenue WHERE user_id = $1`,
        [userId]
    );
    return res.rows[0].d || null;
}

async function fetchLastActivityDate(pool, userId, lastSoilDate) {
    const dates = [];
    const actions = cropStore.listRecentActionsForUser(userId, 1);
    if (actions[0]) {
        dates.push(String(actions[0].completedDate || actions[0].createdAt || '').slice(0, 10));
    }
    if (lastSoilDate) {
        dates.push(String(lastSoilDate).slice(0, 10));
    }
    try {
        const [costRes, revRes] = await Promise.all([
            pool.query(
                `SELECT MAX(created_at::date)::text AS d FROM farmcosts WHERE user_id = $1`,
                [userId]
            ),
            pool.query(
                `SELECT MAX(COALESCE(date, created_at::date))::text AS d
                 FROM farmrevenue WHERE user_id = $1`,
                [userId]
            )
        ]);
        if (costRes.rows[0].d) {
            dates.push(costRes.rows[0].d);
        }
        if (revRes.rows[0].d) {
            dates.push(revRes.rows[0].d);
        }
    } catch (_) {
        /* pool optional in tests */
    }
    const valid = dates.filter((d) => d && d.length >= 10);
    if (!valid.length) {
        return null;
    }
    return valid.sort().pop();
}

async function fetchActivityDateSet(pool, userId, lookbackDays) {
    const end = todayUtc();
    const start = new Date(end + 'T12:00:00Z');
    start.setUTCDate(start.getUTCDate() - (lookbackDays - 1));
    const startDate = start.toISOString().slice(0, 10);
    const set = new Set();

    cropStore.listRecentActionsForUser(userId, 500).forEach((a) => {
        const d = String(a.completedDate || a.createdAt || '').slice(0, 10);
        if (d >= startDate && d <= end) {
            set.add(d);
        }
    });

    cropStore.listRecentSoilTestsForUser(userId, 200).forEach((t) => {
        const d = String(t.testDate || t.createdAt || '').slice(0, 10);
        if (d >= startDate && d <= end) {
            set.add(d);
        }
    });

    try {
        const [costs, revenue, soil] = await Promise.all([
            pool.query(
                `SELECT DISTINCT created_at::date::text AS d FROM farmcosts
                 WHERE user_id = $1 AND created_at::date >= $2::date AND created_at::date <= $3::date`,
                [userId, startDate, end]
            ),
            pool.query(
                `SELECT DISTINCT COALESCE(date, created_at::date)::text AS d FROM farmrevenue
                 WHERE user_id = $1 AND COALESCE(date, created_at::date) >= $2::date
                   AND COALESCE(date, created_at::date) <= $3::date`,
                [userId, startDate, end]
            ),
            soilTestsStore.isUuid(userId)
                ? pool.query(
                      `SELECT DISTINCT test_date::text AS d FROM soiltests
                       WHERE user_id = $1 AND test_date >= $2::date AND test_date <= $3::date`,
                      [userId, startDate, end]
                  )
                : Promise.resolve({ rows: [] })
        ]);
        costs.rows.forEach((r) => set.add(r.d));
        revenue.rows.forEach((r) => set.add(r.d));
        soil.rows.forEach((r) => set.add(r.d));
    } catch (_) {
        /* ignore */
    }
    return set;
}

function computeActivityStreak(activityDates, today) {
    if (!activityDates || !activityDates.size) {
        return 0;
    }
    let streak = 0;
    const d = new Date(today + 'T12:00:00Z');
    for (let i = 0; i < 90; i++) {
        const key = d.toISOString().slice(0, 10);
        if (activityDates.has(key)) {
            streak += 1;
            d.setUTCDate(d.getUTCDate() - 1);
        } else {
            break;
        }
    }
    return streak;
}

function daysSinceDate(isoDate, today) {
    if (!isoDate) {
        return null;
    }
    const a = new Date(String(isoDate).slice(0, 10) + 'T12:00:00Z');
    const b = new Date(today + 'T12:00:00Z');
    return Math.floor((b - a) / 86400000);
}

function hasAnyActivityToday(todayStats) {
    return (
        (todayStats.actions || 0) +
            (todayStats.soilTests || 0) +
            (todayStats.costs || 0) +
            (todayStats.revenue || 0) >
        0
    );
}

/**
 * W5-01 — deterministic daily checklist from farm data (always "today").
 * @param {object} input
 * @returns {{ progress: object, routines: object, items: object[] }}
 */
function buildDailyChecklist({
    today,
    todayStats,
    lastSoilDate,
    lastActivityDate,
    lastRevenueDate,
    hasLivestockSignal,
    feedMixToday,
    activityStreak
}) {
    const items = [];
    const todayLabel = today;

    if (hasAnyActivityToday(todayStats)) {
        const parts = [];
        if (todayStats.actions) {
            parts.push(`${todayStats.actions} action${todayStats.actions === 1 ? '' : 's'}`);
        }
        if (todayStats.soilTests) {
            parts.push(`${todayStats.soilTests} soil`);
        }
        if (todayStats.costs) {
            parts.push(`${todayStats.costs} cost`);
        }
        if (todayStats.revenue) {
            parts.push(`${todayStats.revenue} revenue`);
        }
        items.push({
            id: 'log-activity',
            label: 'Log farm activity',
            state: 'done',
            reason: `Logged today (${parts.join(', ') || 'activity'}).`,
            action: null
        });
    } else {
        items.push({
            id: 'log-activity',
            label: 'Log farm activity',
            state: 'due',
            reason: 'No activity recorded yet today.',
            action: { label: 'Log crop action', target: 'crop-action' }
        });
    }

    const soilDays = daysSinceDate(lastSoilDate, today);
    if (todayStats.soilTests > 0) {
        items.push({
            id: 'soil-status',
            label: 'Review soil status',
            state: 'done',
            reason: 'Soil test logged today.',
            action: null
        });
    } else if (!lastSoilDate) {
        items.push({
            id: 'soil-status',
            label: 'Review soil status',
            state: 'attention',
            reason: 'No soil tests on record.',
            action: { label: 'Add soil test', target: 'soil-test' }
        });
    } else if (soilDays != null && soilDays > 30) {
        items.push({
            id: 'soil-status',
            label: 'Review soil status',
            state: 'due',
            reason: `Last soil test ${soilDays} days ago.`,
            action: { label: 'Add soil test', target: 'soil-test' }
        });
    } else {
        items.push({
            id: 'soil-status',
            label: 'Review soil status',
            state: 'done',
            reason:
                soilDays === 0
                    ? 'Soil data is current.'
                    : `Last soil test ${soilDays} day${soilDays === 1 ? '' : 's'} ago.`,
            action: null
        });
    }

    if (!hasLivestockSignal) {
        items.push({
            id: 'feed-cost',
            label: 'Review feed costs',
            state: 'optional',
            reason: 'No recent feed-mix costs — skip if livestock is inactive.',
            action: { label: 'Add feed cost', target: 'feed-mix-cost' }
        });
    } else if (feedMixToday > 0) {
        items.push({
            id: 'feed-cost',
            label: 'Review feed costs',
            state: 'done',
            reason: 'Feed cost logged today.',
            action: null
        });
    } else {
        items.push({
            id: 'feed-cost',
            label: 'Review feed costs',
            state: 'due',
            reason: 'Livestock feed activity detected — log today’s feed cost if needed.',
            action: { label: 'Add feed cost', target: 'feed-mix-cost' }
        });
    }

    if (todayStats.revenue > 0) {
        items.push({
            id: 'log-revenue',
            label: 'Log revenue',
            state: 'done',
            reason: 'Revenue recorded today.',
            action: null
        });
    } else if (todayStats.costs > 0) {
        items.push({
            id: 'log-revenue',
            label: 'Log revenue',
            state: 'attention',
            reason: 'Costs logged today — add revenue if you had a sale.',
            action: { label: 'Add revenue', target: 'revenue' }
        });
    } else {
        items.push({
            id: 'log-revenue',
            label: 'Log revenue',
            state: 'optional',
            reason: 'Log when you complete a sale today.',
            action: { label: 'Add revenue', target: 'revenue' }
        });
    }

    const applicable = items.filter((i) => i.state !== 'optional');
    const done = items.filter((i) => i.state === 'done').length;

    return {
        progress: {
            done: done,
            total: items.length,
            applicable: applicable.length,
            applicableDone: applicable.filter((i) => i.state === 'done').length
        },
        routines: {
            lastActivityDate: lastActivityDate,
            lastSoilTestDate: lastSoilDate,
            lastRevenueDate: lastRevenueDate,
            activityStreakDays: activityStreak
        },
        items: items,
        date: todayLabel
    };
}

/** @returns {string[]} inclusive UTC dates from start to end */
function enumerateDateRange(startDate, endDate) {
    const days = [];
    const d = new Date(startDate + 'T12:00:00Z');
    const end = new Date(endDate + 'T12:00:00Z');
    while (d <= end) {
        days.push(d.toISOString().slice(0, 10));
        d.setUTCDate(d.getUTCDate() + 1);
    }
    return days;
}

function shortWeekdayLabel(isoDate, today) {
    if (isoDate === today) {
        return 'Today';
    }
    try {
        return new Date(isoDate + 'T12:00:00Z').toLocaleDateString([], { weekday: 'short' });
    } catch (_) {
        return String(isoDate).slice(5);
    }
}

/**
 * @param {number} currentNet
 * @param {number} previousNet
 * @returns {'up'|'down'|'flat'}
 */
function netDirection(currentNet, previousNet) {
    const diff = roundMoney((Number(currentNet) || 0) - (Number(previousNet) || 0));
    if (Math.abs(diff) < 1) {
        return 'flat';
    }
    return diff > 0 ? 'up' : 'down';
}

async function fetchSoilDatesInRange(pool, userId, startDate, endDate) {
    const set = new Set();
    cropStore.listRecentSoilTestsForUser(userId, 200).forEach((t) => {
        const d = String(t.testDate || t.createdAt || '').slice(0, 10);
        if (d >= startDate && d <= endDate) {
            set.add(d);
        }
    });
    try {
        if (soilTestsStore.isUuid(userId)) {
            const res = await pool.query(
                `SELECT DISTINCT test_date::text AS d FROM soiltests
                 WHERE user_id = $1 AND test_date >= $2::date AND test_date <= $3::date`,
                [userId, startDate, endDate]
            );
            res.rows.forEach((r) => set.add(r.d));
        }
    } catch (_) {
        /* ignore */
    }
    return set;
}

async function fetchFeedMixDatesInRange(pool, userId, startDate, endDate) {
    const set = new Set();
    try {
        const res = await pool.query(
            `SELECT DISTINCT created_at::date::text AS d FROM farmcosts
             WHERE user_id = $1 AND type = 'feed-mix'
               AND created_at::date >= $2::date AND created_at::date <= $3::date`,
            [userId, startDate, endDate]
        );
        res.rows.forEach((r) => set.add(r.d));
    } catch (_) {
        /* ignore */
    }
    return set;
}

async function fetchRevenueDatesInRange(pool, userId, startDate, endDate) {
    const set = new Set();
    try {
        const res = await pool.query(
            `SELECT DISTINCT COALESCE(date, created_at::date)::text AS d FROM farmrevenue
             WHERE user_id = $1 AND COALESCE(date, created_at::date) >= $2::date
               AND COALESCE(date, created_at::date) <= $3::date`,
            [userId, startDate, endDate]
        );
        res.rows.forEach((r) => set.add(r.d));
    } catch (_) {
        /* ignore */
    }
    return set;
}

/**
 * Per-day counts for weekly tooltips.
 * @returns {Record<string, { actions: number, soil: number, costs: number, revenue: number, feed: number }>}
 */
async function fetchWeekDayDetails(pool, userId, startDate, endDate) {
    const details = {};
    function bump(date, key) {
        if (!date || date < startDate || date > endDate) {
            return;
        }
        if (!details[date]) {
            details[date] = { actions: 0, soil: 0, costs: 0, revenue: 0, feed: 0 };
        }
        details[date][key] += 1;
    }

    cropStore.listRecentActionsForUser(userId, 500).forEach((a) => {
        bump(String(a.completedDate || a.createdAt || '').slice(0, 10), 'actions');
    });
    cropStore.listRecentSoilTestsForUser(userId, 200).forEach((t) => {
        bump(String(t.testDate || t.createdAt || '').slice(0, 10), 'soil');
    });

    try {
        const [costs, feed, revenue, soil] = await Promise.all([
            pool.query(
                `SELECT created_at::date::text AS d, type FROM farmcosts
                 WHERE user_id = $1 AND created_at::date >= $2::date AND created_at::date <= $3::date`,
                [userId, startDate, endDate]
            ),
            pool.query(
                `SELECT created_at::date::text AS d FROM farmcosts
                 WHERE user_id = $1 AND type = 'feed-mix'
                   AND created_at::date >= $2::date AND created_at::date <= $3::date`,
                [userId, startDate, endDate]
            ),
            pool.query(
                `SELECT COALESCE(date, created_at::date)::text AS d FROM farmrevenue
                 WHERE user_id = $1 AND COALESCE(date, created_at::date) >= $2::date
                   AND COALESCE(date, created_at::date) <= $3::date`,
                [userId, startDate, endDate]
            ),
            soilTestsStore.isUuid(userId)
                ? pool.query(
                      `SELECT test_date::text AS d FROM soiltests
                       WHERE user_id = $1 AND test_date >= $2::date AND test_date <= $3::date`,
                      [userId, startDate, endDate]
                  )
                : Promise.resolve({ rows: [] })
        ]);
        costs.rows.forEach((r) => {
            bump(r.d, r.type === 'feed-mix' ? 'feed' : 'costs');
        });
        feed.rows.forEach((r) => bump(r.d, 'feed'));
        revenue.rows.forEach((r) => bump(r.d, 'revenue'));
        soil.rows.forEach((r) => bump(r.d, 'soil'));
    } catch (_) {
        /* ignore */
    }
    return details;
}

function buildDayTooltip(date, routines, detail) {
    const parts = [];
    if (detail) {
        if (detail.actions) {
            parts.push(`${detail.actions} action${detail.actions === 1 ? '' : 's'}`);
        }
        if (detail.soil) {
            parts.push(`${detail.soil} soil`);
        }
        if (detail.feed) {
            parts.push(`${detail.feed} feed`);
        }
        if (detail.costs) {
            parts.push(`${detail.costs} cost`);
        }
        if (detail.revenue) {
            parts.push(`${detail.revenue} revenue`);
        }
    }
    if (!parts.length) {
        if (routines.activity) {
            return `${date}: activity logged`;
        }
        return `${date}: no activity`;
    }
    return `${date}: ${parts.join(' · ')}`;
}

/**
 * W5-02 — last 7 days routine lane + week-over-week net.
 * @param {object} input
 */
function buildWeeklySummary({
    today,
    weekStart,
    weekEnd,
    activityDates,
    soilDates,
    feedDates,
    revenueDates,
    thisWeekFinancials,
    lastWeekFinancials,
    hasLivestockSignal,
    dayDetails
}) {
    const dates = enumerateDateRange(weekStart, weekEnd);
    const days = dates.map((date) => {
        const detail = dayDetails && dayDetails[date];
        const routines = {
            activity: activityDates.has(date),
            soil: soilDates.has(date),
            feed: feedDates.has(date),
            revenue: revenueDates.has(date)
        };
        if (detail && !routines.activity) {
            routines.activity =
                (detail.actions || 0) +
                    (detail.soil || 0) +
                    (detail.costs || 0) +
                    (detail.revenue || 0) +
                    (detail.feed || 0) >
                0;
        }
        return {
            date: date,
            weekday: shortWeekdayLabel(date, today),
            isToday: date === today,
            routines: routines,
            tooltip: buildDayTooltip(date, routines, detail)
        };
    });

    const activityDays = days.filter((d) => d.routines.activity).length;
    const soilLoggedThisWeek = days.some((d) => d.routines.soil);
    const direction = netDirection(thisWeekFinancials.net, lastWeekFinancials.net);

    return {
        weekStart: weekStart,
        weekEnd: weekEnd,
        label: 'Last 7 days',
        days: days,
        feedApplicable: !!hasLivestockSignal,
        net: {
            thisWeek: {
                revenue: thisWeekFinancials.revenue,
                costs: thisWeekFinancials.costs,
                net: thisWeekFinancials.net
            },
            lastWeek: {
                revenue: lastWeekFinancials.revenue,
                costs: lastWeekFinancials.costs,
                net: lastWeekFinancials.net
            },
            direction: direction,
            changeAmount: roundMoney(
                (Number(thisWeekFinancials.net) || 0) - (Number(lastWeekFinancials.net) || 0)
            )
        },
        summary: {
            activityDays: activityDays,
            totalDays: days.length,
            soilLoggedThisWeek: soilLoggedThisWeek,
            activityLine: `${activityDays}/${days.length} days with farm activity`,
            soilLine: soilLoggedThisWeek ? 'Soil logged this week' : 'Soil not logged this week'
        }
    };
}

async function fetchLastSoilTestDate(pool, userId) {
    let last = null;
    if (soilTestsStore.isUuid(userId)) {
        const res = await pool.query(
            `SELECT MAX(test_date) AS d FROM soiltests WHERE user_id = $1`,
            [userId]
        );
        last = res.rows[0].d;
    }
    const fileTests = cropStore.listRecentSoilTestsForUser(userId, 1);
    if (fileTests[0]) {
        const fd = String(fileTests[0].testDate || '').slice(0, 10);
        if (!last || fd > last) {
            last = fd;
        }
    }
    return last;
}

function buildAttention({ periodStats, periodLabel, monthFinancials, trends, lastSoilDate }) {
    const items = [];
    const today = todayUtc();

    if (periodStats.actions === 0 && periodStats.soilTests === 0 && periodStats.costs === 0 && periodStats.revenue === 0) {
        items.push({
            level: 'info',
            code: 'no-activity-period',
            scope: 'period',
            severity: 'low',
            groupKey: 'activity-gap',
            sortOrder: 20,
            message: `No farm activity logged in ${periodLabel || 'this period'} yet.`,
            action: { label: 'Review tasks', target: 'today-on-farm' }
        });
    }

    if (lastSoilDate) {
        const daysSince = Math.floor(
            (new Date(today + 'T12:00:00Z') - new Date(lastSoilDate + 'T12:00:00Z')) / 86400000
        );
        if (daysSince > 30) {
            items.push({
                level: 'warning',
                code: 'stale-soil',
                scope: 'global',
                severity: 'medium',
                groupKey: 'soil-health',
                sortOrder: 80,
                message: `No soil test in ${daysSince} days — consider updating crop soil data.`,
                action: { label: 'Add soil test', target: 'soil-test' }
            });
        }
    } else {
        items.push({
            level: 'warning',
            code: 'no-soil-ever',
            scope: 'global',
            severity: 'medium',
            groupKey: 'soil-health',
            sortOrder: 85,
            message: 'No soil tests on record — log one to improve crop guidance.',
            action: { label: 'Add soil test', target: 'soil-test' }
        });
    }

    if (monthFinancials.costs > 0 && monthFinancials.revenue === 0) {
        items.push({
            level: 'warning',
            code: 'costs-no-revenue',
            scope: 'global',
            severity: 'medium',
            groupKey: 'financial-pressure',
            sortOrder: 70,
            message: 'Costs logged this calendar month with no revenue — check margin.',
            action: { label: 'Add revenue', target: 'revenue' }
        });
    }

    if (trends.netChangePct < -10 && monthFinancials.net < 0) {
        items.push({
            level: 'warning',
            code: 'net-slipping',
            scope: 'global',
            severity: 'medium',
            groupKey: 'financial-pressure',
            sortOrder: 65,
            message: 'Net margin is down vs prior calendar month.',
            action: { label: 'Review finances', target: 'financials' }
        });
    }

    return items;
}

async function buildPeriodStats(pool, userId, startDate, endDate) {
    const actions = countFileActionsInRange(userId, startDate, endDate);
    const [costs, revenue, soilTests, costSum, revenueSum] = await Promise.all([
        countCostsInRange(pool, userId, startDate, endDate),
        countRevenueInRange(pool, userId, startDate, endDate),
        countSoilTestsInRange(pool, userId, startDate, endDate),
        sumCostsInRange(pool, userId, startDate, endDate),
        sumRevenueInRange(pool, userId, startDate, endDate)
    ]);
    return {
        actions,
        soilTests,
        costs,
        revenue,
        costTotal: costSum,
        revenueTotal: revenueSum,
        netMovement: roundMoney(revenueSum - costSum)
    };
}

/**
 * @param {import('pg').Pool} pool
 * @param {string} userId
 * @param {{ window?: string }} [opts]
 */
async function getCommandCenter(pool, userId, opts) {
    const bounds = resolveWindowBounds(opts && opts.window);
    const today = todayUtc();
    const prevBounds = previousPeriodBounds(bounds.start, bounds.end);

    const [monthFinancials, periodFinancials, previousPeriod, periodStats, lastSoilDate] =
        await Promise.all([
            farmSummaryFinancials.getFinancialSummary(pool, userId, { period: 'month' }),
            buildPeriodFinancials(pool, userId, bounds.start, bounds.end),
            buildPeriodFinancials(pool, userId, prevBounds.start, prevBounds.end),
            buildPeriodStats(pool, userId, bounds.start, bounds.end),
            fetchLastSoilTestDate(pool, userId)
        ]);

    const [
        todayStats,
        lastRevenueDate,
        lastActivityDate,
        hasLivestockSignal,
        feedMixToday,
        activityDates
    ] = await Promise.all([
        buildPeriodStats(pool, userId, today, today),
        fetchLastRevenueDate(pool, userId),
        fetchLastActivityDate(pool, userId, lastSoilDate),
        hasLivestockActivitySignal(pool, userId),
        countFeedMixCostsInRange(pool, userId, today, today),
        fetchActivityDateSet(pool, userId, 90)
    ]);

    const activityStreak = computeActivityStreak(activityDates, today);
    const dailyChecklist = buildDailyChecklist({
        today,
        todayStats,
        lastSoilDate,
        lastActivityDate,
        lastRevenueDate,
        hasLivestockSignal,
        feedMixToday,
        activityStreak
    });

    const weekBounds = resolveWindowBounds('7d');
    const prevWeekBounds = previousPeriodBounds(weekBounds.start, weekBounds.end);
    const [
        thisWeekFinancials,
        lastWeekFinancials,
        weekActivityDates,
        weekSoilDates,
        weekFeedDates,
        weekRevenueDates,
        weekDayDetails
    ] = await Promise.all([
        buildPeriodFinancials(pool, userId, weekBounds.start, weekBounds.end),
        buildPeriodFinancials(pool, userId, prevWeekBounds.start, prevWeekBounds.end),
        fetchActivityDateSet(pool, userId, 7),
        fetchSoilDatesInRange(pool, userId, weekBounds.start, weekBounds.end),
        fetchFeedMixDatesInRange(pool, userId, weekBounds.start, weekBounds.end),
        fetchRevenueDatesInRange(pool, userId, weekBounds.start, weekBounds.end),
        fetchWeekDayDetails(pool, userId, weekBounds.start, weekBounds.end)
    ]);

    const weeklySummary = buildWeeklySummary({
        today,
        weekStart: weekBounds.start,
        weekEnd: weekBounds.end,
        activityDates: weekActivityDates,
        soilDates: weekSoilDates,
        feedDates: weekFeedDates,
        revenueDates: weekRevenueDates,
        thisWeekFinancials,
        lastWeekFinancials,
        hasLivestockSignal,
        dayDetails: weekDayDetails
    });

    const listLimit = bounds.window === '30d' ? 30 : 20;

    const [recentCosts, recentRevenue, recentSoil, recentActions, largestDriver, latestRevenue] =
        await Promise.all([
            fetchRecentCosts(pool, userId, listLimit, bounds.start, bounds.end),
            fetchRecentRevenue(pool, userId, listLimit, bounds.start, bounds.end),
            fetchRecentSoilDb(pool, userId, listLimit, bounds.start, bounds.end),
            Promise.resolve(listActionsInRange(userId, bounds.start, bounds.end, listLimit)),
            fetchLargestCostDriver(pool, userId, bounds.start, bounds.end),
            fetchLatestRevenue(pool, userId)
        ]);

    const recentActivity = [...recentCosts, ...recentRevenue, ...recentSoil, ...recentActions]
        .filter((item) => itemInRange(item.timestamp, bounds.start, bounds.end))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 25);

    const trends = {
        revenueChangePct: pctChange(periodFinancials.revenue, previousPeriod.revenue),
        costsChangePct: pctChange(periodFinancials.costs, previousPeriod.costs),
        netChangePct: pctChange(periodFinancials.net, previousPeriod.net)
    };

    const monthTrends = await (async () => {
        const prev = previousMonthBounds();
        const costs = await sumCostsInRange(pool, userId, prev.start, prev.end);
        const revenue = await sumRevenueInRange(pool, userId, prev.start, prev.end);
        return {
            revenueChangePct: pctChange(monthFinancials.revenue, revenue),
            costsChangePct: pctChange(monthFinancials.costs, costs),
            netChangePct: pctChange(monthFinancials.net, roundMoney(revenue - costs))
        };
    })();

    const attention = buildAttention({
        periodStats,
        periodLabel: bounds.label,
        monthFinancials,
        trends: monthTrends,
        lastSoilDate
    });

    const weatherRisk = await farmWeatherRisk.getWeatherRisk(pool, userId, {
        apiKey: process.env.WEATHER_API_KEY
    });

    return {
        window: bounds.window,
        windowLabel: bounds.label,
        periodStart: bounds.start,
        periodEnd: bounds.end,
        today: today,
        periodStats,
        financials: periodFinancials,
        monthFinancials,
        previousPeriod: {
            periodStart: prevBounds.start,
            periodEnd: prevBounds.end,
            revenue: previousPeriod.revenue,
            costs: previousPeriod.costs,
            net: previousPeriod.net
        },
        trends,
        largestCostDriver: largestDriver,
        latestRevenue: latestRevenue,
        recentActivity,
        financialBreakdown: {
            costs: recentCosts,
            revenue: recentRevenue,
            totals: {
                costs: periodFinancials.costs,
                revenue: periodFinancials.revenue,
                net: periodFinancials.net
            }
        },
        attention,
        dailyChecklist,
        weeklySummary,
        weatherRisk,
        generatedAt: new Date().toISOString()
    };
}

module.exports = {
    getCommandCenter,
    buildDailyChecklist,
    buildWeeklySummary,
    netDirection,
    enumerateDateRange,
    computeActivityStreak,
    normalizeWindow,
    resolveWindowBounds,
    todayUtc,
    weekBoundsUtc
};

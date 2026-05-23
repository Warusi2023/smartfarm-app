/**
 * Farm command center aggregate (W4-01) — today/week counts, recent activity, financial insight.
 */

const cropStore = require('./cropRecommendationStore');
const soilTestsStore = require('./soilTestsStore');
const farmSummaryFinancials = require('./farmSummaryFinancials');

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
        generatedAt: new Date().toISOString()
    };
}

module.exports = {
    getCommandCenter,
    normalizeWindow,
    resolveWindowBounds,
    todayUtc,
    weekBoundsUtc
};

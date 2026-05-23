/**
 * Farm financial summary — sums farmcosts + farmrevenue (W2-07 / W2-08).
 */

const { ServiceUnavailableError } = require('../utils/errors');

/**
 * @param {string} period
 * @returns {{ period: string, start: string, end: string }}
 */
function resolvePeriodBounds(period) {
    const p = String(period || 'month').toLowerCase();
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = now.getUTCMonth();

    if (p === 'month' || p === 'current-month') {
        const start = new Date(Date.UTC(y, m, 1));
        const end = new Date(Date.UTC(y, m + 1, 0));
        return {
            period: 'month',
            start: start.toISOString().slice(0, 10),
            end: end.toISOString().slice(0, 10)
        };
    }

    const start = new Date(Date.UTC(y, m, 1));
    const end = new Date(Date.UTC(y, m + 1, 0));
    return {
        period: 'month',
        start: start.toISOString().slice(0, 10),
        end: end.toISOString().slice(0, 10)
    };
}

function roundMoney(n) {
    return Math.round(Number(n) * 100) / 100;
}

/**
 * @param {import('pg').Pool|null} pool
 * @param {string} userId
 * @param {object} [opts]
 * @param {string} [opts.period]
 * @param {string|null} [opts.farmId]
 */
async function getFinancialSummary(pool, userId, opts) {
    if (!pool) {
        throw new ServiceUnavailableError('Database connection not available');
    }

    const bounds = resolvePeriodBounds(opts && opts.period);
    const farmId = opts && opts.farmId ? String(opts.farmId) : null;

    const params = [userId, bounds.start, bounds.end];
    let farmFilterCosts = '';
    let farmFilterRevenue = '';

    if (farmId) {
        params.push(farmId);
        farmFilterCosts = ` AND (farm_id IS NULL OR farm_id = $4)`;
        farmFilterRevenue = ` AND (farm_id IS NULL OR farm_id = $4)`;
    }

    const costsSql = `
        SELECT COALESCE(SUM(amount), 0)::numeric AS total, COUNT(*)::int AS cnt
        FROM farmcosts
        WHERE user_id = $1
          AND created_at::date >= $2::date
          AND created_at::date <= $3::date
          ${farmFilterCosts}`;

    const revenueSql = `
        SELECT COALESCE(SUM(amount), 0)::numeric AS total, COUNT(*)::int AS cnt
        FROM farmrevenue
        WHERE user_id = $1
          AND date >= $2::date
          AND date <= $3::date
          ${farmFilterRevenue}`;

    const [costsRes, revenueRes] = await Promise.all([
        pool.query(costsSql, params),
        pool.query(revenueSql, params)
    ]);

    const costs = roundMoney(costsRes.rows[0].total);
    const revenue = roundMoney(revenueRes.rows[0].total);
    const net = roundMoney(revenue - costs);
    const costCount = costsRes.rows[0].cnt;
    const revenueCount = revenueRes.rows[0].cnt;

    let helperText = null;
    if (revenueCount === 0 && costCount === 0) {
        helperText = 'No revenue or costs logged this month yet. Add a sale below or log costs from other tools.';
    } else if (revenueCount === 0) {
        helperText = 'No revenue logged this month. Costs shown are from your saved farm expenses.';
    } else if (costCount === 0) {
        helperText = 'No costs logged this month yet. Revenue entries you add will show here.';
    }

    return {
        period: bounds.period,
        periodStart: bounds.start,
        periodEnd: bounds.end,
        revenue: revenue,
        costs: costs,
        net: net,
        revenueCount: revenueCount,
        costCount: costCount,
        helperText: helperText
    };
}

module.exports = {
    resolvePeriodBounds,
    getFinancialSummary
};

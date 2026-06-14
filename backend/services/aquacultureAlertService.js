/**
 * Rule-based aquaculture alerts (Phase 1 — no AI, no sensors).
 */

const SEVERITY_RANK = {
    ok: 0,
    info: 1,
    warning: 2,
    critical: 3
};

/**
 * @param {object[]} alerts
 * @returns {'ok'|'info'|'warning'|'critical'}
 */
function computeOverallStatus(alerts) {
    if (!alerts || alerts.length === 0) {
        return 'ok';
    }
    let max = 0;
    let status = 'ok';
    for (const a of alerts) {
        const rank = SEVERITY_RANK[a.severity] || 0;
        if (rank > max) {
            max = rank;
            status = a.severity;
        }
    }
    return status;
}

/**
 * @param {object} input
 * @param {object|null} input.log - today's log row (camelCase or snake_case)
 * @param {string} input.species - tilapia | shrimp | other
 * @param {boolean} input.hasLogToday
 * @returns {{ alerts: object[], overallStatus: string }}
 */
function evaluateAlerts({ log, species, hasLogToday }) {
    const alerts = [];

    if (!hasLogToday) {
        alerts.push({
            code: 'LOG_DUE',
            severity: 'info',
            message: 'No daily log recorded for today. Log feed, water quality, and mortality.'
        });
    }

    if (!log) {
        return { alerts, overallStatus: computeOverallStatus(alerts) };
    }

    const doMg = num(log.dissolvedOxygenMgl ?? log.dissolved_oxygen_mgl);
    const ph = num(log.ph);
    const temp = num(log.waterTempC ?? log.water_temp_c);
    const mortality = intVal(log.mortalityCount ?? log.mortality_count);
    const stock = intVal(log.estimatedStockCount ?? log.estimated_stock_count);
    const sp = String(species || '').toLowerCase();

    if (doMg != null) {
        if (doMg < 4) {
            alerts.push({
                code: 'LOW_DO',
                severity: 'critical',
                message: `Dissolved oxygen is ${doMg} mg/L — aerate immediately.`
            });
        } else if (doMg <= 5) {
            alerts.push({
                code: 'LOW_DO',
                severity: 'warning',
                message: `Dissolved oxygen is ${doMg} mg/L — monitor closely and increase aeration if needed.`
            });
        }
    }

    if (ph != null && (ph < 6.5 || ph > 8.5)) {
        alerts.push({
            code: 'PH_OUT_OF_RANGE',
            severity: 'warning',
            message: `pH is ${ph} — acceptable range is 6.5–8.5.`
        });
    }

    if (temp != null && sp === 'tilapia') {
        if (temp < 24 || temp > 32) {
            alerts.push({
                code: 'TEMP_OUT_OF_RANGE',
                severity: 'warning',
                message: `Water temperature is ${temp}°C — tilapia target range is 24–32°C.`
            });
        }
    }

    if (temp != null && sp === 'shrimp') {
        if (temp < 26 || temp > 34) {
            alerts.push({
                code: 'TEMP_OUT_OF_RANGE',
                severity: 'warning',
                message: `Water temperature is ${temp}°C — shrimp target range is 26–34°C.`
            });
        }
    }

    if (stock != null && stock > 0 && mortality != null && mortality >= 0) {
        const rate = mortality / stock;
        if (rate > 0.05) {
            alerts.push({
                code: 'HIGH_MORTALITY',
                severity: 'critical',
                message: `Mortality is ${mortality} (${Math.round(rate * 1000) / 10}% of stock) — investigate immediately.`
            });
        } else if (rate > 0.02) {
            alerts.push({
                code: 'HIGH_MORTALITY',
                severity: 'warning',
                message: `Mortality is ${mortality} (${Math.round(rate * 1000) / 10}% of stock) — monitor and check water quality.`
            });
        }
    }

    return { alerts, overallStatus: computeOverallStatus(alerts) };
}

function num(v) {
    if (v == null || v === '') {
        return null;
    }
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

function intVal(v) {
    if (v == null || v === '') {
        return null;
    }
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : null;
}

module.exports = {
    evaluateAlerts,
    computeOverallStatus,
    SEVERITY_RANK
};

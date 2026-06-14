/**
 * Deterministic weather hazard rules (v1).
 * Each hazard evaluated independently — multiple can be active.
 */

const TH = require('../config/hazardThresholds');

const SEVERITY_RANK = { none: 0, watch: 1, warning: 2, severe: 3 };

/**
 * @param {object} snapshot normalized weather snapshot
 * @param {object} farmContext { hasCrops, hasLivestock }
 * @returns {object[]} hazard blocks (severity !== none only)
 */
function evaluateWeatherHazards(snapshot, farmContext) {
    if (!snapshot || !snapshot.available) {
        return [];
    }
    const ctx = farmContext || { hasCrops: true, hasLivestock: true };
    const today = snapshot.today || {};
    const tomorrow = snapshot.tomorrow || {};
    const current = snapshot.current || {};

    const hazards = [
        evaluateHeat(today, tomorrow, current, ctx),
        evaluateCold(today, tomorrow, ctx),
        evaluateFlood(today, tomorrow, ctx),
        evaluateWind(today, tomorrow, ctx),
        evaluateDrought(snapshot, today, tomorrow, ctx)
    ].filter((h) => h && h.severity !== 'none');

    return hazards.sort((a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity]);
}

function defaultAffects(ctx) {
    const hasAq = !!ctx.hasAquaculture;
    const aqOnly = hasAq && !ctx.hasCrops && !ctx.hasLivestock;
    return {
        crops: !aqOnly && ctx.hasCrops !== false,
        livestock: !aqOnly && ctx.hasLivestock !== false,
        infrastructure: true,
        water: true
    };
}

function evaluateHeat(today, tomorrow, current, ctx) {
    const type = 'heat';
    const triggers = [];
    const todayMax = today.maxTemp != null ? today.maxTemp : current.temp;
    const tomorrowMax = tomorrow.maxTemp;
    const temps = [todayMax, tomorrowMax].filter((t) => t != null);

    let severity = 'none';
    if (temps.some((t) => t >= TH.heat.severeMaxTempC)) {
        severity = 'severe';
        triggers.push(`Max temp ≥ ${TH.heat.severeMaxTempC}°C`);
    } else if (temps.filter((t) => t >= TH.heat.warningMaxTempC).length >= TH.heat.persistenceDaysForSevere) {
        severity = 'severe';
        triggers.push(`High heat on ${TH.heat.persistenceDaysForSevere}+ days`);
    } else if (temps.some((t) => t >= TH.heat.warningMaxTempC)) {
        severity = 'warning';
        triggers.push(`Max temp ≥ ${TH.heat.warningMaxTempC}°C`);
    } else if (temps.some((t) => t >= TH.heat.watchMaxTempC)) {
        severity = 'watch';
        triggers.push(`Max temp ≥ ${TH.heat.watchMaxTempC}°C`);
    }

    return hazardBlock(type, severity, triggers, ctx, {
        title: severity === 'none' ? 'Heat stress' : heatTitle(severity),
        reason: heatReason(severity, temps)
    });
}

function heatTitle(severity) {
    if (severity === 'severe') return 'Severe heat stress likely';
    if (severity === 'warning') return 'Heat stress warning';
    if (severity === 'watch') return 'Heat stress watch';
    return 'Heat stress';
}

function heatReason(severity, temps) {
    const max = temps.length ? Math.max(...temps) : null;
    if (severity === 'none') return 'Temperatures within normal range.';
    return max != null
        ? `Forecast highs up to ${max}°C — livestock and crops may need extra water and shade.`
        : 'Elevated temperatures expected.';
}

function evaluateCold(today, tomorrow, ctx) {
    const type = 'cold';
    const triggers = [];
    const mins = [today.minTemp, tomorrow.minTemp].filter((t) => t != null);

    let severity = 'none';
    if (mins.some((t) => t <= TH.cold.severeMinTempC)) {
        severity = 'severe';
        triggers.push(`Min temp ≤ ${TH.cold.severeMinTempC}°C (hard frost)`);
    } else if (mins.some((t) => t <= TH.cold.warningMinTempC)) {
        severity = 'warning';
        triggers.push(`Min temp ≤ ${TH.cold.warningMinTempC}°C (frost risk)`);
    } else if (mins.some((t) => t <= TH.cold.watchMinTempC)) {
        severity = 'watch';
        triggers.push(`Min temp ≤ ${TH.cold.watchMinTempC}°C`);
    }

    return hazardBlock(type, severity, triggers, ctx, {
        title: severity === 'none' ? 'Cold / frost' : coldTitle(severity),
        reason: coldReason(severity, mins)
    });
}

function coldTitle(severity) {
    if (severity === 'severe') return 'Hard frost / severe cold';
    if (severity === 'warning') return 'Frost warning';
    if (severity === 'watch') return 'Cold stress watch';
    return 'Cold / frost';
}

function coldReason(severity, mins) {
    const min = mins.length ? Math.min(...mins) : null;
    if (severity === 'none') return 'No significant cold stress expected.';
    return min != null
        ? `Overnight lows near ${min}°C — protect seedlings and vulnerable animals.`
        : 'Cold overnight temperatures expected.';
}

function evaluateFlood(today, tomorrow, ctx) {
    const type = 'flood';
    const triggers = [];
    const rainToday = today.totalRainMm || 0;
    const rainTomorrow = tomorrow.totalRainMm || 0;
    const maxRain = Math.max(rainToday, rainTomorrow);
    const hasHeavyRain = today.hasRain || tomorrow.hasRain;

    let severity = 'none';
    if (maxRain >= TH.flood.severeRainMm || (hasHeavyRain && maxRain >= TH.flood.warningRainMm)) {
        severity = maxRain >= TH.flood.severeRainMm ? 'severe' : 'warning';
        triggers.push(`${maxRain}mm rain forecast in 24–48h`);
    } else if (maxRain >= TH.flood.warningRainMm) {
        severity = 'warning';
        triggers.push(`Rain ≥ ${TH.flood.warningRainMm}mm`);
    } else if (maxRain >= TH.flood.watchRainMm || (hasHeavyRain && maxRain >= 8)) {
        severity = 'watch';
        triggers.push(`Rain ≥ ${TH.flood.watchRainMm}mm or sustained wet spell`);
    }

    return hazardBlock(type, severity, triggers, ctx, {
        title: severity === 'none' ? 'Heavy rain / flood' : floodTitle(severity),
        reason: floodReason(severity, maxRain)
    });
}

function floodTitle(severity) {
    if (severity === 'severe') return 'Severe flood / heavy rain risk';
    if (severity === 'warning') return 'Flood warning — heavy rain';
    if (severity === 'watch') return 'Heavy rain watch';
    return 'Heavy rain / flood';
}

function floodReason(severity, maxRain) {
    if (severity === 'none') return 'No significant flood risk from rainfall.';
    return `Up to ${maxRain}mm rain expected — low areas, drains, and stored goods may be at risk.`;
}

function evaluateWind(today, tomorrow, ctx) {
    const type = 'wind';
    const triggers = [];
    const windToday = today.maxWindKmh || 0;
    const windTomorrow = tomorrow.maxWindKmh || 0;
    const maxWind = Math.max(windToday, windTomorrow);
    const storm = today.hasThunderstorm || tomorrow.hasThunderstorm;

    let severity = 'none';
    if (storm || maxWind >= TH.wind.severeWindKmh) {
        severity = 'severe';
        triggers.push(storm ? 'Thunderstorm in forecast' : `Wind ≥ ${TH.wind.severeWindKmh} km/h`);
    } else if (maxWind >= TH.wind.warningWindKmh) {
        severity = 'warning';
        triggers.push(`Wind ≥ ${TH.wind.warningWindKmh} km/h`);
    } else if (maxWind >= TH.wind.watchWindKmh) {
        severity = 'watch';
        triggers.push(`Wind ≥ ${TH.wind.watchWindKmh} km/h`);
    }

    return hazardBlock(type, severity, triggers, ctx, {
        title: severity === 'none' ? 'Wind / storm' : windTitle(severity, storm),
        reason: windReason(severity, maxWind, storm)
    });
}

function windTitle(severity, storm) {
    if (severity === 'severe') return storm ? 'Storm / cyclone conditions possible' : 'Severe wind warning';
    if (severity === 'warning') return 'High wind warning';
    if (severity === 'watch') return 'Wind watch';
    return 'Wind / storm';
}

function windReason(severity, maxWind, storm) {
    if (severity === 'none') return 'Wind speeds look manageable.';
    if (storm) return 'Storms or strong gusts expected — secure structures and shelter livestock.';
    return `Winds up to ${maxWind} km/h — secure equipment and check animal shelter.`;
}

function evaluateDrought(snapshot, today, tomorrow, ctx) {
    const type = 'drought';
    const triggers = [];
    const dryWeek = snapshot.dryWeek === true;
    const todayDry = (today.totalRainMm || 0) < TH.drought.dryDayRainMaxMm && !today.hasRain;
    const tomorrowDry =
        tomorrow.totalRainMm != null
            ? tomorrow.totalRainMm < TH.drought.dryDayRainMaxMm && !tomorrow.hasRain
            : true;
    const todayHot = (today.maxTemp || 0) >= TH.drought.watchMaxTempC;

    let severity = 'none';
    if (dryWeek && todayHot && (today.maxTemp || 0) >= TH.drought.warningMaxTempC) {
        severity = 'severe';
        triggers.push('Extended dry spell with high heat');
    } else if (dryWeek) {
        severity = 'warning';
        triggers.push(`${TH.drought.dryWeekMinDays}+ dry days in forecast week`);
    } else if (todayDry && tomorrowDry && todayHot) {
        severity = 'watch';
        triggers.push('Dry pattern with elevated temperature');
    }

    return hazardBlock(type, severity, triggers, ctx, {
        title: severity === 'none' ? 'Drought / dry spell' : droughtTitle(severity),
        reason: droughtReason(severity, dryWeek)
    });
}

function droughtTitle(severity) {
    if (severity === 'severe') return 'Severe drought stress';
    if (severity === 'warning') return 'Prolonged dry spell';
    if (severity === 'watch') return 'Dry spell watch';
    return 'Drought / dry spell';
}

function droughtReason(severity, dryWeek) {
    if (severity === 'none') return 'Adequate moisture expected in the near forecast.';
    return dryWeek
        ? 'Little rain expected over the coming week — plan water and grazing carefully.'
        : 'Dry conditions building — monitor water storage and irrigation needs.';
}

function hazardBlock(type, severity, triggers, ctx, copy) {
    const affects = defaultAffects(ctx);
    if (type === 'flood') {
        affects.infrastructure = true;
        affects.water = true;
    }
    return {
        type,
        severity,
        title: copy.title,
        reason: copy.reason,
        triggers,
        affects
    };
}

function maxSeverity(hazards) {
    let max = 'none';
    let rank = 0;
    for (const h of hazards) {
        const r = SEVERITY_RANK[h.severity] || 0;
        if (r > rank) {
            rank = r;
            max = h.severity;
        }
    }
    return max;
}

module.exports = {
    evaluateWeatherHazards,
    maxSeverity,
    SEVERITY_RANK
};

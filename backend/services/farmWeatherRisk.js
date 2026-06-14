/**
 * W5-03 — Deterministic weather risk / opportunity for command center.
 * Uses OpenWeather when WEATHER_API_KEY + farm coordinates exist; otherwise clear fallback.
 */

const axios = require('axios');
const logger = require('../utils/logger');

/** @typedef {'risk'|'opportunity'|'calm'|'unavailable'} WeatherRiskState */

/**
 * @param {string} iso
 * @param {number} addDays
 */
function addDaysUtc(iso, addDays) {
    const d = new Date(iso + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + addDays);
    return d.toISOString().slice(0, 10);
}

function todayUtc() {
    return new Date().toISOString().slice(0, 10);
}

function forecastDayKey(unixDt) {
    return new Date(unixDt * 1000).toISOString().slice(0, 10);
}

/**
 * Aggregate OpenWeather 3h forecast slots into per-day metrics.
 * @param {object[]} list
 * @param {string} dayKey YYYY-MM-DD
 */
function summarizeForecastDay(list, dayKey) {
    const slots = (list || []).filter((f) => forecastDayKey(f.dt) === dayKey);
    if (!slots.length) {
        return null;
    }
    let maxTemp = -Infinity;
    let minTemp = Infinity;
    let maxWindKmh = 0;
    let totalRainMm = 0;
    let hasThunderstorm = false;
    let hasRain = false;
    const descriptions = [];

    slots.forEach((f) => {
        const main = f.main || {};
        maxTemp = Math.max(maxTemp, main.temp_max != null ? main.temp_max : main.temp);
        minTemp = Math.min(minTemp, main.temp_min != null ? main.temp_min : main.temp);
        if (f.wind && f.wind.speed != null) {
            maxWindKmh = Math.max(maxWindKmh, f.wind.speed * 3.6);
        }
        if (f.rain && f.rain['3h']) {
            totalRainMm += Number(f.rain['3h']) || 0;
            hasRain = true;
        }
        const w = f.weather && f.weather[0];
        if (w) {
            descriptions.push(w.main);
            if (w.main === 'Thunderstorm') {
                hasThunderstorm = true;
            }
        }
    });

    return {
        maxTemp: Number.isFinite(maxTemp) ? Math.round(maxTemp) : null,
        minTemp: Number.isFinite(minTemp) ? Math.round(minTemp) : null,
        maxWindKmh: Math.round(maxWindKmh),
        totalRainMm: Math.round(totalRainMm * 10) / 10,
        hasRain,
        hasThunderstorm,
        description: descriptions[0] || ''
    };
}

/**
 * Normalize current + forecast API payloads for rule evaluation.
 * @param {object|null} current
 * @param {object|null} forecastData OpenWeather forecast JSON
 */
function normalizeWeatherSnapshot(current, forecastData) {
    const today = todayUtc();
    const tomorrow = addDaysUtc(today, 1);
    const list = forecastData && forecastData.list ? forecastData.list : [];

    const currentBlock = current
        ? {
              temp: Math.round(current.main?.temp ?? current.temperature ?? 0),
              windKmh: Math.round((current.wind?.speed ?? 0) * 3.6),
              description:
                  current.weather?.[0]?.description || current.description || ''
          }
        : null;

    return {
        available: true,
        today: summarizeForecastDay(list, today) || currentBlockToDay(currentBlock),
        tomorrow: summarizeForecastDay(list, tomorrow),
        current: currentBlock
    };
}

function currentBlockToDay(currentBlock) {
    if (!currentBlock) {
        return null;
    }
    return {
        maxTemp: currentBlock.temp,
        minTemp: currentBlock.temp,
        maxWindKmh: currentBlock.windKmh,
        totalRainMm: 0,
        hasRain: false,
        hasThunderstorm: /thunder/i.test(currentBlock.description),
        description: currentBlock.description
    };
}

/**
 * Deterministic rules — first matching rule wins (priority order).
 * @param {object} snapshot from normalizeWeatherSnapshot
 * @returns {object} weatherRisk block
 */
function buildWeatherRiskFromSnapshot(snapshot) {
    if (!snapshot || !snapshot.available) {
        return unavailableWeatherRisk('Weather data is unavailable.');
    }

    const today = snapshot.today || {};
    const tomorrow = snapshot.tomorrow || {};
    const current = snapshot.current || {};

    const todayWind = today.maxWindKmh || current.windKmh || 0;
    const tomorrowWind = tomorrow.maxWindKmh || 0;
    const todayTemp = today.maxTemp != null ? today.maxTemp : current.temp;
    const tomorrowTempMax = tomorrow.maxTemp;
    const tomorrowTempMin = tomorrow.minTemp;
    const tomorrowRain = tomorrow.totalRainMm || 0;

    if (
        today.hasThunderstorm ||
        tomorrow.hasThunderstorm ||
        todayWind >= 50 ||
        tomorrowWind >= 50
    ) {
        return {
            state: 'risk',
            summary: tomorrow.hasThunderstorm ? 'Storms possible tomorrow' : 'High winds expected',
            recommendation:
                'Secure equipment, check greenhouse covers, and postpone exposed field work if needed.',
            ruleId: 'wind_storm',
            action: { label: 'Review tasks', target: 'today-on-farm' },
            source: 'live',
            conditions: conditionLabels(snapshot)
        };
    }

    if (
        (tomorrowTempMin != null && tomorrowTempMin <= 2) ||
        (today.minTemp != null && today.minTemp <= 2)
    ) {
        return {
            state: 'risk',
            summary: 'Frost risk',
            recommendation: 'Protect sensitive crops and consider delaying transplanting.',
            ruleId: 'frost',
            action: { label: 'Log crop action', target: 'crop-action' },
            source: 'live',
            conditions: conditionLabels(snapshot)
        };
    }

    if ((todayTemp != null && todayTemp >= 35) || (tomorrowTempMax != null && tomorrowTempMax >= 35)) {
        const when = todayTemp >= 35 && tomorrowTempMax >= 35 ? 'today and tomorrow' : todayTemp >= 35 ? 'today' : 'tomorrow';
        return {
            state: 'risk',
            summary: `High heat ${when}`,
            recommendation: 'Review livestock water and feed; increase shade and irrigation where possible.',
            ruleId: 'heat',
            action: { label: 'Review feed costs', target: 'feed-mix-cost' },
            source: 'live',
            conditions: conditionLabels(snapshot)
        };
    }

    if (tomorrowRain >= 8 || (tomorrow.hasRain && tomorrowRain >= 3)) {
        return {
            state: 'opportunity',
            summary: 'Rain tomorrow',
            recommendation: 'Good window for soil tests or field work today before wet weather.',
            ruleId: 'rain_tomorrow',
            action: { label: 'Add soil test', target: 'soil-test' },
            source: 'live',
            conditions: conditionLabels(snapshot)
        };
    }

    if (
        tomorrow.totalRainMm === 0 &&
        !tomorrow.hasRain &&
        today.totalRainMm === 0 &&
        !today.hasRain &&
        snapshot.dryWeek === true
    ) {
        return {
            state: 'opportunity',
            summary: 'Dry stretch ahead',
            recommendation: 'Plan irrigation and monitor livestock water if conditions stay dry.',
            ruleId: 'dry_stretch',
            action: { label: 'Review tasks', target: 'today-on-farm' },
            source: 'live',
            conditions: conditionLabels(snapshot)
        };
    }

    const todayDesc = today.description || current.description || 'clear';
    return {
        state: 'calm',
        summary: `Weather looks fine (${todayDesc})`,
        recommendation: 'Weather looks fine for regular operations.',
        ruleId: 'calm',
        action: null,
        source: 'live',
        conditions: conditionLabels(snapshot)
    };
}

function conditionLabels(snapshot) {
    const parts = [];
    if (snapshot.current && snapshot.current.temp != null) {
        parts.push(`Now ${snapshot.current.temp}°C`);
    }
    if (snapshot.tomorrow && snapshot.tomorrow.maxTemp != null) {
        parts.push(`Tomorrow up to ${snapshot.tomorrow.maxTemp}°C`);
    }
    if (snapshot.tomorrow && snapshot.tomorrow.totalRainMm > 0) {
        parts.push(`${snapshot.tomorrow.totalRainMm}mm rain`);
    }
    return parts.join(' · ') || null;
}

function unavailableWeatherRisk(message) {
    return {
        state: 'unavailable',
        summary: 'Weather unavailable',
        recommendation: message || 'Weather data is not available right now.',
        ruleId: 'unavailable',
        action: null,
        source: 'none',
        conditions: null
    };
}

/**
 * @param {import('pg').Pool} pool
 * @param {string} userId
 */
async function fetchUserFarmLocation(pool, userId) {
    if (!pool) {
        return null;
    }
    try {
        const res = await pool.query(
            `SELECT latitude, longitude, location, name
             FROM farms
             WHERE user_id = $1 AND is_active = TRUE
               AND latitude IS NOT NULL AND longitude IS NOT NULL
             ORDER BY updated_at DESC NULLS LAST, created_at DESC
             LIMIT 1`,
            [userId]
        );
        if (!res.rows[0]) {
            return null;
        }
        const row = res.rows[0];
        return {
            lat: parseFloat(row.latitude),
            lng: parseFloat(row.longitude),
            name: row.name || row.location || 'Farm'
        };
    } catch (err) {
        logger.warn('farmWeatherRisk: could not load farm location', { userId, err: err.message });
        return null;
    }
}

/**
 * @param {string} apiKey
 * @param {number} lat
 * @param {number} lng
 */
async function fetchWeatherSnapshot(apiKey, lat, lng) {
    if (!apiKey) {
        return null;
    }
    try {
        const [currentRes, forecastRes] = await Promise.all([
            axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: { lat, lon: lng, appid: apiKey, units: 'metric' },
                timeout: 8000
            }),
            axios.get('https://api.openweathermap.org/data/2.5/forecast', {
                params: { lat, lon: lng, appid: apiKey, units: 'metric', cnt: 16 },
                timeout: 8000
            })
        ]);

        const snapshot = normalizeWeatherSnapshot(currentRes.data, forecastRes.data);
        const list = forecastRes.data.list || [];
        const today = todayUtc();
        let dryDays = 0;
        for (let i = 0; i < 7; i++) {
            const key = addDaysUtc(today, i);
            const day = summarizeForecastDay(list, key);
            if (day && day.totalRainMm < 5 && !day.hasRain) {
                dryDays += 1;
            }
        }
        snapshot.dryWeek = dryDays >= 6;
        return snapshot;
    } catch (err) {
        logger.warn('farmWeatherRisk: weather fetch failed', { lat, lng, err: err.message });
        return null;
    }
}

/**
 * @param {import('pg').Pool|null} pool
 * @param {string} userId
 * @param {{ apiKey?: string, demoSnapshot?: object }} [opts]
 */
async function getWeatherRisk(pool, userId, opts) {
    const ctx = await getWeatherContext(pool, userId, opts);
    return ctx.weatherRisk;
}

/**
 * Fetch snapshot + weatherRisk in one pass (shared by hazard assessment).
 * @param {import('pg').Pool|null} pool
 * @param {string} userId
 * @param {{ apiKey?: string, demoSnapshot?: object }} [opts]
 */
async function getWeatherContext(pool, userId, opts) {
    if (opts && opts.demoSnapshot) {
        const block = buildWeatherRiskFromSnapshot(opts.demoSnapshot);
        block.source = 'demo';
        return { snapshot: opts.demoSnapshot, weatherRisk: block, location: null };
    }

    const apiKey = (opts && opts.apiKey) || process.env.WEATHER_API_KEY;

    if (!pool) {
        const weatherRisk = unavailableWeatherRisk('Weather insights require a database connection.');
        return { snapshot: null, weatherRisk, location: null };
    }

    const location = await fetchUserFarmLocation(pool, userId);
    if (!location) {
        const weatherRisk = unavailableWeatherRisk(
            'Add farm coordinates on a farm profile to enable weather-aware suggestions.'
        );
        return { snapshot: null, weatherRisk, location: null };
    }

    if (!apiKey) {
        const weatherRisk = unavailableWeatherRisk('Weather service is not configured on the server.');
        return { snapshot: null, weatherRisk, location };
    }

    const snapshot = await fetchWeatherSnapshot(apiKey, location.lat, location.lng);
    if (!snapshot) {
        const weatherRisk = unavailableWeatherRisk('Weather data is temporarily unavailable. Try again later.');
        return { snapshot: null, weatherRisk, location };
    }

    return {
        snapshot,
        weatherRisk: buildWeatherRiskFromSnapshot(snapshot),
        location
    };
}

module.exports = {
    getWeatherRisk,
    getWeatherContext,
    buildWeatherRiskFromSnapshot,
    normalizeWeatherSnapshot,
    summarizeForecastDay,
    unavailableWeatherRisk,
    addDaysUtc,
    todayUtc
};

/**
 * W5-03 farm weather risk rules
 */
const farmWeatherRisk = require('../../services/farmWeatherRisk');

describe('farmWeatherRisk', () => {
    const baseSnapshot = {
        available: true,
        current: { temp: 22, windKmh: 12, description: 'clear sky' },
        today: {
            maxTemp: 24,
            minTemp: 18,
            maxWindKmh: 15,
            totalRainMm: 0,
            hasRain: false,
            hasThunderstorm: false,
            description: 'Clear'
        },
        tomorrow: {
            maxTemp: 26,
            minTemp: 19,
            maxWindKmh: 18,
            totalRainMm: 0,
            hasRain: false,
            hasThunderstorm: false,
            description: 'Clear'
        },
        dryWeek: false
    };

    it('returns calm for mild weather', () => {
        const risk = farmWeatherRisk.buildWeatherRiskFromSnapshot(baseSnapshot);
        expect(risk.state).toBe('calm');
        expect(risk.ruleId).toBe('calm');
        expect(risk.action).toBeNull();
    });

    it('returns opportunity when rain is forecast tomorrow', () => {
        const risk = farmWeatherRisk.buildWeatherRiskFromSnapshot({
            ...baseSnapshot,
            tomorrow: {
                ...baseSnapshot.tomorrow,
                totalRainMm: 12,
                hasRain: true,
                description: 'Rain'
            }
        });
        expect(risk.state).toBe('opportunity');
        expect(risk.ruleId).toBe('rain_tomorrow');
        expect(risk.action.target).toBe('soil-test');
    });

    it('returns risk for high heat', () => {
        const risk = farmWeatherRisk.buildWeatherRiskFromSnapshot({
            ...baseSnapshot,
            today: { ...baseSnapshot.today, maxTemp: 36 },
            current: { temp: 36, windKmh: 10, description: 'hot' }
        });
        expect(risk.state).toBe('risk');
        expect(risk.ruleId).toBe('heat');
        expect(risk.action.target).toBe('feed-mix-cost');
    });

    it('returns risk for strong wind', () => {
        const risk = farmWeatherRisk.buildWeatherRiskFromSnapshot({
            ...baseSnapshot,
            tomorrow: { ...baseSnapshot.tomorrow, maxWindKmh: 55 }
        });
        expect(risk.state).toBe('risk');
        expect(risk.ruleId).toBe('wind_storm');
    });

    it('returns unavailable when snapshot missing', () => {
        const risk = farmWeatherRisk.buildWeatherRiskFromSnapshot(null);
        expect(risk.state).toBe('unavailable');
    });
});

/**
 * Unit tests for SmartFarmWeatherDataAdapter — null/missing/normal payloads.
 */
const path = require('path');
const adapter = require(path.join(
    __dirname,
    '../../public/js/weather-data-adapter.js'
));

describe('SmartFarmWeatherDataAdapter.convertWeatherServiceData', () => {
    it('returns unavailable state for null weather data without throwing', () => {
        expect(() => adapter.convertWeatherServiceData(null)).not.toThrow();
        const result = adapter.convertWeatherServiceData(null);
        expect(result.status).toBe('unavailable');
        expect(result.location).toBe('Unknown');
        expect(result.forecast.next7Days).toEqual([]);
        expect(result.isRealData).toBe(false);
        expect(result.reason).toBe('null_weather_data');
    });

    it('returns unavailable state for undefined weather data', () => {
        const result = adapter.convertWeatherServiceData(undefined);
        expect(result.status).toBe('unavailable');
        expect(result.temperature).toBeNull();
    });

    it('returns unavailable when current observations are missing (location null safe)', () => {
        const result = adapter.convertWeatherServiceData({
            location: null,
            forecast: null,
            season: null,
            source: 'OpenWeatherMap'
        });
        expect(result.status).toBe('unavailable');
        expect(result.location).toBe('Unknown');
        expect(result.reason).toBe('missing_current');
    });

    it('returns loading state when marked loading without current', () => {
        const result = adapter.convertWeatherServiceData({ status: 'loading' });
        expect(result.status).toBe('loading');
        expect(result.location).toMatch(/Loading/i);
    });

    it('converts a normal WeatherService payload safely', () => {
        const result = adapter.convertWeatherServiceData({
            current: {
                temperature: 22,
                humidity: 60,
                rainfall: 2,
                windSpeed: 8,
                pressure: 1012,
                uvIndex: 5,
                cloudCover: 40,
                description: 'Cloudy'
            },
            forecast: [
                { day: 'Today', temp: 22, humidity: 60, rainfall: 2, windSpeed: 8, description: 'Cloudy' }
            ],
            season: 'Autumn',
            location: { name: 'Auckland' },
            source: 'OpenWeatherMap'
        });
        expect(result.status).toBe('ready');
        expect(result.temperature).toBe(22);
        expect(result.location).toBe('Auckland');
        expect(result.forecast.next7Days).toHaveLength(1);
        expect(result.forecast.next7Days[0].rain).toBe(2);
        expect(result.isRealData).toBe(true);
    });

    it('tolerates missing location.name and missing forecast array', () => {
        const result = adapter.convertWeatherServiceData({
            current: {
                temperature: 18,
                humidity: 70,
                rainfall: 0,
                windSpeed: 5,
                description: 'Clear'
            },
            forecast: undefined,
            location: {},
            season: 'Winter',
            source: 'demo'
        });
        expect(result.status).toBe('ready');
        expect(result.location).toBe('Unknown');
        expect(result.forecast.next7Days).toEqual([]);
        expect(result.isRealData).toBe(false);
    });
});

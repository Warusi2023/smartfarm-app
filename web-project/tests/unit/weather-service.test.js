/**
 * Unit Tests for WeatherService
 * Tests environment variable usage and API integration
 */

describe('WeatherService', () => {
    let weatherService;
    let mockFetch;

    beforeEach(() => {
        // Clear any existing instances
        if (window.weatherService) {
            window.weatherService = null;
        }

        // Mock fetch globally
        mockFetch = jest.fn();
        global.fetch = mockFetch;

        // Mock geolocation
        Object.defineProperty(global.navigator, 'geolocation', {
            value: {
                getCurrentPosition: jest.fn()
            },
            writable: true
        });

        // Mock window environment variables
        delete window.VITE_WEATHER_API_KEY;
        delete window.VITE_OPENWEATHER_API_KEY;
        delete window.NEXT_PUBLIC_WEATHER_API_KEY;
        delete window.OPENWEATHER_API_KEY;
    });

    afterEach(() => {
        jest.restoreAllMocks();
        if (window.weatherService) {
            window.weatherService = null;
        }
    });

    describe('Environment Variable Handling', () => {
        test('should use VITE_WEATHER_API_KEY when available', () => {
            window.VITE_WEATHER_API_KEY = 'test-key-123';
            
            weatherService = new WeatherService();
            
            expect(weatherService.getWeatherApiKey()).toBe('test-key-123');
        });

        test('should fallback to VITE_OPENWEATHER_API_KEY', () => {
            window.VITE_OPENWEATHER_API_KEY = 'fallback-key-456';
            
            weatherService = new WeatherService();
            
            expect(weatherService.getWeatherApiKey()).toBe('fallback-key-456');
        });

        test('should fallback to NEXT_PUBLIC_WEATHER_API_KEY', () => {
            window.NEXT_PUBLIC_WEATHER_API_KEY = 'next-key-789';
            
            weatherService = new WeatherService();
            
            expect(weatherService.getWeatherApiKey()).toBe('next-key-789');
        });

        test('should fallback to OPENWEATHER_API_KEY', () => {
            window.OPENWEATHER_API_KEY = 'legacy-key-999';
            
            weatherService = new WeatherService();
            
            expect(weatherService.getWeatherApiKey()).toBe('legacy-key-999');
        });

        test('should prioritize VITE_WEATHER_API_KEY over other variables', () => {
            window.VITE_WEATHER_API_KEY = 'priority-key';
            window.VITE_OPENWEATHER_API_KEY = 'fallback-key';
            window.NEXT_PUBLIC_WEATHER_API_KEY = 'next-key';
            window.OPENWEATHER_API_KEY = 'legacy-key';
            
            weatherService = new WeatherService();
            
            expect(weatherService.getWeatherApiKey()).toBe('priority-key');
        });

        test('should return null when no API key is available', () => {
            weatherService = new WeatherService();
            
            expect(weatherService.getWeatherApiKey()).toBeNull();
        });

        test('should not crash when environment variables are undefined', () => {
            // Ensure all variables are undefined
            expect(() => {
                weatherService = new WeatherService();
            }).not.toThrow();
            
            expect(weatherService.getWeatherApiKey()).toBeNull();
        });
    });

    describe('API Integration', () => {
        beforeEach(() => {
            window.VITE_WEATHER_API_KEY = 'test-api-key';
        });

        test('should fetch weather data successfully', async () => {
            const mockWeatherData = {
                main: { temp: 25, humidity: 60 },
                weather: [{ description: 'sunny', icon: '01d' }],
                wind: { speed: 5 }
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockWeatherData
            });

            weatherService = new WeatherService();
            
            // Wait for initialization
            await new Promise(resolve => setTimeout(resolve, 100));

            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('api.openweathermap.org'),
                expect.any(Object)
            );
        });

        test('should handle API key missing gracefully', async () => {
            delete window.VITE_WEATHER_API_KEY;
            
            weatherService = new WeatherService();

            // Wait for initialization
            await new Promise(resolve => setTimeout(resolve, 100));

            // Should use demo data when no API key
            expect(weatherService.weatherData).toBeDefined();
            expect(mockFetch).not.toHaveBeenCalled();
        });

        test('should handle API failures gracefully', async () => {
            mockFetch.mockRejectedValue(new Error('API Error'));

            weatherService = new WeatherService();

            // Wait for initialization
            await new Promise(resolve => setTimeout(resolve, 100));

            // Should fallback to demo data
            expect(weatherService.weatherData).toBeDefined();
        });

        test('should not use process.env in frontend code', () => {
            // Mock process to ensure it's not used
            const originalProcess = global.process;
            global.process = {
                env: {
                    WEATHER_API_KEY: 'should-not-be-used'
                }
            };

            weatherService = new WeatherService();

            // Should not use process.env
            expect(weatherService.getWeatherApiKey()).toBeNull();

            // Restore process
            global.process = originalProcess;
        });
    });

    describe('Demo Data Fallback', () => {
        test('should provide demo data when API key is missing', () => {
            weatherService = new WeatherService();
            weatherService.useDemoData();

            expect(weatherService.weatherData).toBeDefined();
            expect(weatherService.weatherData.main).toBeDefined();
            expect(weatherService.weatherData.weather).toBeDefined();
        });

        test('should provide demo data when API fails', async () => {
            window.VITE_WEATHER_API_KEY = 'invalid-key';
            mockFetch.mockRejectedValue(new Error('API Error'));

            weatherService = new WeatherService();

            // Wait for initialization
            await new Promise(resolve => setTimeout(resolve, 100));

            expect(weatherService.weatherData).toBeDefined();
            expect(weatherService.weatherData.main.temp).toBeDefined();
        });
    });

    describe('Location Detection', () => {
        test('should handle geolocation success', (done) => {
            window.VITE_WEATHER_API_KEY = 'test-key';

            const mockPosition = {
                coords: {
                    latitude: 40.7128,
                    longitude: -74.0060
                }
            };

            navigator.geolocation.getCurrentPosition = jest.fn((success) => {
                success(mockPosition);
            });

            weatherService = new WeatherService();

            setTimeout(() => {
                expect(weatherService.currentLocation).toEqual({
                    lat: 40.7128,
                    lon: -74.0060
                });
                done();
            }, 100);
        });

        test('should handle geolocation failure', (done) => {
            window.VITE_WEATHER_API_KEY = 'test-key';

            navigator.geolocation.getCurrentPosition = jest.fn((success, error) => {
                error(new Error('Geolocation denied'));
            });

            weatherService = new WeatherService();

            setTimeout(() => {
                // Should still provide demo data
                expect(weatherService.weatherData).toBeDefined();
                done();
            }, 100);
        });
    });

    describe('Error Handling', () => {
        test('should not crash on initialization errors', () => {
            // Mock console.error to avoid noise in tests
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            // Force an error during initialization
            jest.spyOn(WeatherService.prototype, 'getWeatherApiKey').mockImplementation(() => {
                throw new Error('Test error');
            });

            expect(() => {
                weatherService = new WeatherService();
            }).not.toThrow();

            consoleSpy.mockRestore();
        });

        test('should log errors appropriately', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            weatherService = new WeatherService();
            weatherService.log('error', 'Test error message');

            expect(consoleSpy).toHaveBeenCalledWith('Test error message');

            consoleSpy.mockRestore();
        });
    });
});

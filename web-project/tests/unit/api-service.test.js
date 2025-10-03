/**
 * Unit Tests for API Service
 * Tests backend connectivity and error handling
 */

describe('SmartFarmAPIService', () => {
    let apiService;
    let mockFetch;

    beforeEach(() => {
        // Create fresh instance
        apiService = new SmartFarmAPIService();
        
        // Mock fetch globally
        mockFetch = jest.fn();
        global.fetch = mockFetch;
        
        // Mock localStorage
        const mockLocalStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn()
        };
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('API Connectivity', () => {
        test('should successfully fetch farms from Railway backend', async () => {
            const mockFarms = [
                { id: '1', name: 'Test Farm', location: 'Test Location' }
            ];
            
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: mockFarms })
            });

            const result = await apiService.getFarms();

            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockFarms);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/farms'),
                expect.objectContaining({
                    method: 'GET',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json'
                    })
                })
            );
        });

        test('should successfully fetch crops from Railway backend', async () => {
            const mockCrops = [
                { id: '1', name: 'Test Crop', type: 'Vegetable' }
            ];
            
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: mockCrops })
            });

            const result = await apiService.getCrops();

            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockCrops);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/crops'),
                expect.any(Object)
            );
        });

        test('should successfully fetch livestock from Railway backend', async () => {
            const mockLivestock = [
                { id: '1', name: 'Test Animal', species: 'Cattle' }
            ];
            
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: mockLivestock })
            });

            const result = await apiService.getLivestock();

            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockLivestock);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/livestock'),
                expect.any(Object)
            );
        });

        test('should successfully create livestock via API', async () => {
            const newLivestock = {
                species: 'Cattle',
                breed: 'Holstein',
                tag: 'TAG001',
                sex: 'female',
                birthDate: '2023-01-01',
                weight: 500
            };

            const createdLivestock = { id: '123', ...newLivestock };
            
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ data: createdLivestock })
            });

            const result = await apiService.createLivestock(newLivestock);

            expect(result.success).toBe(true);
            expect(result.data).toEqual(createdLivestock);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/livestock'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify(newLivestock)
                })
            );
        });
    });

    describe('Error Handling and Retry Logic', () => {
        test('should retry on network failure with exponential backoff', async () => {
            // Mock fetch to fail twice, then succeed
            mockFetch
                .mockRejectedValueOnce(new Error('Failed to fetch'))
                .mockRejectedValueOnce(new Error('Failed to fetch'))
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({ data: [] })
                });

            // Mock delay to make test faster
            jest.spyOn(apiService, 'delay').mockImplementation(() => Promise.resolve());

            const result = await apiService.getFarms();

            expect(result.success).toBe(true);
            expect(mockFetch).toHaveBeenCalledTimes(3);
            expect(apiService.delay).toHaveBeenCalledTimes(2);
        });

        test('should show server unavailable banner after max retries', async () => {
            // Mock fetch to always fail
            mockFetch.mockRejectedValue(new Error('Failed to fetch'));

            // Mock delay and banner display
            jest.spyOn(apiService, 'delay').mockImplementation(() => Promise.resolve());
            jest.spyOn(apiService, 'showServerUnavailableBanner').mockImplementation(() => {});

            const result = await apiService.getFarms();

            expect(result.success).toBe(false);
            expect(result.retries).toBe(3);
            expect(apiService.showServerUnavailableBanner).toHaveBeenCalled();
        });

        test('should handle HTTP 5xx errors with retry', async () => {
            mockFetch
                .mockResolvedValueOnce({
                    ok: false,
                    status: 500,
                    statusText: 'Internal Server Error'
                })
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({ data: [] })
                });

            jest.spyOn(apiService, 'delay').mockImplementation(() => Promise.resolve());

            const result = await apiService.getFarms();

            expect(result.success).toBe(true);
            expect(mockFetch).toHaveBeenCalledTimes(2);
        });

        test('should not retry on HTTP 4xx errors', async () => {
            mockFetch.mockResolvedValue({
                ok: false,
                status: 404,
                statusText: 'Not Found'
            });

            const result = await apiService.getFarms();

            expect(result.success).toBe(false);
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(result.error).toContain('HTTP 404');
        });
    });

    describe('Authentication', () => {
        test('should include auth token in requests when available', async () => {
            const mockToken = 'test-token-123';
            apiService.setAuthToken(mockToken);

            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => ({ data: [] })
            });

            await apiService.getFarms();

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'Authorization': `Bearer ${mockToken}`
                    })
                })
            );
        });

        test('should handle 401 authentication errors', async () => {
            const clearAuthTokenSpy = jest.spyOn(apiService, 'clearAuthToken');
            
            mockFetch.mockResolvedValue({
                ok: false,
                status: 401,
                statusText: 'Unauthorized'
            });

            const result = await apiService.getFarms();

            expect(result.success).toBe(false);
            expect(result.error).toContain('HTTP 401');
        });
    });

    describe('Server Unavailable Banner', () => {
        test('should create and display server unavailable banner', () => {
            // Mock DOM elements
            document.body.innerHTML = '';
            const appendChildSpy = jest.spyOn(document.body, 'insertBefore');

            apiService.showServerUnavailableBanner();

            expect(appendChildSpy).toHaveBeenCalled();
            
            const banner = document.getElementById('server-unavailable-banner');
            expect(banner).toBeTruthy();
            expect(banner.textContent).toContain('Server temporarily unavailable');
            expect(banner.style.background).toBe('rgb(220, 53, 69)'); // #dc3545
        });

        test('should remove existing banner before creating new one', () => {
            document.body.innerHTML = `
                <div id="server-unavailable-banner">Old banner</div>
                <div>Other content</div>
            `;

            apiService.showServerUnavailableBanner();

            const banners = document.querySelectorAll('#server-unavailable-banner');
            expect(banners).toHaveLength(1);
            expect(banners[0].textContent).toContain('Server temporarily unavailable');
        });
    });
});

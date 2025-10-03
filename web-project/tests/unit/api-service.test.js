/**
 * API Service Unit Tests
 * Tests API communication, error handling, and data validation
 */

describe('API Service Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('SmartFarmAPI', () => {
    test('should be defined', () => {
      expect(window.SmartFarmAPI).toBeDefined();
    });

    test('should have required methods', () => {
      expect(typeof window.SmartFarmAPI.getFarms).toBe('function');
      expect(typeof window.SmartFarmAPI.getCrops).toBe('function');
      expect(typeof window.SmartFarmAPI.getLivestock).toBe('function');
      expect(typeof window.SmartFarmAPI.createFarm).toBe('function');
      expect(typeof window.SmartFarmAPI.createCrop).toBe('function');
      expect(typeof window.SmartFarmAPI.createLivestock).toBe('function');
    });
  });

  describe('Farm API', () => {
    test('should fetch farms successfully', async () => {
      const mockFarms = [testUtils.createMockFarm()];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => testUtils.mockApiResponse(mockFarms),
      });

      const result = await window.SmartFarmAPI.getFarms();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/farms'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockFarms);
    });

    test('should handle farm fetch errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await window.SmartFarmAPI.getFarms();

      expect(result.success).toBe(false);
      expect(result.error).toContain('Network error');
    });

    test('should create farm successfully', async () => {
      const farmData = testUtils.createMockFarm();
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => testUtils.mockApiResponse(farmData),
      });

      const result = await window.SmartFarmAPI.createFarm(farmData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/farms'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(farmData),
        })
      );
      expect(result.success).toBe(true);
      expect(result.data).toEqual(farmData);
    });

    test('should validate farm data before creating', async () => {
      const invalidFarmData = { name: '' }; // Missing required fields

      const result = await window.SmartFarmAPI.createFarm(invalidFarmData);

      expect(result.success).toBe(false);
      expect(result.error).toContain('validation');
    });
  });

  describe('Crop API', () => {
    test('should fetch crops successfully', async () => {
      const mockCrops = [testUtils.createMockCrop()];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => testUtils.mockApiResponse(mockCrops),
      });

      const result = await window.SmartFarmAPI.getCrops();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/crops'),
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockCrops);
    });

    test('should create crop successfully', async () => {
      const cropData = testUtils.createMockCrop();
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => testUtils.mockApiResponse(cropData),
      });

      const result = await window.SmartFarmAPI.createCrop(cropData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/crops'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(cropData),
        })
      );
      expect(result.success).toBe(true);
      expect(result.data).toEqual(cropData);
    });

    test('should handle crop creation errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => testUtils.mockApiResponse(null, false),
      });

      const result = await window.SmartFarmAPI.createCrop({});

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Livestock API', () => {
    test('should fetch livestock successfully', async () => {
      const mockLivestock = [testUtils.createMockLivestock()];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => testUtils.mockApiResponse(mockLivestock),
      });

      const result = await window.SmartFarmAPI.getLivestock();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/livestock'),
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockLivestock);
    });

    test('should create livestock successfully', async () => {
      const livestockData = testUtils.createMockLivestock();
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => testUtils.mockApiResponse(livestockData),
      });

      const result = await window.SmartFarmAPI.createLivestock(livestockData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/livestock'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(livestockData),
        })
      );
      expect(result.success).toBe(true);
      expect(result.data).toEqual(livestockData);
    });

    test('should handle livestock creation validation', async () => {
      const invalidLivestockData = { species: '' }; // Missing required fields

      const result = await window.SmartFarmAPI.createLivestock(invalidLivestockData);

      expect(result.success).toBe(false);
      expect(result.error).toContain('validation');
    });
  });

  describe('Error Handling', () => {
    test('should handle network errors gracefully', async () => {
      fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

      const result = await window.SmartFarmAPI.getFarms();

      expect(result.success).toBe(false);
      expect(result.error).toContain('Failed to fetch');
    });

    test('should handle HTTP errors gracefully', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ error: 'Server error' }),
      });

      const result = await window.SmartFarmAPI.getFarms();

      expect(result.success).toBe(false);
      expect(result.error).toContain('Server error');
    });

    test('should handle JSON parsing errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      const result = await window.SmartFarmAPI.getFarms();

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid JSON');
    });

    test('should handle timeout errors', async () => {
      fetch.mockImplementationOnce(() =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 100)
        )
      );

      const result = await window.SmartFarmAPI.getFarms();

      expect(result.success).toBe(false);
      expect(result.error).toContain('Timeout');
    });
  });

  describe('Data Validation', () => {
    test('should validate farm data structure', async () => {
      const invalidFarmData = {
        name: 123, // Should be string
        location: null, // Should be string
        area: 'invalid', // Should be number
      };

      const result = await window.SmartFarmAPI.createFarm(invalidFarmData);

      expect(result.success).toBe(false);
      expect(result.error).toContain('validation');
    });

    test('should validate crop data structure', async () => {
      const invalidCropData = {
        name: '', // Should not be empty
        field: undefined, // Should be defined
        area: -1, // Should be positive
      };

      const result = await window.SmartFarmAPI.createCrop(invalidCropData);

      expect(result.success).toBe(false);
      expect(result.error).toContain('validation');
    });

    test('should validate livestock data structure', async () => {
      const invalidLivestockData = {
        species: '', // Should not be empty
        breed: null, // Should be defined
        count: 0, // Should be positive
      };

      const result = await window.SmartFarmAPI.createLivestock(invalidLivestockData);

      expect(result.success).toBe(false);
      expect(result.error).toContain('validation');
    });
  });

  describe('API Configuration', () => {
    test('should use correct API base URL', () => {
      expect(window.SmartFarmConfig).toBeDefined();
      expect(window.SmartFarmConfig.getApiUrl()).toBeDefined();
      expect(window.SmartFarmConfig.getApiUrl()).toContain('http');
    });

    test('should include proper headers', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => testUtils.mockApiResponse([]),
      });

      await window.SmartFarmAPI.getFarms();

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });
  });

  describe('Retry Logic', () => {
    test('should retry failed requests', async () => {
      fetch
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => testUtils.mockApiResponse([]),
        });

      const result = await window.SmartFarmAPI.getFarms();

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(result.success).toBe(true);
    });

    test('should give up after max retries', async () => {
      fetch.mockRejectedValue(new Error('Persistent network error'));

      const result = await window.SmartFarmAPI.getFarms();

      expect(fetch).toHaveBeenCalledTimes(3); // Initial + 2 retries
      expect(result.success).toBe(false);
      expect(result.error).toContain('Persistent network error');
    });
  });
});
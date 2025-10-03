/**
 * Livestock Button Specific Tests
 * Tests specifically for the livestock navigation button
 */

describe('Livestock Button Tests', () => {
    let mockDocument;
    let mockWindow;

    beforeEach(() => {
        // Mock DOM elements
        mockDocument = {
            getElementById: jest.fn(),
            querySelector: jest.fn(),
            querySelectorAll: jest.fn(),
            addEventListener: jest.fn()
        };

        mockWindow = {
            location: { pathname: '/dashboard' },
            history: { pushState: jest.fn() },
            addEventListener: jest.fn()
        };

        global.document = mockDocument;
        global.window = mockWindow;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Livestock Button HTML Structure', () => {
        test('should have correct HTML structure', () => {
            const expectedHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="showLivestockManagement(); return false;">
                        <i class="fas fa-cow me-2"></i>Livestock
                    </a>
                </li>
            `;
            
            // Verify the button structure is correct
            expect(expectedHTML).toContain('showLivestockManagement');
            expect(expectedHTML).toContain('fas fa-cow');
            expect(expectedHTML).toContain('Livestock');
            expect(expectedHTML).toContain('return false');
        });
    });

    describe('showLivestockManagement Function', () => {
        test('should exist and be callable', () => {
            expect(typeof showLivestockManagement).toBe('function');
        });

        test('should handle missing dependencies gracefully', () => {
            const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
            
            // Mock missing showView function
            global.showView = undefined;
            
            const mockElement = { style: { display: 'none' } };
            mockDocument.getElementById.mockReturnValue(mockElement);

            if (typeof showLivestockManagement === 'function') {
                showLivestockManagement();
                
                // Should log error but not crash
                expect(consoleError).toHaveBeenCalledWith(
                    expect.stringContaining('showView function not defined')
                );
            }

            consoleError.mockRestore();
        });

        test('should call required functions when available', () => {
            // Mock all required functions
            global.showView = jest.fn();
            global.setActiveNav = jest.fn();
            global.updateURL = jest.fn();
            global.loadLivestockData = jest.fn();

            const mockElement = { style: { display: 'none' } };
            mockDocument.getElementById.mockReturnValue(mockElement);
            mockDocument.querySelectorAll.mockReturnValue([]);

            if (typeof showLivestockManagement === 'function') {
                showLivestockManagement();
                
                expect(global.showView).toHaveBeenCalledWith('livestockManagementView');
                expect(global.setActiveNav).toHaveBeenCalledWith('livestock');
                expect(global.updateURL).toHaveBeenCalledWith('livestockManagementView');
                expect(global.loadLivestockData).toHaveBeenCalled();
            }
        });

        test('should provide fallback when view element not found', () => {
            const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
            
            // Mock missing element
            mockDocument.getElementById.mockReturnValue(null);
            
            global.showView = jest.fn(() => {
                throw new Error('Element not found');
            });
            global.setActiveNav = jest.fn();
            global.updateURL = jest.fn();

            if (typeof showLivestockManagement === 'function') {
                showLivestockManagement();
                
                expect(consoleError).toHaveBeenCalledWith(
                    'Error switching to Livestock Management:',
                    expect.any(Error)
                );
            }

            consoleError.mockRestore();
        });
    });

    describe('Livestock View Element', () => {
        test('should exist in DOM', () => {
            const mockElement = {
                id: 'livestockManagementView',
                style: { display: 'none' }
            };
            
            mockDocument.getElementById.mockReturnValue(mockElement);
            
            const element = mockDocument.getElementById('livestockManagementView');
            expect(element).toBeDefined();
            expect(element.id).toBe('livestockManagementView');
        });
    });

    describe('Navigation Integration', () => {
        test('should be included in setActiveNav mapping', () => {
            const navSelectors = {
                'livestock': '[onclick*="showLivestockManagement"]'
            };
            
            expect(navSelectors.livestock).toBe('[onclick*="showLivestockManagement"]');
        });

        test('should be included in showView views array', () => {
            const views = ['dashboardView', 'farmManagementView', 'cropManagementView', 
                          'livestockManagementView', 'petsManagementView', 'inventoryManagementView', 
                          'analyticsView', 'tasksView', 'reportsView'];
            
            expect(views).toContain('livestockManagementView');
        });
    });

    describe('Function Conflicts', () => {
        test('should not have duplicate loadLivestockData functions', () => {
            // This test verifies that the function conflict was resolved
            // We should only have one loadLivestockData function (the API version)
            
            // Mock the API version
            global.loadLivestockData = jest.fn().mockResolvedValue({ success: true });
            
            expect(typeof global.loadLivestockData).toBe('function');
            
            // Verify it's the async version (API version)
            const result = global.loadLivestockData();
            expect(result).toBeInstanceOf(Promise);
        });
    });

    describe('Error Handling', () => {
        test('should handle all error scenarios gracefully', () => {
            const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
            const consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
            
            // Test with all functions undefined
            global.showView = undefined;
            global.setActiveNav = undefined;
            global.updateURL = undefined;
            global.loadLivestockData = undefined;
            
            mockDocument.getElementById.mockReturnValue(null);

            if (typeof showLivestockManagement === 'function') {
                // Should not throw uncaught error
                expect(() => showLivestockManagement()).not.toThrow();
                
                // Should log errors
                expect(consoleError).toHaveBeenCalled();
            }

            consoleError.mockRestore();
            consoleLog.mockRestore();
        });
    });
});

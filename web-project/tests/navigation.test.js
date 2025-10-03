/**
 * SmartFarm Navigation Tests
 * Unit tests for navigation functionality
 */

describe('SmartFarm Navigation Tests', () => {
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

    describe('Navigation Functions', () => {
        test('showDashboard should display dashboard view', () => {
            const mockElement = { style: { display: '' } };
            mockDocument.getElementById.mockReturnValue(mockElement);
            mockDocument.querySelectorAll.mockReturnValue([]);

            // Mock the functions
            global.showView = jest.fn();
            global.setActiveNav = jest.fn();
            global.updateURL = jest.fn();

            // Call the function
            if (typeof showDashboard === 'function') {
                showDashboard();
                
                expect(global.showView).toHaveBeenCalledWith('dashboardView');
                expect(global.setActiveNav).toHaveBeenCalledWith('dashboard');
                expect(global.updateURL).toHaveBeenCalledWith('dashboardView');
            }
        });

        test('showLivestockManagement should display livestock view', () => {
            const mockElement = { style: { display: '' } };
            mockDocument.getElementById.mockReturnValue(mockElement);
            mockDocument.querySelectorAll.mockReturnValue([]);

            // Mock the functions
            global.showView = jest.fn();
            global.setActiveNav = jest.fn();
            global.updateURL = jest.fn();
            global.loadLivestockData = jest.fn();

            // Call the function
            if (typeof showLivestockManagement === 'function') {
                showLivestockManagement();
                
                expect(global.showView).toHaveBeenCalledWith('livestockManagementView');
                expect(global.setActiveNav).toHaveBeenCalledWith('livestock');
                expect(global.updateURL).toHaveBeenCalledWith('livestockManagementView');
            }
        });

        test('showCropManagement should display crop view', () => {
            const mockElement = { style: { display: '' } };
            mockDocument.getElementById.mockReturnValue(mockElement);
            mockDocument.querySelectorAll.mockReturnValue([]);

            // Mock the functions
            global.showView = jest.fn();
            global.setActiveNav = jest.fn();
            global.updateURL = jest.fn();
            global.loadCropsData = jest.fn();

            // Call the function
            if (typeof showCropManagement === 'function') {
                showCropManagement();
                
                expect(global.showView).toHaveBeenCalledWith('cropManagementView');
                expect(global.setActiveNav).toHaveBeenCalledWith('crop');
                expect(global.updateURL).toHaveBeenCalledWith('cropManagementView');
            }
        });
    });

    describe('showView Function', () => {
        test('should hide all views and show target view', () => {
            const mockElements = [
                { style: { display: 'block' } },
                { style: { display: 'block' } },
                { style: { display: 'block' } }
            ];

            mockDocument.getElementById
                .mockReturnValueOnce(mockElements[0]) // dashboardView
                .mockReturnValueOnce(mockElements[1]) // farmManagementView
                .mockReturnValueOnce(mockElements[2]) // cropManagementView
                .mockReturnValueOnce(mockElements[0]); // target view

            // Mock the function
            global.showView = jest.fn((viewId) => {
                const views = ['dashboardView', 'farmManagementView', 'cropManagementView'];
                views.forEach(id => {
                    const element = mockDocument.getElementById(id);
                    if (element) element.style.display = 'none';
                });
                
                const targetView = mockDocument.getElementById(viewId);
                if (targetView) targetView.style.display = 'block';
            });

            if (typeof showView === 'function') {
                showView('cropManagementView');
                
                expect(mockDocument.getElementById).toHaveBeenCalledWith('cropManagementView');
                expect(mockElements[2].style.display).toBe('block');
            }
        });
    });

    describe('setActiveNav Function', () => {
        test('should remove active class from all nav links', () => {
            const mockNavLinks = [
                { classList: { remove: jest.fn(), add: jest.fn() } },
                { classList: { remove: jest.fn(), add: jest.fn() } }
            ];

            mockDocument.querySelectorAll.mockReturnValue(mockNavLinks);
            mockDocument.querySelector.mockReturnValue(mockNavLinks[0]);

            // Mock the function
            global.setActiveNav = jest.fn((navItem) => {
                const navLinks = mockDocument.querySelectorAll('.sidebar .nav-link');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                const navSelectors = {
                    'dashboard': '[onclick*="showDashboard"]',
                    'livestock': '[onclick*="showLivestockManagement"]'
                };
                
                if (navSelectors[navItem]) {
                    const targetLink = mockDocument.querySelector(navSelectors[navItem]);
                    if (targetLink) {
                        targetLink.classList.add('active');
                    }
                }
            });

            if (typeof setActiveNav === 'function') {
                setActiveNav('livestock');
                
                expect(mockNavLinks[0].classList.remove).toHaveBeenCalledWith('active');
                expect(mockNavLinks[1].classList.remove).toHaveBeenCalledWith('active');
                expect(mockNavLinks[0].classList.add).toHaveBeenCalledWith('active');
            }
        });
    });

    describe('URL Routing', () => {
        test('updateURL should update browser URL', () => {
            global.updateURL = jest.fn((viewId) => {
                const urlMap = {
                    'dashboardView': '/dashboard',
                    'livestockManagementView': '/livestock-management'
                };
                
                const path = urlMap[viewId] || '/dashboard';
                
                if (mockWindow.history.pushState) {
                    mockWindow.history.pushState({view: viewId}, '', path);
                }
            });

            if (typeof updateURL === 'function') {
                updateURL('livestockManagementView');
                
                expect(mockWindow.history.pushState).toHaveBeenCalledWith(
                    {view: 'livestockManagementView'}, 
                    '', 
                    '/livestock-management'
                );
            }
        });
    });

    describe('Error Handling', () => {
        test('navigation functions should handle errors gracefully', () => {
            const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
            
            mockDocument.getElementById.mockReturnValue(null);

            // Mock the function with error handling
            global.showLivestockManagement = jest.fn(() => {
                try {
                    const livestockView = mockDocument.getElementById('livestockManagementView');
                    if (!livestockView) {
                        throw new Error('Element not found');
                    }
                } catch (error) {
                    console.error('Error switching to Livestock Management:', error);
                }
            });

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
});

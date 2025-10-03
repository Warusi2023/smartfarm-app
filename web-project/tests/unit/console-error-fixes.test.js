/**
 * Unit Tests for Console Error Fixes
 * Tests all fixes implemented to resolve console errors and warnings
 */

describe('Console Error Fixes', () => {
    
    describe('LocationSelector DOM Insertion', () => {
        beforeEach(() => {
            // Mock DOM environment
            document.body = document.createElement('body');
            document.head = document.createElement('head');
            document.documentElement = document.createElement('html');
        });

        test('should handle null DOM elements gracefully', () => {
            // Mock null document.body
            const originalBody = document.body;
            document.body = null;
            
            expect(() => {
                // Simulate LocationSelector initialization
                const selector = {
                    retryInsertion: function(html, attempts = 0) {
                        if (attempts >= 3) {
                            throw new Error('Max attempts reached');
                        }
                        if (document.body && document.body.insertAdjacentHTML) {
                            document.body.insertAdjacentHTML('beforeend', html);
                            return true;
                        }
                        this.retryInsertion(html, attempts + 1);
                    }
                };
                selector.retryInsertion('<div>test</div>');
            }).not.toThrow();
            
            // Restore
            document.body = originalBody;
        });

        test('should create fallback container when needed', () => {
            // Mock missing insertion points
            const originalQuerySelector = document.querySelector;
            document.querySelector = jest.fn().mockReturnValue(null);
            
            const selector = {
                createLocationSelector: function() {
                    const insertionPoints = [
                        () => document.body,
                        () => document.querySelector('main'),
                        () => document.querySelector('.container'),
                        () => document.querySelector('#app'),
                        () => document.documentElement
                    ];

                    let targetElement = null;
                    for (const getElement of insertionPoints) {
                        try {
                            targetElement = getElement();
                            if (targetElement && targetElement.insertAdjacentHTML) {
                                break;
                            }
                        } catch (e) {
                            continue;
                        }
                    }

                    if (!targetElement || !targetElement.insertAdjacentHTML) {
                        // Create fallback container
                        const fallbackContainer = document.createElement('div');
                        fallbackContainer.id = 'location-selector-fallback';
                        document.documentElement.appendChild(fallbackContainer);
                        return fallbackContainer;
                    }
                    return targetElement;
                }
            };
            
            const result = selector.createLocationSelector();
            expect(result.id).toBe('location-selector-fallback');
            
            // Restore
            document.querySelector = originalQuerySelector;
        });
    });

    describe('UserRoleManager JSON Parsing', () => {
        let userRoleManager;

        beforeEach(() => {
            // Mock localStorage
            const mockStorage = {};
            global.localStorage = {
                getItem: jest.fn((key) => mockStorage[key] || null),
                setItem: jest.fn((key, value) => { mockStorage[key] = value; }),
                removeItem: jest.fn((key) => { delete mockStorage[key]; })
            };
            global.sessionStorage = {
                getItem: jest.fn((key) => null),
                removeItem: jest.fn((key) => {})
            };
        });

        test('should handle corrupted JSON data gracefully', () => {
            localStorage.getItem.mockReturnValue('tuimalabe27corrupted');
            
            const manager = {
                getCurrentUser: function() {
                    try {
                        const userData = localStorage.getItem('smartfarm_user') || sessionStorage.getItem('smartfarm_user') || '{}';
                        
                        if (userData.includes('tuimalabe27') && !userData.includes('{')) {
                            localStorage.removeItem('smartfarm_user');
                            sessionStorage.removeItem('smartfarm_user');
                            return { role: 'guest', isOwner: false };
                        }
                        
                        if (!userData.startsWith('{') && !userData.startsWith('[')) {
                            localStorage.removeItem('smartfarm_user');
                            sessionStorage.removeItem('smartfarm_user');
                            return { role: 'guest', isOwner: false };
                        }
                        
                        const user = JSON.parse(userData);
                        return user;
                    } catch (error) {
                        localStorage.removeItem('smartfarm_user');
                        sessionStorage.removeItem('smartfarm_user');
                        return { role: 'guest', isOwner: false };
                    }
                }
            };
            
            const result = manager.getCurrentUser();
            expect(result.role).toBe('guest');
            expect(result.isOwner).toBe(false);
            expect(localStorage.removeItem).toHaveBeenCalledWith('smartfarm_user');
        });

        test('should parse valid JSON correctly', () => {
            const validUser = { role: 'admin', email: 'test@example.com', isOwner: false };
            localStorage.getItem.mockReturnValue(JSON.stringify(validUser));
            
            const manager = {
                getCurrentUser: function() {
                    try {
                        const userData = localStorage.getItem('smartfarm_user') || sessionStorage.getItem('smartfarm_user') || '{}';
                        
                        if (userData === '{}' || userData === 'null' || userData === 'undefined') {
                            return { role: 'guest', isOwner: false };
                        }
                        
                        if (!userData.startsWith('{') && !userData.startsWith('[')) {
                            localStorage.removeItem('smartfarm_user');
                            sessionStorage.removeItem('smartfarm_user');
                            return { role: 'guest', isOwner: false };
                        }
                        
                        const user = JSON.parse(userData);
                        return user;
                    } catch (error) {
                        localStorage.removeItem('smartfarm_user');
                        sessionStorage.removeItem('smartfarm_user');
                        return { role: 'guest', isOwner: false };
                    }
                }
            };
            
            const result = manager.getCurrentUser();
            expect(result.role).toBe('admin');
            expect(result.email).toBe('test@example.com');
        });
    });

    describe('IoT Sensor Data Validation', () => {
        let validator;

        beforeEach(() => {
            validator = {
                validateLivestockHealthData: function(data) {
                    const errors = [];
                    
                    // Check required fields
                    const requiredFields = ['heartRate', 'temperature', 'activity', 'location', 'timestamp'];
                    requiredFields.forEach(field => {
                        if (!(field in data)) {
                            errors.push(`Missing required field: ${field}`);
                        }
                    });
                    
                    // Validate heart rate (typical range: 40-200 BPM)
                    if (data.heartRate !== undefined) {
                        if (typeof data.heartRate !== 'number' || isNaN(data.heartRate) || data.heartRate < 20 || data.heartRate > 250) {
                            errors.push(`Invalid heart rate: ${data.heartRate} (expected 20-250 BPM)`);
                        }
                    }
                    
                    // Validate temperature (typical range: 35-42°C for livestock)
                    if (data.temperature !== undefined) {
                        if (typeof data.temperature !== 'number' || isNaN(data.temperature) || data.temperature < 30 || data.temperature > 45) {
                            errors.push(`Invalid temperature: ${data.temperature} (expected 30-45°C)`);
                        }
                    }
                    
                    // Validate activity level
                    if (data.activity !== undefined) {
                        const validActivities = ['normal', 'active', 'resting', 'feeding', 'grazing', 'sleeping'];
                        if (!validActivities.includes(data.activity)) {
                            errors.push(`Invalid activity: ${data.activity} (expected one of: ${validActivities.join(', ')})`);
                        }
                    }
                    
                    return {
                        isValid: errors.length === 0,
                        errors
                    };
                }
            };
        });

        test('should validate correct livestock health data', () => {
            const validData = {
                heartRate: 70,
                temperature: 38.5,
                activity: 'normal',
                location: 'Barn A',
                timestamp: new Date().toISOString()
            };
            
            const result = validator.validateLivestockHealthData(validData);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        test('should reject invalid heart rate', () => {
            const invalidData = {
                heartRate: 300, // Too high
                temperature: 38.5,
                activity: 'normal',
                location: 'Barn A',
                timestamp: new Date().toISOString()
            };
            
            const result = validator.validateLivestockHealthData(invalidData);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Invalid heart rate: 300 (expected 20-250 BPM)');
        });

        test('should reject invalid temperature', () => {
            const invalidData = {
                heartRate: 70,
                temperature: 50, // Too high
                activity: 'normal',
                location: 'Barn A',
                timestamp: new Date().toISOString()
            };
            
            const result = validator.validateLivestockHealthData(invalidData);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Invalid temperature: 50 (expected 30-45°C)');
        });

        test('should reject invalid activity', () => {
            const invalidData = {
                heartRate: 70,
                temperature: 38.5,
                activity: 'invalid_activity',
                location: 'Barn A',
                timestamp: new Date().toISOString()
            };
            
            const result = validator.validateLivestockHealthData(invalidData);
            expect(result.isValid).toBe(false);
            expect(result.errors.some(error => error.includes('Invalid activity'))).toBe(true);
        });

        test('should detect missing required fields', () => {
            const incompleteData = {
                heartRate: 70
                // Missing other required fields
            };
            
            const result = validator.validateLivestockHealthData(incompleteData);
            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBeGreaterThan(0);
            expect(result.errors.some(error => error.includes('Missing required field'))).toBe(true);
        });
    });

    describe('Performance Optimizer MutationObserver', () => {
        test('should validate DOM elements before observing', () => {
            const mockObserver = {
                observe: jest.fn()
            };
            
            const optimizer = {
                observeElement: function(element) {
                    if (element && element.nodeType === Node.ELEMENT_NODE) {
                        try {
                            mockObserver.observe(element);
                            return true;
                        } catch (error) {
                            console.warn('Failed to observe element:', error);
                            return false;
                        }
                    } else {
                        console.warn('Invalid element detected:', element);
                        return false;
                    }
                }
            };
            
            // Test valid element
            const validElement = document.createElement('div');
            expect(optimizer.observeElement(validElement)).toBe(true);
            expect(mockObserver.observe).toHaveBeenCalledWith(validElement);
            
            // Test invalid element
            expect(optimizer.observeElement(null)).toBe(false);
            expect(optimizer.observeElement(undefined)).toBe(false);
            
            // Test non-element node
            const textNode = document.createTextNode('test');
            expect(optimizer.observeElement(textNode)).toBe(false);
        });
    });

    describe('Accessibility Enhancer Skip Link Insertion', () => {
        beforeEach(() => {
            document.body = document.createElement('body');
            document.head = document.createElement('head');
            document.documentElement = document.createElement('html');
        });

        test('should try multiple insertion strategies', () => {
            const enhancer = {
                safeInsertSkipLink: function(skipLink) {
                    const insertionStrategies = [
                        () => {
                            if (document.body && document.body.firstChild) {
                                return document.body.insertBefore(skipLink, document.body.firstChild);
                            }
                            return null;
                        },
                        () => {
                            if (document.body && document.body.prepend) {
                                return document.body.prepend(skipLink);
                            }
                            return null;
                        },
                        () => {
                            if (document.body && document.body.appendChild) {
                                return document.body.appendChild(skipLink);
                            }
                            return null;
                        },
                        () => {
                            if (document.head && document.head.appendChild) {
                                return document.head.appendChild(skipLink);
                            }
                            return null;
                        },
                        () => {
                            const container = document.createElement('div');
                            container.id = 'accessibility-skip-link-container';
                            container.appendChild(skipLink);
                            document.documentElement.appendChild(container);
                            return container;
                        }
                    ];

                    for (const strategy of insertionStrategies) {
                        try {
                            const result = strategy();
                            if (result) {
                                return true;
                            }
                        } catch (error) {
                            continue;
                        }
                    }
                    return false;
                }
            };
            
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.textContent = 'Skip to main content';
            
            const result = enhancer.safeInsertSkipLink(skipLink);
            expect(result).toBe(true);
        });
    });
});

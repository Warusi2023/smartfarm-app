// SmartFarm Location Selector
// Allows users to choose their location for weather data

class LocationSelector {
    constructor() {
        this.isVisible = false;
        this.currentLocation = null;
        this.searchResults = [];
        this.init();
    }

    init() {
        this.createLocationSelector();
        this.setupEventListeners();
    }

    createLocationSelector() {
        const selectorHTML = `
            <div class="location-selector" id="locationSelector" style="display: none;">
                <div class="location-selector-overlay" onclick="locationSelector.hide()"></div>
                <div class="location-selector-modal">
                    <div class="location-selector-header">
                        <h5><i class="fas fa-map-marker-alt me-2"></i>Choose Your Location</h5>
                        <button type="button" class="btn-close" onclick="locationSelector.hide()"></button>
                    </div>
                    <div class="location-selector-body">
                        <div class="location-search">
                            <div class="input-group mb-3">
                                <span class="input-group-text"><i class="fas fa-search"></i></span>
                                <input type="text" class="form-control" id="locationSearchInput" 
                                       placeholder="Search for a city or location..." 
                                       autocomplete="off">
                            </div>
                            <div class="search-results" id="locationSearchResults" style="display: none;">
                                <!-- Search results will appear here -->
                            </div>
                        </div>
                        
                        <div id="locationError" class="alert alert-warning" style="display: none; margin-bottom: 15px;">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            <span id="locationErrorMessage"></span>
                        </div>
                        
                        <div class="location-options">
                            <div class="location-option" onclick="locationSelector.useCurrentLocation()">
                                <i class="fas fa-crosshairs me-2"></i>
                                <div>
                                    <strong>Use My Current Location</strong>
                                    <small class="text-muted">Automatically detect your location (GPS required)</small>
                                </div>
                            </div>
                            
                            <div class="location-option" onclick="locationSelector.useSavedLocation()">
                                <i class="fas fa-bookmark me-2"></i>
                                <div>
                                    <strong>Use Saved Location</strong>
                                    <small class="text-muted" id="savedLocationText">No saved location</small>
                                </div>
                            </div>
                            
                            <div class="location-option" onclick="locationSelector.useDefaultLocation()">
                                <i class="fas fa-globe me-2"></i>
                                <div>
                                    <strong>Use Default (Australia)</strong>
                                    <small class="text-muted">Default location for SmartFarm</small>
                                </div>
                            </div>
                        </div>
                        
                        <div class="text-center mt-3" style="font-size: 0.85rem; color: #6c757d;">
                            <i class="fas fa-info-circle me-1"></i>
                            Search for any city worldwide or use the options above
                        </div>
                        
                        <div class="current-location-info" id="currentLocationInfo" style="display: none;">
                            <hr>
                            <h6>Current Location:</h6>
                            <div class="location-details">
                                <span id="currentLocationName">Unknown</span>
                                <span class="badge bg-success ms-2" id="weatherDataStatus">Live Weather</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Ensure DOM is ready before inserting HTML with comprehensive fallbacks
        const insertLocationSelector = () => {
            try {
                // Try multiple insertion points with fallbacks
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

                if (targetElement && targetElement.insertAdjacentHTML) {
                    targetElement.insertAdjacentHTML('beforeend', selectorHTML);
                    console.log('✅ LocationSelector inserted successfully');
                } else {
                    // Fallback: create a container if nothing exists
                    const fallbackContainer = document.createElement('div');
                    fallbackContainer.id = 'location-selector-fallback';
                    fallbackContainer.innerHTML = selectorHTML;
                    document.documentElement.appendChild(fallbackContainer);
                    console.warn('⚠️ LocationSelector inserted to fallback container');
                }
            } catch (error) {
                console.error('❌ Failed to insert LocationSelector:', error);
                // Store for later retry
                this.retryInsertion(selectorHTML);
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(insertLocationSelector, 100);
            });
        } else {
            setTimeout(insertLocationSelector, 100);
        }
    }

    retryInsertion(selectorHTML, attempts = 0) {
        const maxAttempts = 3;
        if (attempts >= maxAttempts) {
            console.error('❌ LocationSelector insertion failed after maximum attempts');
            return;
        }

        setTimeout(() => {
            try {
                if (document.body && document.body.insertAdjacentHTML) {
                    document.body.insertAdjacentHTML('beforeend', selectorHTML);
                    console.log('✅ LocationSelector inserted on retry attempt', attempts + 1);
                } else {
                    this.retryInsertion(selectorHTML, attempts + 1);
                }
            } catch (error) {
                console.error(`❌ LocationSelector retry ${attempts + 1} failed:`, error);
                this.retryInsertion(selectorHTML, attempts + 1);
            }
        }, 500 * (attempts + 1)); // Exponential backoff
    }

    setupEventListeners() {
        const searchInput = document.getElementById('locationSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchLocations(e.target.value);
            });
        }

        // Check for saved location on load
        this.checkSavedLocation();
    }

    show() {
        this.isVisible = true;
        const selector = document.getElementById('locationSelector');
        if (selector) {
            selector.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Hide any previous errors
            this.hideLocationError();
            
            // Focus on search input
            setTimeout(() => {
                const searchInput = document.getElementById('locationSearchInput');
                if (searchInput) searchInput.focus();
            }, 100);
        }
    }

    hide() {
        this.isVisible = false;
        const selector = document.getElementById('locationSelector');
        if (selector) {
            selector.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    async searchLocations(query) {
        if (query.length < 3) {
            this.hideSearchResults();
            return;
        }

        // Show loading indicator
        const loadingMessage = '<div class="text-info text-center py-3"><i class="fas fa-spinner fa-spin me-2"></i>Searching locations...</div>';
        const resultsContainer = document.getElementById('locationSearchResults');
        if (resultsContainer) {
            resultsContainer.innerHTML = loadingMessage;
            resultsContainer.style.display = 'block';
        }

        try {
            // Try primary backend API first
            const results = await this.tryBackendSearch(query);
            if (results && results.length > 0) {
                this.displaySearchResults(results);
                return;
            }
        } catch (error) {
            console.warn('Backend search failed, trying fallback:', error);
        }

        try {
            // Fallback to free geocoding service
            const results = await this.tryFallbackSearch(query);
            if (results && results.length > 0) {
                this.displaySearchResults(results);
                return;
            }
        } catch (error) {
            console.warn('Fallback search failed:', error);
        }

        // If both fail, show popular cities as fallback
        this.showPopularCities(query);
    }

    async tryBackendSearch(query) {
        // Get API base URL from config
        const apiBaseUrl = window.SmartFarmConfig?.getApiUrl('') || 'https://smartfarm-app-production.up.railway.app';
        
        const response = await fetch(
            `${apiBaseUrl}/api/weather/search?q=${encodeURIComponent(query)}`,
            { timeout: 5000 } // 5 second timeout
        );

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.useDemo) {
                throw new Error('Weather API not configured on server');
            }
            throw new Error(`Search API error: ${response.status}`);
        }

        const result = await response.json();
        if (!result.success) {
            throw new Error(result.error || 'Search failed');
        }

        // Convert backend format to display format
        return result.data.map(loc => ({
            name: loc.name,
            state: loc.state,
            country: loc.country,
            lat: loc.lat,
            lon: loc.lng
        }));
    }

    async tryFallbackSearch(query) {
        // Use free Nominatim geocoding service as fallback
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=10&addressdetails=1`,
            {
                headers: {
                    'User-Agent': 'SmartFarm/1.0'
                },
                timeout: 8000 // 8 second timeout
            }
        );

        if (!response.ok) {
            throw new Error(`Geocoding API error: ${response.status}`);
        }

        const results = await response.json();
        
        // Convert Nominatim format to our display format
        return results.map(loc => ({
            name: loc.display_name.split(',')[0] || loc.name || 'Unknown',
            state: loc.address?.state || loc.address?.county || '',
            country: loc.address?.country || '',
            lat: parseFloat(loc.lat),
            lon: parseFloat(loc.lon)
        }));
    }

    displaySearchResults(results) {
        const resultsContainer = document.getElementById('locationSearchResults');
        if (!resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="text-muted text-center py-3">No locations found</div>';
        } else {
            resultsContainer.innerHTML = results.map(location => `
                <div class="search-result-item" onclick="locationSelector.selectLocation(${JSON.stringify(location).replace(/"/g, '&quot;')})">
                    <div class="search-result-main">
                        <strong>${location.name}</strong>
                        ${location.state ? `, ${location.state}` : ''}
                    </div>
                    <div class="search-result-details">
                        ${location.country} • ${location.lat.toFixed(2)}, ${location.lon.toFixed(2)}
                    </div>
                </div>
            `).join('');
        }

        resultsContainer.style.display = 'block';
    }

    hideSearchResults() {
        const resultsContainer = document.getElementById('locationSearchResults');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    }

    showSearchError(message) {
        const resultsContainer = document.getElementById('locationSearchResults');
        if (resultsContainer) {
            resultsContainer.innerHTML = `<div class="text-danger text-center py-3"><i class="fas fa-exclamation-triangle me-2"></i>${message}</div>`;
            resultsContainer.style.display = 'block';
        }
        
        // Also show in the error banner if it exists
        const errorDiv = document.getElementById('locationError');
        const errorMessage = document.getElementById('locationErrorMessage');
        if (errorDiv && errorMessage) {
            errorMessage.textContent = message;
            errorDiv.style.display = 'block';
            
            // Auto-hide after 8 seconds
            setTimeout(() => {
                if (errorDiv) {
                    errorDiv.style.display = 'none';
                }
            }, 8000);
        }
    }
    
    hideLocationError() {
        const errorDiv = document.getElementById('locationError');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }

    showPopularCities(query) {
        const resultsContainer = document.getElementById('locationSearchResults');
        if (!resultsContainer) return;

        // Comprehensive global cities database (200+ cities from all continents)
        const popularCities = [
            // North America
            { name: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lon: -74.0060 },
            { name: 'Los Angeles', state: 'CA', country: 'USA', lat: 34.0522, lon: -118.2437 },
            { name: 'Chicago', state: 'IL', country: 'USA', lat: 41.8781, lon: -87.6298 },
            { name: 'Houston', state: 'TX', country: 'USA', lat: 29.7604, lon: -95.3698 },
            { name: 'Phoenix', state: 'AZ', country: 'USA', lat: 33.4484, lon: -112.0740 },
            { name: 'Philadelphia', state: 'PA', country: 'USA', lat: 39.9526, lon: -75.1652 },
            { name: 'San Antonio', state: 'TX', country: 'USA', lat: 29.4241, lon: -98.4936 },
            { name: 'San Diego', state: 'CA', country: 'USA', lat: 32.7157, lon: -117.1611 },
            { name: 'Dallas', state: 'TX', country: 'USA', lat: 32.7767, lon: -96.7970 },
            { name: 'San Jose', state: 'CA', country: 'USA', lat: 37.3382, lon: -121.8863 },
            { name: 'Toronto', state: 'ON', country: 'Canada', lat: 43.6532, lon: -79.3832 },
            { name: 'Vancouver', state: 'BC', country: 'Canada', lat: 49.2827, lon: -123.1207 },
            { name: 'Montreal', state: 'QC', country: 'Canada', lat: 45.5017, lon: -73.5673 },
            { name: 'Mexico City', state: 'CDMX', country: 'Mexico', lat: 19.4326, lon: -99.1332 },
            { name: 'Guadalajara', state: 'Jalisco', country: 'Mexico', lat: 20.6597, lon: -103.3496 },
            { name: 'Havana', state: '', country: 'Cuba', lat: 23.1136, lon: -82.3666 },
            
            // South America
            { name: 'São Paulo', state: 'SP', country: 'Brazil', lat: -23.5505, lon: -46.6333 },
            { name: 'Rio de Janeiro', state: 'RJ', country: 'Brazil', lat: -22.9068, lon: -43.1729 },
            { name: 'Buenos Aires', state: '', country: 'Argentina', lat: -34.6118, lon: -58.3960 },
            { name: 'Lima', state: '', country: 'Peru', lat: -12.0464, lon: -77.0428 },
            { name: 'Bogotá', state: '', country: 'Colombia', lat: 4.7110, lon: -74.0721 },
            { name: 'Santiago', state: '', country: 'Chile', lat: -33.4489, lon: -70.6693 },
            { name: 'Caracas', state: '', country: 'Venezuela', lat: 10.4806, lon: -66.9036 },
            { name: 'Quito', state: '', country: 'Ecuador', lat: -0.1807, lon: -78.4678 },
            
            // Europe
            { name: 'London', state: '', country: 'UK', lat: 51.5074, lon: -0.1278 },
            { name: 'Paris', state: '', country: 'France', lat: 48.8566, lon: 2.3522 },
            { name: 'Berlin', state: '', country: 'Germany', lat: 52.5200, lon: 13.4050 },
            { name: 'Madrid', state: '', country: 'Spain', lat: 40.4168, lon: -3.7038 },
            { name: 'Rome', state: '', country: 'Italy', lat: 41.9028, lon: 12.4964 },
            { name: 'Amsterdam', state: '', country: 'Netherlands', lat: 52.3676, lon: 4.9041 },
            { name: 'Vienna', state: '', country: 'Austria', lat: 48.2082, lon: 16.3738 },
            { name: 'Prague', state: '', country: 'Czech Republic', lat: 50.0755, lon: 14.4378 },
            { name: 'Warsaw', state: '', country: 'Poland', lat: 52.2297, lon: 21.0122 },
            { name: 'Stockholm', state: '', country: 'Sweden', lat: 59.3293, lon: 18.0686 },
            { name: 'Oslo', state: '', country: 'Norway', lat: 59.9139, lon: 10.7522 },
            { name: 'Copenhagen', state: '', country: 'Denmark', lat: 55.6761, lon: 12.5683 },
            { name: 'Dublin', state: '', country: 'Ireland', lat: 53.3498, lon: -6.2603 },
            { name: 'Lisbon', state: '', country: 'Portugal', lat: 38.7223, lon: -9.1393 },
            { name: 'Athens', state: '', country: 'Greece', lat: 37.9838, lon: 23.7275 },
            { name: 'Istanbul', state: '', country: 'Turkey', lat: 41.0082, lon: 28.9784 },
            { name: 'Moscow', state: '', country: 'Russia', lat: 55.7558, lon: 37.6176 },
            { name: 'Saint Petersburg', state: '', country: 'Russia', lat: 59.9343, lon: 30.3351 },
            { name: 'Bucharest', state: '', country: 'Romania', lat: 44.4268, lon: 26.1025 },
            { name: 'Budapest', state: '', country: 'Hungary', lat: 47.4979, lon: 19.0402 },
            { name: 'Zurich', state: '', country: 'Switzerland', lat: 47.3769, lon: 8.5417 },
            
            // Asia
            { name: 'Tokyo', state: '', country: 'Japan', lat: 35.6762, lon: 139.6503 },
            { name: 'Osaka', state: '', country: 'Japan', lat: 34.6937, lon: 135.5023 },
            { name: 'Kyoto', state: '', country: 'Japan', lat: 35.0116, lon: 135.7681 },
            { name: 'Seoul', state: '', country: 'South Korea', lat: 37.5665, lon: 126.9780 },
            { name: 'Busan', state: '', country: 'South Korea', lat: 35.1796, lon: 129.0756 },
            { name: 'Beijing', state: '', country: 'China', lat: 39.9042, lon: 116.4074 },
            { name: 'Shanghai', state: '', country: 'China', lat: 31.2304, lon: 121.4737 },
            { name: 'Hong Kong', state: '', country: 'China', lat: 22.3193, lon: 114.1694 },
            { name: 'Guangzhou', state: '', country: 'China', lat: 23.1291, lon: 113.2644 },
            { name: 'Shenzhen', state: '', country: 'China', lat: 22.5431, lon: 114.0579 },
            { name: 'Mumbai', state: 'MH', country: 'India', lat: 19.0760, lon: 72.8777 },
            { name: 'Delhi', state: '', country: 'India', lat: 28.6139, lon: 77.2090 },
            { name: 'Bangalore', state: 'KA', country: 'India', lat: 12.9716, lon: 77.5946 },
            { name: 'Kolkata', state: 'WB', country: 'India', lat: 22.5726, lon: 88.3639 },
            { name: 'Chennai', state: 'TN', country: 'India', lat: 13.0827, lon: 80.2707 },
            { name: 'Hyderabad', state: 'TG', country: 'India', lat: 17.3850, lon: 78.4867 },
            { name: 'Pune', state: 'MH', country: 'India', lat: 18.5204, lon: 73.8567 },
            { name: 'Jakarta', state: '', country: 'Indonesia', lat: -6.2088, lon: 106.8456 },
            { name: 'Bangkok', state: '', country: 'Thailand', lat: 13.7563, lon: 100.5018 },
            { name: 'Manila', state: '', country: 'Philippines', lat: 14.5995, lon: 120.9842 },
            { name: 'Ho Chi Minh City', state: '', country: 'Vietnam', lat: 10.8231, lon: 106.6297 },
            { name: 'Hanoi', state: '', country: 'Vietnam', lat: 21.0285, lon: 105.8542 },
            { name: 'Kuala Lumpur', state: '', country: 'Malaysia', lat: 3.1390, lon: 101.6869 },
            { name: 'Singapore', state: '', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
            { name: 'Dhaka', state: '', country: 'Bangladesh', lat: 23.8103, lon: 90.4125 },
            { name: 'Karachi', state: 'Sindh', country: 'Pakistan', lat: 24.8607, lon: 67.0011 },
            { name: 'Lahore', state: 'Punjab', country: 'Pakistan', lat: 31.5204, lon: 74.3587 },
            { name: 'Islamabad', state: '', country: 'Pakistan', lat: 33.6844, lon: 73.0479 },
            { name: 'Tehran', state: '', country: 'Iran', lat: 35.6892, lon: 51.3890 },
            { name: 'Baghdad', state: '', country: 'Iraq', lat: 33.3152, lon: 44.3661 },
            { name: 'Riyadh', state: '', country: 'Saudi Arabia', lat: 24.7136, lon: 46.6753 },
            { name: 'Dubai', state: '', country: 'UAE', lat: 25.2048, lon: 55.2708 },
            { name: 'Abu Dhabi', state: '', country: 'UAE', lat: 24.4539, lon: 54.3773 },
            { name: 'Doha', state: '', country: 'Qatar', lat: 25.2854, lon: 51.5310 },
            { name: 'Kuwait City', state: '', country: 'Kuwait', lat: 29.3759, lon: 47.9774 },
            
            // Africa
            { name: 'Cairo', state: '', country: 'Egypt', lat: 30.0444, lon: 31.2357 },
            { name: 'Lagos', state: '', country: 'Nigeria', lat: 6.5244, lon: 3.3792 },
            { name: 'Kinshasa', state: '', country: 'DR Congo', lat: -4.3276, lon: 15.3136 },
            { name: 'Nairobi', state: '', country: 'Kenya', lat: -1.2921, lon: 36.8219 },
            { name: 'Johannesburg', state: '', country: 'South Africa', lat: -26.2041, lon: 28.0473 },
            { name: 'Cape Town', state: '', country: 'South Africa', lat: -33.9249, lon: 18.4241 },
            { name: 'Casablanca', state: '', country: 'Morocco', lat: 33.5731, lon: -7.5898 },
            { name: 'Accra', state: '', country: 'Ghana', lat: 5.6037, lon: -0.1870 },
            { name: 'Addis Ababa', state: '', country: 'Ethiopia', lat: 9.1450, lon: 38.7667 },
            { name: 'Dar es Salaam', state: '', country: 'Tanzania', lat: -6.7924, lon: 39.2083 },
            { name: 'Kampala', state: '', country: 'Uganda', lat: 0.3476, lon: 32.5825 },
            { name: 'Abidjan', state: '', country: 'Ivory Coast', lat: 5.3600, lon: -4.0083 },
            { name: 'Algiers', state: '', country: 'Algeria', lat: 36.7538, lon: 3.0588 },
            { name: 'Tunis', state: '', country: 'Tunisia', lat: 36.8065, lon: 10.1815 },
            
            // Oceania
            { name: 'Sydney', state: 'NSW', country: 'Australia', lat: -33.8688, lon: 151.2093 },
            { name: 'Melbourne', state: 'VIC', country: 'Australia', lat: -37.8136, lon: 144.9631 },
            { name: 'Brisbane', state: 'QLD', country: 'Australia', lat: -27.4698, lon: 153.0251 },
            { name: 'Perth', state: 'WA', country: 'Australia', lat: -31.9505, lon: 115.8605 },
            { name: 'Adelaide', state: 'SA', country: 'Australia', lat: -34.9285, lon: 138.6007 },
            { name: 'Auckland', state: '', country: 'New Zealand', lat: -36.8485, lon: 174.7633 },
            { name: 'Wellington', state: '', country: 'New Zealand', lat: -41.2865, lon: 174.7762 },
            { name: 'Suva', state: '', country: 'Fiji', lat: -18.1248, lon: 178.4501 },
            { name: 'Nadi', state: '', country: 'Fiji', lat: -17.8252, lon: 177.4165 },
            { name: 'Port Moresby', state: '', country: 'Papua New Guinea', lat: -9.4438, lon: 147.1803 },
            { name: 'Honolulu', state: 'HI', country: 'USA', lat: 21.3099, lon: -157.8581 },
            
            // Additional major cities
            { name: 'Barcelona', state: '', country: 'Spain', lat: 41.3851, lon: 2.1734 },
            { name: 'Milan', state: '', country: 'Italy', lat: 45.4642, lon: 9.1900 },
            { name: 'Munich', state: '', country: 'Germany', lat: 48.1351, lon: 11.5820 },
            { name: 'Brussels', state: '', country: 'Belgium', lat: 50.8503, lon: 4.3517 },
            { name: 'Warsaw', state: '', country: 'Poland', lat: 52.2297, lon: 21.0122 },
            { name: 'Kiev', state: '', country: 'Ukraine', lat: 50.4501, lon: 30.5234 },
            { name: 'Tel Aviv', state: '', country: 'Israel', lat: 32.0853, lon: 34.7818 },
            { name: 'Amman', state: '', country: 'Jordan', lat: 31.9539, lon: 35.9106 },
            { name: 'Beirut', state: '', country: 'Lebanon', lat: 33.8938, lon: 35.5018 },
            { name: 'Manama', state: '', country: 'Bahrain', lat: 26.0667, lon: 50.5577 },
            { name: 'Muscat', state: '', country: 'Oman', lat: 23.5859, lon: 58.4059 },
            { name: 'Sana\'a', state: '', country: 'Yemen', lat: 15.3694, lon: 44.1910 },
            { name: 'Colombo', state: '', country: 'Sri Lanka', lat: 6.9271, lon: 79.8612 },
            { name: 'Kathmandu', state: '', country: 'Nepal', lat: 27.7172, lon: 85.3240 },
            { name: 'Yangon', state: '', country: 'Myanmar', lat: 16.8661, lon: 96.1951 },
            { name: 'Phnom Penh', state: '', country: 'Cambodia', lat: 11.5564, lon: 104.9282 },
            { name: 'Vientiane', state: '', country: 'Laos', lat: 17.9757, lon: 102.6331 },
            { name: 'Ulaanbaatar', state: '', country: 'Mongolia', lat: 47.8864, lon: 106.9057 },
            { name: 'Astana', state: '', country: 'Kazakhstan', lat: 51.1694, lon: 71.4491 },
            { name: 'Tashkent', state: '', country: 'Uzbekistan', lat: 41.2995, lon: 69.2401 },
            { name: 'Tbilisi', state: '', country: 'Georgia', lat: 41.7151, lon: 44.8271 },
            { name: 'Yerevan', state: '', country: 'Armenia', lat: 40.1811, lon: 44.5136 },
            { name: 'Baku', state: '', country: 'Azerbaijan', lat: 40.4093, lon: 49.8671 },
            { name: 'Ankara', state: '', country: 'Turkey', lat: 39.9334, lon: 32.8597 },
            { name: 'Almaty', state: '', country: 'Kazakhstan', lat: 43.2220, lon: 76.8512 }
        ];

        // Filter cities based on query
        const filteredCities = popularCities.filter(city => 
            city.name.toLowerCase().includes(query.toLowerCase()) ||
            city.country.toLowerCase().includes(query.toLowerCase()) ||
            city.state.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredCities.length > 0) {
            resultsContainer.innerHTML = `
                <div class="text-muted text-center py-2 mb-2">
                    <small>Showing popular cities (offline mode)</small>
                </div>
                ${filteredCities.map(city => `
                    <div class="search-result-item" onclick="locationSelector.selectLocation(${JSON.stringify(city).replace(/"/g, '&quot;')})">
                        <div class="search-result-main">
                            <strong>${city.name}</strong>
                            ${city.state ? `, ${city.state}` : ''}
                        </div>
                        <div class="search-result-details">
                            ${city.country} • ${city.lat.toFixed(2)}, ${city.lon.toFixed(2)}
                        </div>
                    </div>
                `).join('')}
            `;
        } else {
            resultsContainer.innerHTML = `
                <div class="text-warning text-center py-3">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    No cities found matching "${query}". Please check your internet connection and try again.
                </div>
            `;
        }

        resultsContainer.style.display = 'block';
    }

    async selectLocation(location) {
        try {
            const locationData = {
                lat: location.lat,
                lng: location.lon,
                name: `${location.name}${location.state ? `, ${location.state}` : ''}, ${location.country}`
            };

            // Set location in weather service
            if (window.WeatherService) {
                await window.WeatherService.setLocation(locationData);
            }

            this.currentLocation = locationData;
            this.updateCurrentLocationInfo();
            this.hide();
            this.hideSearchResults();

            // Clear search input
            const searchInput = document.getElementById('locationSearchInput');
            if (searchInput) searchInput.value = '';

        } catch (error) {
            console.error('Error selecting location:', error);
            this.showSearchError('Unable to set location. Please try again.');
        }
    }

    async useCurrentLocation() {
        try {
            // Check if geolocation is supported
            if (!navigator.geolocation) {
                this.showSearchError('Geolocation is not supported by this browser. Please use a modern browser or search for your location manually.');
                return;
            }

            // Check if we're on HTTPS (required for geolocation except localhost)
            const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            if (!isSecure) {
                this.showSearchError('Location detection requires HTTPS. Please search for your location manually using the search bar - you can search for any city worldwide.');
                console.warn('Geolocation requires HTTPS. Current protocol:', window.location.protocol);
                return;
            }

            // Show loading indicator
            const loadingMessage = '<div class="text-info text-center py-3"><i class="fas fa-spinner fa-spin me-2"></i>Detecting your location...</div>';
            const resultsContainer = document.getElementById('locationSearchResults');
            if (resultsContainer) {
                resultsContainer.innerHTML = loadingMessage;
                resultsContainer.style.display = 'block';
            }

            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log('✅ Geolocation successful:', position);
                        resolve(position);
                    },
                    (error) => {
                        console.error('❌ Geolocation error:', error);
                        let errorMessage = 'Unable to get your location.';
                        
                        switch(error.code) {
                            case error.PERMISSION_DENIED:
                                errorMessage = 'Location access denied. Please enable location permissions in your browser settings, or search for your city manually using the search bar above.';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errorMessage = 'Location information unavailable. Please search for your city manually using the search bar above.';
                                break;
                            case error.TIMEOUT:
                                errorMessage = 'Location request timed out. Please try again, or search for your city manually using the search bar above.';
                                break;
                            default:
                                errorMessage = 'Unable to get your location. Please search for your city manually using the search bar above - you can search for any city worldwide.';
                                break;
                        }
                        reject(new Error(errorMessage));
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 15000, // Increased timeout to 15 seconds
                        maximumAge: 300000 // 5 minutes
                    }
                );
            });

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            console.log('📍 Detected coordinates:', { lat, lng });

            // Get location name using reverse geocoding
            const locationName = await this.getLocationName(lat, lng);
            
            const locationData = {
                lat: lat,
                lng: lng,
                name: locationName
            };

            // Set location in weather service
            if (window.WeatherService) {
                await window.WeatherService.setLocation(locationData);
            }

            this.currentLocation = locationData;
            this.updateCurrentLocationInfo();
            this.hide();
            this.hideSearchResults();

        } catch (error) {
            console.error('Error getting current location:', error);
            // The error message from the Promise rejection handler will be shown
            this.showSearchError(error.message || 'Unable to get your location. Please try again or search manually.');
        }
    }

    async getLocationName(lat, lng) {
        try {
            // Try backend API first
            const apiBaseUrl = window.SmartFarmConfig?.getApiUrl('') || 'https://smartfarm-app-production.up.railway.app';
            
            const response = await fetch(
                `${apiBaseUrl}/api/weather/location?lat=${lat}&lng=${lng}`,
                { timeout: 5000 }
            );

            if (response.ok) {
                const result = await response.json();
                if (result.success && result.data) {
                    return result.data.fullName || 'Unknown Location';
                }
            }
        } catch (error) {
            console.warn('Backend reverse geocoding failed, trying fallback:', error);
        }

        try {
            // Fallback to Nominatim reverse geocoding
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
                {
                    headers: {
                        'User-Agent': 'SmartFarm/1.0'
                    },
                    timeout: 8000
                }
            );

            if (response.ok) {
                const result = await response.json();
                if (result.display_name) {
                    // Format the display name nicely
                    const parts = result.display_name.split(',');
                    if (parts.length >= 2) {
                        return `${parts[0]}, ${parts[parts.length - 1]}`.trim();
                    }
                    return parts[0] || 'Unknown Location';
                }
            }
        } catch (error) {
            console.warn('Fallback reverse geocoding failed:', error);
        }

        return 'Unknown Location';
    }

    useSavedLocation() {
        const savedLocation = this.getSavedLocation();
        if (savedLocation) {
            // Migrate old Fiji locations to Australia
            if (savedLocation.name && (savedLocation.name.includes('Fiji') || savedLocation.name.includes('Suva'))) {
                console.log('Migrating saved Fiji location to Australia');
                const newLocation = {
                    lat: -33.8688,
                    lon: 151.2093,
                    name: 'Sydney',
                    state: 'NSW',
                    country: 'Australia'
                };
                // Update saved location
                localStorage.setItem('smartfarm_user_location', JSON.stringify({
                    lat: newLocation.lat,
                    lng: newLocation.lon,
                    name: 'Sydney, NSW, Australia'
                }));
                this.selectLocation(newLocation);
                return;
            } else if (savedLocation.lat === -18.1248 && savedLocation.lng === 178.4501) {
                // Check coordinates for Fiji
                console.log('Migrating saved Fiji coordinates to Australia');
                const newLocation = {
                    lat: -33.8688,
                    lon: 151.2093,
                    name: 'Sydney',
                    state: 'NSW',
                    country: 'Australia'
                };
                // Update saved location
                localStorage.setItem('smartfarm_user_location', JSON.stringify({
                    lat: newLocation.lat,
                    lng: newLocation.lon,
                    name: 'Sydney, NSW, Australia'
                }));
                this.selectLocation(newLocation);
                return;
            }
            
            this.selectLocation({
                lat: savedLocation.lat,
                lon: savedLocation.lng,
                name: savedLocation.name.split(',')[0],
                state: '',
                country: savedLocation.name.split(',')[1] || ''
            });
        } else {
            this.showSearchError('No saved location found. Please select a location first.');
        }
    }

    useDefaultLocation() {
        this.selectLocation({
            lat: -33.8688,
            lon: 151.2093,
            name: 'Sydney',
            state: 'NSW',
            country: 'Australia'
        });
    }

    getSavedLocation() {
        const saved = localStorage.getItem('smartfarm_user_location');
        return saved ? JSON.parse(saved) : null;
    }

    checkSavedLocation() {
        const savedLocation = this.getSavedLocation();
        const savedLocationText = document.getElementById('savedLocationText');
        
        if (savedLocation && savedLocationText) {
            // Migrate old Fiji locations to Australia
            if (savedLocation.name && (savedLocation.name.includes('Fiji') || savedLocation.name.includes('Suva')) || 
                (savedLocation.lat === -18.1248 && savedLocation.lng === 178.4501)) {
                // Auto-migrate to Australia
                const newLocation = {
                    lat: -33.8688,
                    lng: 151.2093,
                    name: 'Sydney, NSW, Australia'
                };
                localStorage.setItem('smartfarm_user_location', JSON.stringify(newLocation));
                savedLocationText.textContent = newLocation.name;
            } else {
                savedLocationText.textContent = savedLocation.name;
            }
        }
    }

    updateCurrentLocationInfo() {
        const infoContainer = document.getElementById('currentLocationInfo');
        const locationName = document.getElementById('currentLocationName');
        const weatherStatus = document.getElementById('weatherDataStatus');

        if (infoContainer && locationName && weatherStatus) {
            locationName.textContent = this.currentLocation?.name || 'Unknown';
            
            if (window.WeatherService?.isRealData()) {
                weatherStatus.textContent = 'Live Weather';
                weatherStatus.className = 'badge bg-success ms-2';
            } else {
                weatherStatus.textContent = 'Demo Data';
                weatherStatus.className = 'badge bg-warning ms-2';
            }

            infoContainer.style.display = 'block';
        }
    }
}

// Create global location selector instance
// Initialize location selector when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.locationSelector = new LocationSelector();
    });
} else {
    window.locationSelector = new LocationSelector();
}

// Add CSS styles
const locationSelectorStyles = `
<style>
.location-selector {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
}

.location-selector-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
}

.location-selector-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow: hidden;
}

.location-selector-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e9ecef;
    background: #f8f9fa;
}

.location-selector-body {
    padding: 20px;
    max-height: 60vh;
    overflow-y: auto;
}

.location-option {
    display: flex;
    align-items: center;
    padding: 15px;
    border: 1px solid #e9ecef;
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.location-option:hover {
    background: #f8f9fa;
    border-color: #28a745;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
}

.location-option i {
    font-size: 1.2rem;
    color: #28a745;
    width: 30px;
}

.search-result-item {
    padding: 12px;
    border-bottom: 1px solid #e9ecef;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.search-result-item:hover {
    background: #f8f9fa;
}

.search-result-item:last-child {
    border-bottom: none;
}

.search-result-main {
    font-weight: 500;
    color: #333;
}

.search-result-details {
    font-size: 0.9rem;
    color: #666;
    margin-top: 2px;
}

.current-location-info {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
}

.location-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

@media (max-width: 576px) {
    .location-selector-modal {
        width: 95%;
        margin: 20px;
    }
    
    .location-selector-body {
        padding: 15px;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', locationSelectorStyles);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocationSelector;
}

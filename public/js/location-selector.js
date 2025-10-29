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
                        
                        <div class="location-options">
                            <div class="location-option" onclick="locationSelector.useCurrentLocation()">
                                <i class="fas fa-crosshairs me-2"></i>
                                <div>
                                    <strong>Use My Current Location</strong>
                                    <small class="text-muted">Automatically detect your location</small>
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
                                    <strong>Use Default (Fiji)</strong>
                                    <small class="text-muted">Default location for SmartFarm</small>
                                </div>
                            </div>
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
            resultsContainer.innerHTML = `<div class="text-danger text-center py-3">${message}</div>`;
            resultsContainer.style.display = 'block';
        }
    }

    showPopularCities(query) {
        const resultsContainer = document.getElementById('locationSearchResults');
        if (!resultsContainer) return;

        // Popular cities database
        const popularCities = [
            { name: 'New York', state: 'NY', country: 'USA', lat: 40.7128, lon: -74.0060 },
            { name: 'London', state: '', country: 'UK', lat: 51.5074, lon: -0.1278 },
            { name: 'Tokyo', state: '', country: 'Japan', lat: 35.6762, lon: 139.6503 },
            { name: 'Paris', state: '', country: 'France', lat: 48.8566, lon: 2.3522 },
            { name: 'Sydney', state: 'NSW', country: 'Australia', lat: -33.8688, lon: 151.2093 },
            { name: 'Toronto', state: 'ON', country: 'Canada', lat: 43.6532, lon: -79.3832 },
            { name: 'Berlin', state: '', country: 'Germany', lat: 52.5200, lon: 13.4050 },
            { name: 'Mumbai', state: 'MH', country: 'India', lat: 19.0760, lon: 72.8777 },
            { name: 'São Paulo', state: 'SP', country: 'Brazil', lat: -23.5505, lon: -46.6333 },
            { name: 'Cairo', state: '', country: 'Egypt', lat: 30.0444, lon: 31.2357 },
            { name: 'Lagos', state: '', country: 'Nigeria', lat: 6.5244, lon: 3.3792 },
            { name: 'Nairobi', state: '', country: 'Kenya', lat: -1.2921, lon: 36.8219 },
            { name: 'Johannesburg', state: '', country: 'South Africa', lat: -26.2041, lon: 28.0473 },
            { name: 'Dubai', state: '', country: 'UAE', lat: 25.2048, lon: 55.2708 },
            { name: 'Singapore', state: '', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
            { name: 'Bangkok', state: '', country: 'Thailand', lat: 13.7563, lon: 100.5018 },
            { name: 'Seoul', state: '', country: 'South Korea', lat: 37.5665, lon: 126.9780 },
            { name: 'Mexico City', state: 'CDMX', country: 'Mexico', lat: 19.4326, lon: -99.1332 },
            { name: 'Buenos Aires', state: '', country: 'Argentina', lat: -34.6118, lon: -58.3960 },
            { name: 'Moscow', state: '', country: 'Russia', lat: 55.7558, lon: 37.6176 }
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
                this.showSearchError('Location detection requires HTTPS. Please search for your location manually.');
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
                                errorMessage = 'Location access denied. Please enable location permissions in your browser settings and try again.';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errorMessage = 'Location information unavailable. Please try again or search manually.';
                                break;
                            case error.TIMEOUT:
                                errorMessage = 'Location request timed out. Please try again or search manually.';
                                break;
                            default:
                                errorMessage = 'Unable to get your location. Please try again or search manually.';
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
            lat: -18.1248,
            lon: 178.4501,
            name: 'Suva',
            state: '',
            country: 'Fiji'
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
            savedLocationText.textContent = savedLocation.name;
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

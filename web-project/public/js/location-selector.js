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

        if (document.body) {
            document.body.insertAdjacentHTML('beforeend', selectorHTML);
        } else {
            // Wait for DOM to be ready
            document.addEventListener('DOMContentLoaded', () => {
                document.body.insertAdjacentHTML('beforeend', selectorHTML);
            });
        }
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

        try {
            // Get API base URL from config
            const apiBaseUrl = window.SmartFarmConfig?.getApiUrl('') || 'https://smartfarm-app-production.up.railway.app';
            
            const response = await fetch(
                `${apiBaseUrl}/api/weather/search?q=${encodeURIComponent(query)}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.useDemo) {
                    this.showSearchError('Weather API not configured on server');
                    return;
                }
                throw new Error(`Search API error: ${response.status}`);
            }

            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Search failed');
            }

            // Convert backend format to display format
            const results = result.data.map(loc => ({
                name: loc.name,
                state: loc.state,
                country: loc.country,
                lat: loc.lat,
                lon: loc.lng
            }));

            this.displaySearchResults(results);

        } catch (error) {
            console.error('Error searching locations:', error);
            this.showSearchError('Unable to search locations. Please try again.');
        }
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
            if (!navigator.geolocation) {
                this.showSearchError('Geolocation is not supported by this browser.');
                return;
            }

            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000
                });
            });

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

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

        } catch (error) {
            console.error('Error getting current location:', error);
            this.showSearchError('Unable to get your location. Please try again or search manually.');
        }
    }

    async getLocationName(lat, lng) {
        try {
            // Get API base URL from config
            const apiBaseUrl = window.SmartFarmConfig?.getApiUrl('') || 'https://smartfarm-app-production.up.railway.app';
            
            const response = await fetch(
                `${apiBaseUrl}/api/weather/location?lat=${lat}&lng=${lng}`
            );

            if (!response.ok) return 'Unknown Location';

            const result = await response.json();
            if (result.success && result.data) {
                return result.data.fullName || 'Unknown Location';
            }

            return 'Unknown Location';
        } catch (error) {
            console.error('Error getting location name:', error);
            return 'Unknown Location';
        }
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
window.locationSelector = new LocationSelector();

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

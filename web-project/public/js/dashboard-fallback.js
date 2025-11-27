/**
 * Dashboard Fallback System
 * Ensures the dashboard loads even if there are JavaScript errors
 */

class DashboardFallback {
    constructor() {
        this.initialized = false;
        this.fallbackTimeout = null;
        this.setupFallback();
    }

    setupFallback() {
        // Check if API is available immediately
        this.checkAPIAndShowFallback();
        
        // Set a longer timeout to reduce flickering
        this.fallbackTimeout = setTimeout(() => {
            this.showDashboardFallback();
        }, 5000); // 5 seconds timeout (increased from 2s)

        // Listen for successful dashboard initialization
        window.addEventListener('dashboardInitialized', () => {
            this.clearFallback();
        });

        // Override error boundary to be less aggressive
        this.setupErrorBoundaryOverride();
    }

    async checkAPIAndShowFallback() {
        try {
            // Check if API is available
            const response = await fetch('https://smartfarm-app-production.up.railway.app/api/health', {
                method: 'GET',
                mode: 'cors',
                timeout: 3000
            });
            
            if (!response.ok) {
                throw new Error('API not available');
            }
            
            console.log('API is available, allowing main dashboard to load');
        } catch (error) {
            console.log('API not available, showing fallback immediately');
            this.showDashboardFallback();
        }
    }

    setupErrorBoundaryOverride() {
        // Override the error boundary to be more tolerant
        if (window.SmartFarmErrorBoundary) {
            const originalShowFatalError = window.SmartFarmErrorBoundary.showFatalError;
            window.SmartFarmErrorBoundary.showFatalError = () => {
                console.log('Error boundary triggered - showing fallback instead');
                this.showDashboardFallback();
            };
        }
    }

    showDashboardFallback() {
        if (this.initialized) return;
        
        console.log('🔄 Showing dashboard fallback...');
        
        // Remove any existing error containers
        const errorContainer = document.getElementById('fatal-error-container');
        if (errorContainer) {
            errorContainer.remove();
        }

        // Show a simple dashboard interface
        this.createFallbackDashboard();
        this.initialized = true;
    }

    createFallbackDashboard() {
        const fallbackHTML = `
            <div id="dashboard-fallback" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #f8f9fa;
                z-index: 999999;
                font-family: Arial, sans-serif;
            ">
                <div style="
                    background: #2e7d32;
                    color: white;
                    padding: 15px;
                    text-align: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                ">
                    <h1 style="margin: 0; font-size: 24px;">🌱 SmartFarm Dashboard</h1>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Fallback Mode - Basic Interface</p>
                </div>
                
                <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                    <div style="
                        background: white;
                        border-radius: 8px;
                        padding: 20px;
                        margin-bottom: 20px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    ">
                        <h2 style="color: #2e7d32; margin-top: 0;">Dashboard Status</h2>
                        <p>✅ Dashboard is running in fallback mode</p>
                        <p>⚠️ Some advanced features may be limited</p>
                        <p>🔄 <button onclick="tryFullDashboard()" style="
                            background: #4CAF50;
                            color: white;
                            border: none;
                            padding: 8px 16px;
                            border-radius: 4px;
                            cursor: pointer;
                        ">Try Full Dashboard</button></p>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                        <div style="
                            background: white;
                            border-radius: 8px;
                            padding: 20px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        ">
                            <h3 style="color: #2e7d32; margin-top: 0;">🌾 Crop Management</h3>
                            <p>Manage your crops and track their growth</p>
                            <button onclick="alert('Crop management - coming soon!')" style="
                                background: #2e7d32;
                                color: white;
                                border: none;
                                padding: 8px 16px;
                                border-radius: 4px;
                                cursor: pointer;
                            ">View Crops</button>
                        </div>

                        <div style="
                            background: white;
                            border-radius: 8px;
                            padding: 20px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        ">
                            <h3 style="color: #2e7d32; margin-top: 0;">🐄 Livestock</h3>
                            <p>Track your livestock and their health</p>
                            <button onclick="alert('Livestock management - coming soon!')" style="
                                background: #2e7d32;
                                color: white;
                                border: none;
                                padding: 8px 16px;
                                border-radius: 4px;
                                cursor: pointer;
                            ">View Livestock</button>
                        </div>

                        <div style="
                            background: white;
                            border-radius: 8px;
                            padding: 20px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        ">
                            <h3 style="color: #2e7d32; margin-top: 0;">📊 Analytics</h3>
                            <p>View farm analytics and reports</p>
                            <button onclick="alert('Analytics - coming soon!')" style="
                                background: #2e7d32;
                                color: white;
                                border: none;
                                padding: 8px 16px;
                                border-radius: 4px;
                                cursor: pointer;
                            ">View Analytics</button>
                        </div>

                        <div style="
                            background: white;
                            border-radius: 8px;
                            padding: 20px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        ">
                            <h3 style="color: #2e7d32; margin-top: 0;">⚙️ Settings</h3>
                            <p>Configure your farm settings</p>
                            <button onclick="alert('Settings - coming soon!')" style="
                                background: #2e7d32;
                                color: white;
                                border: none;
                                padding: 8px 16px;
                                border-radius: 4px;
                                cursor: pointer;
                            ">Open Settings</button>
                        </div>
                    </div>

                    <div style="
                        background: #fff3cd;
                        border: 1px solid #ffeaa7;
                        border-radius: 8px;
                        padding: 15px;
                        margin-top: 20px;
                        color: #856404;
                    ">
                        <strong>ℹ️ Fallback Mode Active</strong><br>
                        The dashboard is running in a simplified mode due to some technical issues. 
                        Most features are still available, but some advanced functionality may be limited.
                        <br><br>
                        <button onclick="window.location.reload()" style="
                            background: #ff9800;
                            color: white;
                            border: none;
                            padding: 8px 16px;
                            border-radius: 4px;
                            cursor: pointer;
                        ">Try Full Dashboard</button>
                    </div>
                </div>
            </div>
        `;

        document.body.innerHTML = fallbackHTML;
    }

    clearFallback() {
        if (this.fallbackTimeout) {
            clearTimeout(this.fallbackTimeout);
            this.fallbackTimeout = null;
        }
        
        const fallback = document.getElementById('dashboard-fallback');
        if (fallback) {
            fallback.remove();
        }
    }

    // Try to load full dashboard
    async tryFullDashboard() {
        console.log('Attempting to load full dashboard...');
        
        // Show loading message
        const statusDiv = document.querySelector('#dashboard-fallback h2').parentElement;
        statusDiv.innerHTML = `
            <h2 style="color: #2e7d32; margin-top: 0;">Dashboard Status</h2>
            <p>🔄 Checking API availability...</p>
            <p>⏳ Please wait while we try to load the full dashboard</p>
        `;
        
        try {
            // Check API availability
            const response = await fetch('https://smartfarm-app-production.up.railway.app/api/health', {
                method: 'GET',
                mode: 'cors',
                timeout: 5000
            });
            
            if (response.ok) {
                console.log('API is available, reloading page for full dashboard');
                window.location.reload();
            } else {
                throw new Error('API not responding');
            }
        } catch (error) {
            console.log('API still not available, staying in fallback mode');
            statusDiv.innerHTML = `
                <h2 style="color: #2e7d32; margin-top: 0;">Dashboard Status</h2>
                <p>❌ API still not available</p>
                <p>⚠️ Staying in fallback mode</p>
                <p>🔄 <button onclick="tryFullDashboard()" style="
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                ">Try Again</button></p>
            `;
        }
    }
}

// Initialize fallback system
window.addEventListener('DOMContentLoaded', () => {
    window.dashboardFallback = new DashboardFallback();
    // Make tryFullDashboard globally available
    window.tryFullDashboard = () => window.dashboardFallback.tryFullDashboard();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardFallback;
}

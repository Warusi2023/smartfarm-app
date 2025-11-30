/**
 * Weather Alerts Dashboard Widget
 * Displays weather alerts on the main dashboard
 */

class WeatherAlertsWidget {
    constructor(containerId = 'weather-alerts-widget') {
        this.containerId = containerId;
        this.service = window.weatherAlertsService || new WeatherAlertsService();
        this.alerts = [];
        this.stats = null;
    }

    /**
     * Initialize and render the widget
     */
    async init() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.warn(`Weather alerts widget container not found: ${this.containerId}`);
            return;
        }

        // Load alerts and stats
        await this.loadData();
        this.render();
        
        // Set up auto-refresh (every 5 minutes)
        setInterval(() => this.refresh(), 5 * 60 * 1000);
    }

    /**
     * Load alerts and statistics
     */
    async loadData() {
        try {
            const [alertsResponse, statsResponse] = await Promise.all([
                this.service.getAlerts({ unreadOnly: true, limit: 5 }).catch(err => {
                    console.warn('Weather alerts API unavailable:', err);
                    return { success: false, error: err.message };
                }),
                this.service.getStats().catch(err => {
                    console.warn('Weather alerts stats API unavailable:', err);
                    return { success: false, error: err.message };
                })
            ]);

            if (alertsResponse && alertsResponse.success) {
                this.alerts = alertsResponse.data || [];
            } else {
                this.alerts = [];
            }

            if (statsResponse && statsResponse.success) {
                this.stats = statsResponse.data;
            } else {
                this.stats = { total: 0, unread: 0, critical: 0, high: 0, upcoming: 0 };
            }
        } catch (error) {
            console.warn('Error loading weather alerts data (non-critical):', error);
            // Set empty defaults so widget still renders
            this.alerts = [];
            this.stats = { total: 0, unread: 0, critical: 0, high: 0, upcoming: 0 };
        }
    }

    /**
     * Refresh the widget
     */
    async refresh() {
        await this.loadData();
        this.render();
    }

    /**
     * Render the widget
     */
    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const unreadCount = this.stats?.unread || this.alerts.length;
        const criticalCount = this.stats?.critical || 0;

        container.innerHTML = `
            <div class="weather-alerts-widget">
                <div class="widget-header">
                    <h5>
                        <span class="alert-icon">🌤️</span>
                        Weather Alerts
                        ${unreadCount > 0 ? `<span class="badge badge-danger">${unreadCount}</span>` : ''}
                    </h5>
                    <a href="weather-alerts.html" class="view-all-link">View All</a>
                </div>
                
                ${this.renderAlertsList()}
                
                ${this.renderEmptyState()}
            </div>
        `;

        // Attach event listeners
        this.attachEventListeners();
    }

    /**
     * Render alerts list
     */
    renderAlertsList() {
        if (this.alerts.length === 0) {
            return '';
        }

        return `
            <div class="alerts-list">
                ${this.alerts.map(alert => this.renderAlertItem(alert)).join('')}
            </div>
        `;
    }

    /**
     * Render a single alert item
     */
    renderAlertItem(alert) {
        const severityClass = this.service.getSeverityClass(alert.severity);
        const icon = this.service.getAlertTypeIcon(alert.alert_type);
        const expectedTime = this.service.formatExpectedTime(alert.expected_time);

        return `
            <div class="alert-item ${severityClass}" data-alert-id="${alert.id}">
                <div class="alert-icon-badge">${icon}</div>
                <div class="alert-content">
                    <div class="alert-title">${alert.title}</div>
                    <div class="alert-message">${alert.message}</div>
                    <div class="alert-meta">
                        <span class="alert-time">${expectedTime}</span>
                        ${alert.farm_name ? `<span class="alert-farm">${alert.farm_name}</span>` : ''}
                    </div>
                </div>
                <div class="alert-actions">
                    <button class="btn btn-sm btn-outline-primary mark-read-btn" 
                            data-alert-id="${alert.id}"
                            title="Mark as read">
                        ✓
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render empty state
     */
    renderEmptyState() {
        if (this.alerts.length > 0) {
            return '';
        }

        return `
            <div class="alerts-empty">
                <div class="empty-icon">☀️</div>
                <div class="empty-message">No weather alerts at this time</div>
                <div class="empty-submessage">You'll be notified when important weather events are detected</div>
            </div>
        `;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Mark as read buttons
        document.querySelectorAll('.mark-read-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const alertId = e.target.dataset.alertId;
                await this.handleMarkAsRead(alertId);
            });
        });

        // Alert item click (navigate to details)
        document.querySelectorAll('.alert-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.alert-actions')) {
                    const alertId = item.dataset.alertId;
                    window.location.href = `weather-alerts.html?id=${alertId}`;
                }
            });
        });
    }

    /**
     * Handle mark as read
     */
    async handleMarkAsRead(alertId) {
        try {
            const response = await this.service.markAsRead(alertId);
            if (response.success) {
                // Refresh the widget
                await this.refresh();
                
                // Show success message
                this.showNotification('Alert marked as read', 'success');
            } else {
                throw new Error(response.error);
            }
        } catch (error) {
            console.error('Error marking alert as read:', error);
            this.showNotification('Failed to mark alert as read', 'error');
        }
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Simple notification - can be enhanced with a toast library
        const notification = document.createElement('div');
        notification.className = `alert-notification alert-notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Auto-initialize if container exists
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('weather-alerts-widget')) {
        const widget = new WeatherAlertsWidget();
        widget.init();
    }
});

// Export for manual initialization
window.WeatherAlertsWidget = WeatherAlertsWidget;


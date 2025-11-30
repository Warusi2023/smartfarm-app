/**
 * Weather Alerts Page Controller
 * Handles the full weather alerts page functionality
 */

class WeatherAlertsPage {
    constructor() {
        this.service = window.weatherAlertsService || new WeatherAlertsService();
        this.alerts = [];
        this.filters = {
            farmId: '',
            severity: '',
            type: '',
            status: ''
        };
    }

    async init() {
        await this.loadStats();
        await this.loadFarms();
        await this.loadAlerts();
        this.setupEventListeners();
    }

    async loadStats() {
        try {
            const response = await this.service.getStats();
            if (response.success) {
                this.updateStats(response.data);
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    updateStats(stats) {
        document.getElementById('stat-total').textContent = stats.total || 0;
        document.getElementById('stat-unread').textContent = stats.unread || 0;
        document.getElementById('stat-critical').textContent = stats.critical || 0;
        document.getElementById('stat-high').textContent = stats.high || 0;
    }

    async loadFarms() {
        // This would typically fetch from farms API
        // For now, we'll leave it empty or add a placeholder
        const farmSelect = document.getElementById('filter-farm');
        // Farms would be loaded from the farms API
    }

    async loadAlerts() {
        const container = document.getElementById('alerts-container');
        container.innerHTML = '<div class="text-center py-5"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';

        try {
            const response = await this.service.getAlerts({ limit: 100 });
            if (response.success) {
                this.alerts = response.data || [];
                this.renderAlerts();
            } else {
                container.innerHTML = '<div class="alert alert-danger">Failed to load alerts: ' + (response.error || 'Unknown error') + '</div>';
            }
        } catch (error) {
            console.error('Error loading alerts:', error);
            container.innerHTML = '<div class="alert alert-danger">Error loading alerts. Please try again later.</div>';
        }
    }

    renderAlerts() {
        const container = document.getElementById('alerts-container');
        
        // Apply filters
        let filteredAlerts = this.alerts;
        
        if (this.filters.farmId) {
            filteredAlerts = filteredAlerts.filter(a => a.farm_id === this.filters.farmId);
        }
        
        if (this.filters.severity) {
            filteredAlerts = filteredAlerts.filter(a => a.severity === this.filters.severity);
        }
        
        if (this.filters.type) {
            filteredAlerts = filteredAlerts.filter(a => a.alert_type === this.filters.type);
        }
        
        if (this.filters.status === 'unread') {
            filteredAlerts = filteredAlerts.filter(a => !a.is_read);
        } else if (this.filters.status === 'read') {
            filteredAlerts = filteredAlerts.filter(a => a.is_read && !a.is_dismissed);
        } else if (this.filters.status === 'dismissed') {
            filteredAlerts = filteredAlerts.filter(a => a.is_dismissed);
        }

        if (filteredAlerts.length === 0) {
            container.innerHTML = `
                <div class="alerts-empty">
                    <div class="empty-icon">☀️</div>
                    <div class="empty-message">No alerts found</div>
                    <div class="empty-submessage">Try adjusting your filters</div>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredAlerts.map(alert => this.renderAlertCard(alert)).join('');
        
        // Attach event listeners to alert cards
        this.attachAlertListeners();
    }

    renderAlertCard(alert) {
        const severityClass = this.service.getSeverityClass(alert.severity);
        const icon = this.service.getAlertTypeIcon(alert.alert_type);
        const expectedTime = this.service.formatExpectedTime(alert.expected_time);
        const readClass = alert.is_read ? 'opacity-75' : '';
        const dismissedClass = alert.is_dismissed ? 'text-decoration-line-through' : '';

        return `
            <div class="alert-item ${severityClass} ${readClass} ${dismissedClass}" data-alert-id="${alert.id}">
                <div class="alert-icon-badge">${icon}</div>
                <div class="alert-content">
                    <div class="alert-title">${alert.title}</div>
                    <div class="alert-message">${alert.message}</div>
                    <div class="alert-meta">
                        <span class="alert-time">${expectedTime}</span>
                        ${alert.farm_name ? `<span class="alert-farm">${alert.farm_name}</span>` : ''}
                        <span class="badge badge-${severityClass.replace('alert-', '')}">${alert.severity}</span>
                    </div>
                </div>
                <div class="alert-actions">
                    ${!alert.is_read ? `
                        <button class="btn btn-sm btn-outline-primary mark-read-btn" 
                                data-alert-id="${alert.id}"
                                title="Mark as read">
                            ✓ Read
                        </button>
                    ` : ''}
                    ${!alert.is_dismissed ? `
                        <button class="btn btn-sm btn-outline-secondary dismiss-btn" 
                                data-alert-id="${alert.id}"
                                title="Dismiss">
                            ✕ Dismiss
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    attachAlertListeners() {
        // Mark as read
        document.querySelectorAll('.mark-read-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const alertId = e.target.dataset.alertId;
                await this.handleMarkAsRead(alertId);
            });
        });

        // Dismiss
        document.querySelectorAll('.dismiss-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const alertId = e.target.dataset.alertId;
                await this.handleDismiss(alertId);
            });
        });

        // Click to view details
        document.querySelectorAll('.alert-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.alert-actions')) {
                    const alertId = item.dataset.alertId;
                    this.viewAlertDetails(alertId);
                }
            });
        });
    }

    async handleMarkAsRead(alertId) {
        try {
            const response = await this.service.markAsRead(alertId);
            if (response.success) {
                await this.loadAlerts();
                await this.loadStats();
                this.showNotification('Alert marked as read', 'success');
            }
        } catch (error) {
            this.showNotification('Failed to mark alert as read', 'error');
        }
    }

    async handleDismiss(alertId) {
        try {
            const response = await this.service.dismissAlert(alertId);
            if (response.success) {
                await this.loadAlerts();
                await this.loadStats();
                this.showNotification('Alert dismissed', 'success');
            }
        } catch (error) {
            this.showNotification('Failed to dismiss alert', 'error');
        }
    }

    viewAlertDetails(alertId) {
        // Could navigate to a detail page or show a modal
        console.log('View alert details:', alertId);
    }

    setupEventListeners() {
        // Filter changes
        document.getElementById('filter-farm').addEventListener('change', (e) => {
            this.filters.farmId = e.target.value;
            this.renderAlerts();
        });

        document.getElementById('filter-severity').addEventListener('change', (e) => {
            this.filters.severity = e.target.value;
            this.renderAlerts();
        });

        document.getElementById('filter-type').addEventListener('change', (e) => {
            this.filters.type = e.target.value;
            this.renderAlerts();
        });

        document.getElementById('filter-status').addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.renderAlerts();
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert-notification alert-notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const page = new WeatherAlertsPage();
    page.init();
});


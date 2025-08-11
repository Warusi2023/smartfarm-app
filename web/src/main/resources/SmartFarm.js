/**
 * SmartFarm Web Application
 * Comprehensive farm management solution with modern UI/UX
 */

class SmartFarmApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.tasks = [];
        this.notifications = [];
        this.crops = [];
        this.livestock = [];
        this.equipment = [];
        this.financialData = {};
        this.charts = {};
        this.settings = this.loadSettings();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadData();
        this.initializeCharts();
        this.updateDashboard();
        this.hideLoading();
        this.applyTheme();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.navigateToSection(e.currentTarget.dataset.section);
            });
        });

        // Header actions
        document.getElementById('addTaskBtn')?.addEventListener('click', () => {
            this.showTaskModal();
        });

        document.getElementById('notificationsBtn')?.addEventListener('click', () => {
            this.toggleNotificationsPanel();
        });

        document.getElementById('settingsBtn')?.addEventListener('click', () => {
            this.showSettingsModal();
        });

        // Quick action buttons
        document.getElementById('addCropBtn')?.addEventListener('click', () => {
            this.showAddCropModal();
        });

        document.getElementById('addLivestockBtn')?.addEventListener('click', () => {
            this.showAddLivestockModal();
        });

        document.getElementById('scheduleTaskBtn')?.addEventListener('click', () => {
            this.showTaskModal();
        });

        document.getElementById('viewReportsBtn')?.addEventListener('click', () => {
            this.showReportsModal();
        });

        // Modal events
        this.setupModalEvents();

        // Settings
        this.setupSettingsEvents();

        // Touch and keyboard support
        this.setupAccessibility();
    }

    setupModalEvents() {
        // Task modal
        const taskModal = document.getElementById('taskModal');
        const closeTaskModal = document.getElementById('closeTaskModal');
        const cancelTask = document.getElementById('cancelTask');
        const saveTask = document.getElementById('saveTask');

        closeTaskModal?.addEventListener('click', () => this.hideTaskModal());
        cancelTask?.addEventListener('click', () => this.hideTaskModal());
        saveTask?.addEventListener('click', () => this.saveTask());

        // Settings modal
        const settingsModal = document.getElementById('settingsModal');
        const closeSettingsModal = document.getElementById('closeSettingsModal');
        const saveSettings = document.getElementById('saveSettings');

        closeSettingsModal?.addEventListener('click', () => this.hideSettingsModal());
        saveSettings?.addEventListener('click', () => this.saveSettings());

        // Close modals on outside click
        [taskModal, settingsModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                    }
                });
            }
        });
    }

    setupSettingsEvents() {
        const themeSelect = document.getElementById('themeSelect');
        const fontSizeSelect = document.getElementById('fontSizeSelect');
        const enableNotifications = document.getElementById('enableNotifications');
        const enableSound = document.getElementById('enableSound');

        themeSelect?.addEventListener('change', (e) => {
            this.settings.theme = e.target.value;
            this.applyTheme();
        });

        fontSizeSelect?.addEventListener('change', (e) => {
            this.settings.fontSize = e.target.value;
            this.applyFontSize();
        });

        enableNotifications?.addEventListener('change', (e) => {
            this.settings.enableNotifications = e.target.checked;
        });

        enableSound?.addEventListener('change', (e) => {
            this.settings.enableSound = e.target.checked;
        });
    }

    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Touch gestures
        let touchStartX = 0;
        let touchStartY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;

            // Swipe left/right for navigation
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.navigateToNextSection();
                } else {
                    this.navigateToPreviousSection();
                }
            }
        });
    }

    navigateToSection(section) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(s => {
            s.classList.remove('active');
        });

        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = section;
        }

        // Update navigation
        const activeNavItem = document.querySelector(`[data-section="${section}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Update charts if needed
        this.updateChartsForSection(section);
    }

    navigateToNextSection() {
        const sections = ['dashboard', 'crops', 'livestock', 'equipment', 'finance', 'analytics'];
        const currentIndex = sections.indexOf(this.currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        this.navigateToSection(sections[nextIndex]);
    }

    navigateToPreviousSection() {
        const sections = ['dashboard', 'crops', 'livestock', 'equipment', 'finance', 'analytics'];
        const currentIndex = sections.indexOf(this.currentSection);
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        this.navigateToSection(sections[prevIndex]);
    }

    loadData() {
        // Simulate API calls for demo data
        this.loadCrops();
        this.loadLivestock();
        this.loadEquipment();
        this.loadFinancialData();
        this.loadTasks();
        this.loadNotifications();
    }

    loadCrops() {
        this.crops = [
            {
                id: 1,
                name: 'Wheat',
                field: 'A3',
                area: 15,
                planted: '2024-03-15',
                harvest: '2024-07-15',
                status: 'active',
                health: 85,
                yield: 0
            },
            {
                id: 2,
                name: 'Corn',
                field: 'B2',
                area: 20,
                planted: '2024-04-01',
                harvest: '2024-09-01',
                status: 'active',
                health: 92,
                yield: 0
            },
            {
                id: 3,
                name: 'Soybeans',
                field: 'C1',
                area: 12,
                planted: '2024-04-15',
                harvest: '2024-10-15',
                status: 'planning',
                health: 0,
                yield: 0
            }
        ];
    }

    loadLivestock() {
        this.livestock = [
            {
                id: 1,
                type: 'Cattle',
                count: 32,
                health: 95,
                production: 85,
                lastCheck: '2024-01-15'
            },
            {
                id: 2,
                type: 'Sheep',
                count: 15,
                health: 88,
                production: 78,
                lastCheck: '2024-01-10'
            },
            {
                id: 3,
                type: 'Poultry',
                count: 120,
                health: 92,
                production: 90,
                lastCheck: '2024-01-12'
            }
        ];
    }

    loadEquipment() {
        this.equipment = [
            {
                id: 1,
                name: 'Tractor JD 5075E',
                type: 'Tractor',
                status: 'operational',
                lastMaintenance: '2024-01-01',
                nextMaintenance: '2024-04-01',
                hours: 1250
            },
            {
                id: 2,
                name: 'Planter Case IH',
                type: 'Planter',
                status: 'operational',
                lastMaintenance: '2024-01-05',
                nextMaintenance: '2024-04-05',
                hours: 450
            },
            {
                id: 3,
                name: 'Harvester New Holland',
                type: 'Harvester',
                status: 'maintenance',
                lastMaintenance: '2024-01-10',
                nextMaintenance: '2024-02-10',
                hours: 2100
            }
        ];
    }

    loadFinancialData() {
        this.financialData = {
            revenue: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [45000, 52000, 48000, 61000, 58000, 65000]
            },
            expenses: {
                labels: ['Feed', 'Fertilizer', 'Equipment', 'Labor', 'Utilities'],
                data: [15000, 12000, 8000, 20000, 5000]
            },
            profit: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [25000, 30000, 28000, 35000, 32000, 38000]
            }
        };
    }

    loadTasks() {
        this.tasks = [
            {
                id: 1,
                title: 'Fertilize wheat field',
                description: 'Apply nitrogen fertilizer to field A3',
                priority: 'high',
                dueDate: '2024-01-20',
                category: 'crops',
                completed: false
            },
            {
                id: 2,
                title: 'Check irrigation system',
                description: 'Inspect and test all irrigation lines',
                priority: 'medium',
                dueDate: '2024-01-22',
                category: 'maintenance',
                completed: false
            },
            {
                id: 3,
                title: 'Livestock vaccination',
                description: 'Vaccinate cattle herd',
                priority: 'high',
                dueDate: '2024-01-25',
                category: 'livestock',
                completed: false
            }
        ];
    }

    loadNotifications() {
        this.notifications = [
            {
                id: 1,
                title: 'Weather Alert',
                message: 'Heavy rain expected tomorrow',
                type: 'warning',
                time: '2 hours ago',
                read: false
            },
            {
                id: 2,
                title: 'Maintenance Due',
                message: 'Tractor maintenance scheduled',
                type: 'info',
                time: '1 day ago',
                read: false
            },
            {
                id: 3,
                title: 'Harvest Ready',
                message: 'Wheat field A3 ready for harvest',
                type: 'success',
                time: '3 days ago',
                read: true
            }
        ];
    }

    initializeCharts() {
        this.initializeYieldChart();
        this.initializeRevenueChart();
        this.initializeExpenseChart();
        this.initializeWeatherChart();
        this.initializeResourceChart();
    }

    initializeYieldChart() {
        const ctx = document.getElementById('yieldChart');
        if (!ctx) return;

        this.charts.yield = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Wheat Yield (tons)',
                    data: [0, 0, 0, 0, 0, 0],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Corn Yield (tons)',
                    data: [0, 0, 0, 0, 0, 0],
                    borderColor: '#FF9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    initializeRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        this.charts.revenue = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.financialData.revenue.labels,
                datasets: [{
                    label: 'Revenue ($)',
                    data: this.financialData.revenue.data,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    initializeExpenseChart() {
        const ctx = document.getElementById('expenseChart');
        if (!ctx) return;

        this.charts.expense = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.financialData.expenses.labels,
                datasets: [{
                    data: this.financialData.expenses.data,
                    backgroundColor: [
                        '#FF9800',
                        '#4CAF50',
                        '#2196F3',
                        '#9C27B0',
                        '#607D8B'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }

    initializeWeatherChart() {
        const ctx = document.getElementById('weatherChart');
        if (!ctx) return;

        this.charts.weather = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Sunny', 'Cloudy', 'Rainy', 'Stormy'],
                datasets: [{
                    label: 'Days',
                    data: [15, 8, 5, 2],
                    backgroundColor: [
                        '#FFD700',
                        '#87CEEB',
                        '#4682B4',
                        '#483D8B'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    initializeResourceChart() {
        const ctx = document.getElementById('resourceChart');
        if (!ctx) return;

        this.charts.resource = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Water', 'Fertilizer', 'Pesticides', 'Fuel', 'Labor'],
                datasets: [{
                    label: 'Current Usage',
                    data: [75, 60, 45, 80, 70],
                    borderColor: '#2196F3',
                    backgroundColor: 'rgba(33, 150, 243, 0.2)',
                    pointBackgroundColor: '#2196F3'
                }, {
                    label: 'Optimal Usage',
                    data: [80, 70, 50, 75, 75],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    pointBackgroundColor: '#4CAF50'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    updateChartsForSection(section) {
        switch (section) {
            case 'analytics':
                this.updateAnalyticsCharts();
                break;
            case 'finance':
                this.updateFinanceCharts();
                break;
        }
    }

    updateAnalyticsCharts() {
        // Update analytics charts with real-time data
        if (this.charts.yield) {
            // Simulate yield data updates
            const wheatData = [0, 0, 0, 0, 0, 0];
            const cornData = [0, 0, 0, 0, 0, 0];
            
            // Add some simulated yield data
            wheatData[4] = Math.floor(Math.random() * 50) + 100; // 100-150 tons
            cornData[5] = Math.floor(Math.random() * 80) + 120; // 120-200 tons
            
            this.charts.yield.data.datasets[0].data = wheatData;
            this.charts.yield.data.datasets[1].data = cornData;
            this.charts.yield.update();
        }
    }

    updateFinanceCharts() {
        // Finance charts are already populated with static data
        // In a real app, this would fetch latest financial data
    }

    updateDashboard() {
        this.updateStats();
        this.updateRecentActivities();
        this.updateNotificationCount();
    }

    updateStats() {
        const totalCrops = document.getElementById('totalCrops');
        const totalLivestock = document.getElementById('totalLivestock');
        const pendingTasks = document.getElementById('pendingTasks');
        const monthlyRevenue = document.getElementById('monthlyRevenue');

        if (totalCrops) totalCrops.textContent = this.crops.filter(c => c.status === 'active').length;
        if (totalLivestock) totalLivestock.textContent = this.livestock.reduce((sum, l) => sum + l.count, 0);
        if (pendingTasks) pendingTasks.textContent = this.tasks.filter(t => !t.completed).length;
        if (monthlyRevenue) monthlyRevenue.textContent = `$${this.financialData.revenue.data[5].toLocaleString()}`;
    }

    updateRecentActivities() {
        const activitiesContainer = document.getElementById('recentActivities');
        if (!activitiesContainer) return;

        const activities = [
            {
                icon: 'fas fa-seedling',
                title: 'Wheat planting completed',
                description: 'Field A3 - 15 acres planted',
                time: '2 hours ago'
            },
            {
                icon: 'fas fa-cow',
                title: 'Livestock health check',
                description: 'All cattle vaccinated successfully',
                time: '1 day ago'
            },
            {
                icon: 'fas fa-cloud-rain',
                title: 'Weather alert',
                description: 'Heavy rain expected tomorrow',
                time: '3 hours ago'
            }
        ];

        activitiesContainer.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }

    updateNotificationCount() {
        const notificationCount = document.getElementById('notificationCount');
        if (notificationCount) {
            const unreadCount = this.notifications.filter(n => !n.read).length;
            notificationCount.textContent = unreadCount;
            notificationCount.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    }

    showTaskModal() {
        const modal = document.getElementById('taskModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    hideTaskModal() {
        const modal = document.getElementById('taskModal');
        if (modal) {
            modal.classList.remove('active');
            // Reset form
            document.getElementById('taskForm')?.reset();
        }
    }

    saveTask() {
        const form = document.getElementById('taskForm');
        if (!form) return;

        const formData = new FormData(form);
        const task = {
            id: Date.now(),
            title: formData.get('taskTitle') || document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            priority: document.getElementById('taskPriority').value,
            dueDate: document.getElementById('taskDueDate').value,
            category: document.getElementById('taskCategory').value,
            completed: false
        };

        this.tasks.push(task);
        this.updateDashboard();
        this.hideTaskModal();
        this.showNotification('Task added successfully', 'success');
    }

    showSettingsModal() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.classList.add('active');
            this.loadSettingsIntoForm();
        }
    }

    hideSettingsModal() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    loadSettingsIntoForm() {
        const themeSelect = document.getElementById('themeSelect');
        const fontSizeSelect = document.getElementById('fontSizeSelect');
        const enableNotifications = document.getElementById('enableNotifications');
        const enableSound = document.getElementById('enableSound');

        if (themeSelect) themeSelect.value = this.settings.theme;
        if (fontSizeSelect) fontSizeSelect.value = this.settings.fontSize;
        if (enableNotifications) enableNotifications.checked = this.settings.enableNotifications;
        if (enableSound) enableSound.checked = this.settings.enableSound;
    }

    saveSettings() {
        this.settings.theme = document.getElementById('themeSelect').value;
        this.settings.fontSize = document.getElementById('fontSizeSelect').value;
        this.settings.enableNotifications = document.getElementById('enableNotifications').checked;
        this.settings.enableSound = document.getElementById('enableSound').checked;

        this.saveSettingsToStorage();
        this.applyTheme();
        this.applyFontSize();
        this.hideSettingsModal();
        this.showNotification('Settings saved successfully', 'success');
    }

    loadSettings() {
        const defaultSettings = {
            theme: 'light',
            fontSize: 'medium',
            enableNotifications: true,
            enableSound: true
        };

        try {
            const saved = localStorage.getItem('smartfarm-settings');
            return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
        } catch {
            return defaultSettings;
        }
    }

    saveSettingsToStorage() {
        try {
            localStorage.setItem('smartfarm-settings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }

    applyTheme() {
        const theme = this.settings.theme;
        let finalTheme = theme;

        if (theme === 'auto') {
            finalTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        document.documentElement.setAttribute('data-theme', finalTheme);
    }

    applyFontSize() {
        const fontSize = this.settings.fontSize;
        const sizes = {
            small: '14px',
            medium: '16px',
            large: '18px'
        };

        document.documentElement.style.fontSize = sizes[fontSize] || sizes.medium;
    }

    toggleNotificationsPanel() {
        const panel = document.getElementById('notificationsPanel');
        if (panel) {
            panel.classList.toggle('active');
            this.updateNotificationsList();
        }
    }

    updateNotificationsList() {
        const list = document.getElementById('notificationsList');
        if (!list) return;

        list.innerHTML = this.notifications.map(notification => `
            <div class="notification-item ${notification.read ? 'read' : ''}">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${notification.time}</div>
            </div>
        `).join('');
    }

    showNotification(message, type = 'info') {
        if (!this.settings.enableNotifications) return;

        const notification = {
            id: Date.now(),
            title: type.charAt(0).toUpperCase() + type.slice(1),
            message: message,
            type: type,
            time: 'Just now',
            read: false
        };

        this.notifications.unshift(notification);
        this.updateNotificationCount();

        // Show browser notification if supported
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('SmartFarm', {
                body: message,
                icon: '/favicon.ico'
            });
        }

        // Play sound if enabled
        if (this.settings.enableSound) {
            this.playNotificationSound();
        }
    }

    playNotificationSound() {
        // Create a simple notification sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(() => {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 300);
            }, 1000);
        }
    }

    // Additional feature methods
    showAddCropModal() {
        this.showNotification('Add Crop feature coming soon!', 'info');
    }

    showAddLivestockModal() {
        this.showNotification('Add Livestock feature coming soon!', 'info');
    }

    showReportsModal() {
        this.showNotification('Reports feature coming soon!', 'info');
    }

    // Service Worker Management
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data.type === 'CACHE_UPDATED') {
                    this.showNotification('App updated! Refresh to see changes.', 'info');
                }
            });
        }
    }

    // Offline Support
    setupOfflineSupport() {
        window.addEventListener('online', () => {
            this.showNotification('Connection restored', 'success');
            this.loadData(); // Reload data when back online
        });

        window.addEventListener('offline', () => {
            this.showNotification('You are offline. Some features may be limited.', 'warning');
        });
    }

    // Performance Monitoring
    setupPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                    }
                }, 0);
            });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.smartFarmApp = new SmartFarmApp();
});

// Handle service worker updates
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
    });
}

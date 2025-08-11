/**
 * SmartFarm Web Application - Main JavaScript File
 * Provides cross-platform compatibility with Android app functionality
 */

class SmartFarmApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.data = {
            crops: [],
            livestock: [],
            weather: {},
            tasks: [],
            analytics: {}
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialData();
        this.initializeCharts();
        this.setupServiceWorker();
        this.setupResponsiveBehavior();
        this.hideLoadingScreen();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('active');
            });
        }

        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });

        // Task filters
        document.querySelectorAll('.task-filters .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterTasks(filter);
            });
        });

        // Task checkboxes
        document.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox' && e.target.closest('.task-item')) {
                this.toggleTaskComplete(e.target);
            }
        });

        // Task action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn')) {
                if (e.target.textContent === 'Complete') {
                    this.completeTask(e.target.closest('.task-item'));
                } else if (e.target.textContent === 'Edit') {
                    this.editTask(e.target.closest('.task-item'));
                }
            }
        });

        // Notification button
        const notificationsBtn = document.getElementById('notifications-btn');
        if (notificationsBtn) {
            notificationsBtn.addEventListener('click', () => {
                this.showNotifications();
            });
        }

        // Profile button
        const profileBtn = document.getElementById('profile-btn');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => {
                this.showProfile();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                mobileMenu.classList.remove('active');
            }
        });

        // Resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    navigateToSection(section) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(sectionEl => {
            sectionEl.classList.remove('active');
        });

        // Remove active class from all nav links
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = section;
        }

        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`[data-section="${section}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Close mobile menu
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }

        // Update URL hash
        window.location.hash = section;

        // Load section-specific data
        this.loadSectionData(section);

        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    loadSectionData(section) {
        switch (section) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'crops':
                this.loadCropsData();
                break;
            case 'livestock':
                this.loadLivestockData();
                break;
            case 'weather':
                this.loadWeatherData();
                break;
            case 'analytics':
                this.loadAnalyticsData();
                break;
            case 'tasks':
                this.loadTasksData();
                break;
        }
    }

    loadInitialData() {
        // Simulate loading data from API
        this.data = {
            crops: [
                {
                    id: 1,
                    name: 'Wheat',
                    field: 'A3',
                    area: 15,
                    planted: '2024-03-15',
                    harvest: '2024-07-15',
                    status: 'active'
                },
                {
                    id: 2,
                    name: 'Corn',
                    field: 'B2',
                    area: 20,
                    planted: null,
                    harvest: '2024-09-15',
                    status: 'planning'
                }
            ],
            livestock: {
                cattle: 32,
                sheep: 15,
                poultry: 120
            },
            weather: {
                current: {
                    temperature: 72,
                    description: 'Partly Cloudy',
                    humidity: 65,
                    wind: 8,
                    pressure: 29.92
                },
                forecast: [
                    { day: 'Tomorrow', temp: 68, icon: 'cloud-rain' },
                    { day: 'Wed', temp: 75, icon: 'sun' },
                    { day: 'Thu', temp: 70, icon: 'cloud' }
                ]
            },
            tasks: [
                {
                    id: 1,
                    title: 'Fertilize wheat field',
                    description: 'Apply nitrogen fertilizer to field A3',
                    due: 'Today',
                    urgent: true,
                    completed: false
                },
                {
                    id: 2,
                    title: 'Check irrigation system',
                    description: 'Inspect and test all irrigation lines',
                    due: 'Tomorrow',
                    urgent: false,
                    completed: false
                }
            ],
            analytics: {
                yield: [65, 72, 68, 75, 80, 78],
                revenue: [12000, 13500, 12800, 14200, 15800, 15200],
                weather: [45, 52, 48, 55, 62, 58]
            }
        };

        this.updateDashboardStats();
        this.updateWeatherDisplay();
        this.updateTasksDisplay();
    }

    updateDashboardStats() {
        // Update stats cards
        const stats = {
            crops: this.data.crops.filter(crop => crop.status === 'active').length,
            livestock: Object.values(this.data.livestock).reduce((a, b) => a + b, 0),
            weather: this.data.weather.current.temperature,
            tasks: this.data.tasks.filter(task => !task.completed).length
        };

        // Update crop count
        const cropStat = document.querySelector('.stat-card:nth-child(1) .stat-value');
        if (cropStat) cropStat.textContent = stats.crops;

        // Update livestock count
        const livestockStat = document.querySelector('.stat-card:nth-child(2) .stat-value');
        if (livestockStat) livestockStat.textContent = stats.livestock;

        // Update weather
        const weatherStat = document.querySelector('.stat-card:nth-child(3) .stat-value');
        if (weatherStat) weatherStat.textContent = `${stats.weather}°F`;

        // Update tasks
        const taskStat = document.querySelector('.stat-card:nth-child(4) .stat-value');
        if (taskStat) taskStat.textContent = stats.tasks;
    }

    updateWeatherDisplay() {
        const currentWeather = this.data.weather.current;
        const forecast = this.data.weather.forecast;

        // Update current weather
        const tempEl = document.querySelector('.temperature');
        if (tempEl) tempEl.textContent = `${currentWeather.temperature}°F`;

        const descEl = document.querySelector('.weather-desc');
        if (descEl) descEl.textContent = currentWeather.description;

        // Update weather details
        const detailsEl = document.querySelector('.weather-details');
        if (detailsEl) {
            detailsEl.innerHTML = `
                <span>Humidity: ${currentWeather.humidity}%</span>
                <span>Wind: ${currentWeather.wind} mph</span>
                <span>Pressure: ${currentWeather.pressure} in</span>
            `;
        }

        // Update forecast
        const forecastGrid = document.querySelector('.forecast-grid');
        if (forecastGrid) {
            forecastGrid.innerHTML = forecast.map(day => `
                <div class="forecast-day">
                    <div class="forecast-date">${day.day}</div>
                    <div class="forecast-icon">
                        <i class="fas fa-${day.icon}"></i>
                    </div>
                    <div class="forecast-temp">${day.temp}°F</div>
                </div>
            `).join('');
        }
    }

    updateTasksDisplay() {
        const taskList = document.querySelector('.task-list');
        if (!taskList) return;

        taskList.innerHTML = this.data.tasks.map(task => `
            <div class="task-item ${task.urgent ? 'urgent' : ''}" data-task-id="${task.id}">
                <div class="task-checkbox">
                    <input type="checkbox" id="task${task.id}" ${task.completed ? 'checked' : ''}>
                    <label for="task${task.id}"></label>
                </div>
                <div class="task-content">
                    <h4>${task.title}</h4>
                    <p>${task.description}</p>
                    <span class="task-due">Due: ${task.due}</span>
                </div>
                <div class="task-actions">
                    <button class="btn btn-sm btn-primary">Edit</button>
                    <button class="btn btn-sm btn-success">Complete</button>
                </div>
            </div>
        `).join('');
    }

    filterTasks(filter) {
        const taskItems = document.querySelectorAll('.task-item');
        const filterBtns = document.querySelectorAll('.task-filters .btn');

        // Update active filter button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Filter tasks
        taskItems.forEach(item => {
            let show = true;
            
            switch (filter) {
                case 'urgent':
                    show = item.classList.contains('urgent');
                    break;
                case 'today':
                    show = item.querySelector('.task-due').textContent.includes('Today');
                    break;
                case 'week':
                    show = !item.querySelector('.task-due').textContent.includes('Next week');
                    break;
                case 'all':
                default:
                    show = true;
                    break;
            }

            item.style.display = show ? 'flex' : 'none';
        });
    }

    toggleTaskComplete(checkbox) {
        const taskItem = checkbox.closest('.task-item');
        const taskId = parseInt(taskItem.getAttribute('data-task-id'));
        const task = this.data.tasks.find(t => t.id === taskId);
        
        if (task) {
            task.completed = checkbox.checked;
            if (task.completed) {
                taskItem.style.opacity = '0.6';
                taskItem.style.textDecoration = 'line-through';
            } else {
                taskItem.style.opacity = '1';
                taskItem.style.textDecoration = 'none';
            }
        }
    }

    completeTask(taskItem) {
        const taskId = parseInt(taskItem.getAttribute('data-task-id'));
        const task = this.data.tasks.find(t => t.id === taskId);
        
        if (task) {
            task.completed = true;
            taskItem.style.opacity = '0.6';
            taskItem.style.textDecoration = 'line-through';
            
            // Show success message
            this.showNotification('Task completed successfully!', 'success');
        }
    }

    editTask(taskItem) {
        const taskId = parseInt(taskItem.getAttribute('data-task-id'));
        const task = this.data.tasks.find(t => t.id === taskId);
        
        if (task) {
            // Show edit modal (simplified for demo)
            const newTitle = prompt('Edit task title:', task.title);
            if (newTitle && newTitle.trim()) {
                task.title = newTitle.trim();
                taskItem.querySelector('h4').textContent = newTitle.trim();
                this.showNotification('Task updated successfully!', 'success');
            }
        }
    }

    initializeCharts() {
        // Initialize Chart.js charts
        this.createYieldChart();
        this.createRevenueChart();
        this.createWeatherChart();
    }

    createYieldChart() {
        const ctx = document.getElementById('yieldChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Crop Yield (tons/acre)',
                    data: this.data.analytics.yield,
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
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    createRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: this.data.analytics.revenue,
                    backgroundColor: '#2196F3',
                    borderRadius: 4
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
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    createWeatherChart() {
        const ctx = document.getElementById('weatherChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Average Temperature (°F)',
                    data: this.data.analytics.weather,
                    borderColor: '#FF9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    tension: 0.4,
                    fill: true
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
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }

    showNotifications() {
        // Show notifications panel (simplified for demo)
        this.showNotification('You have 3 new notifications', 'info');
    }

    showProfile() {
        // Show profile panel (simplified for demo)
        this.showNotification('Profile settings coming soon', 'info');
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                console.log('Service Worker is ready');
                
                // Check for updates
                registration.update();
            });
        }
    }

    setupResponsiveBehavior() {
        // Handle responsive behavior
        this.handleResize();
        
        // Add touch support for mobile
        if ('ontouchstart' in window) {
            this.setupTouchSupport();
        }
    }

    setupTouchSupport() {
        // Add touch-specific behaviors
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].clientY;
            this.handleSwipe(touchStartY, touchEndY);
        });
    }

    handleSwipe(startY, endY) {
        const threshold = 50;
        const diff = startY - endY;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe up - could be used for navigation
                console.log('Swipe up detected');
            } else {
                // Swipe down - could be used for refresh
                console.log('Swipe down detected');
            }
        }
    }

    handleResize() {
        const width = window.innerWidth;
        
        // Adjust layout based on screen size
        if (width <= 768) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }

        // Adjust chart sizes
        this.resizeCharts();
    }

    resizeCharts() {
        // Trigger chart resize events
        window.dispatchEvent(new Event('resize'));
    }

    hideLoadingScreen() {
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

    // API methods for future integration
    async fetchData(endpoint) {
        try {
            const response = await fetch(`/api/${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    async saveData(endpoint, data) {
        try {
            const response = await fetch(`/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Error saving data:', error);
            return null;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.smartFarmApp = new SmartFarmApp();
});

// Add CSS for notifications
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-success {
        border-left: 4px solid #4CAF50;
    }

    .notification-info {
        border-left: 4px solid #2196F3;
    }

    .notification-warning {
        border-left: 4px solid #FF9800;
    }

    .notification-error {
        border-left: 4px solid #F44336;
    }

    .notification i {
        font-size: 20px;
    }

    .notification-success i {
        color: #4CAF50;
    }

    .notification-info i {
        color: #2196F3;
    }

    .notification-warning i {
        color: #FF9800;
    }

    .notification-error i {
        color: #F44336;
    }

    .notification-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #757575;
        margin-left: auto;
    }

    .notification-close:hover {
        color: #212121;
    }

    @media (max-width: 768px) {
        .notification {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

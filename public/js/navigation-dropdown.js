/**
 * SmartFarm Navigation Dropdown
 * Adds a dropdown navigation menu for better UX
 */

(function() {
    'use strict';
    
    console.log('🧭 Navigation Dropdown initialized');
    
    // Navigation menu configuration
    const navigationConfig = {
        mainMenu: [
            {
                title: 'Dashboard',
                icon: 'fas fa-tachometer-alt',
                href: 'dashboard.html',
                description: 'Overview and analytics'
            },
            {
                title: 'Farm Management',
                icon: 'fas fa-seedling',
                href: '#',
                submenu: [
                    { title: 'Crops', href: 'crop-management.html', icon: 'fas fa-leaf' },
                    { title: 'Livestock', href: 'livestock-management.html', icon: 'fas fa-cow' },
                    { title: 'Inventory', href: 'inventory-management.html', icon: 'fas fa-boxes' },
                    { title: 'Tasks', href: 'dashboard.html#tasks', icon: 'fas fa-tasks' }
                ]
            },
            {
                title: 'Analytics',
                icon: 'fas fa-chart-line',
                href: 'analytics-dashboard.html',
                description: 'Reports and insights'
            },
            {
                title: 'Settings',
                icon: 'fas fa-cog',
                href: '#',
                submenu: [
                    { title: 'Profile', href: 'dashboard.html#profile', icon: 'fas fa-user' },
                    { title: 'Preferences', href: 'dashboard.html#preferences', icon: 'fas fa-sliders-h' },
                    { title: 'Notifications', href: 'dashboard.html#notifications', icon: 'fas fa-bell' }
                ]
            },
            {
                title: 'Help & Support',
                icon: 'fas fa-question-circle',
                href: '#',
                submenu: [
                    { title: 'Documentation', href: 'dashboard.html#docs', icon: 'fas fa-book' },
                    { title: 'Contact Support', href: 'dashboard.html#support', icon: 'fas fa-headset' },
                    { title: 'Feedback', href: 'dashboard.html#feedback', icon: 'fas fa-comment' }
                ]
            }
        ],
        quickActions: [
            { title: 'Add Crop', icon: 'fas fa-plus', href: 'crop-management.html', color: 'success' },
            { title: 'Add Livestock', icon: 'fas fa-plus', href: 'livestock-management.html', color: 'info' },
            { title: 'View Reports', icon: 'fas fa-chart-bar', href: 'analytics-dashboard.html', color: 'warning' },
            { title: 'Emergency', icon: 'fas fa-exclamation-triangle', href: 'dashboard.html#emergency', color: 'danger' }
        ]
    };
    
    // Create dropdown navigation
    function createDropdownNavigation() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) {
            console.warn('Sidebar not found, creating standalone navigation');
            createStandaloneNavigation();
            return;
        }
        
        // Find the existing navigation or create one
        let navElement = sidebar.querySelector('.nav');
        if (!navElement) {
            navElement = document.createElement('ul');
            navElement.className = 'nav flex-column';
            sidebar.appendChild(navElement);
        }
        
        // Removed Quick Navigation dropdown button to avoid confusion
        // Users can use the regular navigation items directly
        
        // Add main navigation items
        navigationConfig.mainMenu.forEach(item => {
            const navItem = createNavigationItem(item);
            navElement.appendChild(navItem);
        });
        
        // Add quick actions section
        const quickActionsSection = createQuickActionsSection();
        navElement.appendChild(quickActionsSection);
        
        console.log('✅ Dropdown navigation added to sidebar');
    }
    
    // Create dropdown toggle button
    function createDropdownToggle() {
        const li = document.createElement('li');
        li.className = 'nav-item mb-3';
        
        li.innerHTML = `
            <button class="btn btn-outline-light w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-bars me-2"></i>
                Quick Navigation
            </button>
            <ul class="dropdown-menu dropdown-menu-dark w-100">
                <li><h6 class="dropdown-header">Main Menu</h6></li>
                ${navigationConfig.mainMenu.map(item => createDropdownItem(item)).join('')}
                <li><hr class="dropdown-divider"></li>
                <li><h6 class="dropdown-header">Quick Actions</h6></li>
                ${navigationConfig.quickActions.map(action => createQuickActionItem(action)).join('')}
            </ul>
        `;
        
        return li;
    }
    
    // Create dropdown item
    function createDropdownItem(item) {
        if (item.submenu) {
            return `
                <li class="dropdown-item-text">
                    <div class="d-flex align-items-center">
                        <i class="${item.icon} me-2"></i>
                        <strong>${item.title}</strong>
                    </div>
                </li>
                ${item.submenu.map(subitem => `
                    <li>
                        <a class="dropdown-item" href="${subitem.href}">
                            <i class="${subitem.icon} me-2"></i>
                            ${subitem.title}
                        </a>
                    </li>
                `).join('')}
            `;
        } else {
            return `
                <li>
                    <a class="dropdown-item" href="${item.href}">
                        <i class="${item.icon} me-2"></i>
                        ${item.title}
                        ${item.description ? `<small class="text-muted d-block">${item.description}</small>` : ''}
                    </a>
                </li>
            `;
        }
    }
    
    // Create quick action item
    function createQuickActionItem(action) {
        return `
            <li>
                <a class="dropdown-item" href="${action.href}">
                    <i class="${action.icon} me-2 text-${action.color}"></i>
                    ${action.title}
                </a>
            </li>
        `;
    }
    
    // Create standalone navigation (for pages without sidebar)
    // Removed to avoid confusion - users should use regular navigation
    function createStandaloneNavigation() {
        // Function disabled - Quick Navigation removed to avoid confusion
        console.log('ℹ️ Standalone navigation disabled - Quick Navigation removed');
        return;
    }
    
    // Create navigation item for sidebar
    function createNavigationItem(item) {
        const li = document.createElement('li');
        li.className = 'nav-item';
        
        if (item.submenu) {
            li.innerHTML = `
                <div class="nav-link">
                    <i class="${item.icon} me-2"></i>
                    ${item.title}
                </div>
                <ul class="nav flex-column ms-3">
                    ${item.submenu.map(subitem => `
                        <li class="nav-item">
                            <a class="nav-link" href="${subitem.href}">
                                <i class="${subitem.icon} me-2"></i>
                                ${subitem.title}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            `;
        } else {
            li.innerHTML = `
                <a class="nav-link" href="${item.href}">
                    <i class="${item.icon} me-2"></i>
                    ${item.title}
                </a>
            `;
        }
        
        return li;
    }
    
    // Create quick actions section
    function createQuickActionsSection() {
        const li = document.createElement('li');
        li.className = 'nav-item mt-3';
        
        li.innerHTML = `
            <div class="nav-link">
                <i class="fas fa-bolt me-2"></i>
                Quick Actions
            </div>
            <div class="ms-3">
                ${navigationConfig.quickActions.map(action => `
                    <a href="${action.href}" class="btn btn-sm btn-outline-light mb-1 me-1">
                        <i class="${action.icon} me-1"></i>
                        ${action.title}
                    </a>
                `).join('')}
            </div>
        `;
        
        return li;
    }
    
    // Add keyboard shortcuts
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Alt + N for navigation dropdown
            if (e.altKey && e.key === 'n') {
                e.preventDefault();
                const dropdownToggle = document.querySelector('[data-bs-toggle="dropdown"]');
                if (dropdownToggle) {
                    dropdownToggle.click();
                }
            }
            
            // Alt + D for dashboard
            if (e.altKey && e.key === 'd') {
                e.preventDefault();
                window.location.href = 'dashboard.html';
            }
            
            // Alt + H for help
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                const helpLink = document.querySelector('a[href*="support"]');
                if (helpLink) {
                    helpLink.click();
                }
            }
        });
        
        console.log('✅ Keyboard shortcuts added (Alt+N, Alt+D, Alt+H)');
    }
    
    // Add breadcrumb navigation
    function addBreadcrumbNavigation() {
        const breadcrumbContainer = document.createElement('nav');
        breadcrumbContainer.id = 'smartfarm-breadcrumb';
        breadcrumbContainer.className = 'breadcrumb-container';
        breadcrumbContainer.style.cssText = `
            position: fixed;
            top: 10px;
            left: 20px;
            z-index: 1040;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 8px;
            padding: 8px 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        `;
        
        breadcrumbContainer.innerHTML = `
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <a href="dashboard.html">
                            <i class="fas fa-home"></i>
                        </a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        ${document.title.replace(' - SmartFarm', '')}
                    </li>
                </ol>
            </nav>
        `;
        
        document.body.appendChild(breadcrumbContainer);
        console.log('✅ Breadcrumb navigation added');
    }
    
    // Initialize navigation when DOM is ready
    function initializeNavigation() {
        try {
            createDropdownNavigation();
            addKeyboardShortcuts();
            addBreadcrumbNavigation();
            
            // Add click handlers for smooth scrolling
            document.addEventListener('click', function(e) {
                const link = e.target.closest('a[href^="#"]');
                if (link) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
            
            console.log('✅ Navigation system fully initialized');
        } catch (error) {
            console.error('❌ Error initializing navigation:', error);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeNavigation);
    } else {
        initializeNavigation();
    }
    
})();

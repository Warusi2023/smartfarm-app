// SmartFarm User Roles & Access Control
// Controls which features are visible to different user types

class UserRoleManager {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.userRoles = {
            'owner': ['admin', 'debug', 'analytics', 'testing', 'all'],
            'admin': ['admin', 'analytics', 'testing'],
            'user': ['basic'],
            'guest': ['view']
        };
        this.featurePermissions = {
            'debug': ['owner'],
            'testing': ['owner', 'admin'],
            'analytics': ['owner', 'admin'],
            'admin': ['owner', 'admin'],
            'basic': ['owner', 'admin', 'user'],
            'view': ['owner', 'admin', 'user', 'guest']
        };
        
        this.init();
    }

    init() {
        console.log('🔐 User Role Manager initialized');
        this.applyRoleBasedAccess();
        this.setupRoleIndicator();
    }

    getCurrentUser() {
        try {
            const userData = localStorage.getItem('smartfarm_user') || sessionStorage.getItem('smartfarm_user') || '{}';
            
            // Validate JSON before parsing
            if (userData === '{}' || userData === 'null' || userData === 'undefined') {
                return { role: 'guest', isOwner: false };
            }
            
            // Check for corrupted data patterns
            if (userData.includes('tuimalabe27') && !userData.includes('{')) {
                // This looks like corrupted data, clear it
                localStorage.removeItem('smartfarm_user');
                sessionStorage.removeItem('smartfarm_user');
                return { role: 'guest', isOwner: false };
            }
            
            // Check if it's valid JSON format
            if (!userData.startsWith('{') && !userData.startsWith('[')) {
                // Not valid JSON, clear corrupted data
                localStorage.removeItem('smartfarm_user');
                sessionStorage.removeItem('smartfarm_user');
                return { role: 'guest', isOwner: false };
            }
                
                const user = JSON.parse(userData);
                
                // Check if this is the project owner
                if (this.isProjectOwner()) {
                    user.role = 'owner';
                    user.isOwner = true;
                }
                
                return user;
            } else {
                // Invalid data, clear it
                localStorage.removeItem('smartfarm_user');
                sessionStorage.removeItem('smartfarm_user');
                return { role: 'guest', isOwner: false };
            }
        } catch (error) {
            if (window.SmartFarmLogger) {
                window.SmartFarmLogger.warn('Error parsing user data:', error);
            } else {
                console.warn('Error parsing user data:', error);
            }
            
            // Clear invalid data
            localStorage.removeItem('smartfarm_user');
            sessionStorage.removeItem('smartfarm_user');
            return { role: 'guest', isOwner: false };
        }
    }

    isProjectOwner() {
        // Check multiple indicators to determine if this is the project owner
        const ownerEmails = [
            'warusi2023@gmail.com',  // Replace with your actual email
            'admin@smartfarm-app.com',
            'owner@smartfarm-app.com'
        ];
        
        const ownerDomains = [
            'smartfarm-app.com',
            'localhost'  // For development
        ];
        
        const userEmail = this.getUserEmail();
        const currentDomain = window.location.hostname;
        
        // Check email
        if (ownerEmails.includes(userEmail)) {
            return true;
        }
        
        // Check domain (for development)
        if (ownerDomains.includes(currentDomain) && userEmail) {
            return true;
        }
        
        // Check for owner flag in localStorage (for development)
        if (localStorage.getItem('smartfarm_is_owner') === 'true') {
            return true;
        }
        
        return false;
    }

    getUserEmail() {
        try {
            const userData = localStorage.getItem('smartfarm_user') || sessionStorage.getItem('smartfarm_user') || '{}';
            const user = JSON.parse(userData);
            return user.email || '';
        } catch (error) {
            return '';
        }
    }

    hasPermission(feature) {
        const userRole = this.currentUser.role || 'guest';
        const allowedRoles = this.featurePermissions[feature] || [];
        return allowedRoles.includes(userRole);
    }

    applyRoleBasedAccess() {
        console.log(`🔐 Applying access control for role: ${this.currentUser.role}`);
        
        // Hide/show elements based on role
        this.toggleElementVisibility('debug-features', 'debug');
        this.toggleElementVisibility('testing-features', 'testing');
        this.toggleElementVisibility('analytics-features', 'analytics');
        this.toggleElementVisibility('admin-features', 'admin');
        
        // Hide specific buttons
        this.hideButtonsByRole();
        
        // Add role indicators
        this.addRoleIndicators();
    }

    toggleElementVisibility(className, feature) {
        const elements = document.querySelectorAll(`.${className}`);
        const hasAccess = this.hasPermission(feature);
        
        elements.forEach(element => {
            if (hasAccess) {
                element.style.display = '';
                element.classList.remove('role-hidden');
            } else {
                element.style.display = 'none';
                element.classList.add('role-hidden');
            }
        });
    }

    hideButtonsByRole() {
        // Hide debugging buttons for non-owners
        if (!this.hasPermission('debug')) {
            this.hideButton('Button Debugger');
            this.hideButton('Ads Testing');
        }
        
        // Hide analytics for non-admins
        if (!this.hasPermission('analytics')) {
            this.hideButton('Ads Analytics');
        }
        
        // Hide admin features for non-admins
        if (!this.hasPermission('admin')) {
            this.hideButton('Admin Panel');
            this.hideButton('System Settings');
        }
    }

    hideButton(buttonText) {
        const buttons = document.querySelectorAll('a.nav-link, button');
        buttons.forEach(button => {
            if (button.textContent.includes(buttonText)) {
                button.style.display = 'none';
                button.classList.add('role-hidden');
            }
        });
    }

    setupRoleIndicator() {
        // Add role indicator to navbar
        const navbar = document.querySelector('.navbar-nav.ms-auto');
        if (navbar && this.currentUser.isOwner) {
            const roleIndicator = document.createElement('div');
            roleIndicator.className = 'me-3';
            roleIndicator.innerHTML = `
                <span class="badge bg-warning text-dark">
                    <i class="fas fa-crown me-1"></i>Owner
                </span>
            `;
            navbar.insertBefore(roleIndicator, navbar.firstChild);
        }
    }

    addRoleIndicators() {
        // Add role indicators to restricted features
        const restrictedElements = document.querySelectorAll('.role-restricted');
        restrictedElements.forEach(element => {
            const feature = element.getAttribute('data-feature');
            if (feature && this.hasPermission(feature)) {
                const indicator = document.createElement('span');
                indicator.className = 'role-indicator';
                indicator.innerHTML = `
                    <span class="badge bg-info ms-2" style="font-size: 0.7rem;">
                        <i class="fas fa-shield-alt me-1"></i>${this.currentUser.role.toUpperCase()}
                    </span>
                `;
                element.appendChild(indicator);
            }
        });
    }

    // Development helper functions
    enableOwnerMode() {
        localStorage.setItem('smartfarm_is_owner', 'true');
        console.log('🔐 Owner mode enabled for development');
        this.currentUser.role = 'owner';
        this.currentUser.isOwner = true;
        this.applyRoleBasedAccess();
    }

    disableOwnerMode() {
        localStorage.removeItem('smartfarm_is_owner');
        console.log('🔐 Owner mode disabled');
        this.currentUser.role = 'user';
        this.currentUser.isOwner = false;
        this.applyRoleBasedAccess();
    }

    setUserRole(role) {
        if (this.userRoles[role]) {
            this.currentUser.role = role;
            this.currentUser.isOwner = (role === 'owner');
            this.applyRoleBasedAccess();
            console.log(`🔐 User role set to: ${role}`);
        } else {
            console.error('Invalid role:', role);
        }
    }

    // Get current role info
    getRoleInfo() {
        return {
            role: this.currentUser.role,
            isOwner: this.currentUser.isOwner,
            permissions: this.userRoles[this.currentUser.role] || [],
            email: this.getUserEmail()
        };
    }
}

// Initialize user role manager
window.userRoleManager = new UserRoleManager();

// Global helper functions
window.enableOwnerMode = () => window.userRoleManager.enableOwnerMode();
window.disableOwnerMode = () => window.userRoleManager.disableOwnerMode();
window.setUserRole = (role) => window.userRoleManager.setUserRole(role);
window.getRoleInfo = () => window.userRoleManager.getRoleInfo();

// CSS for role-based styling
const roleStyles = `
<style>
.role-hidden {
    display: none !important;
}

.role-indicator {
    display: inline-block;
}

.role-restricted {
    position: relative;
}

.owner-only {
    border-left: 3px solid #ffc107;
    background: rgba(255, 193, 7, 0.1);
}

.admin-only {
    border-left: 3px solid #dc3545;
    background: rgba(220, 53, 86, 0.1);
}

.debug-feature {
    border-left: 3px solid #6f42c1;
    background: rgba(111, 66, 193, 0.1);
}

.role-badge {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 0.6rem;
    padding: 2px 6px;
}

@media (max-width: 768px) {
    .role-indicator {
        display: block;
        margin-top: 5px;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', roleStyles);

console.log('🔐 SmartFarm User Role Manager loaded');

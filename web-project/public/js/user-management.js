/**
 * SmartFarm User Management System
 * Handles user roles, groups, premium tiers, and approvals
 */

class UserManagement {
    constructor() {
        this.apiBase = '/api/user-management';
        this.token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
        this.currentUser = null;
        this.init();
    }

    async init() {
        try {
            await this.loadCurrentUser();
            this.setupEventListeners();
            this.loadUserManagementInterface();
        } catch (error) {
            console.error('Error initializing user management:', error);
            this.showErrorMessage('Failed to initialize user management');
        }
    }

    async loadCurrentUser() {
        try {
            if (!this.token) {
                console.warn('No authentication token found. Redirecting to login...');
                window.location.href = '/login.html';
                return;
            }

            // Use the auth endpoint for profile
            const response = await fetch('/api/auth/profile', {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 401) {
                console.warn('Authentication failed. Redirecting to login...');
                localStorage.removeItem('jwtToken');
                sessionStorage.removeItem('jwtToken');
                window.location.href = '/login.html';
                return;
            }
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const jsonResponse = await response.json();
            if (jsonResponse.success) {
                this.currentUser = jsonResponse.data;
                this.updateUserInterface();
            }
        } catch (error) {
            console.error('Error loading current user:', error);
            // If it's a network error, show a message
            if (error.message.includes('Failed to fetch')) {
                this.showErrorMessage('Unable to connect to server. Please check your internet connection.');
            }
        }
    }

    setupEventListeners() {
        // User management tab clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="manage-users"]')) {
                this.showUserManagement();
            }
            if (e.target.matches('[data-action="create-user"]')) {
                this.showCreateUserForm();
            }
            if (e.target.matches('[data-action="assign-farm"]')) {
                this.showAssignFarmForm();
            }
            if (e.target.matches('[data-action="approve-task"]')) {
                this.showTaskApproval();
            }
        });

        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('#create-user-form')) {
                e.preventDefault();
                this.createUser(e.target);
            }
            if (e.target.matches('#assign-farm-form')) {
                e.preventDefault();
                this.assignUserToFarm(e.target);
            }
            if (e.target.matches('#approve-task-form')) {
                e.preventDefault();
                this.approveTask(e.target);
            }
        });
    }

    async apiRequest(endpoint, method = 'GET', data = null) {
        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const config = {
            method,
            headers,
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${this.apiBase}${endpoint}`, config);
            
            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Non-JSON response received:', text.substring(0, 200));
                throw new Error(`Expected JSON response but got ${contentType || 'unknown content type'}`);
            }
            
            const jsonResponse = await response.json();
            
            if (!response.ok) {
                throw new Error(jsonResponse.error || `API Error: ${response.status}`);
            }
            
            return jsonResponse;
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    updateUserInterface() {
        if (!this.currentUser) return;

        // Update user role display
        const roleElements = document.querySelectorAll('[data-user-role]');
        roleElements.forEach(el => {
            el.textContent = this.currentUser.role.toUpperCase();
            el.className = `badge ${this.getRoleBadgeClass(this.currentUser.role)}`;
        });

        // Show/hide admin features
        const adminFeatures = document.querySelectorAll('[data-requires-admin]');
        adminFeatures.forEach(el => {
            el.style.display = this.currentUser.role === 'admin' ? 'block' : 'none';
        });

        // Show/hide manager features
        const managerFeatures = document.querySelectorAll('[data-requires-manager]');
        managerFeatures.forEach(el => {
            el.style.display = ['admin', 'manager'].includes(this.currentUser.role) ? 'block' : 'none';
        });

        // Update user name display
        const nameElements = document.querySelectorAll('[data-user-name]');
        nameElements.forEach(el => {
            el.textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
        });
    }

    getRoleBadgeClass(role) {
        const classes = {
            'admin': 'bg-danger',
            'manager': 'bg-warning',
            'farmer': 'bg-success'
        };
        return classes[role] || 'bg-secondary';
    }

    async loadUserManagementInterface() {
        try {
            // Load users list (only for admins)
            if (this.currentUser && this.currentUser.role === 'admin') {
                const usersResponse = await this.apiRequest('/users');
                if (usersResponse.success) {
                    this.displayUsersList(usersResponse.data);
                }
            } else {
                // Show access denied for non-admins
                this.displayUsersList([]);
            }

            // Load user's farms
            const farmsResponse = await this.apiRequest('/my-farms');
            if (farmsResponse.success) {
                this.displayUserFarms(farmsResponse.data);
            }
        } catch (error) {
            console.error('Error loading user management interface:', error);
        }
    }

    displayUsersList(users) {
        const container = document.getElementById('users-list');
        if (!container) return;

        const html = users.map(user => `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-3">
                            <h6 class="mb-1">${user.firstName} ${user.lastName}</h6>
                            <small class="text-muted">${user.email}</small>
                        </div>
                        <div class="col-md-2">
                            <span class="badge ${this.getRoleBadgeClass(user.role)}">${user.role.toUpperCase()}</span>
                        </div>
                        <div class="col-md-2">
                            <span class="badge ${user.status === 'active' ? 'bg-success' : 'bg-secondary'}">${user.status}</span>
                        </div>
                        <div class="col-md-3">
                            <small class="text-muted">
                                ${user.ownedFarms ? user.ownedFarms.length : 0} farms owned<br>
                                ${user.permissions ? user.permissions.length : 0} permissions
                            </small>
                        </div>
                        <div class="col-md-2">
                            <div class="btn-group btn-group-sm">
                                <button class="btn btn-outline-primary" onclick="userManagement.editUser('${user.id}')">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-outline-success" onclick="userManagement.assignFarm('${user.id}')">
                                    <i class="fas fa-plus"></i>
                                </button>
                                ${this.currentUser.role === 'admin' ? `
                                    <button class="btn btn-outline-warning" onclick="userManagement.changeRole('${user.id}')">
                                        <i class="fas fa-user-cog"></i>
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    displayUserFarms(farmsData) {
        const container = document.getElementById('user-farms');
        if (!container) return;

        const allFarms = [...farmsData.ownedFarms, ...farmsData.managedFarms];
        
        const html = allFarms.map(farm => `
            <div class="card mb-2">
                <div class="card-body py-2">
                    <div class="row align-items-center">
                        <div class="col-md-4">
                            <h6 class="mb-0">${farm.name}</h6>
                            <small class="text-muted">${farm.location || 'No location'}</small>
                        </div>
                        <div class="col-md-2">
                            <span class="badge ${farm.status === 'active' ? 'bg-success' : 'bg-secondary'}">${farm.status}</span>
                        </div>
                        <div class="col-md-2">
                            <span class="badge bg-info">${farm.type}</span>
                        </div>
                        <div class="col-md-2">
                            <span class="badge bg-primary">
                                ${farmsData.ownedFarms.some(f => f.id === farm.id) ? 'OWNER' : 'MANAGER'}
                            </span>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-sm btn-outline-primary" onclick="userManagement.viewFarmMembers('${farm.id}')">
                                <i class="fas fa-users"></i> Members
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html || '<p class="text-muted">No farms assigned</p>';
    }

    showUserManagement() {
        const modal = document.getElementById('user-management-modal');
        if (modal) {
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        }
    }

    showCreateUserForm() {
        const modal = document.getElementById('create-user-modal');
        if (modal) {
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        }
    }

    async createUser(form) {
        try {
            const formData = new FormData(form);
            const userData = {
                email: formData.get('email'),
                password: formData.get('password'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                role: formData.get('role'),
                phone: formData.get('phone'),
                permissions: formData.get('permissions') ? formData.get('permissions').split(',') : []
            };

            const response = await this.apiRequest('/users', 'POST', userData);
            if (response.success) {
                this.showSuccessMessage('User created successfully');
                this.loadUserManagementInterface();
                bootstrap.Modal.getInstance(document.getElementById('create-user-modal')).hide();
                form.reset();
            }
        } catch (error) {
            this.showErrorMessage('Failed to create user: ' + error.message);
        }
    }

    async assignUserToFarm(form) {
        try {
            const formData = new FormData(form);
            const assignmentData = {
                farmId: formData.get('farmId'),
                role: formData.get('role')
            };

            const userId = formData.get('userId');
            const response = await this.apiRequest(`/users/${userId}/assign-farm`, 'POST', assignmentData);
            
            if (response.success) {
                this.showSuccessMessage('User assigned to farm successfully');
                this.loadUserManagementInterface();
                bootstrap.Modal.getInstance(document.getElementById('assign-farm-modal')).hide();
                form.reset();
            }
        } catch (error) {
            this.showErrorMessage('Failed to assign user to farm: ' + error.message);
        }
    }

    async approveTask(form) {
        try {
            const formData = new FormData(form);
            const approvalData = {
                approved: formData.get('approved') === 'true',
                notes: formData.get('notes')
            };

            const taskId = formData.get('taskId');
            const response = await this.apiRequest(`/tasks/${taskId}/approve`, 'POST', approvalData);
            
            if (response.success) {
                this.showSuccessMessage(approvalData.approved ? 'Task approved successfully' : 'Task rejected');
                bootstrap.Modal.getInstance(document.getElementById('approve-task-modal')).hide();
                form.reset();
            }
        } catch (error) {
            this.showErrorMessage('Failed to process task approval: ' + error.message);
        }
    }

    async editUser(userId) {
        // Implementation for editing user
        console.log('Edit user:', userId);
    }

    async assignFarm(userId) {
        const modal = document.getElementById('assign-farm-modal');
        if (modal) {
            // Set the userId in the form
            const form = modal.querySelector('form');
            form.querySelector('input[name="userId"]').value = userId;
            
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        }
    }

    async changeRole(userId) {
        // Implementation for changing user role
        console.log('Change role for user:', userId);
    }

    async viewFarmMembers(farmId) {
        try {
            const response = await this.apiRequest(`/farms/${farmId}/members`);
            if (response.success) {
                this.displayFarmMembers(response.data, farmId);
            }
        } catch (error) {
            this.showErrorMessage('Failed to load farm members: ' + error.message);
        }
    }

    displayFarmMembers(members, farmId) {
        const modal = document.getElementById('farm-members-modal');
        if (!modal) return;

        const container = modal.querySelector('#farm-members-list');
        const html = members.map(member => `
            <div class="card mb-2">
                <div class="card-body py-2">
                    <div class="row align-items-center">
                        <div class="col-md-4">
                            <h6 class="mb-0">${member.firstName} ${member.lastName}</h6>
                            <small class="text-muted">${member.email}</small>
                        </div>
                        <div class="col-md-2">
                            <span class="badge ${this.getRoleBadgeClass(member.role)}">${member.role.toUpperCase()}</span>
                        </div>
                        <div class="col-md-2">
                            <span class="badge bg-primary">${member.role.toUpperCase()}</span>
                        </div>
                        <div class="col-md-4">
                            <small class="text-muted">
                                Joined: ${new Date(member.createdAt).toLocaleDateString()}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
        
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    }

    showSuccessMessage(message) {
        // Use existing notification system
        if (window.showSuccessMessage) {
            window.showSuccessMessage(message);
        } else {
            alert('Success: ' + message);
        }
    }

    showErrorMessage(message) {
        // Use existing notification system
        if (window.showErrorMessage) {
            window.showErrorMessage(message);
        } else {
            alert('Error: ' + message);
        }
    }
}

// Initialize user management when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.userManagement = new UserManagement();
});

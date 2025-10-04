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

        this.users = users; // Store users for later use

        const html = users.map(user => `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-3">
                            <h6 class="mb-1">${user.firstName} ${user.lastName}</h6>
                            <small class="text-muted">${user.email}</small>
                            ${user.phone ? `<br><small class="text-muted"><i class="fas fa-phone me-1"></i>${user.phone}</small>` : ''}
                        </div>
                        <div class="col-md-2">
                            <span class="badge ${this.getRoleBadgeClass(user.role)}">${user.role.toUpperCase()}</span>
                        </div>
                        <div class="col-md-2">
                            <span class="badge ${user.status === 'active' ? 'bg-success' : user.status === 'inactive' ? 'bg-secondary' : 'bg-warning'}">${user.status}</span>
                        </div>
                        <div class="col-md-2">
                            <small class="text-muted">
                                ${user.farms ? user.farms.length : 0} farms<br>
                                ${user.permissions ? user.permissions.length : 0} permissions
                            </small>
                        </div>
                        <div class="col-md-3">
                            <div class="btn-group btn-group-sm" role="group">
                                <button class="btn btn-outline-primary btn-sm" data-action="edit-user" data-user-id="${user.id}" title="Edit User">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-outline-info btn-sm" data-action="change-password" data-user-id="${user.id}" title="Change Password">
                                    <i class="fas fa-key"></i>
                                </button>
                                <button class="btn btn-outline-success btn-sm" data-action="assign-farm" data-user-id="${user.id}" title="Assign to Farm">
                                    <i class="fas fa-plus"></i>
                                </button>
                                ${this.currentUser && this.currentUser.role === 'admin' ? `
                                    <button class="btn btn-outline-danger btn-sm" data-action="delete-user" data-user-id="${user.id}" title="Delete User">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    ${user.permissions && user.permissions.length > 0 ? `
                        <div class="row mt-2">
                            <div class="col-12">
                                <small class="text-muted">
                                    <strong>Permissions:</strong> ${user.permissions.join(', ')}
                                </small>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
        
        // Add event listeners for the new action buttons
        this.addUserActionListeners();
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
            // First check if we have a valid token
            if (!this.token) {
                this.showErrorMessage('Please log in to create users');
                window.location.href = '/login.html';
                return;
            }

            // Check if user is admin
            if (!this.currentUser || this.currentUser.role !== 'admin') {
                this.showErrorMessage('Only administrators can create users');
                return;
            }

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

            console.log('Creating user with data:', userData);
            const response = await this.apiRequest('/users', 'POST', userData);
            if (response.success) {
                this.showSuccessMessage('User created successfully');
                this.loadUserManagementInterface();
                bootstrap.Modal.getInstance(document.getElementById('create-user-modal')).hide();
                form.reset();
            }
        } catch (error) {
            console.error('User creation error:', error);
            
            // Handle specific error cases
            if (error.message.includes('Unexpected token')) {
                this.showErrorMessage('Server error: Unable to process request. The backend may not be running or accessible.');
            } else if (error.message.includes('Failed to fetch')) {
                this.showErrorMessage('Network error: Unable to connect to server. Please check your internet connection.');
            } else if (error.message.includes('401')) {
                this.showErrorMessage('Authentication failed. Please log in again.');
                window.location.href = '/login.html';
            } else if (error.message.includes('404')) {
                this.showErrorMessage('API endpoint not found. The backend may not be properly deployed.');
            } else {
                this.showErrorMessage('Failed to create user: ' + error.message);
            }
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

    // Add event listeners for user actions
    addUserActionListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="change-password"]')) {
                const userId = e.target.dataset.userId;
                this.showChangePasswordModal(userId);
            }
            if (e.target.matches('[data-action="delete-user"]')) {
                const userId = e.target.dataset.userId;
                this.confirmDeleteUser(userId);
            }
            if (e.target.matches('[data-action="edit-user"]')) {
                const userId = e.target.dataset.userId;
                this.showEditUserModal(userId);
            }
        });

        // Handle change password form submission
        document.addEventListener('submit', (e) => {
            if (e.target.matches('#change-password-form')) {
                e.preventDefault();
                this.changePassword(e.target);
            }
            if (e.target.matches('#edit-user-form')) {
                e.preventDefault();
                this.editUser(e.target);
            }
        });
    }

    showChangePasswordModal(userId) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'change-password-modal';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><i class="fas fa-key me-2"></i>Change Password</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <form id="change-password-form">
                        <input type="hidden" name="userId" value="${userId}">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="currentPassword" class="form-label">Current Password</label>
                                <input type="password" class="form-control" id="currentPassword" name="currentPassword" required>
                            </div>
                            <div class="mb-3">
                                <label for="newPassword" class="form-label">New Password</label>
                                <input type="password" class="form-control" id="newPassword" name="newPassword" required>
                                <div class="form-text">Password must be at least 8 characters long</div>
                            </div>
                            <div class="mb-3">
                                <label for="confirmPassword" class="form-label">Confirm New Password</label>
                                <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-key me-1"></i>Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }

    async changePassword(form) {
        try {
            const formData = new FormData(form);
            const userId = formData.get('userId');
            const currentPassword = formData.get('currentPassword');
            const newPassword = formData.get('newPassword');
            const confirmPassword = formData.get('confirmPassword');

            // Validation
            if (newPassword !== confirmPassword) {
                this.showErrorMessage('New passwords do not match');
                return;
            }

            if (newPassword.length < 8) {
                this.showErrorMessage('Password must be at least 8 characters long');
                return;
            }

            const response = await this.apiRequest(`/users/${userId}/password`, 'PUT', {
                currentPassword,
                newPassword
            });

            if (response.success) {
                this.showSuccessMessage('Password changed successfully');
                bootstrap.Modal.getInstance(document.getElementById('change-password-modal')).hide();
                form.reset();
            }
        } catch (error) {
            console.error('Password change error:', error);
            this.showErrorMessage('Failed to change password: ' + error.message);
        }
    }

    confirmDeleteUser(userId) {
        const user = this.users.find(u => u.id == userId);
        if (!user) return;

        const confirmed = confirm(`Are you sure you want to delete user "${user.firstName} ${user.lastName}" (${user.email})?\n\nThis action cannot be undone and will restrict the user from accessing group details.`);
        
        if (confirmed) {
            this.deleteUser(userId);
        }
    }

    async deleteUser(userId) {
        try {
            const response = await this.apiRequest(`/users/${userId}`, 'DELETE');
            
            if (response.success) {
                this.showSuccessMessage(`User ${response.data.name} has been deleted successfully`);
                this.loadUserManagementInterface(); // Refresh the user list
            }
        } catch (error) {
            console.error('Delete user error:', error);
            this.showErrorMessage('Failed to delete user: ' + error.message);
        }
    }

    showEditUserModal(userId) {
        const user = this.users.find(u => u.id == userId);
        if (!user) return;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'edit-user-modal';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><i class="fas fa-edit me-2"></i>Edit User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <form id="edit-user-form">
                        <input type="hidden" name="userId" value="${userId}">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="editFirstName" class="form-label">First Name</label>
                                        <input type="text" class="form-control" id="editFirstName" name="firstName" value="${user.firstName}" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="editLastName" class="form-label">Last Name</label>
                                        <input type="text" class="form-control" id="editLastName" name="lastName" value="${user.lastName}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="editEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="editEmail" name="email" value="${user.email}" readonly>
                                <div class="form-text">Email cannot be changed</div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="editRole" class="form-label">Role</label>
                                        <select class="form-select" id="editRole" name="role" required>
                                            <option value="farmer" ${user.role === 'farmer' ? 'selected' : ''}>Farmer</option>
                                            <option value="manager" ${user.role === 'manager' ? 'selected' : ''}>Manager</option>
                                            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="editPhone" class="form-label">Phone</label>
                                        <input type="tel" class="form-control" id="editPhone" name="phone" value="${user.phone || ''}">
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="editPermissions" class="form-label">Permissions</label>
                                <input type="text" class="form-control" id="editPermissions" name="permissions" value="${user.permissions.join(', ')}" placeholder="permission1,permission2,permission3">
                                <div class="form-text">Comma-separated list of permissions</div>
                            </div>
                            <div class="mb-3">
                                <label for="editStatus" class="form-label">Status</label>
                                <select class="form-select" id="editStatus" name="status">
                                    <option value="active" ${user.status === 'active' ? 'selected' : ''}>Active</option>
                                    <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                                    <option value="suspended" ${user.status === 'suspended' ? 'selected' : ''}>Suspended</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save me-1"></i>Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }

    async editUser(form) {
        try {
            const formData = new FormData(form);
            const userId = formData.get('userId');
            const userData = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                role: formData.get('role'),
                phone: formData.get('phone'),
                permissions: formData.get('permissions') ? formData.get('permissions').split(',').map(p => p.trim()).filter(p => p) : [],
                status: formData.get('status')
            };

            const response = await this.apiRequest(`/users/${userId}`, 'PUT', userData);
            
            if (response.success) {
                this.showSuccessMessage('User updated successfully');
                bootstrap.Modal.getInstance(document.getElementById('edit-user-modal')).hide();
                this.loadUserManagementInterface(); // Refresh the user list
            }
        } catch (error) {
            console.error('Edit user error:', error);
            this.showErrorMessage('Failed to update user: ' + error.message);
        }
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

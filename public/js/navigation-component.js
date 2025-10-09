<!-- Universal Navigation Sidebar Component -->
<nav class="col-lg-2 col-md-3 sidebar" id="sidebar">
    <div class="position-sticky pt-3">
        <!-- Brand/Logo -->
        <div class="text-center mb-4">
            <h4 class="text-white">
                <i class="fas fa-seedling me-2"></i>SmartFarm
            </h4>
        </div>
        
        <!-- Main Navigation -->
        <ul class="nav flex-column">
            <!-- Dashboard -->
            <li class="nav-item">
                <a class="nav-link" href="dashboard.html">
                    <i class="fas fa-tachometer-alt me-2"></i>Dashboard
                </a>
            </li>
            
            <!-- Farm Management -->
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="showFarmManagement()">
                    <i class="fas fa-tractor me-2"></i>Farm Management
                </a>
            </li>
            
            <!-- Crop Management -->
            <li class="nav-item">
                <a class="nav-link" href="crop-management.html">
                    <i class="fas fa-seedling me-2"></i>Crop Management
                </a>
            </li>
            
            <!-- Livestock -->
            <li class="nav-item">
                <a class="nav-link" href="livestock-management.html">
                    <i class="fas fa-cow me-2"></i>Livestock
                </a>
            </li>
            
            <!-- Inventory -->
            <li class="nav-item">
                <a class="nav-link" href="inventory-management.html">
                    <i class="fas fa-boxes me-2"></i>Inventory
                </a>
            </li>
            
            <!-- Watering -->
            <li class="nav-item">
                <a class="nav-link" href="watering-management.html">
                    <i class="fas fa-tint me-2"></i>Watering
                </a>
            </li>
            
            <!-- Analytics -->
            <li class="nav-item">
                <a class="nav-link" href="analytics-dashboard.html">
                    <i class="fas fa-chart-line me-2"></i>Analytics
                </a>
            </li>
            
            <!-- Tasks -->
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="showTasks()">
                    <i class="fas fa-tasks me-2"></i>Tasks
                </a>
            </li>
            
            <!-- Reports -->
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="showReports()">
                    <i class="fas fa-file-alt me-2"></i>Reports
                </a>
            </li>
            
            <!-- Farm Locator -->
            <li class="nav-item">
                <a class="nav-link" href="farm-locator.html">
                    <i class="fas fa-map-marker-alt me-2"></i>Farm Locator
                </a>
            </li>
            
            <!-- Geofencing -->
            <li class="nav-item">
                <a class="nav-link" href="geofencing-setup.html">
                    <i class="fas fa-map-marked-alt me-2"></i>Geofencing
                </a>
            </li>
            
            <!-- AI Advisory -->
            <li class="nav-item">
                <a class="nav-link" href="ai-advisory.html">
                    <i class="fas fa-robot me-2"></i>AI Advisory
                </a>
            </li>
            
            <!-- AI Predictions -->
            <li class="nav-item">
                <a class="nav-link" href="ai-predictions.html">
                    <i class="fas fa-brain me-2"></i>AI Predictions
                </a>
            </li>
            
            <!-- Farm to Table -->
            <li class="nav-item">
                <a class="nav-link" href="farm-to-table.html">
                    <i class="fas fa-store me-2"></i>Farm to Table
                </a>
            </li>
            
            <!-- Supply Chain -->
            <li class="nav-item">
                <a class="nav-link" href="supply-chain.html">
                    <i class="fas fa-truck me-2"></i>Supply Chain
                </a>
            </li>
            
            <!-- Weeding -->
            <li class="nav-item">
                <a class="nav-link" href="weeding-management.html">
                    <i class="fas fa-seedling me-2"></i>Weeding
                </a>
            </li>
            
            <!-- Pesticides -->
            <li class="nav-item">
                <a class="nav-link" href="pesticide-management.html">
                    <i class="fas fa-bug me-2"></i>Pesticides
                </a>
            </li>
            
            <!-- User Management -->
            <li class="nav-item">
                <a class="nav-link" href="user-management.html">
                    <i class="fas fa-users-cog me-2"></i>User Management
                </a>
            </li>
            
            <!-- Subscription -->
            <li class="nav-item">
                <a class="nav-link" href="subscription-management.html">
                    <i class="fas fa-credit-card me-2"></i>Subscription
                </a>
            </li>
            
            <!-- Settings -->
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="showSettings()">
                    <i class="fas fa-cog me-2"></i>Settings
                </a>
            </li>
            
            <!-- Help -->
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="showHelp()">
                    <i class="fas fa-question-circle me-2"></i>Help
                </a>
            </li>
        </ul>
        
        <!-- Quick Actions -->
        <div class="mt-4">
            <h6 class="text-white-50 mb-3">Quick Actions</h6>
            <div class="d-grid gap-2">
                <button class="btn btn-outline-light btn-sm" onclick="addNewCrop()">
                    <i class="fas fa-plus me-1"></i>Add Crop
                </button>
                <button class="btn btn-outline-light btn-sm" onclick="addNewLivestock()">
                    <i class="fas fa-plus me-1"></i>Add Livestock
                </button>
                <button class="btn btn-outline-light btn-sm" onclick="createTask()">
                    <i class="fas fa-plus me-1"></i>Create Task
                </button>
            </div>
        </div>
        
        <!-- Status Indicator -->
        <div class="mt-4">
            <div class="card bg-transparent border-light">
                <div class="card-body p-2">
                    <small class="text-white-50">System Status</small>
                    <div class="d-flex align-items-center">
                        <div class="status-indicator me-2" id="systemStatus"></div>
                        <small class="text-white" id="statusText">Checking...</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>

<!-- Mobile Toggle Button -->
<button class="btn btn-outline-primary d-lg-none position-fixed" id="sidebarToggle" style="top: 10px; left: 10px; z-index: 1000;">
    <i class="fas fa-bars"></i>
</button>

<style>
/* Enhanced Sidebar Styles */
.sidebar {
    background: linear-gradient(135deg, #2e7d32, #4caf50);
    min-height: 100vh;
    color: white;
    transition: all 0.3s ease;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
}

.sidebar .nav-link {
    color: rgba(255, 255, 255, 0.8);
    padding: 12px 20px;
    border-radius: 8px;
    margin: 5px 0;
    transition: all 0.3s ease;
    text-decoration: none;
}

.sidebar .nav-link:hover,
.sidebar .nav-link.active {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.sidebar .nav-link.active {
    background: rgba(255, 255, 255, 0.3);
    border-left: 3px solid #fff;
    font-weight: 600;
}

.status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ffc107;
    animation: pulse 2s infinite;
}

.status-indicator.online {
    background: #28a745;
}

.status-indicator.offline {
    background: #dc3545;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}

@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        left: -250px;
        top: 0;
        width: 250px;
        z-index: 1000;
        transition: left 0.3s ease;
    }
    
    .sidebar.show {
        left: 0;
    }
    
    .sidebar.show::after {
        content: '';
        position: fixed;
        top: 0;
        left: 250px;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.5);
        z-index: -1;
    }
}
</style>

<script>
// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        });
    }
    
    // Set active navigation item based on current page
    setActiveNavigation();
    
    // Check system status
    checkSystemStatus();
});

function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'dashboard.html')) {
            link.classList.add('active');
        }
    });
}

function checkSystemStatus() {
    const statusIndicator = document.getElementById('systemStatus');
    const statusText = document.getElementById('statusText');
    
    if (!statusIndicator || !statusText) return;
    
    // Check API status
    fetch('https://smartfarm-app-production.up.railway.app/api/health')
        .then(response => {
            if (response.ok) {
                statusIndicator.className = 'status-indicator online';
                statusText.textContent = 'Online';
            } else {
                throw new Error('API not responding');
            }
        })
        .catch(error => {
            statusIndicator.className = 'status-indicator offline';
            statusText.textContent = 'Offline';
        });
}

// Quick action functions
function addNewCrop() {
    if (typeof showCropManagement === 'function') {
        showCropManagement();
    } else {
        window.location.href = 'crop-management.html';
    }
}

function addNewLivestock() {
    if (typeof showLivestockManagement === 'function') {
        showLivestockManagement();
    } else {
        window.location.href = 'livestock-management.html';
    }
}

function createTask() {
    if (typeof showTasks === 'function') {
        showTasks();
    } else {
        alert('Task management will be available soon!');
    }
}

function showSettings() {
    alert('Settings panel will be available soon!');
}

function showHelp() {
    alert('Help documentation will be available soon!');
}
</script>

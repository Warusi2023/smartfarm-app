// Farm to Table System JavaScript
// Handles byproducts management and value-added product recommendations

class FarmToTableSystem {
    constructor() {
        this.byproducts = [];
        this.processingPlans = [];
        this.salesRecords = [];
        this.crops = [];
        this.livestock = [];
        this.charts = {};
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadCrops();
            await this.loadLivestock();
            await this.loadProcessingPlans();
            await this.loadSalesRecords();
            this.setupEventListeners();
            this.updateUI();
        } catch (error) {
            console.error('Error initializing Farm to Table System:', error);
            this.showError('Failed to initialize Farm to Table System');
        }
    }
    
    async loadCrops() {
        try {
            const response = await fetch(window.SmartFarmConfig.getApiUrl('/api/byproducts/crops'));
            if (!response.ok) throw new Error('Failed to load crops');
            
            const data = await response.json();
            this.crops = data.data || [];
        } catch (error) {
            console.error('Error loading crops:', error);
            this.crops = [];
        }
    }
    
    async loadLivestock() {
        try {
            const response = await fetch(window.SmartFarmConfig.getApiUrl('/api/byproducts/livestock'));
            if (!response.ok) throw new Error('Failed to load livestock');
            
            const data = await response.json();
            this.livestock = data.data || [];
        } catch (error) {
            console.error('Error loading livestock:', error);
            this.livestock = [];
        }
    }
    
    async loadProcessingPlans() {
        try {
            const response = await fetch(window.SmartFarmConfig.getApiUrl('/api/byproducts/processing-plans'));
            if (!response.ok) throw new Error('Failed to load processing plans');
            
            const data = await response.json();
            this.processingPlans = data.data || [];
        } catch (error) {
            console.error('Error loading processing plans:', error);
            this.processingPlans = [];
        }
    }
    
    async loadSalesRecords() {
        try {
            // Simulate sales records - in production, this would come from API
            this.salesRecords = [
                {
                    id: 'sale_001',
                    byproductName: 'Cassava Flour',
                    quantity: 50,
                    unitPrice: 2.50,
                    totalAmount: 125.00,
                    buyerName: 'Local Bakery',
                    saleDate: '2024-01-15',
                    status: 'completed'
                },
                {
                    id: 'sale_002',
                    byproductName: 'Banana Chips',
                    quantity: 25,
                    unitPrice: 4.00,
                    totalAmount: 100.00,
                    buyerName: 'Snack Distributor',
                    saleDate: '2024-01-10',
                    status: 'completed'
                }
            ];
        } catch (error) {
            console.error('Error loading sales records:', error);
            this.salesRecords = [];
        }
    }
    
    updateUI() {
        this.updateOverview();
        this.updateCropsTab();
        this.updateLivestockTab();
        this.updatePlansTab();
        this.updateSalesTab();
        this.updateQuickStats();
    }
    
    updateOverview() {
        this.updateRevenueChart();
        this.updateTopByproducts();
    }
    
    updateRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;
        
        // Calculate revenue by month
        const monthlyRevenue = this.calculateMonthlyRevenue();
        
        this.charts.revenue = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(monthlyRevenue),
                datasets: [{
                    label: 'Revenue ($)',
                    data: Object.values(monthlyRevenue),
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4
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
    
    calculateMonthlyRevenue() {
        const monthly = {};
        this.salesRecords.forEach(sale => {
            const month = sale.saleDate.substring(0, 7); // YYYY-MM
            monthly[month] = (monthly[month] || 0) + sale.totalAmount;
        });
        return monthly;
    }
    
    updateTopByproducts() {
        const container = document.getElementById('topByproducts');
        
        // Calculate top byproducts by revenue
        const byproductRevenue = {};
        this.salesRecords.forEach(sale => {
            byproductRevenue[sale.byproductName] = (byproductRevenue[sale.byproductName] || 0) + sale.totalAmount;
        });
        
        const topByproducts = Object.entries(byproductRevenue)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
        
        if (topByproducts.length === 0) {
            container.innerHTML = '<p class="text-muted">No sales data available</p>';
            return;
        }
        
        container.innerHTML = topByproducts.map(([name, revenue], index) => `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <span class="badge bg-primary me-2">${index + 1}</span>
                    <span>${name}</span>
                </div>
                <span class="fw-bold">$${revenue.toFixed(2)}</span>
            </div>
        `).join('');
    }
    
    updateCropsTab() {
        const container = document.getElementById('cropsByproducts');
        
        if (this.crops.length === 0) {
            container.innerHTML = '<p class="text-muted">No crops found</p>';
            return;
        }
        
        container.innerHTML = this.crops.map(crop => {
            const byproducts = crop.byproducts || [];
            const potentialRevenue = crop.potentialRevenue || [];
            
            return `
                <div class="card mb-4">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">${crop.name}</h5>
                            <span class="badge bg-success">${crop.status}</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Byproducts Available</h6>
                                ${byproducts.length > 0 ? byproducts.map(byproduct => `
                                    <div class="card mb-2">
                                        <div class="card-body p-2">
                                            <div class="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h6 class="mb-1">${byproduct.name}</h6>
                                                    <p class="text-muted mb-1">${byproduct.description}</p>
                                                    <small class="text-success">$${byproduct.marketValue}/unit</small>
                                                </div>
                                                <button class="btn btn-sm btn-outline-primary" onclick="farmToTable.createProcessingPlan('crop', '${crop.id}', '${byproduct.name}')">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `).join('') : '<p class="text-muted">No byproducts available</p>'}
                            </div>
                            <div class="col-md-6">
                                <h6>Revenue Potential</h6>
                                ${potentialRevenue.length > 0 ? potentialRevenue.map(item => `
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <span>${item.name}</span>
                                        <span class="fw-bold text-success">$${item.potentialRevenue.toFixed(2)}</span>
                                    </div>
                                `).join('') : '<p class="text-muted">No revenue data</p>'}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    updateLivestockTab() {
        const container = document.getElementById('livestockByproducts');
        
        if (this.livestock.length === 0) {
            container.innerHTML = '<p class="text-muted">No livestock found</p>';
            return;
        }
        
        container.innerHTML = this.livestock.map(animal => {
            const byproducts = animal.byproducts || [];
            const potentialRevenue = animal.potentialRevenue || [];
            
            return `
                <div class="card mb-4">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">${animal.animalType} - ${animal.breed || 'Mixed'}</h5>
                            <span class="badge bg-info">${animal.productionPurpose || 'General'}</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Byproducts Available</h6>
                                ${byproducts.length > 0 ? byproducts.map(byproduct => `
                                    <div class="card mb-2">
                                        <div class="card-body p-2">
                                            <div class="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h6 class="mb-1">${byproduct.name}</h6>
                                                    <p class="text-muted mb-1">${byproduct.description}</p>
                                                    <small class="text-success">$${byproduct.marketValue}/unit</small>
                                                </div>
                                                <button class="btn btn-sm btn-outline-primary" onclick="farmToTable.createProcessingPlan('livestock', '${animal.id}', '${byproduct.name}')">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `).join('') : '<p class="text-muted">No byproducts available</p>'}
                            </div>
                            <div class="col-md-6">
                                <h6>Revenue Potential</h6>
                                ${potentialRevenue.length > 0 ? potentialRevenue.map(item => `
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <span>${item.name}</span>
                                        <span class="fw-bold text-success">$${item.potentialRevenue.toFixed(2)}</span>
                                    </div>
                                `).join('') : '<p class="text-muted">No revenue data</p>'}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    updatePlansTab() {
        const container = document.getElementById('processingPlans');
        
        if (this.processingPlans.length === 0) {
            container.innerHTML = '<p class="text-muted">No processing plans found</p>';
            return;
        }
        
        container.innerHTML = this.processingPlans.map(plan => `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6>${plan.byproductName}</h6>
                            <p class="text-muted mb-1">${plan.sourceType === 'crop' ? plan.cropName : plan.livestockType}</p>
                            <p class="mb-1"><strong>Quantity:</strong> ${plan.quantity} units</p>
                            <p class="mb-1"><strong>Method:</strong> ${plan.processingMethod}</p>
                            <p class="mb-1"><strong>Expected Revenue:</strong> $${plan.expectedRevenue || 0}</p>
                        </div>
                        <div class="text-end">
                            <span class="badge bg-${this.getStatusColor(plan.status)} mb-2">${plan.status}</span>
                            <br>
                            <small class="text-muted">${new Date(plan.createdAt).toLocaleDateString()}</small>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-sm btn-outline-primary me-2" onclick="farmToTable.editPlan('${plan.id}')">
                            <i class="fas fa-edit me-1"></i>Edit
                        </button>
                        <button class="btn btn-sm btn-outline-success me-2" onclick="farmToTable.updatePlanStatus('${plan.id}', 'in_progress')">
                            <i class="fas fa-play me-1"></i>Start
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="farmToTable.deletePlan('${plan.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    updateSalesTab() {
        const container = document.getElementById('salesRecords');
        
        if (this.salesRecords.length === 0) {
            container.innerHTML = '<p class="text-muted">No sales records found</p>';
            return;
        }
        
        container.innerHTML = this.salesRecords.map(sale => `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6>${sale.byproductName}</h6>
                            <p class="text-muted mb-1">Buyer: ${sale.buyerName}</p>
                            <p class="mb-1"><strong>Quantity:</strong> ${sale.quantity} units</p>
                            <p class="mb-1"><strong>Unit Price:</strong> $${sale.unitPrice}</p>
                            <p class="mb-1"><strong>Total:</strong> $${sale.totalAmount}</p>
                        </div>
                        <div class="text-end">
                            <span class="badge bg-success mb-2">${sale.status}</span>
                            <br>
                            <small class="text-muted">${new Date(sale.saleDate).toLocaleDateString()}</small>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    updateQuickStats() {
        const totalByproducts = this.crops.reduce((sum, crop) => sum + (crop.byproducts?.length || 0), 0) +
                               this.livestock.reduce((sum, animal) => sum + (animal.byproducts?.length || 0), 0);
        
        const totalRevenue = this.salesRecords.reduce((sum, sale) => sum + sale.totalAmount, 0);
        
        document.getElementById('totalByproducts').textContent = totalByproducts;
        document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
    }
    
    getStatusColor(status) {
        const colors = {
            planned: 'warning',
            in_progress: 'info',
            completed: 'success',
            cancelled: 'danger'
        };
        return colors[status] || 'secondary';
    }
    
    async createProcessingPlan(sourceType, sourceId, byproductName) {
        // Show create plan modal
        document.getElementById('planSourceType').value = sourceType;
        document.getElementById('planSourceId').value = sourceId;
        document.getElementById('planByproductName').value = byproductName;
        
        const modal = new bootstrap.Modal(document.getElementById('createPlanModal'));
        modal.show();
    }
    
    async createProcessingPlanFromForm() {
        try {
            const formData = {
                sourceType: document.getElementById('planSourceType').value,
                sourceId: document.getElementById('planSourceId').value,
                byproductName: document.getElementById('planByproductName').value,
                quantity: parseFloat(document.getElementById('planQuantity').value),
                processingMethod: document.getElementById('planProcessingMethod').value,
                equipment: document.getElementById('planEquipment').value,
                targetMarket: document.getElementById('planTargetMarket').value,
                expectedRevenue: parseFloat(document.getElementById('planExpectedRevenue').value) || 0,
                processingDate: document.getElementById('planProcessingDate').value,
                notes: document.getElementById('planNotes').value
            };
            
            const response = await fetch(window.SmartFarmConfig.getApiUrl('/api/byproducts/processing-plans'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) throw new Error('Failed to create processing plan');
            
            const data = await response.json();
            this.showSuccess('Processing plan created successfully!');
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('createPlanModal'));
            modal.hide();
            
            // Refresh data
            await this.loadProcessingPlans();
            this.updatePlansTab();
            
        } catch (error) {
            console.error('Error creating processing plan:', error);
            this.showError('Failed to create processing plan');
        }
    }
    
    async updatePlanStatus(planId, status) {
        try {
            const response = await fetch(window.SmartFarmConfig.getApiUrl(`/api/byproducts/processing-plans/${planId}/status`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status })
            });
            
            if (!response.ok) throw new Error('Failed to update plan status');
            
            this.showSuccess('Plan status updated successfully!');
            
            // Refresh data
            await this.loadProcessingPlans();
            this.updatePlansTab();
            
        } catch (error) {
            console.error('Error updating plan status:', error);
            this.showError('Failed to update plan status');
        }
    }
    
    async deletePlan(planId) {
        if (!confirm('Are you sure you want to delete this processing plan?')) return;
        
        try {
            // In a real implementation, this would call a DELETE API endpoint
            this.processingPlans = this.processingPlans.filter(plan => plan.id !== planId);
            this.updatePlansTab();
            this.showSuccess('Processing plan deleted successfully!');
        } catch (error) {
            console.error('Error deleting plan:', error);
            this.showError('Failed to delete processing plan');
        }
    }
    
    editPlan(planId) {
        // In a real implementation, this would open an edit modal
        this.showInfo('Edit functionality will be implemented in the next version');
    }
    
    setupEventListeners() {
        // Add event listeners for form submissions, filters, etc.
        const createPlanForm = document.getElementById('createPlanForm');
        if (createPlanForm) {
            createPlanForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createProcessingPlanFromForm();
            });
        }
    }
    
    showError(message) {
        this.showAlert(message, 'danger');
    }
    
    showSuccess(message) {
        this.showAlert(message, 'success');
    }
    
    showInfo(message) {
        this.showAlert(message, 'info');
    }
    
    showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alert.style.top = '20px';
        alert.style.right = '20px';
        alert.style.zIndex = '9999';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// Initialize Farm to Table System when page loads
let farmToTable;
document.addEventListener('DOMContentLoaded', function() {
    farmToTable = new FarmToTableSystem();
});

// Global functions for onclick handlers
function showCreatePlanModal() {
    // Setup source type change handler
    const sourceTypeSelect = document.getElementById('planSourceType');
    const sourceSelect = document.getElementById('planSourceId');
    
    // Clear and disable source select initially
    sourceSelect.innerHTML = '<option value="">Select Source</option>';
    sourceSelect.disabled = true;
    
    // Add event listener for source type changes
    sourceTypeSelect.addEventListener('change', function() {
        populateSourceDropdown(this.value);
    });
    
    const modal = new bootstrap.Modal(document.getElementById('createPlanModal'));
    modal.show();
}

function populateSourceDropdown(sourceType) {
    const sourceSelect = document.getElementById('planSourceId');
    sourceSelect.innerHTML = '<option value="">Select Source</option>';
    
    if (!sourceType) {
        sourceSelect.disabled = true;
        return;
    }
    
    sourceSelect.disabled = false;
    
    if (sourceType === 'crop') {
        // Get crops from localStorage or global variable
        const crops = JSON.parse(localStorage.getItem('crops') || '[]');
        
        if (crops.length === 0) {
            // Add demo crops if none exist
            const demoCrops = [
                { id: 'crop-1', name: 'Tomatoes', variety: 'Cherry' },
                { id: 'crop-2', name: 'Cassava', variety: 'Sweet' },
                { id: 'crop-3', name: 'Taro', variety: 'Giant' },
                { id: 'crop-4', name: 'Kava', variety: 'Noble' },
                { id: 'crop-5', name: 'Coconut', variety: 'Tall' }
            ];
            
            demoCrops.forEach(crop => {
                const option = document.createElement('option');
                option.value = crop.id;
                option.textContent = `${crop.name} - ${crop.variety}`;
                sourceSelect.appendChild(option);
            });
        } else {
            crops.forEach(crop => {
                const option = document.createElement('option');
                option.value = crop.id;
                option.textContent = `${crop.name}${crop.variety ? ' - ' + crop.variety : ''}`;
                sourceSelect.appendChild(option);
            });
        }
    } else if (sourceType === 'livestock') {
        // Get livestock from localStorage or global variable
        const livestock = JSON.parse(localStorage.getItem('livestock') || '[]');
        
        if (livestock.length === 0) {
            // Add demo livestock if none exist
            const demoLivestock = [
                { id: 'livestock-1', type: 'Cattle', breed: 'Holstein', name: 'Bessie' },
                { id: 'livestock-2', type: 'Goat', breed: 'Boer', name: 'Billy' },
                { id: 'livestock-3', type: 'Chicken', breed: 'Rhode Island Red', name: 'Flock 1' },
                { id: 'livestock-4', type: 'Pig', breed: 'Yorkshire', name: 'Porky' },
                { id: 'livestock-5', type: 'Sheep', breed: 'Merino', name: 'Fluffy' }
            ];
            
            demoLivestock.forEach(animal => {
                const option = document.createElement('option');
                option.value = animal.id;
                option.textContent = `${animal.type} - ${animal.breed}${animal.name ? ' (' + animal.name + ')' : ''}`;
                sourceSelect.appendChild(option);
            });
        } else {
            livestock.forEach(animal => {
                const option = document.createElement('option');
                option.value = animal.id;
                option.textContent = `${animal.type} - ${animal.breed}${animal.name ? ' (' + animal.name + ')' : ''}`;
                sourceSelect.appendChild(option);
            });
        }
    }
}

function createProcessingPlan() {
    if (farmToTable) {
        farmToTable.createProcessingPlanFromForm();
    }
}

function applyFilters() {
    // Filter functionality would be implemented here
    console.log('Applying filters...');
}

function clearFilters() {
    // Clear filter functionality would be implemented here
    console.log('Clearing filters...');
}

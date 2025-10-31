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
        this.currentRawProduct = null;
        this.currentByproduct = null;
        
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
            const token = localStorage.getItem('smartfarm_token') || sessionStorage.getItem('smartfarm_token');
            const response = await fetch(window.SmartFarmConfig.getApiUrl('/byproducts/processing-plans'), {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });
            
            if (!response.ok) throw new Error('Failed to load processing plans');
            
            const data = await response.json();
            this.processingPlans = data.data || [];
        } catch (error) {
            console.error('Error loading processing plans from API:', error);
            
            // Fallback to localStorage
            const localPlans = localStorage.getItem('processingPlans');
            if (localPlans) {
                try {
                    this.processingPlans = JSON.parse(localPlans);
                    console.log('Loaded processing plans from localStorage');
                } catch (parseError) {
                    console.error('Error parsing local plans:', parseError);
                    this.processingPlans = [];
                }
            } else {
                this.processingPlans = [];
            }
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
                maintainAspectRatio: true,
                aspectRatio: 2,
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
            // Validate form
            const sourceType = document.getElementById('planSourceType').value;
            const sourceId = document.getElementById('planSourceId').value;
            const byproductName = document.getElementById('planByproductName').value;
            const quantity = document.getElementById('planQuantity').value;
            const processingMethod = document.getElementById('planProcessingMethod').value;
            
            if (!sourceType || !sourceId || !byproductName || !quantity || !processingMethod) {
                this.showError('Please fill in all required fields');
                return;
            }
            
            const formData = {
                id: 'plan-' + Date.now(),
                sourceType: sourceType,
                sourceId: sourceId,
                byproductName: byproductName,
                quantity: parseFloat(quantity),
                processingMethod: processingMethod,
                equipment: document.getElementById('planEquipment').value,
                targetMarket: document.getElementById('planTargetMarket').value,
                expectedRevenue: parseFloat(document.getElementById('planExpectedRevenue').value) || 0,
                processingDate: document.getElementById('planProcessingDate').value || new Date().toISOString().split('T')[0],
                notes: document.getElementById('planNotes').value,
                status: 'planned',
                createdAt: new Date().toISOString()
            };
            
            // Try to save to backend
            try {
                const token = localStorage.getItem('smartfarm_token') || sessionStorage.getItem('smartfarm_token');
                const response = await fetch(window.SmartFarmConfig.getApiUrl('/byproducts/processing-plans'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token ? `Bearer ${token}` : ''
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    const data = await response.json();
                    this.showSuccess('Processing plan created and saved to server!');
                } else {
                    throw new Error('API not available');
                }
            } catch (apiError) {
                // Fallback to local storage if API fails
                console.warn('API not available, saving locally:', apiError);
                
                // Save to localStorage
                let plans = JSON.parse(localStorage.getItem('processingPlans') || '[]');
                plans.push(formData);
                localStorage.setItem('processingPlans', JSON.stringify(plans));
                
                this.showSuccess('Processing plan created (saved locally)!');
            }
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('createPlanModal'));
            if (modal) {
                modal.hide();
            }
            
            // Clear form
            document.getElementById('createPlanForm').reset();
            document.getElementById('planSourceId').innerHTML = '<option value="">Select Source</option>';
            document.getElementById('planSourceId').disabled = true;
            
            // Refresh data
            await this.loadProcessingPlans();
            this.updatePlansTab();
            
        } catch (error) {
            console.error('Error creating processing plan:', error);
            this.showError('Failed to create processing plan: ' + error.message);
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
    
    handleProductTypeChange() {
        const productType = document.getElementById('rawProductType').value;
        const productNameInput = document.getElementById('rawProductName');
        const suggestionsList = document.getElementById('productSuggestions');
        
        suggestionsList.innerHTML = '';
        
        if (!productType) {
            productNameInput.value = '';
            return;
        }
        
        let products = [];
        if (productType === 'crop') {
            products = Object.keys(window.ByproductsDatabase.crops);
        } else if (productType === 'livestock') {
            products = Object.keys(window.ByproductsDatabase.livestock);
        }
        
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = this.formatProductName(product);
            suggestionsList.appendChild(option);
        });
    }
    
    formatProductName(key) {
        return key.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    normalizeProductName(name) {
        return name.toLowerCase().replace(/\s+/g, '_');
    }
    
    searchRawProduct() {
        // This is handled by the datalist
        // Additional search logic can be added here if needed
    }
    
    loadByproductsForRawProduct() {
        const productType = document.getElementById('rawProductType').value;
        const productName = document.getElementById('rawProductName').value.trim();
        
        if (!productType || !productName) {
            this.showError('Please select a product type and enter a product name');
            return;
        }
        
        const normalizedName = this.normalizeProductName(productName);
        let byproducts = [];
        let primaryProduct = '';
        
        if (productType === 'crop') {
            const cropData = window.ByproductsDatabase.crops[normalizedName];
            if (cropData) {
                byproducts = cropData.byproducts || [];
                primaryProduct = cropData.primary || productName;
            }
        } else if (productType === 'livestock') {
            const livestockData = window.ByproductsDatabase.livestock[normalizedName];
            if (livestockData) {
                byproducts = livestockData.byproducts || [];
                primaryProduct = livestockData.primary || productName;
            }
        }
        
        if (byproducts.length === 0) {
            this.showError(`No by-products found for ${productName}. Please check the spelling or try another product.`);
            document.getElementById('rawProductByproducts').innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    No by-products found for "${productName}". Available products: ${this.getAvailableProducts(productType).join(', ')}
                </div>
            `;
            return;
        }
        
        this.currentRawProduct = {
            type: productType,
            name: productName,
            primary: primaryProduct
        };
        
        this.displayByproducts(byproducts);
    }
    
    getAvailableProducts(type) {
        if (type === 'crop') {
            return Object.keys(window.ByproductsDatabase.crops).map(key => this.formatProductName(key));
        } else if (type === 'livestock') {
            return Object.keys(window.ByproductsDatabase.livestock).map(key => this.formatProductName(key));
        }
        return [];
    }
    
    displayByproducts(byproducts) {
        const container = document.getElementById('rawProductByproducts');
        
        container.innerHTML = `
            <div class="card mb-3">
                <div class="card-header bg-light">
                    <h5 class="mb-0">
                        <i class="fas fa-seedling me-2"></i>
                        ${this.currentRawProduct.primary} - Available By-products
                    </h5>
                </div>
                <div class="card-body">
                    <div class="row" id="byproductsGrid">
                        ${byproducts.map((byproduct, index) => `
                            <div class="col-md-6 col-lg-4 mb-3">
                                <div class="card byproduct-card h-100" style="cursor: pointer;" 
                                     data-byproduct-index="${index}">
                                    <div class="card-body">
                                        <h6 class="card-title text-primary">${byproduct.name}</h6>
                                        <p class="card-text text-muted small">${byproduct.description}</p>
                                        <div class="d-flex justify-content-between align-items-center mt-3">
                                            <span class="badge bg-info">${byproduct.category}</span>
                                            <span class="fw-bold text-success">$${byproduct.marketValue.toFixed(2)}/unit</span>
                                        </div>
                                        ${byproduct.projectedOutput ? `
                                            <div class="mt-2">
                                                <small class="text-muted">
                                                    <i class="fas fa-chart-line me-1"></i>
                                                    ${byproduct.projectedOutput.yieldPercentage}% yield
                                                </small>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Store byproducts for click handlers
        this.currentByproductsList = byproducts;
        
        // Attach click handlers
        container.querySelectorAll('.byproduct-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.showByproductDetails(byproducts[index]);
            });
        });
    }
    
    showByproductDetails(byproduct) {
        this.currentByproduct = byproduct;
        
        const modalTitle = document.getElementById('byproductDetailsTitle');
        const modalBody = document.getElementById('byproductDetailsBody');
        
        modalTitle.innerHTML = `<i class="fas fa-info-circle me-2"></i>${byproduct.name}`;
        
        let processingStepsHtml = '';
        if (byproduct.processingSteps && byproduct.processingSteps.length > 0) {
            processingStepsHtml = `
                <div class="mb-4">
                    <h6><i class="fas fa-cogs me-2"></i>Processing Steps</h6>
                    <ol class="list-group list-group-numbered">
                        ${byproduct.processingSteps.map(step => `
                            <li class="list-group-item">${step}</li>
                        `).join('')}
                    </ol>
                </div>
            `;
        }
        
        let projectedOutputHtml = '';
        if (byproduct.projectedOutput) {
            const output = byproduct.projectedOutput;
            projectedOutputHtml = `
                <div class="card mb-4 border-success">
                    <div class="card-header bg-success text-white">
                        <h6 class="mb-0"><i class="fas fa-chart-bar me-2"></i>Projected Output</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Yield:</strong> ${output.yieldPercentage}%</p>
                                ${output.outputPer100kg ? `<p><strong>Output:</strong> ${output.outputPer100kg} ${output.unit} per 100kg input</p>` : ''}
                                ${output.outputPer100Liters ? `<p><strong>Output:</strong> ${output.outputPer100Liters} ${output.unit} per 100 liters input</p>` : ''}
                                ${output.outputPerAnimal ? `<p><strong>Output:</strong> ${output.outputPerAnimal} ${output.unit} per animal</p>` : ''}
                            </div>
                            <div class="col-md-6">
                                ${output.estimatedRevenuePer100kg ? `<p><strong>Estimated Revenue:</strong> $${output.estimatedRevenuePer100kg.toFixed(2)} per 100kg</p>` : ''}
                                ${output.estimatedRevenuePer100Liters ? `<p><strong>Estimated Revenue:</strong> $${output.estimatedRevenuePer100Liters.toFixed(2)} per 100 liters</p>` : ''}
                                ${output.estimatedRevenuePerAnimal ? `<p><strong>Estimated Revenue:</strong> $${output.estimatedRevenuePerAnimal.toFixed(2)} per animal</p>` : ''}
                                <p><strong>Processing Time:</strong> ${output.processingTime}</p>
                                <p><strong>Labor Required:</strong> ${output.laborRequired}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        modalBody.innerHTML = `
            <div class="mb-3">
                <h6><i class="fas fa-tag me-2"></i>Category</h6>
                <span class="badge bg-info fs-6">${byproduct.category}</span>
            </div>
            
            <div class="mb-3">
                <h6><i class="fas fa-info-circle me-2"></i>Description</h6>
                <p>${byproduct.description}</p>
            </div>
            
            <div class="mb-3">
                <h6><i class="fas fa-dollar-sign me-2"></i>Market Value</h6>
                <p class="fs-4 text-success fw-bold">$${byproduct.marketValue.toFixed(2)} per unit</p>
            </div>
            
            <div class="mb-3">
                <h6><i class="fas fa-industry me-2"></i>Processing Method</h6>
                <p>${byproduct.processingMethod}</p>
            </div>
            
            <div class="mb-3">
                <h6><i class="fas fa-tools me-2"></i>Required Equipment</h6>
                <div>
                    ${byproduct.equipment ? byproduct.equipment.map(eq => `
                        <span class="badge bg-secondary me-1 mb-1">${eq}</span>
                    `).join('') : '<span class="text-muted">No specific equipment listed</span>'}
                </div>
            </div>
            
            <div class="mb-3">
                <h6><i class="fas fa-clock me-2"></i>Shelf Life</h6>
                <p>${byproduct.shelfLife}</p>
            </div>
            
            <div class="mb-3">
                <h6><i class="fas fa-store me-2"></i>Target Market</h6>
                <p>${byproduct.targetMarket}</p>
            </div>
            
            ${processingStepsHtml}
            ${projectedOutputHtml}
        `;
        
        const modal = new bootstrap.Modal(document.getElementById('byproductDetailsModal'));
        modal.show();
    }
    
    createPlanFromByproduct() {
        if (!this.currentByproduct || !this.currentRawProduct) {
            this.showError('No by-product selected');
            return;
        }
        
        // Close by-product details modal
        const detailsModal = bootstrap.Modal.getInstance(document.getElementById('byproductDetailsModal'));
        if (detailsModal) {
            detailsModal.hide();
        }
        
        // Open create plan modal with pre-filled data
        document.getElementById('planSourceType').value = this.currentRawProduct.type;
        document.getElementById('planByproductName').value = this.currentByproduct.name;
        document.getElementById('planProcessingMethod').value = this.currentByproduct.processingMethod;
        document.getElementById('planEquipment').value = this.currentByproduct.equipment ? this.currentByproduct.equipment.join(', ') : '';
        document.getElementById('planTargetMarket').value = this.currentByproduct.targetMarket || '';
        
        // Calculate estimated revenue if output data exists
        if (this.currentByproduct.projectedOutput) {
            const output = this.currentByproduct.projectedOutput;
            let estimatedRevenue = 0;
            if (output.estimatedRevenuePer100kg) {
                estimatedRevenue = output.estimatedRevenuePer100kg;
            } else if (output.estimatedRevenuePer100Liters) {
                estimatedRevenue = output.estimatedRevenuePer100Liters;
            } else if (output.estimatedRevenuePerAnimal) {
                estimatedRevenue = output.estimatedRevenuePerAnimal;
            }
            document.getElementById('planExpectedRevenue').value = estimatedRevenue.toFixed(2);
        }
        
        // Populate source dropdown
        populateSourceDropdown(this.currentRawProduct.type);
        
        const modal = new bootstrap.Modal(document.getElementById('createPlanModal'));
        modal.show();
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

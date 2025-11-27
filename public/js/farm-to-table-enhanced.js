// Enhanced Farm to Table System
// Comprehensive product transformation tracking and profitability insights

class EnhancedFarmToTable {
    constructor() {
        this.transformations = [];
        this.guides = [];
        this.favorites = JSON.parse(localStorage.getItem('favoriteGuides') || '[]');
        // Use global API service or create new instance
        if (typeof window.SmartFarmAPI !== 'undefined') {
            this.apiService = window.SmartFarmAPI;
        } else if (typeof SmartFarmAPIService !== 'undefined') {
            this.apiService = new SmartFarmAPIService();
        } else {
            // Fallback: create a simple request wrapper
            this.apiService = {
                request: async (endpoint, options = {}) => {
                    try {
                        const token = localStorage.getItem('smartfarm_token') || sessionStorage.getItem('smartfarm_token');
                        const baseUrl = window.SmartFarmConfig?.getApiUrl(endpoint) || `/api${endpoint}`;
                        const response = await fetch(baseUrl, {
                            ...options,
                            headers: {
                                'Content-Type': 'application/json',
                                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                                ...options.headers
                            },
                            body: options.body || undefined
                        });
                        const data = await response.json();
                        return {
                            success: response.ok,
                            data: data.data || data,
                            error: response.ok ? null : (data.message || 'Request failed')
                        };
                    } catch (error) {
                        return {
                            success: false,
                            error: error.message
                        };
                    }
                }
            };
        }
        this.currentTransformation = null;
        this.validationErrors = {};
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadTransformations();
            await this.loadGuides();
            this.setupEventListeners();
            this.updateUI();
        } catch (error) {
            console.error('Error during Farm to Table initialization:', error);
            // Don't show error alert here - let the HTML initialization handle it
            // But still try to set up basic functionality
            try {
                this.setupEventListeners();
                this.transformations = [];
                this.guides = [];
                this.updateUI();
            } catch (setupError) {
                console.error('Error setting up basic functionality:', setupError);
            }
        }
    }
    
    // Load transformation records from API
    async loadTransformations() {
        try {
            const response = await this.apiService.request('/transformations', {
                method: 'GET'
            });
            
            if (response.success) {
                this.transformations = response.data || [];
            } else {
                // Fallback to localStorage
                const local = localStorage.getItem('productTransformations');
                this.transformations = local ? JSON.parse(local) : [];
            }
        } catch (error) {
            console.error('Error loading transformations:', error);
            const local = localStorage.getItem('productTransformations');
            this.transformations = local ? JSON.parse(local) : [];
        }
    }
    
    // Load processing guides
    async loadGuides() {
        // Load guides from database
        this.guides = this.buildGuidesFromDatabase();
        
        // Mark favorites
        this.guides.forEach(guide => {
            guide.isFavorite = this.favorites.includes(guide.id);
        });
    }
    
    // Build guides from byproducts database
    buildGuidesFromDatabase() {
        const guides = [];
        
        // Check if database is available
        if (!window.ByproductsDatabase) {
            console.warn('ByproductsDatabase not loaded, guides will be empty');
            return guides;
        }
        
        // Crop guides
        Object.keys(window.ByproductsDatabase.crops || {}).forEach(cropKey => {
            const crop = window.ByproductsDatabase.crops[cropKey];
            if (!crop || !crop.byproducts || !Array.isArray(crop.byproducts)) {
                return;
            }
            crop.byproducts.forEach(byproduct => {
                if (!byproduct || !byproduct.name) {
                    return; // Skip invalid byproducts
                }
                guides.push({
                    id: `guide-${cropKey}-${byproduct.name.replace(/\s+/g, '-').toLowerCase()}`,
                    category: 'Crop',
                    inputProduct: crop.primary,
                    outputProduct: byproduct.name,
                    description: byproduct.description,
                    processingSteps: byproduct.processingSteps || [],
                    equipment: byproduct.equipment || [],
                    cost: this.calculateProcessingCost(byproduct),
                    outputQuantity: byproduct.projectedOutput?.outputPer100kg || 'N/A',
                    profitMargin: this.calculateProfitMargin(byproduct),
                    marketValue: byproduct.marketValue,
                    shelfLife: byproduct.shelfLife,
                    targetMarket: byproduct.targetMarket
                });
            });
        });
        
        // Livestock guides
        Object.keys(window.ByproductsDatabase.livestock || {}).forEach(livestockKey => {
            const livestock = window.ByproductsDatabase.livestock[livestockKey];
            if (!livestock || !livestock.byproducts || !Array.isArray(livestock.byproducts)) {
                return;
            }
            livestock.byproducts.forEach(byproduct => {
                if (!byproduct || !byproduct.name) {
                    return; // Skip invalid byproducts
                }
                guides.push({
                    id: `guide-${livestockKey}-${byproduct.name.replace(/\s+/g, '-').toLowerCase()}`,
                    category: 'Livestock',
                    inputProduct: livestock.primary,
                    outputProduct: byproduct.name,
                    description: byproduct.description,
                    processingSteps: byproduct.processingSteps || [],
                    equipment: byproduct.equipment || [],
                    cost: this.calculateProcessingCost(byproduct),
                    outputQuantity: byproduct.projectedOutput?.outputPerAnimal || byproduct.projectedOutput?.outputPer100Liters || 'N/A',
                    profitMargin: this.calculateProfitMargin(byproduct),
                    marketValue: byproduct.marketValue,
                    shelfLife: byproduct.shelfLife,
                    targetMarket: byproduct.targetMarket
                });
            });
        });
        
        return guides;
    }
    
    calculateProcessingCost(byproduct) {
        // Estimate 50% of market value as processing cost
        return (byproduct.marketValue * 0.5).toFixed(2);
    }
    
    calculateProfitMargin(byproduct) {
        // Profit margin = (marketValue - processingCost) / marketValue * 100
        const cost = parseFloat(this.calculateProcessingCost(byproduct));
        return (((byproduct.marketValue - cost) / byproduct.marketValue) * 100).toFixed(1);
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Tab switching
        const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
        tabButtons.forEach(button => {
            button.addEventListener('shown.bs.tab', (e) => {
                const targetTab = e.target.getAttribute('data-bs-target');
                this.handleTabChange(targetTab);
            });
        });
        
        // Form validation on input
        const transformationForm = document.getElementById('transformationForm');
        if (transformationForm) {
            transformationForm.addEventListener('input', (e) => {
                this.validateField(e.target);
            });
        }
        
        // Prevent modal close on invalid form
        const transformationModal = document.getElementById('recordTransformationModal');
        if (transformationModal) {
            transformationModal.addEventListener('hide.bs.modal', (e) => {
                if (!this.isFormValid()) {
                    e.preventDefault();
                    this.showFormErrors();
                    return false;
                }
            });
        }
    }
    
    handleTabChange(tabId) {
        if (tabId === '#guides') {
            this.renderGuides();
        } else if (tabId === '#record-processing') {
            this.renderTransformations();
        } else if (tabId === '#profit-analytics') {
            this.renderProfitAnalytics();
        }
    }
    
    // Render guides and tutorials
    renderGuides() {
        const container = document.getElementById('guidesContainer');
        if (!container) return;
        
        const searchTerm = document.getElementById('guideSearch')?.value.toLowerCase() || '';
        const categoryFilter = document.getElementById('guideCategoryFilter')?.value || '';
        
        let filteredGuides = this.guides;
        
        if (searchTerm) {
            filteredGuides = filteredGuides.filter(guide => 
                guide.inputProduct.toLowerCase().includes(searchTerm) ||
                guide.outputProduct.toLowerCase().includes(searchTerm) ||
                guide.description.toLowerCase().includes(searchTerm)
            );
        }
        
        if (categoryFilter) {
            filteredGuides = filteredGuides.filter(guide => guide.category === categoryFilter);
        }
        
        container.innerHTML = `
            <div class="row">
                ${filteredGuides.map(guide => `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card h-100 guide-card">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <span class="badge bg-${guide.category === 'Crop' ? 'success' : 'info'}">${guide.category}</span>
                                <button class="btn btn-sm btn-link p-0" onclick="enhancedFarmToTable.toggleFavorite('${guide.id}')">
                                    <i class="fas fa-star ${guide.isFavorite ? 'text-warning' : 'text-muted'}"></i>
                                </button>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${guide.inputProduct} → ${guide.outputProduct}</h5>
                                <p class="card-text text-muted small">${guide.description}</p>
                                <div class="mb-2">
                                    <small class="text-muted">
                                        <i class="fas fa-dollar-sign me-1"></i>
                                        Market Value: $${guide.marketValue.toFixed(2)}/unit
                                    </small>
                                </div>
                                <div class="mb-2">
                                    <small class="text-muted">
                                        <i class="fas fa-chart-line me-1"></i>
                                        Profit Margin: ${guide.profitMargin}%
                                    </small>
                                </div>
                                <button class="btn btn-primary btn-sm w-100" onclick="enhancedFarmToTable.showGuideDetails('${guide.id}')">
                                    <i class="fas fa-book-open me-1"></i>View Guide
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        if (filteredGuides.length === 0) {
            container.innerHTML = '<div class="alert alert-info">No guides found. Try adjusting your search or filters.</div>';
        }
    }
    
    // Show guide details modal
    showGuideDetails(guideId) {
        const guide = this.guides.find(g => g.id === guideId);
        if (!guide) return;
        
        const modal = document.getElementById('guideDetailsModal');
        const modalBody = document.getElementById('guideDetailsBody');
        const modalTitle = document.getElementById('guideDetailsTitle');
        
        modalTitle.textContent = `${guide.inputProduct} → ${guide.outputProduct}`;
        
        modalBody.innerHTML = `
            <div class="mb-3">
                <span class="badge bg-${guide.category === 'Crop' ? 'success' : 'info'}">${guide.category}</span>
                ${guide.isFavorite ? '<span class="badge bg-warning ms-2">Favorite</span>' : ''}
            </div>
            
            <div class="mb-3">
                <h6><i class="fas fa-info-circle me-2"></i>Description</h6>
                <p>${guide.description}</p>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6">
                    <h6><i class="fas fa-dollar-sign me-2"></i>Financial Overview</h6>
                    <ul class="list-unstyled">
                        <li><strong>Market Value:</strong> $${guide.marketValue.toFixed(2)}/unit</li>
                        <li><strong>Processing Cost:</strong> ~$${guide.cost}</li>
                        <li><strong>Profit Margin:</strong> ${guide.profitMargin}%</li>
                        <li><strong>Output Quantity:</strong> ${guide.outputQuantity}</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h6><i class="fas fa-store me-2"></i>Market Info</h6>
                    <ul class="list-unstyled">
                        <li><strong>Shelf Life:</strong> ${guide.shelfLife}</li>
                        <li><strong>Target Market:</strong> ${guide.targetMarket}</li>
                    </ul>
                </div>
            </div>
            
            <div class="mb-3">
                <h6><i class="fas fa-tools me-2"></i>Required Equipment</h6>
                <div>
                    ${guide.equipment.map(eq => `<span class="badge bg-secondary me-1 mb-1">${eq}</span>`).join('')}
                </div>
            </div>
            
            ${guide.processingSteps && guide.processingSteps.length > 0 ? `
            <div class="mb-3">
                <h6><i class="fas fa-list-ol me-2"></i>Processing Steps</h6>
                <ol class="list-group list-group-numbered">
                    ${guide.processingSteps.map(step => `
                        <li class="list-group-item">${step}</li>
                    `).join('')}
                </ol>
            </div>
            ` : `
            <div class="mb-3">
                <h6><i class="fas fa-list-ol me-2"></i>Processing Steps</h6>
                <p class="text-muted"><i class="fas fa-info-circle me-1"></i>No detailed processing steps available for this product.</p>
            </div>
            `}
            
            <div class="d-grid gap-2">
                <button class="btn btn-success" onclick="enhancedFarmToTable.openRecordForm('${guide.inputProduct}', '${guide.outputProduct}')">
                    <i class="fas fa-plus me-1"></i>Record This Transformation
                </button>
            </div>
        `;
        
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    }
    
    // Toggle favorite
    toggleFavorite(guideId) {
        const index = this.favorites.indexOf(guideId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(guideId);
        }
        
        localStorage.setItem('favoriteGuides', JSON.stringify(this.favorites));
        this.loadGuides();
        this.renderGuides();
    }
    
    // Open record form with pre-filled data
    openRecordForm(inputProduct, outputProduct) {
        document.getElementById('inputProduct').value = inputProduct;
        document.getElementById('outputProduct').value = outputProduct;
        
        // Close guide modal
        const guideModal = bootstrap.Modal.getInstance(document.getElementById('guideDetailsModal'));
        if (guideModal) {
            guideModal.hide();
        }
        
        // Open transformation modal
        const transformationModal = new bootstrap.Modal(document.getElementById('recordTransformationModal'));
        transformationModal.show();
    }
    
    // Validate form field
    validateField(field) {
        const fieldName = field.name || field.id;
        const value = field.value.trim();
        
        delete this.validationErrors[fieldName];
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.validationErrors[fieldName] = `${field.labels[0]?.textContent || fieldName} is required`;
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        }
        
        // Number validation
        if (field.type === 'number' && value && (isNaN(value) || parseFloat(value) <= 0)) {
            this.validationErrors[fieldName] = 'Please enter a valid positive number';
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        }
        
        // Date validation
        if (field.type === 'date' && value) {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                this.validationErrors[fieldName] = 'Please enter a valid date';
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
                return false;
            }
        }
        
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        return true;
    }
    
    // Check if form is valid
    isFormValid() {
        const form = document.getElementById('transformationForm');
        if (!form) return false;
        
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        // Recalculate profitability
        this.calculateProfitability();
        
        const formIsValid = isValid && Object.keys(this.validationErrors).length === 0;
        
        return formIsValid;
    }
    
    // Show form errors
    showFormErrors() {
        const errorContainer = document.getElementById('formErrors');
        if (!errorContainer) return;
        
        const errors = Object.values(this.validationErrors);
        if (errors.length > 0) {
            errorContainer.innerHTML = `
                <div class="alert alert-danger">
                    <strong><i class="fas fa-exclamation-triangle me-2"></i>Please fix the following errors:</strong>
                    <ul class="mb-0 mt-2">
                        ${errors.map(err => `<li>${err}</li>`).join('')}
                    </ul>
                </div>
            `;
            errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            errorContainer.innerHTML = '';
        }
    }
    
    // Calculate profitability
    calculateProfitability() {
        const inputCost = parseFloat(document.getElementById('inputCost').value) || 0;
        const outputQuantity = parseFloat(document.getElementById('outputQuantity').value) || 0;
        const outputPricePerUnit = parseFloat(document.getElementById('outputPricePerUnit').value) || 0;
        
        const outputValue = outputQuantity * outputPricePerUnit;
        const netProfit = outputValue - inputCost;
        const yieldPercentage = inputCost > 0 ? ((outputQuantity / (parseFloat(document.getElementById('inputQuantity').value) || 1)) * 100).toFixed(1) : 0;
        
        document.getElementById('calculatedOutputValue').textContent = `$${outputValue.toFixed(2)}`;
        document.getElementById('calculatedNetProfit').textContent = `$${netProfit.toFixed(2)}`;
        document.getElementById('calculatedYield').textContent = `${yieldPercentage}%`;
        
        // Update profit color
        const profitElement = document.getElementById('calculatedNetProfit');
        profitElement.className = netProfit >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold';
    }
    
    // Handle successful save
    async handleSuccessfulSave() {
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('recordTransformationModal'));
        if (modal) {
            modal.hide();
        }
        
        // Reset form
        document.getElementById('transformationForm').reset();
        this.validationErrors = {};
        document.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
            el.classList.remove('is-invalid', 'is-valid');
        });
        document.getElementById('formErrors').innerHTML = '';
        
        // Reload data
        await this.loadTransformations();
        this.renderTransformations();
        this.renderProfitAnalytics();
    }
    
    // Save transformation
    async saveTransformation() {
        if (!this.isFormValid()) {
            this.showFormErrors();
            return;
        }
        
        const formData = {
            inputProduct: document.getElementById('inputProduct').value,
            inputQuantity: parseFloat(document.getElementById('inputQuantity').value),
            outputProduct: document.getElementById('outputProduct').value,
            outputQuantity: parseFloat(document.getElementById('outputQuantity').value),
            inputCost: parseFloat(document.getElementById('inputCost').value),
            outputValue: parseFloat(document.getElementById('outputPricePerUnit').value) * parseFloat(document.getElementById('outputQuantity').value),
            processingDate: document.getElementById('processingDate').value,
            notes: document.getElementById('transformationNotes').value || ''
        };
        
        try {
            const response = await this.apiService.request('/transformations', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            
            // Also try using createTransformation if available
            if (!response.success && this.apiService.createTransformation) {
                const altResponse = await this.apiService.createTransformation(formData);
                if (altResponse.success) {
                    this.showSuccess('Transformation recorded successfully!');
                    await this.handleSuccessfulSave();
                    return;
                }
            }
            
            if (response.success) {
                this.showSuccess('Transformation recorded successfully!');
                
                // Close modal
                await this.handleSuccessfulSave();
            } else {
                // Fallback to localStorage
                formData.id = 'trans-' + Date.now();
                formData.createdAt = new Date().toISOString();
                
                this.transformations.push(formData);
                localStorage.setItem('productTransformations', JSON.stringify(this.transformations));
                
                this.showSuccess('Transformation saved locally!');
                
                const modal = bootstrap.Modal.getInstance(document.getElementById('recordTransformationModal'));
                if (modal) {
                    modal.hide();
                }
                
                document.getElementById('transformationForm').reset();
                this.validationErrors = {};
                
                this.renderTransformations();
                this.renderProfitAnalytics();
            }
        } catch (error) {
            console.error('Error saving transformation:', error);
            this.showError('Failed to save transformation. Please try again.');
        }
    }
    
    // Render transformations table
    renderTransformations() {
        const container = document.getElementById('transformationsTableBody');
        if (!container) return;
        
        if (this.transformations.length === 0) {
            container.innerHTML = `
                <tr>
                    <td colspan="9" class="text-center text-muted py-4">
                        <i class="fas fa-info-circle me-2"></i>
                        No transformation records yet. Start recording your first transformation!
                    </td>
                </tr>
            `;
            return;
        }
        
        container.innerHTML = this.transformations.map(trans => {
            const netProfit = trans.outputValue - trans.inputCost;
            const yieldPercentage = trans.inputQuantity > 0 ? ((trans.outputQuantity / trans.inputQuantity) * 100).toFixed(1) : 0;
            
            return `
                <tr>
                    <td>${trans.inputProduct}</td>
                    <td>${trans.inputQuantity}</td>
                    <td>${trans.outputProduct}</td>
                    <td>${trans.outputQuantity}</td>
                    <td>$${trans.inputCost.toFixed(2)}</td>
                    <td>$${trans.outputValue.toFixed(2)}</td>
                    <td class="${netProfit >= 0 ? 'text-success' : 'text-danger'} fw-bold">$${netProfit.toFixed(2)}</td>
                    <td>${yieldPercentage}%</td>
                    <td>${new Date(trans.processingDate).toLocaleDateString()}</td>
                </tr>
            `;
        }).join('');
    }
    
    // Render profit analytics
    renderProfitAnalytics() {
        if (this.transformations.length === 0) {
            document.getElementById('profitChartContainer').innerHTML = '<div class="alert alert-info">Record some transformations to see profit analytics.</div>';
            return;
        }
        
        // Calculate totals
        const totalInputCost = this.transformations.reduce((sum, t) => sum + (t.inputCost || 0), 0);
        const totalOutputValue = this.transformations.reduce((sum, t) => sum + (t.outputValue || 0), 0);
        const totalNetProfit = totalOutputValue - totalInputCost;
        
        document.getElementById('totalInputCost').textContent = `$${totalInputCost.toFixed(2)}`;
        document.getElementById('totalOutputValue').textContent = `$${totalOutputValue.toFixed(2)}`;
        document.getElementById('totalNetProfit').textContent = `$${totalNetProfit.toFixed(2)}`;
        document.getElementById('totalNetProfit').className = totalNetProfit >= 0 ? 'text-success fw-bold fs-4' : 'text-danger fw-bold fs-4';
        
        // Render chart
        this.renderProfitChart();
    }
    
    // Render profit chart
    renderProfitChart() {
        const ctx = document.getElementById('profitChart');
        if (!ctx) return;
        
        // Group by output product
        const productProfits = {};
        this.transformations.forEach(trans => {
            if (!productProfits[trans.outputProduct]) {
                productProfits[trans.outputProduct] = {
                    totalProfit: 0,
                    count: 0
                };
            }
            productProfits[trans.outputProduct].totalProfit += (trans.outputValue - trans.inputCost);
            productProfits[trans.outputProduct].count += 1;
        });
        
        const sortedProducts = Object.entries(productProfits)
            .sort(([,a], [,b]) => b.totalProfit - a.totalProfit)
            .slice(0, 10);
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedProducts.map(([product]) => product),
                datasets: [{
                    label: 'Net Profit ($)',
                    data: sortedProducts.map(([,data]) => data.totalProfit),
                    backgroundColor: sortedProducts.map(([,data]) => data.totalProfit >= 0 ? '#28a745' : '#dc3545')
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
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
    
    // Update UI
    updateUI() {
        this.renderGuides();
        this.renderTransformations();
        this.renderProfitAnalytics();
    }
    
    // Alert helpers
    showSuccess(message) {
        this.showAlert(message, 'success');
    }
    
    showError(message) {
        this.showAlert(message, 'danger');
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

// Note: Initialization is handled in farm-to-table.html
// This allows for proper error handling and API service setup

// Global functions
function searchGuides() {
    if (enhancedFarmToTable) {
        enhancedFarmToTable.renderGuides();
    }
}

function filterGuidesByCategory() {
    if (enhancedFarmToTable) {
        enhancedFarmToTable.renderGuides();
    }
}

function recordTransformation() {
    if (enhancedFarmToTable) {
        enhancedFarmToTable.saveTransformation();
    }
}

function calculateProfit() {
    if (enhancedFarmToTable) {
        enhancedFarmToTable.calculateProfitability();
    }
}

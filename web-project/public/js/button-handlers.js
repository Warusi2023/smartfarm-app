// SmartFarm Missing Button Handlers
// Implements handlers for buttons that were identified as missing

class ButtonHandlers {
    constructor() {
        this.init();
    }

    init() {
        console.log('🔘 Button Handlers initialized');
    }

    // Financial Details Modal
    handleOpenFinancialDetails() {
        const modal = this.createFinancialDetailsModal();
        document.body.appendChild(modal);
        
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        // Load financial data
        this.loadFinancialData();
        
        // Remove modal from DOM when closed
        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });
        
        // Accessibility announcement
        if (window.a11y) {
            window.a11y.announce('Financial details modal opened');
        }
    }

    createFinancialDetailsModal() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'financialDetailsModal';
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', 'financialDetailsModalLabel');
        modal.setAttribute('aria-hidden', 'true');
        
        modal.innerHTML = `
            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="financialDetailsModalLabel">
                            <i class="fas fa-chart-line me-2"></i>Financial Details
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Summary Cards -->
                        <div class="row mb-4">
                            <div class="col-md-3">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h6 class="text-muted">Total Income</h6>
                                        <h3 class="text-success" id="totalIncome">$0</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h6 class="text-muted">Total Expenses</h6>
                                        <h3 class="text-danger" id="totalExpenses">$0</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h6 class="text-muted">Net Profit</h6>
                                        <h3 class="text-primary" id="netProfit">$0</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card text-center">
                                    <div class="card-body">
                                        <h6 class="text-muted">Profit Margin</h6>
                                        <h3 class="text-info" id="profitMargin">0%</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Charts -->
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h6>Income vs Expenses</h6>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="incomeExpenseChart"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h6>Expense Breakdown</h6>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="expenseBreakdownChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Transactions Table -->
                        <div class="card">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h6>Recent Transactions</h6>
                                <div>
                                    <button class="btn btn-sm btn-outline-primary" onclick="buttonHandlers.exportFinancialData('csv')">
                                        <i class="fas fa-file-csv me-1"></i>Export CSV
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" onclick="buttonHandlers.exportFinancialData('pdf')">
                                        <i class="fas fa-file-pdf me-1"></i>Export PDF
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-hover" id="transactionsTable">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Description</th>
                                                <th>Category</th>
                                                <th class="text-end">Amount</th>
                                                <th>Type</th>
                                            </tr>
                                        </thead>
                                        <tbody id="transactionsTableBody">
                                            <tr>
                                                <td colspan="5" class="text-center">
                                                    <div class="spinner-border text-primary" role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }

    async loadFinancialData() {
        try {
            // Simulate API call - replace with actual API endpoint
            const response = await fetch(window.SmartFarmConfig.getApiUrl('/financial/summary'), {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('smartfarm_token') || sessionStorage.getItem('smartfarm_token')}`
                }
            });
            
            if (!response.ok) {
                // Use demo data if API fails
                this.loadDemoFinancialData();
                return;
            }
            
            const data = await response.json();
            this.displayFinancialData(data);
        } catch (error) {
            console.error('Error loading financial data:', error);
            this.loadDemoFinancialData();
        }
    }

    loadDemoFinancialData() {
        const demoData = {
            totalIncome: 25000,
            totalExpenses: 18000,
            netProfit: 7000,
            transactions: [
                { date: '2025-09-28', description: 'Tomato Sales', category: 'Sales', amount: 5000, type: 'income' },
                { date: '2025-09-27', description: 'Fertilizer Purchase', category: 'Supplies', amount: -1200, type: 'expense' },
                { date: '2025-09-26', description: 'Livestock Sales', category: 'Sales', amount: 3500, type: 'income' },
                { date: '2025-09-25', description: 'Equipment Repair', category: 'Maintenance', amount: -800, type: 'expense' },
                { date: '2025-09-24', description: 'Vegetable Sales', category: 'Sales', amount: 2200, type: 'income' }
            ]
        };
        
        this.displayFinancialData(demoData);
    }

    displayFinancialData(data) {
        // Update summary cards
        document.getElementById('totalIncome').textContent = `$${data.totalIncome.toLocaleString()}`;
        document.getElementById('totalExpenses').textContent = `$${data.totalExpenses.toLocaleString()}`;
        document.getElementById('netProfit').textContent = `$${data.netProfit.toLocaleString()}`;
        
        const profitMargin = ((data.netProfit / data.totalIncome) * 100).toFixed(1);
        document.getElementById('profitMargin').textContent = `${profitMargin}%`;
        
        // Update transactions table
        const tbody = document.getElementById('transactionsTableBody');
        tbody.innerHTML = data.transactions.map(t => `
            <tr>
                <td>${new Date(t.date).toLocaleDateString()}</td>
                <td>${t.description}</td>
                <td><span class="badge bg-secondary">${t.category}</span></td>
                <td class="text-end ${t.type === 'income' ? 'text-success' : 'text-danger'}">
                    ${t.type === 'income' ? '+' : ''}$${Math.abs(t.amount).toLocaleString()}
                </td>
                <td>
                    <span class="badge ${t.type === 'income' ? 'bg-success' : 'bg-danger'}">
                        ${t.type.toUpperCase()}
                    </span>
                </td>
            </tr>
        `).join('');
        
        // Create charts
        this.createFinancialCharts(data);
    }

    createFinancialCharts(data) {
        // Income vs Expense Chart
        const incomeExpenseCtx = document.getElementById('incomeExpenseChart');
        if (incomeExpenseCtx && typeof Chart !== 'undefined') {
            new Chart(incomeExpenseCtx, {
                type: 'bar',
                data: {
                    labels: ['Income', 'Expenses', 'Profit'],
                    datasets: [{
                        label: 'Amount ($)',
                        data: [data.totalIncome, data.totalExpenses, data.netProfit],
                        backgroundColor: ['#28a745', '#dc3545', '#007bff']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }
        
        // Expense Breakdown Chart
        const expenseBreakdownCtx = document.getElementById('expenseBreakdownChart');
        if (expenseBreakdownCtx && typeof Chart !== 'undefined') {
            new Chart(expenseBreakdownCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Supplies', 'Labor', 'Equipment', 'Other'],
                    datasets: [{
                        data: [40, 30, 20, 10],
                        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545']
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }
    }

    exportFinancialData(format) {
        if (window.a11y) {
            window.a11y.announce(`Exporting financial data as ${format.toUpperCase()}`);
        }
        
        alert(`Export as ${format.toUpperCase()} - This feature will be implemented soon!`);
    }

    // Batch QR Code Generation
    handleGenerateAllQRCodes() {
        if (window.a11y) {
            window.a11y.announce('Generating QR codes for all products');
        }
        
        if (typeof qrTraceability !== 'undefined') {
            qrTraceability.generateAllQRCodes();
        } else {
            alert('QR Traceability system is not loaded. Please refresh the page.');
        }
    }

    // Market Intelligence Details
    handleOpenMarketTile(productType) {
        alert(`Market Intelligence for ${productType} - Detailed market analysis coming soon!`);
    }

    // IoT Sensor Details
    handleOpenIoTTile(sensorType) {
        alert(`IoT Sensor: ${sensorType} - Detailed sensor data coming soon!`);
    }
}

// Initialize
window.buttonHandlers = new ButtonHandlers();

// Expose global functions for onclick handlers
window.handleOpenFinancialDetails = () => window.buttonHandlers.handleOpenFinancialDetails();
window.handleGenerateAllQRCodes = () => window.buttonHandlers.handleGenerateAllQRCodes();
window.handleOpenMarketTile = (type) => window.buttonHandlers.handleOpenMarketTile(type);
window.handleOpenIoTTile = (type) => window.buttonHandlers.handleOpenIoTTile(type);

// Additional button handlers for dashboard
window.showFinancialDetails = () => window.buttonHandlers.handleOpenFinancialDetails();
window.generateQRCode = () => {
    if (typeof qrTraceability !== 'undefined' && qrTraceability) {
        qrTraceability.generateQRCode();
    } else {
        alert('QR Code system is not loaded. Please refresh the page.');
    }
};
window.addNewProduct = () => {
    if (typeof showAddProductModal === 'function') {
        showAddProductModal();
    } else {
        alert('Product management system is not loaded. Please refresh the page.');
    }
};
window.showQRCodeOptions = () => {
    if (typeof qrTraceability !== 'undefined' && qrTraceability) {
        qrTraceability.showOptions();
    } else {
        alert('QR Code system is not loaded. Please refresh the page.');
    }
};


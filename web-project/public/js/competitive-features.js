// SmartFarm Competitive Features
// Advanced IoT, Sustainability, and Analytics Integration

class SmartFarmCompetitive {
    constructor() {
        this.iotSensors = {};
        this.sustainabilityMetrics = {};
        this.blockchainData = [];
        this.marketData = {};
        this.predictionModels = {};
        
        this.initializeFeatures();
    }

    // IoT Sensor Integration
    initializeIoT() {
        console.log('🔧 Initializing IoT sensors...');
        
        // Simulate IoT sensor data
        this.iotSensors = {
            soilMoisture: {
                value: 65 + Math.random() * 20,
                unit: '%',
                location: 'Field A',
                timestamp: new Date(),
                status: 'active'
            },
            temperature: {
                value: 25 + Math.random() * 10,
                unit: '°C',
                location: 'Greenhouse 1',
                timestamp: new Date(),
                status: 'active'
            },
            humidity: {
                value: 60 + Math.random() * 30,
                unit: '%',
                location: 'Greenhouse 1',
                timestamp: new Date(),
                status: 'active'
            },
            livestockHealth: {
                heartRate: 70 + Math.random() * 20,
                temperature: 38 + Math.random() * 2,
                activity: 'normal',
                location: 'Barn A',
                timestamp: new Date(),
                status: 'monitoring'
            },
            feedLevel: {
                value: 80 + Math.random() * 15,
                unit: '%',
                location: 'Feed Storage',
                timestamp: new Date(),
                status: 'good'
            }
        };

        this.displayIoTData();
        this.setupIoTAlerts();
    }

    displayIoTData() {
        // Create IoT dashboard if it doesn't exist
        let iotContainer = document.getElementById('iotDashboard');
        if (!iotContainer) {
            const dashboardView = document.getElementById('dashboardView');
            if (!dashboardView) {
                console.warn('Dashboard view not found, skipping IoT display');
                return;
            }
            
            iotContainer = document.createElement('div');
            iotContainer.id = 'iotDashboard';
            iotContainer.className = 'dashboard-card mt-4';
            iotContainer.innerHTML = `
                <h5 class="mb-3">🔧 IoT Sensor Network</h5>
                <div class="row" id="iotSensorsContainer">
                    <!-- IoT sensor data will be populated here -->
                </div>
            `;
            dashboardView.appendChild(iotContainer);
        }

        const container = document.getElementById('iotSensorsContainer');
        if (!container) return;
        
        container.innerHTML = '';

        Object.entries(this.iotSensors).forEach(([sensorName, data]) => {
            if (!data || typeof data.value !== 'number') {
                console.warn(`Invalid sensor data for ${sensorName}:`, data);
                return;
            }
            
            const sensorCard = document.createElement('div');
            sensorCard.className = 'col-md-4 mb-3';
            sensorCard.innerHTML = `
                <div class="iot-sensor-card">
                    <div class="sensor-header">
                        <h6 class="sensor-title">${this.getSensorDisplayName(sensorName)}</h6>
                        <span class="sensor-status status-${data.status || 'unknown'}">${data.status || 'unknown'}</span>
                    </div>
                    <div class="sensor-value">
                        <span class="value">${data.value.toFixed(1)}</span>
                        <span class="unit">${data.unit || ''}</span>
                    </div>
                    <div class="sensor-location">
                        <i class="fas fa-map-marker-alt"></i> ${data.location || 'Unknown'}
                    </div>
                    <div class="sensor-timestamp">
                        <small class="text-muted">${data.timestamp ? new Date(data.timestamp).toLocaleTimeString() : 'Unknown'}</small>
                    </div>
                </div>
            `;
            container.appendChild(sensorCard);
        });
    }

    getSensorDisplayName(sensorName) {
        const names = {
            soilMoisture: 'Soil Moisture',
            temperature: 'Temperature',
            humidity: 'Humidity',
            livestockHealth: 'Livestock Health',
            feedLevel: 'Feed Level'
        };
        return names[sensorName] || sensorName;
    }

    setupIoTAlerts() {
        // Check for critical sensor readings
        if (this.iotSensors.soilMoisture && this.iotSensors.soilMoisture.value < 30) {
            this.showAlert('Low soil moisture detected! Irrigation needed.', 'warning');
        }
        
        if (this.iotSensors.temperature && this.iotSensors.temperature.value > 35) {
            this.showAlert('High temperature alert! Check ventilation.', 'danger');
        }
        
        if (this.iotSensors.feedLevel && this.iotSensors.feedLevel.value < 20) {
            this.showAlert('Feed levels low! Refill needed.', 'warning');
        }
    }

    // Sustainability Tracking
    initializeSustainability() {
        console.log('🌍 Initializing sustainability tracking...');
        
        this.sustainabilityMetrics = {
            carbonFootprint: {
                current: 2.5 + Math.random() * 1.5,
                target: 2.0,
                unit: 'tons CO2/year'
            },
            waterUsage: {
                current: 15000 + Math.random() * 5000,
                target: 12000,
                unit: 'liters/month'
            },
            energyConsumption: {
                current: 800 + Math.random() * 200,
                target: 600,
                unit: 'kWh/month'
            },
            wasteReduction: {
                current: 85 + Math.random() * 10,
                target: 90,
                unit: '% recycled'
            },
            biodiversity: {
                current: 75 + Math.random() * 20,
                target: 80,
                unit: 'species count'
            }
        };

        this.displaySustainabilityMetrics();
        this.generateSustainabilityReport();
    }

    displaySustainabilityMetrics() {
        let sustainabilityContainer = document.getElementById('sustainabilityDashboard');
        if (!sustainabilityContainer) {
            sustainabilityContainer = document.createElement('div');
            sustainabilityContainer.id = 'sustainabilityDashboard';
            sustainabilityContainer.className = 'dashboard-card mt-4';
            sustainabilityContainer.innerHTML = `
                <h5 class="mb-3">🌍 Sustainability Metrics</h5>
                <div class="sustainability-grid" id="sustainabilityMetricsContainer">
                    <!-- Sustainability metrics will be populated here -->
                </div>
            `;
            document.getElementById('dashboardView').appendChild(sustainabilityContainer);
        }

        const container = document.getElementById('sustainabilityMetricsContainer');
        container.innerHTML = '';

        Object.entries(this.sustainabilityMetrics).forEach(([metricName, data]) => {
            const progress = (data.current / data.target) * 100;
            const status = progress <= 100 ? 'success' : 'warning';
            
            const metricCard = document.createElement('div');
            metricCard.className = 'sustainability-metric';
            metricCard.innerHTML = `
                <div class="metric-header">
                    <h6>${this.getMetricDisplayName(metricName)}</h6>
                    <span class="metric-status status-${status}">
                        ${progress <= 100 ? '✓' : '⚠'}
                    </span>
                </div>
                <div class="metric-values">
                    <div class="current-value">${data.current.toFixed(1)} ${data.unit}</div>
                    <div class="target-value">Target: ${data.target} ${data.unit}</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.min(progress, 100)}%; background-color: ${progress <= 100 ? '#28a745' : '#ffc107'}"></div>
                </div>
            `;
            container.appendChild(metricCard);
        });
    }

    getMetricDisplayName(metricName) {
        const names = {
            carbonFootprint: 'Carbon Footprint',
            waterUsage: 'Water Usage',
            energyConsumption: 'Energy Consumption',
            wasteReduction: 'Waste Reduction',
            biodiversity: 'Biodiversity Score'
        };
        return names[metricName] || metricName;
    }

    // Blockchain Traceability
    initializeBlockchain() {
        console.log('⛓️ Initializing blockchain traceability...');
        
        // Simulate blockchain data for farm products
        this.blockchainData = [
            {
                productId: 'PROD001',
                productName: 'Organic Tomatoes',
                batchNumber: 'BATCH2024001',
                harvestDate: new Date('2024-01-15'),
                location: 'Field A',
                certifications: ['Organic', 'Non-GMO'],
                blockchainHash: '0x1a2b3c4d5e6f7g8h9i0j',
                status: 'verified'
            },
            {
                productId: 'PROD002',
                productName: 'Free-Range Eggs',
                batchNumber: 'BATCH2024002',
                harvestDate: new Date('2024-01-16'),
                location: 'Barn A',
                certifications: ['Free-Range', 'Organic'],
                blockchainHash: '0x2b3c4d5e6f7g8h9i0j1k',
                status: 'verified'
            }
        ];

        this.displayBlockchainData();
    }

    displayBlockchainData() {
        let blockchainContainer = document.getElementById('blockchainDashboard');
        if (!blockchainContainer) {
            blockchainContainer = document.createElement('div');
            blockchainContainer.id = 'blockchainDashboard';
            blockchainContainer.className = 'dashboard-card mt-4';
            blockchainContainer.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5>⛓️ Product Traceability (Blockchain)</h5>
                    <div>
                        <button class="btn btn-sm btn-outline-success me-2" onclick="smartFarm.scanQRCode()">
                            <i class="fas fa-qrcode me-1"></i>Scan QR Code
                        </button>
                        <button class="btn btn-sm btn-outline-primary" onclick="smartFarm.generateAllQRCodes()">
                            <i class="fas fa-print me-1"></i>Generate All QR Codes
                        </button>
                    </div>
                </div>
                <div class="traceability-grid" id="blockchainContainer">
                    <!-- Blockchain data will be populated here -->
                </div>
            `;
            document.getElementById('dashboardView').appendChild(blockchainContainer);
        }

        const container = document.getElementById('blockchainContainer');
        container.innerHTML = '';

        this.blockchainData.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'traceability-card';
            productCard.innerHTML = `
                <div class="product-header">
                    <h6>${product.productName}</h6>
                    <span class="verification-badge verified">✓ Verified</span>
                </div>
                <div class="product-details">
                    <div class="detail-row">
                        <strong>Batch:</strong> ${product.batchNumber}
                    </div>
                    <div class="detail-row">
                        <strong>Harvest Date:</strong> ${product.harvestDate.toLocaleDateString()}
                    </div>
                    <div class="detail-row">
                        <strong>Location:</strong> ${product.location}
                    </div>
                    <div class="detail-row">
                        <strong>Certifications:</strong> ${product.certifications.join(', ')}
                    </div>
                    <div class="detail-row">
                        <strong>Blockchain Hash:</strong> 
                        <code class="hash-code">${product.blockchainHash.substring(0, 10)}...</code>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn btn-sm btn-outline-primary" onclick="smartFarm.viewFullTraceability('${product.productId}')">
                        View Full Traceability
                    </button>
                </div>
            `;
            container.appendChild(productCard);
        });
    }

    viewFullTraceability(productId) {
        const product = this.blockchainData.find(p => p.productId === productId);
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-search me-2"></i>Full Product Traceability
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="traceability-timeline">
                            <h6>${product.productName} - Complete Journey</h6>
                            <div class="timeline-item">
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h6>Seed Planting</h6>
                                    <p>Date: ${new Date(product.harvestDate.getTime() - 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                                    <p>Location: ${product.location}</p>
                                    <p>Hash: ${product.blockchainHash}</p>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h6>Growth Monitoring</h6>
                                    <p>pH Level: 6.8</p>
                                    <p>Soil Moisture: 65%</p>
                                    <p>Fertilizer Applied: Organic Compost</p>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h6>Harvest</h6>
                                    <p>Date: ${product.harvestDate.toLocaleDateString()}</p>
                                    <p>Quantity: 500kg</p>
                                    <p>Quality Grade: A</p>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-marker"></div>
                                <div class="timeline-content">
                                    <h6>Certification</h6>
                                    <p>Certifications: ${product.certifications.join(', ')}</p>
                                    <p>Inspector: John Smith</p>
                                    <p>Certificate: CERT-${product.productId}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" onclick="smartFarm.generateQRCode('${product.productId}')">
                            <i class="fas fa-qrcode me-2"></i>Generate QR Code
                        </button>
                        <button type="button" class="btn btn-primary" onclick="smartFarm.viewTraceabilityPage('${product.productId}')">
                            <i class="fas fa-external-link-alt me-2"></i>View Full Page
                        </button>
                    </div>
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

    generateQRCode(productId) {
        // Use the QR traceability system
        if (typeof qrTraceability !== 'undefined') {
            // Select the product in the QR generator
            const productSelect = document.getElementById('productSelect');
            if (productSelect) {
                productSelect.value = productId;
                qrTraceability.generateQRCode();
            } else {
                alert(`QR Code generated for product ${productId}\nScan to view full traceability information!`);
            }
        } else {
            alert(`QR Code generated for product ${productId}\nScan to view full traceability information!`);
        }
    }

    viewTraceabilityPage(productId) {
        // Open the full traceability page
        const traceabilityURL = `traceability.html?id=${productId}`;
        window.open(traceabilityURL, '_blank');
    }

    scanQRCode() {
        // QR Code Scanner functionality
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-qrcode me-2"></i>QR Code Scanner
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="scanner-placeholder" style="height: 300px; background: #f8f9fa; border: 2px dashed #dee2e6; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                            <i class="fas fa-camera fa-3x text-muted mb-3"></i>
                            <h5 class="text-muted">QR Code Scanner</h5>
                            <p class="text-muted">Point your camera at a QR code to scan</p>
                            <button class="btn btn-primary" onclick="smartFarm.startCameraScan()">
                                <i class="fas fa-camera me-2"></i>Start Camera
                            </button>
                        </div>
                        <div class="scanner-results mt-3" style="display: none;">
                            <div class="alert alert-success">
                                <i class="fas fa-check-circle me-2"></i>
                                QR Code scanned successfully!
                            </div>
                            <button class="btn btn-success" onclick="smartFarm.viewScannedProduct()">
                                <i class="fas fa-eye me-2"></i>View Product Traceability
                            </button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
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

    startCameraScan() {
        // Simulate camera scanning
        setTimeout(() => {
            document.querySelector('.scanner-placeholder').style.display = 'none';
            document.querySelector('.scanner-results').style.display = 'block';
        }, 2000);
    }

    viewScannedProduct() {
        // Simulate viewing scanned product
        const productId = 'PROD001'; // Simulated scanned product
        this.viewTraceabilityPage(productId);
    }

    generateAllQRCodes() {
        // Generate QR codes for all products
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-qrcode me-2"></i>Generate All QR Codes
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row" id="allQRCodesContainer">
                            <!-- QR codes will be populated here -->
                        </div>
                        <div class="text-center mt-3">
                            <button class="btn btn-success" onclick="smartFarm.downloadAllQRCodes()">
                                <i class="fas fa-download me-2"></i>Download All QR Codes
                            </button>
                            <button class="btn btn-primary ms-2" onclick="smartFarm.printAllQRCodes()">
                                <i class="fas fa-print me-2"></i>Print All QR Codes
                            </button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        // Generate QR codes for all products
        this.generateQRCodesForAllProducts();
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }

    generateQRCodesForAllProducts() {
        const container = document.getElementById('allQRCodesContainer');
        container.innerHTML = '';
        
        this.blockchainData.forEach(product => {
            const qrCard = document.createElement('div');
            qrCard.className = 'col-md-4 mb-3';
            qrCard.innerHTML = `
                <div class="qr-product-card text-center p-3 border rounded">
                    <h6>${product.productName}</h6>
                    <div class="qr-placeholder mb-2" style="height: 100px; background: #f8f9fa; border: 1px dashed #dee2e6; display: flex; align-items: center; justify-content: center;">
                        <span class="text-muted">QR Code</span>
                    </div>
                    <small class="text-muted">Batch: ${product.batchNumber}</small>
                </div>
            `;
            container.appendChild(qrCard);
        });
    }

    downloadAllQRCodes() {
        this.showDownloadQRModal();
    }

    showDownloadQRModal() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-download me-2"></i>Download All QR Codes
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-4">
                            <i class="fas fa-file-archive fa-4x text-success mb-3"></i>
                            <h5>Preparing QR Codes Download</h5>
                            <p class="text-muted">Generating a comprehensive ZIP file with all your product QR codes</p>
                        </div>
                        
                        <div class="download-preview">
                            <h6 class="mb-3">📦 ZIP File Contents:</h6>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="download-item mb-3">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-qrcode text-primary me-3"></i>
                                            <div>
                                                <h6 class="mb-1">QR Code Images</h6>
                                                <small class="text-muted">High-resolution QR codes for all products</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="download-item mb-3">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-tags text-info me-3"></i>
                                            <div>
                                                <h6 class="mb-1">Product Labels</h6>
                                                <small class="text-muted">Ready-to-print product labels with QR codes</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="download-item mb-3">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-info-circle text-warning me-3"></i>
                                            <div>
                                                <h6 class="mb-1">Batch Information</h6>
                                                <small class="text-muted">Complete batch details and metadata</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="download-item mb-3">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-link text-success me-3"></i>
                                            <div>
                                                <h6 class="mb-1">Traceability URLs</h6>
                                                <small class="text-muted">Direct links to traceability pages</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="download-options mt-4">
                            <h6 class="mb-3">📋 Download Options:</h6>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="checkbox" id="includeLabels" checked>
                                <label class="form-check-label" for="includeLabels">
                                    Include printable product labels
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="checkbox" id="includeMetadata" checked>
                                <label class="form-check-label" for="includeMetadata">
                                    Include batch information and metadata
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="checkbox" id="includeInstructions" checked>
                                <label class="form-check-label" for="includeInstructions">
                                    Include consumer instructions
                                </label>
                            </div>
                        </div>
                        
                        <div class="progress-container mt-4" id="downloadProgress" style="display: none;">
                            <div class="progress mb-2">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%"></div>
                            </div>
                            <small class="text-muted" id="progressText">Preparing download...</small>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success" onclick="smartFarm.startQRDownload()">
                            <i class="fas fa-download me-2"></i>Start Download
                        </button>
                    </div>
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

    startQRDownload() {
        const progressContainer = document.getElementById('downloadProgress');
        const progressBar = progressContainer.querySelector('.progress-bar');
        const progressText = document.getElementById('progressText');
        
        // Show progress
        progressContainer.style.display = 'block';
        
        // Generate actual QR codes and download
        this.generateAndDownloadQRCodes(progressBar, progressText);
    }

    async generateAndDownloadQRCodes(progressBar, progressText) {
        try {
            // Check if QRCode library is available
            if (typeof QRCode === 'undefined') {
                throw new Error('QR Code library not loaded');
            }

            progressText.textContent = 'Generating QR codes...';
            progressBar.style.width = '20%';

            // Generate QR codes for all products
            const qrCodes = [];
            const products = this.blockchainData || [];
            
            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                const traceabilityURL = `${window.location.origin}/traceability.html?id=${product.productId}`;
                
                // Generate QR code as data URL
                const qrCodeDataURL = await new Promise((resolve, reject) => {
                    QRCode.toDataURL(traceabilityURL, {
                        width: 300,
                        height: 300,
                        margin: 2,
                        color: {
                            dark: '#000000',
                            light: '#FFFFFF'
                        }
                    }, (err, url) => {
                        if (err) reject(err);
                        else resolve(url);
                    });
                });

                qrCodes.push({
                    product: product,
                    qrCode: qrCodeDataURL,
                    url: traceabilityURL
                });

                // Update progress
                const progress = 20 + ((i + 1) / products.length) * 40;
                progressBar.style.width = progress + '%';
                progressText.textContent = `Generating QR code ${i + 1} of ${products.length}...`;
                
                // Small delay to show progress
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            progressText.textContent = 'Creating product labels...';
            progressBar.style.width = '70%';

            // Create downloadable files
            const files = await this.createDownloadableFiles(qrCodes);

            progressText.textContent = 'Compiling ZIP file...';
            progressBar.style.width = '90%';

            // Create and download ZIP file
            await this.downloadZIPFile(files);

            progressText.textContent = 'Download complete!';
            progressBar.style.width = '100%';

            setTimeout(() => {
                this.completeQRDownload();
            }, 500);

        } catch (error) {
            console.error('Error generating QR codes:', error);
            this.showDownloadError(error.message);
        }
    }

    async createDownloadableFiles(qrCodes) {
        const files = [];
        
        // Create QR code images
        qrCodes.forEach((item, index) => {
            // Convert data URL to blob
            const base64Data = item.qrCode.split(',')[1];
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' });
            
            files.push({
                name: `qr-codes/${item.product.productName.replace(/\s+/g, '-').toLowerCase()}-${item.product.batchNumber}.png`,
                blob: blob
            });
        });

        // Create product labels (HTML files)
        qrCodes.forEach((item, index) => {
            const labelHTML = this.generateProductLabelHTML(item);
            const blob = new Blob([labelHTML], { type: 'text/html' });
            files.push({
                name: `labels/${item.product.productName.replace(/\s+/g, '-').toLowerCase()}-label.html`,
                blob: blob
            });
        });

        // Create metadata file
        const metadata = {
            generatedAt: new Date().toISOString(),
            products: qrCodes.map(item => ({
                productName: item.product.productName,
                batchNumber: item.product.batchNumber,
                traceabilityURL: item.url,
                qrCodeFile: `qr-codes/${item.product.productName.replace(/\s+/g, '-').toLowerCase()}-${item.product.batchNumber}.png`
            }))
        };

        const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], { type: 'application/json' });
        files.push({
            name: 'metadata.json',
            blob: metadataBlob
        });

        // Create instructions file
        const instructions = this.generateInstructionsHTML(qrCodes);
        const instructionsBlob = new Blob([instructions], { type: 'text/html' });
        files.push({
            name: 'instructions.html',
            blob: instructionsBlob
        });

        return files;
    }

    generateProductLabelHTML(item) {
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Product Label - ${item.product.productName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .label { width: 4in; height: 6in; border: 2px solid #000; padding: 10px; text-align: center; }
        .qr-code { width: 200px; height: 200px; margin: 10px auto; }
        .product-name { font-size: 24px; font-weight: bold; margin: 10px 0; }
        .batch-info { font-size: 14px; margin: 5px 0; }
        .scan-text { font-size: 12px; color: #666; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="label">
        <div class="product-name">${item.product.productName}</div>
        <div class="batch-info">Batch: ${item.product.batchNumber}</div>
        <div class="batch-info">Harvest: ${item.product.harvestDate || 'N/A'}</div>
        <img src="${item.qrCode}" class="qr-code" alt="QR Code">
        <div class="scan-text">Scan QR code for complete traceability</div>
        <div class="scan-text">www.smartfarm-app.com</div>
    </div>
</body>
</html>`;
    }

    generateInstructionsHTML(qrCodes) {
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>QR Code Instructions</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: #2e7d32; color: white; padding: 20px; text-align: center; }
        .content { margin: 20px 0; }
        .product-list { margin: 20px 0; }
        .product-item { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>QR Code Traceability Instructions</h1>
        <p>Complete guide for using your product QR codes</p>
    </div>
    
    <div class="content">
        <h2>What's Included</h2>
        <ul>
            <li><strong>QR Code Images:</strong> High-resolution PNG files for each product</li>
            <li><strong>Product Labels:</strong> Ready-to-print HTML labels with QR codes</li>
            <li><strong>Metadata:</strong> Complete product information in JSON format</li>
            <li><strong>Instructions:</strong> This guide for using the QR codes</li>
        </ul>

        <h2>How to Use</h2>
        <ol>
            <li><strong>Print Labels:</strong> Open the HTML label files in your browser and print them</li>
            <li><strong>Attach to Products:</strong> Place the printed labels on your product packaging</li>
            <li><strong>Test QR Codes:</strong> Scan the QR codes with any smartphone camera</li>
            <li><strong>Share Traceability:</strong> Consumers can scan to view complete product journey</li>
        </ol>

        <h2>Your Products</h2>
        <div class="product-list">
            ${qrCodes.map(item => `
                <div class="product-item">
                    <h3>${item.product.productName}</h3>
                    <p><strong>Batch:</strong> ${item.product.batchNumber}</p>
                    <p><strong>Traceability URL:</strong> <a href="${item.url}" target="_blank">${item.url}</a></p>
                </div>
            `).join('')}
        </div>

        <h2>Support</h2>
        <p>For technical support or questions about QR code traceability, contact:</p>
        <ul>
            <li>Email: support@smartfarm-app.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Website: www.smartfarm-app.com</li>
        </ul>
    </div>
</body>
</html>`;
    }

    async downloadZIPFile(files) {
        // Use JSZip library if available, otherwise create individual downloads
        if (typeof JSZip !== 'undefined') {
            const zip = new JSZip();
            
            files.forEach(file => {
                zip.file(file.name, file.blob);
            });

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            this.downloadFile(zipBlob, 'qr-codes-traceability.zip');
        } else {
            // Fallback: download files individually
            files.forEach((file, index) => {
                setTimeout(() => {
                    this.downloadFile(file.blob, file.name.split('/').pop());
                }, index * 100);
            });
        }
    }

    downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    showDownloadError(message) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-exclamation-circle me-2"></i>Download Error
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <i class="fas fa-exclamation-triangle fa-4x text-danger mb-3"></i>
                        <h5>Download Failed</h5>
                        <p class="text-muted">${message}</p>
                        <div class="alert alert-warning mt-3">
                            <i class="fas fa-info-circle me-2"></i>
                            Please refresh the page and try again, or contact support if the issue persists.
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">OK</button>
                    </div>
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

    completeQRDownload() {
        // Close the current modal
        const modal = document.querySelector('.modal.show');
        if (modal) {
            const bsModal = bootstrap.Modal.getInstance(modal);
            bsModal.hide();
        }
        
        // Show success modal
        const successModal = document.createElement('div');
        successModal.className = 'modal fade';
        successModal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-check-circle me-2"></i>Download Complete!
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <i class="fas fa-file-archive fa-4x text-success mb-3"></i>
                        <h5>QR Codes Downloaded Successfully!</h5>
                        <p class="text-muted mb-3">Your ZIP file has been downloaded and contains:</p>
                        <ul class="list-unstyled text-start">
                            <li><i class="fas fa-check text-success me-2"></i>QR code images for all products</li>
                            <li><i class="fas fa-check text-success me-2"></i>Printable product labels</li>
                            <li><i class="fas fa-check text-success me-2"></i>Batch information and metadata</li>
                            <li><i class="fas fa-check text-success me-2"></i>Traceability URLs and instructions</li>
                        </ul>
                        <div class="alert alert-info mt-3">
                            <i class="fas fa-info-circle me-2"></i>
                            <strong>Tip:</strong> You can now print the labels and attach them to your products for complete traceability!
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Great!</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(successModal);
        const bsModal = new bootstrap.Modal(successModal);
        bsModal.show();
        
        successModal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(successModal);
        });
    }

    printAllQRCodes() {
        this.showPrintQRModal();
    }

    showPrintQRModal() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-print me-2"></i>Print All QR Codes
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-4">
                            <i class="fas fa-print fa-4x text-primary mb-3"></i>
                            <h5>Print QR Codes & Labels</h5>
                            <p class="text-muted">Generate printable QR codes and product labels for all your products</p>
                        </div>
                        
                        <div class="print-preview">
                            <h6 class="mb-3">🖨️ Print Options:</h6>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="print-item mb-3">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-qrcode text-primary me-3"></i>
                                            <div>
                                                <h6 class="mb-1">QR Code Sheets</h6>
                                                <small class="text-muted">High-quality QR codes for all products</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="print-item mb-3">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-tags text-info me-3"></i>
                                            <div>
                                                <h6 class="mb-1">Product Labels</h6>
                                                <small class="text-muted">Ready-to-print product labels with QR codes</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="print-item mb-3">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-info-circle text-warning me-3"></i>
                                            <div>
                                                <h6 class="mb-1">Product Information</h6>
                                                <small class="text-muted">Complete product details and descriptions</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="print-item mb-3">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-list text-success me-3"></i>
                                            <div>
                                                <h6 class="mb-1">Batch Details</h6>
                                                <small class="text-muted">Harvest dates, batch numbers, and metadata</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="print-settings mt-4">
                            <h6 class="mb-3">⚙️ Print Settings:</h6>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="printFormat" class="form-label">Print Format</label>
                                        <select class="form-select" id="printFormat">
                                            <option value="labels">Product Labels (4x6 inches)</option>
                                            <option value="sheets">QR Code Sheets (A4)</option>
                                            <option value="both">Both Formats</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="printQuality" class="form-label">Print Quality</label>
                                        <select class="form-select" id="printQuality">
                                            <option value="high">High Quality (300 DPI)</option>
                                            <option value="medium">Medium Quality (150 DPI)</option>
                                            <option value="draft">Draft Quality (75 DPI)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="checkbox" id="includeInstructions" checked>
                                <label class="form-check-label" for="includeInstructions">
                                    Include consumer instructions
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="checkbox" id="includeFarmInfo" checked>
                                <label class="form-check-label" for="includeFarmInfo">
                                    Include farm information and contact details
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="smartFarm.startQRPrint()">
                            <i class="fas fa-print me-2"></i>Start Printing
                        </button>
                    </div>
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

    startQRPrint() {
        // Simulate print process
        setTimeout(() => {
            this.completeQRPrint();
        }, 2000);
    }

    completeQRPrint() {
        // Close the current modal
        const modal = document.querySelector('.modal.show');
        if (modal) {
            const bsModal = bootstrap.Modal.getInstance(modal);
            bsModal.hide();
        }
        
        // Show success modal
        const successModal = document.createElement('div');
        successModal.className = 'modal fade';
        successModal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-check-circle me-2"></i>Print Ready!
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <i class="fas fa-print fa-4x text-primary mb-3"></i>
                        <h5>Print Job Prepared Successfully!</h5>
                        <p class="text-muted mb-3">Your print job is ready and the print dialog should open automatically. The printout includes:</p>
                        <ul class="list-unstyled text-start">
                            <li><i class="fas fa-check text-primary me-2"></i>QR codes for all products</li>
                            <li><i class="fas fa-check text-primary me-2"></i>Product information and descriptions</li>
                            <li><i class="fas fa-check text-primary me-2"></i>Batch details and harvest dates</li>
                            <li><i class="fas fa-check text-primary me-2"></i>Consumer instructions and farm contact info</li>
                        </ul>
                        <div class="alert alert-info mt-3">
                            <i class="fas fa-lightbulb me-2"></i>
                            <strong>Tip:</strong> Use high-quality paper for the best QR code scanning results!
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Got it!</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(successModal);
        const bsModal = new bootstrap.Modal(successModal);
        bsModal.show();
        
        successModal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(successModal);
        });
    }

    // Market Intelligence
    initializeMarketIntelligence() {
        console.log('📈 Initializing market intelligence...');
        
        this.marketData = {
            currentPrices: {
                tomatoes: 3.50 + Math.random() * 1.0,
                lettuce: 2.80 + Math.random() * 0.5,
                eggs: 4.20 + Math.random() * 0.8,
                milk: 2.10 + Math.random() * 0.3
            },
            trends: {
                tomatoes: 'rising',
                lettuce: 'stable',
                eggs: 'falling',
                milk: 'rising'
            },
            demandForecast: {
                tomatoes: 'high',
                lettuce: 'medium',
                eggs: 'medium',
                milk: 'high'
            }
        };

        this.displayMarketData();
    }

    displayMarketData() {
        let marketContainer = document.getElementById('marketIntelligence');
        if (!marketContainer) {
            marketContainer = document.createElement('div');
            marketContainer.id = 'marketIntelligence';
            marketContainer.className = 'dashboard-card mt-4';
            marketContainer.innerHTML = `
                <h5 class="mb-3">📈 Market Intelligence</h5>
                <div class="market-grid" id="marketDataContainer">
                    <!-- Market data will be populated here -->
                </div>
            `;
            document.getElementById('dashboardView').appendChild(marketContainer);
        }

        const container = document.getElementById('marketDataContainer');
        container.innerHTML = '';

        Object.entries(this.marketData.currentPrices).forEach(([product, price]) => {
            const trend = this.marketData.trends[product];
            const demand = this.marketData.demandForecast[product];
            
            const trendIcon = trend === 'rising' ? '↗️' : trend === 'falling' ? '↘️' : '→';
            const trendColor = trend === 'rising' ? 'success' : trend === 'falling' ? 'danger' : 'secondary';
            
            const marketCard = document.createElement('div');
            marketCard.className = 'market-card';
            marketCard.innerHTML = `
                <div class="market-header">
                    <h6>${product.charAt(0).toUpperCase() + product.slice(1)}</h6>
                    <span class="trend-indicator trend-${trendColor}">${trendIcon}</span>
                </div>
                <div class="market-price">$${price.toFixed(2)}/kg</div>
                <div class="market-details">
                    <div class="demand-forecast">
                        <strong>Demand:</strong> 
                        <span class="demand-${demand}">${demand}</span>
                    </div>
                    <div class="recommendation">
                        ${this.getMarketRecommendation(product, trend, demand)}
                    </div>
                </div>
            `;
            container.appendChild(marketCard);
        });
    }

    getMarketRecommendation(product, trend, demand) {
        if (trend === 'rising' && demand === 'high') {
            return '<span class="recommendation-buy">💡 Consider increasing production</span>';
        } else if (trend === 'falling') {
            return '<span class="recommendation-sell">⚠️ Consider selling soon</span>';
        } else {
            return '<span class="recommendation-hold">📊 Monitor market closely</span>';
        }
    }

    // Predictive Analytics
    initializePredictiveAnalytics() {
        console.log('🔮 Initializing predictive analytics...');
        
        // Simulate ML model predictions
        this.predictionModels = {
            yieldPrediction: {
                nextMonth: 1200 + Math.random() * 300,
                confidence: 85 + Math.random() * 10,
                factors: ['weather', 'soil_quality', 'pest_control']
            },
            diseaseRisk: {
                probability: 15 + Math.random() * 20,
                recommendedAction: 'Apply preventive fungicide',
                urgency: 'medium'
            },
            marketTiming: {
                bestSellDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
                expectedPrice: 3.80 + Math.random() * 0.5,
                confidence: 75 + Math.random() * 15
            }
        };

        this.displayPredictions();
    }

    displayPredictions() {
        let predictionsContainer = document.getElementById('predictiveAnalytics');
        if (!predictionsContainer) {
            predictionsContainer = document.createElement('div');
            predictionsContainer.id = 'predictiveAnalytics';
            predictionsContainer.className = 'dashboard-card mt-4';
            predictionsContainer.innerHTML = `
                <h5 class="mb-3">🔮 AI Predictions</h5>
                <div class="predictions-grid" id="predictionsContainer">
                    <!-- Predictions will be populated here -->
                </div>
            `;
            document.getElementById('dashboardView').appendChild(predictionsContainer);
        }

        const container = document.getElementById('predictionsContainer');
        container.innerHTML = '';

        // Yield Prediction
        const yieldCard = document.createElement('div');
        yieldCard.className = 'prediction-card';
        yieldCard.innerHTML = `
            <div class="prediction-header">
                <h6>🌾 Yield Prediction</h6>
                <span class="confidence-badge">${this.predictionModels.yieldPrediction.confidence.toFixed(0)}% confidence</span>
            </div>
            <div class="prediction-value">
                ${this.predictionModels.yieldPrediction.nextMonth.toFixed(0)} kg
            </div>
            <div class="prediction-factors">
                <strong>Based on:</strong> ${this.predictionModels.yieldPrediction.factors.join(', ')}
            </div>
        `;
        container.appendChild(yieldCard);

        // Disease Risk
        const diseaseCard = document.createElement('div');
        diseaseCard.className = 'prediction-card';
        diseaseCard.innerHTML = `
            <div class="prediction-header">
                <h6>🦠 Disease Risk Assessment</h6>
                <span class="risk-badge risk-${this.predictionModels.diseaseRisk.urgency}">${this.predictionModels.diseaseRisk.urgency}</span>
            </div>
            <div class="prediction-value">
                ${this.predictionModels.diseaseRisk.probability.toFixed(0)}% risk
            </div>
            <div class="prediction-action">
                <strong>Recommended:</strong> ${this.predictionModels.diseaseRisk.recommendedAction}
            </div>
        `;
        container.appendChild(diseaseCard);

        // Market Timing
        const marketCard = document.createElement('div');
        marketCard.className = 'prediction-card';
        marketCard.innerHTML = `
            <div class="prediction-header">
                <h6>📈 Optimal Market Timing</h6>
                <span class="confidence-badge">${this.predictionModels.marketTiming.confidence.toFixed(0)}% confidence</span>
            </div>
            <div class="prediction-value">
                $${this.predictionModels.marketTiming.expectedPrice.toFixed(2)}/kg
            </div>
            <div class="prediction-timing">
                <strong>Best sell date:</strong> ${this.predictionModels.marketTiming.bestSellDate.toLocaleDateString()}
            </div>
        `;
        container.appendChild(marketCard);
    }

    // Utility Functions
    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.getElementById('dashboardView');
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    generateSustainabilityReport() {
        console.log('📊 Generating sustainability report...');
        // This would generate a comprehensive sustainability report
    }

    // Initialize all competitive features
    initializeFeatures() {
        console.log('🚀 Initializing SmartFarm competitive features...');
        
        setTimeout(() => {
            this.initializeIoT();
        }, 1000);
        
        setTimeout(() => {
            this.initializeSustainability();
        }, 2000);
        
        setTimeout(() => {
            this.initializeBlockchain();
        }, 3000);
        
        setTimeout(() => {
            this.initializeMarketIntelligence();
        }, 4000);
        
        setTimeout(() => {
            this.initializePredictiveAnalytics();
        }, 5000);
    }
}

// Add CSS styles for competitive features
const competitiveStyles = `
    <style>
        .iot-sensor-card {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
        }

        .sensor-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .sensor-title {
            margin: 0;
            font-size: 0.9rem;
            color: #495057;
        }

        .sensor-status {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 500;
        }

        .status-active { background: #d4edda; color: #155724; }
        .status-monitoring { background: #d1ecf1; color: #0c5460; }
        .status-good { background: #d4edda; color: #155724; }

        .sensor-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #007bff;
            margin-bottom: 5px;
        }

        .sensor-value .unit {
            font-size: 0.9rem;
            color: #6c757d;
        }

        .sustainability-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }

        .sustainability-metric {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 10px;
            padding: 15px;
        }

        .metric-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .metric-status {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
        }

        .status-success { background: #d4edda; color: #155724; }
        .status-warning { background: #fff3cd; color: #856404; }

        .current-value {
            font-size: 1.3rem;
            font-weight: bold;
            color: #007bff;
        }

        .target-value {
            font-size: 0.9rem;
            color: #6c757d;
            margin-bottom: 10px;
        }

        .progress-bar {
            height: 8px;
            background: #e9ecef;
            border-radius: 4px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            transition: width 0.3s ease;
        }

        .traceability-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
        }

        .traceability-card {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 10px;
            padding: 15px;
        }

        .product-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .verification-badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
            background: #d4edda;
            color: #155724;
        }

        .detail-row {
            margin-bottom: 8px;
            font-size: 0.9rem;
        }

        .hash-code {
            background: #e9ecef;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 0.8rem;
        }

        .market-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }

        .market-card {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 10px;
            padding: 15px;
        }

        .market-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .trend-indicator {
            font-size: 1.2rem;
        }

        .market-price {
            font-size: 1.3rem;
            font-weight: bold;
            color: #28a745;
            margin-bottom: 10px;
        }

        .demand-high { color: #dc3545; font-weight: bold; }
        .demand-medium { color: #ffc107; font-weight: bold; }
        .demand-low { color: #6c757d; }

        .recommendation-buy { color: #28a745; }
        .recommendation-sell { color: #dc3545; }
        .recommendation-hold { color: #6c757d; }

        .predictions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }

        .prediction-card {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 10px;
            padding: 15px;
        }

        .prediction-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .confidence-badge, .risk-badge {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 500;
        }

        .confidence-badge { background: #d1ecf1; color: #0c5460; }
        .risk-high { background: #f8d7da; color: #721c24; }
        .risk-medium { background: #fff3cd; color: #856404; }
        .risk-low { background: #d4edda; color: #155724; }

        .prediction-value {
            font-size: 1.3rem;
            font-weight: bold;
            color: #007bff;
            margin-bottom: 10px;
        }

        .traceability-timeline {
            position: relative;
            padding-left: 30px;
        }

        .timeline-item {
            position: relative;
            margin-bottom: 20px;
        }

        .timeline-marker {
            position: absolute;
            left: -25px;
            top: 5px;
            width: 10px;
            height: 10px;
            background: #007bff;
            border-radius: 50%;
        }

        .timeline-item:not(:last-child) .timeline-marker::after {
            content: '';
            position: absolute;
            top: 10px;
            left: 4px;
            width: 2px;
            height: 30px;
            background: #dee2e6;
        }

        .timeline-content {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }

        .timeline-content h6 {
            margin-bottom: 10px;
            color: #007bff;
        }

        .timeline-content p {
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
    </style>
`;

// Inject styles into the page
document.head.insertAdjacentHTML('beforeend', competitiveStyles);

// Initialize SmartFarm competitive features
const smartFarm = new SmartFarmCompetitive();

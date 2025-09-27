// SmartFarm QR Code Traceability System
// Complete farm-to-table tracking with QR codes

class QRTraceability {
    constructor() {
        this.qrCodeLibrary = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js';
        this.products = this.loadProducts();
        this.traceabilityData = this.loadTraceabilityData();
        
        this.loadQRCodeLibrary();
    }

    loadQRCodeLibrary() {
        if (typeof QRCode === 'undefined') {
            const script = document.createElement('script');
            script.src = this.qrCodeLibrary;
            script.onload = () => {
                console.log('QR Code library loaded successfully');
                this.initializeQRSystem();
            };
            document.head.appendChild(script);
        } else {
            this.initializeQRSystem();
        }
    }

    initializeQRSystem() {
        console.log('🔗 Initializing QR Traceability System...');
        this.createQRGeneratorInterface();
        this.createTraceabilityViewer();
        this.generateExistingProductQRs();
    }

    // Load existing products from localStorage
    loadProducts() {
        const savedProducts = localStorage.getItem('smartfarm_products');
        if (savedProducts) {
            return JSON.parse(savedProducts);
        }
        
        // Default products with traceability data
        return [
            {
                id: 'PROD001',
                name: 'Organic Tomatoes',
                batchNumber: 'BATCH2024001',
                harvestDate: new Date('2024-01-15').toISOString(),
                location: 'Field A',
                farmer: 'John Smith',
                certifications: ['Organic', 'Non-GMO', 'Local'],
                qrCode: null,
                traceabilitySteps: [
                    {
                        step: 'Seed Planting',
                        date: new Date('2023-10-15').toISOString(),
                        location: 'Field A',
                        details: 'Organic heirloom tomato seeds planted',
                        coordinates: { lat: -18.1416, lng: 178.4419 }
                    },
                    {
                        step: 'Soil Preparation',
                        date: new Date('2023-10-10').toISOString(),
                        location: 'Field A',
                        details: 'Organic compost and natural fertilizers applied',
                        coordinates: { lat: -18.1416, lng: 178.4419 }
                    },
                    {
                        step: 'Growth Monitoring',
                        date: new Date('2023-12-01').toISOString(),
                        location: 'Field A',
                        details: 'pH Level: 6.8, Soil Moisture: 65%, Organic pest control applied',
                        coordinates: { lat: -18.1416, lng: 178.4419 }
                    },
                    {
                        step: 'Harvest',
                        date: new Date('2024-01-15').toISOString(),
                        location: 'Field A',
                        details: '500kg harvested, Grade A quality, Hand-picked',
                        coordinates: { lat: -18.1416, lng: 178.4419 }
                    },
                    {
                        step: 'Quality Inspection',
                        date: new Date('2024-01-16').toISOString(),
                        location: 'Packaging Facility',
                        details: 'Inspected by certified organic inspector, Passed all tests',
                        coordinates: { lat: -18.1450, lng: 178.4450 }
                    },
                    {
                        step: 'Packaging',
                        date: new Date('2024-01-16').toISOString(),
                        location: 'Packaging Facility',
                        details: 'Eco-friendly packaging, QR code applied',
                        coordinates: { lat: -18.1450, lng: 178.4450 }
                    }
                ]
            },
            {
                id: 'PROD002',
                name: 'Free-Range Eggs',
                batchNumber: 'BATCH2024002',
                harvestDate: new Date('2024-01-16').toISOString(),
                location: 'Barn A',
                farmer: 'John Smith',
                certifications: ['Free-Range', 'Organic', 'Local'],
                qrCode: null,
                traceabilitySteps: [
                    {
                        step: 'Hen Arrival',
                        date: new Date('2023-08-01').toISOString(),
                        location: 'Barn A',
                        details: '200 Rhode Island Red hens arrived, Free-range certified',
                        coordinates: { lat: -18.1420, lng: 178.4420 }
                    },
                    {
                        step: 'Feed Management',
                        date: new Date('2023-08-15').toISOString(),
                        location: 'Barn A',
                        details: 'Organic feed program started, No antibiotics used',
                        coordinates: { lat: -18.1420, lng: 178.4420 }
                    },
                    {
                        step: 'Health Monitoring',
                        date: new Date('2023-12-01').toISOString(),
                        location: 'Barn A',
                        details: 'Regular health checks, All hens healthy, Vaccinated',
                        coordinates: { lat: -18.1420, lng: 178.4420 }
                    },
                    {
                        step: 'Egg Collection',
                        date: new Date('2024-01-16').toISOString(),
                        location: 'Barn A',
                        details: '180 dozen eggs collected, Grade AA quality',
                        coordinates: { lat: -18.1420, lng: 178.4420 }
                    },
                    {
                        step: 'Quality Testing',
                        date: new Date('2024-01-16').toISOString(),
                        location: 'Packaging Facility',
                        details: 'Salmonella testing negative, Freshness confirmed',
                        coordinates: { lat: -18.1450, lng: 178.4450 }
                    },
                    {
                        step: 'Packaging',
                        date: new Date('2024-01-16').toISOString(),
                        location: 'Packaging Facility',
                        details: 'Recyclable packaging, QR code applied',
                        coordinates: { lat: -18.1450, lng: 178.4450 }
                    }
                ]
            }
        ];
    }

    loadTraceabilityData() {
        const savedData = localStorage.getItem('smartfarm_traceability');
        return savedData ? JSON.parse(savedData) : {};
    }

    saveProducts() {
        localStorage.setItem('smartfarm_products', JSON.stringify(this.products));
    }

    saveTraceabilityData() {
        localStorage.setItem('smartfarm_traceability', JSON.stringify(this.traceabilityData));
    }

    // Create QR Generator Interface
    createQRGeneratorInterface() {
        // Add QR Generator to dashboard
        const dashboardContainer = document.getElementById('dashboardView');
        if (dashboardContainer) {
            const qrGeneratorCard = document.createElement('div');
            qrGeneratorCard.id = 'qrGeneratorCard';
            qrGeneratorCard.className = 'dashboard-card mt-4';
            qrGeneratorCard.innerHTML = `
                <h5 class="mb-3">🔗 QR Code Traceability Generator</h5>
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Select Product</label>
                            <select class="form-select" id="productSelect">
                                <option value="">Choose a product...</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" onclick="qrTraceability.generateQRCode()">
                            <i class="fas fa-qrcode me-2"></i>Generate QR Code
                        </button>
                        <button class="btn btn-success ms-2" onclick="qrTraceability.createNewProduct()">
                            <i class="fas fa-plus me-2"></i>New Product
                        </button>
                    </div>
                    <div class="col-md-6">
                        <div id="qrCodeDisplay" class="text-center">
                            <p class="text-muted">Select a product to generate QR code</p>
                        </div>
                    </div>
                </div>
            `;
            dashboardContainer.appendChild(qrGeneratorCard);
            
            this.populateProductSelect();
        }
    }

    populateProductSelect() {
        const select = document.getElementById('productSelect');
        if (select) {
            select.innerHTML = '<option value="">Choose a product...</option>';
            this.products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = `${product.name} (${product.batchNumber})`;
                select.appendChild(option);
            });
        }
    }

    // Generate QR Code for selected product
    generateQRCode() {
        const productId = document.getElementById('productSelect')?.value;
        if (!productId) {
            alert('Please select a product first');
            return;
        }

        const product = this.products.find(p => p.id === productId);
        if (!product) {
            alert('Product not found');
            return;
        }

        // Create traceability URL
        const traceabilityURL = `${window.location.origin}/traceability.html?id=${productId}`;
        
        // Generate QR code
        const qrContainer = document.getElementById('qrCodeDisplay');
        qrContainer.innerHTML = '<div class="spinner-border" role="status"></div><p>Generating QR Code...</p>';

        QRCode.toDataURL(traceabilityURL, {
            width: 200,
            height: 200,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }, (err, qrCodeDataURL) => {
            if (err) {
                console.error('QR Code generation error:', err);
                qrContainer.innerHTML = '<p class="text-danger">Error generating QR code</p>';
                return;
            }

            qrContainer.innerHTML = `
                <div class="qr-code-result">
                    <img src="${qrCodeDataURL}" alt="QR Code for ${product.name}" class="img-fluid mb-3">
                    <h6>${product.name}</h6>
                    <p class="text-muted small">Batch: ${product.batchNumber}</p>
                    <div class="qr-actions">
                        <button class="btn btn-sm btn-outline-primary me-2" onclick="qrTraceability.downloadQRCode('${productId}')">
                            <i class="fas fa-download me-1"></i>Download
                        </button>
                        <button class="btn btn-sm btn-outline-success" onclick="qrTraceability.printQRCode('${productId}')">
                            <i class="fas fa-print me-1"></i>Print
                        </button>
                    </div>
                    <div class="mt-3">
                        <small class="text-muted">Scan this QR code to view complete traceability information</small>
                        <br>
                        <small class="text-muted">URL: ${traceabilityURL}</small>
                    </div>
                </div>
            `;

            // Save QR code to product
            product.qrCode = qrCodeDataURL;
            this.saveProducts();
        });
    }

    // Download QR Code
    downloadQRCode(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product || !product.qrCode) {
            alert('No QR code available for this product');
            return;
        }

        const link = document.createElement('a');
        link.download = `${product.name}_QR_Code.png`;
        link.href = product.qrCode;
        link.click();
    }

    // Print QR Code
    printQRCode(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product || !product.qrCode) {
            alert('No QR code available for this product');
            return;
        }

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>QR Code - ${product.name}</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                        .qr-print { margin: 20px 0; }
                        .product-info { margin: 20px 0; }
                        .instructions { margin-top: 30px; font-size: 14px; color: #666; }
                    </style>
                </head>
                <body>
                    <h2>SmartFarm Product Traceability</h2>
                    <div class="qr-print">
                        <img src="${product.qrCode}" alt="QR Code" style="max-width: 200px;">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p><strong>Batch:</strong> ${product.batchNumber}</p>
                        <p><strong>Harvest Date:</strong> ${new Date(product.harvestDate).toLocaleDateString()}</p>
                        <p><strong>Farmer:</strong> ${product.farmer}</p>
                    </div>
                    <div class="instructions">
                        <p><strong>Scan this QR code with your smartphone to view:</strong></p>
                        <ul style="text-align: left; display: inline-block;">
                            <li>Complete farm-to-table journey</li>
                            <li>Growing conditions and practices</li>
                            <li>Quality certifications</li>
                            <li>Harvest and processing details</li>
                            <li>Environmental impact data</li>
                        </ul>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }

    // Create New Product
    createNewProduct() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-plus me-2"></i>Create New Product for Traceability
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="newProductForm">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Product Name</label>
                                        <input type="text" class="form-control" id="productName" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Batch Number</label>
                                        <input type="text" class="form-control" id="batchNumber" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Harvest Date</label>
                                        <input type="date" class="form-control" id="harvestDate" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Location</label>
                                        <input type="text" class="form-control" id="productLocation" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Farmer</label>
                                        <input type="text" class="form-control" id="farmerName" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Certifications</label>
                                        <select class="form-select" id="certifications" multiple>
                                            <option value="Organic">Organic</option>
                                            <option value="Non-GMO">Non-GMO</option>
                                            <option value="Free-Range">Free-Range</option>
                                            <option value="Fair Trade">Fair Trade</option>
                                            <option value="Local">Local</option>
                                            <option value="Rainforest Alliance">Rainforest Alliance</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="qrTraceability.saveNewProduct()">
                            <i class="fas fa-save me-2"></i>Create Product
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

    saveNewProduct() {
        const productName = document.getElementById('productName').value;
        const batchNumber = document.getElementById('batchNumber').value;
        const harvestDate = document.getElementById('harvestDate').value;
        const location = document.getElementById('productLocation').value;
        const farmer = document.getElementById('farmerName').value;
        const certifications = Array.from(document.getElementById('certifications').selectedOptions).map(opt => opt.value);

        if (!productName || !batchNumber || !harvestDate || !location || !farmer) {
            alert('Please fill in all required fields');
            return;
        }

        const newProduct = {
            id: 'PROD' + Date.now(),
            name: productName,
            batchNumber: batchNumber,
            harvestDate: new Date(harvestDate).toISOString(),
            location: location,
            farmer: farmer,
            certifications: certifications,
            qrCode: null,
            traceabilitySteps: [
                {
                    step: 'Product Created',
                    date: new Date().toISOString(),
                    location: location,
                    details: `New product ${productName} created for traceability`,
                    coordinates: { lat: -18.1416, lng: 178.4419 }
                }
            ]
        };

        this.products.push(newProduct);
        this.saveProducts();
        this.populateProductSelect();

        // Close modal
        const modal = document.querySelector('.modal');
        if (modal) {
            const bsModal = bootstrap.Modal.getInstance(modal);
            bsModal.hide();
        }

        alert('Product created successfully! You can now generate a QR code for it.');
    }

    // Create Traceability Viewer
    createTraceabilityViewer() {
        // This will be used by the traceability.html page
        console.log('Traceability viewer ready');
    }

    // Generate QR codes for existing products
    generateExistingProductQRs() {
        this.products.forEach(product => {
            if (!product.qrCode) {
                const traceabilityURL = `${window.location.origin}/traceability.html?id=${product.id}`;
                QRCode.toDataURL(traceabilityURL, {
                    width: 200,
                    height: 200,
                    margin: 2
                }, (err, qrCodeDataURL) => {
                    if (!err) {
                        product.qrCode = qrCodeDataURL;
                        this.saveProducts();
                    }
                });
            }
        });
    }

    // Get product traceability data
    getProductTraceability(productId) {
        return this.products.find(p => p.id === productId);
    }

    // Add traceability step
    addTraceabilityStep(productId, step) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.traceabilitySteps.push({
                step: step.name,
                date: new Date().toISOString(),
                location: step.location,
                details: step.details,
                coordinates: step.coordinates || { lat: -18.1416, lng: 178.4419 }
            });
            this.saveProducts();
        }
    }
}

// Initialize QR Traceability System
const qrTraceability = new QRTraceability();

// Add CSS styles for QR components
const qrStyles = `
    <style>
        .qr-code-result {
            padding: 20px;
            border: 2px dashed #dee2e6;
            border-radius: 10px;
            background: #f8f9fa;
        }

        .qr-actions {
            margin-top: 15px;
        }

        .traceability-timeline {
            position: relative;
            padding-left: 30px;
        }

        .traceability-timeline::before {
            content: '';
            position: absolute;
            left: 15px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #007bff;
        }

        .timeline-item-traceability {
            position: relative;
            margin-bottom: 30px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-left: 4px solid #007bff;
        }

        .timeline-item-traceability::before {
            content: '';
            position: absolute;
            left: -23px;
            top: 20px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #007bff;
            border: 3px solid white;
            box-shadow: 0 0 0 3px #007bff;
        }

        .traceability-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            text-align: center;
        }

        .certification-badge {
            display: inline-block;
            background: #28a745;
            color: white;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
            margin: 3px;
        }

        .certification-badge.organic { background: #8bc34a; }
        .certification-badge.fairtrade { background: #ff9800; }
        .certification-badge.rainforest { background: #2196f3; }

        .location-map {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-top: 10px;
        }

        .coordinates {
            font-family: monospace;
            font-size: 0.9rem;
            color: #6c757d;
        }
    </style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', qrStyles);

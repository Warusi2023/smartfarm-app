// SmartFarm Supply Chain Tracker
// Complete Farm-to-Table and Farm-to-Counter tracking system

class SupplyChainTracker {
    constructor() {
        this.supplyChainSteps = {
            farmToTable: [
                'Farm Production',
                'Quality Testing',
                'Packaging',
                'Storage',
                'Distribution',
                'Retail/Consumer',
                'Consumer Table'
            ],
            farmToCounter: [
                'Farm Production',
                'Quality Testing',
                'Packaging',
                'Cold Storage',
                'Transportation',
                'Wholesale Distribution',
                'Retail Store',
                'Store Counter'
            ]
        };
        
        this.currentProducts = this.loadProducts();
        this.supplyChainData = this.loadSupplyChainData();
        this.retailPartners = this.loadRetailPartners();
        
        this.initializeSupplyChainSystem();
    }

    loadProducts() {
        const savedProducts = localStorage.getItem('smartfarm_products');
        return savedProducts ? JSON.parse(savedProducts) : [];
    }

    loadSupplyChainData() {
        const savedData = localStorage.getItem('smartfarm_supplychain');
        return savedData ? JSON.parse(savedData) : {};
    }

    loadRetailPartners() {
        const savedPartners = localStorage.getItem('smartfarm_retail_partners');
        return savedPartners ? JSON.parse(savedPartners) : [
            {
                id: 'RETAIL001',
                name: 'FreshMart Supermarket',
                type: 'Supermarket',
                location: 'Suva, Fiji',
                contact: 'freshmart@example.com',
                phone: '+679 123 4567',
                partnershipDate: new Date('2024-01-01').toISOString(),
                status: 'Active'
            },
            {
                id: 'RETAIL002',
                name: 'Organic Corner Store',
                type: 'Specialty Store',
                location: 'Nadi, Fiji',
                contact: 'organic@example.com',
                phone: '+679 987 6543',
                partnershipDate: new Date('2024-01-15').toISOString(),
                status: 'Active'
            },
            {
                id: 'RETAIL003',
                name: 'Farmers Market Co-op',
                type: 'Farmers Market',
                location: 'Lautoka, Fiji',
                contact: 'coop@example.com',
                phone: '+679 555 1234',
                partnershipDate: new Date('2024-02-01').toISOString(),
                status: 'Active'
            }
        ];
    }

    saveProducts() {
        localStorage.setItem('smartfarm_products', JSON.stringify(this.currentProducts));
    }

    saveSupplyChainData() {
        localStorage.setItem('smartfarm_supplychain', JSON.stringify(this.supplyChainData));
    }

    saveRetailPartners() {
        localStorage.setItem('smartfarm_retail_partners', JSON.stringify(this.retailPartners));
    }

    initializeSupplyChainSystem() {
        console.log('🚛 Initializing Supply Chain Tracking System...');
        this.createSupplyChainDashboard();
        this.createRetailPartnersSection();
        this.initializeSupplyChainTracking();
    }

    createSupplyChainDashboard() {
        const dashboardContainer = document.getElementById('dashboardView');
        if (!dashboardContainer) return;

        const supplyChainCard = document.createElement('div');
        supplyChainCard.id = 'supplyChainCard';
        supplyChainCard.className = 'dashboard-card mt-4';
        supplyChainCard.innerHTML = `
            <h5 class="mb-3">🚛 Supply Chain Tracking</h5>
            <div class="row">
                <div class="col-md-6">
                    <div class="supply-chain-section">
                        <h6 class="text-primary mb-3">🌱 Farm-to-Table Journey</h6>
                        <div class="supply-chain-timeline" id="farmToTableTimeline">
                            <!-- Farm-to-Table timeline will be populated here -->
                        </div>
                        <button class="btn btn-sm btn-outline-primary mt-2" onclick="supplyChainTracker.trackFarmToTable()">
                            <i class="fas fa-eye me-1"></i>Track Journey
                        </button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="supply-chain-section">
                        <h6 class="text-success mb-3">🏪 Farm-to-Counter Journey</h6>
                        <div class="supply-chain-timeline" id="farmToCounterTimeline">
                            <!-- Farm-to-Counter timeline will be populated here -->
                        </div>
                        <button class="btn btn-sm btn-outline-success mt-2" onclick="supplyChainTracker.trackFarmToCounter()">
                            <i class="fas fa-store me-1"></i>Track Retail
                        </button>
                    </div>
                </div>
            </div>
        `;

        dashboardContainer.appendChild(supplyChainCard);
        this.populateSupplyChainTimelines();
    }

    createRetailPartnersSection() {
        const dashboardContainer = document.getElementById('dashboardView');
        if (!dashboardContainer) return;

        const retailCard = document.createElement('div');
        retailCard.id = 'retailPartnersCard';
        retailCard.className = 'dashboard-card mt-4';
        retailCard.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5>🏪 Retail Partners & Distribution</h5>
                <button class="btn btn-sm btn-outline-primary" onclick="supplyChainTracker.addRetailPartner()">
                    <i class="fas fa-plus me-1"></i>Add Partner
                </button>
            </div>
            <div class="row" id="retailPartnersContainer">
                <!-- Retail partners will be populated here -->
            </div>
        `;

        dashboardContainer.appendChild(retailCard);
        this.populateRetailPartners();
    }

    populateSupplyChainTimelines() {
        this.populateFarmToTableTimeline();
        this.populateFarmToCounterTimeline();
    }

    populateFarmToTableTimeline() {
        const timeline = document.getElementById('farmToTableTimeline');
        if (!timeline) return;

        timeline.innerHTML = '';
        this.supplyChainSteps.farmToTable.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'supply-step';
            stepElement.innerHTML = `
                <div class="step-icon">
                    <i class="fas ${this.getStepIcon('farmToTable', index)}"></i>
                </div>
                <div class="step-content">
                    <h6>${step}</h6>
                    <small class="text-muted">${this.getStepDescription('farmToTable', index)}</small>
                </div>
            `;
            timeline.appendChild(stepElement);
        });
    }

    populateFarmToCounterTimeline() {
        const timeline = document.getElementById('farmToCounterTimeline');
        if (!timeline) return;

        timeline.innerHTML = '';
        this.supplyChainSteps.farmToCounter.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'supply-step';
            stepElement.innerHTML = `
                <div class="step-icon">
                    <i class="fas ${this.getStepIcon('farmToCounter', index)}"></i>
                </div>
                <div class="step-content">
                    <h6>${step}</h6>
                    <small class="text-muted">${this.getStepDescription('farmToCounter', index)}</small>
                </div>
            `;
            timeline.appendChild(stepElement);
        });
    }

    getStepIcon(journeyType, stepIndex) {
        const icons = {
            farmToTable: ['fa-seedling', 'fa-flask', 'fa-box', 'fa-warehouse', 'fa-truck', 'fa-shopping-cart', 'fa-utensils'],
            farmToCounter: ['fa-seedling', 'fa-flask', 'fa-box', 'fa-thermometer-half', 'fa-truck', 'fa-building', 'fa-store', 'fa-cash-register']
        };
        return icons[journeyType] ? icons[journeyType][stepIndex] : 'fa-circle';
    }

    getStepDescription(journeyType, stepIndex) {
        const descriptions = {
            farmToTable: [
                'Crops grown and harvested on farm',
                'Quality testing and certification',
                'Eco-friendly packaging applied',
                'Temperature-controlled storage',
                'Direct delivery to consumers',
                'Available at farmers markets',
                'Delivered fresh to your table'
            ],
            farmToCounter: [
                'Crops grown and harvested on farm',
                'Quality testing and certification',
                'Commercial packaging applied',
                'Cold storage and preservation',
                'Refrigerated transport',
                'Wholesale distribution center',
                'Retail store shelves',
                'Fresh produce counter'
            ]
        };
        return descriptions[journeyType] ? descriptions[journeyType][stepIndex] : 'Supply chain step';
    }

    populateRetailPartners() {
        const container = document.getElementById('retailPartnersContainer');
        if (!container) return;

        container.innerHTML = '';
        this.retailPartners.forEach(partner => {
            const partnerCard = document.createElement('div');
            partnerCard.className = 'col-md-4 mb-3';
            partnerCard.innerHTML = `
                <div class="retail-partner-card">
                    <div class="partner-header">
                        <h6>${partner.name}</h6>
                        <span class="badge bg-${partner.status === 'Active' ? 'success' : 'secondary'}">${partner.status}</span>
                    </div>
                    <div class="partner-details">
                        <p><i class="fas fa-store me-2"></i>${partner.type}</p>
                        <p><i class="fas fa-map-marker-alt me-2"></i>${partner.location}</p>
                        <p><i class="fas fa-envelope me-2"></i>${partner.contact}</p>
                        <p><i class="fas fa-phone me-2"></i>${partner.phone}</p>
                    </div>
                    <div class="partner-actions">
                        <button class="btn btn-sm btn-outline-primary" onclick="supplyChainTracker.viewPartnerDetails('${partner.id}')">
                            <i class="fas fa-eye me-1"></i>View
                        </button>
                        <button class="btn btn-sm btn-outline-success" onclick="supplyChainTracker.trackShipment('${partner.id}')">
                            <i class="fas fa-truck me-1"></i>Track
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(partnerCard);
        });
    }

    trackFarmToTable() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-utensils me-2"></i>Farm-to-Table Journey
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="journey-timeline">
                            ${this.supplyChainSteps.farmToTable.map((step, index) => `
                                <div class="journey-step ${index <= 2 ? 'completed' : index === 3 ? 'current' : ''}">
                                    <div class="step-marker">
                                        <i class="fas ${this.getStepIcon('farmToTable', index)}"></i>
                                    </div>
                                    <div class="step-info">
                                        <h6>${step}</h6>
                                        <p>${this.getStepDescription('farmToTable', index)}</p>
                                        <small class="text-muted">
                                            ${index <= 2 ? 'Completed' : index === 3 ? 'In Progress' : 'Pending'} - 
                                            ${new Date(Date.now() - (7 - index) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                        </small>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="mt-4">
                            <h6>📊 Journey Statistics</h6>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="stat-item">
                                        <strong>Total Distance:</strong> 45 km
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="stat-item">
                                        <strong>Time to Table:</strong> 24-48 hours
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="stat-item">
                                        <strong>Freshness Score:</strong> 98%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="supplyChainTracker.shareJourney('farmToTable')">
                            <i class="fas fa-share me-2"></i>Share Journey
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

    trackFarmToCounter() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-store me-2"></i>Farm-to-Counter Journey
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="journey-timeline">
                            ${this.supplyChainSteps.farmToCounter.map((step, index) => `
                                <div class="journey-step ${index <= 4 ? 'completed' : index === 5 ? 'current' : ''}">
                                    <div class="step-marker">
                                        <i class="fas ${this.getStepIcon('farmToCounter', index)}"></i>
                                    </div>
                                    <div class="step-info">
                                        <h6>${step}</h6>
                                        <p>${this.getStepDescription('farmToCounter', index)}</p>
                                        <small class="text-muted">
                                            ${index <= 4 ? 'Completed' : index === 5 ? 'In Progress' : 'Pending'} - 
                                            ${new Date(Date.now() - (8 - index) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                        </small>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="mt-4">
                            <h6>📊 Retail Distribution Statistics</h6>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="stat-item">
                                        <strong>Retail Partners:</strong> 12 stores
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="stat-item">
                                        <strong>Time to Counter:</strong> 48-72 hours
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="stat-item">
                                        <strong>Cold Chain Integrity:</strong> 100%
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-4">
                            <h6>🏪 Current Retail Locations</h6>
                            <div class="retail-locations">
                                ${this.retailPartners.slice(0, 3).map(partner => `
                                    <div class="location-item">
                                        <i class="fas fa-map-marker-alt text-success me-2"></i>
                                        <strong>${partner.name}</strong> - ${partner.location}
                                        <span class="badge bg-success ms-2">In Stock</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" onclick="supplyChainTracker.shareJourney('farmToCounter')">
                            <i class="fas fa-share me-2"></i>Share Journey
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

    addRetailPartner() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-plus me-2"></i>Add Retail Partner
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="retailPartnerForm">
                            <div class="mb-3">
                                <label class="form-label">Partner Name</label>
                                <input type="text" class="form-control" id="partnerName" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Partner Type</label>
                                <select class="form-select" id="partnerType" required>
                                    <option value="Supermarket">Supermarket</option>
                                    <option value="Specialty Store">Specialty Store</option>
                                    <option value="Farmers Market">Farmers Market</option>
                                    <option value="Restaurant">Restaurant</option>
                                    <option value="Wholesale">Wholesale</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Location</label>
                                <input type="text" class="form-control" id="partnerLocation" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Contact Email</label>
                                <input type="email" class="form-control" id="partnerContact" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Phone Number</label>
                                <input type="tel" class="form-control" id="partnerPhone" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="supplyChainTracker.saveRetailPartner()">
                            <i class="fas fa-save me-2"></i>Add Partner
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

    saveRetailPartner() {
        const name = document.getElementById('partnerName').value;
        const type = document.getElementById('partnerType').value;
        const location = document.getElementById('partnerLocation').value;
        const contact = document.getElementById('partnerContact').value;
        const phone = document.getElementById('partnerPhone').value;

        if (!name || !type || !location || !contact || !phone) {
            alert('Please fill in all fields');
            return;
        }

        const newPartner = {
            id: 'RETAIL' + Date.now(),
            name: name,
            type: type,
            location: location,
            contact: contact,
            phone: phone,
            partnershipDate: new Date().toISOString(),
            status: 'Active'
        };

        this.retailPartners.push(newPartner);
        this.saveRetailPartners();
        this.populateRetailPartners();

        // Close modal
        const modal = document.querySelector('.modal');
        if (modal) {
            const bsModal = bootstrap.Modal.getInstance(modal);
            bsModal.hide();
        }

        alert('Retail partner added successfully!');
    }

    viewPartnerDetails(partnerId) {
        const partner = this.retailPartners.find(p => p.id === partnerId);
        if (!partner) return;

        alert(`Partner Details:\n\nName: ${partner.name}\nType: ${partner.type}\nLocation: ${partner.location}\nContact: ${partner.contact}\nPhone: ${partner.phone}\nStatus: ${partner.status}\nPartnership Date: ${new Date(partner.partnershipDate).toLocaleDateString()}`);
    }

    trackShipment(partnerId) {
        const partner = this.retailPartners.find(p => p.id === partnerId);
        if (!partner) return;

        alert(`Tracking shipment to ${partner.name}...\n\nCurrent Status: In Transit\nEstimated Arrival: Tomorrow 2:00 PM\nTracking Number: SHIP${Date.now()}\n\nYou can track this shipment in real-time through our logistics dashboard.`);
    }

    shareJourney(journeyType) {
        const journeyName = journeyType === 'farmToTable' ? 'Farm-to-Table' : 'Farm-to-Counter';
        alert(`Sharing ${journeyName} journey...\n\nThis journey showcases our complete supply chain transparency from farm to ${journeyType === 'farmToTable' ? 'your table' : 'retail counter'}.\n\nShare this with customers to build trust and demonstrate our commitment to quality and transparency!`);
    }

    initializeSupplyChainTracking() {
        console.log('Supply chain tracking initialized');
    }
}

// Add CSS styles for supply chain tracking
const supplyChainStyles = `
    <style>
        .supply-chain-timeline {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .supply-step {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }

        .step-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #007bff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        }

        .step-content h6 {
            margin: 0;
            font-size: 0.9rem;
            color: #495057;
        }

        .step-content small {
            font-size: 0.8rem;
            color: #6c757d;
        }

        .retail-partner-card {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 10px;
            padding: 15px;
            height: 100%;
        }

        .partner-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .partner-header h6 {
            margin: 0;
            color: #495057;
        }

        .partner-details p {
            margin-bottom: 5px;
            font-size: 0.9rem;
            color: #6c757d;
        }

        .partner-actions {
            margin-top: 15px;
            display: flex;
            gap: 10px;
        }

        .journey-timeline {
            position: relative;
            padding-left: 30px;
        }

        .journey-timeline::before {
            content: '';
            position: absolute;
            left: 15px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #e9ecef;
        }

        .journey-step {
            position: relative;
            margin-bottom: 30px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-left: 4px solid #e9ecef;
        }

        .journey-step.completed {
            border-left-color: #28a745;
        }

        .journey-step.current {
            border-left-color: #007bff;
        }

        .journey-step::before {
            content: '';
            position: absolute;
            left: -28px;
            top: 20px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: #e9ecef;
            border: 3px solid white;
            box-shadow: 0 0 0 3px #e9ecef;
        }

        .journey-step.completed::before {
            background: #28a745;
            box-shadow: 0 0 0 3px #28a745;
        }

        .journey-step.current::before {
            background: #007bff;
            box-shadow: 0 0 0 3px #007bff;
        }

        .step-marker {
            position: absolute;
            left: -35px;
            top: 15px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: #007bff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
        }

        .step-info h6 {
            margin-bottom: 5px;
            color: #495057;
        }

        .step-info p {
            margin-bottom: 5px;
            color: #6c757d;
            font-size: 0.9rem;
        }

        .stat-item {
            padding: 10px;
            background: #f8f9fa;
            border-radius: 8px;
            margin-bottom: 10px;
        }

        .location-item {
            padding: 8px;
            background: #f8f9fa;
            border-radius: 6px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
        }

        .retail-locations {
            max-height: 200px;
            overflow-y: auto;
        }
    </style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', supplyChainStyles);

// Initialize Supply Chain Tracker
const supplyChainTracker = new SupplyChainTracker();

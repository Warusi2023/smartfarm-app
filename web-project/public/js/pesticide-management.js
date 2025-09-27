/**
 * SmartFarm Pesticide Management System
 * Comprehensive pesticide database with detailed chemical information,
 * knapsack sprayer mixtures, and safety guidelines
 */

class PesticideManagement {
    constructor() {
        this.pesticideDatabase = this.initializePesticideDatabase();
        this.pestPesticideMatching = this.initializePestPesticideMatching();
        this.safetyGuidelines = this.initializeSafetyGuidelines();
        this.applicationRecords = this.loadApplicationRecords();
    }

    initializePesticideDatabase() {
        return [
            // INSECTICIDES
            {
                name: 'Malathion',
                category: 'Insecticide',
                type: 'Organophosphate',
                effectiveness: 85,
                safetyLevel: 'Moderate',
                applicationRate: '1-2 L/ha',
                costPerLiter: 35.00,
                environmentalImpact: 'Medium',
                description: 'Broad-spectrum insecticide for various pests',
                preHarvestInterval: 3,
                weatherRestrictions: ['No rain for 6 hours', 'Temperature below 30°C'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '0.1%',
                        chemicalAmount: 16,
                        waterAmount: 15984,
                        coverageArea: 0.1,
                        sprayTime: 30,
                        instructions: [
                            'Fill sprayer with 15.98L clean water',
                            'Add 16ml Malathion concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 160L/ha rate',
                            'Cover 0.1 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '0.1%',
                        chemicalAmount: 20,
                        waterAmount: 19980,
                        coverageArea: 0.125,
                        sprayTime: 35,
                        instructions: [
                            'Fill sprayer with 19.98L clean water',
                            'Add 20ml Malathion concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 160L/ha rate',
                            'Cover 0.125 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Wear protective clothing (overalls, gloves, boots)',
                    'Use respirator with organic vapor cartridge',
                    'Avoid skin and eye contact',
                    'Do not eat, drink or smoke during application',
                    'Wash hands thoroughly after use',
                    'Keep away from children and animals'
                ],
                chemicalDetails: {
                    chemicalName: 'S-1,2-bis(ethoxycarbonyl)ethyl O,O-dimethyl phosphorodithioate',
                    molecularFormula: 'C10H19O6PS2',
                    molecularWeight: '330.36 g/mol',
                    casNumber: '121-75-5',
                    physicalState: 'Liquid',
                    color: 'Colorless to amber',
                    odor: 'Garlic-like odor',
                    solubility: 'Slightly soluble in water (145 mg/L at 20°C)',
                    phLevel: '6.5-7.5',
                    density: '1.23 g/cm³',
                    boilingPoint: '156-157°C',
                    meltingPoint: '2.9°C',
                    vaporPressure: '5.3 × 10⁻⁵ mmHg at 25°C',
                    halfLife: 'Soil: 1-17 days, Water: 1-7 days',
                    modeOfAction: 'Acetylcholinesterase inhibitor',
                    targetPests: [
                        'Aphids',
                        'Whiteflies',
                        'Thrips',
                        'Spider mites',
                        'Caterpillars'
                    ],
                    resistantPests: [
                        'Malathion-resistant aphids',
                        'Malathion-resistant whiteflies'
                    ],
                    applicationTiming: [
                        'Early morning application',
                        'Evening application',
                        'When pests first appear',
                        'Before flowering for some crops'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 2800 mg/kg (slightly toxic)',
                        acuteDermal: 'LD50 > 4000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 5.1 mg/L (slightly toxic)',
                        eyeIrritation: 'Moderate irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 0.1-10 mg/L (highly toxic)',
                        birds: 'LD50 100-1000 mg/kg (moderately toxic)',
                        bees: 'LD50 0.1-1 μg/bee (highly toxic)',
                        earthworms: 'LC50 10-100 mg/kg (moderately toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Approved for agricultural use',
                        reEntryInterval: '12 hours',
                        workerProtectionStandard: 'Category II (Warning)',
                        restrictedUse: 'No',
                        exportTolerance: 'Varies by country'
                    }
                }
            },
            {
                name: 'Deltamethrin',
                category: 'Insecticide',
                type: 'Pyrethroid',
                effectiveness: 95,
                safetyLevel: 'Moderate',
                applicationRate: '0.5-1 L/ha',
                costPerLiter: 45.00,
                environmentalImpact: 'High',
                description: 'Synthetic pyrethroid with rapid knockdown',
                preHarvestInterval: 1,
                weatherRestrictions: ['No rain for 4 hours', 'Low wind conditions'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '0.02%',
                        chemicalAmount: 3.2,
                        waterAmount: 15996.8,
                        coverageArea: 0.15,
                        sprayTime: 40,
                        instructions: [
                            'Fill sprayer with 15.997L clean water',
                            'Add 3.2ml Deltamethrin concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 110L/ha rate',
                            'Cover 0.15 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '0.02%',
                        chemicalAmount: 4,
                        waterAmount: 19996,
                        coverageArea: 0.18,
                        sprayTime: 45,
                        instructions: [
                            'Fill sprayer with 19.996L clean water',
                            'Add 4ml Deltamethrin concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 110L/ha rate',
                            'Cover 0.18 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Wear protective clothing',
                    'Use chemical-resistant gloves',
                    'Avoid contact with skin',
                    'Do not apply in windy conditions',
                    'Clean equipment thoroughly after use'
                ],
                chemicalDetails: {
                    chemicalName: '(S)-α-cyano-3-phenoxybenzyl (1R,3R)-3-(2,2-dibromovinyl)-2,2-dimethylcyclopropanecarboxylate',
                    molecularFormula: 'C22H19Br2NO3',
                    molecularWeight: '505.21 g/mol',
                    casNumber: '52918-63-5',
                    physicalState: 'Solid (crystalline)',
                    color: 'White to cream',
                    odor: 'Odorless',
                    solubility: 'Insoluble in water (<0.2 mg/L at 20°C)',
                    phLevel: '4.0-6.0',
                    density: '1.5 g/cm³',
                    boilingPoint: '300°C (decomposes)',
                    meltingPoint: '98-101°C',
                    vaporPressure: '1.24 × 10⁻⁸ mmHg at 25°C',
                    halfLife: 'Soil: 30-60 days, Water: 30-60 days',
                    modeOfAction: 'Sodium channel modulator',
                    targetPests: [
                        'Caterpillars',
                        'Beetles',
                        'Thrips',
                        'Aphids',
                        'Whiteflies'
                    ],
                    resistantPests: [
                        'Pyrethroid-resistant pests',
                        'Deltamethrin-resistant moths'
                    ],
                    applicationTiming: [
                        'Early morning application',
                        'Evening application',
                        'When pests first appear',
                        'Preventive application'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 135 mg/kg (moderately toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 0.5 mg/L (moderately toxic)',
                        eyeIrritation: 'Severe irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 0.001-0.1 mg/L (highly toxic)',
                        birds: 'LD50 10-100 mg/kg (highly toxic)',
                        bees: 'LD50 0.001-0.01 μg/bee (highly toxic)',
                        earthworms: 'LC50 1-10 mg/kg (highly toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Approved for agricultural use',
                        reEntryInterval: '12 hours',
                        workerProtectionStandard: 'Category II (Warning)',
                        restrictedUse: 'No',
                        exportTolerance: 'Varies by country'
                    }
                }
            }
        ];
    }

    initializePestPesticideMatching() {
        return {
            'Aphids': ['Malathion', 'Deltamethrin', 'Neem Oil', 'Insecticidal Soap'],
            'Whiteflies': ['Malathion', 'Deltamethrin', 'Neem Oil'],
            'Spider Mites': ['Malathion', 'Neem Oil', 'Insecticidal Soap'],
            'Thrips': ['Malathion', 'Deltamethrin'],
            'Caterpillars': ['Deltamethrin', 'Bacillus thuringiensis'],
            'Beetles': ['Deltamethrin'],
            'Fungal Diseases': ['Copper Fungicide', 'Baking Soda Fungicide'],
            'Bacterial Diseases': ['Copper Compounds', 'Streptomycin'],
            'Powdery Mildew': ['Baking Soda Fungicide', 'Copper Fungicide'],
            'Leaf Spot': ['Copper Fungicide'],
            'Rust': ['Copper Fungicide']
        };
    }

    initializeSafetyGuidelines() {
        return {
            'Malathion': [
                'Full protective suit required',
                'Use chemical-resistant gloves and boots',
                'Respirator with organic vapor cartridge',
                'Avoid application near water sources',
                'Monitor for resistance development'
            ],
            'Deltamethrin': [
                'Wear protective clothing',
                'Use chemical-resistant gloves',
                'Avoid contact with beneficial insects',
                'Do not apply in windy conditions',
                'Clean equipment thoroughly'
            ]
        };
    }

    showPesticideDetails(pesticideName) {
        const pesticide = this.pesticideDatabase.find(p => p.name === pesticideName);
        if (!pesticide || !pesticide.chemicalDetails) return;

        this.displayPesticideDetailsModal(pesticide);
    }

    displayPesticideDetailsModal(pesticide) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-bug me-2"></i>Pesticide Details - ${pesticide.name}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-primary text-white">
                                        <h6 class="mb-0">Basic Information</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>Category:</strong></td><td>${pesticide.category}</td></tr>
                                            <tr><td><strong>Type:</strong></td><td>${pesticide.type}</td></tr>
                                            <tr><td><strong>Chemical Name:</strong></td><td>${pesticide.chemicalDetails.chemicalName}</td></tr>
                                            <tr><td><strong>Molecular Formula:</strong></td><td>${pesticide.chemicalDetails.molecularFormula}</td></tr>
                                            <tr><td><strong>Molecular Weight:</strong></td><td>${pesticide.chemicalDetails.molecularWeight}</td></tr>
                                            <tr><td><strong>CAS Number:</strong></td><td>${pesticide.chemicalDetails.casNumber}</td></tr>
                                            <tr><td><strong>Physical State:</strong></td><td>${pesticide.chemicalDetails.physicalState}</td></tr>
                                        </table>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-success text-white">
                                        <h6 class="mb-0">Physical Properties</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>Color:</strong></td><td>${pesticide.chemicalDetails.color}</td></tr>
                                            <tr><td><strong>Odor:</strong></td><td>${pesticide.chemicalDetails.odor}</td></tr>
                                            <tr><td><strong>Solubility:</strong></td><td>${pesticide.chemicalDetails.solubility}</td></tr>
                                            <tr><td><strong>pH Level:</strong></td><td>${pesticide.chemicalDetails.phLevel}</td></tr>
                                            <tr><td><strong>Density:</strong></td><td>${pesticide.chemicalDetails.density}</td></tr>
                                            <tr><td><strong>Half-Life:</strong></td><td>${pesticide.chemicalDetails.halfLife}</td></tr>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-warning text-dark">
                                        <h6 class="mb-0">Mode of Action & Target</h6>
                                    </div>
                                    <div class="card-body">
                                        <p><strong>Mode of Action:</strong> ${pesticide.chemicalDetails.modeOfAction}</p>
                                        
                                        <h6>Target Pests:</h6>
                                        <ul class="list-unstyled">
                                            ${pesticide.chemicalDetails.targetPests.map(pest => `<li>• ${pest}</li>`).join('')}
                                        </ul>

                                        <h6>Resistant Pests:</h6>
                                        <ul class="list-unstyled">
                                            ${pesticide.chemicalDetails.resistantPests.map(pest => `<li>• ${pest}</li>`).join('')}
                                        </ul>

                                        <h6>Application Timing:</h6>
                                        <ul class="list-unstyled">
                                            ${pesticide.chemicalDetails.applicationTiming.map(timing => `<li>• ${timing}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-danger text-white">
                                        <h6 class="mb-0">Toxicity Information</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>Acute Oral:</strong></td><td>${pesticide.chemicalDetails.toxicity.acuteOral}</td></tr>
                                            <tr><td><strong>Acute Dermal:</strong></td><td>${pesticide.chemicalDetails.toxicity.acuteDermal}</td></tr>
                                            <tr><td><strong>Acute Inhalation:</strong></td><td>${pesticide.chemicalDetails.toxicity.acuteInhalation}</td></tr>
                                            <tr><td><strong>Eye Irritation:</strong></td><td>${pesticide.chemicalDetails.toxicity.eyeIrritation}</td></tr>
                                            <tr><td><strong>Skin Irritation:</strong></td><td>${pesticide.chemicalDetails.toxicity.skinIrritation}</td></tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-info text-white">
                                        <h6 class="mb-0">Ecotoxicity</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>Fish:</strong></td><td>${pesticide.chemicalDetails.ecotoxicity.fish}</td></tr>
                                            <tr><td><strong>Birds:</strong></td><td>${pesticide.chemicalDetails.ecotoxicity.birds}</td></tr>
                                            <tr><td><strong>Bees:</strong></td><td>${pesticide.chemicalDetails.ecotoxicity.bees}</td></tr>
                                            <tr><td><strong>Earthworms:</strong></td><td>${pesticide.chemicalDetails.ecotoxicity.earthworms}</td></tr>
                                        </table>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-primary text-white">
                                        <h6 class="mb-0">Regulatory Status</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>EPA Registration:</strong></td><td>${pesticide.chemicalDetails.regulatoryStatus.epaRegistration}</td></tr>
                                            <tr><td><strong>Re-Entry Interval:</strong></td><td>${pesticide.chemicalDetails.regulatoryStatus.reEntryInterval}</td></tr>
                                            <tr><td><strong>Worker Protection:</strong></td><td>${pesticide.chemicalDetails.regulatoryStatus.workerProtectionStandard}</td></tr>
                                            <tr><td><strong>Restricted Use:</strong></td><td>${pesticide.chemicalDetails.regulatoryStatus.restrictedUse}</td></tr>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-warning text-dark">
                                        <h6 class="mb-0">Safety Guidelines</h6>
                                    </div>
                                    <div class="card-body">
                                        <ul class="mb-0">
                                            ${pesticide.safetyGuidelines.map(guideline => `<li>${guideline}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-success text-white">
                                        <h6 class="mb-0">Knapsack Mixture Instructions</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            ${Object.entries(pesticide.knapsackMixtures).map(([size, mixture]) => `
                                                <div class="col-md-6">
                                                    <h6>${size} Sprayer</h6>
                                                    <p><strong>Chemical:</strong> ${mixture.chemicalAmount}ml</p>
                                                    <p><strong>Water:</strong> ${(mixture.waterAmount/1000).toFixed(2)}L</p>
                                                    <p><strong>Coverage:</strong> ${mixture.coverageArea}ha</p>
                                                    <p><strong>Time:</strong> ${mixture.sprayTime}min</p>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-info" onclick="pesticideManagement.printPesticideDetails('${pesticide.name}')">
                            <i class="fas fa-print me-2"></i>Print Details
                        </button>
                        <button type="button" class="btn btn-danger" onclick="pesticideManagement.selectPesticide('${pesticide.name}')">
                            <i class="fas fa-bug me-2"></i>Select Pesticide
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

    selectPesticide(pesticideName) {
        const pesticide = this.pesticideDatabase.find(p => p.name === pesticideName);
        if (!pesticide) return;

        alert(`🐛 Selected: ${pesticide.name}\n\nCategory: ${pesticide.category}\nType: ${pesticide.type}\nEffectiveness: ${pesticide.effectiveness}%\nSafety Level: ${pesticide.safetyLevel}\nApplication Rate: ${pesticide.applicationRate}\nCost: $${pesticide.costPerLiter}/L\nEnvironmental Impact: ${pesticide.environmentalImpact}\n\nPre-Harvest Interval: ${pesticide.preHarvestInterval} days\n\nPesticide selected for application!`);
    }

    printPesticideDetails(pesticideName) {
        const pesticide = this.pesticideDatabase.find(p => p.name === pesticideName);
        if (!pesticide) return;

        alert(`🖨️ Print Pesticide Details for ${pesticideName}\n\nComprehensive pesticide information would be printed including:\n\n• Chemical properties and molecular data\n• Toxicity and ecotoxicity information\n• Target pests and resistance data\n• Application instructions and timing\n• Safety guidelines and protective equipment\n• Regulatory compliance information\n\nThis would generate a professional PDF for field use and compliance.`);
    }

    getPesticidesForPest(pestName) {
        return this.pestPesticideMatching[pestName] || [];
    }

    loadApplicationRecords() {
        return JSON.parse(localStorage.getItem('pesticideApplications') || '[]');
    }

    saveApplicationRecord(record) {
        this.applicationRecords.push(record);
        localStorage.setItem('pesticideApplications', JSON.stringify(this.applicationRecords));
    }
}

// Initialize Pesticide Management System
const pesticideManagement = new PesticideManagement();

// Export for global access
window.pesticideManagement = pesticideManagement;

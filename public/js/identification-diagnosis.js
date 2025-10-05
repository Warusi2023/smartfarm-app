// Identification & Diagnosis System
// Handles crop disease identification and livestock health diagnosis

class IdentificationDiagnosisSystem {
    constructor() {
        this.cropDiseases = this.initializeCropDiseases();
        this.livestockDiseases = this.initializeLivestockDiseases();
        this.diseaseGuide = this.initializeDiseaseGuide();
        this.healthGuide = this.initializeHealthGuide();
    }

    // Initialize crop diseases database
    initializeCropDiseases() {
        return {
            cassava: [
                {
                    name: "Cassava Mosaic Disease",
                    symptoms: ["Yellow mottling on leaves", "Stunted growth", "Reduced yield"],
                    causes: "Virus transmitted by whiteflies",
                    treatment: "Remove infected plants, use resistant varieties, control whiteflies",
                    prevention: "Plant disease-free cuttings, maintain field hygiene",
                    severity: "High",
                    image: "images/diseases/cassava-mosaic.jpg"
                },
                {
                    name: "Cassava Bacterial Blight",
                    symptoms: ["Water-soaked lesions", "Wilting leaves", "Stem cankers"],
                    causes: "Bacteria (Xanthomonas axonopodis)",
                    treatment: "Copper-based fungicides, remove infected parts",
                    prevention: "Crop rotation, avoid overhead irrigation",
                    severity: "Medium",
                    image: "images/diseases/cassava-blight.jpg"
                },
                {
                    name: "Root Rot",
                    symptoms: ["Soft, mushy roots", "Foul odor", "Plant wilting"],
                    causes: "Fungal infection (Phytophthora)",
                    treatment: "Improve drainage, fungicide treatment",
                    prevention: "Well-drained soil, avoid waterlogging",
                    severity: "High",
                    image: "images/diseases/root-rot.jpg"
                }
            ],
            taro: [
                {
                    name: "Taro Leaf Blight",
                    symptoms: ["Brown spots on leaves", "Leaf yellowing", "Defoliation"],
                    causes: "Fungus (Phytophthora colocasiae)",
                    treatment: "Fungicide application, remove infected leaves",
                    prevention: "Proper spacing, good air circulation",
                    severity: "High",
                    image: "images/diseases/taro-blight.jpg"
                },
                {
                    name: "Taro Corm Rot",
                    symptoms: ["Soft, discolored corms", "Foul smell", "Plant death"],
                    causes: "Bacterial infection",
                    treatment: "Remove infected corms, improve drainage",
                    prevention: "Plant healthy corms, avoid waterlogging",
                    severity: "High",
                    image: "images/diseases/corm-rot.jpg"
                }
            ],
            banana: [
                {
                    name: "Panama Disease",
                    symptoms: ["Yellowing leaves", "Wilting", "Internal stem discoloration"],
                    causes: "Fungus (Fusarium oxysporum)",
                    treatment: "Remove infected plants, soil treatment",
                    prevention: "Use resistant varieties, avoid contaminated soil",
                    severity: "Very High",
                    image: "images/diseases/panama-disease.jpg"
                },
                {
                    name: "Black Sigatoka",
                    symptoms: ["Black streaks on leaves", "Premature leaf death", "Reduced fruit quality"],
                    causes: "Fungus (Mycosphaerella fijiensis)",
                    treatment: "Fungicide spray program",
                    prevention: "Regular fungicide applications, remove old leaves",
                    severity: "High",
                    image: "images/diseases/black-sigatoka.jpg"
                }
            ],
            tomato: [
                {
                    name: "Early Blight",
                    symptoms: ["Brown spots with concentric rings", "Yellowing leaves", "Fruit rot"],
                    causes: "Fungus (Alternaria solani)",
                    treatment: "Fungicide treatment, remove infected parts",
                    prevention: "Crop rotation, proper spacing, avoid overhead watering",
                    severity: "Medium",
                    image: "images/diseases/early-blight.jpg"
                },
                {
                    name: "Late Blight",
                    symptoms: ["Water-soaked lesions", "White fungal growth", "Rapid plant death"],
                    causes: "Fungus (Phytophthora infestans)",
                    treatment: "Immediate fungicide application",
                    prevention: "Avoid overhead irrigation, proper ventilation",
                    severity: "Very High",
                    image: "images/diseases/late-blight.jpg"
                }
            ]
        };
    }

    // Initialize livestock diseases database
    initializeLivestockDiseases() {
        return {
            cattle: [
                {
                    name: "Mastitis",
                    symptoms: ["Swollen udder", "Milk with clots", "Fever", "Loss of appetite"],
                    causes: "Bacterial infection",
                    treatment: "Antibiotics, anti-inflammatory drugs, frequent milking",
                    prevention: "Clean milking equipment, proper hygiene, dry cow therapy",
                    severity: "High",
                    contagious: false,
                    image: "images/diseases/mastitis.jpg"
                },
                {
                    name: "Foot and Mouth Disease",
                    symptoms: ["Blisters on mouth and feet", "Excessive salivation", "Lameness", "Fever"],
                    causes: "Virus (FMDV)",
                    treatment: "Supportive care, isolation, vaccination",
                    prevention: "Vaccination, quarantine new animals, biosecurity",
                    severity: "Very High",
                    contagious: true,
                    image: "images/diseases/fmd.jpg"
                },
                {
                    name: "Bovine Respiratory Disease",
                    symptoms: ["Coughing", "Nasal discharge", "Fever", "Difficulty breathing"],
                    causes: "Bacterial or viral infection",
                    treatment: "Antibiotics, anti-inflammatory drugs, supportive care",
                    prevention: "Vaccination, good ventilation, stress reduction",
                    severity: "High",
                    contagious: true,
                    image: "images/diseases/brd.jpg"
                }
            ],
            goats: [
                {
                    name: "Caprine Arthritis Encephalitis (CAE)",
                    symptoms: ["Joint swelling", "Lameness", "Weight loss", "Neurological signs"],
                    causes: "Virus (CAEV)",
                    treatment: "Supportive care, pain management",
                    prevention: "Test and cull positive animals, separate kids from adults",
                    severity: "High",
                    contagious: true,
                    image: "images/diseases/cae.jpg"
                },
                {
                    name: "Caseous Lymphadenitis",
                    symptoms: ["Abscesses in lymph nodes", "Weight loss", "Poor condition"],
                    causes: "Bacteria (Corynebacterium pseudotuberculosis)",
                    treatment: "Surgical drainage, antibiotics",
                    prevention: "Vaccination, cull infected animals, proper hygiene",
                    severity: "Medium",
                    contagious: true,
                    image: "images/diseases/cla.jpg"
                }
            ],
            chickens: [
                {
                    name: "Newcastle Disease",
                    symptoms: ["Respiratory distress", "Nervous signs", "Drop in egg production", "Death"],
                    causes: "Virus (NDV)",
                    treatment: "Supportive care, isolation",
                    prevention: "Vaccination, biosecurity, quarantine",
                    severity: "Very High",
                    contagious: true,
                    image: "images/diseases/newcastle.jpg"
                },
                {
                    name: "Avian Influenza",
                    symptoms: ["Sudden death", "Respiratory signs", "Drop in egg production", "Swelling"],
                    causes: "Virus (AIV)",
                    treatment: "Culling of infected flocks",
                    prevention: "Biosecurity, surveillance, vaccination (where appropriate)",
                    severity: "Very High",
                    contagious: true,
                    image: "images/diseases/avian-flu.jpg"
                }
            ]
        };
    }

    // Initialize disease guide
    initializeDiseaseGuide() {
        return {
            categories: [
                {
                    name: "Fungal Diseases",
                    description: "Diseases caused by fungal pathogens",
                    commonDiseases: ["Early Blight", "Late Blight", "Powdery Mildew", "Rust", "Anthracnose"],
                    prevention: "Proper spacing, good air circulation, avoid overhead watering, fungicide applications"
                },
                {
                    name: "Bacterial Diseases",
                    description: "Diseases caused by bacterial pathogens",
                    commonDiseases: ["Bacterial Blight", "Soft Rot", "Crown Gall", "Fire Blight"],
                    prevention: "Crop rotation, clean tools, resistant varieties, copper-based treatments"
                },
                {
                    name: "Viral Diseases",
                    description: "Diseases caused by viral pathogens",
                    commonDiseases: ["Mosaic Virus", "Yellow Leaf Curl", "Tobacco Mosaic", "Cucumber Mosaic"],
                    prevention: "Control insect vectors, use virus-free planting material, remove infected plants"
                },
                {
                    name: "Nutrient Deficiencies",
                    description: "Problems caused by lack of essential nutrients",
                    commonDeficiencies: ["Nitrogen", "Phosphorus", "Potassium", "Calcium", "Magnesium"],
                    prevention: "Soil testing, balanced fertilization, organic matter addition"
                }
            ],
            symptoms: {
                leaves: ["Yellowing", "Browning", "Spots", "Wilting", "Curling", "Mottling"],
                stems: ["Cankers", "Lesions", "Wilting", "Discoloration", "Stunting"],
                roots: ["Rot", "Discoloration", "Stunting", "Nodules", "Lesions"],
                fruits: ["Spots", "Rot", "Deformation", "Discoloration", "Cracking"]
            }
        };
    }

    // Initialize health guide
    initializeHealthGuide() {
        return {
            categories: [
                {
                    name: "Preventive Care",
                    description: "Routine health maintenance for livestock",
                    practices: ["Vaccination", "Deworming", "Nutrition", "Housing", "Hygiene"],
                    schedule: "Regular intervals based on species and age"
                },
                {
                    name: "Common Ailments",
                    description: "Frequently encountered health issues",
                    ailments: ["Digestive problems", "Respiratory issues", "Skin conditions", "Lameness"],
                    treatment: "Early detection, proper diagnosis, appropriate treatment"
                },
                {
                    name: "Emergency Care",
                    description: "Critical health situations requiring immediate attention",
                    situations: ["Injury", "Poisoning", "Difficult birth", "Severe illness"],
                    response: "Immediate veterinary attention, first aid, isolation"
                }
            ],
            vitalSigns: {
                cattle: {
                    temperature: "101.5-102.5°F",
                    heartRate: "60-80 bpm",
                    respiration: "10-30 breaths/min"
                },
                goats: {
                    temperature: "101.5-103.5°F",
                    heartRate: "70-90 bpm",
                    respiration: "12-20 breaths/min"
                },
                chickens: {
                    temperature: "105-107°F",
                    heartRate: "250-300 bpm",
                    respiration: "15-30 breaths/min"
                }
            }
        };
    }

    // Start crop identification process
    startCropIdentification() {
        this.showCropIdentificationModal();
    }

    // Start livestock diagnosis process
    startLivestockDiagnosis() {
        this.showLivestockDiagnosisModal();
    }

    // Show crop disease guide
    showCropDiseaseGuide() {
        this.showDiseaseGuideModal();
    }

    // Show livestock health guide
    showLivestockHealthGuide() {
        this.showHealthGuideModal();
    }

    // Show crop identification modal
    showCropIdentificationModal() {
        const modalHtml = `
            <div class="modal fade" id="cropIdentificationModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-seedling me-2"></i>Crop Disease Identification
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6>Step 1: Select Crop Type</h6>
                                    <select class="form-select mb-3" id="cropTypeSelect">
                                        <option value="">Choose crop type...</option>
                                        <option value="cassava">Cassava</option>
                                        <option value="taro">Taro</option>
                                        <option value="banana">Banana</option>
                                        <option value="tomato">Tomato</option>
                                        <option value="other">Other</option>
                                    </select>
                                    
                                    <h6>Step 2: Describe Symptoms</h6>
                                    <div class="mb-3">
                                        <label class="form-label">Affected Plant Parts</label>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="leaves" id="symptomLeaves">
                                            <label class="form-check-label" for="symptomLeaves">Leaves</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="stems" id="symptomStems">
                                            <label class="form-check-label" for="symptomStems">Stems</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="roots" id="symptomRoots">
                                            <label class="form-check-label" for="symptomRoots">Roots</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="fruits" id="symptomFruits">
                                            <label class="form-check-label" for="symptomFruits">Fruits</label>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label class="form-label">Symptom Description</label>
                                        <textarea class="form-control" id="symptomDescription" rows="3" 
                                                  placeholder="Describe the symptoms you're seeing..."></textarea>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label class="form-label">Upload Photo (Optional)</label>
                                        <input type="file" class="form-control" id="cropPhoto" accept="image/*">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <h6>AI Analysis Results</h6>
                                    <div id="cropAnalysisResults" class="border rounded p-3" style="min-height: 300px;">
                                        <p class="text-muted text-center">Select crop type and describe symptoms to get AI analysis</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success" onclick="identificationSystem.analyzeCropDisease()">
                                <i class="fas fa-search me-1"></i>Analyze Disease
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.showModal('cropIdentificationModal', modalHtml);
    }

    // Show livestock diagnosis modal
    showLivestockDiagnosisModal() {
        const modalHtml = `
            <div class="modal fade" id="livestockDiagnosisModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-stethoscope me-2"></i>Livestock Health Diagnosis
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6>Step 1: Select Animal Type</h6>
                                    <select class="form-select mb-3" id="animalTypeSelect">
                                        <option value="">Choose animal type...</option>
                                        <option value="cattle">Cattle</option>
                                        <option value="goats">Goats</option>
                                        <option value="chickens">Chickens</option>
                                        <option value="pigs">Pigs</option>
                                        <option value="other">Other</option>
                                    </select>
                                    
                                    <h6>Step 2: Health Assessment</h6>
                                    <div class="mb-3">
                                        <label class="form-label">Observed Symptoms</label>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="fever" id="symptomFever">
                                            <label class="form-check-label" for="symptomFever">Fever</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="lossOfAppetite" id="symptomAppetite">
                                            <label class="form-check-label" for="symptomAppetite">Loss of Appetite</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="lameness" id="symptomLameness">
                                            <label class="form-check-label" for="symptomLameness">Lameness</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="respiratory" id="symptomRespiratory">
                                            <label class="form-check-label" for="symptomRespiratory">Respiratory Issues</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="digestive" id="symptomDigestive">
                                            <label class="form-check-label" for="symptomDigestive">Digestive Problems</label>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label class="form-label">Additional Notes</label>
                                        <textarea class="form-control" id="healthNotes" rows="3" 
                                                  placeholder="Describe the animal's condition..."></textarea>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label class="form-label">Upload Photo (Optional)</label>
                                        <input type="file" class="form-control" id="animalPhoto" accept="image/*">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <h6>Diagnosis Results</h6>
                                    <div id="livestockAnalysisResults" class="border rounded p-3" style="min-height: 300px;">
                                        <p class="text-muted text-center">Select animal type and describe symptoms to get diagnosis</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-info" onclick="identificationSystem.analyzeLivestockHealth()">
                                <i class="fas fa-stethoscope me-1"></i>Diagnose Health
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.showModal('livestockDiagnosisModal', modalHtml);
    }

    // Show disease guide modal
    showDiseaseGuideModal() {
        const modalHtml = `
            <div class="modal fade" id="diseaseGuideModal" tabindex="-1">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-book me-2"></i>Crop Disease Guide
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                ${this.diseaseGuide.categories.map(category => `
                                    <div class="col-md-6 mb-4">
                                        <div class="card">
                                            <div class="card-header">
                                                <h6 class="mb-0">${category.name}</h6>
                                            </div>
                                            <div class="card-body">
                                                <p class="text-muted">${category.description}</p>
                                                <h6>Common Diseases:</h6>
                                                <ul>
                                                    ${category.commonDiseases.map(disease => `<li>${disease}</li>`).join('')}
                                                </ul>
                                                <h6>Prevention:</h6>
                                                <p class="small">${category.prevention}</p>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <div class="row mt-4">
                                <div class="col-12">
                                    <h5>Symptom Identification</h5>
                                    <div class="row">
                                        ${Object.entries(this.diseaseGuide.symptoms).map(([part, symptoms]) => `
                                            <div class="col-md-3 mb-3">
                                                <div class="card">
                                                    <div class="card-header">
                                                        <h6 class="mb-0">${part.charAt(0).toUpperCase() + part.slice(1)}</h6>
                                                    </div>
                                                    <div class="card-body">
                                                        <ul class="list-unstyled mb-0">
                                                            ${symptoms.map(symptom => `<li>• ${symptom}</li>`).join('')}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.showModal('diseaseGuideModal', modalHtml);
    }

    // Show health guide modal
    showHealthGuideModal() {
        const modalHtml = `
            <div class="modal fade" id="healthGuideModal" tabindex="-1">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-heartbeat me-2"></i>Livestock Health Guide
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                ${this.healthGuide.categories.map(category => `
                                    <div class="col-md-4 mb-4">
                                        <div class="card">
                                            <div class="card-header">
                                                <h6 class="mb-0">${category.name}</h6>
                                            </div>
                                            <div class="card-body">
                                                <p class="text-muted">${category.description}</p>
                                                <h6>Key Practices:</h6>
                                                <ul>
                                                    ${category.practices.map(practice => `<li>${practice}</li>`).join('')}
                                                </ul>
                                                <p class="small"><strong>Schedule:</strong> ${category.schedule}</p>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <div class="row mt-4">
                                <div class="col-12">
                                    <h5>Normal Vital Signs</h5>
                                    <div class="row">
                                        ${Object.entries(this.healthGuide.vitalSigns).map(([animal, signs]) => `
                                            <div class="col-md-4 mb-3">
                                                <div class="card">
                                                    <div class="card-header">
                                                        <h6 class="mb-0">${animal.charAt(0).toUpperCase() + animal.slice(1)}</h6>
                                                    </div>
                                                    <div class="card-body">
                                                        <ul class="list-unstyled mb-0">
                                                            <li><strong>Temperature:</strong> ${signs.temperature}</li>
                                                            <li><strong>Heart Rate:</strong> ${signs.heartRate}</li>
                                                            <li><strong>Respiration:</strong> ${signs.respiration}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.showModal('healthGuideModal', modalHtml);
    }

    // Analyze crop disease
    analyzeCropDisease() {
        const cropType = document.getElementById('cropTypeSelect').value;
        const symptomDescription = document.getElementById('symptomDescription').value;
        const affectedParts = this.getCheckedValues(['symptomLeaves', 'symptomStems', 'symptomRoots', 'symptomFruits']);
        
        if (!cropType || !symptomDescription) {
            this.showAlert('Please select crop type and describe symptoms', 'warning');
            return;
        }

        const results = this.getCropDiseaseAnalysis(cropType, symptomDescription, affectedParts);
        this.displayCropAnalysisResults(results);
    }

    // Analyze livestock health
    analyzeLivestockHealth() {
        const animalType = document.getElementById('animalTypeSelect').value;
        const healthNotes = document.getElementById('healthNotes').value;
        const symptoms = this.getCheckedValues(['symptomFever', 'symptomAppetite', 'symptomLameness', 'symptomRespiratory', 'symptomDigestive']);
        
        if (!animalType || !healthNotes) {
            this.showAlert('Please select animal type and describe the condition', 'warning');
            return;
        }

        const results = this.getLivestockHealthAnalysis(animalType, healthNotes, symptoms);
        this.displayLivestockAnalysisResults(results);
    }

    // Get crop disease analysis
    getCropDiseaseAnalysis(cropType, description, affectedParts) {
        const diseases = this.cropDiseases[cropType] || [];
        const matchingDiseases = diseases.filter(disease => 
            disease.symptoms.some(symptom => 
                description.toLowerCase().includes(symptom.toLowerCase().split(' ')[0])
            )
        );

        if (matchingDiseases.length === 0) {
            return {
                diagnosis: "No specific disease identified",
                confidence: "Low",
                recommendations: [
                    "Check soil nutrients and pH levels",
                    "Ensure proper watering and drainage",
                    "Consider consulting a local agricultural extension officer",
                    "Take a soil sample for testing"
                ],
                severity: "Unknown"
            };
        }

        const topDisease = matchingDiseases[0];
        return {
            diagnosis: topDisease.name,
            confidence: "High",
            symptoms: topDisease.symptoms,
            causes: topDisease.causes,
            treatment: topDisease.treatment,
            prevention: topDisease.prevention,
            severity: topDisease.severity,
            recommendations: [
                topDisease.treatment,
                topDisease.prevention,
                "Monitor plant recovery",
                "Consider consulting a plant pathologist for confirmation"
            ]
        };
    }

    // Get livestock health analysis
    getLivestockHealthAnalysis(animalType, notes, symptoms) {
        const diseases = this.livestockDiseases[animalType] || [];
        const matchingDiseases = diseases.filter(disease => 
            symptoms.some(symptom => 
                disease.symptoms.some(diseaseSymptom => 
                    diseaseSymptom.toLowerCase().includes(symptom.toLowerCase())
                )
            )
        );

        if (matchingDiseases.length === 0) {
            return {
                diagnosis: "General health concern",
                confidence: "Low",
                recommendations: [
                    "Monitor vital signs closely",
                    "Ensure proper nutrition and hydration",
                    "Check for environmental stressors",
                    "Consult a veterinarian for proper diagnosis"
                ],
                severity: "Unknown",
                urgent: false
            };
        }

        const topDisease = matchingDiseases[0];
        return {
            diagnosis: topDisease.name,
            confidence: "High",
            symptoms: topDisease.symptoms,
            causes: topDisease.causes,
            treatment: topDisease.treatment,
            prevention: topDisease.prevention,
            severity: topDisease.severity,
            contagious: topDisease.contagious,
            urgent: topDisease.severity === 'Very High',
            recommendations: [
                topDisease.treatment,
                topDisease.prevention,
                topDisease.contagious ? "Isolate animal immediately" : "Monitor closely",
                "Consult veterinarian for proper treatment plan"
            ]
        };
    }

    // Display crop analysis results
    displayCropAnalysisResults(results) {
        const container = document.getElementById('cropAnalysisResults');
        container.innerHTML = `
            <div class="analysis-result">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h6 class="mb-0">Diagnosis: ${results.diagnosis}</h6>
                    <span class="badge bg-${this.getSeverityColor(results.severity)}">${results.severity}</span>
                </div>
                
                <div class="mb-3">
                    <strong>Confidence Level:</strong> ${results.confidence}
                </div>
                
                ${results.symptoms ? `
                    <div class="mb-3">
                        <strong>Symptoms:</strong>
                        <ul class="mb-0">
                            ${results.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${results.causes ? `
                    <div class="mb-3">
                        <strong>Causes:</strong> ${results.causes}
                    </div>
                ` : ''}
                
                <div class="mb-3">
                    <strong>Recommendations:</strong>
                    <ul class="mb-0">
                        ${results.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="alert alert-info mt-3">
                    <i class="fas fa-info-circle me-2"></i>
                    <strong>Note:</strong> This is an AI-powered analysis. For critical issues, consult with a local agricultural extension officer or plant pathologist.
                </div>
            </div>
        `;
    }

    // Display livestock analysis results
    displayLivestockAnalysisResults(results) {
        const container = document.getElementById('livestockAnalysisResults');
        container.innerHTML = `
            <div class="analysis-result">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h6 class="mb-0">Diagnosis: ${results.diagnosis}</h6>
                    <span class="badge bg-${this.getSeverityColor(results.severity)}">${results.severity}</span>
                </div>
                
                ${results.urgent ? `
                    <div class="alert alert-danger mb-3">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        <strong>URGENT:</strong> Immediate veterinary attention required!
                    </div>
                ` : ''}
                
                <div class="mb-3">
                    <strong>Confidence Level:</strong> ${results.confidence}
                </div>
                
                ${results.symptoms ? `
                    <div class="mb-3">
                        <strong>Symptoms:</strong>
                        <ul class="mb-0">
                            ${results.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${results.causes ? `
                    <div class="mb-3">
                        <strong>Causes:</strong> ${results.causes}
                    </div>
                ` : ''}
                
                ${results.contagious ? `
                    <div class="alert alert-warning mb-3">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        <strong>Contagious:</strong> Isolate animal immediately to prevent spread.
                    </div>
                ` : ''}
                
                <div class="mb-3">
                    <strong>Recommendations:</strong>
                    <ul class="mb-0">
                        ${results.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="alert alert-info mt-3">
                    <i class="fas fa-info-circle me-2"></i>
                    <strong>Note:</strong> This is an AI-powered analysis. For proper diagnosis and treatment, consult with a qualified veterinarian.
                </div>
            </div>
        `;
    }

    // Get checked values from checkboxes
    getCheckedValues(checkboxIds) {
        return checkboxIds.filter(id => document.getElementById(id)?.checked).map(id => 
            document.getElementById(id).value
        );
    }

    // Get severity color
    getSeverityColor(severity) {
        const colors = {
            'Low': 'success',
            'Medium': 'warning',
            'High': 'danger',
            'Very High': 'danger',
            'Unknown': 'secondary'
        };
        return colors[severity] || 'secondary';
    }

    // Show modal
    showModal(modalId, modalHtml) {
        // Remove existing modal if any
        const existingModal = document.getElementById(modalId);
        if (existingModal) {
            existingModal.remove();
        }

        // Add new modal to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById(modalId));
        modal.show();
    }

    // Show alert
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

// Initialize Identification & Diagnosis System
let identificationSystem;
document.addEventListener('DOMContentLoaded', function() {
    identificationSystem = new IdentificationDiagnosisSystem();
});

// Global functions for onclick handlers
function startCropIdentification() {
    if (identificationSystem) {
        identificationSystem.startCropIdentification();
    }
}

function startLivestockDiagnosis() {
    if (identificationSystem) {
        identificationSystem.startLivestockDiagnosis();
    }
}

function showCropDiseaseGuide() {
    if (identificationSystem) {
        identificationSystem.showCropDiseaseGuide();
    }
}

function showLivestockHealthGuide() {
    if (identificationSystem) {
        identificationSystem.showLivestockHealthGuide();
    }
}

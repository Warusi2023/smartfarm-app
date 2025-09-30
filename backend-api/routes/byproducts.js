const express = require('express');
const router = express.Router();
const db = require('../database/connection');

// Get all byproducts for crops
router.get('/crops', async (req, res) => {
    try {
        const { cropType } = req.query;
        
        let query = `
            SELECT 
                c.id,
                c.name,
                c.variety,
                c.category,
                c.plantingDate,
                c.expectedHarvestDate,
                c.quantity,
                c.unit,
                c.status,
                c.fieldType,
                c.area,
                c.location,
                c.notes,
                c.createdAt,
                c.updatedAt,
                u.name as farmerName,
                u.email as farmerEmail
            FROM crops c
            LEFT JOIN users u ON c.userId = u.id
            WHERE c.userId = ?
        `;
        
        const params = [req.user.id];
        
        if (cropType) {
            query += ' AND c.category = ?';
            params.push(cropType);
        }
        
        query += ' ORDER BY c.createdAt DESC';
        
        const crops = await db.all(query, params);
        
        // Add byproducts data for each crop
        const cropsWithByproducts = crops.map(crop => {
            const byproducts = getCropByproducts(crop.name.toLowerCase().replace(/\s+/g, '_'));
            return {
                ...crop,
                byproducts: byproducts,
                potentialRevenue: calculatePotentialRevenue(byproducts, crop.quantity || 0)
            };
        });
        
        res.json({
            success: true,
            data: cropsWithByproducts
        });
    } catch (error) {
        console.error('Error fetching crops with byproducts:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch crops with byproducts'
        });
    }
});

// Get all byproducts for livestock
router.get('/livestock', async (req, res) => {
    try {
        const { animalType } = req.query;
        
        let query = `
            SELECT 
                l.id,
                l.animalType,
                l.breed,
                l.sex,
                l.age,
                l.weight,
                l.productionPurpose,
                l.lifecycleStage,
                l.breedingStatus,
                l.healthStatus,
                l.location,
                l.notes,
                l.createdAt,
                l.updatedAt,
                u.name as farmerName,
                u.email as farmerEmail
            FROM livestock l
            LEFT JOIN users u ON l.userId = u.id
            WHERE l.userId = ?
        `;
        
        const params = [req.user.id];
        
        if (animalType) {
            query += ' AND l.animalType = ?';
            params.push(animalType);
        }
        
        query += ' ORDER BY l.createdAt DESC';
        
        const livestock = await db.all(query, params);
        
        // Add byproducts data for each livestock
        const livestockWithByproducts = livestock.map(animal => {
            const byproducts = getLivestockByproducts(animal.animalType.toLowerCase());
            return {
                ...animal,
                byproducts: byproducts,
                potentialRevenue: calculatePotentialRevenue(byproducts, 1) // Assuming 1 unit per animal
            };
        });
        
        res.json({
            success: true,
            data: livestockWithByproducts
        });
    } catch (error) {
        console.error('Error fetching livestock with byproducts:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch livestock with byproducts'
        });
    }
});

// Get byproducts for a specific crop
router.get('/crops/:cropId/byproducts', async (req, res) => {
    try {
        const { cropId } = req.params;
        
        const crop = await db.get(
            'SELECT * FROM crops WHERE id = ? AND userId = ?',
            [cropId, req.user.id]
        );
        
        if (!crop) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found'
            });
        }
        
        const byproducts = getCropByproducts(crop.name.toLowerCase().replace(/\s+/g, '_'));
        const potentialRevenue = calculatePotentialRevenue(byproducts, crop.quantity || 0);
        
        res.json({
            success: true,
            data: {
                crop: crop,
                byproducts: byproducts,
                potentialRevenue: potentialRevenue
            }
        });
    } catch (error) {
        console.error('Error fetching crop byproducts:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch crop byproducts'
        });
    }
});

// Get byproducts for a specific livestock
router.get('/livestock/:livestockId/byproducts', async (req, res) => {
    try {
        const { livestockId } = req.params;
        
        const livestock = await db.get(
            'SELECT * FROM livestock WHERE id = ? AND userId = ?',
            [livestockId, req.user.id]
        );
        
        if (!livestock) {
            return res.status(404).json({
                success: false,
                error: 'Livestock not found'
            });
        }
        
        const byproducts = getLivestockByproducts(livestock.animalType.toLowerCase());
        const potentialRevenue = calculatePotentialRevenue(byproducts, 1);
        
        res.json({
            success: true,
            data: {
                livestock: livestock,
                byproducts: byproducts,
                potentialRevenue: potentialRevenue
            }
        });
    } catch (error) {
        console.error('Error fetching livestock byproducts:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch livestock byproducts'
        });
    }
});

// Create a byproduct processing plan
router.post('/processing-plans', async (req, res) => {
    try {
        const {
            sourceType, // 'crop' or 'livestock'
            sourceId,
            byproductName,
            quantity,
            processingMethod,
            equipment,
            targetMarket,
            expectedRevenue,
            processingDate,
            notes
        } = req.body;
        
        const planId = `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        await db.run(`
            INSERT INTO byproduct_processing_plans (
                id, userId, sourceType, sourceId, byproductName, quantity,
                processingMethod, equipment, targetMarket, expectedRevenue,
                processingDate, notes, status, createdAt, updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            planId, req.user.id, sourceType, sourceId, byproductName, quantity,
            processingMethod, equipment, targetMarket, expectedRevenue,
            processingDate, notes, 'planned', new Date().toISOString(), new Date().toISOString()
        ]);
        
        res.json({
            success: true,
            data: {
                id: planId,
                message: 'Processing plan created successfully'
            }
        });
    } catch (error) {
        console.error('Error creating processing plan:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create processing plan'
        });
    }
});

// Get processing plans
router.get('/processing-plans', async (req, res) => {
    try {
        const { status } = req.query;
        
        let query = `
            SELECT 
                p.*,
                c.name as cropName,
                l.animalType as livestockType
            FROM byproduct_processing_plans p
            LEFT JOIN crops c ON p.sourceType = 'crop' AND p.sourceId = c.id
            LEFT JOIN livestock l ON p.sourceType = 'livestock' AND p.sourceId = l.id
            WHERE p.userId = ?
        `;
        
        const params = [req.user.id];
        
        if (status) {
            query += ' AND p.status = ?';
            params.push(status);
        }
        
        query += ' ORDER BY p.createdAt DESC';
        
        const plans = await db.all(query, params);
        
        res.json({
            success: true,
            data: plans
        });
    } catch (error) {
        console.error('Error fetching processing plans:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch processing plans'
        });
    }
});

// Update processing plan status
router.put('/processing-plans/:planId/status', async (req, res) => {
    try {
        const { planId } = req.params;
        const { status, notes } = req.body;
        
        await db.run(
            'UPDATE byproduct_processing_plans SET status = ?, notes = ?, updatedAt = ? WHERE id = ? AND userId = ?',
            [status, notes, new Date().toISOString(), planId, req.user.id]
        );
        
        res.json({
            success: true,
            message: 'Processing plan status updated successfully'
        });
    } catch (error) {
        console.error('Error updating processing plan status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update processing plan status'
        });
    }
});

// Get market recommendations
router.get('/market-recommendations', async (req, res) => {
    try {
        const { category, location } = req.query;
        
        // This would typically query a market database or external API
        const recommendations = getMarketRecommendations(category, location);
        
        res.json({
            success: true,
            data: recommendations
        });
    } catch (error) {
        console.error('Error fetching market recommendations:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch market recommendations'
        });
    }
});

// Get processing equipment recommendations
router.get('/equipment-recommendations', async (req, res) => {
    try {
        const { byproductTypes } = req.query;
        
        const equipment = getEquipmentRecommendations(byproductTypes ? byproductTypes.split(',') : []);
        
        res.json({
            success: true,
            data: equipment
        });
    } catch (error) {
        console.error('Error fetching equipment recommendations:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch equipment recommendations'
        });
    }
});

// Helper functions
function getCropByproducts(cropName) {
    const byproductsDatabase = {
        cassava: [
            {
                name: "Cassava Flour",
                category: "Food Processing",
                description: "High-quality flour for baking and cooking",
                marketValue: 2.50,
                processingMethod: "Drying and grinding",
                equipment: ["Drying racks", "Grinding mill"],
                shelfLife: "12 months",
                targetMarket: "Bakeries, restaurants, households"
            },
            {
                name: "Cassava Starch",
                category: "Industrial",
                description: "Pure starch for industrial applications",
                marketValue: 3.20,
                processingMethod: "Washing, extraction, drying",
                equipment: ["Starch extractor", "Centrifuge", "Dryer"],
                shelfLife: "24 months",
                targetMarket: "Food industry, textile, paper"
            },
            {
                name: "Cassava Chips",
                category: "Snack Food",
                description: "Crispy chips for snacking",
                marketValue: 4.00,
                processingMethod: "Slicing, frying, seasoning",
                equipment: ["Slicer", "Deep fryer", "Seasoning mixer"],
                shelfLife: "6 months",
                targetMarket: "Retail stores, snack distributors"
            }
        ],
        taro: [
            {
                name: "Taro Flour",
                category: "Food Processing",
                description: "Gluten-free flour alternative",
                marketValue: 3.50,
                processingMethod: "Peeling, drying, grinding",
                equipment: ["Peeler", "Drying racks", "Grinding mill"],
                shelfLife: "12 months",
                targetMarket: "Health food stores, gluten-free bakeries"
            },
            {
                name: "Taro Chips",
                category: "Snack Food",
                description: "Purple chips with unique flavor",
                marketValue: 4.50,
                processingMethod: "Slicing, frying, seasoning",
                equipment: ["Slicer", "Deep fryer", "Seasoning mixer"],
                shelfLife: "6 months",
                targetMarket: "Specialty food stores, online retailers"
            }
        ],
        sweet_potato: [
            {
                name: "Sweet Potato Flour",
                category: "Food Processing",
                description: "Natural sweetener and thickener",
                marketValue: 3.00,
                processingMethod: "Washing, drying, grinding",
                equipment: ["Washing station", "Drying racks", "Grinding mill"],
                shelfLife: "12 months",
                targetMarket: "Baking industry, health food stores"
            },
            {
                name: "Sweet Potato Chips",
                category: "Snack Food",
                description: "Orange chips with natural sweetness",
                marketValue: 3.80,
                processingMethod: "Slicing, frying, seasoning",
                equipment: ["Slicer", "Deep fryer", "Seasoning mixer"],
                shelfLife: "6 months",
                targetMarket: "Retail stores, snack distributors"
            }
        ],
        banana: [
            {
                name: "Banana Chips",
                category: "Snack Food",
                description: "Crispy dried banana chips",
                marketValue: 6.00,
                processingMethod: "Slicing, drying, seasoning",
                equipment: ["Slicer", "Dehydrator", "Seasoning mixer"],
                shelfLife: "12 months",
                targetMarket: "Retail stores, snack distributors"
            },
            {
                name: "Banana Flour",
                category: "Food Processing",
                description: "Gluten-free flour from green bananas",
                marketValue: 4.50,
                processingMethod: "Peeling, drying, grinding",
                equipment: ["Peeler", "Drying racks", "Grinding mill"],
                shelfLife: "18 months",
                targetMarket: "Health food stores, gluten-free bakeries"
            }
        ],
        kava: [
            {
                name: "Kava Powder",
                category: "Beverage",
                description: "Traditional ceremonial drink powder",
                marketValue: 12.00,
                processingMethod: "Drying, grinding",
                equipment: ["Drying racks", "Grinding mill"],
                shelfLife: "24 months",
                targetMarket: "Traditional medicine stores, cultural centers"
            },
            {
                name: "Kava Extract",
                category: "Supplements",
                description: "Concentrated liquid extract",
                marketValue: 25.00,
                processingMethod: "Extraction, concentration",
                equipment: ["Extraction equipment", "Concentrator"],
                shelfLife: "36 months",
                targetMarket: "Health supplement stores, online retailers"
            }
        ]
    };
    
    return byproductsDatabase[cropName] || [];
}

function getLivestockByproducts(animalType) {
    const byproductsDatabase = {
        cattle: [
            {
                name: "Leather",
                category: "Manufacturing",
                description: "High-quality leather for products",
                marketValue: 50.00,
                processingMethod: "Tanning, finishing",
                equipment: ["Tanning facility", "Finishing equipment"],
                shelfLife: "Indefinite",
                targetMarket: "Leather goods manufacturers, fashion industry"
            },
            {
                name: "Bone Meal",
                category: "Fertilizer",
                description: "Nutrient-rich organic fertilizer",
                marketValue: 2.00,
                processingMethod: "Grinding, processing",
                equipment: ["Grinding mill", "Processing equipment"],
                shelfLife: "24 months",
                targetMarket: "Garden centers, organic farms"
            }
        ],
        goats: [
            {
                name: "Goat Cheese",
                category: "Dairy",
                description: "Artisanal goat cheese varieties",
                marketValue: 12.00,
                processingMethod: "Cheese making, aging",
                equipment: ["Cheese making equipment", "Aging room"],
                shelfLife: "3 months",
                targetMarket: "Specialty food stores, restaurants"
            },
            {
                name: "Goat Milk Soap",
                category: "Cosmetics",
                description: "Moisturizing soap with goat milk",
                marketValue: 6.00,
                processingMethod: "Soap making, curing",
                equipment: ["Soap making equipment", "Curing racks"],
                shelfLife: "24 months",
                targetMarket: "Cosmetic stores, online retailers"
            }
        ],
        chickens: [
            {
                name: "Feathers",
                category: "Manufacturing",
                description: "Down feathers for pillows and comforters",
                marketValue: 2.50,
                processingMethod: "Cleaning, sorting, processing",
                equipment: ["Cleaning equipment", "Sorting machine"],
                shelfLife: "Indefinite",
                targetMarket: "Bedding manufacturers, craft suppliers"
            },
            {
                name: "Chicken Manure",
                category: "Fertilizer",
                description: "High-nitrogen organic fertilizer",
                marketValue: 1.50,
                processingMethod: "Composting, packaging",
                equipment: ["Composting facility", "Packaging equipment"],
                shelfLife: "12 months",
                targetMarket: "Garden centers, organic farms"
            }
        ]
    };
    
    return byproductsDatabase[animalType] || [];
}

function calculatePotentialRevenue(byproducts, quantity) {
    return byproducts.map(byproduct => ({
        ...byproduct,
        potentialRevenue: byproduct.marketValue * quantity,
        roi: ((byproduct.marketValue - 0.5) / 0.5) * 100
    }));
}

function getMarketRecommendations(category, location) {
    // This would typically query a market database
    return {
        local: [
            "Farmers markets",
            "Local restaurants",
            "Community cooperatives"
        ],
        regional: [
            "Grocery store chains",
            "Food distributors",
            "Specialty food stores"
        ],
        national: [
            "National retailers",
            "Export companies",
            "E-commerce platforms"
        ]
    };
}

function getEquipmentRecommendations(byproductTypes) {
    return {
        drying: ["Solar dryers", "Dehydrators", "Drying racks"],
        grinding: ["Hammer mills", "Grinding mills", "Pulverizers"],
        packaging: ["Vacuum sealers", "Labeling machines", "Packaging equipment"],
        preservation: ["Freezers", "Canning equipment", "Fermentation tanks"]
    };
}

module.exports = router;

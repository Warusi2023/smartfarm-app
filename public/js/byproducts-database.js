// SmartFarm Byproducts Database
// Comprehensive database of byproducts for crops and livestock to help farmers maximize revenue

window.ByproductsDatabase = {
    // Crop Byproducts Database
    crops: {
        // Root Vegetables
        cassava: {
            primary: "Fresh Cassava",
            byproducts: [
                {
                    name: "Cassava Flour",
                    category: "Food Processing",
                    description: "High-quality flour for baking and cooking",
                    marketValue: 2.50,
                    processingMethod: "Drying and grinding",
                    equipment: ["Drying racks", "Grinding mill"],
                    shelfLife: "12 months",
                    targetMarket: "Bakeries, restaurants, households",
                    processingSteps: [
                        "Harvest and wash fresh cassava roots",
                        "Peel and cut into small pieces",
                        "Dry under sunlight for 3-5 days or use mechanical dryer",
                        "Grind dried pieces into fine flour",
                        "Sift to remove any impurities",
                        "Package in airtight containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 35,
                        unit: "kg",
                        outputPer100kg: 35,
                        estimatedRevenuePer100kg: 87.50,
                        processingTime: "5-7 days",
                        laborRequired: "2-3 workers"
                    }
                },
                {
                    name: "Cassava Starch",
                    category: "Industrial",
                    description: "Pure starch for industrial applications",
                    marketValue: 3.20,
                    processingMethod: "Washing, extraction, drying",
                    equipment: ["Starch extractor", "Centrifuge", "Dryer"],
                    shelfLife: "24 months",
                    targetMarket: "Food industry, textile, paper",
                    processingSteps: [
                        "Wash and grate fresh cassava roots",
                        "Extract starch by washing and filtering",
                        "Allow starch to settle for 24 hours",
                        "Separate water from starch using centrifuge",
                        "Dry starch in mechanical dryer",
                        "Package in moisture-proof containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 20,
                        unit: "kg",
                        outputPer100kg: 20,
                        estimatedRevenuePer100kg: 64.00,
                        processingTime: "7-10 days",
                        laborRequired: "3-4 workers"
                    }
                },
                {
                    name: "Cassava Chips",
                    category: "Snack Food",
                    description: "Crispy chips for snacking",
                    marketValue: 4.00,
                    processingMethod: "Slicing, frying, seasoning",
                    equipment: ["Slicer", "Deep fryer", "Seasoning mixer"],
                    shelfLife: "6 months",
                    targetMarket: "Retail stores, snack distributors",
                    processingSteps: [
                        "Wash and peel fresh cassava roots",
                        "Slice into thin uniform chips (2-3mm)",
                        "Rinse to remove excess starch",
                        "Deep fry at 180°C until golden and crisp",
                        "Drain excess oil",
                        "Season with salt or desired spices",
                        "Cool completely before packaging",
                        "Package in airtight bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 40,
                        unit: "kg",
                        outputPer100kg: 40,
                        estimatedRevenuePer100kg: 160.00,
                        processingTime: "4-6 hours",
                        laborRequired: "2-3 workers"
                    }
                },
                {
                    name: "Cassava Leaves",
                    category: "Animal Feed",
                    description: "Nutritious feed for livestock",
                    marketValue: 0.80,
                    processingMethod: "Harvesting, drying",
                    equipment: ["Harvesting tools", "Drying racks"],
                    shelfLife: "3 months",
                    targetMarket: "Local farmers, feed mills"
                }
            ]
        },
        
        taro: {
            primary: "Fresh Taro",
            byproducts: [
                {
                    name: "Taro Flour",
                    category: "Food Processing",
                    description: "Gluten-free flour alternative",
                    marketValue: 3.50,
                    processingMethod: "Peeling, drying, grinding",
                    equipment: ["Peeler", "Drying racks", "Grinding mill"],
                    shelfLife: "12 months",
                    targetMarket: "Health food stores, gluten-free bakeries",
                    processingSteps: [
                        "Wash taro corms thoroughly",
                        "Peel carefully to remove all skin",
                        "Cut into small uniform pieces",
                        "Dry in sunlight for 5-7 days or use dehydrator",
                        "Grind dried pieces into fine powder",
                        "Sift through fine mesh to remove impurities",
                        "Package in moisture-proof containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 30,
                        unit: "kg",
                        outputPer100kg: 30,
                        estimatedRevenuePer100kg: 105.00,
                        processingTime: "7-10 days",
                        laborRequired: "2-3 workers"
                    }
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
                },
                {
                    name: "Taro Leaves",
                    category: "Vegetable",
                    description: "Edible leaves for cooking",
                    marketValue: 2.00,
                    processingMethod: "Harvesting, cleaning, packaging",
                    equipment: ["Harvesting tools", "Washing station"],
                    shelfLife: "1 week",
                    targetMarket: "Local markets, restaurants"
                }
            ]
        },
        
        sweet_potato: {
            primary: "Fresh Sweet Potato",
            byproducts: [
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
                },
                {
                    name: "Sweet Potato Vine",
                    category: "Animal Feed",
                    description: "Nutritious feed for livestock",
                    marketValue: 0.60,
                    processingMethod: "Harvesting, chopping",
                    equipment: ["Harvesting tools", "Chopper"],
                    shelfLife: "2 weeks",
                    targetMarket: "Local farmers, feed suppliers"
                }
            ]
        },
        
        // Leafy Vegetables
        spinach: {
            primary: "Fresh Spinach",
            byproducts: [
                {
                    name: "Dried Spinach Powder",
                    category: "Food Processing",
                    description: "Nutrient-dense powder for smoothies",
                    marketValue: 8.00,
                    processingMethod: "Washing, drying, grinding",
                    equipment: ["Washing station", "Dehydrator", "Grinding mill"],
                    shelfLife: "24 months",
                    targetMarket: "Health food stores, supplement companies"
                },
                {
                    name: "Frozen Spinach",
                    category: "Frozen Food",
                    description: "Blanched and frozen spinach",
                    marketValue: 2.50,
                    processingMethod: "Blanching, freezing, packaging",
                    equipment: ["Blanching pot", "Freezer", "Packaging machine"],
                    shelfLife: "12 months",
                    targetMarket: "Grocery stores, restaurants"
                }
            ]
        },
        
        lettuce: {
            primary: "Fresh Lettuce",
            byproducts: [
                {
                    name: "Lettuce Wraps",
                    category: "Prepared Food",
                    description: "Ready-to-eat lettuce wraps",
                    marketValue: 5.00,
                    processingMethod: "Cleaning, cutting, packaging",
                    equipment: ["Washing station", "Cutting board", "Packaging machine"],
                    shelfLife: "3 days",
                    targetMarket: "Restaurants, convenience stores"
                }
            ]
        },
        
        // Fruits
        banana: {
            primary: "Fresh Banana",
            byproducts: [
                {
                    name: "Banana Chips",
                    category: "Snack Food",
                    description: "Crispy dried banana chips",
                    marketValue: 6.00,
                    processingMethod: "Slicing, drying, seasoning",
                    equipment: ["Slicer", "Dehydrator", "Seasoning mixer"],
                    shelfLife: "12 months",
                    targetMarket: "Retail stores, snack distributors",
                    processingSteps: [
                        "Select ripe but firm bananas",
                        "Peel and slice uniformly (3-5mm thickness)",
                        "Soak in lemon juice or salt water to prevent browning",
                        "Dry in dehydrator at 60°C for 12-24 hours",
                        "Season with desired spices (optional)",
                        "Package in airtight bags with proper labeling"
                    ],
                    projectedOutput: {
                        yieldPercentage: 15,
                        unit: "kg",
                        outputPer100kg: 15,
                        estimatedRevenuePer100kg: 90.00,
                        processingTime: "2-3 days",
                        laborRequired: "2-3 workers"
                    }
                },
                {
                    name: "Banana Flour",
                    category: "Food Processing",
                    description: "Gluten-free flour from green bananas",
                    marketValue: 4.50,
                    processingMethod: "Peeling, drying, grinding",
                    equipment: ["Peeler", "Drying racks", "Grinding mill"],
                    shelfLife: "18 months",
                    targetMarket: "Health food stores, gluten-free bakeries",
                    processingSteps: [
                        "Select green, unripe bananas",
                        "Peel and slice into thin pieces",
                        "Dry in dehydrator at 60°C for 24-36 hours",
                        "Grind dried pieces into fine flour",
                        "Sift to ensure uniform texture",
                        "Package in airtight containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 18,
                        unit: "kg",
                        outputPer100kg: 18,
                        estimatedRevenuePer100kg: 81.00,
                        processingTime: "3-4 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Banana Vinegar",
                    category: "Condiment",
                    description: "Fermented vinegar from overripe bananas",
                    marketValue: 3.50,
                    processingMethod: "Fermentation, aging",
                    equipment: ["Fermentation tanks", "Aging barrels"],
                    shelfLife: "24 months",
                    targetMarket: "Specialty food stores, restaurants"
                },
                {
                    name: "Banana Leaves",
                    category: "Packaging Material",
                    description: "Natural packaging for food",
                    marketValue: 1.50,
                    processingMethod: "Harvesting, cleaning, drying",
                    equipment: ["Harvesting tools", "Washing station"],
                    shelfLife: "6 months",
                    targetMarket: "Food vendors, restaurants"
                }
            ]
        },
        
        papaya: {
            primary: "Fresh Papaya",
            byproducts: [
                {
                    name: "Papaya Jam",
                    category: "Preserves",
                    description: "Sweet jam with tropical flavor",
                    marketValue: 4.00,
                    processingMethod: "Cooking, canning",
                    equipment: ["Cooking pot", "Canning equipment"],
                    shelfLife: "12 months",
                    targetMarket: "Grocery stores, specialty food shops"
                },
                {
                    name: "Dried Papaya",
                    category: "Dried Fruit",
                    description: "Chewy dried papaya strips",
                    marketValue: 5.50,
                    processingMethod: "Slicing, drying",
                    equipment: ["Slicer", "Dehydrator"],
                    shelfLife: "12 months",
                    targetMarket: "Health food stores, snack distributors"
                },
                {
                    name: "Papaya Seeds",
                    category: "Spice",
                    description: "Peppery seeds for seasoning",
                    marketValue: 8.00,
                    processingMethod: "Extraction, drying",
                    equipment: ["Seed extractor", "Drying racks"],
                    shelfLife: "24 months",
                    targetMarket: "Spice companies, restaurants"
                }
            ]
        },
        
        // Herbs and Spices
        kava: {
            primary: "Fresh Kava Root",
            byproducts: [
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
                },
                {
                    name: "Kava Tea Bags",
                    category: "Beverage",
                    description: "Convenient tea bags for preparation",
                    marketValue: 8.00,
                    processingMethod: "Grinding, bagging",
                    equipment: ["Grinding mill", "Tea bag machine"],
                    shelfLife: "18 months",
                    targetMarket: "Tea shops, health food stores"
                }
            ]
        },
        
        ginger: {
            primary: "Fresh Ginger",
            byproducts: [
                {
                    name: "Ginger Powder",
                    category: "Spice",
                    description: "Ground ginger for cooking and baking",
                    marketValue: 6.00,
                    processingMethod: "Drying, grinding",
                    equipment: ["Drying racks", "Grinding mill"],
                    shelfLife: "24 months",
                    targetMarket: "Spice companies, grocery stores"
                },
                {
                    name: "Ginger Tea",
                    category: "Beverage",
                    description: "Dried ginger for tea preparation",
                    marketValue: 4.50,
                    processingMethod: "Slicing, drying, packaging",
                    equipment: ["Slicer", "Dehydrator", "Packaging machine"],
                    shelfLife: "18 months",
                    targetMarket: "Tea shops, health food stores"
                },
                {
                    name: "Ginger Oil",
                    category: "Essential Oil",
                    description: "Aromatherapy and culinary oil",
                    marketValue: 15.00,
                    processingMethod: "Steam distillation",
                    equipment: ["Distillation equipment"],
                    shelfLife: "36 months",
                    targetMarket: "Essential oil companies, aromatherapy stores"
                }
            ]
        }
    },
    
    // Livestock Byproducts Database
    livestock: {
        cattle: {
            primary: "Beef/Milk",
            byproducts: [
                {
                    name: "Leather",
                    category: "Manufacturing",
                    description: "High-quality leather for products",
                    marketValue: 50.00,
                    processingMethod: "Tanning, finishing",
                    equipment: ["Tanning facility", "Finishing equipment"],
                    shelfLife: "Indefinite",
                    targetMarket: "Leather goods manufacturers, fashion industry",
                    processingSteps: [
                        "Remove hide from animal immediately after slaughter",
                        "Cure hide with salt to prevent decay",
                        "Soak and clean hide to remove dirt and hair",
                        "Tan hide using vegetable tanning or chrome tanning",
                        "Dry and stretch hide",
                        "Finish and buff to desired texture",
                        "Grade and package for sale"
                    ],
                    projectedOutput: {
                        yieldPercentage: 100,
                        unit: "square feet",
                        outputPerAnimal: "40-50",
                        estimatedRevenuePerAnimal: 2000.00,
                        processingTime: "30-45 days",
                        laborRequired: "1-2 specialized workers"
                    }
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
                },
                {
                    name: "Tallow",
                    category: "Industrial",
                    description: "Rendered fat for soap and candles",
                    marketValue: 3.50,
                    processingMethod: "Rendering, filtering",
                    equipment: ["Rendering equipment", "Filtering system"],
                    shelfLife: "12 months",
                    targetMarket: "Soap manufacturers, candle makers"
                },
                {
                    name: "Gelatin",
                    category: "Food Processing",
                    description: "Cooking and pharmaceutical gelatin",
                    marketValue: 8.00,
                    processingMethod: "Extraction, purification",
                    equipment: ["Extraction equipment", "Purification system"],
                    shelfLife: "24 months",
                    targetMarket: "Food industry, pharmaceutical companies"
                }
            ]
        },
        
        goats: {
            primary: "Meat/Milk",
            byproducts: [
                {
                    name: "Goat Cheese",
                    category: "Dairy",
                    description: "Artisanal goat cheese varieties",
                    marketValue: 12.00,
                    processingMethod: "Cheese making, aging",
                    equipment: ["Cheese making equipment", "Aging room"],
                    shelfLife: "3 months",
                    targetMarket: "Specialty food stores, restaurants",
                    processingSteps: [
                        "Collect fresh goat milk and filter",
                        "Heat milk to 86°F and add starter culture",
                        "Add rennet and let curd form for 1-2 hours",
                        "Cut curd and drain whey",
                        "Salt curd and shape into desired form",
                        "Age in controlled environment for 2-12 weeks",
                        "Package and label with production date"
                    ],
                    projectedOutput: {
                        yieldPercentage: 10,
                        unit: "kg",
                        outputPer100Liters: 10,
                        estimatedRevenuePer100Liters: 120.00,
                        processingTime: "2-12 weeks",
                        laborRequired: "1-2 cheesemakers"
                    }
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
                },
                {
                    name: "Goat Hair",
                    category: "Textile",
                    description: "Cashmere and mohair fiber",
                    marketValue: 15.00,
                    processingMethod: "Shearing, cleaning, sorting",
                    equipment: ["Shearing equipment", "Cleaning facility"],
                    shelfLife: "Indefinite",
                    targetMarket: "Textile manufacturers, fashion industry"
                }
            ]
        },
        
        chickens: {
            primary: "Meat/Eggs",
            byproducts: [
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
                    targetMarket: "Garden centers, organic farms",
                    processingSteps: [
                        "Collect fresh manure from chicken coop",
                        "Mix with carbon materials (straw, sawdust)",
                        "Maintain proper moisture (40-60%)",
                        "Turn compost pile every 1-2 weeks",
                        "Monitor temperature (should reach 130-150°F)",
                        "Cure for 2-4 months until fully composted",
                        "Screen to remove large particles",
                        "Package in bags or bulk containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 70,
                        unit: "kg",
                        outputPer100kg: 70,
                        estimatedRevenuePer100kg: 105.00,
                        processingTime: "2-4 months",
                        laborRequired: "1 worker (part-time)"
                    }
                },
                {
                    name: "Eggshells",
                    category: "Fertilizer",
                    description: "Calcium-rich soil amendment",
                    marketValue: 0.50,
                    processingMethod: "Drying, grinding",
                    equipment: ["Drying racks", "Grinding mill"],
                    shelfLife: "12 months",
                    targetMarket: "Garden centers, organic farms"
                }
            ]
        },
        
        pigs: {
            primary: "Pork",
            byproducts: [
                {
                    name: "Pork Rinds",
                    category: "Snack Food",
                    description: "Crispy fried pork skin snacks",
                    marketValue: 4.50,
                    processingMethod: "Cleaning, frying, seasoning",
                    equipment: ["Cleaning equipment", "Deep fryer", "Seasoning mixer"],
                    shelfLife: "6 months",
                    targetMarket: "Snack distributors, convenience stores"
                },
                {
                    name: "Lard",
                    category: "Cooking Fat",
                    description: "Traditional cooking fat",
                    marketValue: 3.00,
                    processingMethod: "Rendering, filtering",
                    equipment: ["Rendering equipment", "Filtering system"],
                    shelfLife: "12 months",
                    targetMarket: "Restaurants, specialty food stores"
                },
                {
                    name: "Pig Bristles",
                    category: "Manufacturing",
                    description: "Natural bristles for brushes",
                    marketValue: 5.00,
                    processingMethod: "Cleaning, sorting, packaging",
                    equipment: ["Cleaning equipment", "Sorting machine"],
                    shelfLife: "Indefinite",
                    targetMarket: "Brush manufacturers, art supply stores"
                }
            ]
        }
    },
    
    // Processing Equipment Database
    equipment: {
        drying: [
            "Solar dryers",
            "Dehydrators",
            "Drying racks",
            "Tunnel dryers"
        ],
        grinding: [
            "Hammer mills",
            "Grinding mills",
            "Pulverizers",
            "Food processors"
        ],
        packaging: [
            "Vacuum sealers",
            "Labeling machines",
            "Packaging equipment",
            "Quality control systems"
        ],
        preservation: [
            "Freezers",
            "Canning equipment",
            "Fermentation tanks",
            "Aging rooms"
        ]
    },
    
    // Market Channels
    marketChannels: {
        local: [
            "Farmers markets",
            "Local restaurants",
            "Community cooperatives",
            "Direct farm sales"
        ],
        regional: [
            "Grocery store chains",
            "Food distributors",
            "Specialty food stores",
            "Online marketplaces"
        ],
        national: [
            "National retailers",
            "Export companies",
            "Industrial buyers",
            "E-commerce platforms"
        ]
    },
    
    // Revenue Optimization Tips
    optimizationTips: [
        "Process byproducts immediately after harvest to maintain quality",
        "Invest in proper storage facilities to extend shelf life",
        "Develop relationships with local buyers for consistent sales",
        "Consider value-added processing to increase profit margins",
        "Track market prices and adjust production accordingly",
        "Package products attractively for retail markets",
        "Obtain necessary certifications for organic or specialty products",
        "Explore export opportunities for high-value byproducts"
    ]
};

// Helper functions for byproducts management
window.ByproductsHelper = {
    // Get byproducts for a specific crop or livestock
    getByproducts: function(type, item) {
        if (this.crops[item]) {
            return this.crops[item].byproducts || [];
        } else if (this.livestock[item]) {
            return this.livestock[item].byproducts || [];
        }
        return [];
    },
    
    // Calculate potential revenue from byproducts
    calculateRevenue: function(byproducts, quantity) {
        return byproducts.map(byproduct => ({
            ...byproduct,
            potentialRevenue: byproduct.marketValue * quantity,
            roi: ((byproduct.marketValue - 0.5) / 0.5) * 100 // Assuming 50% processing cost
        }));
    },
    
    // Get processing recommendations
    getProcessingRecommendations: function(byproducts) {
        const equipment = new Set();
        const methods = new Set();
        
        byproducts.forEach(byproduct => {
            if (byproduct.equipment) {
                byproduct.equipment.forEach(eq => equipment.add(eq));
            }
            if (byproduct.processingMethod) {
                methods.add(byproduct.processingMethod);
            }
        });
        
        return {
            equipment: Array.from(equipment),
            methods: Array.from(methods)
        };
    },
    
    // Get market recommendations
    getMarketRecommendations: function(byproducts) {
        const markets = new Set();
        
        byproducts.forEach(byproduct => {
            if (byproduct.targetMarket) {
                byproduct.targetMarket.split(', ').forEach(market => markets.add(market.trim()));
            }
        });
        
        return Array.from(markets);
    }
};

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
                    targetMarket: "Specialty food stores, online retailers",
                    processingSteps: [
                        "Wash and peel taro corms thoroughly",
                        "Slice uniformly (2-3mm thickness) using slicer",
                        "Rinse slices to remove excess starch",
                        "Deep fry at 180°C until golden and crisp",
                        "Drain excess oil on paper towels",
                        "Season with salt or desired spices while still warm",
                        "Cool completely to room temperature",
                        "Package in airtight bags with proper labeling",
                        "Store in cool, dry place"
                    ],
                    projectedOutput: {
                        yieldPercentage: 40,
                        unit: "kg",
                        outputPer100kg: 40,
                        estimatedRevenuePer100kg: 180.00,
                        processingTime: "4-6 hours",
                        laborRequired: "2-3 workers"
                    }
                },
                {
                    name: "Taro Leaves",
                    category: "Vegetable",
                    description: "Edible leaves for cooking",
                    marketValue: 2.00,
                    processingMethod: "Harvesting, cleaning, packaging",
                    equipment: ["Harvesting tools", "Washing station"],
                    shelfLife: "1 week",
                    targetMarket: "Local markets, restaurants",
                    processingSteps: [
                        "Harvest young, tender taro leaves",
                        "Wash thoroughly to remove dirt and debris",
                        "Inspect and remove damaged or discolored leaves",
                        "Bundle leaves in uniform sizes",
                        "Package in breathable containers or bags",
                        "Label with harvest date and storage instructions",
                        "Store in cool, humid environment",
                        "Distribute to market within 24-48 hours"
                    ],
                    projectedOutput: {
                        yieldPercentage: 85,
                        unit: "kg",
                        outputPer100kg: 85,
                        estimatedRevenuePer100kg: 170.00,
                        processingTime: "2-3 hours",
                        laborRequired: "2 workers"
                    }
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
                    targetMarket: "Baking industry, health food stores",
                    processingSteps: [
                        "Wash sweet potatoes thoroughly to remove dirt",
                        "Peel and cut into small uniform pieces",
                        "Dry in sunlight for 5-7 days or use mechanical dehydrator at 60°C",
                        "Grind dried pieces into fine powder using grinding mill",
                        "Sift through fine mesh to remove impurities and ensure uniform texture",
                        "Package in moisture-proof containers with proper labeling",
                        "Store in cool, dry place away from direct sunlight"
                    ],
                    projectedOutput: {
                        yieldPercentage: 30,
                        unit: "kg",
                        outputPer100kg: 30,
                        estimatedRevenuePer100kg: 90.00,
                        processingTime: "7-10 days",
                        laborRequired: "2-3 workers"
                    }
                },
                {
                    name: "Sweet Potato Chips",
                    category: "Snack Food",
                    description: "Orange chips with natural sweetness",
                    marketValue: 3.80,
                    processingMethod: "Slicing, frying, seasoning",
                    equipment: ["Slicer", "Deep fryer", "Seasoning mixer"],
                    shelfLife: "6 months",
                    targetMarket: "Retail stores, snack distributors",
                    processingSteps: [
                        "Wash and peel sweet potatoes",
                        "Slice uniformly (2-3mm thickness) using slicer",
                        "Rinse slices to remove excess starch",
                        "Deep fry at 180°C until golden and crisp (or bake at 200°C for healthier option)",
                        "Drain excess oil on paper towels",
                        "Season with salt or desired spices while still warm",
                        "Cool completely to room temperature",
                        "Package in airtight bags with proper labeling",
                        "Store in cool, dry place"
                    ],
                    projectedOutput: {
                        yieldPercentage: 40,
                        unit: "kg",
                        outputPer100kg: 40,
                        estimatedRevenuePer100kg: 152.00,
                        processingTime: "4-6 hours",
                        laborRequired: "2-3 workers"
                    }
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
                    targetMarket: "Health food stores, supplement companies",
                    processingSteps: [
                        "Harvest fresh spinach leaves at peak quality",
                        "Wash thoroughly to remove dirt and debris",
                        "Blanch in boiling water for 30 seconds",
                        "Immediately transfer to ice water bath",
                        "Drain excess water completely",
                        "Dry in dehydrator at 50°C for 8-12 hours until crisp",
                        "Grind dried leaves into fine powder",
                        "Sift through fine mesh to ensure uniform texture",
                        "Package in moisture-proof containers",
                        "Store in cool, dry place away from light"
                    ],
                    projectedOutput: {
                        yieldPercentage: 8,
                        unit: "kg",
                        outputPer100kg: 8,
                        estimatedRevenuePer100kg: 64.00,
                        processingTime: "1-2 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Frozen Spinach",
                    category: "Frozen Food",
                    description: "Blanched and frozen spinach",
                    marketValue: 2.50,
                    processingMethod: "Blanching, freezing, packaging",
                    equipment: ["Blanching pot", "Freezer", "Packaging machine"],
                    shelfLife: "12 months",
                    targetMarket: "Grocery stores, restaurants",
                    processingSteps: [
                        "Harvest fresh spinach leaves",
                        "Wash thoroughly to remove dirt and debris",
                        "Inspect and remove damaged leaves",
                        "Blanch in boiling water for 2-3 minutes",
                        "Immediately transfer to ice water bath to stop cooking",
                        "Drain excess water completely",
                        "Portion into freezer-safe containers or bags",
                        "Remove air from bags (vacuum seal if possible)",
                        "Label with date and contents",
                        "Freeze at -18°C or below",
                        "Store frozen until ready to use"
                    ],
                    projectedOutput: {
                        yieldPercentage: 85,
                        unit: "kg",
                        outputPer100kg: 85,
                        estimatedRevenuePer100kg: 212.50,
                        processingTime: "3-4 hours",
                        laborRequired: "2-3 workers"
                    }
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
                    targetMarket: "Restaurants, convenience stores",
                    processingSteps: [
                        "Select fresh, crisp lettuce heads",
                        "Wash thoroughly in cold water",
                        "Remove outer damaged leaves",
                        "Cut into uniform wrap-sized pieces",
                        "Dry leaves completely using salad spinner or paper towels",
                        "Inspect for quality and consistency",
                        "Package in food-safe containers with proper ventilation",
                        "Label with preparation date, ingredients, and storage instructions",
                        "Refrigerate at 4°C or below",
                        "Follow food safety guidelines throughout processing"
                    ],
                    projectedOutput: {
                        yieldPercentage: 75,
                        unit: "kg",
                        outputPer100kg: 75,
                        estimatedRevenuePer100kg: 375.00,
                        processingTime: "2-3 hours",
                        laborRequired: "2-3 workers"
                    }
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
                    targetMarket: "Specialty food stores, restaurants",
                    processingSteps: [
                        "Select overripe bananas",
                        "Peel and mash bananas thoroughly",
                        "Add water and sugar to create mash",
                        "Transfer to fermentation tank",
                        "Add yeast or starter culture",
                        "Cover and allow primary fermentation for 7-14 days",
                        "Strain liquid from solids",
                        "Transfer to aging barrel for secondary fermentation",
                        "Age for 2-3 months, stirring occasionally",
                        "Filter to remove sediment",
                        "Bottle and label with production date",
                        "Store in cool, dark place"
                    ],
                    projectedOutput: {
                        yieldPercentage: 60,
                        unit: "liters",
                        outputPer100kg: 60,
                        estimatedRevenuePer100kg: 210.00,
                        processingTime: "3-4 months",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Banana Leaves",
                    category: "Packaging Material",
                    description: "Natural packaging for food",
                    marketValue: 1.50,
                    processingMethod: "Harvesting, cleaning, drying",
                    equipment: ["Harvesting tools", "Washing station"],
                    shelfLife: "6 months",
                    targetMarket: "Food vendors, restaurants",
                    processingSteps: [
                        "Harvest mature banana leaves",
                        "Cut leaves into desired sizes",
                        "Wash thoroughly to remove dirt and debris",
                        "Dry in sunlight for 2-3 days",
                        "Press flat to remove wrinkles",
                        "Bundle leaves in uniform sizes",
                        "Package in breathable containers",
                        "Label with harvest date",
                        "Store in dry, well-ventilated area"
                    ],
                    projectedOutput: {
                        yieldPercentage: 90,
                        unit: "bundles",
                        outputPer100kg: 90,
                        estimatedRevenuePer100kg: 135.00,
                        processingTime: "3-4 days",
                        laborRequired: "1-2 workers"
                    }
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
                    targetMarket: "Grocery stores, specialty food shops",
                    processingSteps: [
                        "Select ripe papayas",
                        "Wash and peel papayas",
                        "Remove seeds and cut into small pieces",
                        "Cook papaya pieces with sugar and lemon juice",
                        "Add pectin and continue cooking until soft",
                        "Mash or blend to desired consistency",
                        "Continue cooking until mixture reaches gel point (105°C)",
                        "Test for proper set using cold plate test",
                        "Skim off any foam",
                        "Fill sterilized jars while hot, leaving 1/4 inch headspace",
                        "Process in water bath for 10-15 minutes",
                        "Cool jars completely and check seals",
                        "Label and store in cool, dark place"
                    ],
                    projectedOutput: {
                        yieldPercentage: 65,
                        unit: "kg",
                        outputPer100kg: 65,
                        estimatedRevenuePer100kg: 260.00,
                        processingTime: "3-4 hours",
                        laborRequired: "2-3 workers"
                    }
                },
                {
                    name: "Dried Papaya",
                    category: "Dried Fruit",
                    description: "Chewy dried papaya strips",
                    marketValue: 5.50,
                    processingMethod: "Slicing, drying",
                    equipment: ["Slicer", "Dehydrator"],
                    shelfLife: "12 months",
                    targetMarket: "Health food stores, snack distributors",
                    processingSteps: [
                        "Select ripe but firm papayas",
                        "Wash and peel papayas",
                        "Remove seeds and cut into uniform strips (1-2cm wide)",
                        "Pre-treat with lemon juice to prevent browning",
                        "Arrange strips on dehydrator trays",
                        "Dry in dehydrator at 60°C for 12-18 hours",
                        "Check for proper moisture content (should be chewy, not brittle)",
                        "Cool completely before packaging",
                        "Package in airtight containers or vacuum seal",
                        "Store in cool, dry place"
                    ],
                    projectedOutput: {
                        yieldPercentage: 20,
                        unit: "kg",
                        outputPer100kg: 20,
                        estimatedRevenuePer100kg: 110.00,
                        processingTime: "2-3 days",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Papaya Seeds",
                    category: "Spice",
                    description: "Peppery seeds for seasoning",
                    marketValue: 8.00,
                    processingMethod: "Extraction, drying",
                    equipment: ["Seed extractor", "Drying racks"],
                    shelfLife: "24 months",
                    targetMarket: "Spice companies, restaurants",
                    processingSteps: [
                        "Extract seeds from ripe papayas",
                        "Wash seeds thoroughly to remove pulp",
                        "Dry seeds in sunlight for 3-5 days or use dehydrator",
                        "Grind seeds to desired consistency (coarse or fine)",
                        "Package in airtight containers",
                        "Label with extraction date and usage instructions",
                        "Store in cool, dry place away from light"
                    ],
                    projectedOutput: {
                        yieldPercentage: 2,
                        unit: "kg",
                        outputPer100kg: 2,
                        estimatedRevenuePer100kg: 16.00,
                        processingTime: "5-7 days",
                        laborRequired: "1 worker"
                    }
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
                    targetMarket: "Traditional medicine stores, cultural centers",
                    processingSteps: [
                        "Harvest mature kava roots",
                        "Wash roots thoroughly to remove soil",
                        "Cut roots into small pieces",
                        "Dry in sunlight for 7-10 days or use mechanical dryer",
                        "Grind dried roots into fine powder using grinding mill",
                        "Sift to ensure uniform texture",
                        "Package in moisture-proof containers",
                        "Label with harvest date and preparation instructions",
                        "Store in cool, dry place away from light"
                    ],
                    projectedOutput: {
                        yieldPercentage: 25,
                        unit: "kg",
                        outputPer100kg: 25,
                        estimatedRevenuePer100kg: 300.00,
                        processingTime: "10-14 days",
                        laborRequired: "2-3 workers"
                    }
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
                    targetMarket: "Spice companies, grocery stores",
                    processingSteps: [
                        "Select mature ginger rhizomes",
                        "Wash and clean thoroughly",
                        "Peel ginger to remove skin",
                        "Cut into thin slices or small pieces",
                        "Dry in sunlight for 5-7 days or use dehydrator at 50°C",
                        "Grind dried ginger into fine powder",
                        "Sift to ensure uniform texture",
                        "Package in airtight containers",
                        "Label with production date",
                        "Store in cool, dry place away from light"
                    ],
                    projectedOutput: {
                        yieldPercentage: 20,
                        unit: "kg",
                        outputPer100kg: 20,
                        estimatedRevenuePer100kg: 120.00,
                        processingTime: "7-10 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Ginger Tea",
                    category: "Beverage",
                    description: "Dried ginger for tea preparation",
                    marketValue: 4.50,
                    processingMethod: "Slicing, drying, packaging",
                    equipment: ["Slicer", "Dehydrator", "Packaging machine"],
                    shelfLife: "18 months",
                    targetMarket: "Tea shops, health food stores",
                    processingSteps: [
                        "Select fresh ginger rhizomes",
                        "Wash and clean thoroughly",
                        "Peel and slice into thin pieces (2-3mm)",
                        "Dry in dehydrator at 50-60°C for 12-18 hours",
                        "Check for proper dryness (should be brittle)",
                        "Package in airtight containers or tea bags",
                        "Label with brewing instructions",
                        "Store away from light, moisture, and strong odors"
                    ],
                    projectedOutput: {
                        yieldPercentage: 18,
                        unit: "kg",
                        outputPer100kg: 18,
                        estimatedRevenuePer100kg: 81.00,
                        processingTime: "2-3 days",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Ginger Oil",
                    category: "Essential Oil",
                    description: "Aromatherapy and culinary oil",
                    marketValue: 15.00,
                    processingMethod: "Steam distillation",
                    equipment: ["Distillation equipment"],
                    shelfLife: "36 months",
                    targetMarket: "Essential oil companies, aromatherapy stores",
                    processingSteps: [
                        "Prepare fresh ginger rhizomes",
                        "Wash and clean thoroughly",
                        "Chop or grate ginger into small pieces",
                        "Load into steam distillation equipment",
                        "Distill at appropriate temperature and pressure",
                        "Collect essential oil from condenser",
                        "Separate oil from water",
                        "Filter to remove any sediment",
                        "Store in dark glass bottles",
                        "Label with extraction date, method, and usage instructions",
                        "Store in cool, dark place"
                    ],
                    projectedOutput: {
                        yieldPercentage: 2,
                        unit: "liters",
                        outputPer100kg: 2,
                        estimatedRevenuePer100kg: 30.00,
                        processingTime: "4-6 hours",
                        laborRequired: "2 workers"
                    }
                }
            ]
        },
        
        // Additional Vegetables
        tomato: {
            primary: "Fresh Tomatoes",
            byproducts: [
                {
                    name: "Tomato Sauce",
                    category: "Food Processing",
                    description: "Rich tomato sauce for cooking",
                    marketValue: 3.50,
                    processingMethod: "Cooking, canning",
                    equipment: ["Cooking pot", "Canning equipment", "Blender"],
                    shelfLife: "12 months",
                    targetMarket: "Grocery stores, restaurants",
                    processingSteps: [
                        "Wash and remove stems from tomatoes",
                        "Blanch tomatoes in boiling water for 30 seconds",
                        "Peel and chop tomatoes",
                        "Cook with onions, garlic, and seasonings for 1-2 hours",
                        "Blend to desired consistency",
                        "Can or bottle while hot",
                        "Process in water bath for 40 minutes"
                    ],
                    projectedOutput: {
                        yieldPercentage: 60,
                        unit: "kg",
                        outputPer100kg: 60,
                        estimatedRevenuePer100kg: 210.00,
                        processingTime: "3-4 hours",
                        laborRequired: "2-3 workers"
                    }
                },
                {
                    name: "Tomato Paste",
                    category: "Food Processing",
                    description: "Concentrated tomato paste",
                    marketValue: 5.00,
                    processingMethod: "Cooking, reduction, canning",
                    equipment: ["Cooking pot", "Strainer", "Canning equipment"],
                    shelfLife: "24 months",
                    targetMarket: "Food manufacturers, grocery stores",
                    processingSteps: [
                        "Wash and core tomatoes",
                        "Cook tomatoes until soft",
                        "Strain to remove seeds and skin",
                        "Simmer until reduced by 50-60%",
                        "Can while hot",
                        "Process in water bath"
                    ],
                    projectedOutput: {
                        yieldPercentage: 25,
                        unit: "kg",
                        outputPer100kg: 25,
                        estimatedRevenuePer100kg: 125.00,
                        processingTime: "6-8 hours",
                        laborRequired: "2-3 workers"
                    }
                },
                {
                    name: "Sun-Dried Tomatoes",
                    category: "Preserves",
                    description: "Intensely flavored dried tomatoes",
                    marketValue: 12.00,
                    processingMethod: "Slicing, salting, drying",
                    equipment: ["Slicer", "Drying racks", "Salt"],
                    shelfLife: "12 months",
                    targetMarket: "Specialty food stores, restaurants",
                    processingSteps: [
                        "Select ripe but firm tomatoes",
                        "Cut in half and remove seeds",
                        "Salt lightly to draw out moisture",
                        "Place on drying racks in sun or dehydrator",
                        "Dry at 60°C for 12-24 hours",
                        "Pack in oil or vacuum seal"
                    ],
                    projectedOutput: {
                        yieldPercentage: 15,
                        unit: "kg",
                        outputPer100kg: 15,
                        estimatedRevenuePer100kg: 180.00,
                        processingTime: "2-3 days",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Tomato Powder",
                    category: "Food Processing",
                    description: "Dried and ground tomato powder",
                    marketValue: 8.50,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "24 months",
                    targetMarket: "Food industry, spice companies",
                    processingSteps: [
                        "Wash and slice tomatoes",
                        "Dry in dehydrator at 60°C for 24-36 hours",
                        "Grind to fine powder",
                        "Sift to remove lumps",
                        "Package in moisture-proof containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 12,
                        unit: "kg",
                        outputPer100kg: 12,
                        estimatedRevenuePer100kg: 102.00,
                        processingTime: "3-4 days",
                        laborRequired: "1-2 workers"
                    }
                }
            ]
        },
        
        potato: {
            primary: "Fresh Potatoes",
            byproducts: [
                {
                    name: "Potato Chips",
                    category: "Snack Food",
                    description: "Crispy fried potato chips",
                    marketValue: 5.50,
                    processingMethod: "Slicing, frying, seasoning",
                    equipment: ["Slicer", "Deep fryer", "Seasoning mixer"],
                    shelfLife: "6 months",
                    targetMarket: "Snack distributors, retail stores",
                    processingSteps: [
                        "Wash and peel potatoes",
                        "Slice uniformly (1-2mm thickness)",
                        "Rinse to remove excess starch",
                        "Deep fry at 180°C until golden",
                        "Drain excess oil",
                        "Season with salt or flavors",
                        "Cool and package in airtight bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 45,
                        unit: "kg",
                        outputPer100kg: 45,
                        estimatedRevenuePer100kg: 247.50,
                        processingTime: "2-3 hours",
                        laborRequired: "2-3 workers"
                    }
                },
                {
                    name: "Potato Starch",
                    category: "Industrial",
                    description: "Pure potato starch for cooking and industry",
                    marketValue: 3.50,
                    processingMethod: "Washing, extraction, drying",
                    equipment: ["Grater", "Strainer", "Settling tank", "Dryer"],
                    shelfLife: "24 months",
                    targetMarket: "Food industry, textile, paper",
                    processingSteps: [
                        "Wash and peel potatoes",
                        "Grate or blend potatoes with water",
                        "Strain to extract starch",
                        "Allow starch to settle for 24 hours",
                        "Separate and dry starch",
                        "Package in moisture-proof bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 18,
                        unit: "kg",
                        outputPer100kg: 18,
                        estimatedRevenuePer100kg: 63.00,
                        processingTime: "3-5 days",
                        laborRequired: "2-3 workers"
                    }
                },
                {
                    name: "Potato Flour",
                    category: "Food Processing",
                    description: "Gluten-free flour from potatoes",
                    marketValue: 4.00,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "12 months",
                    targetMarket: "Bakeries, health food stores",
                    processingSteps: [
                        "Wash and peel potatoes",
                        "Slice or dice potatoes",
                        "Dry in dehydrator at 60°C for 24-36 hours",
                        "Grind to fine powder",
                        "Sift to ensure uniform texture",
                        "Package in airtight containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 20,
                        unit: "kg",
                        outputPer100kg: 20,
                        estimatedRevenuePer100kg: 80.00,
                        processingTime: "3-4 days",
                        laborRequired: "2 workers"
                    }
                }
            ]
        },
        
        // Grains
        rice: {
            primary: "Raw Rice",
            byproducts: [
                {
                    name: "Rice Bran",
                    category: "Animal Feed",
                    description: "Nutritious bran for livestock feed",
                    marketValue: 1.20,
                    processingMethod: "Milling separation",
                    equipment: ["Rice mill"],
                    shelfLife: "6 months",
                    targetMarket: "Feed mills, livestock farmers",
                    processingSteps: [
                        "Process rice through mill",
                        "Separate bran from polished rice",
                        "Stabilize bran to prevent rancidity",
                        "Package in airtight bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 8,
                        unit: "kg",
                        outputPer100kg: 8,
                        estimatedRevenuePer100kg: 9.60,
                        processingTime: "1 day",
                        laborRequired: "1 worker"
                    }
                },
                {
                    name: "Rice Flour",
                    category: "Food Processing",
                    description: "Fine flour from rice grains",
                    marketValue: 3.00,
                    processingMethod: "Grinding",
                    equipment: ["Grinding mill", "Sifter"],
                    shelfLife: "12 months",
                    targetMarket: "Bakeries, gluten-free food manufacturers",
                    processingSteps: [
                        "Clean and sort rice grains",
                        "Grind to fine powder",
                        "Sift to remove larger particles",
                        "Package in moisture-proof bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 95,
                        unit: "kg",
                        outputPer100kg: 95,
                        estimatedRevenuePer100kg: 285.00,
                        processingTime: "2-3 hours",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Rice Bran Oil",
                    category: "Cooking Oil",
                    description: "Healthy cooking oil from rice bran",
                    marketValue: 6.50,
                    processingMethod: "Extraction, refining",
                    equipment: ["Oil press", "Filtering system", "Bottling"],
                    shelfLife: "12 months",
                    targetMarket: "Grocery stores, health food stores",
                    processingSteps: [
                        "Extract oil from rice bran using press",
                        "Filter to remove impurities",
                        "Refine if needed",
                        "Bottle in dark containers",
                        "Label and package"
                    ],
                    projectedOutput: {
                        yieldPercentage: 15,
                        unit: "liters",
                        outputPer100kg: 15,
                        estimatedRevenuePer100kg: 97.50,
                        processingTime: "2-3 days",
                        laborRequired: "2 workers"
                    }
                }
            ]
        },
        
        corn: {
            primary: "Fresh Corn/Maize",
            byproducts: [
                {
                    name: "Corn Flour",
                    category: "Food Processing",
                    description: "Fine flour from corn kernels",
                    marketValue: 2.80,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dryer", "Grinding mill"],
                    shelfLife: "12 months",
                    targetMarket: "Bakeries, tortilla makers, food industry",
                    processingSteps: [
                        "Remove kernels from cob",
                        "Dry kernels thoroughly",
                        "Grind to fine powder",
                        "Sift for uniform texture",
                        "Package in airtight bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 85,
                        unit: "kg",
                        outputPer100kg: 85,
                        estimatedRevenuePer100kg: 238.00,
                        processingTime: "2-3 days",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Corn Oil",
                    category: "Cooking Oil",
                    description: "Healthy vegetable oil from corn",
                    marketValue: 5.00,
                    processingMethod: "Extraction, refining",
                    equipment: ["Oil press", "Refining equipment"],
                    shelfLife: "12 months",
                    targetMarket: "Grocery stores, food manufacturers",
                    processingSteps: [
                        "Extract oil from corn germ using press",
                        "Filter and refine oil",
                        "Bottle in appropriate containers",
                        "Label and package"
                    ],
                    projectedOutput: {
                        yieldPercentage: 3,
                        unit: "liters",
                        outputPer100kg: 3,
                        estimatedRevenuePer100kg: 15.00,
                        processingTime: "2-3 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Corn Husk",
                    category: "Packaging Material",
                    description: "Natural husks for tamales and packaging",
                    marketValue: 1.50,
                    processingMethod: "Cleaning, drying",
                    equipment: ["Washing station", "Drying racks"],
                    shelfLife: "6 months",
                    targetMarket: "Food vendors, restaurants, crafts",
                    processingSteps: [
                        "Remove husks from cobs",
                        "Wash and clean husks",
                        "Dry in shade or low heat",
                        "Sort by size",
                        "Package in bundles"
                    ],
                    projectedOutput: {
                        yieldPercentage: 10,
                        unit: "kg",
                        outputPer100kg: 10,
                        estimatedRevenuePer100kg: 15.00,
                        processingTime: "3-5 days",
                        laborRequired: "1 worker"
                    }
                }
            ]
        },
        
        // Fruits
        mango: {
            primary: "Fresh Mangoes",
            byproducts: [
                {
                    name: "Mango Jam",
                    category: "Preserves",
                    description: "Sweet tropical mango jam",
                    marketValue: 4.50,
                    processingMethod: "Cooking, canning",
                    equipment: ["Cooking pot", "Canning equipment"],
                    shelfLife: "12 months",
                    targetMarket: "Grocery stores, specialty food shops",
                    processingSteps: [
                        "Wash, peel, and dice ripe mangoes",
                        "Cook with sugar and lemon juice",
                        "Stir until thick consistency",
                        "Can while hot",
                        "Process in water bath for 15 minutes"
                    ],
                    projectedOutput: {
                        yieldPercentage: 70,
                        unit: "kg",
                        outputPer100kg: 70,
                        estimatedRevenuePer100kg: 315.00,
                        processingTime: "2-3 hours",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Dried Mango",
                    category: "Dried Fruit",
                    description: "Chewy dried mango strips",
                    marketValue: 8.00,
                    processingMethod: "Slicing, drying",
                    equipment: ["Slicer", "Dehydrator"],
                    shelfLife: "12 months",
                    targetMarket: "Health food stores, snack distributors",
                    processingSteps: [
                        "Wash and peel ripe but firm mangoes",
                        "Slice into uniform strips",
                        "Dry in dehydrator at 60°C for 24-36 hours",
                        "Check for desired texture",
                        "Package in airtight bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 20,
                        unit: "kg",
                        outputPer100kg: 20,
                        estimatedRevenuePer100kg: 160.00,
                        processingTime: "2-3 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Mango Chutney",
                    category: "Condiment",
                    description: "Spicy-sweet mango chutney",
                    marketValue: 5.50,
                    processingMethod: "Cooking with spices",
                    equipment: ["Cooking pot", "Canning equipment"],
                    shelfLife: "12 months",
                    targetMarket: "Specialty food stores, restaurants",
                    processingSteps: [
                        "Dice mangoes and prepare spices",
                        "Cook with vinegar, sugar, and spices",
                        "Simmer until thick",
                        "Can while hot",
                        "Process in water bath"
                    ],
                    projectedOutput: {
                        yieldPercentage: 65,
                        unit: "kg",
                        outputPer100kg: 65,
                        estimatedRevenuePer100kg: 357.50,
                        processingTime: "3-4 hours",
                        laborRequired: "2 workers"
                    }
                }
            ]
        },
        
        pineapple: {
            primary: "Fresh Pineapple",
            byproducts: [
                {
                    name: "Pineapple Juice",
                    category: "Beverage",
                    description: "Fresh tropical pineapple juice",
                    marketValue: 3.00,
                    processingMethod: "Extraction, pasteurization",
                    equipment: ["Juicer", "Pasteurizer", "Bottling equipment"],
                    shelfLife: "6 months",
                    targetMarket: "Grocery stores, juice bars",
                    processingSteps: [
                        "Wash and peel pineapples",
                        "Extract juice using juicer",
                        "Filter to remove pulp (optional)",
                        "Pasteurize at 85°C for 30 seconds",
                        "Bottle while hot",
                        "Cool and label"
                    ],
                    projectedOutput: {
                        yieldPercentage: 50,
                        unit: "liters",
                        outputPer100kg: 50,
                        estimatedRevenuePer100kg: 150.00,
                        processingTime: "2-3 hours",
                        laborRequired: "2-3 workers"
                    }
                },
                {
                    name: "Dried Pineapple",
                    category: "Dried Fruit",
                    description: "Sweet dried pineapple rings",
                    marketValue: 7.50,
                    processingMethod: "Slicing, drying",
                    equipment: ["Slicer", "Dehydrator"],
                    shelfLife: "12 months",
                    targetMarket: "Health food stores, snack distributors",
                    processingSteps: [
                        "Peel and core pineapple",
                        "Slice into rings (1cm thick)",
                        "Dry in dehydrator at 60°C for 18-24 hours",
                        "Check for chewy texture",
                        "Package in airtight bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 18,
                        unit: "kg",
                        outputPer100kg: 18,
                        estimatedRevenuePer100kg: 135.00,
                        processingTime: "2 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Pineapple Vinegar",
                    category: "Condiment",
                    description: "Fermented pineapple vinegar",
                    marketValue: 4.00,
                    processingMethod: "Fermentation",
                    equipment: ["Fermentation vessels", "Strainer"],
                    shelfLife: "24 months",
                    targetMarket: "Specialty food stores, restaurants",
                    processingSteps: [
                        "Use pineapple peels and cores",
                        "Mix with water and sugar",
                        "Ferment for 2-3 weeks",
                        "Strain and age for 2-4 weeks",
                        "Bottle and label"
                    ],
                    projectedOutput: {
                        yieldPercentage: 60,
                        unit: "liters",
                        outputPer100kg: 60,
                        estimatedRevenuePer100kg: 240.00,
                        processingTime: "4-7 weeks",
                        laborRequired: "1 worker (part-time)"
                    }
                }
            ]
        },
        
        orange: {
            primary: "Fresh Oranges",
            byproducts: [
                {
                    name: "Orange Juice",
                    category: "Beverage",
                    description: "Fresh squeezed orange juice",
                    marketValue: 4.00,
                    processingMethod: "Extraction, pasteurization",
                    equipment: ["Juicer", "Pasteurizer", "Bottling"],
                    shelfLife: "1 week (fresh) or 6 months (pasteurized)",
                    targetMarket: "Grocery stores, juice bars",
                    processingSteps: [
                        "Wash and peel oranges",
                        "Extract juice using juicer",
                        "Strain to remove pulp (optional)",
                        "Pasteurize at 85°C for 30 seconds",
                        "Bottle and cool",
                        "Refrigerate or store"
                    ],
                    projectedOutput: {
                        yieldPercentage: 45,
                        unit: "liters",
                        outputPer100kg: 45,
                        estimatedRevenuePer100kg: 180.00,
                        processingTime: "2-3 hours",
                        laborRequired: "2-3 workers"
                    }
                },
                {
                    name: "Orange Marmalade",
                    category: "Preserves",
                    description: "Sweet citrus marmalade",
                    marketValue: 5.00,
                    processingMethod: "Cooking, canning",
                    equipment: ["Cooking pot", "Canning equipment"],
                    shelfLife: "12 months",
                    targetMarket: "Grocery stores, specialty food shops",
                    processingSteps: [
                        "Wash oranges and remove peel",
                        "Julienne peel and juice oranges",
                        "Cook with sugar and water",
                        "Simmer until thick and translucent",
                        "Can while hot",
                        "Process in water bath"
                    ],
                    projectedOutput: {
                        yieldPercentage: 65,
                        unit: "kg",
                        outputPer100kg: 65,
                        estimatedRevenuePer100kg: 325.00,
                        processingTime: "2-3 hours",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Orange Essential Oil",
                    category: "Essential Oil",
                    description: "Aromatherapy and flavoring oil",
                    marketValue: 18.00,
                    processingMethod: "Cold pressing or steam distillation",
                    equipment: ["Oil press", "Distillation equipment"],
                    shelfLife: "24 months",
                    targetMarket: "Essential oil companies, aromatherapy stores",
                    processingSteps: [
                        "Extract oil from orange peels",
                        "Cold press or steam distill",
                        "Filter to remove impurities",
                        "Store in dark glass bottles",
                        "Label and package"
                    ],
                    projectedOutput: {
                        yieldPercentage: 0.5,
                        unit: "ml",
                        outputPer100kg: 500,
                        estimatedRevenuePer100kg: 9000.00,
                        processingTime: "1 day",
                        laborRequired: "2 workers"
                    }
                }
            ]
        },
        
        // More Vegetables
        carrot: {
            primary: "Fresh Carrots",
            byproducts: [
                {
                    name: "Carrot Juice",
                    category: "Beverage",
                    description: "Fresh nutritious carrot juice",
                    marketValue: 3.50,
                    processingMethod: "Juicing, pasteurization",
                    equipment: ["Juicer", "Pasteurizer", "Bottling"],
                    shelfLife: "1 week (fresh) or 6 months (pasteurized)",
                    targetMarket: "Grocery stores, juice bars",
                    processingSteps: [
                        "Wash and peel carrots",
                        "Juice using extractor",
                        "Strain if needed",
                        "Pasteurize at 85°C",
                        "Bottle and cool"
                    ],
                    projectedOutput: {
                        yieldPercentage: 65,
                        unit: "liters",
                        outputPer100kg: 65,
                        estimatedRevenuePer100kg: 227.50,
                        processingTime: "2-3 hours",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Dried Carrot Chips",
                    category: "Snack Food",
                    description: "Crispy dehydrated carrot chips",
                    marketValue: 6.00,
                    processingMethod: "Slicing, dehydration",
                    equipment: ["Slicer", "Dehydrator"],
                    shelfLife: "12 months",
                    targetMarket: "Health food stores, snack distributors",
                    processingSteps: [
                        "Wash and peel carrots",
                        "Slice into thin rounds",
                        "Dry in dehydrator at 60°C for 12-18 hours",
                        "Check for crispness",
                        "Package in airtight bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 12,
                        unit: "kg",
                        outputPer100kg: 12,
                        estimatedRevenuePer100kg: 72.00,
                        processingTime: "2 days",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Carrot Powder",
                    category: "Food Processing",
                    description: "Nutrient-dense carrot powder",
                    marketValue: 7.50,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "24 months",
                    targetMarket: "Food industry, supplement companies",
                    processingSteps: [
                        "Wash, peel, and slice carrots",
                        "Dry completely in dehydrator",
                        "Grind to fine powder",
                        "Sift for uniform texture",
                        "Package in moisture-proof containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 10,
                        unit: "kg",
                        outputPer100kg: 10,
                        estimatedRevenuePer100kg: 75.00,
                        processingTime: "3-4 days",
                        laborRequired: "1-2 workers"
                    }
                }
            ]
        },
        
        onion: {
            primary: "Fresh Onions",
            byproducts: [
                {
                    name: "Onion Powder",
                    category: "Spice",
                    description: "Dried and ground onion",
                    marketValue: 5.50,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "24 months",
                    targetMarket: "Spice companies, food manufacturers",
                    processingSteps: [
                        "Peel and slice onions",
                        "Dry in dehydrator at 60°C for 24-36 hours",
                        "Grind to fine powder",
                        "Sift to remove lumps",
                        "Package in airtight containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 15,
                        unit: "kg",
                        outputPer100kg: 15,
                        estimatedRevenuePer100kg: 82.50,
                        processingTime: "3-4 days",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Dried Onion Flakes",
                    category: "Food Processing",
                    description: "Dehydrated onion pieces",
                    marketValue: 6.50,
                    processingMethod: "Slicing, dehydration",
                    equipment: ["Slicer", "Dehydrator"],
                    shelfLife: "12 months",
                    targetMarket: "Food manufacturers, restaurants",
                    processingSteps: [
                        "Peel and slice onions",
                        "Separate into rings or flakes",
                        "Dry in dehydrator at 60°C for 12-24 hours",
                        "Package in airtight containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 12,
                        unit: "kg",
                        outputPer100kg: 12,
                        estimatedRevenuePer100kg: 78.00,
                        processingTime: "2 days",
                        laborRequired: "1-2 workers"
                    }
                }
            ]
        },
        
        pepper: {
            primary: "Fresh Peppers",
            byproducts: [
                {
                    name: "Hot Sauce",
                    category: "Condiment",
                    description: "Spicy pepper sauce",
                    marketValue: 6.00,
                    processingMethod: "Blending, fermentation, bottling",
                    equipment: ["Blender", "Fermentation jars", "Bottling equipment"],
                    shelfLife: "24 months",
                    targetMarket: "Grocery stores, specialty food shops",
                    processingSteps: [
                        "Wash and stem peppers",
                        "Blend with vinegar and salt",
                        "Ferment for 1-2 weeks (optional)",
                        "Strain if desired",
                        "Bottle and seal",
                        "Age for flavor development"
                    ],
                    projectedOutput: {
                        yieldPercentage: 70,
                        unit: "liters",
                        outputPer100kg: 70,
                        estimatedRevenuePer100kg: 420.00,
                        processingTime: "1-2 weeks",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Paprika Powder",
                    category: "Spice",
                    description: "Ground dried pepper spice",
                    marketValue: 8.00,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "24 months",
                    targetMarket: "Spice companies, food manufacturers",
                    processingSteps: [
                        "Wash and remove stems",
                        "Dry in dehydrator at 60°C for 24-48 hours",
                        "Remove seeds (optional)",
                        "Grind to fine powder",
                        "Package in airtight containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 20,
                        unit: "kg",
                        outputPer100kg: 20,
                        estimatedRevenuePer100kg: 160.00,
                        processingTime: "3-5 days",
                        laborRequired: "1-2 workers"
                    }
                }
            ]
        },
        
        cucumber: {
            primary: "Fresh Cucumbers",
            byproducts: [
                {
                    name: "Pickles",
                    category: "Preserves",
                    description: "Fermented or vinegar pickles",
                    marketValue: 4.50,
                    processingMethod: "Brining, fermentation or pickling",
                    equipment: ["Pickling jars", "Brine solution"],
                    shelfLife: "12 months",
                    targetMarket: "Grocery stores, specialty food shops",
                    processingSteps: [
                        "Wash and trim cucumbers",
                        "Prepare brine or vinegar solution",
                        "Pack cucumbers in jars with spices",
                        "Add brine and seal",
                        "Ferment (if making fermented pickles) or process",
                        "Store in cool place"
                    ],
                    projectedOutput: {
                        yieldPercentage: 95,
                        unit: "kg",
                        outputPer100kg: 95,
                        estimatedRevenuePer100kg: 427.50,
                        processingTime: "1 day (vinegar) or 2-3 weeks (fermented)",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Cucumber Juice",
                    category: "Beverage",
                    description: "Refreshing cucumber juice",
                    marketValue: 3.00,
                    processingMethod: "Juicing, bottling",
                    equipment: ["Juicer", "Bottling equipment"],
                    shelfLife: "3 days (fresh)",
                    targetMarket: "Juice bars, health food stores"
                }
            ]
        },
        
        // Legumes
        beans: {
            primary: "Dry Beans",
            byproducts: [
                {
                    name: "Bean Flour",
                    category: "Food Processing",
                    description: "Protein-rich flour from beans",
                    marketValue: 4.00,
                    processingMethod: "Grinding",
                    equipment: ["Grinding mill"],
                    shelfLife: "12 months",
                    targetMarket: "Bakeries, health food stores",
                    processingSteps: [
                        "Clean and sort beans",
                        "Grind to fine powder",
                        "Sift for uniform texture",
                        "Package in airtight bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 98,
                        unit: "kg",
                        outputPer100kg: 98,
                        estimatedRevenuePer100kg: 392.00,
                        processingTime: "2-3 hours",
                        laborRequired: "1 worker"
                    }
                },
                {
                    name: "Bean Paste",
                    category: "Food Processing",
                    description: "Cooked and mashed bean paste",
                    marketValue: 3.50,
                    processingMethod: "Cooking, mashing",
                    equipment: ["Cooking pot", "Food processor"],
                    shelfLife: "1 week (refrigerated)",
                    targetMarket: "Food manufacturers, restaurants"
                }
            ]
        },
        
        peanuts: {
            primary: "Raw Peanuts",
            byproducts: [
                {
                    name: "Peanut Butter",
                    category: "Food Processing",
                    description: "Smooth or crunchy peanut butter",
                    marketValue: 7.00,
                    processingMethod: "Roasting, grinding",
                    equipment: ["Roaster", "Grinder", "Packaging"],
                    shelfLife: "12 months",
                    targetMarket: "Grocery stores, specialty food shops",
                    processingSteps: [
                        "Shell and clean peanuts",
                        "Roast at 180°C for 15-20 minutes",
                        "Remove skins (optional)",
                        "Grind in food processor until smooth",
                        "Add salt and oil if needed",
                        "Package in jars"
                    ],
                    projectedOutput: {
                        yieldPercentage: 90,
                        unit: "kg",
                        outputPer100kg: 90,
                        estimatedRevenuePer100kg: 630.00,
                        processingTime: "1-2 hours",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Peanut Oil",
                    category: "Cooking Oil",
                    description: "High-quality cooking oil",
                    marketValue: 6.50,
                    processingMethod: "Pressing, refining",
                    equipment: ["Oil press", "Refining equipment"],
                    shelfLife: "12 months",
                    targetMarket: "Grocery stores, restaurants",
                    processingSteps: [
                        "Shell and clean peanuts",
                        "Press to extract oil",
                        "Filter to remove solids",
                        "Refine if needed",
                        "Bottle in dark containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 45,
                        unit: "liters",
                        outputPer100kg: 45,
                        estimatedRevenuePer100kg: 292.50,
                        processingTime: "1-2 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Roasted Peanuts",
                    category: "Snack Food",
                    description: "Salt-roasted peanuts",
                    marketValue: 5.50,
                    processingMethod: "Roasting, seasoning",
                    equipment: ["Roaster", "Seasoning equipment"],
                    shelfLife: "6 months",
                    targetMarket: "Snack distributors, retail stores"
                }
            ]
        },
        
        // More Root Crops
        yam: {
            primary: "Fresh Yam",
            byproducts: [
                {
                    name: "Yam Flour",
                    category: "Food Processing",
                    description: "Fine flour from yam",
                    marketValue: 3.50,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "12 months",
                    targetMarket: "Bakeries, food manufacturers",
                    processingSteps: [
                        "Wash and peel yams",
                        "Slice into small pieces",
                        "Dry in dehydrator at 60°C for 3-5 days",
                        "Grind to fine powder",
                        "Sift and package"
                    ],
                    projectedOutput: {
                        yieldPercentage: 28,
                        unit: "kg",
                        outputPer100kg: 28,
                        estimatedRevenuePer100kg: 98.00,
                        processingTime: "5-7 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Yam Chips",
                    category: "Snack Food",
                    description: "Crispy fried yam chips",
                    marketValue: 4.50,
                    processingMethod: "Slicing, frying",
                    equipment: ["Slicer", "Deep fryer"],
                    shelfLife: "6 months",
                    targetMarket: "Snack distributors, retail stores"
                }
            ]
        },
        
        // More Fruits
        avocado: {
            primary: "Fresh Avocados",
            byproducts: [
                {
                    name: "Avocado Oil",
                    category: "Cooking Oil",
                    description: "Premium cooking and cosmetic oil",
                    marketValue: 18.00,
                    processingMethod: "Cold pressing",
                    equipment: ["Cold press", "Filtering system"],
                    shelfLife: "24 months",
                    targetMarket: "Health food stores, cosmetic companies",
                    processingSteps: [
                        "Remove flesh from avocados",
                        "Dry the flesh slightly",
                        "Cold press to extract oil",
                        "Filter to remove solids",
                        "Bottle in dark glass containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 15,
                        unit: "liters",
                        outputPer100kg: 15,
                        estimatedRevenuePer100kg: 270.00,
                        processingTime: "1-2 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Guacamole",
                    category: "Prepared Food",
                    description: "Fresh avocado dip",
                    marketValue: 6.50,
                    processingMethod: "Mashing, seasoning",
                    equipment: ["Food processor", "Packaging"],
                    shelfLife: "3 days (refrigerated)",
                    targetMarket: "Grocery stores, restaurants"
                }
            ]
        },
        
        coconut: {
            primary: "Fresh Coconut",
            byproducts: [
                {
                    name: "Coconut Oil",
                    category: "Cooking Oil",
                    description: "Virgin coconut oil",
                    marketValue: 10.00,
                    processingMethod: "Cold pressing or extraction",
                    equipment: ["Press", "Filtering system"],
                    shelfLife: "24 months",
                    targetMarket: "Health food stores, cosmetic companies",
                    processingSteps: [
                        "Extract coconut meat",
                        "Grate or blend meat",
                        "Press to extract oil (or use wet method)",
                        "Filter to remove solids",
                        "Bottle in dark containers"
                    ],
                    projectedOutput: {
                        yieldPercentage: 60,
                        unit: "liters",
                        outputPer100kg: 60,
                        estimatedRevenuePer100kg: 600.00,
                        processingTime: "1-2 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Coconut Flour",
                    category: "Food Processing",
                    description: "Gluten-free flour from coconut",
                    marketValue: 6.00,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dryer", "Grinding mill"],
                    shelfLife: "12 months",
                    targetMarket: "Bakeries, health food stores"
                },
                {
                    name: "Coconut Milk",
                    category: "Beverage",
                    description: "Extracted coconut milk",
                    marketValue: 4.50,
                    processingMethod: "Extraction, bottling",
                    equipment: ["Grating equipment", "Press", "Bottling"],
                    shelfLife: "1 week (fresh) or 6 months (canned)",
                    targetMarket: "Grocery stores, food manufacturers"
                },
                {
                    name: "Coconut Water",
                    category: "Beverage",
                    description: "Natural coconut water",
                    marketValue: 3.50,
                    processingMethod: "Extraction, pasteurization",
                    equipment: ["Extraction tools", "Pasteurizer", "Bottling"],
                    shelfLife: "6 months (pasteurized)",
                    targetMarket: "Grocery stores, health food stores"
                }
            ]
        },
        
        watermelon: {
            primary: "Fresh Watermelon",
            byproducts: [
                {
                    name: "Watermelon Juice",
                    category: "Beverage",
                    description: "Fresh watermelon juice",
                    marketValue: 2.50,
                    processingMethod: "Juicing, bottling",
                    equipment: ["Juicer", "Bottling equipment"],
                    shelfLife: "3 days (fresh)",
                    targetMarket: "Juice bars, grocery stores"
                },
                {
                    name: "Watermelon Rind Pickles",
                    category: "Preserves",
                    description: "Pickled watermelon rind",
                    marketValue: 4.00,
                    processingMethod: "Pickling",
                    equipment: ["Pickling jars"],
                    shelfLife: "12 months",
                    targetMarket: "Specialty food stores, restaurants",
                    processingSteps: [
                        "Remove green skin from rind",
                        "Cut rind into pieces",
                        "Brine overnight",
                        "Cook in vinegar and sugar syrup",
                        "Pack in jars and process"
                    ],
                    projectedOutput: {
                        yieldPercentage: 40,
                        unit: "kg",
                        outputPer100kg: 40,
                        estimatedRevenuePer100kg: 160.00,
                        processingTime: "2-3 days",
                        laborRequired: "1-2 workers"
                    }
                }
            ]
        },
        
        // More Grains
        wheat: {
            primary: "Wheat Grain",
            byproducts: [
                {
                    name: "Wheat Flour",
                    category: "Food Processing",
                    description: "All-purpose or specialty flour",
                    marketValue: 2.50,
                    processingMethod: "Milling",
                    equipment: ["Flour mill", "Sifter"],
                    shelfLife: "12 months",
                    targetMarket: "Bakeries, grocery stores",
                    processingSteps: [
                        "Clean and sort wheat grains",
                        "Mill to desired fineness",
                        "Sift to separate bran (optional)",
                        "Package in bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 75,
                        unit: "kg",
                        outputPer100kg: 75,
                        estimatedRevenuePer100kg: 187.50,
                        processingTime: "2-3 hours",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Wheat Bran",
                    category: "Animal Feed",
                    description: "High-fiber bran",
                    marketValue: 1.50,
                    processingMethod: "Milling separation",
                    equipment: ["Flour mill"],
                    shelfLife: "6 months",
                    targetMarket: "Feed mills, health food stores"
                },
                {
                    name: "Wheat Germ",
                    category: "Health Food",
                    description: "Nutrient-rich germ",
                    marketValue: 8.00,
                    processingMethod: "Milling separation",
                    equipment: ["Flour mill"],
                    shelfLife: "6 months (refrigerated)",
                    targetMarket: "Health food stores, supplement companies"
                }
            ]
        },
        
        // Additional Common Crops
        garlic: {
            primary: "Fresh Garlic",
            byproducts: [
                {
                    name: "Garlic Powder",
                    category: "Spice",
                    description: "Dried and ground garlic",
                    marketValue: 7.00,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "24 months",
                    targetMarket: "Spice companies, food manufacturers",
                    processingSteps: [
                        "Peel garlic cloves",
                        "Slice thinly or leave whole",
                        "Dry in dehydrator at 60°C for 24-36 hours",
                        "Grind to fine powder",
                        "Sift and package"
                    ],
                    projectedOutput: {
                        yieldPercentage: 20,
                        unit: "kg",
                        outputPer100kg: 20,
                        estimatedRevenuePer100kg: 140.00,
                        processingTime: "3-4 days",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Garlic Oil",
                    category: "Essential Oil",
                    description: "Concentrated garlic oil",
                    marketValue: 12.00,
                    processingMethod: "Extraction",
                    equipment: ["Oil extractor"],
                    shelfLife: "24 months",
                    targetMarket: "Food industry, supplement companies"
                }
            ]
        },
        
        turmeric: {
            primary: "Fresh Turmeric Root",
            byproducts: [
                {
                    name: "Turmeric Powder",
                    category: "Spice",
                    description: "Ground turmeric spice",
                    marketValue: 8.50,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "24 months",
                    targetMarket: "Spice companies, food manufacturers",
                    processingSteps: [
                        "Wash and peel turmeric roots",
                        "Slice into thin pieces",
                        "Dry in dehydrator at 60°C for 48-72 hours",
                        "Grind to fine powder",
                        "Sift and package"
                    ],
                    projectedOutput: {
                        yieldPercentage: 18,
                        unit: "kg",
                        outputPer100kg: 18,
                        estimatedRevenuePer100kg: 153.00,
                        processingTime: "4-5 days",
                        laborRequired: "1-2 workers"
                    }
                }
            ]
        },
        
        cabbage: {
            primary: "Fresh Cabbage",
            byproducts: [
                {
                    name: "Sauerkraut",
                    category: "Preserves",
                    description: "Fermented cabbage",
                    marketValue: 3.50,
                    processingMethod: "Fermentation",
                    equipment: ["Fermentation jars", "Weights"],
                    shelfLife: "6 months (refrigerated)",
                    targetMarket: "Grocery stores, specialty food shops",
                    processingSteps: [
                        "Shred cabbage finely",
                        "Mix with salt",
                        "Pack tightly in jars",
                        "Weigh down to keep submerged",
                        "Ferment for 2-6 weeks",
                        "Refrigerate when ready"
                    ],
                    projectedOutput: {
                        yieldPercentage: 90,
                        unit: "kg",
                        outputPer100kg: 90,
                        estimatedRevenuePer100kg: 315.00,
                        processingTime: "2-6 weeks",
                        laborRequired: "1 worker"
                    }
                },
                {
                    name: "Kimchi",
                    category: "Preserves",
                    description: "Korean fermented vegetables",
                    marketValue: 5.00,
                    processingMethod: "Fermentation with spices",
                    equipment: ["Fermentation containers"],
                    shelfLife: "3 months (refrigerated)",
                    targetMarket: "Asian food stores, restaurants"
                }
            ]
        },
        
        eggplant: {
            primary: "Fresh Eggplant",
            byproducts: [
                {
                    name: "Eggplant Chips",
                    category: "Snack Food",
                    description: "Dried eggplant chips",
                    marketValue: 5.50,
                    processingMethod: "Slicing, dehydration",
                    equipment: ["Slicer", "Dehydrator"],
                    shelfLife: "12 months",
                    targetMarket: "Health food stores, snack distributors"
                },
                {
                    name: "Eggplant Pickles",
                    category: "Preserves",
                    description: "Pickled eggplant",
                    marketValue: 4.50,
                    processingMethod: "Pickling",
                    equipment: ["Pickling jars"],
                    shelfLife: "12 months",
                    targetMarket: "Specialty food stores"
                }
            ]
        },
        
        lemon: {
            primary: "Fresh Lemons",
            byproducts: [
                {
                    name: "Lemon Juice",
                    category: "Beverage",
                    description: "Fresh lemon juice",
                    marketValue: 4.50,
                    processingMethod: "Juicing, bottling",
                    equipment: ["Juicer", "Bottling equipment"],
                    shelfLife: "1 week (fresh) or 6 months (pasteurized)",
                    targetMarket: "Grocery stores, restaurants"
                },
                {
                    name: "Lemon Zest",
                    category: "Spice",
                    description: "Dried lemon peel",
                    marketValue: 12.00,
                    processingMethod: "Peeling, drying",
                    equipment: ["Zester", "Dehydrator"],
                    shelfLife: "24 months",
                    targetMarket: "Spice companies, bakeries"
                },
                {
                    name: "Lemon Essential Oil",
                    category: "Essential Oil",
                    description: "Citrus essential oil",
                    marketValue: 20.00,
                    processingMethod: "Cold pressing",
                    equipment: ["Oil press"],
                    shelfLife: "24 months",
                    targetMarket: "Essential oil companies, aromatherapy stores"
                }
            ]
        },
        
        grapes: {
            primary: "Fresh Grapes",
            byproducts: [
                {
                    name: "Grape Juice",
                    category: "Beverage",
                    description: "Fresh grape juice",
                    marketValue: 4.00,
                    processingMethod: "Juicing, pasteurization",
                    equipment: ["Juicer", "Pasteurizer", "Bottling"],
                    shelfLife: "6 months (pasteurized)",
                    targetMarket: "Grocery stores, juice bars"
                },
                {
                    name: "Raisins",
                    category: "Dried Fruit",
                    description: "Dried grapes",
                    marketValue: 6.50,
                    processingMethod: "Drying",
                    equipment: ["Drying racks", "Dehydrator"],
                    shelfLife: "12 months",
                    targetMarket: "Grocery stores, snack distributors",
                    processingSteps: [
                        "Wash and sort grapes",
                        "Place on drying racks or in dehydrator",
                        "Dry at 60°C for 24-48 hours",
                        "Check for desired texture",
                        "Package in airtight bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 25,
                        unit: "kg",
                        outputPer100kg: 25,
                        estimatedRevenuePer100kg: 162.50,
                        processingTime: "3-4 days",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Wine",
                    category: "Beverage",
                    description: "Fermented grape wine",
                    marketValue: 15.00,
                    processingMethod: "Fermentation, aging",
                    equipment: ["Crusher", "Fermentation vessels", "Aging barrels"],
                    shelfLife: "Years",
                    targetMarket: "Wine shops, restaurants"
                }
            ]
        },
        
        lettuce: {
            primary: "Fresh Lettuce",
            byproducts: [
                {
                    name: "Dried Lettuce Powder",
                    category: "Food Processing",
                    description: "Nutrient-dense powder",
                    marketValue: 9.00,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "24 months",
                    targetMarket: "Health food stores, supplement companies"
                }
            ]
        },
        
        spinach: {
            primary: "Fresh Spinach",
            byproducts: [
                {
                    name: "Dried Spinach Powder",
                    category: "Food Processing",
                    description: "Nutrient-dense powder for smoothies",
                    marketValue: 8.00,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "24 months",
                    targetMarket: "Health food stores, supplement companies"
                },
                {
                    name: "Frozen Spinach",
                    category: "Frozen Food",
                    description: "Blanched and frozen spinach",
                    marketValue: 2.50,
                    processingMethod: "Blanching, freezing",
                    equipment: ["Blanching pot", "Freezer"],
                    shelfLife: "12 months",
                    targetMarket: "Grocery stores, restaurants"
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
                    processingMethod: "Drying, grinding",
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "12 months",
                    targetMarket: "Baking industry, health food stores"
                },
                {
                    name: "Sweet Potato Chips",
                    category: "Snack Food",
                    description: "Orange chips with natural sweetness",
                    marketValue: 3.80,
                    processingMethod: "Slicing, frying",
                    equipment: ["Slicer", "Deep fryer"],
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
        
        taro: {
            primary: "Fresh Taro",
            byproducts: [
                {
                    name: "Taro Flour",
                    category: "Food Processing",
                    description: "Gluten-free flour alternative",
                    marketValue: 3.50,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "12 months",
                    targetMarket: "Health food stores, gluten-free bakeries",
                    processingSteps: [
                        "Wash taro corms thoroughly",
                        "Peel carefully to remove all skin",
                        "Cut into small uniform pieces",
                        "Dry in dehydrator at 60°C for 3-5 days",
                        "Grind to fine powder",
                        "Sift and package"
                    ],
                    projectedOutput: {
                        yieldPercentage: 30,
                        unit: "kg",
                        outputPer100kg: 30,
                        estimatedRevenuePer100kg: 105.00,
                        processingTime: "5-7 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Taro Chips",
                    category: "Snack Food",
                    description: "Purple chips with unique flavor",
                    marketValue: 4.50,
                    processingMethod: "Slicing, frying",
                    equipment: ["Slicer", "Deep fryer"],
                    shelfLife: "6 months",
                    targetMarket: "Specialty food stores, online retailers"
                },
                {
                    name: "Taro Leaves",
                    category: "Vegetable",
                    description: "Edible leaves for cooking",
                    marketValue: 2.00,
                    processingMethod: "Harvesting, cleaning",
                    equipment: ["Harvesting tools", "Washing station"],
                    shelfLife: "1 week",
                    targetMarket: "Local markets, restaurants"
                }
            ]
        },
        
        banana: {
            primary: "Fresh Banana",
            byproducts: [
                {
                    name: "Banana Chips",
                    category: "Snack Food",
                    description: "Crispy dried banana chips",
                    marketValue: 6.00,
                    processingMethod: "Slicing, drying",
                    equipment: ["Slicer", "Dehydrator"],
                    shelfLife: "12 months",
                    targetMarket: "Retail stores, snack distributors",
                    processingSteps: [
                        "Select ripe but firm bananas",
                        "Peel and slice uniformly (3-5mm thickness)",
                        "Soak in lemon juice or salt water",
                        "Dry in dehydrator at 60°C for 12-24 hours",
                        "Season with desired spices (optional)",
                        "Package in airtight bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 15,
                        unit: "kg",
                        outputPer100kg: 15,
                        estimatedRevenuePer100kg: 90.00,
                        processingTime: "2-3 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Banana Flour",
                    category: "Food Processing",
                    description: "Gluten-free flour from green bananas",
                    marketValue: 4.50,
                    processingMethod: "Drying, grinding",
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "18 months",
                    targetMarket: "Health food stores, gluten-free bakeries",
                    processingSteps: [
                        "Select green, unripe bananas",
                        "Peel and slice into thin pieces",
                        "Dry in dehydrator at 60°C for 24-36 hours",
                        "Grind to fine powder",
                        "Sift and package"
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
                    processingMethod: "Fermentation",
                    equipment: ["Fermentation vessels"],
                    shelfLife: "24 months",
                    targetMarket: "Specialty food stores, restaurants",
                    processingSteps: [
                        "Select overripe bananas (fully yellow with brown spots)",
                        "Peel and mash bananas thoroughly to create pulp",
                        "Add water and sugar to create mash (ratio: 1 part banana to 2 parts water)",
                        "Transfer mash to fermentation vessel",
                        "Add yeast or vinegar starter culture",
                        "Cover vessel with breathable cloth or lid with airlock",
                        "Allow primary fermentation for 7-14 days at room temperature (20-25°C)",
                        "Stir daily to prevent mold and ensure even fermentation",
                        "Strain liquid from solids using cheesecloth or fine mesh",
                        "Transfer liquid to clean fermentation vessel for secondary fermentation",
                        "Age for 2-3 months, stirring occasionally",
                        "Test acidity level (should reach 4-6% acetic acid)",
                        "Filter to remove sediment and any remaining solids",
                        "Bottle in sterilized glass bottles",
                        "Label with production date and batch number",
                        "Store in cool, dark place away from direct sunlight"
                    ],
                    projectedOutput: {
                        yieldPercentage: 60,
                        unit: "liters",
                        outputPer100kg: 60,
                        estimatedRevenuePer100kg: 210.00,
                        processingTime: "3-4 months",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Banana Leaves",
                    category: "Packaging Material",
                    description: "Natural packaging for food",
                    marketValue: 1.50,
                    processingMethod: "Harvesting, cleaning",
                    equipment: ["Harvesting tools"],
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
                    equipment: ["Dehydrator", "Grinding mill"],
                    shelfLife: "24 months",
                    targetMarket: "Spice companies, grocery stores"
                },
                {
                    name: "Ginger Tea",
                    category: "Beverage",
                    description: "Dried ginger for tea preparation",
                    marketValue: 4.50,
                    processingMethod: "Slicing, drying",
                    equipment: ["Slicer", "Dehydrator"],
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
        },
        
        sheep: {
            primary: "Lamb/Mutton/Wool",
            byproducts: [
                {
                    name: "Wool",
                    category: "Textile",
                    description: "Natural wool fiber for textiles",
                    marketValue: 8.00,
                    processingMethod: "Shearing, cleaning, carding",
                    equipment: ["Shearing equipment", "Washing facility", "Carding machine"],
                    shelfLife: "Indefinite",
                    targetMarket: "Textile manufacturers, yarn producers",
                    processingSteps: [
                        "Shear wool from sheep",
                        "Sort by quality and color",
                        "Wash to remove grease and dirt",
                        "Dry thoroughly",
                        "Card to align fibers",
                        "Package in bales"
                    ],
                    projectedOutput: {
                        yieldPercentage: 100,
                        unit: "kg",
                        outputPerAnimal: "3-5",
                        estimatedRevenuePerAnimal: 32.00,
                        processingTime: "2-3 days",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Sheep Cheese",
                    category: "Dairy",
                    description: "Rich and flavorful sheep cheese",
                    marketValue: 14.00,
                    processingMethod: "Cheese making, aging",
                    equipment: ["Cheese making equipment", "Aging room"],
                    shelfLife: "3-6 months",
                    targetMarket: "Specialty food stores, restaurants",
                    processingSteps: [
                        "Collect fresh sheep milk",
                        "Heat to 86°F and add starter",
                        "Add rennet and let curdle",
                        "Cut and drain whey",
                        "Salt and press into shape",
                        "Age for 3-12 months",
                        "Package and label"
                    ],
                    projectedOutput: {
                        yieldPercentage: 12,
                        unit: "kg",
                        outputPer100Liters: 12,
                        estimatedRevenuePer100Liters: 168.00,
                        processingTime: "3-12 months",
                        laborRequired: "1-2 cheesemakers"
                    }
                },
                {
                    name: "Lanolin",
                    category: "Cosmetics",
                    description: "Wool grease for skincare products",
                    marketValue: 12.00,
                    processingMethod: "Extraction, purification",
                    equipment: ["Extraction equipment", "Purification system"],
                    shelfLife: "36 months",
                    targetMarket: "Cosmetic manufacturers, pharmaceutical companies"
                }
            ]
        },
        
        ducks: {
            primary: "Duck Meat/Eggs",
            byproducts: [
                {
                    name: "Duck Feathers",
                    category: "Manufacturing",
                    description: "Down feathers for bedding and clothing",
                    marketValue: 4.00,
                    processingMethod: "Cleaning, sorting",
                    equipment: ["Cleaning equipment", "Sorting facility"],
                    shelfLife: "Indefinite",
                    targetMarket: "Bedding manufacturers, outdoor gear companies",
                    processingSteps: [
                        "Collect feathers during processing",
                        "Clean and sanitize feathers",
                        "Sort by quality and type",
                        "Package for sale"
                    ],
                    projectedOutput: {
                        yieldPercentage: 100,
                        unit: "grams",
                        outputPerAnimal: "200-300",
                        estimatedRevenuePerAnimal: 10.00,
                        processingTime: "1 day",
                        laborRequired: "1 worker"
                    }
                },
                {
                    name: "Duck Fat",
                    category: "Cooking Fat",
                    description: "Rich cooking fat from duck",
                    marketValue: 6.50,
                    processingMethod: "Rendering",
                    equipment: ["Rendering pot", "Strainer"],
                    shelfLife: "6 months (refrigerated)",
                    targetMarket: "Restaurants, specialty food stores",
                    processingSteps: [
                        "Collect fat from duck processing",
                        "Render at low temperature",
                        "Strain to remove impurities",
                        "Package in containers",
                        "Refrigerate or freeze"
                    ],
                    projectedOutput: {
                        yieldPercentage: 25,
                        unit: "kg",
                        outputPer100kg: 25,
                        estimatedRevenuePer100kg: 162.50,
                        processingTime: "2-3 hours",
                        laborRequired: "1 worker"
                    }
                },
                {
                    name: "Duck Manure",
                    category: "Fertilizer",
                    description: "High-nitrogen organic fertilizer",
                    marketValue: 1.80,
                    processingMethod: "Composting",
                    equipment: ["Composting facility"],
                    shelfLife: "12 months",
                    targetMarket: "Garden centers, organic farms"
                }
            ]
        },
        
        turkeys: {
            primary: "Turkey Meat",
            byproducts: [
                {
                    name: "Turkey Feathers",
                    category: "Crafts",
                    description: "Large feathers for crafts and decorations",
                    marketValue: 3.50,
                    processingMethod: "Cleaning, sorting",
                    equipment: ["Cleaning equipment"],
                    shelfLife: "Indefinite",
                    targetMarket: "Craft suppliers, decoration companies",
                    processingSteps: [
                        "Collect feathers during processing",
                        "Clean and sanitize",
                        "Sort by size and color",
                        "Package in bundles"
                    ],
                    projectedOutput: {
                        yieldPercentage: 100,
                        unit: "grams",
                        outputPerAnimal: "400-600",
                        estimatedRevenuePerAnimal: 20.00,
                        processingTime: "1 day",
                        laborRequired: "1 worker"
                    }
                },
                {
                    name: "Turkey Meal",
                    category: "Animal Feed",
                    description: "Protein-rich meal for animal feed",
                    marketValue: 2.50,
                    processingMethod: "Rendering, grinding",
                    equipment: ["Rendering equipment", "Grinding mill"],
                    shelfLife: "12 months",
                    targetMarket: "Feed mills, pet food manufacturers"
                }
            ]
        },
        
        rabbits: {
            primary: "Rabbit Meat",
            byproducts: [
                {
                    name: "Rabbit Fur",
                    category: "Textile",
                    description: "Soft rabbit fur for garments",
                    marketValue: 20.00,
                    processingMethod: "Tanning, finishing",
                    equipment: ["Tanning facility", "Finishing equipment"],
                    shelfLife: "Indefinite",
                    targetMarket: "Fashion industry, craft suppliers",
                    processingSteps: [
                        "Remove pelts carefully",
                        "Cure with salt",
                        "Tan using vegetable or chemical methods",
                        "Finish and soften",
                        "Grade and package"
                    ],
                    projectedOutput: {
                        yieldPercentage: 100,
                        unit: "pelt",
                        outputPerAnimal: 1,
                        estimatedRevenuePerAnimal: 20.00,
                        processingTime: "2-3 weeks",
                        laborRequired: "1 worker"
                    }
                },
                {
                    name: "Rabbit Manure",
                    category: "Fertilizer",
                    description: "Cold manure, safe for direct use",
                    marketValue: 2.00,
                    processingMethod: "Drying, packaging",
                    equipment: ["Drying racks", "Packaging equipment"],
                    shelfLife: "12 months",
                    targetMarket: "Garden centers, organic farms",
                    processingSteps: [
                        "Collect manure from rabbit hutches",
                        "Dry in sun or low heat",
                        "Package in bags",
                        "Label and store"
                    ],
                    projectedOutput: {
                        yieldPercentage: 90,
                        unit: "kg",
                        outputPer100kg: 90,
                        estimatedRevenuePer100kg: 180.00,
                        processingTime: "3-5 days",
                        laborRequired: "1 worker (part-time)"
                    }
                }
            ]
        },
        
        fish: {
            primary: "Fresh Fish",
            byproducts: [
                {
                    name: "Fish Meal",
                    category: "Animal Feed",
                    description: "High-protein feed for animals",
                    marketValue: 3.50,
                    processingMethod: "Cooking, pressing, drying",
                    equipment: ["Cooker", "Press", "Dryer"],
                    shelfLife: "12 months",
                    targetMarket: "Feed mills, aquaculture",
                    processingSteps: [
                        "Collect fish waste and scraps",
                        "Cook to remove oil and water",
                        "Press to separate oil",
                        "Dry the pressed cake",
                        "Grind to fine meal",
                        "Package in bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 25,
                        unit: "kg",
                        outputPer100kg: 25,
                        estimatedRevenuePer100kg: 87.50,
                        processingTime: "1-2 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Fish Oil",
                    category: "Supplements",
                    description: "Omega-3 rich fish oil",
                    marketValue: 15.00,
                    processingMethod: "Extraction, refining",
                    equipment: ["Oil extractor", "Refining equipment"],
                    shelfLife: "24 months",
                    targetMarket: "Health supplement companies, pharmaceutical",
                    processingSteps: [
                        "Extract oil from fish waste",
                        "Filter to remove impurities",
                        "Refine and deodorize",
                        "Package in dark bottles",
                        "Store in cool place"
                    ],
                    projectedOutput: {
                        yieldPercentage: 5,
                        unit: "liters",
                        outputPer100kg: 5,
                        estimatedRevenuePer100kg: 75.00,
                        processingTime: "2-3 days",
                        laborRequired: "2 workers"
                    }
                },
                {
                    name: "Fish Scales",
                    category: "Cosmetics",
                    description: "Used in cosmetics and crafts",
                    marketValue: 8.00,
                    processingMethod: "Cleaning, drying",
                    equipment: ["Washing station", "Dryer"],
                    shelfLife: "Indefinite",
                    targetMarket: "Cosmetic companies, craft suppliers"
                }
            ]
        },
        
        // Dairy Cattle (separate from beef)
        dairy_cattle: {
            primary: "Milk",
            byproducts: [
                {
                    name: "Butter",
                    category: "Dairy",
                    description: "Fresh churned butter",
                    marketValue: 8.00,
                    processingMethod: "Churning, packaging",
                    equipment: ["Churner", "Butter mold", "Packaging"],
                    shelfLife: "2 weeks (refrigerated) or 6 months (frozen)",
                    targetMarket: "Grocery stores, bakeries",
                    processingSteps: [
                        "Collect fresh cream from milk",
                        "Let cream ripen at cool temperature",
                        "Churn cream until butter separates",
                        "Wash butter to remove buttermilk",
                        "Salt to taste (optional)",
                        "Shape or package",
                        "Refrigerate immediately"
                    ],
                    projectedOutput: {
                        yieldPercentage: 20,
                        unit: "kg",
                        outputPer100Liters: 20,
                        estimatedRevenuePer100Liters: 160.00,
                        processingTime: "2-3 hours",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Yogurt",
                    category: "Dairy",
                    description: "Fermented dairy product",
                    marketValue: 5.50,
                    processingMethod: "Fermentation",
                    equipment: ["Heating equipment", "Fermentation tanks", "Packaging"],
                    shelfLife: "2-3 weeks (refrigerated)",
                    targetMarket: "Grocery stores, health food stores",
                    processingSteps: [
                        "Heat milk to 85°C to pasteurize",
                        "Cool to 43-46°C",
                        "Add yogurt starter culture",
                        "Incubate for 6-8 hours",
                        "Cool and package",
                        "Refrigerate immediately"
                    ],
                    projectedOutput: {
                        yieldPercentage: 95,
                        unit: "liters",
                        outputPer100Liters: 95,
                        estimatedRevenuePer100Liters: 522.50,
                        processingTime: "8-10 hours",
                        laborRequired: "1-2 workers"
                    }
                },
                {
                    name: "Cheese",
                    category: "Dairy",
                    description: "Various cheese types",
                    marketValue: 12.00,
                    processingMethod: "Cheese making, aging",
                    equipment: ["Cheese vat", "Press", "Aging room"],
                    shelfLife: "1-12 months depending on type",
                    targetMarket: "Specialty stores, restaurants",
                    processingSteps: [
                        "Heat milk and add starter culture",
                        "Add rennet to form curds",
                        "Cut curds and drain whey",
                        "Press into molds",
                        "Salt and age",
                        "Package when ready"
                    ],
                    projectedOutput: {
                        yieldPercentage: 10,
                        unit: "kg",
                        outputPer100Liters: 10,
                        estimatedRevenuePer100Liters: 120.00,
                        processingTime: "2 weeks - 12 months",
                        laborRequired: "1-2 cheesemakers"
                    }
                },
                {
                    name: "Whey",
                    category: "Animal Feed",
                    description: "Protein-rich byproduct from cheesemaking",
                    marketValue: 1.50,
                    processingMethod: "Drying",
                    equipment: ["Dryer", "Grinding mill"],
                    shelfLife: "12 months",
                    targetMarket: "Feed mills, livestock farmers",
                    processingSteps: [
                        "Collect whey from cheese making",
                        "Dry in spray dryer or drum dryer",
                        "Grind to powder",
                        "Package in bags"
                    ],
                    projectedOutput: {
                        yieldPercentage: 85,
                        unit: "kg",
                        outputPer100Liters: 85,
                        estimatedRevenuePer100Liters: 127.50,
                        processingTime: "1 day",
                        laborRequired: "1 worker"
                    }
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

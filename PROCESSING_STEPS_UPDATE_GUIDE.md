# Processing Steps Update Guide

## Overview
This guide documents the addition of comprehensive processing steps to all farm-to-table products in the byproducts database.

## Status

### ✅ Completed (Products with Processing Steps)
- Cassava Flour
- Cassava Starch  
- Cassava Chips
- Taro Flour
- Taro Chips
- Taro Leaves
- Sweet Potato Flour
- Sweet Potato Chips
- Sweet Potato Vine
- Dried Spinach Powder
- Frozen Spinach
- Lettuce Wraps
- Banana Chips
- Banana Flour
- Banana Vinegar
- Banana Leaves
- Papaya Jam
- Dried Papaya
- Papaya Seeds
- Kava Powder
- Kava Extract
- Kava Tea Bags
- Ginger Powder
- Ginger Tea
- Ginger Oil
- Tomato Sauce
- Tomato Paste
- Sun-Dried Tomatoes
- Tomato Powder
- Potato Chips
- Potato Starch

### 🔄 In Progress
- Adding processing steps to remaining products systematically

## Processing Steps Templates

### Flour Products
```javascript
processingSteps: [
    "Wash and clean raw materials thoroughly",
    "Peel and remove any inedible parts",
    "Cut into small uniform pieces",
    "Dry in sunlight for 5-7 days or use mechanical dehydrator at 60°C",
    "Grind dried pieces into fine powder using grinding mill",
    "Sift through fine mesh to remove impurities and ensure uniform texture",
    "Package in moisture-proof containers with proper labeling",
    "Store in cool, dry place away from direct sunlight"
]
```

### Chips/Snack Products
```javascript
processingSteps: [
    "Wash and peel raw materials",
    "Slice uniformly (2-3mm thickness) using slicer",
    "Rinse slices to remove excess starch",
    "Deep fry at 180°C until golden and crisp (or bake at 200°C for healthier option)",
    "Drain excess oil on paper towels",
    "Season with salt or desired spices while still warm",
    "Cool completely to room temperature",
    "Package in airtight bags with proper labeling",
    "Store in cool, dry place"
]
```

### Dried Products
```javascript
processingSteps: [
    "Select ripe but firm produce",
    "Wash and clean thoroughly",
    "Cut into uniform pieces or slices",
    "Pre-treat with lemon juice or salt water to prevent browning (if needed)",
    "Arrange on drying racks or dehydrator trays",
    "Dry in dehydrator at 60°C for 12-24 hours (or sun dry for 3-5 days)",
    "Check for proper moisture content (should be leathery, not brittle)",
    "Cool completely before packaging",
    "Package in airtight containers or vacuum seal",
    "Store in cool, dry place"
]
```

### Jam/Preserves
```javascript
processingSteps: [
    "Wash and prepare fruits, removing stems and seeds",
    "Cut fruits into small pieces",
    "Cook fruits with sugar and pectin until soft",
    "Mash or blend to desired consistency",
    "Continue cooking until mixture reaches gel point (105°C)",
    "Test for proper set using cold plate test",
    "Skim off any foam",
    "Fill sterilized jars while hot, leaving 1/4 inch headspace",
    "Process in water bath for 10-15 minutes",
    "Cool jars completely and check seals",
    "Label and store in cool, dark place"
]
```

### Sauce/Paste Products
```javascript
processingSteps: [
    "Wash and prepare ingredients",
    "Remove stems, seeds, and inedible parts",
    "Blanch in boiling water for 30 seconds to loosen skins",
    "Peel and chop into pieces",
    "Cook with seasonings and spices for 1-2 hours until soft",
    "Blend to desired consistency",
    "Strain to remove seeds and skins (if needed)",
    "Return to heat and simmer until desired thickness",
    "Can or bottle while hot",
    "Process in water bath for 40 minutes",
    "Cool and check seals before storing"
]
```

### Frozen Products
```javascript
processingSteps: [
    "Wash and clean produce thoroughly",
    "Blanch in boiling water for 2-3 minutes",
    "Immediately transfer to ice water bath to stop cooking",
    "Drain excess water completely",
    "Portion into freezer-safe containers or bags",
    "Remove air from bags (vacuum seal if possible)",
    "Label with date and contents",
    "Freeze at -18°C or below",
    "Store frozen until ready to use"
]
```

### Animal Feed Products
```javascript
processingSteps: [
    "Harvest fresh materials at optimal maturity",
    "Clean and remove any contaminants",
    "Chop or shred into appropriate sizes",
    "Dry in sunlight for 3-5 days or use mechanical dryer",
    "Grind to desired particle size (if needed)",
    "Mix with other feed ingredients (if making feed mix)",
    "Package in moisture-proof bags",
    "Store in dry, well-ventilated area",
    "Label with nutritional information and expiration date"
]
```

### Tea/Beverage Products
```javascript
processingSteps: [
    "Harvest fresh materials at peak quality",
    "Wash and clean thoroughly",
    "Slice or chop into uniform pieces",
    "Dry in dehydrator at 50-60°C for 12-24 hours",
    "Check for proper dryness (should crumble easily)",
    "Package in airtight containers or tea bags",
    "Store away from light, moisture, and strong odors",
    "Label with brewing instructions"
]
```

### Oil/Extract Products
```javascript
processingSteps: [
    "Prepare raw materials (clean and prepare)",
    "Extract using cold press or steam distillation method",
    "Filter to remove sediment and impurities",
    "Store in dark glass bottles",
    "Label with extraction date and method",
    "Store in cool, dark place away from light"
]
```

### Powder Products
```javascript
processingSteps: [
    "Wash and prepare raw materials",
    "Slice or cut into small pieces",
    "Dry in dehydrator at 60°C for 24-36 hours until completely dry",
    "Grind to fine powder using grinding mill",
    "Sift through fine mesh to ensure uniform texture",
    "Package in moisture-proof containers",
    "Store in cool, dry place away from light"
]
```

### Prepared Food Products
```javascript
processingSteps: [
    "Select fresh, crisp produce",
    "Wash thoroughly in cold water",
    "Remove outer damaged parts",
    "Cut into uniform pieces",
    "Dry completely using appropriate method",
    "Inspect for quality and consistency",
    "Package in food-safe containers with proper ventilation",
    "Label with preparation date, ingredients, and storage instructions",
    "Refrigerate at 4°C or below",
    "Follow food safety guidelines throughout processing"
]
```

## Next Steps

1. **Continue adding processing steps** to remaining products using the templates above
2. **Add projectedOutput** data for products missing it
3. **Test the farm-to-table interface** to ensure all steps display correctly
4. **Update documentation** as new products are added

## File Location
`public/js/byproducts-database.js`

## How to Add Processing Steps

1. Find the product in the database
2. Identify the product type (flour, chips, jam, etc.)
3. Use the appropriate template from above
4. Customize steps based on the specific product
5. Add `projectedOutput` if missing
6. Test in the farm-to-table interface

## Notes

- All processing steps should be practical and actionable
- Include specific temperatures, times, and measurements where relevant
- Ensure steps follow food safety guidelines
- Steps should be ordered logically from start to finish
- Each step should be a complete sentence


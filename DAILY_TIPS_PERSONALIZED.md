# Personalized Daily Farming Tips Feature

## Overview
The daily tips feature has been enhanced to provide **personalized tips** based on the specific crops and livestock that each farmer is actually farming. Tips are now contextual and relevant to the farmer's operations.

## How It Works

### 1. **Personalized Tip Selection**
- The system fetches the farmer's crops and livestock from their account
- Tips are matched to specific crop types (tomatoes, corn, wheat, etc.) or livestock types (cattle, chickens, goats, etc.)
- Tips can also be matched based on growth stages (seedling, flowering, fruiting) or health status

### 2. **Tip Matching Logic**

#### For Crops:
- **Crop-specific tips**: Tips tailored to specific crops (e.g., "Tomato Pruning for Better Yield")
- **Crop type tips**: Tips for crop categories (vegetables, grains, fruits)
- **Growth stage tips**: Tips based on current growth stage (seedling, flowering, fruiting)
- **General crop tips**: Fallback tips for any crops

#### For Livestock:
- **Livestock-specific tips**: Tips tailored to specific animals (e.g., "Cattle Grazing Management")
- **Livestock type tips**: Tips for animal categories (cattle, poultry, small ruminants)
- **Health-focused tips**: Tips when animals have health issues
- **General livestock tips**: Fallback tips for any livestock

### 3. **Priority System**
1. First tries to match specific crop/livestock names
2. Then matches by crop/livestock types
3. Then matches by growth stage/health status
4. Falls back to general tips if no match

## API Endpoints

### Personalized Tip
```
GET /api/daily-tips/personalized?crops=[...]&livestock=[...]
```
**Query Parameters:**
- `crops`: JSON array of crop objects (optional)
- `livestock`: JSON array of livestock objects (optional)

**Example:**
```javascript
// With crops
GET /api/daily-tips/personalized?crops=[{"name":"Tomato","type":"vegetable","status":"fruiting"}]

// With livestock
GET /api/daily-tips/personalized?livestock=[{"type":"cattle","breed":"Holstein"}]

// With both
GET /api/daily-tips/personalized?crops=[...]&livestock=[...]
```

### Fallback Endpoints
- `GET /api/daily-tips/today` - Generic daily tip (when no crops/livestock)
- `GET /api/daily-tips/all` - All available tips
- `GET /api/daily-tips/category/:category` - Tips by category

## Crop-Specific Tips Available

### Tomatoes (🍅)
- Tomato Pruning for Better Yield
- Tomato Watering Best Practices
- Tomato Seedling Care

### Corn (🌽)
- Corn Pollination Success
- Corn Watering During Tasseling

### Wheat/Grains (🌾)
- Wheat Growth Stage Monitoring
- Rice Water Management

### Potatoes (🥔)
- Potato Hilling Technique
- Potato Blight Prevention

### Growth Stage Tips
- Seedling Care Essentials
- Flowering Stage Nutrition
- Fruiting Stage Care

## Livestock-Specific Tips Available

### Cattle (🐄)
- Cattle Grazing Management
- Dairy Cow Milking Schedule
- Cattle Heat Stress Prevention

### Chickens/Poultry (🐔)
- Chicken Egg Collection
- Chicken Coop Ventilation
- Poultry Feed Management

### Goats (🐐)
- Goat Hoof Trimming
- Goat Parasite Control

### Pigs (🐷)
- Pig Wallowing Behavior
- Pig Feed Efficiency

### Sheep (🐑)
- Sheep Shearing Timing
- Sheep Foot Rot Prevention

### Health-Focused Tips
- Early Disease Detection
- Regular Health Checks

## Web Widget Features

### Automatic Personalization
- Fetches user's crops and livestock automatically
- Requests personalized tips based on their data
- Falls back to generic tips if no crops/livestock

### Visual Indicators
- Shows "Tip personalized based on your crops/livestock" when applicable
- Category badges (Gardening/Animal Rearing)
- Crop/livestock-specific icons

### Interactive Features
- "New Tip" button - Gets another personalized tip
- "View All" button - Browse all tips (coming soon)
- Automatic refresh on page load

## Implementation Details

### Backend (`backend/routes/daily-tips.js`)
- **115+ personalized tips** covering:
  - 15+ crop-specific tips
  - 15+ livestock-specific tips
  - Growth stage-specific tips
  - Health-focused tips
  - General tips as fallback

### Frontend (`web-project/public/js/daily-tips.js`)
- Fetches crops via `SmartFarmAPI.getCrops()` or direct API call
- Fetches livestock via `SmartFarmAPI.getLivestock()` or direct API call
- Sends data to `/api/daily-tips/personalized` endpoint
- Handles errors gracefully with fallback tips

## Example Scenarios

### Scenario 1: Farmer Growing Tomatoes
**Crops:** `[{"name": "Tomato", "type": "vegetable", "status": "fruiting"}]`
**Tip Received:** "Tomato Pruning for Better Yield" - Specific tip about removing suckers from tomato plants

### Scenario 2: Farmer with Dairy Cattle
**Livestock:** `[{"type": "cattle", "breed": "Holstein"}]`
**Tip Received:** "Dairy Cow Milking Schedule" - Specific tip about consistent milking times

### Scenario 3: Farmer with Multiple Crops
**Crops:** `[{"name": "Corn"}, {"name": "Wheat"}]`
**Tip Received:** Tip matching the most common crop type or a general crop tip

### Scenario 4: Farmer with Sick Animals
**Livestock:** `[{"type": "chicken", "healthStatus": "sick"}]`
**Tip Received:** "Early Disease Detection" - Health-focused tip

### Scenario 5: New Farmer (No Crops/Livestock)
**Crops:** `[]`, **Livestock:** `[]`
**Tip Received:** Generic daily tip (rotates based on day of year)

## Benefits

1. **Relevance**: Tips are directly applicable to what the farmer is actually doing
2. **Actionable**: Specific advice for specific crops/animals
3. **Timely**: Tips match current growth stages or health status
4. **Educational**: Helps farmers learn best practices for their specific operations
5. **Engagement**: More likely to be read and followed when relevant

## Future Enhancements

1. **Seasonal Tips**: Tips that change based on season and location
2. **Weather-Based Tips**: Tips adjusted for current weather conditions
3. **Tip History**: Show tips from previous days
4. **Tip Favorites**: Allow farmers to save useful tips
5. **Tip Search**: Search tips by keyword or crop/livestock type
6. **Tip Sharing**: Share tips with other farmers
7. **AI-Generated Tips**: Use AI to generate custom tips based on farm data
8. **Tip Reminders**: Push notifications for important tips

## Testing

### Test Personalized Tips:
```bash
# With crops
curl "https://smartfarm-app-production.up.railway.app/api/daily-tips/personalized?crops=[{\"name\":\"Tomato\",\"status\":\"fruiting\"}]"

# With livestock
curl "https://smartfarm-app-production.up.railway.app/api/daily-tips/personalized?livestock=[{\"type\":\"cattle\"}]"

# With both
curl "https://smartfarm-app-production.up.railway.app/api/daily-tips/personalized?crops=[{\"name\":\"Corn\"}]&livestock=[{\"type\":\"chicken\"}]"
```

### Test in Web Dashboard:
1. Login to dashboard
2. Add some crops (e.g., Tomatoes)
3. Add some livestock (e.g., Cattle)
4. Daily tip widget should show personalized tips
5. Click "New Tip" to get different personalized tips

## Notes

- Tips are matched intelligently using fuzzy matching (partial string matching)
- System prioritizes specific tips over general tips
- Falls back gracefully if no match is found
- Works even if API is unavailable (shows fallback tips)
- Tips are curated by agricultural experts


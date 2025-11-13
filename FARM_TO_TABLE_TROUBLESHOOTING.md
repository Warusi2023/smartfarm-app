# Farm-to-Table Recommendations - Troubleshooting Guide

## 🔍 Quick Check

If you don't see recommendations on the Farm-to-Table page, follow these steps:

### 1. Check Browser Console
Open your browser's Developer Tools (F12) and check the Console tab. You should see:
- `🚀 Initializing Farm-to-Table Recommendation Service...`
- `📦 Loaded X crops for recommendations`
- `🐄 Loaded X livestock for recommendations`
- `✅ Generated X unique recommendations`

### 2. Verify You Have Crops/Livestock
- Go to **Crop Management** page - Do you have crops listed?
- Go to **Livestock Management** page - Do you have livestock listed?
- If no, add some crops/livestock first, then return to Farm-to-Table

### 3. Check the Smart Recommendations Tab
- On the Farm-to-Table page, look for the **"Smart Recommendations"** tab
- It should be visible in the tab bar (with a lightbulb icon 💡)
- Click on it to view recommendations
- If you see a badge number, that's how many recommendations are available

### 4. Manual Refresh
- Click the **"Refresh Recommendations"** button in the Smart Recommendations tab
- This will force a sync with your current crops/livestock

### 5. Check localStorage
Open browser console and run:
```javascript
// Check crops
console.log('Crops:', JSON.parse(localStorage.getItem('smartfarm_crops') || '[]'));

// Check livestock
console.log('Livestock:', JSON.parse(localStorage.getItem('livestock') || '[]'));

// Check recommendations
console.log('Products:', JSON.parse(localStorage.getItem('farmToTableProducts') || '[]'));
```

### 6. Common Issues

**Issue: "No recommendations available"**
- **Cause**: You don't have crops/livestock that match the byproducts database
- **Solution**: Add crops like "cassava", "banana", "cattle", etc. that have byproducts defined

**Issue: Tab not visible**
- **Cause**: Script might not have loaded
- **Solution**: Hard refresh the page (Ctrl+F5) and check console for errors

**Issue: Recommendations not generating**
- **Cause**: ByproductsDatabase not loaded
- **Solution**: Check that `js/byproducts-database.js` is loaded before the recommendation service

**Issue: Wrong crop names**
- **Cause**: Crop names must match database keys (case-insensitive, but spelling matters)
- **Solution**: Use exact crop names like "cassava", "banana", "tomato", etc.

---

## 🧪 Test Steps

1. **Add a test crop:**
   - Go to Crop Management
   - Add a crop named "cassava" (or "banana", "tomato")
   - Save it

2. **Check Farm-to-Table:**
   - Go to Farm-to-Table page
   - Click "Smart Recommendations" tab
   - You should see recommendations for that crop

3. **Add test livestock:**
   - Go to Livestock Management
   - Add livestock with type "cattle" (or "pigs", "chickens")
   - Save it

4. **Check again:**
   - Return to Farm-to-Table
   - Click "Refresh Recommendations"
   - You should see recommendations for the livestock too

---

## 📝 Debug Commands

Run these in the browser console on the Farm-to-Table page:

```javascript
// Check if service is initialized
console.log('Service:', window.recommendationService);

// Manually sync
if (window.recommendationService) {
    window.recommendationService.syncRecommendations().then(products => {
        console.log('Products:', products);
    });
}

// Check byproducts database
console.log('Byproducts DB:', window.ByproductsDatabase);

// Check crops
console.log('Crops:', JSON.parse(localStorage.getItem('smartfarm_crops') || '[]'));

// Check livestock
console.log('Livestock:', JSON.parse(localStorage.getItem('livestock') || '[]'));
```

---

## ✅ Expected Behavior

When working correctly:
1. Page loads → Service initializes
2. Service loads crops and livestock from localStorage
3. Service generates recommendations based on byproducts database
4. Recommendations appear in "Smart Recommendations" tab
5. Badge shows count of recommendations
6. When you delete a crop/livestock → Related recommendations disappear

---

## 🐛 Still Not Working?

1. **Clear browser cache** and hard refresh (Ctrl+F5)
2. **Check Network tab** - Ensure all scripts are loading (no 404 errors)
3. **Check Console** - Look for any red error messages
4. **Verify script order** - byproducts-database.js must load before farm-to-table-recommendation-service.js

If still having issues, check the console logs and share the error messages.


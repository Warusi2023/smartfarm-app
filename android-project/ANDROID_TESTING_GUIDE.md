# 🧪 Android App Testing Guide

This guide will help you test the new features in Android Studio.

## ✅ Features to Test

### 1. Health Record Functionality (Livestock)
### 2. Crop Maturity Calculator (Vanilla & Other Crops)

---

## 📱 Testing in Android Studio

### Prerequisites
1. **Open Android Studio**
2. **Open the project**: `E:\Document\SmartFarm\android-project`
3. **Sync Gradle**: Click "Sync Now" if prompted
4. **Build the project**: Build → Make Project (Ctrl+F9)

---

## 🐄 Test 1: Health Records for Livestock

### Steps:
1. **Run the app** on an emulator or device
2. **Navigate to Livestock Management** screen
3. **Select a livestock animal** (e.g., "Bessie" the cow)
4. **Click on the animal card** to open details dialog
5. **Click "Health Records" button**
6. **Verify**: You should see "No health records yet" message
7. **Click "Add Record" button**
8. **Fill in the form**:
   - Record Type: Select "Vaccination"
   - Date: Enter today's date (YYYY-MM-DD format)
   - Performed By: Enter "Dr. Smith"
   - Cost: Enter "50.00"
   - Notes: Enter "Annual vaccination completed"
9. **Click "Save"**
10. **Verify**: 
    - Dialog closes and returns to health records list
    - New record appears in the list
    - Record shows type, date, performed by, and notes

### Expected Results:
- ✅ Health records dialog opens
- ✅ Can add new health records
- ✅ Records are saved and displayed
- ✅ Record count updates in livestock details

### Test Multiple Records:
1. Add 2-3 more health records with different types
2. Verify all records appear in chronological order
3. Close and reopen the livestock details
4. Verify records persist

---

## 🌱 Test 2: Crop Maturity Calculator - Vanilla

### Steps:
1. **Navigate to Crop Management** screen
2. **Click "Add Crop" button**
3. **Fill in the form**:
   - Crop Name: Enter **"vanilla"** (lowercase)
   - Variety: Enter "Vanilla planifolia"
   - Area: Enter "0.5"
   - Planted Date: Enter "2024-01-01"
   - **Expected Harvest Date**: Should **auto-calculate** to **"2027-01-01"** (3 years later)
4. **Verify**: 
   - Harvest date field shows "2027-01-01"
   - Field is read-only (auto-calculated)
   - Supporting text shows "Calculated based on crop type"
5. **Click "Add"**
6. **Verify**: 
   - Crop appears in the list
   - Harvest date shows as "2027-01-01"

### Expected Results:
- ✅ Vanilla maturity date = **1095 days** (3 years)
- ✅ Auto-calculation works when entering crop name and planted date
- ✅ Harvest date field is read-only and shows calculated date

---

## 🌾 Test 3: Crop Maturity Calculator - Other Crops

### Test Cases:

#### Test Case 3.1: Tomatoes
- Crop Name: **"tomatoes"**
- Planted Date: "2024-01-01"
- **Expected**: Harvest date = "2024-03-16" (75 days)

#### Test Case 3.2: Kava
- Crop Name: **"kava"**
- Planted Date: "2022-01-15"
- **Expected**: Harvest date = "2025-01-15" (1095 days = 3 years)

#### Test Case 3.3: Unknown Crop
- Crop Name: **"unknown-crop"**
- Planted Date: "2024-01-01"
- **Expected**: Harvest date = "2024-03-01" (60 days default fallback)

### Steps for Each Test:
1. Open "Add Crop" dialog
2. Enter crop name and planted date
3. Verify auto-calculated harvest date
4. Add the crop
5. Verify it appears with correct harvest date

---

## 🔍 Test 4: Data Persistence

### Health Records:
1. Add a health record to a livestock animal
2. Close the app completely
3. Reopen the app
4. Navigate to the same livestock animal
5. **Verify**: Health record is still there

### Crop Maturity:
1. Add a vanilla crop
2. Close the app completely
3. Reopen the app
4. Navigate to crops
5. **Verify**: Vanilla crop shows correct 3-year harvest date

---

## 🐛 Troubleshooting

### Issue: Health records not saving
**Solution**: 
- Check that `dataService.addHealthRecord()` is being called
- Verify livestock is found in the mock data
- Check console logs for errors

### Issue: Crop maturity not calculating
**Solution**:
- Verify crop name matches database (case-insensitive)
- Check that `CropMaturityCalculator` is imported
- Verify planted date is in correct format (YYYY-MM-DD)

### Issue: App crashes when opening livestock details
**Solution**:
- Check that all required parameters are passed to `LivestockDetailsDialog`
- Verify `dataService` is not null
- Check for missing imports

### Issue: Vanilla shows wrong maturity date
**Solution**:
- Verify `CropMaturityCalculator.kt` has vanilla = 1095 days
- Check that crop name is normalized to lowercase
- Verify the calculation logic

---

## 📊 Test Checklist

### Health Records:
- [ ] Can open health records dialog
- [ ] Can add new health record
- [ ] Health record saves correctly
- [ ] Health record displays in list
- [ ] Multiple records can be added
- [ ] Records persist after app restart
- [ ] Record count updates correctly

### Crop Maturity:
- [ ] Vanilla calculates to 3 years (1095 days)
- [ ] Tomatoes calculates to 75 days
- [ ] Kava calculates to 1095 days
- [ ] Unknown crops default to 60 days
- [ ] Auto-calculation works in Add Crop dialog
- [ ] Harvest date field is read-only
- [ ] Supporting text shows correctly
- [ ] Maturity dates persist after saving

---

## 🎯 Quick Test Commands

### Run Unit Tests (if available):
```bash
./gradlew test
```

### Run on Emulator:
1. Tools → Device Manager
2. Create/Start an emulator
3. Run → Run 'app'

### Run on Physical Device:
1. Enable USB Debugging on device
2. Connect via USB
3. Run → Run 'app'

---

## 📝 Expected Test Results Summary

| Feature | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| Health Records | Add record | Record saved and displayed | ⬜ |
| Health Records | Multiple records | All records visible | ⬜ |
| Health Records | Persistence | Records survive app restart | ⬜ |
| Vanilla Maturity | 3-year calculation | 1095 days from planting | ⬜ |
| Tomato Maturity | 75-day calculation | 75 days from planting | ⬜ |
| Auto-calculation | Real-time update | Updates as you type | ⬜ |
| Unknown Crop | Default fallback | 60 days default | ⬜ |

---

## 🚀 Next Steps After Testing

1. **If all tests pass**: Features are ready for production
2. **If issues found**: 
   - Check console logs in Android Studio
   - Verify all imports are correct
   - Check that DataService methods are being called
   - Review error messages

3. **Report Issues**: Document any bugs or unexpected behavior

---

## 💡 Tips

- Use **Logcat** in Android Studio to see debug messages
- Set breakpoints in `DataService.kt` to debug data flow
- Use **Layout Inspector** to verify UI components
- Check **Build Output** for compilation errors

---

## ✅ Success Criteria

All features work correctly if:
- ✅ Health records can be added and viewed
- ✅ Vanilla crop shows 3-year maturity (1095 days)
- ✅ Other crops calculate correct maturity dates
- ✅ Data persists across app sessions
- ✅ No crashes or errors in Logcat

Good luck testing! 🎉


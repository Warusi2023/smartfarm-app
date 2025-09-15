# SmartFarm Database Tables Overview

## 🗄️ Complete Table Structure (46 Tables)

### **Core Management Tables**
1. **`users`** - User accounts and authentication
2. **`roles`** - User roles (owner, admin, manager, worker, viewer)
3. **`farms`** - Farm information and location data
4. **`farm_members`** - Farm membership and permissions

### **Field & Crop Management**
5. **`fields`** - Individual field/plot information
6. **`crops`** - Crop definitions and specifications
7. **`crop_varieties`** - Specific crop varieties
8. **`plantings`** - Planting records and schedules

### **Agricultural Operations**
9. **`irrigation_events`** - Irrigation tracking and data
10. **`fertilization_events`** - Fertilizer applications
11. **`pest_disease_events`** - Pest and disease management
12. **`harvests`** - Harvest records and yields

### **Storage & Inventory**
13. **`storage_units`** - Storage facility management
14. **`inventory_items`** - Product catalog and items
15. **`inventory_locations`** - Inventory location tracking
16. **`inventory_balances`** - Current stock levels
17. **`inventory_movements`** - Stock movement tracking

### **Livestock Management**
18. **`livestock_groups`** - Animal group management
19. **`animals`** - Individual animal records
20. **`animal_health_events`** - Health tracking and treatments

### **Task & Project Management**
21. **`tasks`** - Task management and tracking
22. **`task_assignees`** - Task assignments

### **IoT & Monitoring**
23. **`sensors`** - IoT sensor device management
24. **`sensor_readings`** - Real-time sensor data
25. **`weather_observations`** - Weather data collection

### **Business & Sales**
26. **`customers`** - Customer management
27. **`suppliers`** - Supplier information
28. **`sales_orders`** - Sales order tracking
29. **`sales_order_items`** - Order line items
30. **`purchase_orders`** - Purchase order management
31. **`purchase_order_items`** - Purchase line items

### **Shipping & Logistics**
32. **`shipments`** - Shipment tracking
33. **`shipment_items`** - Shipment contents

### **Financial Management**
34. **`invoices`** - Invoice generation and tracking
35. **`invoice_items`** - Invoice line items
36. **`payments`** - Payment processing and tracking

### **Advanced Agriculture**
37. **`greenhouses`** - Greenhouse facility management
38. **`greenhouse_zones`** - Greenhouse zone control
39. **`greenhouse_readings`** - Environmental monitoring
40. **`nutrient_recipes`** - Nutrient solution recipes
41. **`nutrient_recipe_components`** - Recipe ingredients

### **Testing & Compliance**
42. **`soil_tests`** - Soil analysis results
43. **`water_tests`** - Water quality testing
44. **`compliance_audits`** - Compliance and certification tracking

### **System & Documentation**
45. **`documents`** - File and document management
46. **`alerts`** - System alerts and notifications

## 🎯 Key Features

- **UUID Primary Keys** - Scalable and secure
- **Automatic Timestamps** - Created/updated tracking
- **Foreign Key Constraints** - Data integrity
- **Indexes** - Optimized query performance
- **Enums** - Type safety for status fields
- **JSONB Fields** - Flexible metadata storage
- **Triggers** - Automatic timestamp updates

## 📊 Database Statistics

- **Total Tables**: 46
- **Core Tables**: 8 (users, farms, fields, crops, etc.)
- **Operations Tables**: 12 (irrigation, fertilization, harvests, etc.)
- **Business Tables**: 16 (customers, orders, invoices, etc.)
- **IoT Tables**: 4 (sensors, readings, weather, etc.)
- **Advanced Tables**: 6 (greenhouses, tests, compliance, etc.)

## 🚀 Ready for Production

Your database schema is:
- ✅ **Comprehensive** - Covers all farm management aspects
- ✅ **Scalable** - UUID primary keys and proper indexing
- ✅ **Secure** - Foreign key constraints and data validation
- ✅ **Flexible** - JSONB fields for custom data
- ✅ **Professional** - Industry-standard design patterns

---

**Status**: Ready for Railway deployment
**Migration File**: `database/migrations/001_full_schema.sql`
**Verification Script**: `verify-database.js`

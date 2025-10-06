# Shared Variables Between Web and SmartFarm-App Components

## 🔗 **Variables That MUST Be The Same**

### **API Configuration**
```
VITE_API_URL = https://smartfarm-backend.railway.app
VITE_API_BASE_URL = https://smartfarm-backend.railway.app
NEXT_PUBLIC_API_BASE_URL = https://smartfarm-backend.railway.app
```

### **External Services (Same API Keys)**
```
VITE_OPENWEATHER_API_KEY = same_weather_api_key
VITE_WEATHER_API_KEY = same_weather_api_key
OPENWEATHER_API_KEY = same_weather_api_key
VITE_MAPS_API_KEY = same_google_maps_api_key
WEATHER_API_KEY = same_weather_api_key
GOOGLE_MAPS_API_KEY = same_google_maps_api_key
```

### **Security & Authentication (Same Secrets)**
```
JWT_SECRET = same_jwt_secret
SESSION_SECRET = same_session_secret
```

### **Database (If Both Use Same DB)**
```
DATABASE_URL = same_database_connection_string
```

## 🔄 **Variables That SHOULD Be The Same**

### **Environment Configuration**
```
NODE_ENV = production (both should be production)
LOG_LEVEL = info (for consistent logging)
```

### **CORS Configuration**
```
CORS_ORIGINS = same_allowed_origins
```

### **Feature Flags (Consistent Experience)**
```
VITE_FEATURE_AI_ADVISORY = same_value
VITE_FEATURE_GEOFENCING = same_value
VITE_FEATURE_BYPRODUCTS = same_value
VITE_FEATURE_SUBSCRIPTIONS = same_value
```

## 🚫 **Variables That Should Be DIFFERENT**

### **Port Configuration**
```
PORT = 3000 (web component)
PORT = 8080 (smartfarm-app component)
```

### **Component-Specific URLs**
```
VITE_API_URL = https://smartfarm-backend.railway.app (web connects TO smartfarm-app)
# smartfarm-app doesn't need this - it IS the API
```

## 📋 **Railway Setup Strategy**

### **Option 1: Shared Variables (Recommended)**
1. In Railway Dashboard → Go to your **Project Settings**
2. Create **Project Variables** (shared across all components)
3. Add these as **Project Variables**:
   ```
   WEATHER_API_KEY = your_openweathermap_key
   GOOGLE_MAPS_API_KEY = your_google_maps_key
   JWT_SECRET = your_jwt_secret
   SESSION_SECRET = your_session_secret
   DATABASE_URL = your_database_url
   NODE_ENV = production
   LOG_LEVEL = info
   ```

### **Option 2: Component-Specific Variables**
1. Go to each component individually
2. Add the same values to both `web` and `smartfarm-app`
3. Use the **"Raw Editor"** to copy-paste the same JSON

## 🎯 **Quick Setup Checklist**

### **For Web Component:**
```
NODE_ENV = production
PORT = 3000
VITE_API_URL = https://smartfarm-backend.railway.app
WEATHER_API_KEY = [same as smartfarm-app]
GOOGLE_MAPS_API_KEY = [same as smartfarm-app]
JWT_SECRET = [same as smartfarm-app]
SESSION_SECRET = [same as smartfarm-app]
```

### **For SmartFarm-App Component:**
```
NODE_ENV = production
PORT = 8080
WEATHER_API_KEY = [same as web]
GOOGLE_MAPS_API_KEY = [same as web]
JWT_SECRET = [same as web]
SESSION_SECRET = [same as web]
DATABASE_URL = [your database connection]
```

## ⚠️ **Important Notes:**

1. **API Keys**: Must be identical - both components use the same external services
2. **Secrets**: Must be identical - both components need to verify the same tokens
3. **Database**: Should be identical if both components access the same database
4. **Ports**: Must be different - each component needs its own port
5. **API URLs**: Only web component needs to point to smartfarm-app

## 🔧 **How to Check Current Variables:**

1. **Web Component**: Railway Dashboard → Web → Variables
2. **SmartFarm-App Component**: Railway Dashboard → SmartFarm-App → Variables
3. **Compare** the values and ensure shared ones match

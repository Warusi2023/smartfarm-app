# SmartFarm Backend API - Quick Start Guide

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn
- SQLite (for development)
- PostgreSQL (for production, optional)

### **1. Install Dependencies**
```bash
cd backend-api
npm install
```

### **2. Environment Setup**
```bash
# Copy the example environment file
cp config.env.example .env

# Edit .env with your configuration
nano .env
```

**Required Environment Variables:**
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your-secret-key-here
DB_TYPE=sqlite
DB_PATH=./database/smartfarm.db
```

### **3. Initialize Database**
```bash
# The database will be automatically created on first run
# Sample data will be inserted automatically
npm start
```

### **4. Start the Server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 📊 **API Testing**

### **Health Check**
```bash
curl http://localhost:3000/api/health
```

### **User Registration**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Farmer",
    "role": "farmer"
  }'
```

### **User Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@example.com",
    "password": "password123"
  }'
```

### **Create Farm (Authenticated)**
```bash
# Use the token from login response
curl -X POST http://localhost:3000/api/farms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Green Acres Farm",
    "location": "Springfield, IL",
    "size": 150.0,
    "ownerId": "farmer-001"
  }'
```

## 🔧 **Available Endpoints**

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get profile (authenticated)
- `PUT /api/auth/profile` - Update profile (authenticated)
- `PUT /api/auth/change-password` - Change password (authenticated)

### **Farm Management**
- `GET /api/farms` - List farms (authenticated)
- `GET /api/farms/:id` - Get farm details (authenticated)
- `POST /api/farms` - Create farm (authenticated)
- `PUT /api/farms/:id` - Update farm (authenticated)
- `DELETE /api/farms/:id` - Delete farm (authenticated)
- `GET /api/farms/:id/stats` - Farm statistics (authenticated)

### **Crop Management**
- `GET /api/crops` - List crops (authenticated)
- `GET /api/crops/:id` - Get crop details (authenticated)
- `POST /api/crops` - Create crop (authenticated)
- `PUT /api/crops/:id` - Update crop (authenticated)
- `DELETE /api/crops/:id` - Delete crop (authenticated)
- `PATCH /api/crops/:id/status` - Update crop status (authenticated)
- `GET /api/crops/:id/analytics` - Crop analytics (authenticated)

### **Livestock Management**
- `GET /api/livestock` - List livestock (authenticated)
- `GET /api/livestock/:id` - Get livestock details (authenticated)
- `POST /api/livestock` - Create livestock (authenticated)
- `PUT /api/livestock/:id` - Update livestock (authenticated)
- `DELETE /api/livestock/:id` - Delete livestock (authenticated)
- `PATCH /api/livestock/:id/health` - Update health status (authenticated)
- `PATCH /api/livestock/:id/vaccination` - Update vaccination (authenticated)
- `GET /api/livestock/:id/analytics` - Livestock analytics (authenticated)

### **Financial Management**
- `GET /api/financial` - List financial records (authenticated)
- `GET /api/financial/:id` - Get record details (authenticated)
- `POST /api/financial` - Create record (authenticated)
- `PUT /api/financial/:id` - Update record (authenticated)
- `DELETE /api/financial/:id` - Delete record (authenticated)
- `GET /api/financial/summary/:farmId` - Financial summary (authenticated)
- `GET /api/financial/analytics/:farmId` - Financial analytics (authenticated)

### **Analytics**
- `GET /api/analytics/farm/:farmId` - Farm analytics (authenticated)
- `GET /api/analytics/yield-predictions/:farmId` - Yield predictions (authenticated)
- `GET /api/analytics/revenue-analysis/:farmId` - Revenue analysis (authenticated)
- `GET /api/analytics/cost-breakdown/:farmId` - Cost breakdown (authenticated)
- `GET /api/analytics/weather-impact/:farmId` - Weather impact (authenticated)
- `GET /api/analytics/efficiency/:farmId` - Efficiency metrics (authenticated)

## 🗄️ **Database Schema**

The database includes the following tables:
- **users** - User accounts and authentication
- **farms** - Farm information and ownership
- **crops** - Crop management and tracking
- **livestock** - Animal management and health
- **tasks** - Task management and scheduling
- **financial_records** - Income and expense tracking
- **inventory** - Stock and supply management
- **employees** - Staff management
- **weather_data** - Weather information
- **documents** - File management
- **analytics_data** - Performance metrics

## 🔒 **Security Features**

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - User roles (farmer, manager, admin)
- **Input Validation** - Comprehensive request validation
- **SQL Injection Protection** - Parameterized queries
- **CORS Configuration** - Cross-origin resource sharing
- **Rate Limiting** - API request throttling
- **Security Headers** - HTTP security with Helmet

## 🧪 **Testing**

### **Run Tests**
```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

### **Test Coverage**
```bash
npm run test:coverage
```

## 📚 **Documentation**

- **API Documentation**: `http://localhost:3000/api/docs`
- **Health Check**: `http://localhost:3000/api/health`
- **Database Schema**: `./database/schema.sql`
- **Environment Config**: `./config.env.example`

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Port Already in Use**
   ```bash
   # Change port in .env file
   PORT=3001
   ```

2. **Database Connection Error**
   ```bash
   # Check database path in .env
   DB_PATH=./database/smartfarm.db
   ```

3. **JWT Token Issues**
   ```bash
   # Ensure JWT_SECRET is set in .env
   JWT_SECRET=your-secret-key-here
   ```

4. **CORS Errors**
   ```bash
   # Check CORS_ORIGIN in .env
   CORS_ORIGIN=http://localhost:3000,http://localhost:8080
   ```

### **Logs**
Check the console output for detailed error messages and request logs.

## 🔄 **Development Workflow**

1. **Make Changes** - Edit route files in `./routes/`
2. **Test Locally** - Use the API endpoints
3. **Update Schema** - Modify `./database/schema.sql` if needed
4. **Test Database** - Verify data integrity
5. **Update Documentation** - Keep README and status files current

## 📈 **Next Steps**

1. **Complete Missing Controllers** - Tasks, Users, Inventory, etc.
2. **Add Real-time Features** - WebSocket integration
3. **Implement File Upload** - Document management
4. **Add Caching** - Redis integration
5. **Production Deployment** - PostgreSQL migration

---

**Need Help?** Check the `BACKEND_IMPLEMENTATION_STATUS.md` file for detailed progress information.

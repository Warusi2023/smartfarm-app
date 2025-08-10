const { sequelize } = require('./config');
const models = require('./models');

async function runMigrations() {
  try {
    console.log('🔄 Starting database migrations...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync all models with database (create tables)
    console.log('📝 Creating database tables...');
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Database tables created/updated successfully.');
    
    // Create indexes for better performance
    console.log('🔍 Creating database indexes...');
    await createIndexes();
    console.log('✅ Database indexes created successfully.');
    
    console.log('🎉 Database migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

async function createIndexes() {
  try {
    // Create indexes for better query performance
    const indexes = [
      // Users table indexes
      'CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);',
      'CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);',
      'CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);',
      
      // Farms table indexes
      'CREATE INDEX IF NOT EXISTS idx_farms_owner ON farms("ownerId");',
      'CREATE INDEX IF NOT EXISTS idx_farms_manager ON farms("managerId");',
      'CREATE INDEX IF NOT EXISTS idx_farms_parent ON farms("parentFarmId");',
      'CREATE INDEX IF NOT EXISTS idx_farms_status ON farms(status);',
      
      // Livestock table indexes
      'CREATE INDEX IF NOT EXISTS idx_livestock_farm ON livestock("farmId");',
      'CREATE INDEX IF NOT EXISTS idx_livestock_type ON livestock(type);',
      'CREATE INDEX IF NOT EXISTS idx_livestock_health ON livestock("healthStatus");',
      
      // Crops table indexes
      'CREATE INDEX IF NOT EXISTS idx_crops_farm ON crops("farmId");',
      'CREATE INDEX IF NOT EXISTS idx_crops_status ON crops(status);',
      'CREATE INDEX IF NOT EXISTS idx_crops_planted_date ON crops("plantedDate");',
      
      // Inventory table indexes
      'CREATE INDEX IF NOT EXISTS idx_inventory_farm ON inventory("farmId");',
      'CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory(category);',
      'CREATE INDEX IF NOT EXISTS idx_inventory_expiry ON inventory("expiryDate");',
      
      // Financial records table indexes
      'CREATE INDEX IF NOT EXISTS idx_financial_farm ON "financial_records"("farmId");',
      'CREATE INDEX IF NOT EXISTS idx_financial_type ON "financial_records"(type);',
      'CREATE INDEX IF NOT EXISTS idx_financial_date ON "financial_records"(date);',
      
      // Weather data table indexes
      'CREATE INDEX IF NOT EXISTS idx_weather_farm ON "weather_data"("farmId");',
      'CREATE INDEX IF NOT EXISTS idx_weather_date ON "weather_data"(date);',
      
      // Documents table indexes
      'CREATE INDEX IF NOT EXISTS idx_documents_farm ON documents("farmId");',
      'CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);',
      
      // Analytics data table indexes
      'CREATE INDEX IF NOT EXISTS idx_analytics_farm ON "analytics_data"("farmId");',
      'CREATE INDEX IF NOT EXISTS idx_analytics_metric ON "analytics_data"(metric);',
      'CREATE INDEX IF NOT EXISTS idx_analytics_date ON "analytics_data"(date);',
      
      // Employees table indexes
      'CREATE INDEX IF NOT EXISTS idx_employees_farm ON employees("farmId");',
      'CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);',
      
      // Tasks table indexes
      'CREATE INDEX IF NOT EXISTS idx_tasks_farm ON tasks("farmId");',
      'CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON tasks("assignedTo");',
      'CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);',
      'CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);',
      
      // Equipment table indexes
      'CREATE INDEX IF NOT EXISTS idx_equipment_farm ON equipment("farmId");',
      'CREATE INDEX IF NOT EXISTS idx_equipment_status ON equipment(status);',
      
      // Maintenance records table indexes
      'CREATE INDEX IF NOT EXISTS idx_maintenance_equipment ON "maintenance_records"("equipmentId");',
      'CREATE INDEX IF NOT EXISTS idx_maintenance_date ON "maintenance_records"("performedDate");',
      
      // User sessions table indexes
      'CREATE INDEX IF NOT EXISTS idx_sessions_user ON "user_sessions"("userId");',
      'CREATE INDEX IF NOT EXISTS idx_sessions_token ON "user_sessions"(token);',
      'CREATE INDEX IF NOT EXISTS idx_sessions_expires ON "user_sessions"("expiresAt");'
    ];
    
    for (const indexQuery of indexes) {
      try {
        await sequelize.query(indexQuery);
      } catch (error) {
        // Index might already exist, continue
        console.log(`ℹ️ Index creation skipped (might already exist): ${indexQuery.split(' ')[2]}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
    throw error;
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('🏁 Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { runMigrations, createIndexes }; 
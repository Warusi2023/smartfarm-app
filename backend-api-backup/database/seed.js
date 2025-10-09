const bcrypt = require('bcryptjs');
const { sequelize } = require('./config');
const {
  User,
  Farm,
  Livestock,
  Crop,
  Inventory,
  FinancialRecord,
  WeatherData,
  Document,
  AnalyticsData,
  Employee,
  Task,
  Equipment,
  MaintenanceRecord
} = require('./models');

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🧹 Clearing existing data...');
    await clearExistingData();
    
    // Create sample users
    console.log('👤 Creating sample users...');
    const users = await createSampleUsers();
    
    // Create sample farms
    console.log('🏡 Creating sample farms...');
    const farms = await createSampleFarms(users);
    
    // Create sample livestock
    console.log('🐄 Creating sample livestock...');
    await createSampleLivestock(farms);
    
    // Create sample crops
    console.log('🌾 Creating sample crops...');
    await createSampleCrops(farms);
    
    // Create sample inventory
    console.log('📦 Creating sample inventory...');
    await createSampleInventory(farms);
    
    // Create sample financial records
    console.log('💰 Creating sample financial records...');
    await createSampleFinancialRecords(farms);
    
    // Create sample employees
    console.log('👥 Creating sample employees...');
    const employees = await createSampleEmployees(farms);
    
    // Create sample tasks
    console.log('✅ Creating sample tasks...');
    await createSampleTasks(farms, employees);
    
    // Create sample weather data
    console.log('🌤️ Creating sample weather data...');
    await createSampleWeatherData(farms);
    
    // Create sample documents
    console.log('📄 Creating sample documents...');
    await createSampleDocuments(farms);
    
    // Create sample analytics data
    console.log('📊 Creating sample analytics data...');
    await createSampleAnalyticsData(farms);
    
    // Create sample equipment
    console.log('🔧 Creating sample equipment...');
    const equipment = await createSampleEquipment(farms);
    
    // Create sample maintenance records
    console.log('🔨 Creating sample maintenance records...');
    await createSampleMaintenanceRecords(equipment);
    
    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

async function clearExistingData() {
  try {
    // Delete in reverse order of dependencies
    await MaintenanceRecord.destroy({ where: {} });
    await Equipment.destroy({ where: {} });
    await AnalyticsData.destroy({ where: {} });
    await Document.destroy({ where: {} });
    await WeatherData.destroy({ where: {} });
    await Task.destroy({ where: {} });
    await Employee.destroy({ where: {} });
    await FinancialRecord.destroy({ where: {} });
    await Inventory.destroy({ where: {} });
    await Crop.destroy({ where: {} });
    await Livestock.destroy({ where: {} });
    await Farm.destroy({ where: {} });
    await User.destroy({ where: {} });
    
    console.log('✅ Existing data cleared successfully.');
  } catch (error) {
    console.error('❌ Error clearing existing data:', error);
    throw error;
  }
}

async function createSampleUsers() {
  const users = [
    {
      email: 'admin@smartfarm.com',
      password: await bcrypt.hash('admin123', 10),
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      status: 'active',
      emailVerified: true
    },
    {
      email: 'farmer@smartfarm.com',
      password: await bcrypt.hash('farmer123', 10),
      firstName: 'John',
      lastName: 'Farmer',
      role: 'farmer',
      status: 'active',
      emailVerified: true
    },
    {
      email: 'manager@smartfarm.com',
      password: await bcrypt.hash('manager123', 10),
      firstName: 'Sarah',
      lastName: 'Manager',
      role: 'manager',
      status: 'active',
      emailVerified: true
    }
  ];
  
  const createdUsers = await User.bulkCreate(users);
  console.log(`✅ Created ${createdUsers.length} users`);
  return createdUsers;
}

async function createSampleFarms(users) {
  const farms = [
    {
      name: 'Green Acres Farm',
      description: 'Main farm location with mixed agriculture',
      location: 'Springfield, IL',
      size: 500.0,
      type: 'mixed',
      status: 'active',
      ownerId: users[1].id, // farmer
      managerId: users[2].id // manager
    },
    {
      name: 'North Field Farm',
      description: 'Crop-focused farm',
      location: 'Champaign, IL',
      size: 300.0,
      type: 'crop',
      status: 'active',
      ownerId: users[1].id,
      parentFarmId: null
    },
    {
      name: 'Livestock Ranch',
      description: 'Dedicated livestock farm',
      location: 'Bloomington, IL',
      size: 200.0,
      type: 'livestock',
      status: 'active',
      ownerId: users[1].id,
      parentFarmId: null
    }
  ];
  
  const createdFarms = await Farm.bulkCreate(farms);
  console.log(`✅ Created ${createdFarms.length} farms`);
  return createdFarms;
}

async function createSampleLivestock(farms) {
  const livestock = [
    {
      farmId: farms[2].id, // Livestock Ranch
      type: 'Cattle',
      breed: 'Angus',
      quantity: 50,
      healthStatus: 'healthy',
      weight: 500.0,
      age: 2.5,
      gender: 'mixed',
      notes: 'Main herd for beef production'
    },
    {
      farmId: farms[2].id,
      type: 'Pigs',
      breed: 'Yorkshire',
      quantity: 25,
      healthStatus: 'healthy',
      weight: 200.0,
      age: 1.0,
      gender: 'mixed',
      notes: 'Breeding stock'
    },
    {
      farmId: farms[2].id,
      type: 'Chickens',
      breed: 'Rhode Island Red',
      quantity: 200,
      healthStatus: 'healthy',
      weight: 2.5,
      age: 0.5,
      gender: 'mixed',
      notes: 'Egg production flock'
    }
  ];
  
  const createdLivestock = await Livestock.bulkCreate(livestock);
  console.log(`✅ Created ${createdLivestock.length} livestock records`);
}

async function createSampleCrops(farms) {
  const crops = [
    {
      farmId: farms[0].id, // Green Acres Farm
      name: 'Corn',
      variety: 'Sweet Corn',
      plantedDate: '2024-04-15',
      expectedHarvestDate: '2024-08-15',
      status: 'growing',
      notes: 'Field A - Main corn crop'
    },
    {
      farmId: farms[0].id,
      name: 'Wheat',
      variety: 'Winter Wheat',
      plantedDate: '2023-10-01',
      expectedHarvestDate: '2024-07-01',
      status: 'growing',
      notes: 'Field B - Winter wheat'
    },
    {
      farmId: farms[1].id, // North Field Farm
      name: 'Soybeans',
      variety: 'Roundup Ready',
      plantedDate: '2024-05-01',
      expectedHarvestDate: '2024-09-15',
      status: 'growing',
      notes: 'Field C - Soybean rotation'
    }
  ];
  
  const createdCrops = await Crop.bulkCreate(crops);
  console.log(`✅ Created ${createdCrops.length} crop records`);
}

async function createSampleInventory(farms) {
  const inventory = [
    {
      farmId: farms[0].id,
      name: 'Fertilizer',
      category: 'Supplies',
      quantity: 1000,
      unit: 'kg',
      cost: 2.50,
      supplier: 'AgroSupply Co.',
      expiryDate: '2024-12-31',
      notes: 'NPK 10-10-10 fertilizer'
    },
    {
      farmId: farms[0].id,
      name: 'Seeds',
      category: 'Supplies',
      quantity: 500,
      unit: 'kg',
      cost: 5.00,
      supplier: 'SeedCorp',
      expiryDate: '2025-06-30',
      notes: 'Corn seeds for next season'
    },
    {
      farmId: farms[0].id,
      name: 'Tractor Fuel',
      category: 'Fuel',
      quantity: 200,
      unit: 'liters',
      cost: 1.20,
      supplier: 'Local Gas Station',
      notes: 'Diesel fuel for tractors'
    }
  ];
  
  const createdInventory = await Inventory.bulkCreate(inventory);
  console.log(`✅ Created ${createdInventory.length} inventory records`);
}

async function createSampleFinancialRecords(farms) {
  const financialRecords = [
    {
      farmId: farms[0].id,
      type: 'income',
      category: 'Crop Sales',
      amount: 15000.00,
      description: 'Corn harvest sale',
      date: '2024-08-20',
      paymentMethod: 'bank_transfer',
      reference: 'INV-001'
    },
    {
      farmId: farms[0].id,
      type: 'expense',
      category: 'Supplies',
      amount: 2500.00,
      description: 'Fertilizer purchase',
      date: '2024-04-10',
      paymentMethod: 'credit_card',
      reference: 'EXP-001'
    },
    {
      farmId: farms[0].id,
      type: 'expense',
      category: 'Equipment',
      amount: 5000.00,
      description: 'Tractor maintenance',
      date: '2024-03-15',
      paymentMethod: 'check',
      reference: 'EXP-002'
    }
  ];
  
  const createdRecords = await FinancialRecord.bulkCreate(financialRecords);
  console.log(`✅ Created ${createdRecords.length} financial records`);
}

async function createSampleEmployees(farms) {
  const employees = [
    {
      farmId: farms[0].id,
      firstName: 'Mike',
      lastName: 'Davis',
      email: 'mike@greenacres.com',
      phone: '+1-555-0101',
      position: 'Field Worker',
      hireDate: '2023-03-01',
      salary: 35000.00,
      status: 'active',
      notes: 'Experienced field worker'
    },
    {
      farmId: farms[0].id,
      firstName: 'Lisa',
      lastName: 'Wilson',
      email: 'lisa@greenacres.com',
      phone: '+1-555-0102',
      position: 'Livestock Handler',
      hireDate: '2023-02-15',
      salary: 38000.00,
      status: 'active',
      notes: 'Specialized in livestock care'
    },
    {
      farmId: farms[2].id, // Livestock Ranch
      firstName: 'Tom',
      lastName: 'Johnson',
      email: 'tom@ranch.com',
      phone: '+1-555-0103',
      position: 'Ranch Hand',
      hireDate: '2023-01-10',
      salary: 32000.00,
      status: 'active',
      notes: 'General ranch maintenance'
    }
  ];
  
  const createdEmployees = await Employee.bulkCreate(employees);
  console.log(`✅ Created ${createdEmployees.length} employee records`);
  return createdEmployees;
}

async function createSampleTasks(farms, employees) {
  const tasks = [
    {
      farmId: farms[0].id,
      title: 'Harvest Corn Field A',
      description: 'Complete corn harvest in Field A',
      assignedTo: employees[0].id,
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-08-25',
      notes: 'Weather dependent - check forecast'
    },
    {
      farmId: farms[0].id,
      title: 'Feed Livestock',
      description: 'Morning feeding of all livestock',
      assignedTo: employees[1].id,
      priority: 'medium',
      status: 'completed',
      dueDate: '2024-08-20',
      completedDate: '2024-08-20',
      notes: 'Completed on schedule'
    },
    {
      farmId: farms[0].id,
      title: 'Maintain Equipment',
      description: 'Regular maintenance of tractors',
      assignedTo: employees[0].id,
      priority: 'low',
      status: 'pending',
      dueDate: '2024-08-30',
      notes: 'Schedule with mechanic'
    }
  ];
  
  const createdTasks = await Task.bulkCreate(tasks);
  console.log(`✅ Created ${createdTasks.length} task records`);
}

async function createSampleWeatherData(farms) {
  const weatherData = [
    {
      farmId: farms[0].id,
      date: '2024-08-20',
      temperature: 25.5,
      humidity: 65.0,
      precipitation: 0.0,
      windSpeed: 12.0,
      windDirection: 'NW',
      pressure: 1013.25,
      visibility: 10.0,
      notes: 'Clear day, good for harvesting'
    },
    {
      farmId: farms[0].id,
      date: '2024-08-21',
      temperature: 28.0,
      humidity: 70.0,
      precipitation: 5.2,
      windSpeed: 8.0,
      windDirection: 'SE',
      pressure: 1010.50,
      visibility: 8.5,
      notes: 'Light rain in afternoon'
    },
    {
      farmId: farms[0].id,
      date: '2024-08-22',
      temperature: 22.0,
      humidity: 80.0,
      precipitation: 15.5,
      windSpeed: 15.0,
      windDirection: 'SW',
      pressure: 1008.75,
      visibility: 5.0,
      notes: 'Heavy rain, field work delayed'
    }
  ];
  
  const createdWeatherData = await WeatherData.bulkCreate(weatherData);
  console.log(`✅ Created ${createdWeatherData.length} weather records`);
}

async function createSampleDocuments(farms) {
  const documents = [
    {
      farmId: farms[0].id,
      name: 'Farm Insurance Policy',
      category: 'Legal',
      filePath: '/documents/insurance.pdf',
      fileSize: 1024000,
      mimeType: 'application/pdf',
      description: 'Annual insurance policy',
      tags: 'insurance,legal,annual',
      notes: 'Renewal due in December'
    },
    {
      farmId: farms[0].id,
      name: 'Equipment Manual',
      category: 'Technical',
      filePath: '/documents/tractor-manual.pdf',
      fileSize: 2048000,
      mimeType: 'application/pdf',
      description: 'Tractor operation manual',
      tags: 'equipment,manual,tractor',
      notes: 'John Deere 5075E manual'
    },
    {
      farmId: farms[0].id,
      name: 'Crop Planning Spreadsheet',
      category: 'Planning',
      filePath: '/documents/crop-plan.xlsx',
      fileSize: 512000,
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      description: 'Annual crop planning',
      tags: 'planning,crops,annual',
      notes: 'Updated quarterly'
    }
  ];
  
  const createdDocuments = await Document.bulkCreate(documents);
  console.log(`✅ Created ${createdDocuments.length} document records`);
}

async function createSampleAnalyticsData(farms) {
  const analyticsData = [
    {
      farmId: farms[0].id,
      metric: 'crop_yield',
      value: 4.2,
      date: '2024-08-20',
      category: 'corn',
      notes: 'Corn yield per acre'
    },
    {
      farmId: farms[0].id,
      metric: 'revenue',
      value: 15000.00,
      date: '2024-08-20',
      category: 'sales',
      notes: 'Monthly revenue from crop sales'
    },
    {
      farmId: farms[0].id,
      metric: 'costs',
      value: 7500.00,
      date: '2024-08-20',
      category: 'expenses',
      notes: 'Monthly operational costs'
    },
    {
      farmId: farms[0].id,
      metric: 'efficiency',
      value: 85.5,
      date: '2024-08-20',
      category: 'operations',
      notes: 'Overall farm efficiency percentage'
    }
  ];
  
  const createdAnalytics = await AnalyticsData.bulkCreate(analyticsData);
  console.log(`✅ Created ${createdAnalytics.length} analytics records`);
}

async function createSampleEquipment(farms) {
  const equipment = [
    {
      farmId: farms[0].id,
      name: 'John Deere 5075E Tractor',
      type: 'Tractor',
      model: '5075E',
      serialNumber: 'JD123456',
      purchaseDate: '2020-03-15',
      purchasePrice: 45000.00,
      currentValue: 35000.00,
      status: 'operational',
      location: 'Main Barn',
      notes: 'Primary field tractor'
    },
    {
      farmId: farms[0].id,
      name: 'Kubota BX2380',
      type: 'Tractor',
      model: 'BX2380',
      serialNumber: 'KB789012',
      purchaseDate: '2021-06-20',
      purchasePrice: 18000.00,
      currentValue: 15000.00,
      status: 'operational',
      location: 'Equipment Shed',
      notes: 'Utility tractor for small tasks'
    },
    {
      farmId: farms[0].id,
      name: 'Grain Auger',
      type: 'Equipment',
      model: 'GA-2000',
      serialNumber: 'GA345678',
      purchaseDate: '2019-08-10',
      purchasePrice: 2500.00,
      currentValue: 2000.00,
      status: 'operational',
      location: 'Grain Bin Area',
      notes: 'Grain handling equipment'
    }
  ];
  
  const createdEquipment = await Equipment.bulkCreate(equipment);
  console.log(`✅ Created ${createdEquipment.length} equipment records`);
  return createdEquipment;
}

async function createSampleMaintenanceRecords(equipment) {
  const maintenanceRecords = [
    {
      equipmentId: equipment[0].id,
      type: 'Oil Change',
      description: 'Regular oil change and filter replacement',
      cost: 150.00,
      performedBy: 'Mike Davis',
      performedDate: '2024-07-15',
      nextMaintenanceDate: '2024-10-15',
      notes: 'Used synthetic oil, next change in 3 months'
    },
    {
      equipmentId: equipment[0].id,
      type: 'Tire Replacement',
      description: 'Replaced worn rear tires',
      cost: 800.00,
      performedBy: 'Local Tire Shop',
      performedDate: '2024-06-20',
      nextMaintenanceDate: '2027-06-20',
      notes: 'Replaced with heavy-duty agricultural tires'
    },
    {
      equipmentId: equipment[1].id,
      type: 'Annual Service',
      description: 'Complete annual maintenance service',
      cost: 300.00,
      performedBy: 'Kubota Dealer',
      performedDate: '2024-05-10',
      nextMaintenanceDate: '2025-05-10',
      notes: 'Includes fluid changes and inspection'
    }
  ];
  
  const createdMaintenance = await MaintenanceRecord.bulkCreate(maintenanceRecords);
  console.log(`✅ Created ${createdMaintenance.length} maintenance records`);
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('🏁 Seeding script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding script failed:', error);
      process.exit(1);
    });
}

module.exports = { seedDatabase }; 
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

async function testDatabaseOperations() {
  try {
    console.log('🧪 Starting database operations test...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection test passed');
    
    // Test 1: User Operations
    console.log('\n📋 Test 1: User Operations');
    await testUserOperations();
    
    // Test 2: Farm Operations
    console.log('\n📋 Test 2: Farm Operations');
    await testFarmOperations();
    
    // Test 3: Livestock Operations
    console.log('\n📋 Test 3: Livestock Operations');
    await testLivestockOperations();
    
    // Test 4: Crop Operations
    console.log('\n📋 Test 4: Crop Operations');
    await testCropOperations();
    
    // Test 5: Inventory Operations
    console.log('\n📋 Test 5: Inventory Operations');
    await testInventoryOperations();
    
    // Test 6: Financial Operations
    console.log('\n📋 Test 6: Financial Operations');
    await testFinancialOperations();
    
    // Test 7: Employee Operations
    console.log('\n📋 Test 7: Employee Operations');
    await testEmployeeOperations();
    
    // Test 8: Task Operations
    console.log('\n📋 Test 8: Task Operations');
    await testTaskOperations();
    
    // Test 9: Equipment Operations
    console.log('\n📋 Test 9: Equipment Operations');
    await testEquipmentOperations();
    
    // Test 10: Analytics Operations
    console.log('\n📋 Test 10: Analytics Operations');
    await testAnalyticsOperations();
    
    // Test 11: Complex Queries
    console.log('\n📋 Test 11: Complex Queries');
    await testComplexQueries();
    
    console.log('\n🎉 All database operation tests passed successfully!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

async function testUserOperations() {
  // Create a test user
  const testUser = await User.create({
    email: 'test@example.com',
    password: 'hashedpassword',
    firstName: 'Test',
    lastName: 'User',
    role: 'farmer'
  });
  console.log('✅ User created:', testUser.id);
  
  // Read user
  const foundUser = await User.findByPk(testUser.id);
  console.log('✅ User retrieved:', foundUser.email);
  
  // Update user
  await foundUser.update({ firstName: 'Updated' });
  console.log('✅ User updated');
  
  // Delete user
  await foundUser.destroy();
  console.log('✅ User deleted');
}

async function testFarmOperations() {
  // Create a test farm
  const testFarm = await Farm.create({
    name: 'Test Farm',
    description: 'Test farm for operations',
    location: 'Test Location',
    size: 100.0,
    type: 'mixed',
    ownerId: '00000000-0000-0000-0000-000000000001' // Mock UUID
  });
  console.log('✅ Farm created:', testFarm.id);
  
  // Read farm
  const foundFarm = await Farm.findByPk(testFarm.id);
  console.log('✅ Farm retrieved:', foundFarm.name);
  
  // Update farm
  await foundFarm.update({ size: 150.0 });
  console.log('✅ Farm updated');
  
  // Delete farm
  await foundFarm.destroy();
  console.log('✅ Farm deleted');
}

async function testLivestockOperations() {
  const testLivestock = await Livestock.create({
    farmId: '00000000-0000-0000-0000-000000000001', // Mock UUID
    type: 'Cattle',
    breed: 'Angus',
    quantity: 10,
    healthStatus: 'healthy'
  });
  console.log('✅ Livestock created:', testLivestock.id);
  
  const foundLivestock = await Livestock.findByPk(testLivestock.id);
  console.log('✅ Livestock retrieved:', foundLivestock.type);
  
  await foundLivestock.update({ quantity: 15 });
  console.log('✅ Livestock updated');
  
  await foundLivestock.destroy();
  console.log('✅ Livestock deleted');
}

async function testCropOperations() {
  const testCrop = await Crop.create({
    farmId: '00000000-0000-0000-0000-000000000001', // Mock UUID
    name: 'Corn',
    variety: 'Sweet Corn',
    plantedDate: '2024-04-15',
    status: 'growing'
  });
  console.log('✅ Crop created:', testCrop.id);
  
  const foundCrop = await Crop.findByPk(testCrop.id);
  console.log('✅ Crop retrieved:', foundCrop.name);
  
  await foundCrop.update({ status: 'mature' });
  console.log('✅ Crop updated');
  
  await foundCrop.destroy();
  console.log('✅ Crop deleted');
}

async function testInventoryOperations() {
  const testInventory = await Inventory.create({
    farmId: '00000000-0000-0000-0000-000000000001', // Mock UUID
    name: 'Test Fertilizer',
    category: 'Supplies',
    quantity: 100,
    unit: 'kg',
    cost: 2.50
  });
  console.log('✅ Inventory created:', testInventory.id);
  
  const foundInventory = await Inventory.findByPk(testInventory.id);
  console.log('✅ Inventory retrieved:', foundInventory.name);
  
  await foundInventory.update({ quantity: 150 });
  console.log('✅ Inventory updated');
  
  await foundInventory.destroy();
  console.log('✅ Inventory deleted');
}

async function testFinancialOperations() {
  const testFinancial = await FinancialRecord.create({
    farmId: '00000000-0000-0000-0000-000000000001', // Mock UUID
    type: 'income',
    category: 'Crop Sales',
    amount: 5000.00,
    description: 'Test sale',
    date: '2024-08-20'
  });
  console.log('✅ Financial record created:', testFinancial.id);
  
  const foundFinancial = await FinancialRecord.findByPk(testFinancial.id);
  console.log('✅ Financial record retrieved:', foundFinancial.amount);
  
  await foundFinancial.update({ amount: 6000.00 });
  console.log('✅ Financial record updated');
  
  await foundFinancial.destroy();
  console.log('✅ Financial record deleted');
}

async function testEmployeeOperations() {
  const testEmployee = await Employee.create({
    farmId: '00000000-0000-0000-0000-000000000001', // Mock UUID
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@test.com',
    position: 'Worker',
    status: 'active'
  });
  console.log('✅ Employee created:', testEmployee.id);
  
  const foundEmployee = await Employee.findByPk(testEmployee.id);
  console.log('✅ Employee retrieved:', foundEmployee.firstName);
  
  await foundEmployee.update({ position: 'Supervisor' });
  console.log('✅ Employee updated');
  
  await foundEmployee.destroy();
  console.log('✅ Employee deleted');
}

async function testTaskOperations() {
  const testTask = await Task.create({
    farmId: '00000000-0000-0000-0000-000000000001', // Mock UUID
    title: 'Test Task',
    description: 'Test task description',
    priority: 'medium',
    status: 'pending'
  });
  console.log('✅ Task created:', testTask.id);
  
  const foundTask = await Task.findByPk(testTask.id);
  console.log('✅ Task retrieved:', foundTask.title);
  
  await foundTask.update({ status: 'in-progress' });
  console.log('✅ Task updated');
  
  await foundTask.destroy();
  console.log('✅ Task deleted');
}

async function testEquipmentOperations() {
  const testEquipment = await Equipment.create({
    farmId: '00000000-0000-0000-0000-000000000001', // Mock UUID
    name: 'Test Tractor',
    type: 'Tractor',
    model: 'Test Model',
    status: 'operational'
  });
  console.log('✅ Equipment created:', testEquipment.id);
  
  const foundEquipment = await Equipment.findByPk(testEquipment.id);
  console.log('✅ Equipment retrieved:', foundEquipment.name);
  
  await foundEquipment.update({ status: 'maintenance' });
  console.log('✅ Equipment updated');
  
  await foundEquipment.destroy();
  console.log('✅ Equipment deleted');
}

async function testAnalyticsOperations() {
  const testAnalytics = await AnalyticsData.create({
    farmId: '00000000-0000-0000-0000-000000000001', // Mock UUID
    metric: 'test_metric',
    value: 100.5,
    date: '2024-08-20',
    category: 'test'
  });
  console.log('✅ Analytics data created:', testAnalytics.id);
  
  const foundAnalytics = await AnalyticsData.findByPk(testAnalytics.id);
  console.log('✅ Analytics data retrieved:', foundAnalytics.metric);
  
  await foundAnalytics.update({ value: 150.0 });
  console.log('✅ Analytics data updated');
  
  await foundAnalytics.destroy();
  console.log('✅ Analytics data deleted');
}

async function testComplexQueries() {
  // Test aggregation
  const userCount = await User.count();
  console.log('✅ User count query:', userCount);
  
  // Test find with conditions
  const activeFarms = await Farm.findAll({
    where: { status: 'active' }
  });
  console.log('✅ Active farms query:', activeFarms.length);
  
  // Test include (associations)
  const farmsWithOwner = await Farm.findAll({
    include: [{ model: User, as: 'owner' }]
  });
  console.log('✅ Farms with owner query:', farmsWithOwner.length);
  
  // Test order and limit
  const recentTasks = await Task.findAll({
    order: [['createdAt', 'DESC']],
    limit: 5
  });
  console.log('✅ Recent tasks query:', recentTasks.length);
  
  // Test group by
  const cropStats = await Crop.findAll({
    attributes: [
      'status',
      [sequelize.fn('COUNT', sequelize.col('id')), 'count']
    ],
    group: ['status']
  });
  console.log('✅ Crop status stats query:', cropStats.length);
}

// Run tests if this file is executed directly
if (require.main === module) {
  testDatabaseOperations()
    .then(() => {
      console.log('🏁 Database test completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Database test failed:', error);
      process.exit(1);
    });
}

module.exports = { testDatabaseOperations }; 
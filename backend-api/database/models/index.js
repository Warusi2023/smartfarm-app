const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

// User Model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  },
  avatar: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.ENUM('farmer', 'manager', 'admin'),
    defaultValue: 'farmer'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended'),
    defaultValue: 'active'
  },
  permissions: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  settings: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  notificationPreferences: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  lastLoginAt: {
    type: DataTypes.DATE
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  phoneVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  twoFactorEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Farm Model
const Farm = sequelize.define('Farm', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  location: {
    type: DataTypes.STRING
  },
  size: {
    type: DataTypes.DECIMAL(10, 2)
  },
  type: {
    type: DataTypes.ENUM('crop', 'livestock', 'mixed', 'organic', 'conventional'),
    defaultValue: 'mixed'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'maintenance'),
    defaultValue: 'active'
  },
  parentFarmId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  managerId: {
    type: DataTypes.UUID,
    allowNull: true
  }
}, {
  tableName: 'farms',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Livestock Model
const Livestock = sequelize.define('Livestock', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  farmId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  tagNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  breed: {
    type: DataTypes.STRING
  },
  birthDate: {
    type: DataTypes.DATEONLY
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'neutered'),
    allowNull: false
  },
  weight: {
    type: DataTypes.DECIMAL(8, 2)
  },
  status: {
    type: DataTypes.ENUM('active', 'sick', 'pregnant', 'sold', 'deceased', 'quarantined'),
    defaultValue: 'active'
  },
  healthStatus: {
    type: DataTypes.ENUM('excellent', 'good', 'fair', 'poor', 'critical'),
    defaultValue: 'good'
  },
  location: {
    type: DataTypes.STRING
  },
  lifecycleStage: {
    type: DataTypes.ENUM('calf', 'heifer', 'cow', 'bull', 'steer', 'bullock'),
    allowNull: true
  },
  productionPurpose: {
    type: DataTypes.ENUM('dairy', 'beef', 'breeding', 'dual_purpose', 'working', 'pet'),
    allowNull: true
  },
  parentMaleId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  parentFemaleId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  firstCalvingDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  lastCalvingDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  breedingStatus: {
    type: DataTypes.ENUM('open', 'bred', 'pregnant', 'dry', 'lactating', 'infertile', 'retired'),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'livestock',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Crop Model
const Crop = sequelize.define('Crop', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  farmId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  variety: {
    type: DataTypes.STRING
  },
  plantedDate: {
    type: DataTypes.DATEONLY
  },
  expectedHarvestDate: {
    type: DataTypes.DATEONLY
  },
  actualHarvestDate: {
    type: DataTypes.DATEONLY
  },
  status: {
    type: DataTypes.ENUM('planted', 'growing', 'mature', 'harvested', 'failed'),
    defaultValue: 'growing'
  },
  yield: {
    type: DataTypes.DECIMAL(10, 2)
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'crops',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Inventory Model
const Inventory = sequelize.define('Inventory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  farmId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2)
  },
  supplier: {
    type: DataTypes.STRING
  },
  expiryDate: {
    type: DataTypes.DATEONLY
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'inventory',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Financial Record Model
const FinancialRecord = sequelize.define('FinancialRecord', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  farmId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.STRING
  },
  reference: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'financial_records',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Weather Data Model
const WeatherData = sequelize.define('WeatherData', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  farmId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  temperature: {
    type: DataTypes.DECIMAL(5, 2)
  },
  humidity: {
    type: DataTypes.DECIMAL(5, 2)
  },
  precipitation: {
    type: DataTypes.DECIMAL(8, 2)
  },
  windSpeed: {
    type: DataTypes.DECIMAL(6, 2)
  },
  windDirection: {
    type: DataTypes.STRING
  },
  pressure: {
    type: DataTypes.DECIMAL(8, 2)
  },
  visibility: {
    type: DataTypes.DECIMAL(6, 2)
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'weather_data',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false
});

// Document Model
const Document = sequelize.define('Document', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  farmId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filePath: {
    type: DataTypes.STRING
  },
  fileSize: {
    type: DataTypes.INTEGER
  },
  mimeType: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  tags: {
    type: DataTypes.STRING
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'documents',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Analytics Data Model
const AnalyticsData = sequelize.define('AnalyticsData', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  farmId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  metric: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL(15, 4),
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'analytics_data',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false
});

// Employee Model
const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  farmId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING
  },
  position: {
    type: DataTypes.STRING
  },
  hireDate: {
    type: DataTypes.DATEONLY
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2)
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'terminated'),
    defaultValue: 'active'
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'employees',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Task Model
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  farmId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  assignedTo: {
    type: DataTypes.UUID,
    allowNull: true
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  dueDate: {
    type: DataTypes.DATEONLY
  },
  completedDate: {
    type: DataTypes.DATEONLY
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'tasks',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Equipment Model
const Equipment = sequelize.define('Equipment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  farmId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING
  },
  serialNumber: {
    type: DataTypes.STRING
  },
  purchaseDate: {
    type: DataTypes.DATEONLY
  },
  purchasePrice: {
    type: DataTypes.DECIMAL(12, 2)
  },
  currentValue: {
    type: DataTypes.DECIMAL(12, 2)
  },
  status: {
    type: DataTypes.ENUM('operational', 'maintenance', 'repair', 'retired'),
    defaultValue: 'operational'
  },
  location: {
    type: DataTypes.STRING
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'equipment',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Maintenance Record Model
const MaintenanceRecord = sequelize.define('MaintenanceRecord', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  equipmentId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2)
  },
  performedBy: {
    type: DataTypes.STRING
  },
  performedDate: {
    type: DataTypes.DATEONLY
  },
  nextMaintenanceDate: {
    type: DataTypes.DATEONLY
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'maintenance_records',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false
});

// User Session Model
const UserSession = sequelize.define('UserSession', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deviceInfo: {
    type: DataTypes.TEXT
  },
  ipAddress: {
    type: DataTypes.STRING
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'user_sessions',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false
});

// Define associations
User.hasMany(Farm, { foreignKey: 'ownerId', as: 'ownedFarms' });
User.hasMany(Farm, { foreignKey: 'managerId', as: 'managedFarms' });
Farm.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
Farm.belongsTo(User, { foreignKey: 'managerId', as: 'manager' });

Farm.hasMany(Farm, { foreignKey: 'parentFarmId', as: 'subFarms' });
Farm.belongsTo(Farm, { foreignKey: 'parentFarmId', as: 'parentFarm' });

Farm.hasMany(Livestock, { foreignKey: 'farmId', as: 'livestock' });
Livestock.belongsTo(Farm, { foreignKey: 'farmId', as: 'farm' });

Farm.hasMany(Crop, { foreignKey: 'farmId', as: 'crops' });
Crop.belongsTo(Farm, { foreignKey: 'farmId', as: 'farm' });

Farm.hasMany(Inventory, { foreignKey: 'farmId', as: 'inventory' });
Inventory.belongsTo(Farm, { foreignKey: 'farmId', as: 'farm' });

Farm.hasMany(FinancialRecord, { foreignKey: 'farmId', as: 'financialRecords' });
FinancialRecord.belongsTo(Farm, { foreignKey: 'farmId', as: 'farm' });

Farm.hasMany(WeatherData, { foreignKey: 'farmId', as: 'weatherData' });
WeatherData.belongsTo(Farm, { foreignKey: 'farmId', as: 'farm' });

Farm.hasMany(Document, { foreignKey: 'farmId', as: 'documents' });
Document.belongsTo(Farm, { foreignKey: 'farmId', as: 'farm' });

Farm.hasMany(AnalyticsData, { foreignKey: 'farmId', as: 'analyticsData' });
AnalyticsData.belongsTo(Farm, { foreignKey: 'farmId', as: 'farm' });

Farm.hasMany(Employee, { foreignKey: 'farmId', as: 'employees' });
Employee.belongsTo(Farm, { foreignKey: 'farmId', as: 'farm' });

Farm.hasMany(Task, { foreignKey: 'farmId', as: 'tasks' });
Task.belongsTo(Farm, { foreignKey: 'farmId', as: 'farm' });

Employee.hasMany(Task, { foreignKey: 'assignedTo', as: 'assignedTasks' });
Task.belongsTo(Employee, { foreignKey: 'assignedTo', as: 'assignedEmployee' });

Farm.hasMany(Equipment, { foreignKey: 'farmId', as: 'equipment' });
Equipment.belongsTo(Farm, { foreignKey: 'farmId', as: 'farm' });

Equipment.hasMany(MaintenanceRecord, { foreignKey: 'equipmentId', as: 'maintenanceRecords' });
MaintenanceRecord.belongsTo(Equipment, { foreignKey: 'equipmentId', as: 'equipment' });

User.hasMany(UserSession, { foreignKey: 'userId', as: 'sessions' });
UserSession.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
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
  MaintenanceRecord,
  UserSession
}; 
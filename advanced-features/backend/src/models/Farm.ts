import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface FarmAttributes {
  id: string;
  name: string;
  description?: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  size: {
    totalAcres: number;
    cultivatedAcres: number;
    pastureAcres: number;
    forestAcres: number;
  };
  type: 'crop' | 'livestock' | 'mixed' | 'organic' | 'conventional';
  status: 'active' | 'inactive' | 'maintenance';
  parentFarmId?: string; // For farm hierarchy
  ownerId: string;
  managerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FarmCreationAttributes extends Optional<FarmAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Farm extends Model<FarmAttributes, FarmCreationAttributes> implements FarmAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public location!: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  public size!: {
    totalAcres: number;
    cultivatedAcres: number;
    pastureAcres: number;
    forestAcres: number;
  };
  public type!: 'crop' | 'livestock' | 'mixed' | 'organic' | 'conventional';
  public status!: 'active' | 'inactive' | 'maintenance';
  public parentFarmId!: string;
  public ownerId!: string;
  public managerId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Farm.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isValidLocation(value: any) {
          if (!value.latitude || !value.longitude || !value.address) {
            throw new Error('Location must include latitude, longitude, and address');
          }
        },
      },
    },
    size: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isValidSize(value: any) {
          if (!value.totalAcres || value.totalAcres <= 0) {
            throw new Error('Total acres must be greater than 0');
          }
        },
      },
    },
    type: {
      type: DataTypes.ENUM('crop', 'livestock', 'mixed', 'organic', 'conventional'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'maintenance'),
      allowNull: false,
      defaultValue: 'active',
    },
    parentFarmId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'farms',
        key: 'id',
      },
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    managerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'farms',
    timestamps: true,
    indexes: [
      {
        fields: ['ownerId'],
      },
      {
        fields: ['managerId'],
      },
      {
        fields: ['parentFarmId'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['type'],
      },
    ],
  }
);

// Associations
Farm.hasMany(Farm, { as: 'subFarms', foreignKey: 'parentFarmId' });
Farm.belongsTo(Farm, { as: 'parentFarm', foreignKey: 'parentFarmId' });

export default Farm;

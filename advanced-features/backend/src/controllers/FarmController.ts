import { Request, Response } from 'express';
import { Farm, FarmCreationAttributes } from '../models/Farm';
import { User } from '../models/User';
import { Op } from 'sequelize';

export class FarmController {
  // Get all farms for a user (with permissions)
  public async getFarms(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { page = 1, limit = 10, status, type, search } = req.query;

      const whereClause: any = {};
      
      // Add filters
      if (status) whereClause.status = status;
      if (type) whereClause.type = type;
      if (search) {
        whereClause.name = {
          [Op.iLike]: `%${search}%`
        };
      }

      // Get farms based on user role
      let farmsQuery;
      if (req.user?.role === 'admin') {
        farmsQuery = Farm.findAndCountAll({
          where: whereClause,
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'firstName', 'lastName', 'email']
            },
            {
              model: User,
              as: 'manager',
              attributes: ['id', 'firstName', 'lastName', 'email']
            }
          ],
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
          order: [['createdAt', 'DESC']]
        });
      } else {
        // Users can only see farms they own or manage
        whereClause[Op.or] = [
          { ownerId: userId },
          { managerId: userId }
        ];
        
        farmsQuery = Farm.findAndCountAll({
          where: whereClause,
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'firstName', 'lastName', 'email']
            },
            {
              model: User,
              as: 'manager',
              attributes: ['id', 'firstName', 'lastName', 'email']
            }
          ],
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
          order: [['createdAt', 'DESC']]
        });
      }

      const { rows: farms, count } = await farmsQuery;

      res.json({
        success: true,
        data: {
          farms,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total: count,
            pages: Math.ceil(count / Number(limit))
          }
        }
      });
    } catch (error) {
      console.error('Error fetching farms:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch farms',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get a single farm by ID
  public async getFarm(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const farm = await Farm.findByPk(id, {
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: User,
            as: 'manager',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: Farm,
            as: 'subFarms',
            include: [
              {
                model: User,
                as: 'manager',
                attributes: ['id', 'firstName', 'lastName', 'email']
              }
            ]
          }
        ]
      });

      if (!farm) {
        res.status(404).json({
          success: false,
          message: 'Farm not found'
        });
        return;
      }

      // Check permissions
      if (req.user?.role !== 'admin' && 
          farm.ownerId !== userId && 
          farm.managerId !== userId) {
        res.status(403).json({
          success: false,
          message: 'Access denied'
        });
        return;
      }

      res.json({
        success: true,
        data: farm
      });
    } catch (error) {
      console.error('Error fetching farm:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch farm',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Create a new farm
  public async createFarm(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const farmData: FarmCreationAttributes = {
        ...req.body,
        ownerId: userId
      };

      // Validate required fields
      if (!farmData.name || !farmData.location || !farmData.size || !farmData.type) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: name, location, size, type'
        });
        return;
      }

      // Check if parent farm exists and user has access
      if (farmData.parentFarmId) {
        const parentFarm = await Farm.findByPk(farmData.parentFarmId);
        if (!parentFarm) {
          res.status(400).json({
            success: false,
            message: 'Parent farm not found'
          });
          return;
        }

        if (req.user?.role !== 'admin' && 
            parentFarm.ownerId !== userId && 
            parentFarm.managerId !== userId) {
          res.status(403).json({
            success: false,
            message: 'Access denied to parent farm'
          });
          return;
        }
      }

      const farm = await Farm.create(farmData);

      // Fetch the created farm with associations
      const createdFarm = await Farm.findByPk(farm.id, {
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: User,
            as: 'manager',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
      });

      res.status(201).json({
        success: true,
        message: 'Farm created successfully',
        data: createdFarm
      });
    } catch (error) {
      console.error('Error creating farm:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create farm',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update a farm
  public async updateFarm(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const updateData = req.body;

      const farm = await Farm.findByPk(id);
      if (!farm) {
        res.status(404).json({
          success: false,
          message: 'Farm not found'
        });
        return;
      }

      // Check permissions
      if (req.user?.role !== 'admin' && 
          farm.ownerId !== userId && 
          farm.managerId !== userId) {
        res.status(403).json({
          success: false,
          message: 'Access denied'
        });
        return;
      }

      // Only owners and admins can change ownership
      if (updateData.ownerId && req.user?.role !== 'admin' && farm.ownerId !== userId) {
        res.status(403).json({
          success: false,
          message: 'Only farm owners and admins can change ownership'
        });
        return;
      }

      await farm.update(updateData);

      // Fetch updated farm with associations
      const updatedFarm = await Farm.findByPk(id, {
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: User,
            as: 'manager',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
      });

      res.json({
        success: true,
        message: 'Farm updated successfully',
        data: updatedFarm
      });
    } catch (error) {
      console.error('Error updating farm:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update farm',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Delete a farm
  public async deleteFarm(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const farm = await Farm.findByPk(id);
      if (!farm) {
        res.status(404).json({
          success: false,
          message: 'Farm not found'
        });
        return;
      }

      // Check permissions - only owners and admins can delete
      if (req.user?.role !== 'admin' && farm.ownerId !== userId) {
        res.status(403).json({
          success: false,
          message: 'Only farm owners and admins can delete farms'
        });
        return;
      }

      // Check if farm has sub-farms
      const subFarms = await Farm.count({
        where: { parentFarmId: id }
      });

      if (subFarms > 0) {
        res.status(400).json({
          success: false,
          message: 'Cannot delete farm with sub-farms. Please delete sub-farms first.'
        });
        return;
      }

      await farm.destroy();

      res.json({
        success: true,
        message: 'Farm deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting farm:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete farm',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get farm hierarchy
  public async getFarmHierarchy(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      let farmsQuery;
      if (req.user?.role === 'admin') {
        farmsQuery = Farm.findAll({
          where: { parentFarmId: null },
          include: [
            {
              model: Farm,
              as: 'subFarms',
              include: [
                {
                  model: User,
                  as: 'manager',
                  attributes: ['id', 'firstName', 'lastName', 'email']
                }
              ]
            },
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'firstName', 'lastName', 'email']
            },
            {
              model: User,
              as: 'manager',
              attributes: ['id', 'firstName', 'lastName', 'email']
            }
          ],
          order: [['name', 'ASC']]
        });
      } else {
        farmsQuery = Farm.findAll({
          where: {
            parentFarmId: null,
            [Op.or]: [
              { ownerId: userId },
              { managerId: userId }
            ]
          },
          include: [
            {
              model: Farm,
              as: 'subFarms',
              where: {
                [Op.or]: [
                  { ownerId: userId },
                  { managerId: userId }
                ]
              },
              required: false,
              include: [
                {
                  model: User,
                  as: 'manager',
                  attributes: ['id', 'firstName', 'lastName', 'email']
                }
              ]
            },
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'firstName', 'lastName', 'email']
            },
            {
              model: User,
              as: 'manager',
              attributes: ['id', 'firstName', 'lastName', 'email']
            }
          ],
          order: [['name', 'ASC']]
        });
      }

      const farms = await farmsQuery;

      res.json({
        success: true,
        data: farms
      });
    } catch (error) {
      console.error('Error fetching farm hierarchy:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch farm hierarchy',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get farm statistics
  public async getFarmStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      let whereClause: any = {};
      if (req.user?.role !== 'admin') {
        whereClause[Op.or] = [
          { ownerId: userId },
          { managerId: userId }
        ];
      }

      const stats = await Farm.findAll({
        where: whereClause,
        attributes: [
          'type',
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
          [sequelize.fn('SUM', sequelize.col('size->totalAcres')), 'totalAcres']
        ],
        group: ['type', 'status'],
        raw: true
      });

      const totalFarms = await Farm.count({ where: whereClause });
      const activeFarms = await Farm.count({ 
        where: { ...whereClause, status: 'active' } 
      });

      res.json({
        success: true,
        data: {
          stats,
          summary: {
            totalFarms,
            activeFarms,
            inactiveFarms: totalFarms - activeFarms
          }
        }
      });
    } catch (error) {
      console.error('Error fetching farm stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch farm statistics',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export default new FarmController();

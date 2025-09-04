# SmartFarm Database Documentation

## Overview
The SmartFarm database uses Room persistence library with proper relationships, indexes, and migration strategy for optimal performance and data integrity.

## Database Version
- Current Version: 2
- Schema Export: Enabled
- Migration Strategy: Incremental migrations with fallback

## Entity Relationships

### Core Entities

#### Farm (Primary Entity)
- **Table**: `farms`
- **Primary Key**: `id`
- **Relationships**: 
  - One-to-Many with Livestock
  - One-to-Many with FarmActivity
  - One-to-One with FarmLocation
- **Indexes**:
  - `farmType` - For filtering farms by type
  - `isActive` - For active farm queries
  - `soilType` - For soil-specific queries
  - `climateZone` - For climate-specific queries
  - `farmType, isActive` - Composite index for filtered queries

#### Livestock (Core Entity)
- **Table**: `livestock`
- **Primary Key**: `id`
- **Foreign Keys**:
  - `farmId` → `farms.id` (CASCADE DELETE)
- **Relationships**:
  - Many-to-One with Farm
  - One-to-Many with AnimalHealthRecord
  - One-to-Many with YieldRecord
  - One-to-Many with OutlierAcknowledgment
  - One-to-Many with LivestockReminder
- **Indexes**:
  - `farmId` - Foreign key index
  - `category` - For category filtering
  - `isActive` - For active livestock queries
  - `name` - For name searches
  - `category, isActive` - Composite index for filtered queries
  - `farmId, category` - Composite index for farm-specific category queries

#### FarmLocation (Location Entity)
- **Table**: `farm_locations`
- **Primary Key**: `id`
- **Foreign Keys**:
  - `farmId` → `farms.id` (CASCADE DELETE)
- **Indexes**:
  - `farmId` - Foreign key index
  - `latitude, longitude` - Geographic queries
  - `city, state` - Location-based queries
  - `country` - Country-specific queries

### Record Entities

#### AnimalHealthRecord
- **Table**: `animal_health_records`
- **Primary Key**: `id`
- **Foreign Keys**:
  - `animalId` → `livestock.id` (CASCADE DELETE)
- **Indexes**:
  - `animalId` - Foreign key index
  - `date` - Date-based queries
  - `eventType` - Event type filtering
  - `animalId, date` - Animal-specific date queries
  - `animalId, eventType` - Animal-specific event queries

#### YieldRecord
- **Table**: `yield_records`
- **Primary Key**: `id`
- **Foreign Keys**:
  - `animalId` → `livestock.id` (CASCADE DELETE)
- **Indexes**:
  - `animalId` - Foreign key index
  - `date` - Date-based queries
  - `yieldType` - Yield type filtering
  - `animalId, date` - Animal-specific date queries
  - `animalId, yieldType` - Animal-specific yield queries
  - `date, yieldType` - Date and yield type queries

#### OutlierAcknowledgment
- **Table**: `outlier_acknowledgments`
- **Primary Key**: `id`
- **Foreign Keys**:
  - `animalId` → `livestock.id` (CASCADE DELETE)
- **Indexes**:
  - `animalId` - Foreign key index
  - `timestamp` - Time-based queries
  - `animalId, timestamp` - Animal-specific time queries

#### LivestockReminder
- **Table**: `livestock_reminder`
- **Primary Key**: `id`
- **Foreign Keys**:
  - `livestockId` → `livestock.id` (CASCADE DELETE)
- **Indexes**:
  - `livestockId` - Foreign key index
  - `date` - Date-based queries
  - `type` - Reminder type filtering
  - `livestockId, date` - Animal-specific date queries
  - `livestockId, type` - Animal-specific type queries

#### FarmActivity
- **Table**: `farm_activities`
- **Primary Key**: `id`
- **Foreign Keys**:
  - `farmId` → `farms.id` (CASCADE DELETE)
  - `livestockId` → `livestock.id` (SET NULL)
- **Indexes**:
  - `farmId` - Foreign key index
  - `type` - Activity type filtering
  - `date` - Date-based queries
  - `livestockId` - Livestock reference index
  - `farmId, date` - Farm-specific date queries
  - `farmId, type` - Farm-specific type queries
  - `date, type` - Date and type queries

## Migration Strategy

### Migration 1 → 2
**Changes**:
1. Added `farmId` column to `livestock` table
2. Added `farmId` column to `farm_activities` table
3. Added timestamp columns (`createdAt`, `updatedAt`) to multiple tables
4. Added `isCompleted` column to reminder and activity tables
5. Created comprehensive indexes for performance optimization
6. Added default farm creation for existing data

**Performance Improvements**:
- Foreign key relationships ensure data integrity
- Indexes optimize common query patterns
- Composite indexes support filtered queries
- Timestamp columns enable temporal queries

## Query Optimization

### Common Query Patterns
1. **Farm-specific queries**: Use `farmId` index
2. **Category filtering**: Use `category` or `category, isActive` indexes
3. **Date range queries**: Use `date` or `animalId, date` indexes
4. **Search queries**: Use `name` index for livestock, text search for farms
5. **Geographic queries**: Use `latitude, longitude` index for locations

### Performance Tips
1. Always use indexed columns in WHERE clauses
2. Use composite indexes for multi-column filters
3. Limit result sets with LIMIT clause
4. Use Flow for reactive data updates
5. Use suspend functions for one-time operations

## Data Integrity

### Foreign Key Constraints
- CASCADE DELETE: Ensures related records are removed when parent is deleted
- SET NULL: Allows optional relationships (e.g., activities without livestock)

### Soft Deletes
- `isActive` flag prevents data loss
- Maintains referential integrity
- Enables data recovery if needed

### Timestamps
- `createdAt`: Record creation time
- `updatedAt`: Last modification time
- Enables audit trails and temporal queries

## Best Practices

### Database Operations
1. Use transactions for multi-table operations
2. Implement proper error handling
3. Use Room's built-in conflict resolution
4. Monitor query performance with Room's query logging

### Data Access
1. Use Repository pattern for data access
2. Implement ViewModels for UI state management
3. Use Flow for reactive data streams
4. Cache frequently accessed data

### Migration Management
1. Test migrations with sample data
2. Backup data before major migrations
3. Use incremental version numbers
4. Document all schema changes

## Future Enhancements
1. Add full-text search capabilities
2. Implement data encryption for sensitive information
3. Add data export/import functionality
4. Implement data synchronization with cloud services
5. Add data analytics and reporting queries 
package com.smartfarm.data.mapper

import com.smartfarm.data.database.entity.*
import com.smartfarm.data.model.*

/**
 * Extension functions to convert between DTOs and Room entities
 */

// Farm mappers
fun FarmDto.toEntity(): FarmEntity {
    return FarmEntity(
        id = id,
        name = name,
        latitude = location.latitude,
        longitude = location.longitude,
        address = location.address,
        size = size,
        type = type,
        status = status,
        ownerId = ownerId,
        isActive = isActive,
        createdAt = createdAt,
        updatedAt = updatedAt
    )
}

fun FarmEntity.toDto(): FarmDto {
    return FarmDto(
        id = id,
        name = name,
        location = LocationDto(latitude, longitude, address),
        size = size,
        type = type,
        status = status,
        ownerId = ownerId,
        isActive = isActive,
        createdAt = createdAt,
        updatedAt = updatedAt
    )
}

// Livestock mappers
fun LivestockDto.toEntity(): LivestockEntity {
    return LivestockEntity(
        id = id,
        name = name,
        type = type,
        breed = breed,
        farmId = farmId,
        birthDate = birthDate,
        weight = weight,
        status = status,
        location = location,
        description = description,
        tag = tag,
        sex = sex,
        purpose = purpose,
        value = value,
        createdAt = createdAt,
        updatedAt = updatedAt
    )
}

fun LivestockEntity.toDto(): LivestockDto {
    return LivestockDto(
        id = id,
        name = name,
        type = type,
        breed = breed,
        farmId = farmId,
        birthDate = birthDate,
        weight = weight,
        status = status,
        location = location,
        description = description,
        tag = tag,
        sex = sex,
        purpose = purpose,
        value = value,
        createdAt = createdAt,
        updatedAt = updatedAt
    )
}

// Crop mappers
fun CropDto.toEntity(): CropEntity {
    return CropEntity(
        id = id,
        name = name,
        variety = variety,
        farmId = farmId,
        plantedDate = plantedDate,
        expectedHarvestDate = expectedHarvestDate,
        area = area,
        status = status,
        notes = notes,
        createdAt = createdAt,
        updatedAt = updatedAt
    )
}

fun CropEntity.toDto(): CropDto {
    return CropDto(
        id = id,
        name = name,
        variety = variety,
        farmId = farmId,
        plantedDate = plantedDate,
        expectedHarvestDate = expectedHarvestDate,
        area = area,
        status = status,
        notes = notes,
        createdAt = createdAt,
        updatedAt = updatedAt
    )
}

// Task mappers
fun TaskDto.toEntity(): TaskEntity {
    return TaskEntity(
        id = id,
        title = title,
        description = description,
        farmId = farmId,
        status = status,
        priority = priority,
        dueDate = dueDate,
        assignedTo = assignedTo,
        createdAt = createdAt,
        updatedAt = updatedAt
    )
}

fun TaskEntity.toDto(): TaskDto {
    return TaskDto(
        id = id,
        title = title,
        description = description,
        farmId = farmId,
        status = status,
        priority = priority,
        dueDate = dueDate,
        assignedTo = assignedTo,
        createdAt = createdAt,
        updatedAt = updatedAt
    )
}

// Inventory mappers
fun InventoryItemDto.toEntity(): InventoryItemEntity {
    return InventoryItemEntity(
        id = id,
        name = name,
        category = category,
        quantity = quantity,
        unit = unit,
        farmId = farmId,
        cost = cost,
        supplier = supplier,
        expiryDate = expiryDate,
        location = location,
        notes = notes,
        createdAt = createdAt,
        updatedAt = updatedAt
    )
}

fun InventoryItemEntity.toDto(): InventoryItemDto {
    return InventoryItemDto(
        id = id,
        name = name,
        category = category,
        quantity = quantity,
        unit = unit,
        farmId = farmId,
        cost = cost,
        supplier = supplier,
        expiryDate = expiryDate,
        location = location,
        notes = notes,
        createdAt = createdAt,
        updatedAt = updatedAt
    )
}


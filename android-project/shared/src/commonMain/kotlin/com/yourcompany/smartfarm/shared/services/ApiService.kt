package com.yourcompany.smartfarm.shared.services

import com.yourcompany.smartfarm.shared.models.Farm
import com.yourcompany.smartfarm.shared.models.FarmType
import com.yourcompany.smartfarm.shared.models.FarmStatus
import com.yourcompany.smartfarm.shared.models.Location
import com.yourcompany.smartfarm.shared.models.User
import com.yourcompany.smartfarm.shared.models.UserRole

class ApiService {
    
    suspend fun getUsers(): List<User> {
        // Mock data for now
        return listOf(
            User(
                id = 1,
                email = "farmer@smartfarm.com",
                firstName = "John",
                lastName = "Farmer",
                role = UserRole.FARMER
            ),
            User(
                id = 2,
                email = "manager@smartfarm.com",
                firstName = "Jane",
                lastName = "Manager",
                role = UserRole.MANAGER
            )
        )
    }
    
    suspend fun getFarms(): List<Farm> {
        // Mock data for now
        return listOf(
            Farm(
                id = 1,
                name = "Green Valley Farm",
                location = Location(
                    latitude = 37.7749,
                    longitude = -122.4194,
                    address = "Green Valley, CA"
                ),
                size = 150.0,
                type = FarmType.MIXED,
                status = FarmStatus.ACTIVE,
                ownerId = 1
            ),
            Farm(
                id = 2,
                name = "Sunny Acres",
                location = Location(
                    latitude = 31.9686,
                    longitude = -99.9018,
                    address = "Sunny Acres, TX"
                ),
                size = 200.0,
                type = FarmType.CROP,
                status = FarmStatus.ACTIVE,
                ownerId = 1
            )
        )
    }
    
    suspend fun createUser(user: User): User {
        // Mock implementation
        return user.copy(id = (1..1000).random().toLong())
    }
    
    suspend fun createFarm(farm: Farm): Farm {
        // Mock implementation
        return farm.copy(id = (1..1000).random().toLong())
    }
}

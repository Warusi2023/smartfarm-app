package com.example.smartfarm.data.repository

import com.example.smartfarm.data.database.MonetizationDao
import com.example.smartfarm.data.model.UserSubscription
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class UserSubscriptionRepository @Inject constructor(
    private val monetizationDao: MonetizationDao
) {
    fun getAllUserSubscriptions(): Flow<List<UserSubscription>> = monetizationDao.getAllUserSubscriptions()
    
    suspend fun getUserSubscriptionById(id: Long): UserSubscription? = monetizationDao.getUserSubscriptionById(id)
    
    suspend fun insertUserSubscription(subscription: UserSubscription): Long = monetizationDao.insertUserSubscription(subscription)
    
    suspend fun updateUserSubscription(subscription: UserSubscription) = monetizationDao.updateUserSubscription(subscription)
    
    suspend fun deleteUserSubscription(subscription: UserSubscription) = monetizationDao.deleteUserSubscription(subscription)
    
    fun getActiveUserSubscriptions(): Flow<List<UserSubscription>> = monetizationDao.getActiveUserSubscriptions()
}

package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.MonetizationDao
import com.yourcompany.smartfarm.data.model.UserEarnings
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class UserEarningsRepository @Inject constructor(
    private val monetizationDao: MonetizationDao
) {
    fun getAllUserEarnings(): Flow<List<UserEarnings>> = monetizationDao.getAllUserEarnings()
    
    suspend fun getUserEarningsById(id: Long): UserEarnings? = monetizationDao.getUserEarningsById(id)
    
    suspend fun insertUserEarnings(earnings: UserEarnings): Long = monetizationDao.insertUserEarnings(earnings)
    
    suspend fun updateUserEarnings(earnings: UserEarnings) = monetizationDao.updateUserEarnings(earnings)
    
    suspend fun deleteUserEarnings(earnings: UserEarnings) = monetizationDao.deleteUserEarnings(earnings)
    
    fun getEarningsByUserId(userId: Long): Flow<List<UserEarnings>> = monetizationDao.getEarningsByUserId(userId)
}

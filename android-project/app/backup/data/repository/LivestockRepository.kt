package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.LivestockDao
import com.yourcompany.smartfarm.data.model.Livestock
import com.yourcompany.smartfarm.data.model.LivestockCategory
import kotlinx.coroutines.flow.Flow

class LivestockRepository(private val livestockDao: LivestockDao) {

    fun getAllLivestock(): Flow<List<Livestock>> = livestockDao.getAllLivestock()

    fun getLivestockByCategory(category: LivestockCategory): Flow<List<Livestock>> =
        livestockDao.getLivestockByCategory(category)

    suspend fun getLivestockById(id: Long): Livestock? = livestockDao.getLivestockById(id)

    fun searchLivestock(query: String): Flow<List<Livestock>> = livestockDao.searchLivestock(query)

    suspend fun insertLivestock(livestock: Livestock): Long = livestockDao.insertLivestock(livestock)

    suspend fun insertLivestockList(livestockList: List<Livestock>) = livestockDao.insertLivestockList(livestockList)

    suspend fun updateLivestock(livestock: Livestock) = livestockDao.updateLivestock(livestock)

    suspend fun deleteLivestock(livestock: Livestock) = livestockDao.deleteLivestock(livestock)

    fun getAllCategories(): Flow<List<LivestockCategory>> = livestockDao.getAllCategories()
} 
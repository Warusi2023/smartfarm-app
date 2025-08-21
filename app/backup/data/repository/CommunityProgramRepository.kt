package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.MonetizationDao
import com.yourcompany.smartfarm.data.model.CommunityProgram
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class CommunityProgramRepository @Inject constructor(
    private val monetizationDao: MonetizationDao
) {
    fun getAllCommunityPrograms(): Flow<List<CommunityProgram>> = monetizationDao.getAllCommunityPrograms()
    
    suspend fun getCommunityProgramById(id: Long): CommunityProgram? = monetizationDao.getCommunityProgramById(id)
    
    suspend fun insertCommunityProgram(program: CommunityProgram): Long = monetizationDao.insertCommunityProgram(program)
    
    suspend fun updateCommunityProgram(program: CommunityProgram) = monetizationDao.updateCommunityProgram(program)
    
    suspend fun deleteCommunityProgram(program: CommunityProgram) = monetizationDao.deleteCommunityProgram(program)
    
    fun getActiveCommunityPrograms(): Flow<List<CommunityProgram>> = monetizationDao.getActiveCommunityPrograms()
}

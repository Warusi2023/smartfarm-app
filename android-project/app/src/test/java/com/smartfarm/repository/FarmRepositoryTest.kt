package com.smartfarm.repository

import com.smartfarm.data.database.dao.FarmDao
import com.smartfarm.data.mapper.toEntity
import com.smartfarm.data.model.FarmDto
import com.smartfarm.data.model.LocationDto
import com.smartfarm.data.repository.FarmRepository
import com.smartfarm.data.util.Resource
import com.smartfarm.network.SmartFarmApi
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.runTest
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.mockito.kotlin.*
import retrofit2.Response

class FarmRepositoryTest {
    
    private lateinit var api: SmartFarmApi
    private lateinit var farmDao: FarmDao
    private lateinit var repository: FarmRepository
    
    @Before
    fun setup() {
        api = mock()
        farmDao = mock()
        repository = FarmRepository(api, farmDao)
    }
    
    @Test
    fun `getFarms returns success when API call succeeds`() = runTest {
        // Given
        val farms = listOf(
            FarmDto("1", "Farm 1", LocationDto(0.0, 0.0, "Address"), 10.0, "MIXED", "ACTIVE", "1")
        )
        val response = Response.success(farms)
        whenever(api.getFarms()).thenReturn(response)
        whenever(farmDao.insertAll(any())).thenAnswer { }
        
        // When
        val result = repository.getFarms().first()
        
        // Then
        assertTrue(result is Resource.Success)
        assertEquals(farms, (result as Resource.Success).data)
        verify(farmDao).insertAll(any())
    }
    
    @Test
    fun `getFarms returns error when API call fails`() = runTest {
        // Given
        val response = Response.error<List<FarmDto>>(500, okhttp3.ResponseBody.create(null, "Error"))
        whenever(api.getFarms()).thenReturn(response)
        
        // When
        val result = repository.getFarms().first()
        
        // Then
        assertTrue(result is Resource.Error)
    }
    
    @Test
    fun `createFarm saves to database on success`() = runTest {
        // Given
        val farm = FarmDto("1", "Farm 1", LocationDto(0.0, 0.0, "Address"), 10.0, "MIXED", "ACTIVE", "1")
        val response = Response.success(farm)
        whenever(api.createFarm(farm)).thenReturn(response)
        whenever(farmDao.insertFarm(any())).thenAnswer { }
        
        // When
        val result = repository.createFarm(farm)
        
        // Then
        assertTrue(result is Resource.Success)
        verify(farmDao).insertFarm(any())
    }
    
    @Test
    fun `updateFarm updates database on success`() = runTest {
        // Given
        val farm = FarmDto("1", "Farm 1 Updated", LocationDto(0.0, 0.0, "Address"), 10.0, "MIXED", "ACTIVE", "1")
        val response = Response.success(farm)
        whenever(api.updateFarm("1", farm)).thenReturn(response)
        whenever(farmDao.updateFarm(any())).thenAnswer { }
        
        // When
        val result = repository.updateFarm(farm)
        
        // Then
        assertTrue(result is Resource.Success)
        verify(farmDao).updateFarm(any())
    }
    
    @Test
    fun `deleteFarm removes from database on success`() = runTest {
        // Given
        val farmEntity = farm.toEntity()
        val response = Response.success<Unit>(Unit)
        whenever(api.deleteFarm("1")).thenReturn(response)
        whenever(farmDao.getFarmById("1")).thenReturn(farmEntity)
        whenever(farmDao.deleteFarm(any())).thenAnswer { }
        
        val farm = FarmDto("1", "Farm 1", LocationDto(0.0, 0.0, "Address"), 10.0, "MIXED", "ACTIVE", "1")
        
        // When
        val result = repository.deleteFarm("1")
        
        // Then
        assertTrue(result is Resource.Success)
        verify(farmDao).deleteFarm(any())
    }
}


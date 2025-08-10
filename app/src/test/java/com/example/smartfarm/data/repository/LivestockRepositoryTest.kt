package com.example.smartfarm.data.repository

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.example.smartfarm.data.database.FarmDatabase
import com.example.smartfarm.data.model.Livestock
import com.example.smartfarm.data.model.LivestockCategory
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Rule
import org.junit.Test

class LivestockRepositoryTest {
    @get:Rule
    val instantTaskExecutorRule = InstantTaskExecutorRule()

    private lateinit var db: FarmDatabase
    private lateinit var repository: LivestockRepository

    @Before
    fun setup() {
        db = Room.inMemoryDatabaseBuilder(
            ApplicationProvider.getApplicationContext(),
            FarmDatabase::class.java
        ).allowMainThreadQueries().build()
        repository = LivestockRepository(db.livestockDao())
    }

    @After
    fun teardown() {
        db.close()
    }

    @Test
    fun insertAndGetLivestock() = runBlocking {
        val livestock = Livestock(
            name = "Cow",
            scientificName = "Bos taurus",
            category = LivestockCategory.CATTLE,
            subCategory = "Dairy",
            description = "A dairy cow",
            imageUrl = "",
            lifespan = "15 years",
            gestationPeriod = 280,
            incubationPeriod = null,
            weaningAge = 60,
            maturityAge = 365,
            breedingAge = 365,
            averageWeight = "600kg",
            diet = listOf("Grass"),
            housingRequirements = "Barn",
            spaceRequirement = "10 sq m",
            temperatureRange = "10-30C",
            commonDiseases = listOf("Mastitis"),
            vaccinationSchedule = listOf("Annual"),
            careInstructions = "Regular checkups",
            products = listOf("Milk"),
            marketValue = "$1000",
            isActive = true
        )
        repository.insertLivestock(livestock)
        val all = repository.getAllLivestock().first()
        assertEquals(1, all.size)
        assertEquals("Cow", all[0].name)
    }
} 
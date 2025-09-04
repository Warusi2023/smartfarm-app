package com.yourcompany.smartfarm.data.repository

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.yourcompany.smartfarm.data.database.FarmDatabase
import com.yourcompany.smartfarm.data.model.User
import com.yourcompany.smartfarm.data.model.UserRole
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Rule
import org.junit.Test

class UserRepositoryTest {
    @get:Rule
    val instantTaskExecutorRule = InstantTaskExecutorRule()

    private lateinit var db: FarmDatabase
    private lateinit var repository: UserRepository

    @Before
    fun setup() {
        db = Room.inMemoryDatabaseBuilder(
            ApplicationProvider.getApplicationContext(),
            FarmDatabase::class.java
        ).allowMainThreadQueries().build()
        repository = UserRepository(db.userDao())
    }

    @After
    fun teardown() {
        db.close()
    }

    @Test
    fun insertAndGetUser() = runBlocking {
        // Given
        val user = User(
            id = 0,
            name = "John Doe",
            role = UserRole.ADMIN
        )

        // When
        val userId = repository.insert(user)
        val allUsers = repository.getAllUsers().first()

        // Then
        assertTrue(userId > 0)
        assertEquals(1, allUsers.size)
        assertEquals("John Doe", allUsers[0].name)
        assertEquals(UserRole.ADMIN, allUsers[0].role)
    }

    @Test
    fun insertMultipleUsers() = runBlocking {
        // Given
        val users = listOf(
            User(id = 0, name = "Admin", role = UserRole.ADMIN),
            User(id = 0, name = "Worker", role = UserRole.WORKER),
            User(id = 0, name = "Viewer", role = UserRole.VIEWER)
        )

        // When
        users.forEach { repository.insert(it) }
        val allUsers = repository.getAllUsers().first()

        // Then
        assertEquals(3, allUsers.size)
        assertTrue(allUsers.any { it.name == "Admin" && it.role == UserRole.ADMIN })
        assertTrue(allUsers.any { it.name == "Worker" && it.role == UserRole.WORKER })
        assertTrue(allUsers.any { it.name == "Viewer" && it.role == UserRole.VIEWER })
    }

    @Test
    fun getUserById() = runBlocking {
        // Given
        val user = User(id = 0, name = "Test User", role = UserRole.WORKER)
        val userId = repository.insert(user)

        // When
        val retrievedUser = repository.getUserById(userId)

        // Then
        assertNotNull(retrievedUser)
        assertEquals("Test User", retrievedUser!!.name)
        assertEquals(UserRole.WORKER, retrievedUser.role)
        assertEquals(userId, retrievedUser.id)
    }

    @Test
    fun getUserByIdNotFound() = runBlocking {
        // When
        val user = repository.getUserById(999L)

        // Then
        assertNull(user)
    }

    @Test
    fun getAllUsersEmpty() = runBlocking {
        // When
        val users = repository.getAllUsers().first()

        // Then
        assertTrue(users.isEmpty())
    }

    @Test
    fun insertUserWithExistingId() = runBlocking {
        // Given
        val user1 = User(id = 0, name = "User 1", role = UserRole.ADMIN)
        val user2 = User(id = 0, name = "User 2", role = UserRole.WORKER)

        // When
        val id1 = repository.insert(user1)
        val id2 = repository.insert(user2)

        // Then
        assertNotEquals(id1, id2)
        assertTrue(id1 > 0)
        assertTrue(id2 > 0)
    }

    @Test
    fun userDataIntegrity() = runBlocking {
        // Given
        val user = User(
            id = 0,
            name = "Complex User Name",
            role = UserRole.ADMIN
        )

        // When
        val userId = repository.insert(user)
        val retrievedUser = repository.getUserById(userId)

        // Then
        assertNotNull(retrievedUser)
        assertEquals("Complex User Name", retrievedUser!!.name)
        assertEquals(UserRole.ADMIN, retrievedUser.role)
        assertEquals(userId, retrievedUser.id)
    }

    @Test
    fun concurrentUserOperations() = runBlocking {
        // Given
        val users = (1..10).map { 
            User(id = 0, name = "User $it", role = UserRole.WORKER) 
        }

        // When
        val userIds = users.map { repository.insert(it) }
        val allUsers = repository.getAllUsers().first()

        // Then
        assertEquals(10, userIds.size)
        assertEquals(10, allUsers.size)
        assertTrue(userIds.all { it > 0 })
        assertTrue(userIds.toSet().size == userIds.size) // All IDs are unique
    }
} 
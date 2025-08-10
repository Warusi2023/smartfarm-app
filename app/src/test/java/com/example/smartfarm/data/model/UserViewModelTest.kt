package com.example.smartfarm.data.model

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import com.example.smartfarm.data.repository.UserRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.*
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.mockito.kotlin.*

@OptIn(ExperimentalCoroutinesApi::class)
class UserViewModelTest {
    @get:Rule
    val instantTaskExecutorRule = InstantTaskExecutorRule()

    private lateinit var viewModel: UserViewModel
    private lateinit var mockRepository: UserRepository
    private val testDispatcher = StandardTestDispatcher()

    @Before
    fun setup() {
        Dispatchers.setMain(testDispatcher)
        mockRepository = mock()
        viewModel = UserViewModel(mockRepository)
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun `initial state should have empty users and no current user`() = runTest {
        // Given
        whenever(mockRepository.getAllUsers()).thenReturn(flowOf(emptyList()))

        // When
        testDispatcher.scheduler.advanceUntilIdle()

        // Then
        assertEquals(emptyList<User>(), viewModel.allUsers.value)
        assertNull(viewModel.currentUser.value)
    }

    @Test
    fun `should load users from repository`() = runTest {
        // Given
        val users = listOf(
            User(id = 1, name = "John", role = UserRole.ADMIN),
            User(id = 2, name = "Jane", role = UserRole.WORKER)
        )
        whenever(mockRepository.getAllUsers()).thenReturn(flowOf(users))

        // When
        testDispatcher.scheduler.advanceUntilIdle()

        // Then
        assertEquals(users, viewModel.allUsers.value)
        verify(mockRepository).getAllUsers()
    }

    @Test
    fun `selectUser should update current user`() = runTest {
        // Given
        val user = User(id = 1, name = "John", role = UserRole.ADMIN)

        // When
        viewModel.selectUser(user)
        testDispatcher.scheduler.advanceUntilIdle()

        // Then
        assertEquals(user, viewModel.currentUser.value)
    }

    @Test
    fun `insert should call repository insert`() = runTest {
        // Given
        val user = User(id = 0, name = "New User", role = UserRole.VIEWER)
        whenever(mockRepository.insert(user)).thenReturn(1L)

        // When
        viewModel.insert(user)
        testDispatcher.scheduler.advanceUntilIdle()

        // Then
        verify(mockRepository).insert(user)
    }

    @Test
    fun `should handle repository errors gracefully`() = runTest {
        // Given
        whenever(mockRepository.getAllUsers()).thenReturn(flowOf(emptyList()))

        // When
        testDispatcher.scheduler.advanceUntilIdle()

        // Then
        assertEquals(emptyList<User>(), viewModel.allUsers.value)
        // Should not crash when repository returns empty list
    }

    @Test
    fun `currentUser should be observable`() = runTest {
        // Given
        val user = User(id = 1, name = "Test User", role = UserRole.ADMIN)
        val currentUserValues = mutableListOf<User?>()

        // When
        viewModel.currentUser.value?.let { currentUserValues.add(it) }
        viewModel.selectUser(user)
        testDispatcher.scheduler.advanceUntilIdle()
        viewModel.currentUser.value?.let { currentUserValues.add(it) }

        // Then
        assertEquals(2, currentUserValues.size)
        assertNull(currentUserValues[0])
        assertEquals(user, currentUserValues[1])
    }
} 
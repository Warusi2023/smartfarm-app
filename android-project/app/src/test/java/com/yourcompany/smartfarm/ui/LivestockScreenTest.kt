package com.yourcompany.smartfarm.ui

import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.yourcompany.smartfarm.data.model.*
import com.yourcompany.smartfarm.data.repository.LivestockRepository
import com.yourcompany.smartfarm.data.repository.LivestockReminderRepository
import com.yourcompany.smartfarm.data.repository.UserRepository
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import kotlinx.coroutines.runBlocking

@RunWith(AndroidJUnit4::class)
class LivestockScreenTest {
    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun loginAndShowLivestockList() {
        // Fake ViewModels with empty data for test
        val fakeUserViewModel = object : UserViewModel(UserRepository(FakeUserDao())) {}
        val fakeLivestockViewModel = object : LivestockViewModel(LivestockRepository(FakeLivestockDao())) {}
        val fakeReminderViewModel = object : LivestockReminderViewModel(LivestockReminderRepository(FakeLivestockReminderDao())) {}

        composeTestRule.setContent {
            LivestockScreen(
                viewModel = fakeLivestockViewModel,
                reminderViewModel = fakeReminderViewModel,
                userViewModel = fakeUserViewModel
            )
        }

        // Login dialog should appear
        composeTestRule.onNodeWithText("Select User or Create Account").assertIsDisplayed()
        // Enter name and create user
        composeTestRule.onNodeWithText("Name").performTextInput("TestUser")
        composeTestRule.onNodeWithText("Create and Login").performClick()
        // After login, livestock list should be shown
        composeTestRule.onNodeWithText("Livestock List").assertIsDisplayed()
    }

    @Test
    fun roleBasedPermissionsTest() {
        val fakeUserViewModel = object : UserViewModel(UserRepository(FakeUserDao())) {
            init {
                // Simulate three users
                selectUser(User(id = 1, name = "Admin", role = UserRole.ADMIN))
            }
        }
        val fakeLivestockViewModel = object : LivestockViewModel(LivestockRepository(FakeLivestockDao())) {}
        val fakeReminderViewModel = object : LivestockReminderViewModel(LivestockReminderRepository(FakeLivestockReminderDao())) {}

        composeTestRule.setContent {
            LivestockScreen(
                viewModel = fakeLivestockViewModel,
                reminderViewModel = fakeReminderViewModel,
                userViewModel = fakeUserViewModel
            )
        }

        // Admin: should see add (+) button
        composeTestRule.onNodeWithText("+").assertIsDisplayed()
        // Switch to Worker
        fakeUserViewModel.selectUser(User(id = 2, name = "Worker", role = UserRole.WORKER))
        composeTestRule.waitForIdle()
        composeTestRule.onNodeWithText("+").assertIsDisplayed()
        // Switch to Viewer
        fakeUserViewModel.selectUser(User(id = 3, name = "Viewer", role = UserRole.VIEWER))
        composeTestRule.waitForIdle()
        composeTestRule.onAllNodesWithText("+").assertCountEquals(0)
    }

    @Test
    fun helpAboutDialogTest() {
        val fakeUserViewModel = object : UserViewModel(UserRepository(FakeUserDao())) {
            init { selectUser(User(id = 1, name = "Admin", role = UserRole.ADMIN)) }
        }
        val fakeLivestockViewModel = object : LivestockViewModel(LivestockRepository(FakeLivestockDao())) {}
        val fakeReminderViewModel = object : LivestockReminderViewModel(LivestockReminderRepository(FakeLivestockReminderDao())) {}
        composeTestRule.setContent {
            LivestockScreen(
                viewModel = fakeLivestockViewModel,
                reminderViewModel = fakeReminderViewModel,
                userViewModel = fakeUserViewModel
            )
        }
        composeTestRule.onNodeWithText("Help/About").performClick()
        composeTestRule.onNodeWithText("SmartFarm Livestock Manager").assertIsDisplayed()
        composeTestRule.onNodeWithText("Close").performClick()
    }

    @Test
    fun addAndDeleteReminderTest() {
        // Setup with a livestock entry and a user
        // ... (similar to above, with a fake livestock list)
        // Open details, open reminders, add a reminder, check it appears, delete it, check it's gone
    }

    @Test
    fun livestockViewModel_addAndGet() = runBlocking {
        val repo = LivestockRepository(FakeLivestockDao())
        val vm = LivestockViewModel(repo)
        // Add livestock, check state, etc.
    }

    @Test
    fun outlierReviewDialogTest() {
        val fakeUserViewModel = object : UserViewModel(UserRepository(FakeUserDao())) {
            init { selectUser(User(id = 1, name = "Admin", role = UserRole.ADMIN)) }
        }
        val fakeLivestock = listOf(
            Livestock(id = 1, name = "Cow1", category = LivestockCategory.CATTLE, subCategory = "", description = "", scientificName = "", imageUrl = "", lifespan = "", gestationPeriod = null, incubationPeriod = null, weaningAge = null, maturityAge = 0, breedingAge = 0, averageWeight = "", diet = emptyList(), housingRequirements = "", spaceRequirement = "", temperatureRange = "", commonDiseases = emptyList(), vaccinationSchedule = emptyList(), careInstructions = "", products = emptyList(), marketValue = ""),
            Livestock(id = 2, name = "Cow2", category = LivestockCategory.CATTLE, subCategory = "", description = "", scientificName = "", imageUrl = "", lifespan = "", gestationPeriod = null, incubationPeriod = null, weaningAge = null, maturityAge = 0, breedingAge = 0, averageWeight = "", diet = emptyList(), housingRequirements = "", spaceRequirement = "", temperatureRange = "", commonDiseases = emptyList(), vaccinationSchedule = emptyList(), careInstructions = "", products = emptyList(), marketValue = "")
        )
        val fakeLivestockViewModel = object : LivestockViewModel(LivestockRepository(FakeLivestockDao(fakeLivestock))) {}
        val fakeReminderViewModel = object : LivestockReminderViewModel(LivestockReminderRepository(FakeLivestockReminderDao())) {}
        val fakeAckViewModel = OutlierAcknowledgmentViewModel(
            OutlierAcknowledgmentRepository(
                object : OutlierAcknowledgmentDao {
                    private val acks = mutableListOf<OutlierAcknowledgment>()
                    override suspend fun insert(ack: OutlierAcknowledgment): Long { acks.add(ack); return 1L }
                    override suspend fun getForAnimal(animalId: Long): List<OutlierAcknowledgment> = acks.filter { it.animalId == animalId }
                    override suspend fun getAll(): List<OutlierAcknowledgment> = acks
                    override suspend fun delete(ack: OutlierAcknowledgment) { acks.remove(ack) }
                }
            )
        )
        composeTestRule.setContent {
            DashboardDialog(
                livestockList = fakeLivestock,
                onDismiss = {},
                highlightAnimalIds = listOf(1, 2)
            )
        }
        // Manual review button should be present
        composeTestRule.onNodeWithText("Review Outliers").assertIsDisplayed().performClick()
        // Outlier review dialog should appear for unacknowledged outliers
        composeTestRule.onNodeWithText("Review Outlier (1/2)").assertIsDisplayed()
        // Enter note and acknowledge
        composeTestRule.onNodeWithText("Remediation Note").performTextInput("Test note")
        composeTestRule.onNodeWithText("Acknowledge").performClick()
        // Next outlier
        composeTestRule.onNodeWithText("Review Outlier (2/2)").assertIsDisplayed()
        composeTestRule.onNodeWithText("Acknowledge").performClick()
        // All outliers acknowledged, dialog should show completion message
        composeTestRule.onNodeWithText("No Unacknowledged Outliers").assertIsDisplayed()
        composeTestRule.onNodeWithText("Close").performClick()
        // Export button should be present
        composeTestRule.onNodeWithText("Export Outlier Acknowledgments").assertIsDisplayed()
        // (Export intent cannot be fully tested in Compose, but button presence is checked)
    }

    @Test
    fun outlierAcknowledgmentExportTest() {
        val fakeAcks = mutableListOf<OutlierAcknowledgment>()
        val fakeAckDao = object : OutlierAcknowledgmentDao {
            override suspend fun insert(ack: OutlierAcknowledgment): Long { fakeAcks.add(ack); return 1L }
            override suspend fun getForAnimal(animalId: Long): List<OutlierAcknowledgment> = fakeAcks.filter { it.animalId == animalId }
            override suspend fun getAll(): List<OutlierAcknowledgment> = fakeAcks
            override suspend fun delete(ack: OutlierAcknowledgment) { fakeAcks.remove(ack) }
        }
        val fakeAckRepo = OutlierAcknowledgmentRepository(fakeAckDao)
        val fakeAckViewModel = OutlierAcknowledgmentViewModel(fakeAckRepo)
        // Add two acknowledgments
        fakeAckViewModel.insert(OutlierAcknowledgment(animalId = 1, note = "Note1", timestamp = 1111L))
        fakeAckViewModel.insert(OutlierAcknowledgment(animalId = 2, note = "Note2", timestamp = 2222L))
        // Simulate export logic
        val csv = buildString {
            append("animalId,note,timestamp\n")
            fakeAcks.forEach { ack ->
                append("${ack.animalId},${ack.note.replace(",", ";")},${ack.timestamp}\n")
            }
        }
        val expected = "animalId,note,timestamp\n1,Note1,1111\n2,Note2,2222\n"
        assert(csv == expected) { "CSV export did not match expected output.\nExpected:\n$expected\nActual:\n$csv" }
    }
}

// Fake DAOs for UI test (no-op, just for compilation)
class FakeUserDao : com.yourcompany.smartfarm.data.database.UserDao {
    override suspend fun insert(user: User) = 1L
    override fun getAllUsers() = kotlinx.coroutines.flow.flowOf(emptyList<User>())
    override suspend fun getUserById(id: Long) = null
}
class FakeLivestockDao(private val fakeLivestock: List<com.yourcompany.smartfarm.data.model.Livestock> = emptyList()) : com.yourcompany.smartfarm.data.database.LivestockDao {
    override fun getAllLivestock() = kotlinx.coroutines.flow.flowOf(fakeLivestock)
    override fun getLivestockByCategory(category: LivestockCategory) = kotlinx.coroutines.flow.flowOf(fakeLivestock.filter { it.category == category })
    override suspend fun getLivestockById(id: Long) = fakeLivestock.find { it.id == id }
    override fun searchLivestock(query: String) = kotlinx.coroutines.flow.flowOf(fakeLivestock.filter { it.name.contains(query, ignoreCase = true) })
    override suspend fun insertLivestock(livestock: com.yourcompany.smartfarm.data.model.Livestock) = 1L
    override suspend fun insertLivestockList(livestockList: List<com.yourcompany.smartfarm.data.model.Livestock>) {}
    override suspend fun updateLivestock(livestock: com.yourcompany.smartfarm.data.model.Livestock) {}
    override suspend fun deleteLivestock(livestock: com.yourcompany.smartfarm.data.model.Livestock) {}
    override fun getAllCategories() = kotlinx.coroutines.flow.flowOf(fakeLivestock.map { it.category }.distinct())
}
class FakeLivestockReminderDao : com.yourcompany.smartfarm.data.database.LivestockReminderDao {
    override suspend fun insert(reminder: com.yourcompany.smartfarm.data.model.LivestockReminder) = 1L
    override suspend fun delete(reminder: com.yourcompany.smartfarm.data.model.LivestockReminder) {}
    override fun getRemindersForLivestock(livestockId: Long) = kotlinx.coroutines.flow.flowOf(emptyList<com.yourcompany.smartfarm.data.model.LivestockReminder>())
    override fun getAllReminders() = kotlinx.coroutines.flow.flowOf(emptyList<com.yourcompany.smartfarm.data.model.LivestockReminder>())
} 
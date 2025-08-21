package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.LivestockReminderDao
import com.yourcompany.smartfarm.data.model.LivestockReminder
import kotlinx.coroutines.flow.Flow

class LivestockReminderRepository(private val dao: LivestockReminderDao) {
    fun getRemindersForLivestock(livestockId: Long): Flow<List<LivestockReminder>> =
        dao.getRemindersForLivestock(livestockId)

    fun getAllReminders(): Flow<List<LivestockReminder>> = dao.getAllReminders()

    suspend fun insert(reminder: LivestockReminder) = dao.insert(reminder)

    suspend fun delete(reminder: LivestockReminder) = dao.delete(reminder)
} 
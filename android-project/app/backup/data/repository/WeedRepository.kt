package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.WeedDao
import com.yourcompany.smartfarm.data.model.Weed

class WeedRepository(private val weedDao: WeedDao) {
    fun getAllWeeds(): List<Weed> = weedDao.getAllWeeds()
    fun getWeedById(id: Int): Weed? = weedDao.getWeedById(id)
    fun insertWeed(weed: Weed) = weedDao.insertWeed(weed)
    fun deleteWeed(weed: Weed) = weedDao.deleteWeed(weed)
} 
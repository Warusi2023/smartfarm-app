package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.HerbicideDao
import com.yourcompany.smartfarm.data.model.Herbicide

class HerbicideRepository(private val herbicideDao: HerbicideDao) {
    fun getAllHerbicides(): List<Herbicide> = herbicideDao.getAllHerbicides()
    fun getHerbicideById(id: Int): Herbicide? = herbicideDao.getHerbicideById(id)
    fun insertHerbicide(herbicide: Herbicide) = herbicideDao.insertHerbicide(herbicide)
    fun deleteHerbicide(herbicide: Herbicide) = herbicideDao.deleteHerbicide(herbicide)
} 
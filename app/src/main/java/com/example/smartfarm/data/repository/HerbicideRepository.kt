package com.example.smartfarm.data.repository

import com.example.smartfarm.data.database.HerbicideDao
import com.example.smartfarm.data.model.Herbicide

class HerbicideRepository(private val herbicideDao: HerbicideDao) {
    fun getAllHerbicides(): List<Herbicide> = herbicideDao.getAllHerbicides()
    fun getHerbicideById(id: Int): Herbicide? = herbicideDao.getHerbicideById(id)
    fun insertHerbicide(herbicide: Herbicide) = herbicideDao.insertHerbicide(herbicide)
    fun deleteHerbicide(herbicide: Herbicide) = herbicideDao.deleteHerbicide(herbicide)
} 
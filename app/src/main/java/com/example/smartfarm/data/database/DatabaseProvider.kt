package com.example.smartfarm.data.database

import android.content.Context
import androidx.room.Room
import com.example.smartfarm.data.model.Herbicide
import com.example.smartfarm.data.model.Weed

object DatabaseProvider {
    @Volatile
    private var INSTANCE: FarmDatabase? = null

    fun getDatabase(context: Context): FarmDatabase {
        return INSTANCE ?: synchronized(this) {
            val instance = Room.databaseBuilder(
                context.applicationContext,
                FarmDatabase::class.java,
                "farm_database"
            ).build()
            INSTANCE = instance
            instance
        }
    }

    @Volatile
    private var CROP_INSTANCE: CropDatabase? = null

    fun getCropDatabase(context: Context): CropDatabase {
        return CROP_INSTANCE ?: synchronized(this) {
            val instance = Room.databaseBuilder(
                context.applicationContext,
                CropDatabase::class.java,
                "crop_database"
            ).build()
            CROP_INSTANCE = instance
            instance
        }
    }

    fun prepopulateHerbicidesAndWeeds(db: CropDatabase) {
        if (db.herbicideDao().getAllHerbicides().isEmpty()) {
            db.herbicideDao().insertHerbicide(
                Herbicide(
                    id = 1,
                    name = "Glyphosate",
                    activeIngredient = "Glyphosate",
                    recommendedCrops = listOf("Maize", "Soybean"),
                    targetWeeds = listOf("Goosegrass", "Barnyardgrass"),
                    mixtureInstructions = "Mix 100ml per 15L of water. Apply as a foliar spray.",
                    dosageRate = "2L per hectare"
                )
            )
            db.herbicideDao().insertHerbicide(
                Herbicide(
                    id = 2,
                    name = "Atrazine",
                    activeIngredient = "Atrazine",
                    recommendedCrops = listOf("Maize"),
                    targetWeeds = listOf("Pigweed", "Lambsquarters"),
                    mixtureInstructions = "Mix 50g per 15L of water. Apply pre-emergence.",
                    dosageRate = "1.5L per hectare"
                )
            )
        }
        if (db.weedDao().getAllWeeds().isEmpty()) {
            db.weedDao().insertWeed(
                Weed(
                    id = 1,
                    name = "Goosegrass",
                    susceptibleHerbicides = listOf("Glyphosate"),
                    description = "A common annual grass weed found in crops."
                )
            )
            db.weedDao().insertWeed(
                Weed(
                    id = 2,
                    name = "Pigweed",
                    susceptibleHerbicides = listOf("Atrazine"),
                    description = "A broadleaf weed that competes with crops for nutrients."
                )
            )
        }
    }
}
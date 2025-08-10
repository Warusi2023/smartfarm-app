package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.Tree
import com.example.smartfarm.data.model.TreeCategory
import kotlinx.coroutines.flow.Flow

@Dao
interface TreeDao {
    
    @Query("SELECT * FROM trees WHERE isActive = 1")
    fun getAllTrees(): Flow<List<Tree>>
    
    @Query("SELECT * FROM trees WHERE category = :category AND isActive = 1")
    fun getTreesByCategory(category: TreeCategory): Flow<List<Tree>>
    
    @Query("SELECT * FROM trees WHERE id = :id")
    suspend fun getTreeById(id: Long): Tree?
    
    @Query("SELECT * FROM trees WHERE name LIKE '%' || :query || '%' OR scientificName LIKE '%' || :query || '%' AND isActive = 1")
    fun searchTrees(query: String): Flow<List<Tree>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTree(tree: Tree): Long
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTrees(trees: List<Tree>)
    
    @Update
    suspend fun updateTree(tree: Tree)
    
    @Delete
    suspend fun deleteTree(tree: Tree)
    
    @Query("SELECT DISTINCT category FROM trees WHERE isActive = 1")
    fun getAllCategories(): Flow<List<TreeCategory>>
} 
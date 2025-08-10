package com.example.smartfarm.util

import android.content.Context
import android.content.res.AssetManager
import io.mockk.every
import io.mockk.mockk
import io.mockk.slot
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import java.io.ByteArrayInputStream
import java.io.IOException

class LegalDocumentHelperTest {
    
    private lateinit var mockContext: Context
    private lateinit var mockAssetManager: AssetManager
    
    @Before
    fun setUp() {
        mockAssetManager = mockk()
        mockContext = mockk {
            every { assets } returns mockAssetManager
        }
    }
    
    @Test
    fun `loadPrivacyPolicy should return HTML content`() {
        // Given
        val expectedContent = "<!DOCTYPE html><html><body>Privacy Policy</body></html>"
        val inputStream = ByteArrayInputStream(expectedContent.toByteArray())
        
        every { mockAssetManager.open("privacy_policy.html") } returns inputStream
        
        // When
        val result = LegalDocumentHelper.loadPrivacyPolicy(mockContext)
        
        // Then
        assertEquals(expectedContent, result)
    }
    
    @Test
    fun `loadTermsOfService should return HTML content`() {
        // Given
        val expectedContent = "<!DOCTYPE html><html><body>Terms of Service</body></html>"
        val inputStream = ByteArrayInputStream(expectedContent.toByteArray())
        
        every { mockAssetManager.open("terms_of_service.html") } returns inputStream
        
        // When
        val result = LegalDocumentHelper.loadTermsOfService(mockContext)
        
        // Then
        assertEquals(expectedContent, result)
    }
    
    @Test(expected = IOException::class)
    fun `loadPrivacyPolicy should throw IOException when file not found`() {
        // Given
        every { mockAssetManager.open("privacy_policy.html") } throws IOException("File not found")
        
        // When
        LegalDocumentHelper.loadPrivacyPolicy(mockContext)
        
        // Then - should throw IOException
    }
    
    @Test(expected = IOException::class)
    fun `loadTermsOfService should throw IOException when file not found`() {
        // Given
        every { mockAssetManager.open("terms_of_service.html") } throws IOException("File not found")
        
        // When
        LegalDocumentHelper.loadTermsOfService(mockContext)
        
        // Then - should throw IOException
    }
    
    @Test
    fun `legalDocumentsExist should return true when both files exist`() {
        // Given
        every { mockAssetManager.list("") } returns arrayOf("privacy_policy.html", "terms_of_service.html", "other_file.txt")
        
        // When
        val result = LegalDocumentHelper.legalDocumentsExist(mockContext)
        
        // Then
        assertTrue(result)
    }
    
    @Test
    fun `legalDocumentsExist should return false when privacy policy missing`() {
        // Given
        every { mockAssetManager.list("") } returns arrayOf("terms_of_service.html", "other_file.txt")
        
        // When
        val result = LegalDocumentHelper.legalDocumentsExist(mockContext)
        
        // Then
        assertFalse(result)
    }
    
    @Test
    fun `legalDocumentsExist should return false when terms of service missing`() {
        // Given
        every { mockAssetManager.list("") } returns arrayOf("privacy_policy.html", "other_file.txt")
        
        // When
        val result = LegalDocumentHelper.legalDocumentsExist(mockContext)
        
        // Then
        assertFalse(result)
    }
    
    @Test
    fun `legalDocumentsExist should return false when exception occurs`() {
        // Given
        every { mockAssetManager.list("") } throws IOException("Asset manager error")
        
        // When
        val result = LegalDocumentHelper.legalDocumentsExist(mockContext)
        
        // Then
        assertFalse(result)
    }
    
    @Test
    fun `getLastUpdatedDate should return correct date`() {
        // When
        val result = LegalDocumentHelper.getLastUpdatedDate()
        
        // Then
        assertEquals("January 2025", result)
    }
    
    @Test
    fun `getLegalDocumentsVersion should return correct version`() {
        // When
        val result = LegalDocumentHelper.getLegalDocumentsVersion()
        
        // Then
        assertEquals("1.0", result)
    }
} 
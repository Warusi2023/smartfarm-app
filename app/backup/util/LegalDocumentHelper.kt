package com.yourcompany.smartfarm.util

import android.content.Context
import java.io.IOException

/**
 * Utility class for handling legal documents (Privacy Policy and Terms of Service)
 */
object LegalDocumentHelper {
    
    /**
     * Loads the privacy policy HTML content from assets
     * @param context The application context
     * @return The privacy policy HTML content as a string
     * @throws IOException if the file cannot be read
     */
    @Throws(IOException::class)
    fun loadPrivacyPolicy(context: Context): String {
        return context.assets.open("privacy_policy.html").bufferedReader().use { it.readText() }
    }
    
    /**
     * Loads the terms of service HTML content from assets
     * @param context The application context
     * @return The terms of service HTML content as a string
     * @throws IOException if the file cannot be read
     */
    @Throws(IOException::class)
    fun loadTermsOfService(context: Context): String {
        return context.assets.open("terms_of_service.html").bufferedReader().use { it.readText() }
    }
    
    /**
     * Checks if the legal documents exist in assets
     * @param context The application context
     * @return true if both documents exist, false otherwise
     */
    fun legalDocumentsExist(context: Context): Boolean {
        return try {
            context.assets.list("")?.contains("privacy_policy.html") == true &&
            context.assets.list("")?.contains("terms_of_service.html") == true
        } catch (e: Exception) {
            false
        }
    }
    
    /**
     * Gets the last updated date for legal documents
     * @return The last updated date as a string
     */
    fun getLastUpdatedDate(): String {
        return "January 2025"
    }
    
    /**
     * Gets the version of the legal documents
     * @return The version string
     */
    fun getLegalDocumentsVersion(): String {
        return "1.0"
    }
} 
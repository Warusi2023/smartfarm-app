package com.smartfarm.data

import android.content.Context
import android.content.SharedPreferences

class UserPreferences(context: Context) {

    companion object {
        private const val PREF_NAME = "SmartFarmUserPrefs"
        private const val KEY_IS_LOGGED_IN = "is_logged_in"
        private const val KEY_USER_EMAIL = "user_email"
        private const val KEY_SAVED_EMAIL = "saved_email"
        private const val KEY_REMEMBER_ME = "remember_me"
        private const val KEY_USER_ID = "user_id"
        private const val KEY_USER_NAME = "user_name"
        private const val KEY_ACCESS_TOKEN = "access_token"
        private const val KEY_REFRESH_TOKEN = "refresh_token"
        private const val KEY_TOKEN_EXPIRY = "token_expiry"
        private const val KEY_LAST_LOGIN = "last_login"
        private const val KEY_LOGIN_COUNT = "login_count"
    }

    private val sharedPreferences: SharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)

    // Authentication State
    fun setLoggedIn(isLoggedIn: Boolean) {
        sharedPreferences.edit().putBoolean(KEY_IS_LOGGED_IN, isLoggedIn).apply()
    }

    fun isLoggedIn(): Boolean {
        return sharedPreferences.getBoolean(KEY_IS_LOGGED_IN, false)
    }

    // User Information
    fun saveUserEmail(email: String) {
        sharedPreferences.edit().putString(KEY_USER_EMAIL, email).apply()
    }

    fun getUserEmail(): String? {
        return sharedPreferences.getString(KEY_USER_EMAIL, null)
    }

    fun saveUserId(userId: String) {
        sharedPreferences.edit().putString(KEY_USER_ID, userId).apply()
    }

    fun getUserId(): String? {
        return sharedPreferences.getString(KEY_USER_ID, null)
    }

    fun saveUserName(userName: String) {
        sharedPreferences.edit().putString(KEY_USER_NAME, userName).apply()
    }

    fun getUserName(): String? {
        return sharedPreferences.getString(KEY_USER_NAME, null)
    }

    // Remember Me Functionality
    fun saveEmail(email: String) {
        sharedPreferences.edit().putString(KEY_SAVED_EMAIL, email).apply()
    }

    fun getSavedEmail(): String? {
        return sharedPreferences.getString(KEY_SAVED_EMAIL, null)
    }

    fun clearSavedEmail() {
        sharedPreferences.edit().remove(KEY_SAVED_EMAIL).apply()
    }

    fun setRememberMe(remember: Boolean) {
        sharedPreferences.edit().putBoolean(KEY_REMEMBER_ME, remember).apply()
    }

    fun getRememberMe(): Boolean {
        return sharedPreferences.getBoolean(KEY_REMEMBER_ME, false)
    }

    // Token Management
    fun saveAccessToken(token: String) {
        sharedPreferences.edit().putString(KEY_ACCESS_TOKEN, token).apply()
    }

    fun getAccessToken(): String? {
        return sharedPreferences.getString(KEY_ACCESS_TOKEN, null)
    }

    fun saveRefreshToken(token: String) {
        sharedPreferences.edit().putString(KEY_REFRESH_TOKEN, token).apply()
    }

    fun getRefreshToken(): String? {
        return sharedPreferences.getString(KEY_REFRESH_TOKEN, null)
    }

    fun saveTokenExpiry(expiryTime: Long) {
        sharedPreferences.edit().putLong(KEY_TOKEN_EXPIRY, expiryTime).apply()
    }

    fun getTokenExpiry(): Long {
        return sharedPreferences.getLong(KEY_TOKEN_EXPIRY, 0L)
    }

    fun isTokenExpired(): Boolean {
        val expiryTime = getTokenExpiry()
        return expiryTime > 0 && System.currentTimeMillis() > expiryTime
    }

    // Login Statistics
    fun updateLastLogin() {
        val currentTime = System.currentTimeMillis()
        sharedPreferences.edit()
            .putLong(KEY_LAST_LOGIN, currentTime)
            .putInt(KEY_LOGIN_COUNT, getLoginCount() + 1)
            .apply()
    }

    fun getLastLogin(): Long {
        return sharedPreferences.getLong(KEY_LAST_LOGIN, 0L)
    }

    fun getLoginCount(): Int {
        return sharedPreferences.getInt(KEY_LOGIN_COUNT, 0)
    }

    // User Session Management
    fun createUserSession(
        userId: String,
        email: String,
        userName: String,
        accessToken: String,
        refreshToken: String,
        expiryTime: Long
    ) {
        sharedPreferences.edit()
            .putString(KEY_USER_ID, userId)
            .putString(KEY_USER_EMAIL, email)
            .putString(KEY_USER_NAME, userName)
            .putString(KEY_ACCESS_TOKEN, accessToken)
            .putString(KEY_REFRESH_TOKEN, refreshToken)
            .putLong(KEY_TOKEN_EXPIRY, expiryTime)
            .putBoolean(KEY_IS_LOGGED_IN, true)
            .apply()

        updateLastLogin()
    }

    fun clearUserSession() {
        sharedPreferences.edit()
            .remove(KEY_USER_ID)
            .remove(KEY_USER_EMAIL)
            .remove(KEY_USER_NAME)
            .remove(KEY_ACCESS_TOKEN)
            .remove(KEY_REFRESH_TOKEN)
            .remove(KEY_TOKEN_EXPIRY)
            .putBoolean(KEY_IS_LOGGED_IN, false)
            .apply()
    }

    fun clearAllData() {
        sharedPreferences.edit().clear().apply()
    }

    // Utility Methods
    fun hasValidSession(): Boolean {
        return isLoggedIn() && 
               !getAccessToken().isNullOrEmpty() && 
               !isTokenExpired()
    }

    fun getSessionInfo(): Map<String, Any?> {
        return mapOf(
            "isLoggedIn" to isLoggedIn(),
            "userId" to getUserId(),
            "userEmail" to getUserEmail(),
            "userName" to getUserName(),
            "hasValidToken" to hasValidSession(),
            "lastLogin" to getLastLogin(),
            "loginCount" to getLoginCount(),
            "rememberMe" to getRememberMe()
        )
    }

    fun isFirstTimeUser(): Boolean {
        return getLoginCount() == 0
    }

    fun getDaysSinceLastLogin(): Long {
        val lastLogin = getLastLogin()
        if (lastLogin == 0L) return -1
        
        val currentTime = System.currentTimeMillis()
        val diffInMillis = currentTime - lastLogin
        return diffInMillis / (24 * 60 * 60 * 1000) // Convert to days
    }
}

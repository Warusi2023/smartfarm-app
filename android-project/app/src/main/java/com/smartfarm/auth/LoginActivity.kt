package com.smartfarm.auth

import android.content.Intent
import android.os.Bundle
import android.text.TextUtils
import android.util.Patterns
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.google.android.material.button.MaterialButton
import com.google.android.material.checkbox.MaterialCheckBox
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout
import com.smartfarm.MainActivity
import com.smartfarm.R
import com.smartfarm.data.UserPreferences
import com.smartfarm.utils.ValidationUtils
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {

    private lateinit var tilEmail: TextInputLayout
    private lateinit var tilPassword: TextInputLayout
    private lateinit var etEmail: TextInputEditText
    private lateinit var etPassword: TextInputEditText
    private lateinit var cbRememberMe: MaterialCheckBox
    private lateinit var btnLogin: MaterialButton
    private lateinit var progressBar: View
    private lateinit var alertContainer: View

    private lateinit var userPreferences: UserPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        // Initialize UserPreferences
        userPreferences = UserPreferences(this)

        // Check if user is already logged in
        if (userPreferences.isLoggedIn()) {
            navigateToMain()
            return
        }

        initializeViews()
        setupClickListeners()
        loadSavedCredentials()
    }

    private fun initializeViews() {
        tilEmail = findViewById(R.id.tilEmail)
        tilPassword = findViewById(R.id.tilPassword)
        etEmail = findViewById(R.id.etEmail)
        etPassword = findViewById(R.id.etPassword)
        cbRememberMe = findViewById(R.id.cbRememberMe)
        btnLogin = findViewById(R.id.btnLogin)
        progressBar = findViewById(R.id.progressBar)
        alertContainer = findViewById(R.id.alertContainer)
    }

    private fun setupClickListeners() {
        btnLogin.setOnClickListener {
            if (validateForm()) {
                performLogin()
            }
        }

        // Forgot Password
        findViewById<View>(R.id.tvForgotPassword).setOnClickListener {
            // TODO: Implement forgot password functionality
            Toast.makeText(this, "Forgot password feature coming soon!", Toast.LENGTH_SHORT).show()
        }

        // Sign Up
        findViewById<View>(R.id.tvSignUp).setOnClickListener {
            // TODO: Navigate to registration screen
            Toast.makeText(this, "Registration feature coming soon!", Toast.LENGTH_SHORT).show()
        }

        // Social Login Buttons
        findViewById<MaterialButton>(R.id.btnGoogle).setOnClickListener {
            performSocialLogin("Google")
        }

        findViewById<MaterialButton>(R.id.btnFacebook).setOnClickListener {
            performSocialLogin("Facebook")
        }

        // Real-time validation
        etEmail.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus) {
                validateEmail()
            }
        }

        etPassword.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus) {
                validatePassword()
            }
        }
    }

    private fun loadSavedCredentials() {
        val savedEmail = userPreferences.getSavedEmail()
        val rememberMe = userPreferences.getRememberMe()

        if (rememberMe && !savedEmail.isNullOrEmpty()) {
            etEmail.setText(savedEmail)
            cbRememberMe.isChecked = true
        }
    }

    private fun validateForm(): Boolean {
        val isEmailValid = validateEmail()
        val isPasswordValid = validatePassword()

        return isEmailValid && isPasswordValid
    }

    private fun validateEmail(): Boolean {
        val email = etEmail.text.toString().trim()
        
        return when {
            TextUtils.isEmpty(email) -> {
                tilEmail.error = getString(R.string.error_email_required)
                false
            }
            !Patterns.EMAIL_ADDRESS.matcher(email).matches() -> {
                tilEmail.error = getString(R.string.error_email_invalid)
                false
            }
            else -> {
                tilEmail.error = null
                true
            }
        }
    }

    private fun validatePassword(): Boolean {
        val password = etPassword.text.toString()
        
        return when {
            TextUtils.isEmpty(password) -> {
                tilPassword.error = getString(R.string.error_password_required)
                false
            }
            password.length < 6 -> {
                tilPassword.error = getString(R.string.error_password_short)
                false
            }
            else -> {
                tilPassword.error = null
                true
            }
        }
    }

    private fun performLogin() {
        val email = etEmail.text.toString().trim()
        val password = etPassword.text.toString()
        val rememberMe = cbRememberMe.isChecked

        // Show loading state
        setLoadingState(true)

        // Simulate API call
        lifecycleScope.launch {
            try {
                delay(2000) // Simulate network delay
                
                // Mock authentication - replace with actual API call
                if (authenticateUser(email, password)) {
                    // Save user preferences
                    if (rememberMe) {
                        userPreferences.saveEmail(email)
                        userPreferences.setRememberMe(true)
                    } else {
                        userPreferences.clearSavedEmail()
                        userPreferences.setRememberMe(false)
                    }

                    // Save login state
                    userPreferences.setLoggedIn(true)
                    userPreferences.saveUserEmail(email)

                    // Show success message
                    showAlert(getString(R.string.login_successful), true)
                    
                    // Navigate to main activity
                    delay(1500)
                    navigateToMain()
                } else {
                    showAlert(getString(R.string.error_invalid_credentials), false)
                    setLoadingState(false)
                }
            } catch (e: Exception) {
                showAlert(getString(R.string.error_login_failed), false)
                setLoadingState(false)
            }
        }
    }

    private fun authenticateUser(email: String, password: String): Boolean {
        // Demo credentials - replace with actual authentication logic
        return email == "demo@smartfarm.com" && password == "demo123"
    }

    private fun performSocialLogin(provider: String) {
        Toast.makeText(this, "Signing in with $provider... Coming soon!", Toast.LENGTH_SHORT).show()
        // TODO: Implement social login functionality
    }

    private fun setLoadingState(isLoading: Boolean) {
        btnLogin.isEnabled = !isLoading
        progressBar.visibility = if (isLoading) View.VISIBLE else View.GONE
        
        if (isLoading) {
            btnLogin.text = getString(R.string.signing_in)
        } else {
            btnLogin.text = getString(R.string.sign_in)
        }
    }

    private fun showAlert(message: String, isSuccess: Boolean) {
        val alertView = layoutInflater.inflate(
            if (isSuccess) R.layout.alert_success else R.layout.alert_error,
            alertContainer,
            false
        )
        
        alertView.findViewById<android.widget.TextView>(R.id.tvAlertMessage).text = message
        
        alertContainer.removeAllViews()
        alertContainer.addView(alertView)
        alertContainer.visibility = View.VISIBLE

        // Auto-hide success alerts
        if (isSuccess) {
            lifecycleScope.launch {
                delay(3000)
                alertContainer.visibility = View.GONE
            }
        }
    }

    private fun navigateToMain() {
        val intent = Intent(this, MainActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }

    override fun onBackPressed() {
        // Prevent going back to login if user is already authenticated
        if (userPreferences.isLoggedIn()) {
            navigateToMain()
        } else {
            super.onBackPressed()
        }
    }
}

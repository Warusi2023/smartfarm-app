package com.smartfarm.contact

import android.content.Intent
import android.net.Uri
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
import com.smartfarm.R
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class ContactActivity : AppCompatActivity() {

    private lateinit var tilFirstName: TextInputLayout
    private lateinit var tilLastName: TextInputLayout
    private lateinit var tilEmail: TextInputLayout
    private lateinit var tilPhone: TextInputLayout
    private lateinit var tilSubject: TextInputLayout
    private lateinit var tilMessage: TextInputLayout
    
    private lateinit var etFirstName: TextInputEditText
    private lateinit var etLastName: TextInputEditText
    private lateinit var etEmail: TextInputEditText
    private lateinit var etPhone: TextInputEditText
    private lateinit var etSubject: TextInputEditText
    private lateinit var etMessage: TextInputEditText
    
    private lateinit var cbNewsletter: MaterialCheckBox
    private lateinit var btnSubmit: MaterialButton
    private lateinit var progressBar: View
    private lateinit var alertContainer: View

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_contact)

        initializeViews()
        setupClickListeners()
        setupRealTimeValidation()
    }

    private fun initializeViews() {
        tilFirstName = findViewById(R.id.tilFirstName)
        tilLastName = findViewById(R.id.tilLastName)
        tilEmail = findViewById(R.id.tilEmail)
        tilPhone = findViewById(R.id.tilPhone)
        tilSubject = findViewById(R.id.tilSubject)
        tilMessage = findViewById(R.id.tilMessage)
        
        etFirstName = findViewById(R.id.etFirstName)
        etLastName = findViewById(R.id.etLastName)
        etEmail = findViewById(R.id.etEmail)
        etPhone = findViewById(R.id.etPhone)
        etSubject = findViewById(R.id.etSubject)
        etMessage = findViewById(R.id.etMessage)
        
        cbNewsletter = findViewById(R.id.cbNewsletter)
        btnSubmit = findViewById(R.id.btnSubmit)
        progressBar = findViewById(R.id.progressBar)
        alertContainer = findViewById(R.id.alertContainer)
    }

    private fun setupClickListeners() {
        btnSubmit.setOnClickListener {
            if (validateForm()) {
                submitContactForm()
            }
        }

        // Direct email contact
        findViewById<View>(R.id.btnDirectEmail).setOnClickListener {
            openEmailClient()
        }

        // Phone contact
        findViewById<View>(R.id.btnPhoneContact).setOnClickListener {
            openPhoneDialer()
        }

        // Website contact
        findViewById<View>(R.id.btnWebsiteContact).setOnClickListener {
            openWebsite()
        }
    }

    private fun setupRealTimeValidation() {
        etFirstName.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus) validateFirstName()
        }

        etLastName.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus) validateLastName()
        }

        etEmail.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus) validateEmail()
        }

        etSubject.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus) validateSubject()
        }

        etMessage.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus) validateMessage()
        }
    }

    private fun validateForm(): Boolean {
        val isFirstNameValid = validateFirstName()
        val isLastNameValid = validateLastName()
        val isEmailValid = validateEmail()
        val isSubjectValid = validateSubject()
        val isMessageValid = validateMessage()

        return isFirstNameValid && isLastNameValid && isEmailValid && isSubjectValid && isMessageValid
    }

    private fun validateFirstName(): Boolean {
        val firstName = etFirstName.text.toString().trim()
        
        return when {
            TextUtils.isEmpty(firstName) -> {
                tilFirstName.error = getString(R.string.error_first_name_required)
                false
            }
            firstName.length < 2 -> {
                tilFirstName.error = getString(R.string.error_first_name_short)
                false
            }
            else -> {
                tilFirstName.error = null
                true
            }
        }
    }

    private fun validateLastName(): Boolean {
        val lastName = etLastName.text.toString().trim()
        
        return when {
            TextUtils.isEmpty(lastName) -> {
                tilLastName.error = getString(R.string.error_last_name_required)
                false
            }
            lastName.length < 2 -> {
                tilLastName.error = getString(R.string.error_last_name_short)
                false
            }
            else -> {
                tilLastName.error = null
                true
            }
        }
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

    private fun validateSubject(): Boolean {
        val subject = etSubject.text.toString().trim()
        
        return when {
            TextUtils.isEmpty(subject) -> {
                tilSubject.error = getString(R.string.error_subject_required)
                false
            }
            subject.length < 5 -> {
                tilSubject.error = getString(R.string.error_subject_short)
                false
            }
            else -> {
                tilSubject.error = null
                true
            }
        }
    }

    private fun validateMessage(): Boolean {
        val message = etMessage.text.toString().trim()
        
        return when {
            TextUtils.isEmpty(message) -> {
                tilMessage.error = getString(R.string.error_message_required)
                false
            }
            message.length < 10 -> {
                tilMessage.error = getString(R.string.error_message_short)
                false
            }
            else -> {
                tilMessage.error = null
                true
            }
        }
    }

    private fun submitContactForm() {
        val formData = ContactFormData(
            firstName = etFirstName.text.toString().trim(),
            lastName = etLastName.text.toString().trim(),
            email = etEmail.text.toString().trim(),
            phone = etPhone.text.toString().trim(),
            subject = etSubject.text.toString().trim(),
            message = etMessage.text.toString().trim(),
            newsletter = cbNewsletter.isChecked
        )

        // Show loading state
        setLoadingState(true)

        // Simulate form submission
        lifecycleScope.launch {
            try {
                delay(2000) // Simulate network delay
                
                // Here you would normally send the data to your server
                // For demo purposes, we'll simulate a successful submission
                
                showAlert(getString(R.string.contact_successful), true)
                
                // Reset form
                resetForm()
                
                // Hide loading state
                setLoadingState(false)
                
            } catch (e: Exception) {
                showAlert(getString(R.string.error_contact_failed), false)
                setLoadingState(false)
            }
        }
    }

    private fun openEmailClient() {
        try {
            val intent = Intent(Intent.ACTION_SENDTO).apply {
                data = Uri.parse("mailto:info@smartfarm-app.com")
                putExtra(Intent.EXTRA_SUBJECT, "SmartFarm Inquiry")
                putExtra(Intent.EXTRA_TEXT, "Hello SmartFarm team,\n\nI would like to inquire about...")
            }
            
            if (intent.resolveActivity(packageManager) != null) {
                startActivity(intent)
            } else {
                Toast.makeText(this, "No email app found", Toast.LENGTH_SHORT).show()
            }
        } catch (e: Exception) {
            Toast.makeText(this, "Unable to open email client", Toast.LENGTH_SHORT).show()
        }
    }

    private fun openPhoneDialer() {
        try {
            val intent = Intent(Intent.ACTION_DIAL).apply {
                data = Uri.parse("tel:+1234567890") // Replace with actual support number
            }
            startActivity(intent)
        } catch (e: Exception) {
            Toast.makeText(this, "Unable to open phone dialer", Toast.LENGTH_SHORT).show()
        }
    }

    private fun openWebsite() {
        try {
            val intent = Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse("https://smartfarm-app.com")
            }
            startActivity(intent)
        } catch (e: Exception) {
            Toast.makeText(this, "Unable to open website", Toast.LENGTH_SHORT).show()
        }
    }

    private fun setLoadingState(isLoading: Boolean) {
        btnSubmit.isEnabled = !isLoading
        progressBar.visibility = if (isLoading) View.VISIBLE else View.GONE
        
        if (isLoading) {
            btnSubmit.text = getString(R.string.sending_message)
        } else {
            btnSubmit.text = getString(R.string.send_message)
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

    private fun resetForm() {
        etFirstName.text?.clear()
        etLastName.text?.clear()
        etEmail.text?.clear()
        etPhone.text?.clear()
        etSubject.text?.clear()
        etMessage.text?.clear()
        cbNewsletter.isChecked = true

        // Clear validation states
        listOf(tilFirstName, tilLastName, tilEmail, tilPhone, tilSubject, tilMessage).forEach {
            it.error = null
        }
    }

    data class ContactFormData(
        val firstName: String,
        val lastName: String,
        val email: String,
        val phone: String,
        val subject: String,
        val message: String,
        val newsletter: Boolean
    )
}

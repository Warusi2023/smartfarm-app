package com.yourcompany.smartfarm

import android.content.Context
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

/**
 * Internal-testing gate: cold start should land on the auth/login route.
 */
@RunWith(AndroidJUnit4::class)
class LoginLaunchSmokeTest {

    @get:Rule
    val composeRule = createAndroidComposeRule<MainActivity>()

    @Before
    fun clearAuthState() {
        val context = InstrumentationRegistry.getInstrumentation().targetContext
        context.getSharedPreferences("smartfarm_settings", Context.MODE_PRIVATE)
            .edit()
            .clear()
            .commit()
    }

    @Test
    fun coldStart_showsLoginScreen() {
        composeRule.waitForIdle()
        composeRule.onNodeWithText("SmartFarm").assertIsDisplayed()
        composeRule.onNodeWithText("Sign in to your account").assertIsDisplayed()
    }
}

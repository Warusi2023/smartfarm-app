# Frontend Testing Guide for SmartFarm KMM Project

## Overview

This guide covers the setup and usage of the Compose testing framework for the SmartFarm Kotlin Multiplatform Mobile (KMM) project. The testing infrastructure supports both common (shared) and platform-specific testing.

## 🏗️ Testing Infrastructure

### Directory Structure

```
shared/src/
├── commonTest/                    # Common tests (JVM, JS, Native)
│   └── kotlin/com/smartfarm/shared/
│       ├── TestUtils.kt          # Common testing utilities
│       ├── MockDataService.kt    # Mock data service for testing
│       ├── SimpleUITest.kt       # Basic UI component tests
│       └── TasksScreenTest.kt    # Complex UI screen tests
├── androidUnitTest/              # Android-specific tests
│   ├── AndroidManifest.xml      # Test manifest
│   └── kotlin/com/smartfarm/shared/
│       └── AndroidUITest.kt     # Android UI tests
└── commonMain/                   # Main source code
    └── kotlin/com/smartfarm/shared/
        ├── domain/               # Domain models
        └── ui/screens/           # UI components
```

### Dependencies

The testing framework includes:

- **Compose Testing**: `compose.uiTestJUnit4`, `compose.uiTestManifest`
- **Coroutines Testing**: `kotlinx-coroutines-test`
- **Mocking**: `io.mockk:mockk`
- **Android Testing**: `androidx.test:runner`, `androidx.test:rules`, `androidx.test.ext:junit`

## 🧪 Test Types

### 1. Common Tests (`commonTest`)

Tests that run on all platforms (JVM, JS, Native):

```kotlin
@get:Rule
val composeTestRule = createComposeRule()

@Test
fun testComponent_DisplaysTitle() {
    composeTestRule.setContent {
        TestComponent(title = "Test Title", onButtonClick = {})
    }
    
    composeTestRule.onNodeWithTag("title").assertTextEquals("Test Title")
}
```

### 2. Android Tests (`androidUnitTest`)

Platform-specific tests for Android:

```kotlin
@RunWith(AndroidJUnit4::class)
class AndroidUITest {
    @get:Rule
    val composeTestRule = createAndroidComposeRule<ComponentActivity>()
    
    @Test
    fun testAndroidComponent_DisplaysMainTitle() {
        // Android-specific testing
    }
}
```

## 🛠️ Testing Utilities

### TestUtils Object

Common testing functions for Compose UI testing:

```kotlin
// Assert text is displayed
composeTestRule.assertTextDisplayed("Expected Text")

// Assert text is not displayed
composeTestRule.assertTextNotDisplayed("Hidden Text")

// Click on text element
composeTestRule.clickOnText("Clickable Text")

// Input text
composeTestRule.inputText("Label", "Input Value")

// Scroll to element
composeTestRule.scrollToText("Text to Find")

// Assert element is clickable
composeTestRule.assertClickable("Button Text")

// Wait for text to appear
composeTestRule.waitForText("Loading Complete", 5000)
```

### MockDataService

A comprehensive mock implementation of the DataService for testing:

```kotlin
val mockDataService = MockDataService()

// Use in tests
composeTestRule.setContent {
    TasksScreen(
        dataService = mockDataService,
        onNavigateBack = {}
    )
}
```

## 📱 Testing UI Components

### Basic Component Testing

```kotlin
@Test
fun testComponent_DisplaysContent() {
    composeTestRule.setContent {
        TestComponent(
            title = "Test Title",
            onButtonClick = {}
        )
    }
    
    // Verify content is displayed
    composeTestRule.assertTextDisplayed("Test Title")
    composeTestRule.onNodeWithTag("button").assertIsDisplayed()
}
```

### User Interaction Testing

```kotlin
@Test
fun testComponent_ButtonClick() {
    var buttonClicked = false
    
    composeTestRule.setContent {
        TestComponent(
            title = "Test",
            onButtonClick = { buttonClicked = true }
        )
    }
    
    // Perform click
    composeTestRule.clickOnText("Click Me")
    
    // Verify interaction (in real tests, verify state changes)
}
```

### Complex Screen Testing

```kotlin
@Test
fun testTasksScreen_LoadsAndDisplaysTasks() {
    val mockDataService = MockDataService()
    
    composeTestRule.setContent {
        TasksScreen(
            dataService = mockDataService,
            onNavigateBack = {}
        )
    }
    
    // Wait for async data loading
    composeTestRule.waitUntil(timeoutMillis = 5000) {
        composeTestRule.onAllNodesWithText("Test Task 1").fetchSemanticsNodes().size == 1
    }
    
    // Verify loaded content
    composeTestRule.assertTextDisplayed("Test Task 1")
    composeTestRule.assertTextDisplayed("Test Task 2")
}
```

## 🔍 Test Assertions

### Text Assertions

```kotlin
// Exact text match
composeTestRule.onNodeWithText("Expected Text").assertTextEquals("Expected Text")

// Text contains
composeTestRule.onNodeWithText("Label").assertTextContains("substring")

// Text is displayed/not displayed
composeTestRule.assertTextDisplayed("Visible Text")
composeTestRule.assertTextNotDisplayed("Hidden Text")
```

### Element Assertions

```kotlin
// Element exists and is displayed
composeTestRule.onNodeWithTag("button").assertIsDisplayed()

// Element has click action
composeTestRule.onNodeWithTag("button").assert(hasClickAction())

// Element has no click action
composeTestRule.onNodeWithText("Static Text").assert(hasNoClickAction())
```

### Tag-based Testing

Use `Modifier.testTag()` for reliable element selection:

```kotlin
Button(
    onClick = onButtonClick,
    modifier = Modifier.testTag("primary_button")
) {
    Text("Click Me")
}

// In test
composeTestRule.onNodeWithTag("primary_button").performClick()
```

## 🚀 Running Tests

### Common Tests

```bash
# Run all common tests
./gradlew :shared:test

# Run specific test class
./gradlew :shared:test --tests "com.smartfarm.shared.SimpleUITest"

# Run specific test method
./gradlew :shared:test --tests "com.smartfarm.shared.SimpleUITest.testComponent_DisplaysTitle"
```

### Android Tests

```bash
# Run Android unit tests
./gradlew :shared:androidUnitTest

# Run specific Android test class
./gradlew :shared:androidUnitTest --tests "com.smartfarm.shared.AndroidUITest"
```

### All Tests

```bash
# Run all tests across all modules
./gradlew testAll
```

## 📋 Test Best Practices

### 1. Test Structure

Follow the **Given-When-Then** pattern:

```kotlin
@Test
fun testComponent_Behavior() {
    // Given - Setup test data and conditions
    val testData = "Test Value"
    
    // When - Perform the action being tested
    composeTestRule.setContent {
        TestComponent(data = testData)
    }
    
    // Then - Verify the expected outcome
    composeTestRule.assertTextDisplayed(testData)
}
```

### 2. Test Naming

Use descriptive test names that explain the scenario and expected outcome:

```kotlin
// Good
fun testTasksScreen_DisplaysLoadingState()
fun testTasksScreen_AddTaskButtonOpensDialog()
fun testTasksScreen_TaskClickOpensDetails()

// Avoid
fun test1()
fun testButton()
fun testDisplay()
```

### 3. Test Isolation

Each test should be independent and not rely on other tests:

```kotlin
@Test
fun testComponent_StateA() {
    // Test state A independently
}

@Test
fun testComponent_StateB() {
    // Test state B independently
}
```

### 4. Async Testing

Handle asynchronous operations properly:

```kotlin
@Test
fun testAsyncOperation() {
    composeTestRule.setContent {
        AsyncComponent()
    }
    
    // Wait for async operation to complete
    composeTestRule.waitUntil(timeoutMillis = 5000) {
        composeTestRule.onAllNodesWithText("Loaded Content").fetchSemanticsNodes().size == 1
    }
    
    // Verify result
    composeTestRule.assertTextDisplayed("Loaded Content")
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Element Not Found**
   - Use `Modifier.testTag()` for reliable element selection
   - Check if element is actually rendered in the current state
   - Verify element is not hidden or scrolled out of view

2. **Async Operations**
   - Use `waitUntil()` for operations that take time
   - Set appropriate timeout values
   - Consider using `LaunchedEffect` for testing async flows

3. **Platform Differences**
   - Common tests run on JVM, JS, and Native
   - Android tests run only on Android
   - Use platform-specific test rules when needed

### Debug Tips

```kotlin
// Print all nodes for debugging
composeTestRule.onRoot().printToLog("TEST")

// Check specific node properties
composeTestRule.onNodeWithTag("button").printToLog("BUTTON")

// Use test tags for reliable selection
Modifier.testTag("unique_identifier")
```

## 📚 Additional Resources

- [Compose Testing Documentation](https://developer.android.com/jetpack/compose/testing)
- [Kotlin Multiplatform Testing](https://kotlinlang.org/docs/multiplatform-testing.html)
- [Jetpack Compose Testing Codelab](https://developer.android.com/codelabs/jetpack-compose-testing)

## 🔄 Next Steps

1. **Expand Test Coverage**: Add tests for all UI components
2. **Integration Tests**: Test complete user workflows
3. **Performance Tests**: Test UI performance and memory usage
4. **Accessibility Tests**: Ensure UI is accessible to all users
5. **Visual Regression Tests**: Test UI appearance consistency

---

**Note**: This testing framework is designed to work with the existing SmartFarm KMM project structure. Ensure all dependencies are properly configured in `build.gradle.kts` before running tests.

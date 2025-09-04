package com.smartfarm.shared

import kotlin.test.Test
import kotlin.test.assertTrue

/**
 * Basic test to verify the testing infrastructure is working
 */
class BasicTest {
    
    @Test
    fun testBasicAssertion() {
        assertTrue(true, "Basic assertion should pass")
    }
    
    @Test
    fun testStringComparison() {
        val expected = "Hello"
        val actual = "Hello"
        assertTrue(expected == actual, "Strings should be equal")
    }
    
    @Test
    fun testNumberComparison() {
        val expected = 42
        val actual = 42
        assertTrue(expected == actual, "Numbers should be equal")
    }
    
    @Test
    fun testBooleanLogic() {
        val condition = true
        assertTrue(condition, "Boolean condition should be true")
    }
}

package com.smartfarm.shared

import kotlin.test.Test
import kotlin.test.assertTrue

/**
 * Simple test to verify the testing framework is working
 */
class SimpleWorkingTest {
    
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
    fun testMathOperation() {
        val result = 2 + 2
        assertTrue(result == 4, "2 + 2 should equal 4")
    }
}

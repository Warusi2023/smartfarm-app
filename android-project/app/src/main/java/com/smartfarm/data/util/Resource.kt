package com.smartfarm.data.util

/**
 * A generic class that holds a value or an exception
 */
sealed class Resource<out T> {
    data class Success<out T>(val data: T) : Resource<T>()
    data class Error(val exception: Throwable, val data: T? = null) : Resource<T>()
    data object Loading : Resource<Nothing>()
}


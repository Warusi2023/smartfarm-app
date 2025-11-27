package com.smartfarm.shared.data.util

/**
 * A sealed class that represents the state of a resource (loading, success, or error)
 */
sealed class Resource<out T> {
    data class Success<out T>(val data: T) : Resource<T>()
    data class Error(val exception: Throwable, val data: T? = null) : Resource<Nothing>()
    object Loading : Resource<Nothing>()
}


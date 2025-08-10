package com.example.smartfarm.web

import org.jetbrains.compose.web.renderComposable
import com.example.smartfarm.web.App

fun main() {
    renderComposable(rootElementId = "root") {
        App()
    }
} 
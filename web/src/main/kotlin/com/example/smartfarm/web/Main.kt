package com.yourcompany.smartfarm.web

import org.jetbrains.compose.web.renderComposable
import com.yourcompany.smartfarm.web.App

fun main() {
    renderComposable(rootElementId = "root") {
        App()
    }
} 
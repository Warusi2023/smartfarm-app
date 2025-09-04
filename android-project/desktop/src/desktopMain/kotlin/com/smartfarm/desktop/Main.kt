package com.smartfarm.desktop

import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import com.smartfarm.desktop.ui.App
import com.smartfarm.desktop.ui.theme.DesktopTheme

fun main() = application {
    val windowState = rememberWindowState()
    
    Window(
        onCloseRequest = ::exitApplication,
        state = windowState,
        title = "SmartFarm Desktop"
    ) {
        DesktopTheme {
            App()
        }
    }
}

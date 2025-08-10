package com.example.smartfarm.ui

import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import com.example.smartfarm.util.LegalDocumentHelper

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LegalDocumentScreen(
    documentType: LegalDocumentType,
    onNavigateBack: () -> Unit
) {
    val context = LocalContext.current
    var htmlContent by remember { mutableStateOf("") }
    var isLoading by remember { mutableStateOf(true) }
    var hasError by remember { mutableStateOf(false) }
    
    // Load the appropriate document
    LaunchedEffect(documentType) {
        try {
            htmlContent = when (documentType) {
                LegalDocumentType.PRIVACY_POLICY -> LegalDocumentHelper.loadPrivacyPolicy(context)
                LegalDocumentType.TERMS_OF_SERVICE -> LegalDocumentHelper.loadTermsOfService(context)
            }
            isLoading = false
        } catch (e: Exception) {
            hasError = true
            isLoading = false
        }
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { 
                    Text(
                        when (documentType) {
                            LegalDocumentType.PRIVACY_POLICY -> "Privacy Policy"
                            LegalDocumentType.TERMS_OF_SERVICE -> "Terms of Service"
                        }
                    ) 
                },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            when {
                isLoading -> {
                    CircularProgressIndicator(
                        modifier = Modifier.align(Alignment.Center)
                    )
                }
                hasError -> {
                    ErrorContent(
                        documentType = documentType,
                        onRetry = {
                            // Retry loading
                            isLoading = true
                            hasError = false
                        }
                    )
                }
                else -> {
                    AndroidView(
                        factory = { context ->
                            WebView(context).apply {
                                webViewClient = WebViewClient()
                                settings.apply {
                                    javaScriptEnabled = false
                                    domStorageEnabled = false
                                    allowFileAccess = false
                                    allowContentAccess = false
                                    loadWithOverviewMode = true
                                    useWideViewPort = true
                                }
                            }
                        },
                        update = { webView ->
                            webView.loadDataWithBaseURL(
                                null,
                                htmlContent,
                                "text/html",
                                "UTF-8",
                                null
                            )
                        }
                    )
                }
            }
        }
    }
}

@Composable
private fun ErrorContent(
    documentType: LegalDocumentType,
    onRetry: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Unable to load ${documentType.title.lowercase()}",
            style = MaterialTheme.typography.headlineSmall,
            textAlign = androidx.compose.ui.text.style.TextAlign.Center
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Please check your internet connection and try again.",
            style = MaterialTheme.typography.bodyMedium,
            textAlign = androidx.compose.ui.text.style.TextAlign.Center,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        
        Spacer(modifier = Modifier.height(24.dp))
        
        Button(onClick = onRetry) {
            Text("Retry")
        }
    }
}

enum class LegalDocumentType(val title: String) {
    PRIVACY_POLICY("Privacy Policy"),
    TERMS_OF_SERVICE("Terms of Service")
} 
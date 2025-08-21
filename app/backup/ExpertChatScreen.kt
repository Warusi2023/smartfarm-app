package com.yourcompany.smartfarm.ui

import android.app.Application
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewmodel.compose.viewModel
import com.yourcompany.smartfarm.data.database.FarmDatabase
import com.yourcompany.smartfarm.data.model.ChatMessageEntity
import com.yourcompany.smartfarm.data.repository.ChatMessageRepository
import com.yourcompany.smartfarm.util.ApiConfigManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*
import okhttp3.*
import org.json.JSONObject
import org.json.JSONArray
import java.io.IOException
import android.util.Log

sealed class ChatMessage(open val text: String) {
    data class User(override val text: String) : ChatMessage(text)
    data class AI(override val text: String) : ChatMessage(text)
    data class UserImage(val imageUri: String) : ChatMessage("")
    data class AIImage(val imageUri: String) : ChatMessage("")
    data class System(override val text: String) : ChatMessage(text)
    data class Error(override val text: String) : ChatMessage(text)
}

data class ChatUiState(
    val messages: List<ChatMessage> = emptyList(),
    val inputText: String = "",
    val isLoading: Boolean = false,
    val error: String? = null,
    val selectedLanguage: String = "English",
    val translationMap: Map<Int, String> = emptyMap(),
    val showLanguageSelector: Boolean = false,
    val availableLanguages: List<String> = listOf("English", "Spanish", "French", "German", "Chinese"),
    val apiStatus: ApiStatus = ApiStatus.UNKNOWN,
    val connectionType: ConnectionType = ConnectionType.DIRECT
)

enum class ApiStatus {
    UNKNOWN, CONNECTED, DISCONNECTED, ERROR, RATE_LIMITED
}

enum class ConnectionType {
    DIRECT, BACKEND_PROXY, MOCK
}

class ExpertChatViewModel(application: Application) : AndroidViewModel(application) {
    private val db = FarmDatabase.getDatabase(application)
    private val repo = ChatMessageRepository(db.chatMessageDao())
    private val apiConfigManager = ApiConfigManager(application)
    
    private val _uiState = MutableStateFlow(ChatUiState())
    val uiState: StateFlow<ChatUiState> = _uiState.asStateFlow()
    
    private val scope = kotlinx.coroutines.CoroutineScope(kotlinx.coroutines.Dispatchers.Main)
    private val httpClient = OkHttpClient.Builder()
        .connectTimeout(30, java.util.concurrent.TimeUnit.SECONDS)
        .readTimeout(60, java.util.concurrent.TimeUnit.SECONDS)
        .writeTimeout(60, java.util.concurrent.TimeUnit.SECONDS)
        .build()
    
    // Configuration
    private val useBackendProxy = false // Set to true for production
    private val openAIApiKey = apiConfigManager.getOpenAIApiKey()
    private val backendUrl = "https://smartfarm-backend.herokuapp.com/api/chat" // Production backend URL
    
    // Chat context and settings
    private val chatContext = mutableListOf<Map<String, String>>()
    private val maxContextLength = 10
    private val maxTokens = 2000
    private val temperature = 0.7f
    
    init {
        loadHistory()
        checkApiStatus()
        initializeChatContext()
    }
    
    private fun initializeChatContext() {
        chatContext.add(mapOf(
            "role" to "system",
            "content" to """You are an expert farming assistant for SmartFarm. You help farmers with:
            - Crop management and disease identification
            - Livestock health and breeding advice
            - Weather impact on farming decisions
            - Equipment maintenance and usage
            - Financial planning and record keeping
            - Sustainable farming practices
            - Pest and weed management
            - Soil health and fertilization
            
            Provide practical, actionable advice based on best practices. Be concise but thorough."""
        ))
    }
    
    private fun checkApiStatus() {
        scope.launch {
            try {
                val isConnected = if (useBackendProxy) {
                    checkBackendConnection()
                } else {
                    checkOpenAIConnection()
                }
                
                _uiState.value = _uiState.value.copy(
                    apiStatus = if (isConnected) ApiStatus.CONNECTED else ApiStatus.DISCONNECTED,
                    connectionType = if (useBackendProxy) ConnectionType.BACKEND_PROXY else ConnectionType.DIRECT
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    apiStatus = ApiStatus.ERROR,
                    error = "API connection failed: ${e.message}"
                )
            }
        }
    }
    
    private suspend fun checkOpenAIConnection(): Boolean {
        return try {
            if (openAIApiKey.isBlank() || openAIApiKey == "sk-...") {
                return false
            }
            
            val requestBody = JSONObject().apply {
                put("model", "gpt-3.5-turbo")
                put("messages", JSONArray().apply {
                    put(JSONObject().apply {
                        put("role", "user")
                        put("content", "Hello")
                    })
                })
                put("max_tokens", 10)
            }.toString()
            
            val request = Request.Builder()
                .url("https://api.openai.com/v1/chat/completions")
                .addHeader("Authorization", "Bearer $openAIApiKey")
                .addHeader("Content-Type", "application/json")
                .post(RequestBody.create(MediaType.get("application/json"), requestBody))
                .build()
            
            val response = httpClient.newCall(request).execute()
            response.isSuccessful
        } catch (e: Exception) {
            Log.e("ExpertChat", "OpenAI connection check failed", e)
            false
        }
    }
    
    private suspend fun checkBackendConnection(): Boolean {
        return try {
            val request = Request.Builder()
                .url("$backendUrl/health")
                .get()
                .build()
            
            val response = httpClient.newCall(request).execute()
            response.isSuccessful
        } catch (e: Exception) {
            Log.e("ExpertChat", "Backend connection check failed", e)
            false
        }
    }
    
    private fun loadHistory() {
        scope.launch {
            try {
                repo.getAll().collect { entities ->
                    val messages = entities.map { entity ->
                        when (entity.sender) {
                            "user" -> ChatMessage.User(entity.text)
                            "ai" -> ChatMessage.AI(entity.text)
                            "user_image" -> ChatMessage.UserImage(entity.text)
                            "ai_image" -> ChatMessage.AIImage(entity.text)
                            "system" -> ChatMessage.System(entity.text)
                            "error" -> ChatMessage.Error(entity.text)
                            else -> ChatMessage.User(entity.text)
                        }
                    }
                    _uiState.value = _uiState.value.copy(messages = messages)
                }
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    error = "Failed to load chat history: ${e.message}"
                )
            }
        }
    }
    
    fun updateInputText(text: String) {
        _uiState.value = _uiState.value.copy(inputText = text)
    }
    
    fun sendMessage() {
        val text = _uiState.value.inputText.trim()
        if (text.isEmpty() || _uiState.value.isLoading) return
        
        scope.launch {
            try {
                // Add user message to UI
                val userMessage = ChatMessage.User(text)
                addMessageToUi(userMessage)
                saveMessageToDatabase("user", text)
                
                // Clear input and show loading
                _uiState.value = _uiState.value.copy(
                    inputText = "",
                    isLoading = true,
                    error = null
                )
                
                // Add to chat context
                addToChatContext("user", text)
                
                // Get AI response
                val aiResponse = if (useBackendProxy) {
                    callBackendProxy(text)
                } else {
                    callOpenAIDirect(text)
                }
                
                // Add AI response to UI
                val aiMessage = ChatMessage.AI(aiResponse)
                addMessageToUi(aiMessage)
                saveMessageToDatabase("ai", aiResponse)
                
                // Add to chat context
                addToChatContext("assistant", aiResponse)
                
            } catch (e: Exception) {
                Log.e("ExpertChat", "Error sending message", e)
                val errorMessage = ChatMessage.Error("Failed to get response: ${e.message}")
                addMessageToUi(errorMessage)
                saveMessageToDatabase("error", e.message ?: "Unknown error")
                
                _uiState.value = _uiState.value.copy(
                    error = "Failed to get response: ${e.message}"
                )
            } finally {
                _uiState.value = _uiState.value.copy(isLoading = false)
            }
        }
    }
    
    private suspend fun callOpenAIDirect(prompt: String): String {
        return try {
            // Validate API key
            if (openAIApiKey.isBlank() || openAIApiKey == "sk-...") {
                return "OpenAI API key not configured. Please set up your API key in the configuration."
            }
            
            // Prepare messages for API call
            val messages = JSONArray()
            chatContext.forEach { message ->
                messages.put(JSONObject().apply {
                    put("role", message["role"])
                    put("content", message["content"])
                })
            }
            
            // Create request body
            val requestBody = JSONObject().apply {
                put("model", "gpt-3.5-turbo")
                put("messages", messages)
                put("max_tokens", maxTokens)
                put("temperature", temperature)
                put("top_p", 1.0)
                put("frequency_penalty", 0.0)
                put("presence_penalty", 0.0)
            }.toString()
            
            // Create HTTP request
            val request = Request.Builder()
                .url("https://api.openai.com/v1/chat/completions")
                .addHeader("Authorization", "Bearer $openAIApiKey")
                .addHeader("Content-Type", "application/json")
                .post(RequestBody.create(MediaType.get("application/json"), requestBody))
                .build()
            
            // Execute request
            val response = httpClient.newCall(request).execute()
            
            if (!response.isSuccessful) {
                val errorBody = response.body?.string() ?: "Unknown error"
                throw IOException("API request failed: ${response.code} - $errorBody")
            }
            
            val responseBody = response.body?.string() ?: throw IOException("Empty response")
            val jsonResponse = JSONObject(responseBody)
            
            // Parse response
            val choices = jsonResponse.getJSONArray("choices")
            if (choices.length() == 0) {
                throw IOException("No response choices available")
            }
            
            val firstChoice = choices.getJSONObject(0)
            val message = firstChoice.getJSONObject("message")
            val content = message.getString("content")
            
            content.trim()
            
        } catch (e: Exception) {
            Log.e("ExpertChat", "OpenAI API call failed", e)
            throw e
        }
    }
    
    private suspend fun callBackendProxy(prompt: String): String {
        return try {
            // Prepare request body
            val requestBody = JSONObject().apply {
                put("message", prompt)
                put("context", JSONArray(chatContext))
                put("max_tokens", maxTokens)
                put("temperature", temperature)
                put("language", _uiState.value.selectedLanguage)
            }.toString()
            
            // Create HTTP request
            val request = Request.Builder()
                .url(backendUrl)
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "Bearer ${apiConfigManager.getBackendApiKey()}")
                .post(RequestBody.create(MediaType.get("application/json"), requestBody))
                .build()
            
            // Execute request
            val response = httpClient.newCall(request).execute()
            
            if (!response.isSuccessful) {
                val errorBody = response.body?.string() ?: "Unknown error"
                throw IOException("Backend request failed: ${response.code} - $errorBody")
            }
            
            val responseBody = response.body?.string() ?: throw IOException("Empty response")
            val jsonResponse = JSONObject(responseBody)
            
            // Parse response
            val content = jsonResponse.getString("response")
            content.trim()
            
        } catch (e: Exception) {
            Log.e("ExpertChat", "Backend proxy call failed", e)
            throw e
        }
    }
    
    private fun addToChatContext(role: String, content: String) {
        chatContext.add(mapOf("role" to role, "content" to content))
        
        // Maintain context length
        if (chatContext.size > maxContextLength) {
            chatContext.removeAt(1) // Keep system message, remove oldest user/assistant message
        }
    }
    
    private fun addMessageToUi(message: ChatMessage) {
        val currentMessages = _uiState.value.messages.toMutableList()
        currentMessages.add(message)
        _uiState.value = _uiState.value.copy(messages = currentMessages)
    }
    
    private fun saveMessageToDatabase(sender: String, text: String) {
        scope.launch {
            try {
                val entity = ChatMessageEntity(
                    id = 0,
                    sender = sender,
                    text = text,
                    timestamp = System.currentTimeMillis()
                )
                repo.insert(entity)
            } catch (e: Exception) {
                Log.e("ExpertChat", "Failed to save message to database", e)
            }
        }
    }
    
    fun clearChat() {
        scope.launch {
            try {
                repo.deleteAll()
                chatContext.clear()
                initializeChatContext()
                _uiState.value = _uiState.value.copy(messages = emptyList())
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    error = "Failed to clear chat: ${e.message}"
                )
            }
        }
    }
    
    fun changeLanguage(language: String) {
        _uiState.value = _uiState.value.copy(
            selectedLanguage = language,
            showLanguageSelector = false
        )
    }
    
    fun toggleLanguageSelector() {
        _uiState.value = _uiState.value.copy(
            showLanguageSelector = !_uiState.value.showLanguageSelector
        )
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
    
    fun retryConnection() {
        checkApiStatus()
    }
    
    override fun onCleared() {
        super.onCleared()
        httpClient.dispatcher.executorService.shutdown()
        httpClient.connectionPool.evictAll()
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ExpertChatScreen(
    viewModel: ExpertChatViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    val listState = rememberLazyListState()
    val focusRequester = remember { FocusRequester() }
    
    LaunchedEffect(uiState.messages.size) {
        if (uiState.messages.isNotEmpty()) {
            listState.animateScrollToItem(uiState.messages.size - 1)
        }
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.surface)
    ) {
        // Header
        ChatHeader(
            selectedLanguage = uiState.selectedLanguage,
            onLanguageClick = { viewModel.toggleLanguageSelector() },
            onClearHistory = { viewModel.clearHistory() }
        )
        
        // Error message
        uiState.error?.let { error ->
            ErrorBanner(
                error = error,
                onDismiss = { viewModel.clearError() }
            )
        }
        
        // Messages
        LazyColumn(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            state = listState,
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(uiState.messages) { message ->
                ChatMessageItem(message = message)
            }
            
            if (uiState.isLoading) {
                item {
                    LoadingIndicator()
                }
            }
        }
        
        // Input area
        ChatInput(
            text = uiState.inputText,
            onTextChange = { viewModel.updateInputText(it) },
            onSendClick = { viewModel.sendMessage() },
            isLoading = uiState.isLoading,
            focusRequester = focusRequester
        )
    }
    
    // Language selector dialog
    if (uiState.showLanguageSelector) {
        LanguageSelectorDialog(
            languages = uiState.availableLanguages,
            selectedLanguage = uiState.selectedLanguage,
            onLanguageSelected = { viewModel.changeLanguage(it) },
            onDismiss = { viewModel.toggleLanguageSelector() }
        )
    }
}

@Composable
fun ChatHeader(
    selectedLanguage: String,
    onLanguageClick: () -> Unit,
    onClearHistory: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.primaryContainer)
            .padding(16.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = "Expert Chat",
            style = MaterialTheme.typography.headlineSmall,
            fontWeight = FontWeight.Bold
        )
        
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            OutlinedButton(
                onClick = onLanguageClick,
                modifier = Modifier.height(36.dp)
            ) {
                Text(selectedLanguage, fontSize = 12.sp)
            }
            
            IconButton(onClick = onClearHistory) {
                Icon(Icons.Default.Clear, contentDescription = "Clear History")
            }
        }
    }
}

@Composable
fun ErrorBanner(
    error: String,
    onDismiss: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = error,
                color = MaterialTheme.colorScheme.onErrorContainer,
                modifier = Modifier.weight(1f)
            )
            IconButton(onClick = onDismiss) {
                Icon(
                    Icons.Default.Close,
                    contentDescription = "Dismiss",
                    tint = MaterialTheme.colorScheme.onErrorContainer
                )
            }
        }
    }
}

@Composable
fun ChatMessageItem(message: ChatMessage) {
    val isUser = message is ChatMessage.User || message is ChatMessage.UserImage
    
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = if (isUser) Arrangement.End else Arrangement.Start
    ) {
        Card(
            modifier = Modifier
                .widthIn(max = 280.dp)
                .padding(vertical = 4.dp),
            colors = CardDefaults.cardColors(
                containerColor = if (isUser) 
                    MaterialTheme.colorScheme.primaryContainer 
                else 
                    MaterialTheme.colorScheme.secondaryContainer
            )
        ) {
            when (message) {
                is ChatMessage.User -> {
                    Text(
                        text = message.text,
                        modifier = Modifier.padding(12.dp),
                        color = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                }
                is ChatMessage.AI -> {
                    Text(
                        text = message.text,
                        modifier = Modifier.padding(12.dp),
                        color = MaterialTheme.colorScheme.onSecondaryContainer
                    )
                }
                is ChatMessage.UserImage -> {
                    // TODO: Display image
                    Text(
                        text = "[Image]",
                        modifier = Modifier.padding(12.dp),
                        color = MaterialTheme.colorScheme.onPrimaryContainer
                    )
                }
                is ChatMessage.AIImage -> {
                    // TODO: Display AI generated image
                    Text(
                        text = "[AI Generated Image]",
                        modifier = Modifier.padding(12.dp),
                        color = MaterialTheme.colorScheme.onSecondaryContainer
                    )
                }
                is ChatMessage.System -> {
                    Text(
                        text = message.text,
                        modifier = Modifier.padding(12.dp),
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
                is ChatMessage.Error -> {
                    Text(
                        text = message.text,
                        modifier = Modifier.padding(12.dp),
                        color = MaterialTheme.colorScheme.onErrorContainer
                    )
                }
            }
        }
    }
}

@Composable
fun LoadingIndicator() {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.Start
    ) {
        Card(
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.secondaryContainer
            )
        ) {
            Row(
                modifier = Modifier.padding(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                CircularProgressIndicator(
                    modifier = Modifier.size(16.dp),
                    strokeWidth = 2.dp
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "AI is thinking...",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSecondaryContainer
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ChatInput(
    text: String,
    onTextChange: (String) -> Unit,
    onSendClick: () -> Unit,
    isLoading: Boolean,
    focusRequester: FocusRequester
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalAlignment = Alignment.Bottom
    ) {
        OutlinedTextField(
            value = text,
            onValueChange = onTextChange,
            modifier = Modifier
                .weight(1f)
                .focusRequester(focusRequester),
            placeholder = { Text("Ask about farming...") },
            maxLines = 4,
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Text,
                imeAction = ImeAction.Send
            ),
            keyboardActions = KeyboardActions(
                onSend = { onSendClick() }
            ),
            readOnly = isLoading
        )
        
        Spacer(modifier = Modifier.width(8.dp))
        
        FloatingActionButton(
            onClick = if (text.isNotBlank() && !isLoading) onSendClick else {},
            modifier = Modifier.size(56.dp)
        ) {
            if (isLoading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(24.dp),
                    strokeWidth = 2.dp,
                    color = MaterialTheme.colorScheme.onPrimary
                )
            } else {
                Icon(Icons.Default.Send, contentDescription = "Send")
            }
        }
    }
}

@Composable
fun LanguageSelectorDialog(
    languages: List<String>,
    selectedLanguage: String,
    onLanguageSelected: (String) -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Select Language") },
        text = {
            Column {
                languages.forEach { language ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        RadioButton(
                            selected = language == selectedLanguage,
                            onClick = { onLanguageSelected(language) }
                        )
                        Text(
                            text = language,
                            modifier = Modifier.padding(start = 8.dp)
                        )
                    }
                }
            }
        },
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text("OK")
            }
        }
    )
} 
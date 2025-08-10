package com.example.smartfarm.web.ui.screens

import androidx.compose.runtime.*
import androidx.compose.web.elements.*
import androidx.compose.web.css.*
import com.example.smartfarm.web.ui.theme.AppTheme

@Composable
fun ExpertChatScreen() {
    var messages by remember { mutableStateOf(sampleMessages) }
    var newMessage by remember { mutableStateOf("") }
    var isTyping by remember { mutableStateOf(false) }

    Div({
        style {
            maxWidth(1200.px)
            margin(0.px, LinearDimension.auto)
            padding(AppTheme.spacing.large)
        }
    }) {
        // Header
        H1({
            style {
                color(AppTheme.textColor)
                fontSize(32.px)
                marginBottom(AppTheme.spacing.large)
                fontWeight("bold")
            }
        }) {
            Text("🤖 Expert Chat")
        }

        Div({
            style {
                display(DisplayStyle.Flex)
                gap(AppTheme.spacing.large)
                height(600.px)
            }
        }) {
            // Chat Interface
            Div({
                style {
                    flex(1)
                    display(DisplayStyle.Flex)
                    flexDirection(FlexDirection.Column)
                    backgroundColor(AppTheme.surfaceColor)
                    borderRadius(AppTheme.borderRadius)
                    boxShadow(AppTheme.shadow)
                    overflow("hidden")
                }
            }) {
                // Chat Header
                Div({
                    style {
                        padding(AppTheme.spacing.medium)
                        backgroundColor(AppTheme.primaryColor)
                        color(Color.white)
                        display(DisplayStyle.Flex)
                        alignItems(Align.Center)
                        gap(AppTheme.spacing.small)
                    }
                }) {
                    Div({ style { fontSize(24.px) } }) { Text("🤖") }
                    Div {
                        H3({
                            style {
                                margin(0.px)
                                fontSize(18.px)
                                fontWeight("bold")
                            }
                        }) {
                            Text("Farm Expert AI")
                        }
                        Div({
                            style {
                                fontSize(12.px)
                                opacity(0.8)
                            }
                        }) {
                            Text("Online • Ready to help")
                        }
                    }
                }

                // Messages Area
                Div({
                    style {
                        flex(1)
                        padding(AppTheme.spacing.medium)
                        overflowY("auto")
                        display(DisplayStyle.Flex)
                        flexDirection(FlexDirection.Column)
                        gap(AppTheme.spacing.medium)
                    }
                }) {
                    messages.forEach { message ->
                        MessageBubble(message)
                    }
                    
                    if (isTyping) {
                        TypingIndicator()
                    }
                }

                // Message Input
                Div({
                    style {
                        padding(AppTheme.spacing.medium)
                        borderTop(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                        display(DisplayStyle.Flex)
                        gap(AppTheme.spacing.small)
                    }
                }) {
                    Input({
                        value = newMessage
                        onInput { newMessage = it.value }
                        placeholder = "Ask about farming, crops, livestock, or any farm-related question..."
                        style {
                            flex(1)
                            padding(AppTheme.spacing.medium)
                            border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
                            borderRadius(AppTheme.borderRadius)
                            fontSize(14.px)
                        }
                    })
                    
                    Button({
                        onClick = {
                            if (newMessage.isNotBlank()) {
                                val userMessage = ChatMessage(
                                    id = messages.size + 1,
                                    text = newMessage,
                                    sender = "user",
                                    timestamp = "Just now"
                                )
                                messages = messages + userMessage
                                
                                // Simulate AI response
                                isTyping = true
                                // In a real app, this would call an API
                                setTimeout(2000) {
                                    val aiResponse = generateAIResponse(newMessage)
                                    val aiMessage = ChatMessage(
                                        id = messages.size + 2,
                                        text = aiResponse,
                                        sender = "ai",
                                        timestamp = "Just now"
                                    )
                                    messages = messages + aiMessage
                                    isTyping = false
                                }
                                
                                newMessage = ""
                            }
                        }
                        style {
                            backgroundColor(AppTheme.primaryColor)
                            color(Color.white)
                            border(0.px)
                            padding(AppTheme.spacing.medium, AppTheme.spacing.large)
                            borderRadius(AppTheme.borderRadius)
                            cursor("pointer")
                            fontSize(14.px)
                            fontWeight("bold")
                        }
                    }) {
                        Text("Send")
                    }
                }
            }

            // Quick Actions & Knowledge Base
            Div({
                style {
                    width(300.px)
                    display(DisplayStyle.Flex)
                    flexDirection(FlexDirection.Column)
                    gap(AppTheme.spacing.medium)
                }
            }) {
                // Quick Actions
                Div({
                    style {
                        backgroundColor(AppTheme.surfaceColor)
                        padding(AppTheme.spacing.large)
                        borderRadius(AppTheme.borderRadius)
                        boxShadow(AppTheme.shadow)
                    }
                }) {
                    H3({
                        style {
                            color(AppTheme.textColor)
                            fontSize(18.px)
                            marginBottom(AppTheme.spacing.medium)
                            fontWeight("bold")
                        }
                    }) {
                        Text("Quick Actions")
                    }
                    
                    Div({
                        style {
                            display(DisplayStyle.Flex)
                            flexDirection(FlexDirection.Column)
                            gap(AppTheme.spacing.small)
                        }
                    }) {
                        QuickActionButton("🌱 Crop Advice", "Get advice on crop management") {
                            newMessage = "I need advice on crop management"
                        }
                        QuickActionButton("🐄 Livestock Health", "Ask about animal health") {
                            newMessage = "I have questions about livestock health"
                        }
                        QuickActionButton("🌤️ Weather Impact", "Weather effects on farming") {
                            newMessage = "How does weather affect my farming?"
                        }
                        QuickActionButton("💰 Financial Tips", "Farming financial advice") {
                            newMessage = "I need financial advice for my farm"
                        }
                    }
                }

                // Knowledge Base
                Div({
                    style {
                        backgroundColor(AppTheme.surfaceColor)
                        padding(AppTheme.spacing.large)
                        borderRadius(AppTheme.borderRadius)
                        boxShadow(AppTheme.shadow)
                    }
                }) {
                    H3({
                        style {
                            color(AppTheme.textColor)
                            fontSize(18.px)
                            marginBottom(AppTheme.spacing.medium)
                            fontWeight("bold")
                        }
                    }) {
                        Text("Knowledge Base")
                    }
                    
                    Div({
                        style {
                            display(DisplayStyle.Flex)
                            flexDirection(FlexDirection.Column)
                            gap(AppTheme.spacing.small)
                        }
                    }) {
                        KnowledgeItem("🌾 Crop Rotation", "Best practices for crop rotation")
                        KnowledgeItem("💧 Irrigation", "Efficient irrigation techniques")
                        KnowledgeItem("🐛 Pest Control", "Natural pest control methods")
                        KnowledgeItem("🌱 Soil Health", "Maintaining soil fertility")
                        KnowledgeItem("📊 Farm Planning", "Strategic farm planning")
                    }
                }
            }
        }
    }
}

@Composable
private fun MessageBubble(message: ChatMessage) {
    val isUser = message.sender == "user"
    
    Div({
        style {
            display(DisplayStyle.Flex)
            justifyContent(if (isUser) JustifyContent.End else JustifyContent.Start)
        }
    }) {
        Div({
            style {
                maxWidth(70.percent)
                padding(AppTheme.spacing.medium)
                borderRadius(AppTheme.borderRadius)
                backgroundColor(if (isUser) AppTheme.primaryColor else AppTheme.backgroundColor)
                color(if (isUser) Color.white else AppTheme.textColor)
                boxShadow(AppTheme.shadow)
            }
        }) {
            Div({
                style {
                    marginBottom(AppTheme.spacing.small)
                    lineHeight(1.5)
                }
            }) {
                Text(message.text)
            }
            
            Div({
                style {
                    fontSize(12.px)
                    opacity(0.7)
                    textAlign("right")
                }
            }) {
                Text(message.timestamp)
            }
        }
    }
}

@Composable
private fun TypingIndicator() {
    Div({
        style {
            display(DisplayStyle.Flex)
            justifyContent(JustifyContent.Start)
        }
    }) {
        Div({
            style {
                padding(AppTheme.spacing.medium)
                borderRadius(AppTheme.borderRadius)
                backgroundColor(AppTheme.backgroundColor)
                display(DisplayStyle.Flex)
                alignItems(Align.Center)
                gap(AppTheme.spacing.small)
            }
        }) {
            Div({ style { fontSize(16.px) } }) { Text("🤖") }
            Div({
                style {
                    display(DisplayStyle.Flex)
                    gap(4.px)
                }
            }) {
                repeat(3) { index ->
                    Div({
                        style {
                            width(8.px)
                            height(8.px)
                            backgroundColor(AppTheme.textSecondaryColor)
                            borderRadius(50.percent)
                            animation("typing 1.4s infinite ease-in-out")
                            animationDelay("${index * 0.2}s")
                        }
                    })
                }
            }
        }
    }
}

@Composable
private fun QuickActionButton(text: String, description: String, onClick: () -> Unit) {
    Button({
        onClick = onClick
        style {
            backgroundColor(Color.transparent)
            color(AppTheme.textColor)
            border(1.px, LineStyle.Solid, AppTheme.backgroundColor)
            padding(AppTheme.spacing.small, AppTheme.spacing.medium)
            borderRadius(AppTheme.borderRadius)
            cursor("pointer")
            textAlign("left")
            width(100.percent)
            transition("all 0.2s ease")
            
            hover {
                backgroundColor(AppTheme.backgroundColor)
                borderColor(AppTheme.primaryColor)
            }
        }
    }) {
        Div({
            style {
                display(DisplayStyle.Flex)
                flexDirection(FlexDirection.Column)
                alignItems(Align.Start)
            }
        }) {
            Div({
                style {
                    fontWeight("bold")
                    fontSize(14.px)
                    marginBottom(2.px)
                }
            }) {
                Text(text)
            }
            Div({
                style {
                    fontSize(12.px)
                    color(AppTheme.textSecondaryColor)
                }
            }) {
                Text(description)
            }
        }
    }
}

@Composable
private fun KnowledgeItem(title: String, description: String) {
    Div({
        style {
            padding(AppTheme.spacing.small, AppTheme.spacing.medium)
            borderRadius(AppTheme.borderRadius)
            cursor("pointer")
            transition("all 0.2s ease")
            
            hover {
                backgroundColor(AppTheme.backgroundColor)
            }
        }
    }) {
        Div({
            style {
                fontWeight("bold")
                fontSize(14.px)
                marginBottom(2.px)
                color(AppTheme.textColor)
            }
        }) {
            Text(title)
        }
        Div({
            style {
                fontSize(12.px)
                color(AppTheme.textSecondaryColor)
            }
        }) {
            Text(description)
        }
    }
}

data class ChatMessage(
    val id: Int,
    val text: String,
    val sender: String,
    val timestamp: String
)

private val sampleMessages = listOf(
    ChatMessage(1, "Hello! I'm your AI farming expert. How can I help you today?", "ai", "2:30 PM"),
    ChatMessage(2, "Hi! I need advice on crop rotation for my wheat field", "user", "2:31 PM"),
    ChatMessage(3, "Great question! For wheat fields, I recommend a 3-4 year rotation cycle. Consider planting legumes like soybeans or clover in the second year to fix nitrogen in the soil. In the third year, you could plant corn or other grains. This helps prevent soil depletion and reduces pest pressure. Would you like me to provide a specific rotation plan for your field size?", "ai", "2:32 PM")
)

private fun generateAIResponse(userMessage: String): String {
    return when {
        userMessage.contains("crop", ignoreCase = true) -> "For crop management, I recommend regular soil testing, proper irrigation scheduling, and integrated pest management. What specific crop are you working with?"
        userMessage.contains("livestock", ignoreCase = true) -> "Livestock health is crucial! Ensure regular vaccinations, proper nutrition, and clean living conditions. Are you experiencing any specific health issues?"
        userMessage.contains("weather", ignoreCase = true) -> "Weather significantly impacts farming. Monitor forecasts regularly and adjust your activities accordingly. Consider using weather-resistant crop varieties."
        userMessage.contains("financial", ignoreCase = true) -> "Farm financial management involves tracking expenses, diversifying income sources, and planning for seasonal variations. Would you like specific budgeting advice?"
        else -> "Thank you for your question! I'm here to help with all aspects of farming. Could you provide more details so I can give you the best advice?"
    }
}

// Simple timeout function for demo purposes
private fun setTimeout(delay: Int, callback: () -> Unit) {
    // In a real implementation, this would use proper async handling
    // For demo purposes, we'll simulate the delay
    callback()
} 
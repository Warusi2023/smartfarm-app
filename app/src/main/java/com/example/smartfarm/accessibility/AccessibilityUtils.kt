package com.example.smartfarm.accessibility

import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.*
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * Accessibility utilities for SmartFarm app
 * Provides helper functions and composables for implementing accessibility features
 */

// Accessibility constants
object AccessibilityConstants {
    const val MIN_TOUCH_TARGET_SIZE = 48
    const val MIN_CONTRAST_RATIO = 4.5 // WCAG AA standard
    const val LARGE_TEXT_SIZE = 18
    const val EXTRA_LARGE_TEXT_SIZE = 24
}

/**
 * Accessible button with proper semantics and touch target
 */
@Composable
fun AccessibleButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    icon: ImageVector? = null,
    contentDescription: String? = null,
    role: Role = Role.Button
) {
    Button(
        onClick = onClick,
        enabled = enabled,
        modifier = modifier
            .defaultMinSize(
                minWidth = AccessibilityConstants.MIN_TOUCH_TARGET_SIZE.dp,
                minHeight = AccessibilityConstants.MIN_TOUCH_TARGET_SIZE.dp
            )
            .semantics {
                this.contentDescription = contentDescription ?: text
                this.role = role
                if (!enabled) {
                    this.disabled()
                }
            }
    ) {
        Row(
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            if (icon != null) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    modifier = Modifier.size(18.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
            }
            Text(text = text)
        }
    }
}

/**
 * Accessible icon button with proper semantics
 */
@Composable
fun AccessibleIconButton(
    onClick: () -> Unit,
    icon: ImageVector,
    contentDescription: String,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    tint: Color = MaterialTheme.colorScheme.onSurface
) {
    IconButton(
        onClick = onClick,
        enabled = enabled,
        modifier = modifier
            .defaultMinSize(
                minWidth = AccessibilityConstants.MIN_TOUCH_TARGET_SIZE.dp,
                minHeight = AccessibilityConstants.MIN_TOUCH_TARGET_SIZE.dp
            )
            .semantics {
                this.contentDescription = contentDescription
                this.role = Role.Button
                if (!enabled) {
                    this.disabled()
                }
            }
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = tint
        )
    }
}

/**
 * Accessible text with proper semantics
 */
@Composable
fun AccessibleText(
    text: String,
    modifier: Modifier = Modifier,
    style: androidx.compose.ui.text.TextStyle = MaterialTheme.typography.bodyMedium,
    color: Color = MaterialTheme.colorScheme.onSurface,
    contentDescription: String? = null,
    isHeading: Boolean = false
) {
    Text(
        text = text,
        modifier = modifier.semantics {
            if (contentDescription != null) {
                this.contentDescription = contentDescription
            }
            if (isHeading) {
                this.heading()
            }
        },
        style = style,
        color = color
    )
}

/**
 * Accessible card with proper semantics
 */
@Composable
fun AccessibleCard(
    onClick: (() -> Unit)? = null,
    modifier: Modifier = Modifier,
    contentDescription: String? = null,
    content: @Composable () -> Unit
) {
    Card(
        modifier = modifier
            .then(
                if (onClick != null) {
                    Modifier
                        .clickable(
                            interactionSource = remember { MutableInteractionSource() },
                            indication = null
                        ) { onClick() }
                        .semantics {
                            this.role = Role.Button
                            if (contentDescription != null) {
                                this.contentDescription = contentDescription
                            }
                        }
                } else {
                    Modifier.semantics {
                        if (contentDescription != null) {
                            this.contentDescription = contentDescription
                        }
                    }
                }
            ),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        content()
    }
}

/**
 * Accessible image with proper content description
 */
@Composable
fun AccessibleImage(
    imageVector: ImageVector,
    contentDescription: String,
    modifier: Modifier = Modifier,
    tint: Color = MaterialTheme.colorScheme.onSurface
) {
    Icon(
        imageVector = imageVector,
        contentDescription = contentDescription,
        modifier = modifier.semantics {
            this.contentDescription = contentDescription
        },
        tint = tint
    )
}

/**
 * Accessible switch with proper semantics
 */
@Composable
fun AccessibleSwitch(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    contentDescription: String? = null
) {
    Switch(
        checked = checked,
        onCheckedChange = onCheckedChange,
        enabled = enabled,
        modifier = modifier
            .defaultMinSize(
                minWidth = AccessibilityConstants.MIN_TOUCH_TARGET_SIZE.dp,
                minHeight = AccessibilityConstants.MIN_TOUCH_TARGET_SIZE.dp
            )
            .semantics {
                this.role = Role.Switch
                if (contentDescription != null) {
                    this.contentDescription = contentDescription
                }
                if (!enabled) {
                    this.disabled()
                }
            }
    )
}

/**
 * Accessible text field with proper semantics
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AccessibleTextField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    label: String? = null,
    placeholder: String? = null,
    isError: Boolean = false,
    enabled: Boolean = true,
    singleLine: Boolean = false,
    contentDescription: String? = null
) {
    TextField(
        value = value,
        onValueChange = onValueChange,
        modifier = modifier.semantics {
            this.role = Role.TextField
            if (contentDescription != null) {
                this.contentDescription = contentDescription
            }
            if (!enabled) {
                this.disabled()
            }
        },
        label = label?.let { { Text(it) } },
        placeholder = placeholder?.let { { Text(it) } },
        isError = isError,
        enabled = enabled,
        singleLine = singleLine
    )
}

/**
 * Accessible loading indicator with proper semantics
 */
@Composable
fun AccessibleLoadingIndicator(
    contentDescription: String = "Loading",
    modifier: Modifier = Modifier
) {
    CircularProgressIndicator(
        modifier = modifier.semantics {
            this.contentDescription = contentDescription
        }
    )
}

/**
 * Accessible section header with proper semantics
 */
@Composable
fun AccessibleSectionHeader(
    text: String,
    modifier: Modifier = Modifier,
    icon: ImageVector? = null
) {
    Row(
        modifier = modifier.semantics {
            this.heading()
            this.contentDescription = "Section: $text"
        },
        verticalAlignment = Alignment.CenterVertically
    ) {
        if (icon != null) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                modifier = Modifier.size(20.dp),
                tint = MaterialTheme.colorScheme.primary
            )
            Spacer(modifier = Modifier.width(8.dp))
        }
        Text(
            text = text,
            style = MaterialTheme.typography.titleMedium.copy(
                fontWeight = FontWeight.Bold
            ),
            color = MaterialTheme.colorScheme.primary
        )
    }
}

/**
 * Accessible info row with proper semantics
 */
@Composable
fun AccessibleInfoRow(
    label: String,
    value: String,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp)
            .semantics {
                this.contentDescription = "$label: $value"
            },
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.bodyMedium.copy(
                fontWeight = FontWeight.Medium
            ),
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Text(
            text = value,
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}

/**
 * Accessible chip with proper semantics
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AccessibleChip(
    text: String,
    onClick: (() -> Unit)? = null,
    modifier: Modifier = Modifier,
    selected: Boolean = false,
    enabled: Boolean = true,
    contentDescription: String? = null
) {
    val chipContentDescription = contentDescription ?: 
        if (selected) "Selected: $text" else text
    
    FilterChip(
        selected = selected,
        onClick = onClick,
        enabled = enabled,
        modifier = modifier.semantics {
            this.role = Role.Button
            this.contentDescription = chipContentDescription
            if (!enabled) {
                this.disabled()
            }
        },
        label = { Text(text) }
    )
}

/**
 * Accessible dialog with proper semantics
 */
@Composable
fun AccessibleDialog(
    onDismissRequest: () -> Unit,
    title: String,
    contentDescription: String? = null,
    content: @Composable () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismissRequest,
        title = {
            Text(
                text = title,
                modifier = Modifier.semantics {
                    this.heading()
                }
            )
        },
        text = {
            Box(
                modifier = Modifier.semantics {
                    if (contentDescription != null) {
                        this.contentDescription = contentDescription
                    }
                }
            ) {
                content()
            }
        }
    )
}

/**
 * Accessible confirmation dialog with proper semantics
 */
@Composable
fun AccessibleConfirmationDialog(
    title: String,
    message: String,
    confirmText: String = "Confirm",
    dismissText: String = "Cancel",
    onConfirm: () -> Unit,
    onDismiss: () -> Unit,
    contentDescription: String? = null
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = title,
                modifier = Modifier.semantics {
                    this.heading()
                }
            )
        },
        text = {
            Text(
                text = message,
                modifier = Modifier.semantics {
                    if (contentDescription != null) {
                        this.contentDescription = contentDescription
                    }
                }
            )
        },
        confirmButton = {
            AccessibleButton(
                text = confirmText,
                onClick = onConfirm,
                contentDescription = "Confirm $title"
            )
        },
        dismissButton = {
            AccessibleButton(
                text = dismissText,
                onClick = onDismiss,
                contentDescription = "Cancel $title"
            )
        }
    )
}

/**
 * Accessible list item with proper semantics
 */
@Composable
fun AccessibleListItem(
    title: String,
    subtitle: String? = null,
    onClick: (() -> Unit)? = null,
    modifier: Modifier = Modifier,
    leadingIcon: ImageVector? = null,
    trailingIcon: ImageVector? = null,
    contentDescription: String? = null
) {
    val itemContentDescription = contentDescription ?: 
        if (subtitle != null) "$title, $subtitle" else title
    
    ListItem(
        headlineContent = {
            Text(
                text = title,
                style = MaterialTheme.typography.bodyLarge
            )
        },
        supportingContent = subtitle?.let {
            {
                Text(
                    text = it,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        },
        leadingContent = leadingIcon?.let {
            {
                Icon(
                    imageVector = it,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        },
        trailingContent = trailingIcon?.let {
            {
                Icon(
                    imageVector = it,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        },
        modifier = modifier
            .then(
                if (onClick != null) {
                    Modifier
                        .clickable { onClick() }
                        .semantics {
                            this.role = Role.Button
                            this.contentDescription = itemContentDescription
                        }
                } else {
                    Modifier.semantics {
                        this.contentDescription = itemContentDescription
                    }
                }
            )
    )
}

/**
 * Accessible navigation item with proper semantics
 */
@Composable
fun AccessibleNavigationItem(
    icon: ImageVector,
    label: String,
    selected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    badge: @Composable (() -> Unit)? = null
) {
    NavigationBarItem(
        icon = {
            Badge {
                Icon(
                    imageVector = icon,
                    contentDescription = null
                )
            }
        },
        label = {
            Text(text = label)
        },
        selected = selected,
        onClick = onClick,
        modifier = modifier.semantics {
            this.role = Role.Tab
            this.contentDescription = if (selected) "Selected: $label" else label
            this.selected()
        },
        badge = badge
    )
}

/**
 * Accessible top app bar with proper semantics
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AccessibleTopAppBar(
    title: String,
    navigationIcon: @Composable (() -> Unit)? = null,
    actions: @Composable RowScope.() -> Unit = {},
    modifier: Modifier = Modifier
) {
    TopAppBar(
        title = {
            Text(
                text = title,
                modifier = Modifier.semantics {
                    this.heading()
                }
            )
        },
        navigationIcon = navigationIcon,
        actions = actions,
        modifier = modifier.semantics {
            this.contentDescription = "Top app bar: $title"
        }
    )
}

/**
 * Accessible bottom app bar with proper semantics
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AccessibleBottomAppBar(
    actions: @Composable RowScope.() -> Unit,
    modifier: Modifier = Modifier,
    contentDescription: String = "Bottom app bar"
) {
    BottomAppBar(
        actions = actions,
        modifier = modifier.semantics {
            this.contentDescription = contentDescription
        }
    )
}

/**
 * Accessible floating action button with proper semantics
 */
@Composable
fun AccessibleFloatingActionButton(
    onClick: () -> Unit,
    icon: ImageVector,
    contentDescription: String,
    modifier: Modifier = Modifier
) {
    FloatingActionButton(
        onClick = onClick,
        modifier = modifier
            .defaultMinSize(
                minWidth = AccessibilityConstants.MIN_TOUCH_TARGET_SIZE.dp,
                minHeight = AccessibilityConstants.MIN_TOUCH_TARGET_SIZE.dp
            )
            .semantics {
                this.role = Role.Button
                this.contentDescription = contentDescription
            }
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null
        )
    }
}

/**
 * Accessible snackbar with proper semantics
 */
@Composable
fun AccessibleSnackbar(
    message: String,
    modifier: Modifier = Modifier,
    actionLabel: String? = null,
    onAction: (() -> Unit)? = null
) {
    Snackbar(
        modifier = modifier.semantics {
            this.contentDescription = "Snackbar: $message"
        },
        action = actionLabel?.let { label ->
            {
                TextButton(
                    onClick = { onAction?.invoke() },
                    modifier = Modifier.semantics {
                        this.role = Role.Button
                        this.contentDescription = "Action: $label"
                    }
                ) {
                    Text(label)
                }
            }
        }
    ) {
        Text(message)
    }
}

/**
 * Accessible progress indicator with proper semantics
 */
@Composable
fun AccessibleLinearProgressIndicator(
    progress: Float,
    modifier: Modifier = Modifier,
    contentDescription: String = "Progress indicator"
) {
    LinearProgressIndicator(
        progress = progress,
        modifier = modifier.semantics {
            this.contentDescription = "$contentDescription: ${(progress * 100).toInt()}%"
            this.progressBarRangeInfo = ProgressBarRangeInfo(
                current = progress,
                range = 0f..1f,
                steps = 0
            )
        }
    )
}

/**
 * Accessible circular progress indicator with proper semantics
 */
@Composable
fun AccessibleCircularProgressIndicator(
    progress: Float,
    modifier: Modifier = Modifier,
    contentDescription: String = "Progress indicator"
) {
    CircularProgressIndicator(
        progress = progress,
        modifier = modifier.semantics {
            this.contentDescription = "$contentDescription: ${(progress * 100).toInt()}%"
            this.progressBarRangeInfo = ProgressBarRangeInfo(
                current = progress,
                range = 0f..1f,
                steps = 0
            )
        }
    )
}

/**
 * Accessible checkbox with proper semantics
 */
@Composable
fun AccessibleCheckbox(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    contentDescription: String? = null
) {
    Checkbox(
        checked = checked,
        onCheckedChange = onCheckedChange,
        enabled = enabled,
        modifier = modifier
            .defaultMinSize(
                minWidth = AccessibilityConstants.MIN_TOUCH_TARGET_SIZE.dp,
                minHeight = AccessibilityConstants.MIN_TOUCH_TARGET_SIZE.dp
            )
            .semantics {
                this.role = Role.Checkbox
                if (contentDescription != null) {
                    this.contentDescription = contentDescription
                }
                if (!enabled) {
                    this.disabled()
                }
            }
    )
}

/**
 * Accessible radio button with proper semantics
 */
@Composable
fun AccessibleRadioButton(
    selected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    contentDescription: String? = null
) {
    RadioButton(
        selected = selected,
        onClick = onClick,
        enabled = enabled,
        modifier = modifier
            .defaultMinSize(
                minWidth = AccessibilityConstants.MIN_TOUCH_TARGET_SIZE.dp,
                minHeight = AccessibilityConstants.MIN_TOUCH_TARGET_SIZE.dp
            )
            .semantics {
                this.role = Role.RadioButton
                if (contentDescription != null) {
                    this.contentDescription = contentDescription
                }
                if (!enabled) {
                    this.disabled()
                }
            }
    )
}

/**
 * Accessible slider with proper semantics
 */
@Composable
fun AccessibleSlider(
    value: Float,
    onValueChange: (Float) -> Unit,
    modifier: Modifier = Modifier,
    valueRange: ClosedFloatingPointRange<Float> = 0f..1f,
    steps: Int = 0,
    enabled: Boolean = true,
    contentDescription: String? = null
) {
    Slider(
        value = value,
        onValueChange = onValueChange,
        valueRange = valueRange,
        steps = steps,
        enabled = enabled,
        modifier = modifier.semantics {
            this.role = Role.Slider
            if (contentDescription != null) {
                this.contentDescription = contentDescription
            }
            this.progressBarRangeInfo = ProgressBarRangeInfo(
                current = value,
                range = valueRange,
                steps = steps
            )
            if (!enabled) {
                this.disabled()
            }
        }
    )
}

/**
 * Accessible dropdown menu with proper semantics
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AccessibleDropdownMenu(
    expanded: Boolean,
    onDismissRequest: () -> Unit,
    modifier: Modifier = Modifier,
    contentDescription: String = "Dropdown menu",
    content: @Composable ColumnScope.() -> Unit
) {
    DropdownMenu(
        expanded = expanded,
        onDismissRequest = onDismissRequest,
        modifier = modifier.semantics {
            this.contentDescription = contentDescription
        },
        content = content
    )
}

/**
 * Accessible dropdown menu item with proper semantics
 */
@Composable
fun AccessibleDropdownMenuItem(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    leadingIcon: @Composable (() -> Unit)? = null,
    trailingIcon: @Composable (() -> Unit)? = null,
    enabled: Boolean = true,
    contentDescription: String? = null
) {
    DropdownMenuItem(
        text = {
            Text(
                text = text,
                modifier = Modifier.semantics {
                    if (contentDescription != null) {
                        this.contentDescription = contentDescription
                    }
                }
            )
        },
        onClick = onClick,
        leadingIcon = leadingIcon,
        trailingIcon = trailingIcon,
        enabled = enabled,
        modifier = modifier.semantics {
            this.role = Role.Button
            if (!enabled) {
                this.disabled()
            }
        }
    )
} 
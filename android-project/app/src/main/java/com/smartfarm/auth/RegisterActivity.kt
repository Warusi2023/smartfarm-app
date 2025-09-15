package com.smartfarm.auth

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.smartfarm.data.model.*

class RegisterActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            RegisterScreen(
                onRegisterSuccess = {
                    Toast.makeText(this, "Registration successful!", Toast.LENGTH_LONG).show()
                    finish()
                }
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RegisterScreen(
    onRegisterSuccess: () -> Unit,
    viewModel: RegisterViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    val context = LocalContext.current
    
    LaunchedEffect(uiState.isRegistered) {
        if (uiState.isRegistered) {
            onRegisterSuccess()
        }
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "Create SmartFarm Account",
            style = MaterialTheme.typography.headlineMedium
        )
        
        // Personal Information Section
        RegistrationSection("Personal Information") {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedTextField(
                    value = uiState.firstName,
                    onValueChange = viewModel::updateFirstName,
                    label = { Text("First Name *") },
                    modifier = Modifier.weight(1f),
                    isError = uiState.validationErrors.contains("firstName")
                )
                OutlinedTextField(
                    value = uiState.lastName,
                    onValueChange = viewModel::updateLastName,
                    label = { Text("Last Name *") },
                    modifier = Modifier.weight(1f),
                    isError = uiState.validationErrors.contains("lastName")
                )
            }
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedTextField(
                    value = uiState.email,
                    onValueChange = viewModel::updateEmail,
                    label = { Text("Email Address *") },
                    modifier = Modifier.weight(1f),
                    isError = uiState.validationErrors.contains("email")
                )
                OutlinedTextField(
                    value = uiState.phone,
                    onValueChange = viewModel::updatePhone,
                    label = { Text("Phone Number *") },
                    modifier = Modifier.weight(1f),
                    isError = uiState.validationErrors.contains("phone")
                )
            }
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedTextField(
                    value = uiState.username,
                    onValueChange = viewModel::updateUsername,
                    label = { Text("Username *") },
                    modifier = Modifier.weight(1f),
                    isError = uiState.validationErrors.contains("username")
                )
            }
            
            // Password fields
            OutlinedTextField(
                value = uiState.password,
                onValueChange = viewModel::updatePassword,
                label = { Text("Password *") },
                visualTransformation = if (uiState.showPassword) VisualTransformation.None else PasswordVisualTransformation(),
                trailingIcon = {
                    TextButton(onClick = viewModel::togglePasswordVisibility) {
                        Text(if (uiState.showPassword) "Hide" else "Show")
                    }
                },
                isError = uiState.validationErrors.contains("password")
            )
            
            OutlinedTextField(
                value = uiState.confirmPassword,
                onValueChange = viewModel::updateConfirmPassword,
                label = { Text("Confirm Password *") },
                visualTransformation = if (uiState.showConfirmPassword) VisualTransformation.None else PasswordVisualTransformation(),
                trailingIcon = {
                    TextButton(onClick = viewModel::toggleConfirmPasswordVisibility) {
                        Text(if (uiState.showConfirmPassword) "Hide" else "Show")
                    }
                },
                isError = uiState.validationErrors.contains("confirmPassword")
            )
        }
        
        // Location Information Section
        RegistrationSection("Location Information") {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                CountryDropdown(
                    selectedCountry = uiState.country,
                    onCountrySelected = viewModel::updateCountry,
                    modifier = Modifier.weight(1f)
                )
                OutlinedTextField(
                    value = uiState.region,
                    onValueChange = viewModel::updateRegion,
                    label = { Text("Region/State *") },
                    modifier = Modifier.weight(1f),
                    isError = uiState.validationErrors.contains("region")
                )
            }
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedTextField(
                    value = uiState.district,
                    onValueChange = viewModel::updateDistrict,
                    label = { Text("District/City *") },
                    modifier = Modifier.weight(1f),
                    isError = uiState.validationErrors.contains("district")
                )
                OutlinedTextField(
                    value = uiState.village,
                    onValueChange = viewModel::updateVillage,
                    label = { Text("Village/Suburb") },
                    modifier = Modifier.weight(1f)
                )
            }
        }
        
        // Farm Information Section
        RegistrationSection("Farm Information") {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedTextField(
                    value = uiState.farmName,
                    onValueChange = viewModel::updateFarmName,
                    label = { Text("Farm Name *") },
                    modifier = Modifier.weight(1f),
                    isError = uiState.validationErrors.contains("farmName")
                )
                OutlinedTextField(
                    value = uiState.farmSize.toString(),
                    onValueChange = { viewModel.updateFarmSize(it.toDoubleOrNull() ?: 0.0) },
                    label = { Text("Farm Size (Hectares) *") },
                    modifier = Modifier.weight(1f),
                    isError = uiState.validationErrors.contains("farmSize")
                )
            }
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                FarmTypeDropdown(
                    selectedFarmType = uiState.farmType,
                    onFarmTypeSelected = viewModel::updateFarmType,
                    modifier = Modifier.weight(1f)
                )
                ExperienceLevelDropdown(
                    selectedExperience = uiState.experience,
                    onExperienceSelected = viewModel::updateExperience,
                    modifier = Modifier.weight(1f)
                )
            }
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedTextField(
                    value = uiState.crops,
                    onValueChange = viewModel::updateCrops,
                    label = { Text("Main Crops/Livestock") },
                    modifier = Modifier.weight(1f)
                )
                IrrigationMethodDropdown(
                    selectedIrrigation = uiState.irrigation,
                    onIrrigationSelected = viewModel::updateIrrigation,
                    modifier = Modifier.weight(1f)
                )
            }
        }
        
        // Additional Information Section
        RegistrationSection("Additional Information") {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                EducationLevelDropdown(
                    selectedEducation = uiState.education,
                    onEducationSelected = viewModel::updateEducation,
                    modifier = Modifier.weight(1f)
                )
                IncomeRangeDropdown(
                    selectedIncome = uiState.income,
                    onIncomeSelected = viewModel::updateIncome,
                    modifier = Modifier.weight(1f)
                )
            }
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                MarketingChannelDropdown(
                    selectedMarketing = uiState.marketing,
                    onMarketingSelected = viewModel::updateMarketing,
                    modifier = Modifier.weight(1f)
                )
                TechnologyUsageDropdown(
                    selectedTechnology = uiState.technology,
                    onTechnologySelected = viewModel::updateTechnology,
                    modifier = Modifier.weight(1f)
                )
            }
            
            OutlinedTextField(
                value = uiState.challenges,
                onValueChange = viewModel::updateChallenges,
                label = { Text("Main Farming Challenges") },
                minLines = 3,
                maxLines = 3
            )
            
            OutlinedTextField(
                value = uiState.goals,
                onValueChange = viewModel::updateGoals,
                label = { Text("Farming Goals") },
                minLines = 3,
                maxLines = 3
            )
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Checkbox(
                    checked = uiState.newsletter,
                    onCheckedChange = viewModel::updateNewsletter
                )
                Text(
                    text = "Subscribe to farming tips, market updates, and SmartFarm newsletter",
                    modifier = Modifier.padding(start = 8.dp)
                )
            }
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Checkbox(
                    checked = uiState.acceptTerms,
                    onCheckedChange = viewModel::updateAcceptTerms,
                    isError = uiState.validationErrors.contains("acceptTerms")
                )
                Text(
                    text = "I agree to the Terms of Service and Privacy Policy *",
                    modifier = Modifier.padding(start = 8.dp)
                )
            }
        }
        
        // Error display
        uiState.error?.let { error ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer)
            ) {
                Text(
                    text = error,
                    modifier = Modifier.padding(16.dp),
                    color = MaterialTheme.colorScheme.onErrorContainer
                )
            }
        }
        
        // Register button
        Button(
            onClick = viewModel::register,
            modifier = Modifier.fillMaxWidth(),
            enabled = !uiState.isLoading
        ) {
            if (uiState.isLoading) {
                CircularProgressIndicator(modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("Creating account...")
            } else {
                Text("Create SmartFarm Account")
            }
        }
    }
}

@Composable
fun RegistrationSection(
    title: String,
    content: @Composable ColumnScope.() -> Unit
) {
    Column(
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = title,
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.primary
        )
        content()
    }
}

// Dropdown components for various enums
@Composable
fun CountryDropdown(
    selectedCountry: Country,
    onCountrySelected: (Country) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }
    
    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = !expanded },
        modifier = modifier
    ) {
        OutlinedTextField(
            value = selectedCountry.name.replace("_", " "),
            onValueChange = {},
            readOnly = true,
            label = { Text("Country *") },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
            modifier = Modifier.menuAnchor()
        )
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            Country.values().forEach { country ->
                DropdownMenuItem(
                    text = { Text(country.name.replace("_", " ")) },
                    onClick = {
                        onCountrySelected(country)
                        expanded = false
                    }
                )
            }
        }
    }
}

@Composable
fun FarmTypeDropdown(
    selectedFarmType: FarmType,
    onFarmTypeSelected: (FarmType) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }
    
    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = !expanded },
        modifier = modifier
    ) {
        OutlinedTextField(
            value = selectedFarmType.name.replace("_", " "),
            onValueChange = {},
            readOnly = true,
            label = { Text("Farm Type *") },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
            modifier = Modifier.menuAnchor()
        )
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            FarmType.values().forEach { farmType ->
                DropdownMenuItem(
                    text = { Text(farmType.name.replace("_", " ")) },
                    onClick = {
                        onFarmTypeSelected(farmType)
                        expanded = false
                    }
                )
            }
        }
    }
}

@Composable
fun ExperienceLevelDropdown(
    selectedExperience: ExperienceLevel,
    onExperienceSelected: (ExperienceLevel) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }
    
    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = !expanded },
        modifier = modifier
    ) {
        OutlinedTextField(
            value = when (selectedExperience) {
                ExperienceLevel.BEGINNER -> "Beginner (0-2 years)"
                ExperienceLevel.INTERMEDIATE -> "Intermediate (3-10 years)"
                ExperienceLevel.EXPERIENCED -> "Experienced (11-20 years)"
                ExperienceLevel.EXPERT -> "Expert (20+ years)"
            },
            onValueChange = {},
            readOnly = true,
            label = { Text("Farming Experience *") },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
            modifier = Modifier.menuAnchor()
        )
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            ExperienceLevel.values().forEach { experience ->
                DropdownMenuItem(
                    text = { 
                        Text(when (experience) {
                            ExperienceLevel.BEGINNER -> "Beginner (0-2 years)"
                            ExperienceLevel.INTERMEDIATE -> "Intermediate (3-10 years)"
                            ExperienceLevel.EXPERIENCED -> "Experienced (11-20 years)"
                            ExperienceLevel.EXPERT -> "Expert (20+ years)"
                        })
                    },
                    onClick = {
                        onExperienceSelected(experience)
                        expanded = false
                    }
                )
            }
        }
    }
}

@Composable
fun IrrigationMethodDropdown(
    selectedIrrigation: IrrigationMethod,
    onIrrigationSelected: (IrrigationMethod) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }
    
    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = !expanded },
        modifier = modifier
    ) {
        OutlinedTextField(
            value = selectedIrrigation.name.replace("_", " "),
            onValueChange = {},
            readOnly = true,
            label = { Text("Irrigation Method") },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
            modifier = Modifier.menuAnchor()
        )
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            IrrigationMethod.values().forEach { irrigation ->
                DropdownMenuItem(
                    text = { Text(irrigation.name.replace("_", " ")) },
                    onClick = {
                        onIrrigationSelected(irrigation)
                        expanded = false
                    }
                )
            }
        }
    }
}

@Composable
fun EducationLevelDropdown(
    selectedEducation: EducationLevel,
    onEducationSelected: (EducationLevel) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }
    
    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = !expanded },
        modifier = modifier
    ) {
        OutlinedTextField(
            value = selectedEducation.name.replace("_", " "),
            onValueChange = {},
            readOnly = true,
            label = { Text("Education Level") },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
            modifier = Modifier.menuAnchor()
        )
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            EducationLevel.values().forEach { education ->
                DropdownMenuItem(
                    text = { Text(education.name.replace("_", " ")) },
                    onClick = {
                        onEducationSelected(education)
                        expanded = false
                    }
                )
            }
        }
    }
}

@Composable
fun IncomeRangeDropdown(
    selectedIncome: IncomeRange,
    onIncomeSelected: (IncomeRange) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }
    
    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = !expanded },
        modifier = modifier
    ) {
        OutlinedTextField(
            value = when (selectedIncome) {
                IncomeRange.UNDER_10K -> "Under FJD 10,000"
                IncomeRange.RANGE_10K_25K -> "FJD 10,000 - 25,000"
                IncomeRange.RANGE_25K_50K -> "FJD 25,000 - 50,000"
                IncomeRange.RANGE_50K_100K -> "FJD 50,000 - 100,000"
                IncomeRange.RANGE_100K_250K -> "FJD 100,000 - 250,000"
                IncomeRange.OVER_250K -> "Over FJD 250,000"
            },
            onValueChange = {},
            readOnly = true,
            label = { Text("Annual Farm Income Range") },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
            modifier = Modifier.menuAnchor()
        )
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            IncomeRange.values().forEach { income ->
                DropdownMenuItem(
                    text = { 
                        Text(when (income) {
                            IncomeRange.UNDER_10K -> "Under FJD 10,000"
                            IncomeRange.RANGE_10K_25K -> "FJD 10,000 - 25,000"
                            IncomeRange.RANGE_25K_50K -> "FJD 25,000 - 50,000"
                            IncomeRange.RANGE_50K_100K -> "FJD 50,000 - 100,000"
                            IncomeRange.RANGE_100K_250K -> "FJD 100,000 - 250,000"
                            IncomeRange.OVER_250K -> "Over FJD 250,000"
                        })
                    },
                    onClick = {
                        onIncomeSelected(income)
                        expanded = false
                    }
                )
            }
        }
    }
}

@Composable
fun MarketingChannelDropdown(
    selectedMarketing: MarketingChannel,
    onMarketingSelected: (MarketingChannel) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }
    
    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = !expanded },
        modifier = modifier
    ) {
        OutlinedTextField(
            value = selectedMarketing.name.replace("_", " "),
            onValueChange = {},
            readOnly = true,
            label = { Text("Primary Marketing Channel") },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
            modifier = Modifier.menuAnchor()
        )
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            MarketingChannel.values().forEach { marketing ->
                DropdownMenuItem(
                    text = { Text(marketing.name.replace("_", " ")) },
                    onClick = {
                        onMarketingSelected(marketing)
                        expanded = false
                    }
                )
            }
        }
    }
}

@Composable
fun TechnologyUsageDropdown(
    selectedTechnology: TechnologyUsage,
    onTechnologySelected: (TechnologyUsage) -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }
    
    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = !expanded },
        modifier = modifier
    ) {
        OutlinedTextField(
            value = when (selectedTechnology) {
                TechnologyUsage.BASIC -> "Basic (Phone calls, SMS)"
                TechnologyUsage.INTERMEDIATE -> "Intermediate (Smartphone, Internet)"
                TechnologyUsage.ADVANCED -> "Advanced (Apps, GPS, Sensors)"
                TechnologyUsage.EXPERT -> "Expert (IoT, AI, Automation)"
            },
            onValueChange = {},
            readOnly = true,
            label = { Text("Technology Usage") },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded) },
            modifier = Modifier.menuAnchor()
        )
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false }
        ) {
            TechnologyUsage.values().forEach { technology ->
                DropdownMenuItem(
                    text = { 
                        Text(when (technology) {
                            TechnologyUsage.BASIC -> "Basic (Phone calls, SMS)"
                            TechnologyUsage.INTERMEDIATE -> "Intermediate (Smartphone, Internet)"
                            TechnologyUsage.ADVANCED -> "Advanced (Apps, GPS, Sensors)"
                            TechnologyUsage.EXPERT -> "Expert (IoT, AI, Automation)"
                        })
                    },
                    onClick = {
                        onTechnologySelected(technology)
                        expanded = false
                    }
                )
            }
        }
    }
}

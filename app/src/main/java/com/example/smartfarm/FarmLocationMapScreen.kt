package com.example.smartfarm.ui

import android.Manifest
import android.annotation.SuppressLint
import android.content.pm.PackageManager
import android.location.Location
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.maps.android.compose.*
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.CameraPosition
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.smartfarm.data.model.FarmLocation
import com.example.smartfarm.data.repository.FarmLocationRepository
import com.example.smartfarm.data.database.FarmDatabase
import kotlinx.coroutines.launch

@Composable
fun FarmLocationMapScreen() {
    val context = LocalContext.current
    val fusedLocationClient = remember { LocationServices.getFusedLocationProviderClient(context) }
    val db = remember { FarmDatabase.getDatabase(context) }
    val repo = remember { FarmLocationRepository(db.farmLocationDao()) }
    val scope = rememberCoroutineScope()
    val farmLocationFlow = repo.getFarmLocation().collectAsState(initial = null)
    var hasPermission by remember { mutableStateOf(false) }
    var location by remember { mutableStateOf<Location?>(null) }
    var selectedLatLng by remember { mutableStateOf<LatLng?>(null) }
    val permissionLauncher = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
        hasPermission = granted
    }
    LaunchedEffect(Unit) {
        val granted = ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
        hasPermission = granted
        if (!granted) permissionLauncher.launch(Manifest.permission.ACCESS_FINE_LOCATION)
    }
    LaunchedEffect(hasPermission) {
        if (hasPermission) {
            fusedLocationClient.lastLocation.addOnSuccessListener { loc ->
                if (loc != null) location = loc
            }
        }
    }
    val savedFarmLocation = farmLocationFlow.value
    Column(Modifier.fillMaxSize()) {
        Text("Farm Location", style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(16.dp))
        if (!hasPermission) {
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("Location permission required to show map.")
            }
        } else if (location == null && savedFarmLocation == null) {
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
                Spacer(Modifier.height(8.dp))
                Text("Getting current location...")
            }
        } else {
            val latLng = selectedLatLng
                ?: savedFarmLocation?.let { LatLng(it.latitude, it.longitude) }
                ?: LatLng(location?.latitude ?: 0.0, location?.longitude ?: 0.0)
            val cameraPositionState = rememberCameraPositionState {
                position = CameraPosition.fromLatLngZoom(latLng, 16f)
            }
            Box(Modifier.weight(1f)) {
                GoogleMap(
                    modifier = Modifier.fillMaxSize(),
                    cameraPositionState = cameraPositionState,
                    onMapLongClick = { selectedLatLng = it }
                ) {
                    if (selectedLatLng != null) {
                        Marker(latLng = selectedLatLng!!, title = "Selected Location")
                    } else if (savedFarmLocation != null) {
                        Marker(latLng = LatLng(savedFarmLocation.latitude, savedFarmLocation.longitude), title = "Farm Location")
                    }
                }
                if (selectedLatLng != null) {
                    Button(
                        onClick = {
                            scope.launch {
                                repo.upsert(FarmLocation(
                                    latitude = selectedLatLng!!.latitude, 
                                    longitude = selectedLatLng!!.longitude,
                                    farmId = 1L,
                                    address = "",
                                    city = "",
                                    state = "",
                                    country = "",
                                    postalCode = ""
                                ))
                                selectedLatLng = null
                            }
                        },
                        modifier = Modifier.align(Alignment.BottomCenter).padding(16.dp)
                    ) {
                        Text("Save as Farm Location")
                    }
                }
            }
            Spacer(Modifier.height(8.dp))
            val showLatLng = selectedLatLng ?: savedFarmLocation?.let { LatLng(it.latitude, it.longitude) } ?: latLng
            Text("Latitude: ${showLatLng.latitude}", modifier = Modifier.padding(start = 16.dp))
            Text("Longitude: ${showLatLng.longitude}", modifier = Modifier.padding(start = 16.dp))
        }
    }
} 
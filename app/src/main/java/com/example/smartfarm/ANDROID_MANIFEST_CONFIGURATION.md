# AndroidManifest.xml Configuration Documentation

## Overview
This document describes the complete AndroidManifest.xml configuration for the SmartFarm Android application, including all permissions, activities, services, and security configurations.

## Table of Contents
1. [Permissions](#permissions)
2. [Features](#features)
3. [Application Configuration](#application-configuration)
4. [Activities](#activities)
5. [Services](#services)
6. [Receivers](#receivers)
7. [Providers](#providers)
8. [Security Configuration](#security-configuration)
9. [Network Security](#network-security)
10. [File Provider Configuration](#file-provider-configuration)
11. [Data Extraction Rules](#data-extraction-rules)

## Permissions

### Network Permissions
- `INTERNET` - Required for API calls and data synchronization
- `ACCESS_NETWORK_STATE` - Monitor network connectivity
- `ACCESS_WIFI_STATE` - Access WiFi information
- `CHANGE_WIFI_STATE` - Modify WiFi settings
- `CHANGE_NETWORK_STATE` - Modify network settings

### Location Permissions
- `ACCESS_FINE_LOCATION` - Precise location for weather data
- `ACCESS_COARSE_LOCATION` - Approximate location
- `ACCESS_BACKGROUND_LOCATION` - Background location updates

### Camera and Media Permissions
- `CAMERA` - Take photos of livestock and crops
- `RECORD_AUDIO` - Audio recording for notes
- `MODIFY_AUDIO_SETTINGS` - Adjust audio settings
- `READ_EXTERNAL_STORAGE` - Read files (Android < 13)
- `WRITE_EXTERNAL_STORAGE` - Write files (Android < 10)
- `READ_MEDIA_IMAGES` - Read images (Android 13+)
- `READ_MEDIA_VIDEO` - Read videos (Android 13+)
- `READ_MEDIA_AUDIO` - Read audio (Android 13+)
- `MANAGE_EXTERNAL_STORAGE` - Full storage access

### Notification Permissions
- `POST_NOTIFICATIONS` - Send notifications (Android 13+)
- `VIBRATE` - Vibration for notifications
- `WAKE_LOCK` - Keep device awake for background tasks
- `RECEIVE_BOOT_COMPLETED` - Start services after boot
- `FOREGROUND_SERVICE` - Run foreground services
- `FOREGROUND_SERVICE_DATA_SYNC` - Data sync foreground service
- `FOREGROUND_SERVICE_LOCATION` - Location foreground service

### Security Permissions
- `USE_BIOMETRIC` - Biometric authentication
- `USE_FINGERPRINT` - Fingerprint authentication
- `USE_FACE` - Face recognition
- `USE_IRIS` - Iris recognition

### System Permissions
- `REQUEST_IGNORE_BATTERY_OPTIMIZATIONS` - Ignore battery optimization
- `SYSTEM_ALERT_WINDOW` - Display over other apps
- `QUERY_ALL_PACKAGES` - Query all installed packages

### Google Play Services Permissions
- `READ_GSERVICES` - Read Google services
- `ACTIVITY_RECOGNITION` - Activity recognition

## Features

### Hardware Features
- `android.hardware.camera` - Camera hardware
- `android.hardware.camera.autofocus` - Camera autofocus
- `android.hardware.camera.flash` - Camera flash
- `android.hardware.location` - Location services
- `android.hardware.location.gps` - GPS hardware
- `android.hardware.location.network` - Network location
- `android.hardware.wifi` - WiFi hardware
- `android.hardware.touchscreen` - Touchscreen
- `android.hardware.touchscreen.multitouch` - Multitouch
- `android.hardware.microphone` - Microphone
- `android.hardware.sensor.accelerometer` - Accelerometer
- `android.hardware.sensor.compass` - Compass
- `android.hardware.fingerprint` - Fingerprint sensor
- `android.hardware.telephony` - Telephony

## Application Configuration

### Basic Settings
- `android:name=".SmartFarmApp"` - Application class
- `android:allowBackup="${allowBackup}"` - Enable backup
- `android:dataExtractionRules="@xml/data_extraction_rules"` - Backup rules
- `android:fullBackupContent="${fullBackupContent}"` - Full backup content
- `android:icon="@mipmap/ic_launcher"` - App icon
- `android:label="${appName}"` - App name
- `android:roundIcon="@mipmap/ic_launcher_round"` - Round icon
- `android:supportsRtl="true"` - RTL support
- `android:theme="@style/Theme.SmartFarm"` - App theme

### Security Settings
- `android:requestLegacyExternalStorage="false"` - Use scoped storage
- `android:usesCleartextTraffic="false"` - HTTPS only
- `android:networkSecurityConfig="@xml/network_security_config"` - Network security
- `android:enableOnBackInvokedCallback="true"` - Predictive back gesture
- `android:enableInstallInExternalStorage="false"` - Internal storage only
- `android:extractNativeLibs="true"` - Extract native libraries
- `android:hardwareAccelerated="true"` - Hardware acceleration
- `android:largeHeap="false"` - Standard heap size
- `android:preserveLegacyExternalStorage="false"` - No legacy storage
- `android:resizeableActivity="true"` - Resizable activities
- `android:targetSandboxVersion="2"` - Target sandbox version

## Activities

### Main Activity
- **Name**: `MainActivity`
- **Exported**: `true`
- **Launch Mode**: `singleTop`
- **Orientation**: `portrait`
- **Features**: Hardware acceleration, predictive back gesture

### Authentication Activities
- **LoginActivity**: User login
- **RegisterActivity**: User registration
- **Settings**: Excluded from recents for security

### Feature Activities
- **SettingsActivity**: App settings
- **ProfileActivity**: User profile
- **BackupActivity**: Backup and restore
- **LivestockScreen**: Livestock management
- **WeatherScreen**: Weather information
- **ReportsScreen**: Farm reports
- **CameraActivity**: Camera functionality

## Services

### Foreground Services
- **WeatherUpdateService**: Background weather updates
- **DataSyncService**: Data synchronization
- **FirebaseMessagingService**: Push notifications

### WorkManager Services
- **SystemAlarmService**: WorkManager system alarms
- **SystemJobService**: WorkManager system jobs

## Receivers

### System Receivers
- **BootCompletedReceiver**: Restart services after boot
- **NetworkConnectivityReceiver**: Monitor network changes
- **WorkManager Receivers**: Battery, network, storage constraints

## Providers

### Content Providers
- **FileProvider**: File sharing
- **DatabaseProvider**: Database access
- **InitializationProvider**: WorkManager initialization

## Security Configuration

### Network Security
- **HTTPS Enforcement**: All network traffic must use HTTPS
- **Certificate Pinning**: Pinned certificates for critical domains
- **Domain Restrictions**: Specific domain configurations
- **Debug Overrides**: Development certificate trust

### Data Protection
- **Scoped Storage**: Modern storage access
- **Encrypted Backups**: Secure backup encryption
- **Biometric Authentication**: Secure user authentication
- **Permission Management**: Granular permission control

## Network Security

### Configuration File: `network_security_config.xml`

#### Base Configuration
- **Cleartext Traffic**: Disabled for all domains
- **Trust Anchors**: System and user certificates
- **Certificate Validation**: Strict validation

#### Domain-Specific Rules
- **Weather APIs**: OpenWeatherMap, WeatherAPI, AccuWeather
- **Google Services**: APIs, Firebase, Drive
- **Backup Services**: Dropbox, Google Drive
- **Certificate Pinning**: SHA-256 pins for critical domains

#### Development Configuration
- **Localhost**: Cleartext allowed for development
- **Debug Overrides**: User certificates trusted in debug builds

## File Provider Configuration

### Configuration File: `file_paths.xml`

#### Shared Directories
- **Internal Files**: App's internal file storage
- **External Files**: App's external file storage
- **Cache**: Temporary file storage
- **Reports**: Generated farm reports
- **Images**: Farm photos and images
- **Documents**: Farm documentation
- **Backups**: Data backup files
- **Shared**: Temporary shared files
- **Logs**: Application logs
- **Database Exports**: Database backup files
- **Config**: Configuration files
- **Media**: Media files
- **Temp**: Temporary files

## Data Extraction Rules

### Configuration File: `data_extraction_rules.xml`

#### Cloud Backup
- **Included**: All app data, databases, preferences, external files
- **Excluded**: Auth tokens, biometric keys, encryption keys, temp files, cache, logs

#### Device Transfer
- **Included**: All app data for device transfer
- **Excluded**: Sensitive data and temporary files

## Implementation Notes

### Permission Request Strategy
1. **Runtime Permissions**: Request at app startup
2. **Feature Permissions**: Request when features are used
3. **Background Permissions**: Request when needed
4. **Permission Handler**: Dedicated activity for permission management

### Security Best Practices
1. **Principle of Least Privilege**: Request only necessary permissions
2. **Permission Justification**: Clear explanation for each permission
3. **Graceful Degradation**: App works without optional permissions
4. **Security Monitoring**: Monitor for permission abuse

### Performance Considerations
1. **Lazy Loading**: Load features only when needed
2. **Background Optimization**: Efficient background processing
3. **Memory Management**: Proper memory usage
4. **Battery Optimization**: Minimize battery impact

### Testing Requirements
1. **Permission Testing**: Test all permission scenarios
2. **Security Testing**: Verify security configurations
3. **Performance Testing**: Monitor app performance
4. **Compatibility Testing**: Test on different Android versions

## Troubleshooting

### Common Issues
1. **Permission Denied**: Check runtime permission requests
2. **Network Errors**: Verify network security configuration
3. **File Access Issues**: Check file provider configuration
4. **Background Service Issues**: Verify foreground service permissions

### Debug Configuration
1. **Debug Logging**: Enable debug logging for troubleshooting
2. **Network Debug**: Monitor network requests
3. **Permission Debug**: Track permission requests
4. **Performance Debug**: Monitor app performance

## Future Enhancements

### Planned Features
1. **Enhanced Security**: Additional security measures
2. **Performance Optimization**: Improved performance
3. **Compatibility**: Support for newer Android versions
4. **Accessibility**: Enhanced accessibility features

### Migration Strategy
1. **Version Updates**: Smooth version transitions
2. **Permission Migration**: Handle permission changes
3. **Feature Migration**: Migrate deprecated features
4. **Data Migration**: Secure data migration

## Conclusion

The AndroidManifest.xml configuration provides a comprehensive foundation for the SmartFarm application, ensuring proper permissions, security, and functionality while maintaining compatibility across different Android versions and device configurations. 
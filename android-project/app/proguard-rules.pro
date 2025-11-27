# SmartFarm App ProGuard Rules
# This file contains rules for code obfuscation and optimization

# =============================================================================
# GENERAL RULES
# =============================================================================

# Keep source file and line number information for debugging
-keepattributes SourceFile,LineNumberTable

# Keep annotations
-keepattributes *Annotation*

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep enum values
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep generic signatures
-keepattributes Signature

# Keep exceptions
-keep public class * extends java.lang.Exception

# =============================================================================
# FIREBASE RULES
# =============================================================================

# Keep Firebase Analytics classes
-keep class com.google.firebase.analytics.** { *; }
-dontwarn com.google.firebase.analytics.**

# Keep Firebase Crashlytics classes
-keep class com.google.firebase.crashlytics.** { *; }
-dontwarn com.google.firebase.crashlytics.**

# Keep Firebase Performance classes
-keep class com.google.firebase.perf.** { *; }
-dontwarn com.google.firebase.perf.**

# Keep Firebase Auth classes
-keep class com.google.firebase.auth.** { *; }
-dontwarn com.google.firebase.auth.**

# Keep Firebase Firestore classes (if used)
-keep class com.google.firebase.firestore.** { *; }
-dontwarn com.google.firebase.firestore.**

# =============================================================================
# HILT DEPENDENCY INJECTION RULES
# =============================================================================

# Keep Hilt generated classes
-keep class dagger.hilt.** { *; }
-keep class * extends dagger.hilt.android.internal.managers.ViewComponentManager { *; }

# Keep Hilt modules
-keep @dagger.hilt.InstallIn class * { *; }

# Keep Hilt components
-keep @dagger.hilt.android.AndroidEntryPoint class * { *; }

# Keep Hilt ViewModels
-keep @dagger.hilt.android.lifecycle.HiltViewModel class * { *; }

# Keep Hilt Application class
-keep @dagger.hilt.android.HiltAndroidApp class * { *; }

# Keep Hilt generated code
-keep class * extends dagger.hilt.android.internal.managers.ApplicationComponentManager { *; }
-keep class * extends dagger.hilt.android.internal.managers.ActivityComponentManager { *; }
-keep class * extends dagger.hilt.android.internal.managers.FragmentComponentManager { *; }
-keep class * extends dagger.hilt.android.internal.managers.ServiceComponentManager { *; }
-keep class * extends dagger.hilt.android.internal.managers.ViewComponentManager { *; }

# =============================================================================
# ROOM DATABASE RULES
# =============================================================================

# Keep Room database classes
-keep class * extends androidx.room.RoomDatabase {
    public static <fields>;
}

# Keep Room DAO interfaces
-keep @androidx.room.Dao interface * {
    @androidx.room.* <methods>;
}

# Keep Room entities
-keep @androidx.room.Entity class * {
    @androidx.room.* <fields>;
}

# Keep Room TypeConverters
-keep @androidx.room.TypeConverter class * {
    public <init>();
    public static * convert*(...);
}

# Keep Room generated classes
-keep class * extends androidx.room.RoomDatabase$Callback {
    public <init>();
}

# Keep Room migration classes
-keep class * extends androidx.room.migration.Migration {
    public <init>(int, int);
}

# =============================================================================
# COMPOSE RULES
# =============================================================================

# Keep Compose composable functions
-keepclassmembers class * {
    @androidx.compose.runtime.Composable *;
}

# Keep Compose preview functions
-keepclassmembers class * {
    @androidx.compose.ui.tooling.preview.Preview *;
}

# Keep Compose state classes
-keep class androidx.compose.runtime.State {
    *;
}

# Keep Compose remember functions
-keepclassmembers class * {
    @androidx.compose.runtime.Remember *;
}

# =============================================================================
# WORKMANAGER RULES
# =============================================================================

# Keep WorkManager worker classes
-keep class * extends androidx.work.Worker {
    public <init>(android.content.Context, androidx.work.WorkerParameters);
}

# Keep WorkManager input/output classes
-keep class * extends androidx.work.Data {
    *;
}

# =============================================================================
# GOOGLE PLAY SERVICES RULES
# =============================================================================

# Keep Google Play Services classes
-keep class com.google.android.gms.** { *; }
-dontwarn com.google.android.gms.**

# Keep Google Maps classes
-keep class com.google.android.gms.maps.** { *; }
-dontwarn com.google.android.gms.maps.**

# Keep Google Location classes
-keep class com.google.android.gms.location.** { *; }
-dontwarn com.google.android.gms.location.**

# Keep Google Auth classes
-keep class com.google.android.gms.auth.** { *; }
-dontwarn com.google.android.gms.auth.**

# =============================================================================
# GOOGLE CALENDAR API RULES
# =============================================================================

# Keep Google Calendar API classes
-keep class com.google.api.services.calendar.** { *; }
-dontwarn com.google.api.services.calendar.**

# Keep Google API Client classes
-keep class com.google.api.client.** { *; }
-dontwarn com.google.api.client.**

# Keep Google OAuth classes
-keep class com.google.api.client.googleapis.auth.oauth2.** { *; }
-dontwarn com.google.api.client.googleapis.auth.oauth2.**

# =============================================================================
# NETWORKING RULES
# =============================================================================

# Keep OkHttp classes
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

# Keep Gson classes
-keep class com.google.gson.** { *; }
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer
-dontwarn com.google.gson.**

# Keep JSON classes
-keep class org.json.** { *; }
-dontwarn org.json.**

# =============================================================================
# IMAGE LOADING RULES
# =============================================================================

# Keep Coil classes
-keep class coil.** { *; }
-dontwarn coil.**

# =============================================================================
# SECURITY RULES
# =============================================================================

# Keep Security Crypto classes
-keep class androidx.security.crypto.** { *; }
-dontwarn androidx.security.crypto.**

# Keep Biometric classes
-keep class androidx.biometric.** { *; }
-dontwarn androidx.biometric.**

# =============================================================================
# SMARTFARM APP SPECIFIC RULES
# =============================================================================

# Keep your app's main classes
-keep class com.example.smartfarm.MainActivity { *; }
-keep class com.example.smartfarm.SmartFarmApplication { *; }
-keep class com.yourcompany.smartfarm.MainActivity { *; }
-keep class com.yourcompany.smartfarm.SmartFarmApplication { *; }
-keep class com.smartfarm.** { *; }

# Keep ViewModels
-keep class com.example.smartfarm.**.ViewModel { *; }
-keep class com.example.smartfarm.**.ViewModel$* { *; }
-keep class com.smartfarm.ui.viewmodel.** { *; }

# Keep data models
-keep class com.example.smartfarm.data.model.** { *; }
-keep class com.smartfarm.data.model.** { *; }
-keep class com.smartfarm.data.database.entity.** { *; }

# Keep repositories
-keep class com.example.smartfarm.data.repository.** { *; }
-keep class com.smartfarm.data.repository.** { *; }

# Keep DAOs
-keep class com.example.smartfarm.data.database.**Dao { *; }
-keep class com.smartfarm.data.database.dao.** { *; }

# Keep database classes
-keep class com.example.smartfarm.data.database.**Database { *; }
-keep class com.smartfarm.data.database.FarmDatabase { *; }

# Keep utility classes
-keep class com.example.smartfarm.util.** { *; }

# Keep worker classes
-keep class com.example.smartfarm.worker.** { *; }

# Keep service classes
-keep class com.example.smartfarm.data.service.** { *; }

# Keep network manager
-keep class com.example.smartfarm.network.** { *; }
-keep class com.smartfarm.network.** { *; }

# Keep Retrofit and Gson
-keepattributes Signature, InnerClasses, EnclosingMethod
-keepattributes RuntimeVisibleAnnotations, RuntimeVisibleParameterAnnotations
-keepclassmembers,allowshrinking,allowobfuscation interface * {
    @retrofit2.http.* <methods>;
}
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn javax.annotation.**
-dontwarn kotlin.Unit
-dontwarn retrofit2.KotlinExtensions
-dontwarn retrofit2.KotlinExtensions$*

# Keep Gson serialization
-keep class com.smartfarm.data.model.** { *; }
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}

# Keep error handler
-keep class com.example.smartfarm.error.** { *; }

# Keep authentication classes
-keep class com.example.smartfarm.auth.** { *; }

# Keep UI components
-keep class com.example.smartfarm.ui.** { *; }
-keep class com.smartfarm.ui.** { *; }

# Keep screens
-keep class com.example.smartfarm.*Screen { *; }

# Keep analytics classes
-keep class com.example.smartfarm.analytics.** { *; }

# Keep monitoring classes
-keep class com.example.smartfarm.monitoring.** { *; }

# Keep performance classes
-keep class com.example.smartfarm.performance.** { *; }

# Keep accessibility classes
-keep class com.example.smartfarm.accessibility.** { *; }

# Keep GDPR classes
-keep class com.example.smartfarm.gdpr.** { *; }

# Keep debug classes
-keep class com.example.smartfarm.debug.** { *; }

# Keep dependency injection classes
-keep class com.example.smartfarm.di.** { *; }
-keep class com.smartfarm.di.** { *; }

# =============================================================================
# SERIALIZATION RULES
# =============================================================================

# Keep classes that are serialized/deserialized
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}

# Keep classes used in Room TypeConverters
-keep class * {
    @androidx.room.TypeConverter *;
}

# =============================================================================
# REFLECTION RULES
# =============================================================================

# Keep classes that might be accessed via reflection
-keep class com.example.smartfarm.** {
    @androidx.room.* *;
    @androidx.compose.runtime.* *;
    @androidx.work.* *;
    @dagger.hilt.* *;
    @javax.inject.* *;
}

# =============================================================================
# OPTIMIZATION RULES
# =============================================================================

# Optimize the code
-optimizations !code/simplification/arithmetic,!code/simplification/cast,!field/*,!class/merging/*
-optimizationpasses 5
-allowaccessmodification

# Remove unused code
-dontwarn android.support.**
-dontwarn androidx.**
-dontwarn org.conscrypt.**
-dontwarn org.bouncycastle.**
-dontwarn org.openjsse.**

# =============================================================================
# DEBUGGING RULES
# =============================================================================

# Keep stack traces readable
-keepattributes Exceptions

# Keep method names for debugging
-keepattributes MethodParameters

# =============================================================================
# WEBVIEW RULES (if needed)
# =============================================================================

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# =============================================================================
# CUSTOM RULES FOR SPECIFIC LIBRARIES
# =============================================================================

# Keep any custom rules you might need for specific libraries
# Add them here as needed

# =============================================================================
# FINAL NOTES
# =============================================================================

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# Keep the original file name for debugging
-renamesourcefileattribute SourceFile
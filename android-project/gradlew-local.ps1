# Run Gradle with Android Studio's bundled JDK when JAVA_HOME is unset.
$studioJbr = "C:\Program Files\Android\Android Studio\jbr"
if (-not $env:JAVA_HOME -and (Test-Path $studioJbr)) {
    $env:JAVA_HOME = $studioJbr
    $env:Path = "$env:JAVA_HOME\bin;$env:Path"
}

$sdk = "$env:LOCALAPPDATA\Android\Sdk"
if (Test-Path $sdk) {
    $env:ANDROID_HOME = $sdk
    $env:ANDROID_SDK_ROOT = $sdk
}

& "$PSScriptRoot\gradlew.bat" @args
exit $LASTEXITCODE

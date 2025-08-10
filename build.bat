@echo off
echo Setting up Java environment...

REM Try to find Java in common locations
set JAVA_HOME=

REM Check if Android Studio's embedded JDK exists
if exist "C:\Program Files\Android\Android Studio\jbr" (
    set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
    echo Found Android Studio JDK at %JAVA_HOME%
    goto :found_java
)

REM Check if Android Studio's embedded JDK exists (alternative path)
if exist "C:\Users\%USERNAME%\AppData\Local\Android\Sdk\jbr" (
    set JAVA_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk\jbr
    echo Found Android Studio JDK at %JAVA_HOME%
    goto :found_java
)

REM Check for Oracle JDK
if exist "C:\Program Files\Java\jdk-17" (
    set JAVA_HOME=C:\Program Files\Java\jdk-17
    echo Found Oracle JDK at %JAVA_HOME%
    goto :found_java
)

if exist "C:\Program Files\Java\jdk-21" (
    set JAVA_HOME=C:\Program Files\Java\jdk-21
    echo Found Oracle JDK at %JAVA_HOME%
    goto :found_java
)

REM Check for OpenJDK
if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.9.9-hotspot" (
    set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.9.9-hotspot
    echo Found OpenJDK at %JAVA_HOME%
    goto :found_java
)

echo Java not found in common locations.
echo Please install JDK 17 or later and set JAVA_HOME environment variable.
pause
exit /b 1

:found_java
echo Using Java at: %JAVA_HOME%
set PATH=%JAVA_HOME%\bin;%PATH%

echo Building project...
call gradlew.bat assembleDebug

if %ERRORLEVEL% EQU 0 (
    echo Build successful!
) else (
    echo Build failed with error code %ERRORLEVEL%
)

pause 
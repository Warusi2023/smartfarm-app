@echo off
REM SmartFarm Version Management Batch File
REM This file provides easy access to version management commands

setlocal enabledelayedexpansion

echo SmartFarm Version Manager
echo ========================

if "%1"=="" (
    echo Usage: version.bat [command] [options]
    echo.
    echo Commands:
    echo   show     - Show current version information
    echo   patch    - Bump patch version (1.0.0 -^> 1.0.1)
    echo   minor    - Bump minor version (1.0.0 -^> 1.1.0)
    echo   major    - Bump major version (1.0.0 -^> 2.0.0)
    echo   dry      - Dry run (test without making changes)
    echo.
    echo Examples:
    echo   version.bat show
    echo   version.bat patch
    echo   version.bat minor dry
    echo   version.bat major
    goto :end
)

set COMMAND=%1
set OPTIONS=%2

if "%COMMAND%"=="show" (
    PowerShell -ExecutionPolicy Bypass -File .\version-manager.ps1 -ShowCurrent
) else if "%COMMAND%"=="patch" (
    if "%OPTIONS%"=="dry" (
        PowerShell -ExecutionPolicy Bypass -File .\version-manager.ps1 -BumpType patch -DryRun
    ) else (
        PowerShell -ExecutionPolicy Bypass -File .\version-manager.ps1 -BumpType patch
    )
) else if "%COMMAND%"=="minor" (
    if "%OPTIONS%"=="dry" (
        PowerShell -ExecutionPolicy Bypass -File .\version-manager.ps1 -BumpType minor -DryRun
    ) else (
        PowerShell -ExecutionPolicy Bypass -File .\version-manager.ps1 -BumpType minor
    )
) else if "%COMMAND%"=="major" (
    if "%OPTIONS%"=="dry" (
        PowerShell -ExecutionPolicy Bypass -File .\version-manager.ps1 -BumpType major -DryRun
    ) else (
        PowerShell -ExecutionPolicy Bypass -File .\version-manager.ps1 -BumpType major
    )
) else if "%COMMAND%"=="dry" (
    echo Dry run mode - testing patch version bump
    PowerShell -ExecutionPolicy Bypass -File .\version-manager.ps1 -BumpType patch -DryRun
) else (
    echo Unknown command: %COMMAND%
    echo Use 'version.bat' without parameters to see available commands
    goto :end
)

:end
endlocal 
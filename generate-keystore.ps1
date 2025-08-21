# SmartFarm Keystore Generation Script
# Simple version for generating secure keystore

Write-Host "SmartFarm Keystore Generation" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Green
Write-Host ""

# Configuration
$keystorePath = "smartfarm-upload-key.jks"
$keyAlias = "smartfarm-upload-key"

Write-Host "Configuration:" -ForegroundColor Yellow
Write-Host "   Keystore Path: $keystorePath" -ForegroundColor Gray
Write-Host "   Key Alias: $keyAlias" -ForegroundColor Gray
Write-Host ""

# Check if keystore already exists
if (Test-Path $keystorePath) {
    Write-Host "Keystore already exists!" -ForegroundColor Yellow
    $backupChoice = Read-Host "Do you want to create a backup and overwrite? (y/N)"
    
    if ($backupChoice -eq "y" -or $backupChoice -eq "Y") {
        $backupPath = "$keystorePath.backup.$(Get-Date -Format 'yyyy-MM-dd_HH-mm-ss')"
        Copy-Item $keystorePath $backupPath
        Write-Host "Backup created: $backupPath" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "Keystore generation cancelled" -ForegroundColor Red
        exit
    }
}

# Check if keytool is available
try {
    $null = Get-Command keytool -ErrorAction Stop
    Write-Host "Keytool found" -ForegroundColor Green
} catch {
    Write-Host "Keytool not found!" -ForegroundColor Red
    Write-Host "   Please install Java JDK and ensure keytool is in PATH" -ForegroundColor Gray
    Write-Host "   Download from: https://adoptium.net/" -ForegroundColor Blue
    exit 1
}

Write-Host ""
Write-Host "Generating Keystore..." -ForegroundColor Blue
Write-Host ""

# Prompt for keystore details
Write-Host "Please provide the following information:" -ForegroundColor Cyan
Write-Host ""

$keystorePassword = Read-Host "Enter keystore password" -AsSecureString
$keyPassword = Read-Host "Enter key password (or press Enter to use same as keystore)" -AsSecureString

# If key password is empty, use keystore password
if ($keyPassword.Length -eq 0) {
    $keyPassword = $keystorePassword
}

# Convert secure strings to plain text for keytool
$keystorePasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($keystorePassword))
$keyPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($keyPassword))

# Prompt for certificate details
Write-Host ""
Write-Host "Certificate Information:" -ForegroundColor Cyan
$firstName = Read-Host "First and Last Name"
$organizationalUnit = Read-Host "Organizational Unit (e.g., Development)"
$organization = Read-Host "Organization (e.g., SmartFarm)"
$city = Read-Host "City or Locality"
$state = Read-Host "State or Province"
$countryCode = Read-Host "Country Code (2 letters, e.g., US)"

Write-Host ""
Write-Host "Generating keystore with keytool..." -ForegroundColor Blue

# Build keytool command
$keytoolCommand = "keytool -genkey -v -keystore `"$keystorePath`" -keyalg RSA -keysize 2048 -validity 10000 -alias `"$keyAlias`" -storepass `"$keystorePasswordPlain`" -keypass `"$keyPasswordPlain`" -dname `"CN=$firstName, OU=$organizationalUnit, O=$organization, L=$city, ST=$state, C=$countryCode`""

# Execute keytool command
Invoke-Expression $keytoolCommand

# Check if keystore was created
if (Test-Path $keystorePath) {
    Write-Host ""
    Write-Host "Keystore generated successfully!" -ForegroundColor Green
    Write-Host "   Path: $keystorePath" -ForegroundColor Gray
    Write-Host ""
    
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "===========" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "1. Update local.properties:" -ForegroundColor Blue
    Write-Host "   Open app/local.properties and update:" -ForegroundColor Gray
    Write-Host "   KEYSTORE_PASSWORD=$keystorePasswordPlain" -ForegroundColor White
    Write-Host "   KEY_PASSWORD=$keyPasswordPlain" -ForegroundColor White
    Write-Host ""
    
    Write-Host "2. Test the build:" -ForegroundColor Blue
    Write-Host "   ./gradlew assembleRelease" -ForegroundColor White
    Write-Host ""
    
    Write-Host "IMPORTANT SECURITY NOTES:" -ForegroundColor Red
    Write-Host "   - Keep your keystore file secure" -ForegroundColor Gray
    Write-Host "   - Never commit passwords to version control" -ForegroundColor Gray
    Write-Host "   - Store keystore backup in a safe location" -ForegroundColor Gray
    Write-Host "   - You will need this keystore for all future app updates" -ForegroundColor Gray
    Write-Host ""
    
} else {
    Write-Host "Keystore generation failed!" -ForegroundColor Red
    Write-Host "   Please check the error messages above" -ForegroundColor Gray
}

# Clear sensitive data from memory
$keystorePasswordPlain = $null
$keyPasswordPlain = $null
[System.GC]::Collect()

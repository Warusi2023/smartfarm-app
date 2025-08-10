# SmartFarm Keystore Backup Script
# This script helps you create secure backups of your keystore

Write-Host "SmartFarm Keystore Backup Utility" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Keystore details
$keystorePath = "smartfarm-upload-key.jks"
$backupDir = "keystore-backups"

# Check if keystore exists
if (-not (Test-Path $keystorePath)) {
    Write-Host "Error: Keystore not found at $keystorePath" -ForegroundColor Red
    Write-Host "Please run generate-keystore.ps1 first to create the keystore." -ForegroundColor Yellow
    exit 1
}

# Create backup directory
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
    Write-Host "Created backup directory: $backupDir" -ForegroundColor Yellow
}

# Generate timestamp for backup
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$backupName = "smartfarm-upload-key-backup-$timestamp.jks"
$backupPath = Join-Path $backupDir $backupName

# Create backup
try {
    Copy-Item $keystorePath $backupPath
    Write-Host "Keystore backed up successfully!" -ForegroundColor Green
    Write-Host "Backup location: $(Resolve-Path $backupPath)" -ForegroundColor Green
} catch {
    Write-Host "Error creating backup: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Create keystore info file
$infoFile = Join-Path $backupDir "keystore-info-$timestamp.txt"
$infoContent = @"
SmartFarm Upload Keystore Information
=====================================
Generated: $(Get-Date)
Keystore: $keystorePath
Backup: $backupPath

Key Details:
- Alias: smartfarm-upload-key
- Store Password: smartfarm123
- Key Password: smartfarm123
- Algorithm: RSA 2048
- Validity: 10,000 days

IMPORTANT SECURITY NOTES:
========================
1. Keep this keystore secure and confidential
2. Store backups in multiple secure locations
3. Use strong passwords in production
4. Never share the keystore or passwords
5. This keystore is required for all app updates

Google Play App Signing:
=======================
- This is your UPLOAD key for Google Play Console
- Google Play App Signing handles the actual app signing
- You only need to manage this upload key
- Keep this key safe - you cannot update your app without it

Backup Locations:
================
$(Get-ChildItem $backupDir -Name "*.jks" | ForEach-Object { "- $backupDir\$_" })

"@

$infoContent | Out-File -FilePath $infoFile -Encoding UTF8
Write-Host "Keystore information saved to: $infoFile" -ForegroundColor Yellow

# Security recommendations
Write-Host "`nSecurity Recommendations:" -ForegroundColor Cyan
Write-Host "1. Store backups in encrypted storage" -ForegroundColor White
Write-Host "2. Use a password manager for credentials" -ForegroundColor White
Write-Host "3. Keep backups in multiple secure locations" -ForegroundColor White
Write-Host "4. Consider using cloud storage with encryption" -ForegroundColor White
Write-Host "5. Regularly test backup restoration" -ForegroundColor White

Write-Host "`nBackup completed successfully!" -ForegroundColor Green 
# Simple SSH Key Setup - Fixed Version
# This will use the correct default location

Write-Host "🔑 Simple SSH Key Setup" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan
Write-Host ""

$sshDir = "$env:USERPROFILE\.ssh"

# Create .ssh directory if it doesn't exist
if (-not (Test-Path $sshDir)) {
    New-Item -ItemType Directory -Path $sshDir -Force | Out-Null
    Write-Host "✅ Created .ssh directory" -ForegroundColor Green
}

# Check for existing keys
Write-Host "Checking for existing SSH keys..." -ForegroundColor Yellow
$existingKeys = Get-ChildItem "$sshDir\id_*.pub" -ErrorAction SilentlyContinue

if ($existingKeys) {
    Write-Host ""
    Write-Host "✅ Found existing SSH key(s):" -ForegroundColor Green
    foreach ($key in $existingKeys) {
        Write-Host "   - $($key.Name)" -ForegroundColor White
    }
    Write-Host ""
    
    $latestKey = $existingKeys | Sort-Object LastWriteTime -Descending | Select-Object -First 1
    Write-Host "Using: $($latestKey.Name)" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    $publicKey = Get-Content $latestKey.FullName
    Write-Host $publicKey -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host ""
    
    # Copy to clipboard
    try {
        $publicKey | Set-Clipboard
        Write-Host "✅ Key copied to clipboard!" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Could not copy to clipboard" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "📝 Add this key to GitHub:" -ForegroundColor Cyan
    Write-Host "1. Open: https://github.com/settings/keys" -ForegroundColor White
    Write-Host "2. Click 'New SSH key'" -ForegroundColor White
    Write-Host "3. Title: 'SmartFarm Development'" -ForegroundColor White
    Write-Host "4. Paste the key (Ctrl+V)" -ForegroundColor White
    Write-Host "5. Click 'Add SSH key'" -ForegroundColor White
    Write-Host ""
    
    Read-Host "Press Enter AFTER you've added the key to GitHub"
    
    Write-Host ""
    Write-Host "🧪 Testing connection..." -ForegroundColor Cyan
    ssh -T git@github.com 2>&1
    
    if ($LASTEXITCODE -eq 1) {
        Write-Host ""
        Write-Host "✅ Success! SSH is working!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 You can now push:" -ForegroundColor Cyan
        Write-Host "   git push origin main" -ForegroundColor White
    }
    exit
}

# Generate new key in the correct location
Write-Host "No existing keys found. Generating new key..." -ForegroundColor Yellow
Write-Host ""

$email = Read-Host "Enter your GitHub email address"
if (-not $email) {
    Write-Host "❌ Email is required" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Generating SSH key in default location: $sshDir" -ForegroundColor Cyan
Write-Host "When prompted for passphrase, press Enter (no passphrase)" -ForegroundColor Yellow
Write-Host ""

# Generate key with explicit path
$keyPath = "$sshDir\id_ed25519"
ssh-keygen -t ed25519 -C $email -f $keyPath -N '""'

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ED25519 failed, trying RSA..." -ForegroundColor Yellow
    $keyPath = "$sshDir\id_rsa"
    ssh-keygen -t rsa -b 4096 -C $email -f $keyPath -N '""'
    $keyFile = "$keyPath.pub"
} else {
    $keyFile = "$keyPath.pub"
}

if (Test-Path $keyFile) {
    Write-Host ""
    Write-Host "✅ SSH key generated!" -ForegroundColor Green
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    $publicKey = Get-Content $keyFile
    Write-Host $publicKey -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host ""
    
    try {
        $publicKey | Set-Clipboard
        Write-Host "✅ Key copied to clipboard!" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Could not copy to clipboard" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "📝 Add this key to GitHub:" -ForegroundColor Cyan
    Write-Host "1. Open: https://github.com/settings/keys" -ForegroundColor White
    Write-Host "2. Click 'New SSH key'" -ForegroundColor White
    Write-Host "3. Paste the key (Ctrl+V)" -ForegroundColor White
    Write-Host "4. Click 'Add SSH key'" -ForegroundColor White
    Write-Host ""
    
    Read-Host "Press Enter AFTER you've added the key to GitHub"
    
    Write-Host ""
    Write-Host "🧪 Testing connection..." -ForegroundColor Cyan
    ssh -T git@github.com 2>&1
    
    if ($LASTEXITCODE -eq 1) {
        Write-Host ""
        Write-Host "✅ Success! SSH is working!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 You can now push:" -ForegroundColor Cyan
        Write-Host "   git push origin main" -ForegroundColor White
    }
} else {
    Write-Host "❌ Failed to generate key" -ForegroundColor Red
}



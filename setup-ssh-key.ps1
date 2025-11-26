# SSH Key Setup Script for GitHub
# This script will help you set up SSH keys for GitHub

Write-Host "🔑 GitHub SSH Key Setup" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan
Write-Host ""

# Check if SSH keys already exist
$sshDir = "$env:USERPROFILE\.ssh"
$existingKeys = Get-ChildItem "$sshDir\id_*.pub" -ErrorAction SilentlyContinue

if ($existingKeys) {
    Write-Host "✅ Found existing SSH keys:" -ForegroundColor Green
    foreach ($key in $existingKeys) {
        Write-Host "   - $($key.Name)" -ForegroundColor White
    }
    Write-Host ""
    
    $useExisting = Read-Host "Use existing key? (y/n)"
    if ($useExisting -eq "y" -or $useExisting -eq "Y") {
        $keyFile = $existingKeys[0].FullName
        Write-Host ""
        Write-Host "📋 Your public key:" -ForegroundColor Cyan
        Write-Host ""
        $publicKey = Get-Content $keyFile
        Write-Host $publicKey -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📝 Copy the key above, then:" -ForegroundColor Cyan
        Write-Host "1. Go to: https://github.com/settings/keys" -ForegroundColor White
        Write-Host "2. Click 'New SSH key'" -ForegroundColor White
        Write-Host "3. Paste the key and save" -ForegroundColor White
        Write-Host ""
        
        # Try to copy to clipboard
        try {
            $publicKey | Set-Clipboard
            Write-Host "✅ Key copied to clipboard!" -ForegroundColor Green
        } catch {
            Write-Host "⚠️  Could not copy to clipboard automatically" -ForegroundColor Yellow
        }
        
        Read-Host "Press Enter after you've added the key to GitHub"
        
        Write-Host ""
        Write-Host "🧪 Testing connection..." -ForegroundColor Cyan
        ssh -T git@github.com
        
        if ($LASTEXITCODE -eq 0 -or $LASTEXITCODE -eq 1) {
            Write-Host ""
            Write-Host "✅ SSH key is working!" -ForegroundColor Green
            Write-Host ""
            Write-Host "🚀 You can now push:" -ForegroundColor Cyan
            Write-Host "   git push origin main" -ForegroundColor White
        }
        exit
    }
}

# Generate new SSH key
Write-Host "🔧 Generating new SSH key..." -ForegroundColor Cyan
Write-Host ""

$email = Read-Host "Enter your GitHub email address"
if (-not $email) {
    Write-Host "❌ Email is required" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Generating ED25519 key (most secure)..." -ForegroundColor Yellow
Write-Host "When prompted:" -ForegroundColor Yellow
Write-Host "  - File location: Press Enter (use default)" -ForegroundColor White
Write-Host "  - Passphrase: Press Enter (no passphrase) OR enter a secure passphrase" -ForegroundColor White
Write-Host ""

ssh-keygen -t ed25519 -C $email

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  ED25519 failed, trying RSA..." -ForegroundColor Yellow
    ssh-keygen -t rsa -b 4096 -C $email
}

# Get the public key
$keyFiles = Get-ChildItem "$sshDir\id_*.pub" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending
if ($keyFiles) {
    $latestKey = $keyFiles[0].FullName
    Write-Host ""
    Write-Host "✅ SSH key generated!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Your public key:" -ForegroundColor Cyan
    Write-Host ""
    $publicKey = Get-Content $latestKey
    Write-Host $publicKey -ForegroundColor Yellow
    Write-Host ""
    
    # Copy to clipboard
    try {
        $publicKey | Set-Clipboard
        Write-Host "✅ Key copied to clipboard!" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Could not copy to clipboard automatically" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "📝 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/settings/keys" -ForegroundColor White
    Write-Host "2. Click 'New SSH key'" -ForegroundColor White
    Write-Host "3. Title: 'SmartFarm Development'" -ForegroundColor White
    Write-Host "4. Paste the key above (or from clipboard)" -ForegroundColor White
    Write-Host "5. Click 'Add SSH key'" -ForegroundColor White
    Write-Host ""
    
    Read-Host "Press Enter after you've added the key to GitHub"
    
    Write-Host ""
    Write-Host "🧪 Testing connection..." -ForegroundColor Cyan
    ssh -T git@github.com
    
    if ($LASTEXITCODE -eq 0 -or $LASTEXITCODE -eq 1) {
        Write-Host ""
        Write-Host "✅ SSH key is working!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 You can now push:" -ForegroundColor Cyan
        Write-Host "   git push origin main" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "❌ Connection test failed" -ForegroundColor Red
        Write-Host "Make sure you:" -ForegroundColor Yellow
        Write-Host "1. Added the key to GitHub correctly" -ForegroundColor White
        Write-Host "2. Waited a minute after adding" -ForegroundColor White
        Write-Host "3. Used the public key (ends in .pub)" -ForegroundColor White
    }
} else {
    Write-Host "❌ Failed to generate SSH key" -ForegroundColor Red
}



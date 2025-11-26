# Complete SSH Setup for GitHub
# This script will guide you through the entire process

Write-Host "🔑 Complete GitHub SSH Setup" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""

$sshDir = "$env:USERPROFILE\.ssh"

# Step 1: Check for existing keys
Write-Host "Step 1: Checking for existing SSH keys..." -ForegroundColor Yellow
$existingKeys = Get-ChildItem "$sshDir\id_*.pub" -ErrorAction SilentlyContinue

if ($existingKeys) {
    Write-Host "✅ Found existing keys:" -ForegroundColor Green
    foreach ($key in $existingKeys) {
        Write-Host "   - $($key.Name)" -ForegroundColor White
    }
    Write-Host ""
    
    $useExisting = Read-Host "Use existing key? (y/n)"
    if ($useExisting -eq "y" -or $useExisting -eq "Y") {
        $keyFile = $existingKeys[0].FullName
        $publicKey = Get-Content $keyFile
        Write-Host ""
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
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
        Write-Host "📝 IMPORTANT: Add this key to GitHub" -ForegroundColor Cyan
        Write-Host "1. Open: https://github.com/settings/keys" -ForegroundColor White
        Write-Host "2. Click 'New SSH key'" -ForegroundColor White
        Write-Host "3. Title: 'SmartFarm Development'" -ForegroundColor White
        Write-Host "4. Paste the key above (Ctrl+V)" -ForegroundColor White
        Write-Host "5. Click 'Add SSH key'" -ForegroundColor White
        Write-Host ""
        
        Read-Host "Press Enter AFTER you've added the key to GitHub"
        
        Write-Host ""
        Write-Host "🧪 Testing connection..." -ForegroundColor Cyan
        ssh -T git@github.com 2>&1
        
        if ($LASTEXITCODE -eq 1) {
            Write-Host ""
            Write-Host "✅ Success! (Exit code 1 is normal for this command)" -ForegroundColor Green
            Write-Host ""
            Write-Host "🚀 You can now push:" -ForegroundColor Cyan
            Write-Host "   git push origin main" -ForegroundColor White
        } else {
            Write-Host ""
            Write-Host "⚠️  Still having issues. Make sure:" -ForegroundColor Yellow
            Write-Host "   - You copied the ENTIRE key (starts with ssh-ed25519 or ssh-rsa)" -ForegroundColor White
            Write-Host "   - You waited a minute after adding to GitHub" -ForegroundColor White
            Write-Host "   - You didn't add extra spaces or line breaks" -ForegroundColor White
        }
        exit
    }
}

# Step 2: Generate new key
Write-Host ""
Write-Host "Step 2: Generating new SSH key..." -ForegroundColor Yellow
Write-Host ""

$email = Read-Host "Enter your GitHub email address"
if (-not $email) {
    Write-Host "❌ Email is required" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Generating ED25519 key (most secure)..." -ForegroundColor Cyan
Write-Host "When prompted:" -ForegroundColor Yellow
Write-Host "  📁 File location: Press Enter (use default: ~/.ssh/id_ed25519)" -ForegroundColor White
Write-Host "  🔐 Passphrase: Press Enter (no passphrase) OR enter one if you want extra security" -ForegroundColor White
Write-Host ""

ssh-keygen -t ed25519 -C $email -f "$sshDir\id_ed25519"

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  ED25519 failed, trying RSA..." -ForegroundColor Yellow
    ssh-keygen -t rsa -b 4096 -C $email -f "$sshDir\id_rsa"
    $keyFile = "$sshDir\id_rsa.pub"
} else {
    $keyFile = "$sshDir\id_ed25519.pub"
}

# Step 3: Display and copy key
if (Test-Path $keyFile) {
    Write-Host ""
    Write-Host "✅ SSH key generated successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host ""
    
    $publicKey = Get-Content $keyFile
    Write-Host $publicKey -ForegroundColor Yellow
    
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host ""
    
    # Copy to clipboard
    try {
        $publicKey | Set-Clipboard
        Write-Host "✅ Key copied to clipboard!" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Could not copy to clipboard automatically" -ForegroundColor Yellow
        Write-Host "   Please copy the key manually from above" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "📝 CRITICAL: Add this key to GitHub NOW" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Open this URL in your browser:" -ForegroundColor White
    Write-Host "   https://github.com/settings/keys" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "2. Click the green 'New SSH key' button" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Fill in:" -ForegroundColor White
    Write-Host "   Title: SmartFarm Development" -ForegroundColor White
    Write-Host "   Key type: Authentication Key" -ForegroundColor White
    Write-Host "   Key: Paste the key above (Ctrl+V)" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Click 'Add SSH key'" -ForegroundColor White
    Write-Host ""
    Write-Host "⚠️  Make sure you copy the ENTIRE key (one long line)" -ForegroundColor Yellow
    Write-Host "   It should start with 'ssh-ed25519' or 'ssh-rsa'" -ForegroundColor Yellow
    Write-Host ""
    
    Read-Host "Press Enter AFTER you've added the key to GitHub and saved it"
    
    Write-Host ""
    Write-Host "⏳ Waiting 3 seconds for GitHub to process..." -ForegroundColor Cyan
    Start-Sleep -Seconds 3
    
    Write-Host ""
    Write-Host "🧪 Testing SSH connection..." -ForegroundColor Cyan
    $testResult = ssh -T git@github.com 2>&1
    Write-Host $testResult
    
    if ($testResult -like "*successfully authenticated*" -or $LASTEXITCODE -eq 1) {
        Write-Host ""
        Write-Host "✅ SUCCESS! SSH is working!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 You can now push to GitHub:" -ForegroundColor Cyan
        Write-Host "   git push origin main" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "❌ Still not working. Let's troubleshoot:" -ForegroundColor Red
        Write-Host ""
        Write-Host "Common issues:" -ForegroundColor Yellow
        Write-Host "1. Did you copy the ENTIRE key? (should be one long line)" -ForegroundColor White
        Write-Host "2. Did you wait a minute after adding to GitHub?" -ForegroundColor White
        Write-Host "3. Did you add any extra spaces or line breaks?" -ForegroundColor White
        Write-Host "4. Make sure you're logged into the correct GitHub account" -ForegroundColor White
        Write-Host ""
        Write-Host "Try again:" -ForegroundColor Cyan
        Write-Host "1. Go back to: https://github.com/settings/keys" -ForegroundColor White
        Write-Host "2. Delete the key you just added" -ForegroundColor White
        Write-Host "3. Add it again, making sure to copy the ENTIRE key" -ForegroundColor White
        Write-Host "4. Wait 30 seconds, then test: ssh -T git@github.com" -ForegroundColor White
    }
} else {
    Write-Host "❌ Failed to generate SSH key" -ForegroundColor Red
    Write-Host "Try manually: ssh-keygen -t ed25519 -C your_email@example.com" -ForegroundColor Yellow
}



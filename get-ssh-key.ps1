# Get SSH Public Key Script
# This will show and copy your SSH public key

Write-Host "🔑 Getting Your SSH Public Key" -ForegroundColor Cyan
Write-Host "===============================" -ForegroundColor Cyan
Write-Host ""

$sshDir = "$env:USERPROFILE\.ssh"

# Find all public keys
$keyFiles = Get-ChildItem "$sshDir\id_*.pub" -ErrorAction SilentlyContinue

if (-not $keyFiles) {
    Write-Host "❌ No SSH keys found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Generate a key first:" -ForegroundColor Yellow
    Write-Host "ssh-keygen -t ed25519 -C your_email@example.com" -ForegroundColor White
    exit 1
}

Write-Host "✅ Found SSH key(s):" -ForegroundColor Green
Write-Host ""

# Show the most recent key
$latestKey = $keyFiles | Sort-Object LastWriteTime -Descending | Select-Object -First 1

Write-Host "📋 Your SSH Public Key (use this one):" -ForegroundColor Cyan
Write-Host "File: $($latestKey.Name)" -ForegroundColor Gray
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
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. The key above has been copied to your clipboard" -ForegroundColor White
Write-Host "2. Go to: https://github.com/settings/keys" -ForegroundColor White
Write-Host "3. Click 'New SSH key'" -ForegroundColor White
Write-Host "4. Paste the key (Ctrl+V)" -ForegroundColor White
Write-Host "5. Click 'Add SSH key'" -ForegroundColor White
Write-Host ""

Write-Host "💡 Note: The key should start with 'ssh-ed25519' or 'ssh-rsa'" -ForegroundColor Yellow
Write-Host "   The SHA256 fingerprint you saw is different - that's just a hash for verification" -ForegroundColor Gray



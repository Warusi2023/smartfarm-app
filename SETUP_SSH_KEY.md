# 🔑 Set Up SSH Key for GitHub

## Current Status
✅ SSH connection to GitHub works
❌ No SSH key found (Permission denied)

## Quick Fix - Step by Step

### Step 1: Check if you have SSH keys
```powershell
ls ~/.ssh/id_*.pub
```

**If you see files** (like `id_ed25519.pub` or `id_rsa.pub`):
- Skip to Step 3 (Add key to GitHub)

**If you see "No such file":**
- Continue to Step 2 (Generate new key)

### Step 2: Generate SSH Key
```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

**When prompted:**
- **File location:** Press Enter (uses default: `~/.ssh/id_ed25519`)
- **Passphrase:** Press Enter for no passphrase, OR enter a secure passphrase
- **Confirm passphrase:** Press Enter again

**Expected output:**
```
Your public key has been saved in ~/.ssh/id_ed25519.pub
```

### Step 3: Copy Your Public Key
```powershell
cat ~/.ssh/id_ed25519.pub
```

**Copy the entire output** (starts with `ssh-ed25519` and ends with your email)

### Step 4: Add Key to GitHub
1. Go to: https://github.com/settings/keys
2. Click **"New SSH key"**
3. **Title:** "SmartFarm Development" (or any name)
4. **Key type:** Authentication Key
5. **Key:** Paste the entire key you copied
6. Click **"Add SSH key"**

### Step 5: Test Connection
```powershell
ssh -T git@github.com
```

**Expected output:**
```
Hi Warusi2023! You've successfully authenticated, but GitHub does not provide shell access.
```

### Step 6: Push to GitHub
```powershell
git push origin main
```

🎉 **Done!** Your push should work now!

---

## Alternative: Use PowerShell to Copy Key

If `cat` doesn't work, use:
```powershell
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard
```

This copies the key to your clipboard automatically.

---

## Troubleshooting

**If "ls" command doesn't work:**
```powershell
Get-ChildItem ~/.ssh/*.pub
```

**If key generation fails:**
- Make sure you're in PowerShell (not CMD)
- Try: `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

**If still getting "Permission denied":**
- Make sure you copied the **public** key (ends in `.pub`)
- Make sure you added it to GitHub correctly
- Wait a minute after adding to GitHub, then try again



# 🔧 Fix GitHub Push - Step by Step

## The Issue
Your repository is using HTTPS which requires a Personal Access Token. GitHub no longer accepts passwords.

## ✅ EASIEST FIX: Switch to SSH

I've updated your `.git/config` to use SSH. Now follow these steps:

### Step 1: Test SSH Connection
```powershell
ssh -T git@github.com
```

**Expected output:**
- ✅ Success: `Hi Warusi2023! You've successfully authenticated...`
- ❌ Failure: `Permission denied` or connection error

### Step 2A: If SSH Works ✅
```powershell
git push origin main
```
**Done!** Your push should work now.

### Step 2B: If SSH Doesn't Work ❌

You need to set up SSH keys:

1. **Check if you have SSH keys:**
   ```powershell
   ls ~/.ssh/id_*.pub
   ```

2. **If no keys exist, generate one:**
   ```powershell
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Press Enter for all prompts (or set a passphrase)
   ```

3. **Add SSH key to GitHub:**
   ```powershell
   # Copy your public key
   cat ~/.ssh/id_ed25519.pub
   # Copy the entire output
   ```
   
   Then:
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Title: "SmartFarm Development"
   - Paste the key
   - Click "Add SSH key"

4. **Test again:**
   ```powershell
   ssh -T git@github.com
   git push origin main
   ```

---

## 🔄 ALTERNATIVE: Use HTTPS with Token

If you prefer to stay on HTTPS:

### Step 1: Get Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "SmartFarm Push"
4. Select scope: `repo` (check all repo permissions)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Switch Back to HTTPS
```powershell
git remote set-url origin https://github.com/Warusi2023/smartfarm-app.git
```

### Step 3: Clear Old Credentials
```powershell
git credential-manager-core erase
# Then type:
host=github.com
protocol=https
# Press Enter twice
```

### Step 4: Push (will prompt for credentials)
```powershell
git push origin main
```
- Username: Your GitHub username
- Password: **Paste the token** (NOT your GitHub password)

---

## 🎯 Recommended: Use SSH

SSH is:
- ✅ More secure
- ✅ No tokens needed
- ✅ Works forever (no expiration)
- ✅ Already configured in your `.git/config`

Just set up SSH keys once and you're done!

---

## 📋 Quick Commands Summary

**Check current remote:**
```powershell
git remote -v
```

**Switch to SSH (already done in config):**
```powershell
git remote set-url origin git@github.com:Warusi2023/smartfarm-app.git
```

**Switch to HTTPS:**
```powershell
git remote set-url origin https://github.com/Warusi2023/smartfarm-app.git
```

**Test SSH:**
```powershell
ssh -T git@github.com
```

**Push:**
```powershell
git push origin main
```

---

## 🆘 Still Having Issues?

Run the diagnostic script:
```powershell
powershell -ExecutionPolicy Bypass -File fix-github-push.ps1
```

Or check:
- Internet connection
- GitHub status: https://www.githubstatus.com/
- Repository permissions



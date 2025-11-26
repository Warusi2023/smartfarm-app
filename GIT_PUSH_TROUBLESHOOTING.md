# 🔧 Git Push Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: Authentication Failed (Most Common)

**Symptoms:**
- Push fails with "Authentication failed" or "Permission denied"
- Prompt for username/password but password doesn't work

**Solution:**

#### Option A: Use Personal Access Token (HTTPS)
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: "SmartFarm Push"
4. Select scope: `repo` (check all repo permissions)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When pushing, use:
   - Username: Your GitHub username
   - Password: The token (not your GitHub password)

#### Option B: Switch to SSH (Recommended)
```powershell
# Change remote to SSH
git remote set-url origin git@github.com:Warusi2023/smartfarm-app.git

# Test connection
ssh -T git@github.com

# If SSH key not set up, follow: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

### Issue 2: Credential Manager Problems

**Symptoms:**
- Cached wrong credentials
- Keeps asking for password

**Solution:**
```powershell
# Clear cached credentials
git credential-manager-core erase
# Then type:
host=github.com
protocol=https
# Press Enter twice

# Or use Windows Credential Manager:
# 1. Open Control Panel → Credential Manager
# 2. Windows Credentials
# 3. Find github.com entries
# 4. Remove them
```

### Issue 3: Network/Firewall Issues

**Symptoms:**
- Push times out
- Connection refused

**Solution:**
```powershell
# Test connection
git ls-remote origin

# If fails, check:
# 1. Internet connection
# 2. Firewall settings
# 3. Proxy settings (if behind corporate firewall)
# 4. Try different network
```

### Issue 4: Branch Protection Rules

**Symptoms:**
- Push rejected
- "Protected branch" error

**Solution:**
1. Check GitHub repository settings
2. Go to: Settings → Branches → Branch protection rules
3. Either:
   - Disable protection temporarily, OR
   - Use pull requests instead of direct push

### Issue 5: Large Files

**Symptoms:**
- Push fails with file size errors
- Files > 100MB

**Solution:**
```powershell
# Find large files
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | awk '/^blob/ {print substr($0,6)}' | sort --numeric-sort --key=2 | tail -10

# Remove large files from history (use git-filter-repo or BFG Repo-Cleaner)
```

### Issue 6: Repository Out of Sync

**Symptoms:**
- "Updates were rejected"
- "Non-fast-forward" error

**Solution:**
```powershell
# Fetch latest changes
git fetch origin

# Check what's different
git log HEAD..origin/main --oneline

# Option 1: Pull and merge first
git pull origin main
# Then push again

# Option 2: Rebase (if you want linear history)
git pull --rebase origin main
git push origin main

# Option 3: Force push (⚠️ DANGEROUS - only if you're sure)
git push --force origin main
```

## Quick Diagnostic Commands

```powershell
# Check current status
git status

# Check remote configuration
git remote -v

# Check if ahead/behind
git fetch origin
git status

# Check recent commits
git log --oneline -5

# Test remote connection
git ls-remote origin

# See what would be pushed
git log origin/main..HEAD --oneline
```

## Step-by-Step Push Process

```powershell
# 1. Check for uncommitted changes
git status

# 2. If there are changes, commit them
git add .
git commit -m "Your commit message"

# 3. Fetch latest from remote
git fetch origin

# 4. Check if you're ahead
git status

# 5. Push to remote
git push origin main

# 6. If authentication fails, use token or switch to SSH
```

## Using the Diagnostic Scripts

I've created two helper scripts:

### diagnose-git-push.ps1
```powershell
powershell -ExecutionPolicy Bypass -File diagnose-git-push.ps1
```
This will check:
- Git repository status
- Uncommitted changes
- Remote configuration
- Authentication
- Attempt push with verbose output

### fix-git-push.ps1
```powershell
powershell -ExecutionPolicy Bypass -File fix-git-push.ps1
```
This will:
- Check current remote setup
- Offer to switch to SSH
- Attempt push
- Provide manual fix steps if needed

## Current Repository Info

- **Remote URL:** https://github.com/Warusi2023/smartfarm-app.git
- **Branch:** main
- **Repository:** SmartFarm

## Still Having Issues?

1. **Check GitHub Status:** https://www.githubstatus.com/
2. **Verify Repository Access:** Make sure you have push access
3. **Check Branch Name:** Ensure you're pushing to `main` not `master`
4. **Review Error Messages:** Copy the exact error message for troubleshooting

## Prevention Tips

1. **Use SSH instead of HTTPS** (more secure, no token needed)
2. **Set up credential helper** to cache credentials
3. **Regular pulls** to stay in sync
4. **Small, frequent commits** instead of large ones
5. **Test connection** before pushing: `git ls-remote origin`


# 🌐 Netlify Integration Setup Guide

This guide will help you set up automatic Netlify environment variable updates and deployment triggers for your SmartFarm project.

## 🎯 What This Does

The enhanced sync script now automatically:
- ✅ Updates your Netlify environment variables
- ✅ Triggers a new deployment with updated variables
- ✅ Preserves existing variables (won't overwrite them)
- ✅ Provides detailed logging of all operations

## 🔧 Setup Instructions

### Step 1: Get Your Netlify Credentials

#### Get Your Site ID:
1. Go to your Netlify dashboard
2. Select your SmartFarm site
3. Go to **Site Settings** → **General** → **Site Details**
4. Copy your **Site ID** (format: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

#### Create a Personal Access Token:
1. Go to [Netlify Personal Access Tokens](https://app.netlify.com/user/applications#personal-access-tokens)
2. Click **New access token**
3. Give it a name like "SmartFarm Environment Sync"
4. Select scopes: **sites:read** and **sites:write**
5. Click **Generate token**
6. **Copy the token immediately** (you won't see it again!)

### Step 2: Configure Environment Variables

Create a `.env` file in your project root with:

```bash
# Enable Netlify integration
NETLIFY_AUTO_UPDATE=true

# Your Netlify credentials
NETLIFY_SITE_ID=your_actual_site_id_here
NETLIFY_ACCESS_TOKEN=your_actual_access_token_here

# Optional: Custom deployment settings
NETLIFY_DEPLOYMENT_TITLE_PREFIX=SmartFarm Sync
NETLIFY_CLEAR_CACHE=true
```

### Step 3: Test the Integration

Run the sync script to test Netlify integration:

```bash
cd scripts
node sync-env.mjs
```

You should see output like:
```
🌐 Updating Netlify Environment Variables
→ Updating Netlify environment variables...
✅ Updated 6 Netlify environment variables
→ Triggering Netlify deployment...
✅ Triggered Netlify deployment: https://app.netlify.com/sites/your-site/deploys/123456
```

## 🔍 What Variables Get Updated

The script automatically updates these Netlify environment variables:

| Variable | Purpose | Source |
|----------|---------|---------|
| `NODE_ENV` | Environment mode | Frontend config |
| `VITE_API_URL` | Backend API URL | Railway backend URL |
| `VITE_API_BASE_URL` | Alternative API URL | Railway backend URL |
| `VITE_OPENWEATHER_API_KEY` | Weather API key | Your API keys |
| `VITE_MAPS_API_KEY` | Maps API key | Your API keys |
| `VITE_LOG_LEVEL` | Logging level | Configuration |

## 🛡️ Security Best Practices

### Environment Variable Security:
- ✅ Never commit `.env` files to version control
- ✅ Use strong, unique access tokens
- ✅ Rotate tokens regularly
- ✅ Use least-privilege scopes (sites:read, sites:write only)

### Token Management:
- ✅ Store tokens securely (use environment variables)
- ✅ Monitor token usage in Netlify dashboard
- ✅ Revoke unused tokens immediately

## 🚨 Troubleshooting

### Common Issues:

#### "Netlify integration disabled or credentials missing"
- **Cause**: Missing or invalid credentials
- **Fix**: Check your `NETLIFY_SITE_ID` and `NETLIFY_ACCESS_TOKEN`

#### "Failed to get Netlify env vars: 401"
- **Cause**: Invalid access token
- **Fix**: Generate a new token with correct scopes

#### "Failed to get Netlify env vars: 404"
- **Cause**: Invalid site ID
- **Fix**: Verify your site ID in Netlify dashboard

#### "Failed to trigger Netlify deployment: 422"
- **Cause**: Invalid deployment data
- **Fix**: Check your site configuration and permissions

### Debug Mode:

Enable debug logging by setting:
```bash
DEBUG=true
```

This will show detailed API requests and responses.

## 🔄 Workflow Integration

### Automated Deployment Pipeline:

1. **Development**: Make changes to environment variables
2. **Sync**: Run `node scripts/sync-env.mjs`
3. **Railway**: Backend variables updated automatically
4. **Netlify**: Frontend variables updated and deployment triggered
5. **Result**: Both services redeploy with synchronized variables

### CI/CD Integration:

Add to your GitHub Actions or CI pipeline:

```yaml
- name: Sync Environment Variables
  run: |
    cd scripts
    NETLIFY_AUTO_UPDATE=true \
    NETLIFY_SITE_ID=${{ secrets.NETLIFY_SITE_ID }} \
    NETLIFY_ACCESS_TOKEN=${{ secrets.NETLIFY_ACCESS_TOKEN }} \
    node sync-env.mjs
```

## 📊 Monitoring

### Check Deployment Status:
1. Go to your Netlify dashboard
2. Click on your site
3. Go to **Deploys** tab
4. Look for deployments with title "Environment sync - [timestamp]"

### Monitor Environment Variables:
1. Go to **Site Settings** → **Environment Variables**
2. Verify all variables are set correctly
3. Check variable scopes (should be "builds, functions, runtime")

## 🎉 Success Indicators

You'll know the integration is working when:

- ✅ Script shows "Updated X Netlify environment variables"
- ✅ Script shows "Triggered Netlify deployment"
- ✅ New deployment appears in Netlify dashboard
- ✅ Deployment completes successfully
- ✅ Your frontend connects to the backend API

## 🔗 Related Files

- `scripts/sync-env.mjs` - Main synchronization script
- `scripts/netlify-config.env` - Configuration template
- `scripts/NETLIFY_INTEGRATION_SETUP.md` - This setup guide
- `web-project/.env.production` - Generated frontend variables

---

**Need Help?** Check the [Netlify API Documentation](https://docs.netlify.com/api/get-started/) or open an issue in your repository.

# Netlify Environment Variables Configuration

## Required Environment Variables for SmartFarm

To ensure Netlify deployment matches Railway backend and GitHub configuration, set these environment variables in your Netlify dashboard:

### API Configuration
```
VITE_API_URL=https://smartfarm-app-production.up.railway.app
```

### Build Configuration
```
APP_BUILD_TAG=netlify
CI=true
HUSKY=0
NODE_VERSION=18
```

### Application Configuration
```
VITE_APP_NAME=SmartFarm
VITE_APP_VERSION=1.0.0
```

## How to Set Environment Variables in Netlify

1. **Go to Netlify Dashboard**: https://app.netlify.com
2. **Select your SmartFarm project**
3. **Go to Site Settings → Environment Variables**
4. **Add each variable** with the values listed above
5. **Save the changes**

## Alternative: Use netlify.toml

All environment variables are already configured in the `netlify.toml` files:

- `netlify.toml` (root)
- `web-project/netlify.toml`
- `netlify-deploy/netlify.toml`
- `web-project/netlify-deploy/netlify.toml`
- `web-project/netlify-build.toml`

## Verification

After setting environment variables:

1. **Trigger a new deployment** from Netlify dashboard
2. **Check build logs** to ensure variables are loaded
3. **Test API connectivity** on the deployed site
4. **Verify dashboard functionality**

## Troubleshooting

If API calls still fail:

1. **Check browser console** for CORS errors
2. **Verify Railway backend** is running at `https://smartfarm-app-production.up.railway.app`
3. **Test API endpoint** directly: `https://smartfarm-app-production.up.railway.app/api/health`
4. **Clear browser cache** and refresh the page

## API Redirects

Netlify is configured with API redirects to proxy requests to Railway:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://smartfarm-app-production.up.railway.app/api/:splat"
  status = 200
  force = true
  headers = {X-From = "Netlify Edge"}
```

This ensures that frontend API calls work seamlessly with the Railway backend.

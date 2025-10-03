# Netlify Deployment Configuration

## Environment Variables to Add in Netlify Dashboard

Go to your Netlify site → Site Settings → Environment Variables and add:

### Required Variables

```env
VITE_API_BASE_URL=https://smartfarm-backend.railway.app
NEXT_PUBLIC_API_BASE_URL=https://smartfarm-backend.railway.app
VITE_WEATHER_API_KEY=your_openweather_api_key_here
```

### Optional Variables

```env
NODE_ENV=production
VITE_DEBUG=false
VITE_ENABLE_WEATHER=true
VITE_ENABLE_AI_ADVISORY=true
VITE_ENABLE_NOTIFICATIONS=true
```

## Steps to Configure

1. **Login to Netlify Dashboard**
   - Go to https://app.netlify.com
   - Select your SmartFarm site

2. **Navigate to Environment Variables**
   - Go to Site Settings → Environment Variables
   - Click "Add Variable"

3. **Add Each Variable**
   - Key: `VITE_API_BASE_URL`
   - Value: `https://smartfarm-backend.railway.app`
   - Click "Save"

   - Key: `NEXT_PUBLIC_API_BASE_URL`
   - Value: `https://smartfarm-backend.railway.app`
   - Click "Save"

   - Key: `VITE_WEATHER_API_KEY`
   - Value: `your_actual_openweather_api_key`
   - Click "Save"

4. **Redeploy Site**
   - Go to Deploys tab
   - Click "Trigger deploy" → "Deploy site"

## Verification

After deployment, test the connection:

1. **Open your Netlify site**
2. **Go to Livestock Management page**
3. **Try adding a new animal**
4. **Check browser console for errors**
5. **Verify data persists after refresh**

## Expected Results

- ✅ No CORS errors in console
- ✅ No CSP violations
- ✅ Livestock data persists after refresh
- ✅ Weather service loads without errors
- ✅ API calls succeed

## Troubleshooting

If you encounter issues:

1. **Check Environment Variables**
   - Ensure all variables are set correctly
   - Check for typos in variable names

2. **Verify Railway Backend**
   - Test: `https://smartfarm-backend.railway.app/api/health`
   - Should return: `{"message": "OK"}`

3. **Check Browser Console**
   - Look for specific error messages
   - Check Network tab for failed requests

4. **Redeploy Site**
   - Environment variables only apply after redeploy
   - Go to Deploys → Trigger deploy

## Support

If problems persist:
- Check Railway backend logs
- Verify CORS configuration
- Test API endpoints directly
- Review browser console errors

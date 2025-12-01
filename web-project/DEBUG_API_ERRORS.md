# Debugging API Call Failures - Step-by-Step Guide

This guide provides clear, repeatable steps to debug "API call failed" errors in the SmartFarm web application.

## Quick Start

When you see "API call failed" or any API-related error in the browser:

1. **Open DevTools** (F12 or Ctrl+Shift+I / Cmd+Opt+I)
2. **Check Console tab** for error messages
3. **Check Network tab** for failed requests
4. **Copy the details** below and share for debugging

---

## Step 1: Open DevTools on the Failing Page

### Run the app
- Start your local dev server: `cd web-project && npm run dev`
- Or open the deployed site: `https://smartfarm-app.com` (or your Netlify URL)

### In the browser, open the page where the error appears
- Navigate to the page showing "API call failed" or any error

### Press F12 (or Ctrl+Shift+I / Cmd+Opt+I) to open DevTools
- DevTools will open at the bottom or side of the browser
- You should see tabs: **Console**, **Network**, **Elements**, etc.

---

## Step 2: Capture Which File/Line is Failing

### Go to the Console tab
- Click the **Console** tab in DevTools
- You should see error messages (usually in red)

### Find the red error message
- Look for messages like:
  - `❌ API call failed`
  - `Failed to fetch`
  - `CORS policy blocked`
  - `NetworkError`
  - `TypeError: Failed to fetch`

### On the right side, note the file:line info
- Example formats:
  - `api-service.js:123`
  - `dashboard.html:4567`
  - `main-abc123.js:789`
  - `SomePage.tsx:47`

### Copy these details:
1. **The page URL** from the address bar (e.g., `https://smartfarm-app.com/dashboard.html`)
2. **The exact error text** (copy the full error message)
3. **The file name and line number** shown next to the error (e.g., `api-service.js:123`)

---

## Step 3: Check if it is a CORS / API Issue

### Still in DevTools, go to the Network tab
- Click the **Network** tab
- You'll see a list of network requests

### Reload the page
- Press **F5** or **Ctrl+R** (Cmd+R on Mac) to reload
- Watch the Network tab populate with requests

### Filter by fetch / xhr or search for your API path
- In the filter box, type: `/api` or `/auth` or your API endpoint
- Or use the filter buttons: **Fetch/XHR** to show only API calls

### Click the failed request (red or status shows "failed")
- Failed requests are usually:
  - **Red** in color
  - Show status: `(failed)` or `CORS error` or `404` or `500`
- Click on the failed request to see details

### In the Headers panel, copy:

#### Request Headers:
- **Request URL** (full URL being called)
- **Origin** header (under Request Headers)
- **Method** (GET, POST, etc.)

#### Response Headers:
- **Status code** (200, 404, 500, CORS error, etc.)
- **Access-Control-Allow-Origin** (if present)
- **Access-Control-Allow-Methods** (if present)
- **Access-Control-Allow-Headers** (if present)
- **Any error message** in the Response tab

---

## Step 4: Send This Back for Help

When reporting the issue, include:

### From Console Tab:
1. **Page URL**: `https://smartfarm-app.com/dashboard.html`
2. **File name + line number**: `api-service.js:123`
3. **Full error message text**: 
   ```
   ❌ API call failed: Failed to fetch
   TypeError: Failed to fetch
   ```

### From Network Tab:
4. **Request URL**: `https://smartfarm-app-production.up.railway.app/api/dashboard`
5. **Status code**: `CORS error` or `404` or `500` or `(failed)`
6. **Origin header** (Request Headers): `https://smartfarm-app.com`
7. **Access-Control-Allow-Origin** (Response Headers): `null` or missing or `https://smartfarm-app.com`
8. **Response body** (if available): Any error message from the server

---

## Common Error Patterns

### Pattern 1: CORS Error
```
Console: "Access to fetch at 'https://smartfarm-app-production.up.railway.app/api/...' 
         from origin 'https://smartfarm-app.com' has been blocked by CORS policy"
Network: Status shows "CORS error" or "(failed)"
Solution: Add the frontend domain to backend CORS allowed origins
```

### Pattern 2: Network Error
```
Console: "Failed to fetch" or "NetworkError"
Network: Status shows "(failed)" or "net::ERR_FAILED"
Solution: Check if backend is running, check network connectivity
```

### Pattern 3: 404 Not Found
```
Console: "HTTP 404: Not Found"
Network: Status shows "404"
Solution: Check API endpoint URL is correct
```

### Pattern 4: 500 Server Error
```
Console: "HTTP 500: Internal Server Error"
Network: Status shows "500"
Solution: Check backend server logs for errors
```

### Pattern 5: 401 Unauthorized
```
Console: "HTTP 401: Unauthorized"
Network: Status shows "401"
Solution: Check authentication token is valid and included in request
```

---

## Quick Checklist

Before reporting, verify:

- [ ] Backend is running: `curl https://smartfarm-app-production.up.railway.app/api/health`
- [ ] Frontend domain matches backend CORS allowed origins
- [ ] API URL is correct (check `web-project/public/js/api-config.js`)
- [ ] Browser cache is cleared (Ctrl+Shift+Delete)
- [ ] Network tab shows the actual failed request
- [ ] Console shows the exact error message
- [ ] Request headers include correct `Origin`
- [ ] Response headers show CORS headers (if CORS issue)

---

## Example Debug Output

Here's what a complete debug report looks like:

```
=== CONSOLE TAB ===
Page URL: https://smartfarm-app.com/dashboard.html
File: api-service.js:123
Error: Failed to fetch
TypeError: Failed to fetch
    at SmartFarmAPIService.request (api-service.js:123:15)

=== NETWORK TAB ===
Request URL: https://smartfarm-app-production.up.railway.app/api/dashboard
Status: (failed) / CORS error
Method: GET

Request Headers:
  Origin: https://smartfarm-app.com
  Accept: application/json

Response Headers:
  (none - request failed before response)

Response:
  (empty - request failed)
```

---

## Next Steps After Collecting Info

1. **Check backend CORS configuration** (`backend/server.js`)
2. **Verify API endpoint exists** (`backend/routes/`)
3. **Check frontend API configuration** (`web-project/public/js/api-config.js`)
4. **Review backend logs** for server-side errors
5. **Test API directly** with `curl` or Postman

---

## Additional Resources

- **Backend CORS config**: `backend/server.js` (lines 10-60)
- **Frontend API config**: `web-project/public/js/api-config.js`
- **API Service**: `web-project/public/js/api-service.js`
- **Health check**: `https://smartfarm-app-production.up.railway.app/api/health`

---

**Last Updated**: 2025-01-27
**Maintained by**: SmartFarm Development Team


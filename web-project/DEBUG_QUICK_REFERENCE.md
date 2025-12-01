# Quick Debug Reference - Copy This When Reporting Errors

## 🔍 Steps to Debug API Errors

### 1. Open DevTools (F12)
- Go to **Console** tab → Find red error
- Copy: **Page URL**, **File:Line**, **Error message**

### 2. Check Network Tab
- Reload page (F5)
- Filter by `/api` or click failed request (red)
- Copy: **Request URL**, **Status**, **Origin** (Request Headers), **CORS headers** (Response Headers)

### 3. Report With:
```
Page URL: [paste URL]
Console Error: [paste error from Console tab]
File/Line: [paste file:line from Console]
Network Request URL: [paste from Network tab]
Status: [paste status code]
Origin: [paste from Request Headers]
CORS Headers: [paste Access-Control-Allow-* from Response Headers]
```

---

## ✅ Quick Checks Before Reporting

- [ ] Backend health: `curl https://smartfarm-app-production.up.railway.app/api/health`
- [ ] Frontend domain in backend CORS allowed origins
- [ ] Browser cache cleared
- [ ] Network tab shows failed request
- [ ] Console shows exact error

---

## 🐛 Common Errors

| Error | Console Message | Network Status | Fix |
|-------|----------------|----------------|-----|
| **CORS** | "blocked by CORS policy" | CORS error | Add domain to backend CORS |
| **Network** | "Failed to fetch" | (failed) | Check backend running |
| **404** | "HTTP 404" | 404 | Check API endpoint URL |
| **500** | "HTTP 500" | 500 | Check backend logs |
| **401** | "HTTP 401" | 401 | Check auth token |

---

**Full Guide**: See `DEBUG_API_ERRORS.md` for detailed steps.


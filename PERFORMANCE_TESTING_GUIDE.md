# ⚡ Performance Testing Guide

**Complete guide to test and optimize SmartFarm performance**

---

## 📋 **Overview**

This guide helps you test and optimize SmartFarm performance to ensure fast load times and smooth user experience.

**Performance Targets:**
- Page load times < 3 seconds
- API response times < 2 seconds
- Lighthouse score 80+
- Smooth performance on slow networks

---

## 🎯 **Performance Testing Checklist**

### ✅ **Page Load Times**

**Target:** < 3 seconds for initial load, < 2 seconds for subsequent loads

**How to Test:**
1. Open Chrome DevTools (F12)
2. Go to **Network** tab
3. Check **"Disable cache"** checkbox
4. Reload page (Ctrl+Shift+R)
5. Check **Load time** in Network tab
6. Verify it's under 3 seconds

**What to Check:**
- [ ] Initial page load < 3 seconds
- [ ] Subsequent page loads < 2 seconds
- [ ] No slow-loading resources
- [ ] Images are optimized
- [ ] CSS/JS files are minified

---

### ✅ **API Response Times**

**Target:** < 2 seconds for all API calls

**How to Test:**
1. Open Chrome DevTools → **Network** tab
2. Filter by **XHR** or **Fetch**
3. Perform actions that trigger API calls
4. Check response times for each API call
5. Verify all are under 2 seconds

**Or Use Performance Script:**
```bash
cd backend
API_URL=https://your-backend.railway.app node ../scripts/performance-test.js
```

**What to Check:**
- [ ] Health check endpoint < 500ms
- [ ] Authentication endpoints < 1 second
- [ ] Data fetching endpoints < 2 seconds
- [ ] No timeout errors
- [ ] No slow endpoints

---

### ✅ **Lighthouse Audit**

**Target:** Score 80+ for all categories

**How to Run:**
1. Open Chrome DevTools (F12)
2. Go to **Lighthouse** tab
3. Select categories:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
4. Select device: **Desktop** or **Mobile**
5. Click **"Analyze page load"**
6. Wait for audit to complete
7. Review scores and recommendations

**What to Check:**
- [ ] Performance score: 80+
- [ ] Accessibility score: 80+
- [ ] Best Practices score: 80+
- [ ] SEO score: 80+
- [ ] Review and fix critical issues

**Common Issues & Fixes:**
- **Large images:** Optimize images, use WebP format
- **Unused CSS/JS:** Remove unused code, code splitting
- **Slow server response:** Optimize backend, add caching
- **Blocking resources:** Defer non-critical resources
- **Missing meta tags:** Add proper meta tags for SEO

---

### ✅ **Slow Network Testing**

**Target:** Site works on slow networks (3G)

**How to Test:**
1. Open Chrome DevTools → **Network** tab
2. Click throttling dropdown (default: "No throttling")
3. Select **"Slow 3G"** or **"Fast 3G"**
4. Reload page
5. Verify site still works

**What to Check:**
- [ ] Site loads on slow network
- [ ] Loading states display correctly
- [ ] No broken functionality
- [ ] Error handling works
- [ ] User experience is acceptable

---

### ✅ **Memory Usage**

**Target:** No memory leaks, reasonable memory usage

**How to Test:**
1. Open Chrome DevTools → **Performance** tab
2. Click **"Record"** button
3. Navigate through site (use various features)
4. Click **"Stop"** button
5. Check memory usage graph
6. Look for memory leaks (increasing memory over time)

**What to Check:**
- [ ] Memory usage is stable
- [ ] No memory leaks
- [ ] Memory usage is reasonable
- [ ] No excessive memory consumption

---

## 🔧 **Performance Optimization Tips**

### **Frontend Optimization**

1. **Optimize Images**
   - Use WebP format
   - Compress images
   - Use appropriate sizes
   - Lazy load images

2. **Minify CSS/JS**
   - Minify production builds
   - Remove unused code
   - Use code splitting

3. **Enable Caching**
   - Set cache headers
   - Use service workers (if applicable)
   - Cache static assets

4. **Optimize Fonts**
   - Use web fonts efficiently
   - Preload critical fonts
   - Use font-display: swap

### **Backend Optimization**

1. **Database Optimization**
   - Add indexes for frequently queried fields
   - Optimize queries
   - Use connection pooling

2. **API Optimization**
   - Add response caching
   - Implement pagination
   - Compress responses (gzip)

3. **Server Optimization**
   - Enable compression
   - Use CDN for static assets
   - Optimize server response times

---

## 📊 **Performance Metrics**

### **Key Metrics to Monitor**

1. **Time to First Byte (TTFB)**
   - Target: < 200ms
   - Measures server response time

2. **First Contentful Paint (FCP)**
   - Target: < 1.8 seconds
   - Measures when content first appears

3. **Largest Contentful Paint (LCP)**
   - Target: < 2.5 seconds
   - Measures when main content loads

4. **Time to Interactive (TTI)**
   - Target: < 3.8 seconds
   - Measures when page is interactive

5. **Total Blocking Time (TBT)**
   - Target: < 200ms
   - Measures main thread blocking

---

## 🧪 **Performance Testing Script**

Use the provided script to test API performance:

```bash
# Set API URL (optional, defaults to Railway URL)
export API_URL=https://your-backend.railway.app

# Run performance tests
cd backend
node ../scripts/performance-test.js
```

**Script Tests:**
- Health check endpoint
- Authentication endpoints
- Response times
- Success rates

### ⚠️ **Known Script Interpretation Limits**

When using `scripts/performance-test.js`, interpret results carefully:

- The script sends `POST` requests to auth endpoints without full credential payloads.
- `400` responses on auth endpoints can indicate invalid/missing request body, not necessarily backend performance failure.
- Treat these as **test-input limitations** unless you also observe:
  - timeouts,
  - repeated `5xx` errors,
  - or slow responses above threshold on valid, non-auth endpoints.

For launch decisions, combine script output with:
- browser-based auth flow timing in staging,
- and network-tab timings for real login/register requests.

---

## ✅ **Performance Checklist Summary**

- [ ] Page load times < 3 seconds
- [ ] API response times < 2 seconds
- [ ] Lighthouse score 80+
- [ ] Works on slow network (3G)
- [ ] No memory leaks
- [ ] Images optimized
- [ ] CSS/JS minified
- [ ] Caching enabled
- [ ] Database queries optimized
- [ ] API responses cached

---

## 📚 **Additional Resources**

- **Lighthouse:** https://developers.google.com/web/tools/lighthouse
- **Web.dev Performance:** https://web.dev/performance/
- **Chrome DevTools:** https://developer.chrome.com/docs/devtools/

---

**Last Updated:** January 2025

# ⚡ Performance Optimization Guide

**Complete guide to optimize SmartFarm performance**

**Estimated Time:** 1 hour (optional)

---

## 📋 **Overview**

This guide helps you optimize SmartFarm performance for faster load times and better user experience.

**Performance Targets:**
- Page load times < 3 seconds
- API response times < 2 seconds
- Lighthouse score 80+
- Optimized images and assets

---

## ✅ **Performance Optimization Checklist**

### **1. Enable Gzip/Brotli Compression**

#### **Status:** ✅ Netlify handles automatically

- [ ] **Verify compression is enabled:**
  - Netlify automatically enables gzip/brotli compression
  - No action needed
  - Check in DevTools → Network → Response Headers:
    - Should see: `content-encoding: gzip` or `br`

#### **Manual Verification:**

1. Open DevTools → Network tab
2. Reload page
3. Click on a JavaScript/CSS file
4. Check **Response Headers**
5. Look for: `content-encoding: gzip` or `br`

**Expected:** Compression is automatic on Netlify ✅

---

### **2. Optimize Images**

#### **2.1 Convert Images to WebP**

- [ ] **Identify large images:**
  - Check `web-project/public/images/` directory
  - Find images > 100KB
  - List images that need optimization

- [ ] **Convert to WebP format:**
  - Use online tool: https://cloudconvert.com/webp-converter
  - Or use command line: `cwebp input.jpg -q 80 -o output.webp`
  - Or use npm package: `npm install -g webp-converter`

- [ ] **Update image references:**
  - Replace `.jpg`/`.png` with `.webp` in HTML/CSS
  - Add fallback for older browsers:
    ```html
    <picture>
      <source srcset="image.webp" type="image/webp">
      <img src="image.jpg" alt="Description">
    </picture>
    ```

#### **2.2 Implement Lazy Loading**

- [ ] **Add lazy loading to images:**
  - Update `<img>` tags to include `loading="lazy"`
  - Example:
    ```html
    <img src="image.jpg" alt="Description" loading="lazy">
    ```

- [ ] **For background images:**
  - Use CSS `loading="lazy"` attribute
  - Or use Intersection Observer API

#### **2.3 Image Optimization Checklist**

- [ ] Large images converted to WebP
- [ ] Images compressed (quality 80-85%)
- [ ] Lazy loading implemented
- [ ] Responsive images (srcset) used
- [ ] Image dimensions specified (prevents layout shift)

---

### **3. Minify CSS/JS**

#### **Status:** ✅ Build process handles automatically

- [ ] **Verify minification:**
  - Vite automatically minifies CSS/JS in production builds
  - Check `web-project/dist/` after build
  - Files should be minified (no whitespace, single line)

#### **Build Process:**

```bash
cd web-project
npm run build
```

**Vite automatically:**
- ✅ Minifies JavaScript
- ✅ Minifies CSS
- ✅ Tree-shakes unused code
- ✅ Code splitting
- ✅ Asset optimization

**No action needed** - Vite handles this ✅

---

### **4. Enable Browser Caching Headers**

#### **4.1 Configure Netlify Headers**

- [ ] **Update `netlify.toml` or `_headers` file:**

**Option A: Add to `netlify.toml`:**

```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.jpg"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/*.webp"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

**Option B: Update `web-project/public/_headers`:**

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=31536000

/*.png
  Cache-Control: public, max-age=31536000

/*.webp
  Cache-Control: public, max-age=31536000

/index.html
  Cache-Control: public, max-age=0, must-revalidate
```

- [ ] **Redeploy frontend:**
  - Commit changes
  - Netlify will auto-deploy
  - Or trigger manual deploy

- [ ] **Verify caching headers:**
  - Open DevTools → Network tab
  - Reload page
  - Check Response Headers for `Cache-Control`
  - Verify headers are set correctly

---

### **5. Add Database Indexes**

#### **5.1 Identify Frequently Queried Fields**

Common fields that should be indexed:
- `users.email` (for login lookups)
- `users.id` (primary key - usually auto-indexed)
- `farms.user_id` (for user's farms)
- `crops.farm_id` (for farm's crops)
- `livestock.farm_id` (for farm's livestock)
- `created_at` / `updated_at` (for sorting/filtering)

#### **5.2 Create Index Migration**

**Create `backend/migrations/add-performance-indexes.sql`:**

```sql
-- User email index (for login lookups)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Farm user_id index (for user's farms)
CREATE INDEX IF NOT EXISTS idx_farms_user_id ON farms(user_id);

-- Crop farm_id index (for farm's crops)
CREATE INDEX IF NOT EXISTS idx_crops_farm_id ON crops(farm_id);

-- Livestock farm_id index (for farm's livestock)
CREATE INDEX IF NOT EXISTS idx_livestock_farm_id ON livestock(farm_id);

-- Created_at indexes (for sorting)
CREATE INDEX IF NOT EXISTS idx_farms_created_at ON farms(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crops_created_at ON crops(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_livestock_created_at ON livestock(created_at DESC);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_farms_user_created ON farms(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crops_farm_created ON crops(farm_id, created_at DESC);
```

#### **5.3 Run Migration**

**Option A: Via Railway Database Dashboard**

1. Go to Railway Dashboard → PostgreSQL Service
2. Click **"Query"** or **"Data"** tab
3. Run the SQL script above
4. Verify indexes created

**Option B: Via Migration Script**

```bash
cd backend
# Create migration script if doesn't exist
node scripts/run-migration.js add-performance-indexes.sql
```

#### **5.4 Verify Indexes**

**Check indexes exist:**

```sql
-- List all indexes
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

---

### **6. Implement API Response Caching**

#### **Status:** ✅ Already implemented

- [ ] **Verify caching is working:**
  - Check `backend/middleware/cache-middleware.js` exists ✅
  - Check endpoints use `cacheMiddleware` ✅
  - Examples found:
    - `/api/farms` uses caching
    - `/api/crops` uses caching
    - `/api/livestock` uses caching

#### **6.1 Verify Cache Configuration**

- [ ] **Check cache TTL settings:**
  - Review `backend/config/cache-config.js`
  - Verify TTL values are appropriate
  - Adjust if needed

#### **6.2 Test Caching**

- [ ] **Test cache hit:**
  1. Make API request: `GET /api/farms`
  2. Check response time (should be fast)
  3. Make same request again
  4. Check Railway logs for "Cache hit" message

- [ ] **Test cache invalidation:**
  1. Create new farm: `POST /api/farms`
  2. Check cache is invalidated
  3. Verify fresh data is returned

**No action needed** - Caching already implemented ✅

---

## 🔧 **Additional Optimizations**

### **7. Code Splitting**

#### **Status:** ✅ Vite handles automatically

- [ ] **Verify code splitting:**
  - Vite automatically splits code
  - Check `web-project/dist/assets/` after build
  - Should see multiple JS chunks

**No action needed** - Vite handles this ✅

### **8. Preload Critical Resources**

- [ ] **Add preload links to `index.html`:**
  ```html
  <!-- Preload critical CSS -->
  <link rel="preload" href="/assets/main.css" as="style">
  
  <!-- Preload critical fonts -->
  <link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossorigin>
  ```

### **9. Service Worker (PWA)**

- [ ] **Consider adding service worker:**
  - Enables offline functionality
  - Caches assets for faster loads
  - See `web-project/public/sw.js` (may already exist)

---

## 📊 **Performance Metrics**

### **Before Optimization**

Run Lighthouse audit and note:
- Performance score: _____
- First Contentful Paint: _____
- Largest Contentful Paint: _____
- Time to Interactive: _____

### **After Optimization**

Run Lighthouse audit again and compare:
- Performance score: _____ (should improve)
- First Contentful Paint: _____ (should decrease)
- Largest Contentful Paint: _____ (should decrease)
- Time to Interactive: _____ (should decrease)

---

## 🧪 **Testing Performance**

### **Run Lighthouse Audit**

1. Open Chrome DevTools → **Lighthouse** tab
2. Select **Performance** category
3. Click **"Analyze page load"**
4. Review recommendations
5. Implement fixes

### **Test with Network Throttling**

1. DevTools → Network tab
2. Throttle to **"Slow 3G"**
3. Reload page
4. Verify site still works
5. Check load times

### **Use Performance Script**

```bash
cd backend
node ../scripts/performance-test.js
```

---

## ✅ **Optimization Checklist Summary**

- [ ] Gzip/Brotli compression enabled (Netlify automatic) ✅
- [ ] Images optimized (WebP, lazy loading)
- [ ] CSS/JS minified (Vite automatic) ✅
- [ ] Browser caching headers configured
- [ ] Database indexes added
- [ ] API response caching implemented ✅

---

## 🎯 **Priority Order**

**High Priority (Do First):**
1. ✅ Enable compression (automatic)
2. ✅ Minify CSS/JS (automatic)
3. ✅ API caching (already done)
4. ⚠️ Add database indexes
5. ⚠️ Configure browser caching headers

**Medium Priority:**
6. ⚠️ Optimize images (WebP, lazy loading)

**Low Priority:**
7. ⚠️ Preload critical resources
8. ⚠️ Service worker (if PWA needed)

---

## 📚 **Additional Resources**

- **Vite Performance:** https://vitejs.dev/guide/performance.html
- **Web.dev Performance:** https://web.dev/performance/
- **Lighthouse:** https://developers.google.com/web/tools/lighthouse
- **Image Optimization:** https://web.dev/fast/#optimize-your-images

---

**Last Updated:** January 2025

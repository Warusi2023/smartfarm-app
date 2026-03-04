# 📊 Analytics Setup Guide

**Complete guide to set up analytics for SmartFarm (Google Analytics or Plausible)**

**Estimated Time:** 15 minutes

---

## 📋 **Overview**

Analytics helps you understand how users interact with your SmartFarm application. This guide covers two options:

1. **Google Analytics** - Industry standard, comprehensive analytics
2. **Plausible Analytics** - Privacy-friendly, GDPR compliant alternative

**Both are optional** - choose based on your needs and privacy preferences.

---

## 🔵 **Option 1: Google Analytics Setup**

### ✅ **Step 1: Create Google Analytics Account**

- [ ] Go to https://analytics.google.com/
- [ ] Sign in with your Google account
- [ ] Click **"Start measuring"** or **"Admin"** → **"Create Account"**
- [ ] Enter account name: `SmartFarm`
- [ ] Configure account settings:
  - Account name: `SmartFarm`
  - Country: Your country
  - Currency: Your currency
- [ ] Click **"Next"**

### ✅ **Step 2: Create Property**

- [ ] Property name: `SmartFarm Web`
- [ ] Reporting time zone: Your timezone
- [ ] Currency: Your currency
- [ ] Click **"Next"**

### ✅ **Step 3: Configure Business Information**

- [ ] Industry category: Select appropriate category (e.g., "Technology")
- [ ] Business size: Select appropriate size
- [ ] How you intend to use Google Analytics: Select options
- [ ] Click **"Create"**

### ✅ **Step 4: Accept Terms**

- [ ] Review Google Analytics Terms of Service
- [ ] Accept terms and conditions
- [ ] Click **"I Accept"**

### ✅ **Step 5: Get Measurement ID**

- [ ] After creating property, you'll see **"Data Streams"**
- [ ] Click **"Add stream"** → **"Web"**
- [ ] Enter:
  - Website URL: `https://your-site.netlify.app`
  - Stream name: `SmartFarm Production`
- [ ] Click **"Create stream"**
- [ ] Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)
- [ ] **Save this Measurement ID** - you'll need it!

### ✅ **Step 6: Add to Netlify Variables**

- [ ] Go to Netlify Dashboard → Your Site → **"Site settings"**
- [ ] Click **"Environment variables"**
- [ ] Click **"Add a variable"**
- [ ] Add:
  - **Variable name:** `VITE_GA_MEASUREMENT_ID`
  - **Value:** Your Measurement ID (e.g., `G-XXXXXXXXXX`)
  - **Scope:** All scopes (or Production)
- [ ] Click **"Add variable"**

### ✅ **Step 7: Add Google Analytics Script to Frontend**

#### Option A: Add to `index.html` (Recommended)

**Find `web-project/public/index.html` and add before closing `</head>` tag:**

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    page_path: window.location.pathname,
  });
</script>
```

**Or use environment variable:**

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=%VITE_GA_MEASUREMENT_ID%"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (gaId) {
    gtag('config', gaId, {
      page_path: window.location.pathname,
    });
  }
</script>
```

#### Option B: Add via JavaScript Module

**Create `web-project/src/analytics.js`:**

```javascript
// Google Analytics initialization
export function initGoogleAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!measurementId) {
    console.warn('Google Analytics Measurement ID not set');
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', measurementId, {
    page_path: window.location.pathname,
  });

  console.log('✅ Google Analytics initialized');
}

// Track page views
export function trackPageView(path) {
  if (window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
}

// Track events
export function trackEvent(eventName, eventParams = {}) {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}
```

**Then import in `main.jsx`:**

```javascript
import { initGoogleAnalytics } from './analytics';

// Initialize analytics
initGoogleAnalytics();
```

### ✅ **Step 8: Redeploy Frontend**

- [ ] Commit changes (if modified locally)
- [ ] Netlify will auto-deploy, or trigger manual deploy:
  - Netlify Dashboard → **"Deploys"** → **"Trigger deploy"** → **"Deploy site"**
- [ ] Wait for deployment to complete

### ✅ **Step 9: Test Tracking**

- [ ] Visit your Netlify site
- [ ] Open DevTools → **Network** tab
- [ ] Filter by **"gtag"** or **"analytics"**
- [ ] Navigate through your site
- [ ] Verify requests are sent to Google Analytics
- [ ] Go to Google Analytics Dashboard → **"Realtime"**
- [ ] Verify you see your visit in real-time

---

## 🟢 **Option 2: Plausible Analytics Setup (Privacy-Friendly)**

### ✅ **Step 1: Create Plausible Account**

- [ ] Go to https://plausible.io/
- [ ] Click **"Start free trial"** or **"Sign up"**
- [ ] Enter your email address
- [ ] Create password
- [ ] Verify your email address

### ✅ **Step 2: Add Domain**

- [ ] After logging in, click **"Add website"**
- [ ] Enter domain: `your-site.netlify.app`
- [ ] Click **"Add domain"**
- [ ] Copy the **script code** provided
- [ ] **Save this script code** - you'll need it!

**Example script:**
```html
<script defer data-domain="your-site.netlify.app" src="https://plausible.io/js/script.js"></script>
```

### ✅ **Step 3: Add Script to `index.html`**

**Find `web-project/public/index.html` and add before closing `</head>` tag:**

```html
<!-- Plausible Analytics -->
<script defer data-domain="your-site.netlify.app" src="https://plausible.io/js/script.js"></script>
```

**Replace `your-site.netlify.app` with your actual Netlify domain.**

### ✅ **Step 4: Verify Domain (Optional)**

- [ ] Plausible may ask you to verify domain ownership
- [ ] Add verification code to your site (if required)
- [ ] Or use DNS verification (if using custom domain)

### ✅ **Step 5: Redeploy Frontend**

- [ ] Commit changes (if modified locally)
- [ ] Netlify will auto-deploy, or trigger manual deploy
- [ ] Wait for deployment to complete

### ✅ **Step 6: Test Tracking**

- [ ] Visit your Netlify site
- [ ] Open DevTools → **Network** tab
- [ ] Filter by **"plausible"**
- [ ] Navigate through your site
- [ ] Verify requests are sent to Plausible
- [ ] Go to Plausible Dashboard
- [ ] Verify you see your visit (may take a few minutes)

---

## 🔍 **Comparison: Google Analytics vs Plausible**

| Feature | Google Analytics | Plausible Analytics |
|---------|----------------|-------------------|
| **Cost** | Free (with limits) | Paid (€9/month) |
| **Privacy** | Collects user data | Privacy-friendly, GDPR compliant |
| **Features** | Comprehensive | Simple, focused |
| **Setup** | More complex | Simple |
| **Data Ownership** | Google | You |
| **Cookie Consent** | May require | Not required |

**Recommendation:**
- **Google Analytics:** If you need comprehensive analytics and don't mind data collection
- **Plausible:** If you prioritize privacy and GDPR compliance

---

## ✅ **Verification Checklist**

### **Google Analytics**
- [ ] Google Analytics account created
- [ ] Property created for SmartFarm
- [ ] Measurement ID obtained (`G-XXXXXXXXXX`)
- [ ] `VITE_GA_MEASUREMENT_ID` added to Netlify variables
- [ ] Script added to `index.html`
- [ ] Frontend redeployed
- [ ] Tracking verified in Google Analytics dashboard

### **Plausible Analytics**
- [ ] Plausible account created
- [ ] Domain added to Plausible
- [ ] Script added to `index.html`
- [ ] Frontend redeployed
- [ ] Tracking verified in Plausible dashboard

---

## 🧪 **Testing Analytics**

### **Test Google Analytics**

1. **Browser Console Test:**
   ```javascript
   // Check if gtag is loaded
   console.log(typeof gtag); // Should be "function"
   
   // Check dataLayer
   console.log(window.dataLayer);
   ```

2. **Network Tab Test:**
   - Open DevTools → Network tab
   - Filter by "collect" or "gtag"
   - Navigate through site
   - Should see requests to `google-analytics.com`

3. **Google Analytics Dashboard:**
   - Go to Google Analytics → Realtime
   - Should see your visit within seconds

### **Test Plausible Analytics**

1. **Network Tab Test:**
   - Open DevTools → Network tab
   - Filter by "plausible"
   - Navigate through site
   - Should see requests to `plausible.io`

2. **Plausible Dashboard:**
   - Go to Plausible Dashboard
   - Should see your visit (may take a few minutes)

---

## 🔧 **Advanced Configuration**

### **Google Analytics: Enhanced Ecommerce (Optional)**

If you want to track ecommerce events:

```javascript
// Track purchase
gtag('event', 'purchase', {
  transaction_id: '12345',
  value: 29.99,
  currency: 'USD',
  items: [{
    item_id: 'SKU123',
    item_name: 'Product Name',
    price: 29.99,
    quantity: 1
  }]
});
```

### **Google Analytics: Custom Events**

Track custom events:

```javascript
// Track button click
gtag('event', 'button_click', {
  button_name: 'Register',
  page_location: window.location.href
});

// Track form submission
gtag('event', 'form_submit', {
  form_name: 'Registration',
  form_location: window.location.pathname
});
```

### **Plausible: Custom Events**

Track custom events:

```javascript
// Track custom event
plausible('EventName', { props: { key: 'value' } });
```

---

## 🐛 **Troubleshooting**

### **Problem: Google Analytics not tracking**

**Solutions:**
1. Verify `VITE_GA_MEASUREMENT_ID` is set in Netlify
2. Check script is added to `index.html`
3. Verify Measurement ID format is correct (`G-XXXXXXXXXX`)
4. Check browser console for errors
5. Verify ad blockers aren't blocking analytics
6. Check Google Analytics dashboard → Admin → Data Streams → Verify setup

### **Problem: Plausible not tracking**

**Solutions:**
1. Verify script is added to `index.html`
2. Check domain matches in script (`data-domain` attribute)
3. Verify domain is added in Plausible dashboard
4. Check browser console for errors
5. Wait a few minutes (Plausible may have delay)

### **Problem: Analytics blocked by ad blockers**

**Solutions:**
- This is expected behavior
- Ad blockers often block analytics
- Consider Plausible (less likely to be blocked)
- Or inform users to whitelist your site

---

## 📚 **Additional Resources**

- **Google Analytics:** https://support.google.com/analytics
- **Plausible Analytics:** https://plausible.io/docs
- **Google Analytics Setup:** https://support.google.com/analytics/answer/9304153
- **Plausible Setup:** https://plausible.io/docs/script-installation-guide

---

## ✅ **Success Criteria**

Analytics setup is complete when:

- ✅ Analytics account created
- ✅ Script added to frontend
- ✅ Frontend redeployed
- ✅ Tracking verified in analytics dashboard
- ✅ Visits are being tracked

---

## 💡 **Best Practices**

1. **Privacy Compliance:**
   - Update Privacy Policy to mention analytics
   - Consider cookie consent banner (for Google Analytics)
   - Plausible doesn't require cookie consent

2. **Performance:**
   - Load analytics scripts asynchronously
   - Don't block page rendering
   - Use defer or async attributes

3. **Testing:**
   - Test in incognito mode (without ad blockers)
   - Verify tracking works across pages
   - Check analytics dashboard regularly

---

**Last Updated:** January 2025

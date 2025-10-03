# Content Security Policy (CSP) Configuration

## 🔒 **CSP Configuration Overview**

This document outlines the Content Security Policy configuration for the SmartFarm application to ensure secure loading of external resources while maintaining functionality.

---

## 📋 **Current CSP Configuration**

### **Netlify Configuration** (`web-project/netlify.toml`)

```toml
Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https://api.openweathermap.org https://smartfarm-backend.railway.app https://cdn.jsdelivr.net;"
```

---

## 🔧 **CSP Directives Breakdown**

### **1. default-src 'self'**
- **Purpose**: Default policy for all resource types
- **Value**: Only allow resources from the same origin

### **2. script-src**
- **Purpose**: Controls JavaScript execution
- **Allowed Sources**:
  - `'self'`: Same origin scripts
  - `'unsafe-inline'`: Inline scripts (required for dynamic content)
  - `'unsafe-eval'`: eval() functions (required for some libraries)
  - `https://cdn.jsdelivr.net`: Bootstrap, Chart.js, and other libraries
  - `https://cdnjs.cloudflare.com`: Font Awesome and other CDN resources
  - `https://unpkg.com`: Additional package CDN

### **3. style-src**
- **Purpose**: Controls CSS loading
- **Allowed Sources**:
  - `'self'`: Same origin stylesheets
  - `'unsafe-inline'`: Inline styles (required for dynamic styling)
  - `https://cdn.jsdelivr.net`: Bootstrap CSS
  - `https://cdnjs.cloudflare.com`: Font Awesome CSS
  - `https://fonts.googleapis.com`: Google Fonts

### **4. font-src**
- **Purpose**: Controls font loading
- **Allowed Sources**:
  - `'self'`: Same origin fonts
  - `https://fonts.gstatic.com`: Google Fonts
  - `https://cdnjs.cloudflare.com`: Font Awesome fonts

### **5. img-src**
- **Purpose**: Controls image loading
- **Allowed Sources**:
  - `'self'`: Same origin images
  - `data:`: Data URLs (for base64 images)
  - `https:`: All HTTPS images (for external resources)

### **6. connect-src**
- **Purpose**: Controls fetch, XMLHttpRequest, WebSocket connections
- **Allowed Sources**:
  - `'self'`: Same origin API calls
  - `https://api.openweathermap.org`: Weather API
  - `https://smartfarm-backend.railway.app`: Backend API
  - `https://cdn.jsdelivr.net`: Source map requests

---

## 🚨 **Common CSP Violations & Fixes**

### **1. Font Awesome Loading Issues**
**Error**: `Refused to load the stylesheet 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'`

**Fix**: Add `https://cdnjs.cloudflare.com` to `style-src` and `font-src` directives.

### **2. Bootstrap Source Map Issues**
**Error**: `Refused to connect to 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js.map'`

**Fix**: Add `https://cdn.jsdelivr.net` to `connect-src` directive.

### **3. External Script Loading Issues**
**Error**: Scripts from external CDNs not loading

**Fix**: Add the CDN domain to `script-src` directive.

---

## 🔍 **Troubleshooting CSP Issues**

### **1. Browser Developer Tools**
- Open Developer Tools (F12)
- Go to Console tab
- Look for CSP violation messages
- Check Network tab for blocked requests

### **2. CSP Violation Reports**
Monitor browser console for messages like:
```
Refused to load [resource] because it violates the following Content Security Policy directive: "[directive]"
```

### **3. Testing CSP Changes**
1. Update CSP configuration in `netlify.toml`
2. Commit and push changes
3. Wait for Netlify deployment
4. Test in browser with hard refresh (Ctrl+F5)
5. Check console for any remaining violations

---

## 📊 **External Resources Used**

### **CDN Resources**
| Service | Domain | Purpose | CSP Directive |
|---------|--------|---------|---------------|
| Bootstrap | `cdn.jsdelivr.net` | CSS Framework | `style-src`, `script-src` |
| Font Awesome | `cdnjs.cloudflare.com` | Icons | `style-src`, `font-src` |
| Chart.js | `cdn.jsdelivr.net` | Charts | `script-src` |
| jsPDF | `cdnjs.cloudflare.com` | PDF Generation | `script-src` |
| QRCode.js | `cdnjs.cloudflare.com` | QR Code Generation | `script-src` |
| JSZip | `cdnjs.cloudflare.com` | File Compression | `script-src` |

### **API Endpoints**
| Service | Domain | Purpose | CSP Directive |
|---------|--------|---------|---------------|
| OpenWeather | `api.openweathermap.org` | Weather Data | `connect-src` |
| SmartFarm Backend | `smartfarm-backend.railway.app` | Application API | `connect-src` |

---

## 🛡️ **Security Considerations**

### **1. Minimize 'unsafe-inline'**
- Currently required for dynamic content
- Consider implementing nonces for better security
- Monitor for opportunities to remove

### **2. Minimize 'unsafe-eval'**
- Required for some JavaScript libraries
- Consider alternatives if possible
- Monitor for security implications

### **3. Regular CSP Audits**
- Review external domains regularly
- Remove unused domains
- Update CSP as needed

---

## 🔄 **Updating CSP Configuration**

### **Step 1: Identify the Issue**
- Check browser console for CSP violations
- Note the blocked resource and required directive

### **Step 2: Update Configuration**
- Edit `web-project/netlify.toml`
- Add required domain to appropriate directive
- Ensure proper syntax and formatting

### **Step 3: Deploy and Test**
- Commit changes to Git
- Push to trigger Netlify deployment
- Test in browser with hard refresh
- Verify no remaining violations

---

## 📝 **Example CSP Updates**

### **Adding New CDN**
```toml
# Before
Content-Security-Policy = "... script-src 'self' https://cdn.jsdelivr.net; ..."

# After
Content-Security-Policy = "... script-src 'self' https://cdn.jsdelivr.net https://new-cdn.com; ..."
```

### **Adding New API**
```toml
# Before
Content-Security-Policy = "... connect-src 'self' https://api.example.com; ..."

# After
Content-Security-Policy = "... connect-src 'self' https://api.example.com https://new-api.com; ..."
```

---

## ✅ **Current Status**

**Last Updated**: ${new Date().toISOString()}
**Status**: All CSP violations resolved
**Configuration**: Production ready

### **Resolved Issues**
- ✅ Font Awesome CSS loading
- ✅ Bootstrap source map requests
- ✅ All external CDN resources
- ✅ API endpoint connections

---

**Note**: This CSP configuration balances security with functionality. Regular reviews and updates are recommended to maintain optimal security posture.

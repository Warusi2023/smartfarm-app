# Download QR Code Library

## Instructions

The QR code library file (`qrcode.min.js`) needs to be downloaded manually and placed in this directory.

### Option 1: Download from jsdelivr (Recommended)
1. Visit: https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js
2. Right-click → Save As
3. Save as `qrcode.min.js` in this directory (`public/js/`)

### Option 2: Download from unpkg
1. Visit: https://unpkg.com/qrcode@1.5.3/build/qrcode.min.js
2. Right-click → Save As
3. Save as `qrcode.min.js` in this directory (`public/js/`)

### Option 3: Using curl (Linux/Mac)
```bash
curl -o qrcode.min.js https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js
```

### Option 4: Using PowerShell (Windows)
```powershell
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js" -OutFile "qrcode.min.js"
```

### Option 5: Using npm (if you have Node.js)
```bash
npm install qrcode
# Then copy from node_modules/qrcode/build/qrcode.min.js to public/js/qrcode.min.js
```

## Verification

After downloading, verify the file:
- File name: `qrcode.min.js`
- Location: `public/js/qrcode.min.js`
- Size: Should be approximately 50-100 KB
- Content: Should start with JavaScript code (minified)

## Library Information

- **Package**: qrcode (npm)
- **Version**: 1.5.3
- **License**: MIT
- **Repository**: https://github.com/soldair/node-qrcode

## After Download

Once the file is in place:
1. The dashboard will automatically use the local file
2. No CDN dependency required
3. QR code generator will work reliably


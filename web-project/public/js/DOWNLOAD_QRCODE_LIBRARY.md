# QR Code Library (vendored)

SmartFarm serves `qrcode@1.5.1` from a committed local file:

- Path: `public/vendor/qrcode.js`
- Source: `node_modules/qrcode/build/qrcode.js` (shipped by 1.5.1 only)
- Loaded by: `dashboard.html` via `<script src="/vendor/qrcode.js"></script>`
- Global API: `window.QRCode` (`toCanvas`, `toDataURL`, …)

## Regenerate after `npm ci`

From `web-project`:

```bash
npm run vendor:qrcode
```

Do not load this library from CDN (cdnjs, unpkg, or jsDelivr).

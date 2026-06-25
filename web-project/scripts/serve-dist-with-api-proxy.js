#!/usr/bin/env node
/**
 * Serve web-project/dist and proxy /api/* to the Railway backend.
 * Fixes same-origin /api/... requests that previously returned SPA/HTML 404.
 */
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { shouldProxyToApi } = require('./api-proxy-utils');

const DIST = path.join(__dirname, '..', 'dist');
const PORT = Number(process.env.PORT || 4173);
const API_TARGET = (
    process.env.SMARTFARM_API_PROXY_TARGET ||
    process.env.VITE_API_URL ||
    'https://web-production-86d39.up.railway.app'
).replace(/\/+$/, '');

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.webmanifest': 'application/manifest+json'
};

function resolveDistPath(urlPath) {
    let pathname = urlPath.split('?')[0] || '/';
    if (pathname === '/') {
        pathname = '/index.html';
    }
    const abs = path.normalize(path.join(DIST, pathname));
    if (!abs.startsWith(DIST)) {
        return null;
    }
    return abs;
}

function sendSpaFallback(res) {
    const indexPath = path.join(DIST, 'index.html');
    fs.readFile(indexPath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 Not Found</h1>');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
    });
}

function serveStatic(req, res) {
    const filePath = resolveDistPath(req.url);
    if (!filePath) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Forbidden');
        return;
    }
    fs.readFile(filePath, (err, content) => {
        if (!err) {
            const ext = path.extname(filePath).toLowerCase();
            res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
            res.end(content);
            return;
        }
        if (err.code === 'ENOENT') {
            sendSpaFallback(res);
            return;
        }
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Server error');
    });
}

function proxyToBackend(req, res) {
    let target;
    try {
        target = new URL(API_TARGET);
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: 'Invalid API proxy target' }));
        return;
    }

    const headers = { ...req.headers, host: target.host };
    delete headers.connection;

    const options = {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port || (target.protocol === 'https:' ? 443 : 80),
        path: req.url,
        method: req.method,
        headers
    };

    const lib = target.protocol === 'https:' ? https : http;
    const proxyReq = lib.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
        proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
        res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            success: false,
            error: 'API proxy error',
            code: 'API_PROXY_ERROR',
            message: err.message
        }));
    });

    req.pipe(proxyReq);
}

const server = http.createServer((req, res) => {
    const pathname = (req.url || '/').split('?')[0];
    if (shouldProxyToApi(pathname)) {
        proxyToBackend(req, res);
        return;
    }
    serveStatic(req, res);
});

if (!fs.existsSync(DIST)) {
    console.error('dist/ not found — run npm run build first');
    process.exit(1);
}

server.listen(PORT, () => {
    console.log(`SmartFarm web listening on :${PORT}`);
    console.log(`Serving ${DIST}`);
    console.log(`Proxying /api/* -> ${API_TARGET}`);
});

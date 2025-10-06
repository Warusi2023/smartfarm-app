const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// Ensure PORT is a number
const portNumber = parseInt(config.port, 10);
if (isNaN(portNumber)) {
    console.error('Invalid PORT environment variable:', config.port);
    process.exit(1);
}

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = path.join(config.publicDir, config.indexFile);
    } else if (!filePath.startsWith('./' + config.publicDir + '/')) {
        filePath = path.join(config.publicDir, req.url);
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found, try to serve index.html for SPA routing
                fs.readFile(path.join(config.publicDir, config.indexFile), (error, content) => {
                    if (error) {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(portNumber, () => {
    console.log(`🚀 SmartFarm Web Server running on http://localhost:${portNumber}`);
    console.log(`📁 Serving files from ${config.publicDir}/`);
    console.log(`🌐 Dashboard: http://localhost:${portNumber}/dashboard.html`);
    console.log(`📊 Simple Dashboard: http://localhost:${portNumber}/dashboard-simple.html`);
    console.log(`🔧 Environment: ${config.nodeEnv}`);
    console.log(`📊 Log Level: ${config.logLevel}`);
});

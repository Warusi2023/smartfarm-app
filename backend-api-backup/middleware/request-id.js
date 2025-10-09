// Request ID Middleware
// Generates unique ID for each request for tracking

const { v4: uuidv4 } = require('uuid');

function requestIdMiddleware(req, res, next) {
    // Use existing request ID from header, or generate new one
    const requestId = req.headers['x-request-id'] || `req_${uuidv4()}`;
    
    // Attach to request object
    req.requestId = requestId;
    
    // Send in response header
    res.setHeader('X-Request-Id', requestId);
    
    next();
}

module.exports = requestIdMiddleware;


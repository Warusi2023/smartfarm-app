const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');

/**
 * Error tracking endpoint
 * Receives client-side errors and logs them for debugging
 */
router.post('/', async (req, res) => {
    try {
        const errorData = req.body;
        
        // Log the error data for debugging
        logger.warn('Client-side error received:', {
            message: errorData.message,
            level: errorData.level,
            url: errorData.url,
            userAgent: errorData.userAgent,
            timestamp: errorData.timestamp,
            stack: errorData.stack
        });
        
        // Return success response
        res.status(200).json({
            success: true,
            message: 'Error logged successfully',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        logger.error('Error processing error tracking request:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process error tracking request'
        });
    }
});

module.exports = router;

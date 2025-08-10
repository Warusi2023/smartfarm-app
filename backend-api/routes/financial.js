const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Financial API endpoint - implement financial operations',
        data: []
    });
});

module.exports = router; 
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Documents API endpoint - implement document operations',
        data: []
    });
});

module.exports = router; 
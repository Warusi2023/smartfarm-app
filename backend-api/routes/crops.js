const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Crops API endpoint - implement CRUD operations',
        data: []
    });
});

module.exports = router; 
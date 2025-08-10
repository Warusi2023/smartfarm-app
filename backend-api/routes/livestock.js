const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Livestock API endpoint - implement CRUD operations',
        data: []
    });
});

module.exports = router; 
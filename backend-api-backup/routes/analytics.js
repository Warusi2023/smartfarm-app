const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database connection
const dbPath = path.join(__dirname, '../database/smartfarm.db');
const db = new sqlite3.Database(dbPath);

// Get analytics data for a farm
router.get('/farm/:farmId', (req, res) => {
    const { farmId } = req.params;
    const { metric, startDate, endDate } = req.query;
    
    let query = `
        SELECT metric, value, date, notes
        FROM analytics_data
        WHERE farmId = ?
    `;
    
    const params = [farmId];
    
    if (metric) {
        query += ' AND metric = ?';
        params.push(metric);
    }
    
    if (startDate) {
        query += ' AND date >= ?';
        params.push(startDate);
    }
    
    if (endDate) {
        query += ' AND date <= ?';
        params.push(endDate);
    }
    
    query += ' ORDER BY date DESC';
    
    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Error fetching analytics data:', err);
            return res.status(500).json({ error: 'Failed to fetch analytics data' });
        }
        
        res.json({
            success: true,
            data: rows,
            count: rows.length
        });
    });
});

// Get yield predictions
router.get('/yield-predictions/:farmId', (req, res) => {
    const { farmId } = req.params;
    
    // Simulate AI-powered yield predictions
    const predictions = [
        {
            crop: 'Corn',
            currentYield: 4.2,
            predictedYield: 5.1,
            confidence: 0.85,
            factors: ['Weather conditions', 'Soil quality', 'Historical data']
        },
        {
            crop: 'Wheat',
            currentYield: 3.8,
            predictedYield: 4.3,
            confidence: 0.78,
            factors: ['Rainfall patterns', 'Temperature trends', 'Crop health']
        },
        {
            crop: 'Soybeans',
            currentYield: 2.9,
            predictedYield: 3.4,
            confidence: 0.82,
            factors: ['Market demand', 'Weather forecast', 'Pest pressure']
        }
    ];
    
    res.json({
        success: true,
        data: predictions,
        generatedAt: new Date().toISOString()
    });
});

// Get revenue analysis
router.get('/revenue-analysis/:farmId', (req, res) => {
    const { farmId } = req.params;
    const { period = 'monthly' } = req.query;
    
    const query = `
        SELECT 
            strftime('%Y-%m', date) as period,
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expenses,
            SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as netIncome
        FROM financial_records
        WHERE farmId = ?
        GROUP BY strftime('%Y-%m', date)
        ORDER BY period DESC
        LIMIT 12
    `;
    
    db.all(query, [farmId], (err, rows) => {
        if (err) {
            console.error('Error fetching revenue analysis:', err);
            return res.status(500).json({ error: 'Failed to fetch revenue analysis' });
        }
        
        res.json({
            success: true,
            data: rows,
            period: period
        });
    });
});

// Get cost breakdown
router.get('/cost-breakdown/:farmId', (req, res) => {
    const { farmId } = req.params;
    const { year = new Date().getFullYear() } = req.query;
    
    const query = `
        SELECT 
            category,
            SUM(amount) as totalAmount,
            COUNT(*) as transactionCount
        FROM financial_records
        WHERE farmId = ? 
        AND type = 'expense'
        AND strftime('%Y', date) = ?
        GROUP BY category
        ORDER BY totalAmount DESC
    `;
    
    db.all(query, [farmId, year.toString()], (err, rows) => {
        if (err) {
            console.error('Error fetching cost breakdown:', err);
            return res.status(500).json({ error: 'Failed to fetch cost breakdown' });
        }
        
        res.json({
            success: true,
            data: rows,
            year: year
        });
    });
});

// Get weather impact analysis
router.get('/weather-impact/:farmId', (req, res) => {
    const { farmId } = req.params;
    const { days = 30 } = req.query;
    
    const query = `
        SELECT 
            date,
            temperature,
            humidity,
            precipitation,
            windSpeed
        FROM weather_data
        WHERE farmId = ?
        ORDER BY date DESC
        LIMIT ?
    `;
    
    db.all(query, [farmId, parseInt(days)], (err, rows) => {
        if (err) {
            console.error('Error fetching weather data:', err);
            return res.status(500).json({ error: 'Failed to fetch weather data' });
        }
        
        // Calculate weather impact on yield
        const weatherImpact = rows.map(record => ({
            ...record,
            yieldImpact: calculateYieldImpact(record),
            riskLevel: calculateRiskLevel(record)
        }));
        
        res.json({
            success: true,
            data: weatherImpact,
            days: days
        });
    });
});

// Get efficiency metrics
router.get('/efficiency/:farmId', (req, res) => {
    const { farmId } = req.params;
    
    // Simulate efficiency calculations
    const efficiencyMetrics = {
        waterUsage: {
            current: 85,
            target: 90,
            unit: '%',
            status: 'good'
        },
        fertilizerEfficiency: {
            current: 78,
            target: 85,
            unit: '%',
            status: 'improving'
        },
        laborProductivity: {
            current: 92,
            target: 88,
            unit: '%',
            status: 'excellent'
        },
        equipmentUtilization: {
            current: 88,
            target: 90,
            unit: '%',
            status: 'good'
        },
        energyEfficiency: {
            current: 75,
            target: 80,
            unit: '%',
            status: 'needs_improvement'
        },
        cropYield: {
            current: 90,
            target: 85,
            unit: '%',
            status: 'excellent'
        }
    };
    
    res.json({
        success: true,
        data: efficiencyMetrics,
        overallEfficiency: 84.7
    });
});

// Helper functions
function calculateYieldImpact(weatherRecord) {
    // Simple algorithm to calculate yield impact based on weather
    let impact = 0;
    
    if (weatherRecord.temperature < 10 || weatherRecord.temperature > 35) {
        impact -= 5;
    } else if (weatherRecord.temperature >= 15 && weatherRecord.temperature <= 25) {
        impact += 3;
    }
    
    if (weatherRecord.precipitation < 20) {
        impact -= 3;
    } else if (weatherRecord.precipitation > 100) {
        impact -= 2;
    }
    
    return Math.max(-10, Math.min(10, impact));
}

function calculateRiskLevel(weatherRecord) {
    let riskScore = 0;
    
    if (weatherRecord.temperature < 5 || weatherRecord.temperature > 40) {
        riskScore += 3;
    }
    
    if (weatherRecord.precipitation > 150) {
        riskScore += 2;
    }
    
    if (weatherRecord.windSpeed > 50) {
        riskScore += 2;
    }
    
    if (riskScore >= 5) return 'high';
    if (riskScore >= 3) return 'medium';
    return 'low';
}

module.exports = router; 
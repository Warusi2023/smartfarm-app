const express = require('express');
const router = express.Router();
const environment = require('../config/environment');
const logger = require('../lib/logger');

// Get ads configuration
router.get('/config', (req, res) => {
    try {
        const config = {
            adsenseEnabled: environment.ADSENSE_ENABLED === 'true',
            adsenseClientId: environment.ADSENSE_CLIENT_ID || '',
            affiliateEnabled: environment.AFFILIATE_ENABLED === 'true',
            affiliateTag: environment.AFFILIATE_TAG || '',
            environment: environment.NODE_ENV
        };

        logger.info('Ads config requested', { 
            adsenseEnabled: config.adsenseEnabled,
            affiliateEnabled: config.affiliateEnabled,
            environment: config.environment
        });

        res.json({
            success: true,
            data: config
        });
    } catch (error) {
        logger.error('Error getting ads config:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get ads configuration'
        });
    }
});

// Get affiliate products by category
router.get('/affiliate/:category', (req, res) => {
    try {
        const { category } = req.params;
        const affiliateTag = environment.AFFILIATE_TAG || '';

        if (!environment.AFFILIATE_ENABLED || environment.AFFILIATE_ENABLED !== 'true') {
            return res.json({
                success: true,
                data: [],
                message: 'Affiliate ads disabled'
            });
        }

        // Mock affiliate products data
        const affiliateProducts = {
            'seeds': [
                {
                    id: 'seed-001',
                    title: 'Premium Vegetable Seeds Collection',
                    description: 'High-quality organic seeds for your farm',
                    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
                    price: '$24.99',
                    originalPrice: '$29.99',
                    discount: '17%',
                    link: `https://amazon.com/dp/B08XYZ123?tag=${affiliateTag}`,
                    category: 'seeds',
                    rating: 4.5,
                    reviews: 128
                },
                {
                    id: 'seed-002',
                    title: 'Organic Fertilizer Mix',
                    description: 'Natural fertilizer for healthy crop growth',
                    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=300&h=200&fit=crop',
                    price: '$39.99',
                    originalPrice: '$45.99',
                    discount: '13%',
                    link: `https://amazon.com/dp/B08ABC456?tag=${affiliateTag}`,
                    category: 'fertilizer',
                    rating: 4.3,
                    reviews: 89
                }
            ],
            'tools': [
                {
                    id: 'tool-001',
                    title: 'Smart Irrigation System',
                    description: 'Automated watering system with IoT sensors',
                    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=200&fit=crop',
                    price: '$149.99',
                    originalPrice: '$179.99',
                    discount: '17%',
                    link: `https://amazon.com/dp/B08DEF789?tag=${affiliateTag}`,
                    category: 'irrigation',
                    rating: 4.7,
                    reviews: 203
                },
                {
                    id: 'tool-002',
                    title: 'Professional Garden Tools Set',
                    description: 'Complete set of durable gardening tools',
                    imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop',
                    price: '$79.99',
                    originalPrice: '$99.99',
                    discount: '20%',
                    link: `https://amazon.com/dp/B08GHI012?tag=${affiliateTag}`,
                    category: 'tools',
                    rating: 4.4,
                    reviews: 156
                }
            ],
            'livestock': [
                {
                    id: 'livestock-001',
                    title: 'Premium Livestock Feed',
                    description: 'Nutritious feed for healthy animals',
                    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop',
                    price: '$89.99',
                    originalPrice: '$109.99',
                    discount: '18%',
                    link: `https://amazon.com/dp/B08JKL345?tag=${affiliateTag}`,
                    category: 'feed',
                    rating: 4.6,
                    reviews: 94
                },
                {
                    id: 'livestock-002',
                    title: 'Livestock Health Supplements',
                    description: 'Essential vitamins and minerals for livestock',
                    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
                    price: '$34.99',
                    originalPrice: '$42.99',
                    discount: '19%',
                    link: `https://amazon.com/dp/B08MNO678?tag=${affiliateTag}`,
                    category: 'supplements',
                    rating: 4.2,
                    reviews: 67
                }
            ],
            'technology': [
                {
                    id: 'tech-001',
                    title: 'Smart Farm Monitor',
                    description: 'IoT sensors for comprehensive farm monitoring',
                    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
                    price: '$199.99',
                    originalPrice: '$249.99',
                    discount: '20%',
                    link: `https://amazon.com/dp/B08PQR901?tag=${affiliateTag}`,
                    category: 'monitoring',
                    rating: 4.8,
                    reviews: 312
                },
                {
                    id: 'tech-002',
                    title: 'Weather Station Pro',
                    description: 'Professional weather monitoring for farms',
                    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=300&h=200&fit=crop',
                    price: '$129.99',
                    originalPrice: '$159.99',
                    discount: '19%',
                    link: `https://amazon.com/dp/B08STU234?tag=${affiliateTag}`,
                    category: 'weather',
                    rating: 4.5,
                    reviews: 178
                }
            ]
        };

        const products = affiliateProducts[category] || affiliateProducts['seeds'];

        logger.info(`Affiliate products requested for category: ${category}`, {
            category,
            productCount: products.length,
            affiliateEnabled: environment.AFFILIATE_ENABLED === 'true'
        });

        res.json({
            success: true,
            data: products,
            category,
            affiliateTag: affiliateTag ? 'configured' : 'not-configured'
        });

    } catch (error) {
        logger.error('Error getting affiliate products:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get affiliate products'
        });
    }
});

// Track affiliate clicks (for analytics)
router.post('/affiliate/click', (req, res) => {
    try {
        const { productId, category, link } = req.body;
        
        logger.info('Affiliate click tracked', {
            productId,
            category,
            link: link ? 'provided' : 'not-provided',
            timestamp: new Date().toISOString(),
            userAgent: req.get('User-Agent'),
            ip: req.ip
        });

        res.json({
            success: true,
            message: 'Click tracked successfully'
        });
    } catch (error) {
        logger.error('Error tracking affiliate click:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to track click'
        });
    }
});

// Get ads analytics (admin only)
router.get('/analytics', (req, res) => {
    try {
        // In a real implementation, this would query your analytics database
        const analytics = {
            totalImpressions: 1250,
            totalClicks: 89,
            clickThroughRate: 7.12,
            revenue: 156.78,
            topCategories: [
                { category: 'tools', clicks: 34, revenue: 67.45 },
                { category: 'seeds', clicks: 28, revenue: 45.23 },
                { category: 'livestock', clicks: 19, revenue: 32.10 },
                { category: 'technology', clicks: 8, revenue: 12.00 }
            ],
            dailyStats: [
                { date: '2024-01-01', impressions: 45, clicks: 3, revenue: 5.67 },
                { date: '2024-01-02', impressions: 52, clicks: 4, revenue: 7.89 },
                { date: '2024-01-03', impressions: 38, clicks: 2, revenue: 3.45 }
            ]
        };

        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        logger.error('Error getting ads analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get analytics'
        });
    }
});

module.exports = router;

/**
 * Payment Security Middleware
 * Validates app store purchases and subscription status
 */

const crypto = require('crypto');

class PaymentSecurity {
    constructor() {
        // Google Play and Apple App Store configuration
        this.googlePlayPackageName = process.env.GOOGLE_PLAY_PACKAGE_NAME || 'com.smartfarm.app';
        this.appleAppBundleId = process.env.APPLE_APP_BUNDLE_ID || 'com.smartfarm.app';
    }

    /**
     * Validate Google Play purchase
     */
    async validateGooglePlayPurchase(purchaseToken, productId, db) {
        try {
            // In production, use Google Play Developer API
            // This is a placeholder implementation
            
            // Check if purchase token exists in database
            const existing = await db.query(
                'SELECT * FROM purchases WHERE purchase_token = $1 AND platform = $2',
                [purchaseToken, 'google_play']
            );

            if (existing.rows.length > 0) {
                const purchase = existing.rows[0];
                
                // Check if purchase is still valid
                if (purchase.expires_at && new Date(purchase.expires_at) < new Date()) {
                    return {
                        valid: false,
                        reason: 'Purchase expired'
                    };
                }

                return {
                    valid: true,
                    purchase: purchase
                };
            }

            // TODO: Verify with Google Play API
            // const googleAuth = require('google-auth-library');
            // const client = new googleAuth.GoogleAuth({
            //     keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
            //     scopes: ['https://www.googleapis.com/auth/androidpublisher']
            // });
            // 
            // const androidPublisher = require('@googleapis/androidpublisher');
            // const publisher = androidPublisher.androidpublisher({
            //     version: 'v3',
            //     auth: client
            // });
            //
            // const result = await publisher.purchases.subscriptions.get({
            //     packageName: this.googlePlayPackageName,
            //     subscriptionId: productId,
            //     token: purchaseToken
            // });

            return {
                valid: false,
                reason: 'Purchase verification not implemented'
            };
        } catch (error) {
            console.error('Google Play purchase validation error:', error);
            return {
                valid: false,
                reason: error.message
            };
        }
    }

    /**
     * Validate Apple App Store purchase
     */
    async validateApplePurchase(receiptData, productId, db) {
        try {
            // In production, use Apple App Store API
            // This is a placeholder implementation

            // TODO: Verify with Apple App Store
            // const appleAuth = require('apple-signin-auth');
            // const jwt = require('jsonwebtoken');
            //
            // // Create JWT for App Store API
            // const key = process.env.APPLE_KEY_ID;
            // const teamId = process.env.APPLE_TEAM_ID;
            // const keyFile = process.env.APPLE_KEY_FILE;
            //
            // const token = jwt.sign({
            //     iss: teamId,
            //     iat: Math.floor(Date.now() / 1000),
            //     exp: Math.floor(Date.now() / 1000) + 3600,
            //     aud: 'https://appleid.apple.com',
            //     sub: this.appleAppBundleId
            // }, keyFile, {
            //     algorithm: 'ES256',
            //     keyid: key
            // });
            //
            // // Verify receipt with Apple
            // const response = await fetch('https://buy.itunes.apple.com/verifyReceipt', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`
            //     },
            //     body: JSON.stringify({
            //         'receipt-data': receiptData,
            //         'password': process.env.APPLE_SHARED_SECRET
            //     })
            // });

            return {
                valid: false,
                reason: 'Purchase verification not implemented'
            };
        } catch (error) {
            console.error('Apple purchase validation error:', error);
            return {
                valid: false,
                reason: error.message
            };
        }
    }

    /**
     * Verify subscription status
     */
    async verifySubscription(userId, db) {
        try {
            const result = await db.query(`
                SELECT s.*, p.plan_name, p.features
                FROM subscriptions s
                JOIN plans p ON s.plan_id = p.id
                WHERE s.user_id = $1 
                AND s.status = 'active'
                AND (s.expires_at IS NULL OR s.expires_at > NOW())
            `, [userId]);

            if (result.rows.length === 0) {
                return {
                    hasSubscription: false,
                    plan: null
                };
            }

            const subscription = result.rows[0];

            // Verify purchase is still valid (for app store purchases)
            if (subscription.purchase_token) {
                const platform = subscription.platform;
                let valid = false;

                if (platform === 'google_play') {
                    const validation = await this.validateGooglePlayPurchase(
                        subscription.purchase_token,
                        subscription.product_id,
                        db
                    );
                    valid = validation.valid;
                } else if (platform === 'apple_app_store') {
                    const validation = await this.validateApplePurchase(
                        subscription.receipt_data,
                        subscription.product_id,
                        db
                    );
                    valid = validation.valid;
                }

                if (!valid) {
                    // Mark subscription as expired
                    await db.query(
                        'UPDATE subscriptions SET status = $1 WHERE id = $2',
                        ['expired', subscription.id]
                    );

                    return {
                        hasSubscription: false,
                        plan: null,
                        reason: 'Purchase validation failed'
                    };
                }
            }

            return {
                hasSubscription: true,
                plan: subscription.plan_name,
                features: subscription.features,
                expiresAt: subscription.expires_at
            };
        } catch (error) {
            console.error('Subscription verification error:', error);
            return {
                hasSubscription: false,
                plan: null,
                error: error.message
            };
        }
    }

    /**
     * Middleware to require active subscription
     */
    requireSubscription() {
        return async (req, res, next) => {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    error: 'Authentication required',
                    code: 'AUTH_REQUIRED'
                });
            }

            const subscription = await this.verifySubscription(req.user.id, req.db);

            if (!subscription.hasSubscription) {
                return res.status(403).json({
                    success: false,
                    error: 'Active subscription required',
                    code: 'SUBSCRIPTION_REQUIRED',
                    message: 'Please subscribe to access this feature'
                });
            }

            req.subscription = subscription;
            next();
        };
    }

    /**
     * Check if user has specific feature access
     */
    hasFeature(subscription, feature) {
        if (!subscription || !subscription.hasSubscription) {
            return false;
        }

        if (!subscription.features) {
            return false;
        }

        return subscription.features.includes(feature);
    }

    /**
     * Middleware to require specific feature
     */
    requireFeature(feature) {
        return async (req, res, next) => {
            if (!req.subscription) {
                const subscription = await this.verifySubscription(req.user.id, req.db);
                req.subscription = subscription;
            }

            if (!this.hasFeature(req.subscription, feature)) {
                return res.status(403).json({
                    success: false,
                    error: 'Feature not available',
                    code: 'FEATURE_NOT_AVAILABLE',
                    feature: feature,
                    message: `This feature requires a subscription plan that includes: ${feature}`
                });
            }

            next();
        };
    }
}

module.exports = PaymentSecurity;


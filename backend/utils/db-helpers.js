/**
 * Database Helper Functions for Email Verification
 * Provides database operations for user email verification
 * 
 * Note: These are template functions. Replace with actual database queries
 * when connecting to PostgreSQL.
 */

class DatabaseHelpers {
    constructor(dbPool) {
        this.dbPool = dbPool;
        
        // Expose dbPool for use in AuthRoutes
        if (dbPool) {
            this.dbPool = dbPool;
        }
    }

    /**
     * Get user subscription
     */
    async getUserSubscription(userId) {
        if (!this.dbPool) {
            return null;
        }
        try {
            const result = await this.dbPool.query(
                'SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
                [userId]
            );
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Database error getting subscription:', error);
            return null;
        }
    }

    /**
     * Create or update subscription
     */
    async createOrUpdateSubscription(subscription) {
        if (!this.dbPool) {
            return subscription;
        }
        try {
            const { userId, plan, status, startDate, nextBillingDate, autoRenew, paymentMethod } = subscription;
            const result = await this.dbPool.query(
                `INSERT INTO subscriptions (user_id, plan, status, start_date, next_billing_date, auto_renew, payment_method)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 ON CONFLICT (user_id) 
                 DO UPDATE SET plan = $2, status = $3, start_date = $4, next_billing_date = $5, auto_renew = $6, payment_method = $7, updated_at = NOW()
                 RETURNING *`,
                [userId, plan, status, startDate, nextBillingDate, autoRenew, paymentMethod]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Database error creating/updating subscription:', error);
            throw error;
        }
    }

    /**
     * Update subscription
     */
    async updateSubscription(userId, updates) {
        if (!this.dbPool) {
            return true;
        }
        try {
            const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
            const values = [userId, ...Object.values(updates)];
            await this.dbPool.query(
                `UPDATE subscriptions SET ${fields}, updated_at = NOW() WHERE user_id = $1`,
                values
            );
            return true;
        } catch (error) {
            console.error('Database error updating subscription:', error);
            throw error;
        }
    }

    /**
     * Get subscription history
     */
    async getSubscriptionHistory(userId) {
        if (!this.dbPool) {
            return [];
        }
        try {
            const result = await this.dbPool.query(
                'SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC',
                [userId]
            );
            return result.rows;
        } catch (error) {
            console.error('Database error getting subscription history:', error);
            return [];
        }
    }

    /**
     * Find user by verification token
     */
    async findUserByVerificationToken(token) {
        if (!this.dbPool) {
            // Mock implementation
            return null;
        }

        try {
            const result = await this.dbPool.query(
                'SELECT * FROM users WHERE verification_token = $1',
                [token]
            );

            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Database error finding user by token:', error);
            throw error;
        }
    }

    /**
     * Verify user email (mark as verified and clear token)
     */
    async verifyUserEmail(userId) {
        if (!this.dbPool) {
            // Mock implementation
            return true;
        }

        try {
            const result = await this.dbPool.query(
                `UPDATE users 
                 SET is_verified = true, 
                     verification_token = NULL, 
                     verification_expires = NULL,
                     updated_at = CURRENT_TIMESTAMP
                 WHERE id = $1
                 RETURNING *`,
                [userId]
            );

            return result.rows.length > 0;
        } catch (error) {
            console.error('Database error verifying user email:', error);
            throw error;
        }
    }

    /**
     * Update verification token for user
     */
    async updateVerificationToken(userId, token, expires) {
        if (!this.dbPool) {
            // Mock implementation
            return true;
        }

        try {
            const result = await this.dbPool.query(
                `UPDATE users 
                 SET verification_token = $1, 
                     verification_expires = $2,
                     updated_at = CURRENT_TIMESTAMP
                 WHERE id = $3
                 RETURNING *`,
                [token, expires, userId]
            );

            return result.rows.length > 0;
        } catch (error) {
            console.error('Database error updating verification token:', error);
            throw error;
        }
    }

    /**
     * Create user with verification token and initialize 30-day trial
     */
    async createUserWithVerification(userData) {
        if (!this.dbPool) {
            // Mock implementation
            return {
                id: 'user_' + Date.now(),
                ...userData,
                createdAt: new Date()
            };
        }

        try {
            // Calculate trial end date (30 days from now)
            const trialEnd = new Date();
            trialEnd.setDate(trialEnd.getDate() + 30);

            const result = await this.dbPool.query(
                `INSERT INTO users (
                    email, password_hash, first_name, last_name, phone, country,
                    verification_token, verification_expires, is_verified, role, trial_end
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING *`,
                [
                    userData.email,
                    userData.passwordHash,
                    userData.firstName,
                    userData.lastName,
                    userData.phone || null,
                    userData.country || 'Fiji',
                    userData.verificationToken,
                    userData.verificationExpires,
                    false, // is_verified
                    userData.role || 'farmer',
                    trialEnd // Set trial_end to 30 days from now
                ]
            );

            return result.rows[0];
        } catch (error) {
            console.error('Database error creating user:', error);
            throw error;
        }
    }

    /**
     * Find user by email
     */
    async findUserByEmail(email) {
        if (!this.dbPool) {
            // Mock implementation
            return null;
        }

        try {
            const result = await this.dbPool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );

            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Database error finding user by email:', error);
            throw error;
        }
    }

    /**
     * Check if user exists
     */
    async userExists(email) {
        if (!this.dbPool) {
            // Mock implementation
            return false;
        }

        try {
            const result = await this.dbPool.query(
                'SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)',
                [email]
            );

            return result.rows[0].exists;
        } catch (error) {
            console.error('Database error checking user existence:', error);
            throw error;
        }
    }
}

module.exports = DatabaseHelpers;


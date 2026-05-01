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
     * Map subscriptions row to a stable shape used by services/controllers.
     */
    _mapSubscriptionRow(row) {
        if (!row) {
            return null;
        }
        return {
            ...row,
            plan: row.plan_type || row.plan_name || null,
            planName: row.plan_name || null,
            planType: row.plan_type || null,
            startDate: row.current_period_start || null,
            nextBillingDate: row.current_period_end || null
        };
    }

    /**
     * Map a PostgreSQL users row to camelCase fields expected by auth routes
     */
    _mapUserRow(row) {
        if (!row) {
            return null;
        }
        return {
            id: row.id,
            email: row.email,
            passwordHash: row.password_hash,
            firstName: row.first_name,
            lastName: row.last_name,
            phone: row.phone,
            country: row.country,
            role: row.role,
            isVerified: row.is_verified,
            isActive: row.is_active !== false,
            verificationToken: row.verification_token,
            verificationExpires: row.verification_expires,
            resetToken: row.reset_token,
            resetExpires: row.reset_expires,
            trial_end: row.trial_end,
            created_at: row.created_at
        };
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
            return result.rows.length > 0 ? this._mapSubscriptionRow(result.rows[0]) : null;
        } catch (error) {
            console.error('Database error getting subscription:', error);
            return null;
        }
    }

    /**
     * Create refresh token session record
     */
    async createUserSession(userId, tokenHash, expiresAt) {
        if (!this.dbPool) {
            throw new Error('Database unavailable for secure session storage');
        }
        const result = await this.dbPool.query(
            `INSERT INTO user_sessions (user_id, token_hash, expires_at)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [userId, tokenHash, expiresAt]
        );
        return result.rows[0];
    }

    /**
     * Find active refresh token session by token hash
     */
    async findActiveSessionByTokenHash(tokenHash) {
        if (!this.dbPool) {
            throw new Error('Database unavailable for secure session storage');
        }
        const result = await this.dbPool.query(
            `SELECT * FROM user_sessions
             WHERE token_hash = $1
               AND expires_at > CURRENT_TIMESTAMP
             ORDER BY created_at DESC
             LIMIT 1`,
            [tokenHash]
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    /**
     * Revoke refresh token session by token hash
     */
    async revokeSessionByTokenHash(tokenHash) {
        if (!this.dbPool) {
            throw new Error('Database unavailable for secure session storage');
        }
        await this.dbPool.query(
            `DELETE FROM user_sessions WHERE token_hash = $1`,
            [tokenHash]
        );
    }

    /**
     * Create or update subscription
     */
    async createOrUpdateSubscription(subscription) {
        if (!this.dbPool) {
            return subscription;
        }
        try {
            const { userId, plan, status, startDate, nextBillingDate } = subscription;
            const normalizedPlan = String(plan || '').toLowerCase();
            const planNameMap = {
                trial: '30-Day Free Trial',
                free: 'Free Plan',
                professional: 'Professional Plan',
                enterprise: 'Enterprise Plan'
            };
            const planName = planNameMap[normalizedPlan] || String(plan || 'Custom Plan');
            const result = await this.dbPool.query(
                `INSERT INTO subscriptions (user_id, plan_name, plan_type, status, current_period_start, current_period_end)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 ON CONFLICT (user_id) 
                 DO UPDATE SET plan_name = $2, plan_type = $3, status = $4, current_period_start = $5, current_period_end = $6, updated_at = NOW()
                 RETURNING *`,
                [userId, planName, normalizedPlan, status, startDate, nextBillingDate]
            );
            return this._mapSubscriptionRow(result.rows[0]);
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
            const mapped = {};
            if (updates.plan) {
                const normalizedPlan = String(updates.plan).toLowerCase();
                const planNameMap = {
                    trial: '30-Day Free Trial',
                    free: 'Free Plan',
                    professional: 'Professional Plan',
                    enterprise: 'Enterprise Plan'
                };
                mapped.plan_name = planNameMap[normalizedPlan] || updates.plan;
                mapped.plan_type = normalizedPlan;
            }
            if (updates.status !== undefined) mapped.status = updates.status;
            if (updates.startDate !== undefined) mapped.current_period_start = updates.startDate;
            if (updates.nextBillingDate !== undefined) mapped.current_period_end = updates.nextBillingDate;

            const fields = Object.keys(mapped).map((key, index) => `${key} = $${index + 2}`).join(', ');
            const values = [userId, ...Object.values(mapped)];
            if (!fields) {
                return true;
            }
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
            return result.rows.map((row) => this._mapSubscriptionRow(row));
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

            return result.rows.length > 0 ? this._mapUserRow(result.rows[0]) : null;
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
            // Backward compatibility for older production schemas that may miss
            // trial_end or email verification columns.
            if (error && error.code === '42703') {
                const msg = String(error.message || '');
                try {
                    // Fallback 1: no trial_end column.
                    if (msg.includes('trial_end')) {
                        const result = await this.dbPool.query(
                            `INSERT INTO users (
                                email, password_hash, first_name, last_name, phone, country,
                                verification_token, verification_expires, is_verified, role
                            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
                                false,
                                userData.role || 'farmer'
                            ]
                        );
                        return result.rows[0];
                    }

                    // Fallback 2: no verification_token/verification_expires columns.
                    if (msg.includes('verification_token') || msg.includes('verification_expires')) {
                        const result = await this.dbPool.query(
                            `INSERT INTO users (
                                email, password_hash, first_name, last_name, phone, country,
                                is_verified, role
                            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                            RETURNING *`,
                            [
                                userData.email,
                                userData.passwordHash,
                                userData.firstName,
                                userData.lastName,
                                userData.phone || null,
                                userData.country || 'Fiji',
                                false,
                                userData.role || 'farmer'
                            ]
                        );
                        return result.rows[0];
                    }
                } catch (fallbackError) {
                    console.error('Database fallback create user failed:', fallbackError);
                    throw fallbackError;
                }
            }

            console.error('Database error creating user:', error);
            throw error;
        }
    }

    /**
     * Create user (delegates to createUserWithVerification); returns new user id
     */
    async createUser(userData) {
        const row = await this.createUserWithVerification(userData);
        return String(row.id);
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

            return result.rows.length > 0 ? this._mapUserRow(result.rows[0]) : null;
        } catch (error) {
            console.error('Database error finding user by email:', error);
            throw error;
        }
    }

    /**
     * Get user by id (normalized row for auth)
     */
    async getUserById(userId) {
        if (!this.dbPool) {
            return null;
        }
        try {
            const result = await this.dbPool.query(
                'SELECT * FROM users WHERE id = $1',
                [userId]
            );
            return result.rows.length > 0 ? this._mapUserRow(result.rows[0]) : null;
        } catch (error) {
            console.error('Database error getUserById:', error);
            throw error;
        }
    }

    /**
     * Find user by password reset token
     */
    async findUserByResetToken(token) {
        if (!this.dbPool) {
            return null;
        }
        try {
            const result = await this.dbPool.query(
                'SELECT * FROM users WHERE reset_token = $1',
                [token]
            );
            return result.rows.length > 0 ? this._mapUserRow(result.rows[0]) : null;
        } catch (error) {
            console.error('Database error findUserByResetToken:', error);
            return null;
        }
    }

    /**
     * Trial info from users row (used by subscription repository)
     */
    async getUserTrialInfo(userId) {
        if (!this.dbPool) {
            return null;
        }
        try {
            const result = await this.dbPool.query(
                'SELECT trial_end, created_at FROM users WHERE id = $1',
                [userId]
            );
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Database error getUserTrialInfo:', error);
            return null;
        }
    }

    /**
     * Partial update for auth profile / tokens / password
     */
    async updateUser(userId, updates) {
        if (!this.dbPool) {
            return;
        }
        const columnMap = {
            passwordHash: 'password_hash',
            resetToken: 'reset_token',
            resetExpires: 'reset_expires',
            isVerified: 'is_verified',
            verificationToken: 'verification_token',
            verificationExpires: 'verification_expires',
            firstName: 'first_name',
            lastName: 'last_name',
            phone: 'phone',
            country: 'country'
        };
        const sets = [];
        const values = [];
        let p = 1;
        for (const [key, value] of Object.entries(updates)) {
            const col = columnMap[key];
            if (col === undefined) {
                continue;
            }
            sets.push(`${col} = $${p}`);
            values.push(value);
            p += 1;
        }
        if (sets.length === 0) {
            return;
        }
        values.push(userId);
        await this.dbPool.query(
            `UPDATE users SET ${sets.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${p}`,
            values
        );
    }

    /**
     * Delete user account
     */
    async deleteUser(userId) {
        if (!this.dbPool) {
            return;
        }
        await this.dbPool.query('DELETE FROM users WHERE id = $1', [userId]);
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


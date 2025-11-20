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
     * Create user with verification token
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
                    false, // is_verified
                    userData.role || 'farmer'
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


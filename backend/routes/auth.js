/**
 * SmartFarm Authentication Routes
 * User registration, login, and authentication endpoints
 */

const express = require('express');
const AuthService = require('../auth/auth');
const AuthMiddleware = require('../middleware/auth');
const EmailService = require('../utils/emailService');
const { formatUserProfile } = require('../utils/authProfile');
const DatabaseHelpers = require('../utils/db-helpers');
const SubscriptionService = require('../services/subscriptionService');
const SubscriptionEventService = require('../services/subscriptionEventService');
const { validate } = require('../middleware/validator');
const logger = require('../utils/logger');

class AuthRoutes {
    constructor(dbPool = null) {
        this.router = express.Router();
        this.authService = new AuthService();
        this.authMiddleware = new AuthMiddleware();
        this.emailService = new EmailService();
        this.dbHelpers = new DatabaseHelpers(dbPool);
        this.dbPool = dbPool; // Store for subscription service
        
        this.setupRoutes();
    }

    setupRoutes() {
        // Apply CORS and security middleware to all auth routes
        this.router.use(this.authMiddleware.cors());
        this.router.use(this.authMiddleware.securityHeaders());

        /**
         * @swagger
         * /api/auth/register:
         *   post:
         *     summary: Register a new user
         *     tags: [Authentication]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *               - password
         *               - firstName
         *               - lastName
         *             properties:
         *               email:
         *                 type: string
         *                 format: email
         *                 example: user@example.com
         *               password:
         *                 type: string
         *                 minLength: 8
         *                 pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])'
         *                 example: StrongPass123!
         *               firstName:
         *                 type: string
         *                 minLength: 1
         *                 maxLength: 100
         *                 example: John
         *               lastName:
         *                 type: string
         *                 minLength: 1
         *                 maxLength: 100
         *                 example: Doe
         *               phone:
         *                 type: string
         *                 pattern: '^\+?[\d\s\-\(\)]+$'
         *                 example: +1234567890
         *               country:
         *                 type: string
         *                 maxLength: 100
         *                 example: USA
         *     responses:
         *       201:
         *         description: User registered successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 data:
         *                   $ref: '#/components/schemas/User'
         *       400:
         *         $ref: '#/components/responses/ValidationError'
         *       409:
         *         description: User already exists
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         *             example:
         *               success: false
         *               error: User already exists
         *               code: USER_EXISTS
         */
        this.router.post('/register', validate('auth.register'), this.register.bind(this));

        /**
         * @swagger
         * /api/auth/login:
         *   post:
         *     summary: Authenticate user and receive JWT token
         *     tags: [Authentication]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *               - password
         *             properties:
         *               email:
         *                 type: string
         *                 format: email
         *                 example: user@example.com
         *               password:
         *                 type: string
         *                 example: StrongPass123!
         *     responses:
         *       200:
         *         description: Login successful
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 data:
         *                   $ref: '#/components/schemas/AuthToken'
         *       401:
         *         description: Invalid credentials
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         *             example:
         *               success: false
         *               error: Invalid credentials
         *               code: INVALID_CREDENTIALS
         *       403:
         *         description: Email not verified
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         *             example:
         *               success: false
         *               error: Email not verified
         *               code: EMAIL_NOT_VERIFIED
         */
        this.router.post('/login', validate('auth.login'), this.login.bind(this));

        /**
         * @swagger
         * /api/auth/logout:
         *   post:
         *     summary: Logout user (invalidate token)
         *     tags: [Authentication]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: Logout successful
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/SuccessResponse'
         *       401:
         *         $ref: '#/components/responses/UnauthorizedError'
         */
        this.router.post('/logout', validate('auth.logout'), this.logout.bind(this));

        /**
         * @swagger
         * /api/auth/refresh:
         *   post:
         *     summary: Refresh JWT token
         *     tags: [Authentication]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - refreshToken
         *             properties:
         *               refreshToken:
         *                 type: string
         *                 example: refresh-token-here
         *     responses:
         *       200:
         *         description: Token refreshed successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 data:
         *                   $ref: '#/components/schemas/AuthToken'
         *       401:
         *         $ref: '#/components/responses/UnauthorizedError'
         */
        this.router.post('/refresh', validate('auth.refresh'), this.refresh.bind(this));

        /**
         * @swagger
         * /api/auth/forgot-password:
         *   post:
         *     summary: Request password reset email
         *     tags: [Authentication]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *             properties:
         *               email:
         *                 type: string
         *                 format: email
         *                 example: user@example.com
         *     responses:
         *       200:
         *         description: Password reset email sent
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/SuccessResponse'
         *       400:
         *         $ref: '#/components/responses/ValidationError'
         */
        this.router.post('/forgot-password', validate('auth.forgotPassword'), this.forgotPassword.bind(this));

        /**
         * @swagger
         * /api/auth/reset-password:
         *   post:
         *     summary: Reset password using reset token
         *     tags: [Authentication]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - token
         *               - newPassword
         *             properties:
         *               token:
         *                 type: string
         *                 example: reset-token-here
         *               newPassword:
         *                 type: string
         *                 minLength: 8
         *                 pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])'
         *                 example: NewPass123!
         *     responses:
         *       200:
         *         description: Password reset successful
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/SuccessResponse'
         *       400:
         *         $ref: '#/components/responses/ValidationError'
         *       401:
         *         description: Invalid or expired token
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         */
        this.router.post('/reset-password', validate('auth.resetPassword'), this.resetPassword.bind(this));

        /**
         * @swagger
         * /api/auth/verify-email/{token}:
         *   post:
         *     summary: Verify user email address
         *     tags: [Authentication]
         *     parameters:
         *       - in: path
         *         name: token
         *         required: true
         *         schema:
         *           type: string
         *         description: Email verification token
         *     responses:
         *       200:
         *         description: Email verified successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/SuccessResponse'
         *       400:
         *         description: Invalid or expired token
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         */
        this.router.post('/verify-email/:token', validate('auth.verifyEmail'), this.verifyEmail.bind(this));

        /**
         * @swagger
         * /api/auth/resend-verification:
         *   post:
         *     summary: Resend email verification
         *     tags: [Authentication]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *                 format: email
         *                 example: user@example.com
         *     responses:
         *       200:
         *         description: Verification email sent
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/SuccessResponse'
         *       400:
         *         $ref: '#/components/responses/ValidationError'
         */
        this.router.post('/resend-verification', validate('auth.resendVerification'), this.resendVerification.bind(this));

        /**
         * @swagger
         * /api/auth/me:
         *   get:
         *     summary: Get current user profile
         *     tags: [Authentication]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: User profile retrieved successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 data:
         *                   $ref: '#/components/schemas/User'
         *       401:
         *         $ref: '#/components/responses/UnauthorizedError'
         */
        this.router.get('/me', this.authMiddleware.authenticate(), validate('auth.getProfile'), this.getProfile.bind(this));
        this.router.get('/profile', this.authMiddleware.authenticate(), validate('auth.getProfile'), this.getProfile.bind(this));

        /**
         * @swagger
         * /api/auth/profile:
         *   put:
         *     summary: Update user profile
         *     tags: [Authentication]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               firstName:
         *                 type: string
         *                 minLength: 1
         *                 maxLength: 100
         *                 example: Jane
         *               lastName:
         *                 type: string
         *                 minLength: 1
         *                 maxLength: 100
         *                 example: Smith
         *               phone:
         *                 type: string
         *                 pattern: '^\+?[\d\s\-\(\)]+$'
         *                 example: +9876543210
         *               country:
         *                 type: string
         *                 maxLength: 100
         *                 example: Canada
         *     responses:
         *       200:
         *         description: Profile updated successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 success:
         *                   type: boolean
         *                   example: true
         *                 data:
         *                   $ref: '#/components/schemas/User'
         *       400:
         *         $ref: '#/components/responses/ValidationError'
         *       401:
         *         $ref: '#/components/responses/UnauthorizedError'
         */
        this.router.put('/profile', this.authMiddleware.authenticate(), validate('auth.updateProfile'), this.updateProfile.bind(this));

        /**
         * @swagger
         * /api/auth/password:
         *   put:
         *     summary: Change user password
         *     tags: [Authentication]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - currentPassword
         *               - newPassword
         *             properties:
         *               currentPassword:
         *                 type: string
         *                 example: OldPass123!
         *               newPassword:
         *                 type: string
         *                 minLength: 8
         *                 pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])'
         *                 example: NewPass123!
         *     responses:
         *       200:
         *         description: Password changed successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/SuccessResponse'
         *       400:
         *         $ref: '#/components/responses/ValidationError'
         *       401:
         *         description: Invalid current password
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         */
        this.router.put('/password', this.authMiddleware.authenticate(), validate('auth.changePassword'), this.changePassword.bind(this));

        /**
         * @swagger
         * /api/auth/account:
         *   delete:
         *     summary: Delete user account
         *     tags: [Authentication]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: Account deleted successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/SuccessResponse'
         *       401:
         *         $ref: '#/components/responses/UnauthorizedError'
         */
        this.router.delete('/account', this.authMiddleware.authenticate(), validate('auth.deleteAccount'), this.deleteAccount.bind(this));
    }

    /**
     * User registration endpoint
     */
    async register(req, res) {
        try {
            const { email, password, firstName, lastName, phone, country } = req.body;

            // Validate input
            if (!email || !password || !firstName || !lastName) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                    code: 'MISSING_FIELDS'
                });
            }

            // Validate email format
            if (!this.authService.validateEmail(email)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid email format',
                    code: 'INVALID_EMAIL'
                });
            }

            // Validate password strength
            const passwordValidation = this.authService.validatePassword(password);
            if (!passwordValidation.isValid) {
                return res.status(400).json({
                    success: false,
                    error: 'Password does not meet requirements',
                    code: 'WEAK_PASSWORD',
                    details: passwordValidation.errors
                });
            }

            // Check if user already exists
            const userExists = await this.dbHelpers.userExists(email);
            const existingUser = userExists ? await this.dbHelpers.findUserByEmail(email) : null;
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    error: 'User already exists',
                    code: 'USER_EXISTS'
                });
            }

            // Hash password
            const passwordHash = await this.authService.hashPassword(password);

            // Generate verification token
            const verificationToken = this.emailService.generateVerificationToken();
            const verificationExpires = new Date();
            verificationExpires.setHours(verificationExpires.getHours() + 24); // 24 hours expiration

            // Create user in database
            const userId = await this.dbHelpers.createUser({
                email,
                passwordHash,
                firstName,
                lastName,
                phone: phone || null,
                country: country || null,
                verificationToken,
                verificationExpires
            });

            // Send verification email
            try {
                await this.emailService.sendVerificationEmail(email, verificationToken);
            } catch (emailError) {
                // Log but don't fail registration if email fails
                logger.warn('Failed to send verification email', { error: emailError, userId });
            }

            // Create trial subscription
            try {
                const subscriptionService = new SubscriptionService(this.dbPool);
                await subscriptionService.createTrialSubscription(userId);
                const eventService = new SubscriptionEventService(this.dbPool);
                await eventService.log(userId, 'trial_started', { trialDays: 30, maxFarms: 1 });
            } catch (trialError) {
                logger.warn('Failed to create trial subscription', { error: trialError, userId });
            }

            res.status(201).json({
                success: true,
                data: {
                    id: userId,
                    email,
                    firstName,
                    lastName,
                    phone: phone || null,
                    country: country || null,
                    isVerified: false
                },
                message: 'User registered successfully. Please check your email to verify your account.'
            });
        } catch (error) {
            logger.errorWithContext('Registration error', { error, email: req.body?.email });
            res.status(500).json({
                success: false,
                error: 'Registration failed',
                code: 'REGISTRATION_ERROR'
            });
        }
    }

    /**
     * User login endpoint
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validate input
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    error: 'Email and password are required',
                    code: 'MISSING_CREDENTIALS'
                });
            }

            // Find user by email
            const user = await this.dbHelpers.findUserByEmail(email);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid credentials',
                    code: 'INVALID_CREDENTIALS'
                });
            }

            // Verify password
            const isValidPassword = await this.authService.verifyPassword(password, user.passwordHash);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid credentials',
                    code: 'INVALID_CREDENTIALS'
                });
            }

            // Check if user is active
            if (!user.isActive) {
                return res.status(401).json({
                    success: false,
                    error: 'Account is deactivated',
                    code: 'ACCOUNT_DEACTIVATED'
                });
            }

            // Check if email is verified
            if (!user.isVerified) {
                return res.status(403).json({
                    success: false,
                    error: 'Email not verified. Please check your inbox or resend verification.',
                    code: 'EMAIL_NOT_VERIFIED',
                    message: 'Please verify your email address before logging in. Check your inbox for the verification email or request a new one.'
                });
            }

            // Check subscription/trial status using subscription service
            const subscriptionService = new SubscriptionService(this.dbPool);
            const accessStatus = await subscriptionService.getUserAccessStatus(user.id);
            let trialExpired = false;
            let trialEnd = null;

            if (!accessStatus.valid) {
                if (accessStatus.reason === 'TRIAL_EXPIRED') {
                    trialExpired = true;
                    trialEnd = accessStatus.trialEnd;
                    try {
                        const eventService = new SubscriptionEventService(this.dbPool);
                        await eventService.log(user.id, 'trial_expired', { trialEnd: accessStatus.trialEnd, source: 'login' });
                    } catch (_) { /* non-blocking */ }
                } else if (accessStatus.reason === 'NO_SUBSCRIPTION') {
                    // This shouldn't happen for new users (trial is set on registration)
                    // But handle it gracefully - create trial if missing
                    try {
                        await subscriptionService.createTrialSubscription(user.id);
                        logger.info(`Created missing trial subscription for user ${user.id}`);
                    } catch (trialError) {
                        logger.error('Failed to create missing trial:', trialError);
                    }
                } else {
                    return res.status(403).json({
                        success: false,
                        error: 'Active subscription or trial required',
                        code: 'SUBSCRIPTION_REQUIRED',
                        requiresSubscription: true
                    });
                }
            }

            // Generate tokens
            const token = this.authService.generateToken(user);
            const refreshToken = this.authService.generateResetToken();
            const refreshTokenHash = this.authService.hashToken(refreshToken);
            const refreshTokenExpiresAt = this.authService.getRefreshExpiryDate();

            // Persist refresh token securely (fail closed if unavailable)
            await this.dbHelpers.createUserSession(user.id, refreshTokenHash, refreshTokenExpiresAt);

            res.json({
                success: true,
                data: {
                    token,
                    refreshToken,
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phone: user.phone,
                        country: user.country,
                        role: user.role || 'user'
                    },
                    requiresSubscription: trialExpired,
                    subscriptionStatus: trialExpired ? 'TRIAL_EXPIRED' : 'active',
                    upgradeUrl: trialExpired ? '/subscription-management.html' : undefined,
                    trialEnd: trialEnd || undefined
                }
            });
        } catch (error) {
            logger.errorWithContext('Login error', { error, email: req.body?.email });
            res.status(500).json({
                success: false,
                error: 'Login failed',
                code: 'LOGIN_ERROR'
            });
        }
    }

    /**
     * User logout endpoint
     */
    async logout(req, res) {
        try {
            // In a full implementation, you would invalidate the token here
            // For now, we'll just return success
            res.json({
                success: true,
                message: 'Logged out successfully'
            });
        } catch (error) {
            logger.errorWithContext('Logout error', { error });
            res.status(500).json({
                success: false,
                error: 'Logout failed',
                code: 'LOGOUT_ERROR'
            });
        }
    }

    /**
     * Refresh token endpoint
     */
    async refresh(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    error: 'Refresh token is required',
                    code: 'MISSING_TOKEN'
                });
            }

            const refreshTokenHash = this.authService.hashToken(refreshToken);
            const session = await this.dbHelpers.findActiveSessionByTokenHash(refreshTokenHash);

            if (!session) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid or expired refresh token',
                    code: 'INVALID_REFRESH_TOKEN'
                });
            }

            const user = await this.dbHelpers.getUserById(session.user_id);
            if (!user || !user.isActive) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid or expired refresh token',
                    code: 'INVALID_REFRESH_TOKEN'
                });
            }

            const token = this.authService.generateToken(user);
            const newRefreshToken = this.authService.generateResetToken();
            const newRefreshTokenHash = this.authService.hashToken(newRefreshToken);
            const newRefreshTokenExpiresAt = this.authService.getRefreshExpiryDate();

            // Rotate refresh token session: revoke old, persist new
            await this.dbHelpers.revokeSessionByTokenHash(refreshTokenHash);
            await this.dbHelpers.createUserSession(user.id, newRefreshTokenHash, newRefreshTokenExpiresAt);

            res.json({
                success: true,
                data: {
                    token,
                    refreshToken: newRefreshToken,
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phone: user.phone,
                        country: user.country,
                        role: user.role || 'user'
                    }
                }
            });
        } catch (error) {
            logger.errorWithContext('Refresh token error', { error });
            if (error.message && error.message.includes('Database unavailable')) {
                return res.status(503).json({
                    success: false,
                    error: 'Refresh token service unavailable',
                    code: 'REFRESH_SERVICE_UNAVAILABLE'
                });
            }
            res.status(500).json({
                success: false,
                error: 'Token refresh failed',
                code: 'REFRESH_ERROR'
            });
        }
    }

    /**
     * Forgot password endpoint
     */
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    error: 'Email is required',
                    code: 'MISSING_EMAIL'
                });
            }

            const user = await this.dbHelpers.findUserByEmail(email);
            if (!user) {
                // Don't reveal if user exists or not (security best practice)
                return res.json({
                    success: true,
                    message: 'If an account with that email exists, a password reset link has been sent.'
                });
            }

            // Generate reset token
            const resetToken = this.authService.generateResetToken();
            const resetExpires = new Date();
            resetExpires.setHours(resetExpires.getHours() + 1); // 1 hour expiration

            // Store reset token in database
            await this.dbHelpers.updateUser(user.id, {
                resetToken,
                resetExpires
            });

            // Send reset email
            try {
                await this.emailService.sendPasswordResetEmail(email, resetToken);
            } catch (emailError) {
                logger.error('Failed to send password reset email', { error: emailError, userId: user.id });
                return res.status(500).json({
                    success: false,
                    error: 'Failed to send password reset email',
                    code: 'EMAIL_ERROR'
                });
            }

            res.json({
                success: true,
                message: 'If an account with that email exists, a password reset link has been sent.'
            });
        } catch (error) {
            logger.errorWithContext('Forgot password error', { error });
            res.status(500).json({
                success: false,
                error: 'Password reset request failed',
                code: 'RESET_REQUEST_ERROR'
            });
        }
    }

    /**
     * Reset password endpoint
     */
    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;

            if (!token || !newPassword) {
                return res.status(400).json({
                    success: false,
                    error: 'Token and new password are required',
                    code: 'MISSING_FIELDS'
                });
            }

            // Validate password strength
            const passwordValidation = this.authService.validatePassword(newPassword);
            if (!passwordValidation.isValid) {
                return res.status(400).json({
                    success: false,
                    error: 'Password does not meet requirements',
                    code: 'WEAK_PASSWORD',
                    details: passwordValidation.errors
                });
            }

            // Find user by reset token
            const user = await this.dbHelpers.findUserByResetToken(token);
            if (!user || !user.resetExpires || new Date() > new Date(user.resetExpires)) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid or expired reset token',
                    code: 'INVALID_TOKEN'
                });
            }

            // Hash new password
            const passwordHash = await this.authService.hashPassword(newPassword);

            // Update user password and clear reset token
            await this.dbHelpers.updateUser(user.id, {
                passwordHash,
                resetToken: null,
                resetExpires: null
            });

            res.json({
                success: true,
                message: 'Password reset successfully'
            });
        } catch (error) {
            logger.errorWithContext('Reset password error', { error });
            res.status(500).json({
                success: false,
                error: 'Password reset failed',
                code: 'RESET_ERROR'
            });
        }
    }

    /**
     * Verify email endpoint
     */
    async verifyEmail(req, res) {
        try {
            const { token } = req.params;

            if (!token) {
                return res.status(400).json({
                    success: false,
                    status: 'invalid_token',
                    error: 'Verification token is required',
                    message: 'No verification token was provided.',
                    code: 'MISSING_TOKEN'
                });
            }

            // Find user by verification token
            const user = await this.dbHelpers.findUserByVerificationToken(token);
            if (!user) {
                return res.status(400).json({
                    success: false,
                    status: 'invalid_token',
                    error: 'Invalid verification link',
                    message: 'This verification link is invalid or has already been replaced. Request a new verification email or sign in if you already verified.',
                    code: 'INVALID_TOKEN'
                });
            }

            if (user.isVerified) {
                return res.json({
                    success: true,
                    status: 'already_verified',
                    message: 'Your email is already verified. You can sign in now.',
                    data: { email: user.email }
                });
            }

            // Check if token is expired
            if (user.verificationExpires && new Date() > new Date(user.verificationExpires)) {
                return res.status(400).json({
                    success: false,
                    status: 'expired',
                    error: 'Verification link has expired',
                    message: 'This verification link has expired. Enter your email below to receive a new one.',
                    code: 'TOKEN_EXPIRED'
                });
            }

            // Verify user email (keep token so repeat visits to the same link stay idempotent)
            await this.dbHelpers.updateUser(user.id, {
                isVerified: true,
                verificationExpires: null
            });

            res.json({
                success: true,
                status: 'verified',
                message: 'Email verified successfully. You can sign in now.',
                data: { email: user.email }
            });
        } catch (error) {
            logger.errorWithContext('Email verification error', { error });
            res.status(500).json({
                success: false,
                status: 'server_error',
                error: 'Email verification failed',
                message: 'Something went wrong while verifying your email. Please try again shortly or request a new verification email.',
                code: 'VERIFICATION_ERROR'
            });
        }
    }

    /**
     * Resend verification email endpoint
     */
    async resendVerification(req, res) {
        try {
            const email = req.body.email || req.user?.email;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    error: 'Email is required',
                    code: 'MISSING_EMAIL'
                });
            }

            const user = await this.dbHelpers.findUserByEmail(email);
            if (!user) {
                // Don't reveal if user exists
                return res.json({
                    success: true,
                    message: 'If an account with that email exists and is not verified, a verification email has been sent.'
                });
            }

            if (user.isVerified) {
                return res.json({
                    success: true,
                    message: 'Email is already verified'
                });
            }

            // Generate new verification token
            const verificationToken = this.emailService.generateVerificationToken();
            const verificationExpires = new Date();
            verificationExpires.setHours(verificationExpires.getHours() + 24);

            // Update user with new token
            await this.dbHelpers.updateUser(user.id, {
                verificationToken,
                verificationExpires
            });

            // Send verification email
            try {
                await this.emailService.sendVerificationEmail(email, verificationToken);
            } catch (emailError) {
                logger.error('Failed to send verification email', { error: emailError, userId: user.id });
                return res.status(500).json({
                    success: false,
                    error: 'Failed to send verification email',
                    code: 'EMAIL_ERROR'
                });
            }

            res.json({
                success: true,
                message: 'Verification email sent successfully'
            });
        } catch (error) {
            logger.errorWithContext('Resend verification error', { error });
            res.status(500).json({
                success: false,
                error: 'Failed to resend verification email',
                code: 'RESEND_ERROR'
            });
        }
    }

    /**
     * Get user profile endpoint
     */
    async getProfile(req, res) {
        try {
            const userId = req.user.id;

            const user = await this.dbHelpers.getUserById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found',
                    code: 'USER_NOT_FOUND'
                });
            }

            res.json({
                success: true,
                data: formatUserProfile(user)
            });
        } catch (error) {
            logger.errorWithContext('Get profile error', { error, userId: req.user?.id });
            res.status(500).json({
                success: false,
                error: 'Failed to get profile',
                code: 'PROFILE_ERROR'
            });
        }
    }

    /**
     * Update user profile endpoint
     */
    async updateProfile(req, res) {
        try {
            const userId = req.user.id;
            const { firstName, lastName, phone, country } = req.body;

            const updates = {};
            if (firstName !== undefined) updates.firstName = firstName;
            if (lastName !== undefined) updates.lastName = lastName;
            if (phone !== undefined) updates.phone = phone;
            if (country !== undefined) updates.country = country;

            if (Object.keys(updates).length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'No fields to update',
                    code: 'NO_UPDATES'
                });
            }

            await this.dbHelpers.updateUser(userId, updates);

            const updatedUser = await this.dbHelpers.getUserById(userId);

            res.json({
                success: true,
                data: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    phone: updatedUser.phone,
                    country: updatedUser.country
                }
            });
        } catch (error) {
            logger.errorWithContext('Update profile error', { error, userId: req.user?.id });
            res.status(500).json({
                success: false,
                error: 'Failed to update profile',
                code: 'UPDATE_ERROR'
            });
        }
    }

    /**
     * Change password endpoint
     */
    async changePassword(req, res) {
        try {
            const userId = req.user.id;
            const { currentPassword, newPassword } = req.body;

            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    error: 'Current password and new password are required',
                    code: 'MISSING_FIELDS'
                });
            }

            // Get user
            const user = await this.dbHelpers.getUserById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found',
                    code: 'USER_NOT_FOUND'
                });
            }

            // Verify current password
            const isValidPassword = await this.authService.verifyPassword(currentPassword, user.passwordHash);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    error: 'Current password is incorrect',
                    code: 'INVALID_PASSWORD'
                });
            }

            // Validate new password strength
            const passwordValidation = this.authService.validatePassword(newPassword);
            if (!passwordValidation.isValid) {
                return res.status(400).json({
                    success: false,
                    error: 'New password does not meet requirements',
                    code: 'WEAK_PASSWORD',
                    details: passwordValidation.errors
                });
            }

            // Hash new password
            const passwordHash = await this.authService.hashPassword(newPassword);

            // Update password
            await this.dbHelpers.updateUser(userId, { passwordHash });

            res.json({
                success: true,
                message: 'Password changed successfully'
            });
        } catch (error) {
            logger.errorWithContext('Change password error', { error, userId: req.user?.id });
            res.status(500).json({
                success: false,
                error: 'Failed to change password',
                code: 'CHANGE_PASSWORD_ERROR'
            });
        }
    }

    /**
     * Delete account endpoint
     */
    async deleteAccount(req, res) {
        try {
            const userId = req.user.id;

            // In a full implementation, you might want to soft delete or anonymize data
            await this.dbHelpers.deleteUser(userId);

            res.json({
                success: true,
                message: 'Account deleted successfully'
            });
        } catch (error) {
            logger.errorWithContext('Delete account error', { error, userId: req.user?.id });
            res.status(500).json({
                success: false,
                error: 'Failed to delete account',
                code: 'DELETE_ERROR'
            });
        }
    }

    getRouter() {
        return this.router;
    }
}

module.exports = AuthRoutes;

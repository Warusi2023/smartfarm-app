/**
 * SmartFarm Authentication Routes
 * User registration, login, and authentication endpoints
 */

const express = require('express');
const AuthService = require('../auth/auth');
const AuthMiddleware = require('../middleware/auth');
const EmailService = require('../utils/emailService');
const DatabaseHelpers = require('../utils/db-helpers');

class AuthRoutes {
    constructor(dbPool = null) {
        this.router = express.Router();
        this.authService = new AuthService();
        this.authMiddleware = new AuthMiddleware();
        this.emailService = new EmailService();
        this.dbHelpers = new DatabaseHelpers(dbPool);
        
        this.setupRoutes();
    }

    setupRoutes() {
        // Apply CORS and security middleware to all auth routes
        this.router.use(this.authMiddleware.cors());
        this.router.use(this.authMiddleware.securityHeaders());

        // Public routes
        this.router.post('/register', this.register.bind(this));
        this.router.post('/login', this.login.bind(this));
        this.router.post('/logout', this.logout.bind(this));
        this.router.post('/refresh', this.refresh.bind(this));
        this.router.post('/forgot-password', this.forgotPassword.bind(this));
        this.router.post('/reset-password', this.resetPassword.bind(this));
        this.router.post('/verify-email/:token', this.verifyEmail.bind(this));
        this.router.post('/resend-verification', this.resendVerification.bind(this));

        // Protected routes
        this.router.get('/me', this.authMiddleware.authenticate(), this.getProfile.bind(this));
        this.router.put('/profile', this.authMiddleware.authenticate(), this.updateProfile.bind(this));
        this.router.put('/password', this.authMiddleware.authenticate(), this.changePassword.bind(this));
        this.router.delete('/account', this.authMiddleware.authenticate(), this.deleteAccount.bind(this));
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

            // Create user with verification token
            const user = await this.dbHelpers.createUserWithVerification({
                email: this.authService.sanitizeInput(email),
                passwordHash,
                firstName: this.authService.sanitizeInput(firstName),
                lastName: this.authService.sanitizeInput(lastName),
                phone: phone ? this.authService.sanitizeInput(phone) : null,
                country: country || 'Fiji',
                verificationToken: verificationToken,
                verificationExpires: verificationExpires
            });

            // Send verification email
            const emailSent = await this.emailService.sendVerificationEmail(
                email,
                verificationToken,
                firstName
            );

            if (!emailSent && this.emailService.isEmailConfigured()) {
                // If email service is configured but sending failed, still create user but warn
                console.warn(`⚠️ Failed to send verification email to ${email}, but user created`);
            }

            // Do NOT create session or return token - user must verify email first
            res.status(201).json({
                success: true,
                message: emailSent 
                    ? 'Registration successful! Please check your email to verify your account.'
                    : 'Registration successful! Please verify your email to activate your account.',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        isVerified: false
                    },
                    emailSent: emailSent,
                    requiresVerification: true
                }
            });

        } catch (error) {
            console.error('Registration error:', error);
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

            // Update last login
            await this.updateLastLogin(user.id);

            // Generate token
            const token = this.authService.generateToken(user);

            // Create session
            await this.authService.createSession(user.id, token);

            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role
                    },
                    token
                }
            });

        } catch (error) {
            console.error('Login error:', error);
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
            const token = this.authService.extractTokenFromHeader(req.headers.authorization);
            
            if (token) {
                // Invalidate session (mock operation)
                const user = this.authService.getUserFromToken(token);
                if (user) {
                    await this.authService.invalidateSession(user.userId);
                }
            }

            res.json({
                success: true,
                message: 'Logout successful'
            });

        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({
                success: false,
                error: 'Logout failed',
                code: 'LOGOUT_ERROR'
            });
        }
    }

    /**
     * Token refresh endpoint
     */
    async refresh(req, res) {
        try {
            const token = this.authService.extractTokenFromHeader(req.headers.authorization);
            
            if (!token) {
                return res.status(401).json({
                    success: false,
                    error: 'Token required',
                    code: 'MISSING_TOKEN'
                });
            }

            // Verify current token
            const decoded = this.authService.verifyToken(token);
            
            // Get fresh user data
            const user = await this.findUserById(decoded.userId);
            if (!user || !user.isActive) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid user',
                    code: 'INVALID_USER'
                });
            }

            // Generate new token
            const newToken = this.authService.generateToken(user);

            res.json({
                success: true,
                message: 'Token refreshed',
                data: {
                    token: newToken
                }
            });

        } catch (error) {
            res.status(401).json({
                success: false,
                error: 'Token refresh failed',
                code: 'REFRESH_ERROR'
            });
        }
    }

    /**
     * Get user profile endpoint
     */
    async getProfile(req, res) {
        try {
            const user = await this.findUserById(req.user.id);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'User not found',
                    code: 'USER_NOT_FOUND'
                });
            }

            res.json({
                success: true,
                data: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    country: user.country,
                    role: user.role,
                    isVerified: user.isVerified,
                    createdAt: user.createdAt
                }
            });

        } catch (error) {
            console.error('Get profile error:', error);
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
            const { firstName, lastName, phone, country } = req.body;
            const userId = req.user.id;

            // Validate input
            if (!firstName || !lastName) {
                return res.status(400).json({
                    success: false,
                    error: 'First name and last name are required',
                    code: 'MISSING_FIELDS'
                });
            }

            // Update user profile (mock database operation)
            const updatedUser = await this.updateUser(userId, {
                firstName: this.authService.sanitizeInput(firstName),
                lastName: this.authService.sanitizeInput(lastName),
                phone: phone ? this.authService.sanitizeInput(phone) : null,
                country: country || 'Fiji'
            });

            res.json({
                success: true,
                message: 'Profile updated successfully',
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
            console.error('Update profile error:', error);
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
            const { currentPassword, newPassword } = req.body;
            const userId = req.user.id;

            // Validate input
            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    error: 'Current password and new password are required',
                    code: 'MISSING_PASSWORDS'
                });
            }

            // Get user
            const user = await this.findUserById(userId);
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
                    code: 'INVALID_CURRENT_PASSWORD'
                });
            }

            // Validate new password
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
            const newPasswordHash = await this.authService.hashPassword(newPassword);

            // Update password (mock database operation)
            await this.updateUserPassword(userId, newPasswordHash);

            res.json({
                success: true,
                message: 'Password changed successfully'
            });

        } catch (error) {
            console.error('Change password error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to change password',
                code: 'PASSWORD_CHANGE_ERROR'
            });
        }
    }

    // Mock database methods (replace with real database operations)
    async checkUserExists(email) {
        // Mock: Check if user exists in database
        return null;
    }

    async createUser(userData) {
        // Mock: Create user in database
        // In production, this should insert into PostgreSQL database
        return {
            id: 'user_' + Date.now(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            country: userData.country,
            role: 'farmer',
            isActive: true,
            isVerified: userData.isVerified || false,
            verificationToken: userData.verificationToken,
            verificationExpires: userData.verificationExpires,
            createdAt: new Date()
        };
    }


    async findUserByEmail(email) {
        // Mock: Find user by email in database
        return null;
    }

    async findUserById(userId) {
        // Mock: Find user by ID in database
        return {
            id: userId,
            email: 'user@example.com',
            firstName: 'John',
            lastName: 'Doe',
            phone: '+6791234567',
            country: 'Fiji',
            role: 'farmer',
            isActive: true,
            isVerified: false,
            createdAt: new Date()
        };
    }

    async updateLastLogin(userId) {
        // Mock: Update last login timestamp
        return true;
    }

    async updateUser(userId, userData) {
        // Mock: Update user in database
        return {
            id: userId,
            email: 'user@example.com',
            ...userData
        };
    }

    async updateUserPassword(userId, passwordHash) {
        // Mock: Update user password in database
        return true;
    }

    // Placeholder methods for future implementation
    async forgotPassword(req, res) {
        res.status(501).json({
            success: false,
            error: 'Password reset not implemented yet',
            code: 'NOT_IMPLEMENTED'
        });
    }

    async resetPassword(req, res) {
        res.status(501).json({
            success: false,
            error: 'Password reset not implemented yet',
            code: 'NOT_IMPLEMENTED'
        });
    }

    /**
     * Email verification endpoint
     * POST /api/auth/verify-email/:token
     */
    async verifyEmail(req, res) {
        try {
            const { token } = req.params;

            if (!token) {
                return res.status(400).json({
                    success: false,
                    error: 'Verification token is required',
                    code: 'MISSING_TOKEN'
                });
            }

            // Find user by verification token
            const user = await this.dbHelpers.findUserByVerificationToken(token);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid verification token',
                    code: 'INVALID_TOKEN',
                    message: 'The verification token is invalid or has already been used.'
                });
            }

            // Check if token is expired
            if (new Date() > new Date(user.verificationExpires)) {
                return res.status(400).json({
                    success: false,
                    error: 'Verification token has expired',
                    code: 'TOKEN_EXPIRED',
                    message: 'The verification token has expired. Please request a new verification email.'
                });
            }

            // Verify user email
            await this.dbHelpers.verifyUserEmail(user.id);

            // Send welcome email (non-blocking)
            this.emailService.sendWelcomeEmail(user.email, user.firstName)
                .catch(err => console.error('Failed to send welcome email:', err));

            res.json({
                success: true,
                message: 'Email verified successfully! You can now log in to your account.',
                data: {
                    userId: user.id,
                    email: user.email,
                    isVerified: true
                }
            });

        } catch (error) {
            console.error('Email verification error:', error);
            res.status(500).json({
                success: false,
                error: 'Email verification failed',
                code: 'VERIFICATION_ERROR'
            });
        }
    }

    /**
     * Resend verification email endpoint
     * POST /api/auth/resend-verification
     */
    async resendVerification(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    error: 'Email address is required',
                    code: 'MISSING_EMAIL'
                });
            }

            // Find user by email
            const user = await this.dbHelpers.findUserByEmail(email);

            if (!user) {
                // Don't reveal if user exists or not (security best practice)
                return res.json({
                    success: true,
                    message: 'If an account exists with this email, a verification email has been sent.'
                });
            }

            // Check if already verified
            if (user.isVerified) {
                return res.status(400).json({
                    success: false,
                    error: 'Email already verified',
                    code: 'ALREADY_VERIFIED',
                    message: 'This email address has already been verified. You can log in now.'
                });
            }

            // Generate new verification token
            const verificationToken = this.emailService.generateVerificationToken();
            const verificationExpires = new Date();
            verificationExpires.setHours(verificationExpires.getHours() + 24); // 24 hours expiration

            // Update user with new token
            await this.dbHelpers.updateVerificationToken(user.id, verificationToken, verificationExpires);

            // Send verification email
            const emailSent = await this.emailService.sendVerificationEmail(
                email,
                verificationToken,
                user.firstName
            );

            if (!emailSent && this.emailService.isEmailConfigured()) {
                return res.status(500).json({
                    success: false,
                    error: 'Failed to send verification email',
                    code: 'EMAIL_SEND_FAILED',
                    message: 'Please try again later or contact support.'
                });
            }

            res.json({
                success: true,
                message: 'Verification email sent successfully. Please check your inbox.',
                data: {
                    emailSent: emailSent
                }
            });

        } catch (error) {
            console.error('Resend verification error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to resend verification email',
                code: 'RESEND_ERROR'
            });
        }
    }

    async deleteAccount(req, res) {
        res.status(501).json({
            success: false,
            error: 'Account deletion not implemented yet',
            code: 'NOT_IMPLEMENTED'
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = AuthRoutes;
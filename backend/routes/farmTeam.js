/**
 * Farm team routes — memberships, invitations, shared tasks.
 */

const express = require('express');
const AuthMiddleware = require('../middleware/auth');
const { validate } = require('../middleware/validator');
const { asyncHandler } = require('../middleware/error-handler');
const {
    requireFarmMembership,
    requireFarmRole,
    canManageFarmMembers,
    canManageFarmTasks,
    canViewFarmTasks
} = require('../middleware/farmAuthorization');
const FarmMembershipService = require('../services/farmMembershipService');
const FarmInvitationService = require('../services/farmInvitationService');
const FarmTaskService = require('../services/farmTaskService');
const EmailService = require('../utils/emailService');
const logger = require('../utils/logger');

class FarmTeamRoutes {
    constructor(dbPool = null) {
        this.router = express.Router({ mergeParams: true });
        this.dbPool = dbPool;
        this.authMiddleware = new AuthMiddleware();
        this.requireMembership = requireFarmMembership(dbPool);
        this.membershipService = dbPool ? new FarmMembershipService(dbPool) : null;
        this.invitationService = dbPool ? new FarmInvitationService(dbPool) : null;
        this.taskService = dbPool ? new FarmTaskService(dbPool) : null;
        this.emailService = new EmailService();
        this.setupRoutes();
    }

    setupRoutes() {
        const auth = this.authMiddleware.authenticate();

        // Members
        this.router.get(
            '/:farmId/members',
            auth,
            validate('farmTeam.listMembers'),
            this.requireMembership,
            asyncHandler(this.listMembers.bind(this))
        );
        this.router.patch(
            '/:farmId/members/:membershipId',
            auth,
            validate('farmTeam.updateMember'),
            this.requireMembership,
            requireFarmRole('owner'),
            asyncHandler(this.updateMember.bind(this))
        );
        this.router.delete(
            '/:farmId/members/:membershipId',
            auth,
            validate('farmTeam.removeMember'),
            this.requireMembership,
            requireFarmRole('owner'),
            asyncHandler(this.removeMember.bind(this))
        );

        // Invitations (owner only)
        this.router.get(
            '/:farmId/invitations',
            auth,
            validate('farmTeam.listInvitations'),
            this.requireMembership,
            requireFarmRole('owner'),
            asyncHandler(this.listInvitations.bind(this))
        );
        this.router.post(
            '/:farmId/invitations',
            auth,
            validate('farmTeam.createInvitation'),
            this.requireMembership,
            requireFarmRole('owner'),
            asyncHandler(this.createInvitation.bind(this))
        );
        this.router.delete(
            '/:farmId/invitations/:invitationId',
            auth,
            validate('farmTeam.revokeInvitation'),
            this.requireMembership,
            requireFarmRole('owner'),
            asyncHandler(this.revokeInvitation.bind(this))
        );

        // Tasks — my tasks before :taskId
        this.router.get(
            '/:farmId/tasks/my',
            auth,
            validate('farmTeam.listMyTasks'),
            this.requireMembership,
            asyncHandler(this.listMyTasks.bind(this))
        );
        this.router.get(
            '/:farmId/tasks',
            auth,
            validate('farmTeam.listTasks'),
            this.requireMembership,
            asyncHandler(this.listTasks.bind(this))
        );
        this.router.post(
            '/:farmId/tasks',
            auth,
            validate('farmTeam.createTask'),
            this.requireMembership,
            asyncHandler(this.createTask.bind(this))
        );
        this.router.get(
            '/:farmId/tasks/:taskId',
            auth,
            validate('farmTeam.getTask'),
            this.requireMembership,
            asyncHandler(this.getTask.bind(this))
        );
        this.router.patch(
            '/:farmId/tasks/:taskId',
            auth,
            validate('farmTeam.updateTask'),
            this.requireMembership,
            asyncHandler(this.updateTask.bind(this))
        );
        this.router.post(
            '/:farmId/tasks/:taskId/complete',
            auth,
            validate('farmTeam.completeTask'),
            this.requireMembership,
            asyncHandler(this.completeTask.bind(this))
        );
        this.router.post(
            '/:farmId/tasks/:taskId/updates',
            auth,
            validate('farmTeam.addTaskUpdate'),
            this.requireMembership,
            asyncHandler(this.addTaskUpdate.bind(this))
        );
    }

    ensureService(res) {
        if (!this.membershipService || !this.invitationService || !this.taskService) {
            res.status(503).json({
                success: false,
                error: 'Database unavailable',
                code: 'DB_UNAVAILABLE'
            });
            return false;
        }
        return true;
    }

    handleError(res, error) {
        const status = error.statusCode || 500;
        if (status >= 500) {
            logger.errorWithContext('Farm team route error', { error: error.message });
        }
        res.status(status).json({
            success: false,
            error: error.message,
            code: error.errorCode || error.code || 'FARM_TEAM_ERROR'
        });
    }

    async listMembers(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const members = await this.membershipService.listMembers(req.params.farmId);
            res.json({ success: true, data: members });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateMember(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const member = await this.membershipService.updateMemberRole(
                req.farmRole,
                req.params.farmId,
                req.params.membershipId,
                req.body.role
            );
            res.json({ success: true, data: member });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async removeMember(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const result = await this.membershipService.revokeMember(
                req.farmRole,
                req.user.id,
                req.params.farmId,
                req.params.membershipId
            );
            res.json({ success: true, data: result });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async listInvitations(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const invitations = await this.invitationService.listPendingInvitations(req.params.farmId);
            res.json({ success: true, data: invitations });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async createInvitation(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const result = await this.invitationService.createInvitation({
                farmId: req.params.farmId,
                email: req.body.email,
                role: req.body.role,
                invitedByUserId: req.user.id
            });
            let farmName = 'your farm';
            if (this.dbPool) {
                const farmRow = await this.dbPool.query(
                    'SELECT name FROM farms WHERE id = $1',
                    [req.params.farmId]
                );
                farmName = farmRow.rows[0]?.name || farmName;
            }
            const invitedByName = [req.user.first_name, req.user.last_name]
                .filter(Boolean)
                .join(' ') || req.user.email || 'A farm owner';
            try {
                await this.emailService.sendFarmInvitationEmail({
                    email: req.body.email,
                    farmName,
                    role: req.body.role,
                    inviteToken: result.token,
                    invitedByName,
                    isResend: !!result.resent
                });
            } catch (emailError) {
                logger.warn('Failed to send farm invitation email', {
                    error: emailError,
                    farmId: req.params.farmId,
                    email: req.body.email
                });
            }
            res.status(result.resent ? 200 : 201).json({
                success: true,
                message: result.resent ? 'Pending invitation refreshed' : 'Invitation created',
                data: {
                    invitation: result.invitation,
                    acceptUrl: result.acceptUrl,
                    resent: !!result.resent
                }
            });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async revokeInvitation(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const invitation = await this.invitationService.revokePendingInvitation(
                req.params.farmId,
                req.params.invitationId
            );
            res.json({ success: true, data: invitation });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async listTasks(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        if (!canViewFarmTasks(req.farmRole)) {
            return res.status(403).json({ success: false, error: 'Farm access denied', code: 'FORBIDDEN' });
        }
        try {
            const tasks = await this.taskService.listTasks(req.params.farmId, {
                status: req.query.status
            });
            res.json({ success: true, data: tasks });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async listMyTasks(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const tasks = await this.taskService.listMyTasks(req.params.farmId, req.user.id);
            res.json({ success: true, data: tasks });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async createTask(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        if (!canManageFarmTasks(req.farmRole)) {
            return res.status(403).json({ success: false, error: 'Insufficient permissions', code: 'FORBIDDEN' });
        }
        try {
            const task = await this.taskService.createTask(
                req.farmRole,
                req.params.farmId,
                req.user.id,
                req.body
            );
            res.status(201).json({ success: true, data: task });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getTask(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const task = await this.taskService.getTask(req.params.farmId, req.params.taskId);
            res.json({ success: true, data: task });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateTask(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const task = await this.taskService.updateTask(
                req.farmRole,
                req.params.farmId,
                req.params.taskId,
                req.user.id,
                req.body
            );
            res.json({ success: true, data: task });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async completeTask(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const task = await this.taskService.completeTask(
                req.farmRole,
                req.params.farmId,
                req.params.taskId,
                req.user.id
            );
            res.json({ success: true, data: task });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async addTaskUpdate(req, res) {
        if (!this.ensureService(res)) {
            return;
        }
        try {
            const update = await this.taskService.addTaskUpdate(
                req.farmRole,
                req.params.farmId,
                req.params.taskId,
                req.user.id,
                req.body
            );
            res.status(201).json({ success: true, data: update });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    getRouter() {
        return this.router;
    }
}

module.exports = FarmTeamRoutes;

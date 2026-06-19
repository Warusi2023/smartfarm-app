/**
 * Farm invitation flow — tokenized invites with hashed storage.
 */

const crypto = require('crypto');
const { BadRequestError, NotFoundError, ConflictError } = require('../utils/errors');
const FarmMembershipService = require('./farmMembershipService');

const INVITE_TTL_DAYS = 7;

function hashToken(rawToken) {
    return crypto.createHash('sha256').update(rawToken).digest('hex');
}

function generateInviteToken() {
    return crypto.randomBytes(32).toString('hex');
}

function mapInvitationRow(row) {
    if (!row) {
        return null;
    }
    return {
        id: row.id,
        farmId: row.farm_id,
        email: row.email,
        role: row.role,
        invitedByUserId: row.invited_by_user_id,
        status: row.status,
        expiresAt: row.expires_at,
        acceptedByUserId: row.accepted_by_user_id,
        acceptedAt: row.accepted_at,
        createdAt: row.created_at
    };
}

class FarmInvitationService {
    constructor(dbPool) {
        this.dbPool = dbPool;
        this.membershipService = new FarmMembershipService(dbPool);
    }

    async createInvitation({ farmId, email, role, invitedByUserId }) {
        const normalizedEmail = String(email).trim().toLowerCase();
        const existingMember = await this.dbPool.query(
            `SELECT m.id FROM farm_memberships m
             JOIN users u ON u.id = m.user_id
             WHERE m.farm_id = $1 AND lower(u.email) = $2 AND m.status = 'active'`,
            [farmId, normalizedEmail]
        );
        if (existingMember.rows[0]) {
            throw new ConflictError('User is already a member of this farm');
        }

        const rawToken = generateInviteToken();
        const tokenHash = hashToken(rawToken);
        const expiresAt = new Date(Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000);

        const pending = await this.dbPool.query(
            `SELECT * FROM farm_invitations
             WHERE farm_id = $1 AND lower(email) = $2 AND status = 'pending'`,
            [farmId, normalizedEmail]
        );
        if (pending.rows[0]) {
            const result = await this.dbPool.query(
                `UPDATE farm_invitations
                 SET token_hash = $1, expires_at = $2, role = $3, invited_by_user_id = $4
                 WHERE id = $5
                 RETURNING *`,
                [tokenHash, expiresAt, role, invitedByUserId, pending.rows[0].id]
            );
            const invite = mapInvitationRow(result.rows[0]);
            return {
                invitation: invite,
                token: rawToken,
                acceptUrl: `/dashboard.html?farmInvite=${rawToken}`,
                resent: true
            };
        }

        const result = await this.dbPool.query(
            `INSERT INTO farm_invitations (farm_id, email, role, invited_by_user_id, token_hash, expires_at)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [farmId, normalizedEmail, role, invitedByUserId, tokenHash, expiresAt]
        );

        const invite = mapInvitationRow(result.rows[0]);
        return {
            invitation: invite,
            token: rawToken,
            acceptUrl: `/dashboard.html?farmInvite=${rawToken}`,
            resent: false
        };
    }

    async findPendingByToken(rawToken) {
        const tokenHash = hashToken(rawToken);
        const result = await this.dbPool.query(
            `SELECT i.*, f.name AS farm_name
             FROM farm_invitations i
             JOIN farms f ON f.id = i.farm_id
             WHERE i.token_hash = $1`,
            [tokenHash]
        );
        return result.rows[0] || null;
    }

    async acceptInvitation(rawToken, userId, userEmail) {
        const row = await this.findPendingByToken(rawToken);
        if (!row) {
            throw new NotFoundError('Invitation not found');
        }
        if (row.status !== 'pending') {
            throw new BadRequestError(`Invitation is ${row.status}`);
        }
        if (new Date(row.expires_at) < new Date()) {
            await this.dbPool.query(
                `UPDATE farm_invitations SET status = 'expired' WHERE id = $1`,
                [row.id]
            );
            throw new BadRequestError('Invitation has expired');
        }

        const normalizedUserEmail = String(userEmail).trim().toLowerCase();
        if (normalizedUserEmail !== String(row.email).trim().toLowerCase()) {
            throw new BadRequestError('Invitation email does not match your account email');
        }

        const client = await this.dbPool.connect();
        try {
            await client.query('BEGIN');
            await this.membershipService.upsertActiveMembership({
                farmId: row.farm_id,
                userId,
                role: row.role,
                invitedByUserId: row.invited_by_user_id,
                invitedEmail: row.email
            });
            await client.query(
                `UPDATE farm_invitations
                 SET status = 'accepted', accepted_by_user_id = $1, accepted_at = NOW()
                 WHERE id = $2`,
                [userId, row.id]
            );
            await client.query('COMMIT');
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }

        return {
            farmId: row.farm_id,
            farmName: row.farm_name,
            role: row.role
        };
    }

    async declineInvitation(rawToken, userEmail) {
        const row = await this.findPendingByToken(rawToken);
        if (!row) {
            throw new NotFoundError('Invitation not found');
        }
        if (row.status !== 'pending') {
            throw new BadRequestError(`Invitation is ${row.status}`);
        }
        const normalizedUserEmail = String(userEmail).trim().toLowerCase();
        if (normalizedUserEmail !== String(row.email).trim().toLowerCase()) {
            throw new BadRequestError('Invitation email does not match your account email');
        }
        await this.dbPool.query(
            `UPDATE farm_invitations SET status = 'revoked' WHERE id = $1`,
            [row.id]
        );
        return { declined: true };
    }

    async listPendingInvitations(farmId) {
        const result = await this.dbPool.query(
            `SELECT * FROM farm_invitations
             WHERE farm_id = $1 AND status = 'pending'
             ORDER BY created_at DESC`,
            [farmId]
        );
        return result.rows.map(mapInvitationRow);
    }

    async revokePendingInvitation(farmId, invitationId) {
        const result = await this.dbPool.query(
            `UPDATE farm_invitations
             SET status = 'revoked'
             WHERE id = $1 AND farm_id = $2 AND status = 'pending'
             RETURNING *`,
            [invitationId, farmId]
        );
        if (!result.rows[0]) {
            throw new NotFoundError('Pending invitation not found');
        }
        return mapInvitationRow(result.rows[0]);
    }
}

module.exports = FarmInvitationService;

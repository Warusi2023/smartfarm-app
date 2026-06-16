/**
 * Farm membership queries and mutations.
 */

const { ConflictError, NotFoundError, BadRequestError } = require('../utils/errors');
const { mapMembershipRow, canManageFarmMembers } = require('../middleware/farmAuthorization');

class FarmMembershipService {
    constructor(dbPool) {
        this.dbPool = dbPool;
    }

    async listMembers(farmId) {
        const result = await this.dbPool.query(
            `SELECT m.*, u.email AS user_email, u.first_name, u.last_name
             FROM farm_memberships m
             JOIN users u ON u.id = m.user_id
             WHERE m.farm_id = $1 AND m.status = 'active'
             ORDER BY
                CASE m.role
                    WHEN 'owner' THEN 1
                    WHEN 'manager' THEN 2
                    WHEN 'worker' THEN 3
                    ELSE 4
                END,
                u.email`,
            [farmId]
        );
        return result.rows.map(mapMembershipRow);
    }

    async getMembershipById(farmId, membershipId) {
        const result = await this.dbPool.query(
            `SELECT m.*, u.email AS user_email, u.first_name, u.last_name
             FROM farm_memberships m
             JOIN users u ON u.id = m.user_id
             WHERE m.id = $1 AND m.farm_id = $2`,
            [membershipId, farmId]
        );
        if (!result.rows[0]) {
            throw new NotFoundError('Membership not found');
        }
        return mapMembershipRow(result.rows[0]);
    }

    async updateMemberRole(actorRole, farmId, membershipId, newRole) {
        if (!canManageFarmMembers(actorRole)) {
            const err = new Error('Only the farm owner can change member roles');
            err.statusCode = 403;
            throw err;
        }
        if (!['manager', 'worker', 'viewer'].includes(newRole)) {
            throw new BadRequestError('Invalid role for member update');
        }

        const existing = await this.getMembershipById(farmId, membershipId);
        if (existing.role === 'owner') {
            throw new BadRequestError('Cannot change the farm owner role');
        }

        const result = await this.dbPool.query(
            `UPDATE farm_memberships
             SET role = $1, updated_at = NOW()
             WHERE id = $2 AND farm_id = $3 AND status = 'active'
             RETURNING *`,
            [newRole, membershipId, farmId]
        );
        if (!result.rows[0]) {
            throw new NotFoundError('Membership not found');
        }
        return this.getMembershipById(farmId, membershipId);
    }

    async revokeMember(actorRole, actorUserId, farmId, membershipId) {
        if (!canManageFarmMembers(actorRole)) {
            const err = new Error('Only the farm owner can remove members');
            err.statusCode = 403;
            throw err;
        }

        const existing = await this.getMembershipById(farmId, membershipId);
        if (existing.role === 'owner') {
            throw new BadRequestError('Cannot remove the farm owner');
        }
        if (existing.userId === actorUserId) {
            throw new BadRequestError('Owner cannot remove their own membership');
        }

        const result = await this.dbPool.query(
            `UPDATE farm_memberships
             SET status = 'revoked', updated_at = NOW()
             WHERE id = $1 AND farm_id = $2 AND status = 'active'
             RETURNING id`,
            [membershipId, farmId]
        );
        if (!result.rows[0]) {
            throw new NotFoundError('Membership not found');
        }
        return { id: membershipId, status: 'revoked' };
    }

    async createOwnerMembership(farmId, userId, client) {
        const db = client || this.dbPool;
        await db.query(
            `INSERT INTO farm_memberships (farm_id, user_id, role, status, joined_at)
             VALUES ($1, $2, 'owner', 'active', NOW())
             ON CONFLICT (farm_id, user_id) DO UPDATE
             SET role = 'owner', status = 'active', joined_at = COALESCE(farm_memberships.joined_at, NOW()), updated_at = NOW()`,
            [farmId, userId]
        );
    }

    async listFarmsForUser(userId) {
        const result = await this.dbPool.query(
            `SELECT DISTINCT ON (f.id)
                f.id, f.name, f.location, f.area_hectares, f.farm_type, f.description,
                f.latitude, f.longitude, f.is_active, f.created_at, f.updated_at,
                m.role AS membership_role, m.status AS membership_status
             FROM farms f
             JOIN farm_memberships m ON m.farm_id = f.id AND m.user_id = $1 AND m.status = 'active'
             WHERE f.is_active = TRUE
             ORDER BY f.id, f.updated_at DESC NULLS LAST`,
            [userId]
        );
        return result.rows.map((row) => ({
            id: row.id,
            name: row.name,
            location: row.location,
            areaHectares: row.area_hectares != null ? Number(row.area_hectares) : null,
            farmType: row.farm_type,
            description: row.description,
            latitude: row.latitude != null ? Number(row.latitude) : null,
            longitude: row.longitude != null ? Number(row.longitude) : null,
            isActive: row.is_active !== false,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            membershipRole: row.membership_role
        }));
    }

    async upsertActiveMembership({ farmId, userId, role, invitedByUserId, invitedEmail }) {
        const result = await this.dbPool.query(
            `INSERT INTO farm_memberships (farm_id, user_id, role, status, invited_by_user_id, invited_email, joined_at)
             VALUES ($1, $2, $3, 'active', $4, $5, NOW())
             ON CONFLICT (farm_id, user_id) DO UPDATE
             SET role = EXCLUDED.role,
                 status = 'active',
                 invited_by_user_id = COALESCE(EXCLUDED.invited_by_user_id, farm_memberships.invited_by_user_id),
                 invited_email = COALESCE(EXCLUDED.invited_email, farm_memberships.invited_email),
                 joined_at = COALESCE(farm_memberships.joined_at, NOW()),
                 updated_at = NOW()
             RETURNING *`,
            [farmId, userId, role, invitedByUserId || null, invitedEmail || null]
        );
        return result.rows[0];
    }
}

module.exports = FarmMembershipService;

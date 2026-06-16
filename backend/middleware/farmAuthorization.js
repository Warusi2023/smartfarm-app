/**
 * Farm-scoped authorization helpers (membership-based, not global roles).
 */

const { AuthorizationError, NotFoundError } = require('../utils/errors');

const FARM_ROLES = ['owner', 'manager', 'worker', 'viewer'];
const TASK_MANAGER_ROLES = ['owner', 'manager'];
const MEMBER_ADMIN_ROLES = ['owner'];

/**
 * @param {import('pg').Pool} pool
 * @param {string} userId
 * @param {string} farmId
 */
async function getActiveMembership(pool, userId, farmId) {
    const result = await pool.query(
        `SELECT m.*, u.email AS user_email, u.first_name, u.last_name
         FROM farm_memberships m
         JOIN users u ON u.id = m.user_id
         WHERE m.farm_id = $1 AND m.user_id = $2 AND m.status = 'active'`,
        [farmId, userId]
    );
    return result.rows[0] || null;
}

/**
 * @param {import('pg').Pool} pool
 * @param {string} userId
 * @param {string} farmId
 */
async function assertFarmAccess(pool, userId, farmId) {
    const row = await getActiveMembership(pool, userId, farmId);
    if (!row) {
        throw new AuthorizationError('Farm access denied');
    }
    return row;
}

function canManageFarmMembers(role) {
    return MEMBER_ADMIN_ROLES.includes(role);
}

function canManageFarmTasks(role) {
    return TASK_MANAGER_ROLES.includes(role);
}

function canViewFarmTasks(role) {
    return FARM_ROLES.includes(role);
}

/**
 * @param {string} role
 * @param {object} task row with assigned_to_user_id, created_by_user_id
 * @param {string} userId
 */
function canUpdateFarmTask(role, task, userId) {
    if (role === 'viewer') {
        return false;
    }
    if (TASK_MANAGER_ROLES.includes(role)) {
        return true;
    }
    if (role === 'worker') {
        return (
            task.assigned_to_user_id === userId ||
            task.created_by_user_id === userId
        );
    }
    return false;
}

function canCompleteFarmTask(role, task, userId) {
    return canUpdateFarmTask(role, task, userId);
}

function canCommentOnFarmTask(role) {
    return role !== 'viewer';
}

function mapMembershipRow(row) {
    if (!row) {
        return null;
    }
    return {
        id: row.id,
        farmId: row.farm_id,
        userId: row.user_id,
        role: row.role,
        status: row.status,
        invitedByUserId: row.invited_by_user_id,
        invitedEmail: row.invited_email,
        joinedAt: row.joined_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        userEmail: row.user_email,
        userName: [row.first_name, row.last_name].filter(Boolean).join(' ') || row.user_email
    };
}

/**
 * Express middleware factory — requires active farm membership.
 * Sets req.farmMembership and req.farmRole.
 */
function requireFarmMembership(dbPool) {
    return async (req, res, next) => {
        try {
            const farmId = req.params.farmId;
            const userId = req.user && req.user.id;
            if (!dbPool) {
                return res.status(503).json({
                    success: false,
                    error: 'Database unavailable',
                    code: 'DB_UNAVAILABLE'
                });
            }
            if (!farmId || !userId) {
                throw new AuthorizationError('Farm access denied');
            }
            const row = await assertFarmAccess(dbPool, userId, farmId);
            req.farmMembership = mapMembershipRow(row);
            req.farmRole = row.role;
            next();
        } catch (err) {
            next(err);
        }
    };
}

/**
 * @param {string[]} allowedRoles
 */
function requireFarmRole(...allowedRoles) {
    return (req, res, next) => {
        const role = req.farmRole;
        if (!role || !allowedRoles.includes(role)) {
            return next(new AuthorizationError('Insufficient farm permissions'));
        }
        next();
    };
}

module.exports = {
    FARM_ROLES,
    getActiveMembership,
    assertFarmAccess,
    canManageFarmMembers,
    canManageFarmTasks,
    canViewFarmTasks,
    canUpdateFarmTask,
    canCompleteFarmTask,
    canCommentOnFarmTask,
    mapMembershipRow,
    requireFarmMembership,
    requireFarmRole
};

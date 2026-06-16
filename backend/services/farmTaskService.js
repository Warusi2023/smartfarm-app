/**
 * Farm-scoped shared tasks and update history.
 */

const { NotFoundError, BadRequestError, AuthorizationError } = require('../utils/errors');
const {
    canManageFarmTasks,
    canUpdateFarmTask,
    canCompleteFarmTask,
    canCommentOnFarmTask
} = require('../middleware/farmAuthorization');

function mapTaskRow(row) {
    if (!row) {
        return null;
    }
    return {
        id: row.id,
        farmId: row.farm_id,
        title: row.title,
        description: row.description,
        category: row.category,
        status: row.status,
        priority: row.priority,
        assignedToUserId: row.assigned_to_user_id,
        createdByUserId: row.created_by_user_id,
        dueAt: row.due_at,
        sourceType: row.source_type,
        sourceId: row.source_id,
        completedAt: row.completed_at,
        completedByUserId: row.completed_by_user_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        assigneeEmail: row.assignee_email || null,
        assigneeName: row.assignee_name || null,
        createdByEmail: row.created_by_email || null
    };
}

function mapUpdateRow(row) {
    if (!row) {
        return null;
    }
    return {
        id: row.id,
        taskId: row.task_id,
        farmId: row.farm_id,
        userId: row.user_id,
        updateType: row.update_type,
        body: row.body,
        metadata: row.metadata || {},
        createdAt: row.created_at,
        userEmail: row.user_email || null,
        userName: row.user_name || null
    };
}

const TASK_SELECT = `
    t.*,
    au.email AS assignee_email,
    trim(concat(au.first_name, ' ', au.last_name)) AS assignee_name,
    cu.email AS created_by_email
`;

const TASK_JOINS = `
    FROM farm_tasks t
    LEFT JOIN users au ON au.id = t.assigned_to_user_id
    LEFT JOIN users cu ON cu.id = t.created_by_user_id
`;

class FarmTaskService {
    constructor(dbPool) {
        this.dbPool = dbPool;
    }

    async getTaskRow(farmId, taskId) {
        const result = await this.dbPool.query(
            `SELECT ${TASK_SELECT} ${TASK_JOINS}
             WHERE t.id = $1 AND t.farm_id = $2`,
            [taskId, farmId]
        );
        if (!result.rows[0]) {
            throw new NotFoundError('Task not found');
        }
        return result.rows[0];
    }

    async listTasks(farmId, { status, assignedToUserId } = {}) {
        const clauses = ['t.farm_id = $1'];
        const params = [farmId];
        let idx = 2;
        if (status) {
            clauses.push(`t.status = $${idx++}`);
            params.push(status);
        }
        if (assignedToUserId) {
            clauses.push(`t.assigned_to_user_id = $${idx++}`);
            params.push(assignedToUserId);
        }
        const result = await this.dbPool.query(
            `SELECT ${TASK_SELECT} ${TASK_JOINS}
             WHERE ${clauses.join(' AND ')}
             ORDER BY
                CASE t.priority
                    WHEN 'urgent' THEN 1
                    WHEN 'high' THEN 2
                    WHEN 'medium' THEN 3
                    ELSE 4
                END,
                t.due_at NULLS LAST,
                t.created_at DESC`,
            params
        );
        return result.rows.map(mapTaskRow);
    }

    async listMyTasks(farmId, userId) {
        return this.listTasks(farmId, { assignedToUserId: userId });
    }

    async createTask(farmRole, farmId, userId, payload) {
        if (!canManageFarmTasks(farmRole)) {
            throw new AuthorizationError('Insufficient permissions to create tasks');
        }
        const {
            title,
            description,
            category,
            priority,
            assignedToUserId,
            dueAt,
            sourceType,
            sourceId
        } = payload;

        if (assignedToUserId) {
            await this.assertAssigneeIsMember(farmId, assignedToUserId);
        }

        const result = await this.dbPool.query(
            `INSERT INTO farm_tasks (
                farm_id, title, description, category, priority,
                assigned_to_user_id, created_by_user_id, due_at, source_type, source_id
             ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             RETURNING id`,
            [
                farmId,
                title,
                description || null,
                category || 'general',
                priority || 'medium',
                assignedToUserId || null,
                userId,
                dueAt || null,
                sourceType || null,
                sourceId || null
            ]
        );
        const taskId = result.rows[0].id;
        if (assignedToUserId) {
            await this.addUpdate(taskId, farmId, userId, {
                updateType: 'reassigned',
                body: 'Task assigned on creation',
                metadata: { assignedToUserId }
            });
        }
        return this.getTask(farmId, taskId);
    }

    async updateTask(farmRole, farmId, taskId, userId, payload) {
        const existing = await this.getTaskRow(farmId, taskId);
        if (!canUpdateFarmTask(farmRole, existing, userId)) {
            throw new AuthorizationError('Insufficient permissions to update this task');
        }

        const fields = [];
        const params = [];
        let idx = 1;
        const allowed = {
            title: 'title',
            description: 'description',
            category: 'category',
            status: 'status',
            priority: 'priority',
            dueAt: 'due_at',
            assignedToUserId: 'assigned_to_user_id'
        };

        for (const [key, column] of Object.entries(allowed)) {
            if (payload[key] !== undefined) {
                if (key === 'assignedToUserId' && payload[key]) {
                    await this.assertAssigneeIsMember(farmId, payload[key]);
                }
                if (key === 'status' && !['open', 'in_progress', 'done', 'cancelled'].includes(payload[key])) {
                    throw new BadRequestError('Invalid task status');
                }
                fields.push(`${column} = $${idx++}`);
                params.push(payload[key]);
            }
        }

        if (!fields.length) {
            return mapTaskRow(existing);
        }

        const prevStatus = existing.status;
        const prevAssignee = existing.assigned_to_user_id;

        params.push(taskId, farmId);
        await this.dbPool.query(
            `UPDATE farm_tasks SET ${fields.join(', ')}, updated_at = NOW()
             WHERE id = $${idx++} AND farm_id = $${idx}`,
            params
        );

        if (payload.status && payload.status !== prevStatus) {
            await this.addUpdate(taskId, farmId, userId, {
                updateType: 'status_change',
                body: `Status changed to ${payload.status}`,
                metadata: { from: prevStatus, to: payload.status }
            });
        }
        if (payload.assignedToUserId !== undefined && payload.assignedToUserId !== prevAssignee) {
            await this.addUpdate(taskId, farmId, userId, {
                updateType: 'reassigned',
                body: 'Task reassigned',
                metadata: { from: prevAssignee, to: payload.assignedToUserId }
            });
        }

        return this.getTask(farmId, taskId);
    }

    async completeTask(farmRole, farmId, taskId, userId) {
        const existing = await this.getTaskRow(farmId, taskId);
        if (!canCompleteFarmTask(farmRole, existing, userId)) {
            throw new AuthorizationError('Insufficient permissions to complete this task');
        }
        if (existing.status === 'done') {
            return mapTaskRow(existing);
        }
        await this.dbPool.query(
            `UPDATE farm_tasks
             SET status = 'done', completed_at = NOW(), completed_by_user_id = $1, updated_at = NOW()
             WHERE id = $2 AND farm_id = $3`,
            [userId, taskId, farmId]
        );
        await this.addUpdate(taskId, farmId, userId, {
            updateType: 'completion',
            body: 'Task marked complete',
            metadata: {}
        });
        return this.getTask(farmId, taskId);
    }

    async addTaskUpdate(farmRole, farmId, taskId, userId, { updateType, body, metadata }) {
        await this.getTaskRow(farmId, taskId);
        if (!canCommentOnFarmTask(farmRole)) {
            throw new AuthorizationError('Viewers cannot add task updates');
        }
        const type = updateType || 'comment';
        if (!['comment', 'status_change', 'reassigned', 'completion', 'attachment'].includes(type)) {
            throw new BadRequestError('Invalid update type');
        }
        if (type === 'comment' && !body) {
            throw new BadRequestError('Comment body is required');
        }
        return this.addUpdate(taskId, farmId, userId, { updateType: type, body, metadata });
    }

    async listUpdates(farmId, taskId) {
        await this.getTaskRow(farmId, taskId);
        const result = await this.dbPool.query(
            `SELECT u.*, us.email AS user_email,
                    trim(concat(us.first_name, ' ', us.last_name)) AS user_name
             FROM farm_task_updates u
             JOIN users us ON us.id = u.user_id
             WHERE u.task_id = $1 AND u.farm_id = $2
             ORDER BY u.created_at ASC`,
            [taskId, farmId]
        );
        return result.rows.map(mapUpdateRow);
    }

    async getTask(farmId, taskId) {
        const row = await this.getTaskRow(farmId, taskId);
        const task = mapTaskRow(row);
        task.updates = await this.listUpdates(farmId, taskId);
        return task;
    }

    async addUpdate(taskId, farmId, userId, { updateType, body, metadata }) {
        const result = await this.dbPool.query(
            `INSERT INTO farm_task_updates (task_id, farm_id, user_id, update_type, body, metadata)
             VALUES ($1, $2, $3, $4, $5, $6::jsonb)
             RETURNING id`,
            [taskId, farmId, userId, updateType, body || null, JSON.stringify(metadata || {})]
        );
        const updateResult = await this.dbPool.query(
            `SELECT u.*, us.email AS user_email,
                    trim(concat(us.first_name, ' ', us.last_name)) AS user_name
             FROM farm_task_updates u
             JOIN users us ON us.id = u.user_id
             WHERE u.id = $1`,
            [result.rows[0].id]
        );
        return mapUpdateRow(updateResult.rows[0]);
    }

    async assertAssigneeIsMember(farmId, assigneeUserId) {
        const result = await this.dbPool.query(
            `SELECT id FROM farm_memberships
             WHERE farm_id = $1 AND user_id = $2 AND status = 'active'`,
            [farmId, assigneeUserId]
        );
        if (!result.rows[0]) {
            throw new BadRequestError('Assignee must be an active farm member');
        }
    }
}

module.exports = FarmTaskService;

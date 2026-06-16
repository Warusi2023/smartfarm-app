/**
 * Farm authorization helper tests
 */
const {
    canManageFarmMembers,
    canManageFarmTasks,
    canUpdateFarmTask,
    canCompleteFarmTask,
    canCommentOnFarmTask
} = require('../../middleware/farmAuthorization');

describe('farmAuthorization', () => {
    const task = {
        assigned_to_user_id: 'worker-1',
        created_by_user_id: 'owner-1'
    };

    it('restricts member management to owner', () => {
        expect(canManageFarmMembers('owner')).toBe(true);
        expect(canManageFarmMembers('manager')).toBe(false);
    });

    it('allows managers to manage tasks', () => {
        expect(canManageFarmTasks('owner')).toBe(true);
        expect(canManageFarmTasks('manager')).toBe(true);
        expect(canManageFarmTasks('worker')).toBe(false);
    });

    it('lets workers update assigned tasks only', () => {
        expect(canUpdateFarmTask('worker', task, 'worker-1')).toBe(true);
        expect(canUpdateFarmTask('worker', task, 'other')).toBe(false);
        expect(canUpdateFarmTask('viewer', task, 'worker-1')).toBe(false);
    });

    it('allows comments for non-viewers', () => {
        expect(canCommentOnFarmTask('worker')).toBe(true);
        expect(canCommentOnFarmTask('viewer')).toBe(false);
    });

    it('lets managers complete any task', () => {
        expect(canCompleteFarmTask('manager', task, 'manager-1')).toBe(true);
    });
});

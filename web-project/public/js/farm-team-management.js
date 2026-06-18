/**
 * Farm team — memberships, invitations, shared tasks (PR 1).
 */
(function (global) {
    'use strict';

    const TASKS_ROOT = 'tasksView';
    const TEAM_ROOT = 'teamManagementView';
    const PRIORITY_CLASS = {
        urgent: 'danger',
        high: 'warning',
        medium: 'primary',
        low: 'secondary'
    };
    const STATUS_CLASS = {
        open: 'secondary',
        in_progress: 'info',
        done: 'success',
        cancelled: 'dark'
    };

    let currentFarmId = null;
    let currentFarmRole = null;
    let membersCache = [];
    let tasksCache = [];

    function $(id) {
        return document.getElementById(id);
    }

    function notify(message, type) {
        if (typeof global.showNotification === 'function') {
            global.showNotification(message, type || 'info');
        } else if (typeof global.showAlert === 'function') {
            global.showAlert(message, type || 'info');
        } else {
            console.log('[FarmTeam]', message);
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text == null ? '' : String(text);
        return div.innerHTML;
    }

    function formatDate(iso) {
        if (!iso) {
            return '—';
        }
        try {
            return new Date(iso).toLocaleDateString();
        } catch (_) {
            return String(iso).slice(0, 10);
        }
    }

    async function resolveFarmContext() {
        if (!global.SmartFarmAPI || typeof global.SmartFarmAPI.getFarms !== 'function') {
            return null;
        }
        const response = await global.SmartFarmAPI.getFarms();
        if (!response || response.success === false || !response.data || !response.data.length) {
            return null;
        }
        const farm = response.data[0];
        currentFarmId = farm.id;
        currentFarmRole = farm.membershipRole || 'owner';
        const label = $('ftFarmLabel');
        if (label) {
            label.textContent = `${farm.name} · ${currentFarmRole}`;
        }
        const teamLabel = $('ftTeamFarmLabel');
        if (teamLabel) {
            teamLabel.textContent = `${farm.name} · your role: ${currentFarmRole}`;
        }
        return farm;
    }

    function canManageTeam() {
        return currentFarmRole === 'owner';
    }

    function canManageTasks() {
        return currentFarmRole === 'owner' || currentFarmRole === 'manager';
    }

    function updateTeamUiVisibility() {
        const inviteBtn = $('ftInviteBtn');
        const createTaskBtn = $('ftCreateTaskBtn');
        const teamNav = document.querySelector('[data-nav-team]');
        if (inviteBtn) {
            inviteBtn.style.display = canManageTeam() ? '' : 'none';
        }
        if (createTaskBtn) {
            createTaskBtn.style.display = canManageTasks() ? '' : 'none';
        }
        if (teamNav) {
            teamNav.style.display = canManageTeam() || currentFarmRole === 'manager' ? '' : 'none';
        }
    }

    function renderMembers(members) {
        const el = $('ftMembersList');
        if (!el) {
            return;
        }
        if (!members.length) {
            el.innerHTML = '<p class="text-muted mb-0">No members yet.</p>';
            return;
        }
        el.innerHTML = `
            <div class="table-responsive">
                <table class="table table-sm table-custom mb-0">
                    <thead><tr><th>Member</th><th>Role</th><th></th></tr></thead>
                    <tbody>
                        ${members.map((m) => `
                            <tr>
                                <td>${escapeHtml(m.userName || m.userEmail)}<br><small class="text-muted">${escapeHtml(m.userEmail)}</small></td>
                                <td>${escapeHtml(m.role)}</td>
                                <td class="text-end">
                                    ${canManageTeam() && m.role !== 'owner'
                                        ? `<button type="button" class="btn btn-sm btn-outline-danger" onclick="FarmTeamManagement.removeMember('${m.id}')">Remove</button>`
                                        : ''}
                                </td>
                            </tr>`).join('')}
                    </tbody>
                </table>
            </div>`;
    }

    function renderTasks(tasks, targetId, showAssignActions) {
        const el = $(targetId);
        if (!el) {
            return;
        }
        if (!tasks.length) {
            el.innerHTML = '<p class="text-muted mb-0">No tasks yet.</p>';
            return;
        }
        el.innerHTML = tasks.map((t) => {
            const pClass = PRIORITY_CLASS[t.priority] || 'secondary';
            const sClass = STATUS_CLASS[t.status] || 'secondary';
            const canComplete = t.status !== 'done' && (canManageTasks() || t.assignedToUserId);
            return `
                <div class="border rounded p-3 mb-2">
                    <div class="d-flex justify-content-between align-items-start gap-2">
                        <div>
                            <strong>${escapeHtml(t.title)}</strong>
                            <span class="badge bg-${pClass} ms-2">${escapeHtml(t.priority)}</span>
                            <span class="badge bg-${sClass} ms-1">${escapeHtml(t.status)}</span>
                            ${t.description ? `<p class="small text-muted mb-1 mt-1">${escapeHtml(t.description)}</p>` : ''}
                            <p class="small mb-0">Due: ${formatDate(t.dueAt)} · Assigned: ${escapeHtml(t.assigneeName || t.assigneeEmail || 'Unassigned')}</p>
                        </div>
                        <div class="text-nowrap">
                            ${showAssignActions && canComplete
                                ? `<button type="button" class="btn btn-sm btn-success me-1" onclick="FarmTeamManagement.completeTask('${t.id}')">Complete</button>`
                                : ''}
                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="FarmTeamManagement.promptComment('${t.id}')">Note</button>
                        </div>
                    </div>
                </div>`;
        }).join('');
    }

    async function loadMembers() {
        if (!currentFarmId) {
            await resolveFarmContext();
        }
        if (!currentFarmId) {
            notify('No farm found. Create a farm first.', 'warning');
            return;
        }
        const response = await global.SmartFarmAPI.getFarmMembers(currentFarmId);
        if (!response || response.success === false) {
            notify(response && response.error ? response.error : 'Failed to load members', 'danger');
            return;
        }
        membersCache = response.data || [];
        renderMembers(membersCache);
        updateTeamUiVisibility();
    }

    async function loadFarmTasks() {
        if (!currentFarmId) {
            await resolveFarmContext();
        }
        if (!currentFarmId) {
            return;
        }
        const response = await global.SmartFarmAPI.getFarmTasks(currentFarmId);
        if (!response || response.success === false) {
            notify(response && response.error ? response.error : 'Failed to load tasks', 'danger');
            return;
        }
        tasksCache = response.data || [];
        renderTasks(tasksCache, 'ftTasksList', true);
        updateTeamUiVisibility();
    }

    async function loadMyTasks() {
        if (!currentFarmId) {
            await resolveFarmContext();
        }
        if (!currentFarmId) {
            return;
        }
        const response = await global.SmartFarmAPI.getMyFarmTasks(currentFarmId);
        if (!response || response.success === false) {
            notify(response && response.error ? response.error : 'Failed to load my tasks', 'danger');
            return;
        }
        renderTasks(response.data || [], 'ftMyTasksList', true);
    }

    function fullAcceptUrl(relative) {
        if (!relative) {
            return '';
        }
        if (/^https?:\/\//i.test(relative)) {
            return relative;
        }
        const path = relative.startsWith('/') ? relative : `/${relative}`;
        return `${global.location.origin}${path}`;
    }

    async function copyInviteLink(url) {
        if (!url) {
            return false;
        }
        try {
            if (global.navigator && global.navigator.clipboard && global.navigator.clipboard.writeText) {
                await global.navigator.clipboard.writeText(url);
                return true;
            }
        } catch (_) {
            /* fall through */
        }
        return false;
    }

    async function inviteMember() {
        if (!canManageTeam()) {
            notify('Only the farm owner can invite members', 'warning');
            return;
        }
        const email = ($('ftInviteEmail') && $('ftInviteEmail').value || '').trim();
        const role = ($('ftInviteRole') && $('ftInviteRole').value) || 'worker';
        if (!email) {
            notify('Enter an email address', 'warning');
            return;
        }
        const response = await global.SmartFarmAPI.inviteFarmMember(currentFarmId, { email, role });
        if (!response || response.success === false) {
            const err = response && response.error ? response.error : 'Invite failed';
            if (/pending invitation already exists/i.test(err)) {
                notify(
                    'A pending invite already exists for this email. Invite again to refresh the link, then copy it.',
                    'warning'
                );
            } else {
                notify(err, 'danger');
            }
            return;
        }
        const acceptUrl = fullAcceptUrl(response.data && response.data.acceptUrl);
        const resent = !!(response.data && response.data.resent);
        const copied = await copyInviteLink(acceptUrl);
        if (resent) {
            notify(
                copied
                    ? 'Pending invite already existed — fresh link copied.'
                    : `Pending invite already existed — fresh link: ${acceptUrl}`,
                'success'
            );
        } else {
            notify(
                copied
                    ? 'Invitation created — invite link copied.'
                    : `Invitation created. Share link: ${acceptUrl}`,
                'success'
            );
        }
        if ($('ftInviteEmail')) {
            $('ftInviteEmail').value = '';
        }
    }

    async function removeMember(membershipId) {
        if (!confirm('Remove this member from the farm?')) {
            return;
        }
        const response = await global.SmartFarmAPI.removeFarmMember(currentFarmId, membershipId);
        if (!response || response.success === false) {
            notify(response && response.error ? response.error : 'Remove failed', 'danger');
            return;
        }
        notify('Member removed', 'success');
        loadMembers();
    }

    async function createTask() {
        if (!canManageTasks()) {
            notify('Insufficient permissions to create tasks', 'warning');
            return;
        }
        const title = ($('ftTaskTitle') && $('ftTaskTitle').value || '').trim();
        const description = ($('ftTaskDescription') && $('ftTaskDescription').value || '').trim();
        const priority = ($('ftTaskPriority') && $('ftTaskPriority').value) || 'medium';
        const assignedToUserId = ($('ftTaskAssignee') && $('ftTaskAssignee').value) || undefined;
        if (!title) {
            notify('Task title is required', 'warning');
            return;
        }
        const payload = { title, description, priority };
        if (assignedToUserId) {
            payload.assignedToUserId = assignedToUserId;
        }
        const response = await global.SmartFarmAPI.createFarmTask(currentFarmId, payload);
        if (!response || response.success === false) {
            notify(response && response.error ? response.error : 'Create task failed', 'danger');
            return;
        }
        notify('Task created', 'success');
        if ($('ftTaskTitle')) {
            $('ftTaskTitle').value = '';
        }
        if ($('ftTaskDescription')) {
            $('ftTaskDescription').value = '';
        }
        loadFarmTasks();
    }

    async function completeTask(taskId) {
        const response = await global.SmartFarmAPI.completeFarmTask(currentFarmId, taskId);
        if (!response || response.success === false) {
            notify(response && response.error ? response.error : 'Could not complete task', 'danger');
            return;
        }
        notify('Task completed', 'success');
        loadFarmTasks();
        loadMyTasks();
    }

    async function promptComment(taskId) {
        const body = prompt('Add a note or comment for this task:');
        if (!body || !body.trim()) {
            return;
        }
        const response = await global.SmartFarmAPI.addFarmTaskUpdate(currentFarmId, taskId, {
            updateType: 'comment',
            body: body.trim()
        });
        if (!response || response.success === false) {
            notify(response && response.error ? response.error : 'Could not add note', 'danger');
            return;
        }
        notify('Note added', 'success');
    }

    function populateAssigneeSelect() {
        const select = $('ftTaskAssignee');
        if (!select) {
            return;
        }
        const options = ['<option value="">Unassigned</option>'].concat(
            membersCache
                .filter((m) => m.status === 'active' && m.role !== 'viewer')
                .map((m) => `<option value="${m.userId}">${escapeHtml(m.userName || m.userEmail)} (${m.role})</option>`)
        );
        select.innerHTML = options.join('');
    }

    async function loadTasksView() {
        await resolveFarmContext();
        await loadMembers();
        populateAssigneeSelect();
        await loadFarmTasks();
        await loadMyTasks();
        updateTeamUiVisibility();
    }

    async function loadTeamView() {
        await resolveFarmContext();
        await loadMembers();
        updateTeamUiVisibility();
    }

    async function handleInviteTokenFromUrl() {
        const params = new URLSearchParams(global.location.search);
        const token = params.get('farmInvite');
        if (!token) {
            return;
        }
        if (!global.SmartFarmAPI) {
            return;
        }
        const accept = confirm('You have a farm team invitation. Accept and join this farm workspace?');
        if (!accept) {
            const decline = await global.SmartFarmAPI.declineFarmInvitation(token);
            notify(decline && decline.success ? 'Invitation declined' : 'Could not decline invitation', 'info');
            return;
        }
        const response = await global.SmartFarmAPI.acceptFarmInvitation(token);
        if (!response || response.success === false) {
            notify(response && response.error ? response.error : 'Could not accept invitation', 'danger');
            return;
        }
        notify(`Joined farm: ${(response.data && response.data.farmName) || 'success'}`, 'success');
        params.delete('farmInvite');
        const next = params.toString() ? `?${params}` : global.location.pathname;
        global.history.replaceState({}, '', next);
        currentFarmId = null;
        await resolveFarmContext();
    }

    function init() {
        if ($('ftInviteBtn')) {
            $('ftInviteBtn').addEventListener('click', inviteMember);
        }
        if ($('ftCreateTaskBtn')) {
            $('ftCreateTaskBtn').addEventListener('click', createTask);
        }
        handleInviteTokenFromUrl();
    }

    global.FarmTeamManagement = {
        init,
        loadTasksView,
        loadTeamView,
        loadMembers,
        loadFarmTasks,
        loadMyTasks,
        inviteMember,
        removeMember,
        createTask,
        completeTask,
        promptComment
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(typeof window !== 'undefined' ? window : global);

-- Farm team access + shared tasks (PR 1)

CREATE TABLE IF NOT EXISTS farm_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'manager', 'worker', 'viewer')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('pending', 'active', 'revoked')),
    invited_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    invited_email TEXT,
    joined_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (farm_id, user_id)
);

CREATE TABLE IF NOT EXISTS farm_invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('manager', 'worker', 'viewer')),
    invited_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'revoked')),
    expires_at TIMESTAMPTZ NOT NULL,
    accepted_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS farm_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'general',
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'done', 'cancelled')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assigned_to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    due_at TIMESTAMPTZ,
    source_type TEXT,
    source_id UUID,
    completed_at TIMESTAMPTZ,
    completed_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS farm_task_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES farm_tasks(id) ON DELETE CASCADE,
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    update_type TEXT NOT NULL CHECK (update_type IN ('comment', 'status_change', 'reassigned', 'completion', 'attachment')),
    body TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_farm_memberships_farm_user ON farm_memberships(farm_id, user_id);
CREATE INDEX IF NOT EXISTS idx_farm_memberships_user_active ON farm_memberships(user_id) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_farm_invitations_token_hash ON farm_invitations(token_hash);
CREATE INDEX IF NOT EXISTS idx_farm_tasks_farm_status_assignee ON farm_tasks(farm_id, status, assigned_to_user_id);
CREATE INDEX IF NOT EXISTS idx_farm_task_updates_task_created ON farm_task_updates(task_id, created_at);

CREATE UNIQUE INDEX IF NOT EXISTS idx_farm_invitations_pending_farm_email
    ON farm_invitations(farm_id, lower(email))
    WHERE status = 'pending';

-- Backfill owner memberships for existing farms
INSERT INTO farm_memberships (farm_id, user_id, role, status, joined_at, created_at, updated_at)
SELECT f.id, f.user_id, 'owner', 'active', f.created_at, f.created_at, f.updated_at
FROM farms f
WHERE NOT EXISTS (
    SELECT 1 FROM farm_memberships m WHERE m.farm_id = f.id AND m.user_id = f.user_id
);

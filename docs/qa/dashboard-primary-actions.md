## Dashboard primary actions — manual QA (browser)

**General:** Logged-in session, hard-refresh if behavior looks cached, watch the console while clicking.

### Crop Management

| Step | Where to click | Expected | Failure |
|------|----------------|----------|---------|
| 1 | Left nav → **Crop Management** | Crop Management view (header, stats/cards). | Wrong view, blank panel, or console error on load. |
| 2 | Main header **+ Add New Crop** | **Add New Crop** modal (form visible). | Nothing opens, wrong modal, repeated click does nothing. |
| 3 | Sidebar **Quick Actions** → **Add Crop** | Same **Add New Crop** modal. | No modal, or only view change with no modal. |

### Tasks

| Step | Where to click | Expected | Failure |
|------|----------------|----------|---------|
| 1 | Left nav → **Tasks** | Tasks view (table/area). | Wrong view or broken layout. |
| 2 | Sidebar **Create Task** (from another view, e.g. Farm Overview) | Switches to Tasks, then **Add New Task** modal. | Stays on old view, or Tasks without add-task modal. |
| 3 | Sidebar **Create Task** while **already on Tasks** | **Add New Task** modal opens. | No modal (dead click). |
| 4 | Tasks view → **Add Task** (main button, if shown) | **Add New Task** modal. | No modal or blocked handler. |

### Livestock

| Step | Where to click | Expected | Failure |
|------|----------------|----------|---------|
| 1 | Left nav → **Livestock** | Livestock view. | Wrong view or error. |
| 2 | Main header **+ Add New Animal** | Add livestock modal (**Add New Livestock** / similar). | No modal or wrong dialog. |
| 3 | Sidebar **Add Livestock** | Same add-livestock modal. | No modal or navigation only. |

### Inventory

| Step | Where to click | Expected | Failure |
|------|----------------|----------|---------|
| 1 | Left nav → **Inventory** | Inventory table/section. | Wrong view or error state. |
| 2 | **Add Item** | Prompt/step flow starts (e.g. item name). | Nothing happens, or flow stops with no feedback. |

### Farm Overview — sidebar quick actions

| Step | Where to click | Expected | Failure |
|------|----------------|----------|---------|
| 1 | **Add Crop** | **Add New Crop** modal. | No modal. |
| 2 | **Add Livestock** | Add-livestock modal. | No modal. |
| 3 | **Feed Mix** | Feed mix calculator modal (or clear error if missing). | Silent failure or wrong UI. |
| 4 | **Create Task** | Tasks view + **Add New Task** modal. | No add-task modal, or only view switch. |

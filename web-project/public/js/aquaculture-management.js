/**
 * Aquaculture management (Phase 1) — units, daily logs, rule-based alerts.
 */
(function (global) {
    'use strict';

    const ROOT_ID = 'aquacultureManagementView';
    const STATUS_CLASS = {
        ok: 'success',
        info: 'info',
        warning: 'warning',
        critical: 'danger'
    };

    let selectedUnitId = null;
    let currentFarmId = null;
    let unitsCache = [];

    function $(id) {
        return document.getElementById(id);
    }

    function notify(message, type) {
        if (typeof global.showNotification === 'function') {
            global.showNotification(message, type || 'info');
        } else if (typeof global.showAlert === 'function') {
            global.showAlert(message, type || 'info');
        } else {
            console.log('[Aquaculture]', message);
        }
    }

    function todayIso() {
        return new Date().toISOString().slice(0, 10);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text == null ? '' : String(text);
        return div.innerHTML;
    }

    function statusBadge(status) {
        const cls = STATUS_CLASS[status] || 'secondary';
        const label = (status || 'ok').toUpperCase();
        return `<span class="badge bg-${cls}">${label}</span>`;
    }

    async function resolveFarmId() {
        if (currentFarmId) {
            return currentFarmId;
        }
        if (!global.SmartFarmAPI || typeof global.SmartFarmAPI.getFarms !== 'function') {
            return null;
        }
        const response = await global.SmartFarmAPI.getFarms();
        if (!response || response.success === false || !response.data || !response.data.length) {
            return null;
        }
        currentFarmId = response.data[0].id;
        return currentFarmId;
    }

    function renderUnitsList(units) {
        const listEl = $('aqUnitsList');
        if (!listEl) {
            return;
        }
        if (!units.length) {
            listEl.innerHTML = `
                <div class="text-center text-muted py-4">
                    <i class="fas fa-fish fa-2x mb-2"></i>
                    <p class="mb-0">No aquaculture units yet. Create your first pond or tank.</p>
                </div>`;
            return;
        }
        listEl.innerHTML = units.map((unit) => {
            const active = unit.id === selectedUnitId ? 'border-primary bg-light' : '';
            return `
                <button type="button" class="list-group-item list-group-item-action ${active}"
                    data-unit-id="${escapeHtml(unit.id)}" onclick="AquacultureManagement.selectUnit('${unit.id}')">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <strong>${escapeHtml(unit.name)}</strong>
                            <div class="small text-muted text-capitalize">${escapeHtml(unit.unitType)} · ${escapeHtml(unit.species)}</div>
                        </div>
                        ${statusBadge(unit.overallStatus)}
                    </div>
                </button>`;
        }).join('');
    }

    function renderAlerts(alerts, overallStatus) {
        const panel = $('aqAlertsPanel');
        if (!panel) {
            return;
        }
        const header = $('aqOverallStatus');
        if (header) {
            header.innerHTML = statusBadge(overallStatus || 'ok');
        }
        if (!alerts || !alerts.length) {
            panel.innerHTML = '<p class="text-muted mb-0">No alerts — all readings look good.</p>';
            return;
        }
        panel.innerHTML = alerts.map((alert) => {
            const cls = STATUS_CLASS[alert.severity] || 'secondary';
            return `
                <div class="alert alert-${cls} py-2 mb-2">
                    <strong>${escapeHtml(alert.code)}</strong> — ${escapeHtml(alert.message)}
                </div>`;
        }).join('');
    }

    function fillLogForm(log) {
        const setVal = (id, val) => {
            const el = $(id);
            if (el) {
                el.value = val != null && val !== '' ? val : '';
            }
        };
        setVal('aqFeedAmountKg', log && log.feedAmountKg);
        setVal('aqMortalityCount', log && log.mortalityCount != null ? log.mortalityCount : 0);
        setVal('aqEstimatedStock', log && log.estimatedStockCount);
        setVal('aqAverageWeightG', log && log.averageWeightG);
        setVal('aqWaterTempC', log && log.waterTempC);
        setVal('aqPh', log && log.ph);
        setVal('aqDissolvedOxygen', log && log.dissolvedOxygenMgl);
        setVal('aqLogNotes', log && log.notes);
    }

    function renderUnitDetail(unit) {
        const detailEl = $('aqUnitDetail');
        const formWrap = $('aqLogFormWrap');
        if (!detailEl) {
            return;
        }
        if (!unit) {
            detailEl.innerHTML = '<p class="text-muted mb-0">Select a unit to view status and log daily readings.</p>';
            if (formWrap) {
                formWrap.style.display = 'none';
            }
            renderAlerts([], 'ok');
            return;
        }
        detailEl.innerHTML = `
            <h5 class="mb-1">${escapeHtml(unit.name)}</h5>
            <p class="text-muted text-capitalize mb-2">${escapeHtml(unit.unitType)} · ${escapeHtml(unit.species)}${unit.speciesOther ? ' (' + escapeHtml(unit.speciesOther) + ')' : ''}</p>
            ${unit.capacityNotes ? `<p class="small mb-2">${escapeHtml(unit.capacityNotes)}</p>` : ''}
            <div class="mb-2">${statusBadge(unit.overallStatus)}</div>`;
        if (formWrap) {
            formWrap.style.display = 'block';
        }
        fillLogForm(unit.todayLog);
        renderAlerts(unit.alerts, unit.overallStatus);
    }

    async function loadUnits() {
        const farmId = await resolveFarmId();
        const farmLabel = $('aqFarmLabel');
        if (!farmId) {
            if (farmLabel) {
                farmLabel.textContent = 'Create a farm first to manage aquaculture units.';
            }
            renderUnitsList([]);
            renderUnitDetail(null);
            return;
        }
        if (farmLabel) {
            farmLabel.textContent = 'Showing units for your active farm.';
        }
        try {
            const response = await global.SmartFarmAPI.getAquacultureUnits({ farmId });
            if (!response || response.success === false) {
                notify(response && response.error ? response.error : 'Failed to load aquaculture units', 'danger');
                return;
            }
            unitsCache = response.data || [];
            renderUnitsList(unitsCache);
            if (selectedUnitId) {
                const unit = unitsCache.find((u) => u.id === selectedUnitId);
                renderUnitDetail(unit || null);
            } else if (unitsCache.length === 1) {
                await selectUnit(unitsCache[0].id);
            } else {
                renderUnitDetail(null);
            }
        } catch (error) {
            notify(error.message || 'Failed to load aquaculture units', 'danger');
        }
    }

    async function selectUnit(unitId) {
        selectedUnitId = unitId;
        try {
            const response = await global.SmartFarmAPI.getAquacultureUnit(unitId);
            if (!response || response.success === false) {
                notify(response && response.error ? response.error : 'Failed to load unit', 'danger');
                return;
            }
            const unit = response.data;
            const idx = unitsCache.findIndex((u) => u.id === unitId);
            if (idx >= 0) {
                unitsCache[idx] = unit;
            } else {
                unitsCache.push(unit);
            }
            renderUnitsList(unitsCache);
            renderUnitDetail(unit);
        } catch (error) {
            notify(error.message || 'Failed to load unit', 'danger');
        }
    }

    async function createUnit() {
        const farmId = await resolveFarmId();
        if (!farmId) {
            notify('Create a farm before adding aquaculture units.', 'warning');
            return;
        }
        const name = ($('aqNewUnitName') && $('aqNewUnitName').value || '').trim();
        const unitType = $('aqNewUnitType') ? $('aqNewUnitType').value : 'pond';
        const species = $('aqNewUnitSpecies') ? $('aqNewUnitSpecies').value : 'tilapia';
        const speciesOther = ($('aqNewSpeciesOther') && $('aqNewSpeciesOther').value || '').trim();
        const capacityNotes = ($('aqNewCapacityNotes') && $('aqNewCapacityNotes').value || '').trim();
        if (!name) {
            notify('Unit name is required.', 'warning');
            return;
        }
        try {
            const response = await global.SmartFarmAPI.createAquacultureUnit({
                farmId,
                name,
                unitType,
                species,
                speciesOther: species === 'other' ? speciesOther : undefined,
                capacityNotes: capacityNotes || undefined
            });
            if (!response || response.success === false) {
                notify(response && response.error ? response.error : 'Failed to create unit', 'danger');
                return;
            }
            notify('Aquaculture unit created.', 'success');
            if ($('aqNewUnitName')) {
                $('aqNewUnitName').value = '';
            }
            if ($('aqNewCapacityNotes')) {
                $('aqNewCapacityNotes').value = '';
            }
            const modalEl = $('aqCreateUnitModal');
            if (modalEl && global.bootstrap && global.bootstrap.Modal) {
                const modal = global.bootstrap.Modal.getInstance(modalEl);
                if (modal) {
                    modal.hide();
                }
            }
            selectedUnitId = response.data.id;
            await loadUnits();
        } catch (error) {
            notify(error.message || 'Failed to create unit', 'danger');
        }
    }

    async function saveDailyLog() {
        if (!selectedUnitId) {
            notify('Select a unit first.', 'warning');
            return;
        }
        const numOrNull = (id) => {
            const el = $(id);
            if (!el || el.value === '') {
                return null;
            }
            const n = Number(el.value);
            return Number.isFinite(n) ? n : null;
        };
        const payload = {
            logDate: todayIso(),
            feedAmountKg: numOrNull('aqFeedAmountKg'),
            mortalityCount: numOrNull('aqMortalityCount') != null ? Math.max(0, Math.round(numOrNull('aqMortalityCount'))) : 0,
            estimatedStockCount: numOrNull('aqEstimatedStock') != null ? Math.max(1, Math.round(numOrNull('aqEstimatedStock'))) : null,
            averageWeightG: numOrNull('aqAverageWeightG'),
            waterTempC: numOrNull('aqWaterTempC'),
            ph: numOrNull('aqPh'),
            dissolvedOxygenMgl: numOrNull('aqDissolvedOxygen'),
            notes: ($('aqLogNotes') && $('aqLogNotes').value || '').trim() || undefined
        };
        try {
            const response = await global.SmartFarmAPI.saveAquacultureLog(selectedUnitId, payload);
            if (!response || response.success === false) {
                notify(response && response.error ? response.error : 'Failed to save log', 'danger');
                return;
            }
            notify('Daily log saved.', 'success');
            await selectUnit(selectedUnitId);
        } catch (error) {
            notify(error.message || 'Failed to save log', 'danger');
        }
    }

    function showCreateModal() {
        const modalEl = $('aqCreateUnitModal');
        if (modalEl && global.bootstrap && global.bootstrap.Modal) {
            global.bootstrap.Modal.getOrCreateInstance(modalEl).show();
        }
    }

    function init() {
        const root = $(ROOT_ID);
        if (!root) {
            return;
        }
        const saveBtn = $('aqSaveLogBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', saveDailyLog);
        }
        const createBtn = $('aqCreateUnitBtn');
        if (createBtn) {
            createBtn.addEventListener('click', showCreateModal);
        }
        const confirmCreate = $('aqConfirmCreateUnit');
        if (confirmCreate) {
            confirmCreate.addEventListener('click', createUnit);
        }
    }

    global.AquacultureManagement = {
        init,
        loadUnits,
        selectUnit,
        createUnit,
        saveDailyLog,
        showCreateModal
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(typeof window !== 'undefined' ? window : global);

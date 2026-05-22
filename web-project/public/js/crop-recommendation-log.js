/**
 * Crop recommendation action log, soil tests, and next-step alerts.
 */
(function (global) {
    'use strict';

    const LS_KEY = 'smartfarm_crop_rec_cache';

    let showAlertFn = (msg, type) => console.log(type, msg);
    let formatDateFn = (d) => (d ? String(d).slice(0, 10) : '—');

    let adviceContext = null;

    function getApiBase() {
        if (global.SmartFarmApiConfig && global.SmartFarmApiConfig.baseUrl) {
            return global.SmartFarmApiConfig.baseUrl.replace(/\/$/, '').replace(/\/api$/i, '');
        }
        if (global.SmartFarmConfig && global.SmartFarmConfig.API_BASE_URL) {
            return global.SmartFarmConfig.API_BASE_URL.replace(/\/$/, '').replace(/\/api$/i, '');
        }
        return 'https://web-production-86d39.up.railway.app';
    }

    function apiUrl(path) {
        const base = getApiBase();
        const p = path.startsWith('/') ? path : '/' + path;
        if (p.startsWith('/api/')) return base + p;
        return base + '/api' + p;
    }

    async function apiRequest(method, path, body) {
        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
        const token =
            global.localStorage?.getItem('smartfarm_token') ||
            global.sessionStorage?.getItem('smartfarm_token');
        if (token) headers.Authorization = 'Bearer ' + token;

        const res = await fetch(apiUrl(path), {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw new Error(data.error || data.message || 'Request failed');
        }
        return data;
    }

    function cacheLocal(entry) {
        try {
            const raw = global.localStorage.getItem(LS_KEY);
            const cache = raw ? JSON.parse(raw) : { actions: [], alerts: [], soilTests: [] };
            Object.keys(entry).forEach((k) => {
                if (Array.isArray(entry[k])) cache[k] = (cache[k] || []).concat(entry[k]);
            });
            global.localStorage.setItem(LS_KEY, JSON.stringify(cache));
        } catch (e) {
            console.warn('Local cache update failed', e);
        }
    }

    function setAdviceContext(crop, recommendations) {
        adviceContext = { crop, recommendations, recommendationId: null };
        return adviceContext;
    }

    async function saveSnapshot(crop, recommendations) {
        const payload = {
            cropId: crop.id,
            cropName: crop.name,
            variety: crop.variety,
            fieldId: crop.field,
            fieldName: crop.field,
            growthStage: recommendations.growthStage,
            recommendationPayload: recommendations,
            source: 'ai-advisory'
        };
        try {
            const res = await apiRequest('POST', '/crop-recommendations/snapshots', payload);
            if (adviceContext) adviceContext.recommendationId = res.data.id;
            return res.data;
        } catch (e) {
            console.warn('Snapshot API failed, continuing locally', e);
            return null;
        }
    }

    function buildActionPresets(crop, recommendations) {
        const presets = [];
        (recommendations.fertilizer || []).forEach((f, i) => {
            presets.push({
                actionType: 'fertilizer',
                recommendationText: `${f.name} — ${f.amount} (${f.application})`,
                applicationText: f.application,
                frequencyText: f.application,
                unit: 'kg/ha'
            });
        });
        if (recommendations.watering) {
            const w = recommendations.watering;
            presets.push({
                actionType: 'watering',
                recommendationText: `Water: ${w.frequency}, ${w.amount}, ${w.method}`,
                applicationText: w.frequency,
                frequencyText: w.frequency,
                unit: 'cm'
            });
        }
        if (presets.length === 0) {
            presets.push({
                actionType: 'general',
                recommendationText: `General care for ${crop.name}`,
                applicationText: 'Review in 2 weeks',
                unit: ''
            });
        }
        return presets;
    }

    function actionLogModalHtml() {
        return `
        <div class="modal fade" id="recActionLogModal" tabindex="-1">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-success text-white">
                <h5 class="modal-title"><i class="fas fa-clipboard-list me-2"></i>Log recommendation action</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <p class="text-muted small">Record what you did (or plan to do). The next reminder is estimated from the recommendation timing — not a precision schedule. Soil-based adjustments are heuristic estimates only.</p>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Action type</label>
                    <select class="form-select" id="ralActionType">
                      <option value="fertilizer">Fertilizer</option>
                      <option value="watering">Watering</option>
                      <option value="soil_test">Soil test</option>
                      <option value="ph_correction">pH correction</option>
                      <option value="compost">Compost / organic</option>
                      <option value="general">Other</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Status</label>
                    <select class="form-select" id="ralStatus">
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="not_started">Not started</option>
                      <option value="skipped">Skipped</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Recommended action</label>
                    <select class="form-select" id="ralPreset"></select>
                    <textarea class="form-control mt-2" id="ralRecText" rows="2"></textarea>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Scheduled date</label>
                    <input type="date" class="form-control" id="ralScheduled">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Completed date</label>
                    <input type="date" class="form-control" id="ralCompleted">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Next review (optional)</label>
                    <input type="date" class="form-control" id="ralNextReview">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Quantity</label>
                    <input type="number" step="any" class="form-control" id="ralQty" placeholder="e.g. 80">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Unit</label>
                    <select class="form-select" id="ralUnit">
                      <option value="kg/ha">kg/ha</option>
                      <option value="g/plant">g/plant</option>
                      <option value="L">liters</option>
                      <option value="cm">cm irrigation</option>
                      <option value="">—</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Method</label>
                    <input type="text" class="form-control" id="ralMethod" placeholder="broadcast, drip, foliar">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Performed by</label>
                    <input type="text" class="form-control" id="ralPerformedBy" placeholder="Name or team">
                  </div>
                  <div class="col-md-6" id="ralSkipWrap" style="display:none">
                    <label class="form-label">Skip reason</label>
                    <input type="text" class="form-control" id="ralSkipReason" placeholder="Why skipped?">
                  </div>
                  <div class="col-12">
                    <label class="form-label">Notes / observations</label>
                    <textarea class="form-control" id="ralNotes" rows="2"></textarea>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success" id="ralSaveBtn"><i class="fas fa-save me-1"></i>Save & create alert</button>
              </div>
            </div>
          </div>
        </div>`;
    }

    function soilTestModalHtml() {
        return `
        <div class="modal fade" id="recSoilTestModal" tabindex="-1">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title"><i class="fas fa-flask me-2"></i>Soil test (optional)</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <p class="text-muted small">Enter lab or field test values to refine fertilizer advice (heuristic estimate, not a replacement for agronomy advice).</p>
                <div class="row g-2">
                  <div class="col-md-4"><label class="form-label">Test date</label><input type="date" class="form-control" id="rstDate"></div>
                  <div class="col-md-4"><label class="form-label">pH</label><input type="number" step="0.1" class="form-control" id="rstPh"></div>
                  <div class="col-md-4"><label class="form-label">Moisture</label><input type="text" class="form-control" id="rstMoisture" placeholder="dry / moist"></div>
                  <div class="col-md-4"><label class="form-label">N (kg/ha)</label><input type="number" class="form-control" id="rstN"></div>
                  <div class="col-md-4"><label class="form-label">P (kg/ha)</label><input type="number" class="form-control" id="rstP"></div>
                  <div class="col-md-4"><label class="form-label">K (kg/ha)</label><input type="number" class="form-control" id="rstK"></div>
                  <div class="col-md-4"><label class="form-label">Ca</label><input type="number" class="form-control" id="rstCa"></div>
                  <div class="col-md-4"><label class="form-label">Mg</label><input type="number" class="form-control" id="rstMg"></div>
                  <div class="col-md-4"><label class="form-label">Organic matter %</label><input type="number" step="0.1" class="form-control" id="rstOm"></div>
                  <div class="col-12"><label class="form-label">Source / lab notes</label><input type="text" class="form-control" id="rstSource"></div>
                  <div class="col-12"><label class="form-label">Notes</label><textarea class="form-control" id="rstNotes" rows="2"></textarea></div>
                </div>
                <div id="rstRefinedBox" class="mt-3 d-none"></div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-outline-primary" id="rstRefineBtn">Preview adjusted advice</button>
                <button type="button" class="btn btn-primary" id="rstSaveBtn">Save soil test</button>
              </div>
            </div>
          </div>
        </div>`;
    }

    function openLogForm(presetIndex) {
        if (!adviceContext) {
            showAlertFn('Open AI advice for a crop first.', 'warning');
            return;
        }
        const existing = document.getElementById('recActionLogModal');
        if (existing) existing.remove();
        document.body.insertAdjacentHTML('beforeend', actionLogModalHtml());

        const presets = buildActionPresets(adviceContext.crop, adviceContext.recommendations);
        const sel = document.getElementById('ralPreset');
        presets.forEach((p, i) => {
            const opt = document.createElement('option');
            opt.value = String(i);
            opt.textContent = p.recommendationText.slice(0, 80);
            sel.appendChild(opt);
        });

        function fillFromPreset(idx) {
            const p = presets[idx] || presets[0];
            document.getElementById('ralActionType').value = p.actionType;
            document.getElementById('ralRecText').value = p.recommendationText;
            document.getElementById('ralUnit').value = p.unit || '';
            sel.dataset.applicationText = p.applicationText || '';
            sel.dataset.frequencyText = p.frequencyText || '';
        }
        fillFromPreset(presetIndex || 0);
        sel.onchange = () => fillFromPreset(parseInt(sel.value, 10));

        const today = new Date().toISOString().slice(0, 10);
        document.getElementById('ralScheduled').value = today;

        document.getElementById('ralStatus').onchange = function () {
            const skipped = this.value === 'skipped';
            document.getElementById('ralSkipWrap').style.display = skipped ? 'block' : 'none';
        };

        document.getElementById('ralSaveBtn').onclick = async () => {
            const status = document.getElementById('ralStatus').value;
            const body = {
                recommendationId: adviceContext.recommendationId,
                cropId: adviceContext.crop.id,
                fieldId: adviceContext.crop.field,
                actionType: document.getElementById('ralActionType').value,
                recommendationText: document.getElementById('ralRecText').value,
                status: status === 'not_started' ? 'scheduled' : status,
                scheduledDate: document.getElementById('ralScheduled').value || null,
                completedDate: document.getElementById('ralCompleted').value || null,
                quantity: document.getElementById('ralQty').value || null,
                unit: document.getElementById('ralUnit').value,
                method: document.getElementById('ralMethod').value,
                notes: document.getElementById('ralNotes').value,
                performedBy: document.getElementById('ralPerformedBy').value,
                nextDueDate: document.getElementById('ralNextReview').value || null,
                skipReason: document.getElementById('ralSkipReason').value,
                applicationText: sel.dataset.applicationText,
                frequencyText: sel.dataset.frequencyText
            };
            try {
                const res = await apiRequest('POST', '/crop-recommendations/actions', body);
                cacheLocal({ actions: [res.data.action], alerts: res.data.alert ? [res.data.alert] : [] });
                showAlertFn('Action logged. Next reminder: ' + (res.data.schedule?.intervalLabel || res.data.action?.nextDueDate), 'success');
                bootstrap.Modal.getInstance(document.getElementById('recActionLogModal')).hide();
                refreshAlertsPanel();
            } catch (e) {
                showAlertFn('Could not save action: ' + e.message, 'danger');
            }
        };

        new bootstrap.Modal(document.getElementById('recActionLogModal')).show();
    }

    async function openSoilTestForm() {
        if (!adviceContext) {
            showAlertFn('Open AI advice for a crop first.', 'warning');
            return;
        }
        const existing = document.getElementById('recSoilTestModal');
        if (existing) existing.remove();
        document.body.insertAdjacentHTML('beforeend', soilTestModalHtml());
        document.getElementById('rstDate').value = new Date().toISOString().slice(0, 10);

        document.getElementById('rstRefineBtn').onclick = async () => {
            const soilTest = collectSoilForm();
            try {
                const res = await apiRequest('POST', '/crop-recommendations/refine-advice', {
                    soilTest,
                    recommendations: adviceContext.recommendations
                });
                const box = document.getElementById('rstRefinedBox');
                box.classList.remove('d-none');
                const d = res.data;
                let html = `<div class="alert alert-info"><strong>${d.summary}</strong></div>`;
                if (d.adjustedFertilizer && d.adjustedFertilizer.length) {
                    html += '<ul class="mb-0">';
                    d.adjustedFertilizer.forEach((f) => {
                        html += `<li><strong>${f.name}</strong>: ${f.amount} — <small>${f.reason}</small></li>`;
                    });
                    html += '</ul>';
                }
                (d.notes || []).forEach((n) => { html += `<p class="small text-muted mb-0">${n}</p>`; });
                box.innerHTML = html;
                updateAdjustedSectionInAdviceModal(d);
            } catch (e) {
                showAlertFn('Refine failed: ' + e.message, 'warning');
            }
        };

        document.getElementById('rstSaveBtn').onclick = async () => {
            const soilTest = collectSoilForm();
            soilTest.cropId = adviceContext.crop.id;
            soilTest.fieldId = adviceContext.crop.field;
            try {
                const res = await apiRequest('POST', '/crop-recommendations/soil-tests', soilTest);
                cacheLocal({ soilTests: [res.data.test], alerts: res.data.alert ? [res.data.alert] : [] });
                showAlertFn('Soil test saved.', 'success');
                bootstrap.Modal.getInstance(document.getElementById('recSoilTestModal')).hide();
                refreshAlertsPanel();
            } catch (e) {
                showAlertFn('Save failed: ' + e.message, 'danger');
            }
        };

        new bootstrap.Modal(document.getElementById('recSoilTestModal')).show();
    }

    function collectSoilForm() {
        return {
            testDate: document.getElementById('rstDate').value,
            ph: document.getElementById('rstPh').value || null,
            nitrogen: document.getElementById('rstN').value || null,
            phosphorus: document.getElementById('rstP').value || null,
            potassium: document.getElementById('rstK').value || null,
            calcium: document.getElementById('rstCa').value || null,
            magnesium: document.getElementById('rstMg').value || null,
            organicMatter: document.getElementById('rstOm').value || null,
            moisture: document.getElementById('rstMoisture').value,
            source: document.getElementById('rstSource').value,
            notes: document.getElementById('rstNotes').value
        };
    }

    function updateAdjustedSectionInAdviceModal(refined) {
        const el = document.getElementById('aiAdjustedAdviceSection');
        if (!el) return;
        el.classList.remove('d-none');
        let html = `<div class="alert alert-secondary"><strong>${refined.summary}</strong></div><ul class="mb-0">`;
        (refined.adjustedFertilizer || []).forEach((f) => {
            html += `<li><strong>${f.name}</strong>: ${f.amount}<br><small>${f.reason}</small></li>`;
        });
        html += '</ul>';
        (refined.notes || []).forEach((n) => { html += `<p class="small text-muted mb-0">${n}</p>`; });
        const body = el.querySelector('.card-body');
        if (body) body.innerHTML = html;
        else el.innerHTML = html;
    }

    async function openHistory(cropId) {
        const id = cropId || (adviceContext && adviceContext.crop.id);
        if (!id) return;
        let history;
        try {
            const res = await apiRequest('GET', '/crop-recommendations/history/crop/' + id);
            history = res.data;
        } catch (e) {
            showAlertFn('Could not load history: ' + e.message, 'warning');
            return;
        }

        const rows = (history.actions || [])
            .map(
                (a) => `<tr>
          <td>${formatDateFn(a.createdAt)}</td>
          <td>${a.actionType}</td>
          <td><span class="badge bg-secondary">${a.status}</span></td>
          <td>${a.quantity || '—'} ${a.unit || ''}</td>
          <td>${formatDateFn(a.nextDueDate)}</td>
          <td>${(a.notes || '').slice(0, 40)}</td>
        </tr>`
            )
            .join('');

        const html = `
        <div class="modal fade" id="recHistoryModal" tabindex="-1">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header"><h5 class="modal-title">Recommendation history</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
              <div class="modal-body">
                <p class="small text-muted">${(history.recommendations || []).length} AI snapshot(s), ${(history.soilTests || []).length} soil test(s)</p>
                <div class="table-responsive"><table class="table table-sm table-striped">
                  <thead><tr><th>Date</th><th>Type</th><th>Status</th><th>Qty</th><th>Next due</th><th>Notes</th></tr></thead>
                  <tbody>${rows || '<tr><td colspan="6" class="text-muted">No actions logged yet.</td></tr>'}</tbody>
                </table></div>
              </div>
            </div>
          </div>
        </div>`;
        const old = document.getElementById('recHistoryModal');
        if (old) old.remove();
        document.body.insertAdjacentHTML('beforeend', html);
        new bootstrap.Modal(document.getElementById('recHistoryModal')).show();
    }

    async function refreshAlertsPanel() {
        const el = document.getElementById('cropRecAlertsPanel');
        if (!el) return;
        try {
            const res = await apiRequest('GET', '/crop-recommendations/alerts');
            const d = res.data || {};
            const upcoming = Array.isArray(d.upcoming) ? d.upcoming : [];
            const all = Array.isArray(d.all) ? d.all : [];
            const chip = (list, cls, title) => {
                const items = Array.isArray(list) ? list : [];
                if (!items.length) return `<p class="small text-muted mb-1">${title}: none</p>`;
                return `<div class="mb-2"><strong class="text-${cls}">${title}</strong><ul class="small mb-0">${items
                    .map(
                        (a) =>
                            `<li>${a.title} — due ${formatDateFn(a.dueDate)} 
              <button class="btn btn-link btn-sm p-0" data-alert-done="${a.id}">done</button></li>`
                    )
                    .join('')}</ul></div>`;
            };
            el.innerHTML =
                chip(d.overdue, 'danger', 'Overdue') +
                chip(d.today, 'warning', 'Due today') +
                chip(upcoming.slice(0, 5), 'primary', 'Upcoming') +
                `<p class="small text-muted mb-0">${all.filter((a) => a.status === 'pending').length} pending total</p>`;

            el.querySelectorAll('[data-alert-done]').forEach((btn) => {
                btn.onclick = async () => {
                    try {
                        await apiRequest('PATCH', '/crop-recommendations/alerts/' + btn.dataset.alertDone, {
                            status: 'done'
                        });
                        refreshAlertsPanel();
                    } catch (err) {
                        showAlertFn(err.message, 'danger');
                    }
                };
            });
        } catch (e) {
            el.innerHTML = '<p class="text-muted small">Alerts unavailable (check backend). ' + e.message + '</p>';
        }
    }

    function enhanceAdviceModalFooter(crop) {
        return `
          <button type="button" class="btn btn-outline-success" onclick="CropRecommendationLog.openLogForm(0)">
            <i class="fas fa-clipboard-list me-1"></i>Log action</button>
          <button type="button" class="btn btn-outline-primary" onclick="CropRecommendationLog.openSoilTestForm()">
            <i class="fas fa-flask me-1"></i>Soil test</button>
          <button type="button" class="btn btn-outline-secondary" onclick="CropRecommendationLog.openHistory(${crop.id})">
            <i class="fas fa-history me-1"></i>History</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="applyAIRecommendations(${crop.id})">Apply & log</button>`;
    }

    function init(opts) {
        if (opts.showAlert) showAlertFn = opts.showAlert;
        if (opts.formatDate) formatDateFn = opts.formatDate;
        refreshAlertsPanel();
    }

    global.CropRecommendationLog = {
        init,
        setAdviceContext,
        saveSnapshot,
        openLogForm,
        openSoilTestForm,
        openHistory,
        refreshAlertsPanel,
        enhanceAdviceModalFooter,
        buildActionPresets
    };
})(typeof window !== 'undefined' ? window : global);

/**
 * Crop recommendation action log, soil tests, and next-step alerts.
 */
(function (global) {
    'use strict';

    const LS_KEY = 'smartfarm_crop_rec_cache';

    /** Shared copy — ai-advisory soil tab and crop soil modal use the same disclaimer. */
    const SOIL_HEURISTIC_DISCLAIMER =
        'Soil-based fertilizer adjustments are heuristic estimates only. They are not a substitute for lab agronomy or local extension advice. Confirm rates with your soil lab or extension officer before applying.';

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

    function notifySoilTestSaved(cropId, test) {
        if (cropId == null) return;
        try {
            global.dispatchEvent(
                new CustomEvent('smartfarm:soil-test-saved', {
                    detail: { cropId: cropId, test: test || null }
                })
            );
        } catch (_) {
            /* ignore */
        }
    }

    function normalizeSoilTest(test) {
        if (!test) return null;
        if (test.ph !== undefined || test.nitrogen !== undefined) {
            return test;
        }
        const n = test.nutrients;
        if (n && typeof n === 'object') {
            return {
                ...test,
                ph: n.ph ?? null,
                nitrogen: n.nitrogen ?? null,
                phosphorus: n.phosphorus ?? null,
                potassium: n.potassium ?? null,
                calcium: n.calcium ?? null,
                magnesium: n.magnesium ?? null,
                organicMatter: n.organicMatter ?? null,
                moisture: n.moisture ?? null
            };
        }
        return test;
    }

    function getLatestFromLocalCache(cropId) {
        try {
            const raw = global.localStorage.getItem(LS_KEY);
            const cache = raw ? JSON.parse(raw) : { soilTests: [] };
            const tests = (cache.soilTests || []).filter(
                (t) => String(t.cropId) === String(cropId)
            );
            if (!tests.length) return null;
            tests.sort((a, b) => String(b.testDate || '').localeCompare(String(a.testDate || '')));
            return normalizeSoilTest(tests[0]);
        } catch (e) {
            return null;
        }
    }

    function pickLatestSoilTest(a, b) {
        if (!a) return b ? normalizeSoilTest(b) : null;
        if (!b) return normalizeSoilTest(a);
        const na = normalizeSoilTest(a);
        const nb = normalizeSoilTest(b);
        const da = String(na.testDate || '');
        const db = String(nb.testDate || '');
        if (db > da) return nb;
        if (da > db) return na;
        const ca = na.createdAt ? new Date(na.createdAt).getTime() : 0;
        const cb = nb.createdAt ? new Date(nb.createdAt).getTime() : 0;
        return cb > ca ? nb : na;
    }

    async function fetchLatestSoilTest(cropId) {
        let latest = getLatestFromLocalCache(cropId);
        try {
            const res = await apiRequest(
                'GET',
                '/crop-recommendations/soil-tests/latest/' + encodeURIComponent(cropId)
            );
            if (res && res.data) {
                latest = pickLatestSoilTest(latest, res.data);
            }
        } catch (e) {
            console.warn('Latest soil test fetch failed:', e.message || e);
        }
        return latest;
    }

    function formatNutrientValue(value, unit) {
        if (value == null || value === '') return '—';
        return String(value) + (unit ? ' ' + unit : '');
    }

    /**
     * Compact HTML for crop card soil block (caller supplies cropId for CTA onclick).
     */
    function renderSoilSummaryHtml(cropId, test) {
        const t = normalizeSoilTest(test);
        const ctaLabel = t ? 'Update soil test' : 'Add soil test';
        const safeId = typeof cropId === 'number' ? cropId : JSON.stringify(String(cropId));

        if (!t) {
            return (
                '<div class="crop-soil-summary-inner">' +
                '<small class="text-muted d-block mb-2">No soil test logged for this crop yet.</small>' +
                `<button type="button" class="btn btn-sm btn-outline-primary w-100" onclick="openSoilTestFromCropCard(${safeId})">` +
                '<i class="fas fa-flask me-1"></i>Add soil test</button></div>'
            );
        }

        return (
            '<div class="crop-soil-summary-inner">' +
            `<small class="text-muted d-block mb-1">Last soil test · ${formatDateFn(t.testDate)}</small>` +
            '<div class="small mb-2">' +
            `pH <strong>${formatNutrientValue(t.ph, '')}</strong> · ` +
            `N <strong>${formatNutrientValue(t.nitrogen, 'kg/ha')}</strong> · ` +
            `P <strong>${formatNutrientValue(t.phosphorus, 'kg/ha')}</strong> · ` +
            `K <strong>${formatNutrientValue(t.potassium, 'kg/ha')}</strong>` +
            '</div>' +
            `<button type="button" class="btn btn-sm btn-outline-primary w-100" onclick="openSoilTestFromCropCard(${safeId})">` +
            `<i class="fas fa-flask me-1"></i>${ctaLabel}</button></div>`
        );
    }

    function setAdviceContext(crop, recommendations) {
        adviceContext = { crop, recommendations, recommendationId: null };
        return adviceContext;
    }

    function soilDisclaimerHtml(extraClass) {
        return `<p class="text-muted small ${extraClass || 'mb-0'}">${SOIL_HEURISTIC_DISCLAIMER}</p>`;
    }

    /**
     * Unified refine output (same markup in soil modal, crop advice modal, ai-advisory).
     * @param {object} refined - API refine-advice payload
     * @param {{ alertClass?: string }} [opts]
     */
    function renderRefinedAdviceHtml(refined, opts) {
        const alertClass = (opts && opts.alertClass) || 'alert-info';
        if (!refined) {
            return '';
        }
        let html = `<div class="alert ${alertClass}"><strong>${refined.summary || 'Adjusted advice'}</strong></div>`;
        if (refined.adjustedFertilizer && refined.adjustedFertilizer.length) {
            html += '<ul class="mb-2">';
            refined.adjustedFertilizer.forEach((f) => {
                html += `<li><strong>${f.name}</strong>: ${f.amount}`;
                if (f.reason) {
                    html += ` — <small>${f.reason}</small>`;
                }
                html += '</li>';
            });
            html += '</ul>';
        }
        (refined.notes || []).forEach((n) => {
            html += `<p class="small text-muted mb-0">${n}</p>`;
        });
        html += soilDisclaimerHtml('mt-2');
        return html;
    }

    async function refineAdviceWithSoil(soilTest, recommendations) {
        const res = await apiRequest('POST', '/crop-recommendations/refine-advice', {
            soilTest,
            recommendations: recommendations || {}
        });
        return res.data;
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
                <p class="text-muted small">Record what you did (or plan to do). The next reminder is estimated from the recommendation timing — not a precision schedule.</p>
                ${soilDisclaimerHtml('mb-2')}
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
                ${soilDisclaimerHtml('mb-3')}
                <p class="text-muted small mb-0">Enter lab or field test values, then preview adjusted fertilizer amounts (same refine logic as Crop Management).</p>
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
                const d = await refineAdviceWithSoil(soilTest, adviceContext.recommendations);
                const box = document.getElementById('rstRefinedBox');
                box.classList.remove('d-none');
                box.innerHTML = renderRefinedAdviceHtml(d, { alertClass: 'alert-info' });
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
                notifySoilTestSaved(adviceContext.crop.id, res.data.test);
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
        const html = renderRefinedAdviceHtml(refined, { alertClass: 'alert-secondary' });
        const body = el.querySelector('.card-body');
        if (body) body.innerHTML = html;
        else el.innerHTML = html;
    }

    async function openSoilTestFormForCrop(crop, recommendations) {
        setAdviceContext(crop, recommendations);
        await openSoilTestForm();
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
                            `<li id="crop-alert-${a.id}" data-alert-id="${a.id}">${a.title} — due ${formatDateFn(a.dueDate)} 
              <button type="button" class="btn btn-link btn-sm p-0" data-alert-done="${a.id}">done</button></li>`
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
            applyCropAlertDeepLink();
        } catch (e) {
            el.innerHTML = '<p class="text-muted small">Alerts unavailable (check backend). ' + e.message + '</p>';
        }
    }

    function applyCropAlertDeepLink() {
        const params = new URLSearchParams(global.location.search);
        const alertId = params.get('alertId');
        if (!alertId) return;

        const card = document.getElementById('cropRecAlertsCard');
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        const row =
            document.getElementById('crop-alert-' + alertId) ||
            document.querySelector('[data-alert-id="' + CSS.escape(String(alertId)) + '"]');
        if (!row) return;

        row.classList.add('farm-action-deep-link-highlight');
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        global.setTimeout(function () {
            row.classList.remove('farm-action-deep-link-highlight');
        }, 4000);
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
        openSoilTestFormForCrop,
        openHistory,
        refreshAlertsPanel,
        applyCropAlertDeepLink,
        enhanceAdviceModalFooter,
        buildActionPresets,
        SOIL_HEURISTIC_DISCLAIMER,
        soilDisclaimerHtml,
        renderRefinedAdviceHtml,
        refineAdviceWithSoil,
        fetchLatestSoilTest,
        renderSoilSummaryHtml,
        normalizeSoilTest
    };
})(typeof window !== 'undefined' ? window : global);

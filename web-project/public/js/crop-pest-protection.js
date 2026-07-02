/**
 * Reusable "Pests & Protection" panel — same structure for every crop.
 */
(function (global) {
    'use strict';

    var LOCAL_CHEMICAL_DISCLAIMER =
        'Example active ingredients vary by country and change over time. ' +
        'Always use products registered for your crop and follow the label, pre-harvest interval, and your agronomist\'s advice.';

    function apiUrl(path) {
        if (global.SmartFarmApiConfig && typeof global.SmartFarmApiConfig.url === 'function') {
            return global.SmartFarmApiConfig.url(path);
        }
        return path;
    }

    function escapeHtml(text) {
        if (text == null) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    /**
     * @param {HTMLElement|string} mount
     * @param {object} data from resolveCropPestProtection / API
     */
    function renderPestsProtectionPanel(mount, data) {
        const el = typeof mount === 'string' ? document.getElementById(mount) : mount;
        if (!el || !data) {
            return;
        }

        const pestItems = (data.pests || []).map(function (p) {
            return (
                '<li class="mb-2">' +
                '<strong>' + escapeHtml(p.name) + ':</strong> ' +
                escapeHtml(p.damageDescription) +
                '</li>'
            );
        }).join('');

        const beneficialItems = (data.beneficials || []).map(function (b) {
            return (
                '<li class="mb-2">' +
                '<strong>' + escapeHtml(b.name) + '</strong> — ' +
                escapeHtml(b.description) +
                '</li>'
            );
        }).join('');

        const lookForItems = (data.damageToLookFor || []).map(function (line) {
            return '<li class="mb-1">' + escapeHtml(line) + '</li>';
        }).join('');

        const chem = data.chemicalActives || {};
        const actives = (chem.actives || []).map(function (a) {
            return escapeHtml(a);
        }).join(', ');

        const defaultBanner = data.isDefaultTemplate
            ? '<div class="alert alert-secondary py-2 px-3 small mb-3 mb-md-4" role="status">' +
              '<strong>Default vegetable guidance</strong> — general IPM advice for this crop name. ' +
              'Crop-specific recommendations are not loaded yet; confirm pests in the field before acting.' +
              '</div>'
            : '';

        const lookForSection = lookForItems
            ? '<section class="mb-4">' +
              '<h4 class="h6 text-uppercase text-muted mb-2">What to look for in the field</h4>' +
              '<ul class="mb-0 ps-3 small">' + lookForItems + '</ul>' +
              '</section>'
            : '';

        el.innerHTML =
            '<div class="crop-pest-protection-panel border rounded p-3 p-md-4 bg-white">' +
            '<h3 class="h5 mb-2"><i class="fas fa-shield-alt text-success me-2"></i>' +
            escapeHtml(data.displayTitle || ('Pests & protection for ' + data.cropName)) +
            '</h3>' +
            defaultBanner +
            lookForSection +
            '<section class="mb-4">' +
            '<h4 class="h6 text-uppercase text-muted mb-2">1. Key insect pests</h4>' +
            '<ul class="mb-0 ps-3">' + pestItems + '</ul>' +
            '</section>' +
            '<section class="mb-4">' +
            '<h4 class="h6 text-uppercase text-muted mb-2">2. Beneficial insects — protect these</h4>' +
            '<ul class="mb-0 ps-3">' + beneficialItems + '</ul>' +
            '</section>' +
            '<section>' +
            '<h4 class="h6 text-uppercase text-muted mb-2">3. Example chemical actives used in many regions</h4>' +
            '<p class="mb-2 small text-muted">' + escapeHtml(LOCAL_CHEMICAL_DISCLAIMER) + '</p>' +
            '<p class="mb-2 small">' +
            'Growers often use actives such as <strong>' + actives + '</strong> against ' +
            escapeHtml(chem.mainPestGroups || 'common pest groups') + '.' +
            '</p>' +
            '<p class="mb-0 small text-muted border-start border-3 border-warning ps-2">' +
            '<i class="fas fa-exclamation-triangle me-1"></i>' +
            escapeHtml(chem.safetyNote || '') +
            '</p>' +
            '</section>' +
            '</div>';
    }

    async function fetchPestProtection(cropName) {
        const encoded = encodeURIComponent(String(cropName || '').trim());
        const res = await fetch(apiUrl('/biological-farming/pests-protection/' + encoded), {
            headers: { Accept: 'application/json' }
        });
        const json = await res.json().catch(function () {
            return { success: false };
        });
        if (!res.ok || !json.success) {
            throw new Error(json.error || 'Could not load pest protection guide');
        }
        return json.data;
    }

    async function loadAndRender(mount, cropName) {
        const el = typeof mount === 'string' ? document.getElementById(mount) : mount;
        if (!el) return;
        el.innerHTML =
            '<p class="text-muted mb-0">' +
            '<span class="spinner-border spinner-border-sm me-2"></span>Loading pests &amp; protection…</p>';
        try {
            const data = await fetchPestProtection(cropName);
            renderPestsProtectionPanel(el, data);
        } catch (err) {
            el.innerHTML = '<div class="alert alert-warning mb-0">' + escapeHtml(err.message) + '</div>';
        }
    }

    global.SmartFarmPestProtection = {
        renderPestsProtectionPanel: renderPestsProtectionPanel,
        fetchPestProtection: fetchPestProtection,
        loadAndRender: loadAndRender
    };
})(window);

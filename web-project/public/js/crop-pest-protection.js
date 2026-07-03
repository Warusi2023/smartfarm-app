/**
 * Reusable "Pests & Protection" panel — same structure for every crop.
 */
(function (global) {
    'use strict';

    var LOCAL_CHEMICAL_DISCLAIMER =
        'Example active ingredients vary by country and change over time. ' +
        'Always use products registered for your crop and follow the label, pre-harvest interval, and your agronomist\'s advice.';

    /** Country display names (register form) → ISO region codes for regulatory filtering */
    var COUNTRY_REGION_CODES = {
        'Fiji': 'FJ',
        'Australia': 'AU',
        'New Zealand': 'NZ',
        'Papua New Guinea': 'PG',
        'Solomon Islands': 'SB',
        'Vanuatu': 'VU',
        'Samoa': 'WS',
        'Tonga': 'TO',
        'United States': 'US',
        'Canada': 'CA',
        'Mexico': 'MX',
        'Kenya': 'KE',
        'Uganda': 'UG',
        'Tanzania': 'TZ',
        'South Africa': 'ZA',
        'Nigeria': 'NG',
        'Ghana': 'GH',
        'India': 'IN',
        'United Kingdom': 'GB',
        'France': 'FR',
        'Germany': 'DE',
        'Brazil': 'BR'
    };

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

    function lookupCountryCode(countryName) {
        if (!countryName) return null;
        var trimmed = String(countryName).trim();
        if (!trimmed) return null;
        if (/^[A-Za-z]{2}$/.test(trimmed)) {
            return trimmed.toUpperCase();
        }
        if (COUNTRY_REGION_CODES[trimmed]) {
            return COUNTRY_REGION_CODES[trimmed];
        }
        var lower = trimmed.toLowerCase();
        for (var key in COUNTRY_REGION_CODES) {
            if (Object.prototype.hasOwnProperty.call(COUNTRY_REGION_CODES, key) && key.toLowerCase() === lower) {
                return COUNTRY_REGION_CODES[key];
            }
        }
        return null;
    }

    function readStoredUserCountry() {
        var sources = [
            function () {
                return localStorage.getItem('smartfarm_user') || sessionStorage.getItem('smartfarm_user');
            },
            function () {
                return localStorage.getItem('smartfarm_userData');
            }
        ];
        for (var i = 0; i < sources.length; i += 1) {
            try {
                var raw = sources[i]();
                if (!raw) continue;
                var parsed = JSON.parse(raw);
                var value = parsed.country || parsed.countryName || parsed.regionCode || null;
                if (value == null || value === '') continue;
                if (typeof value !== 'string' && typeof value !== 'number') continue;
                return String(value).trim() || null;
            } catch (err) {
                continue;
            }
        }
        return null;
    }

    function resolveRegionCode(explicitRegion) {
        if (explicitRegion != null && String(explicitRegion).trim()) {
            return lookupCountryCode(explicitRegion);
        }
        return lookupCountryCode(readStoredUserCountry());
    }

    function formatStatusBadge(status) {
        if (!status) return '';
        var map = {
            allowed: { label: 'Allowed', cls: 'bg-success' },
            requires_license: { label: 'License required', cls: 'bg-warning text-dark' },
            restricted: { label: 'Restricted', cls: 'bg-danger' }
        };
        var info = map[status] || { label: status, cls: 'bg-secondary' };
        return '<span class="badge ' + info.cls + ' ms-2 align-middle">' + escapeHtml(info.label) + '</span>';
    }

    function shortenSourceRef(sourceRef) {
        if (!sourceRef) return '';
        var parts = String(sourceRef).split(';');
        if (parts.length <= 2) return sourceRef;
        return parts.slice(0, 2).join(';') + '…';
    }

    function renderChemicalSection(chem) {
        var isRegisterBacked = chem.chemicalTier === 'register_backed';
        var sectionTitle = isRegisterBacked
            ? '3. Registered chemical actives'
            : '3. Example chemical actives used in many regions';

        var regionalNotice = chem.regionalNotice
            ? '<p class="small text-muted mb-2">' + escapeHtml(chem.regionalNotice) + '</p>'
            : '';

        var registerBanner = isRegisterBacked && chem.regulatorySource
            ? '<div class="alert alert-info py-2 px-3 small mb-3" role="status">' +
              '<i class="fas fa-certificate me-1"></i>' +
              '<strong>Register-backed guidance</strong> — ' + escapeHtml(chem.regulatorySource) +
              '</div>'
            : '';

        var activesBody = '';
        var details = chem.activeDetails || [];
        if (isRegisterBacked && details.length > 0) {
            activesBody =
                '<ul class="list-unstyled mb-2 small">' +
                details.map(function (detail) {
                    var provenance = detail.sourceRef
                        ? '<div class="text-muted mt-1" style="font-size:0.85em;">' +
                          '<i class="fas fa-link me-1"></i>' + escapeHtml(shortenSourceRef(detail.sourceRef)) +
                          '</div>'
                        : '';
                    var productLine = detail.productName || detail.registrationNumber
                        ? '<div class="text-muted mt-1" style="font-size:0.85em;">' +
                          escapeHtml(
                              [detail.productName, detail.registrationNumber ? 'Reg. ' + detail.registrationNumber : '']
                                  .filter(Boolean)
                                  .join(' · ')
                          ) +
                          '</div>'
                        : '';
                    return (
                        '<li class="mb-2 pb-2 border-bottom">' +
                        '<strong>' + escapeHtml(detail.activeIngredient) + '</strong>' +
                        formatStatusBadge(detail.status) +
                        provenance +
                        productLine +
                        '</li>'
                    );
                }).join('') +
                '</ul>';
        } else if ((chem.actives || []).length) {
            var actives = (chem.actives || []).map(function (a) {
                return escapeHtml(a);
            }).join(', ');
            activesBody =
                '<p class="mb-2 small">' +
                'Growers often use actives such as <strong>' + actives + '</strong> against ' +
                escapeHtml(chem.mainPestGroups || 'common pest groups') + '.' +
                '</p>';
        } else {
            activesBody =
                '<p class="mb-2 small text-muted">' +
                'No localized chemical actives are approved for display in your region. ' +
                'Focus on monitoring, cultural controls, and beneficial conservation first.' +
                '</p>';
        }

        return (
            '<section class="mb-3">' +
            '<h4 class="h6 text-uppercase text-muted mb-2">' + sectionTitle + '</h4>' +
            '<p class="mb-2 small text-muted">' + escapeHtml(LOCAL_CHEMICAL_DISCLAIMER) + '</p>' +
            registerBanner +
            regionalNotice +
            activesBody +
            '<p class="mb-0 small text-muted border-start border-3 border-warning ps-2">' +
            '<i class="fas fa-exclamation-triangle me-1"></i>' +
            escapeHtml(chem.safetyNote || '') +
            '</p>' +
            '</section>'
        );
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

        const maturitySection = data.maturityNotes
            ? '<section class="mt-4 pt-3 border-top">' +
              '<h4 class="h6 text-uppercase text-muted mb-2">4. Typical maturity window</h4>' +
              '<p class="mb-0 small">' + escapeHtml(data.maturityNotes) + '</p>' +
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
            renderChemicalSection(chem) +
            maturitySection +
            '</div>';
    }

    async function fetchPestProtection(cropName, options) {
        options = options || {};
        const encoded = encodeURIComponent(String(cropName || '').trim());
        var url = apiUrl('/biological-farming/pests-protection/' + encoded);
        const regionCode = resolveRegionCode(options.regionCode);
        if (regionCode) {
            url += (url.indexOf('?') >= 0 ? '&' : '?') + 'region=' + encodeURIComponent(regionCode);
        }
        const res = await fetch(url, {
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

    async function loadAndRender(mount, cropName, options) {
        const el = typeof mount === 'string' ? document.getElementById(mount) : mount;
        if (!el) return;
        el.innerHTML =
            '<p class="text-muted mb-0">' +
            '<span class="spinner-border spinner-border-sm me-2"></span>Loading pests &amp; protection…</p>';
        try {
            const data = await fetchPestProtection(cropName, options);
            renderPestsProtectionPanel(el, data);
        } catch (err) {
            el.innerHTML = '<div class="alert alert-warning mb-0">' + escapeHtml(err.message) + '</div>';
        }
    }

    global.SmartFarmPestProtection = {
        renderPestsProtectionPanel: renderPestsProtectionPanel,
        fetchPestProtection: fetchPestProtection,
        loadAndRender: loadAndRender,
        resolveRegionCode: resolveRegionCode
    };
})(window);

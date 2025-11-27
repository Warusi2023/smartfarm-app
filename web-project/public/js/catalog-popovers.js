(function () {
    const API = '/api/catalog';
    const cache = new Map();
    let stylesInjected = false;

    function injectStyles() {
        if (stylesInjected) return;
        stylesInjected = true;
        const style = document.createElement('style');
        style.textContent = `
            .catalog-info-panel {
                margin-top: 8px;
                border: 1px solid #d1d5db;
                border-radius: 10px;
                padding: 10px 12px;
                background: #f9fafb;
                font-size: 0.9rem;
                color: #111827;
                box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
            }
            .catalog-info-panel h4 {
                margin: 0 0 6px;
                font-size: 1rem;
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                align-items: baseline;
            }
            .catalog-info-panel h4 span {
                font-size: 0.8rem;
                color: #6b7280;
                font-weight: 500;
            }
            .catalog-info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: 8px;
                margin: 8px 0;
            }
            .catalog-info-chip {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 4px 8px;
                border-radius: 999px;
                font-size: 0.75rem;
                border: 1px solid #c7d2fe;
                background: #eef2ff;
                color: #3730a3;
            }
            .catalog-info-pillset {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
            }
            .catalog-info-section {
                margin-top: 6px;
            }
            .catalog-info-section strong {
                display: block;
                margin-bottom: 4px;
                font-size: 0.85rem;
                color: #1f2937;
            }
        `;
        document.head.appendChild(style);
    }

    async function fetchCatalogItem(group, name) {
        const key = `${group || 'all'}::${name}`.toLowerCase();
        if (cache.has(key)) return cache.get(key);
        const params = new URLSearchParams();
        if (group) params.set('group', group);
        params.set('q', name);
        params.set('limit', '10');

        const response = await fetch(`${API}?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch catalog data');
        const data = await response.json();
        const match = (data.items || []).find(
            item => item.name.toLowerCase() === name.toLowerCase()
        );
        cache.set(key, match || null);
        return match || null;
    }

    function renderPanel(target, item) {
        if (!item) {
            removePanel(target);
            return;
        }
        injectStyles();
        const container =
            target.closest('.catalog-info-wrapper') ||
            target.closest('.mb-3') ||
            target.parentElement;

        if (!container) return;

        let panel = container.querySelector('.catalog-info-panel');
        if (!panel) {
            panel = document.createElement('div');
            panel.className = 'catalog-info-panel';
            container.appendChild(panel);
            container.classList.add('catalog-info-wrapper');
        }

        const chips = [];
        if (item.growthDurationDays) {
            chips.push(`<span class="catalog-info-chip">Growth: ${item.growthDurationDays} days</span>`);
        }
        if (item.yieldKgPerAcre) {
            chips.push(`<span class="catalog-info-chip">Yield/acre: ${Number(item.yieldKgPerAcre).toLocaleString()} kg</span>`);
        }
        if (item.marketPriceFJDPerKg) {
            chips.push(`<span class="catalog-info-chip">Market: FJD ${item.marketPriceFJDPerKg}/kg</span>`);
        }

        const prevention = (item.preventiveActions || []).slice(0, 3);
        const warnings = (item.commonDiseases || []).slice(0, 3);

        panel.innerHTML = `
            <h4>
                ${item.name}
                ${item.scientificName ? `<span>(${item.scientificName})</span>` : ''}
            </h4>
            <div class="catalog-info-grid">${chips.join('')}</div>
            ${
                item.notes
                    ? `<div class="catalog-info-section"><strong>Notes</strong>${item.notes}</div>`
                    : ''
            }
            ${
                item.feedRequirements || item.fertilizerRequirements
                    ? `<div class="catalog-info-section"><strong>Feed / Fertilizer</strong>${item.feedRequirements || item.fertilizerRequirements}</div>`
                    : ''
            }
            ${
                item.waterQuality
                    ? `<div class="catalog-info-section"><strong>Water Quality</strong>${item.waterQuality}</div>`
                    : ''
            }
            ${
                warnings.length
                    ? `<div class="catalog-info-section"><strong>Risks</strong>${warnings.join(', ')}</div>`
                    : ''
            }
            ${
                prevention.length
                    ? `<div class="catalog-info-section"><strong>Prevention</strong>${prevention.join(', ')}</div>`
                    : ''
            }
            ${
                item.tags && item.tags.length
                    ? `<div class="catalog-info-pillset">${item.tags
                          .slice(0, 8)
                          .map(tag => `<span class="catalog-info-chip" style="border-color:#e5e7eb;background:#f3f4f6;color:#374151;">${tag}</span>`)
                          .join('')}</div>`
                    : ''
            }
        `;
    }

    function removePanel(target) {
        const container =
            target.closest('.catalog-info-wrapper') ||
            target.closest('.mb-3') ||
            target.parentElement;
        if (!container) return;
        const panel = container.querySelector('.catalog-info-panel');
        if (panel) {
            panel.remove();
        }
    }

    async function handleChange(event) {
        const select = event.target;
        if (!select.dataset.catalogGroup) return;

        const value = select.value;
        if (!value) {
            removePanel(select);
            return;
        }

        try {
            const item = await fetchCatalogItem(select.dataset.catalogGroup, value);
            renderPanel(select, item);
        } catch (error) {
            console.error('catalog-popovers: failed to load info card', error);
        }
    }

    function init() {
        document.querySelectorAll('select[data-catalog-group]').forEach(select => {
            select.addEventListener('change', handleChange);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


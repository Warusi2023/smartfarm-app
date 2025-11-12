(function () {
    function resolveCatalogUrl(params) {
        let baseUrl = '/api/catalog';
        if (window.SmartFarmConfig?.getApiUrl) {
            // SmartFarmConfig expects the endpoint without the /api prefix
            baseUrl = window.SmartFarmConfig.getApiUrl('catalog');
        }

        const url = new URL(baseUrl, window.location.origin);
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                url.searchParams.append(key, value);
            }
        });
        return url.toString();
    }

    const pendingEnhancements = new WeakSet();

    let staticCatalogPromise = null;
    let staticCatalogItems = null;

    async function loadStaticCatalog() {
        if (staticCatalogItems) {
            return staticCatalogItems;
        }
        if (!staticCatalogPromise) {
            staticCatalogPromise = (async () => {
                const response = await fetch('/data/catalog.json', { headers: { Accept: 'application/json' } });
                if (!response.ok) {
                    throw new Error(`Static catalog request failed (${response.status})`);
                }
                const contentType = response.headers.get('content-type') || '';
                if (!contentType.includes('application/json')) {
                    const preview = await response.text();
                    throw new Error(
                        `Static catalog request returned non-JSON response (content-type: ${contentType || 'unknown'})\nPreview: ${preview.slice(
                            0,
                            120
                        )}`
                    );
                }
                const json = await response.json();
                staticCatalogItems = Array.isArray(json) ? json : json.items || [];
                return staticCatalogItems;
            })();
        }
        return staticCatalogPromise;
    }

    function filterCatalogItems(items, params) {
        const limit = params.limit ? Number(params.limit) : null;
        const query = (params.q || '').toLowerCase();
        const group = (params.group || '').toLowerCase();
        const category = (params.category || '').toLowerCase();

        let filtered = items;
        if (group) {
            filtered = filtered.filter(item => (item.group || '').toLowerCase() === group);
        }
        if (category) {
            filtered = filtered.filter(item => (item.category || '').toLowerCase() === category);
        }
        if (query) {
            filtered = filtered.filter(item => {
                const name = (item.name || '').toLowerCase();
                const scientific = (item.scientificName || '').toLowerCase();
                return name.includes(query) || scientific.includes(query);
            });
        }
        if (limit && limit > 0) {
            filtered = filtered.slice(0, limit);
        }
        return filtered;
    }

    async function fetchCatalog(params) {
        try {
            const url = resolveCatalogUrl(params);
            const response = await fetch(url, { headers: { Accept: 'application/json' } });
            if (!response.ok) {
                throw new Error(`Catalog request failed (${response.status})`);
            }
            const contentType = response.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
                const preview = await response.text();
                throw new Error(
                    `Catalog request returned non-JSON response (content-type: ${contentType || 'unknown'})\nPreview: ${preview.slice(
                        0,
                        120
                    )}`
                );
            }
            const json = await response.json();
            const items = json.items || [];
            if (items.length === 0) {
                throw new Error('Catalog request returned no items');
            }
            return items;
        } catch (error) {
            console.warn('catalog-picker: falling back to static catalog due to error:', error);
            try {
                const staticItems = await loadStaticCatalog();
                return filterCatalogItems(staticItems, params);
            } catch (fallbackError) {
                console.error('catalog-picker: static catalog fallback failed:', fallbackError);
                return [];
            }
        }
    }

    function renderOptions(select, items, originalOptions, currentValue) {
        const placeholder =
            select.dataset.catalogPlaceholder ||
            (originalOptions.find(opt => !opt.value)?.textContent?.trim()) ||
            'Select…';

        const existingValues = new Set(items.map(item => item.name.toLowerCase()));
        originalOptions
            .filter(opt => opt.value)
            .forEach(opt => {
                if (!existingValues.has(opt.value.toLowerCase())) {
                    items.push({ name: opt.textContent, valueOverride: opt.value });
                }
            });

        select.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = placeholder;
        select.appendChild(defaultOption);

        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.valueOverride || item.name;
            option.textContent = item.name;
            if (item.scientificName) {
                option.textContent += ` (${item.scientificName})`;
            }
            if (item.tags) {
                option.dataset.catalogTags = item.tags.join(',');
            }
            option.dataset.catalogGroup = item.group || '';
            select.appendChild(option);
        });

        if (currentValue) {
            select.value = currentValue;
            if (select.value !== currentValue) {
                select.value = '';
            }
        }
    }

    async function enhanceSelect(select) {
        if (!select || pendingEnhancements.has(select)) {
            return;
        }
        const group = select.dataset.catalogGroup;
        if (!group) return;
        pendingEnhancements.add(select);

        const originalOptions = Array.from(select.querySelectorAll('option'));
        const catSelector =
            select.form && select.dataset.catalogCategorySelector
                ? select.form.querySelector(select.dataset.catalogCategorySelector)
                : null;

        let catalogItems = [];
        const loadItems = async () => {
            const params = { group, limit: select.dataset.catalogLimit || 1000 };
            catalogItems = await fetchCatalog(params);
        };

        const applyFilter = () => {
            const categoryValue = catSelector ? catSelector.value : '';
            const filtered = categoryValue
                ? catalogItems.filter(
                      item => (item.category || '').toLowerCase() === categoryValue.toLowerCase()
                  )
                : catalogItems;
            renderOptions(select, [...filtered], originalOptions, select.value);
        };

        select.disabled = true;
        try {
            await loadItems();
            applyFilter();
            if (catSelector) {
                catSelector.addEventListener('change', applyFilter);
            }
        } catch (error) {
            console.error('catalog-picker: failed to populate select', error);
        } finally {
            select.disabled = false;
        }
    }

    function initSearchInputs() {
        document.querySelectorAll('input[data-catalog-search]').forEach(input => {
            if (pendingEnhancements.has(input)) return;
            pendingEnhancements.add(input);

            const listId = input.getAttribute('list');
            const datalist = listId ? document.getElementById(listId) : null;
            const group = input.dataset.catalogGroup;
            let timer = null;

            const search = async query => {
                if (query.length < 2) return;
                try {
                    const params = { q: query, limit: 50 };
                    if (group) params.group = group;
                    const items = await fetchCatalog(params);
                    if (datalist) {
                        datalist.innerHTML = items
                            .map(item => {
                                const label = item.scientificName
                                    ? `${item.name} (${item.scientificName})`
                                    : item.name;
                                return `<option value="${item.name}">${label}</option>`;
                            })
                            .join('');
                    }
                } catch (error) {
                    console.error('catalog-picker: search failed', error);
                }
            };

            input.addEventListener('input', () => {
                const query = input.value.trim();
                clearTimeout(timer);
                if (query.length >= 2) {
                    timer = setTimeout(() => search(query), 250);
                }
            });
        });
    }

    function enhanceAllSelects(context = document) {
        context.querySelectorAll('select[data-catalog-group]').forEach(select => {
            enhanceSelect(select);
        });
    }

    function init() {
        enhanceAllSelects();
        initSearchInputs();

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType !== Node.ELEMENT_NODE) return;
                    if (node.matches?.('select[data-catalog-group]')) {
                        enhanceSelect(node);
                    }
                    if (node.matches?.('input[data-catalog-search]')) {
                        initSearchInputs();
                    }
                    const nestedSelects = node.querySelectorAll?.('select[data-catalog-group]');
                    if (nestedSelects && nestedSelects.length) {
                        enhanceAllSelects(node);
                    }
                    const nestedInputs = node.querySelectorAll?.('input[data-catalog-search]');
                    if (nestedInputs && nestedInputs.length) {
                        initSearchInputs();
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


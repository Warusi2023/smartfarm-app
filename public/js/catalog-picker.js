(function () {
    const API_BASE = '/api/catalog';

    const pendingEnhancements = new WeakSet();

    function buildQuery(params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                searchParams.append(key, value);
            }
        });
        return `${API_BASE}?${searchParams.toString()}`;
    }

    async function fetchCatalog(params) {
        const url = buildQuery(params);
        const response = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!response.ok) {
            throw new Error(`Catalog request failed (${response.status})`);
        }
        const json = await response.json();
        return json.items || [];
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


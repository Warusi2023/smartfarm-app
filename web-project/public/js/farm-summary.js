/**
 * Dashboard farm financial summary — real costs + manual revenue (W2-07 / W2-08).
 */
(function (global) {
    'use strict';

    const ZERO_SUMMARY = {
        monthlyRevenue: 0,
        monthlyCosts: 0,
        netProfit: 0,
        monthlyROI: 0,
        helperText: 'Sign in and log revenue or costs to see your net for this month.',
        fromApi: false,
        loadFailed: false
    };

    function todayIsoDate() {
        return new Date().toISOString().slice(0, 10);
    }

    function mapApiToFinancialData(apiData) {
        const revenue = Number(apiData.revenue) || 0;
        const costs = Number(apiData.costs) || 0;
        const net = Number(apiData.net) || 0;
        const monthlyROI = costs > 0 ? (net / costs) * 100 : 0;

        return {
            monthlyRevenue: revenue,
            monthlyCosts: costs,
            netProfit: net,
            monthlyROI: monthlyROI,
            helperText: apiData.helperText || null,
            fromApi: true,
            loadFailed: false,
            periodStart: apiData.periodStart,
            periodEnd: apiData.periodEnd
        };
    }

    async function loadFinancials(options) {
        const opts = options || {};
        const period = opts.period || 'month';
        const farmId = opts.farmId || null;

        if (typeof global.SmartFarmAPI === 'undefined') {
            return { ...ZERO_SUMMARY };
        }

        try {
            const params = { period: period };
            if (farmId) params.farmId = farmId;
            const response = await global.SmartFarmAPI.getFarmFinancials(params);
            if (response && response.success && response.data) {
                return mapApiToFinancialData(response.data);
            }
        } catch (err) {
            console.warn('Farm financials unavailable:', err && err.message ? err.message : err);
        }

        return {
            ...ZERO_SUMMARY,
            helperText: 'Could not load financial summary. Amounts show $0 until the server is available.',
            loadFailed: true
        };
    }

    async function submitRevenue(formData) {
        if (typeof global.SmartFarmAPI === 'undefined') {
            throw new Error('API not available');
        }

        const amount = Number(formData.amount);
        if (!Number.isFinite(amount) || amount < 0) {
            throw new Error('Enter a valid amount (0 or greater).');
        }

        const description = (formData.description || '').trim();
        if (description.length > 500) {
            throw new Error('Description is too long (max 500 characters).');
        }

        const payload = {
            date: formData.date || todayIsoDate(),
            amount: amount,
            description: description,
            type: 'manual'
        };

        if (formData.farmId) payload.farmId = formData.farmId;
        if (formData.category) payload.category = formData.category;
        if (formData.cropName) payload.cropName = formData.cropName;
        if (formData.livestockType) payload.livestockType = formData.livestockType;

        const res = await global.SmartFarmAPI.createFarmRevenue(payload);
        if (res && res.queued) {
            return {
                success: true,
                queued: true,
                message:
                    res.message ||
                    'Revenue saved on this device and will sync when back online.'
            };
        }
        if (!res || !res.success) {
            throw new Error((res && res.error) || 'Could not save revenue.');
        }
        return res;
    }

    function setupFinancialReplayRefresh(refreshFn) {
        if (typeof refreshFn !== 'function') return;
        global.addEventListener('smartfarm:write-replayed', function (ev) {
            const entry = ev.detail && ev.detail.entry;
            if (
                entry &&
                (entry.type === 'farm-revenue' || entry.type === 'feed-mix-cost')
            ) {
                refreshFn();
            }
        });
    }

    global.FarmSummary = {
        loadFinancials: loadFinancials,
        submitRevenue: submitRevenue,
        setupFinancialReplayRefresh: setupFinancialReplayRefresh,
        todayIsoDate: todayIsoDate,
        ZERO_SUMMARY: ZERO_SUMMARY
    };
})(typeof window !== 'undefined' ? window : global);

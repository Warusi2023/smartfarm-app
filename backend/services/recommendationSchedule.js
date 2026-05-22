/**
 * Parse recommendation timing text and compute next due dates (heuristic).
 */

function addDays(date, days) {
    const d = new Date(date || Date.now());
    if (Number.isNaN(d.getTime())) {
        d.setTime(Date.now());
    }
    const offset = Number(days);
    d.setDate(d.getDate() + Math.round(Number.isFinite(offset) ? offset : 14));
    return d.toISOString().slice(0, 10);
}

/**
 * @param {string} text - application / frequency text
 * @returns {{ days: number, kind: string, label: string }}
 */
function parseIntervalFromText(text) {
    const t = (text || '').toLowerCase();
    if (!t) {
        return { days: 14, kind: 'review', label: 'General follow-up in 14 days' };
    }

    const dayMatch = t.match(/every\s+(\d+)\s*[-–to]+\s*(\d+)\s*days?/);
    if (dayMatch) {
        const avg = (parseInt(dayMatch[1], 10) + parseInt(dayMatch[2], 10)) / 2;
        return { days: avg, kind: 'watering', label: `Next watering in ~${Math.round(avg)} day(s)` };
    }

    const singleDay = t.match(/every\s+(\d+)\s*days?/);
    if (singleDay) {
        const d = parseInt(singleDay[1], 10);
        return { days: d, kind: 'watering', label: `Next watering in ${d} day(s)` };
    }

    const weekRange = t.match(/every\s+(\d+)\s*[-–to]+\s*(\d+)\s*weeks?/);
    if (weekRange) {
        const avgWeeks = (parseInt(weekRange[1], 10) + parseInt(weekRange[2], 10)) / 2;
        const days = avgWeeks * 7;
        return { days, kind: 'fertilizer', label: `Next application in ~${Math.round(days)} days` };
    }

    const weeks = t.match(/every\s+(\d+)\s*weeks?/);
    if (weeks) {
        const days = parseInt(weeks[1], 10) * 7;
        return { days, kind: 'fertilizer', label: `Next application in ${days} days` };
    }

    if (t.includes('daily') || t.includes('each day')) {
        return { days: 1, kind: 'watering', label: 'Next watering tomorrow' };
    }

    if (t.includes('ph') || t.includes('soil test') || t.includes('monitor')) {
        return { days: 30, kind: 'soil_test', label: 'Soil / pH review in 30 days' };
    }

    if (t.includes('split') || t.includes('dose')) {
        return { days: 14, kind: 'fertilizer', label: 'Next split dose in ~14 days' };
    }

    return { days: 14, kind: 'review', label: 'Follow-up review in 14 days' };
}

/**
 * @param {object} params
 * @param {string} params.status - completed | scheduled | skipped
 * @param {string} [params.completedDate]
 * @param {string} [params.scheduledDate]
 * @param {string} [params.applicationText]
 * @param {string} [params.frequencyText]
 * @param {string} [params.actionType]
 */
function computeNextDueDate(params) {
    const status = params.status || 'scheduled';
    const baseText = [params.applicationText, params.frequencyText].filter(Boolean).join(' ');
    const interval = parseIntervalFromText(baseText);

    if (status === 'skipped') {
        const from = params.scheduledDate || new Date().toISOString().slice(0, 10);
        return {
            nextDueDate: addDays(from, 7),
            alertType: 'review',
            title: 'Review skipped recommendation',
            priority: 'low',
            generatedFrom: 'skipped_action',
            intervalLabel: 'Review in 7 days after skip'
        };
    }

    if (status === 'scheduled') {
        const due = params.scheduledDate || addDays(new Date(), interval.days);
        return {
            nextDueDate: due,
            alertType: interval.kind,
            title: params.title || `Scheduled: ${params.actionType || 'farm action'}`,
            priority: 'medium',
            generatedFrom: 'scheduled_action',
            intervalLabel: interval.label
        };
    }

    if (status === 'completed') {
        const from = params.completedDate || new Date().toISOString().slice(0, 10);
        const nextDueDate = addDays(from, interval.days);
        const typeLabels = {
            fertilizer: 'Apply fertilizer',
            watering: 'Water crop',
            soil_test: 'Soil / nutrient check',
            review: 'Farm action review'
        };
        return {
            nextDueDate,
            alertType: interval.kind,
            title: params.title || typeLabels[interval.kind] || 'Next farm action',
            priority: interval.kind === 'watering' ? 'high' : 'medium',
            generatedFrom: 'completed_action',
            intervalLabel: interval.label
        };
    }

    return {
        nextDueDate: addDays(new Date(), 14),
        alertType: 'review',
        title: 'Review recommendation',
        priority: 'low',
        generatedFrom: 'manual_review',
        intervalLabel: interval.label
    };
}

module.exports = {
    parseIntervalFromText,
    computeNextDueDate,
    addDays
};

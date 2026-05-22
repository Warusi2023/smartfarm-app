/**
 * Heuristic soil-test adjustments for fertilizer advice (not agronomic simulation).
 */

const THRESHOLDS = {
    nitrogen: { low: 25, high: 60, unit: 'kg/ha' },
    phosphorus: { low: 15, high: 40, unit: 'kg/ha' },
    potassium: { low: 20, high: 50, unit: 'kg/ha' }
};

function num(val) {
    if (val === null || val === undefined || val === '') return null;
    const n = Number(val);
    return Number.isFinite(n) ? n : null;
}

function nutrientStatus(value, nutrient) {
    const t = THRESHOLDS[nutrient];
    if (value === null || !t) return 'unknown';
    if (value < t.low) return 'deficient';
    if (value > t.high) return 'sufficient';
    return 'adequate';
}

/**
 * @param {object} soilTest
 * @param {object} baseRecommendations - AI advisory payload
 */
function refineRecommendationsWithSoil(soilTest, baseRecommendations) {
    const notes = [];
    const adjustments = [];
    let confidence = 'approximate';

    const hasAny =
        num(soilTest.ph) !== null ||
        num(soilTest.nitrogen) !== null ||
        num(soilTest.phosphorus) !== null ||
        num(soilTest.potassium) !== null;

    if (!hasAny) {
        return {
            hasSoilData: false,
            confidence: 'general',
            summary: 'No soil test values entered. Showing general AI guidance only.',
            adjustedFertilizer: baseRecommendations.fertilizer || [],
            notes: ['Add a soil test to refine fertilizer amounts (heuristic estimate).']
        };
    }

    confidence = 'heuristic';
    const n = num(soilTest.nitrogen);
    const p = num(soilTest.phosphorus);
    const k = num(soilTest.potassium);
    const ph = num(soilTest.ph);

    if (ph !== null) {
        if (ph < 5.5) {
            notes.push('Soil pH is acidic — consider lime or pH correction before heavy fertilizer.');
            adjustments.push({ type: 'ph_correction', message: 'Target pH 6.0–6.8 before increasing NPK.' });
        } else if (ph > 7.8) {
            notes.push('Soil pH is alkaline — phosphorus availability may be reduced.');
        } else {
            notes.push(`Soil pH ${ph} is in a typical range for many crops.`);
        }
    }

    const baseFert = (baseRecommendations.fertilizer || []).map((f) => ({ ...f }));
    const adjustedFertilizer = baseFert.map((fert, idx) => {
        let amount = fert.amount || '';
        let reason = fert.reason || '';
        const name = (fert.name || '').toLowerCase();

        if (name.includes('npk') || name.includes('fertilizer') || name.includes('nitrogen')) {
            const nStat = nutrientStatus(n, 'nitrogen');
            const pStat = nutrientStatus(p, 'phosphorus');
            const kStat = nutrientStatus(k, 'potassium');

            if (nStat === 'sufficient' && pStat !== 'deficient' && kStat !== 'deficient') {
                amount = 'Reduce or skip NPK — soil levels appear adequate (estimate)';
                reason = 'Based on soil test: nitrogen/phosphorus/potassium not clearly deficient.';
                adjustments.push({
                    type: 'reduce',
                    message: 'No additional nitrogen likely needed — verify with local agronomist.'
                });
            } else if (nStat === 'deficient' || pStat === 'deficient' || kStat === 'deficient') {
                const parts = [];
                if (nStat === 'deficient') parts.push('N');
                if (pStat === 'deficient') parts.push('P');
                if (kStat === 'deficient') parts.push('K');
                amount = amount.replace(/(\d+)\s*[-–]\s*(\d+)/, (_, a, b) => {
                    const low = Math.round(Number(a) * 0.85);
                    const high = Math.round(Number(b) * 0.85);
                    return `${low}-${high}`;
                });
                reason = `Soil test suggests deficiency (${parts.join(', ')}) — split application recommended.`;
                adjustments.push({
                    type: 'deficiency',
                    message: `Address low ${parts.join(', ')} with split doses; amounts are approximate.`
                });
            }
        }

        return { ...fert, amount, reason, adjusted: true };
    });

    if (adjustedFertilizer.length === 0 && baseFert.length > 0) {
        adjustedFertilizer.push(...baseFert);
    }

    return {
        hasSoilData: true,
        confidence,
        summary: 'Adjusted fertilizer advice based on soil test (heuristic — not a lab formula).',
        adjustedFertilizer,
        notes,
        adjustments,
        nutrientStatus: {
            nitrogen: nutrientStatus(n, 'nitrogen'),
            phosphorus: nutrientStatus(p, 'phosphorus'),
            potassium: nutrientStatus(k, 'potassium')
        }
    };
}

module.exports = { refineRecommendationsWithSoil, nutrientStatus };

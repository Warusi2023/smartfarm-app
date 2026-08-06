const {
    normalizeSpecies,
    buildLivestockHealthAdvice
} = require('../../services/livestockHealthAdvice');

describe('livestockHealthAdvice', () => {
    it('maps cat without treating it as cattle', () => {
        const species = normalizeSpecies('cat');
        expect(species.key).toBe('cat');

        const advice = buildLivestockHealthAdvice({
            type: 'cat',
            breed: 'Domestic',
            age: 24,
            healthStatus: 'healthy'
        });

        expect(advice.species).toBe('cat');
        expect(advice.nutrition.feedType.toLowerCase()).toContain('feline');
        expect(advice.nutrition.feedType.toLowerCase()).not.toContain('cattle');
        expect(JSON.stringify(advice).toLowerCase()).not.toMatch(/cattle feed/);
        expect(advice.warnings.some((w) => /species:\s*cat/i.test(w.message))).toBe(true);
    });

    it('maps cattle and goat distinctly', () => {
        const cattle = buildLivestockHealthAdvice({ type: 'cattle', age: 18 });
        const goat = buildLivestockHealthAdvice({ type: 'goat', age: 18 });

        expect(cattle.species).toBe('cattle');
        expect(cattle.nutrition.feedType.toLowerCase()).toContain('cattle');
        expect(goat.species).toBe('goat');
        expect(goat.nutrition.feedType.toLowerCase()).toContain('goat');
        expect(goat.nutrition.feedType.toLowerCase()).not.toContain('cattle');
    });

    it('does not silently default blank type to cattle', () => {
        const advice = buildLivestockHealthAdvice({ type: '', age: 12 });
        expect(advice.species).toBe('unknown');
        expect(advice.nutrition.feedType.toLowerCase()).not.toContain('cattle');
        expect(advice.tips.join(' ').toLowerCase()).toContain('cattle-specific');
    });

    it('handles horse species', () => {
        const advice = buildLivestockHealthAdvice({ type: 'horse', age: 48 });
        expect(advice.species).toBe('horse');
        expect(advice.nutrition.feedType.toLowerCase()).toMatch(/forage|horse/);
    });
});

/**
 * IPM label normalization — shared before classifier regex.
 */

const { normalizeLabel } = require('../../../services/ipmIntelligence/labelNormalizer');

describe('ipmIntelligence labelNormalizer', () => {
    test('lowercases and collapses whitespace', () => {
        expect(normalizeLabel('  Fall Armyworm  ')).toBe('fall armyworm');
    });

    test('converts hyphens, slashes, and underscores to spaces', () => {
        expect(normalizeLabel('Trichogramma-Wasp Pro')).toBe('trichogramma wasp pro');
        expect(normalizeLabel('leaf-miner flies')).toBe('leaf miner flies');
        expect(normalizeLabel('Bio/Wasp release')).toBe('bio wasp release');
        expect(normalizeLabel('ground_beetle')).toBe('ground beetle');
    });

    test('strips punctuation without breaking word tokens', () => {
        expect(normalizeLabel('Ladybird beetles (Coccinellidae)')).toBe('ladybird beetles coccinellidae');
    });
});

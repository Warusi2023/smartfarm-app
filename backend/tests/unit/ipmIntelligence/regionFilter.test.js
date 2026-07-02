/**
 * IPM region filter — chemical display guardrails.
 */

const {
    regionMatches,
    isChemicallyDisplayable,
    filterChemicalOptions,
    findRegulatoryStatus
} = require('../../../services/ipmIntelligence/regionFilter');

describe('ipmIntelligence regionFilter', () => {
    const exampleChemical = {
        active_ingredient: 'spinosad',
        region_codes: ['*'],
        is_example_only: true
    };

    test('regionMatches accepts wildcard', () => {
        expect(regionMatches(['*'], 'KE')).toBe(true);
    });

    test('regionMatches requires explicit code when no wildcard', () => {
        expect(regionMatches(['KE'], 'KE')).toBe(true);
        expect(regionMatches(['KE'], 'UG')).toBe(false);
    });

    test('example-only chemical suppressed without regulatory row', () => {
        expect(isChemicallyDisplayable(exampleChemical, null, 'KE')).toBe(false);
    });

    test('example-only chemical shown when regulatory status allows', () => {
        const regulatory = { status: 'allowed', active_ingredient: 'spinosad', region_code: 'KE' };
        expect(isChemicallyDisplayable(exampleChemical, regulatory, 'KE')).toBe(true);
    });

    test('banned regulatory status always suppresses', () => {
        const regulatory = { status: 'banned', active_ingredient: 'spinosad', region_code: 'KE' };
        expect(isChemicallyDisplayable(exampleChemical, regulatory, 'KE')).toBe(false);
    });

    test('filterChemicalOptions keeps only permitted actives', () => {
        const chemicals = [
            exampleChemical,
            { active_ingredient: 'Bt', region_codes: ['*'], is_example_only: true }
        ];
        const regulatoryRows = [
            { region_code: 'KE', active_ingredient: 'spinosad', crop_key: 'tomato', status: 'allowed' }
        ];
        const filtered = filterChemicalOptions(chemicals, regulatoryRows, 'KE', 'tomato');
        expect(filtered.map((row) => row.active_ingredient)).toEqual(['spinosad']);
    });

    test('findRegulatoryStatus prefers crop-specific row', () => {
        const rows = [
            { region_code: 'KE', active_ingredient: 'spinosad', crop_key: null, status: 'restricted' },
            { region_code: 'KE', active_ingredient: 'spinosad', crop_key: 'tomato', status: 'allowed' }
        ];
        const match = findRegulatoryStatus(rows, 'spinosad', 'tomato', 'KE');
        expect(match.status).toBe('allowed');
    });
});

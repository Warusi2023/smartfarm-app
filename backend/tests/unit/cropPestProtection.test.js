const {
    resolveCropPestProtection,
    normalizeCropKey,
    listPestProtectionCrops
} = require('../../data/cropPestProtection');

describe('cropPestProtection', () => {
    test('resolves tomato aliases', () => {
        const data = resolveCropPestProtection('Tomatoes');
        expect(data.cropKey).toBe('tomato');
        expect(data.isDefaultTemplate).toBe(false);
        expect(data.pests.some((p) => p.name.includes('Tuta'))).toBe(true);
    });

    test('resolves capsicum aliases', () => {
        expect(normalizeCropKey('Bell Pepper')).toBe('capsicum');
        const data = resolveCropPestProtection('peppers');
        expect(data.cropKey).toBe('capsicum');
    });

    test('unknown crop gets vegetable default template', () => {
        const data = resolveCropPestProtection('Cucumber');
        expect(data.isDefaultTemplate).toBe(true);
        expect(data.pests.length).toBeGreaterThan(0);
        expect(data.beneficials.length).toBeGreaterThan(0);
        expect(data.chemicalActives.safetyNote).toMatch(/local label/i);
    });

    test('leafy greens family resolves lettuce aliases with leafy pest coverage', () => {
        const data = resolveCropPestProtection('Lettuce');
        expect(data.cropKey).toBe('leafy_greens');
        const names = data.pests.map((p) => p.name).join(' ');
        expect(names).toMatch(/Leafminer/i);
        expect(names).toMatch(/Flea beetle/i);
    });


    test('forage family resolves representative aliases with maturity notes', () => {
        const alfalfa = resolveCropPestProtection('Lucerne');
        expect(alfalfa.cropKey).toBe('alfalfa');
        expect(alfalfa.maturityNotes).toMatch(/60-90 days/i);
        expect(alfalfa.isDefaultTemplate).toBe(false);

        const silage = resolveCropPestProtection('Silage maize');
        expect(silage.cropKey).toBe('silage_maize');
        expect(normalizeCropKey('Maize')).toBe('maize');
    });

    test('listPestProtectionCrops includes tomato', () => {
        const list = listPestProtectionCrops();
        expect(list.some((c) => c.cropKey === 'tomato')).toBe(true);
        expect(list.some((c) => c.cropKey === 'leafy_greens')).toBe(true);
        expect(list.some((c) => c.cropKey === 'lettuce')).toBe(false);
    });

    test('includes damageToLookFor for field symptoms', () => {
        const data = resolveCropPestProtection('Tomato');
        expect(Array.isArray(data.damageToLookFor)).toBe(true);
        expect(data.damageToLookFor.length).toBeGreaterThan(0);
    });
});

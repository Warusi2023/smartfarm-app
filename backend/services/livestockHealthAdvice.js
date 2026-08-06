/**
 * Species-aware livestock health advice used by AI advisory routes.
 * Never silently default unknown species to cattle.
 */

function normalizeSpecies(rawType) {
    const raw = String(rawType || '').trim();
    const lower = raw.toLowerCase();

    if (!lower) {
        return { key: 'unknown', label: 'animal', display: 'Animal' };
    }

    const rules = [
        { key: 'cattle', label: 'cattle', match: (s) => s.includes('cattle') || s === 'cow' || s === 'cows' || s === 'bovine' || s === 'bull' || s === 'heifer' },
        { key: 'cat', label: 'cat', match: (s) => s === 'cat' || s === 'cats' || s.includes('feline') },
        { key: 'dog', label: 'dog', match: (s) => s === 'dog' || s === 'dogs' || s.includes('canine') },
        { key: 'goat', label: 'goat', match: (s) => s.includes('goat') },
        { key: 'sheep', label: 'sheep', match: (s) => s.includes('sheep') || s === 'ewe' || s === 'ram' || s === 'lamb' },
        { key: 'pig', label: 'pig', match: (s) => s.includes('pig') || s.includes('swine') || s === 'hog' },
        { key: 'horse', label: 'horse', match: (s) => s.includes('horse') || s.includes('equine') || s === 'mare' || s === 'stallion' },
        { key: 'chicken', label: 'chicken', match: (s) => s.includes('chicken') || s.includes('poultry') || s === 'hen' || s === 'rooster' },
        { key: 'duck', label: 'duck', match: (s) => s.includes('duck') },
        { key: 'rabbit', label: 'rabbit', match: (s) => s.includes('rabbit') }
    ];

    for (const rule of rules) {
        if (rule.match(lower)) {
            const display = raw.charAt(0).toUpperCase() + raw.slice(1);
            return { key: rule.key, label: rule.label, display };
        }
    }

    return {
        key: 'unknown',
        label: lower,
        display: raw.charAt(0).toUpperCase() + raw.slice(1)
    };
}

function speciesNutrition(species) {
    switch (species.key) {
        case 'cattle':
            return {
                feedType: 'Cattle feed mix with hay',
                dailyAmount: '2-3% of body weight',
                frequency: '2-3 times daily',
                supplements: ['Mineral salt', 'Calcium supplement', 'Salt lick', 'Mineral block'],
                notes: 'Ensure access to clean water and adequate forage at all times'
            };
        case 'goat':
            return {
                feedType: 'Goat browse and quality hay with goat mineral mix',
                dailyAmount: '2-4% of body weight',
                frequency: '2 times daily plus free-choice hay',
                supplements: ['Goat-specific mineral mix', 'Copper as recommended by a vet'],
                notes: 'Goats need browse variety; avoid cattle mineral mixes that may be unsafe'
            };
        case 'sheep':
            return {
                feedType: 'Sheep ration with quality forage',
                dailyAmount: '2-3% of body weight',
                frequency: '2 times daily',
                supplements: ['Sheep mineral mix (low copper)'],
                notes: 'Do not use cattle mineral blocks — copper levels can be toxic to sheep'
            };
        case 'pig':
            return {
                feedType: 'Swine feed mix',
                dailyAmount: '2-3% of body weight',
                frequency: '2 times daily',
                supplements: ['Vitamin D supplement'],
                notes: 'Ensure clean water and appropriate growth-stage feed'
            };
        case 'chicken':
        case 'duck':
            return {
                feedType: species.key === 'duck' ? 'Waterfowl / duck feed' : 'Poultry feed',
                dailyAmount: '100-150g per bird',
                frequency: 'Free choice or 2 times daily',
                supplements: ['Grit', 'Calcium (layers)'],
                notes: 'Keep feed dry and protect from rodents'
            };
        case 'horse':
            return {
                feedType: 'Forage-first diet with horse concentrate as needed',
                dailyAmount: '1.5-2.5% of body weight (mostly forage)',
                frequency: 'Multiple small meals; continuous forage access preferred',
                supplements: ['Salt', 'Equine vitamin/mineral as advised'],
                notes: 'Avoid sudden ration changes; monitor for colic risk'
            };
        case 'cat':
            return {
                feedType: 'Complete feline diet (wet and/or dry cat food)',
                dailyAmount: 'Per package guidelines by weight/age; typically 2-4% of body weight',
                frequency: '2 meals daily (or free-choice dry if appropriate)',
                supplements: ['None unless prescribed by a veterinarian'],
                notes: 'Cats are obligate carnivores — do not feed cattle or dog rations. Fresh water always available.'
            };
        case 'dog':
            return {
                feedType: 'Complete canine diet sized for life stage',
                dailyAmount: 'Per package guidelines by weight/age',
                frequency: '1-2 meals daily',
                supplements: ['None unless prescribed by a veterinarian'],
                notes: 'Do not feed livestock rations. Fresh water always available.'
            };
        case 'rabbit':
            return {
                feedType: 'Grass hay with measured rabbit pellets',
                dailyAmount: 'Unlimited hay; pellets per weight guidelines',
                frequency: 'Hay always; pellets 1-2 times daily',
                supplements: ['Fresh leafy greens in moderation'],
                notes: 'High-fiber diet is essential; avoid sudden feed changes'
            };
        default:
            return {
                feedType: `Balanced ${species.label} diet appropriate for the species`,
                dailyAmount: 'Follow species-specific guidelines or veterinary advice',
                frequency: '2 times daily unless species norms differ',
                supplements: ['Species-appropriate minerals only if recommended'],
                notes: `Species "${species.display}" has no specialized profile yet — use generic ${species.label} care and consult a veterinarian for specifics.`
            };
    }
}

function speciesHealthChecks(species) {
    const base = {
        frequency: 'Monthly',
        checks: ['Body condition', 'Appetite', 'Activity level', 'Coat/skin condition'],
        signs: 'Watch for changes in behavior, appetite, or appearance'
    };

    if (species.key === 'cattle' || species.key === 'horse' || species.key === 'goat' || species.key === 'sheep') {
        return {
            ...base,
            checks: ['Body condition score', 'Hoof/foot health', 'Coat condition', 'Appetite']
        };
    }
    if (species.key === 'cat' || species.key === 'dog') {
        return {
            frequency: 'Every 1-3 months (or per vet schedule)',
            checks: ['Weight', 'Dental health', 'Coat/skin', 'Litter box or stool quality', 'Parasite prevention'],
            signs: 'Watch for lethargy, appetite change, vomiting, or litter-box changes'
        };
    }
    if (species.key === 'chicken' || species.key === 'duck') {
        return {
            frequency: 'Weekly',
            checks: ['Droppings', 'Crop fill', 'Feather condition', 'Mobility'],
            signs: 'Isolate birds that appear lethargic or stop eating'
        };
    }
    return base;
}

function speciesTips(species) {
    const common = [
        'Provide adequate shelter from extreme weather',
        'Keep detailed health records',
        'Consult a veterinarian for species-specific vaccination and parasite plans'
    ];

    const bySpecies = {
        cattle: ['Ensure proper ventilation in housing', 'Quarantine new animals before introducing to the herd'],
        goat: ['Provide climbable enrichment and secure fencing', 'Use goat-specific minerals'],
        sheep: ['Use low-copper sheep minerals only', 'Watch for flystrike in warm weather'],
        pig: ['Keep pens clean and dry', 'Monitor for heat stress'],
        chicken: ['Protect from predators', 'Maintain dry litter'],
        duck: ['Provide clean water deep enough for dabbling', 'Keep coop dry'],
        horse: ['Maintain regular hoof care', 'Ensure constant forage access'],
        cat: ['Keep indoor cats enriched; use species-appropriate litter', 'Never feed dog or livestock food as a primary diet'],
        dog: ['Maintain parasite prevention year-round', 'Provide regular exercise appropriate to breed'],
        rabbit: ['Unlimited grass hay is critical', 'Avoid sudden diet changes'],
        unknown: [`Treat as a ${species.label}; avoid applying cattle-specific advice`]
    };

    return [...common, ...(bySpecies[species.key] || bySpecies.unknown)];
}

/**
 * @param {{ type?: string, breed?: string, age?: number|string, healthStatus?: string }} animal
 */
function buildLivestockHealthAdvice(animal = {}) {
    const species = normalizeSpecies(animal.type);
    const age = Number.parseInt(animal.age, 10);
    const ageMonths = Number.isFinite(age) ? age : 12;
    const healthStatus = animal.healthStatus || 'healthy';
    const breed = animal.breed || 'Mixed';

    const nutrition = speciesNutrition(species);
    const healthChecks = speciesHealthChecks(species);
    const tips = speciesTips(species);

    if (ageMonths < 6) {
        nutrition.notes = `Young ${species.label} — higher protein / growth nutrition is often required. ${nutrition.notes}`;
    } else if (ageMonths > 60 && (species.key === 'cattle' || species.key === 'horse' || species.key === 'dog' || species.key === 'cat')) {
        nutrition.notes = `Senior ${species.label} — may need a specialized diet. ${nutrition.notes}`;
        healthChecks.frequency = 'Bi-weekly to monthly';
        healthChecks.checks = [...healthChecks.checks, 'Joint health', 'Dental check'];
    }

    const warnings = [];
    if (healthStatus !== 'healthy') {
        warnings.push({
            type: 'critical',
            message: `This ${species.label} requires prompt veterinary attention`,
            impact: 'Delayed treatment can worsen condition'
        });
    }
    warnings.push({
        type: 'info',
        message: `Advice generated for species: ${species.display} (breed: ${breed})`,
        impact: 'Confirm the species label matches the animal before acting on recommendations'
    });
    warnings.push({
        type: 'info',
        message: 'Maintain a clean living environment',
        impact: 'Helps prevent disease spread'
    });

    const vaccinations = {
        nextVaccination: 'Follow veterinarian schedule for this species',
        recommended: [
            `Annual or species-standard health check for ${species.label}`,
            'Parasite control per veterinary guidance'
        ],
        critical: `Keep ${species.label} vaccination and treatment records up to date`
    };

    if (ageMonths < 6) {
        vaccinations.recommended.push('Age-appropriate vaccinations for juveniles');
    }

    return {
        species: species.key,
        speciesLabel: species.display,
        breed,
        age: ageMonths,
        healthStatus,
        nutrition,
        vaccinations,
        healthChecks,
        warnings,
        tips
    };
}

module.exports = {
    normalizeSpecies,
    buildLivestockHealthAdvice
};

/**
 * SmartFarm Biological Farming Module
 * Manages beneficial insects, pest matching, and crop-specific guides
 */

class BiologicalFarming {
    constructor() {
        this.goodInsects = this.initializeGoodInsects();
        this.badInsects = this.initializeBadInsects();
        this.cropGuides = this.initializeCropGuides();
        this.init();
    }

    init() {
        this.displayGoodInsects();
        this.displayBadInsects();
        this.populateCropSelector();
        this.setupCropSelector();
    }

    initializeGoodInsects() {
        return [
            {
                name: 'Ladybirds (Ladybugs)',
                icon: '🐞',
                description: 'Eat aphids, mites, and whiteflies',
                targets: ['Aphids', 'Mites', 'Whiteflies'],
                breedingTips: [
                    'Plant marigolds and sunflowers',
                    'Provide shallow water sources',
                    'Avoid broad-spectrum pesticides',
                    'Release early in growing season'
                ],
                releaseTiming: 'Early planting stage, before pest populations grow',
                effectiveness: 'High - Can consume 50+ aphids per day'
            },
            {
                name: 'Green Lacewings',
                icon: '🦋',
                description: 'Their larvae attack aphids, thrips, caterpillar eggs',
                targets: ['Aphids', 'Thrips', 'Caterpillar Eggs', 'Spider Mites'],
                breedingTips: [
                    'Plant coriander and fennel',
                    'Provide nectar sources',
                    'Avoid pesticides during breeding',
                    'Release larvae directly on plants'
                ],
                releaseTiming: 'Early season, when pests first appear',
                effectiveness: 'Very High - Larvae are voracious predators'
            },
            {
                name: 'Parasitic Wasps',
                icon: '🐝',
                description: 'Lay eggs inside caterpillars and armyworms',
                targets: ['Caterpillars', 'Armyworms', 'Tomato Hornworms', 'Cabbage Worms'],
                breedingTips: [
                    'Plant basil and flowering herbs',
                    'Provide small water sources',
                    'Avoid spraying during wasp activity',
                    'Release near pest-infested areas'
                ],
                releaseTiming: 'When caterpillars are small (early instar stage)',
                effectiveness: 'High - Parasitize pest larvae effectively'
            },
            {
                name: 'Predatory Mites',
                icon: '🕷️',
                description: 'Attack spider mites',
                targets: ['Spider Mites', 'Thrips'],
                breedingTips: [
                    'Maintain high humidity',
                    'Avoid miticides',
                    'Provide pollen sources',
                    'Release on infested plants'
                ],
                releaseTiming: 'Early detection of spider mite infestation',
                effectiveness: 'Very High - Specialized spider mite predators'
            },
            {
                name: 'Hoverflies',
                icon: '🪰',
                description: 'Larvae feed on aphids and soft-bodied pests',
                targets: ['Aphids', 'Soft-bodied Pests', 'Thrips'],
                breedingTips: [
                    'Plant coriander and fennel',
                    'Provide flowering plants',
                    'Avoid pesticides',
                    'Create diverse habitat'
                ],
                releaseTiming: 'Early season, when aphids appear',
                effectiveness: 'High - Larvae consume many aphids'
            },
            {
                name: 'Assassin Bugs',
                icon: '🐛',
                description: 'Attack a wide range of harmful insects',
                targets: ['Caterpillars', 'Beetles', 'Aphids', 'Thrips'],
                breedingTips: [
                    'Provide diverse plant habitat',
                    'Avoid broad-spectrum pesticides',
                    'Maintain natural areas',
                    'Provide shelter and water'
                ],
                releaseTiming: 'Early season, throughout growing period',
                effectiveness: 'High - Generalist predators'
            },
            {
                name: 'Ground Beetles',
                icon: '🪲',
                description: 'Feed on soil pests like cutworms',
                targets: ['Cutworms', 'Wireworms', 'Slugs', 'Snails'],
                breedingTips: [
                    'Provide ground cover',
                    'Maintain organic mulch',
                    'Avoid soil pesticides',
                    'Create permanent habitat'
                ],
                releaseTiming: 'Early season, before soil pests damage crops',
                effectiveness: 'Moderate - Effective against soil pests'
            },
            {
                name: 'Spiders',
                icon: '🕸️',
                description: 'General predators of many crop pests',
                targets: ['Flying Insects', 'Crawling Pests', 'General Pest Control'],
                breedingTips: [
                    'Do not kill spiders',
                    'Provide diverse habitat',
                    'Avoid pesticides',
                    'Maintain natural areas'
                ],
                releaseTiming: 'Natural populations - support existing spiders',
                effectiveness: 'Moderate to High - Natural pest control'
            }
        ];
    }

    initializeBadInsects() {
        return [
            {
                name: 'Aphids',
                icon: '🐛',
                description: 'Suck sap from leaves and stems, spread diseases',
                damage: 'Leaf curl, stunted growth, honeydew production',
                cropsAffected: ['Tomatoes', 'Peppers', 'Cabbage', 'Beans', 'Lettuce']
            },
            {
                name: 'Whiteflies',
                icon: '🦟',
                description: 'Feed on plant sap, transmit viruses',
                damage: 'Yellowing leaves, reduced yield, sooty mold',
                cropsAffected: ['Tomatoes', 'Cucumbers', 'Eggplant', 'Okra']
            },
            {
                name: 'Spider Mites',
                icon: '🕷️',
                description: 'Tiny pests that suck plant juices',
                damage: 'Yellow stippling, leaf drop, webbing',
                cropsAffected: ['Cucumbers', 'Peppers', 'Beans', 'Eggplant']
            },
            {
                name: 'Armyworms / Caterpillars',
                icon: '🐛',
                description: 'Feed on leaves and fruits',
                damage: 'Holes in leaves, defoliation, fruit damage',
                cropsAffected: ['Cabbage', 'Corn', 'Tomatoes', 'Peppers']
            },
            {
                name: 'Stem Borers',
                icon: '🐛',
                description: 'Larvae bore into stems',
                damage: 'Wilting, stem breakage, plant death',
                cropsAffected: ['Corn', 'Rice', 'Sugarcane']
            },
            {
                name: 'Thrips',
                icon: '🪰',
                description: 'Feed on flowers and leaves',
                damage: 'Silver streaks, deformed fruits, flower damage',
                cropsAffected: ['Peppers', 'Beans', 'Okra', 'Onions']
            },
            {
                name: 'Leafminers',
                icon: '🪰',
                description: 'Larvae tunnel through leaves',
                damage: 'White trails in leaves, reduced photosynthesis',
                cropsAffected: ['Tomatoes', 'Lettuce', 'Spinach']
            },
            {
                name: 'Fruit Flies',
                icon: '🪰',
                description: 'Lay eggs in fruits',
                damage: 'Fruit rot, premature drop, unmarketable produce',
                cropsAffected: ['Tomatoes', 'Cucumbers', 'Melons']
            }
        ];
    }

    initializeCropGuides() {
        return {
            'Tomatoes': {
                badInsects: ['Whiteflies', 'Aphids', 'Leafminers', 'Caterpillar pests'],
                goodInsects: ['Ladybirds', 'Lacewings', 'Parasitic Wasps'],
                releaseTiming: '2-3 weeks after transplanting, before pests appear',
                notes: 'Monitor for early pest detection. Release beneficial insects preventively.'
            },
            'Capsicum (Bell Pepper)': {
                badInsects: ['Aphids', 'Thrips', 'Spider Mites'],
                goodInsects: ['Predatory Mites', 'Ladybirds', 'Lacewings'],
                releaseTiming: 'Early flowering stage, when first pests detected',
                notes: 'Thrips are major pest - focus on predatory mites and lacewings.'
            },
            'Cucumbers & Gourds': {
                badInsects: ['Spider Mites', 'Whiteflies'],
                goodInsects: ['Predatory Mites', 'Ladybirds'],
                releaseTiming: 'Early vine stage, before mite infestation',
                notes: 'Spider mites are critical - release predatory mites early.'
            },
            'Cabbage & Brassicas': {
                badInsects: ['Caterpillars (Armyworm, Diamondback Moth)', 'Aphids'],
                goodInsects: ['Parasitic Wasps', 'Lacewings', 'Assassin Bugs'],
                releaseTiming: 'Immediately after transplanting, before caterpillars appear',
                notes: 'Caterpillars are major threat - parasitic wasps are essential.'
            },
            'Long Beans / French Beans': {
                badInsects: ['Aphids', 'Mites', 'Thrips'],
                goodInsects: ['Ladybirds', 'Predatory Mites'],
                releaseTiming: 'Early flowering stage',
                notes: 'Aphids can be severe - ladybirds provide excellent control.'
            },
            'Eggplant (Brinjal)': {
                badInsects: ['Shoot Borer', 'Whiteflies', 'Mites'],
                goodInsects: ['Lacewings', 'Parasitic Wasps', 'Predatory Mites'],
                releaseTiming: 'Early growth stage, before shoot borer damage',
                notes: 'Shoot borer requires early intervention with parasitic wasps.'
            },
            'Okra': {
                badInsects: ['Jassids', 'Whiteflies', 'Thrips'],
                goodInsects: ['Ladybirds', 'Lacewings', 'Hoverflies'],
                releaseTiming: 'Early flowering stage',
                notes: 'Jassids can cause yellowing - use ladybirds and lacewings.'
            },
            'Lettuce & Leafy Greens': {
                badInsects: ['Aphids'],
                goodInsects: ['Hoverflies', 'Ladybirds'],
                releaseTiming: 'Early growth stage, before aphid infestation',
                notes: 'Aphids are primary pest - hoverflies are very effective.'
            },
            'Sweet Corn / Maize': {
                badInsects: ['Fall Armyworm', 'Stem Borers'],
                goodInsects: ['Parasitic Wasps', 'Assassin Bugs'],
                releaseTiming: 'Early growth stage, before armyworm damage',
                notes: 'Armyworm is critical pest - release parasitic wasps early.'
            },
            'Root Crops (Cassava, Taro, Sweet Potato)': {
                badInsects: ['Aphids', 'Weevils', 'Whiteflies'],
                goodInsects: ['Ladybirds', 'Ground Beetles'],
                releaseTiming: 'Early growth stage',
                notes: 'Weevils attack roots - ground beetles help control soil pests.'
            }
        };
    }

    displayGoodInsects() {
        const container = document.getElementById('goodInsectsContainer');
        if (!container) return;

        container.innerHTML = this.goodInsects.map(insect => `
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="insect-card">
                    <h4>${insect.icon} ${insect.name}</h4>
                    <p class="text-muted">${insect.description}</p>
                    <div class="mb-2">
                        <strong>Targets:</strong>
                        ${insect.targets.map(target => `<span class="bad-pest-badge">${target}</span>`).join('')}
                    </div>
                    <div class="mb-2">
                        <strong>Effectiveness:</strong> ${insect.effectiveness}
                    </div>
                    <div class="mb-2">
                        <strong>Release Timing:</strong> ${insect.releaseTiming}
                    </div>
                    <button class="btn btn-sm btn-success mt-2" onclick="biologicalFarming.showBreedingGuide('${insect.name}')">
                        <i class="fas fa-book me-1"></i>Breeding Guide
                    </button>
                </div>
            </div>
        `).join('');
    }

    displayBadInsects() {
        const container = document.getElementById('badInsectsContainer');
        if (!container) return;

        container.innerHTML = this.badInsects.map(pest => `
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="pest-card">
                    <h5>${pest.icon} ${pest.name}</h5>
                    <p class="mb-2">${pest.description}</p>
                    <p class="mb-2"><strong>Damage:</strong> ${pest.damage}</p>
                    <p class="mb-0"><strong>Affects:</strong> ${pest.cropsAffected.join(', ')}</p>
                </div>
            </div>
        `).join('');
    }

    populateCropSelector() {
        const selector = document.getElementById('cropSelector');
        if (!selector) return;

        Object.keys(this.cropGuides).forEach(crop => {
            const option = document.createElement('option');
            option.value = crop;
            option.textContent = crop;
            selector.appendChild(option);
        });
    }

    setupCropSelector() {
        const selector = document.getElementById('cropSelector');
        if (!selector) return;

        selector.addEventListener('change', (e) => {
            const crop = e.target.value;
            if (crop) {
                this.displayCropGuide(crop);
            } else {
                document.getElementById('cropGuideContainer').innerHTML = '';
            }
        });
    }

    displayCropGuide(cropName) {
        const guide = this.cropGuides[cropName];
        if (!guide) return;

        const container = document.getElementById('cropGuideContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="crop-guide-card">
                <h3><i class="fas fa-seedling text-success me-2"></i>${cropName}</h3>
                
                <div class="row mt-3">
                    <div class="col-md-6">
                        <h5><i class="fas fa-exclamation-triangle text-danger me-2"></i>Bad Insects (Pests)</h5>
                        <div class="pest-card">
                            ${guide.badInsects.map(pest => `
                                <div class="mb-2">
                                    <span class="bad-pest-badge">${pest}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h5><i class="fas fa-check-circle text-success me-2"></i>Good Insects (Beneficial)</h5>
                        <div class="mb-3">
                            ${guide.goodInsects.map(insect => `
                                <span class="good-insect-badge">${insect}</span>
                            `).join('')}
                        </div>
                        <div class="alert alert-info">
                            <strong>Release Timing:</strong> ${guide.releaseTiming}
                        </div>
                    </div>
                </div>

                <div class="alert alert-warning mt-3">
                    <strong><i class="fas fa-info-circle me-2"></i>Notes:</strong> ${guide.notes}
                </div>

                <div class="mt-3">
                    <h5><i class="fas fa-book text-primary me-2"></i>Recommended Action Plan</h5>
                    <ol>
                        <li>Identify which pests are affecting your ${cropName.toLowerCase()}</li>
                        <li>Select the appropriate beneficial insects: ${guide.goodInsects.join(', ')}</li>
                        <li>Set up insectary with flowering plants (marigold, basil, coriander)</li>
                        <li>Release beneficial insects at: ${guide.releaseTiming}</li>
                        <li>Monitor pest populations weekly</li>
                        <li>Release additional beneficial insects if pest pressure increases</li>
                        <li>Avoid using broad-spectrum pesticides</li>
                    </ol>
                </div>
            </div>
        `;
    }

    showBreedingGuide(insectName) {
        const insect = this.goodInsects.find(i => i.name === insectName);
        if (!insect) return;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            ${insect.icon} ${insect.name} - Breeding Guide
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h5>Description</h5>
                        <p>${insect.description}</p>
                        
                        <h5 class="mt-3">Target Pests</h5>
                        <div class="mb-3">
                            ${insect.targets.map(target => `<span class="bad-pest-badge">${target}</span>`).join('')}
                        </div>

                        <h5 class="mt-3">Breeding Tips</h5>
                        <ul>
                            ${insect.breedingTips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>

                        <div class="alert alert-info mt-3">
                            <strong>Release Timing:</strong> ${insect.releaseTiming}
                        </div>

                        <div class="alert alert-success mt-3">
                            <strong>Effectiveness:</strong> ${insect.effectiveness}
                        </div>

                        <h5 class="mt-3">General Insectary Setup</h5>
                        <div class="breeding-guide">
                            <h6>1. Plant Flowering Plants</h6>
                            <ul>
                                <li>Marigold - Attracts ladybirds and lacewings</li>
                                <li>Basil - Attracts parasitic wasps</li>
                                <li>Coriander - Attracts hoverflies and lacewings</li>
                                <li>Fennel - Attracts beneficial insects</li>
                                <li>Sunflower - Provides food and shelter</li>
                            </ul>
                        </div>
                        <div class="breeding-guide">
                            <h6>2. Reduce Pesticide Use</h6>
                            <p>Avoid broad-spectrum pesticides. Use organic sprays (neem, chili, ginger) only when necessary.</p>
                        </div>
                        <div class="breeding-guide">
                            <h6>3. Provide Water Sources</h6>
                            <p>Set up shallow water dishes with stones for landing spots.</p>
                        </div>
                        <div class="breeding-guide">
                            <h6>4. Release During Early Planting</h6>
                            <p>Release beneficial insects early in the season, before pest populations become large.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" onclick="biologicalFarming.printGuide('${insectName}')">
                            <i class="fas fa-print me-2"></i>Print Guide
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }

    printGuide(insectName) {
        const insect = this.goodInsects.find(i => i.name === insectName);
        if (!insect) return;

        alert(`🖨️ Print Breeding Guide for ${insectName}\n\nThis would generate a printable PDF guide including:\n\n• Insect description and targets\n• Breeding tips and setup\n• Release timing\n• Effectiveness information\n• General insectary guidelines\n\nPerfect for field reference!`);
    }

    getGoodInsectsForPest(pestName) {
        const matchingInsects = [];
        this.goodInsects.forEach(insect => {
            if (insect.targets.some(target => 
                target.toLowerCase().includes(pestName.toLowerCase()) ||
                pestName.toLowerCase().includes(target.toLowerCase())
            )) {
                matchingInsects.push(insect.name);
            }
        });
        return matchingInsects;
    }

    getPestsForCrop(cropName) {
        const guide = this.cropGuides[cropName];
        return guide ? guide.badInsects : [];
    }

    getBeneficialInsectsForCrop(cropName) {
        const guide = this.cropGuides[cropName];
        return guide ? guide.goodInsects : [];
    }
}

// Initialize Biological Farming Module
const biologicalFarming = new BiologicalFarming();

// Export for global access
window.biologicalFarming = biologicalFarming;


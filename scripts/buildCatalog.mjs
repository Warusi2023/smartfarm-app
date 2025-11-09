import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const SRC = path.resolve('data/catalog.source.yaml');
const ENRICH = path.resolve('data/catalog.enrich.yaml');
const OUT = path.resolve('public/data/catalog.json');

const VERSION = 2;

function normalizeName(value) {
    return String(value).replace(/\s*\(.*?\)\s*/g, '').trim();
}

function uniq(arr = []) {
    return Array.from(new Set(arr.filter(Boolean)));
}

function baseItem(group, category, subCategory, name, tags = [], extra = {}) {
    const cleanName = normalizeName(name);
    const id = `${group}:${cleanName}`.toLowerCase();
    return {
        id,
        group,
        category,
        subCategory,
        name: cleanName,
        scientificName: extra.scientificName || null,
        aliases: extra.aliases || [],
        notes: extra.notes || null,
        environment: extra.environment || 'terrestrial',
        tags: uniq([...(tags || []), group, extra.isCrop ? 'crop' : null, extra.isTree ? 'tree' : null]),
        isEdible: Boolean(extra.isEdible),
        isCrop: Boolean(extra.isCrop),
        isTree: Boolean(extra.isTree),
        isFlower: group === 'flowers',
    };
}

function flattenPlantGroups(plants) {
    const out = [];
    for (const [category, block] of Object.entries(plants || {})) {
        if (block && block.items && Array.isArray(block.items)) {
            block.items.forEach(name => {
                out.push(
                    baseItem('plants', category, null, name, block.tags, {
                        environment: 'terrestrial',
                        isEdible: true,
                        isCrop: true,
                    })
                );
            });
        } else if (block && typeof block === 'object') {
            for (const [subCategory, subBlock] of Object.entries(block)) {
                if (!subBlock || !Array.isArray(subBlock.items)) continue;
                subBlock.items.forEach(name => {
                    out.push(
                        baseItem('plants', category, subCategory, name, subBlock.tags, {
                            environment: 'terrestrial',
                            isEdible: true,
                            isCrop: true,
                            isTree: /tree/i.test(subCategory) || /tree/i.test(category),
                        })
                    );
                });
            }
        }
    }
    return out;
}

function makeSimple(group, data, flags = {}) {
    const out = [];
    for (const [category, block] of Object.entries(data || {})) {
        (block.items || []).forEach(name => {
            out.push(baseItem(group, category, null, name, block.tags, flags));
        });
    }
    return out;
}

function makeFishItems(fish) {
    const out = [];
    for (const [category, block] of Object.entries(fish || {})) {
        (block.items || []).forEach(entry => {
            const isObj = typeof entry === 'object';

            out.push(
                baseItem('fish', category, null, isObj ? entry.name : entry, block.tags, {
                    scientificName: isObj ? entry.scientific : null,
                    notes: isObj ? entry.notes || null : null,
                    environment: /marine/i.test((block.tags || []).join(' ')) ? 'marine' : 'freshwater',
                    isEdible: true,
                })
            );
        });
    }
    return out;
}

function readYaml(filePath) {
    if (!fs.existsSync(filePath)) {
        return null;
    }
    return yaml.parse(fs.readFileSync(filePath, 'utf8'));
}

function mergeLayer(target, layer) {
    if (!layer) return target;

    for (const [key, value] of Object.entries(layer)) {
        if (value === undefined) continue;

        if (Array.isArray(value)) {
            const existing = Array.isArray(target[key]) ? target[key] : target[key] ? [target[key]] : [];
            target[key] = uniq([...existing, ...value]);
        } else if (value && typeof value === 'object' && !Array.isArray(value)) {
            // Shallow merge nested objects (e.g., if future nested data is added)
            target[key] = { ...(target[key] || {}), ...value };
        } else {
            target[key] = value;
        }
    }

    return target;
}

function applyEnrichment(items, enrichment) {
    if (!enrichment) {
        return items;
    }

    const defaultsAll = enrichment?.defaults?.all || {};
    const defaultsGroups = enrichment?.defaults?.groups || {};
    const defaultsCategories = enrichment?.defaults?.categories || {};
    const overridesCategories = enrichment?.overrides?.categories || {};
    const overridesItems = enrichment?.overrides?.items || {};

    return items.map(item => {
        const updated = { ...item };

        mergeLayer(updated, defaultsAll);
        mergeLayer(updated, defaultsGroups[item.group]);
        mergeLayer(updated, defaultsCategories?.[item.group]?.[item.category]);
        if (item.subCategory) {
            mergeLayer(updated, defaultsCategories?.[item.group]?.[item.subCategory]);
        }

        mergeLayer(updated, overridesCategories?.[item.group]?.[item.category]);
        if (item.subCategory) {
            mergeLayer(updated, overridesCategories?.[item.group]?.[item.subCategory]);
        }

        mergeLayer(updated, overridesItems[item.id]);

        // Always keep tags unique
        updated.tags = uniq(updated.tags);

        return updated;
    });
}

function main() {
    if (!fs.existsSync(SRC)) {
        console.error(`Missing ${SRC}. Paste your catalog source data first.`);
        process.exit(1);
    }

    const source = readYaml(SRC);
    const enrichment = readYaml(ENRICH);

    const items = [
        ...flattenPlantGroups(source.plants),
        ...makeSimple('flowers', source.flowers, { environment: 'terrestrial' }),
        ...makeSimple('trees', source.trees, { environment: 'terrestrial', isTree: true }),
        ...makeFishItems(source.fish),
        ...makeSimple('bivalves', source.bivalves, { environment: 'marine', isEdible: true }),
        ...makeSimple('crustaceans', source.crustaceans, { isEdible: true }),
        ...makeSimple('pets', source.pets, { environment: 'domestic' }),
    ];

    const map = new Map();
    for (const entry of items) {
        const key = `${entry.group}::${entry.name}`.toLowerCase();
        if (!map.has(key)) {
            map.set(key, entry);
        } else {
            const existing = map.get(key);
            existing.tags = uniq([...(existing.tags || []), ...(entry.tags || [])]);
            existing.aliases = uniq([...(existing.aliases || []), ...(entry.aliases || [])]);
            existing.scientificName = existing.scientificName || entry.scientificName || null;
            existing.notes = existing.notes || entry.notes || null;
        }
    }

    let final = Array.from(map.values());
    final = applyEnrichment(final, enrichment);
    final.sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));

    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, JSON.stringify({ version: VERSION, count: final.length, items: final }, null, 2));
    console.log(`catalog.json written (${final.length} items) → ${OUT}`);
}

main();


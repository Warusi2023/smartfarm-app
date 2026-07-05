/**
 * Project forageFamilyIpmRecords.json into the SmartFarm Pests & Protection panel shape.
 * Contract metadata (schema_version, climate_keys, advisory_scope_values) is exposed
 * for validation but is not part of the consumer panel payload.
 */

const { CHEMICAL_SAFETY_NOTE } = require('./ipmConstants');

const TARGET_LABELS = {
    foliage: 'foliage',
    roots_crown: 'roots and crowns',
    forage_quality: 'forage quality at harvest',
    crown_stem: 'crowns and stems',
    whole_plant: 'whole-plant vigor',
    stem_foliage: 'stems and foliage',
    roots: 'roots',
    seed_heads: 'seed heads',
    flowers: 'flowers',
    roots_nodules: 'roots and nodules',
    stalk: 'stalks',
    foliage_whorl: 'whorl and foliage',
    seedlings: 'seedlings',
    ears: 'ears',
    roots_seedlings: 'roots and seedlings',
    seeds_seedlings: 'seedlings and roots'
};

function readContractMetadata(bundle) {
    return {
        schema_version: bundle.schema_version,
        climate_keys: bundle.climate_keys,
        advisory_scope_values: bundle.advisory_scope_values
    };
}

function formatRange(range) {
    if (!range || range.min == null || range.max == null) {
        return null;
    }
    return `${range.min}-${range.max}`;
}

function humanizeTarget(target) {
    if (!target) {
        return 'the crop';
    }
    return TARGET_LABELS[target] || String(target).replace(/_/g, ' ');
}

function formatPestDamage(pest) {
    const parts = [];
    if (pest.life_stage_note) {
        parts.push(pest.life_stage_note);
    }
    if (pest.note) {
        parts.push(pest.note);
    }
    return parts.join(' — ') || pest.note || '';
}

function mapPestsToPanel(majorPests) {
    const insects = majorPests.filter((pest) => pest.category === 'insect');
    const diseases = majorPests.filter((pest) => pest.category === 'disease');
    const panelPests = [];
    const insectsByTarget = {};

    for (const pest of insects) {
        const key = pest.target || 'general';
        if (!insectsByTarget[key]) {
            insectsByTarget[key] = [];
        }
        insectsByTarget[key].push(pest);
    }

    for (const pests of Object.values(insectsByTarget)) {
        panelPests.push({
            name: pests.map((pest) => pest.name).join(', '),
            damageDescription: pests.map((pest) => formatPestDamage(pest)).join(' ')
        });
    }

    if (diseases.length > 0) {
        panelPests.push({
            name: 'Major forage diseases and disorders',
            damageDescription: diseases.map((pest) => `${pest.name}: ${pest.note}`).join(' ')
        });
    }

    return panelPests;
}

function buildDamageToLookFor(record) {
    const picks = record.major_pests.slice(0, 4);
    return picks.map((pest) => {
        const cue = pest.life_stage_note || pest.note;
        const target = humanizeTarget(pest.target);
        return `${pest.name} affecting ${target} -> ${cue}`;
    });
}

function mapBiologicalsToPanel(biologicalControls) {
    return biologicalControls.map((control) => ({
        name: control.name,
        description: control.note
    }));
}

function formatChemicalControl(control) {
    const groups = [control.irac_group, control.frac_group, control.hrac_group].filter(Boolean);
    const groupText = groups.length > 0 ? `IRAC/FRAC/HRAC ${groups.join(' / ')}: ` : '';
    const target = humanizeTarget(control.target);
    return `${groupText}${target} — ${control.note}`;
}

function mapChemicalsToPanel(chemicalControls) {
    const actionable = chemicalControls.filter((control) => control.type !== 'stewardship');
    const stewardship = chemicalControls.filter((control) => control.type === 'stewardship');
    const actives = actionable.map((control) => formatChemicalControl(control));
    const mainPestGroups = actionable
        .map((control) => humanizeTarget(control.target))
        .join(', ');
    const stewardshipNote = stewardship.map((control) => control.note).join(' ');

    return {
        actives,
        mainPestGroups,
        safetyNote: stewardshipNote ? `${CHEMICAL_SAFETY_NOTE} ${stewardshipNote}` : CHEMICAL_SAFETY_NOTE
    };
}

function summarizePrimaryClimates(record) {
    const notes = record.climate_notes || {};
    return Object.entries(notes)
        .filter(([, value]) => value && value.advisory_scope === 'primary')
        .map(([climate]) => climate.replace(/_/g, ' '))
        .join(', ');
}

function summarizeMarginalClimates(record) {
    const notes = record.climate_notes || {};
    return Object.entries(notes)
        .filter(([, value]) => value && value.advisory_scope === 'marginal')
        .map(([climate]) => climate.replace(/_/g, ' '))
        .join(', ');
}

function hasOutOfScopePolar(record) {
    return record.climate_notes?.polar?.advisory_scope === 'out_of_scope';
}

function buildAlfalfaMaturityNotes(record) {
    const temperate = record.maturity_profile.by_climate.temperate;
    const tropical = record.maturity_profile.by_climate.tropical;
    const parts = [
        `Best fit is ${summarizePrimaryClimates(record) || 'temperate and continental production'}.`,
        summarizeMarginalClimates(record)
            ? `Marginal in ${summarizeMarginalClimates(record)} sites without careful irrigation, dormancy, or drainage management.`
            : null,
        hasOutOfScopePolar(record)
            ? 'Polar open-field production is out of scope for standard long-duration lucerne.'
            : null,
        temperate
            ? `Representative temperate windows: first cut about ${formatRange(temperate.first_cut_days)} days after seeding, ` +
              `cut intervals about ${formatRange(temperate.cut_interval_days)} days, stand life about ${formatRange(temperate.stand_life_years)} years.`
            : null,
        tropical
            ? `Tropical irrigated systems may reach first cut in about ${formatRange(tropical.first_cut_days)} days with ${formatRange(tropical.cuts_per_year)} cuts per year, but stand life is often shorter (${formatRange(tropical.stand_life_years)} years).`
            : null,
        record.maturity_profile.localization_note
    ];
    return parts.filter(Boolean).join(' ');
}

function buildCloverMaturityNotes(record) {
    const red = record.maturity_profile.by_species?.red_clover;
    const white = record.maturity_profile.by_species?.white_clover;
    const temperate = record.maturity_profile.by_climate.temperate;
    const parts = [
        `Best fit is ${summarizePrimaryClimates(record) || 'temperate and continental pastures and hay mixtures'}.`,
        summarizeMarginalClimates(record)
            ? `Marginal in ${summarizeMarginalClimates(record)} unless species choice and irrigation match the site.`
            : null,
        hasOutOfScopePolar(record) ? 'Polar fringe use only; not a primary forage class.' : null,
        red
            ? `Red clover commonly establishes in about ${formatRange(red.establishment_days)} days with ${formatRange(red.stand_life_years)} years of productive use.`
            : null,
        white
            ? `White clover often needs about ${formatRange(white.establishment_days)} days to establish usable cover and may persist ${formatRange(white.stand_life_years)} years in cool moist sites.`
            : null,
        temperate ? temperate.note : null,
        record.maturity_profile.localization_note
    ];
    return parts.filter(Boolean).join(' ');
}

function buildSilageMaizeMaturityNotes(record) {
    const temperate = record.maturity_profile.by_climate.temperate;
    const harvest = temperate?.days_to_optimal_harvest;
    const parts = [
        `Best fit is ${summarizePrimaryClimates(record) || 'temperate, continental, tropical, and irrigated dry-season production'}.`,
        summarizeMarginalClimates(record)
            ? `High-mountain production is marginal and relies on short-season hybrids.`
            : null,
        hasOutOfScopePolar(record) ? 'Polar open-field silage maize is out of scope.' : null,
        harvest
            ? `Representative temperate harvest windows: early hybrids about ${formatRange(harvest.early)} days, medium about ${formatRange(harvest.medium)} days, late about ${formatRange(harvest.late)} days to whole-plant chop at target dry matter.`
            : null,
        'Harvest target is typically milk to early dent stage at about 30-38% dry matter.',
        record.maturity_profile.localization_note
    ];
    return parts.filter(Boolean).join(' ');
}

function buildPastureGrassMaturityNotes(record) {
    const ryegrass = record.maturity_profile.by_species?.perennial_ryegrass;
    const fescue = record.maturity_profile.by_species?.tall_fescue;
    const bermuda = record.maturity_profile.by_species?.bermuda_grass;
    const parts = [
        `Cool-season grasses fit ${summarizePrimaryClimates(record) || 'temperate and continental climates'}; warm-season grasses fit tropical and dry grazing systems.`,
        summarizeMarginalClimates(record)
            ? `High-mountain sites are marginal for warm-season grasses and rely on slow-developing cool-season types.`
            : null,
        hasOutOfScopePolar(record) ? 'Polar pasture use is limited to very short cool-season niches.' : null,
        ryegrass
            ? `Perennial ryegrass often establishes in about ${formatRange(ryegrass.establishment_days)} days with ${formatRange(ryegrass.regrowth_interval_days)} day regrowth intervals and ${formatRange(ryegrass.stand_life_years)} years of stand life.`
            : null,
        fescue
            ? `Tall fescue commonly needs about ${formatRange(fescue.establishment_days)} days to establish and may persist ${formatRange(fescue.stand_life_years)} years.`
            : null,
        bermuda
            ? `Bermuda grass may establish in about ${formatRange(bermuda.establishment_days)} days with ${formatRange(bermuda.regrowth_interval_days)} day peak-season regrowth and long stand persistence.`
            : null,
        record.maturity_profile.localization_note
    ];
    return parts.filter(Boolean).join(' ');
}

function buildMaturityNotes(record) {
    switch (record.crop_key) {
        case 'alfalfa':
            return buildAlfalfaMaturityNotes(record);
        case 'clover_forage':
            return buildCloverMaturityNotes(record);
        case 'silage_maize':
            return buildSilageMaizeMaturityNotes(record);
        case 'pasture_grasses':
            return buildPastureGrassMaturityNotes(record);
        default:
            return record.maturity_profile?.localization_note || null;
    }
}

function transformRecord(record) {
    return {
        cropName: record.crop_name,
        maturityNotes: buildMaturityNotes(record),
        damageToLookFor: buildDamageToLookFor(record),
        pests: mapPestsToPanel(record.major_pests),
        beneficials: mapBiologicalsToPanel(record.biological_controls),
        chemicalActives: mapChemicalsToPanel(record.chemical_controls)
    };
}

function transformAllRecords(bundle) {
    const ipm = {};
    for (const record of bundle.records) {
        ipm[record.crop_key] = transformRecord(record);
    }
    return ipm;
}

module.exports = {
    readContractMetadata,
    transformRecord,
    transformAllRecords,
    mapPestsToPanel,
    mapBiologicalsToPanel,
    mapChemicalsToPanel,
    buildMaturityNotes,
    buildDamageToLookFor
};

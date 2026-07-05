/**
 * Forage and pasture family IPM — projected from forageFamilyIpmRecords.json.
 */

const forageRecords = require('./forageFamilyIpmRecords.json');
const { readContractMetadata, transformAllRecords } = require('./forageFamilyIpmTransformer');

const FORAGE_FAMILY_CONTRACT = readContractMetadata(forageRecords);

/** @type {Record<string, object>} */
const FORAGE_FAMILY_IPM = transformAllRecords(forageRecords);

const FORAGE_FAMILY_ALIASES = {
    alfalfa: 'alfalfa',
    lucerne: 'alfalfa',
    medic: 'alfalfa',
    medick: 'alfalfa',
    clover: 'clover_forage',
    'red clover': 'clover_forage',
    'white clover': 'clover_forage',
    'subterranean clover': 'clover_forage',
    'sub clover': 'clover_forage',
    subclover: 'clover_forage',
    'alsike clover': 'clover_forage',
    'crimson clover': 'clover_forage',
    'berseem clover': 'clover_forage',
    'forage clover': 'clover_forage',
    'forage clovers': 'clover_forage',
    'silage maize': 'silage_maize',
    'silage corn': 'silage_maize',
    'forage maize': 'silage_maize',
    'corn silage': 'silage_maize',
    'maize silage': 'silage_maize',
    'maize for silage': 'silage_maize',
    'pasture grass': 'pasture_grasses',
    'pasture grasses': 'pasture_grasses',
    ryegrass: 'pasture_grasses',
    'perennial ryegrass': 'pasture_grasses',
    'italian ryegrass': 'pasture_grasses',
    fescue: 'pasture_grasses',
    'tall fescue': 'pasture_grasses',
    'meadow fescue': 'pasture_grasses',
    bermuda: 'pasture_grasses',
    'bermuda grass': 'pasture_grasses',
    bermudagrass: 'pasture_grasses',
    'bahia grass': 'pasture_grasses',
    bahiagrass: 'pasture_grasses',
    'rhodes grass': 'pasture_grasses',
    kikuyu: 'pasture_grasses',
    timothy: 'pasture_grasses',
    cocksfoot: 'pasture_grasses',
    orchardgrass: 'pasture_grasses',
    'orchard grass': 'pasture_grasses'
};

const FORAGE_FAMILY_CROP_KEYS = Object.keys(FORAGE_FAMILY_IPM);

module.exports = {
    FORAGE_FAMILY_CONTRACT,
    FORAGE_FAMILY_IPM,
    FORAGE_FAMILY_ALIASES,
    FORAGE_FAMILY_CROP_KEYS
};

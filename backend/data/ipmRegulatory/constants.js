/** Shared source_ref markers for IPM regulatory imports */

const ILLUSTRATIVE_SEED_SOURCE_REF = 'smartfarm:ipm_illustrative_seed_v1';

/** Prefix for Fiji MAAF / Pesticides Act register-backed rows */
const MAAF_FJ_REGISTER_SOURCE_PREFIX = 'maaf:fj:pesticides_register';

const MAAF_FJ_PESTICIDES_ACT = 'maaf:fj:pesticides_act_1971';

/** APPPC 2015 country report — 338 registered trade names aggregate */
const MAAF_FJ_APPPC_2015_PROVENANCE =
    `${MAAF_FJ_REGISTER_SOURCE_PREFIX};provenance:apppc_neappc_2015;aggregate:338_trade_names`;

const REGISTER_VERIFY_NOTE =
    'Confirm Fiji Pesticides Act registration number on the product label before purchase or application. ' +
    'SmartFarm lists common actives from the national register framework — not a substitute for the label or agronomist advice.';

const ILLUSTRATIVE_SEED_NOTES =
    'Illustrative display approval for example actives in SmartFarm IPM panels. ' +
    'Does not replace Fiji MAAF Pesticides Register, Biosecurity Authority of Fiji guidance, ' +
    'or on-product label verification. Confirm with a local agronomist before use.';

module.exports = {
    ILLUSTRATIVE_SEED_SOURCE_REF,
    ILLUSTRATIVE_SEED_NOTES,
    MAAF_FJ_REGISTER_SOURCE_PREFIX,
    MAAF_FJ_PESTICIDES_ACT,
    MAAF_FJ_APPPC_2015_PROVENANCE,
    REGISTER_VERIFY_NOTE
};

/**
 * IPM intelligence — public API (Phase C).
 */

const cropKeyResolver = require('./cropKeyResolver');
const regionFilter = require('./regionFilter');
const ipmRepository = require('./ipmRepository');

const { normalizeLabel } = require('./labelNormalizer');

module.exports = {
    ...cropKeyResolver,
    ...regionFilter,
    ...ipmRepository,
    normalizeLabel
};

/**
 * Normalize taxonomy labels before IPM classifier regex runs.
 * Hyphens, slashes, and underscores become spaces so word-boundary patterns behave predictably.
 */

function normalizeLabel(text) {
    return String(text || '')
        .trim()
        .toLowerCase()
        .replace(/[-_/\\]+/g, ' ')
        .replace(/[^\w\s]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

module.exports = { normalizeLabel };

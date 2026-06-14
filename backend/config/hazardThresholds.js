/**
 * Central thresholds for Farm Hazard & Early Warning (v1).
 * Adjust here — rules read from this file only.
 */
module.exports = {
    heat: {
        watchMaxTempC: 32,
        warningMaxTempC: 35,
        severeMaxTempC: 38,
        persistenceDaysForSevere: 2
    },
    cold: {
        watchMinTempC: 5,
        warningMinTempC: 2,
        severeMinTempC: 0
    },
    flood: {
        watchRainMm: 15,
        warningRainMm: 25,
        severeRainMm: 40
    },
    wind: {
        watchWindKmh: 40,
        warningWindKmh: 50,
        severeWindKmh: 65
    },
    drought: {
        dryDayRainMaxMm: 5,
        dryWeekMinDays: 5,
        watchDryDays: 5,
        warningDryDays: 6,
        severeDryDays: 7,
        watchMaxTempC: 30,
        warningMaxTempC: 32
    },
    /** Max hazards surfaced in topActions / compact UI */
    topActionLimit: 5,
    /** Max hazards shown in summary (sorted by severity) */
    summaryHazardLimit: 3
};

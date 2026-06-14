/**
 * Aquaculture alert rule engine (Phase 1)
 */
const { evaluateAlerts, computeOverallStatus } = require('../../services/aquacultureAlertService');

describe('aquacultureAlertService', () => {
    const baseLog = {
        dissolvedOxygenMgl: 6,
        ph: 7.2,
        waterTempC: 28,
        mortalityCount: 0,
        estimatedStockCount: 1000
    };

    it('returns critical for dissolved oxygen below 4 mg/L', () => {
        const result = evaluateAlerts({
            log: { ...baseLog, dissolvedOxygenMgl: 3.5 },
            species: 'tilapia',
            hasLogToday: true
        });
        expect(result.alerts.some((a) => a.code === 'LOW_DO' && a.severity === 'critical')).toBe(true);
        expect(result.overallStatus).toBe('critical');
    });

    it('returns warning for dissolved oxygen between 4 and 5 mg/L', () => {
        const result = evaluateAlerts({
            log: { ...baseLog, dissolvedOxygenMgl: 4.5 },
            species: 'tilapia',
            hasLogToday: true
        });
        const alert = result.alerts.find((a) => a.code === 'LOW_DO');
        expect(alert).toBeDefined();
        expect(alert.severity).toBe('warning');
        expect(result.overallStatus).toBe('warning');
    });

    it('returns warning for out-of-range pH', () => {
        const lowPh = evaluateAlerts({
            log: { ...baseLog, ph: 6.0 },
            species: 'tilapia',
            hasLogToday: true
        });
        expect(lowPh.alerts.some((a) => a.code === 'PH_OUT_OF_RANGE')).toBe(true);

        const highPh = evaluateAlerts({
            log: { ...baseLog, ph: 9.0 },
            species: 'tilapia',
            hasLogToday: true
        });
        expect(highPh.alerts.some((a) => a.code === 'PH_OUT_OF_RANGE')).toBe(true);
    });

    it('returns warning for tilapia temperature outside 24–32°C', () => {
        const cold = evaluateAlerts({
            log: { ...baseLog, waterTempC: 22 },
            species: 'tilapia',
            hasLogToday: true
        });
        expect(cold.alerts.some((a) => a.code === 'TEMP_OUT_OF_RANGE')).toBe(true);

        const hot = evaluateAlerts({
            log: { ...baseLog, waterTempC: 34 },
            species: 'tilapia',
            hasLogToday: true
        });
        expect(hot.alerts.some((a) => a.code === 'TEMP_OUT_OF_RANGE')).toBe(true);
    });

    it('returns warning for shrimp temperature outside 26–34°C', () => {
        const cold = evaluateAlerts({
            log: { ...baseLog, waterTempC: 24 },
            species: 'shrimp',
            hasLogToday: true
        });
        expect(cold.alerts.some((a) => a.code === 'TEMP_OUT_OF_RANGE')).toBe(true);

        const hot = evaluateAlerts({
            log: { ...baseLog, waterTempC: 36 },
            species: 'shrimp',
            hasLogToday: true
        });
        expect(hot.alerts.some((a) => a.code === 'TEMP_OUT_OF_RANGE')).toBe(true);
    });

    it('returns warning and critical for high mortality rates', () => {
        const warning = evaluateAlerts({
            log: { ...baseLog, mortalityCount: 30, estimatedStockCount: 1000 },
            species: 'tilapia',
            hasLogToday: true
        });
        expect(warning.alerts.some((a) => a.code === 'HIGH_MORTALITY' && a.severity === 'warning')).toBe(true);

        const critical = evaluateAlerts({
            log: { ...baseLog, mortalityCount: 60, estimatedStockCount: 1000 },
            species: 'tilapia',
            hasLogToday: true
        });
        expect(critical.alerts.some((a) => a.code === 'HIGH_MORTALITY' && a.severity === 'critical')).toBe(true);
        expect(critical.overallStatus).toBe('critical');
    });

    it('returns info when no log recorded for today', () => {
        const result = evaluateAlerts({
            log: null,
            species: 'tilapia',
            hasLogToday: false
        });
        expect(result.alerts.some((a) => a.code === 'LOG_DUE' && a.severity === 'info')).toBe(true);
        expect(result.overallStatus).toBe('info');
    });

    it('computeOverallStatus picks highest severity', () => {
        expect(computeOverallStatus([
            { severity: 'info' },
            { severity: 'warning' },
            { severity: 'critical' }
        ])).toBe('critical');
    });
});

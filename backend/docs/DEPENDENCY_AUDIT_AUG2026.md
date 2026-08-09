# Backend dependency audit remediation (August 2026)

## Before

`npm audit` (backend): **14** vulnerabilities (1 low, 3 moderate, **10 high**).

Notable high findings: `axios`, `nodemailer`, `path-to-regexp` (via `express`), `form-data`, `jws` (via `jsonwebtoken`), `brace-expansion` / `minimatch` (via `swagger-jsdoc` / jest), `picomatch` (jest), `js-yaml`.

## After

`npm audit`: **0** vulnerabilities.

## Upgrades applied

| Package | Role | Action |
|---------|------|--------|
| `axios` | Direct production | Lockfile bump via `npm audit fix` → **1.19.0** |
| `express` (+ `path-to-regexp`, `qs`, `body-parser`) | Direct / transitive production | Lockfile bump via `npm audit fix` → express **4.22.2**, path-to-regexp **0.1.13** |
| `jws` | Transitive via `jsonwebtoken` | Lockfile bump → **3.2.3** |
| `form-data` | Transitive via `axios` | Lockfile bump → **4.0.6** |
| `follow-redirects`, `@babel/core`, jest tree (`picomatch`, etc.) | Mixed / mostly toolchains | Resolved by `npm audit fix` |
| `nodemailer` | Direct production (email) | Intentional major: **^7.0.10 → ^9.0.5** (API used: `createTransport` / `sendMail` / `verify` only) |

**Not used:** `npm audit fix --force`, no CI audit weakening.

## Remaining accepted risk

None for current `npm audit` report (0 findings).

Owner: Backend / August release. Re-run `npm audit` on each dependency PR.

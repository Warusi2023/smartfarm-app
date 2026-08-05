# Railway pre-deploy migrations (livestock persistence + photo)

## Why the deploy was failing

The backend pre-deploy step ran `npm run migrate:prod`, which replayed **every** migration in
`MIGRATION_ORDER` and executed each file as one `client.query(sql)` call. Any single error inside a
file aborted the whole file (implicit transaction), the runner set `process.exitCode = 1`, and Railway
stops the deployment when the pre-deploy command exits non-zero — so the new livestock code never
reached the start command.

A second, quieter problem would have broken the livestock API even after a "successful" migration:
`017_livestock_api_persistence.sql` only creates the `livestock` table with `CREATE TABLE IF NOT EXISTS`.
Databases created from `001_complete_schema.sql` already had the table in its legacy shape:

- `animal_type VARCHAR(100) NOT NULL`, and **no `species` column** — every insert from
  `services/livestockStore.js` fails with `column "species" does not exist` / `null value in column "animal_type"`.
- `tag_number VARCHAR(50) UNIQUE` globally — two farms cannot reuse an ear tag, and a second
  untagged animal collides.

## What changed

| File | Change |
|------|--------|
| `backend/scripts/run-migrations.js` | Rewritten to be re-runnable: `schema_migrations` ledger (name + sha256), per-migration transaction, statement-by-statement retry with `SAVEPOINT`, tolerated "already exists" error codes, post-run column verification, non-blocking exit by default. |
| `backend/database/migrations/018_livestock_legacy_column_reconcile.sql` | Adds `species` (backfilled from `animal_type`), drops `NOT NULL` on `animal_type`, replaces the global unique `tag_number` with a plain index, re-applies the API columns including `photo`, widens `production_purpose`/`lifecycle_stage`. |
| `backend/railway.json` | `deploy.preDeployCommand: "npm run predeploy"` so the pre-deploy step is version-controlled instead of dashboard-only. |
| `backend/package.json` | Added `predeploy` script. |
| `backend/tests/unit/runMigrations.test.js` | Covers the SQL splitter, tolerated error codes, DB URL resolution, savepoint skip/rethrow, and column verification. |

## Runner behaviour

- **Already applied** — a migration whose name + checksum is in `schema_migrations` is skipped and logged.
- **Partially applied** — the file is retried statement-by-statement; duplicate-object errors
  (`42P07`, `42710`, `42701`, `42723`, `42P06`, `42P04`, `23505`) are skipped, real errors are logged with
  the error code, table, column, constraint, and the failing statement.
- **Missing `DATABASE_URL`** — logged as an error, migrations skipped, exit `0` (deploy still boots).
  `DATABASE_URL`, `POSTGRES_URL`, `DATABASE_PRIVATE_URL`, and `DATABASE_PUBLIC_URL` are all accepted.
- **Failure** — exits `0` with a loud error so a schema problem cannot block a deploy. Set
  `MIGRATIONS_STRICT=true` on the service to make failures block again (useful for a one-off verification deploy).
- **Verification** — after the run it checks `crops` and `livestock` for the columns the API needs and logs
  `Schema verification passed` or the exact missing column names.

## Post-merge smoke test checklist

1. Confirm the Railway backend deploy completes successfully.
2. Check the logs for `Applying migration 018_livestock_legacy_column_reconcile.sql`.
3. Check the logs for `Schema verification passed`.
4. Call `/api/health` and confirm 200.
5. Call `/api/livestock` without a token and confirm 401.
6. Run the livestock persistence probe with `API_BASE` and `AUTH_TOKEN`.
7. Create a livestock record with a photo and confirm it round-trips through the API.
8. Refresh the web app and confirm the same record and photo still appear.
9. Confirm Android can read the same record and photo from the backend.

## Notes

- `011_soil_test_intelligence.sql` and `012_subscription_billing_state.sql` exist on disk but are **not** in
  `MIGRATION_ORDER`. Left as-is in this pass; add them deliberately when that work ships.
- Pre-deploy runs in a separate container with the production image, so it only needs `pg`, `dotenv`, and
  `winston` — all production dependencies.

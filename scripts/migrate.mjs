import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "pg";
import { glob } from "glob";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIG_DIR = join(__dirname, "..", "database", "migrations");

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const client = new Client({ connectionString: DATABASE_URL });

(async () => {
  await client.connect();

  // simple schema_migrations table (idempotent)
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  const files = (await glob("*.sql", { cwd: MIG_DIR }))
    .sort((a, b) => a.localeCompare(b));

  for (const f of files) {
    const { rows } = await client.query(
      "SELECT 1 FROM schema_migrations WHERE filename = $1",
      [f]
    );
    if (rows.length) {
      console.log(`Skipping (already applied): ${f}`);
      continue;
    }
    const sql = await readFile(join(MIG_DIR, f), "utf8");
    console.log(`Applying: ${f}`);
    await client.query("BEGIN");
    try {
      await client.query(sql);
      await client.query(
        "INSERT INTO schema_migrations (filename) VALUES ($1)",
        [f]
      );
      await client.query("COMMIT");
      console.log(`Applied: ${f} ✅`);
    } catch (e) {
      await client.query("ROLLBACK");
      console.error(`Failed on ${f}:`, e.message);
      process.exit(2);
    }
  }

  await client.end();
  console.log("All migrations applied ✅");
})();

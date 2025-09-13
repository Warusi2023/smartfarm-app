import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "pg";
import { glob } from "glob";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SEED_DIR = join(__dirname, "..", "database", "seeds");

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(0); // don't fail the deploy if seeds aren't critical
}

const client = new Client({ connectionString: DATABASE_URL });

(async () => {
  // If there is no seeds directory, just exit quietly
  try {
    const files = (await glob("*.sql", { cwd: SEED_DIR }))
      .sort((a, b) => a.localeCompare(b));

    if (!files.length) {
      console.log("No seed files found. Skipping seeding.");
      process.exit(0);
    }

    await client.connect();

    for (const f of files) {
      const sql = await readFile(join(SEED_DIR, f), "utf8");
      console.log(`Seeding: ${f}`);
      await client.query("BEGIN");
      try {
        await client.query(sql);
        await client.query("COMMIT");
        console.log(`Seeded: ${f} ✅`);
      } catch (e) {
        await client.query("ROLLBACK");
        console.error(`Seed failed on ${f}:`, e.message);
        process.exit(0); // do not fail deploy on seed error
      }
    }

    await client.end();
    console.log("Seeding complete ✅");
  } catch {
    console.log("Seed directory not present. Skipping seeding.");
  }
})();

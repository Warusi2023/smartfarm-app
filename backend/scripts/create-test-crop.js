require("dotenv").config();
const { Pool } = require("pg");
const { randomUUID } = require("crypto");
const { getPostgresSSLConfig } = require("../utils/ssl-config");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: getPostgresSSLConfig(process.env.DATABASE_URL),
});

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const id = randomUUID();

  const result = await pool.query(
    `
    INSERT INTO crops (
      id,
      name,
      category,
      planting_date,
      expected_harvest_date,
      area_planted,
      status,
      growth_stage,
      yield_unit
    )
    VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', $4, $5, $6, $7)
    RETURNING id, name, category, planting_date, expected_harvest_date, area_planted, status
    `,
    [id, "Test Crop", "vegetable", 1.0, "planted", "vegetative", "kg"]
  );

  console.log("Created crop:", result.rows[0]);
  await pool.end();
}

main().catch(async (err) => {
  console.error("create-test-crop failed:", err.message);
  try { await pool.end(); } catch {}
  process.exit(1);
});

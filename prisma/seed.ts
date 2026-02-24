import "dotenv/config";
import { Pool } from "pg";
import { US_STOCKS } from "./data/us-stocks";
import { US_ETFS } from "./data/us-etfs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

async function main() {
  const all = [...US_STOCKS, ...US_ETFS];

  // Bulk insert using UNNEST — one round-trip for all rows
  const result = await pool.query(
    `INSERT INTO instruments (symbol, name, type, exchange, currency, country)
     SELECT * FROM UNNEST(
       $1::varchar[], $2::varchar[], $3::varchar[],
       $4::varchar[], $5::varchar[], $6::varchar[]
     )
     ON CONFLICT (symbol, exchange) DO NOTHING`,
    [
      all.map((r) => r.symbol),
      all.map((r) => r.name),
      all.map((r) => r.type),
      all.map((r) => r.exchange),
      all.map((r) => r.currency),
      all.map((r) => r.country),
    ]
  );

  console.log(
    `Seeded ${result.rowCount ?? 0} new instruments (${all.length} total attempted).`
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => pool.end());

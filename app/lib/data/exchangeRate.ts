import { cacheLife, cacheTag } from "next/cache";

export async function fetchLatestExchangeRate(quotes: string): Promise<number> {
  "use cache";
  cacheLife("days");
  cacheTag("latest-exchangerate");
  const res = await fetch(
    `https://api.frankfurter.dev/v2/rates?base=USD&quotes=${encodeURIComponent(quotes)}`,
  );

  if (!res.ok) throw new Error(`Exchange rate fetch failed: ${res.status}`);
  const response = await res.json();

  return response[0].rate;
}

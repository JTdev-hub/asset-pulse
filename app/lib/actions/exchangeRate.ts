"use server";

import { fetchLatestExchangeRate } from "../data/exchangeRate";
import { getUserId } from "./auth";

export async function getLatestExchangeRates(quotes: string): Promise<number> {
  await getUserId();

  const latestExchangeRate = await fetchLatestExchangeRate(quotes);

  return latestExchangeRate;
}

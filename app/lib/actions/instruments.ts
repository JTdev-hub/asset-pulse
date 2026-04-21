"use server";
import YahooFinance from "yahoo-finance2";
import { getUserId } from "./auth";
import {
  fetchInstrument,
  fetchInstruments,
  InstrumentType,
} from "../data/instruments";

/**
 * Search instruments by symbol or name.
 * Optionally filter by type ("STOCK", "ETF", "CRYPTO") and/or country ("US", "PH", etc.).
 */
export async function searchInstruments(
  query: string,
  filters?: { type?: InstrumentType; country?: string },
) {
  await getUserId();
  return await fetchInstruments(query, filters);
}

/**
 * Look up a single instrument by symbol + exchange.
 * Returns null if not found.
 */
export async function getInstrument(symbol: string, exchange: string) {
  await getUserId();

  return await fetchInstrument(symbol, exchange);
}

export async function getInstrumentPrice(
  symbol: string | undefined,
): Promise<string> {
  await getUserId();

  const yahooFinance = new YahooFinance();

  if (!symbol) return "0";

  const quote = await yahooFinance.quote(symbol);

  return quote.regularMarketPrice ?? 0;
}

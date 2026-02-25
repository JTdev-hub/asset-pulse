"use server";

import prisma from "@/app/lib/prisma";
import YahooFinance from "yahoo-finance2";

export type InstrumentType = "STOCK" | "ETF" | "CRYPTO";

export type Instrument = Awaited<ReturnType<typeof searchInstruments>>[number];

/**
 * Search instruments by symbol or name.
 * Optionally filter by type ("STOCK", "ETF", "CRYPTO") and/or country ("US", "PH", etc.).
 */
export async function searchInstruments(
  query: string,
  filters?: { type?: InstrumentType; country?: string },
) {
  const q = query.trim();
  if (!q) return [];

  return prisma.instrument.findMany({
    where: {
      ...(filters?.type ? { type: filters.type } : {}),
      ...(filters?.country ? { country: filters.country } : {}),
      OR: [
        { symbol: { contains: q.toUpperCase(), mode: "insensitive" } },
        { name: { contains: q, mode: "insensitive" } },
      ],
    },
    orderBy: [{ type: "asc" }, { symbol: "asc" }],
    take: 20,
  });
}

/**
 * Look up a single instrument by symbol + exchange.
 * Returns null if not found.
 */
export async function getInstrument(symbol: string, exchange: string) {
  return prisma.instrument.findUnique({
    where: { symbol_exchange: { symbol: symbol.toUpperCase(), exchange } },
  });
}

/**
 * Returns all instruments of a given type, optionally filtered by country.
 * Intended for populating dropdowns or autocomplete lists.
 */
export async function listInstruments(filters?: {
  type?: InstrumentType;
  country?: string;
}) {
  return prisma.instrument.findMany({
    where: {
      ...(filters?.type ? { type: filters.type } : {}),
      ...(filters?.country ? { country: filters.country } : {}),
    },
    orderBy: { symbol: "asc" },
  });
}

export async function getInstrumentPrice(
  symbol: string | undefined,
): Promise<string> {
  const yahooFinance = new YahooFinance();

  if (!symbol) return "0";

  const quote = await yahooFinance.quote(symbol);

  return quote.regularMarketPrice ?? 0;
}

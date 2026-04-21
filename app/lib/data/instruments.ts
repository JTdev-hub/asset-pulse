import prisma from "@/app/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";
export type InstrumentType = "STOCK" | "ETF" | "CRYPTO";
export type Instrument = Awaited<ReturnType<typeof fetchInstruments>>[number];

export async function fetchInstruments(
  query: string,
  filters?: { type?: InstrumentType; country?: string },
) {
  "use cache";
  cacheLife("hours");
  cacheTag("instruments");

  const q = query.trim();
  if (!q) return [];

  return prisma.instrument.findMany({
    where: {
      ...(filters?.type ? { type: filters.type } : {}),
      OR: [
        { symbol: { contains: q.toUpperCase(), mode: "insensitive" } },
        { name: { contains: q, mode: "insensitive" } },
      ],
    },
    orderBy: [{ type: "asc" }, { symbol: "asc" }],
    take: 10,
  });
}

export async function fetchInstrument(symbol: string, exchange: string) {
  return prisma.instrument.findUnique({
    where: { symbol_exchange: { symbol: symbol.toUpperCase(), exchange } },
  });
}

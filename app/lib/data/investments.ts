import prisma from "@/app/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";
import type { investments } from "@/app/generated/prisma/client";

export type Investment = Omit<
  investments,
  "id" | "quantity" | "sharePrice" | "fee"
> & {
  id: string;
  quantity: number;
  sharePrice: number;
  fee: number;
};

export async function fetchMyInvestments(
  userId: string,
): Promise<Investment[]> {
  "use cache";
  cacheLife("seconds");
  cacheTag("investments");

  const investments = await prisma.investments.findMany({
    where: { userId },
    orderBy: { tradeDate: "desc" },
  });

  return investments.map((i) => ({
    ...i,
    id: String(i.id),
    quantity: i.quantity.toNumber(),
    sharePrice: i.sharePrice.toNumber(),
    fee: i.fee.toNumber(),
  }));
}

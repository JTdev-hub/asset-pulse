"use server";

import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { createClient } from "@/app/lib/supabase/server";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns the authenticated user's ID, or redirects to login. */
async function requireUserId(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");
  return user.id;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getMyInvestments() {
  const userId = await requireUserId();

  return prisma.investments.findMany({
    where: { userId },
    orderBy: { tradeDate: "desc" },
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export type CreateInvestmentInput = {
  tickerSymbol: string;
  tradeDate: Date;
  quantity: number;
  sharePrice: number;
  fee: number;
  broker?: string;
};

export async function createInvestment(
  input: CreateInvestmentInput
): Promise<{ error: string } | void> {
  const userId = await requireUserId();

  if (!input.tickerSymbol?.trim()) return { error: "Ticker symbol is required." };
  if (!input.tradeDate) return { error: "Trade date is required." };
  if (input.quantity <= 0) return { error: "Quantity must be greater than 0." };
  if (input.sharePrice <= 0) return { error: "Share price must be greater than 0." };
  if (input.fee < 0) return { error: "Fee cannot be negative." };

  await prisma.investments.create({
    data: {
      userId,
      tickerSymbol: input.tickerSymbol.trim().toUpperCase(),
      tradeDate: input.tradeDate,
      quantity: input.quantity,
      sharePrice: input.sharePrice,
      fee: input.fee,
      broker: input.broker?.trim() || null,
    },
  });
}

export async function deleteInvestment(
  id: bigint
): Promise<{ error: string } | void> {
  const userId = await requireUserId();

  // Verify ownership before deleting (RLS also enforces this at DB level)
  const investment = await prisma.investments.findUnique({ where: { id } });
  if (!investment || investment.userId !== userId) {
    return { error: "Investment not found." };
  }

  await prisma.investments.delete({ where: { id } });
}

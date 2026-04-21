"use server";

import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { createClient } from "@/app/lib/supabase/server";
import { getUserId } from "./auth";
import {
  CreateInvestmentInput,
  CreateInvestmentSchema,
} from "../schemas/investments";
import { revalidatePath } from "next/cache";
import { fetchMyInvestments } from "../data/investments";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getMyInvestments() {
  const userId = await getUserId();

  return await fetchMyInvestments(userId);
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function createInvestment(
  input: CreateInvestmentInput,
): Promise<{ error: string } | void> {
  const userId = await getUserId();

  const result = CreateInvestmentSchema.safeParse(input);
  if (!result.success) return { error: result.error.issues[0].message };

  const data = result.data;

  await prisma.investments.create({
    data: {
      userId,
      tickerSymbol: data.tickerSymbol,
      tradeType: data.tradeType,
      tradeDate: data.tradeDate,
      quantity: data.quantity,
      sharePrice: data.sharePrice,
      fee: data.fee,
      broker: data.broker || null,
    },
  });

  revalidatePath("/portfolio");
  redirect("/portfolio");
}

export async function deleteInvestment(
  id: bigint,
): Promise<{ error: string } | void> {
  const userId = await getUserId();

  // Verify ownership before deleting (RLS also enforces this at DB level)
  const investment = await prisma.investments.findUnique({ where: { id } });
  if (!investment || investment.userId !== userId) {
    return { error: "Investment not found." };
  }

  await prisma.investments.delete({ where: { id } });
}

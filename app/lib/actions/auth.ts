"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { LoginSchema, SignupSchema } from "@/app/lib/schemas/auth";
import prisma from "@/app/lib/prisma";

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<{ error: string } | void> {
  const result = LoginSchema.safeParse({ email, password });
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

export async function signUpWithEmail(
  email: string,
  password: string,
): Promise<{ error: string } | void> {
  const result = SignupSchema.safeParse({ email, password });
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/auth/preferred-currency");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}

export async function getUserId(): Promise<string | undefined> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");
  return user.id;
}

export async function updateProfile(
  preferredCurrency: string,
): Promise<{ error: string } | void> {
  const userId = await getUserId();

  try {
    console.log(userId);
    await prisma.profile.update({
      where: { userId: userId },
      data: { preferredCurrency: preferredCurrency },
    });
  } catch (e) {
    return { error: "Failed to update profile. Please try again" };
  }

  redirect("/dashboard");
}

import prisma from "@/app/lib/prisma";

export async function getPostLoginDestination(userId: string): Promise<string> {
  const profile = await prisma.profile.findUnique({ where: { userId } });
  return profile?.hasCompletedOnBoarding ? "/" : "/auth/preferred-currency";
}

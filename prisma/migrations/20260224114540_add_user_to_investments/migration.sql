/*
  Warnings:

  - Added the required column `userId` to the `investments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "investments" ADD COLUMN     "userId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "investments_userId_idx" ON "investments"("userId");

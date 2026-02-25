/*
  Warnings:

  - Added the required column `tradeType` to the `investments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "investments" ADD COLUMN     "tradeType" VARCHAR NOT NULL;

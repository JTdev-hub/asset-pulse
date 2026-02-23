-- CreateTable
CREATE TABLE "investments" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tickerSymbol" VARCHAR NOT NULL,
    "tradeDate" TIMESTAMP(6) NOT NULL,
    "broker" VARCHAR,
    "quantity" DECIMAL NOT NULL,
    "sharePrice" DECIMAL NOT NULL,
    "fee" DECIMAL NOT NULL,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "userId" UUID NOT NULL,
    "preferredCurrency" TEXT NOT NULL DEFAULT 'PHP',

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("userId")
);

-- NOTE: The FK to auth.users and the trigger are applied directly in the
-- Supabase SQL editor (see prisma/supabase-auth.sql) because Prisma's shadow
-- database does not have the Supabase auth schema.


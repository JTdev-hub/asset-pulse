-- CreateTable
CREATE TABLE "instruments" (
    "id" SERIAL NOT NULL,
    "symbol" VARCHAR(20) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "exchange" VARCHAR(50) NOT NULL,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'USD',
    "country" VARCHAR(10) NOT NULL DEFAULT 'US',

    CONSTRAINT "instruments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "instruments_symbol_exchange_key" ON "instruments"("symbol", "exchange");

-- CreateIndex
CREATE INDEX "instruments_symbol_idx" ON "instruments"("symbol");

-- CreateIndex
CREATE INDEX "instruments_type_idx" ON "instruments"("type");

-- CreateIndex
CREATE INDEX "instruments_country_idx" ON "instruments"("country");

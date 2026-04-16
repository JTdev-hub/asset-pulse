import cc from "currency-codes";
import { z } from "zod";
import { CurrencyCodeSchema } from "../schemas/currencies";

export const CURRENCIES = cc.data
  .map((c) => ({
    code: c.code,
    label: c.currency,
  }))
  .sort((a, b) => a.code.localeCompare(b.code));

export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;

import { z } from "zod";
import { CURRENCIES } from "../constants/currencies";

export const CurrencyCodeSchema = z.enum(
  CURRENCIES.map((c) => c.code) as [string, ...string[]],
);

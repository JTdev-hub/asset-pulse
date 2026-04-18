import { z } from "zod";
import { TRADETYPES } from "../constants/tradeTypes";

export const CreateInvestmentSchema = z.object({
  tickerSymbol: z
    .string()
    .trim()
    .min(1, "Ticker symbol is required.")
    .max(5, "Ticker symbol is too long")
    .transform((s) => s.toUpperCase()),

  tradeType: z.enum(TRADETYPES, { message: "Trade type must be BUY or SELL" }),

  tradeDate: z.coerce
    .date({ message: "Trade date is required." })
    .max(new Date(), "Trade date cannot be in the future"),

  quantity: z.coerce
    .number({ message: "Quantity is required" })
    .positive("Quantity must be greater than 0."),

  sharePrice: z.coerce
    .number({ message: "Share price is required." })
    .positive("Share price must be greater than 0."),

  fee: z.coerce.number().min(0, "Fee cannot be negative.").default(0),

  broker: z
    .string()
    .trim()
    .max(100, "Broker symbol is too long.")
    .optional()
    .transform((s) => (s ? s : undefined)),
});
export type CreateInvestmentInput = z.input<typeof CreateInvestmentSchema>;
export type CreateInvestmentData = z.output<typeof CreateInvestmentSchema>;

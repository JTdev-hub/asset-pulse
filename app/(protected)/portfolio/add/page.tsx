"use client";

import { useState, SubmitEvent } from "react";
import Link from "next/link";
import { getInstrumentPrice } from "@/app/lib/actions/instruments";
import { Instrument } from "@/app/lib/data/instruments";
import Breadcrumb from "@/app/components/Breadcrumb";
import PageHeader from "@/app/components/PageHeader";
import BuySellToggle from "@/app/components/BuySellToggle";
import { createInvestment } from "@/app/lib/actions/investments";
import InstrumentSearch from "@/app/components/InstrumentSearch";
import { usd } from "@/app/lib/utils/format";

// ── Mock instrument data ────────────────────────────────────────────────────
// Replace with searchInstruments() server action when wiring up the backend.

const TODAY = new Date().toISOString().split("T")[0];

// ── Page ────────────────────────────────────────────────────────────────────
export default function AddInvestmentPage() {
  // Instrument search
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument | null>(null);
  // Trade fields
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY");
  const [tradeDate, setTradeDate] = useState(TODAY);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [fee, setFee] = useState("0");
  const [broker, setBroker] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Derived values
  const subtotal = parseFloat(quantity || "0") * parseFloat(price || "0");
  const feeAmt = parseFloat(fee || "0");
  const total = tradeType === "BUY" ? subtotal + feeAmt : subtotal - feeAmt;

  const canSubmit =
    selectedInstrument !== null &&
    parseFloat(quantity || "0") > 0 &&
    parseFloat(price || "0") > 0 &&
    !!tradeDate;

  function handleInstrumentSelect(instrument: Instrument) {
    setSelectedInstrument(instrument);
    getInstrumentPrice(instrument.symbol).then((p) => setPrice(String(p)));
  }

  function handleInstrumentClear() {
    setSelectedInstrument(null);
    setPrice("");
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!selectedInstrument) return;

    setError(null);
    setSubmitting(true);

    const result = await createInvestment({
      tickerSymbol: selectedInstrument.symbol,
      tradeType,
      tradeDate,
      quantity,
      sharePrice: price,
      fee,
      broker,
    });

    // The action redirects on success
    setSubmitting(false);
    if (result?.error) setError(result.error);
  }

  return (
    <div className="ph-page min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Portfolio", href: "/portfolio" },
            { label: "Add Investment" },
          ]}
        />

        <PageHeader
          title="Add Investment"
          subtitle="Record a buy or sell trade for any instrument in your portfolio."
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ── Card 1: Instrument ── */}
          <div className="ph-card overflow-visible">
            <div className="ph-card-header">
              <h2 className="ph-card-title">Instrument</h2>
            </div>

            <div className="p-4">
              <InstrumentSearch
                selectedInstrument={selectedInstrument}
                onSelect={handleInstrumentSelect}
                onClear={handleInstrumentClear}
              />
            </div>
          </div>

          {/* ── Card 2: Trade Details ── */}
          <div className="ph-card">
            <div className="ph-card-header">
              <h2 className="ph-card-title">Trade Details</h2>
            </div>

            <div className="p-4 space-y-4">
              {/* Buy / Sell toggle */}
              <div>
                <label className="ph-label">Trade Type</label>
                <div className="mt-1.5">
                  <BuySellToggle value={tradeType} onChange={setTradeType} />
                </div>
              </div>

              {/* Trade date */}
              <div>
                <label className="ph-label">Trade Date</label>
                <input
                  type="date"
                  value={tradeDate}
                  max={TODAY}
                  onChange={(e) => setTradeDate(e.target.value)}
                  className="ph-input mt-1.5"
                  style={{ maxWidth: 180 }}
                  required
                />
              </div>

              {/* Quantity + Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="ph-label">Quantity</label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    step="any"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="ph-input mt-1.5"
                    required
                  />
                </div>
                <div>
                  <label className="ph-label">Price per Share</label>
                  <div className="relative mt-1.5">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-alt select-none"
                      style={{ color: "var(--ph-text-muted)" }}
                    >
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="any"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="ph-input"
                      style={{ paddingLeft: "1.5rem" }}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Fee + Broker */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="ph-label">
                    Fee{" "}
                    <span
                      className="font-normal"
                      style={{ color: "var(--ph-text-subtle)" }}
                    >
                      (optional)
                    </span>
                  </label>
                  <div className="relative mt-1.5">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-alt select-none"
                      style={{ color: "var(--ph-text-muted)" }}
                    >
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="any"
                      value={fee}
                      onChange={(e) => setFee(e.target.value)}
                      className="ph-input"
                      style={{ paddingLeft: "1.5rem" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="ph-label">
                    Broker{" "}
                    <span
                      className="font-normal"
                      style={{ color: "var(--ph-text-subtle)" }}
                    >
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fidelity, Robinhood…"
                    value={broker}
                    onChange={(e) => setBroker(e.target.value)}
                    className="ph-input mt-1.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Card 3: Order Summary ── */}
          <div className="ph-card">
            <div className="ph-card-header">
              <h2 className="ph-card-title">Order Summary</h2>
            </div>

            <div className="p-4 space-y-2.5">
              <div className="flex justify-between items-center">
                <span
                  className="text-xs font-alt"
                  style={{ color: "var(--ph-text-muted)" }}
                >
                  Subtotal{" "}
                  <span style={{ color: "var(--ph-text-subtle)" }}>
                    ({quantity || "0"} × ${price || "0.00"})
                  </span>
                </span>
                <span
                  className="text-xs font-semibold font-alt tabular-nums"
                  style={{ color: "var(--ph-text)" }}
                >
                  ${usd(subtotal)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className="text-xs font-alt"
                  style={{ color: "var(--ph-text-muted)" }}
                >
                  Fee / Commission
                </span>
                <span
                  className="text-xs font-semibold font-alt tabular-nums"
                  style={{ color: "var(--ph-text)" }}
                >
                  ${usd(feeAmt)}
                </span>
              </div>

              <div
                className="flex justify-between items-center pt-3 mt-1"
                style={{ borderTop: "1px solid var(--ph-border)" }}
              >
                <span
                  className="text-sm font-semibold font-alt"
                  style={{ color: "var(--ph-text)" }}
                >
                  Total {tradeType === "BUY" ? "Cost" : "Proceeds"}
                </span>
                <span
                  className="text-base font-bold font-alt tabular-nums"
                  style={{
                    color:
                      tradeType === "BUY"
                        ? "var(--ph-error)"
                        : "var(--ph-success)",
                  }}
                >
                  {tradeType === "BUY" ? "−" : "+"}${usd(total)}
                </span>
              </div>
            </div>
          </div>

          {/* ── Actions ── */}
          {error && <div className="ph-error mb-2">{error}</div>}
          <div className="flex items-center justify-end gap-3 pt-1 pb-4">
            <Link href="/portfolio" className="ph-btn-ghost">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="ph-btn-primary"
            >
              {submitting ? "Adding..." : "Add Investment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

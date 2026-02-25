"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  getInstrumentPrice,
  Instrument,
  InstrumentType,
  searchInstruments,
} from "@/app/lib/actions/instruments";
import Breadcrumb from "@/app/components/Breadcrumb";
import PageHeader from "@/app/components/PageHeader";
import BuySellToggle from "@/app/components/BuySellToggle";

// ── Mock instrument data ────────────────────────────────────────────────────
// Replace with searchInstruments() server action when wiring up the backend.

// ── Badge helper ────────────────────────────────────────────────────────────
function TypeBadge({ type }: { type: string }) {
  if (type === "STOCK") return <span className="ph-badge-stock">{type}</span>;
  if (type === "CRYPTO") return <span className="ph-badge-crypto">{type}</span>;
  return (
    <span
      className="text-xs font-semibold font-alt px-2 py-0.5 rounded"
      style={{ background: "#eff6ff", color: "#1d4ed8" }}
    >
      {type}
    </span>
  );
}

// ── Format helpers ──────────────────────────────────────────────────────────
const usd = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// ── Page ────────────────────────────────────────────────────────────────────
export default function AddInvestmentPage() {
  // Instrument search
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Instrument[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selected, setSelected] = useState<Instrument | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Trade fields
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY");
  const [tradeDate, setTradeDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [fee, setFee] = useState("0");
  const [broker, setBroker] = useState("");

  // Derived values
  const subtotal = parseFloat(quantity || "0") * parseFloat(price || "0");
  const feeAmt = parseFloat(fee || "0");
  const total = subtotal + feeAmt;

  const canSubmit =
    selected !== null &&
    parseFloat(quantity || "0") > 0 &&
    parseFloat(price || "0") > 0 &&
    !!tradeDate;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query.trim()) {
        searchInstruments(query.trim()).then(setResults);
      } else {
        setResults([]);
        return;
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  function selectInstrument(instrument: Instrument) {
    setSelected(instrument);
    setQuery("");
    setDropdownOpen(false);
    setHoveredIdx(null);
    getInstrumentPrice(instrument.symbol).then((p) => setPrice(String(p)));
  }

  function clearSelection() {
    setSelected(null);
    setQuery("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: call createInvestment() server action from app/lib/actions/investments.ts
    alert("Backend not connected yet — form is valid and ready to wire up.");
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
              {selected ? (
                /* Selected state */
                <div
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
                  style={{
                    background: "var(--ph-accent-light)",
                    border: "1px solid var(--ph-accent)",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-bold font-alt"
                        style={{ color: "var(--ph-accent)" }}
                      >
                        {selected.symbol}
                      </span>
                      <TypeBadge type={selected.type} />
                      <span
                        className="text-xs font-alt"
                        style={{ color: "var(--ph-text-subtle)" }}
                      >
                        {selected.exchange}
                      </span>
                    </div>
                    <p
                      className="text-xs font-alt mt-0.5 truncate"
                      style={{ color: "var(--ph-text-muted)" }}
                    >
                      {selected.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="shrink-0 text-xs font-alt px-2 py-1 rounded transition-colors"
                    style={{ color: "var(--ph-text-muted)" }}
                    title="Change instrument"
                  >
                    Change
                  </button>
                </div>
              ) : (
                /* Search state */
                <div className="relative" ref={searchRef}>
                  <label className="ph-label">
                    Search by ticker or company name
                  </label>
                  <div className="relative mt-1.5">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                      style={{ color: "var(--ph-text-subtle)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="e.g. AAPL, Apple, SPY, Bitcoin…"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setDropdownOpen(true);
                      }}
                      onFocus={() => setDropdownOpen(true)}
                      className="ph-input"
                      style={{ paddingLeft: "2rem" }}
                    />
                  </div>

                  {/* Dropdown results */}
                  {dropdownOpen && query.trim() && (
                    <div
                      className="absolute z-50 w-full mt-1 rounded-lg overflow-hidden"
                      style={{
                        background: "var(--ph-surface)",
                        border: "1px solid var(--ph-border)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                      }}
                    >
                      {results.length > 0 ? (
                        results.slice(0, 8).map((instrument, idx) => (
                          <div
                            key={`${instrument.symbol}-${instrument.exchange}`}
                            onClick={() => selectInstrument(instrument)}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            className="flex items-center gap-3 px-4 py-2.5 cursor-pointer"
                            style={{
                              background:
                                hoveredIdx === idx
                                  ? "var(--ph-accent-light)"
                                  : "transparent",
                              borderBottom:
                                idx < results.length - 1
                                  ? "1px solid var(--ph-border)"
                                  : "none",
                            }}
                          >
                            <span
                              className="w-12 shrink-0 text-xs font-bold font-alt"
                              style={{ color: "var(--ph-text)" }}
                            >
                              {instrument.symbol}
                            </span>
                            <span
                              className="flex-1 text-xs font-alt truncate"
                              style={{ color: "var(--ph-text-muted)" }}
                            >
                              {instrument.name}
                            </span>
                            <TypeBadge type={instrument.type} />
                            <span
                              className="shrink-0 text-xs font-alt"
                              style={{ color: "var(--ph-text-subtle)" }}
                            >
                              {instrument.exchange}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-5 text-center">
                          <p
                            className="text-xs font-alt"
                            style={{ color: "var(--ph-text-muted)" }}
                          >
                            No instruments found for &ldquo;{query}&rdquo;
                          </p>
                          <p
                            className="text-xs font-alt mt-1"
                            style={{ color: "var(--ph-text-subtle)" }}
                          >
                            Only a small set of instruments is shown in this
                            demo.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
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
                  max={new Date().toISOString().split("T")[0]}
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
          <div className="flex items-center justify-end gap-3 pt-1 pb-4">
            <Link href="/portfolio" className="ph-btn-ghost">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={!canSubmit}
              className="ph-btn-primary"
            >
              Add Investment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

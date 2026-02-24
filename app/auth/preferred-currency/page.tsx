"use client";

import { useState } from "react";
import { CURRENCIES } from "@/app/lib/constants/currencies";
import LogoMark from "@/app/components/icons/LogoMark";

export default function PreferredCurrencyPage() {
  const [selected, setSelected] = useState("PHP");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  async function handleContinue() {
    setLoading(true);
    // TODO: call savePreferredCurrency(selected) server action from app/lib/actions/profile.ts
    // then redirect to "/"
    setLoading(false);
  }

  const filtered = CURRENCIES.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.label.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedCurrency = CURRENCIES.find((c) => c.code === selected);

  return (
    <div className="ph-page flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <LogoMark size={48} className="mb-3" />
          <h1
            className="text-xl font-heading font-bold"
            style={{ color: "var(--ph-text)" }}
          >
            Choose your currency
          </h1>
          <p
            className="text-sm font-alt mt-1"
            style={{ color: "var(--ph-text-muted)" }}
          >
            This will be your default display currency
          </p>
        </div>

        {/* Card */}
        <div className="ph-card overflow-hidden">
          <div className="p-4 pb-0">
            {/* Search filter */}
            <input
              type="text"
              placeholder="Search currencies…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ph-input mb-3"
            />
          </div>

          {/* Currency list */}
          <div className="overflow-y-auto" style={{ maxHeight: 240 }}>
            {filtered.map((currency) => {
              const isSelected = selected === currency.code;
              return (
                <div
                  key={currency.code}
                  onClick={() => setSelected(currency.code)}
                  className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-100"
                  style={{
                    background: isSelected
                      ? "var(--ph-accent-light)"
                      : "transparent",
                    borderLeft: isSelected
                      ? "3px solid var(--ph-accent)"
                      : "3px solid transparent",
                  }}
                >
                  <span
                    className="text-xs font-semibold font-alt w-10 shrink-0"
                    style={{
                      color: isSelected ? "var(--ph-accent)" : "var(--ph-text)",
                    }}
                  >
                    {currency.code}
                  </span>
                  <span
                    className="text-xs font-alt truncate"
                    style={{
                      color: isSelected
                        ? "var(--ph-text)"
                        : "var(--ph-text-muted)",
                    }}
                  >
                    {currency.label}
                  </span>
                  {isSelected && (
                    <span
                      className="ml-auto text-xs"
                      style={{ color: "var(--ph-accent)" }}
                    >
                      ✓
                    </span>
                  )}
                </div>
              );
            })}

            {filtered.length === 0 && (
              <p
                className="px-4 py-6 text-center text-xs font-alt"
                style={{ color: "var(--ph-text-subtle)" }}
              >
                No currencies found
              </p>
            )}
          </div>

          {/* Selected display + action */}
          <div
            className="px-4 py-3 flex items-center justify-between gap-3"
            style={{
              borderTop: "1px solid var(--ph-border)",
              background: "var(--ph-bg)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-alt"
                style={{ color: "var(--ph-text-muted)" }}
              >
                Selected:
              </span>
              <span
                className="text-xs font-semibold font-alt px-2 py-0.5 rounded"
                style={{
                  background: "var(--ph-accent-light)",
                  color: "var(--ph-accent)",
                }}
              >
                {selected} — {selectedCurrency?.label}
              </span>
            </div>
            <button
              onClick={handleContinue}
              disabled={loading}
              className="ph-btn-primary"
              style={{ paddingTop: "6px", paddingBottom: "6px" }}
            >
              {loading ? "Saving…" : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

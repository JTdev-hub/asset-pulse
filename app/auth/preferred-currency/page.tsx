"use client";

import { useState } from "react";
import { CURRENCIES } from "@/app/lib/constants/currencies";
import AuthLayout from "@/app/components/AuthLayout";
import { updateProfile } from "@/app/lib/actions/auth";
import { redirect } from "next/dist/server/api-utils";

export default function PreferredCurrencyPage() {
  const [selected, setSelected] = useState("PHP");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  async function handleContinue() {
    setLoading(true);
    const result = await updateProfile(selected);
    setLoading(false);

    if (result?.error) {
      setError(error);
      console.log(error);
    }
  }

  const filtered = CURRENCIES.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.label.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedCurrency = CURRENCIES.find((c) => c.code === selected);

  return (
    <AuthLayout
      title="Choose your currency"
      subtitle="This will be your default display currency"
    >
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
    </AuthLayout>
  );
}

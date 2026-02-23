"use client";

import { useState } from "react";
import { CURRENCIES } from "@/app/lib/constants/currencies";
import Win2000Window from "@/app/components/Win2000Window";
import Win2000Taskbar from "@/app/components/Win2000Taskbar";

export default function PreferredCurrencyPage() {
  const [selected, setSelected] = useState("PHP");
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    setLoading(true);
    // TODO: call savePreferredCurrency(selected) server action from app/lib/actions/profile.ts
    // then redirect to "/"
    setLoading(false);
  }

  return (
    <div className="auth-bg">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-100">
          <Win2000Window title="Setup — Preferred Currency">
            {/* App Header */}
            <div
              className="flex items-center gap-3 pb-4 mb-4"
              style={{ borderBottom: "1px solid #808080" }}
            >
              <div
                className="w-14 h-14 flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, #1642AD 0%, #0A246A 100%)",
                  border: "2px solid",
                  borderColor: "#FFFFFF #404040 #404040 #FFFFFF",
                }}
              >
                <span className="text-yellow-300 font-bold text-xl font-alt">
                  AP
                </span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm font-alt">
                  Asset Pulse
                </div>
                <div className="text-xs text-gray-600 font-alt">
                  Investment Tracker
                </div>
                <div className="text-xs text-gray-500 font-alt mt-0.5">
                  Choose your preferred display currency.
                </div>
              </div>
            </div>

            {/* Currency list */}
            <div className="mb-4">
              <p className="text-xs font-alt font-semibold text-gray-700 mb-2">
                Select currency:
              </p>
              <div
                className="win-sunken bg-white overflow-y-auto"
                style={{ maxHeight: 180 }}
              >
                {CURRENCIES.map((currency) => (
                  <div
                    key={currency.code}
                    onClick={() => setSelected(currency.code)}
                    className="flex items-center gap-2 px-2 py-1 cursor-pointer"
                    style={{
                      background:
                        selected === currency.code ? "#0054E3" : "transparent",
                    }}
                  >
                    <span
                      className="text-xs font-alt font-semibold w-8 shrink-0"
                      style={{
                        color:
                          selected === currency.code ? "#FFFFFF" : "#1a1a1a",
                      }}
                    >
                      {currency.code}
                    </span>
                    <span
                      className="text-xs font-alt"
                      style={{
                        color:
                          selected === currency.code ? "#FFFFFF" : "#555555",
                      }}
                    >
                      {currency.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected display */}
            <div className="flex items-center gap-2 mb-4">
              <label className="win-form-label">Selected:</label>
              <div className="win-sunken flex-1 px-2 py-1 bg-white text-xs font-alt text-gray-800">
                {selected} —{" "}
                {CURRENCIES.find((c) => c.code === selected)?.label}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={handleContinue}
                disabled={loading}
                className="button px-5 py-1 text-xs disabled:opacity-50"
              >
                {loading ? "Saving..." : "Continue »"}
              </button>
            </div>
          </Win2000Window>
        </div>
      </main>

      <Win2000Taskbar title="Asset Pulse — Setup" />
    </div>
  );
}
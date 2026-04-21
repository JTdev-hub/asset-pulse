"use client";

import { useEffect, useRef, useState } from "react";
import { searchInstruments } from "../lib/actions/instruments";
import TypeBadge from "./TypeBadge";
import SearchIcon from "./icons/SearchIcon";
import { Instrument } from "../lib/data/instruments";

interface InstrumentSearchProps {
  selectedInstrument: Instrument | null;
  onSelect: (i: Instrument) => void;
  onClear: () => void;
}
export default function InstrumentSearch({
  selectedInstrument,
  onSelect,
  onClear,
}: InstrumentSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Instrument[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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

  function handleSelect(instrument: Instrument) {
    onSelect(instrument);
    setQuery("");
    setDropdownOpen(false);
  }

  if (selectedInstrument) {
    return (
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
              {selectedInstrument.symbol}
            </span>
            <TypeBadge type={selectedInstrument.type} />
            <span
              className="text-xs font-alt"
              style={{ color: "var(--ph-text-subtle)" }}
            >
              {selectedInstrument.exchange}
            </span>
          </div>
          <p
            className="text-xs font-alt mt-0.5 truncate"
            style={{ color: "var(--ph-text-muted)" }}
          >
            {selectedInstrument.name}
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 text-xs font-alt px-2 py-1 rounded transition-colors"
          style={{ color: "var(--ph-text-muted)" }}
          title="Change instrument"
        >
          Change
        </button>
      </div>
    );
  }

  return (
    /* Search state */
    <div className="relative" ref={searchRef}>
      <label className="ph-label">Search by ticker or company name</label>
      <div className="relative mt-1.5">
        <SearchIcon />
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
            results.map((instrument, idx) => (
              <div
                key={`${instrument.symbol}-${instrument.exchange}`}
                onClick={() => handleSelect(instrument)}
                className="ph-dropdown-row flex items-center gap-3 px-4 py-2.5 cursor-pointer"
                style={{
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
              ></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

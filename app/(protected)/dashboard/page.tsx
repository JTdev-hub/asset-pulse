"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_HOLDINGS = [
  { symbol: "AAPL", name: "Apple Inc.",      type: "Stock",  qty: 10,  buyPrice: 150.00,   currentPrice: 178.50  },
  { symbol: "BTC",  name: "Bitcoin",         type: "Crypto", qty: 0.5, buyPrice: 42000.00, currentPrice: 65200.00 },
  { symbol: "MSFT", name: "Microsoft Corp.", type: "Stock",  qty: 5,   buyPrice: 320.00,   currentPrice: 415.30  },
  { symbol: "ETH",  name: "Ethereum",        type: "Crypto", qty: 2,   buyPrice: 2200.00,  currentPrice: 3450.00 },
  { symbol: "GOOGL", name: "Alphabet Inc.",  type: "Stock",  qty: 8,   buyPrice: 130.00,   currentPrice: 172.80  },
];

const CHART_COLORS = ["#722880", "#1B5FA8", "#eb5c18", "#deb600", "#d72d51"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
const pct = (n: number) => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const holdings = MOCK_HOLDINGS.map((h) => {
    const invested     = h.qty * h.buyPrice;
    const currentValue = h.qty * h.currentPrice;
    const pnl          = currentValue - invested;
    const pnlPct       = (pnl / invested) * 100;
    return { ...h, invested, currentValue, pnl, pnlPct };
  });

  const totalInvested = holdings.reduce((s, h) => s + h.invested, 0);
  const totalValue    = holdings.reduce((s, h) => s + h.currentValue, 0);
  const totalPnl      = totalValue - totalInvested;
  const totalPnlPct   = (totalPnl / totalInvested) * 100;

  const pieData = holdings.map((h, i) => ({
    name:  h.symbol,
    value: h.currentValue,
    fill:  CHART_COLORS[i % CHART_COLORS.length],
  }));

  return (
    <div className="ph-page min-h-screen">
      <div className="container mx-auto px-6 py-8 max-w-7xl">

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div className="mb-7">
          <h1
            className="text-2xl font-heading font-bold mb-1"
            style={{ color: "var(--ph-text)" }}
          >
            Dashboard
          </h1>
          <p className="text-sm font-alt" style={{ color: "var(--ph-text-muted)" }}>
            Portfolio overview · February 24, 2026 · Currency: PHP
          </p>
        </div>

        {/* ── Stat cards ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Initial Investment"
            value={usd(totalInvested)}
            accentColor="#1B5FA8"
          />
          <StatCard
            label="Portfolio Value"
            value={usd(totalValue)}
            accentColor="#1B5FA8"
          />
          <StatCard
            label="Total P&L"
            value={`${totalPnl >= 0 ? "+" : ""}${usd(totalPnl)}`}
            sub={pct(totalPnlPct)}
            positive={totalPnl >= 0}
            accentColor={totalPnl >= 0 ? "var(--ph-success)" : "var(--ph-error)"}
          />
        </div>

        {/* ── Main grid ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4">

          {/* Holdings table — 2 / 3 */}
          <div className="col-span-2 ph-card overflow-hidden">
            {/* Card header */}
            <div className="ph-card-header">
              <span className="ph-card-title">Holdings</span>
              <span
                className="text-xs font-alt px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--ph-bg)",
                  color: "var(--ph-text-muted)",
                  border: "1px solid var(--ph-border)",
                }}
              >
                {holdings.length} assets
              </span>
            </div>

            {/* Table */}
            <div className="overflow-auto">
              <table className="w-full text-xs font-alt border-collapse">
                <thead>
                  <tr style={{ background: "var(--ph-bg)", borderBottom: "1px solid var(--ph-border-strong)" }}>
                    <th style={{ width: 3, padding: 0 }} />
                    {["Symbol", "Name", "Type", "Qty", "Buy Price", "Current", "Invested", "Value", "P&L"].map(
                      (col) => (
                        <th
                          key={col}
                          className="px-4 py-2.5 font-semibold whitespace-nowrap"
                          style={{
                            textAlign: ["Symbol", "Name", "Type"].includes(col) ? "left" : "right",
                            color: "var(--ph-text-muted)",
                            fontSize: 11,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                          }}
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {holdings.map((h, i) => (
                    <tr
                      key={h.symbol}
                      style={{ borderBottom: "1px solid var(--ph-border)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ph-bg)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {/* Thin color strip */}
                      <td style={{ width: 3, padding: 0, background: CHART_COLORS[i] }} />

                      <td className="px-4 py-3 font-bold whitespace-nowrap" style={{ color: "var(--ph-text)" }}>
                        {h.symbol}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: "var(--ph-text-muted)" }}>
                        {h.name}
                      </td>
                      <td className="px-4 py-3">
                        {h.type === "Crypto"
                          ? <span className="ph-badge-crypto">{h.type}</span>
                          : <span className="ph-badge-stock">{h.type}</span>
                        }
                      </td>
                      <td className="px-4 py-3 text-right" style={{ color: "var(--ph-text)" }}>
                        {h.qty}
                      </td>
                      <td className="px-4 py-3 text-right" style={{ color: "var(--ph-text-muted)" }}>
                        {usd(h.buyPrice)}
                      </td>
                      <td className="px-4 py-3 text-right font-medium" style={{ color: "var(--ph-text)" }}>
                        {usd(h.currentPrice)}
                      </td>
                      <td className="px-4 py-3 text-right" style={{ color: "var(--ph-text-muted)" }}>
                        {usd(h.invested)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold" style={{ color: "var(--ph-text)" }}>
                        {usd(h.currentValue)}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <span
                          className="font-semibold"
                          style={{ color: h.pnl >= 0 ? "var(--ph-success-text)" : "var(--ph-error-text)" }}
                        >
                          {h.pnl >= 0 ? "+" : ""}{usd(h.pnl)}
                        </span>
                        <span className="ml-1.5 text-xs" style={{ color: "var(--ph-text-subtle)" }}>
                          ({pct(h.pnlPct)})
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

                {/* Totals footer */}
                <tfoot>
                  <tr style={{ borderTop: "2px solid var(--ph-border-strong)", background: "var(--ph-bg)" }}>
                    <td style={{ width: 3, padding: 0 }} />
                    <td
                      colSpan={6}
                      className="px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                      style={{ color: "var(--ph-text-muted)" }}
                    >
                      Total
                    </td>
                    <td className="px-4 py-3 text-right font-semibold" style={{ color: "var(--ph-text-muted)" }}>
                      {usd(totalInvested)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold" style={{ color: "var(--ph-text)" }}>
                      {usd(totalValue)}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <span
                        className="font-bold"
                        style={{ color: totalPnl >= 0 ? "var(--ph-success-text)" : "var(--ph-error-text)" }}
                      >
                        {totalPnl >= 0 ? "+" : ""}{usd(totalPnl)}
                      </span>
                      <span className="ml-1.5 text-xs" style={{ color: "var(--ph-text-subtle)" }}>
                        ({pct(totalPnlPct)})
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Portfolio breakdown — 1 / 3 */}
          <div className="ph-card overflow-hidden">
            <div className="ph-card-header">
              <span className="ph-card-title">Breakdown</span>
            </div>

            <div className="p-4 flex flex-col gap-4">
              {/* Donut chart with center label */}
              <div className="relative">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={88}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="var(--ph-surface)"
                      strokeWidth={2}
                    />
                    <Tooltip
                      formatter={(val) => [usd(Number(val)), "Value"]}
                      contentStyle={{
                        fontSize: 11,
                        fontFamily: "Montserrat, sans-serif",
                        background: "var(--ph-surface)",
                        border: "1px solid var(--ph-border)",
                        borderRadius: 6,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p
                    className="font-alt uppercase"
                    style={{ fontSize: 10, color: "var(--ph-text-subtle)", letterSpacing: "0.06em" }}
                  >
                    Total
                  </p>
                  <p className="font-heading font-bold" style={{ fontSize: 14, color: "var(--ph-text)" }}>
                    {usd(totalValue)}
                  </p>
                </div>
              </div>

              {/* Legend with progress bars */}
              <div
                className="rounded-md overflow-hidden"
                style={{ border: "1px solid var(--ph-border)" }}
              >
                {holdings.map((h, i) => {
                  const share = (h.currentValue / totalValue) * 100;
                  return (
                    <div
                      key={h.symbol}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-alt"
                      style={{
                        borderBottom: i < holdings.length - 1 ? "1px solid var(--ph-border)" : "none",
                      }}
                    >
                      <div
                        className="shrink-0 rounded-sm"
                        style={{ width: 8, height: 8, background: CHART_COLORS[i] }}
                      />
                      <span className="font-semibold w-12 shrink-0" style={{ color: "var(--ph-text)" }}>
                        {h.symbol}
                      </span>
                      <div
                        className="flex-1 rounded-full overflow-hidden"
                        style={{ height: 4, background: "var(--ph-bg)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${share}%`, background: CHART_COLORS[i] }}
                        />
                      </div>
                      <span className="w-10 text-right shrink-0" style={{ color: "var(--ph-text-muted)" }}>
                        {share.toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  positive,
  accentColor,
}: {
  label: string;
  value: string;
  sub?: string;
  positive?: boolean;
  accentColor: string;
}) {
  return (
    <div
      className="ph-card overflow-hidden"
      style={{ borderLeft: `3px solid ${accentColor}` }}
    >
      <div className="px-5 py-4">
        <p
          className="text-xs font-alt font-semibold uppercase tracking-wider mb-2"
          style={{ color: "var(--ph-text-muted)" }}
        >
          {label}
        </p>
        <p
          className="text-2xl font-heading font-bold"
          style={{ color: "var(--ph-text)" }}
        >
          {value}
        </p>
        {sub && (
          <p
            className="text-xs font-alt font-semibold mt-1"
            style={{ color: positive ? "var(--ph-success-text)" : "var(--ph-error-text)" }}
          >
            {sub} vs. cost basis
          </p>
        )}
      </div>
    </div>
  );
}

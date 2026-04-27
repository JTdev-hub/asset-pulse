import { Suspense } from "react";
import Link from "next/link";
import PageHeader from "@/app/components/PageHeader";
import EmptyState from "@/app/components/EmptyState";
import { getMyInvestments } from "@/app/lib/actions/investments";
import { usd, formatDate } from "@/app/lib/utils/format";
import { getLatestExchangeRates } from "@/app/lib/actions/exchangeRate";

async function InvestmentsTable() {
  const investments = await getMyInvestments();
  const latestExchangeRate = await getLatestExchangeRates("PHP");

  if (investments.length === 0) {
    return (
      <EmptyState
        icon={
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        }
        title="No investments yet"
        description="Add your first trade to start tracking your portfolio"
        action={
          <Link href="/portfolio/add" className="ph-btn-primary">
            + Add Investment
          </Link>
        }
      />
    );
  }

  return (
    <div className="ph-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-alt">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--ph-border)" }}>
              {[
                "Ticker",
                "Type",
                "Date",
                "Qty",
                "Price",
                "Fee",
                "Broker",
                "Total",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--ph-text-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {investments.map((inv) => {
              const total = inv.quantity * inv.sharePrice;
              const isBuy = inv.tradeType === "BUY";
              return (
                <tr
                  key={inv.id}
                  className="transition-colors hover:bg-(--ph-bg)"
                  style={{ borderBottom: "1px solid var(--ph-border)" }}
                >
                  <td
                    className="px-4 py-3 font-bold"
                    style={{ color: "var(--ph-text)" }}
                  >
                    {inv.tickerSymbol}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded"
                      style={{
                        background: isBuy
                          ? "var(--ph-success-bg)"
                          : "var(--ph-error-bg)",
                        color: isBuy
                          ? "var(--ph-success-text)"
                          : "var(--ph-error-text)",
                      }}
                    >
                      {inv.tradeType}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ color: "var(--ph-text-muted)" }}
                  >
                    {formatDate(inv.tradeDate)}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--ph-text)" }}>
                    {inv.quantity}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--ph-text)" }}>
                    {usd(inv.sharePrice)}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ color: "var(--ph-text-muted)" }}
                  >
                    {usd(inv.fee)}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ color: "var(--ph-text-subtle)" }}
                  >
                    {inv.broker ?? "—"}
                  </td>
                  <td
                    className="px-4 py-3 font-semibold"
                    style={{ color: "var(--ph-text)" }}
                  >
                    {usd(total * latestExchangeRate)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        className="flex flex-row justify-between items-center px-4 py-3"
        style={{ borderTop: "1px solid var(--ph-border)" }}
      >
        <span
          className="text-xs font-alt"
          style={{ color: "var(--ph-text-subtle)" }}
        >
          {investments.length} trade{investments.length !== 1 ? "s" : ""}
        </span>
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-alt uppercase tracking-wider"
            style={{ color: "var(--ph-text-muted)" }}
          >
            Total invested
          </span>
          <span
            className="text-sm font-semibold font-alt"
            style={{ color: "var(--ph-text)" }}
          >
            {usd(
              investments.reduce(
                (sum, inv) =>
                  inv.tradeType === "BUY"
                    ? sum + inv.quantity * inv.sharePrice
                    : sum,
                0,
              ) * latestExchangeRate,
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="ph-page min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Portfolio"
          subtitle="Track all your investments in one place"
          action={
            <Link href="/portfolio/add" className="ph-btn-primary">
              + Add Investment
            </Link>
          }
        />
        <Suspense fallback={null}>
          <InvestmentsTable />
        </Suspense>
      </div>
    </div>
  );
}

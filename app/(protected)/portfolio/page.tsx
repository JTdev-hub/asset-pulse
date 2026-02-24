import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div className="ph-page min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-2xl font-heading font-bold"
              style={{ color: "var(--ph-text)" }}
            >
              Portfolio
            </h1>
            <p
              className="text-sm font-alt mt-1"
              style={{ color: "var(--ph-text-muted)" }}
            >
              Track all your investments in one place
            </p>
          </div>
          <Link href="/portfolio/add" className="ph-btn-primary">
            + Add Investment
          </Link>
        </div>

        {/* Empty state */}
        <div
          className="ph-card flex flex-col items-center justify-center py-20"
          style={{ color: "var(--ph-text-muted)" }}
        >
          <svg
            className="w-12 h-12 mb-4"
            style={{ color: "var(--ph-border-strong)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p className="text-sm font-semibold font-alt mb-1" style={{ color: "var(--ph-text)" }}>
            No investments yet
          </p>
          <p className="text-xs font-alt mb-6" style={{ color: "var(--ph-text-muted)" }}>
            Add your first trade to start tracking your portfolio
          </p>
          <Link href="/portfolio/add" className="ph-btn-primary">
            + Add Investment
          </Link>
        </div>
      </div>
    </div>
  );
}

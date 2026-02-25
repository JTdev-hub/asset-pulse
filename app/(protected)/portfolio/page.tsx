import Link from "next/link";
import PageHeader from "@/app/components/PageHeader";
import EmptyState from "@/app/components/EmptyState";

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

        <EmptyState
          icon={
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
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
      </div>
    </div>
  );
}

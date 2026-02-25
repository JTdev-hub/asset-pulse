interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  positive?: boolean;
  accentColor: string;
}

export default function StatCard({
  label,
  value,
  sub,
  positive,
  accentColor,
}: StatCardProps) {
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

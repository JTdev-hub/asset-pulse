interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="ph-card flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 mb-4" style={{ color: "var(--ph-border-strong)" }}>
        {icon}
      </div>
      <p
        className="text-sm font-semibold font-alt mb-1"
        style={{ color: "var(--ph-text)" }}
      >
        {title}
      </p>
      <p className="text-xs font-alt mb-6" style={{ color: "var(--ph-text-muted)" }}>
        {description}
      </p>
      {action}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-7">
      <div>
        <h1
          className="text-2xl font-heading font-bold"
          style={{ color: "var(--ph-text)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm font-alt mt-1" style={{ color: "var(--ph-text-muted)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div
      className="flex items-center gap-1.5 text-xs font-alt mb-6"
      style={{ color: "var(--ph-text-muted)" }}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:underline"
              style={{ color: "var(--ph-text-muted)" }}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "var(--ph-text)" }}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

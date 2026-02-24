import { ReactNode } from "react";

type Win2000WindowProps = {
  title: string;
  children: ReactNode;
  /** @deprecated statusBarRight is no longer rendered in the PostHog design */
  statusBarRight?: ReactNode;
  className?: string;
};

export default function Win2000Window({
  title,
  children,
  className = "",
}: Win2000WindowProps) {
  return (
    <div className={`ph-card overflow-hidden ${className}`}>
      {/* Card header */}
      <div className="ph-card-header">
        <span className="ph-card-title">{title}</span>
      </div>

      {/* Card body */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

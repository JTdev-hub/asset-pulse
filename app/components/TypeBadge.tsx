interface TypeBadgeProps {
  type: string;
}
export default function TypeBadge({ type }: TypeBadgeProps) {
  if (type === "STOCK") return <span className="ph-badge-stock">{type}</span>;
  if (type === "CRYPTO") return <span className="ph-badge-crypto">{type}</span>;
  return (
    <span
      className="text-xs font-semibold font-alt px-2 py-0.5 rounded"
      style={{ background: "#eff6ff", color: "#1d4ed8" }}
    >
      {type}
    </span>
  );
}

interface PnLDisplayProps {
  value: number;
  formattedValue: string;
  percentage?: number;
  bold?: boolean;
}

export default function PnLDisplay({
  value,
  formattedValue,
  percentage,
  bold = false,
}: PnLDisplayProps) {
  const isPositive = value >= 0;
  const color = isPositive ? "var(--ph-success-text)" : "var(--ph-error-text)";

  return (
    <span className="whitespace-nowrap">
      <span
        className={bold ? "font-bold" : "font-semibold"}
        style={{ color }}
      >
        {isPositive ? "+" : ""}
        {formattedValue}
      </span>
      {percentage !== undefined && (
        <span className="ml-1.5 text-xs" style={{ color: "var(--ph-text-subtle)" }}>
          ({percentage >= 0 ? "+" : ""}
          {percentage.toFixed(2)}%)
        </span>
      )}
    </span>
  );
}

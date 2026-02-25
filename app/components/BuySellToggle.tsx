interface BuySellToggleProps {
  value: "BUY" | "SELL";
  onChange: (type: "BUY" | "SELL") => void;
}

export default function BuySellToggle({ value, onChange }: BuySellToggleProps) {
  return (
    <div className="ph-button-group">
      {(["BUY", "SELL"] as const).map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className="px-6 py-2 text-xs font-semibold font-alt transition-colors duration-150"
          style={{
            background:
              value === type
                ? type === "BUY"
                  ? "var(--ph-success)"
                  : "var(--ph-error)"
                : "var(--ph-surface)",
            color: value === type ? "#ffffff" : "var(--ph-text-muted)",
            borderRight: type === "BUY" ? "1px solid var(--ph-border)" : "none",
          }}
        >
          {type === "BUY" ? "▲ BUY" : "▼ SELL"}
        </button>
      ))}
    </div>
  );
}

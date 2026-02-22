export default function Win2000Taskbar({ title }: { title: string }) {
  return (
    <div
      className="h-7 flex items-center px-1 shrink-0"
      style={{
        background:
          "linear-gradient(180deg, #2855C0 0%, #1235A0 40%, #0D2590 100%)",
        borderTop: "2px solid #3A66E8",
      }}
    >
      <div
        className="flex items-center gap-1.5 px-2 h-5 mx-2 flex-1 max-w-50"
        style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <span className="text-yellow-300" style={{ fontSize: 10 }}>
          $
        </span>
        <span className="text-white font-alt truncate" style={{ fontSize: 10 }}>
          {title}
        </span>
      </div>
    </div>
  );
}

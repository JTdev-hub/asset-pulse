export default function Win2000TitleBar({ title }: { title: string }) {
  return (
    <div
      className="flex items-center justify-between px-2 py-1.25"
      style={{
        background:
          "linear-gradient(90deg, #0A246A 0%, #1642AD 20%, #2463D1 50%, #1642AD 80%, #0A246A 100%)",
      }}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-yellow-300 text-xs font-bold leading-none">$</span>
        <span className="text-white text-xs font-semibold font-alt tracking-wide">
          {title}
        </span>
      </div>
      <div className="flex gap-0.5">
        <button
          className="font-bold text-gray-800 flex items-center justify-center"
          style={{
            width: 18,
            height: 14,
            background: "linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)",
            border: "1px solid",
            borderColor: "#FFFFFF #808080 #808080 #FFFFFF",
            fontSize: 9,
          }}
        >
          _
        </button>
        <button
          className="font-bold text-gray-800 flex items-center justify-center"
          style={{
            width: 18,
            height: 14,
            background: "linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)",
            border: "1px solid",
            borderColor: "#FFFFFF #808080 #808080 #FFFFFF",
            fontSize: 9,
          }}
        >
          □
        </button>
        <button
          className="font-bold text-white flex items-center justify-center"
          style={{
            width: 18,
            height: 14,
            background: "linear-gradient(180deg, #E06060 0%, #C00000 100%)",
            border: "1px solid",
            borderColor: "#FF8080 #800000 #800000 #FF8080",
            fontSize: 9,
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

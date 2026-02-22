import { ReactNode } from "react";

export default function Win2000StatusBar({ right }: { right?: ReactNode }) {
  return (
    <div
      className="flex items-center justify-between px-2 py-0.5"
      style={{
        background: "#D4D0C8",
        borderTop: "2px solid #808080",
      }}
    >
      <div
        className="flex-1 h-4 flex items-center px-1 mr-2 text-xs font-alt text-gray-600"
        style={{
          border: "1px solid",
          borderColor: "#808080 #DFDFDF #DFDFDF #808080",
        }}
      >
        Ready
      </div>
      {right}
    </div>
  );
}

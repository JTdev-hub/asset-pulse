import { ReactNode } from "react";
import Win2000TitleBar from "./Win2000TitleBar";
import Win2000StatusBar from "./Win2000StatusBar";

type Win2000WindowProps = {
  title: string;
  children: ReactNode;
  statusBarRight?: ReactNode;
};

export default function Win2000Window({
  title,
  children,
  statusBarRight,
}: Win2000WindowProps) {
  return (
    <div
      style={{
        boxShadow: "4px 4px 20px rgba(0,0,0,0.6)",
        border: "2px solid",
        borderColor: "#DFDFDF #404040 #404040 #DFDFDF",
      }}
    >
      <Win2000TitleBar title={title} />

      <div className="px-5 py-4" style={{ background: "#D4D0C8" }}>
        {children}
      </div>

      <Win2000StatusBar right={statusBarRight} />
    </div>
  );
}

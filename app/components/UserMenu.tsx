"use client";

import { useRef, useState, useEffect } from "react";
import { signOut } from "@/app/lib/actions/auth";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <div
        onClick={() => setOpen((o) => !o)}
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold font-alt text-white cursor-pointer select-none"
        style={{ background: "var(--ph-accent)" }}
      >
        U
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-44 rounded-lg overflow-hidden z-50"
          style={{
            background: "var(--ph-surface)",
            border: "1px solid var(--ph-border)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
          }}
        >
          <button
            onClick={() => signOut()}
            className="ph-hover-row w-full text-left px-4 py-2.5 text-xs font-alt"
            style={{ color: "var(--ph-error-text)" }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
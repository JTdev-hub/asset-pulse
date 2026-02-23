import { InputHTMLAttributes } from "react";

type Win2000InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Win2000Input(props: Win2000InputProps) {
  return (
    <input
      {...props}
      className="win-sunken flex-1 font-alt text-xs px-2 py-1 bg-white focus:outline-none text-black"
    />
  );
}

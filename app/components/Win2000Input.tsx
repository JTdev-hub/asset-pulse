import { InputHTMLAttributes } from "react";

type Win2000InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Win2000Input(props: Win2000InputProps) {
  return (
    <input {...props} className="ph-input" />
  );
}

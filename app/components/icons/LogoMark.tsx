type LogoMarkProps = {
  size?: number;
  className?: string;
};

/** Standalone icon mark — orange square with pulse waveform */
export default function LogoMark({ size = 40, className }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-label="Asset Pulse"
      className={className}
    >
      <rect width="40" height="40" rx="10" fill="#f54e00" />
      <polyline
        points="4,20 10,20 15,9 20,31 25,13 30,20 36,20"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

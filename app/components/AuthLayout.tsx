import LogoMark from "@/app/components/icons/LogoMark";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="ph-page flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <LogoMark size={48} className="mb-3" />
          <h1
            className="text-xl font-heading font-bold"
            style={{ color: "var(--ph-text)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm font-alt mt-1" style={{ color: "var(--ph-text-muted)" }}>
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

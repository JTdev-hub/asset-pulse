"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { signInWithEmail } from "@/app/lib/actions/auth";
import AuthLayout from "@/app/components/AuthLayout";
import FormField from "@/app/components/FormField";
import Win2000Input from "@/app/components/Win2000Input";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignInWithEmail() {
    setError(null);
    setLoading(true);
    const result = await signInWithEmail(email, password);
    setLoading(false);

    // signInWithEmail redirects on success, so result only exists on error
    if (result?.error) {
      setError(result.error);
    }
  }

  async function handleSignInWithGoogle() {
    // OAuth must stay client-side — it needs window.location for the redirect URL
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <AuthLayout title="Sign in to Asset Pulse" subtitle="Track your investment portfolio">
      {/* Card */}
      <div className="ph-card p-6">
        {/* Error */}
        {error && <div className="ph-error mb-4">{error}</div>}

        {/* Form */}
        <div className="space-y-4">
          <FormField
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password has a special label row with "Forgot password?" */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="ph-label" style={{ marginBottom: 0 }}>
                Password
              </label>
              <span
                className="text-xs font-alt cursor-pointer"
                style={{ color: "var(--ph-accent)" }}
              >
                Forgot password?
              </span>
            </div>
            <Win2000Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignInWithEmail()}
            />
          </div>
        </div>

        {/* Sign in button */}
        <button
          onClick={handleSignInWithEmail}
          disabled={loading}
          className="ph-btn-primary w-full mt-5"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        {/* Divider */}
        <div className="ph-divider mt-5">or</div>

        {/* Google OAuth */}
        <button
          className="ph-btn-ghost w-full flex items-center gap-2 justify-center"
          onClick={handleSignInWithGoogle}
        >
          <Image src="/google.png" alt="Google" width={16} height={16} />
          Continue with Google
        </button>
      </div>

      {/* Footer link */}
      <p
        className="text-center text-sm font-alt mt-5"
        style={{ color: "var(--ph-text-muted)" }}
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="font-semibold"
          style={{ color: "var(--ph-accent)" }}
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}

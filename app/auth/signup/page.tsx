"use client";

import Link from "next/link";
import { useState } from "react";
import { signUpWithEmail } from "@/app/lib/actions/auth";
import Win2000Input from "@/app/components/Win2000Input";
import LogoMark from "@/app/components/icons/LogoMark";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const result = await signUpWithEmail(email, password);
    setLoading(false);

    // signUpWithEmail redirects on success, so result only exists on error
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="ph-page flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <LogoMark size={48} className="mb-3" />
          <h1
            className="text-xl font-heading font-bold"
            style={{ color: "var(--ph-text)" }}
          >
            Create your account
          </h1>
          <p
            className="text-sm font-alt mt-1"
            style={{ color: "var(--ph-text-muted)" }}
          >
            Start tracking your portfolio today
          </p>
        </div>

        {/* Card */}
        <div className="ph-card p-6">
          {/* Error */}
          {error && <div className="ph-error mb-4">{error}</div>}

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="ph-label">Email address</label>
              <Win2000Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="ph-label">Password</label>
              <Win2000Input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="ph-label">Confirm password</label>
              <Win2000Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignUp()}
              />
            </div>
          </div>

          {/* Create account button */}
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="ph-btn-primary w-full mt-5"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>

          <p
            className="text-center text-xs font-alt mt-4"
            style={{ color: "var(--ph-text-subtle)" }}
          >
            By creating an account you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Service</span>
          </p>
        </div>

        {/* Footer link */}
        <p
          className="text-center text-sm font-alt mt-5"
          style={{ color: "var(--ph-text-muted)" }}
        >
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold"
            style={{ color: "var(--ph-accent)" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

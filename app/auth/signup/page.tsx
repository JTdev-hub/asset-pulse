"use client";

import Link from "next/link";
import { useState } from "react";
import { signUpWithEmail } from "@/app/lib/actions/auth";
import AuthLayout from "@/app/components/AuthLayout";
import FormField from "@/app/components/FormField";

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
    <AuthLayout title="Create your account" subtitle="Start tracking your portfolio today">
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
          <FormField
            label="Password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormField
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSignUp()}
          />
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
    </AuthLayout>
  );
}

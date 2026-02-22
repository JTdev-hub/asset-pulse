"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import Win2000Window from "@/app/components/Win2000Window";
import Win2000Input from "@/app/components/Win2000Input";
import Win2000Taskbar from "@/app/components/Win2000Taskbar";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSignUp() {
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #1B5FA8 0%, #2E78C5 35%, #1E60A8 65%, #164E96 100%)",
      }}
    >
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-100">
          <Win2000Window title="Create an Account — Asset Pulse">
            {/* App Header */}
            <div
              className="flex items-center gap-3 pb-4 mb-4"
              style={{ borderBottom: "1px solid #808080" }}
            >
              <div
                className="w-14 h-14 flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, #1642AD 0%, #0A246A 100%)",
                  border: "2px solid",
                  borderColor: "#FFFFFF #404040 #404040 #FFFFFF",
                }}
              >
                <span className="text-yellow-300 font-bold text-xl font-alt">
                  AP
                </span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm font-alt">
                  Asset Pulse
                </div>
                <div className="text-xs text-gray-600 font-alt">
                  Investment Tracker
                </div>
                <div className="text-xs text-gray-500 font-alt mt-0.5">
                  Create a new account to get started.
                </div>
              </div>
            </div>

            {/* Success state */}
            {success ? (
              <div
                className="mb-4 px-3 py-2 text-xs font-alt text-gray-800"
                style={{ background: "#E8F0E8", border: "1px solid #4CAF50" }}
              >
                Account created! Check your email to confirm your address, then{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-700 underline hover:text-blue-900"
                >
                  log in
                </Link>
                .
              </div>
            ) : (
              <>
                {/* Error message */}
                {error && (
                  <div
                    className="mb-3 px-3 py-2 text-xs font-alt text-red-800"
                    style={{
                      background: "#FFF0F0",
                      border: "1px solid #CC0000",
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Form */}
                <div className="space-y-2.5 mb-4">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-alt font-semibold text-gray-800 w-32 text-right shrink-0">
                      Email:
                    </label>
                    <Win2000Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-alt font-semibold text-gray-800 w-32 text-right shrink-0">
                      Password:
                    </label>
                    <Win2000Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-alt font-semibold text-gray-800 w-32 text-right shrink-0">
                      Confirm Password:
                    </label>
                    <Win2000Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-2 mb-4">
                  <button
                    onClick={handleSignUp}
                    disabled={loading}
                    className="button px-5 py-1 text-xs disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </button>
                  <Link href="/auth/login">
                    <button className="button px-5 py-1 text-xs">Cancel</button>
                  </Link>
                </div>
              </>
            )}

            {/* HR separator */}
            <div
              className="mb-3"
              style={{
                borderTop: "1px solid #808080",
                borderBottom: "1px solid #FFFFFF",
              }}
            />

            {/* Footer note */}
            <p className="text-center text-xs font-alt text-gray-500">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-700 underline hover:text-blue-900"
              >
                Log in
              </Link>
            </p>
          </Win2000Window>
        </div>
      </main>

      <Win2000Taskbar title="Asset Pulse — Create Account" />
    </div>
  );
}

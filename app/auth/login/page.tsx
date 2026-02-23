"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { signInWithEmail } from "@/app/lib/actions/auth";
import Win2000Window from "@/app/components/Win2000Window";
import Win2000Input from "@/app/components/Win2000Input";
import Win2000Taskbar from "@/app/components/Win2000Taskbar";

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
    <div className="auth-bg">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-100">
          <Win2000Window
            title="Log On to Asset Pulse"
            statusBarRight={
              <Link
                href="/auth/signup"
                className="text-xs font-alt text-blue-600 underline hover:text-blue-800 whitespace-nowrap"
              >
                Create account
              </Link>
            }
          >
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
                  Enter your credentials to log on.
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && <div className="win-error">{error}</div>}

            {/* Form */}
            <div className="space-y-2.5 mb-3">
              <div className="flex items-center gap-2">
                <label className="win-form-label w-24">
                  Email:
                </label>
                <Win2000Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="win-form-label w-24">
                  Password:
                </label>
                <Win2000Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Remember me */}
            <div
              className="flex items-center gap-1.5 mb-4"
              style={{ paddingLeft: "106px" }}
            >
              <input type="checkbox" id="remember" className="w-3 h-3" />
              <label
                htmlFor="remember"
                className="text-xs font-alt text-gray-800 cursor-pointer"
              >
                Remember my password
              </label>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 mb-4">
              <button
                onClick={handleSignInWithEmail}
                disabled={loading}
                className="button px-5 py-1 text-xs disabled:opacity-50"
              >
                {loading ? "Logging in..." : "OK"}
              </button>
              <button className="button px-5 py-1 text-xs">Cancel</button>
              <button className="button px-3 py-1 text-xs">Options »</button>
            </div>

            {/* HR separator */}
            <div className="win-separator" />

            {/* Social sign-in */}
            <div className="space-y-1.5">
              <p className="text-center text-xs font-alt text-gray-500 mb-2">
                or sign in with
              </p>
              <button
                className="button w-full flex items-center gap-2 justify-center px-3 py-1.5 text-xs"
                onClick={handleSignInWithGoogle}
              >
                <Image src="/google.png" alt="Google" width={14} height={14} />
                Continue with Google
              </button>
              <button className="button w-full flex items-center gap-2 justify-center px-3 py-1.5 text-xs">
                <Image src="/apple.png" alt="Apple" width={14} height={14} />
                Continue with Apple
              </button>
            </div>
          </Win2000Window>
        </div>
      </main>

      <Win2000Taskbar title="Asset Pulse — Log On" />
    </div>
  );
}
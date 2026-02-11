import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #1B5FA8 0%, #2E78C5 35%, #1E60A8 65%, #164E96 100%)",
      }}
    >
      {/* Desktop area */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-100">
          {/* Window frame */}
          <div
            style={{
              boxShadow: "4px 4px 20px rgba(0,0,0,0.6)",
              border: "2px solid",
              borderColor: "#DFDFDF #404040 #404040 #DFDFDF",
            }}
          >
            {/* Title Bar */}
            <div
              className="flex items-center justify-between px-2 py-1.25"
              style={{
                background:
                  "linear-gradient(90deg, #0A246A 0%, #1642AD 20%, #2463D1 50%, #1642AD 80%, #0A246A 100%)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-yellow-300 text-xs font-bold leading-none">
                  $
                </span>
                <span className="text-white text-xs font-semibold font-alt tracking-wide">
                  Log On to Asset Pulse
                </span>
              </div>
              <div className="flex gap-0.5">
                <button
                  className="font-bold text-gray-800 flex items-center justify-center"
                  style={{
                    width: 18,
                    height: 14,
                    background:
                      "linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)",
                    border: "1px solid",
                    borderColor: "#FFFFFF #808080 #808080 #FFFFFF",
                    fontSize: 9,
                  }}
                >
                  _
                </button>
                <button
                  className="font-bold text-gray-800 flex items-center justify-center"
                  style={{
                    width: 18,
                    height: 14,
                    background:
                      "linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)",
                    border: "1px solid",
                    borderColor: "#FFFFFF #808080 #808080 #FFFFFF",
                    fontSize: 9,
                  }}
                >
                  □
                </button>
                <button
                  className="font-bold text-white flex items-center justify-center"
                  style={{
                    width: 18,
                    height: 14,
                    background:
                      "linear-gradient(180deg, #E06060 0%, #C00000 100%)",
                    border: "1px solid",
                    borderColor: "#FF8080 #800000 #800000 #FF8080",
                    fontSize: 9,
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Dialog Body */}
            <div className="px-5 py-4" style={{ background: "#D4D0C8" }}>
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

              {/* Form — label-left layout, classic Win2000 dialog style */}
              <div className="space-y-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-alt font-semibold text-gray-800 w-24 text-right shrink-0">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="flex-1 font-alt text-xs px-2 py-1 bg-white focus:outline-none text-black"
                    style={{
                      border: "2px solid",
                      borderColor: "#808080 #DFDFDF #DFDFDF #808080",
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-alt font-semibold text-gray-800 w-24 text-right shrink-0">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="flex-1 font-alt text-xs px-2 py-1 bg-white focus:outline-none text-black"
                    style={{
                      border: "2px solid",
                      borderColor: "#808080 #DFDFDF #DFDFDF #808080",
                    }}
                  />
                </div>
              </div>

              {/* Remember me — indented to align with inputs */}
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
                <button className="button px-5 py-1 text-xs">OK</button>
                <button className="button px-5 py-1 text-xs">Cancel</button>
                <button className="button px-3 py-1 text-xs">Options »</button>
              </div>

              {/* HR separator — double-line Win2000 style */}
              <div
                className="mb-3"
                style={{
                  borderTop: "1px solid #808080",
                  borderBottom: "1px solid #FFFFFF",
                }}
              />

              {/* Social sign-in */}
              <div className="space-y-1.5">
                <p className="text-center text-xs font-alt text-gray-500 mb-2">
                  or sign in with
                </p>
                <button className="button w-full flex items-center gap-2 justify-center px-3 py-1.5 text-xs">
                  <Image
                    src="/google.png"
                    alt="Google"
                    width={14}
                    height={14}
                  />
                  Continue with Google
                </button>
                <button className="button w-full flex items-center gap-2 justify-center px-3 py-1.5 text-xs">
                  <Image src="/apple.png" alt="Apple" width={14} height={14} />
                  Continue with Apple
                </button>
              </div>
            </div>

            {/* Status Bar */}
            <div
              className="flex items-center justify-between px-2 py-0.5"
              style={{
                background: "#D4D0C8",
                borderTop: "2px solid #808080",
              }}
            >
              <div
                className="flex-1 h-4 flex items-center px-1 mr-2 text-xs font-alt text-gray-600"
                style={{
                  border: "1px solid",
                  borderColor: "#808080 #DFDFDF #DFDFDF #808080",
                }}
              >
                Ready
              </div>
              <Link
                href="#"
                className="text-xs font-alt text-blue-600 underline hover:text-blue-800 whitespace-nowrap"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Taskbar */}
      <div
        className="h-7 flex items-center justify-between px-1 shrink-0"
        style={{
          background:
            "linear-gradient(180deg, #2855C0 0%, #1235A0 40%, #0D2590 100%)",
          borderTop: "2px solid #3A66E8",
        }}
      >
        {/* Active task chip */}
        <div
          className="flex items-center gap-1.5 px-2 h-5 mx-2 flex-1 max-w-50"
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <span className="text-yellow-300" style={{ fontSize: 10 }}>
            $
          </span>
          <span
            className="text-white font-alt truncate"
            style={{ fontSize: 10 }}
          >
            Asset Pulse — Log On
          </span>
        </div>
      </div>
    </div>
  );
}

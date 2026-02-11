import Link from "next/link";
import DashboardIcon from "./icons/DashboardIcon";
import PortfolioIcon from "./icons/PortfolioIcon";
import ProfileIcon from "./icons/ProfileIcon";
import AnalyticsIcon from "./icons/AnalyticsIcon";

const NavBar = () => {
  return (
    <div>
      {/* Title Bar — Win2000 blue gradient, matching login dialog */}
      <div
        className="flex items-center justify-between px-3 py-1.25"
        style={{
          background:
            "linear-gradient(90deg, #0A246A 0%, #1642AD 20%, #2463D1 50%, #1642AD 80%, #0A246A 100%)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-yellow-300 text-xs font-bold leading-none">
            $
          </span>
          <span className="text-white text-sm font-alt font-semibold tracking-wide">
            asset pulse.
          </span>
        </div>

        {/* Window controls — same style as login dialog */}
        <div className="flex gap-0.5">
          <button
            className="font-bold text-gray-800 flex items-center justify-center"
            style={{
              width: 18,
              height: 14,
              background: "linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)",
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
              background: "linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)",
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
              background: "linear-gradient(180deg, #E06060 0%, #C00000 100%)",
              border: "1px solid",
              borderColor: "#FF8080 #800000 #800000 #FF8080",
              fontSize: 9,
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/dashboard" className="nav-link">
                <DashboardIcon />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="nav-link">
                <PortfolioIcon />
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/analytics" className="nav-link">
                <AnalyticsIcon />
                Analytics
              </Link>
            </li>
            <li>
              <Link href="/profile" className="nav-link">
                <ProfileIcon />
                Profile
              </Link>
            </li>
          </ul>

          {/* Right side */}
          <div className="text-gray-700 text-xs font-alt">
            <span className="underline cursor-pointer hover:bg-blue-100 px-2 py-1">
              Help
            </span>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;

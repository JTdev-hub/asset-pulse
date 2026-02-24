import Link from "next/link";
import DashboardIcon from "./icons/DashboardIcon";
import PortfolioIcon from "./icons/PortfolioIcon";
import ProfileIcon from "./icons/ProfileIcon";
import AnalyticsIcon from "./icons/AnalyticsIcon";
import LogoMark from "./icons/LogoMark";

const NavBar = () => {
  return (
    <header>
      <nav>
        {/* Left: brand + nav links */}
        <div className="flex items-center gap-6">
          {/* Logo mark */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 shrink-0"
          >
            <LogoMark size={28} />
            <span className="font-heading font-bold text-white text-sm tracking-wide">
              asset pulse
            </span>
          </Link>

          {/* Nav links */}
          <ul>
            <li>
              <Link href="/dashboard" className="nav-link">
                <DashboardIcon className="w-4 h-4" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="nav-link">
                <PortfolioIcon className="w-4 h-4" />
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/analytics" className="nav-link">
                <AnalyticsIcon className="w-4 h-4" />
                Analytics
              </Link>
            </li>
            <li>
              <Link href="/profile" className="nav-link">
                <ProfileIcon className="w-4 h-4" />
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: help + avatar */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-alt cursor-pointer px-2 py-1 rounded transition-colors duration-150 text-white/55 hover:text-white">
            Help
          </span>
          {/* Avatar placeholder */}
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold font-alt text-white cursor-pointer"
            style={{ background: "var(--ph-accent)" }}
            title="Profile"
          >
            U
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;

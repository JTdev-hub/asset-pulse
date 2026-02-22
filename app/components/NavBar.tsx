import Link from "next/link";
import DashboardIcon from "./icons/DashboardIcon";
import PortfolioIcon from "./icons/PortfolioIcon";
import ProfileIcon from "./icons/ProfileIcon";
import AnalyticsIcon from "./icons/AnalyticsIcon";
import Win2000TitleBar from "./Win2000TitleBar";

const NavBar = () => {
  return (
    <div>
      <Win2000TitleBar title="asset pulse." />

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

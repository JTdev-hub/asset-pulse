const PortfolioIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 6H20V20H4V6Z" fill="#FFD885" stroke="#000" strokeWidth="1" />
    <path d="M4 6H20V8H4V6Z" fill="#FFEB9C" />
    <rect
      x="9"
      y="4"
      width="6"
      height="3"
      fill="#C69C6D"
      stroke="#000"
      strokeWidth="1"
    />
    <rect x="9" y="4" width="6" height="1" fill="#E6C896" />
    <line x1="4" y1="20" x2="20" y2="20" stroke="#8B6914" strokeWidth="1" />
    <line x1="20" y1="6" x2="20" y2="20" stroke="#8B6914" strokeWidth="1" />
  </svg>
);

export default PortfolioIcon;

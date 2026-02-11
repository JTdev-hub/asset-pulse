const ProfileIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      fill="#C0C0C0"
      stroke="#000"
      strokeWidth="1"
    />
    <rect x="3" y="3" width="18" height="1" fill="#E0E0E0" />
    <circle
      cx="12"
      cy="10"
      r="3"
      fill="#FFD4A3"
      stroke="#000"
      strokeWidth="1"
    />
    <circle cx="12" cy="9" r="3" fill="#FFE4C4" />
    <path
      d="M7 18C7 15 9 14 12 14C15 14 17 15 17 18L17 21H7L7 18Z"
      fill="#4A90E2"
      stroke="#000"
      strokeWidth="1"
    />
    <path
      d="M7 18C7 15 9 14 12 14C15 14 17 15 17 18L17 19H7L7 18Z"
      fill="#6FA8E8"
    />
  </svg>
);

export default ProfileIcon;

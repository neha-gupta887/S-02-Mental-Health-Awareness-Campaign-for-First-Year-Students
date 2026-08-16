import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaSearch,
  FaSun,
  FaMoon,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import useAuth from "../../hooks/useAuth";
import { useNotifications } from "../../context/NotificationContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

function Topbar({ setSidebarOpen }) {
  const { darkMode, setDarkMode } = useTheme();
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const [isProfileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const userName = user?.displayName || "Student";
  const userEmail = user?.email || "";
  const userAvatar = user?.photoURL;
  const userInitials = userName?.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/5 dark:bg-gray-950/80">
      <div className="mx-auto flex h-20 items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu trigger */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-200 hover:text-emerald-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 lg:hidden"
          aria-label="Open navigation"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="flex flex-col gap-1">
            <span className="h-0.5 w-4 rounded-full bg-current" />
            <span className="h-0.5 w-4 rounded-full bg-current" />
            <span className="h-0.5 w-3 rounded-full bg-current" />
          </span>
        </button>

        {/* Mobile title */}
        <div className="min-w-0 lg:hidden text-sm font-semibold text-slate-900 dark:text-white">
          <p className="truncate">
            ManaSetu
          </p>
        </div>

        {/* Search */}
        <div className="relative hidden max-w-md flex-1 md:block">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

          <input
            type="search"
            placeholder="Search..."
            className="h-11 w-full rounded-2xl border border-slate-200/80 bg-white/80 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/5 dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-800"
          />
        </div>

        {/* Right controls */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Desktop greeting */}
          <div className="hidden text-right xl:block">
            <p className="text-xs text-slate-400">Welcome back</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">
              {userName}
            </p>
          </div>

          {/* Theme */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-emerald-200 hover:text-emerald-600 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300 dark:hover:border-emerald-900 dark:hover:text-emerald-400"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {darkMode ? (
              <FaSun className="text-sm transition-transform duration-300 group-hover:rotate-45" />
            ) : (
              <FaMoon className="text-sm transition-transform duration-300 group-hover:-rotate-12" />
            )}
          </button>

          {/* Notifications */}
          <Link
            to="/notifications"
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-emerald-200 hover:text-emerald-600 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300 dark:hover:border-emerald-900 dark:hover:text-emerald-400"
            aria-label={
              unreadCount > 0
                ? `${unreadCount} unread notifications`
                : "Notifications"
            }
            title={
              unreadCount > 0
                ? `${unreadCount} unread notifications`
                : "Notifications"
            }
          >
            <FaBell className="text-sm transition-transform duration-200 group-hover:-rotate-6" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white dark:border-gray-950">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen(!isProfileOpen)}
              className="group flex items-center gap-2 rounded-full border-2 border-transparent transition-all duration-200 hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-lg font-bold text-white shadow-sm">
                  {userInitials}
                </div>
              )}
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white py-2 shadow-xl dark:border-slate-700 dark:bg-slate-800">
                <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                  <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                    {userName}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {userEmail}
                  </p>
                </div>
                <div className="p-2">
                  <Link
                    to="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                  >
                    <FaCog />
                    <span>Settings</span>
                  </Link>
                </div>
                <div className="border-t border-slate-200 p-2 dark:border-slate-700">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Topbar;
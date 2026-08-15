import {
  FaArrowRight,
  FaHome,
  FaSmile,
  FaBook,
  FaChartLine,
  FaCog,
  FaUserFriends,
  FaWind,
  FaUsers,
  FaSignOutAlt,
  FaLeaf,
  FaRobot,
  FaTimes,
} from "react-icons/fa";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { signOut } from "firebase/auth";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const menuSections = [
    {
      title: "WORKSPACE",
      items: [
        {
          icon: <FaHome />,
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          icon: <FaSmile />,
          label: "Mood Check-in",
          path: "/mood-checkin",
        },
        {
          icon: <FaBook />,
          label: "Journal",
          path: "/journal",
        },
        {
          icon: <FaChartLine />,
          label: "Analytics",
          path: "/analytics",
        },
      ],
    },
    {
      title: "HUMAN SUPPORT",
      items: [
        {
          icon: <FaUserFriends />,
          label: "Senior Buddy",
          path: "/support",
        },
      ],
    },
    {
      title: "TOOLS",
      items: [
        {
          icon: <FaWind />,
          label: "Breathing",
          path: "/breathing",
        },
        {
          icon: <FaRobot />,
          label: "Talk to Mana",
          path: "/chat",
        },
      ],
    },
  ];

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[1px] transition-opacity lg:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className="
        fixed
        left-0
        top-0
        z-50
        flex
        h-screen
        w-72
        flex-col
        overflow-hidden
        border-r
        border-slate-200/80
        bg-white
        dark:border-white/[0.06]
        dark:bg-gray-950
        transition-transform
        duration-300
        ease-out
        -translate-x-full
        lg:translate-x-0"
        style={{ transform: sidebarOpen ? "translateX(0)" : undefined }}
      >
      {/* =========================================
          LOGO
      ========================================= */}

      <div className="flex items-start justify-between px-6 pb-6 pt-7">

        <div className="flex items-center gap-3">

          {/* Logo */}
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-xl text-white shadow-lg shadow-emerald-500/20"
          >
            <FaLeaf />
          </div>

          {/* Brand */}
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Mana<span className="text-emerald-500">Setu</span>
            </h1>

            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Your wellness space
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/[0.06] dark:hover:text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <FaTimes />
        </button>

      </div>

      {/* =========================================
          NAVIGATION
      ========================================= */}

      <div className="flex-1 overflow-y-auto px-4 pb-5">

        {menuSections.map((section) => (

          <div key={section.title} className="mb-8">

            <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.18em] text-slate-400 dark:text-slate-500">
              {section.title}
            </p>

            <nav className="space-y-1">

              {section.items.map((item) => (
                <SidebarLink
                  key={item.label}
                  item={item}
                  onClick={() => setSidebarOpen(false)}
                />
              ))}

            </nav>

          </div>

        ))}

      </div>

      {/* =========================================
          BOTTOM SECTION
      ========================================= */}

      <div
        className="
          border-t
          border-slate-100
          bg-white
          px-4
          pb-5
          pt-4
          dark:border-white/[0.06]
          dark:bg-gray-950
        "
      >

        {/* Settings */}
        <SidebarLink
          item={{ icon: <FaCog />, label: "Settings", path: "/settings" }}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Logout */}

        <button
          type="button"
          onClick={handleLogout}
          className="
            group
            mt-1
            flex
            w-full
            items-center
            gap-3
            rounded-2xl
            px-3
            py-2.5
            text-sm
            font-medium
            text-slate-500
            transition-all
            hover:bg-red-50
            hover:text-red-600
            dark:text-slate-400
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-red-500/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950
            dark:hover:bg-red-950/20
            dark:hover:text-red-400
          "
        >
          <span
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 group-hover:bg-red-50 group-hover:text-red-500 dark:bg-white/[0.04] dark:text-slate-400 dark:group-hover:bg-red-950/20 dark:group-hover:text-red-400"
          >
            <FaSignOutAlt />
          </span>

          <span>Logout</span>
        </button>

        {/* Footer */}

        <div className="mt-4 px-3">

          <p className="text-[10px] leading-5 text-slate-400 dark:text-slate-500">
            ManaSetu · A calmer space for your mind.
          </p>

        </div>

      </div>

      </aside>
    </>
  );
}

function SidebarLink({ item, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={`
        group
        relative
        flex
        items-center
        gap-3
        rounded-xl
        px-3
        py-2.5
        text-sm
        font-medium
        transition-all
        duration-200
        ${isActive
          ? "bg-emerald-50 text-emerald-700 shadow-sm dark:bg-emerald-950/30 dark:text-emerald-300"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.04] dark:hover:text-white"
        }
      `}
    >
      {/* Active Indicator */}
      {isActive && (
        <span
          className="
            absolute
            left-0
            top-1/2
            h-6
            w-1
            -translate-y-1/2
            rounded-r-full
            bg-emerald-500
          "
        />
      )}

      {/* Icon */}
      <span
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          text-sm
          transition-all
          ${isActive
            ? "bg-white text-emerald-600 shadow-sm dark:bg-white/[0.07] dark:text-emerald-400"
            : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-emerald-600 dark:bg-white/[0.04] dark:text-slate-500 dark:group-hover:text-emerald-400"
          }
        `}
      >
        {item.icon}
      </span>

      {/* Label */}
      <span className="flex-1">
        {item.label}
      </span>

      {/* Active Arrow */}
      {isActive && (
        <FaArrowRight className="pr-1 text-xs text-emerald-500" />
      )}
    </NavLink>
  );
}

export default Sidebar;

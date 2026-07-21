import {
  FaHome,
  FaSmile,
  FaBook,
  FaRobot,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaSmile />, label: "Mood Tracker", path: "/dashboard" },
    { icon: <FaBook />, label: "Journal", path: "/journal" },
    { icon: <FaRobot />, label: "AI Companion", path: "/dashboard" },
    { icon: <FaChartLine />, label: "Analytics", path: "/dashboard" },
    { icon: <FaCog />, label: "Settings", path: "/dashboard" },
  ];

  return (
    <aside className="w-72 bg-white shadow-lg h-screen fixed left-0 top-0 p-6">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-green-600 mb-12">
        🌿 ManaSetu
      </h1>

      {/* Navigation */}
      <nav className="space-y-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-700"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="absolute bottom-8 left-6 right-6">
        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition">
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
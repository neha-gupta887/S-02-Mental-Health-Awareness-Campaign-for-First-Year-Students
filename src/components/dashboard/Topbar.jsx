import { FaBell, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <header className="bg-white shadow-md rounded-2xl px-8 py-5 flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h2>

        <p className="text-gray-500 mt-1">
          Take a moment to care for your mind today.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-2xl text-gray-600 hover:text-green-600 transition">
          <FaBell />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle className="text-5xl text-green-600" />

          <div>
            <h3 className="font-semibold text-gray-800">
              Student
            </h3>

            <p className="text-sm text-gray-500">
              Welcome to ManaSetu
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
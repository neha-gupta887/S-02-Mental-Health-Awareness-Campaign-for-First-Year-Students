import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Signup() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Section */}
      <div className="hidden lg:flex bg-gradient-to-br from-green-600 to-emerald-500 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h1 className="text-5xl font-bold">
            Welcome to <br />
            MindBridge
          </h1>

          <p className="mt-6 text-lg leading-8 text-green-100">
            Join thousands of students building healthier habits, tracking
            their emotions, and improving mental wellness with AI-powered
            guidance.
          </p>

          <div className="mt-10 space-y-4">
            <div>✅ AI Wellness Companion</div>
            <div>✅ Daily Mood Tracking</div>
            <div>✅ Personal Journal</div>
            <div>✅ Mentor & Buddy Support</div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-center text-gray-900">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mt-2">
            Start your wellness journey today.
          </p>

          <form className="mt-8 space-y-5">

            {/* Full Name */}
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" />
              I agree to the Terms & Conditions
            </label>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Create Account
            </button>

          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { login, googleLogin } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      alert("🎉 Login successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await googleLogin();

      alert("🎉 Google Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Section */}
      <div className="hidden lg:flex bg-gradient-to-br from-green-600 to-emerald-500 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h1 className="text-5xl font-bold">
            Welcome Back to <br />
            ManaSetu
          </h1>

          <p className="mt-6 text-lg leading-8 text-green-100">
            Continue your wellness journey with ManaSetu. Track your mood,
            connect with your AI companion, write your journal, and take care
            of your mental well-being every day.
          </p>

          <div className="mt-10 space-y-4">
            <div>🌿 AI Wellness Companion</div>
            <div>😊 Daily Mood Tracking</div>
            <div>📖 Personal Journal</div>
            <div>📊 Wellness Insights</div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mt-2">
            Login to continue your ManaSetu journey.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Options */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember Me
              </label>

              <button
                type="button"
                className="text-green-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:bg-green-400"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <hr className="flex-1" />
              <span className="text-gray-400">OR</span>
              <hr className="flex-1" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full border py-3 rounded-xl flex justify-center items-center gap-3 hover:bg-gray-100 transition disabled:opacity-50"
            >
              <FaGoogle className="text-red-500" />
              Continue with Google
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
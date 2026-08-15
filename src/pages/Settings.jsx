import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import useAuth from "../hooks/useAuth";
import { updateProfile as firebaseUpdateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { FaUser, FaPalette, FaBell, FaSignOutAlt, FaExclamationTriangle } from "react-icons/fa";
import { ConfirmationModal } from "./ConfirmationModal";

function Settings() {
  const { darkMode, setDarkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.displayName || "Student",
        email: user.email || "No email found",
      });
    }
  }, [user]);

  const userAvatar = user?.photoURL;
  const userInitials = profile.name?.charAt(0).toUpperCase();

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!auth.currentUser) return toast.error("You are not logged in.");
    if (!profile.name.trim()) return toast.error("Name cannot be empty.");

    setLoading(true);
    try {
      await firebaseUpdateProfile(auth.currentUser, { displayName: profile.name });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setModalContent({
      title: "Confirm Sign Out",
      message: "Are you sure you want to sign out of your ManaSetu account?",
      confirmText: "Sign Out",
      onConfirm: async () => {
        await signOut(auth);
        toast.success("You have been signed out.");
        navigate("/login");
        setIsModalOpen(false);
      },
    });
    setIsModalOpen(true);
  };

  const handleDeleteAccount = () => {
    setModalContent({
      title: "Delete Account (Feature Coming Soon)",
      message: "This feature is not yet implemented. In a future version, this action will permanently delete your account and all associated data.",
      confirmText: "Understood",
      onConfirm: () => setIsModalOpen(false),
    });
    setIsModalOpen(true);
  };

  return (
    <AuthenticatedLayout>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        {...modalContent}
      />
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-center text-4xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>

        {/* Profile Section */}
        <SettingsCard icon={<FaUser />} title="Profile">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            {userAvatar ? (
              <img src={userAvatar} alt="Profile" className="h-20 w-20 rounded-full object-cover" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-3xl font-bold text-white shadow-sm">
                {userInitials}
              </div>
            )}
            <div className="flex-1 space-y-4 text-center sm:text-left">
              <SettingsInput label="Full Name" name="name" value={profile.name} onChange={handleChange} />
              <SettingsInput label="Email Address" name="email" value={profile.email} readOnly />
            </div>
          </div>
          <div className="mt-6 border-t border-slate-200 pt-6 text-right dark:border-slate-700">
            <button
              onClick={handleSave}
              disabled={loading}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </SettingsCard>

        {/* Preferences Section */}
        <SettingsCard icon={<FaPalette />} title="Preferences">
          <SettingsRow
            icon={<FaBell />}
            title="Notifications"
            description="Enable or disable all app notifications."
          >
            <SettingsToggle
              enabled={notifications}
              onChange={() => {
                setNotifications(!notifications);
                toast.success("Notification preferences coming soon!");
              }}
              ariaLabel="Toggle notifications"
            />
          </SettingsRow>
          <SettingsRow
            icon={darkMode ? <FaMoon /> : <FaSun />}
            title="Theme"
            description="Switch between light and dark mode."
          >
            <SettingsToggle
              enabled={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              ariaLabel="Toggle dark mode"
            />
          </SettingsRow>
        </SettingsCard>

        {/* Account Section */}
        <SettingsCard icon={<FaExclamationTriangle />} title="Account Actions">
          <SettingsRow
            icon={<FaSignOutAlt />}
            title="Sign Out"
            description="Sign out of your ManaSetu account on this device."
          >
            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
            >
              Sign Out
            </button>
          </SettingsRow>
          <SettingsRow
            icon={<FaExclamationTriangle />}
            title="Delete Account"
            description="Permanently delete your account and all associated data."
            isLast
          >
            <button
              onClick={handleDeleteAccount}
              className="rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-100 dark:border-red-700/50 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/60"
            >
              Delete Account
            </button>
          </SettingsRow>
        </SettingsCard>
      </div>
    </AuthenticatedLayout>
  );
}

function SettingsCard({ icon, title, children }) {
  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SettingsRow({ icon, title, description, children, isLast = false }) {
  return (
    <div
      className={`flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between ${!isLast && "border-b border-slate-200 pb-4 dark:border-slate-700"}`}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 text-slate-400">{icon}</div>
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
      <div className="w-full shrink-0 sm:w-auto sm:pl-4">{children}</div>
    </div>
  );
}

function SettingsInput({ label, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 read-only:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:ring-emerald-500/20 dark:read-only:bg-slate-700/50"
      />
    </div>
  );
}

function SettingsToggle({ enabled, onChange, ariaLabel }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" checked={enabled} onChange={onChange} className="peer sr-only" aria-label={ariaLabel} />
      <div className="peer h-7 w-12 rounded-full bg-slate-200 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-emerald-800"></div>
    </label>
  );
}

export default Settings;

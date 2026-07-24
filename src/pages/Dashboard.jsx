import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import MoodSection from "../components/dashboard/MoodSection";
import QuickActions from "../components/dashboard/QuickActions";
import QuoteCard from "../components/dashboard/QuoteCard";
import MoodHistory from "../components/dashboard/MoodHistory";
import MoodReminder from "../components/MoodReminder";
import { Link } from "react-router-dom";
import DailyChallengesCard from "../components/DailyChallengesCard";
function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-72 p-8">
        {/* Topbar */}
        <Topbar />

        {/* Welcome Card */}
        <div className="mt-8">
          <WelcomeCard />
        </div>

        {/* Daily Mood Reminder */}
        <div className="mt-6">
          <MoodReminder />
          <DailyChallengesCard />
        </div>

        {/* Mood Section */}
        <div className="mt-6">
          <MoodSection />
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <QuickActions />
        </div>

        {/* Analytics Button */}
        <div className="mt-6">
          <Link
            to="/analytics"
            className="block bg-emerald-600 hover:bg-emerald-700 text-white text-center py-4 rounded-2xl font-semibold text-lg transition"
          >
            📊 View Mood Analytics
          </Link>
        </div>

        {/* Support Center Button */}
        <div className="mt-4">
          <Link
            to="/support"
            className="block bg-red-600 hover:bg-red-700 text-white text-center py-4 rounded-2xl font-semibold text-lg transition"
          >
            🆘 Support Center
          </Link>
        </div>

        {/* Quote */}
        <div className="mt-6">
          <QuoteCard />
        </div>

        {/* Mood History */}
        <div className="mt-6">
          <MoodHistory />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
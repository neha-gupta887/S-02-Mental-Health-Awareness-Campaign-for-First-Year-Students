import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import MoodSection from "../components/dashboard/MoodSection";
import QuickActions from "../components/dashboard/QuickActions";

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

        {/* Mood Section */}
        <MoodSection />

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
}

export default Dashboard;
import AIChat from "./pages/AIChat";
import Notifications from "./pages/Notifications";
import { NotificationProvider } from "./context/NotificationContext";
import Memory from "./pages/Memory";
import AICommandCenter from "./pages/AICommandCenter";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import AICompanion from "./pages/AICompanion";
import BreathingExercise from "./pages/BreathingExercise";
import MoodAnalytics from "./pages/MoodAnalytics";
import Support from "./pages/Support";
import MoodCheckin from "./components/dashboard/MoodCheckin";
import ProtectedRoute from "./components/ProtectedRoute";
import StressSOS from "./pages/StressSOS";
import ExamModeDashboard from "./pages/ExamModeDashboard";
import ExamModeSetup from "./pages/ExamModeSetup";

const privateRoute = (element) => <ProtectedRoute>{element}</ProtectedRoute>;
function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/chat" element={privateRoute(<AIChat />)} />
          <Route path="/notifications" element={privateRoute(<Notifications />)} />
          <Route path="/memory" element={privateRoute(<Memory />)} />
          <Route path="/command-center" element={privateRoute(<AICommandCenter />)} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={privateRoute(<Dashboard />)} />
          <Route path="/mood-checkin" element={privateRoute(<MoodCheckin />)} />
          <Route path="/journal" element={privateRoute(<Journal />)} />
          <Route path="/ai-companion" element={privateRoute(<AICompanion />)} />
          <Route path="/breathing" element={privateRoute(<BreathingExercise />)} />
          <Route path="/analytics" element={privateRoute(<MoodAnalytics />)} />
          <Route path="/support" element={privateRoute(<Support />)} />
          <Route path="/settings" element={privateRoute(<Settings />)} />
          <Route path="/stress-sos" element={privateRoute(<StressSOS />)} />
          <Route path="/exam-mode" element={privateRoute(<ExamModeDashboard />)} />
          <Route path="/exam-mode-setup" element={privateRoute(<ExamModeSetup />)} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}


export default App;

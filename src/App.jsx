import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import AICompanion from "./pages/AICompanion";
import BreathingExercise from "./pages/BreathingExercise";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/ai-companion" element={<AICompanion />} />
        <Route path="/breathing" element={<BreathingExercise />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
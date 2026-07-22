import { BrowserRouter, Routes, Route } from "react-router-dom";
import Journal from "./pages/Journal";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AITest from "./pages/AITest";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/ai-test" element={<AITest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
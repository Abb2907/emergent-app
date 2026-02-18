import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LearningPaths from "./components/LearningPaths";
import ResourcesSection from "./components/ResourcesSection";
import CommunitySection from "./components/CommunitySection";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import ResourcesPage from "./components/ResourcesPage";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// ============================================================
// AUTH CALLBACK
// ============================================================
function AuthCallback({ setUser }) {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hash = window.location.hash;
    const match = hash.match(/session_id=([^&]+)/);
    if (!match) { navigate("/"); return; }
    const sessionId = match[1];

    axios.post(`${API}/auth/session`, { session_id: sessionId }, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        navigate("/dashboard", { state: { user: res.data.user } });
      })
      .catch(() => navigate("/"));
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#050505" }}>
      <div className="text-center">
        <div className="w-12 h-12 rounded-full brand-gradient-bg mx-auto mb-4 animate-pulse"></div>
        <p className="text-zinc-400 font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Signing you in...
        </p>
      </div>
    </div>
  );
}

// ============================================================
// MAIN ROUTER
// ============================================================
function AppRouter() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
  // Synchronously detect session_id in URL hash before any route renders
  if (location.hash?.includes("session_id=")) {
    return <AuthCallback setUser={setUser} />;
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} authChecked={authChecked} setAuthChecked={setAuthChecked} />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <LearningPaths />
            <ResourcesSection user={user} />
            <CommunitySection />
            <Footer />
          </main>
        } />
        <Route path="/resources" element={<ResourcesPage user={user} />} />
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

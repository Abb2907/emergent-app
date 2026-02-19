import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { LearningPaths } from './components/LearningPaths';
import { RepoGrid } from './components/RepoGrid';
import { ResourceLibrary } from './components/ResourceLibrary';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { AuthProvider } from './components/contexts/AuthContext';
import { SignInModal } from './components/SignInModal';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen text-white selection:bg-aether-primary selection:text-white flex flex-col">
          <ScrollToTop />
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/paths" element={<LearningPaths />} />
              <Route path="/repos" element={<RepoGrid />} />
              <Route path="/library" element={<ResourceLibrary />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>

          <Footer />
          <SignInModal />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
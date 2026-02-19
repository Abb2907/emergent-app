import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Search, Menu, X, BookOpen, Github, LayoutDashboard, Users, ChevronRight } from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : '/api';

export default function Navbar({ user, setUser, authChecked, setAuthChecked }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check auth on mount
  useEffect(() => {
    if (authChecked) return;
    axios.get(`${API}/auth/me`, { withCredentials: true })
      .then(res => { setUser(res.data); setAuthChecked(true); })
      .catch(() => setAuthChecked(true));
  }, [authChecked, setAuthChecked, setUser]);

  // AI Search
  useEffect(() => {
    if (!searchQ.trim()) { setSearchResults([]); return; }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await axios.get(`${API}/search?q=${encodeURIComponent(searchQ)}&limit=6`);
        setSearchResults(res.data.resources || []);
      } catch { setSearchResults([]); }
      setSearching(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQ]);

  const handleLogin = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + "/dashboard";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  const handleLogout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    setUser(null);
    navigate("/");
  };

  const navLinks = [
    { label: "Resources", path: "/resources", icon: BookOpen },
    { label: "Community", hash: "#community", icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass border-b border-white/5 shadow-2xl" : "bg-transparent"
        }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              data-testid="nav-logo"
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 group"
            >
              <div className="relative w-8 h-8 rounded-lg brand-gradient-bg flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                <span className="text-white font-bold text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>AI</span>
                <div className="absolute inset-0 rounded-lg brand-gradient-bg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-white text-base tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Aether Index
                </span>
                <span className="text-zinc-500 text-xs ml-1">/ AI Foundry</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, path, hash, icon: Icon }) => (
                <button
                  key={label}
                  data-testid={`nav-${label.toLowerCase()}`}
                  onClick={() => path ? navigate(path) : (navigate("/"), setTimeout(() => { const el = document.querySelector(hash); el?.scrollIntoView({ behavior: "smooth" }); }, 100))}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    path && isActive(path)
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                data-testid="nav-search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <Search size={16} />
              </button>

              {/* Auth */}
              {authChecked && (
                user ? (
                  <div className="flex items-center gap-2">
                    <button
                      data-testid="nav-dashboard-btn"
                      onClick={() => navigate("/dashboard")}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium"
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </button>
                    <button
                      data-testid="nav-user-avatar"
                      onClick={() => navigate("/dashboard")}
                      className="w-8 h-8 rounded-full overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-200 flex items-center justify-center bg-gradient-to-br from-blue-500 to-violet-600"
                    >
                      {user.picture ? (
                        <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-xs font-bold">{user.name?.[0] || "U"}</span>
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    data-testid="nav-signin-btn"
                    onClick={handleLogin}
                    className="btn-primary text-sm px-4 py-2 rounded-lg"
                    style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
                  >
                    Sign in with Google
                  </button>
                )
              )}

              {/* Mobile Menu */}
              <button
                data-testid="nav-mobile-menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        {searchOpen && (
          <div className="border-t border-white/5 bg-[#08080f]/90 backdrop-blur-xl">
            <div className="max-w-3xl mx-auto px-5 py-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  data-testid="nav-search-input"
                  autoFocus
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  placeholder="Search AI resources, repos, courses..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                />
                {searching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                )}
              </div>
              {searchResults.length > 0 && (
                <div className="mt-3 space-y-1 max-h-64 overflow-y-auto">
                  {searchResults.map((r) => (
                    <a
                      key={r.resource_id}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`search-result-${r.resource_id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-150 group"
                    >
                      <span className={`text-xs px-2 py-0.5 rounded-full type-${r.type}`}>{r.type}</span>
                      <span className="text-sm text-zinc-300 group-hover:text-white transition-colors truncate flex-1">{r.title}</span>
                      <ChevronRight size={12} className="text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
                    </a>
                  ))}
                  <button
                    onClick={() => { navigate(`/resources?q=${searchQ}`); setSearchOpen(false); }}
                    className="w-full text-center text-xs text-blue-400 hover:text-blue-300 py-2 transition-colors"
                  >
                    View all results for "{searchQ}"
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/5 glass">
            <div className="px-5 py-4 space-y-1">
              {navLinks.map(({ label, path, icon: Icon }) => (
                <button
                  key={label}
                  data-testid={`mobile-nav-${label.toLowerCase()}`}
                  onClick={() => { path && navigate(path); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
              {user ? (
                <>
                  <button onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    <LayoutDashboard size={15} /> Dashboard
                  </button>
                  <button onClick={handleLogout} data-testid="mobile-nav-logout"
                    className="w-full px-3 py-2.5 text-left text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                    Sign out
                  </button>
                </>
              ) : (
                <button onClick={handleLogin} data-testid="mobile-nav-signin"
                  className="w-full btn-primary text-sm mt-2">
                  Sign in with Google
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

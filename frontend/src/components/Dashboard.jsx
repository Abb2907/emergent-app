import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BookmarkCheck, CheckCircle, Trophy, ArrowRight, ExternalLink, Github,
  User, Star, BookOpen, LogOut, Zap
} from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : '/api';

const BADGE_CONFIG = {
  "ML Initiate": { color: "#22c55e", desc: "Completed first resource", icon: "🌱" },
  "Knowledge Seeker": { color: "#3b82f6", desc: "Completed 5 resources", icon: "📚" },
  "Deep Learning Smith": { color: "#8b5cf6", desc: "Completed 15 resources", icon: "⚡" },
  "LLM Architect": { color: "#f59e0b", desc: "Completed 30 resources", icon: "🏗️" },
  "Frontier Explorer": { color: "#ec4899", desc: "Completed 50 resources", icon: "🚀" },
};

const TYPE_LABELS = {
  github: "GitHub", youtube: "YouTube", course: "Course", book: "Book",
  paper: "Paper", newsletter: "Newsletter", article: "Article", guide: "Guide",
  docs: "Docs", whitepaper: "Whitepaper",
};

export default function Dashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookmarks");
  const [bookmarks, setBookmarks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [completedResources, setCompletedResources] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bRes, uRes] = await Promise.all([
        axios.get(`${API}/bookmarks`, { withCredentials: true }),
        axios.get(`${API}/auth/me`, { withCredentials: true }),
      ]);
      setBookmarks(bRes.data.resources || []);
      const completedIds = uRes.data.completed || [];
      setCompleted(completedIds);
      setUser(uRes.data);

      if (completedIds.length > 0) {
        const res = await axios.get(`${API}/resources?limit=100`);
        const all = res.data.resources || [];
        setCompletedResources(all.filter(r => completedIds.includes(r.resource_id)));
      }
    } catch { }
    setLoading(false);
  };

  const handleLogout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    setUser(null);
    navigate("/");
  };

  const removeBookmark = async (resourceId) => {
    setBookmarks(bms => bms.filter(b => b.resource_id !== resourceId));
    await axios.delete(`${API}/bookmarks/${resourceId}`, { withCredentials: true });
  };

  const unmarkComplete = async (resourceId) => {
    setCompleted(c => c.filter(id => id !== resourceId));
    setCompletedResources(cr => cr.filter(r => r.resource_id !== resourceId));
    await axios.delete(`${API}/progress/${resourceId}`, { withCredentials: true });
  };

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16" style={{ background: "#050505" }}>
        <div className="text-center max-w-md px-5">
          <div className="w-16 h-16 rounded-2xl brand-gradient-bg mx-auto mb-5 flex items-center justify-center shadow-xl">
            <User size={28} className="text-white" />
          </div>
          <h2 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Sign in to access your Dashboard
          </h2>
          <p className="text-zinc-500 text-sm mb-6">
            Track your learning progress, save bookmarks, and earn badges as you master AI.
          </p>
          <button
            data-testid="dashboard-signin-btn"
            onClick={() => {
              // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
              const redirectUrl = window.location.origin + "/dashboard";
              window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
            }}
            className="btn-primary"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const badges = user?.badges || [];
  const completedCount = completed.length;
  const bookmarkCount = bookmarks.length;

  const progressPercent = Math.min(100, Math.round((completedCount / 30) * 100));

  return (
    <div className="min-h-screen pt-20 pb-16" style={{ background: "#050505" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Profile Header */}
        <div className="glass-card rounded-2xl p-6 mb-6 relative overflow-hidden"
          style={{ border: "1px solid rgba(59,130,246,0.15)", boxShadow: "0 0 60px -20px rgba(59,130,246,0.15)" }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08), transparent)" }}>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}>
              {user.picture ? (
                <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">
                  {user.name?.[0] || "U"}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-white font-bold text-xl mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {user.name}
              </h1>
              <p className="text-zinc-500 text-sm mb-3">{user.email}</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 text-sm">
                  <BookmarkCheck size={14} className="text-blue-400" />
                  <span className="text-white font-medium">{bookmarkCount}</span>
                  <span className="text-zinc-500">bookmarks</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <CheckCircle size={14} className="text-green-400" />
                  <span className="text-white font-medium">{completedCount}</span>
                  <span className="text-zinc-500">completed</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Trophy size={14} className="text-yellow-400" />
                  <span className="text-white font-medium">{badges.length}</span>
                  <span className="text-zinc-500">badges</span>
                </div>
              </div>
            </div>

            <button
              data-testid="dashboard-logout-btn"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="glass-card rounded-xl p-5 mb-6" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-blue-400" />
              <span className="text-white font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Learning Progress
              </span>
            </div>
            <span className="text-zinc-400 text-sm font-medium">{completedCount} / 30 resources</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%`, background: "linear-gradient(90deg, #3B82F6, #8B5CF6)" }}>
            </div>
          </div>
          <p className="text-zinc-600 text-xs mt-2">
            {completedCount === 0
              ? "Start learning to track your progress"
              : completedCount < 5
              ? "Great start! Keep going to earn your first badge."
              : completedCount < 15
              ? "You're making excellent progress!"
              : "You're an AI expert in the making!"}
          </p>
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="glass-card rounded-xl p-5 mb-6" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={16} className="text-yellow-400" />
              <span className="text-white font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Badges Earned
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {badges.map(badge => {
                const cfg = BADGE_CONFIG[badge] || {};
                return (
                  <div key={badge} data-testid={`badge-${badge.toLowerCase().replace(/\s/g, "-")}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                    style={{ background: `${cfg.color}15`, border: `1px solid ${cfg.color}30`, color: cfg.color }}>
                    <span>{cfg.icon || "🏅"}</span>
                    <span className="font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{badge}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-6"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", width: "fit-content" }}>
          {[
            { key: "bookmarks", label: "Bookmarks", count: bookmarkCount },
            { key: "completed", label: "Completed", count: completedCount },
          ].map(({ key, label, count }) => (
            <button key={key} data-testid={`dashboard-tab-${key}`}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === key ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}>
              {label}
              {count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === key ? "bg-white/20 text-white" : "bg-white/10 text-zinc-400"}`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="glass-card rounded-xl h-44 shimmer-loading"></div>
            ))}
          </div>
        ) : (
          <>
            {activeTab === "bookmarks" && (
              bookmarks.length === 0 ? (
                <div className="text-center py-16">
                  <BookmarkCheck size={40} className="mx-auto text-zinc-700 mb-4" />
                  <p className="text-zinc-400 font-medium mb-2">No bookmarks yet</p>
                  <p className="text-zinc-600 text-sm mb-5">Save resources to access them quickly from here.</p>
                  <button data-testid="dashboard-browse-btn" onClick={() => navigate("/resources")}
                    className="btn-primary text-sm" style={{ padding: "0.6rem 1.25rem" }}>
                    Browse Resources
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bookmarks.map(r => (
                    <div key={r.resource_id} data-testid={`bookmark-item-${r.resource_id}`}
                      className="glass-card rounded-xl p-5 card-hover relative overflow-hidden">
                      <div className="flex items-start justify-between mb-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full type-${r.type}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {TYPE_LABELS[r.type] || r.type}
                        </span>
                        <button onClick={() => removeBookmark(r.resource_id)} data-testid={`remove-bookmark-${r.resource_id}`}
                          className="p-1 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                          <BookmarkCheck size={13} />
                        </button>
                      </div>
                      <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{r.title}</h3>
                      <p className="text-zinc-500 text-xs line-clamp-2 mb-4">{r.description}</p>
                      <a href={r.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                        {r.type === "github" ? <Github size={11} /> : <ExternalLink size={11} />}
                        {r.type === "github" ? "View on GitHub" : "Open Resource"}
                      </a>
                    </div>
                  ))}
                </div>
              )
            )}

            {activeTab === "completed" && (
              completedResources.length === 0 ? (
                <div className="text-center py-16">
                  <CheckCircle size={40} className="mx-auto text-zinc-700 mb-4" />
                  <p className="text-zinc-400 font-medium mb-2">No completed resources yet</p>
                  <p className="text-zinc-600 text-sm mb-5">Mark resources as complete to track your progress and earn badges.</p>
                  <button onClick={() => navigate("/resources")} className="btn-primary text-sm" style={{ padding: "0.6rem 1.25rem" }}>
                    Start Learning
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedResources.map(r => (
                    <div key={r.resource_id} data-testid={`completed-item-${r.resource_id}`}
                      className="glass-card rounded-xl p-5 card-hover relative overflow-hidden">
                      <div className="flex items-start justify-between mb-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full type-${r.type}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {TYPE_LABELS[r.type] || r.type}
                        </span>
                        <button onClick={() => unmarkComplete(r.resource_id)} data-testid={`unmark-complete-${r.resource_id}`}
                          className="p-1 rounded-lg text-green-500 hover:text-zinc-400 hover:bg-white/5 transition-all">
                          <CheckCircle size={13} />
                        </button>
                      </div>
                      <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{r.title}</h3>
                      <p className="text-zinc-500 text-xs line-clamp-2 mb-4">{r.description}</p>
                      <a href={r.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                        {r.type === "github" ? <Github size={11} /> : <ExternalLink size={11} />}
                        {r.type === "github" ? "View on GitHub" : "Open Resource"}
                      </a>
                    </div>
                  ))}
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}

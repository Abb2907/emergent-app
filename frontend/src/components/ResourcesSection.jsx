import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ExternalLink, Github, Star, BookOpen, BookmarkPlus, BookmarkCheck, ArrowRight, PlayCircle, FileText, Newspaper } from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : '/api';

const TAB_CONFIG = [
  { key: "all", label: "All" },
  { key: "github", label: "GitHub", icon: Github },
  { key: "youtube", label: "YouTube", icon: PlayCircle },
  { key: "course", label: "Courses", icon: BookOpen },
  { key: "paper", label: "Papers", icon: FileText },
  { key: "book", label: "Books", icon: BookOpen },
  { key: "newsletter", label: "Newsletters", icon: Newspaper },
];

const TYPE_LABELS = {
  github: "GitHub", youtube: "YouTube", course: "Course", book: "Book",
  paper: "Paper", newsletter: "Newsletter", article: "Article", guide: "Guide",
  docs: "Docs", whitepaper: "Whitepaper", resource: "Resource",
};

function ResourceCard({ resource, user, onBookmark, bookmarks }) {
  const isBookmarked = bookmarks.includes(resource.resource_id);

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    onBookmark(resource.resource_id, isBookmarked);
  };

  const formatStars = (n) => {
    if (!n) return null;
    if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
    return n;
  };

  return (
    <div
      data-testid={`resource-card-${resource.resource_id}`}
      className="glass-card rounded-xl p-5 card-hover flex flex-col h-full relative overflow-hidden group"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(59,130,246,0.05), transparent 60%)" }}>
      </div>

      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium type-${resource.type}`}
            style={{ fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>
            {TYPE_LABELS[resource.type] || resource.type}
          </span>
          {resource.stars > 0 && (
            <span className="flex items-center gap-1 text-xs text-yellow-500/80">
              <Star size={11} fill="currentColor" />
              {formatStars(resource.stars)}
            </span>
          )}
        </div>
        <button
          data-testid={`bookmark-btn-${resource.resource_id}`}
          onClick={handleBookmark}
          className={`p-1.5 rounded-lg transition-all duration-200 flex-shrink-0 ${
            isBookmarked
              ? "text-blue-400 bg-blue-500/10"
              : "text-zinc-600 hover:text-zinc-400 hover:bg-white/5"
          } ${!user ? "opacity-30 cursor-default" : ""}`}
          title={user ? (isBookmarked ? "Remove bookmark" : "Add bookmark") : "Sign in to bookmark"}
        >
          {isBookmarked ? <BookmarkCheck size={15} /> : <BookmarkPlus size={15} />}
        </button>
      </div>

      {/* Title */}
      <h3
        className="font-semibold text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-200"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {resource.title}
      </h3>

      {/* Description */}
      <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 flex-1 mb-3">
        {resource.description}
      </p>

      {/* Tags */}
      {resource.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {resource.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
        <span className="text-xs text-zinc-600">{resource.category}</span>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`resource-link-${resource.resource_id}`}
          onClick={e => e.stopPropagation()}
          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors duration-150 font-medium"
        >
          {resource.type === "github" ? <Github size={12} /> : <ExternalLink size={12} />}
          {resource.type === "github" ? "View on GitHub" : "Open"}
        </a>
      </div>
    </div>
  );
}

export default function ResourcesSection({ user }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  const fetchResources = useCallback(async (type) => {
    setLoading(true);
    try {
      const params = type !== "all" ? `?type=${type}&limit=12` : "?limit=12";
      const res = await axios.get(`${API}/resources${params}`);
      setResources(res.data.resources || []);
    } catch { setResources([]); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchResources(activeTab); }, [activeTab, fetchResources]);

  useEffect(() => {
    if (!user) return;
    axios.get(`${API}/bookmarks`, { withCredentials: true })
      .then(res => setBookmarks((res.data.resources || []).map(r => r.resource_id)))
      .catch(() => {});
  }, [user]);

  const handleBookmark = async (resourceId, isBookmarked) => {
    if (!user) return;
    const prev = [...bookmarks];
    setBookmarks(isBookmarked ? bookmarks.filter(b => b !== resourceId) : [...bookmarks, resourceId]);
    try {
      if (isBookmarked) {
        await axios.delete(`${API}/bookmarks/${resourceId}`, { withCredentials: true });
      } else {
        await axios.post(`${API}/bookmarks/${resourceId}`, {}, { withCredentials: true });
      }
    } catch { setBookmarks(prev); }
  };

  return (
    <section id="resources" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full bg-blue-600/6 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", color: "#93C5FD", fontSize: "0.75rem", fontWeight: 500 }}>
              Curated Resources
            </div>
            <h2 className="section-title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
              Your AI Learning <span className="brand-gradient-text">Library</span>
            </h2>
            <p className="section-subtitle mt-2">200+ curated resources spanning GitHub repos, courses, books, and research papers.</p>
          </div>
          <button
            data-testid="resources-view-all-btn"
            onClick={() => navigate("/resources")}
            className="btn-secondary flex items-center gap-2 whitespace-nowrap self-start sm:self-auto"
          >
            View All <ArrowRight size={15} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-8 overflow-x-auto"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {TAB_CONFIG.map(({ key, label }) => (
            <button
              key={key}
              data-testid={`resources-tab-${key}`}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === key
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="glass-card rounded-xl h-52 shimmer-loading"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {resources.map((r) => (
              <ResourceCard
                key={r.resource_id}
                resource={r}
                user={user}
                bookmarks={bookmarks}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
        )}

        {!loading && resources.length === 0 && (
          <div className="text-center py-16 text-zinc-600">No resources found for this category.</div>
        )}
      </div>
    </section>
  );
}

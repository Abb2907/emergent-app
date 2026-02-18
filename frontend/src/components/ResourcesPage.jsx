import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Search, Github, ExternalLink, Star, BookmarkPlus, BookmarkCheck,
  Filter, X, SlidersHorizontal, ArrowRight, PlayCircle, FileText,
  BookOpen, Newspaper, ChevronDown
} from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TYPE_CONFIG = [
  { key: "all", label: "All Resources" },
  { key: "github", label: "GitHub", icon: Github },
  { key: "youtube", label: "YouTube", icon: PlayCircle },
  { key: "course", label: "Courses", icon: BookOpen },
  { key: "paper", label: "Papers", icon: FileText },
  { key: "book", label: "Books", icon: BookOpen },
  { key: "newsletter", label: "Newsletter", icon: Newspaper },
  { key: "article", label: "Articles", icon: FileText },
  { key: "guide", label: "Guides", icon: BookOpen },
];

const TYPE_LABELS = {
  github: "GitHub", youtube: "YouTube", course: "Course", book: "Book",
  paper: "Paper", newsletter: "Newsletter", article: "Article", guide: "Guide",
  docs: "Docs", whitepaper: "Whitepaper", resource: "Resource",
};

const CATEGORIES_QUICK = [
  "Foundations", "Agentic AI", "LLM Foundations", "RAG", "MLOps", "Deep Learning",
  "Machine Learning", "Prompt Engineering", "Computer Vision", "Reinforcement Learning",
  "Infrastructure", "Multi-Agent"
];

function ResourceCard({ resource, user, bookmarks, onBookmark }) {
  const isBookmarked = bookmarks.includes(resource.resource_id);

  const formatStars = (n) => {
    if (!n || n === 0) return null;
    if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
    return String(n);
  };

  return (
    <div
      data-testid={`resource-page-card-${resource.resource_id}`}
      className="glass-card rounded-xl p-5 card-hover flex flex-col h-full relative overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(59,130,246,0.04), transparent 60%)" }}>
      </div>

      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium type-${resource.type}`}
            style={{ fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>
            {TYPE_LABELS[resource.type] || resource.type}
          </span>
          {resource.stars > 0 && (
            <span className="flex items-center gap-1 text-xs text-yellow-500/80">
              <Star size={10} fill="currentColor" />
              {formatStars(resource.stars)}
            </span>
          )}
        </div>
        <button
          data-testid={`page-bookmark-${resource.resource_id}`}
          onClick={() => user && onBookmark(resource.resource_id, isBookmarked)}
          className={`p-1.5 rounded-lg transition-all duration-200 flex-shrink-0 ${
            isBookmarked ? "text-blue-400 bg-blue-500/10" : "text-zinc-600 hover:text-zinc-400 hover:bg-white/5"
          } ${!user ? "opacity-30 cursor-default" : ""}`}
          title={user ? (isBookmarked ? "Remove bookmark" : "Add bookmark") : "Sign in to bookmark"}
        >
          {isBookmarked ? <BookmarkCheck size={14} /> : <BookmarkPlus size={14} />}
        </button>
      </div>

      <h3 className="font-semibold text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {resource.title}
      </h3>

      <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3 flex-1 mb-3">
        {resource.description}
      </p>

      {resource.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {resource.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="text-xs text-zinc-600 truncate mr-2">{resource.category}</span>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`page-resource-link-${resource.resource_id}`}
          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium whitespace-nowrap"
        >
          {resource.type === "github" ? <Github size={11} /> : <ExternalLink size={11} />}
          {resource.type === "github" ? "GitHub" : "Open"}
        </a>
      </div>
    </div>
  );
}

export default function ResourcesPage({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse URL params
  const urlParams = new URLSearchParams(location.search);
  const initialType = urlParams.get("type") || "all";
  const initialLevel = urlParams.get("level") || "";
  const initialQ = urlParams.get("q") || "";

  const [activeType, setActiveType] = useState(initialType);
  const [searchQ, setSearchQ] = useState(initialQ);
  const [inputVal, setInputVal] = useState(initialQ);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(!!initialQ);
  const [searchKeywords, setSearchKeywords] = useState([]);
  const LIMIT = 24;

  // Fetch bookmarks
  useEffect(() => {
    if (!user) return;
    axios.get(`${API}/bookmarks`, { withCredentials: true })
      .then(res => setBookmarks((res.data.resources || []).map(r => r.resource_id)))
      .catch(() => {});
  }, [user]);

  // Fetch resources
  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      if (searchQ.trim()) {
        res = await axios.get(`${API}/search?q=${encodeURIComponent(searchQ)}&limit=${LIMIT}`);
        setSearchKeywords(res.data.keywords || []);
        setResources(res.data.resources || []);
        setTotal(res.data.total || 0);
        setIsSearchMode(true);
      } else {
        const params = new URLSearchParams();
        if (activeType !== "all") params.set("type", activeType);
        if (selectedLevel) params.set("level", selectedLevel);
        if (selectedCategory) params.set("category", selectedCategory);
        params.set("limit", LIMIT);
        params.set("skip", page * LIMIT);
        res = await axios.get(`${API}/resources?${params}`);
        setResources(res.data.resources || []);
        setTotal(res.data.total || 0);
        setIsSearchMode(false);
      }
    } catch { setResources([]); setTotal(0); }
    setLoading(false);
  }, [activeType, searchQ, selectedLevel, selectedCategory, page]);

  useEffect(() => { fetchResources(); }, [fetchResources]);

  const handleBookmark = async (resourceId, isBookmarked) => {
    if (!user) return;
    const prev = [...bookmarks];
    setBookmarks(isBookmarked ? bookmarks.filter(b => b !== resourceId) : [...bookmarks, resourceId]);
    try {
      if (isBookmarked) await axios.delete(`${API}/bookmarks/${resourceId}`, { withCredentials: true });
      else await axios.post(`${API}/bookmarks/${resourceId}`, {}, { withCredentials: true });
    } catch { setBookmarks(prev); }
  };

  const clearSearch = () => {
    setInputVal(""); setSearchQ(""); setIsSearchMode(false); setSearchKeywords([]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQ(inputVal);
    setPage(0);
  };

  return (
    <div className="min-h-screen pt-20" style={{ background: "#050505" }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-white font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
            AI Resource <span className="brand-gradient-text">Explorer</span>
          </h1>
          <p className="text-zinc-500 text-sm">
            {total > 0 ? `${total} curated resources` : "Curated AI learning resources"} — GitHub repos, courses, books, papers & more
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative mb-6">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            <input
              data-testid="resource-search-input"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="AI-powered search — try 'build an LLM agent' or 'RAG for production'..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-24 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {inputVal && (
                <button type="button" onClick={clearSearch}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all">
                  <X size={14} />
                </button>
              )}
              <button type="submit" data-testid="resource-search-submit"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all"
                style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}>
                Search
              </button>
            </div>
          </div>
        </form>

        {/* AI Search Keywords display */}
        {isSearchMode && searchKeywords.length > 0 && (
          <div className="flex items-center gap-2 mb-4 text-xs text-zinc-500">
            <span>AI expanded:</span>
            {searchKeywords.map(kw => (
              <span key={kw} className="tag-chip">{kw}</span>
            ))}
          </div>
        )}

        {/* Type tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-4 overflow-x-auto"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
          {TYPE_CONFIG.map(({ key, label }) => (
            <button
              key={key}
              data-testid={`type-tab-${key}`}
              onClick={() => { setActiveType(key); setPage(0); clearSearch(); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                activeType === key && !isSearchMode
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Filter toggle + chips */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            data-testid="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              showFilters || selectedLevel || selectedCategory
                ? "bg-blue-600/20 border border-blue-500/30 text-blue-400"
                : "border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
            }`}
          >
            <SlidersHorizontal size={13} />
            Filters
            {(selectedLevel || selectedCategory) && (
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                {[selectedLevel, selectedCategory].filter(Boolean).length}
              </span>
            )}
            <ChevronDown size={12} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>

          {selectedLevel && (
            <button data-testid="filter-clear-level" onClick={() => setSelectedLevel("")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all level-beginner">
              Level: {selectedLevel} <X size={11} />
            </button>
          )}
          {selectedCategory && (
            <button data-testid="filter-clear-category" onClick={() => setSelectedCategory("")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs tag-chip">
              {selectedCategory} <X size={11} />
            </button>
          )}
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="glass-card rounded-xl p-5 mb-6" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Level filter */}
              <div>
                <p className="text-zinc-400 text-xs font-medium mb-3">Level</p>
                <div className="flex flex-wrap gap-2">
                  {["Beginner", "Intermediate", "Advanced", "Frontier"].map(level => (
                    <button
                      key={level}
                      data-testid={`filter-level-${level.toLowerCase()}`}
                      onClick={() => { setSelectedLevel(selectedLevel === level ? "" : level); setPage(0); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        selectedLevel === level
                          ? `level-${level.toLowerCase()}`
                          : "border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category filter */}
              <div>
                <p className="text-zinc-400 text-xs font-medium mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES_QUICK.map(cat => (
                    <button
                      key={cat}
                      data-testid={`filter-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => { setSelectedCategory(selectedCategory === cat ? "" : cat); setPage(0); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-blue-600/20 border border-blue-500/30 text-blue-400"
                          : "border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-zinc-500 text-sm">
            {isSearchMode ? (
              <>Showing <span className="text-white font-medium">{resources.length}</span> results for "<span className="text-blue-400">{searchQ}</span>"</>
            ) : (
              <><span className="text-white font-medium">{total}</span> resources {activeType !== "all" ? `(${activeType})` : ""}</>
            )}
          </p>
          {(selectedLevel || selectedCategory) && (
            <button onClick={() => { setSelectedLevel(""); setSelectedCategory(""); }}
              className="text-xs text-zinc-500 hover:text-white transition-colors">
              Clear all filters
            </button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="glass-card rounded-xl h-52 shimmer-loading"></div>
            ))}
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-zinc-400 font-medium mb-2">No resources found</p>
            <p className="text-zinc-600 text-sm">Try a different search term or adjust your filters</p>
            <button onClick={() => { clearSearch(); setSelectedLevel(""); setSelectedCategory(""); setActiveType("all"); }}
              className="btn-secondary mt-4 text-sm" style={{ padding: "0.5rem 1rem" }}>
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {resources.map(r => (
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

        {/* Pagination */}
        {!isSearchMode && total > LIMIT && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              data-testid="pagination-prev"
              disabled={page === 0}
              onClick={() => setPage(p => Math.max(0, p - 1))}
              className="btn-secondary text-sm disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ padding: "0.5rem 1rem" }}
            >
              Previous
            </button>
            <span className="text-zinc-500 text-sm">
              Page {page + 1} of {Math.ceil(total / LIMIT)}
            </span>
            <button
              data-testid="pagination-next"
              disabled={(page + 1) * LIMIT >= total}
              onClick={() => setPage(p => p + 1)}
              className="btn-secondary text-sm disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ padding: "0.5rem 1rem" }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

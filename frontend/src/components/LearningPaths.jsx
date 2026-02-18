import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ArrowRight, BookOpen, Brain, Cpu, Telescope } from "lucide-react";

const PATHS = [
  {
    id: "beginner",
    level: "Beginner",
    icon: BookOpen,
    color: "#22c55e",
    gradient: "from-green-500/20 to-green-600/5",
    border: "border-green-500/20",
    glow: "rgba(34, 197, 94, 0.15)",
    tagColor: "level-beginner",
    duration: "4–8 weeks",
    topics: ["Python Programming", "Math for ML", "Linear Algebra", "Statistics", "Core ML Concepts", "Scikit-learn Basics"],
    description: "Start from zero and build a solid foundation in Python, mathematics, and classical machine learning.",
    resources: 45,
  },
  {
    id: "intermediate",
    level: "Intermediate",
    icon: Brain,
    color: "#3b82f6",
    gradient: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/20",
    glow: "rgba(59, 130, 246, 0.15)",
    tagColor: "level-intermediate",
    duration: "8–16 weeks",
    topics: ["Deep Learning", "PyTorch / TensorFlow", "Transformers & BERT", "Computer Vision", "NLP Foundations", "Prompt Engineering"],
    description: "Dive into deep learning, neural networks, and the transformer architecture powering modern AI.",
    resources: 60,
  },
  {
    id: "advanced",
    level: "Advanced",
    icon: Cpu,
    color: "#8b5cf6",
    gradient: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/20",
    glow: "rgba(139, 92, 246, 0.15)",
    tagColor: "level-advanced",
    duration: "12–24 weeks",
    topics: ["LLMs & Fine-tuning", "RAG Systems", "AI Agents", "Multi-Agent Systems", "MLOps & Deployment", "Vector Databases"],
    description: "Master large language models, retrieval-augmented generation, and building intelligent agents.",
    resources: 80,
  },
  {
    id: "frontier",
    level: "Frontier",
    icon: Telescope,
    color: "#eab308",
    gradient: "from-yellow-500/20 to-yellow-600/5",
    border: "border-yellow-500/20",
    glow: "rgba(234, 179, 8, 0.15)",
    tagColor: "level-frontier",
    duration: "Ongoing",
    topics: ["Research Papers", "Scaling Laws", "Multimodal Systems", "RLHF & Alignment", "Systems Architecture", "State-of-the-Art Models"],
    description: "Engage with cutting-edge research, scaling laws, and the systems behind frontier AI models.",
    resources: 30,
  },
];

export default function LearningPaths() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="learning-paths" className="py-28 relative overflow-hidden">
      {/* Section BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-violet-600/5 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6"
            style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "#c4b5fd", fontSize: "0.75rem", fontWeight: 500 }}>
            Smart Learning Paths
          </div>
          <h2 className="section-title mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
            Your Road to <span className="brand-gradient-text">AI Mastery</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Structured paths from Python fundamentals to frontier research. Pick your level and start building.
          </p>
        </div>

        {/* Path Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PATHS.map((path) => {
            const Icon = path.icon;
            const isExpanded = expanded === path.id;
            return (
              <div
                key={path.id}
                data-testid={`path-card-${path.id}`}
                className={`glass-card rounded-2xl overflow-hidden card-hover cursor-pointer border ${path.border} transition-all duration-300`}
                style={{ boxShadow: isExpanded ? `0 0 60px -10px ${path.glow}` : "none" }}
                onClick={() => setExpanded(isExpanded ? null : path.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${path.gradient} pointer-events-none`}></div>

                <div className="relative p-6">
                  {/* Card header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: `${path.color}20`, border: `1px solid ${path.color}30` }}>
                        <Icon size={20} style={{ color: path.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {path.level}
                        </h3>
                        <span className="text-xs" style={{ color: path.color }}>{path.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${path.tagColor}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {path.resources} resources
                      </span>
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-zinc-500" />
                      ) : (
                        <ChevronDown size={16} className="text-zinc-500" />
                      )}
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">{path.description}</p>

                  {/* Topic chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {path.topics.slice(0, isExpanded ? path.topics.length : 3).map((topic) => (
                      <span key={topic} className="tag-chip">{topic}</span>
                    ))}
                    {!isExpanded && path.topics.length > 3 && (
                      <span className="tag-chip" style={{ opacity: 0.6 }}>+{path.topics.length - 3} more</span>
                    )}
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-xs text-zinc-500 mb-3">All topics in this path:</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {path.topics.map((topic) => (
                          <span key={topic} className="tag-chip">{topic}</span>
                        ))}
                      </div>
                      <button
                        data-testid={`path-start-${path.id}`}
                        onClick={(e) => { e.stopPropagation(); navigate(`/resources?level=${path.level}`); }}
                        className="btn-primary text-sm flex items-center gap-2"
                        style={{ padding: "0.6rem 1.25rem" }}
                      >
                        Explore {path.level} Resources
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button
            data-testid="paths-explore-all-btn"
            onClick={() => navigate("/resources")}
            className="btn-secondary flex items-center gap-2 mx-auto"
          >
            Browse All Resources
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

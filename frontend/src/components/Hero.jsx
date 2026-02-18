import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRight, Github, Star, Zap } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Hero() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 200, github: 65, courses: 50, papers: 8 });

  useEffect(() => {
    axios.get(`${API}/resources/stats`).then(res => {
      if (res.data) setStats({
        total: res.data.total || 200,
        github: res.data.github || 65,
        courses: res.data.courses || 50,
        papers: res.data.papers || 8,
      });
    }).catch(() => {});
  }, []);

  const STAT_ITEMS = [
    { value: `${stats.github}+`, label: "GitHub Repos", icon: Github },
    { value: `${stats.total}+`, label: "Resources", icon: Zap },
    { value: `${stats.courses}+`, label: "Courses", icon: Star },
    { value: `${stats.papers}+`, label: "Papers", icon: ArrowRight },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[100px] animate-float"></div>
        <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-[100px] animate-float2"></div>
        <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] rounded-full bg-cyan-600/10 blur-[100px] animate-float3"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 animate-fade-in"
          style={{
            background: "rgba(59, 130, 246, 0.08)",
            border: "1px solid rgba(59, 130, 246, 0.25)",
            color: "#93C5FD",
            fontSize: "0.8rem",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-glow"></span>
          The Ultimate AI Learning Foundry
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-glow"></span>
        </div>

        {/* Main heading */}
        <h1
          className="font-bold tracking-tight text-white mb-4 animate-fade-in-up"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            lineHeight: 1.1,
          }}
        >
          Forge Your{" "}
          <span className="brand-gradient-text">Intelligence.</span>
        </h1>

        <h2
          className="animate-fade-in-up stagger-1 text-white font-semibold mb-5"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            lineHeight: 1.3,
            opacity: 0,
          }}
        >
          Master Artificial Intelligence.
        </h2>

        {/* Subtext */}
        <p
          className="animate-fade-in-up stagger-2 max-w-2xl mx-auto mb-10"
          style={{
            color: "#94A3B8",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            lineHeight: 1.7,
            opacity: 0,
          }}
        >
          A curated AI learning index from{" "}
          <span className="text-blue-400 font-medium">beginner to frontier research</span>.
          {" "}GitHub repos, YouTube courses, books, papers — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up stagger-3" style={{ opacity: 0 }}>
          <button
            data-testid="hero-explore-btn"
            onClick={() => navigate("/resources")}
            className="btn-primary flex items-center justify-center gap-2 group"
          >
            Explore Resources
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <button
            data-testid="hero-paths-btn"
            onClick={() => {
              const el = document.getElementById("learning-paths");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <Zap size={16} className="text-violet-400" />
            Start Learning Path
          </button>
        </div>

        {/* Stats Row */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto animate-fade-in-up stagger-4"
          style={{ opacity: 0 }}
        >
          {STAT_ITEMS.map(({ value, label, icon: Icon }, i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-4 text-center card-hover"
              data-testid={`hero-stat-${i}`}
            >
              <div
                className="text-2xl font-bold brand-gradient-text mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {value}
              </div>
              <div className="text-zinc-500 text-xs">{label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-fade-in stagger-5" style={{ opacity: 0 }}>
          <div className="flex flex-col items-center gap-1 text-zinc-600">
            <span className="text-xs">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-1 h-2 rounded-full bg-zinc-600 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, #050505, transparent)" }}>
      </div>
    </section>
  );
}

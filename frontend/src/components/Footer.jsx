import { useNavigate } from "react-router-dom";
import { Github, Linkedin, Twitter, ExternalLink, MessageSquare } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Learn",
    links: [
      { label: "All Resources", path: "/resources" },
      { label: "GitHub Repos", path: "/resources?type=github" },
      { label: "Courses", path: "/resources?type=course" },
      { label: "Research Papers", path: "/resources?type=paper" },
    ],
  },
  {
    title: "Paths",
    links: [
      { label: "Beginner Path", path: "/resources?level=Beginner" },
      { label: "Intermediate", path: "/resources?level=Intermediate" },
      { label: "Advanced", path: "/resources?level=Advanced" },
      { label: "Frontier", path: "/resources?level=Frontier" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "https://discord.gg/aPNRFYWA" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/abhisek-padhy-67b5b4168/" },
      { label: "Twitter / X", href: "https://twitter.com/abisempire1233" },
    ],
  },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative overflow-hidden pt-16 pb-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.04), transparent 60%)" }}>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg brand-gradient-bg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>AI</span>
              </div>
              <span className="font-bold text-white text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Aether Index
              </span>
            </button>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-5">
              The Ultimate AI Foundry — a curated learning ecosystem for mastering AI from zero to frontier.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a href="https://discord.gg/aPNRFYWA" target="_blank" rel="noopener noreferrer" data-testid="footer-discord"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <MessageSquare size={15} />
              </a>
              <a href="https://www.linkedin.com/in/abhisek-padhy-67b5b4168/" target="_blank" rel="noopener noreferrer" data-testid="footer-linkedin"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <Linkedin size={15} />
              </a>
              <a href="https://twitter.com/abisempire1233" target="_blank" rel="noopener noreferrer" data-testid="footer-twitter"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, path, href }) => (
                  <li key={label}>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white text-sm transition-colors duration-150 flex items-center gap-1">
                        {label} <ExternalLink size={10} className="opacity-50" />
                      </a>
                    ) : (
                      <button onClick={() => navigate(path)}
                        className="text-zinc-500 hover:text-white text-sm transition-colors duration-150 text-left">
                        {label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}></div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} Aether Index. Built for AI learners everywhere.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-zinc-600 text-xs">200+ curated resources</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

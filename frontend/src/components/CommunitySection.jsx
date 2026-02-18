import { ExternalLink, Linkedin, Twitter, MessageSquare, ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export default function CommunitySection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <>
      {/* ===== COMMUNITY SECTION ===== */}
      <section id="community" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-violet-600/8 blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6"
              style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "#c4b5fd", fontSize: "0.75rem", fontWeight: 500 }}>
              Community
            </div>
            <h2 className="section-title" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
              Join the <span className="brand-gradient-text">AI Community</span>
            </h2>
            <p className="section-subtitle mt-2 max-w-lg mx-auto">
              Connect with AI learners and builders. Share projects, get help, and grow together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Discord Card — Main */}
            <div
              data-testid="discord-card"
              className="lg:col-span-2 glass-card rounded-2xl p-8 relative overflow-hidden card-hover"
              style={{
                border: "1px solid rgba(88, 101, 242, 0.3)",
                boxShadow: "0 0 80px -20px rgba(88, 101, 242, 0.2)",
              }}
            >
              {/* BG decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(88,101,242,0.15), transparent)" }}>
              </div>
              <div className="absolute bottom-0 left-0 w-64 h-32 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.1), transparent)" }}>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(88,101,242,0.15)", border: "1px solid rgba(88,101,242,0.3)" }}>
                    <MessageSquare size={22} style={{ color: "#7289DA" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Aether Discord
                    </h3>
                    <p className="text-zinc-500 text-sm">Join the AI Foundry community</p>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-md">
                  Discuss the latest AI research, share your projects, find collaborators, and get help from fellow AI builders.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {["AI Discussions", "Project Showcase", "Paper Reviews", "Job Board", "Help & Support"].map(tag => (
                    <span key={tag} className="tag-chip">{tag}</span>
                  ))}
                </div>

                <a
                  href="https://discord.gg/aPNRFYWA"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="discord-join-btn"
                  className="btn-primary inline-flex items-center gap-2 no-underline"
                  style={{ textDecoration: "none" }}
                >
                  Join Discord Community
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <a
                href="https://www.linkedin.com/in/abhisek-padhy-67b5b4168/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="linkedin-link"
                className="glass-card rounded-xl p-5 card-hover flex items-center gap-4 no-underline group"
                style={{ border: "1px solid rgba(10,102,194,0.2)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(10,102,194,0.12)", border: "1px solid rgba(10,102,194,0.2)" }}>
                  <Linkedin size={18} style={{ color: "#0A66C2" }} />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm group-hover:text-blue-300 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    LinkedIn
                  </div>
                  <div className="text-zinc-500 text-xs">Connect with the founder</div>
                </div>
                <ExternalLink size={13} className="ml-auto text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </a>

              <a
                href="https://twitter.com/abisempire1233"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="twitter-link"
                className="glass-card rounded-xl p-5 card-hover flex items-center gap-4 no-underline group"
                style={{ border: "1px solid rgba(29,161,242,0.2)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(29,161,242,0.12)", border: "1px solid rgba(29,161,242,0.2)" }}>
                  <Twitter size={18} style={{ color: "#1DA1F2" }} />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm group-hover:text-sky-300 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Twitter / X
                  </div>
                  <div className="text-zinc-500 text-xs">Follow for AI updates</div>
                </div>
                <ExternalLink size={13} className="ml-auto text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </a>

              <div className="glass-card rounded-xl p-5 flex-1"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-sm font-semibold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Badges to earn
                </div>
                <div className="space-y-2 mt-3">
                  {[
                    { badge: "ML Initiate", req: "Complete 1 resource", color: "#22c55e" },
                    { badge: "Deep Learning Smith", req: "Complete 15 resources", color: "#3b82f6" },
                    { badge: "LLM Architect", req: "Complete 30 resources", color: "#8b5cf6" },
                  ].map(({ badge, req, color }) => (
                    <div key={badge} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }}></div>
                      <div>
                        <span className="text-xs text-white font-medium">{badge}</span>
                        <span className="text-xs text-zinc-600 ml-2">{req}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER CTA ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.08), transparent 70%)" }}>
        </div>

        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6"
            style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", color: "#67e8f9", fontSize: "0.75rem", fontWeight: 500 }}>
            <Mail size={12} />
            Stay Updated
          </div>
          <h2 className="section-title mb-4" style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
            Stay Ahead of the Curve
          </h2>
          <p className="section-subtitle mb-8">
            Get weekly curated AI resources, paper summaries, and tool spotlights delivered to your inbox.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-green-400"
              style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
              Subscribed! Welcome to the community.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                data-testid="newsletter-email-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all animate-border-glow"
              />
              <button
                data-testid="newsletter-subscribe-btn"
                type="submit"
                className="btn-primary whitespace-nowrap"
                style={{ padding: "0.75rem 1.5rem", background: "linear-gradient(135deg, #06B6D4, #3B82F6)" }}
              >
                Subscribe Free
              </button>
            </form>
          )}
          <p className="text-zinc-600 text-xs mt-4">No spam, ever. Unsubscribe any time.</p>
        </div>
      </section>
    </>
  );
}

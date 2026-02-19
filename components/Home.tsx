import React from 'react';
import { Hero } from './Hero';
import { NewsletterCTA } from './NewsletterCTA';
import { Brain, Bot, Network, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      
      {/* Features Section */}
      <section className="py-32 bg-aether-dark relative">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-20">
              <div className="max-w-2xl">
                 <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                    Unlimited Access To <br/>
                    <span className="text-gray-500">Frontier Knowledge.</span>
                 </h2>
                 <p className="text-lg text-gray-400">
                    We curate the noise so you can focus on the signal. A complete ecosystem for the modern AI engineer.
                 </p>
              </div>
              <Link to="/paths" className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-medium">
                 View All Paths <ArrowRight size={18} />
              </Link>
           </div>

           {/* Feature Cards - Modern */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors group">
                 <div className="w-16 h-16 rounded-2xl bg-aether-primary/10 text-aether-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Brain size={32} />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 font-display">Curated Intelligence</h3>
                 <p className="text-gray-400 leading-relaxed">
                    Stop drowning in tutorials. We filter thousands of resources to bring you only the high-impact papers, repos, and courses.
                 </p>
              </div>

              {/* Card 2 */}
              <div className="p-10 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 group">
                 <div className="w-16 h-16 rounded-2xl bg-aether-secondary/10 text-aether-secondary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Bot size={32} />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 font-display">Agentic First</h3>
                 <p className="text-gray-400 leading-relaxed">
                    The future is autonomous. Our curriculum is heavily weighted towards Agentic patterns, MCP, and Multi-Agent orchestration.
                 </p>
              </div>

              {/* Card 3 */}
              <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors group">
                 <div className="w-16 h-16 rounded-2xl bg-aether-accent/10 text-aether-accent flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Network size={32} />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 font-display">Structured Mastery</h3>
                 <p className="text-gray-400 leading-relaxed">
                    Don't learn randomly. Follow our 'Initiate to Oracle' learning paths designed to build foundational strength.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Vision Section - Redesigned as a Content Block */}
      <section className="py-32 border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                 <div className="aspect-square rounded-[3rem] overflow-hidden relative z-10">
                    <img 
                       src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop" 
                       alt="Vision"
                       className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                    />
                 </div>
                 {/* Decorative elements behind */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-aether-primary/20 blur-[100px] -z-10" />
              </div>
              
              <div>
                 <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                    The Forge for the <span className="text-aether-primary">Intelligence Age.</span>
                 </h2>
                 <div className="space-y-6 text-lg text-gray-400">
                    <p>
                       We believe that Artificial Intelligence is not just a tool, but a fundamental shift in how we solve problems. The engineers who master these systems will define the next century.
                    </p>
                    <p>
                       Aether Index is more than a library; it's a commitment to excellence. We track the frontier so you don't have to.
                    </p>
                 </div>
                 <div className="mt-12">
                    <Link to="/paths" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
                       Start your journey <ArrowRight size={20} />
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <NewsletterCTA />
    </div>
  );
};

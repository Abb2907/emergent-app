import React from 'react';
import { Send } from 'lucide-react';

export const NewsletterCTA: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-aether-primary/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Stay Ahead of the Curve</h2>
          <p className="text-lg text-gray-400 mb-10">
            Join 50,000+ AI engineers receiving the latest research, tools, and tutorials directly in their inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="enter@your.email" 
              className="flex-1 px-6 py-4 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-aether-primary focus:ring-1 focus:ring-aether-primary transition-all"
            />
            <button className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              Subscribe <Send size={18} />
            </button>
          </form>
          
          <p className="mt-6 text-xs text-gray-500">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

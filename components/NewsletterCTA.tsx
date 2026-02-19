import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const NewsletterCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus('success');
      setEmail('');
      // Reset status after a delay if needed, or leave it
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-aether-primary/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Stay Ahead of the Curve</h2>
          <p className="text-lg text-gray-400 mb-10">
            Join 50,000+ AI engineers receiving the latest research, tools, and tutorials directly in their inbox.
          </p>
          
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">Welcome aboard!</h3>
                <p className="text-gray-400">You've successfully subscribed to the newsletter.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-sm text-gray-500 hover:text-white underline"
                >
                  Subscribe another email
                </button>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" 
                onSubmit={handleSubmit}
              >
                <input 
                  type="email" 
                  required
                  placeholder="enter@your.email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-aether-primary focus:ring-1 focus:ring-aether-primary transition-all"
                />
                <button type="submit" className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                  Subscribe <Send size={18} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          
          {status === 'idle' && (
            <p className="mt-6 text-xs text-gray-500">
              No spam. Unsubscribe at any time.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

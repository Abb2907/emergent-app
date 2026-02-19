import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Modal } from './ui/Modal';
import { Atom, Github, Mail } from 'lucide-react';

export const SignInModal: React.FC = () => {
  const { isSignInOpen, closeSignIn, login } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Mock login - in a real app this would call an API
      // If signing up, we'd use the provided name, else default to 'User'
      const displayName = name || email.split('@')[0];
      login(displayName, email);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Mock social login
    login('Social User', 'user@example.com');
  };

  return (
    <Modal isOpen={isSignInOpen} onClose={closeSignIn} title={activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}>
      {/* Autofill fix for dark mode */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #171717 inset !important;
            -webkit-text-fill-color: white !important;
            caret-color: white !important;
        }
      `}</style>

      <div className="flex justify-center mb-6">
        <div className="p-4 rounded-full bg-aether-primary/10 relative">
          <div className="absolute inset-0 bg-aether-primary/20 blur-xl rounded-full" />
          <Atom size={40} className="text-aether-primary relative z-10" />
        </div>
      </div>

      <div className="flex bg-white/5 p-1 rounded-lg mb-6">
        <button
          onClick={() => setActiveTab('signin')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'signin' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab('signup')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'signup' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'
          }`}
        >
          Sign Up
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-aether-primary focus:outline-none text-white transition-colors placeholder-gray-500"
              placeholder="Your full name"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-aether-primary focus:outline-none text-white transition-colors placeholder-gray-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-aether-primary focus:outline-none text-white transition-colors placeholder-gray-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-lg bg-gradient-to-r from-aether-primary to-aether-secondary font-bold text-white mt-4 hover:shadow-lg hover:shadow-aether-primary/25 transition-all active:scale-95"
        >
          {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-aether-dark text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          type="button"
          onClick={() => handleSocialLogin('github')}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium text-gray-300 hover:text-white"
        >
          <Github size={18} /> GitHub
        </button>
        <button 
          type="button"
          onClick={() => handleSocialLogin('google')}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium text-gray-300 hover:text-white"
        >
          <Mail size={18} /> Google
        </button>
      </div>

      <p className="mt-8 text-center text-xs text-gray-500">
        By continuing, you agree to access the knowledge of the future.
      </p>
    </Modal>
  );
};
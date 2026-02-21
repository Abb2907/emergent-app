import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Modal } from './ui/Modal';
import { Atom, Github, Mail } from 'lucide-react';

export const SignInModal: React.FC = () => {
  const { isSignInOpen, closeSignIn, login, loginWithEmail, signupWithEmail } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = (provider: 'github' | 'google') => {
    login(provider);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'signin') {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(name, email, password);
      }
      closeSignIn();
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
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
          onClick={() => { setActiveTab('signin'); setError(''); }}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'signin' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => { setActiveTab('signup'); setError(''); }}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'signup' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'
          }`}
        >
          Sign Up
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        
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
          disabled={loading}
          className="w-full py-3.5 rounded-lg bg-gradient-to-r from-aether-primary to-aether-secondary font-bold text-white mt-4 hover:shadow-lg hover:shadow-aether-primary/25 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : (activeTab === 'signin' ? 'Sign In' : 'Create Account')}
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-gray-500">
        By continuing, you agree to access the knowledge of the future.
      </p>
    </Modal>
  );
};
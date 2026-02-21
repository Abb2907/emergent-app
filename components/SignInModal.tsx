import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Modal } from './ui/Modal';
import { Atom, Github, Mail } from 'lucide-react';

export const SignInModal: React.FC = () => {
  const { isSignInOpen, closeSignIn, loginWithEmail, signupWithEmail, forgotPassword, resetPassword } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'forgot' | 'reset'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (activeTab === 'signin') {
        await loginWithEmail(email, password, rememberMe);
        closeSignIn();
      } else if (activeTab === 'signup') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (password.length < 8) {
          throw new Error('Password must be at least 8 characters');
        }
        await signupWithEmail(name, email, password);
        closeSignIn();
      } else if (activeTab === 'forgot') {
        await forgotPassword(email);
        setSuccess('If an account exists, a reset link has been sent (check console for demo).');
      } else if (activeTab === 'reset') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await resetPassword(resetToken, password);
        setSuccess('Password reset successfully. Please sign in.');
        setTimeout(() => setActiveTab('signin'), 2000);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'signin': return 'Welcome Back';
      case 'signup': return 'Create Account';
      case 'forgot': return 'Reset Password';
      case 'reset': return 'Set New Password';
    }
  };

  return (
    <Modal isOpen={isSignInOpen} onClose={closeSignIn} title={getTitle()}>
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

      {(activeTab === 'signin' || activeTab === 'signup') && (
        <div className="flex bg-white/5 p-1 rounded-lg mb-6">
          <button
            onClick={() => { setActiveTab('signin'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'signin' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab('signup'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'signup' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm text-center">
            {success}
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

        {(activeTab === 'signin' || activeTab === 'signup' || activeTab === 'forgot') && (
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
        )}

        {activeTab === 'reset' && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Reset Token</label>
            <input
              type="text"
              required
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-aether-primary focus:outline-none text-white transition-colors placeholder-gray-500"
              placeholder="Paste token from console"
            />
          </div>
        )}

        {(activeTab === 'signin' || activeTab === 'signup' || activeTab === 'reset') && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              {activeTab === 'reset' ? 'New Password' : 'Password'}
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-aether-primary focus:outline-none text-white transition-colors placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>
        )}

        {(activeTab === 'signup' || activeTab === 'reset') && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Confirm Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-aether-primary focus:outline-none text-white transition-colors placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>
        )}

        {activeTab === 'signin' && (
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/10 bg-white/5 text-aether-primary focus:ring-aether-primary/50"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => { setActiveTab('forgot'); setError(''); setSuccess(''); }}
              className="text-aether-primary hover:text-aether-accent transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {activeTab === 'forgot' && (
          <div className="text-center">
             <button
              type="button"
              onClick={() => { setActiveTab('reset'); setError(''); setSuccess(''); }}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Have a token? Enter it here
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-lg bg-gradient-to-r from-aether-primary to-aether-secondary font-bold text-white mt-4 hover:shadow-lg hover:shadow-aether-primary/25 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : (
            activeTab === 'signin' ? 'Sign In' : 
            activeTab === 'signup' ? 'Create Account' : 
            activeTab === 'forgot' ? 'Send Reset Link' : 'Reset Password'
          )}
        </button>

        {(activeTab === 'forgot' || activeTab === 'reset') && (
          <button
            type="button"
            onClick={() => { setActiveTab('signin'); setError(''); setSuccess(''); }}
            className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Back to Sign In
          </button>
        )}
      </form>

      <p className="mt-8 text-center text-xs text-gray-500">
        By continuing, you agree to access the knowledge of the future.
      </p>
    </Modal>
  );
};
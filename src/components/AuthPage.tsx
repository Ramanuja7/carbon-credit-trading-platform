import { useState } from 'react';
import { Leaf, Mail, Lock, User as UserIcon } from 'lucide-react';
import { User, UserType } from '../App';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import * as api from '../utils/api';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('individual');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (mode === 'signin') {
        // Sign in with Supabase
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) throw new Error(authError.message);

        // Get user profile from server
        const { user } = await api.signIn(email);
        onLogin(user);
      } else {
        // Sign up
        const { user } = await api.signUp(email, password, name, userType);
        
        // Also sign in immediately after signup
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        onLogin(user);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Climate Message */}
          <div className="bg-gradient-to-br from-green-600 to-blue-600 p-12 flex flex-col justify-center text-white">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <Leaf className="w-7 h-7" />
                </div>
                <span className="text-3xl">CarbonX Sim</span>
              </div>
              <h1 className="text-white mb-4">Take Climate Action Today</h1>
              <p className="text-green-50 text-lg leading-relaxed">
                Join our marketplace to offset your carbon footprint through verified climate projects. 
                Buy carbon credits, support global sustainability initiatives, and track your environmental impact.
              </p>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1582721534293-c005ee2f09d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGNsaW1hdGUlMjBuYXR1cmV8ZW58MXx8fHwxNzY1NjAxMTY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Earth and climate"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <p className="text-2xl text-white mb-1">24+</p>
                <p className="text-sm text-green-50">Projects</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <p className="text-2xl text-white mb-1">12</p>
                <p className="text-sm text-green-50">Countries</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <p className="text-2xl text-white mb-1">50K+</p>
                <p className="text-sm text-green-50">Tons Offset</p>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="p-12">
            <div className="mb-8">
              <div className="flex gap-2 bg-gray-100 rounded-lg p-1 mb-8">
                <button
                  onClick={() => setMode('signin')}
                  className={`flex-1 px-6 py-3 rounded-md transition-colors ${
                    mode === 'signin'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`flex-1 px-6 py-3 rounded-md transition-colors ${
                    mode === 'signup'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <h2 className="text-gray-900 mb-2">
                {mode === 'signin' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-gray-600">
                {mode === 'signin'
                  ? 'Sign in to access your carbon offset portfolio'
                  : 'Join the climate action marketplace'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-gray-700 mb-3">Account Type</label>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
                      style={{
                        borderColor: userType === 'individual' ? '#10b981' : '#e5e7eb',
                        backgroundColor: userType === 'individual' ? '#f0fdf4' : 'white'
                      }}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value="individual"
                        checked={userType === 'individual'}
                        onChange={(e) => setUserType(e.target.value as UserType)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="text-gray-900 mb-1">Individual</p>
                        <p className="text-sm text-gray-600">
                          Personal carbon offsetting and climate action
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
                      style={{
                        borderColor: userType === 'organization' ? '#10b981' : '#e5e7eb',
                        backgroundColor: userType === 'organization' ? '#f0fdf4' : 'white'
                      }}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value="organization"
                        checked={userType === 'organization'}
                        onChange={(e) => setUserType(e.target.value as UserType)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="text-gray-900 mb-1">Organization</p>
                        <p className="text-sm text-gray-600">
                          Company offsetting, buy and sell carbon credits
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {loading ? 'Loading...' : 'Continue'}
              </button>

              {error && (
                <p className="text-center text-sm text-red-500 mt-2">
                  {error}
                </p>
              )}

              <p className="text-center text-sm text-gray-600">
                {mode === 'signin' ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-green-600 hover:text-green-700"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signin')}
                      className="text-green-600 hover:text-green-700"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </form>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="text-gray-900">Demo Mode:</span> This is a simulation platform. 
                Use any email and password to access the system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
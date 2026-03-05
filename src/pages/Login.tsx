import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock, LogIn, AlertTriangle, Facebook, Globe } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* left illustration area */}
      <div className="hidden lg:flex w-1/2 relative bg-[url('../images/waterhouse.avif')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-indigo-800/60" />
        <div className="relative p-16 text-white space-y-6">
          <h2 className="text-5xl font-extrabold animate-fadeInDown">Welcome Back</h2>
          <p className="text-lg animate-fadeInUp">We’ve missed you! Log in to continue your waterpark adventure.</p>
        </div>
      </div>

      {/* form container */}
      <div className="flex items-center justify-center w-full lg:w-1/2 bg-gradient-to-br from-blue-900 to-indigo-600 px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 animate-scaleIn">
          <h1 className="text-3xl font-bold text-center mb-6">Login to Your Account</h1>

          {/* Error Message */}
          {error && (
            <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-lg mb-4 flex items-center gap-2 animate-fadeInDown">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-park-dark mb-2">
                <Mail className="inline mr-2 text-primary" size={18} />
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-park-dark mb-2">
                <Lock className="inline mr-2 text-primary" size={18} />
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-muted">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:text-blue-700 font-semibold">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition mt-6 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <LogIn size={20} />
              <span>{isLoading ? 'Logging in...' : 'Login'}</span>
            </button>
          </form>

          <div className="flex items-center space-x-4 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-muted text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-600 font-semibold py-2 rounded-lg hover:border-primary hover:text-primary transition">
              <Globe size={18} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-600 font-semibold py-2 rounded-lg hover:border-primary hover:text-primary transition">
              <Facebook size={18} /> Facebook
            </button>
          </div>

          <p className="text-center text-muted mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-bold hover:text-blue-700">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;

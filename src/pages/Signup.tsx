import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock, User, Phone, UserPlus, AlertTriangle, Globe, Facebook } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const result = await signup(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName,
      formData.phone
    );
    setIsLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* illustration panel */}
      <div className="hidden lg:flex w-1/2 relative bg-[url('../images/waterhouse.avif')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 to-blue-800/70" />
        <div className="relative p-16 text-white space-y-6">
          <h2 className="text-5xl font-extrabold animate-fadeInDown">Join the Fun</h2>
          <p className="text-lg animate-fadeInUp">Create your account and dive into adventure!</p>
        </div>
      </div>

      {/* form side */}
      <div className="flex items-center justify-center w-full lg:w-1/2 bg-gradient-to-br from-indigo-800 to-blue-700 px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 animate-scaleIn">
          <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>

          {error && (
            <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-lg mb-4 flex items-center gap-2 animate-fadeInDown">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-bold text-park-dark mb-2">
                <User className="inline mr-2 text-primary" size={18} />
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-bold text-park-dark mb-2">
                <User className="inline mr-2 text-primary" size={18} />
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-park-dark mb-2">
                <Mail className="inline mr-2 text-primary" size={18} />
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-park-dark mb-2">
                <Phone className="inline mr-2 text-primary" size={18} />
                Phone (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-park-dark mb-2">
                <Lock className="inline mr-2 text-primary" size={18} />
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-park-dark mb-2">
                <Lock className="inline mr-2 text-primary" size={18} />
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
              />
            </div>

            <label className="flex items-start space-x-2">
              <input type="checkbox" className="mt-1" required />
              <span className="text-sm text-muted">
                I agree to the <a href="#" className="text-primary font-bold">Terms of Service</a> and{' '}
                <a href="#" className="text-primary font-bold">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition mt-6 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <UserPlus size={20} />
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
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;

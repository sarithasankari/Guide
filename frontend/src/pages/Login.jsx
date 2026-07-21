import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('traveler');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000)); // Simulate API
    login(role);
    setLoading(false);

    if (role === 'guide') navigate('/dashboard/guide');
    else if (role === 'admin') navigate('/dashboard/admin');
    else navigate('/dashboard/traveler');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 relative overflow-hidden bg-slate-50 dark:bg-slate-900">
        {/* Decorative background circle */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
          className="w-full max-w-md z-10 py-6 sm:py-0"
        >
          <motion.h1 variants={itemVariants} className="text-2xl sm:text-4xl font-extrabold mb-2 text-slate-900 dark:text-white tracking-tight">
            Welcome Back
          </motion.h1>
          <motion.p variants={itemVariants} className="text-slate-500 dark:text-slate-400 mb-6 text-sm sm:text-base leading-relaxed">
            Enter your credentials to access your GuideConnect account.
          </motion.p>

          {/* Role Switcher */}
          <motion.div variants={itemVariants} className="bg-slate-200/70 dark:bg-slate-800 p-1.5 rounded-2xl mb-6 flex gap-1 border border-slate-200 dark:border-slate-700">
            {['traveler', 'guide', 'admin'].map(r => (
              <button 
                key={r} 
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold capitalize transition-all cursor-pointer ${
                  role === r 
                    ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </motion.div>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }} 
                animate={{ opacity: 1, height: 'auto', marginBottom: '1.25rem' }} 
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl p-3 flex gap-2 items-center text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-semibold">
                  <AlertCircle size={16} className="shrink-0" /> {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Mail size={18} className={emailFocused ? "text-teal-600 dark:text-teal-400" : ""} />
                </div>
                <input 
                  type="email" 
                  placeholder="alex@example.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <Link to="#" className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Lock size={18} className={passwordFocused ? "text-teal-600 dark:text-teal-400" : ""} />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="w-full pl-11 pr-11 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit" 
              disabled={loading} 
              className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl shadow-md transition-all text-sm cursor-pointer disabled:opacity-70 mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </motion.button>
          </motion.form>

          <motion.div variants={itemVariants} className="text-center mt-6 text-xs sm:text-sm text-slate-500 font-medium">
            Don't have an account? <Link to="/signup" className="font-extrabold text-teal-600 dark:text-teal-400 hover:underline">Create one now</Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Right: Decorative Image Banner (Desktop standard) */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-slate-900">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-slate-950/80" />
        
        <div className="relative h-full flex items-end p-12">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl text-white max-w-md border border-white/10 shadow-2xl"
          >
            <h2 className="text-3xl font-extrabold mb-4 leading-tight tracking-tight">Unlock Authentic Local Expertise.</h2>
            <p className="text-slate-300 mb-6 leading-relaxed text-sm font-medium">Connect with verified professional guides and experience destinations exactly how the locals do.</p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {['https://randomuser.me/api/portraits/men/32.jpg', 'https://randomuser.me/api/portraits/women/44.jpg', 'https://randomuser.me/api/portraits/men/70.jpg'].map((img, i) => (
                  <img 
                    key={i} 
                    src={img} 
                    alt="Guide Avatar" 
                    className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover shadow-sm"
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-white/90">
                Joined by 12,000+ experts
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}




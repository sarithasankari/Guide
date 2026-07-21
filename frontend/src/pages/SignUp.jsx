import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Left Side: Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-slate-50 dark:bg-slate-900">
        <div className="w-full max-w-md py-6 sm:py-0">
          <h1 className="text-2xl sm:text-4xl font-extrabold mb-2 text-slate-900 dark:text-white tracking-tight">
            Create Account
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm sm:text-base leading-relaxed">
            Join GuideConnect and start exploring the world like a local.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors cursor-pointer">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors cursor-pointer">
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-4 h-4 dark:invert" /> GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Or register with email</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          <form onSubmit={e => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="Alex Morgan" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="alex@example.com" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full pl-11 pr-11 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="••••••••" 
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

            <div className="flex items-start gap-2 pt-1 mb-2">
              <input type="checkbox" id="terms" className="mt-1 accent-teal-600 rounded cursor-pointer" required />
              <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer leading-relaxed">
                I agree to the <Link to="#" className="text-teal-600 dark:text-teal-400 font-bold hover:underline">Terms of Service</Link> and <Link to="#" className="text-teal-600 dark:text-teal-400 font-bold hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <Link 
              to="/dashboard/traveler" 
              className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl shadow-md transition-all text-sm text-center block"
            >
              Create Account
            </Link>
          </form>

          <div className="text-center mt-6 text-xs sm:text-sm text-slate-500 font-medium">
            Already have an account? <Link to="/login" className="font-extrabold text-teal-600 dark:text-teal-400 hover:underline">Sign In</Link>
          </div>
        </div>
      </div>

      {/* Right Side: Image Banner (Desktop standard) */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-slate-900">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-slate-950/80" />
        <div className="relative h-full flex items-end p-12">
          <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl text-white max-w-md border border-white/10 shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-3 leading-tight tracking-tight">Your Next Adventure Awaits.</h2>
            <p className="text-slate-300 leading-relaxed text-sm font-medium">
              Get access to thousands of verified local experts and unique experiences worldwide. 
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

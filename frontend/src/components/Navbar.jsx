import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, LogOut, User, LayoutDashboard, ChevronDown, Menu, X, Compass, HelpCircle, Compass as CompassIcon, CalendarRange, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isDashboard = location.pathname.startsWith('/dashboard');
  const isHomePage = location.pathname === '/';

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDashboard) return null;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setShowMobileMenu(false);
    navigate('/');
  };

  const dashboardPath = user?.role === 'guide' ? '/dashboard/guide' : user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/traveler';

  const navLinks = [
    { name: 'Explore', path: '/search', icon: CompassIcon },
    { name: 'Trip Planner', path: '/planner', icon: CalendarRange },
    { name: 'Become a Guide', path: '/dashboard/guide', icon: Heart },
    { name: 'Experiences', path: '/experiences', icon: CompassIcon },
    { name: 'Help', path: '/help', icon: HelpCircle }
  ];

  // Header background styling based on scroll and route
  const headerBgClass = isHomePage && !isScrolled
    ? 'bg-gradient-to-b from-black/60 via-black/30 to-transparent text-white border-b border-white/10'
    : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-800 dark:text-slate-100 border-b border-slate-200/80 dark:border-slate-800 shadow-md';

  return (
    <header className={`sticky top-0 z-[200] w-full transition-all duration-300 ${headerBgClass}`}>
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group select-none">
          <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-md shadow-teal-500/10 group-hover:scale-105 transition-transform duration-300">
            <Compass size={20} className="text-white animate-pulse-slow sm:w-[22px] sm:h-[22px]" />
          </div>
          <span className={`font-black text-xl sm:text-2xl tracking-tight transition-colors ${
            isHomePage && !isScrolled ? 'text-white' : 'bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent'
          }`}>
            GuideConnect
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`px-4 py-2 rounded-full text-[0.925rem] font-bold tracking-wide transition-all duration-300 ${
                  isActive 
                    ? 'bg-teal-50 text-teal-700 shadow-[inset_0_1px_1px_rgba(13,148,136,0.05)]' 
                    : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop User Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              {/* Notification Button */}
              <button className="p-2.5 rounded-full relative text-slate-500 hover:text-teal-600 hover:bg-slate-50 transition-all border border-slate-100 cursor-pointer">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)} 
                  className="flex items-center gap-2 bg-white border border-slate-200 hover:border-teal-500/30 rounded-full py-1.5 pr-3 pl-1.5 hover:bg-slate-50/80 transition-all cursor-pointer shadow-sm"
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover shadow-sm ring-1 ring-slate-100" />
                  <span className="font-bold text-xs text-slate-700 tracking-wide">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-[120%] bg-white border border-slate-150 rounded-2xl shadow-xl shadow-slate-100/70 z-[300] min-w-[220px] overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                        <div className="font-extrabold text-sm text-slate-800 leading-tight">{user.name}</div>
                        <div className="text-[10px] font-bold text-slate-450 tracking-wider uppercase mt-1">{user.role} Account</div>
                      </div>
                      
                      <div className="p-1.5">
                        <Link 
                          to={dashboardPath} 
                          onClick={() => setShowUserMenu(false)} 
                          className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-650 hover:text-teal-650 rounded-xl hover:bg-teal-50/50 transition-colors"
                        >
                          <LayoutDashboard size={15} className="text-slate-405" /> Dashboard
                        </Link>
                        <Link 
                          to="/dashboard/settings" 
                          onClick={() => setShowUserMenu(false)} 
                          className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-650 hover:text-teal-650 rounded-xl hover:bg-teal-50/50 transition-colors"
                        >
                          <User size={15} className="text-slate-405" /> My Profile
                        </Link>
                      </div>

                      <div className="border-t border-slate-50 p-1.5">
                        <button 
                          onClick={handleLogout} 
                          className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-rose-600 hover:text-rose-700 rounded-xl hover:bg-rose-50 transition-colors w-full text-left cursor-pointer"
                        >
                          <LogOut size={15} className="text-rose-455" /> Log Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-5 py-2.5 font-bold text-slate-600 hover:text-teal-600 hover:bg-slate-50 rounded-full transition-all text-sm tracking-wide">
                Log In
              </Link>
              <Link to="/signup" className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-5.5 py-2.5 rounded-full font-bold shadow-md shadow-teal-650/10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm tracking-wide">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex md:hidden items-center gap-3">
          {user && (
            <button className="p-2 rounded-full relative text-slate-500 hover:text-teal-600 transition-colors border border-slate-100">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500 ring-1 ring-white"></span>
            </button>
          )}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)} 
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-teal-600 hover:bg-slate-50 transition-all cursor-pointer"
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-slate-100 bg-white shadow-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    onClick={() => setShowMobileMenu(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive 
                        ? 'bg-teal-50 text-teal-700' 
                        : 'text-slate-600 hover:text-teal-600 hover:bg-slate-55'
                    }`}
                  >
                    <link.icon size={18} className="opacity-75" />
                    {link.name}
                  </Link>
                );
              })}

              <div className="border-t border-slate-100 pt-4 mt-2">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-slate-100" />
                      <div>
                        <div className="font-extrabold text-sm text-slate-800 leading-none">{user.name}</div>
                        <div className="text-[10px] font-bold text-slate-450 tracking-wider uppercase mt-1">{user.role} Account</div>
                      </div>
                    </div>
                    
                    <Link 
                      to={dashboardPath} 
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:text-teal-600 hover:bg-slate-50 transition-all"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>
                    
                    <Link 
                      to="/dashboard/settings" 
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:text-teal-600 hover:bg-slate-50 transition-all"
                    >
                      <User size={18} />
                      My Profile
                    </Link>

                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-all w-full text-left cursor-pointer"
                    >
                      <LogOut size={18} />
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 px-2">
                    <Link 
                      to="/login" 
                      onClick={() => setShowMobileMenu(false)}
                      className="w-full py-3 text-center font-bold text-slate-600 hover:text-teal-600 hover:bg-slate-50 rounded-xl transition-all border border-slate-200 text-sm"
                    >
                      Log In
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={() => setShowMobileMenu(false)}
                      className="w-full py-3 text-center font-bold bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


import { Globe, Send, Instagram, Twitter, Facebook, Youtube, Compass } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) return null;

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          
          {/* Logo & Pitch */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 select-none">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-md">
                <Compass size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">
                <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  GuideConnect
                </span>
              </h2>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
              Discover authentic India with verified, specialized local experts. Curated private journeys tailored to your rhythm.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://instagram.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-teal-500/20 hover:text-teal-400 flex items-center justify-center border border-slate-800 transition-all text-slate-400"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://twitter.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-teal-500/20 hover:text-teal-400 flex items-center justify-center border border-slate-800 transition-all text-slate-400"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="https://facebook.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-teal-500/20 hover:text-teal-400 flex items-center justify-center border border-slate-800 transition-all text-slate-400"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="https://youtube.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-teal-500/20 hover:text-teal-400 flex items-center justify-center border border-slate-800 transition-all text-slate-400"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>
          
          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link to="/search" className="text-slate-400 hover:text-teal-400 transition-colors">Explore India</Link>
              </li>
              <li>
                <Link to="/planner" className="text-slate-400 hover:text-teal-400 transition-colors">AI Trip Planner</Link>
              </li>
              <li>
                <Link to="/experiences" className="text-slate-400 hover:text-teal-400 transition-colors">Curated Experiences</Link>
              </li>
              <li>
                <Link to="/dashboard/guide" className="text-slate-400 hover:text-teal-400 transition-colors">Become a Guide</Link>
              </li>
              <li>
                <Link to="/help" className="text-slate-400 hover:text-teal-400 transition-colors">Help Center</Link>
              </li>
            </ul>
          </div>
          
          {/* Top States & Pillars */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest">Top Destinations</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link to="/states/rajasthan" className="text-slate-400 hover:text-teal-400 transition-colors">Rajasthan Heritage</Link>
              </li>
              <li>
                <Link to="/states/kerala" className="text-slate-400 hover:text-teal-400 transition-colors">Kerala Backwaters</Link>
              </li>
              <li>
                <Link to="/states/goa" className="text-slate-400 hover:text-teal-400 transition-colors">Goa Beaches & Forts</Link>
              </li>
              <li>
                <Link to="/states/uttar-pradesh" className="text-slate-400 hover:text-teal-400 transition-colors">Uttar Pradesh Pilgrimages</Link>
              </li>
              <li>
                <Link to="/states/ladakh" className="text-slate-400 hover:text-teal-400 transition-colors">Ladakh Mountains</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Segment */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest">Stay Updated</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Get secret travel spots, local guide stories, and itinerary guides delivered weekly.
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex gap-2">
              <div className="relative flex-1">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full h-11 pl-4 pr-10 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                  required
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-400 transition-colors cursor-pointer">
                  <Send size={15} />
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Bottom Copyright Section */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>© 2026 GuideConnect Tourism Marketplace. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="hover:text-teal-400 transition-colors flex items-center gap-1.5 cursor-pointer">
              <Globe size={14} /> English (India)
            </button>
            <button className="hover:text-teal-400 transition-colors cursor-pointer">
              ₹ INR
            </button>
            <Link to="#" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-teal-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

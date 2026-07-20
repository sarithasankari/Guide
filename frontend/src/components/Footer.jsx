import { Globe, Share2, Send } from 'lucide-react';
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
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">GuideConnect</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
              Empowering global explorers to connect with world-class local experts through curated private experiences.
            </p>
            <div className="flex gap-3 pt-2">
              <Link 
                to="#" 
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-teal-500/10 hover:text-teal-400 flex items-center justify-center border border-slate-800 transition-all text-slate-400"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link 
                to="#" 
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-teal-500/10 hover:text-teal-400 flex items-center justify-center border border-slate-800 transition-all text-slate-400"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link 
                to="#" 
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-teal-500/10 hover:text-teal-400 flex items-center justify-center border border-slate-800 transition-all text-slate-400"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link 
                to="#" 
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-teal-500/10 hover:text-teal-400 flex items-center justify-center border border-slate-800 transition-all text-slate-400"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest">Company</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link to="#" className="text-slate-400 hover:text-teal-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="#" className="text-slate-400 hover:text-teal-400 transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="#" className="text-slate-400 hover:text-teal-400 transition-colors">Sustainability</Link>
              </li>
              <li>
                <Link to="#" className="text-slate-400 hover:text-teal-400 transition-colors">Blog</Link>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest">Support</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link to="#" className="text-slate-400 hover:text-teal-400 transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="#" className="text-slate-400 hover:text-teal-400 transition-colors">Safety Information</Link>
              </li>
              <li>
                <Link to="#" className="text-slate-400 hover:text-teal-400 transition-colors">Cancellation Options</Link>
              </li>
              <li>
                <Link to="#" className="text-slate-400 hover:text-teal-400 transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Segment */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-widest">Newsletter</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Get the best travel guides and curated tips delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full h-11 pl-4 pr-10 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-teal-400 transition-colors">
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-550">
          <p>© 2026 GuideConnect Marketplace. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="hover:text-teal-400 transition-colors flex items-center gap-1.5 cursor-pointer">
              <Globe size={14} /> English (US)
            </button>
            <button className="hover:text-teal-400 transition-colors cursor-pointer">
              $ USD
            </button>
            <Link to="#" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-teal-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

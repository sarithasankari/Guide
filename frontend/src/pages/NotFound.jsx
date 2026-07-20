import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-slate-50">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-extrabold text-teal-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Destination Not Found</h2>
        <p className="text-slate-500 mb-8 text-lg">
          It looks like you've wandered off the map. The destination you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-teal-600 text-white font-bold rounded-full shadow-lg shadow-teal-600/30 hover:bg-teal-700 transition-colors"
        >
          <Home size={20} />
          Return to Basecamp
        </Link>
      </div>
    </div>
  );
}

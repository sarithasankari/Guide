import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3 sm:mb-6 overflow-x-auto scrollbar-none py-0.5">
      <ol className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm text-slate-500 whitespace-nowrap">
        <li className="shrink-0">
          <Link to="/" className="hover:text-teal-600 transition-colors flex items-center p-0.5">
            <Home size={15} className="sm:w-4 sm:h-4 text-slate-500 hover:text-teal-600" aria-label="Home" />
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={index} className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
              <ChevronRight size={14} className="text-slate-400 shrink-0 stroke-[2.5px]" />
              {isLast ? (
                <span 
                  className="font-bold text-slate-800 truncate max-w-[120px] sm:max-w-[260px]" 
                  aria-current="page"
                  title={crumb.label}
                >
                  {crumb.label}
                </span>
              ) : (
                <Link 
                  to={crumb.path} 
                  className="hover:text-teal-600 transition-colors font-medium truncate max-w-[90px] sm:max-w-[150px]"
                  title={crumb.label}
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

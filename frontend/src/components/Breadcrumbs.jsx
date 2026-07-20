import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ crumbs, noMargin = false }) {
  return (
    <nav aria-label="Breadcrumb" className={`${noMargin ? 'mb-0' : 'mb-3 sm:mb-6'} w-full overflow-x-auto scrollbar-none py-1`}>
      <ol className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
        <li className="shrink-0">
          <Link to="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center p-0.5">
            <Home size={15} className="sm:w-4 sm:h-4 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400" aria-label="Home" />
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={index} className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
              <ChevronRight size={14} className="text-slate-400 dark:text-slate-500 shrink-0 stroke-[2.5px]" />
              {isLast ? (
                <span 
                  className="font-bold text-slate-800 dark:text-slate-100 truncate max-w-[130px] sm:max-w-[300px]" 
                  aria-current="page"
                  title={crumb.label}
                >
                  {crumb.label}
                </span>
              ) : (
                <Link 
                  to={crumb.path} 
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium text-slate-600 dark:text-slate-300 truncate max-w-[90px] sm:max-w-[160px]"
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

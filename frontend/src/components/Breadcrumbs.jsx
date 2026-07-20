import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-slate-500">
        <li>
          <Link to="/" className="hover:text-teal-600 transition-colors flex items-center">
            <Home size={16} aria-label="Home" />
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight size={16} className="text-slate-400" />
              {isLast ? (
                <span className="font-semibold text-slate-800 line-clamp-1 max-w-[200px]" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.path} className="hover:text-teal-600 transition-colors">
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

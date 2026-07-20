import React from 'react';

/**
 * Pulsing skeleton screen loader for guide details page.
 */
export default function GuideSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/50 animate-pulse w-full select-none">
      {/* Cover Banner Placeholder */}
      <div className="h-80 md:h-[450px] bg-slate-200" />

      {/* Main page details content placeholder */}
      <div className="container mx-auto px-4 max-w-7xl pt-8 pb-20 flex flex-col lg:flex-row gap-8">
        
        {/* Left main segments list placeholder */}
        <div className="flex-1 space-y-6">
          {/* About */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl h-56 space-y-4">
            <div className="h-5 bg-slate-200 rounded-md w-1/4" />
            <div className="space-y-2">
              <div className="h-3.5 bg-slate-200 rounded-md w-full" />
              <div className="h-3.5 bg-slate-200 rounded-md w-5/6" />
              <div className="h-3.5 bg-slate-200 rounded-md w-4/5" />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white border border-slate-100 p-4 rounded-3xl h-24" />
            ))}
          </div>

          {/* Languages */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl h-36" />
        </div>

        {/* Right side booking card placeholder */}
        <div className="w-full lg:w-[380px] shrink-0 bg-white border border-slate-100 p-6 rounded-3xl h-[600px]" />

      </div>
    </div>
  );
}

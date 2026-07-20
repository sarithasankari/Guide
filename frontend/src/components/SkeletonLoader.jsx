import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-white rounded-2xl h-[420px] shadow-sm border border-slate-100 flex flex-col animate-pulse">
    <div className="h-56 bg-slate-200 rounded-t-2xl"></div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="h-6 bg-slate-200 rounded-md w-3/4 mb-4"></div>
      <div className="h-4 bg-slate-200 rounded-md w-1/2 mb-4"></div>
      <div className="h-4 bg-slate-200 rounded-md w-full mb-2"></div>
      <div className="h-4 bg-slate-200 rounded-md w-5/6 mb-4"></div>
      <div className="mt-auto h-12 bg-slate-200 rounded-xl w-full"></div>
    </div>
  </div>
);

export const GridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {[...Array(count)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

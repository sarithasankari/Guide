import React from 'react';

/**
 * Single skeleton card matching the exact height, structure, and spacing of GuideCard to prevent layout shifts.
 */
export const GuideCardSkeleton = () => (
  <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_15px_-4px_rgba(15,23,42,0.02)] flex flex-col h-[460px] overflow-hidden animate-pulse select-none">
    {/* Cover Image Placeholder */}
    <div className="h-56 bg-slate-200" />
    
    {/* Content Placeholder */}
    <div className="p-5.5 flex flex-col flex-grow relative pt-10">
      {/* Avatar Circle */}
      <div className="absolute -top-7 left-5 w-14 h-14 rounded-2xl border-3 border-white bg-slate-200" />
      
      {/* Name and Avail */}
      <div className="flex justify-between items-start gap-2 mb-3">
        <div className="h-5 bg-slate-200 rounded-md w-3/5" />
        <div className="h-4.5 bg-slate-200 rounded-full w-1/4" />
      </div>

      {/* Location */}
      <div className="h-3.5 bg-slate-200 rounded-md w-2/5 mb-5" />

      {/* Specs Grid */}
      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-5 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="h-3 bg-slate-200 rounded-md w-3/4" />
          <div className="h-3 bg-slate-200 rounded-md w-2/3" />
          <div className="h-3 bg-slate-200 rounded-md w-4/5" />
          <div className="h-3 bg-slate-200 rounded-md w-1/2" />
        </div>
      </div>

      {/* Bio text */}
      <div className="space-y-1.5 mb-6 flex-grow">
        <div className="h-3 bg-slate-200 rounded-md w-full" />
        <div className="h-3 bg-slate-200 rounded-md w-5/6" />
      </div>

      {/* Pricing & Link */}
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="h-2 bg-slate-200 rounded-md w-8" />
          <div className="h-5 bg-slate-200 rounded-md w-14" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 bg-slate-200 rounded-xl w-14" />
          <div className="h-9 bg-slate-200 rounded-xl w-20" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * Grid of guide card skeletons
 */
export default function GuideSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
      {[...Array(count)].map((_, idx) => (
        <GuideCardSkeleton key={idx} />
      ))}
    </div>
  );
}

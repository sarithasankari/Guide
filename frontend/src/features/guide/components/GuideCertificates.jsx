import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

/**
 * Display lists of licenses, verified badges, and tourism qualifications.
 */
export default function GuideCertificates({ certifications = [] }) {
  return (
    <section className="bg-white border border-slate-100 p-6.5 rounded-3xl shadow-[0_2px_15px_-4px_rgba(15,23,42,0.01)] text-left select-none">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-teal-50 text-teal-650 rounded-xl">
          <ShieldCheck size={18} />
        </div>
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
          Verified Certifications
        </h2>
      </div>

      <div className="space-y-3">
        {certifications.map((cert, index) => (
          <div 
            key={index}
            className="flex items-center gap-3.5 bg-slate-50/50 p-3 rounded-2xl border border-slate-150"
          >
            <div className="text-emerald-500 bg-white shadow-xs w-8 h-8 rounded-xl flex items-center justify-center border border-slate-150">
              <Award size={16} />
            </div>
            <div>
              <p className="text-xs md:text-sm font-bold text-slate-800">{cert}</p>
              <span className="text-[10px] text-emerald-650 font-bold uppercase tracking-wider block mt-0.5">
                ✓ Document Vetted by GuideConnect
              </span>
            </div>
          </div>
        ))}

        {certifications.length === 0 && (
          <p className="text-slate-400 text-xs font-semibold py-2">
            No certifications uploaded by this guide.
          </p>
        )}
      </div>
    </section>
  );
}

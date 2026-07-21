import React from 'react';
import { Compass, ShieldCheck, Sun, Camera, Luggage, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const TRAVEL_TIPS = [
  {
    icon: <Sun className="w-6 h-6 text-amber-500" />,
    title: 'Best Seasons & Weather',
    desc: 'October to March is ideal for North India & Rajasthan, while monsoon season (June–August) highlights Kerala & Western Ghats.'
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-teal-500" />,
    title: 'Cultural Etiquette',
    desc: 'Remove shoes when entering temples & heritage monuments. Cover shoulders and knees at sacred pilgrimage sites.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    title: 'Safe Local Transportation',
    desc: 'Use verified local taxis, pre-booked intercity trains, or request your GuideConnect expert for authorized private cars.'
  },
  {
    icon: <Camera className="w-6 h-6 text-cyan-500" />,
    title: 'Photography Permissions',
    desc: 'Always ask permission before photographing local artisans or sacred temple rituals. Tripods may require permits.'
  },
  {
    icon: <Luggage className="w-6 h-6 text-indigo-500" />,
    title: 'Smart Packing Checklist',
    desc: 'Pack light cotton clothing, comfortable walking shoes, sunscreen, reusable water bottles, and universal power adapters.'
  },
  {
    icon: <Compass className="w-6 h-6 text-rose-500" />,
    title: 'Hire Vetted Local Experts',
    desc: 'Local guides provide authorized entry lines, language translation, regional food safety recommendations, and hidden spots.'
  }
];

export default function TravelTipsSection() {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-200/50 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <Compass size={14} /> India Travel Guide
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Essential Travel Tips & Advice
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium mt-2 leading-relaxed">
            Everything you need to know for a smooth, memorable, and authentic journey across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TRAVEL_TIPS.map((tip, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-slate-50 dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-700 flex items-center justify-center mb-5 shadow-sm border border-slate-100 dark:border-slate-600 group-hover:scale-105 transition-transform">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                  {tip.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                  {tip.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

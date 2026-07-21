import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Siddharth & Ananya Mehta',
    location: 'Mumbai, India',
    tour: 'Varanasi Secret Ghats Trail',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    comment: 'Our guide in Varanasi took us to sunrise boat rituals and hidden weaver colonies that no mainstream tour company covers. Truly an unforgettable spiritual journey!',
    date: 'June 2026'
  },
  {
    id: 2,
    name: 'Elena Rostova',
    location: 'Barcelona, Spain',
    tour: 'Rajasthan Palace & Desert Trek',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    comment: 'GuideConnect made our trip to Jaipur and Jaisalmer seamless. Having a verified local guide who speaks fluent English made all the difference in understanding local history.',
    date: 'May 2026'
  },
  {
    id: 3,
    name: 'David & Sarah Jenkins',
    location: 'London, UK',
    tour: 'Kerala Backwaters & Spice Walk',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/70.jpg',
    comment: 'Cruising the backwaters of Alleppey with a local historian gave us intimate insights into village life, authentic fish curry recipes, and local ecology. Highly recommended!',
    date: 'April 2026'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/20 text-teal-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4">
            <Quote size={14} className="text-teal-400" /> Traveler Experiences
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Loved by Travelers Worldwide
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium mt-3 leading-relaxed">
            Real stories from global explorers who discovered India through our vetted local guides.
          </p>
        </div>

        {/* Grid of Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/60 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-700/40 group-hover:text-teal-500/20 transition-colors pointer-events-none" />
              
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(item.rating)].map((_, idx) => (
                    <Star key={idx} size={16} className="fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium mb-6">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-700/50 flex items-center gap-3.5">
                <img 
                  src={item.avatar} 
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-teal-500/40 shadow-sm"
                />
                <div>
                  <h4 className="font-extrabold text-white text-sm sm:text-base flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle2 size={14} className="text-teal-400 shrink-0" />
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">{item.location} • <span className="text-teal-300">{item.tour}</span></p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { Clock, CheckSquare, Award, Flame } from 'lucide-react';

/**
 * Grid matrix displaying statistics cards (Tours done, response rate, credentials).
 */
export default function GuideStats({ guide }) {
  const stats = [
    {
      id: 'stat-response',
      title: 'Response Time',
      value: 'Within 1 Hour',
      icon: <Clock size={16} />,
      desc: 'Highly responsive guide'
    },
    {
      id: 'stat-tours',
      title: 'Tours Completed',
      value: `${guide.reviews + 12}+ Tours`,
      icon: <CheckSquare size={16} />,
      desc: 'Experienced host'
    },
    {
      id: 'stat-rating',
      title: 'Guide Rating',
      value: `${guide.rating.toFixed(2)} ★`,
      icon: <Award size={16} />,
      desc: `Based on ${guide.reviews} reviews`
    },
    {
      id: 'stat-availability',
      title: 'Instant Booking',
      value: guide.instantBook ? 'Supported' : 'Standard Book',
      icon: <Flame size={16} />,
      desc: guide.instantBook ? 'No guide pre-approval' : 'Pre-approval required'
    }
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      {stats.map(item => (
        <div 
          key={item.id} 
          className="bg-white border border-slate-100 p-4.5 rounded-3xl text-left shadow-[0_2px_10px_rgba(15,23,42,0.01)]"
        >
          <div className="text-teal-650 mb-3 bg-slate-50 w-9 h-9 rounded-2xl flex items-center justify-center border border-slate-100">
            {item.icon}
          </div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{item.title}</h4>
          <p className="text-sm font-black text-slate-850 mt-1">{item.value}</p>
          <span className="text-[10px] text-slate-500 font-semibold mt-0.5 block">{item.desc}</span>
        </div>
      ))}
    </section>
  );
}

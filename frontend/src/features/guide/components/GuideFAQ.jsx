import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Accordion layout for guide FAQs.
 */
export default function GuideFAQ() {
  const [expandedId, setExpandedId] = useState(null);

  const faqItems = [
    {
      id: 'faq-children',
      q: 'Can children and senior citizens join this tour?',
      a: 'Absolutely! Our itineraries are highly customizable, and we pacing the walks to accommodate seniors, kids, and families comfortably.'
    },
    {
      id: 'faq-custom',
      q: 'Can the itineraries be customized to my needs?',
      a: 'Yes, all bookings can be customized. After booking, you can send me a message outlining your interests, and I will tailor a specific route for you.'
    },
    {
      id: 'faq-cancel',
      q: 'What is the booking cancellation policy?',
      a: 'We offer free cancellation up to 24 hours before the scheduled tour start time for a full 100% refund. Cancellations made under 24 hours are non-refundable.'
    },
    {
      id: 'faq-group',
      q: 'What is the maximum group size for a booking?',
      a: 'The starting hourly rate covers up to 4 travelers. For larger groups (up to 12 travelers), a small additional traveler supplement fee is calculated.'
    }
  ];

  const handleToggle = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section className="bg-white border border-slate-100 p-6.5 rounded-3xl shadow-[0_2px_15px_-4px_rgba(15,23,42,0.01)] text-left select-none w-full">
      
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-teal-50 text-teal-650 rounded-xl">
          <HelpCircle size={18} />
        </div>
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqItems.map(item => {
          const isExpanded = expandedId === item.id;
          return (
            <div 
              key={item.id}
              className="border border-slate-150 rounded-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => handleToggle(item.id)}
                className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100/50 transition-colors text-left text-xs md:text-sm font-black text-slate-800 cursor-pointer"
              >
                <span>{item.q}</span>
                <ChevronDown 
                  size={16} 
                  className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-teal-600' : ''
                  }`} 
                />
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 border-t border-slate-150 text-xs md:text-sm leading-relaxed font-medium text-slate-600 bg-white">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </section>
  );
}

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: 'Why should I hire a local guide through GuideConnect?',
    answer: 'Hiring a verified local guide provides personalized itineraries, authorized access to monument gates without long lines, authentic cultural stories, regional language translation, and reliable local safety tips.'
  },
  {
    question: 'Are all guides on GuideConnect verified?',
    answer: 'Yes! Every guide undergoes background verification, credential checks (such as State/Archaeology license checks), language proficiency screening, and continuous traveler review audits.'
  },
  {
    question: 'How do I book a private custom tour?',
    answer: 'Simply search by destination or category, select a guide profile, choose your target travel dates, and submit a booking request or message the guide directly to customize your schedule.'
  },
  {
    question: 'Can I customize my trip itinerary?',
    answer: 'Absolutely! Our AI Trip Planner and direct guide messaging allow you to request specific food preferences, photography stops, mobility assistance, or specialized heritage trails.'
  },
  {
    question: 'What is the cancellation and refund policy?',
    answer: 'Full refunds are provided for cancellations made at least 48 hours prior to the scheduled tour start time. Instant support is available through our Help Center.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-200/50 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <HelpCircle size={14} /> Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium mt-2">
            Find answers to common questions about exploring India with GuideConnect.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-xl transition-all ${
                    isOpen ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

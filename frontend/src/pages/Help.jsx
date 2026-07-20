import { useState } from 'react';
import { Search, MessageCircle, FileText, Phone, Mail, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Help() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: 'How do I cancel a booking?', a: 'You can cancel any booking up to 48 hours before the start time for a full refund. Go to your Dashboard > My Bookings, and click the Cancel button next to the relevant trip.' },
    { q: 'How are the guides verified?', a: 'All GuideConnect experts undergo a strict verification process including identity checks, professional certification verification, and an interview process.' },
    { q: 'What happens if it rains during an outdoor tour?', a: 'Guides have alternate itineraries for bad weather. However, if the weather poses a safety risk, the guide will cancel and you will be fully refunded.' },
    { q: 'Can I request a custom itinerary?', a: 'Absolutely! You can message any guide before booking to discuss custom requirements or specific sights you want to see.' }
  ];

  // Filter FAQs based on search input
  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-700 text-white py-16 md:py-24 text-center relative overflow-hidden">
        {/* Subtle radial backdrop shape */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight text-white drop-shadow-sm"
          >
            How can we help?
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.15, duration: 0.4 }} 
            className="relative max-w-xl mx-auto"
          >
            <div className={`absolute top-1/2 left-5 -translate-y-1/2 transition-colors duration-300 ${
              searchFocused ? 'text-teal-600' : 'text-slate-400'
            }`}>
              <Search size={22} />
            </div>
            <input 
              type="text" 
              placeholder="Search for articles, questions, or topics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full py-4 pr-6 pl-14 rounded-full border-none text-slate-800 text-base md:text-lg bg-white outline-none shadow-md transition-all duration-300 ${
                searchFocused ? 'shadow-lg ring-4 ring-white/20' : 'shadow-sm'
              }`}
            />
          </motion.div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        {/* Knowledge & Support Columns */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20"
        >
          {[
            { icon: <FileText size={32} />, title: 'Knowledge Base', desc: 'Browse our detailed guides and tutorials on how to use GuideConnect.' },
            { icon: <MessageCircle size={32} />, title: 'Community Forum', desc: 'Join the discussion with other travelers and local guides.' },
            { icon: <Phone size={32} />, title: 'Live Support', desc: 'Get instant help from our 24/7 customer support experts.' }
          ].map((item, i) => (
            <motion.div key={i} variants={itemVariants}>
              <div 
                className="card glass p-8 text-center flex flex-col items-center justify-start h-full hover:-translate-y-1.5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-sm border border-emerald-100/30">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-teal-700 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQs Accordion Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-black text-center text-teal-700 mb-8 tracking-tight">
            Frequently Asked Questions
          </h2>
          
          <div className="card shadow-sm border border-slate-100 overflow-hidden bg-white">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`border-b transition-colors duration-200 ${
                    i !== filteredFaqs.length - 1 ? 'border-slate-100' : 'border-b-0'
                  }`}
                >
                  <button 
                    onClick={() => toggleFaq(i)}
                    className={`w-full flex justify-between items-center px-6 py-5 text-left transition-colors duration-200 outline-none ${
                      openFaq === i ? 'bg-slate-50/50' : 'bg-white hover:bg-slate-50/30'
                    }`}
                  >
                    <h3 className={`text-base font-extrabold transition-colors duration-200 ${
                      openFaq === i ? 'text-teal-650' : 'text-slate-800'
                    }`}>
                      {faq.q}
                    </h3>
                    <motion.div 
                      animate={{ rotate: openFaq === i ? 180 : 0 }} 
                      transition={{ duration: 0.2 }} 
                      className={openFaq === i ? 'text-teal-600' : 'text-slate-400'}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden bg-slate-50/50"
                      >
                        <div className="px-6 pb-5 pt-1 text-slate-500 text-sm leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <div className="text-center py-12 px-4 text-slate-450 font-bold text-sm">
                No matching FAQ questions found for "{searchQuery}".
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Contact CTA */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.1, duration: 0.5 }} 
          className="text-center mt-20"
        >
          <p className="text-slate-500 font-semibold mb-4 text-base sm:text-lg">Still need support?</p>
          <button 
            className="btn btn-primary px-8 py-3.5 gap-2 shadow-md shadow-teal-500/10 text-base"
          >
            <Mail size={18} /> Contact Support Team
          </button>
        </motion.div>

      </div>
    </div>
  );
}

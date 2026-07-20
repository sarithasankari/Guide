import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Slide overlays zoom lightbox modal to inspect gallery images.
 */
export default function LightboxModal({
  isOpen,
  onClose,
  images = [],
  activeIdx,
  setActiveIdx
}) {
  if (!isOpen || images.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/95 select-none">
        
        {/* Close trigger overlay backdrop */}
        <div onClick={onClose} className="absolute inset-0 cursor-zoom-out" />

        {/* Top bar indicators */}
        <div className="absolute top-6 inset-x-6 flex items-center justify-between z-10 text-white">
          <span className="text-xs font-black tracking-widest bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 uppercase">
            Image {activeIdx + 1} of {images.length}
          </span>
          
          <button
            onClick={onClose}
            type="button"
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all hover:scale-105 active:scale-95"
            aria-label="Close photo details lightbox"
          >
            <X size={20} />
          </button>
        </div>

        {/* Previous Nav Control */}
        <button
          onClick={handlePrev}
          type="button"
          className="absolute left-6 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all hover:scale-105 active:scale-95 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={22} className="stroke-[2.5px]" />
        </button>

        {/* Main Image Frame container */}
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-[85vw] max-h-[80vh] z-10"
        >
          <img
            src={images[activeIdx]}
            alt={`Gallery tour item ${activeIdx + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Next Nav Control */}
        <button
          onClick={handleNext}
          type="button"
          className="absolute right-6 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all hover:scale-105 active:scale-95 z-10"
          aria-label="Next image"
        >
          <ChevronRight size={22} className="stroke-[2.5px]" />
        </button>

      </div>
    </AnimatePresence>
  );
}

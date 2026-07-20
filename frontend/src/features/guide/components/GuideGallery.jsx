import React, { useState } from 'react';
import LightboxModal from './LightboxModal';

/**
 * Grid photo wall matching Airbnb Experience layout.
 */
export default function GuideGallery({ guide }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // Fallback visual collection of 5 images representing guide tours
  const galleryImages = [
    guide.coverImage,
    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80', // Indian Temple/History
    'https://images.unsplash.com/photo-1585135497273-1a85b09fe70e?auto=format&fit=crop&w=800&q=80', // Culinary/Spices
    'https://images.unsplash.com/photo-1506461883276-594a12b11db3?auto=format&fit=crop&w=800&q=80', // Mountains/Nature
    guide.image
  ];

  const handleOpen = (idx) => {
    setActiveIdx(idx);
    setIsLightboxOpen(true);
  };

  return (
    <section className="w-full mt-6 select-none">
      {/* Desktop Grid Layout (1 large hero image + 4 grid elements) */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[380px] rounded-3xl overflow-hidden shadow-sm">
        {/* Large Cover */}
        <div 
          onClick={() => handleOpen(0)}
          className="col-span-2 row-span-2 relative group overflow-hidden cursor-pointer bg-slate-100"
        >
          <img 
            src={galleryImages[0]} 
            alt="Guide cover primary" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Small 1 */}
        <div 
          onClick={() => handleOpen(1)}
          className="relative group overflow-hidden cursor-pointer bg-slate-100"
        >
          <img 
            src={galleryImages[1]} 
            alt="Guide tour spot 1" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Small 2 */}
        <div 
          onClick={() => handleOpen(2)}
          className="relative group overflow-hidden cursor-pointer bg-slate-100"
        >
          <img 
            src={galleryImages[2]} 
            alt="Guide tour spot 2" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Small 3 */}
        <div 
          onClick={() => handleOpen(3)}
          className="relative group overflow-hidden cursor-pointer bg-slate-100"
        >
          <img 
            src={galleryImages[3]} 
            alt="Guide tour spot 3" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Small 4 */}
        <div 
          onClick={() => handleOpen(4)}
          className="relative group overflow-hidden cursor-pointer bg-slate-100"
        >
          <img 
            src={galleryImages[4]} 
            alt="Guide avatar detail" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          
          {/* Visual triggers overlay for entire gallery */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
            <span className="bg-white/95 px-4.5 py-2.5 rounded-2xl text-[10px] font-black uppercase text-slate-800 tracking-wider shadow-md">
              Show All Photos
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Carousel */}
      <div className="md:hidden flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
        {galleryImages.map((img, idx) => (
          <div 
            key={idx}
            onClick={() => handleOpen(idx)}
            className="w-72 h-48 rounded-2xl overflow-hidden shrink-0 snap-center relative"
          >
            <img src={img} alt={`Tour spot ${idx + 1}`} className="w-full h-full object-cover" />
            <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md text-[9px] font-black text-white uppercase tracking-widest">
              {idx + 1} / {galleryImages.length}
            </span>
          </div>
        ))}
      </div>

      {/* Slide Modal Overlay */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={galleryImages}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
      />
    </section>
  );
}

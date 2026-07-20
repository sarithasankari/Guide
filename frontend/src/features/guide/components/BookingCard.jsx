import React from 'react';
import { Star, MessageSquare, Heart, ShieldCheck, Users, Plus, Minus, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import AvailabilityCalendar from './AvailabilityCalendar';

/**
 * Sticky booking checkout card displaying price rates, guest tallies, and payment protect details.
 */
export default function BookingCard({
  guide,
  selectedDate,
  onDateChange,
  guestsCount,
  onGuestsChange
}) {
  const navigate = useNavigate();
  const { toggleSave, isSaved } = useApp();
  const saved = isSaved(guide.id);

  // Price calculations
  const baseRate = guide.price || 50;
  const hours = 4; // Mock standard 4-hour half day tour
  const subtotal = baseRate * hours;
  
  // Travelers surcharge if group exceeds 4 guests
  const guestSupplement = guestsCount > 4 ? (guestsCount - 4) * 15 : 0;
  const serviceFee = Math.round((subtotal + guestSupplement) * 0.05);
  const total = subtotal + guestSupplement + serviceFee;

  const handleBook = (e) => {
    e.preventDefault();
    if (!selectedDate) return;
    navigate(`/book/${guide.id}?date=Oct-${selectedDate}&guests=${guestsCount}`);
  };

  return (
    <aside className="w-full lg:w-[380px] lg:sticky lg:top-32 select-none text-left shrink-0">
      
      {/* Principal ticket widget card */}
      <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-[0_4px_25px_-5px_rgba(15,23,42,0.03)] mb-5">
        
        {/* Rate details */}
        <div className="flex justify-between items-center mb-5.5">
          <div>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-0.5">Starting Rate</span>
            <span className="text-2xl font-black text-slate-900">${baseRate}<span className="text-slate-400 font-medium text-sm"> / hr</span></span>
          </div>
          
          <div className="flex items-center gap-1 text-xs font-bold bg-amber-50/80 text-amber-805 border border-amber-100 px-3 py-1.5 rounded-full">
            <Star size={13} className="fill-amber-500 text-amber-500" /> {guide.rating.toFixed(2)}
          </div>
        </div>

        {/* Form fields */}
        <div className="space-y-4.5 mb-6">
          
          {/* Guest tallies counter */}
          <div className="border border-slate-150 p-4.5 rounded-2xl bg-slate-50/20">
            <label className="text-[10px] font-black text-slate-450 uppercase tracking-widest flex items-center gap-1.5 mb-3">
              <Users size={14} className="text-teal-600" /> Group Size
            </label>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-655">
                {guestsCount} Traveler{guestsCount !== 1 ? 's' : ''}
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onGuestsChange(guestsCount - 1)}
                  disabled={guestsCount <= 1}
                  className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:border-slate-350 flex items-center justify-center text-slate-600 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus size={13} className="stroke-[2.5px]" />
                </button>
                <button
                  type="button"
                  onClick={() => onGuestsChange(guestsCount + 1)}
                  disabled={guestsCount >= 12}
                  className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:border-slate-350 flex items-center justify-center text-slate-600 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus size={13} className="stroke-[2.5px]" />
                </button>
              </div>
            </div>
          </div>

          {/* Date Selector component embedded inline */}
          <AvailabilityCalendar
            selectedDate={selectedDate}
            onDateChange={onDateChange}
          />

        </div>

        {/* Pricing calculations details ledger (Visible only if date is selected) */}
        {selectedDate ? (
          <div className="border-t border-slate-100 pt-4.5 space-y-2.5 mb-6 text-xs font-semibold text-slate-600">
            <div className="flex justify-between">
              <span>${baseRate} x {hours} hours tour</span>
              <span className="text-slate-900 font-bold">${subtotal}</span>
            </div>
            
            {guestSupplement > 0 && (
              <div className="flex justify-between">
                <span>Group Surcharge ({guestsCount} travelers)</span>
                <span className="text-slate-900 font-bold">+${guestSupplement}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Service Protection fee (5%)</span>
              <span className="text-slate-900 font-bold">${serviceFee}</span>
            </div>

            <div className="flex justify-between pt-3 border-t border-slate-100 text-sm font-black text-slate-900">
              <span>Total Price</span>
              <span>${total}</span>
            </div>
          </div>
        ) : (
          <p className="text-[10px] text-slate-400 font-extrabold text-center mb-6 uppercase tracking-wider">
            Select a date above to calculate pricing breakdown
          </p>
        )}

        {/* Booking & action CTA controls */}
        <div className="space-y-2.5">
          <button
            onClick={handleBook}
            disabled={!selectedDate}
            type="button"
            className={`w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center cursor-pointer ${
              selectedDate
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-teal-500/10 hover:shadow-lg hover:-translate-y-0.5'
                : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
            }`}
          >
            <span>Book Tour Now</span>
          </button>
          
          <button
            type="button"
            className="w-full py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
          >
            <MessageSquare size={14} className="text-slate-550" />
            <span>Message Guide</span>
          </button>
          
          <button
            onClick={() => toggleSave(guide.id)}
            type="button"
            className={`w-full py-3 border rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
              saved
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-550'
            }`}
          >
            <Heart size={14} fill={saved ? '#F43F5E' : 'none'} />
            <span>{saved ? 'Saved in Favorites' : 'Save Guide'}</span>
          </button>
        </div>

      </div>

      {/* Trust assurance box */}
      <div className="bg-teal-50/50 border border-teal-100/60 p-5 rounded-3xl flex gap-3 text-left">
        <ShieldCheck size={24} className="text-teal-650 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-black text-slate-800 leading-tight">Assurance Safe Booking</h4>
          <p className="text-[10px] text-slate-500 font-semibold leading-relaxed mt-1">
            Verified identity documents, credential monitoring, and secure payment protection on all GuideConnect bookings.
          </p>
        </div>
      </div>

    </aside>
  );
}

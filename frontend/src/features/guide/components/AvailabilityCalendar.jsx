import React from 'react';
import { Calendar as CalIcon, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Visual calendar grid showing date availability slots.
 */
export default function AvailabilityCalendar({
  selectedDate,
  onDateChange
}) {
  const daysInMonth = 31;
  const startOffsetDay = 2; // Tue Oct 2024 offset

  // Let's mock a set of fully booked dates to simulate schedule limits:
  const bookedDates = [3, 7, 12, 18, 22, 28];

  const handleDateClick = (day) => {
    if (bookedDates.includes(day)) return; // Block booked slots
    onDateChange(day);
  };

  return (
    <div className="border border-slate-150 rounded-2xl p-5 select-none bg-slate-50/20 text-left">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black text-slate-450 uppercase tracking-widest flex items-center gap-1.5">
          <CalIcon size={14} className="text-teal-600" /> Select Tour Date — October 2024
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-black uppercase text-slate-400 mb-2">
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
        <div>Su</div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Fill start offsets */}
        {Array.from({ length: startOffsetDay }).map((_, i) => (
          <div key={`offset-${i}`} className="aspect-square" />
        ))}

        {/* Days grid */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const isBooked = bookedDates.includes(day);
          const isSelected = selectedDate === day;

          return (
            <button
              key={day}
              type="button"
              disabled={isBooked}
              onClick={() => handleDateClick(day)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all relative cursor-pointer ${
                isSelected
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/10'
                  : isBooked
                  ? 'bg-rose-50/40 text-rose-350 cursor-not-allowed line-through border border-rose-100/30'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-100 shadow-3xs'
              }`}
            >
              <span>{day}</span>
              {/* Availability dots */}
              {!isBooked && !isSelected && (
                <span className="w-1 h-1 bg-emerald-500 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-4 text-center bg-teal-50 border border-teal-100 text-teal-700 py-2 rounded-xl text-xs font-bold tracking-wide">
          October {selectedDate}, 2024 Selected ✓
        </div>
      )}
    </div>
  );
}

import { Calendar, MapPin, ChevronRight, MessageSquare, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export default function MyBookings() {
  const { bookings } = useApp();

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">My Bookings</h1>
          <p className="text-slate-500 text-sm">Manage your upcoming and past adventures.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary px-4 py-2 text-xs sm:text-sm">Upcoming</button>
          <button className="btn btn-outline px-4 py-2 text-xs sm:text-sm bg-white text-slate-700">Past Trips</button>
          <button className="btn btn-outline px-4 py-2 text-xs sm:text-sm bg-white text-slate-700">Cancelled</button>
        </div>
      </div>

      <div className="space-y-6">
        {bookings.length === 0 ? (
          <div className="p-8 sm:p-16 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-2">No bookings yet</h2>
            <p className="text-slate-500 text-sm mb-6">Time to start planning your next adventure!</p>
            <Link to="/search" className="btn btn-primary">Find a Guide</Link>
          </div>
        ) : (
          bookings.map(booking => (
            <div key={booking.id} className="card p-4 sm:p-6 flex flex-col md:flex-row gap-4 md:gap-6 border border-slate-200">
              <div className="w-full md:w-52 h-48 md:h-36 rounded-xl overflow-hidden shrink-0">
                <img src={booking.image} alt={booking.tourName} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <h2 className="text-lg font-bold text-slate-900">{booking.tourName}</h2>
                    <span className={`badge uppercase text-[10px] ${
                      booking.status === 'confirmed' ? 'badge-success' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-slate-500 text-xs sm:text-sm">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-teal-600"/> {booking.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-teal-600"/> {booking.time} ({booking.duration})</span>
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-teal-600"/> {booking.location}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <img src={booking.guide.image} alt={booking.guide.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100" />
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-800">Guide: {booking.guide.name}</div>
                      <Link to="/dashboard/messages" className="text-xs text-teal-600 font-bold flex items-center gap-1 hover:underline">
                        <MessageSquare size={12} /> Message
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {booking.status === 'pending' ? (
                      <button className="flex-1 sm:flex-none btn btn-outline px-3 py-2 text-xs text-rose-600 border-rose-200 bg-rose-50">Cancel Request</button>
                    ) : (
                      <button className="flex-1 sm:flex-none btn btn-outline px-3 py-2 text-xs text-slate-700 border-slate-200">Modify</button>
                    )}
                    <button className="flex-1 sm:flex-none btn btn-primary px-3.5 py-2 text-xs flex items-center justify-center gap-1">
                      {booking.status === 'pending' ? 'View Details' : 'View Itinerary'} <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

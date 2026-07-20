import { Calendar, MapPin, ChevronRight, MessageSquare, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export default function MyBookings() {
  const { bookings } = useApp();

  return (
    <div style={{ padding: '3rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>My Bookings</h1>
          <p className="text-muted" style={{ fontSize: '1rem' }}>Manage your upcoming and past adventures.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Upcoming</button>
          <button className="btn btn-outline" style={{ padding: '0.5rem 1.5rem', background: 'white', color: 'var(--color-text-main)' }}>Past Trips</button>
          <button className="btn btn-outline" style={{ padding: '0.5rem 1.5rem', background: 'white', color: 'var(--color-text-main)' }}>Cancelled</button>
        </div>
      </div>

      <div className="flex-col gap-6">
        {bookings.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', background: 'white', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>No bookings yet</h2>
            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Time to start planning your next adventure!</p>
            <Link to="/search" className="btn btn-primary">Find a Guide</Link>
          </div>
        ) : (
          bookings.map(booking => (
            <div key={booking.id} className="card" style={{ padding: '2rem', display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '200px', height: '140px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <img src={booking.image} alt={booking.tourName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{booking.tourName}</h2>
                    <span className={booking.status === 'confirmed' ? "badge badge-success" : "badge"} style={{ background: booking.status === 'pending' ? '#FEF08A' : undefined, color: booking.status === 'pending' ? '#854D0E' : undefined, fontSize: '0.75rem', padding: '0.3rem 0.8rem', textTransform: 'uppercase' }}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <span className="flex items-center gap-1"><Calendar size={14}/> {booking.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14}/> {booking.time} ({booking.duration})</span>
                    <span className="flex items-center gap-1"><MapPin size={14}/> {booking.location}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <img src={booking.guide.image} alt={booking.guide.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Guide: {booking.guide.name}</div>
                      <Link to="/dashboard/messages" style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'none' }}>
                        <MessageSquare size={12} /> Message
                      </Link>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {booking.status === 'pending' ? (
                      <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#EF4444', border: '1px solid #FCA5A5', background: '#FEF2F2' }}>Cancel Request</button>
                    ) : (
                      <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }}>Modify</button>
                    )}
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
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

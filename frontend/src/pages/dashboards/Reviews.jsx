import { Star, MessageSquare } from 'lucide-react';

export default function Reviews() {
  return (
    <div style={{ padding: '3rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Reviews</h1>
          <p className="text-muted" style={{ fontSize: '1rem' }}>Reviews you've left for guides and reviews guides have left for you.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>By You</button>
          <button className="btn btn-outline" style={{ padding: '0.5rem 1.5rem', background: 'white', color: 'var(--color-text-main)' }}>About You</button>
        </div>
      </div>

      <div className="flex-col gap-6">
        
        {/* Review Item */}
        <div className="card" style={{ padding: '2rem' }}>
          <div className="flex justify-between items-start" style={{ marginBottom: '1.5rem' }}>
            <div className="flex items-center gap-4">
              <img src="https://randomuser.me/api/portraits/men/96.jpg" alt="Karthik" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Review for Karthik Natarajan</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Tour: Hidden Kitchens of Mylapore • Sept 14, 2023</div>
              </div>
            </div>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="#F59E0B" color="#F59E0B" />)}
            </div>
          </div>
          
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', lineHeight: '1.6', marginBottom: '1.5rem', background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            "Karthik was simply incredible! He took us to places we would have never found on our own. The food was spectacular, but Karthik's deep knowledge of Chennai history and his storytelling ability made it an unforgettable night."
          </p>

          <div className="flex justify-between items-center">
            <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>PUBLISHED</span>
            <div className="flex gap-2">
              <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', border: '1px solid var(--color-border)', color: 'var(--color-text-main)' }}>Edit</button>
              <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', border: '1px solid #FCA5A5', color: '#EF4444' }}>Delete</button>
            </div>
          </div>
        </div>

        {/* To Review Item */}
        <div className="card" style={{ padding: '2rem', border: '2px solid var(--color-primary)' }}>
          <div className="flex justify-between items-start" style={{ marginBottom: '1.5rem' }}>
            <div className="flex items-center gap-4">
              <img src="https://randomuser.me/api/portraits/men/43.jpg" alt="Arun" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Arun P. is waiting for your review</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Tour: Nilgiris Peak Trek Morning • Aug 02, 2023</div>
              </div>
            </div>
            <span className="badge" style={{ background: '#FEF08A', color: '#854D0E' }}>PENDING</span>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn btn-primary" style={{ padding: '0.6rem 2rem', display: 'flex', gap: '0.5rem' }}><MessageSquare size={16}/> Write Review</button>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>You have 4 days left to leave a review.</span>
          </div>
        </div>

      </div>
    </div>
  );
}

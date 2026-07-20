import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, MessageSquare, Star, Settings, Plus, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const path = location.pathname;

  const getNavLinks = () => {
    return [
      { name: 'Dashboard', path: user?.role === 'guide' ? '/dashboard/guide' : user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/traveler', icon: <LayoutDashboard size={18} /> },
      { name: 'My Bookings', path: '/dashboard/bookings', icon: <Calendar size={18} /> },
      { name: 'Messages', path: '/dashboard/messages', icon: <MessageSquare size={18} />, badge: 3 },
      { name: 'Reviews', path: '/dashboard/reviews', icon: <Star size={18} /> },
      { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={18} /> },
    ];
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: 'white', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <Link to="/" style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-primary)' }}>
            GuideConnect
          </Link>
        </div>

        {/* User Profile Snippet */}
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <img src={user?.avatar || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80"} alt={user?.name || "User"} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px', borderRadius: '50%', background: '#10B981', border: '2px solid white' }}></div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Welcome back,</div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{user ? user.name.split(' ')[0] : "Guest"}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem', textTransform: 'capitalize' }}>
              {user?.role || "Traveler"} • 4.9 <Star size={10} fill="#F59E0B" color="#F59E0B" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '1rem' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {getNavLinks().map(link => {
              const isActive = path === link.path || (link.name === 'Dashboard' && path === '/dashboard');
              return (
                <li key={link.name}>
                  <Link to={link.path} style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)',
                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                    color: isActive ? 'white' : 'var(--color-text-main)',
                    fontWeight: isActive ? 600 : 500,
                    transition: 'all var(--transition-fast)'
                  }}>
                    <div className="flex items-center gap-3">
                      {link.icon} {link.name}
                    </div>
                    {link.badge && (
                      <span style={{ 
                        background: isActive ? 'rgba(255, 255, 255,0.2)' : '#EF4444', 
                        color: 'white', fontSize: '0.7rem', fontWeight: 700, 
                        width: '20px', height: '20px', borderRadius: '50%', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center' 
                      }}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {user?.role === 'guide' && (
            <button className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem' }}>
              <Plus size={18} /> Create New Listing
            </button>
          )}
          <button onClick={() => { logout(); navigate('/'); }} className="btn btn-ghost" style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--color-text-muted)', cursor: 'pointer', background: 'transparent', border: 'none' }}>
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>

    </div>
  );
}

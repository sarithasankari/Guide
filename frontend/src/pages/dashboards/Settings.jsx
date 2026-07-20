import { useState } from 'react';
import { User, Mail, Lock, Shield, Bell, CreditCard, Eye, EyeOff } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile Information', icon: User },
  { id: 'security', label: 'Password & Security', icon: Lock },
  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
];

function ProfileTab() {
  return (
    <>
      <h2 className="h3" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Profile Information</h2>
      <div className="flex items-center gap-6" style={{ marginBottom: '2.5rem' }}>
        <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80" alt="Avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-primary)' }} />
        <div>
          <button className="btn btn-outline" style={{ marginBottom: '0.5rem', padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Change Photo</button>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>JPG, GIF or PNG. Max size of 5MB.</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" style={{ marginBottom: '1.5rem' }}>
        <div className="form-group">
          <label className="form-label">First Name</label>
          <input type="text" className="form-input" defaultValue="Alex" />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-input" defaultValue="Morgan" />
        </div>
      </div>
      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
        <label className="form-label">Email Address</label>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}><Mail size={16} /></div>
          <input type="email" className="form-input" defaultValue="alex.morgan@example.com" style={{ paddingLeft: '2.5rem' }} />
        </div>
      </div>
      <div className="form-group" style={{ marginBottom: '2.5rem' }}>
        <label className="form-label">Bio</label>
        <textarea className="form-input" rows={4} defaultValue="Passionate traveler and aspiring photographer based in the UK. I love exploring off the beaten path!"></textarea>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', textAlign: 'right' }}>250 characters left</div>
      </div>
      <div className="flex justify-end gap-3" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
        <button className="btn btn-ghost">Cancel</button>
        <button className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Save Changes</button>
      </div>
    </>
  );
}

function SecurityTab() {
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  return (
    <>
      <h2 className="h3" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Password & Security</h2>
      <div style={{ maxWidth: '480px' }}>
        {[
          { label: 'Current Password', key: 'current' },
          { label: 'New Password', key: 'new' },
          { label: 'Confirm New Password', key: 'confirm' }
        ].map(({ label, key }) => (
          <div className="form-group" key={key} style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">{label}</label>
            <div style={{ position: 'relative' }}>
              <input type={show[key] ? 'text' : 'password'} className="form-input" placeholder="••••••••" style={{ paddingRight: '3rem' }} />
              <button type="button" onClick={() => setShow(s => ({ ...s, [key]: !s[key] }))} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                {show[key] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        ))}
        <div style={{ background: '#EFF6FF', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Password must be at least 8 characters, include an uppercase letter, a number, and a special character.
        </div>
        <button className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Update Password</button>
      </div>

      <div style={{ height: '1px', background: 'var(--color-border)', margin: '2.5rem 0' }}></div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Two-Factor Authentication</h3>
      <div className="flex justify-between items-center" style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Authenticator App</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Use an authenticator app for an extra layer of security.</div>
        </div>
        <div style={{ width: '48px', height: '26px', background: '#E2E8F0', borderRadius: '99px', position: 'relative', cursor: 'pointer' }}>
          <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }}></div>
        </div>
      </div>
    </>
  );
}

function PaymentTab() {
  return (
    <>
      <h2 className="h3" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Payment Methods</h2>
      <div className="flex-col gap-4" style={{ marginBottom: '2rem' }}>
        <div style={{ border: '2px solid var(--color-primary)', borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#EFF6FF' }}>
          <div className="flex items-center gap-4">
            <div style={{ background: 'var(--color-primary)', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em' }}>VISA</div>
            <div>
              <div style={{ fontWeight: 600 }}>•••• •••• •••• 4242</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Expires 08/26</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge badge-primary" style={{ background: '#EFF6FF', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', fontSize: '0.7rem' }}>DEFAULT</span>
            <button style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
          </div>
        </div>

        <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="flex items-center gap-4">
            <div style={{ background: '#003087', color: 'white', padding: '0.5rem 0.8rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.75rem' }}>PayPal</div>
            <div>
              <div style={{ fontWeight: 600 }}>alex.morgan@example.com</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Connected Account</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Set Default</button>
            <button style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
          </div>
        </div>
      </div>
      <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', border: '2px dashed var(--color-border)', width: '100%', justifyContent: 'center', padding: '1rem', color: 'var(--color-text-muted)', background: 'transparent' }}>
        + Add New Payment Method
      </button>
    </>
  );
}

function NotificationsTab() {
  return (
    <>
      <h2 className="h3" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Notification Preferences</h2>
      <div className="flex-col gap-0">
        {[
          { title: 'Booking Confirmations', desc: 'Get notified when a guide confirms your booking.', on: true },
          { title: 'New Messages', desc: 'Receive alerts when you get a new message.', on: true },
          { title: 'Promotional Offers', desc: 'Hear about special deals and new experiences.', on: false },
          { title: 'Trip Reminders', desc: 'Reminder notifications before an upcoming tour.', on: true },
          { title: 'Review Requests', desc: 'Prompt to leave a review after completing a tour.', on: false },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center" style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{item.desc}</div>
            </div>
            <div style={{ width: '48px', height: '26px', background: item.on ? 'var(--color-primary)' : '#E2E8F0', borderRadius: '99px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
              <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: item.on ? '25px' : '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }}></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end" style={{ marginTop: '2rem' }}>
        <button className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Save Preferences</button>
      </div>
    </>
  );
}

function PrivacyTab() {
  return (
    <>
      <h2 className="h3" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Privacy Settings</h2>
      <div className="flex-col gap-0">
        {[
          { title: 'Public Profile', desc: 'Allow other users to see your traveler profile and reviews.', on: true },
          { title: 'Show Online Status', desc: 'Let guides know when you are active on GuideConnect.', on: true },
          { title: 'Data Personalization', desc: 'Allow us to use your data to personalize recommendations.', on: false },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center" style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{item.desc}</div>
            </div>
            <div style={{ width: '48px', height: '26px', background: item.on ? 'var(--color-primary)' : '#E2E8F0', borderRadius: '99px', position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
              <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: item.on ? '25px' : '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }}></div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginTop: '2.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#EF4444', marginBottom: '0.5rem' }}>Danger Zone</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Permanently delete your account and all associated data. This action cannot be undone.</p>
        <button className="btn" style={{ background: '#EF4444', color: 'white', padding: '0.6rem 1.5rem' }}>Delete My Account</button>
      </div>
    </>
  );
}

const tabContent = { profile: <ProfileTab />, security: <SecurityTab />, payment: <PaymentTab />, notifications: <NotificationsTab />, privacy: <PrivacyTab /> };

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto min-h-screen">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">Account Settings</h1>
        <p className="text-slate-500 text-sm">Manage your profile, security preferences, and billing information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Sidebar Nav */}
        <div className="md:col-span-4 lg:col-span-3 flex md:flex-col overflow-x-auto gap-2 pb-2 md:pb-0 shrink-0">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',
                  gap: '0.8rem', padding: '0.9rem 1rem', borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? 'white' : 'var(--color-text-main)',
                  fontWeight: isActive ? 600 : 500, border: 'none', cursor: 'pointer',
                  fontSize: '0.95rem', transition: 'all 0.15s'
                }}
                onMouseOver={e => { if (!isActive) e.currentTarget.style.background = '#F1F5F9'; }}
                onMouseOut={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon size={18} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Panel */}
        <div className="md:col-span-8 lg:col-span-9 card p-4 sm:p-8 border border-slate-200">
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
      {/* Left Side: Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', backgroundColor: 'var(--color-surface)' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Create Account</h1>
          <p className="text-muted" style={{ marginBottom: '2.5rem' }}>Join GuideConnect and start exploring the world like a local.</p>

          <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '2rem' }}>
            <button className="btn btn-outline" style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-main)', display: 'flex', gap: '0.5rem', fontWeight: 500 }}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={18} /> Google
            </button>
            <button className="btn btn-outline" style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-main)', display: 'flex', gap: '0.5rem', fontWeight: 500 }}>
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" width={18} /> GitHub
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Or register with email</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
          </div>

          <form onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                  <User size={18} />
                </div>
                <input type="text" className="form-input" placeholder="Alex Morgan" style={{ paddingLeft: '2.8rem' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                  <Mail size={18} />
                </div>
                <input type="email" className="form-input" placeholder="alex@example.com" style={{ paddingLeft: '2.8rem' }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                  <Lock size={18} />
                </div>
                <input type={showPassword ? "text" : "password"} className="form-input" placeholder="••••••••" style={{ paddingLeft: '2.8rem', paddingRight: '2.8rem' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '2rem' }}>
              <input type="checkbox" id="terms" style={{ marginTop: '0.2rem' }} />
              <label htmlFor="terms" style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', cursor: 'pointer' }}>
                I agree to the <Link to="#" style={{ color: 'var(--color-primary)' }}>Terms of Service</Link> and <Link to="#" style={{ color: 'var(--color-primary)' }}>Privacy Policy</Link>.
              </label>
            </div>

            <Link to="/dashboard/traveler" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', textAlign: 'center', display: 'block' }}>
              Create Account
            </Link>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Already have an account? <Link to="/login" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Sign In</Link>
          </div>
        </div>
      </div>

      {/* Right Side: Image Banner */}
      <div style={{ 
        flex: 1, 
        backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '3rem'
      }}>
        <div className="glass-dark" style={{ padding: '2.5rem', borderRadius: 'var(--radius-xl)', color: 'white', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', lineHeight: '1.2' }}>Your Next Adventure Awaits.</h2>
          <p style={{ color: '#CBD5E1', lineHeight: '1.6' }}>
            Get access to thousands of verified local experts and unique experiences worldwide. 
          </p>
        </div>
      </div>

    </div>
  );
}

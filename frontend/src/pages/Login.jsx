import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('traveler');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000)); // Simulate API
    login(role);
    setLoading(false);

    if (role === 'guide') navigate('/dashboard/guide');
    else if (role === 'admin') navigate('/dashboard/admin');
    else navigate('/dashboard/traveler');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
      {/* Left: Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', backgroundColor: 'var(--color-surface)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle decorative background elements */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(13, 148, 136,0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
        
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
          style={{ width: '100%', maxWidth: '420px', zIndex: 10 }}
        >
          <motion.h1 variants={itemVariants} style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-text-main)', letterSpacing: '-0.02em' }}>Welcome Back</motion.h1>
          <motion.p variants={itemVariants} className="text-muted" style={{ marginBottom: '2.5rem', fontSize: '1.05rem' }}>Enter your credentials to access your GuideConnect account.</motion.p>

          {/* Demo Role Switcher */}
          <motion.div variants={itemVariants} style={{ background: '#F1F5F9', borderRadius: 'var(--radius-lg)', padding: '0.35rem', marginBottom: '2rem', display: 'flex', gap: '0.35rem' }}>
            {['traveler', 'guide', 'admin'].map(r => (
              <button key={r} onClick={() => setRole(r)}
                style={{ flex: 1, padding: '0.6rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', textTransform: 'capitalize', background: role === r ? 'white' : 'transparent', color: role === r ? 'var(--color-primary)' : 'var(--color-text-muted)', boxShadow: role === r ? 'var(--shadow-sm)' : 'none', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                {r}
              </button>
            ))}
          </motion.div>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }} 
                animate={{ opacity: 1, height: 'auto', marginBottom: '1.5rem' }} 
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-md)', padding: '0.8rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#EF4444', fontSize: '0.85rem', fontWeight: 500 }}>
                  <AlertCircle size={16} /> {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form variants={itemVariants} onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600, color: 'var(--color-secondary)' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: emailFocused ? 'var(--color-primary)' : 'var(--color-text-light)', pointerEvents: 'none', transition: 'color 0.2s' }} className="icon-wrapper"><Mail size={18} /></div>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="alex@example.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  style={{ paddingLeft: '2.8rem', paddingRight: '1rem', fontSize: '1rem', height: '3rem', transition: 'all 0.2s ease', backgroundColor: emailFocused ? 'white' : '#F8FAFC' }} 
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '2.5rem' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                <label className="form-label" style={{ marginBottom: 0, fontWeight: 600, color: 'var(--color-secondary)' }}>Password</label>
                <Link to="#" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', transition: 'opacity 0.2s' }} onMouseOver={e=>e.target.style.opacity='0.8'} onMouseOut={e=>e.target.style.opacity='1'}>Forgot password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: passwordFocused ? 'var(--color-primary)' : 'var(--color-text-light)', pointerEvents: 'none', transition: 'color 0.2s' }}><Lock size={18} /></div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-input" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  style={{ paddingLeft: '2.8rem', paddingRight: '3rem', fontSize: '1rem', height: '3rem', transition: 'all 0.2s ease', backgroundColor: passwordFocused ? 'white' : '#F8FAFC' }} 
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', color: 'var(--color-text-light)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.backgroundColor='rgba(0,0,0,0.05)'} onMouseOut={e=>e.currentTarget.style.backgroundColor='transparent'}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn btn-primary" 
              disabled={loading} 
              style={{ width: '100%', padding: '0.875rem', fontSize: '1.05rem', fontWeight: 700, opacity: loading ? 0.7 : 1, borderRadius: 'var(--radius-lg)' }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </motion.button>
          </motion.form>

          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
            Don't have an account? <Link to="/signup" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Create one now</Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Right: Image */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80")',
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        />
        {/* Subtle gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)' }} />
        
        <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', padding: '4rem' }}>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(20px)', padding: '3rem', borderRadius: 'var(--radius-xl)', color: 'white', maxWidth: '440px', border: '1px solid rgba(255, 255, 255,0.15)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1.25rem', lineHeight: '1.15', letterSpacing: '-0.02em' }}>Unlock Authentic Local Expertise.</h2>
            <p style={{ color: '#E2E8F0', marginBottom: '2.5rem', lineHeight: '1.7', fontSize: '1.05rem' }}>Connect with verified professional guides and experience destinations exactly how the locals do.</p>
            <div className="flex items-center gap-4">
              <div style={{ display: 'flex', marginLeft: '10px' }}>
                {['/guide_alex.png', '/guide_elena.png', '/guide_marco.png'].map((img, i) => (
                  <motion.img 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (i * 0.1) }}
                    key={i} 
                    src={img} 
                    alt="" 
                    style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid #0F172A', marginLeft: '-15px', objectFit: 'cover', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} 
                  />
                ))}
              </div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255, 255, 255,0.9)' }}
              >
                Joined by 12,000+ experts
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}




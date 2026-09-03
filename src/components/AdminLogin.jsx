// ============================================================
// AKV GLOBAL CONSULTANCY — Admin Login Portal Component
// ============================================================
import React, { useState } from 'react';
import { Shield, Key, User, Lock, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import './AdminDashboard.css';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      // Admin authentication check (default credentials: admin / admin123)
      if ((username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'admin@akv.ae') && password === 'admin123') {
        if (rememberMe) {
          localStorage.setItem('akv_admin_authenticated', 'true');
        } else {
          sessionStorage.setItem('akv_admin_authenticated', 'true');
        }
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid username or password. Default credentials: admin / admin123');
      }
    }, 600);
  };

  return (
    <div className="admin-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '110px 20px 40px' }}>
      <div className="admin-modal" style={{ maxWidth: '460px', borderRadius: '24px', border: '1px solid rgba(197, 160, 89, 0.4)', background: '#121722', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
        
        {/* Header Branding */}
        <div style={{ padding: '36px 36px 20px', textAlign: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <img
            src="images/AKV final logo.png"
            alt="AKV Global"
            style={{ height: '48px', margin: '0 auto 16px', display: 'block', objectFit: 'contain' }}
          />
          <div className="admin-badge" style={{ margin: '0 auto 12px' }}>
            <Shield size={13} /> Admin Portal Authentication
          </div>
          <h2 style={{ fontFamily: 'var(--ff-serif)', fontSize: '24px', color: '#ffffff', fontWeight: 700, margin: '6px 0 4px' }}>
            Sign In to Admin Dashboard
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '13px' }}>
            Enter administrator credentials to manage Off-Plan projects.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '30px 36px 36px' }}>
          {errorMessage && (
            <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '12px 14px', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div style={{ marginBottom: '18px' }}>
            <label className="admin-label">Username / Admin Email</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="text"
                className="admin-input"
                style={{ paddingLeft: '40px' }}
                placeholder="Enter 'admin'"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label className="admin-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="password"
                className="admin-input"
                style={{ paddingLeft: '40px' }}
                placeholder="Enter 'admin123'"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '13px', color: '#94a3b8' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--c-gold)', width: '15px', height: '15px', cursor: 'pointer' }}
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="btn-admin-primary"
            disabled={isLoading}
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}
          >
            {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={14} /> Back to Public Website
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

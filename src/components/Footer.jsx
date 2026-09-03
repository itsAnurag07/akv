import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function GlobalFooter({ navigate, setListingTab, setFilterType }) {
  const handleNav = (page) => {
    if (navigate) navigate(page);
  };

  const handleListingFilter = (tab) => {
    if (setListingTab) setListingTab(tab);
    if (setFilterType) setFilterType('');
    if (navigate) navigate('listings');
  };

  return (
    <footer className="global-site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img
            src="images/AKV final logo.png"
            alt="AKV Global"
            style={{ height: '48px', width: 'auto', objectFit: 'contain', marginBottom: '20px', display: 'block' }}
          />
          <p className="footer-tagline">Dubai's premium real estate partner — combining expertise, integrity and market knowledge.</p>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Properties</h4>
          <div className="footer-links">
            <span className="footer-link" onClick={() => handleListingFilter('Buy')}>Buy</span>
            <span className="footer-link" onClick={() => handleListingFilter('Rent')}>Rent</span>
            <span className="footer-link" onClick={() => handleListingFilter('Off-Plan')}>Off-Plan</span>
            <span className="footer-link" onClick={() => handleListingFilter('All')}>Featured Properties</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <div className="footer-links">
            <span className="footer-link" onClick={() => handleNav('communities')}>Communities</span>
            <span className="footer-link" onClick={() => handleNav('about')}>About Us</span>
            <span className="footer-link" onClick={() => handleNav('why-invest')}>Investment Guide</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <div className="footer-links">
            <span className="footer-link" onClick={() => handleNav('about')}>About Us</span>
            <span className="footer-link" onClick={() => handleNav('home')}>Our Services</span>
            <span className="footer-link" onClick={() => { handleNav('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Contact</span>
          </div>
        </div>

        <div className="footer-col" id="contact">
          <h4>Contact &amp; Offices</h4>
          <div className="footer-contact-item"><span className="fi"><Phone size={13} strokeWidth={2} /></span><span>+91 70090 66676</span></div>
          <div className="footer-contact-item"><span className="fi"><Mail size={13} strokeWidth={2} /></span><span>info@akvglobal.ae</span></div>
          <div className="footer-contact-item" style={{ alignItems: 'flex-start' }}>
            <span className="fi" style={{ marginTop: '3px' }}><MapPin size={13} strokeWidth={2} /></span>
            <div>
              <strong style={{ color: 'var(--c-gold)', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Dubai Office</strong>
              <span>Business Bay, Clover Bay, Dubai, UAE</span>
            </div>
          </div>
          <div className="footer-contact-item" style={{ alignItems: 'flex-start', marginTop: '6px' }}>
            <span className="fi" style={{ marginTop: '3px' }}><MapPin size={13} strokeWidth={2} /></span>
            <div>
              <strong style={{ color: 'var(--c-gold)', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>India Office</strong>
              <span>Dada Colony, Industrial Area, Jalandhar 144008, Punjab, India</span>
            </div>
          </div>

        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', maxWidth: '1280px', margin: '0 auto', padding: '20px 40px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div className="rera-badge">RERA Registered · Dubai Real Estate Regulatory Agency · Licence No. RERA-XXXX</div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">© 2026 AKV Global Consultant. All rights reserved.</div>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Cookie Policy</a>
          <span onClick={() => handleNav('admin')} style={{ cursor: 'pointer', color: 'rgba(197, 160, 89, 0.7)', transition: 'color 0.2s' }} title="Off-Plan Admin Management Portal">Staff Admin Portal</span>
        </div>
      </div>
    </footer>
  );
}

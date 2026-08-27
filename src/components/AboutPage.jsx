import React, { useState, useEffect, useRef } from 'react';
import GlobalFooter from './Footer';
import { TESTIMONIALS } from '../data';
import {
  ChevronRight,
  ArrowRight,
  Award,
  Users,
  Globe,
  TrendingUp,
  Home,
  Key,
  Construction,
  Shield,
  CheckCircle,
  Briefcase,
  Sparkles,
  Building2,
  FileCheck,
  Compass,
  Zap,
  PhoneCall,
  Star,
  Quote
} from 'lucide-react';

// Animated Count Up Component triggered on scroll visibility
function CountUpNumber({ end, decimals = 0, duration = 2200, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Cubic ease-out
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeOutProgress * end);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function AboutPage({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);

  const team = [
    {
      name: 'Paramdeep Singh',
      role: 'Co-Founder & Managing Director',
      specialty: 'Ultra-Luxury Villas & Private Estates',
      bio: 'Senior Dubai luxury real estate specialist. Paramdeep co-founded AKV to bring institutional-grade investment strategy and private office level discretion to global investors.',
      img: 'images/Paramdeep_new.png',
      link: 'https://www.linkedin.com/in/paramdeep-singh-0b3603428?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    },
    {
      name: 'Habib Khan',
      role: 'Operational & Sales Head',
      specialty: 'Pre-Launch Penthouse & Developer Allocations',
      volume: 'AED 3.2B+ Closed',
      bio: 'Former senior advisor for tier-1 Dubai developers. Habib leads operations and sales at AKV to maintain direct priority access to off-market launches across Palm Jumeirah and Downtown Dubai.',
      img: 'images/Habib Khan.jpeg',
      link: 'https://wa.me/917009066676?text=Hello%20AKV%20Global%2C%20I%20would%20like%20to%20connect%20with%20Habib%20Khan.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Strategic Consultation & Mandate Definition',
      subtitle: 'Understanding Your Capital Objectives & Lifestyle Vision',
      desc: 'We analyze your yield targets, holding horizons, tax residency goals, and asset preferences to structure a bespoke Dubai property acquisition strategy.',
      icon: <Compass size={24} />,
      highlights: ['Yield vs. Appreciation modeling', 'Golden Visa eligibility check', 'Custom risk profile assessment']
    },
    {
      step: '02',
      title: 'Private Sourcing & Off-Market Access',
      subtitle: 'Unlocking Exclusive Inventory Before Public Release',
      desc: 'Leveraging our direct C-suite developer partnerships and private owner network, we curate pre-launch allocations and unlisted trophy properties.',
      icon: <Building2 size={24} />,
      highlights: ['Priority launch allocations', 'Off-market villa inspections', 'Due-diligence report per unit']
    },
    {
      step: '03',
      title: 'Institutional Conveyancing & Financial Structuring',
      subtitle: 'Seamless Execution & Safeguarded Escrow Transfer',
      desc: 'Our in-house RERA conveyancers coordinate all contracts, developer approvals, Trustee Office filings, and escrow guarantees with zero hassle.',
      icon: <FileCheck size={24} />,
      highlights: ['RERA Form F & SPA execution', 'Escrow account verification', 'Power of Attorney management']
    },
    {
      step: '04',
      title: 'Post-Handover & Asset Optimization',
      subtitle: 'Maximizing Long-Term Capital Returns',
      desc: 'From high-yield tenant placement and property management to strategic re-sale timing, we continuously protect and enhance your investment.',
      icon: <TrendingUp size={24} />,
      highlights: ['Tenant screening & rent collection', 'Snagging & interior handover', 'Annual portfolio performance reviews']
    }
  ];

  const coreValues = [
    {
      num: '',
      title: 'Assistance for Client Requirements',
      desc: 'Dedicated to assisting every client in finding and securing the ideal property or asset tailored precisely to their lifestyle aspirations and investment goals.',
      icon: <Users size={24} />
    },
    {
      num: '',
      title: 'Knowledge Mastery',
      desc: 'Institutional market intelligence backed by comprehensive Dubai data, proprietary yield analytics, developer track records, and RERA legal safeguards.',
      icon: <Zap size={24} />
    },
    {
      num: '',
      title: 'Visionary Strategy',
      desc: 'Forward-thinking wealth creation aligned with Dubai\'s 2030 Master Plan, positioning capital ahead of market cycles for lasting generational legacy.',
      icon: <Compass size={24} />
    },
    {
      num: '',
      title: 'Client Stewardship',
      desc: 'Discreet private client care for HNW families and institutional investors — managing your property portfolio end-to-end with total transparency.',
      icon: <Briefcase size={24} />
    }
  ];

  return (
    <div id="page-about-redesign" className="page active page-about-v2">
      {/* ── HERO BANNER ── */}
      <section className="ab2-hero">
        <div className="ab2-hero-ambient" />
        <div className="container ab2-hero-container">
          <div className="ab2-hero-grid">
            <div className="ab2-hero-content">
              <div className="ab2-badge">
                <Sparkles size={14} className="ab2-badge-icon" />
                <span>AKV — Assist · Knowledge · Vision Consultant</span>
              </div>

              <h1 className="ab2-hero-heading">
                Elevating Property Advisory to a <span className="text-gold-gradient">Masterpiece</span>.
              </h1>

              <p className="ab2-hero-lead">
                AKV Global Consultant stands for <strong>Assist · Knowledge · Vision</strong> — assisting international investors, HNW families, and private offices in discovering and securing the perfect Dubai property.
              </p>

              <div className="ab2-hero-actions">
                <button className="btn btn-gold btn-lg" onClick={() => onNavigate('listings')}>
                  <span>Explore Portfolio</span>
                  <ArrowRight size={18} />
                </button>
                <a href="https://wa.me/917009066676?text=Hello%20AKV%20Global%2C%20I%20would%20like%20to%20book%20a%20private%20advisory%20consultation." className="btn btn-outline-dark btn-lg" target="_blank" rel="noopener noreferrer">
                  <PhoneCall size={18} />
                  <span>Book Private Advisory</span>
                </a>
              </div>

              <div className="ab2-hero-trust-bar">
                <div className="ab2-trust-item">
                  <CheckCircle size={16} className="ab2-check-gold" />
                  <span>RERA Licensed &amp; Regulated</span>
                </div>
                <div className="ab2-trust-item">
                  <CheckCircle size={16} className="ab2-check-gold" />
                  <span>AED 10B+ Transaction Record</span>
                </div>
                <div className="ab2-trust-item">
                  <CheckCircle size={16} className="ab2-check-gold" />
                  <span>Boutique Private Office Advisory</span>
                </div>
              </div>
            </div>

            <div className="ab2-hero-visual">
              <div className="ab2-hero-frame">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
                  alt="Dubai Luxury Skyline Architecture"
                  className="ab2-hero-img"
                />
                <div className="ab2-hero-glass-card">
                  <Award size={32} className="ab2-gold-icon" />
                  <div>
                    <div className="ab2-glass-title">Dubai's #1 Luxury Advisory</div>
                    <div className="ab2-glass-sub">Assist · Knowledge · Vision Philosophy</div>
                  </div>
                </div>

                <div className="ab2-hero-stat-floating">
                  <span className="ab2-float-num">
                    <CountUpNumber end={100} suffix="%" />
                  </span>
                  <span className="ab2-float-txt">Client Focused Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS COUNTER BAR ── */}
      <section className="ab2-stats-strip">
        <div className="container">
          <div className="ab2-stats-grid">
            <div className="ab2-stat-box">
              <div className="ab2-stat-number">
                <CountUpNumber end={10} prefix="AED " suffix="B+" />
              </div>
              <div className="ab2-stat-label">Total Transaction Volume</div>
            </div>
            <div className="ab2-stat-box">
              <div className="ab2-stat-number">
                <CountUpNumber end={500} suffix="+" />
              </div>
              <div className="ab2-stat-label">Satisfied Global Investors</div>
            </div>
            <div className="ab2-stat-box">
              <div className="ab2-stat-number">
                <CountUpNumber end={99.2} decimals={1} suffix="%" />
              </div>
              <div className="ab2-stat-label">Client Retention &amp; Referral</div>
            </div>
            <div className="ab2-stat-box">
              <div className="ab2-stat-number">
                <CountUpNumber end={100} suffix="%" />
              </div>
              <div className="ab2-stat-label">Transparent RERA Compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER'S VISION & STORY ── */}
      <section className="section ab2-vision-section">
        <div className="container">
          <div className="ab2-vision-card">
            <div className="ab2-vision-grid">
              <div className="ab2-vision-image-col">
                <div className="ab2-founder-portrait-wrap">
                  <img
                    src="images/Paramdeep_new.png"
                    alt="Paramdeep Singh Co-Founder"
                    className="ab2-founder-img"
                  />
                  <div className="ab2-founder-badge">
                    <div className="ab2-founder-name">Paramdeep Singh</div>
                    <div className="ab2-founder-role">Co-Founder &amp; Managing Director</div>
                  </div>
                </div>
              </div>

              <div className="ab2-vision-content-col">
                <div className="label label--gold mb-12">Leadership Vision</div>
                <h2 className="ab2-section-title">
                  "Real estate in Dubai is not merely an acquisition — it is the creation of a lasting legacy."
                </h2>
                <div className="ab2-quote-divider" />
                <p className="ab2-story-body">
                  When we established AKV Global Consultant, we anchored our firm around three core commitments: <strong>Assist, Knowledge, and Vision</strong>. We assist every client in finding and acquiring the exact property or asset aligned with their unique requirements.
                </p>
                <p className="ab2-story-body">
                  Whether you are seeking an iconic beachfront villa on Palm Jumeirah, high-yielding off-plan apartments in Downtown Dubai, or structuring a multi-asset commercial portfolio, our commitment remains absolute — unyielding integrity, exclusive access, and personal stewardship.
                </p>

                <div className="ab2-signature-row">
                  <div className="ab2-sig-text">Paramdeep Singh</div>
                  <div className="ab2-sig-tag">Co-Founder &amp; Managing Director, AKV Global</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE PILLARS BENTO GRID ── */}
      <section className="section section--beige ab2-pillars-section">
        <div className="container">
          <div className="ab2-header-center">
            <div className="label mb-12">Our Foundation</div>
            <h2 className="section-heading">The Four Pillars of AKV Advisory</h2>
            <p className="section-sub">Engineered to protect your capital and maximize returns across Dubai property cycles</p>
          </div>

          <div className="ab2-pillars-grid">
            {coreValues.map((val, idx) => (
              <div key={idx} className="ab2-pillar-card">
                <div className="ab2-pillar-top">
                  <span className="ab2-pillar-num">{val.num}</span>
                  <div className="ab2-pillar-icon">{val.icon}</div>
                </div>
                <h3 className="ab2-pillar-title">{val.title}</h3>
                <p className="ab2-pillar-desc">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BESPOKE ADVISORY PROCESS ── */}
      <section className="section ab2-process-section">
        <div className="container">
          <div className="ab2-header-center">
            <div className="label label--gold mb-12">Step-by-Step Experience</div>
            <h2 className="section-heading text-white">Our 4-Step Bespoke Advisory Process</h2>
            <p className="section-sub text-muted">A streamlined, transparent journey from initial consultation to long-term portfolio growth</p>
          </div>

          <div className="ab2-process-layout">
            <div className="ab2-process-nav">
              {processSteps.map((s, idx) => (
                <div
                  key={idx}
                  className={`ab2-process-tab ${activeStep === idx ? 'active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="ab2-ptab-num">{s.step}</div>
                  <div>
                    <div className="ab2-ptab-title">{s.title}</div>
                    <div className="ab2-ptab-sub">{s.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ab2-process-detail-card">
              <div className="ab2-pdetail-header">
                <div className="ab2-pdetail-icon">{processSteps[activeStep].icon}</div>
                <div>
                  <span className="ab2-pdetail-step">Phase {processSteps[activeStep].step}</span>
                  <h3 className="ab2-pdetail-title">{processSteps[activeStep].title}</h3>
                </div>
              </div>

              <p className="ab2-pdetail-desc">{processSteps[activeStep].desc}</p>

              <div className="ab2-pdetail-highlights">
                <div className="ab2-phighlight-title">Key Phase Deliverables:</div>
                <div className="ab2-phighlight-list">
                  {processSteps[activeStep].highlights.map((item, i) => (
                    <div key={i} className="ab2-phighlight-item">
                      <CheckCircle size={15} className="ab2-gold-check" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERT LEADERSHIP TEAM ── */}
      <section className="section section--white ab2-team-section">
        <div className="container">
          <div className="ab2-header-center">
            <div className="label mb-12">The Minds Behind AKV</div>
            <h2 className="section-heading">Meet Our Leadership Team</h2>
            <p className="section-sub">Seasoned real estate specialists dedicated to Dubai market leadership and client success</p>
          </div>

          <div className="ab2-team-grid two-columns">
            {team.map((member, idx) => (
              <div key={idx} className="ab2-team-card">
                <div className="ab2-team-img-wrap">
                  <img src={member.img} alt={member.name} className="ab2-team-img" />
                  <div className="ab2-team-tag">{member.volume}</div>
                </div>
                <div className="ab2-team-body">
                  <h3 className="ab2-team-name">{member.name}</h3>
                  <div className="ab2-team-role">{member.role}</div>
                  <div className="ab2-team-spec">
                    <Sparkles size={13} className="text-gold" />
                    <span>{member.specialty}</span>
                  </div>
                  <p className="ab2-team-bio">{member.bio}</p>

                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark btn-sm w-full"
                    style={{ marginTop: '18px', justifyContent: 'center' }}
                  >
                    <span>Connect with {member.name.split(' ')[0]}</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT TESTIMONIALS & RECOGNITION ── */}
      <section className="section section--beige ab2-testi-section">
        <div className="container">
          <div className="ab2-header-center">
            <div className="label mb-12">Global Investor Trust</div>
            <h2 className="section-heading">What Our HNW Clients Say</h2>
            <p className="section-sub">Unedited feedback from private clients, expats, and institutional investors</p>
          </div>

          <div className="ab2-testi-grid">
            {TESTIMONIALS.slice(0, 3).map((item, idx) => (
              <div key={idx} className="ab2-testi-card">
                <div className="ab2-testi-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="var(--c-gold)" style={{ color: 'var(--c-gold)' }} />
                  ))}
                </div>
                <Quote size={28} className="ab2-quote-icon" />
                <p className="ab2-testi-text">{item.text.replace(/^"|"$/g, '')}</p>
                <div className="ab2-testi-user">
                  <img src={item.avatar} alt={item.name} className="ab2-user-avatar" />
                  <div>
                    <div className="ab2-user-name">{item.name}</div>
                    <div className="ab2-user-role">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LUXURY CTA BANNER ── */}
      <section className="ab2-cta-banner">
        <div className="container">
          <div className="ab2-cta-card">
            <div className="ab2-cta-content">
              <div className="label label--gold mb-12">Start Your Dubai Property Mandate</div>
              <h2 className="ab2-cta-title">Ready to Find Your Premier Dubai Residence or Investment Asset?</h2>
              <p className="ab2-cta-sub">
                Connect directly with our leadership team today for a private, zero-obligation consultation and custom market proposal.
              </p>
            </div>
            <div className="ab2-cta-actions">
              <button className="btn btn-gold btn-lg" onClick={() => onNavigate('listings')}>
                Browse Luxury Listings
              </button>
              <a
                href="https://wa.me/917009066676?text=Hello%20AKV%20Global%2C%20I%20would%20like%20to%20speak%20with%20a%20Senior%20Advisor."
                className="btn btn-outline-light btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Senior Advisor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL SITE FOOTER ── */}
      <GlobalFooter navigate={onNavigate} />
    </div>
  );
}

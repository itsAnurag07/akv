import React, { useState, useEffect, useRef } from 'react';
import GlobalFooter from './Footer';
import { COMMUNITIES } from '../data';
import {
  ChevronRight,
  ArrowRight,
  MapPin,
  Building2,
  TrendingUp,
  Anchor,
  Waves,
  Star,
  ShoppingBag,
  UtensilsCrossed,
  Compass,
  Shield,
  Hotel,
  Sparkles,
  CheckCircle,
  Eye,
  Award,
  PhoneCall,
  Layers,
  Sparkle
} from 'lucide-react';

// Dedicated Scroll-Driven Parallax Image Component
function ParallaxImage({ src, alt, speed = 0.25, className = '', height = '480px' }) {
  const containerRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate position relative to viewport center
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      
      // Apply parallax translation offset
      setOffsetY(distanceFromCenter * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef} className={`parallax-frame ${className}`} style={{ height }}>
      <img
        src={src}
        alt={alt}
        className="parallax-img-content"
        style={{
          transform: `translate3d(0, ${offsetY}px, 0) scale(1.28)`,
          transition: 'transform 0.08s ease-out'
        }}
      />
      <div className="parallax-gradient-overlay" />
    </div>
  );
}

const EXPANDED_COMMUNITIES = [
  {
    id: 'downtown',
    name: 'Downtown Dubai',
    tagline: 'The City\'s Iconic Heart & Financial Core',
    desc: 'Home to the Burj Khalifa, Dubai Mall, and Dubai Opera — Downtown is the world-famous epicenter of ultra-luxury urban living and international footfall.',
    img: 'images/downtown_dubai.png',
    stats: { avgPrice: 'AED 2.8M', roi: '5.2%', props: '1,200+', type: 'Luxury Apartments & Penthouses' },
    lifestyle: 'Iconic city living with Michelin-star dining, opera shows, and fashion avenue shopping at your doorstep.',
    highlights: [
      { title: 'Burj Khalifa Views', desc: 'Direct views of the world\'s tallest tower' },
      { title: 'Dubai Mall & Opera', desc: 'World-class retail and cultural entertainment' },
      { title: 'Strong Tourism Yields', desc: '5.2% average rental yield with high occupancy' }
    ]
  },
  {
    id: 'palm',
    name: 'Palm Jumeirah',
    tagline: 'The World\'s Most Prestigious Island Address',
    desc: 'The world-famous man-made palm island offering private beach frond villas, celebrity estates, and ultra-exclusive beachfront penthouses.',
    img: 'images/palm_jumeirah.png',
    stats: { avgPrice: 'AED 8.5M', roi: '4.8%', props: '800+', type: 'Beach Villas & Sea Penthouses' },
    lifestyle: 'Ultra-exclusive island living with private sands, yacht berths, and Michelin-starred dining at Atlantis The Royal.',
    highlights: [
      { title: 'Private Beach Fronds', desc: 'Direct private sea access for luxury villas' },
      { title: 'Atlantis The Royal', desc: 'Unrivalled luxury dining & lifestyle hub' },
      { title: 'Capital Preservation', desc: 'Sustained capital appreciation due to limited supply' }
    ]
  },
  {
    id: 'marina',
    name: 'Dubai Marina',
    tagline: 'Vibrant Mediterranean Waterfront District',
    desc: 'A world-renowned 3.5km yacht canal promenade surrounded by high-rise luxury towers, fine dining, and direct access to JBR Beach.',
    img: 'images/dubai_marina.png',
    stats: { avgPrice: 'AED 2.2M', roi: '6.1%', props: '2,400+', type: 'Yacht View Apartments' },
    lifestyle: 'Cosmopolitan Riviera lifestyle with a continuous waterfront promenade, beach clubs, and yachting culture.',
    highlights: [
      { title: '3.5km Marina Walk', desc: 'Yacht-lined pedestrian promenade' },
      { title: 'JBR Beach Access', desc: 'Walking distance to beachfront dining' },
      { title: 'High Short-Term Yields', desc: '6.1% rental yield — top vacation rental area' }
    ]
  },
  {
    id: 'dubai-hills',
    name: 'Dubai Hills Estate',
    tagline: 'The Green Heart & Championship Golf Sanctuary',
    desc: 'An expansive 18-hole championship golf course community featuring sprawling parks, luxury mansions, modern apartments, and Dubai Hills Mall.',
    img: 'images/villa.png',
    stats: { avgPrice: 'AED 3.5M', roi: '6.4%', props: '1,500+', type: 'Golf Villas & Parkside Apartments' },
    lifestyle: 'Family-centric luxury living with vast green open spaces, top international schools, and premier golf courses.',
    highlights: [
      { title: '18-Hole Championship Golf', desc: 'Troon-managed course with skyline vistas' },
      { title: '180,000 sqm Central Park', desc: 'Lush parkland, splash pads & sports courts' },
      { title: '6.4% Strong Family Yield', desc: 'Top choice for long-term expat families' }
    ]
  },
  {
    id: 'business-bay',
    name: 'Business Bay & Canal',
    tagline: 'Cosmopolitan Water Canal District',
    desc: 'Bordering Downtown Dubai and the Dubai Water Canal, Business Bay features striking architectural towers, five-star hotel residences, and canal boardwalks.',
    img: 'images/apartment.png',
    stats: { avgPrice: 'AED 1.9M', roi: '7.1%', props: '3,100+', type: 'Canal Apartments & Penthouses' },
    lifestyle: 'Dynamic urban lifestyle steps from the Dubai Water Canal promenade and central financial hubs.',
    highlights: [
      { title: 'Water Canal Boardwalk', desc: 'Pedestrian boardwalk with floating venues' },
      { title: 'Adjacent to Downtown', desc: 'Minutes from Burj Khalifa & financial center' },
      { title: 'Top Yield Performance (7.1%)', desc: 'Leading gross yield returns in the UAE' }
    ]
  },
  {
    id: 'arabian-ranches',
    name: 'Arabian Ranches',
    tagline: 'Family Golf & Equestrian Sanctuary',
    desc: 'A premium gated villa community surrounded by championship golf courses, equestrian polo clubs, and top international schools.',
    img: 'images/penthouse.png',
    stats: { avgPrice: 'AED 4.8M', roi: '5.6%', props: '720+', type: 'Luxury Family Villas' },
    lifestyle: 'Serene suburban luxury living with private gardens, community centers, and world-class golf.',
    highlights: [
      { title: 'Arabian Ranches Golf Club', desc: 'Ian Baker-Finch designed 18-hole course' },
      { title: 'Equestrian Center', desc: 'Polo fields and riding trails' },
      { title: 'Family Amenities', desc: 'Parks, pools, tennis courts & retail center' }
    ]
  },
  {
    id: 'dubai-south',
    name: 'Dubai South',
    tagline: 'The Future Hub of Global Aviation & Mega Infrastructure',
    desc: 'Home to the AED 128B Al Maktoum International Airport expansion, Expo City Dubai, and green master-planned mega communities with premier capital growth potential.',
    img: 'images/offplan.png',
    stats: { avgPrice: 'AED 1.4M', roi: '7.5%', props: '1,800+', type: 'Modern Villas & Smart Apartments' },
    lifestyle: 'Futuristic, connected urban living centered around innovation hubs, green parks, and seamless transit links.',
    highlights: [
      { title: 'Al Maktoum Mega Airport', desc: 'World\'s largest 5-runway airport expansion project' },
      { title: 'Expo City Dubai Legacy', desc: 'Global business, sustainability & tech innovation hub' },
      { title: '7.5% High Growth Yield', desc: 'Rapid capital appreciation & top off-plan demand' }
    ]
  }
];

export default function CommunitiesPage({ onNavigate }) {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Waterfront & Beach', 'Downtown & Urban', 'Golf & Family Estates', 'Aviation & Growth Hubs'];

  const filteredCommunities = EXPANDED_COMMUNITIES.filter(c => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Waterfront & Beach') return ['palm', 'marina'].includes(c.id);
    if (activeCategory === 'Downtown & Urban') return ['downtown', 'business-bay'].includes(c.id);
    if (activeCategory === 'Golf & Family Estates') return ['dubai-hills', 'arabian-ranches'].includes(c.id);
    if (activeCategory === 'Aviation & Growth Hubs') return ['dubai-south'].includes(c.id);
    return true;
  });

  return (
    <div id="page-communities-parallax" className="page active page-communities-v3">
      {/* ── PARALLAX HERO SECTION ── */}
      <section className="comm3-hero">
        <div
          className="comm3-hero-parallax-bg"
          style={{ transform: `translate3d(0, ${scrollY * 0.42}px, 0)` }}
        />
        <div className="comm3-hero-overlay" />
        
        <div className="container comm3-hero-container">
          <div className="comm3-hero-content">
            <div className="comm3-badge">
              <Sparkles size={14} className="comm3-badge-icon" />
              <span>AKV Masterplan Index · Dubai, UAE</span>
            </div>

            <h1 className="comm3-hero-title">
              Explore Dubai's Most Premier <span className="text-gold-gradient">Sanctuaries</span>.
            </h1>

            <p className="comm3-hero-lead">
              A curated index of Dubai's master-planned masterworks — combining location supremacy, architectural innovation, and high-yield investment performance.
            </p>

            {/* Category Filter Chips */}
            <div className="comm3-filter-tabs">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className={`comm3-filter-chip ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Floating Parallax Metric Badge with Opposite Shift */}
          <div
            className="comm3-hero-floating-card"
            style={{ transform: `translate3d(0, ${-scrollY * 0.18}px, 0)` }}
          >
            <Award size={32} className="text-gold" />
            <div>
              <div className="comm3-float-title">AED 10B+ Masterplan Index</div>
              <div className="comm3-float-sub">100% RERA Certified Communities</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARALLAX MAGAZINE SHOWCASE LIST ── */}
      <section className="section comm3-showcase-section">
        <div className="container">
          <div className="comm3-showcase-list">
            {filteredCommunities.map((comm, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={comm.id}
                  className={`comm3-card ${isEven ? '' : 'comm3-card--reverse'}`}
                >
                  {/* Dynamic Scroll-Driven Parallax Image Container */}
                  <div className="comm3-card-img-outer">
                    <ParallaxImage
                      src={comm.img}
                      alt={comm.name}
                      speed={0.22}
                      height="480px"
                    />
                    
                    <div className="comm3-card-location-tag">
                      <MapPin size={13} className="text-gold" />
                      <span>{comm.name}</span>
                    </div>

                    <div className="comm3-card-roi-badge">
                      <TrendingUp size={14} />
                      <span>{comm.stats.roi} Rental Yield</span>
                    </div>
                  </div>

                  {/* Text / Details Container */}
                  <div className="comm3-card-content">
                    <div className="label label--gold mb-10">{comm.tagline}</div>
                    <h2 className="comm3-card-name">{comm.name}</h2>
                    <p className="comm3-card-desc">{comm.desc}</p>

                    {/* Stats Grid */}
                    <div className="comm3-card-stats-grid">
                      <div className="comm3-card-stat">
                        <span className="comm3-stat-lbl">Average Price</span>
                        <span className="comm3-stat-val">{comm.stats.avgPrice}</span>
                      </div>
                      <div className="comm3-card-stat">
                        <span className="comm3-stat-lbl">Property Types</span>
                        <span className="comm3-stat-val">{comm.stats.type}</span>
                      </div>
                      <div className="comm3-card-stat">
                        <span className="comm3-stat-lbl">Active Inventory</span>
                        <span className="comm3-stat-val">{comm.stats.props}</span>
                      </div>
                    </div>

                    {/* Highlights Bullet List */}
                    <div className="comm3-card-highlights">
                      {comm.highlights.map((h, i) => (
                        <div key={i} className="comm3-h-item">
                          <CheckCircle size={15} className="text-gold" />
                          <div>
                            <strong>{h.title}:</strong> <span>{h.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="comm3-card-actions">
                      <button
                        className="btn btn-gold btn-md"
                        onClick={() => onNavigate('listings')}
                      >
                        <span>Explore {comm.name} Properties</span>
                        <ArrowRight size={16} />
                      </button>
                      <button
                        className="btn btn-outline-dark btn-md"
                        onClick={() => setSelectedCommunity(comm)}
                      >
                        <Eye size={16} />
                        <span>Quick Insights</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PARALLAX MASTERPLAN SPOTLIGHT ── */}
      <section className="comm3-spotlight-section">
        <div
          className="comm3-spotlight-parallax-bg"
          style={{ transform: `translate3d(0, ${(scrollY - 1800) * 0.28}px, 0)` }}
        />
        <div className="comm3-spotlight-overlay" />
        <div className="container comm3-spotlight-container">
          <div className="comm3-spotlight-box">
            <div className="label label--gold mb-12">Institutional Insight</div>
            <h2 className="comm3-spotlight-title">Masterplan Advisory &amp; Off-Market Allocations</h2>
            <p className="comm3-spotlight-lead">
              AKV maintains direct C-suite partnerships across Dubai's top master-developers — securing priority access to pre-launch villas, waterfront penthouses, and high-yield commercial assets before public release.
            </p>
            <div className="comm3-spotlight-actions">
              <a
                href="https://wa.me/917009066676?text=Hello%20AKV%20Global%2C%20I%20would%20like%20to%20speak%20to%20a%20Masterplan%20Advisor."
                className="btn btn-gold btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PhoneCall size={18} />
                <span>Speak to a Masterplan Advisor</span>
              </a>
              <button className="btn btn-outline-light btn-lg" onClick={() => onNavigate('listings')}>
                <span>Browse All Properties</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE COMMUNITY COMPARISON MATRIX ── */}
      <section className="section section--beige comm3-matrix-section">
        <div className="container">
          <div className="comm3-header-center">
            <div className="label mb-12">Performance Analytics</div>
            <h2 className="section-heading">Dubai Community Comparison Matrix</h2>
            <p className="section-sub">Side-by-side comparison of entry prices, rental yields, and lifestyle hallmarks</p>
          </div>

          <div className="comm3-matrix-card">
            <table className="comm3-matrix-table">
              <thead>
                <tr>
                  <th>Community</th>
                  <th>Avg. Entry Price</th>
                  <th>Rental Yield (ROI)</th>
                  <th>Primary Property Types</th>
                  <th>Lifestyle Vibe</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {EXPANDED_COMMUNITIES.map((c, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="comm3-td-name">
                        <Building2 size={16} className="text-gold" />
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td><strong>{c.stats.avgPrice}</strong></td>
                    <td><span className="comm3-roi-pill">{c.stats.roi}</span></td>
                    <td>{c.stats.type}</td>
                    <td><span className="comm3-tagline-text">{c.tagline}</span></td>
                    <td>
                      <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('listings')}>
                        Explore <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── QUICK INSIGHTS MODAL ── */}
      {selectedCommunity && (
        <div className="comm3-modal-backdrop" onClick={() => setSelectedCommunity(null)}>
          <div className="comm3-modal-card" onClick={e => e.stopPropagation()}>
            <div className="comm3-modal-header">
              <div>
                <span className="label label--gold">{selectedCommunity.tagline}</span>
                <h3 className="comm3-modal-title">{selectedCommunity.name}</h3>
              </div>
              <button className="comm3-modal-close" onClick={() => setSelectedCommunity(null)}>&times;</button>
            </div>

            <div className="comm3-modal-body">
              <p className="comm3-modal-desc">{selectedCommunity.desc}</p>
              
              <div className="comm3-modal-highlights">
                <div className="comm3-mhigh-title">Key Community Highlights:</div>
                <div className="comm3-mhigh-list">
                  {selectedCommunity.highlights?.map((h, i) => (
                    <div key={i} className="comm3-mhigh-item">
                      <CheckCircle size={16} className="text-gold" />
                      <div>
                        <strong>{h.title}</strong>
                        <div style={{ fontSize: '12px', color: 'var(--c-muted)' }}>{h.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="comm3-modal-footer">
              <button className="btn btn-gold" onClick={() => { setSelectedCommunity(null); onNavigate('listings'); }}>
                Explore {selectedCommunity.name} Properties
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── GLOBAL SITE FOOTER ── */}
      <GlobalFooter navigate={onNavigate} />
    </div>
  );
}

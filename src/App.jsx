import { useState, useEffect } from 'react';
import { PROPERTIES, OFFPLAN, COMMUNITIES, TESTIMONIALS } from './data';
import AboutPage from './components/AboutPage';
import CommunitiesPage from './components/CommunitiesPage';
import WhyInvestPage from './components/WhyInvestPage';
import GlobalFooter from './components/Footer';
import {
  MapPin, Bed, Bath, Maximize2, Building2, TrendingUp, Anchor,
  Waves, Star, ShoppingBag, UtensilsCrossed, Compass, Shield,
  Hotel, Phone, Mail, MessageCircle, ArrowRight, ChevronRight,
  LayoutGrid, List, Search, Globe, Construction, Sparkles,
  CheckCircle, Award, Users, Home, Key, X
} from 'lucide-react';

// Helper to format percentage calculations for payment plans
function formatPct(priceStr, pct) {
  const num = parseInt(priceStr.replace(/[^0-9]/g, ''));
  const val = Math.round(num * pct / 100);
  return 'AED ' + val.toLocaleString();
}

// Resolve community highlight icon key -> Lucide component
function CommunityIcon({ name, size = 18, strokeWidth = 1.6 }) {
  const props = { size, strokeWidth, style: { flexShrink: 0 } };
  switch (name) {
    case 'building': return <Building2 {...props} />;
    case 'shopping': return <ShoppingBag {...props} />;
    case 'dining': return <UtensilsCrossed {...props} />;
    case 'trending': return <TrendingUp {...props} />;
    case 'anchor': return <Anchor {...props} />;
    case 'waves': return <Waves {...props} />;
    case 'star': return <Star {...props} />;
    case 'hotel': return <Hotel {...props} />;
    case 'compass': return <Compass {...props} />;
    case 'shield': return <Shield {...props} />;
    default: return <Building2 {...props} />;
  }
}

// Property Card Component
function PropertyCard({ property, large = false, onNavigate }) {
  const p = property;
  const hasPrivateTag = (p.id % 2 === 0);

  return (
    <div
      className={`property-card${large ? ' property-card--large' : ''}`}
      onClick={() => onNavigate('property', p.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="prop-img-wrap">
        <img src={p.img} alt={p.name} loading="lazy" />
        <div className="prop-badge-container">
          <span className="prop-badge-tag prop-badge-tag--gold">Exclusive</span>
          {hasPrivateTag && (
            <span className="prop-badge-tag prop-badge-tag--private">Private Listing</span>
          )}
        </div>
      </div>
      <div className="prop-body">
        <div className="prop-header-row">
          <div className="prop-name">{p.name}</div>
        </div>
        <div className="prop-location">
          <MapPin size={12} strokeWidth={2} style={{ marginRight: '4px', flexShrink: 0, color: 'var(--c-gold)' }} />
          {p.location}
        </div>
        <div className="prop-footer">
          <div className="prop-listing-type">{p.id % 2 === 0 ? 'Promote Listing' : 'Premium Listing'}</div>
          <div className="prop-specs-row">
            <span className="prop-spec-mini"><Bed size={12} strokeWidth={2} style={{ marginRight: '3px' }} />{p.beds} Beds</span>
            <span className="prop-spec-mini"><Bath size={12} strokeWidth={2} style={{ marginRight: '3px' }} />{p.baths} Baths</span>
            <span className="prop-spec-mini"><Maximize2 size={12} strokeWidth={2} style={{ marginRight: '3px' }} />{p.area} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Property Detail Page Component
function PropertyDetailSection({ propertyId, onNavigate }) {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const p = PROPERTIES.find(x => x.id === propertyId);
  if (!p) return null;

  return (
    <div id="page-property" className="page active">
      <div id="property-detail-content">
        <div className="detail-gallery">
          <div className="gallery-main">
            <img src={p.img} alt={p.name} />
          </div>
          <div className="gallery-thumbs">
            <div className="gallery-thumb"><img src={p.img} alt="" /></div>
            <div className="gallery-thumb"><img src="images/apartment.png" alt="" /></div>
            <div className="gallery-thumb"><img src="images/villa.png" alt="" /></div>
            <div className="gallery-thumb">
              <img src="images/penthouse.png" alt="" />
              <div className="gallery-more">+6 Photos</div>
            </div>
          </div>
        </div>

        <div className="detail-layout">
          <div className="detail-main">
            <div className="detail-breadcrumb">
              <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Home</span>
              <ChevronRight size={14} style={{ margin: '0 4px', opacity: 0.5 }} />
              <span onClick={() => onNavigate('listings')} style={{ cursor: 'pointer' }}>Properties</span>
              <ChevronRight size={14} style={{ margin: '0 4px', opacity: 0.5 }} />
              <span>{p.community}</span>
              <ChevronRight size={14} style={{ margin: '0 4px', opacity: 0.5 }} />
              <span>{p.name}</span>
            </div>
            <div className="detail-title-area">
              <div className="detail-badges">
                <span className="detail-badge">{p.type}</span>
                {p.badge && <span className="detail-badge detail-badge--gold">{p.badge}</span>}
                {p.offplan && <span className="detail-badge detail-badge--gold">Off-Plan</span>}
              </div>
              <h1 className="detail-title">{p.name}</h1>
              <div className="detail-location" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} strokeWidth={2} style={{ color: 'var(--c-gold)', flexShrink: 0 }} />
                {p.location}
              </div>
            </div>


            <div className="detail-specs">
              <div className="detail-spec">
                <div className="detail-spec-icon"><Bed size={22} strokeWidth={1.5} /></div>
                <div className="detail-spec-val">{p.beds}</div>
                <div className="detail-spec-label">Bedrooms</div>
              </div>
              <div className="detail-spec">
                <div className="detail-spec-icon"><Bath size={22} strokeWidth={1.5} /></div>
                <div className="detail-spec-val">{p.baths}</div>
                <div className="detail-spec-label">Bathrooms</div>
              </div>
              <div className="detail-spec">
                <div className="detail-spec-icon"><Maximize2 size={22} strokeWidth={1.5} /></div>
                <div className="detail-spec-val">{p.area}</div>
                <div className="detail-spec-label">Sqft</div>
              </div>
              <div className="detail-spec">
                <div className="detail-spec-icon"><Building2 size={22} strokeWidth={1.5} /></div>
                <div className="detail-spec-val">{p.community}</div>
                <div className="detail-spec-label">Community</div>
              </div>
            </div>

            <div className="detail-section">
              <h3>About This Property</h3>
              <p className="detail-description">{p.desc}</p>
            </div>

            <div className="detail-section">
              <h3>Features & Amenities</h3>
              <div className="amenities-grid">
                {p.amenities.map((a, idx) => (
                  <div key={idx} className="amenity-item">{a}</div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Location</h3>
              <div style={{ background: 'var(--c-beige)', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--c-border)', borderRadius: '2px' }}>
                <div style={{ textAlign: 'center', color: 'var(--c-muted)' }}>
                  <MapPin size={40} strokeWidth={1.2} style={{ marginBottom: '12px', color: 'var(--c-gold)', display: 'block', margin: '0 auto 12px' }} />
                  <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '20px', color: 'var(--c-dark)', marginBottom: '4px' }}>{p.location}</div>
                  <div style={{ fontSize: '13px' }}>Dubai, UAE</div>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-sidebar">
            {p.offplan && (
              <div className="payment-plan">
                <h4>Payment Plan</h4>
                <div className="payment-steps">
                  <div className="payment-step">
                    <span className="payment-step-label">On Booking</span>
                    <span className="payment-step-pct">20%</span>
                  </div>
                  <div className="payment-step">
                    <span className="payment-step-label">During Construction</span>
                    <span className="payment-step-pct">40%</span>
                  </div>
                  <div className="payment-step">
                    <span className="payment-step-label">On Handover</span>
                    <span className="payment-step-pct">40%</span>
                  </div>
                  <div className="payment-step">
                    <span className="payment-step-label">Completion</span>
                    <span className="payment-step-val">{p.completion}</span>
                  </div>
                </div>
              </div>
            )}
            <div className="agent-card">
              <div className="label" style={{ marginBottom: '16px' }}>Your Advisor</div>
              <h3>Pardeep Singh</h3>
              <div className="agent-title">Co-Founder &amp; Managing Director · AKV Global</div>
              <div className="agent-actions">
                <a href="https://wa.me/971500000000" className="btn btn-gold" style={{ justifyContent: 'center', width: '100%' }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px', marginRight: '8px' }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
                <a href="tel:+9714400000" className="btn btn-outline" style={{ justifyContent: 'center', width: '100%' }}>
                  <Phone size={15} strokeWidth={2} style={{ marginRight: '6px' }} />
                  Call Agent
                </a>
              </div>
              <div className="inquiry-form">
                <h4>Request Information</h4>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setInquirySubmitted(true);
                }}>
                  <div className="form-field"><input type="text" placeholder="Your Name" required /></div>
                  <div className="form-field"><input type="email" placeholder="Email Address" required /></div>
                  <div className="form-field"><input type="tel" placeholder="Phone Number" /></div>
                  <div className="form-field"><textarea placeholder="Your message..."></textarea></div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', background: inquirySubmitted ? '#2d6a4f' : '', color: inquirySubmitted ? '#fff' : '' }}
                    disabled={inquirySubmitted}
                  >
                    {inquirySubmitted ? (
                      <><CheckCircle size={16} style={{ marginRight: '6px' }} /> Sent Successfully</>
                    ) : 'Send Enquiry'}
                  </button>
                </form>
              </div>
            </div>

            <div style={{ border: '1px solid var(--c-border)', padding: '24px', background: 'var(--c-white)' }}>
              <div className="label" style={{ marginBottom: '12px' }}>Developer</div>
              <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '20px', marginBottom: '4px' }}>{p.developer}</div>
              <div style={{ fontSize: '13px', color: 'var(--c-muted)' }}>Reputable Dubai Developer</div>
            </div>
          </div>
        </div>

        <div className="section section--beige">
          <div className="container">
            <div className="section-header">
              <div className="label">More Properties</div>
              <h2 className="section-heading">Similar Properties</h2>
            </div>
            <div className="properties-grid">
              {PROPERTIES.filter(x => x.id !== p.id).slice(0, 3).map(x => (
                <PropertyCard key={x.id} property={x} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Community Detail Page Component
function CommunityDetailSection({ communityId, onNavigate }) {
  const [activeFaqIdx, setActiveFaqIdx] = useState(null);
  const c = COMMUNITIES.find(x => x.id === communityId);
  if (!c) return null;

  return (
    <div id="page-community" className="page active">
      <div id="community-detail-content">
        <div className="community-hero">
          <div className="community-hero-bg" style={{ backgroundImage: `url('${c.img}')` }}></div>
          <div className="community-hero-overlay"></div>
          <div className="community-hero-content container">
            <div className="label label--light" style={{ marginBottom: '16px' }}>{c.tagline}</div>
            <h1 className="community-hero-title">{c.name}</h1>
            <div className="community-hero-sub">{c.desc}</div>
          </div>
        </div>

        <section className="section section--white">
          <div className="container">
            <div className="community-overview">
              <div>
                <div className="label" style={{ marginBottom: '16px' }}>Community Overview</div>
                <h2 className="section-heading" style={{ marginBottom: '20px' }}>Living in {c.name}</h2>
                <p style={{ fontSize: '15px', color: 'var(--c-muted)', lineHeight: 1.8, marginBottom: '32px' }}>{c.lifestyle}</p>
                <div className="community-stats-grid">
                  <div className="comm-stat"><div className="comm-stat-val">{c.stats.avgPrice}</div><div className="comm-stat-label">Average Price</div></div>
                  <div className="comm-stat"><div className="comm-stat-val">{c.stats.roi}<span>%</span></div><div className="comm-stat-label">Avg Rental ROI</div></div>
                  <div className="comm-stat"><div className="comm-stat-val">{c.stats.props}</div><div className="comm-stat-label">Total Properties</div></div>
                  <div className="comm-stat"><div className="comm-stat-val" style={{ fontSize: '16px' }}>{c.stats.type}</div><div className="comm-stat-label">Property Types</div></div>
                </div>
              </div>
              <div className="highlights-list">
                {c.highlights.map((h, idx) => (
                  <div key={idx} className="highlight-item">
                    <div className="highlight-icon">
                      <CommunityIcon name={h.icon} size={20} strokeWidth={1.6} />
                    </div>
                    <div>
                      <div className="highlight-title">{h.title}</div>
                      <div className="highlight-desc">{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--beige">
          <div className="container">
            <div className="section-header">
              <div className="label">Properties</div>
              <h2 className="section-heading">Featured in {c.name}</h2>
            </div>
            <div className="properties-grid">
              {PROPERTIES.filter(p => p.community === c.name).length > 0 ? (
                PROPERTIES.filter(p => p.community === c.name).slice(0, 3).map(p => (
                  <PropertyCard key={p.id} property={p} onNavigate={onNavigate} />
                ))
              ) : (
                PROPERTIES.slice(0, 3).map(p => (
                  <PropertyCard key={p.id} property={p} onNavigate={onNavigate} />
                ))
              )}
            </div>
          </div>
        </section>

        <section className="section section--white">
          <div className="container">
            <div className="section-header">
              <div className="label">Common Questions</div>
              <h2 className="section-heading">{c.name} FAQ</h2>
            </div>
            <div className="faq-list">
              {c.faqs.map((f, idx) => (
                <div key={idx} className={`faq-item ${activeFaqIdx === idx ? 'open' : ''}`}>
                  <div className="faq-question" onClick={() => setActiveFaqIdx(activeFaqIdx === idx ? null : idx)}>
                    {f.q}
                    <span className="faq-icon">{activeFaqIdx === idx ? '−' : '+'}</span>
                  </div>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="final-cta">
          <div className="final-cta-bg" style={{ backgroundImage: `url('${c.img}')` }}></div>
          <div className="final-cta-overlay"></div>
          <div className="final-cta-content">
            <div className="label label--light" style={{ marginBottom: '16px' }}>Invest in {c.name}</div>
            <h2 className="final-cta-title">Find Your Property<br />in {c.name}</h2>
            <p className="final-cta-sub">Our advisors specialise in {c.name} properties. Speak with us today to explore your options.</p>
            <div className="final-cta-btns">
              <button className="btn btn-gold" onClick={() => onNavigate('listings')}>View Properties</button>
              <a href="https://wa.me/971500000000" className="btn btn-outline-light">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentPropertyId, setCurrentPropertyId] = useState(null);
  const [currentCommunityId, setCurrentCommunityId] = useState(null);

  // Navbar and Menu states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Home Hero Search Widget State
  const [heroTab, setHeroTab] = useState('Buy');
  const [heroLocation, setHeroLocation] = useState('');
  const [heroType, setHeroType] = useState('');
  const [heroBeds, setHeroBeds] = useState('');

  // Home Featured Properties filter tab state
  const [featuredFilter, setFeaturedFilter] = useState('All');

  // Listings page filter & view states
  const [listingTab, setListingTab] = useState('All');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterBeds, setFilterBeds] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterDeveloper, setFilterDeveloper] = useState('');
  const [sortMode, setSortMode] = useState('Newest First');
  const [viewMode, setViewMode] = useState('grid');

  // Router navigation helper
  const navigate = (page, id = null) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    if (page === 'property' && id !== null) {
      setCurrentPropertyId(id);
    }
    if (page === 'community' && id !== null) {
      setCurrentCommunityId(id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to window scroll to style the Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Compute Listings Page properties based on active filters & sorting
  const getFilteredProperties = () => {
    let filtered = PROPERTIES;

    // Filter by Search Tabs
    if (listingTab === 'Buy' || listingTab === 'Rent') {
      filtered = PROPERTIES.filter(p => !p.offplan);
    } else if (listingTab === 'Off-Plan') {
      filtered = PROPERTIES.filter(p => p.offplan);
    }

    // Filter by Location
    if (filterLocation) {
      filtered = filtered.filter(p => p.community.toLowerCase().includes(filterLocation.toLowerCase()));
    }

    // Filter by Property Type
    if (filterType && filterType !== '') {
      filtered = filtered.filter(p => p.category === filterType);
    }

    // Filter by Beds count
    if (filterBeds && filterBeds !== '') {
      filtered = filtered.filter(p => p.beds >= parseInt(filterBeds));
    }

    // Sorting Modes
    if (sortMode === 'Price: Low to High') {
      filtered = [...filtered].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceA - priceB;
      });
    } else if (sortMode === 'Price: High to Low') {
      filtered = [...filtered].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceB - priceA;
      });
    }

    return filtered;
  };

  return (
    <>
      {/* NAVBAR */}
      <nav id="navbar" className={`${isScrolled ? 'scrolled' : ''} ${currentPage !== 'home' ? 'nav-light' : ''}`}>
        <div className="nav-inner">
          <div className="nav-logo" aria-label="AKV Global Consultancy Home" onClick={() => navigate('home')}>
            <img
              src="images/AKV final logo.png"
              alt="AKV Global"
              style={{ height: '52px', width: 'auto', objectFit: 'contain', display: 'block', paddingBottom: '6px', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.45))' }}
            />
          </div>

          <div className="nav-links">
            <span className="nav-link" onClick={() => { setListingTab('Buy'); navigate('listings'); }}>BUY</span>

            <span className="nav-link" onClick={() => { setListingTab('Off-Plan'); navigate('listings'); }}>OFF-PLAN</span>
            <span className="nav-link" onClick={() => navigate('communities')}>COMMUNITES</span>
            <span className="nav-link" onClick={() => navigate('why-invest')}>WHY INVEST IN DUBAI</span>
            <span className="nav-link" onClick={() => navigate('about')}>ABOUT</span>
          </div>

          <div className="nav-cta">
            <a
              href="#contact"
              className="btn-whatsapp"
              onClick={(e) => {
                e.preventDefault();
                navigate('home');
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              aria-label="Book Private Tour"
            >
              Book Consultation
            </a>
            <button className="hamburger" id="hamburger" aria-label="Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER MENU */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} id="mobile-menu">
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo" onClick={() => { setIsMobileMenuOpen(false); navigate('home'); }}>
            <img
              src="images/AKV final logo.png"
              alt="AKV Global"
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
          <button
            className="mobile-menu-close"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <div className="mobile-menu-body">
          <span className="mobile-nav-link" onClick={() => { setIsMobileMenuOpen(false); setListingTab('Buy'); navigate('listings'); }}>
            <span>Buy</span>
            <ChevronRight size={18} className="mobile-link-arrow" />
          </span>
          <span className="mobile-nav-link" onClick={() => { setIsMobileMenuOpen(false); setListingTab('Rent'); navigate('listings'); }}>
            <span>Rent</span>
            <ChevronRight size={18} className="mobile-link-arrow" />
          </span>
          <span className="mobile-nav-link" onClick={() => { setIsMobileMenuOpen(false); setListingTab('Off-Plan'); navigate('listings'); }}>
            <span>Off-Plan</span>
            <ChevronRight size={18} className="mobile-link-arrow" />
          </span>
          <span className="mobile-nav-link" onClick={() => { setIsMobileMenuOpen(false); navigate('communities'); }}>
            <span>Communities</span>
            <ChevronRight size={18} className="mobile-link-arrow" />
          </span>
          <span className="mobile-nav-link" onClick={() => { setIsMobileMenuOpen(false); navigate('why-invest'); }}>
            <span>Why Invest in Dubai</span>
            <ChevronRight size={18} className="mobile-link-arrow" />
          </span>
          <span className="mobile-nav-link" onClick={() => { setIsMobileMenuOpen(false); navigate('about'); }}>
            <span>About</span>
            <ChevronRight size={18} className="mobile-link-arrow" />
          </span>
        </div>

        <div className="mobile-nav-cta">
          <a
            href="https://wa.me/971500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* PAGE CONTAINER */}
      {currentPage === 'home' && (
        <div id="page-home" className="page active">
          {/* HERO */}
          <section id="hero">
            <div className="hero-video-bg">
              <video autoPlay loop muted playsInline preload="auto" poster="/images/hero.png">
                <source src="/video/akv_global.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="hero-video-overlay"></div>
            </div>
          </section>

          {/* FEATURED PROPERTIES */}
          <section className="section section--white" style={{ paddingTop: 0, position: 'relative' }}>
            <div className="search-widget-container" style={{ marginTop: '-55px', marginBottom: '50px' }}>
              <div className="search-widget"
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border: '1px solid rgba(197, 168, 128, 0.25)',
                  borderRadius: '50px',
                  padding: '14px 28px',
                  boxShadow: '0 15px 35px rgba(27, 34, 41, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  width: '100%',
                  minHeight: '76px'
                }}
              >

                {/* Tabs inside capsule */}
                <div className="search-widget-tabs" style={{ display: 'flex', gap: '6px', marginBottom: 0, background: 'rgba(0,0,0,0.04)', borderRadius: '50px', padding: '6px', flexShrink: 0, alignItems: 'center' }}>
                  <button className={`search-widget-tab ${heroTab === 'Buy' ? 'active' : ''}`} onClick={() => setHeroTab('Buy')} style={{ borderRadius: '50px', padding: '10px 28px', fontSize: '14px', border: 'none', height: '46px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none' }}>Buy</button>
                  <button className={`search-widget-tab ${heroTab === 'Rent' ? 'active' : ''}`} onClick={() => setHeroTab('Rent')} style={{ borderRadius: '50px', padding: '10px 28px', fontSize: '14px', border: 'none', height: '46px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none' }}>Rent</button>
                  <button className={`search-widget-tab ${heroTab === 'Off-Plan' ? 'active' : ''}`} onClick={() => setHeroTab('Off-Plan')} style={{ borderRadius: '50px', padding: '10px 28px', fontSize: '14px', border: 'none', height: '46px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none' }}>Off Plan</button>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '52px', background: 'rgba(0, 0, 0, 0.08)', flexShrink: 0 }}></div>

                {/* Location Input */}
                <div style={{ flex: 1.8, display: 'flex', alignItems: 'center', paddingLeft: '8px' }}>
                  <input
                    type="text"
                    placeholder="Enter Location"
                    value={heroLocation}
                    onChange={(e) => setHeroLocation(e.target.value)}
                    style={{ background: 'transparent', border: 'none', fontSize: '16px', color: 'var(--c-dark)', width: '100%', outline: 'none', fontFamily: 'var(--ff-sans)' }}
                  />
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '52px', background: 'rgba(0, 0, 0, 0.08)', flexShrink: 0 }}></div>

                {/* Completion Status Dropdown */}
                <div style={{ flex: 1.2, display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <select
                    value={heroType}
                    onChange={(e) => setHeroType(e.target.value)}
                    style={{ background: 'transparent', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '50px', fontSize: '14px', color: 'var(--c-muted)', width: '100%', height: '52px', padding: '0 32px 0 16px', outline: 'none', cursor: 'pointer', WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none', fontFamily: 'var(--ff-sans)' }}
                  >
                    <option value="">Completion Status</option>
                    <option value="Ready">Ready</option>
                    <option value="Off-Plan">Off-Plan</option>
                  </select>
                  <span style={{ position: 'absolute', right: '14px', pointerEvents: 'none', color: '#a0aec0', fontSize: '9px' }}>▼</span>
                </div>

                {/* Filter Dropdown */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <select
                    value={heroBeds}
                    onChange={(e) => setHeroBeds(e.target.value)}
                    style={{ background: 'transparent', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '50px', fontSize: '14px', color: 'var(--c-muted)', width: '100%', height: '52px', padding: '0 32px 0 16px', outline: 'none', cursor: 'pointer', WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none', fontFamily: 'var(--ff-sans)' }}
                  >
                    <option value="">Filter</option>
                    <option value="1">1+ Beds</option>
                    <option value="2">2+ Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                  </select>
                  <span style={{ position: 'absolute', right: '14px', pointerEvents: 'none', color: '#a0aec0', fontSize: '9px' }}>▼</span>
                </div>

                {/* Search Button */}
                <button
                  onClick={() => {
                    setFilterLocation(heroLocation);
                    setFilterType(heroType === 'Off-Plan' ? '' : heroType);
                    setFilterBeds(heroBeds);
                    setListingTab(heroTab);
                    navigate('listings');
                  }}
                  className="search-widget-btn"
                  style={{ background: 'var(--c-gold)', color: '#ffffff', border: 'none', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s', flexShrink: 0, padding: 0, boxShadow: 'none' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className="container" style={{ paddingTop: '60px' }}>
              {/* Overview Section */}
              <div className="overview-row">
                <div>
                  <div className="label">Overview</div>
                  <h3 className="section-heading" style={{ marginTop: '12px', fontSize: '32px', lineHeight: 1.3 }}>Dubai Real Estate,<br />Redefined.</h3>
                  <p style={{ color: 'var(--c-muted)', marginTop: '20px', fontSize: '16px', lineHeight: 1.75, fontWeight: 300 }}>
                    AKV Global Consultancy is a premier boutique real estate agency in Dubai. We specialize in curating ultra-luxury villas, sky-penthouses, and high-yielding off-plan developments in the city's most prestigious communities.
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ background: 'var(--c-beige)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--c-border)' }}>
                    <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '28px', color: 'var(--c-gold)', fontWeight: 600 }}>10B+</div>
                    <div style={{ fontSize: '11px', color: 'var(--c-dark)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Sales Volume (AED)</div>
                  </div>
                  <div style={{ background: 'var(--c-beige)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--c-border)' }}>
                    <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '28px', color: 'var(--c-gold)', fontWeight: 600 }}>15+</div>
                    <div style={{ fontSize: '11px', color: 'var(--c-dark)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Years in Market</div>
                  </div>
                  <div style={{ background: 'var(--c-beige)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--c-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '24px', color: 'var(--c-gold)', fontWeight: 600 }}>98%</div>
                      <div style={{ fontSize: '11px', color: 'var(--c-dark)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Client Satisfaction</div>
                    </div>
                    <Sparkles size={24} strokeWidth={1.4} style={{ opacity: 0.7, color: 'var(--c-gold)' }} />
                  </div>
                </div>
              </div>

              <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.06)', marginBottom: '80px' }}></div>

              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div className="label">Our Properties</div>
                <h2 className="section-heading" style={{ marginTop: '12px' }}>Browse Our Exclusive Properties Listing</h2>
              </div>

              {/* Categories filter tabs */}
              <div className="properties-category-tabs">
                {['All', 'Rent', 'Villa', 'Apartment', 'Penthouse', 'Townhouse'].map(tab => (
                  <button
                    key={tab}
                    className={`prop-cat-tab ${featuredFilter === tab ? 'active' : ''}`}
                    onClick={() => setFeaturedFilter(tab)}
                  >
                    {tab === 'All' ? 'For Sale' : tab === 'Villa' ? 'Villas' : tab === 'Apartment' ? 'Apartments' : tab === 'Penthouse' ? 'Penthouses' : tab === 'Townhouse' ? 'Townhouses' : tab}
                  </button>
                ))}
              </div>

              <div className="properties-grid" id="featured-grid">
                {PROPERTIES.filter(p => {
                  if (featuredFilter === 'Rent') {
                    return p.type.toLowerCase().includes('rent') || p.price.toLowerCase().includes('month') || p.price.toLowerCase().includes('year');
                  }
                  if (featuredFilter !== 'All') {
                    return p.type.toLowerCase().includes(featuredFilter.toLowerCase()) && !p.type.toLowerCase().includes('rent');
                  }
                  return !p.type.toLowerCase().includes('rent');
                }).slice(0, 6).map(p => (
                  <PropertyCard key={p.id} property={p} onNavigate={navigate} />
                ))}
              </div>
            </div>
          </section>

          {/* PROPERTY CATEGORIES */}
          <section className="section section--beige" style={{ paddingTop: 0 }}>
            <div className="container" style={{ padding: 0 }}>
              <div className="categories-grid">
                <div className="category-card" onClick={() => { setListingTab('All'); setFilterType('Apartment'); setFilterLocation(''); navigate('listings'); }} style={{ background: '#1a1a1a' }}>
                  <img src="images/penthouse.png" alt="Luxury Apartments Dubai" />
                  <div className="category-overlay">
                    <div className="category-title">Luxury Apartments</div>
                    <div className="category-count">248 Properties</div>
                    <div className="category-arrow">→</div>
                  </div>
                </div>
                <div className="category-card" onClick={() => { setListingTab('All'); setFilterType('Villa'); setFilterLocation(''); navigate('listings'); }} style={{ background: '#111' }}>
                  <img src="images/villa.png" alt="Villas Dubai" />
                  <div className="category-overlay">
                    <div className="category-title">Villas</div>
                    <div className="category-count">96 Properties</div>
                    <div className="category-arrow">→</div>
                  </div>
                </div>
                <div className="category-card" onClick={() => { setListingTab('All'); setFilterType('Penthouse'); setFilterLocation(''); navigate('listings'); }} style={{ background: '#0d0d0d' }}>
                  <img src="images/penthouse.png" alt="Penthouses Dubai" />
                  <div className="category-overlay">
                    <div className="category-title">Penthouses</div>
                    <div className="category-count">34 Properties</div>
                    <div className="category-arrow">→</div>
                  </div>
                </div>
                <div className="category-card" onClick={() => { setListingTab('All'); setFilterType('Townhouse'); setFilterLocation(''); navigate('listings'); }} style={{ background: '#131313' }}>
                  <img src="images/villa.png" alt="Townhouses Dubai" />
                  <div className="category-overlay">
                    <div className="category-title">Townhouses</div>
                    <div className="category-count">72 Properties</div>
                    <div className="category-arrow">→</div>
                  </div>
                </div>
                <div className="category-card" onClick={() => { setListingTab('Off-Plan'); setFilterType(''); setFilterLocation(''); navigate('listings'); }} style={{ background: '#0a0a0a' }}>
                  <img src="images/offplan.png" alt="Off-Plan Dubai" />
                  <div className="category-overlay">
                    <div className="category-title">Off-Plan</div>
                    <div className="category-count">120 Projects</div>
                    <div className="category-arrow">→</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* EXPLORE COMMUNITIES */}
          <section className="section section--white">
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <div className="label">Our Location</div>
                <h2 className="section-heading" style={{ marginTop: '12px' }}>Find Your Properties In These Cities</h2>
              </div>

              <div className="cities-grid">
                <div className="city-card" onClick={() => navigate('community', 'marina')}>
                  <img src="images/dubai_marina.png" alt="Dubai Marina" />
                  <div className="city-card-overlay">
                    <div className="city-card-name">Dubai Marina</div>
                    <div className="city-card-properties">248 Properties</div>
                  </div>
                </div>

                <div className="city-card" onClick={() => { setFilterLocation('Business Bay'); setListingTab('All'); setFilterType(''); navigate('listings'); }}>
                  <img src="images/apartment.png" alt="Business Bay" />
                  <div className="city-card-overlay">
                    <div className="city-card-name">Business Bay</div>
                    <div className="city-card-properties">156 Properties</div>
                  </div>
                </div>

                <div className="city-card" onClick={() => navigate('community', 'palm')}>
                  <img src="images/palm_jumeirah.png" alt="Palm Jumeirah" />
                  <div className="city-card-overlay">
                    <div className="city-card-name">Palm Jumeirah</div>
                    <div className="city-card-properties">96 Properties</div>
                  </div>
                </div>

                <div className="city-card" onClick={() => navigate('community', 'downtown')}>
                  <img src="images/downtown_dubai.png" alt="Downtown Dubai" />
                  <div className="city-card-overlay">
                    <div className="city-card-name">Downtown Dubai</div>
                    <div className="city-card-properties">312 Properties</div>
                  </div>
                </div>

                <div className="city-card" onClick={() => { setFilterLocation('Dubai Hills Estate'); setListingTab('All'); setFilterType(''); navigate('listings'); }}>
                  <img src="images/villa.png" alt="Dubai Hills Estate" />
                  <div className="city-card-overlay">
                    <div className="city-card-name">Dubai Hills Estate</div>
                    <div className="city-card-properties">184 Properties</div>
                  </div>
                </div>

                <div className="city-card" onClick={() => { setFilterLocation('Arabian Ranches'); setListingTab('All'); setFilterType(''); navigate('listings'); }}>
                  <img src="images/about.png" alt="Arabian Ranches" />
                  <div className="city-card-overlay">
                    <div className="city-card-name">Arabian Ranches</div>
                    <div className="city-card-properties">72 Properties</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* OFF-PLAN SECTION */}
          <section className="section section--dark" id="investment-section">
            <div className="container">
              <div className="section-header-row">
                <div>
                  <div className="label label--light">Investment Opportunity</div>
                  <h2 className="section-heading" style={{ color: 'var(--c-white)', marginTop: '12px' }}>Invest in Dubai's<br />Next Chapter.</h2>
                  <p className="section-sub" style={{ color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>Carefully selected off-plan developments from Dubai's leading developers.</p>
                </div>
                <button className="btn btn-outline-light" onClick={() => { setListingTab('Off-Plan'); setFilterType(''); setFilterLocation(''); navigate('listings'); }}>All Off-Plan</button>
              </div>
              <div className="offplan-grid" id="offplan-grid">
                {OFFPLAN.map(p => (
                  <div key={p.id} className="offplan-card" onClick={() => { setListingTab('Off-Plan'); setFilterType(''); setFilterLocation(''); navigate('listings'); }}>
                    <div className="prop-img-wrap">
                      <img src={p.img} alt={p.name} loading="lazy" />
                      <div className="prop-badge-container">
                        <span className="prop-badge-tag prop-badge-tag--gold">Exclusive</span>
                        {p.id === 'op2' && (
                          <span className="prop-badge-tag prop-badge-tag--private">Private Listing</span>
                        )}
                      </div>
                    </div>
                    <div className="prop-body">
                      <div className="prop-header-row">
                        <div className="prop-name">{p.name}</div>
                      </div>
                      <div className="prop-location" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} strokeWidth={2} style={{ color: 'var(--c-gold)', flexShrink: 0 }} />
                        {p.location}
                      </div>
                      <div className="prop-footer">
                        <div className="prop-listing-type">{p.id === 'op2' ? 'Promote Listing' : 'Premium Listing'}</div>
                        <div className="prop-specs-row">
                          <span className="prop-spec-mini"><Bed size={12} strokeWidth={2} style={{ marginRight: '3px' }} />{p.beds} Beds</span>
                          <span className="prop-spec-mini"><Bath size={12} strokeWidth={2} style={{ marginRight: '3px' }} />{p.baths} Baths</span>
                          <span className="prop-spec-mini"><Maximize2 size={12} strokeWidth={2} style={{ marginRight: '3px' }} />{p.area} sqft</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section className="section section--white">
            <div className="container">
              <div className="about-bento-grid">
                <div className="about-bento-card about-bento-card--image">
                  <img src="images/apartment.png" alt="Modern Building Dubai" />
                </div>
                <div className="about-bento-card about-bento-card--content-stack">
                  <div className="about-bento-subcard about-bento-subcard--beige">
                    <span className="about-bento-label">About Company</span>
                    <h2 className="about-bento-title">Empowering Your Real Estate Journey</h2>
                  </div>
                  <div className="about-bento-subcard about-bento-subcard--blue">
                    <div>
                      <p className="about-bento-text">We are passionate about simplifying the real estate experience. Our expert team combines industry knowledge with a client-first approach to help you achieve your property goals.</p>
                    </div>
                    <button className="btn btn-gold" style={{ alignSelf: 'flex-start' }} onClick={() => { setListingTab('All'); setFilterType(''); setFilterLocation(''); navigate('listings'); }}>See Properties</button>
                  </div>
                </div>
                <div className="about-bento-card about-bento-card--image">
                  <img src="images/villa.png" alt="Luxury Villa Sunset Dubai" />
                </div>
              </div>
            </div>
          </section>

          {/* INVESTMENT */}
          <div className="investment-section">
            <div className="investment-bg"></div>
            <div className="investment-inner">
              <div>
                <div className="label label--light" style={{ marginBottom: '20px' }}>Portfolio Growth</div>
                <h2 className="investment-title">Build Your Dubai<br />Property <em>Portfolio.</em></h2>
                <p className="investment-text">Dubai's real estate market continues to outperform global benchmarks, driven by population growth, infrastructure investment, and strong international demand. Now is the time to build a strategic position.</p>
                <a href="https://wa.me/971500000000" className="btn btn-gold" target="_blank" rel="noopener noreferrer">Speak to an Investment Advisor</a>
              </div>
              <div className="investment-points">
                <div className="investment-point">
                  <div className="investment-point-icon"><TrendingUp size={22} strokeWidth={1.6} /></div>
                  <div>
                    <div className="investment-point-title">High-Growth Communities</div>
                    <div className="investment-point-desc">Access properties in Dubai's fastest-appreciating areas before the market moves.</div>
                  </div>
                </div>
                <div className="investment-point">
                  <div className="investment-point-icon"><Building2 size={22} strokeWidth={1.6} /></div>
                  <div>
                    <div className="investment-point-title">Strong Rental Yields</div>
                    <div className="investment-point-desc">Dubai delivers 5–8% gross rental yields, among the highest of any global city.</div>
                  </div>
                </div>
                <div className="investment-point">
                  <div className="investment-point-icon"><Construction size={22} strokeWidth={1.6} /></div>
                  <div>
                    <div className="investment-point-title">Off-Plan Opportunities</div>
                    <div className="investment-point-desc">Secure pre-launch prices with flexible payment plans and significant capital upside.</div>
                  </div>
                </div>
                <div className="investment-point">
                  <div className="investment-point-icon"><Globe size={22} strokeWidth={1.6} /></div>
                  <div>
                    <div className="investment-point-title">No Income or Capital Gains Tax</div>
                    <div className="investment-point-desc">Dubai remains one of the world's most tax-efficient property investment destinations.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FINAL CTA */}
          <div className="final-cta-wrapper">
            <div className="final-cta">
              <div className="final-cta-left">
                <img src="images/downtown_dubai.png" alt="Dubai Real Estate Skyline" loading="lazy" />
              </div>
              <div className="final-cta-content">
                <h2 className="final-cta-title">Let's Make Your Property Dreams a Reality</h2>
                <p className="final-cta-sub">Don't wait to start your real estate journey. Whether you're buying, selling, or renting, our expert team is here to guide you every step of the way. Let's turn your vision into reality with personalized service and a seamless experience.</p>
                <div className="final-cta-btns">
                  <button className="final-cta-btn-white" onClick={() => { setListingTab('All'); setFilterType(''); setFilterLocation(''); navigate('listings'); }}>
                    Start Your Search Today
                    <ArrowRight size={17} strokeWidth={2} style={{ marginLeft: '8px' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <GlobalFooter navigate={navigate} setListingTab={setListingTab} setFilterType={setFilterType} />
        </div>
      )}

      {currentPage === 'listings' && (
        <div id="page-listings" className="page active">
          <div className="listing-page-hero">
            <div className="container">
              <div className="label label--light" style={{ marginBottom: '16px' }}>Dubai Properties</div>
              <h1 className="listing-hero-title">Search Properties</h1>
              <p className="listing-hero-sub">Explore our curated collection of luxury Dubai properties</p>
            </div>
          </div>

          <div className="listing-filters-bar">
            <div className="container" style={{ padding: '0 40px' }}>
              <div className="filters-tabs">
                {['All', 'Buy', 'Rent', 'Off-Plan'].map(tab => (
                  <div
                    key={tab}
                    className={`filter-tab ${listingTab === tab ? 'active' : ''}`}
                    onClick={() => setListingTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              <div className="filters-row">
                <div className="filter-select-wrap">
                  <label htmlFor="filter-location">Location</label>
                  <input
                    id="filter-location"
                    type="text"
                    placeholder="Any Community"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                  />
                </div>
                <div className="filter-select-wrap">
                  <label htmlFor="filter-type">Property Type</label>
                  <select
                    id="filter-type"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="">Any Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Townhouse">Townhouse</option>
                  </select>
                </div>
                <div className="filter-select-wrap">
                  <label htmlFor="filter-beds">Bedrooms</label>
                  <select
                    id="filter-beds"
                    value={filterBeds}
                    onChange={(e) => setFilterBeds(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                <div className="filter-select-wrap">
                  <label htmlFor="filter-price">Price Range</label>
                  <select
                    id="filter-price"
                    value={filterPrice}
                    onChange={(e) => setFilterPrice(e.target.value)}
                  >
                    <option value="">Any Price</option>
                    <option>Up to AED 2M</option>
                    <option>AED 2M – 5M</option>
                    <option>AED 5M – 15M</option>
                    <option>AED 15M+</option>
                  </select>
                </div>
                <div className="filter-select-wrap">
                  <label htmlFor="filter-developer">Developer</label>
                  <select
                    id="filter-developer"
                    value={filterDeveloper}
                    onChange={(e) => setFilterDeveloper(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option>Emaar Properties</option>
                    <option>Damac</option>
                    <option>Nakheel</option>
                    <option>Sobha Realty</option>
                  </select>
                </div>
                <div className="filter-actions">
                  <button className="btn btn-outline" onClick={() => {
                    setFilterLocation('');
                    setFilterType('');
                    setFilterBeds('');
                    setFilterPrice('');
                    setFilterDeveloper('');
                  }}>Reset</button>
                </div>
              </div>
            </div>
          </div>

          <div className="listing-layout">
            <div className="listing-toolbar">
              <div className="listing-count">Showing <strong>{getFilteredProperties().length}</strong> properties</div>
              <div className="listing-controls">
                <select
                  className="sort-select"
                  id="sort-select"
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value)}
                >
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
                <div className="view-toggle">
                  <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} aria-label="Grid View"><LayoutGrid size={16} strokeWidth={2} /></button>
                  <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} aria-label="List View"><List size={16} strokeWidth={2} /></button>
                </div>
              </div>
            </div>

            <div className={`listing-grid ${viewMode === 'list' ? 'list-view' : ''}`} id="listings-grid">
              {getFilteredProperties().length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 20px' }}>
                  <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '28px', marginBottom: '12px' }}>No properties found</div>
                  <div style={{ color: 'var(--c-muted)' }}>Try adjusting your search filters</div>
                </div>
              ) : (
                getFilteredProperties().map(p => (
                  <PropertyCard key={p.id} property={p} onNavigate={navigate} />
                ))
              )}
            </div>

            <div className="pagination">
              <button className="page-btn active" aria-label="Page 1">1</button>
              <button className="page-btn" aria-label="Page 2">2</button>
              <button className="page-btn" aria-label="Page 3">3</button>
              <button className="page-btn" aria-label="Next page"><ChevronRight size={14} strokeWidth={2.5} /></button>
            </div>
          </div>

          <footer>
            <div className="footer-bottom" style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 40px' }}>
              <div className="footer-copy">© 2025 AKV Global Consultancy. All rights reserved.</div>
              <div className="footer-legal">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms &amp; Conditions</a>
              </div>
            </div>
          </footer>
        </div>
      )}

      {currentPage === 'property' && (
        <PropertyDetailSection propertyId={currentPropertyId} onNavigate={navigate} />
      )}

      {currentPage === 'community' && (
        <CommunityDetailSection communityId={currentCommunityId} onNavigate={navigate} />
      )}

      {currentPage === 'about' && (
        <AboutPage onNavigate={navigate} />
      )}

      {currentPage === 'communities' && (
        <CommunitiesPage onNavigate={navigate} />
      )}

      {currentPage === 'why-invest' && (
        <WhyInvestPage onNavigate={navigate} />
      )}
    </>
  );
}

export default App;

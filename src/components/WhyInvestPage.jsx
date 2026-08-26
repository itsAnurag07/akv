import React, { useState, useEffect } from 'react';
import GlobalFooter from './Footer';
import {
  TrendingUp,
  Percent,
  ShieldCheck,
  Coins,
  MapPin,
  ArrowRight,
  Calculator,
  MessageCircle,
  Clock,
  Landmark,
  Building,
  UserCheck,
  Plane
} from 'lucide-react';

export default function WhyInvestPage({ onNavigate }) {
  const [investmentAmount, setInvestmentAmount] = useState(2000000); // 2 million AED default
  const [netYield, setNetYield] = useState(8); // 8% default net yield
  const [retainedPct, setRetainedPct] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 4800; // 4.8 seconds duration
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        setRetainedPct(end);
        clearInterval(timer);
      } else {
        setRetainedPct(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);


  // Helper to format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatUSD = (val) => {
    // 1 USD = 3.6725 AED
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val / 3.6725);
  };

  // Calculator outputs
  const annualIncome = (investmentAmount * netYield) / 100;
  const monthlyIncome = annualIncome / 12;
  const comparisonIncome = (investmentAmount * 3.0) / 100; // India 3% yield
  const yearlyGain = annualIncome - comparisonIncome;

  return (
    <div id="page-why-invest" className="page active page-why-invest-container">
      {/* SECTION 1: HERO DYNAMIC COMPARISON */}
      <section className="why-hero-section">
        <div className="why-hero-bg"></div>
        <div className="why-hero-overlay"></div>

        <div className="container why-hero-container">
          <div className="why-hero-split">
            {/* Left Content */}
            <div className="why-hero-left">
              <span className="why-badge">FOR INDIAN INVESTORS</span>
              <h1 className="why-hero-title">
                India rents you <span className="highlight-gray">3%</span>.<br />
                Dubai rents you <span className="highlight-gold">up to 12%</span>.
              </h1>
              <p className="why-hero-desc">
                Indian investors can hedge against rupee depreciation by earning tax-free, high-yielding USD-pegged rental income in a world-class financial hub just 3 hours away.
              </p>
              <div className="why-hero-btns">
                <a
                  href="https://wa.me/971500000000"
                  className="btn btn-gold btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Book Free Strategy Call</span>
                  <ArrowRight size={18} />
                </a>
                <button
                  className="btn btn-outline-light btn-lg"
                  onClick={() => document.getElementById('yield-calculator').scrollIntoView({ behavior: 'smooth' })}
                >
                  <span>See the Numbers</span>
                </button>
              </div>
            </div>

            {/* Right Comparison Card */}
            <div className="why-hero-right">
              <div className="glass-comparison-card">
                <div className="comparison-header">
                  <span className="comparison-tag">INVESTMENT COMPARISON</span>
                  <h2 className="comparison-title">India vs Dubai</h2>
                </div>

                <div className="comparison-columns">
                  {/* India Column */}
                  <div className="comp-col india-col">
                    <div className="comp-col-header">
                      <span className="market-flag">🇮🇳</span>
                      <h3 className="market-title">INDIA</h3>
                    </div>
                    <div className="comp-col-body">
                      <div className="comp-item">
                        <span className="item-lbl">Investment (800 sq. ft.)</span>
                        <span className="item-val val-danger">₹ 2.50 Cr</span>
                      </div>
                      <div className="comp-item">
                        <span className="item-lbl">Rental Yield</span>
                        <span className="item-val val-danger">3% yearly</span>
                      </div>
                      <div className="comp-item">
                        <span className="item-lbl">Capital Gain Tax</span>
                        <span className="item-val val-danger">12 to 15%</span>
                      </div>
                      <div className="comp-item">
                        <span className="item-lbl">Income Tax</span>
                        <span className="item-val val-danger">15 to 30%</span>
                      </div>
                      <div className="comp-item">
                        <span className="item-lbl">Safety</span>
                        <span className="item-val val-danger">30%</span>
                      </div>
                    </div>
                  </div>

                  {/* Dubai Column */}
                  <div className="comp-col dubai-col">
                    <div className="comp-col-header">
                      <span className="market-flag">🇦🇪</span>
                      <h3 className="market-title gold-text">DUBAI</h3>
                    </div>
                    <div className="comp-col-body">
                      <div className="comp-item">
                        <span className="item-lbl">Investment (800 sq. ft.)</span>
                        <span className="item-val val-success">₹ 2.00 Cr</span>
                      </div>
                      <div className="comp-item">
                        <span className="item-lbl">Rental Yield</span>
                        <span className="item-val val-success">8% to 9% (approx.)</span>
                      </div>
                      <div className="comp-item">
                        <span className="item-lbl">Capital Gain Tax</span>
                        <span className="item-val val-success">0%</span>
                      </div>
                      <div className="comp-item">
                        <span className="item-lbl">Income Tax</span>
                        <span className="item-val val-success">0%</span>
                      </div>
                      <div className="comp-item">
                        <span className="item-lbl">Safety</span>
                        <span className="item-val val-success">100% Escrow</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="comparison-footer">
                  <p>
                    Dubai continues to attract Indian investors with high rental yields, 0% tax policies, and long-term security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: KEY PILLARS OF DUBAI REAL ESTATE (MODERN BENTO GRID) */}
      <section className="why-pillars-section-v2">
        <div className="container">
          <div className="pillars-header text-center">
            <span className="pillars-label">STRATEGIC ADVANTAGES</span>
            <h2 className="pillars-title">Key Pillars of Dubai Real Estate</h2>
            <p className="pillars-subtitle">
              Strategic advantages that make Dubai the world's most attractive market for wealth preservation and growth.
            </p>
          </div>

          <div className="pillars-bento-grid">
            {/* Pillar 1: Tax-Free (Large Card - spans 2 cols) */}
            <div className="bento-card bento-card--large pillar-tax-free">
              <div className="bento-card-bg-glow"></div>
              <div className="bento-card-content">
                <div className="bento-header">
                  <div className="pillar-icon-box">
                    <Coins size={22} />
                  </div>
                  <span className="pillar-tag">01 / WEALTH HEDGE</span>
                </div>

                <div className="bento-body-split">
                  <div className="bento-text-side">
                    <h3 className="pillar-title-v2">100% Tax-Free Wealth Retainment</h3>
                    <p className="pillar-desc-v2">
                      Dubai levies zero personal income tax, capital gains tax, and wealth tax. All rental yields and future capital appreciation are entirely yours to keep. There are also no recurring property or land taxes.
                    </p>
                  </div>

                  <div className="tax-visual">
                    <div className="tax-gauge">
                      <div className="tax-gauge-glow"></div>
                      <svg className="tax-gauge-svg" viewBox="0 0 100 100">
                        <circle className="tax-gauge-track" cx="50" cy="50" r="44"></circle>
                        <circle className="tax-gauge-fill" cx="50" cy="50" r="44"></circle>
                      </svg>
                      <div className="tax-gauge-inner">
                        <span className="tax-gauge-num">{retainedPct}%</span>
                        <span className="tax-gauge-lbl">Retained</span>
                      </div>
                    </div>
                    <div className="tax-metrics">
                      <div className="tax-metric">
                        <span className="tax-metric-val">0%</span>
                        <span className="tax-metric-lbl">Income Tax</span>
                      </div>
                      <div className="tax-metric">
                        <span className="tax-metric-val">0%</span>
                        <span className="tax-metric-lbl">Cap. Gains</span>
                      </div>
                      <div className="tax-metric">
                        <span className="tax-metric-val">0%</span>
                        <span className="tax-metric-lbl">Wealth Tax</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2: Golden Visa (Medium Card) */}
            <div className="bento-card bento-card--medium pillar-golden-visa">
              <div className="bento-card-bg-glow"></div>
              <div className="bento-card-content">
                <div className="bento-header">
                  <div className="pillar-icon-box">
                    <UserCheck size={22} />
                  </div>
                  <span className="pillar-tag">02 / RESIDENCY</span>
                </div>

                <h3 className="pillar-title-v2">10-Year Golden Visa</h3>
                <p className="pillar-desc-v2">
                  Secure long-term residency for you, your spouse, and dependents by investing AED 2 Million (approx. USD $545,000) or more in properties.
                </p>

                <ul className="visa-privileges">
                  <li>
                    <span className="visa-check">✓</span>
                    <span className="visa-text">Self-sponsored residency status</span>
                  </li>
                  <li>
                    <span className="visa-check">✓</span>
                    <span className="visa-text">No minimum stay requirements</span>
                  </li>
                  <li>
                    <span className="visa-check">✓</span>
                    <span className="visa-text">Right to live, work, and study in UAE</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 3: High Rental Returns (Medium Card) */}
            <div className="bento-card bento-card--medium pillar-rental-returns">
              <div className="bento-card-bg-glow"></div>
              <div className="bento-card-content">
                <div className="bento-header">
                  <div className="pillar-icon-box">
                    <TrendingUp size={22} />
                  </div>
                  <span className="pillar-tag">03 / PERFORMANCE</span>
                </div>

                <h3 className="pillar-title-v2">Industry-Leading Yields</h3>
                <p className="pillar-desc-v2">
                  Dubai delivers average yields between 6% and 9% in secondary areas, and up to 12% in emerging short-term tourist districts.
                </p>

                <div className="yield-chart-container">
                  <div className="yield-chart-bar-group">
                    <div className="yield-bar-info">
                      <span className="yield-bar-label">Mumbai</span>
                      <span className="yield-bar-pct">2.7%</span>
                    </div>
                    <div className="yield-bar-track">
                      <div className="yield-bar-fill" style={{ width: '27%' }}></div>
                    </div>
                  </div>
                  <div className="yield-chart-bar-group">
                    <div className="yield-bar-info">
                      <span className="yield-bar-label">London</span>
                      <span className="yield-bar-pct">3.5%</span>
                    </div>
                    <div className="yield-bar-track">
                      <div className="yield-bar-fill" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div className="yield-chart-bar-group active-gold">
                    <div className="yield-bar-info">
                      <span className="yield-bar-label">Dubai</span>
                      <span className="yield-bar-pct highlight-gold">up to 12%</span>
                    </div>
                    <div className="yield-bar-track">
                      <div className="yield-bar-fill gold-gradient-fill" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 4: USD Currency Peg (Medium Card) */}
            <div className="bento-card bento-card--medium pillar-currency-peg">
              <div className="bento-card-bg-glow"></div>
              <div className="bento-card-content">
                <div className="bento-header">
                  <div className="pillar-icon-box">
                    <Landmark size={22} />
                  </div>
                  <span className="pillar-tag">04 / STABILITY</span>
                </div>

                <h3 className="pillar-title-v2">USD Currency Peg</h3>
                <p className="pillar-desc-v2">
                  The UAE Dirham is pegged to the US Dollar since 1997. Your real estate assets are insulated from INR currency depreciation.
                </p>

                <div className="currency-peg-widget">
                  <div className="currency-box">
                    <span className="currency-symbol">USD</span>
                    <span className="currency-name">US Dollar</span>
                  </div>
                  <div className="exchange-divider">
                    <span className="exchange-arrow">⇄</span>
                    <span className="lock-icon">🔒 FIXED RATE</span>
                  </div>
                  <div className="currency-box">
                    <span className="currency-symbol highlight-gold">AED</span>
                    <span className="currency-name">Dirham (3.67)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 5: World's Premier Safe Haven (Medium Card) */}
            <div className="bento-card bento-card--medium pillar-safe-haven">
              <div className="bento-card-bg-glow"></div>
              <div className="bento-card-content">
                <div className="bento-header">
                  <div className="pillar-icon-box">
                    <ShieldCheck size={22} />
                  </div>
                  <span className="pillar-tag">05 / SECURITY</span>
                </div>

                <h3 className="pillar-title-v2">Premier Safe Haven</h3>
                <p className="pillar-desc-v2">
                  Consistently ranked in the top 3 safest cities globally. Dubai offers an incredibly secure environment, world-class health services, and top education.
                </p>

                <div className="safe-haven-visual">
                  <div className="radar-pulser">
                    <div className="radar-ring ring-1"></div>
                    <div className="radar-ring ring-2"></div>
                    <div className="radar-ring ring-3"></div>
                    <div className="radar-center">
                      <ShieldCheck size={18} className="gold-icon" />
                    </div>
                  </div>
                  <div className="safe-stat">
                    <span className="safe-stat-val">TOP 3</span>
                    <span className="safe-stat-lbl">Safest Cities Globally</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 2.5: 4 REASONS INDIAN CAPITAL IS MOVING OFFSHORE */}
      <section className="why-offshore-section">
        <div className="container offshore-container">
          <div className="offshore-split-layout">
            {/* Left Content Column */}
            <div className="offshore-left-column">
              <span className="offshore-label">MARKET SHIFT</span>
              <h2 className="offshore-title">4 Reasons Indian Capital is Moving Offshore</h2>
              <p className="offshore-subtitle">
                Why high-net-worth Indian families and investors are diversifying their portfolios into Dubai's real estate market.
              </p>
            </div>

            {/* Right Cards Column */}
            <div className="offshore-right-column">
              <div className="offshore-cards-grid">
                {/* Reason 1 */}
                <div className="offshore-card-v2">
                  <div className="offshore-card-glow"></div>
                  <div className="offshore-card-content">
                    <div className="offshore-card-header">
                      <div className="offshore-icon-box">
                        <Coins size={20} />
                      </div>
                      <span className="offshore-card-num">01</span>
                    </div>
                    <h3 className="offshore-card-title-v2">AED Pegged to USD</h3>
                    <p className="offshore-card-desc-v2">
                      The UAE Dirham (AED) has been pegged to the US Dollar since 1997. For Indian investors, this provides a stable, inflation-hedged store of value protecting your wealth against INR depreciation.
                    </p>
                  </div>
                </div>

                {/* Reason 2 */}
                <div className="offshore-card-v2">
                  <div className="offshore-card-glow"></div>
                  <div className="offshore-card-content">
                    <div className="offshore-card-header">
                      <div className="offshore-icon-box">
                        <Plane size={20} />
                      </div>
                      <span className="offshore-card-num">02</span>
                    </div>
                    <h3 className="offshore-card-title-v2">3 Hours, One Flight</h3>
                    <p className="offshore-card-desc-v2">
                      Direct flights connect Mumbai, Delhi, Bengaluru, and other major Indian hubs in less than 4 hours. With only a 1.5-hour time difference, managing your property is effortless.
                    </p>
                  </div>
                </div>

                {/* Reason 3 */}
                <div className="offshore-card-v2">
                  <div className="offshore-card-glow"></div>
                  <div className="offshore-card-content">
                    <div className="offshore-card-header">
                      <div className="offshore-icon-box">
                        <Percent size={20} />
                      </div>
                      <span className="offshore-card-num">03</span>
                    </div>
                    <h3 className="offshore-card-title-v2">Zero Recurring Tax</h3>
                    <p className="offshore-card-desc-v2">
                      No capital gains tax on resale, no annual land tax, and zero tax on rental yields inside the UAE. Unlike India's tax-heavy properties, you keep 100% of what your asset earns.
                    </p>
                  </div>
                </div>

                {/* Reason 4 */}
                <div className="offshore-card-v2">
                  <div className="offshore-card-glow"></div>
                  <div className="offshore-card-content">
                    <div className="offshore-card-header">
                      <div className="offshore-icon-box">
                        <ShieldCheck size={20} />
                      </div>
                      <span className="offshore-card-num">04</span>
                    </div>
                    <h3 className="offshore-card-title-v2">Safety & Infrastructure</h3>
                    <p className="offshore-card-desc-v2">
                      Dubai consistently ranks in the top 3 safest cities globally. Combined with state-of-the-art infrastructure, fully funded escrow protection accounts, and premium lifestyles, it offers security unmatched by local markets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* SECTION 4: CALL TO ACTION */}
      <section className="section section--white why-cta-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-image-side">
              <img
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1000&q=80"
                alt="Dubai Skyline Marina"
                className="cta-bg-img"
              />
              <div className="cta-overlay-grad"></div>
            </div>
            <div className="cta-content-side">
              <h2 className="cta-title">Ready to build your Dubai portfolio?</h2>
              <p className="cta-desc">
                Contact our investment advisors today for a private, customized tax-efficiency analysis and priority access to off-market premium inventory.
              </p>
              <div className="cta-actions">
                <a
                  href="https://wa.me/971500000000"
                  className="btn btn-gold btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={18} style={{ marginRight: '8px' }} />
                  <span>WhatsApp Consultant</span>
                </a>
                <button
                  className="btn btn-outline-dark btn-lg"
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 200);
                  }}
                >
                  <span>Book Private Tour</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter navigate={onNavigate} />
    </div>
  );
}

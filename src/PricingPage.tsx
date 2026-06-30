import Logo from "./components/Logo";
import Footer from "./components/Footer";
import { Link } from "./router";

const EVERY_PLAN = [
  ["Personalized setup", "your services, hours, and voice"],
  ["Email & text reminders", "to reduce no-shows"],
  ["PHIPA-aware design", "assistant never stores health data"],
  ["One local contact", "me, reachable directly"],
  ["Booking handoff", "patients book in your own system"],
  ["Encrypted", "in transit and at rest"],
  ["Works with TELUS PS Suite", "fits your existing setup"],
  ["Monthly performance report", "patients helped and booked"],
];

function Check() {
  return (
    <svg className="pr-check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#F47B20" />
      <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <div className="pricing-page">
      {/* ── Header ── */}
      <header className="pr-nav">
        <div className="wrap">
          <Link to="/" className="brand">
            <span className="chip"><Logo gradId="pg" /></span>
            <span className="name">megability</span>
          </Link>
          <div className="pr-nav-right">
            <Link to="/" className="pr-navlink">Home</Link>
            <Link to="/demo" className="hero-book">Book a Demo</Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pr-hero">
        <div className="wrap">
          <span className="eyebrow">Pricing &amp; features</span>
          <h1>Two ways to<br/>work together</h1>
          <p>Both plans include the phone &amp; chat assistant and booking setup. <strong>Complete</strong> adds the website most clinics also need — designed and maintained. No resale, no markup, one local contact.</p>
        </div>
      </section>

      {/* ── Plan cards ── */}
      <section className="wrap pr-plans">
        {/* Complete — featured */}
        <div className="pr-card pr-featured">
          <span className="pr-badge">Most clinics choose this</span>
          <h2>Complete</h2>
          <p className="pr-tag">Assistant + booking + a website I design &amp; maintain</p>
          <div className="pr-price">
            <span className="pr-amt">$4,000</span><span className="pr-per">setup</span>
            <span className="pr-plus">+</span>
            <span className="pr-amt">$300</span><span className="pr-per">/mo</span>
          </div>
          <p className="pr-note">Everything in Receptionist, plus your full web presence.</p>
          <ul className="pr-list">
            <li><Check /><span><strong>Custom website</strong> — designed, built, and hosted for your clinic</span></li>
            <li><Check /><span><strong>Ongoing maintenance</strong> — routine updates up to 2 hrs/month included</span></li>
            <li><Check /><span><strong>Phone + chat assistant</strong> answering calls and website chat</span></li>
            <li><Check /><span><strong>Self-booking setup</strong> with automatic email &amp; text reminders</span></li>
            <li><Check /><span><strong>Monthly report</strong> of patients helped and booked</span></li>
            <li><Check /><span>Additional work quoted at <strong>$85/hr</strong>, always approved first</span></li>
          </ul>
          <Link to="/demo" className="btn pr-cta pr-cta-primary">Book a Demo →</Link>
        </div>

        {/* AI Receptionist */}
        <div className="pr-card">
          <h2>AI Receptionist</h2>
          <p className="pr-tag">Assistant + booking, using your existing website</p>
          <div className="pr-price">
            <span className="pr-amt">$2,000</span><span className="pr-per">setup</span>
            <span className="pr-plus">+</span>
            <span className="pr-amt">$200</span><span className="pr-per">/mo</span>
          </div>
          <p className="pr-note">For clinics whose website is already handled.</p>
          <ul className="pr-list">
            <li><Check /><span><strong>Phone assistant</strong> for calls your front desk can't reach</span></li>
            <li><Check /><span><strong>Website chat assistant</strong> for common questions</span></li>
            <li><Check /><span><strong>Self-booking setup</strong> with email &amp; text reminders</span></li>
            <li><Check /><span><strong>Monthly call report</strong></span></li>
            <li><Check /><span>Includes <strong>500 minutes/month</strong>, then $0.50/min</span></li>
          </ul>
          <Link to="/demo" className="btn pr-cta">Book a Demo →</Link>
        </div>
      </section>

      {/* ── Included in every plan ── */}
      <section className="wrap pr-every">
        <div className="ws-show-label pr-every-label">
          <span className="ws-line" /><span className="pr-every-text">Included in every plan</span><span className="ws-line" />
        </div>
        <div className="pr-every-grid">
          {EVERY_PLAN.map(([t, d], i) => (
            <div key={i} className="pr-incl">
              <Check />
              <span><strong>{t}</strong> — {d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Good to know ── */}
      <section className="wrap pr-know">
        <h3>Good to know</h3>
        <div className="pr-know-grid">
          <p>Software subscriptions are billed directly by the provider (e.g. the booking tool, ~$10/mo) — no resale, no markup. You only ever pay providers what they charge.</p>
          <p>If your clinic later moves booking deeper into PS Suite (e.g. TELUS Pomelo), I'll help confirm what your setup supports and configure the handoff — TELUS provides and prices that add-on directly.</p>
          <p>Data runs on encrypted, US-based infrastructure, which is permitted under PHIPA when disclosed to patients — built into your privacy notice.</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

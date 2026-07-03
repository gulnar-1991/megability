import Logo from "./components/Logo";
import Footer from "./components/Footer";
import { Link } from "./router";

const EVERY_PLAN = [
  ["Personalized setup", "your services, hours, and voice"],
  ["Email & text reminders", "to reduce no-shows"],
  ["PHIPA-aware design", "assistant never stores health data"],
  ["Booking handoff", "patients book in your own system"],
  ["Encrypted", "in transit and at rest"],
  ["Works with TELUS PS Suite", "fits your existing setup"],
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
            <span className="chip"><Logo variant="colored" gradId="pg" /></span>
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
          <p>Both plans include Sunny — your phone &amp; chat assistant with smart booking setup. <strong>Website + Sunny</strong> adds a custom, warm clinic website I design and maintain. No resale, no markup, one local contact.</p>
        </div>
      </section>

      {/* ── Sunny's Edge ── */}
      <section className="pr-edge">
        <div className="wrap">
          <h2>What a generic receptionist can't do</h2>
          <p className="pr-edge-intro">Most AI receptionists just take a message. Sunny actually helps families find their way.</p>
          <ul className="pr-edge-list">
            <li><Check /><span><strong>Knows Ontario's programs</strong> — OAP, Passport, ODSP, SmartStart and more, so families get real answers, not "someone will call you back."</span></li>
            <li><Check /><span><strong>Knows your local supports</strong> — woven with your region's real front-door numbers, so parents feel Sunny knows their community.</span></li>
            <li><Check /><span><strong>Texts links to the parent's phone</strong> — program info and booking links sent by text, so nothing gets lost.</span></li>
            <li><Check /><span><strong>Age-aware routing</strong> — asks the child's age and points to the right program.</span></li>
            <li><Check /><span><strong>Guides, never guesses</strong> — never diagnoses, never invents a number; built honestly for special-needs families.</span></li>
          </ul>
        </div>
      </section>

      {/* ── Plan cards ── */}
      <section className="wrap pr-plans">
        {/* Sunny — AI Receptionist only */}
        <div className="pr-card">
          <h2>Sunny</h2>
          <p className="pr-tag">Smart assistant + booking, using your existing website</p>
          <div className="pr-price">
            <span className="pr-amt">$300</span><span className="pr-per">onboarding</span>
            <span className="pr-plus">+</span>
            <span className="pr-amt">$300</span><span className="pr-per">/mo</span>
          </div>
          <p className="pr-note">For clinics whose website is already handled. Onboarding covers: custom-trained Sunny for your clinic, local Ontario program knowledge, booking + reminder setup, and full testing.</p>
          <ul className="pr-list">
            <li><Check /><span><strong>Phone assistant</strong> for calls your front desk can't reach</span></li>
            <li><Check /><span><strong>Website chat assistant</strong> for common questions</span></li>
            <li><Check /><span><strong>Self-booking setup</strong> with email &amp; text reminders</span></li>
            <li><Check /><span><strong>English + French support</strong> for families</span></li>
            <li><Check /><span>Includes <strong>500 minutes/month</strong>, then $0.50/min</span></li>
          </ul>
          <Link to="/demo" className="btn pr-cta">Book a Demo →</Link>
        </div>

        {/* Website + Sunny — featured */}
        <div className="pr-card pr-featured">
          <span className="pr-badge">Most clinics choose this</span>
          <h2>Website + Sunny</h2>
          <p className="pr-tag">Custom website + smart assistant + booking</p>
          <div className="pr-price">
            <span className="pr-amt">$2,000–4,000</span><span className="pr-per">website build</span>
            <span className="pr-plus">+</span>
            <span className="pr-amt">$300</span><span className="pr-per">/mo</span>
          </div>
          <p className="pr-note">Everything in Sunny, plus your full web presence designed and maintained by me.</p>
          <ul className="pr-list">
            <li><Check /><span><strong>Custom website</strong> — designed, built, and hosted for your clinic</span></li>
            <li><Check /><span><strong>Ongoing maintenance</strong> — routine updates up to 2 hrs/month included</span></li>
            <li><Check /><span><strong>Phone + chat assistant</strong> answering calls and website chat</span></li>
            <li><Check /><span><strong>Self-booking setup</strong> with automatic email &amp; text reminders</span></li>
            <li><Check /><span><strong>English + French support</strong> for families</span></li>
            <li><Check /><span>Includes <strong>500 minutes/month</strong>, then $0.50/min</span></li>
            <li><Check /><span>Additional work quoted at <strong>$85/hr</strong>, always approved first</span></li>
          </ul>
          <Link to="/demo" className="btn pr-cta pr-cta-primary">Book a Demo →</Link>
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

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

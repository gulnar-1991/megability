import Logo from "./components/Logo";
import Footer from "./components/Footer";
import { Link } from "./router";
import { useSeo, SEO } from "./seo";

const DEMO_URL = "https://calendly.com/gulnar-rza-e/30min";

// Sunny routes families by their real situation. These are verified Ontario
// programs — do not add rows or invent capabilities.
const ROUTING: [string, string][] = [
  ["Child under 18, autism diagnosis", "Ontario Autism Program (OAP)"],
  ["Child under 18, developmental or physical disability", "Special Services at Home (SSAH)"],
  ["Severe disability, lower-income family", "Assistance for Children with Severe Disabilities (ACSD)"],
  ["Turning 18 / adult with a developmental disability", "Developmental Services Ontario (DSO) + Passport"],
  ["Adult, low income, disability", "Ontario Disability Support Program (ODSP)"],
  ["Young child, early concerns, no diagnosis", "SmartStart Hubs"],
];

// Applies to the two monthly plans. Verified — exact wording.
const MONTHLY_INCLUDES: [string, string][] = [
  ["500 phone minutes / month", "then $0.50/min"],
  ["English and French", "every call and chat, both languages"],
  ["2 hours / month of website maintenance", "additional at $85/hr"],
  ["Phone number, hosting & platform costs", "all covered, no surprises"],
];

const NEVER = [
  "diagnose",
  "give clinical advice",
  "decide eligibility",
  "fill out applications",
  "invent figures",
  "store personal health information",
];

function Check() {
  return (
    <svg className="pr-check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#F47B20" />
      <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DemoCTA({ primary = false }: { primary?: boolean }) {
  return (
    <a
      href={DEMO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn pr-cta${primary ? " pr-cta-primary" : ""}`}
    >
      Book a 15-minute demo →
    </a>
  );
}

export default function PricingPage() {
  useSeo(SEO.pricing);
  return (
    <div className="pricing-page">
      {/* ── Header ── */}
      <header className="pr-nav">
        <div className="wrap">
          <Link to="/" className="brand" aria-label="Megability home">
            <Logo variant="colored" />
          </Link>
          <div className="pr-nav-right">
            <Link to="/" className="pr-navlink">Home</Link>
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="hero-book">
              Book a demo
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero — the core argument, in the owner's language ── */}
      <section className="pr-hero">
        <div className="wrap">
          <span className="eyebrow">Your clinic&rsquo;s AI Parent Navigator</span>
          <h1>What happens<br/>instead of voicemail</h1>
          <p>
            You&rsquo;re mid-session. The phone rings and goes to voicemail, and a
            frightened parent is left alone with a question about their child&rsquo;s
            funding all weekend. <strong>Sunny is what happens instead</strong> —
            answering your phone line and website chat 24/7, in English and French.
          </p>
        </div>
      </section>

      {/* ── What Sunny actually does ── */}
      <section className="pr-does" aria-labelledby="does-h">
        <div className="wrap">
          <h2 id="does-h">What Sunny actually does</h2>
          <p className="pr-does-intro">
            Sunny is an AI Parent Navigator for Ontario pediatric and special-needs
            clinics. It knows the system these families have to navigate — and it
            meets them where they are.
          </p>

          {/* Program routing */}
          <h3 className="pr-sub">
            It knows eight Ontario programs &mdash; and routes by the family&rsquo;s real situation
          </h3>
          <div className="pr-table-wrap">
            <table className="pr-table">
              <thead>
                <tr>
                  <th scope="col">The family&rsquo;s situation</th>
                  <th scope="col">Sunny points them to</th>
                </tr>
              </thead>
              <tbody>
                {ROUTING.map(([sit, prog], i) => (
                  <tr key={i}>
                    <td>{sit}</td>
                    <td><strong>{prog}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* The two hard conversations */}
          <h3 className="pr-sub">The two conversations clinics dread most</h3>
          <div className="pr-dread">
            <article className="pr-dread-card">
              <span className="pr-dread-tag">The waitlist conversation</span>
              <p>
                When a family is stuck waiting, Sunny doesn&rsquo;t just say
                &ldquo;sorry.&rdquo; It surfaces what they can access <em>today</em> —
                Foundational Family Services, interim funding, EarlyON, Preschool
                Speech &amp; Language, and the regional Children&rsquo;s Treatment Centre.
              </p>
            </article>
            <article className="pr-dread-card">
              <span className="pr-dread-tag">School advocacy</span>
              <p>
                Sunny explains IEP and IPRC rights and shares a ready-to-send IEP
                request letter the parent can email their principal tomorrow — no
                diagnosis or funding required. It routes by setting: school-age gets
                the IEP template; preschool and daycare get early intervention instead.
              </p>
            </article>
          </div>

          <p className="pr-also">
            Sunny also shares local and provincial program information, and guides
            families to booking with your clinic.
          </p>

          {/* Limits as a feature */}
          <div className="pr-stops">
            <div className="pr-stops-head">
              <h3 className="pr-stops-h">It knows exactly where it stops</h3>
              <p>
                An AI that knows its limits is more trustworthy than one that claims
                everything. Sunny will never:
              </p>
            </div>
            <ul className="pr-stops-list">
              {NEVER.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="pr-pricing" aria-labelledby="pricing-h">
        <div className="wrap">
          <span className="eyebrow">Pricing</span>
          <h2 id="pricing-h">Priced to replace a voicemail box,<br/>not a salary</h2>
          <p className="pr-tax">All prices are exclusive of applicable taxes.</p>

          <div className="pr-plans">
            {/* Website — one-time */}
            <div className="pr-card">
              <h3>Website</h3>
              <p className="pr-tag">A custom-designed clinic website. Not a template.</p>
              <div className="pr-price">
                <span className="pr-amt">$2,500&ndash;4,000</span>
                <span className="pr-per">one-time</span>
              </div>
              <p className="pr-note">
                For clinics that need a warm, professional home online — designed
                around your practice, not stamped from a theme.
              </p>
              <ul className="pr-list">
                <li><Check /><span><strong>Custom design</strong> — built for your clinic, not a template</span></li>
                <li><Check /><span><strong>Warm, accessible &amp; mobile-ready</strong> for the families you serve</span></li>
                <li><Check /><span><strong>Built and hosted</strong> — one local contact, no resale</span></li>
              </ul>
              <DemoCTA />
            </div>

            {/* Website + Sunny — the anchor */}
            <div className="pr-card pr-featured">
              <span className="pr-badge">Most popular</span>
              <h3>Website + Sunny</h3>
              <p className="pr-tag">The full thing — your website and your AI Parent Navigator, together.</p>
              <div className="pr-price">
                <span className="pr-amt">$4,500</span><span className="pr-per">build</span>
                <span className="pr-plus">+</span>
                <span className="pr-amt">$400</span><span className="pr-per">/month</span>
              </div>
              <p className="pr-note">
                A custom website <em>and</em> Sunny answering every call and chat, so
                no parent ever reaches a dead end while you&rsquo;re with a client.
              </p>
              <ul className="pr-list">
                <li><Check /><span><strong>Everything in Website</strong>, designed and built for you</span></li>
                <li><Check /><span><strong>Sunny on your phone &amp; website chat</strong> — 24/7, English &amp; French</span></li>
                <li><Check /><span><strong>Routes families</strong> across Ontario&rsquo;s programs by their real situation</span></li>
                <li><Check /><span><strong>Handles the waitlist &amp; school-advocacy</strong> conversations for you</span></li>
                <li><Check /><span>Includes everything in <strong>every monthly plan</strong>, below</span></li>
              </ul>
              <DemoCTA primary />
            </div>

            {/* Sunny Only */}
            <div className="pr-card">
              <h3>Sunny Only</h3>
              <p className="pr-tag">For clinics that already have a website they&rsquo;re happy with.</p>
              <div className="pr-price">
                <span className="pr-amt">$750</span><span className="pr-per">setup</span>
                <span className="pr-plus">+</span>
                <span className="pr-amt">$400</span><span className="pr-per">/month</span>
              </div>
              <p className="pr-note">
                Add Sunny to the site and phone line you already have. Same Parent
                Navigator, no rebuild.
              </p>
              <ul className="pr-list">
                <li><Check /><span><strong>Sunny on your phone &amp; website chat</strong> — 24/7, English &amp; French</span></li>
                <li><Check /><span><strong>Routes families</strong> across Ontario&rsquo;s programs</span></li>
                <li><Check /><span><strong>Waitlist &amp; school-advocacy</strong> conversations, handled</span></li>
                <li><Check /><span>Includes everything in <strong>every monthly plan</strong>, below</span></li>
              </ul>
              <DemoCTA />
            </div>
          </div>

          {/* Every monthly plan includes */}
          <div className="pr-every">
            <div className="ws-show-label pr-every-label">
              <span className="ws-line" /><span className="pr-every-text">In every monthly plan</span><span className="ws-line" />
            </div>
            <div className="pr-every-grid">
              {MONTHLY_INCLUDES.map(([t, d], i) => (
                <div key={i} className="pr-incl">
                  <Check />
                  <span><strong>{t}</strong> — {d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

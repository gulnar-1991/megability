import Logo from "./components/Logo";
import Footer from "./components/Footer";
import { Link } from "./router";
import { useSeo, SEO } from "./seo";

// The site's own demo page — same target as the main nav and the chatbot, so
// every "book" action across the site lands in one place.
const DEMO_URL = "/demo";

/* What the clinic gets back. Outcome first, mechanism second — a clinic owner
   should recognise their own week in this list before any technology is named. */
const OUTCOMES: [string, string][] = [
  ["Save your receptionist hours each week", "the same questions stop reaching the front desk"],
  ["Never miss a new inquiry", "every after-hours call and chat is captured, not lost to voicemail"],
  ["Answer parent questions 24/7", "including funding questions — OAP, SSAH and ACSD"],
  ["Reduce repetitive phone calls", "your team stops explaining the same thing twenty times a week"],
  ["Capture leads automatically", "new family details collected and sent straight to you"],
  ["Help families before and after hours", "nobody waits until Monday for an answer"],
];

const TRUST: string[] = [
  "Available 24/7",
  "Customized to your clinic",
  "No diagnoses made — ever",
  "Monthly updates included",
  "Secure conversations",
  "Human handoff when needed",
];

const MONTHLY_INCLUDES: [string, string][] = [
  ["500 phone minutes / month", "additional at $0.50/min"],
  ["2 hours / month of website maintenance", "additional at $85/hr"],
  ["English and French", "every call and chat, both languages"],
];

type Plan = {
  name: string;
  tag: string;
  price: { amt: string; per: string }[];
  value?: string;
  list: string[];
  cta: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Professional Website",
    tag: "A clinic website that earns trust from the first click.",
    price: [{ amt: "$2,500–4,000", per: "one-time build" }],
    value: "No monthly fee.",
    list: [
      "Build trust with new families from the first click",
      "Mobile optimized",
      "Fast loading",
      "Professional healthcare design",
      "Custom to your clinic — not a template",
    ],
    cta: "Schedule a 15-Minute Demo",
  },
  {
    name: "Website + AI Receptionist",
    tag: "Your website and Sunny answering every call and chat, around the clock.",
    price: [
      { amt: "$2,500–4,000", per: "build" },
      { amt: "$400", per: "/month" },
    ],
    value: "Less than the cost of one day of receptionist wages.",
    list: [
      "Everything in Professional Website",
      "24/7 parent conversations, on phone and web chat",
      "Answers funding questions accurately — OAP, SSAH, ACSD",
      "Books appointments automatically",
      "Captures every new inquiry",
      "Monthly improvements included",
    ],
    cta: "Book My Demo",
    featured: true,
  },
  {
    name: "AI Receptionist for Existing Websites",
    tag: "For clinics that already have a website they're happy with.",
    price: [
      { amt: "$750", per: "setup" },
      { amt: "$400", per: "/month" },
    ],
    value: "Less than the cost of one day of receptionist wages.",
    list: [
      "Works with your current website",
      "Answers common questions 24/7",
      "Answers funding questions — OAP, SSAH, ACSD",
      "Captures inquiries automatically",
      "Reduces receptionist interruptions",
      "Monthly optimization included",
    ],
    cta: "See Sunny Live",
  },
];

function Check() {
  return (
    <svg className="pr-check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#F47B20" />
      <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DemoCTA({ label, primary = false }: { label: string; primary?: boolean }) {
  return (
    <Link to={DEMO_URL} className={`btn pr-cta${primary ? " pr-cta-primary" : ""}`}>
      {label} →
    </Link>
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
            <Link to={DEMO_URL} className="hero-book">Book a demo</Link>
          </div>
        </div>
      </header>

      {/* ── Hero — the result, not the technology ── */}
      <section className="pr-hero">
        <div className="wrap">
          <span className="eyebrow">Pricing</span>
          <h1>Fewer missed calls.<br/>More time for your team.</h1>
          <p>
            Your phone rings all day with the same questions while your
            receptionist is already stretched. Sunny answers them — on your phone
            line and website chat, 24/7 — so{" "}
            <strong>no family reaches a dead end and no inquiry gets lost</strong>.
          </p>
        </div>
      </section>

      {/* ── Outcomes — one idea per line ── */}
      <section className="pr-out" aria-labelledby="out-h">
        <div className="wrap">
          <h2 id="out-h">What your clinic gets back</h2>
          <div className="pr-out-grid">
            {OUTCOMES.map(([t, d], i) => (
              <div key={i} className="pr-out-item">
                <Check />
                <span><strong>{t}</strong>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust ── */}
      <section className="pr-trust" aria-labelledby="trust-h">
        <div className="wrap">
          <h2 id="trust-h">Designed for busy pediatric clinics</h2>
          <ul className="pr-trust-list">
            {TRUST.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="pr-pricing" aria-labelledby="pricing-h">
        <div className="wrap">
          <h2 id="pricing-h">Simple pricing,<br/>no long-term contract</h2>
          <p className="pr-tax">All prices are exclusive of applicable taxes.</p>

          <div className="pr-plans">
            {PLANS.map((p) => (
              <div key={p.name} className={`pr-card${p.featured ? " pr-featured" : ""}`}>
                {p.featured && <span className="pr-badge">Most popular</span>}
                <h3>{p.name}</h3>
                <p className="pr-tag">{p.tag}</p>

                <div className="pr-price">
                  {p.price.map((x, i) => (
                    <span key={i} className="pr-price-part">
                      {i > 0 && <span className="pr-plus">+</span>}
                      <span className="pr-amt">{x.amt}</span>
                      <span className="pr-per">{x.per}</span>
                    </span>
                  ))}
                </div>
                {p.value && <p className="pr-value">{p.value}</p>}

                <ul className="pr-list">
                  {p.list.map((item, i) => (
                    <li key={i}><Check /><span>{item}</span></li>
                  ))}
                </ul>
                <DemoCTA label={p.cta} primary={p.featured} />
              </div>
            ))}
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

          {/* Closing CTA */}
          <div className="pr-close">
            <h3>Hear Sunny answer your clinic&rsquo;s questions</h3>
            <p>A relaxed 15-minute walkthrough — no pressure, no obligation.</p>
            <DemoCTA label="Book My Demo" primary />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

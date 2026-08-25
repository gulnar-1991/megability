import Logo from "./components/Logo";
import Footer from "./components/Footer";
import { Link } from "./router";
import { useSeo, SEO } from "./seo";
import { ProgramsGrid, ProgramNotes } from "./components/Programs";

// The site's own demo page — same target as the main nav and the chatbot, so
// every "book" action across the site lands in one place.
const DEMO_URL = "/demo";

/* What the clinic gets back. Outcome first, mechanism second — a clinic owner
   should recognise their own week in this list before any technology is named. */
const OUTCOMES: [string, string][] = [
  ["Save your receptionist hours each week", "the same questions stop reaching the front desk"],
  ["Never miss a new inquiry", "every after-hours call and chat is captured, not lost to voicemail"],
  ["Answer parent questions 24/7", "including funding questions across eight Ontario programs"],
  ["Reduce repetitive phone calls", "your team stops explaining the same thing twenty times a week"],
  ["Capture leads automatically", "new family details collected and sent straight to you"],
  ["Help families before and after hours", "nobody waits until Monday for an answer"],
];

/* Same four names as the "Who this helps" section on the homepage — Sunny is
   not pediatric-clinic-only, and the pricing page shouldn't imply it is. */
const AUDIENCES: string[] = [
  "Autism & ABA clinics",
  "Pediatric OT, PT & speech practices",
  "Schools & educators",
  "Family support organizations & charities",
];

const TRUST: string[] = [
  "Available 24/7",
  "Customized to your organization",
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

/* One plan, one price. The website tiers are gone — website design is no
   longer sold publicly — and there is deliberately no founding rate or
   per-client discount shown anywhere. */
const PLAN = {
  name: "AI Receptionist",
  tag: "Sunny on your phone line and website chat, answering families around the clock.",
  setup: { amt: "$750", per: "setup, due at signing" },
  monthly: { amt: "$400", per: "/month from month two" },
  freeMonth: "First month of service free",
  value: "Less than the cost of one day of receptionist wages.",
  guarantee:
    "30-day guarantee — if it's not working for your clinic in the first 30 days, we refund your setup fee.",
  list: [
    "Answers your phone line and website chat, 24/7",
    "Knows eight Ontario pathways, from OAP and SSAH to SmartStart and IEPs",
    "Books appointments automatically",
    "Captures every new inquiry, including after hours",
    "Customized to your organization and your region",
    "Monthly improvements included",
  ],
  cta: "Book My Demo",
};

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
          <h2 id="out-h">What your team gets back</h2>
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
          <h2 id="trust-h">Designed for busy teams</h2>
          <ul className="pr-aud-list">
            {AUDIENCES.map((a) => <li key={a}>{a}</li>)}
          </ul>
          <ul className="pr-trust-list">
            {TRUST.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </section>

      {/* ── What Sunny knows ── */}
      <section className="pr-prog" aria-labelledby="prog-h">
        <div className="wrap">
          <h2 id="prog-h">Every program she can guide a family through</h2>
          <ProgramsGrid variant="plain" />
          <ProgramNotes />
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="pr-pricing" aria-labelledby="pricing-h">
        <div className="wrap">
          <h2 id="pricing-h">Simple pricing,<br/>no long-term contract</h2>
          <p className="pr-tax">All prices are exclusive of applicable taxes.</p>

          <div className="pr-plans pr-plans-single">
            <div className="pr-card pr-featured pr-solo">
              <h3>{PLAN.name}</h3>
              <p className="pr-tag">{PLAN.tag}</p>

              <div className="pr-price">
                <span className="pr-price-part">
                  <span className="pr-amt">{PLAN.setup.amt}</span>
                  <span className="pr-per">{PLAN.setup.per}</span>
                </span>
                <span className="pr-price-part">
                  <span className="pr-plus">+</span>
                  <span className="pr-amt">{PLAN.monthly.amt}</span>
                  <span className="pr-per">{PLAN.monthly.per}</span>
                </span>
              </div>

              <p className="pr-freemonth">★ {PLAN.freeMonth}</p>
              <p className="pr-value">{PLAN.value}</p>

              <ul className="pr-list">
                {PLAN.list.map((item, i) => (
                  <li key={i}><Check /><span>{item}</span></li>
                ))}
              </ul>

              <p className="pr-guarantee">{PLAN.guarantee}</p>
              <DemoCTA label={PLAN.cta} primary />
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

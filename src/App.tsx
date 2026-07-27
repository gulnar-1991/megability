import React, { useEffect, useRef, useState } from "react";
import Logo from "./components/Logo";
import Footer from "./components/Footer";
import PhoneAgent from "./components/PhoneAgent";
import { Link } from "./router";
import { useSeo, SEO } from "./seo";

const CONVOS = [
  {
    label: "Age-aware routing",
    desc: "Sunny knows what supports shift at each life stage — so families always get current, relevant guidance, not outdated advice.",
    msgs: [
      { from: "parent", text: "My son has autism. He's 16 — what happens when he turns 18?" },
      { from: "sunny", text: "Great that you're looking ahead — 16 is exactly the right time. At 18 the supports change, so it's worth starting the DSO and Passport process now. Want me to walk you through the first step?" },
    ],
  },
  {
    label: "School & IEP support",
    desc: "Sunny helps parents understand their rights and gives them the exact words to advocate for their child at school.",
    msgs: [
      { from: "parent", text: "The school keeps brushing me off about extra help for my daughter." },
      { from: "sunny", text: "You have every right to ask. Since she's in grade school, an IEP is the right tool. I can give you a short request to copy into an email to the principal — would that help?" },
    ],
  },
  {
    label: "Local & province-wide resources",
    desc: "Sunny knows programs across Ontario — from provincial funding to local services — and connects families to the right door.",
    msgs: [
      { from: "parent", text: "I'm exhausted. I just need a break. I'm in Hamilton." },
      { from: "sunny", text: "You deserve one. SSAH and Passport can help, and locally Contact Hamilton at 905-570-8888 is a great first door. Want me to explain how each works?" },
    ],
  },
  {
    label: "Honest ADHD guidance",
    desc: "Sunny is upfront when a diagnosis doesn't qualify for provincial funding — and always points families to trusted, free resources instead of leaving them stuck.",
    msgs: [
      { from: "parent", text: "My son was just diagnosed with ADHD. Does that qualify for OAP or Passport?" },
      { from: "sunny", text: "I want to be honest with you: ADHD on its own doesn't qualify for OAP, SSAH, ACSD, DSO or Passport — those need an autism or developmental-disability diagnosis. But you're not on your own. CADDAC, ConnexOntario's free 24/7 helpline, and AboutKidsHealth from SickKids are all trusted, no-cost places to start." },
    ],
  },
  {
    label: "Safety-first, always",
    desc: "When a family is in crisis, Sunny steps back immediately and directs them to emergency services — no hesitation, no delay.",
    msgs: [
      { from: "parent", text: "My child won't wake up!" },
      { from: "sunny", text: "Please call 911 right now. This needs emergency help immediately." },
      { from: "parent", text: "What about a diagnosis though?" },
      { from: "sunny", text: "911 first — your child's safety comes before anything else. I'm here when you're ready." },
    ],
  },
];

function ConvosSection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = CONVOS.length;

  const go = (i: number) => {
    setActive(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(idx => (idx + 1) % n), 3800);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(idx => (idx + 1) % n), 3800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <section className="block convos" id="action">
      <div className="wrap">
        <span className="eyebrow">Sunny in action</span>
        <div className="cv-main">
          {/* LEFT: sticky labels */}
          <div className="cv-left">
            <h2 className="cv-big">Real moments,<br/>handled with care</h2>
            <div className="cv-list">
              {CONVOS.map((c, i) => (
                <div key={i} className={`cv-item${i === active ? " cv-active" : ""}`} onClick={() => go(i)}>
                  <div className="cv-item-dot" />
                  <div className="cv-item-body">
                    <strong>{c.label}</strong>
                    <p>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: stacked cards */}
          <div className="cv-stack-wrap">
            {CONVOS.map((c, i) => {
              const pos = (i - active + n) % n;
              const hidden = pos === n - 1;
              return (
                <div
                  key={i}
                  className={`cv-stack-card${pos === 0 ? " cv-current" : ""}`}
                  style={{
                    transform: `translateY(${pos === 0 ? 44 : pos === 1 ? 26 : 12}px) scale(${pos === 0 ? 1 : pos === 1 ? 0.95 : 0.9})`,
                    opacity: pos === 0 ? 1 : pos === 1 ? 0.72 : pos === 2 ? 0.44 : 0,
                    zIndex: n - pos,
                    transition: hidden ? "none" : "transform 0.65s cubic-bezier(.22,.61,.36,1), opacity 0.55s ease",
                  }}
                >
                  {c.msgs.map((m, j) => (
                    <div key={j} className={`cv-b ${m.from === "parent" ? "cv-parent" : "cv-sunny"}`}>
                      {m.text}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <p className="cv-disclaim">Example conversations. Sunny never diagnoses and always points families to verified programs.</p>
      </div>
    </section>
  );
}

/* "Who is Sunny" explainer video.
   Performance: nothing but the poster image (~60KB, lazy) is on the page until
   the user clicks — the <video> element is only mounted inside the modal, so
   the 17MB file is never fetched on load. The MP4 is faststart-encoded, so it
   streams rather than downloading in full. */
function SunnyVideo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button className="sv-card" onClick={() => setOpen(true)} aria-label="Play the Who is Sunny video">
        {/* Cover is drawn in CSS (no poster download) — the mascot is the same
            already-cached asset used elsewhere on the page. */}
        <span className="sv-cover">
          <img src="/assets/mascot/mascot_still.png" alt="" aria-hidden="true" className="sv-sun" loading="lazy" decoding="async" />
          <span className="sv-play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg></span>
          <span className="sv-title">Who is Sunny?</span>
          <span className="sv-sub">Watch the creator explain Sunny · 2 min 27 sec</span>
        </span>
      </button>

      {open && (
        <div className="sv-modal" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Who is Sunny video">
          <button className="sv-close" onClick={() => setOpen(false)} aria-label="Close video">✕</button>
          <div className="sv-frame" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src="/video/who-is-sunny.mp4"
              poster="/video/who-is-sunny-poster.jpg"
              controls
              autoPlay
              playsInline
              preload="auto"
            />
          </div>
        </div>
      )}
    </>
  );
}

// Names/types match the clinic actually shown in each template recording.
const TEMPLATES = [
  { name: "Bright Horizons Pediatric Care", type: "Down Syndrome, Autism & Developmental Care", accent: "#7B6CF0", bg: "#EDE9FF", url: "brighthorizonspediatric.ca", gif: "/template-gifs/template1.gif" },
  { name: "Star Therapy",                   type: "Occupational, Speech & Developmental Therapy", accent: "#9B8FF5", bg: "#F3F0FF", url: "startherapy.ca", gif: "/template-gifs/template2.gif" },
  { name: "Hellocare",                      type: "Pediatric Speech, Sensory & Physical Therapy", accent: "#5A4AD1", bg: "#ECEAFF", url: "hellocare.ca", gif: "/template-gifs/template3.gif" },
];

function TemplateCard({ t, pos, onActivate }: { t: typeof TEMPLATES[0]; pos: number; onActivate: () => void }) {
  const [expandedGif, setExpandedGif] = useState<string | null>(null);
  const abs = Math.abs(pos);
  const visible = abs <= 2;
  const isCenter = pos === 0;
  const style: React.CSSProperties = {
    transform: `translateX(${pos * 88}%) scale(${1 - abs * 0.1}) translateZ(${-abs * 60}px)`,
    opacity: visible ? 1 - abs * 0.22 : 0,
    zIndex: 10 - abs,
    pointerEvents: abs > 1 ? "none" : "auto",
    cursor: isCenter ? "default" : "pointer",
    transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
  };

  return (
    <>
      <div
        className="tpl-card"
        style={style}
        onClick={() => { if (!isCenter) onActivate(); }}
      >
        <div className="tpl-preview" style={{ background: t.bg }}>
          <div
            className="tpl-gif-container"
            onClick={(e) => { e.stopPropagation(); setExpandedGif(t.gif); }}
          >
            <img src={t.gif} alt={`${t.name} template preview`} className="tpl-gif" />
          </div>
        </div>
        <div className="tpl-label">
          <span className="tpl-name" style={{ color: t.accent }}>{t.name}</span>
          <span className="tpl-type">{t.type}</span>
        </div>
      </div>

      {expandedGif && (
        <div className="tpl-gif-modal" onClick={() => setExpandedGif(null)}>
          <div className="tpl-gif-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="tpl-gif-close" onClick={() => setExpandedGif(null)}>✕</button>
            <img src={expandedGif} alt={`${t.name} template expanded`} className="tpl-gif-expanded" />
          </div>
        </div>
      )}
    </>
  );
}

function TemplatesSection() {
  const [idx, setIdx] = useState(0);
  const n = TEMPLATES.length;

  return (
    <section className="block tpl-section" id="websites">
      <div className="wrap">
        <span className="eyebrow">What sets us apart</span>
        <h2>Beautiful website templates, built for pediatric clinics</h2>
        <p className="intro tpl-intro">
          Every Megability website comes with Sunny built right in — not bolted on. Pick one of our clinic-ready templates and go live fast,{" "}
          <strong>or request a fully custom design</strong> tailored to your brand.
        </p>
        <p className="tpl-sub">Designed to build trust with parents from the very first click. Clean layouts, warm colours, no walls of text.</p>
      </div>

      <div className="tpl-stage">
        {TEMPLATES.map((t, i) => {
          let pos = i - idx;
          if (pos > n / 2)  pos -= n;
          if (pos < -n / 2) pos += n;
          return <TemplateCard key={t.name} t={t} pos={pos} onActivate={() => setIdx(i)} />;
        })}
      </div>

      <div className="tpl-controls wrap">
        <div className="tpl-dots">
          {TEMPLATES.map((_, i) => (
            <button key={i} className={`tpl-dot${i === idx ? " active" : ""}`} onClick={() => setIdx(i)} aria-label={`Template ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

const WHY_LEFT = [
  { q: "How do I get my child assessed for autism in Ontario?", a: "You can start with a referral from your family doctor or pediatrician to a developmental pediatrician or psychologist. I can also point you to publicly funded assessment options near you — want me to check your area?" },
  { q: "What's the difference between OAP Core and Caregiver streams?", a: "Core funding supports services like therapy and respite based on your child's needs. Caregiver-Mediated is shorter, group-based coaching for caregivers. Based on your child's age and goals, I can suggest which fits best." },
  { q: "We just moved to Ontario — where do we even begin?", a: "Welcome! First, register your child with the Ontario Autism Program and connect with your local AccessOAP care coordinator. I'll walk you through each step and share the exact links you need." },
  { q: "What are ABA and IBI — can you provide them?", a: "ABA (Applied Behaviour Analysis) and IBI (Intensive Behavioural Intervention) are autism therapies accessed through OAP funding. I can explain clearly what each one involves and how families reach them — but I never deliver or supervise the therapy myself." },
];

const WHY_RIGHT = [
  { q: "Is there help while we wait on the OAP list?", a: "Yes — interim one-time funding may be available, plus Passport, Special Services at Home, and free local programs. Let me show you what you can access right now while you wait." },
  { q: "My daughter is turning 18. What changes?", a: "At 18 she transitions to adult services — DSO registration and Passport funding become key. It's worth starting 6–12 months early. I can map out the timeline for you." },
  { q: "Can you help me prepare for an IEP meeting?", a: "Absolutely. I'll explain your rights, give you a checklist of questions to ask, and even draft an email to the school requesting the meeting. You won't walk in unprepared." },
  { q: "My child has ADHD, not autism — is there help for us?", a: "Yes, and I'll be honest with you: ADHD doesn't qualify for OAP, SSAH, ACSD, DSO or Passport, since those need an autism or developmental-disability diagnosis. So I point families to three trusted, free resources instead — CADDAC for parent support, ConnexOntario's 24/7 helpline, and AboutKidsHealth from SickKids. I'll never send you to a private paid clinic from an ad." },
];

function WhySection() {
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(0);
  const [leftVis, setLeftVis] = useState(true);
  const [rightVis, setRightVis] = useState(true);

  // The blinking mascot is now a single self-looping transparent webp
  // (sunny-blink.webp) — no JS frame timer, and ~38× smaller than the old
  // 52-PNG sequence.

  useEffect(() => {
    const t = setInterval(() => {
      setLeftVis(false);
      setTimeout(() => { setLeftIdx(i => (i + 1) % WHY_LEFT.length); setLeftVis(true); }, 260);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setRightVis(false);
      setTimeout(() => { setRightIdx(i => (i + 1) % WHY_RIGHT.length); setRightVis(true); }, 260);
    }, 3400);
    return () => clearInterval(t);
  }, []);

  const lc = WHY_LEFT[leftIdx];
  const rc = WHY_RIGHT[rightIdx];

  return (
    <div className="wrap why-stage">
        {/* Left rotating card */}
        <div className={`why-card${leftVis ? " wc-in" : ""}`}>
          <span className="wc-eyebrow">Parent asks</span>
          <p className="wc-question">{lc.q}</p>
          <span className="wc-eyebrow wc-eyebrow-a">Sunny replies</span>
          <p className="wc-answer">{lc.a}</p>
          <div className="wc-dots">
            {WHY_LEFT.map((_, i) => <span key={i} className={i === leftIdx ? "wc-dot active" : "wc-dot"} />)}
          </div>
        </div>

        {/* Center mascot — self-looping blink webp */}
        <div className="why-mascot">
          <img
            src="/assets/mascot/sunny-blink.webp"
            alt="Sunny"
            draggable={false}
          />
        </div>

        {/* Right rotating card */}
        <div className={`why-card why-card-r${rightVis ? " wc-in" : ""}`}>
          <span className="wc-eyebrow">Parent asks</span>
          <p className="wc-question">{rc.q}</p>
          <span className="wc-eyebrow wc-eyebrow-a">Sunny replies</span>
          <p className="wc-answer">{rc.a}</p>
          <div className="wc-dots">
            {WHY_RIGHT.map((_, i) => <span key={i} className={i === rightIdx ? "wc-dot active" : "wc-dot"} />)}
          </div>
        </div>
    </div>
  );
}

function DemoSection() {
  const [tab, setTab] = useState<'voice'|'chat'>('chat');

  return (
    <section className="block el-demo" id="demo">
      {/* ── Two-column header ── */}
      <div className="el-header">
        <div className="el-header-left">
          <span className="eyebrow el-eyebrow">See it live</span>
          <h2 className="el-headline">Sunny at work,<br/>around the clock</h2>
        </div>
        <div className="el-header-right">
          <p className="el-sub">From a parent's first question to a confirmed appointment — Sunny handles every step, <strong>24/7, on chat and phone</strong>. No missed calls, no waiting, no confusion.</p>
          <a href="#book" className="btn el-cta-btn">Book a walkthrough →</a>
        </div>
      </div>

      {/* ── Showcase card ── */}
      <div className="el-card">
        {/* Orb */}
        <div className="el-orb-wrap">
          <div className="el-orb">
            <div className="el-orb-inner" />
            <div className="el-orb-glow" />
          </div>
          {tab === 'voice' && (
            <div className="el-call-btn">
              <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="el-bottom-bar">
          <div className="el-agent-tag">
            <img src="/assets/mascot/mascot_still.png" alt="Sunny" className="el-agent-avatar" />
            <span>Sunny</span>
          </div>
          <div className="el-tabs">
            <button className={`el-tab${tab==='voice'?' el-tab-active':''}`} onClick={()=>setTab('voice')}>Voice</button>
            <button className={`el-tab${tab==='chat'?' el-tab-active':''}`} onClick={()=>setTab('chat')}>Chat</button>
          </div>
          <a href="#book" className="btn el-book-btn">Book a Demo</a>
        </div>

        {/* Content panel */}
        {tab === 'chat' ? (
          <div className="el-chat-panel">
            <div className="db-bubble db-sunny">Hi there! Is your child already enrolled in a program, or are you just starting to look?</div>
            <div className="db-bubble db-parent">We're trying to understand the OAP waitlist…</div>
            <div className="db-bubble db-sunny">The Ontario Autism Program has three streams — <strong>Core, Caregiver, and Skills</strong>. Based on your child's age, Core is likely the right fit. Want me to walk you through the first step?</div>
            <div className="db-bubble db-parent">Yes please!</div>
            <div className="db-bubble db-sunny">Great. I'll send you the direct link — what's the best number to text you?</div>
            <div className="db-typing"><span/><span/><span/></div>
          </div>
        ) : (
          <div className="el-voice-panel">
            <div className="el-voice-wave">
              {[...Array(12)].map((_,i)=><span key={i} style={{animationDelay:`${i*0.08}s`}}/>)}
            </div>
            <p className="el-voice-label">Sunny is listening…</p>
            <div className="el-voice-transcript">
              <div className="el-vt-line el-vt-parent">"My son has autism — what programs can help him?"</div>
              <div className="el-vt-line el-vt-sunny">"Great question. At his age, OAP is the right starting point. Let me walk you through the first step…"</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function App() {
  useSeo(SEO.home);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu on Escape or a click/tap outside the nav.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const els = document.querySelectorAll('.anim');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-shine" aria-hidden="true" />
        <div className="hero-fade" aria-hidden="true" />
        <div className={`hero-nav${menuOpen ? " menu-open" : ""}`} ref={navRef}>
          <div className="wrap">
            <div className="brand">
              <Logo variant="white" />
            </div>
            <div className="hero-nav-right">
              <div className="navpill">
                <a href="#websites">Websites</a>
                <a href="#why">Why Sunny</a>
                <a href="#phone">Phone</a>
                <a href="#journey">How it works</a>
                <Link to="/pricing">Pricing</Link>
              </div>
              <Link to="/demo" className="hero-book">Book a Demo</Link>
              <button
                className={`nav-burger${menuOpen ? " open" : ""}`}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(o => !o)}
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
          <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
            <a href="#websites" onClick={() => setMenuOpen(false)}>Websites</a>
            <a href="#why" onClick={() => setMenuOpen(false)}>Why Sunny</a>
            <a href="#phone" onClick={() => setMenuOpen(false)}>Phone</a>
            <a href="#journey" onClick={() => setMenuOpen(false)}>How it works</a>
            <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
            <Link to="/demo" className="nav-mobile-cta" onClick={() => setMenuOpen(false)}>Book a Demo</Link>
          </div>
        </div>

        <div className="wrap">
          <div className="hero-body">
            <div className="hero-copy">
              <h1>Meet Sunny</h1>
              <div className="sub-strong">The AI Parent Navigator for Ontario Pediatric Clinics</div>
              <p className="builtfor">Built specifically for pediatric, autism, speech, occupational therapy, and developmental clinics. Helping parents find trusted local resources while reducing repetitive calls to your front desk.</p>
              <div className="hero-trust">
                <span><svg className="trust-tick" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#F47B20"/><path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>PIPEDA compliant</span>
                <span><svg className="trust-tick" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#F47B20"/><path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>No data collected</span>
                <span><svg className="trust-tick" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#F47B20"/><path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>No diagnosis, ever</span>
              </div>
              <div className="hero-ctas">
                <Link to="/demo" className="btn btn-white">Book a Demo</Link>
                <a href="#action" className="btn btn-watch">See Sunny in Action</a>
              </div>
            </div>
            <div className="hero-mascot">
              <img src="/assets/mascot/mascot.webp" alt="Sunny, the Megability AI assistant" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHO IS SUNNY ============ */}
      <section className="block who-sunny" id="why">
        <div className="wrap">
          <span className="eyebrow">Meet your new team member</span>
          <h2>Who is Sunny?</h2>
          <p className="ws-para">Sunny is an AI parent navigator — live on your clinic's website and phone line 24/7. She guides families through Ontario's special needs programs, explains waitlists in plain language, books appointments, and answers every repetitive question your front desk receives daily. Fully customized to your region, your clinic, and your families.</p>
          <div className="ws-features">
            <span>Guides parents through OAP, IBI & provincial programs</span>
            <span>Explains waitlists clearly, without the confusion</span>
            <span>Customized to your region & clinic</span>
            <span>Works on phone & chat — simultaneously</span>
            <span>Asks child ages and sends useful links for specific programs</span>
          </div>
          <SunnyVideo />
        </div>
        <WhySection />
      </section>

      {/* ============ DEMO — BENTO: SUNNY AT WORK ============ */}
      <section className="block demo" id="demo">
        <div className="wrap">
          <div className="db-centered-header">
            <h2 className="db-headline">Sunny at work,<br/>around the clock</h2>
            <p className="db-sub">From a parent's first question to a confirmed appointment — Sunny handles every step, 24/7.</p>
          </div>
        </div>
        {/* Grid: orb zone left, chat card right */}
        <div className="db-stage">
          <div className="db-orb-zone">
            <div className="db-orb db-orb-1"><div className="db-onum">24/7</div><span>Always on</span></div>
            <div className="db-orb db-orb-2"><div className="db-otitle">Age-aware</div><span>Routes by the child's age</span></div>
            <div className="db-orb db-orb-3"><div className="db-otitle">Warm first</div><span>Built for worried parents</span></div>
            <div className="db-orb db-orb-4"><div className="db-otitle">PHIPA compliant</div><span>Privacy you can trust</span></div>
            <div className="db-orb db-orb-5"><div className="db-onum">No diagnosis</div><span>Ever. Not once.</span></div>
            <div className="db-orb db-orb-6"><div className="db-otitle">Reminders</div><span>Email &amp; text, automatically</span></div>
            <div className="db-orb db-orb-7"><div className="db-otitle">Book appointment</div><span>Straight from the chat</span></div>
            <div className="db-orb db-orb-8"><div className="db-otitle">OAP · Passport · ODSP</div><span>Specialist program knowledge</span></div>
            <div className="db-orb db-orb-9"><div className="db-otitle">EN · FR + more</div><span>Handles French natively</span></div>
            <div className="db-orb db-orb-10"><div className="db-otitle">Works with</div><span>Calendly · Google Cal · Jane<br/>+ any system you already use</span></div>
          </div>
          <div className="db-chat-card">
            <div className="db-chat-header">
              <img src="/assets/mascot/mascot_still.png" alt="Sunny" className="db-avatar" />
              <div><strong>Sunny</strong><span>Your clinic's AI navigator</span></div>
            </div>
            <div className="db-bubble db-sunny">Hi there! Is your child already enrolled in a program, or are you just starting to look?</div>
            <div className="db-bubble db-parent">We're trying to understand the OAP waitlist…</div>
            <div className="db-bubble db-sunny">The Ontario Autism Program has three streams — <strong>Core, Caregiver, and Skills</strong>. Based on your child's age, Core is likely the right fit. Want me to walk you through the first step?</div>
            <div className="db-bubble db-parent">Yes please!</div>
            <div className="db-bubble db-sunny">Great. I'll send you the direct link — what's the best number to text you?</div>
            <div className="db-typing"><span/><span/><span/></div>
          </div>
        </div>
      </section>

      {/* ============ CONVOS — STACKED CARDS: SUNNY IN ACTION ============ */}
      <ConvosSection />

      {/* ============ PHONE AGENT — SUNNY ON THE LINE (interactive) ============ */}
      <PhoneAgent />

      {/* ============ WEBSITES / TEMPLATES: BEAUTIFUL WEBSITE ============ */}
      <TemplatesSection />

      {/* ============ JOURNEY — NUMBERED STEPS ============ */}
      <section className="block journey" id="journey">
        <div className="wrap">
          <div className="jrn-header">
            <span className="eyebrow">How it works</span>
            <h2>From confused parent<br/>to booked appointment</h2>
          </div>
          <div className="jrn-steps">
            <div className="jrn-step anim">
              <div className="jrn-num">01</div>
              <h3>Parent asks a question</h3>
              <p>By chat or phone, any hour of the day or night.</p>
            </div>
            <div className="jrn-step anim anim-d1">
              <div className="jrn-num">02</div>
              <h3>Sunny listens & responds</h3>
              <p>Warm, plain answers about programs and what to do next.</p>
            </div>
            <div className="jrn-step jrn-step-accent anim anim-d2">
              <div className="jrn-num">03</div>
              <h3>Sunny recommends a path</h3>
              <p>The right program matched to the child's age and situation.</p>
            </div>
            <div className="jrn-step jrn-step-accent anim anim-d3">
              <div className="jrn-num">04</div>
              <h3>Sunny books the slot</h3>
              <p>The family picks a time that works. No phone tag, no waiting.</p>
            </div>
            <div className="jrn-step jrn-step-dark anim anim-d4">
              <div className="jrn-num">05</div>
              <h3>Clinic gets a qualified lead</h3>
              <p>Details land exactly where your team already works.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOR YOUR WORLD — SPLIT: COPY + CLINIC ART ============ */}
      <section className="block fyw-s">
        <div className="fyw-bg" aria-hidden="true" />
        <div className="wrap">
          <div className="fyw-split">
            <div className="fyw-copy anim">
              <span className="eyebrow fyw-eyebrow">Made for your world</span>
              <h2>Built for clinics<br/>like <em>yours</em>.</h2>
              <p>From autism and ABA to speech, occupational, and developmental care — Sunny is shaped around your specialty, your programs, and the families who walk through your doors.</p>
              <div className="fyw-pills">
                <span className="fyw-pill">Autism clinics</span>
                <span className="fyw-pill">Speech therapy</span>
                <span className="fyw-pill">Occupational therapy</span>
                <span className="fyw-pill">ABA clinics</span>
                <span className="fyw-pill">Developmental pediatrics</span>
                <span className="fyw-pill">ADHD support</span>
                <span className="fyw-pill">Down syndrome services</span>
                <span className="fyw-pill">Developmental services</span>
              </div>
            </div>
            <div className="fyw-art anim anim-d2">
              <img src="/assets/for-your-world-bg.webp" alt="Sunny beside a pediatric clinic on the clouds" draggable={false} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="finalcta" id="book">
        <div className="wrap">
          <div className="cta-panel">
            <img src="/assets/mascot/mascot_still.png" alt="Sunny" />
            <div className="cta-text">
              <h2>Ready to meet Sunny?</h2>
              <p>See how Sunny greets your families and lightens the load on your team. A relaxed 30-minute walkthrough — no pressure.</p>
              <Link to="/demo" className="btn btn-gold">Book a Demo</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <Footer />
    </>
  );
}

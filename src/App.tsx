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

/* The clarify-before-answering exchange, verbatim. The point of the section is
   that Sunny asks a qualifying question before naming a program, so the order
   of these four turns is the content — don't reorder or trim them. */
const NAV_THREAD: { role: "parent" | "ask" | "guide"; label: string; text: string }[] = [
  { role: "parent", label: "Parent asks", text: "Is there any programs I should apply for autism?" },
  { role: "ask", label: "Sunny asks first", text: "Does he already have an autism diagnosis, or are you still working on getting one?" },
  { role: "parent", label: "Parent", text: "He's 3, not diagnosed yet." },
  { role: "guide", label: "Sunny guides, correctly", text: "Since he's not diagnosed yet, the best first step is a SmartStart Hub for early screening. Want me to text you the link?" },
];

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 20.5C12 20.5 3.5 15.6 3.5 9.9A4.9 4.9 0 0 1 12 6.6a4.9 4.9 0 0 1 8.5 3.3c0 5.7-8.5 10.6-8.5 10.6Z"
        stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function ClinicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20.5h16M6 20.5V6.2a1.2 1.2 0 0 1 1.2-1.2h9.6A1.2 1.2 0 0 1 18 6.2v14.3"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8.4v4.2M9.9 10.5h4.2M10 20.5v-3.2h4v3.2"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NavigationSection() {
  return (
    <section className="block navproof" id="navigation">
      <div className="wrap">
        <span className="eyebrow">Real navigation, not just answers</span>
        <h2>She doesn&rsquo;t just answer questions.<br/>She guides families to the right next step.</h2>
        <p className="intro np-intro">
          A generic chatbot names a program and moves on. Sunny checks the one
          thing that actually matters first — and still keeps every family
          moving forward.
        </p>

        <div className="np-split">
          <div className="np-aside">
            <img src="/assets/mascot/mascot_still.png" alt="" className="np-mascot" loading="lazy" decoding="async" />
            <h3>Watch her check before she guesses.</h3>
            <p>
              This is a real conversation, unedited. Notice she doesn&rsquo;t name a
              program until she actually knows if it applies — then she still gives
              a clear next step, even when the answer isn&rsquo;t the one people expect.
            </p>
          </div>

          <div className="np-card">
            <span className="np-card-label">Real conversation</span>
            <div className="np-thread">
              {NAV_THREAD.map((m, i) => (
                <div key={i} className={`np-turn np-${m.role}`}>
                  <span className="np-role">{m.label}</span>
                  <p className="np-text">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="np-benefits">
          <article className="np-benefit">
            <span className="np-ic np-ic-parent"><HeartIcon /></span>
            <h3>For parents</h3>
            <p>
              She won&rsquo;t tell you what you want to hear just to end the call faster.
              If something doesn&rsquo;t apply yet, she says so — and tells you exactly what
              to do instead, so you&rsquo;re never left with nothing.
            </p>
            <span className="np-pill">Never misleads</span>
          </article>

          <article className="np-benefit">
            <span className="np-ic np-ic-clinic"><ClinicIcon /></span>
            <h3>For clinics</h3>
            <p>
              Every call ends in a next step your team can act on — even the ones
              where a family doesn&rsquo;t qualify yet. That means fewer dead-end
              conversations, and a receptionist that protects your clinic&rsquo;s
              credibility, not just answers the phone.
            </p>
            <span className="np-pill np-pill-warm">Never loses the lead</span>
          </article>
        </div>
      </div>
    </section>
  );
}

/* Audience segments. Deliberately wider than autism clinics — schools and
   family support organizations field the same repeat questions with even less
   admin capacity. No named clients or partnerships here; these are the kinds of
   organization Sunny is built for, not a customer list. */
const AUDIENCES: { title: string; desc: string }[] = [
  {
    title: "Autism & ABA clinics",
    desc: "Families arrive mid-diagnosis with funding questions your front desk answers twenty times a week.",
  },
  {
    title: "Pediatric OT, PT & speech practices",
    desc: "Parents want wait times, what to expect, and whether they need a referral — usually at 9pm.",
  },
  {
    title: "Schools & educators",
    desc: "Staff field IEP and support questions they were never funded to answer. Sunny explains the process in plain language.",
  },
  {
    title: "Family support organizations & charities",
    desc: "Small teams, high volume. Sunny handles the repeat questions so your people can do the work only people can do.",
  },
];

function WhoThisHelpsSection() {
  return (
    <section className="block wth" id="who">
      <div className="wrap">
        <span className="eyebrow">Who this helps</span>
        <h2>Built for the people<br/>families call first</h2>
        <p className="intro wth-intro">
          If your team answers the same questions about diagnosis, funding and
          waitlists every week, Sunny takes that load — whether you&rsquo;re a clinic,
          a school, or a family support organization.
        </p>

        <ul className="wth-list">
          {AUDIENCES.map((a, i) => (
            <li key={a.title} className="wth-row">
              <span className="wth-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="wth-body">
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

{/* FOUNDER STORY - Gulnar to write this herself, do not fill in */}
function FounderStorySection() {
  return (
    <section className="block founder" id="founder">
      <div className="wrap">
        <span className="eyebrow">Why I built Sunny</span>
        {/* FOUNDER STORY - Gulnar to write this herself, do not fill in.
            Replace everything inside .founder-body with your own words. The
            section is hidden from the page until it has content — flip
            FOUNDER_STORY_READY to true once you've written it. */}
        <div className="founder-body">
          <p className="founder-placeholder">[ Founder story goes here ]</p>
        </div>
      </div>
    </section>
  );
}

/* Keep the founder section out of the live page until Gulnar has written it —
   an empty section with a placeholder in it is worse than no section. */
const FOUNDER_STORY_READY = false;

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
            alt="Sunny, the AI parent navigator that answers parent questions 24/7"
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
            <img src="/assets/mascot/mascot_still.png" alt="" className="el-agent-avatar" />
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
              {/* Problem first, product second. The positioning line stays
                  inside the H1 because it carries the terms the page ranks
                  for — the headline alone names the pain, not the category. */}
              <h1 className="hero-problem">
                Parents wait years for a pediatric autism diagnosis. Sunny helps them use that time, not lose it.
                <span className="sub-strong">The AI Parent Navigator for Ontario Pediatric Clinics</span>
              </h1>
              <p className="builtfor">While families wait, Sunny answers the phone and the questions clinics don&rsquo;t have time for — funding programs, next steps, real guidance — so nobody&rsquo;s stuck waiting in silence.</p>
              <div className="hero-trust">
                <span><svg className="trust-tick" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#F47B20"/><path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>PHIPA-aligned</span>
                <span><svg className="trust-tick" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#F47B20"/><path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>No health data stored</span>
                <span><svg className="trust-tick" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#F47B20"/><path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>No diagnosis, ever</span>
              </div>
              <div className="hero-ctas">
                <Link to="/demo" className="btn btn-white">Book a Demo</Link>
                <a href="#action" className="btn btn-watch">See Sunny in Action</a>
              </div>
            </div>
            <div className="hero-mascot">
              <img src="/assets/mascot/mascot.webp" alt="Sunny, the Megability AI parent navigator, wearing a headset" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ REAL NAVIGATION, NOT JUST ANSWERS ============ */}
      <NavigationSection />

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
            <div className="db-orb db-orb-4"><div className="db-otitle">PHIPA-aligned</div><span>Privacy you can trust</span></div>
            <div className="db-orb db-orb-5"><div className="db-onum">No diagnosis</div><span>Ever. Not once.</span></div>
            <div className="db-orb db-orb-6"><div className="db-otitle">Reminders</div><span>Email &amp; text, automatically</span></div>
            <div className="db-orb db-orb-7"><div className="db-otitle">Book appointment</div><span>Straight from the chat</span></div>
            <div className="db-orb db-orb-8"><div className="db-otitle">OAP · Passport · ODSP</div><span>Specialist program knowledge</span></div>
            <div className="db-orb db-orb-9"><div className="db-otitle">EN · FR + more</div><span>Handles French natively</span></div>
            <div className="db-orb db-orb-10"><div className="db-otitle">Works with</div><span>Calendly · Google Cal · Jane<br/>+ any system you already use</span></div>
          </div>
          <div className="db-chat-card">
            <div className="db-chat-header">
              <img src="/assets/mascot/mascot_still.png" alt="" className="db-avatar" />
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

      {/* ============ WHO THIS HELPS ============ */}
      <WhoThisHelpsSection />

      {/* ============ FOUNDER STORY (placeholder — see FOUNDER_STORY_READY) ============ */}
      {FOUNDER_STORY_READY && <FounderStorySection />}

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
                <span className="fyw-pill">Schools &amp; educators</span>
                <span className="fyw-pill">Family support organizations</span>
              </div>
              {/* Positions the Ontario depth as a starting point rather than a
                  limit — the receptionist itself works for any clinic; it's the
                  funding-program knowledge that's province-specific. */}
              <p className="fyw-reach">
                <strong>Ontario first, not Ontario only.</strong> Sunny answers calls and
                chat for any clinic — the deep funding-program knowledge starts with
                Ontario, and more provinces are on the way.
              </p>
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
            <img src="/assets/mascot/mascot_still.png" alt="" />
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

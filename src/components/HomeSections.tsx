import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";

/**
 * FAQ, feature grid and the missed-call calculator.
 *
 * Motion note: entrances use the site's existing `.reveal` / `.anim` classes,
 * which a single IntersectionObserver in App.tsx switches on once per element.
 * `motion` is in package.json but has never been imported, so pulling it in
 * here would put ~50KB of JS on a page whose weight we just cut by 24MB — the
 * observer already does everything these sections need.
 *
 * Every animation here is gated on prefers-reduced-motion: the CSS neutralises
 * the entrances, hovers and the badge pulse, and `useCountUp` below skips
 * straight to the final value rather than tweening.
 */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Tweens a number toward `target`. Honours reduced-motion by snapping. */
function useCountUp(target: number, duration = 500) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;

    if (prefersReducedMotion()) {
      fromRef.current = target;
      setValue(target);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const next = from + (target - from) * eased;
      setValue(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

const money = (n: number) =>
  "$" + Math.round(n).toLocaleString("en-CA");

/* ───────────────────────── FAQ ───────────────────────── */

const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I need to change my booking system or website?",
    a: "No. Sunny works alongside what you already use — Calendly, Google Calendar, Jane, or whatever your team books in today. She answers your existing phone line and sits on the website you already have, so there's nothing to migrate and no new system for your staff to learn.",
  },
  {
    q: "Why isn't this cheaper than other options?",
    a: "Because it isn't a generic chatbot you configure yourself. The monthly fee covers ongoing customization to your clinic, keeping the Ontario program knowledge current as OAP, SSAH and Passport rules change, and a real person improving her answers every month. A cheaper tool will happily give a family a confident wrong answer — that costs more than the difference.",
  },
  {
    q: "Does Sunny ever diagnose or give medical advice?",
    a: "Never. Sunny navigates and guides — she explains how programs work, what the next step is, and where to go. She does not diagnose, screen, assess eligibility, or offer clinical advice, and she defers to qualified professionals every time. If a family describes an emergency, she directs them to call 911 immediately.",
  },
  {
    q: "What happens if it doesn't work for my clinic?",
    a: "You get your setup fee back. If Sunny isn't working for your clinic within the first 30 days, we refund the $750 in full — that's the 30-day guarantee on our pricing page. Your first month of service is free regardless, so you can see how she handles real calls before paying anything monthly.",
  },
  {
    q: "Is my families' data safe?",
    a: "Sunny stores no personal health information. She's built to be PHIPA-aligned, which means your clinic stays the health information custodian and Megability acts as your service provider. Conversations are handled securely, and what we do collect and why is set out in full in our privacy policy.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const innerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [heights, setHeights] = useState<number[]>(() => FAQS.map(() => 0));

  /* Heights are measured and applied in px. The 0fr -> 1fr grid trick resolved
     to 0px here — `fr` needs a definite container height, which a collapsible
     panel doesn't have. Re-measured on resize so a rewrap doesn't clip text. */
  useEffect(() => {
    const measure = () =>
      setHeights(FAQS.map((_, i) => (i === open ? innerRefs.current[i]?.scrollHeight ?? 0 : 0)));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  return (
    <section className="block faq-s" id="faq">
      <div className="wrap">
        <span className="eyebrow reveal">Questions clinics ask</span>
        <h2 className="reveal reveal-1">Before you book a demo</h2>

        <div className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`faq-item reveal reveal-${Math.min(i + 1, 6)}${isOpen ? " is-open" : ""}`}
              >
                <h3>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="none">
                        <path d="M10 4.5v11M4.5 10h11" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div className="faq-a-outer" id={`faq-a-${i}`} role="region" style={{ height: heights[i] }}>
                  <div
                    className="faq-a-inner"
                    ref={(el) => { innerRefs.current[i] = el; }}
                  >
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Features ─────────────────────── */

type Feature = { title: string; points: string[]; icon: ReactElement };

const I = {
  phone: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M6.5 3.5h4l1.4 4-2.3 1.6a12 12 0 0 0 5.3 5.3l1.6-2.3 4 1.4v4a1.5 1.5 0 0 1-1.6 1.5C10.6 18.4 5.6 13.4 5 5.1A1.5 1.5 0 0 1 6.5 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none"><path d="M20 12.4c0 3.6-3.6 6.5-8 6.5a9.6 9.6 0 0 1-2.6-.35L4.5 20l1.2-3.2A6.2 6.2 0 0 1 4 12.4C4 8.8 7.6 6 12 6s8 2.8 8 6.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
  ),
  sms: (
    <svg viewBox="0 0 24 24" fill="none"><rect x="7" y="3" width="10" height="18" rx="2.4" stroke="currentColor" strokeWidth="1.6"/><path d="M11 18h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none"><rect x="3.8" y="5.3" width="16.4" height="14.4" rx="2.2" stroke="currentColor" strokeWidth="1.6"/><path d="M3.8 9.6h16.4M8.4 3.6v3.2M15.6 3.6v3.2M9.3 14.1l1.9 1.9 3.5-3.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.6"/><path d="M15.1 8.9 13.5 13.5 8.9 15.1l1.6-4.6 4.6-1.6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.6"/><path d="M3.6 12h16.8M12 3.6c2.1 2.3 3.2 5.3 3.2 8.4s-1.1 6.1-3.2 8.4c-2.1-2.3-3.2-5.3-3.2-8.4S9.9 5.9 12 3.6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
  ),
};

const FEATURES: Feature[] = [
  { title: "Phone answering", icon: I.phone, points: ["Picks up 24/7, including nights and weekends", "Plain language, never clinical jargon", "Takes a message when a human is needed"] },
  { title: "Website chat", icon: I.chat, points: ["Runs at the same time as the phone line", "Answers the questions your front desk repeats daily", "Never leaves a family on a dead end"] },
  { title: "Text message links", icon: I.sms, points: ["Sends funding program links straight to a phone", "Booking links texted during the call", "No 'I'll email it later' follow-up for your staff"] },
  { title: "Appointment booking", icon: I.calendar, points: ["Books into the calendar you already use", "Works with Calendly, Google Calendar and Jane", "Reminders sent automatically"] },
  { title: "Ontario program guidance", icon: I.compass, points: ["OAP, SSAH, ACSD, Passport and DSO", "Routes by the child's age and situation", "Kept current as program rules change"] },
  { title: "Bilingual support", icon: I.globe, points: ["English and French on every call and chat", "Handles French natively, not translated", "Same guidance in either language"] },
];

function FeaturesSection() {
  return (
    <section className="block feat-s" id="features">
      <div className="wrap">
        <span className="eyebrow reveal">What Sunny does</span>
        <h2 className="reveal reveal-1">Everything running,<br/>around the clock</h2>
        <p className="intro feat-intro reveal reveal-2">
          No pilot programs or waitlists — every capability below is live for
          clinics using Sunny today.
        </p>

        <div className="feat-grid">
          {FEATURES.map((f, i) => (
            <article key={f.title} className={`feat-card reveal reveal-${Math.min(i + 1, 6)}`}>
              <span className="feat-ic">{f.icon}</span>
              <span className="feat-badge"><i aria-hidden="true" />Available now</span>
              <h3>{f.title}</h3>
              <ul>
                {f.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── Calculator ────────────────────── */

function CalculatorSection() {
  const [value, setValue] = useState(600);
  const [missed, setMissed] = useState(12);
  const [dragging, setDragging] = useState(false);

  const annual = value * missed * 52;
  const animatedAnnual = useCountUp(annual);
  const animatedMonthly = useCountUp(annual / 12);
  const animatedMissed = useCountUp(missed);

  return (
    <section className="block calc-s" id="calculator">
      <div className="wrap">
        <span className="eyebrow reveal">The cost of a ringing phone</span>
        <h2 className="reveal reveal-1">What are missed calls<br/>already costing you?</h2>
        <p className="intro calc-intro reveal reveal-2">
          Every call that goes to voicemail is a family who may not call back.
          Put your own numbers in below.
        </p>

        <div className="calc-card reveal reveal-3">
          <div className="calc-inputs">
            <label className="calc-field">
              <span className="calc-label">Average value of a new family</span>
              <span className="calc-money">
                <span aria-hidden="true">$</span>
                <input
                  type="number"
                  min={0}
                  max={100000}
                  step={50}
                  value={value}
                  onChange={(e) => setValue(Math.max(0, Number(e.target.value) || 0))}
                  aria-label="Average value of a new family in dollars"
                />
              </span>
            </label>

            <label className="calc-field">
              <span className="calc-label">
                Missed calls per week
                <strong className="calc-count">{missed}</strong>
              </span>
              <input
                className={`calc-slider${dragging ? " is-dragging" : ""}`}
                type="range"
                min={0}
                max={50}
                step={1}
                value={missed}
                onChange={(e) => setMissed(Number(e.target.value))}
                onPointerDown={() => setDragging(true)}
                onPointerUp={() => setDragging(false)}
                onBlur={() => setDragging(false)}
                aria-label="Missed calls per week"
              />
              <span className="calc-scale" aria-hidden="true"><span>0</span><span>50</span></span>
            </label>
          </div>

          <div className="calc-out">
            <span className="calc-out-label">Potential missed revenue per year</span>
            <strong className="calc-big">{money(animatedAnnual)}</strong>
            <div className="calc-sub">
              <div>
                <span className="calc-sub-num">{money(animatedMonthly)}</span>
                <span className="calc-sub-lbl">Monthly</span>
              </div>
              <div>
                <span className="calc-sub-num">{Math.round(animatedMissed)}</span>
                <span className="calc-sub-lbl">Missed families per week</span>
              </div>
            </div>
          </div>
        </div>

        {/* The inputs are the clinic's own guesses, so say so plainly rather
            than letting the output read like a Megability statistic. */}
        <p className="calc-note reveal reveal-4">
          These are your estimates, not Megability figures. The calculation assumes
          each missed call is one family and that none of them call back.
        </p>
      </div>
    </section>
  );
}

export { FaqSection, FeaturesSection, CalculatorSection };

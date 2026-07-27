import { useState, type FormEvent } from "react";
import Logo from "./components/Logo";
import Footer from "./components/Footer";
import { useSeo, SEO } from "./seo";
import { Link } from "./router";

// Submissions are emailed to info@megability.ca via Web3Forms (key is tied to
// that address; safe to ship in client code — their spam protection is
// server-side). Switched from FormSubmit after its 2026-07 outage.
const FORM_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = "aa58f336-2e31-48a2-987a-9e1212c25da1";

// Mailto fallback so a lead is never lost when the form service is down:
// opens the visitor's mail app with everything they typed already filled in.
const buildMailtoHref = (data: Record<string, string>) => {
  const body = Object.entries(data)
    .filter(([key, value]) => !key.startsWith("_") && value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  const subject = "Demo request — Megability";
  return `mailto:info@megability.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export default function DemoPage() {
  useSeo(SEO.demo);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mailtoHref, setMailtoHref] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [source, setSource] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    setSubmitting(true);
    setError("");
    setMailtoHref("");

    const send = async () => {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        signal: AbortSignal.timeout(6000),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: WEB3FORMS_KEY,
          subject: "New demo request — Megability",
          from_name: "Megability website",
        }),
      });
      const json = await res.json().catch(() => ({}));
      return res.ok && json.success === true;
    };

    try {
      let ok = await send().catch(() => false);
      if (!ok) {
        // one retry — transient hiccups are common with the free form service
        await new Promise((r) => setTimeout(r, 800));
        ok = await send().catch(() => false);
      }
      if (ok) {
        setSent(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError("Our form service is temporarily unavailable — send your request by email instead, it's already written for you:");
        setMailtoHref(buildMailtoHref(data));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="demo-page">
      <header className="demo-nav">
        <div className="wrap">
          <Link to="/" className="brand">
            <Logo variant="colored" />
          </Link>
          <Link to="/" className="demo-back">← Back to site</Link>
        </div>
      </header>

      <section className="demo-hero">
        <div className="wrap demo-grid">
          {/* Left — pitch */}
          <div className="demo-intro">
            <span className="eyebrow demo-eyebrow">Book a demo</span>
            <h1>See Sunny in<br/>action with our team</h1>
            <ul className="demo-points">
              <li>See and hear Sunny answer calls and chats first-hand</li>
              <li>Walk through setup, privacy (PHIPA), and your clinic's needs</li>
              <li>Compare the Receptionist and Complete plans</li>
              <li>Talk pricing, timeline, and go-live</li>
            </ul>
          </div>

          {/* Right — form */}
          <div className="demo-form-wrap">
            {sent ? (
              <div className="demo-success">
                <div className="demo-check">✓</div>
                <h2>Request received!</h2>
                <p>Thanks — we'll reach out within one business day to set up your walkthrough. Talk soon.</p>
                <Link to="/" className="btn demo-submit">Back to home</Link>
              </div>
            ) : (
              <form className="demo-form" onSubmit={onSubmit}>
                {/* Honeypot — bots tick this, humans never see it (Web3Forms convention) */}
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
                <div className="demo-row">
                  <label>First name*<input type="text" name="First name" required placeholder="First name" /></label>
                  <label>Last name*<input type="text" name="Last name" required placeholder="Last name" /></label>
                </div>
                <label>Clinic / practice name*<input type="text" name="Clinic" required placeholder="Your clinic" /></label>
                <label>Work email*<input type="email" name="email" required placeholder="you@clinic.ca" /></label>
                <label>Phone number*<input type="tel" name="Phone" required placeholder="(000) 000-0000" /></label>
                <label>Your role<input type="text" name="Role" placeholder="e.g. Clinic owner, office manager" /></label>
                <label>Clinic specialty
                  <select name="Specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                    <option value="" disabled>Select…</option>
                    <option>Autism / ABA</option>
                    <option>Speech therapy</option>
                    <option>Occupational therapy</option>
                    <option>Developmental pediatrics</option>
                    <option>ADHD support</option>
                    <option>Other</option>
                  </select>
                  {specialty === "Other" && (
                    <input type="text" name="Specialty (other)" required placeholder="Please tell us your specialty" style={{ marginTop: 8 }} />
                  )}
                </label>
                <label>Where did you find us?
                  <select name="Where did you find us" value={source} onChange={(e) => setSource(e.target.value)}>
                    <option value="" disabled>Select…</option>
                    <option>Google search</option>
                    <option>LinkedIn</option>
                    <option>Instagram</option>
                    <option>Facebook</option>
                    <option>Reddit</option>
                    <option>Referral from another business</option>
                    <option>Other</option>
                  </select>
                  {source === "Other" && (
                    <input type="text" name="Where did you find us (other)" required placeholder="Please tell us where" style={{ marginTop: 8 }} />
                  )}
                </label>
                <label>What can we help with?
                  <textarea name="Message" rows={3} placeholder="Tell us a little about your clinic and what you're hoping Sunny can do." />
                </label>
                <label className="demo-consent">
                  <input type="checkbox" name="Consent" value="Agreed to be contacted" required />
                  <span>I agree to be contacted about my demo. Your details are handled per our privacy notice and never sold.</span>
                </label>
                {error && <p className="demo-error">{error}</p>}
                {mailtoHref && (
                  <a className="btn demo-submit demo-mailto" href={mailtoHref}>
                    Send by email instead
                  </a>
                )}
                <button type="submit" className="btn demo-submit" disabled={submitting}>
                  {submitting ? "Sending…" : "Request my demo"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

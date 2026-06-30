import { useState, type FormEvent } from "react";
import Logo from "./components/Logo";
import Footer from "./components/Footer";
import { Link } from "./router";

// Submissions are emailed to info@megability.ca via FormSubmit (no backend/key).
// NOTE: the first submission triggers a one-time confirmation email to that
// address — click "Activate Form" in it once, then all submissions are delivered.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/info@megability.ca";

export default function DemoPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: "New demo request — Megability",
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json.success === "true" || json.success === true)) {
        setSent(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(json.message || "Couldn't send right now — please email info@megability.ca directly.");
      }
    } catch {
      setError("Couldn't send right now — please email info@megability.ca directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="demo-page">
      <header className="demo-nav">
        <div className="wrap">
          <Link to="/" className="brand">
            <span className="chip"><Logo gradId="dg" /></span>
            <span className="name">megability</span>
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
            <div className="demo-aside">
              <p>Prefer to talk now? Call our live demo line</p>
              <a href="tel:+13653641630" className="demo-phone">365 364 1630</a>
            </div>
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
                {/* Honeypot — bots fill this, humans don't */}
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
                <div className="demo-row">
                  <label>First name*<input type="text" name="First name" required placeholder="First name" /></label>
                  <label>Last name*<input type="text" name="Last name" required placeholder="Last name" /></label>
                </div>
                <label>Clinic / practice name*<input type="text" name="Clinic" required placeholder="Your clinic" /></label>
                <label>Work email*<input type="email" name="email" required placeholder="you@clinic.ca" /></label>
                <label>Phone number*<input type="tel" name="Phone" required placeholder="(000) 000-0000" /></label>
                <label>Your role<input type="text" name="Role" placeholder="e.g. Clinic owner, office manager" /></label>
                <label>Clinic specialty
                  <select name="Specialty" defaultValue="">
                    <option value="" disabled>Select…</option>
                    <option>Autism / ABA</option>
                    <option>Speech therapy</option>
                    <option>Occupational therapy</option>
                    <option>Developmental pediatrics</option>
                    <option>ADHD support</option>
                    <option>Other</option>
                  </select>
                </label>
                <label>What can we help with?
                  <textarea name="Message" rows={3} placeholder="Tell us a little about your clinic and what you're hoping Sunny can do." />
                </label>
                <label className="demo-consent">
                  <input type="checkbox" name="Consent" value="Agreed to be contacted" required />
                  <span>I agree to be contacted about my demo. Your details are handled per our privacy notice and never sold.</span>
                </label>
                {error && <p className="demo-error">{error}</p>}
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

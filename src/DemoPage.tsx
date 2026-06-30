import { useState, type FormEvent } from "react";
import Logo from "./components/Logo";
import Footer from "./components/Footer";
import { Link } from "./router";

export default function DemoPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                <div className="demo-row">
                  <label>First name*<input type="text" required placeholder="First name" /></label>
                  <label>Last name*<input type="text" required placeholder="Last name" /></label>
                </div>
                <label>Clinic / practice name*<input type="text" required placeholder="Your clinic" /></label>
                <label>Work email*<input type="email" required placeholder="you@clinic.ca" /></label>
                <label>Phone number*<input type="tel" required placeholder="(000) 000-0000" /></label>
                <label>Your role<input type="text" placeholder="e.g. Clinic owner, office manager" /></label>
                <label>Clinic specialty
                  <select defaultValue="">
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
                  <textarea rows={3} placeholder="Tell us a little about your clinic and what you're hoping Sunny can do." />
                </label>
                <label className="demo-consent">
                  <input type="checkbox" required />
                  <span>I agree to be contacted about my demo. Your details are handled per our privacy notice and never sold.</span>
                </label>
                <button type="submit" className="btn demo-submit">Request my demo</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

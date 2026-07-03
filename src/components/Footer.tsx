import Logo from "./Logo";
import { Link } from "../router";

// Shared site footer — used on both the landing page and the pricing page so
// they stay identical. Styled by the global `footer{}` rules in index.css.
export default function Footer() {
  return (
    <footer id="footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-left">
            <div className="foot-brand">
              <span className="chip"><Logo variant="white" gradId="fg" /></span>
              <span>megability</span>
            </div>
            <p>Websites + AI Parent Navigator for pediatric and developmental clinics. Helping families find their way, day and night.</p>
          </div>
          <div className="foot-contact">
            <div><span className="lbl">Email</span> <a href="mailto:info@megability.ca">info@megability.ca</a></div>
            <div><span className="lbl">Web</span> <a href="https://www.megability.ca">megability.ca</a></div>
            <div><span className="lbl">Based in</span> Stoney Creek, Ontario</div>
          </div>
        </div>
        <p className="disclaimer">Megability and Sunny provide general guidance and help families navigate publicly available Ontario programs and services. Sunny does not diagnose, screen, or provide medical advice, and does not store families' medical records. Always confirm details with the relevant program or a qualified professional. In an emergency, call 911.</p>
        <div className="foot-bottom">
          <span>© 2026 Megability</span>
          <span><Link to="/pricing">Pricing</Link><a href="#">Privacy</a><a href="#">Terms</a><Link to="/demo">Book a Demo</Link></span>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from "react";
import Logo from "./Logo";

// Lightweight branded splash. Shows on first paint, then fades quickly — it does
// NOT wait for every image (window.load) to finish, just a short beat so the page
// has painted, so it never blocks on the large hero/clinic assets.
export default function Loader() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = window.setTimeout(() => {
      setHide(true);
      document.body.style.overflow = "";
    }, 600);
    const t2 = window.setTimeout(() => setGone(true), 1050);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`loader${hide ? " loader-out" : ""}`} role="status" aria-label="Loading">
      <div className="loader-mark">
        <span className="loader-ring" aria-hidden="true" />
        <span className="loader-chip"><Logo iconOnly /></span>
      </div>
    </div>
  );
}

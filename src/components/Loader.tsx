import { useEffect, useState } from "react";
import { CLINIC_NAME, TAGLINE } from "../data";

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
    }, 1400);

    const removeTimer = setTimeout(() => {
      setMounted(false);
    }, 2200); // Wait for transition of 0.8s to finish

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`page-loader ${hidden ? "hidden" : ""}`}
      id="page-loader"
      role="status"
      aria-label="Loading page content"
    >
      <div className="text-center px-6 animate-pulse select-none">
        <h1 className="font-serif italic text-6xl sm:text-7xl md:text-8xl text-[#1A2E1D] tracking-tight leading-none mb-4">
          {CLINIC_NAME}
        </h1>
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-slate-500 max-w-md mx-auto">
          {TAGLINE}
        </p>
      </div>
    </div>
  );
}

import { useEffect } from "react";

const SELECTOR = ".anim, .reveal, .calc-card";

/**
 * Switches on the site's scroll-entrance animations.
 *
 * Every page that renders `.anim`, `.reveal` or `.calc-card` must call this —
 * those elements start at opacity 0 and stay there until something marks them.
 * It used to live inline in App.tsx, so the shared programs list (which carries
 * `.reveal`) rendered completely invisible on the pricing page, which never ran
 * it. A page-level hook makes that failure mode much harder to reintroduce.
 *
 * IntersectionObserver is the primary trigger, but a scroll/resize sweep runs
 * alongside it: if the observer never fires, the consequence is a blank section,
 * which is far worse than the cost of a throttled rect check.
 *
 * Marks with a data attribute rather than a class, because className on these
 * sections is React-controlled and a re-render would wipe a class added here.
 */
export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (!els.length) return;

    const reveal = (el: Element) => el.setAttribute("data-in", "");
    const pending = new Set(els);

    if (typeof IntersectionObserver === "undefined") {
      els.forEach(reveal);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          reveal(e.target);
          pending.delete(e.target as HTMLElement);
          obs.unobserve(e.target);
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));

    // Fallback sweep — reveals anything already within the viewport that the
    // observer hasn't reported yet.
    let frame = 0;
    const sweep = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        pending.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            reveal(el);
            pending.delete(el);
            obs.unobserve(el);
          }
        });
        if (!pending.size) teardown();
      });
    };

    const teardown = () => {
      window.removeEventListener("scroll", sweep);
      window.removeEventListener("resize", sweep);
    };

    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("resize", sweep);
    const initial = window.setTimeout(sweep, 1200);

    return () => {
      obs.disconnect();
      teardown();
      cancelAnimationFrame(frame);
      clearTimeout(initial);
    };
  }, []);
}

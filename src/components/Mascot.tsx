import { useEffect, useRef } from "react";

/**
 * Faux-3D mascot: the flat SVG tilts toward the pointer (rotateX/rotateY) and a
 * glossy highlight tracks the cursor, so it reads as a shiny sphere reacting to
 * you. Not a real 3D model — it can't show its back — but needs no extra assets.
 * Swap the <img> for a <model-viewer> later when a .glb exists.
 */
export default function Mascot({ className = "", alt = "Sunny" }: { className?: string; alt?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Skip on touch devices — there's no hover pointer to track.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    // Track the pointer across the whole hero so Sunny "looks" before you reach her.
    const zone: Element = el.closest(".mascot-zone") ?? el;
    let raf = 0;

    const apply = (rx: number, ry: number, mx: number, my: number) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
        el.style.setProperty("--mx", `${mx.toFixed(1)}%`);
        el.style.setProperty("--my", `${my.toFixed(1)}%`);
      });
    };

    const onMove = (e: Event) => {
      const ev = e as PointerEvent;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // Normalised offset from the mascot centre, clamped so far corners don't over-rotate.
      const nx = Math.max(-1, Math.min(1, (ev.clientX - cx) / (r.width * 0.9)));
      const ny = Math.max(-1, Math.min(1, (ev.clientY - cy) / (r.height * 0.9)));
      apply(-ny * 16, nx * 22, 50 + nx * 34, 40 + ny * 30);
    };

    const onLeave = () => apply(0, 0, 50, 40);

    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`mascot3d ${className}`} ref={wrapRef}>
      <img src="/assets/sunny.svg" alt={alt} draggable={false} />
      <span className="gloss" aria-hidden="true" />
    </div>
  );
}

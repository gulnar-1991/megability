import { useEffect, useState } from "react";
import Mascot from "./Mascot";

// Spline "Public URL" (viewer) share link. This embed type is meant to be loaded
// as an iframe; its animations (blink, look-at, idle) play exactly as authored in
// Spline. For JS-driven control instead, switch to @splinetool/react-spline with a
// Spline "Export → Code" scene.splinecode URL.
const SCENE_URL = "https://my.spline.design/r4xbot-fGQaTQZFyN7ruSKyoIvcY6hc/";

export default function SplineScene({ alt = "Sunny" }: { alt?: string }) {
  const [enabled, setEnabled] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Respect reduced-motion: skip the heavy WebGL scene, keep the static SVG.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setEnabled(false);
  }, []);

  if (!enabled) return <Mascot alt={alt} />;

  return (
    <div className="spline-mascot">
      {/* Lightweight SVG shown instantly until the 3D scene paints. */}
      {!loaded && (
        <div className="spline-mascot__fallback">
          <Mascot alt={alt} />
        </div>
      )}
      <iframe
        title={alt}
        src={SCENE_URL}
        loading="lazy"
        allow="autoplay; fullscreen"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}

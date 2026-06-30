import { useSyncExternalStore } from "react";
import type { ReactNode, MouseEvent } from "react";

// Tiny zero-dependency router for the two routes this site needs ("/" and
// "/pricing"). Uses the History API; the dev server (Vite SPA mode) and prod
// (Express index.html catch-all) both serve index.html for unknown paths, so
// clean URLs survive a refresh. Navigation fires a "megnav" event that the
// usePathname subscribers listen for, alongside the browser's popstate.
const subscribe = (cb: () => void) => {
  window.addEventListener("popstate", cb);
  window.addEventListener("megnav", cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener("megnav", cb);
  };
};

export function usePathname() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => "/",
  );
}

export function navigate(to: string) {
  if (to !== window.location.pathname) {
    window.history.pushState({}, "", to);
    window.dispatchEvent(new Event("megnav"));
  }
  window.scrollTo(0, 0);
}

export function Link({
  to,
  className,
  children,
  onClick,
}: {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab, etc.) behave natively.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onClick?.();
    navigate(to);
  };
  return (
    <a href={to} className={className} onClick={handle}>
      {children}
    </a>
  );
}

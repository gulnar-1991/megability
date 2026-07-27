import { useEffect } from "react";

/* Per-route metadata for the SPA.
   index.html carries the homepage's static tags (social scrapers don't run JS,
   so those must be in the HTML). Google *does* render JS, so this hook keeps
   the title / description / canonical correct on /pricing and /demo. */

const SITE = "https://www.megability.ca";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  useEffect(() => {
    const url = SITE + path;
    document.title = title;

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path]);
}

export const SEO = {
  home: {
    title: "AI Receptionist for Pediatric Clinics in Ontario | Megability",
    description:
      "Sunny is an AI parent navigator that answers your clinic's phone and web chat 24/7, guides families through OAP and Ontario programs, and books appointments.",
    path: "/",
  },
  pricing: {
    title: "Pricing — AI Receptionist & Clinic Websites | Megability",
    description:
      "Simple pricing for Sunny, the AI parent navigator, and a clinic website with Sunny built in. Answer every call, guide families, and book more appointments.",
    path: "/pricing",
  },
  demo: {
    title: "Book a Demo — See Sunny in Action | Megability",
    description:
      "Book a relaxed 30-minute walkthrough. See how Sunny greets your families on chat and phone, explains Ontario programs, and books appointments for your clinic.",
    path: "/demo",
  },
} as const;

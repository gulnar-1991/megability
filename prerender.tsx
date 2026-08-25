/**
 * Build-time prerendering.
 *
 * The site ships as a static SPA, so the HTML Vite emits has an empty
 * <div id="root"></div>. Googlebot runs JS and copes, but Bingbot and the AI
 * crawlers (GPTBot et al) largely do not — they fetched the page, saw zero
 * body text and refused to index it ("Discovered but not crawled").
 *
 * This renders each route to static markup with react-dom/server and bakes it
 * into the built HTML, so crawlers get the real copy. On the client,
 * createRoot() replaces the markup on mount, so runtime behaviour is unchanged
 * and there is no hydration contract to keep in sync.
 */
import {writeFileSync, mkdirSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, 'dist');

// Components reach for browser globals at import time (see Loader/SplineScene).
// A minimal shim keeps module evaluation alive; effects never run under
// renderToStaticMarkup, so nothing here needs to be faithful.
const noop = () => {};
const stub: any = {
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: noop,
  matchMedia: () => ({matches: false, addEventListener: noop, removeEventListener: noop}),
  location: {pathname: '/', href: 'https://www.megability.ca/', search: '', hash: ''},
  history: {pushState: noop, replaceState: noop},
  scrollTo: noop,
  requestAnimationFrame: noop,
  cancelAnimationFrame: noop,
  getComputedStyle: () => ({getPropertyValue: () => ''}),
  innerWidth: 1280,
  innerHeight: 800,
  navigator: {userAgent: 'prerender'},
};
const el: any = {
  style: {setProperty: noop},
  classList: {add: noop, remove: noop, toggle: noop},
  addEventListener: noop,
  removeEventListener: noop,
  appendChild: noop,
  removeChild: noop,
  setAttribute: noop,
  querySelector: () => null,
  querySelectorAll: () => [],
};
const doc: any = {
  documentElement: el,
  body: el,
  head: el,
  createElement: () => el,
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: noop,
  removeEventListener: noop,
};
(globalThis as any).window ??= {...stub, document: doc};
(globalThis as any).document ??= doc;
(globalThis as any).navigator ??= stub.navigator;
(globalThis as any).matchMedia ??= stub.matchMedia;
(globalThis as any).requestAnimationFrame ??= noop;
(globalThis as any).cancelAnimationFrame ??= noop;
(globalThis as any).getComputedStyle ??= stub.getComputedStyle;

const {renderToStaticMarkup} = await import('react-dom/server');
const React = (await import('react')).default;

const App = (await import('./src/App.tsx')).default;
const PricingPage = (await import('./src/PricingPage.tsx')).default;
const DemoPage = (await import('./src/DemoPage.tsx')).default;
const LegalPage = (await import('./src/LegalPage.tsx')).default;
const FundingGuidePage = (await import('./src/FundingGuidePage.tsx')).default;
const Loader = (await import('./src/components/Loader.tsx')).default;

const {SEO} = await import('./src/seo.ts');

type RouteSeo = {title: string; description: string; path: string};

const routes: Array<{out: string; Component: any; seo: RouteSeo; props?: any}> = [
  {out: 'index.html', Component: App, seo: SEO.home},
  {out: 'pricing/index.html', Component: PricingPage, seo: SEO.pricing},
  {out: 'demo/index.html', Component: DemoPage, seo: SEO.demo},
  {out: 'ontario-funding-guide/index.html', Component: FundingGuidePage, seo: SEO.funding},
  {out: 'privacy/index.html', Component: LegalPage, seo: SEO.privacy, props: {kind: 'privacy'}},
  {out: 'terms/index.html', Component: LegalPage, seo: SEO.terms, props: {kind: 'terms'}},
];

const SITE = 'https://www.megability.ca';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/**
 * useSeo() fixes the head at runtime, but crawlers read the served HTML. Without
 * this every prerendered route would ship the homepage's canonical, telling
 * Google /pricing and /demo are duplicates of / — which would keep them out of
 * the index entirely.
 */
function applySeo(html: string, seo: RouteSeo): string {
  const url = SITE + seo.path;
  const swaps: Array<[RegExp, string]> = [
    [/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`],
    [/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(seo.description)}"`],
    [/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`],
    [/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`],
    [/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(seo.title)}"`],
    [/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(seo.description)}"`],
    [/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${esc(seo.title)}"`],
    [/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${esc(seo.description)}"`],
  ];
  for (const [re, replacement] of swaps) {
    if (!re.test(html)) throw new Error(`SEO tag not found in template: ${re}`);
    html = html.replace(re, replacement);
  }
  return html;
}

const template = readFileSync(join(dist, 'index.html'), 'utf8');

for (const {out, Component, seo, props} of routes) {
  const path = seo.path;
  (globalThis as any).window.location.pathname = path;

  let markup = '';
  try {
    // Mirror Root in main.tsx: the splash sits above the page. Baking it in too
    // means the static HTML already looks like the first React frame, so the
    // page doesn't flash content -> splash -> content on load.
    markup = renderToStaticMarkup(
      React.createElement(React.Fragment, null,
        React.createElement(Loader),
        React.createElement(Component, props ?? null),
      ),
    );
  } catch (err) {
    console.error(`  ✗ ${path} failed to prerender:`, (err as Error).message);
    process.exitCode = 1;
    continue;
  }

  const withMarkup = template.replace(
    '<div id="root"></div>',
    `<div id="root">${markup}</div>`,
  );

  if (withMarkup === template) {
    console.error('  ✗ could not find <div id="root"></div> in the built HTML');
    process.exitCode = 1;
    break;
  }

  const html = applySeo(withMarkup, seo);

  const dest = join(dist, out);
  mkdirSync(dirname(dest), {recursive: true});
  writeFileSync(dest, html, 'utf8');

  const text = markup.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`  ✓ ${path.padEnd(9)} → ${out.padEnd(20)} ${text.length.toLocaleString()} chars of text`);
}

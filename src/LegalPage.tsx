import Logo from "./components/Logo";
import Footer from "./components/Footer";
import { Link } from "./router";
import { useSeo, SEO } from "./seo";

/**
 * Privacy Policy and Terms of Service.
 *
 * Both were linked from the footer as href="#" while the site made statutory
 * claims (PHIPA/PIPEDA) with nothing behind them, which is the first thing a
 * cautious clinic director checks. One component renders both, since they share
 * a layout and neither justifies its own file.
 *
 * These are drafts written from what the site actually does — the demo form
 * fields, the fact Sunny stores no health information, Web3Forms as the form
 * handler. They are not a substitute for review by a lawyer.
 */

const LAST_UPDATED = "12 August 2026";

type Block =
  | { h: string; p?: string[]; ul?: string[] }
  | { h?: undefined; p: string[]; ul?: string[] };

const PRIVACY: Block[] = [
  {
    h: "Who we are",
    p: [
      "Megability builds websites and Sunny, an AI parent navigator, for pediatric and developmental clinics in Ontario. We are based in Stoney Creek, Ontario, Canada. You can reach us at info@megability.ca about anything on this page, including a request to see, correct or delete your information.",
    ],
  },
  {
    h: "What this policy covers",
    p: [
      "This policy covers information Megability collects through this website — principally the demo request form. It does not cover information your clinic holds about its own patients. Where Sunny operates on a clinic's website or phone line, that clinic remains responsible for its own privacy practices, and this policy sits alongside, not instead of, theirs.",
    ],
  },
  {
    h: "What we collect, and why",
    p: ["When you submit the demo request form, we collect what you type into it:"],
    ul: [
      "First and last name",
      "Clinic name",
      "Email address",
      "Phone number",
      "Your role at the clinic",
      "Your clinic's specialty",
      "How you found us",
      "Any message you choose to write",
    ],
  },
  {
    p: [
      "We use this only to reply to you, arrange a demo, and answer follow-up questions about our services. We do not sell it, rent it, or share it for advertising. We do not use it to build advertising profiles.",
      "Our website does not set advertising or tracking cookies. The chat widget on the site is provided by Voiceflow and may set its own functional storage in order to keep a conversation going.",
    ],
  },
  {
    h: "Health information and PHIPA",
    p: [
      "Sunny does not store personal health information. It does not diagnose, screen, assess eligibility, or provide medical advice, and it does not keep families' medical records.",
      "Under Ontario's Personal Health Information Protection Act, 2004 (PHIPA), a clinic is the \"health information custodian\" for its patients' information. Megability is not a custodian. Where we handle information on a clinic's behalf, we act as that clinic's service provider and are bound by our agreement with them. Our systems are built to support a clinic's PHIPA obligations, but compliance ultimately rests with the custodian.",
      "Megability's own handling of business contact information — for example, a demo request from a clinic owner — is governed by Canada's federal Personal Information Protection and Electronic Documents Act (PIPEDA).",
    ],
  },
  {
    h: "Who else touches your information",
    p: [
      "We use a small number of service providers to run this site and reach you. Each receives only what it needs:",
    ],
    ul: [
      "Web3Forms — delivers demo form submissions to our email",
      "Google Workspace — our email, where we read and reply to you",
      "Vercel — hosts this website and processes standard server logs",
      "Voiceflow — powers the chat widget",
    ],
  },
  {
    p: [
      "Some of these providers may process or store data outside Canada, including in the United States, where it may be subject to the laws of that country.",
    ],
  },
  {
    h: "How long we keep it",
    p: [
      "We keep demo enquiries for as long as we are in contact with you and for a reasonable period afterwards, so we can pick up the conversation if you come back. If you ask us to delete your information, we will, unless we are required to keep it.",
    ],
  },
  {
    h: "Your choices",
    p: [
      "You can ask us what information we hold about you, ask us to correct it, ask us to delete it, or withdraw a consent you have given. Email info@megability.ca and we will respond within a reasonable time.",
    ],
  },
  {
    h: "Changes",
    p: [
      "If we change this policy we will update the date at the top of this page. Material changes will be described here rather than made quietly.",
    ],
  },
];

const TERMS: Block[] = [
  {
    h: "These terms",
    p: [
      "These terms apply to your use of megability.ca. By using the site you accept them. Services we deliver under a separate written agreement — a website build, or a Sunny subscription — are governed by that agreement, which takes precedence over anything here.",
    ],
  },
  {
    h: "What Megability provides",
    p: [
      "We build websites for pediatric and developmental clinics, and we provide Sunny, an AI parent navigator that answers a clinic's website chat and phone line. Pricing shown on this site is indicative and excludes applicable taxes; the figures that bind us are the ones in your written quote or agreement.",
    ],
  },
  {
    h: "Sunny is not a clinician",
    p: [
      "This matters more than anything else on this page. Sunny provides general guidance and helps families find publicly available Ontario programs and services. Sunny does not:",
    ],
    ul: [
      "diagnose or screen for any condition",
      "provide medical, clinical or therapeutic advice",
      "decide whether a family qualifies for a funding program",
      "complete applications on a family's behalf",
      "replace a qualified professional's judgement",
    ],
  },
  {
    p: [
      "Program rules, wait times and eligibility criteria change. Always confirm details with the relevant program or a qualified professional before relying on them. In an emergency, call 911.",
    ],
  },
  {
    h: "Example content on this site",
    p: [
      "Conversations shown on this website are illustrative examples of how Sunny responds. They are not transcripts of real families' conversations. The clinic websites shown in our template showcase are demonstration designs.",
    ],
  },
  {
    h: "Your clinic's responsibilities",
    p: [
      "If you use Sunny in your clinic, you remain the health information custodian for your patients under PHIPA and remain responsible for the clinical care you provide. You are responsible for the accuracy of the clinic information you ask us to configure Sunny with, and for reviewing it as your services change.",
    ],
  },
  {
    h: "Intellectual property",
    p: [
      "The Megability name, the Sunny character, and the content and design of this site belong to Megability. Work we deliver to you is licensed or assigned as set out in your agreement with us. Please don't copy the site's content or designs without asking.",
    ],
  },
  {
    h: "Limits",
    p: [
      "This website is provided as is. We work to keep Sunny accurate and available, but we do not warrant that the site or Sunny will be uninterrupted or error-free. To the extent the law allows, Megability is not liable for indirect or consequential loss arising from use of this website. Nothing here limits liability that cannot be limited by law.",
    ],
  },
  {
    h: "Governing law",
    p: [
      "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there.",
    ],
  },
  {
    h: "Contact",
    p: ["Questions about these terms: info@megability.ca."],
  },
];

function Sections({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <div key={i} className="lg-block">
          {b.h && <h2>{b.h}</h2>}
          {b.p?.map((t, j) => <p key={j}>{t}</p>)}
          {b.ul && (
            <ul className="lg-list">
              {b.ul.map((t, j) => <li key={j}>{t}</li>)}
            </ul>
          )}
        </div>
      ))}
    </>
  );
}

export default function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  useSeo(kind === "privacy" ? SEO.privacy : SEO.terms);
  const isPrivacy = kind === "privacy";

  return (
    <div className="legal-page">
      <header className="pr-nav">
        <div className="wrap">
          <Link to="/" className="brand" aria-label="Megability home">
            <Logo variant="colored" />
          </Link>
          <div className="pr-nav-right">
            <Link to="/" className="pr-navlink">Home</Link>
            <Link to="/demo" className="hero-book">Book a demo</Link>
          </div>
        </div>
      </header>

      <main className="wrap lg-wrap">
        <h1>{isPrivacy ? "Privacy Policy" : "Terms of Service"}</h1>
        <p className="lg-updated">Last updated {LAST_UPDATED}</p>

        <Sections blocks={isPrivacy ? PRIVACY : TERMS} />

        <p className="lg-cross">
          {isPrivacy ? (
            <>See also our <Link to="/terms">Terms of Service</Link>.</>
          ) : (
            <>See also our <Link to="/privacy">Privacy Policy</Link>.</>
          )}
        </p>
      </main>

      <Footer />
    </div>
  );
}

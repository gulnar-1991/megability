/**
 * Sunny's Ontario program knowledge — the single source of truth, rendered on
 * both the homepage and the pricing page so the two can't drift apart.
 *
 * The eligibility notes matter and are not marketing copy. SSAH and ACSD are
 * assessed on documented functional limitations rather than a named diagnosis,
 * which is why an ADHD family can qualify for those two but not for OAP or
 * DSO/Passport. Earlier copy on this site said ADHD qualified for none of the
 * five, which was wrong. Don't flatten these back into a generic list.
 */

export const PROGRAMS: { name: string; note: string }[] = [
  { name: "OAP — Ontario Autism Program", note: "Funding pathways, core services, and how families access them" },
  { name: "SSAH — Special Services at Home", note: "Not diagnosis-restricted — based on documented functional limitations" },
  { name: "ACSD — Assistance for Children with Severe Disabilities", note: "Also functional need, not a specific diagnosis" },
  { name: "DSO & Passport", note: "Adult developmental services and community participation funding" },
  { name: "ODSP — Ontario Disability Support Program", note: "Income and employment supports" },
  { name: "SmartStart", note: "Early intervention and developmental supports" },
  { name: "Waitlist supports", note: "What a family can do while waiting, including interim resources" },
  { name: "School & IEP navigation", note: "Understanding the school system and individual education plans" },
];

/** Compact list used in-page. `variant` only switches the surface colour. */
export function ProgramsGrid({ variant = "light" }: { variant?: "light" | "plain" }) {
  return (
    <ul className={`pg-grid pg-${variant}`}>
      {PROGRAMS.map((p, i) => (
        <li key={p.name} className={`pg-item reveal reveal-${Math.min(i + 1, 6)}`}>
          <strong>{p.name}</strong>
          <span>{p.note}</span>
        </li>
      ))}
    </ul>
  );
}

/** The two nuances that most often get answered wrongly elsewhere. */
export function ProgramNotes() {
  return (
    <div className="pg-notes">
      <div className="pg-note reveal">
        <strong>Nuanced ADHD guidance</strong>
        <p>
          ADHD alone doesn&rsquo;t qualify for OAP or DSO/Passport — but SSAH and ACSD
          can, with proper documentation of functional limitations. Sunny explains
          that difference instead of turning families away, and points them to
          CADDAC, ConnexOntario and AboutKidsHealth (SickKids) — never to private
          paid clinics found through ads.
        </p>
      </div>
      <div className="pg-note reveal reveal-1">
        <strong>ABA &amp; IBI, explained honestly</strong>
        <p>
          Sunny knows what Applied Behaviour Analysis and Intensive Behavioural
          Intervention are and how they&rsquo;re accessed through OAP funding — without
          ever claiming to deliver or supervise the therapy herself.
        </p>
      </div>
    </div>
  );
}

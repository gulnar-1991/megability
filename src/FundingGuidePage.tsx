import Logo from "./components/Logo";
import Footer from "./components/Footer";
import { Link } from "./router";
import { useSeo, SEO } from "./seo";
import { useScrollReveal } from "./useScrollReveal";

/**
 * Ontario funding reference, written for clinics to hand to families.
 *
 * Every heading that carries a real answer is phrased as the question a parent
 * actually types, with the answer immediately under it — that shape is what gets
 * extracted by search and model crawlers, and it also happens to be how a front
 * desk needs to read it.
 *
 * The waitlist figure is the one number here that decays. It is dated and sourced
 * inline for that reason — re-check it before the date drifts far.
 *
 * Deliberately no scroll-reveal on the sections. This is reference material a
 * clinic may hand to a family; it should never be able to render blank because
 * an entrance animation didn't fire. The marketing pages can afford that risk,
 * this one can't.
 */

const LAST_UPDATED = "25 August 2026";

const PROGRAM_TABLE: [string, string, string][] = [
  ["OAP", "Core clinical services funding", "Children under 18 with an ASD diagnosis"],
  ["SSAH", "Support workers, skill-building", "Families with documented functional need"],
  ["ACSD", "Monthly income-tested benefit", "Low-to-moderate-income families"],
  ["DSO / Passport", "Adult developmental services and community participation", "Ages 18+ with a developmental disability"],
  ["ODSP", "Income and employment supports", "Adults meeting the disability and financial tests"],
  ["SmartStart", "Early intervention and developmental supports", "Young children, no diagnosis required"],
  ["School / IEP", "Individual Education Plans and school supports", "School-age children, no diagnosis required"],
];

export default function FundingGuidePage() {
  useSeo(SEO.funding);
  useScrollReveal();

  return (
    <div className="legal-page funding-page">
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

      <main className="wrap lg-wrap fg-wrap">
        <h1>Ontario Pediatric Therapy Funding Guide: A Resource for Clinics</h1>
        <p className="lg-updated">Last updated {LAST_UPDATED}</p>

        <p className="fg-lede">
          Ontario&rsquo;s disability funding programs are administered separately, use
          different eligibility tests, and pay for different things. This guide
          explains how each one works so front-desk teams can answer confidently and
          families know what to apply for. It is general information, not eligibility
          advice.
        </p>

        <section className="fg-block">
          <h2>How does the Ontario Autism Program (OAP) funding process work?</h2>
          <p className="fg-answer">
            The Ontario Autism Program funds services for children under 18 with an
            autism diagnosis. Families register through AccessOAP, wait for a Core
            Clinical Services funding invitation, then choose their own providers.
            Funding amounts follow a needs assessment, and the wait between
            registration and invitation is currently measured in years, not months.
          </p>
          <ul className="fg-list">
            <li><strong>Core Program:</strong> Ontario Autism Program (OAP) Core Clinical Services.</li>
            <li><strong>Eligibility:</strong> Children and youth under age 18 with a formal ASD diagnosis, resident in Ontario.</li>
            <li><strong>The Path:</strong> Register with AccessOAP, complete a needs assessment, receive a Core Funding invitation, then select providers.</li>
            <li>
              <strong>The Constraint:</strong> As of 13 May 2026, <strong>71,263 children were waiting</strong> for a
              Core Funding Agreement out of 91,974 registered — roughly 22.5% were receiving core funding
              (<a href="https://www.cbc.ca/news/canada/toronto/autism-services-funding-ontario-9.7143531" target="_blank" rel="noopener noreferrer">CBC News</a>).
            </li>
            <li><strong>What Families Can Access Meanwhile:</strong> Interim one-time funding, Foundational Family Services, EarlyON, and Preschool Speech and Language do not require a Core invitation.</li>
            <li><strong>Clinic Delivery:</strong> Megability&rsquo;s Sunny answers intake and waitlist questions on the clinic&rsquo;s phone line and website chat, so families get current information without adding calls to the front desk.</li>
          </ul>

          <h3>What clinics get asked most</h3>
          <p>
            Three questions dominate: <em>how long is the wait</em>, <em>what can we do
            while waiting</em>, and <em>does my child qualify</em>. The first two have
            real answers a front desk can give today. The third is a program decision —
            no clinic, and no software, should predict an eligibility outcome for a
            family.
          </p>
        </section>

        <section className="fg-block">
          <h2>What is the difference between SSAH and ACSD funding in Ontario?</h2>
          <p className="fg-answer">
            Both support families raising a child with a disability, but they pay for
            different things. SSAH reimburses specific services such as respite or
            skill-building. ACSD provides a monthly income-tested benefit toward
            everyday extra costs. Eligibility for both rests on functional need, not a
            named diagnosis.
          </p>
          <ul className="fg-list">
            <li><strong>Special Services at Home (SSAH):</strong> Funding to help families hire support workers or access personal growth and development programs. Reimbursement-based, tied to agreed services.</li>
            <li><strong>Assistance for Children with Severe Disabilities (ACSD):</strong> Monthly financial support for low-to-moderate-income families toward the ongoing extra costs of raising a child with a severe disability. Income-tested.</li>
            <li><strong>The Shared Test:</strong> Both assess <strong>documented functional limitations</strong> — what the child can and cannot do day to day — rather than which diagnosis appears on a report.</li>
            <li><strong>The ADHD Nuance:</strong> ADHD alone does not qualify for OAP or DSO/Passport, which require an autism or developmental-disability diagnosis. <strong>SSAH and ACSD can still qualify</strong> where functional limitations are properly documented, so an ADHD family should not be told there is nothing available.</li>
            <li><strong>Where Families Get Turned Away Wrongly:</strong> The most common front-desk error is applying the OAP diagnosis rule to every program. SSAH and ACSD do not share it.</li>
          </ul>

          <h3>Choosing between them</h3>
          <p>
            They are not alternatives — a family may be eligible for both, and they are
            assessed separately. SSAH answers <em>&ldquo;we need help paying for support
            hours.&rdquo;</em> ACSD answers <em>&ldquo;the everyday cost of raising this
            child is higher than our income covers.&rdquo;</em>
          </p>
        </section>

        <section className="fg-block">
          <h2>Which Ontario programs should a clinic know about?</h2>
          <p className="fg-answer">
            Seven pathways cover most family questions: OAP, SSAH, ACSD, DSO and
            Passport, ODSP, SmartStart, and school-based IEP supports. Three of them
            require no diagnosis at all, which is the detail families are most often
            not told.
          </p>
          <div className="fg-table-wrap">
            <table className="fg-table">
              <thead>
                <tr><th scope="col">Program</th><th scope="col">What it covers</th><th scope="col">Who it is for</th></tr>
              </thead>
              <tbody>
                {PROGRAM_TABLE.map(([name, covers, who]) => (
                  <tr key={name}>
                    <td><strong>{name}</strong></td>
                    <td>{covers}</td>
                    <td>{who}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="fg-block">
          <h2>What does this mean for a clinic front desk?</h2>
          <p className="fg-answer">
            Families rarely ask about one program. They ask a situation — &ldquo;he&rsquo;s
            three and not diagnosed yet&rdquo; — and the answer depends on age, diagnosis
            status, income and documented need. The cost is not the individual question;
            it is answering the same eight variations every week.
          </p>
          <p>
            Megability&rsquo;s Sunny handles those conversations on a clinic&rsquo;s phone line
            and website chat in English and French. It explains how the programs differ,
            points to what a family can access today, and books appointments — without
            diagnosing, assessing eligibility, or making a funding decision.
          </p>
          <div className="fg-cta">
            <Link to="/demo" className="btn pr-cta pr-cta-primary">Book My Demo →</Link>
          </div>
        </section>

        <p className="fg-disclaimer">
          General information only. Program rules and figures change. Confirm
          eligibility and current numbers with the administering program before acting
          on anything here.
        </p>
      </main>

      <Footer />
    </div>
  );
}

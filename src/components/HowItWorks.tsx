import { useState } from "react";

/**
 * Tabbed process explainer.
 *
 * The old section only showed what happens on a parent's call, which answers
 * "what does it do" but not "what am I signing up for". A buyer's first
 * question is what setup costs them in time, so that's the default tab, with
 * the runtime flow and the ongoing work behind it.
 *
 * Structure follows the common SaaS pattern — tab row, then a panel of numbered
 * steps carrying a stage label, a title and one line of detail. Everything
 * visual here is Megability's own tokens.
 */

type Step = { stage: string; title: string; body: string };
type Track = { id: string; tab: string; label: string; title: string; blurb: string; steps: Step[] };

const TRACKS: Track[] = [
  {
    id: "setup",
    tab: "Getting set up",
    label: "Onboarding",
    title: "Live in weeks, without a project on your plate",
    blurb:
      "Setting Sunny up is our work, not yours. Your team's only real job is telling us how your clinic actually runs, then checking we got it right.",
    steps: [
      {
        stage: "Discovery",
        title: "One 15-minute call",
        body: "We learn your services, your booking system, and the questions your front desk answers over and over.",
      },
      {
        stage: "Build",
        title: "We configure Sunny for you",
        body: "Your services, your region's programs and your tone of voice — set up on our side, with nothing for your staff to install.",
      },
      {
        stage: "Review",
        title: "You hear her before anyone else",
        body: "Test real calls and chats, tell us what sounds wrong, and we adjust until she represents your clinic properly.",
      },
      {
        stage: "Go live",
        title: "She picks up your line",
        body: "We connect your phone line and website chat. Your first month of service is free, so you see real calls before paying monthly.",
      },
    ],
  },
  {
    id: "calls",
    tab: "Every call after that",
    label: "Day to day",
    title: "From a worried parent to a booked appointment",
    blurb:
      "What happens every time the phone rings or the chat opens — at 2pm on a Tuesday or 11pm on a Sunday.",
    steps: [
      {
        stage: "Inquiry",
        title: "A parent asks a question",
        body: "By chat or phone, any hour of the day or night — including the hours your team isn't there.",
      },
      {
        stage: "Conversation",
        title: "Sunny listens and responds",
        body: "Warm, plain answers. She asks what she needs to know before naming any program.",
      },
      {
        stage: "Navigation",
        title: "She points to the right path",
        body: "Matched to the child's age and situation, across all eight Ontario pathways she knows.",
      },
      {
        stage: "Booking",
        title: "She books the slot",
        body: "The family picks a time that works, straight into the calendar you already use. No phone tag.",
      },
      {
        stage: "Handover",
        title: "Your team gets a qualified lead",
        body: "Details land where your team already works, with the context already gathered.",
      },
    ],
  },
  {
    id: "ongoing",
    tab: "Keeping her accurate",
    label: "Every month",
    title: "The part that doesn't stop at launch",
    blurb:
      "Ontario program rules change and your services change with them. Keeping Sunny current is included in the monthly fee, not an add-on.",
    steps: [
      {
        stage: "Review",
        title: "We read the real conversations",
        body: "Where families got stuck, what got asked that she couldn't answer well, what your team had to pick up.",
      },
      {
        stage: "Updates",
        title: "Program knowledge kept current",
        body: "When OAP, SSAH or Passport rules shift, her answers shift with them — before a family gets told something out of date.",
      },
      {
        stage: "Improvements",
        title: "Answers refined",
        body: "New questions added, wording adjusted, and anything your clinic changed reflected in what she says.",
      },
      {
        stage: "Visibility",
        title: "You see what families ask",
        body: "The patterns in what parents want to know — useful well beyond the phone line.",
      },
    ],
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const track = TRACKS[active];

  return (
    <section className="block hiw" id="journey">
      <div className="wrap">
        <span className="eyebrow reveal">How it works</span>
        <h2 className="reveal reveal-1">See exactly what you&rsquo;re signing up for</h2>
        <p className="intro hiw-intro reveal reveal-2">
          Pick a stage below — from first call to the work that keeps her accurate
          months later.
        </p>

        <div className="hiw-tabs reveal reveal-3" role="tablist" aria-label="How it works">
          {TRACKS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`hiw-tab-${t.id}`}
              aria-selected={i === active}
              aria-controls={`hiw-panel-${t.id}`}
              className={`hiw-tab${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              {t.tab}
            </button>
          ))}
        </div>

        {/* key remounts the panel so the fade replays when the tab changes */}
        <div
          key={track.id}
          className="hiw-panel"
          id={`hiw-panel-${track.id}`}
          role="tabpanel"
          aria-labelledby={`hiw-tab-${track.id}`}
        >
          <div className="hiw-panel-head">
            <span className="hiw-panel-label">{track.label}</span>
            <h3>{track.title}</h3>
            <p>{track.blurb}</p>
          </div>

          <ol className="hiw-steps">
            {track.steps.map((s, i) => (
              <li key={s.title} className="hiw-step" style={{ ["--i" as string]: i }}>
                <span className="hiw-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="hiw-body">
                  <span className="hiw-stage">{s.stage}</span>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

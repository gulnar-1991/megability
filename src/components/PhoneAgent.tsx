import { useEffect, useRef, useState } from "react";

type Line = { from: "sunny" | "parent"; text: string; sms?: string };
type Sample = { id: string; label: string; lines: Line[] };

// Sample after-hours calls. Sunny stays warm, never diagnoses, and "books" by
// texting links to the caller's phone. Spelled-out acronyms (A.D.H.D., I.E.P.)
// read more naturally through browser speech synthesis.
const SAMPLES: Sample[] = [
  {
    id: "welcome",
    label: "Warm welcome & booking",
    lines: [
      { from: "parent", text: "Hi, I'm honestly not sure where to start. My son was just referred to your clinic." },
      { from: "sunny", text: "You're in exactly the right place, and welcome. I can help you book a first visit and point you to a few programs while you wait. Would you like me to text the booking link to your phone right now?" },
      { from: "parent", text: "Yes please, that would be great." },
      { from: "sunny", text: "Done — I've just sent a link to your phone. Pick any time that works and you're all set. Is there anything else I can help with today?", sms: "Your booking link: book.megability.ca — pick any time" },
    ],
  },
  {
    id: "adhd",
    label: "A.D.H.D. support",
    lines: [
      { from: "parent", text: "My daughter was just diagnosed with A.D.H.D. What support is out there for us?" },
      { from: "sunny", text: "Great question. In Ontario there are school supports like an I.E.P., plus community programs and funding you might qualify for. I won't diagnose anything, but I can text you a short guide and the right local contacts. Shall I send those over?" },
      { from: "parent", text: "That would be amazing, thank you." },
      { from: "sunny", text: "Sent to your phone. And if you'd like, I can book a quick call with the clinic so we can walk through it together.", sms: "A.D.H.D. starter guide + local contacts sent to your phone" },
    ],
  },
  {
    id: "local",
    label: "Local programs",
    lines: [
      { from: "parent", text: "We just moved to Hamilton. Are there local programs for special-needs kids?" },
      { from: "sunny", text: "Welcome to Hamilton! Locally, Contact Hamilton is a wonderful first door, and there's provincial funding like Passport and Special Services at Home. I'll text you the links and numbers so they're handy. Would you like me to book an intro call too?" },
      { from: "parent", text: "Yes, let's do that." },
      { from: "sunny", text: "Perfect — the booking link is on its way to your phone now.", sms: "Local programs + booking link sent to your phone" },
    ],
  },
  {
    id: "downsyndrome",
    label: "Down syndrome",
    lines: [
      { from: "parent", text: "My baby has Down syndrome. I feel a little overwhelmed about what comes next." },
      { from: "sunny", text: "That's completely understandable, and you don't have to figure it all out alone. Early intervention, speech and occupational therapy, and family support programs can all help. I'll send a gentle starter guide to your phone, and I can set up a visit whenever you're ready." },
      { from: "parent", text: "Thank you, that really helps." },
      { from: "sunny", text: "Anytime. I've texted you the link — book whenever it feels right for you.", sms: "Down syndrome family guide + booking link sent" },
    ],
  },
];

export default function PhoneAgent() {
  const [activeId, setActiveId] = useState(SAMPLES[0].id);
  const [playing, setPlaying] = useState(false);
  const [lineIdx, setLineIdx] = useState(-1);
  const [showSms, setShowSms] = useState(false);
  const playingRef = useRef(false);
  const sunnyVoice = useRef<SpeechSynthesisVoice | null>(null);
  const parentVoice = useRef<SpeechSynthesisVoice | null>(null);

  const active = SAMPLES.find((s) => s.id === activeId) ?? SAMPLES[0];

  // Pick the warmest available English voices once they load.
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const pick = () => {
      const vs = synth.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
      if (!vs.length) return;
      const find = (names: string[]) => vs.find((v) => names.some((n) => v.name.toLowerCase().includes(n)));
      sunnyVoice.current = find(["samantha", "aria", "jenny", "sonia", "zira", "google us english", "female"]) || vs[0];
      parentVoice.current = find(["david", "mark", "daniel", "ryan", "google uk english male"]) || vs.find((v) => v !== sunnyVoice.current) || vs[0];
    };
    pick();
    synth.onvoiceschanged = pick;
    return () => { synth.onvoiceschanged = null; };
  }, []);

  // Stop any speech when the component unmounts (e.g. navigating away).
  useEffect(() => () => { playingRef.current = false; window.speechSynthesis?.cancel(); }, []);

  const stop = () => {
    playingRef.current = false;
    window.speechSynthesis?.cancel();
    setPlaying(false);
  };

  const playSample = (sample: Sample, fromLine = 0) => {
    window.speechSynthesis?.cancel();
    setActiveId(sample.id);
    setShowSms(false);
    setPlaying(true);
    playingRef.current = true;
    let i = fromLine;

    const step = () => {
      if (!playingRef.current) return;
      if (i >= sample.lines.length) { playingRef.current = false; setPlaying(false); return; }
      const line = sample.lines[i];
      setLineIdx(i);
      if (line.sms) setShowSms(true);

      let advanced = false;
      const advance = () => {
        if (advanced || !playingRef.current) return;
        advanced = true;
        i += 1;
        window.setTimeout(step, 330);
      };

      const synth = window.speechSynthesis;
      if (synth) {
        const u = new SpeechSynthesisUtterance(line.text);
        const v = line.from === "sunny" ? sunnyVoice.current : parentVoice.current;
        if (v) u.voice = v;
        u.rate = 1;
        u.pitch = line.from === "sunny" ? 1.08 : 0.95;
        u.onend = advance;
        u.onerror = advance;
        synth.speak(u);
        // Safety net in case onend never fires (some browsers).
        window.setTimeout(advance, Math.max(3500, line.text.length * 75));
      } else {
        window.setTimeout(advance, Math.max(2600, line.text.length * 55));
      }
    };
    step();
  };

  const onSampleClick = (s: Sample) => {
    if (playing && s.id === activeId) stop();
    else playSample(s);
  };

  const onPhoneToggle = () => {
    if (playing) stop();
    else playSample(active, lineIdx >= 0 && lineIdx < active.lines.length - 1 ? lineIdx : 0);
  };

  const caption = lineIdx >= 0 ? active.lines[lineIdx] : null;
  const smsLines = active.lines.filter((l) => l.sms);

  return (
    <section className="block phone-s" id="phone">
      <div className="wrap">
        <div className="ph-split">
          <div className="ph-text anim">
            <span className="eyebrow" style={{ textAlign: "left" }}>Chat &amp; phone</span>
            <h2>Sunny answers<br/>the phone, too</h2>
            <p className="ph-lead">When a parent calls after hours, Sunny picks up — warm and patient — answers in plain language, then texts the links straight to their phone so nothing gets lost.</p>
            <div className="ph-samples">
              <span className="ph-samples-label">Hear a sample call</span>
              {SAMPLES.map((s) => {
                const isOn = s.id === activeId && playing;
                return (
                  <button key={s.id} className={`ph-sample${s.id === activeId ? " active" : ""}`} onClick={() => onSampleClick(s)}>
                    <span className="ph-sample-ic">{isOn ? "❚❚" : "▶"}</span>
                    {s.label}
                  </button>
                );
              })}
            </div>
            <p className="ph-note">Plays in your browser. Sunny never diagnoses — she guides families and books visits.</p>
          </div>

          <div className="ph-stage">
            <img className="ph-sunny anim" src="/assets/mascot/sunny-turning.webp" alt="Sunny on a call" draggable={false} />
            <div className="ph-phone anim anim-d2">
              <div className="ph-notch" />
              <div className="ph-call">
                <div className="ph-live">{playing ? "● On call" : "● Demo call"}</div>
                <div className="ph-callee">
                  <img src="/assets/mascot/mascot_still.png" alt="Sunny" />
                  <strong>Sunny</strong>
                  <span>{playing ? `Talking · ${active.label}` : "After-hours line"}</span>
                </div>
                <button className={`ph-play${playing ? " playing" : ""}`} onClick={onPhoneToggle} aria-label={playing ? "Pause sample" : "Play sample"}>
                  {playing ? (
                    <span className="ph-wave">{[...Array(9)].map((_, i) => <span key={i} style={{ animationDelay: `${i * 0.09}s` }} />)}</span>
                  ) : (
                    <span className="ph-play-ic">▶</span>
                  )}
                </button>
                <p className="ph-caption">
                  {caption ? (
                    <><b className={caption.from === "sunny" ? "cap-sunny" : "cap-parent"}>{caption.from === "sunny" ? "Sunny" : "Parent"}:</b> {caption.text}</>
                  ) : (
                    "Press play, or pick a topic, to hear Sunny take a call."
                  )}
                </p>
              </div>
              {showSms && (
                <div className="ph-sms">
                  {smsLines.map((l, idx) => <div key={idx} className="ph-sms-bubble">{l.sms}</div>)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

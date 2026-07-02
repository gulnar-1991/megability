import { useEffect, useRef, useState } from "react";

type Sample = {
  id: string;
  label: string;
  file: string;
  description: string;
  sms?: string;
};

// Real recorded sample calls (Sunny's actual voice), extracted to lightweight
// mono MP3s from the user's source videos in
// ".../megability website inspiration/phone agent/". Mapped 1:1 by filename:
//   Warm Welcoming.mp4                -> warm-welcome.mp3
//   Booking Link Send.mp4             -> booking-link.mp3
//   Estimate waitlist for OAP...      -> oap-waitlist.mp3
//   Local Support Options.mp4         -> local-support.mp3
//   Down Syndrome Guiding.mp4         -> down-syndrome.mp3
const SAMPLES: Sample[] = [
  {
    id: "welcome",
    label: "Warm welcome & booking",
    file: "/assets/voice/warm-welcome.mp3",
    description: "Sunny greets a new parent, answers their first questions, and offers to text over the booking link.",
    sms: "Your booking link sent to your phone",
  },
  {
    id: "booking",
    label: "Sending the booking link",
    file: "/assets/voice/booking-link.mp3",
    description: "Sunny confirms the details and sends the booking link straight to the parent's phone.",
    sms: "Booking link sent to your phone",
  },
  {
    id: "oap",
    label: "OAP waitlist & programs",
    file: "/assets/voice/oap-waitlist.mp3",
    description: "Sunny estimates the OAP waitlist and guides the family to the right program for their child's age.",
    sms: "OAP program info + links sent to your phone",
  },
  {
    id: "local",
    label: "Local support options",
    file: "/assets/voice/local-support.mp3",
    description: "Sunny shares local support programs and services available in the family's area.",
    sms: "Local program links sent to your phone",
  },
  {
    id: "downsyndrome",
    label: "Down syndrome guidance",
    file: "/assets/voice/down-syndrome.mp3",
    description: "Sunny gently guides a parent through next steps and family support options.",
    sms: "Family guide + booking link sent to your phone",
  },
];

function formatTime(sec: number) {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PhoneAgent() {
  const [activeId, setActiveId] = useState(SAMPLES[0].id);
  const [playing, setPlaying] = useState(false);
  const [showSms, setShowSms] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const active = SAMPLES.find((s) => s.id === activeId) ?? SAMPLES[0];

  // Create a single reusable <audio> element for the whole player.
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const onTime = () => setElapsed(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnd = () => { setPlaying(false); setShowSms(true); };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const stop = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const playSample = (sample: Sample) => {
    const audio = audioRef.current;
    if (!audio) return;
    setShowSms(false);
    setElapsed(0);
    setDuration(0);
    if (activeId !== sample.id || audio.src.indexOf(sample.file) === -1) {
      audio.src = sample.file;
      setActiveId(sample.id);
    } else {
      audio.currentTime = 0;
    }
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const onSampleClick = (s: Sample) => {
    if (playing && s.id === activeId) stop();
    else playSample(s);
  };

  const onPhoneToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { stop(); return; }
    if (audio.src && audio.src.indexOf(active.file) !== -1 && audio.currentTime > 0 && !audio.ended) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      playSample(active);
    }
  };

  const progressPct = duration > 0 ? Math.min(100, (elapsed / duration) * 100) : 0;

  return (
    <section className="block phone-s" id="phone">
      <div className="wrap">
        <div className="ph-split">
          <div className="ph-text anim">
            <span className="eyebrow" style={{ textAlign: "left" }}>Chat &amp; phone</span>
            <h2>Sunny answers<br/>the phone, too</h2>
            <p className="ph-lead">When a parent calls after hours, Sunny picks up — warm and patient — answers in plain language, then texts the links straight to their phone so nothing gets lost.</p>
            <div className="ph-samples">
              <span className="ph-samples-label">Hear a real sample call</span>
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
            <p className="ph-note">Real recordings of Sunny's voice. She never diagnoses — she guides families and books visits.</p>
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
                {(playing || elapsed > 0) && (
                  <div className="ph-progress"><i style={{ width: `${progressPct}%` }} /></div>
                )}
                <p className="ph-caption">
                  {active.description}
                  {duration > 0 && <span className="ph-time"> {formatTime(elapsed)} / {formatTime(duration)}</span>}
                </p>
              </div>
              {showSms && active.sms && (
                <div className="ph-sms">
                  <div className="ph-sms-bubble">{active.sms}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

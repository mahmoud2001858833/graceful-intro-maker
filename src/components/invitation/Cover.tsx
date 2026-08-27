import { useEffect, useRef } from "react";
import monogram from "@/assets/monogram.png.asset.json";
import { Curtains } from "./Curtains";
import { Chandelier } from "./Chandelier";
import { SoundToggle } from "./SoundToggle";
import { enableSound, isSoundOn, playIntro, playTransition } from "@/lib/invitation-audio";

const INTRO_MS = 3200;
const AUTO_SCROLL_DELAY_MS = 5000;

export function Cover({ onGoToInvite }: { onGoToInvite: () => void }) {
  const cancelled = useRef(false);
  const introPlayed = useRef(false);

  // Browsers block audio before a gesture: try right away, otherwise start on
  // the visitor's first tap/scroll so the music still accompanies the intro.
  useEffect(() => {
    let done = false;
    const start = async () => {
      if (done) return;
      const ok = await enableSound();
      if (ok) {
        done = true;
        if (!introPlayed.current) {
          introPlayed.current = true;
          playIntro();
        }
      }
    };
    void start();
    const onGesture = (e: Event) => {
      // the toggle button manages sound itself
      if (e.target instanceof Element && e.target.closest(".sound-toggle")) return;
      void start();
    };
    window.addEventListener("pointerdown", onGesture, { passive: true });
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("keydown", onGesture);
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, []);

  useEffect(() => {
    const cancel = () => {
      cancelled.current = true;
    };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchmove", cancel, { passive: true });
    window.addEventListener("keydown", cancel);

    const timer = window.setTimeout(() => {
      if (!cancelled.current && window.scrollY < 40) {
        if (isSoundOn()) playTransition();
        onGoToInvite();
      }
    }, INTRO_MS + AUTO_SCROLL_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchmove", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, [onGoToInvite]);

  const goNow = () => {
    if (isSoundOn()) playTransition();
    onGoToInvite();
  };

  return (
    <section className="cover">
      <div className="cover-grain" aria-hidden="true" />
      <div className="cover-glow" aria-hidden="true" />
      <Curtains />
      <Chandelier />
      <SoundToggle />

      <div className="mono-wrap">
        <span className="mono-halo" aria-hidden="true" />
        <img className="mono-img" src={monogram.url} alt="حرفا محمد وفرح متشابكان بخط عربي مرصّع" />
      </div>

      <div className="cover-rule" aria-hidden="true">
        <span />
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l1.9 8.1L22 12l-8.1 1.9L12 22l-1.9-8.1L2 12l8.1-1.9z" fill="currentColor" />
        </svg>
        <span />
      </div>

      <div className="cover-couple" dir="ltr">FARAH &nbsp;|&nbsp; MOHAMMAD</div>
      <div className="cover-date" dir="ltr">4 . 9 . 2026</div>
      <div className="cover-bismillah">بسم الله الرحمن الرحيم</div>

      <button className="scroll-hint" onClick={goNow}>
        <span>مرّر للأسفل</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </section>
  );
}

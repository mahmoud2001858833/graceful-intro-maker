import { useEffect, useRef } from "react";
import monogram from "@/assets/monogram.png.asset.json";
import { Curtains } from "./Curtains";
import { Chandelier } from "./Chandelier";

const INTRO_MS = 3200;
const AUTO_SCROLL_DELAY_MS = 2000;

export function Cover({ onGoToInvite }: { onGoToInvite: () => void }) {
  const cancelled = useRef(false);

  useEffect(() => {
    const cancel = () => {
      cancelled.current = true;
    };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchmove", cancel, { passive: true });
    window.addEventListener("keydown", cancel);

    const timer = window.setTimeout(() => {
      if (!cancelled.current && window.scrollY < 40) {
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

  return (
    <section className="cover">
      <div className="cover-grain" aria-hidden="true" />
      <div className="cover-glow" aria-hidden="true" />
      <Curtains />
      <Chandelier />

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

      <button className="scroll-hint" onClick={onGoToInvite}>
        <span>مرّر للأسفل</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </section>
  );
}

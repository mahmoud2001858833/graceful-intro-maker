import { useEffect, useRef } from "react";
import monogram from "@/assets/monogram.png.asset.json";
import { Curtains } from "./Curtains";
import { Chandelier } from "./Chandelier";

const INTRO_MS = 3200;
const AUTO_SCROLL_DELAY_MS = 5000;

export function Cover({ onGoToInvite }: { onGoToInvite: () => void }) {
  const cancelled = useRef(false);

  useEffect(() => {
    const cancel = () => {
      cancelled.current = true;
    };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);

    const timer = window.setTimeout(() => {
      if (!cancelled.current && window.scrollY < 40) onGoToInvite();
    }, INTRO_MS + AUTO_SCROLL_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, [onGoToInvite]);

  return (
    <section className="cover">
      <div className="cover-grain" aria-hidden="true" />
      <Curtains />
      <Chandelier />

      <img className="mono-img" src={monogram.url} alt="حرفا محمد وفرح متشابكان بخط عربي مرصّع" />

      <div className="cover-couple">FARAH &nbsp;|&nbsp; MOHAMMAD</div>
      <div className="cover-date">4 . 9 . 2026</div>
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

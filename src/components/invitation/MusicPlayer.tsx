import { useEffect, useRef, useState } from "react";
import track from "@/assets/promise-of-union.mp3.asset.json";

const TARGET_VOLUME = 0.45;
const FADE_MS = 2200;

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const fadeTo = (to: number, done?: () => void) => {
    const el = audioRef.current;
    if (!el) return;
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    const from = el.volume;
    const start = performance.now();
    fadeRef.current = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / FADE_MS);
      el.volume = Math.max(0, Math.min(1, from + (to - from) * t));
      if (t >= 1) {
        if (fadeRef.current) window.clearInterval(fadeRef.current);
        fadeRef.current = null;
        done?.();
      }
    }, 40);
  };

  const start = () => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0;
    el.play()
      .then(() => {
        setPlaying(true);
        fadeTo(TARGET_VOLUME);
      })
      .catch(() => setPlaying(false));
  };

  // Try autoplay, otherwise start on the visitor's first interaction.
  useEffect(() => {
    setReady(true);
    const el = audioRef.current;
    if (!el) return;
    let done = false;
    const kick = () => {
      if (done) return;
      done = true;
      start();
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
      window.removeEventListener("touchstart", kick);
      window.removeEventListener("wheel", kick);
    };
    el.volume = 0;
    el.play()
      .then(() => {
        done = true;
        setPlaying(true);
        fadeTo(TARGET_VOLUME);
        cleanup();
      })
      .catch(() => {
        window.addEventListener("pointerdown", kick);
        window.addEventListener("keydown", kick);
        window.addEventListener("touchstart", kick, { passive: true });
        window.addEventListener("wheel", kick, { passive: true });
      });
    return () => {
      cleanup();
      if (fadeRef.current) window.clearInterval(fadeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      fadeTo(0, () => {
        el.pause();
      });
      setPlaying(false);
    } else {
      start();
    }
  };

  return (
    <>
      <audio ref={audioRef} src={track.url} loop preload="auto" />
      <button
        type="button"
        className={`music-toggle${playing ? " is-playing" : ""}${ready ? " is-ready" : ""}`}
        onClick={toggle}
        aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
        title={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      >
        <span className="music-ring" aria-hidden="true" />
        <span className="music-bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </button>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import track from "@/assets/promise-of-union.mp3.asset.json";

const TARGET_VOLUME = 0.55;

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const start = () => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.muted = false;
    el.volume = TARGET_VOLUME;
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  // Browsers block unmuted audio autoplay until the visitor interacts.
  // Start the track muted immediately (allowed), then unmute on the first
  // gesture so sound begins with near-zero delay.
  useEffect(() => {
    setReady(true);
    const el = audioRef.current;
    if (!el) return;
    let unmuted = false;
    const unmute = () => {
      if (unmuted) return;
      unmuted = true;
      el.muted = false;
      el.volume = TARGET_VOLUME;
      setPlaying(true);
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", unmute);
      window.removeEventListener("keydown", unmute);
      window.removeEventListener("touchstart", unmute);
      window.removeEventListener("wheel", unmute);
    };
    el.muted = true;
    el.volume = 0;
    el.currentTime = 0;
    // First try unmuted autoplay (works if the browser allows it).
    el.play()
      .then(() => {
        unmuted = true;
        el.muted = false;
        el.volume = TARGET_VOLUME;
        setPlaying(true);
        cleanup();
      })
      .catch(() => {
        // Unmuted autoplay blocked: fall back to muted autoplay so the
        // track is already rolling, and unmute on first interaction.
        el.muted = true;
        el.play()
          .then(() => {
            setPlaying(true);
            window.addEventListener("pointerdown", unmute);
            window.addEventListener("keydown", unmute);
            window.addEventListener("touchstart", unmute, { passive: true });
            window.addEventListener("wheel", unmute, { passive: true });
          })
          .catch(() => setPlaying(false));
      });
    return () => {
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
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

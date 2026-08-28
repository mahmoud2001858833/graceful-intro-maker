import { useEffect, useRef, useState } from "react";

const TRACK_URL = "/promise-of-union.mp3";
const TARGET_VOLUME = 0.55;

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const start = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = false;
    el.volume = TARGET_VOLUME;
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  // Browsers block unmuted autoplay until the visitor interacts.
  // 1) Try unmuted autoplay immediately (works on some browsers).
  // 2) Regardless of the result, hook every common gesture so the very
  //    first touch / tap / scroll / keypress starts the sound.
  useEffect(() => {
    setReady(true);
    const el = audioRef.current;
    if (!el) return;

    let started = false;

    const cleanup = () => {
      window.removeEventListener("pointerdown", onGesture, true);
      window.removeEventListener("touchend", onGesture, true);
      window.removeEventListener("click", onGesture, true);
      window.removeEventListener("keydown", onGesture, true);
      window.removeEventListener("wheel", onGesture, true);
      window.removeEventListener("touchmove", onGesture, true);
      window.removeEventListener("scroll", onGesture, true);
    };

    const playWithSound = () => {
      el.muted = false;
      el.volume = TARGET_VOLUME;
      return el.play();
    };

    const onGesture = () => {
      if (started) return;
      playWithSound()
        .then(() => {
          started = true;
          setPlaying(true);
          cleanup();
        })
        .catch(() => {
          // Gesture not accepted yet; keep listening for the next one.
        });
    };

    // Immediate unmuted autoplay attempt.
    playWithSound()
      .then(() => {
        started = true;
        setPlaying(true);
      })
      .catch(() => {
        // Autoplay blocked — arm the gesture listeners.
        window.addEventListener("pointerdown", onGesture, true);
        window.addEventListener("touchend", onGesture, true);
        window.addEventListener("click", onGesture, true);
        window.addEventListener("keydown", onGesture, true);
        window.addEventListener("wheel", onGesture, true);
        window.addEventListener("touchmove", onGesture, true);
        window.addEventListener("scroll", onGesture, true);
      });

    return () => cleanup();
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
      <audio ref={audioRef} src={TRACK_URL} loop preload="auto" playsInline />
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

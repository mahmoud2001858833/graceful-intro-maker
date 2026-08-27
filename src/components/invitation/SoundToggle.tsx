import { useEffect, useState } from "react";
import { subscribeSound, toggleSound } from "@/lib/invitation-audio";

export function SoundToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const off = subscribeSound(setOn);
    return () => {
      off();
    };
  }, []);

  return (
    <button
      className="sound-toggle"
      onClick={() => void toggleSound()}
      aria-pressed={on}
      aria-label={on ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      title={on ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 14v-4h3l4-3v10l-4-3H4z" strokeLinecap="round" strokeLinejoin="round" />
        {on ? (
          <>
            <path d="M15.5 9.2a4 4 0 0 1 0 5.6" strokeLinecap="round" />
            <path d="M18 7a7 7 0 0 1 0 10" strokeLinecap="round" />
          </>
        ) : (
          <path d="M16 9.5l4 5M20 9.5l-4 5" strokeLinecap="round" />
        )}
      </svg>
      <span>{on ? "الموسيقى" : "تشغيل الصوت"}</span>
    </button>
  );
}

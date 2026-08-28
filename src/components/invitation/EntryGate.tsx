export function EntryGate({ onEnter }: { onEnter: () => void }) {
  const open = () => {
    window.dispatchEvent(new Event("invitation:enter"));
    onEnter();
  };

  return (
    <div className="entry-gate" role="dialog" aria-label="بوابة الدخول إلى الدعوة">
      <div className="entry-grain" aria-hidden="true" />
      <div className="entry-glow" aria-hidden="true" />

      <div className="entry-frame" aria-hidden="true">
        <span className="ef-corner ef-tl" />
        <span className="ef-corner ef-tr" />
        <span className="ef-corner ef-bl" />
        <span className="ef-corner ef-br" />
      </div>

      <div className="entry-content">
        <img
          className="entry-mono"
          src="/monogram.png"
          alt="حرفا محمد وفرح متشابكان بخط عربي مرصّع"
        />

        <div className="entry-couple" dir="ltr">
          FARAH &nbsp;|&nbsp; MOHAMMAD
        </div>
        <div className="entry-date" dir="ltr">
          4 . 9 . 2026
        </div>

        <button type="button" className="entry-btn" onClick={open}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          افتحوا الدعوة
        </button>
        <div className="entry-hint">اضغطوا لفتح الدعوة مع الموسيقى</div>
      </div>
    </div>
  );
}

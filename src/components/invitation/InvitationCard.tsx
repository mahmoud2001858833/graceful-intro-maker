import { Countdown } from "./Countdown";
import { useReveal } from "@/hooks/use-reveal";

function Divider() {
  return (
    <div className="divider" data-reveal>
      <span className="line" />
      <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
        <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" />
      </svg>
      <span className="line rev" />
    </div>
  );
}

export function InvitationCard({ showDinner = false }: { showDinner?: boolean }) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div className="content-wrap" ref={ref}>
      <section id="main-invite" className="frame">
        <span className="c1" />
        <span className="c2" />
        <span className="c3" />
        <span className="c4" />
        <span className="corner-dot cd1" />
        <span className="corner-dot cd2" />
        <span className="corner-dot cd3" />
        <span className="corner-dot cd4" />

        <div className="bismillah" data-reveal>
          بسم الله الرحمن الرحيم
        </div>

        <svg
          className="opening-ornament"
          viewBox="0 0 300 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          aria-hidden="true"
          data-reveal
        >
          <path d="M22 54 C 80 12, 220 12, 278 54" strokeLinecap="round" />
          <path d="M46 56 C 92 26, 208 26, 254 56" strokeLinecap="round" opacity=".5" />
          <circle cx="22" cy="54" r="2.2" fill="currentColor" stroke="none" />
          <circle cx="278" cy="54" r="2.2" fill="currentColor" stroke="none" />
          <circle cx="150" cy="16" r="3" fill="currentColor" stroke="none" />
        </svg>

        <div className="ayah-wrap" data-reveal>
          <span className="qmark">﴿</span>
          <span className="ayah">وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً</span>
          <span className="qmark">﴾</span>
        </div>

        <Divider />

        <div className="honor" data-reveal>
          يتشرف
        </div>
        <div className="fam-names" data-reveal>
          <span className="fam-title">السيد</span> عرفات عوض الزعبي<span className="amp-sm">و</span><span className="fam-title">المهندس</span> محمد عبدالله جوارنة
        </div>
        <div className="invite-line" data-reveal>
          بدعوتكم لحضور حفل زفاف
        </div>

        <div className="names" data-reveal>
          <div className="name-block">
            <div className="title">المهندس</div>
            <div className="name">محمد</div>
          </div>
          <div className="amp">و</div>
          <div className="name-block">
            <div className="title">د. صيدلانية</div>
            <div className="name">فرح</div>
          </div>
        </div>

        <svg
          className="mini-flourish"
          viewBox="0 0 140 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          aria-hidden="true"
          data-reveal
        >
          <path d="M4 12 C 30 -2, 45 26, 70 12 C 95 -2, 110 26, 136 12" />
        </svg>

        <Divider />

        <div className="date-box" data-reveal>
          <div className="date-day">الجمعة</div>
          <div className="date-num" dir="ltr">4 / 9 / 2026</div>
        </div>

        <div data-reveal>
          <Countdown />
        </div>

        <Divider />

        <div data-reveal>
          <div className="venue-name">حديقة تاج بارك للمناسبات</div>
          <div className="venue-cta">
            <a
              className="map-btn"
              href="https://maps.app.goo.gl/dSUuE2fwf2WoBmmf7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              عرض الموقع على الخريطة
            </a>
            <span className="notice">ممنوع اصطحاب الأطفال</span>
          </div>
        </div>

        {showDinner && (
          <>
            <Divider />
            <div data-reveal>
              <div className="dinner-invite">
                نتشرّف بدعوتكم لتناول العشاء بعد الحفل، وذلك في منزل والد العريس.
              </div>
              <div className="venue-cta">
                <a
                  className="map-btn"
                  href="https://maps.app.goo.gl/zge88EK2fN7UhKPK8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  عرض الموقع على الخريطة
                </a>
              </div>
            </div>
          </>
        )}

        <div className="footer" data-reveal>
          بحضوركم تكتمل فرحتنا
          <br />
          <span className="fam">عائلتا الزعبي والجوارنة</span>
        </div>
      </section>
    </div>
  );
}

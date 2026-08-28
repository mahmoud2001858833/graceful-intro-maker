const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Slow, elegant programmatic scroll to an element. */
export function smoothScrollToElement(id: string, duration = 2600) {
  const el = document.getElementById(id);
  if (!el) return;

  const start = window.scrollY;
  const target = start + el.getBoundingClientRect().top;
  const distance = target - start;
  if (Math.abs(distance) < 2) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: target });
    return;
  }

  let startTime: number | null = null;
  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo({ top: start + distance * easeInOutCubic(progress) });
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

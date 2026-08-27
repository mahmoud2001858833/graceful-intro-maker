/**
 * Lightweight WebAudio "music box" for the invitation.
 * No audio files: soft bell arpeggios + a warm pad, generated in the browser.
 */

type Ctx = AudioContext & { _inv?: InvNodes };

type InvNodes = {
  master: GainNode;
  wet: GainNode;
  padGain: GainNode;
  padStop?: () => void;
};

let ctx: Ctx | null = null;
let enabled = false;
const listeners = new Set<(on: boolean) => void>();

function notify() {
  listeners.forEach((l) => l(enabled));
}

export function subscribeSound(listener: (on: boolean) => void) {
  listeners.add(listener);
  listener(enabled);
  return () => listeners.delete(listener);
}

export function isSoundOn() {
  return enabled;
}

function nodes(): InvNodes | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC() as Ctx;
  }
  if (!ctx._inv) {
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);

    // simple feedback delay -> gives the bells a hall-like tail
    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.24;
    const fb = ctx.createGain();
    fb.gain.value = 0.34;
    const wet = ctx.createGain();
    wet.gain.value = 0.5;
    const damp = ctx.createBiquadFilter();
    damp.type = "lowpass";
    damp.frequency.value = 2600;
    wet.connect(delay);
    delay.connect(damp);
    damp.connect(fb);
    fb.connect(delay);
    damp.connect(master);

    const padGain = ctx.createGain();
    padGain.gain.value = 0;
    padGain.connect(master);

    ctx._inv = { master, wet, padGain };
  }
  return ctx._inv;
}

function bell(freq: number, at: number, dur = 2.4, vol = 0.16) {
  const n = nodes();
  if (!ctx || !n) return;
  const t = ctx.currentTime + at;

  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g.connect(n.master);
  g.connect(n.wet);

  // fundamental + shimmering partials = glass bell
  ([
    [1, 1],
    [2, 0.34],
    [3.01, 0.14],
    [4.2, 0.07],
  ] as [number, number][]).forEach(([mult, amp]) => {
    const osc = ctx!.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq * mult;
    const og = ctx!.createGain();
    og.gain.value = amp;
    osc.connect(og);
    og.connect(g);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  });
}

function startPad() {
  const n = nodes();
  if (!ctx || !n || n.padStop) return;
  const t = ctx.currentTime;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.Q.value = 0.6;
  filter.connect(n.padGain);

  const oscs = [174.61, 261.63, 349.23, 392].map((f, i) => {
    const osc = ctx!.createOscillator();
    osc.type = i === 0 ? "triangle" : "sine";
    osc.frequency.value = f;
    const g = ctx!.createGain();
    g.gain.value = i === 0 ? 0.5 : 0.22;
    // slow drift keeps the pad from sounding synthetic
    const lfo = ctx!.createOscillator();
    lfo.frequency.value = 0.07 + i * 0.031;
    const lfoGain = ctx!.createGain();
    lfoGain.gain.value = 1.2 + i * 0.4;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(g);
    g.connect(filter);
    osc.start(t);
    lfo.start(t);
    return [osc, lfo] as const;
  });

  n.padGain.gain.cancelScheduledValues(t);
  n.padGain.gain.setValueAtTime(0, t);
  n.padGain.gain.linearRampToValueAtTime(0.075, t + 4);

  n.padStop = () => {
    if (!ctx) return;
    const end = ctx.currentTime;
    n.padGain.gain.cancelScheduledValues(end);
    n.padGain.gain.setValueAtTime(n.padGain.gain.value, end);
    n.padGain.gain.linearRampToValueAtTime(0, end + 1.2);
    oscs.flat().forEach((o) => o.stop(end + 1.4));
    n.padStop = undefined;
  };
}

/** Fade the whole mix in/out. */
function fadeMaster(to: number, secs: number) {
  const n = nodes();
  if (!ctx || !n) return;
  const t = ctx.currentTime;
  n.master.gain.cancelScheduledValues(t);
  n.master.gain.setValueAtTime(Math.max(n.master.gain.value, 0.0001), t);
  n.master.gain.exponentialRampToValueAtTime(Math.max(to, 0.0001), t + secs);
}

/** Opening motif that rides along with the intro animation. */
export function playIntro() {
  if (!enabled) return;
  const scale = [523.25, 587.33, 698.46, 783.99, 1046.5, 1174.66];
  scale.forEach((f, i) => bell(f, 0.15 + i * 0.42, 3, 0.15 - i * 0.012));
  bell(261.63, 0.15, 5, 0.1);
  bell(392, 2.6, 4.5, 0.09);
  startPad();
}

/** Short shimmer used when the page moves to the invitation card. */
export function playTransition() {
  if (!enabled) return;
  [1046.5, 1318.51, 1567.98].forEach((f, i) => bell(f, i * 0.13, 2.6, 0.13));
  bell(329.63, 0, 4, 0.08);
}

export async function enableSound() {
  const n = nodes();
  if (!ctx || !n) return false;
  if (ctx.state === "suspended") await ctx.resume();
  enabled = true;
  fadeMaster(0.85, 1.2);
  notify();
  return true;
}

export function disableSound() {
  const n = nodes();
  enabled = false;
  notify();
  if (!n) return;
  fadeMaster(0.0001, 0.6);
  n.padStop?.();
}

export async function toggleSound() {
  if (enabled) {
    disableSound();
    return false;
  }
  const ok = await enableSound();
  if (ok) {
    playIntro();
  }
  return ok;
}

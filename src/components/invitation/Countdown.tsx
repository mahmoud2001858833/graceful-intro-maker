import { useEffect, useState } from "react";

const TARGET = new Date("2026-09-04T19:00:00+03:00").getTime();

function parts() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const [t, setT] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    setT(parts());
    const id = window.setInterval(() => setT(parts()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const items = [
    { label: "يوم", value: t ? String(t.days) : "--" },
    { label: "ساعة", value: t ? pad(t.hours) : "--" },
    { label: "دقيقة", value: t ? pad(t.mins) : "--" },
    { label: "ثانية", value: t ? pad(t.secs) : "--" },
  ];

  return (
    <div className="countdown">
      {items.map((i) => (
        <div className="cbox" key={i.label}>
          <div className="cnum">{i.value}</div>
          <div className="clabel">{i.label}</div>
        </div>
      ))}
    </div>
  );
}

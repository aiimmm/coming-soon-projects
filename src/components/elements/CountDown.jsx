"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/card";

const units = [
  { key: "days", label: "HARI" },
  { key: "hours", label: "JAM" },
  { key: "minutes", label: "MENIT" },
  { key: "seconds", label: "DETIK" },
];

function getTimeLeft(targetDate) {
  const difference = Math.max(0, new Date(targetDate).getTime() - Date.now());

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    expired: difference === 0,
  };
}

export default function CountDown({ targetDate }) {
  const [time, setTime] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const update = () => setTime(getTimeLeft(targetDate));

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (time.expired) {
    return (
      <div className="flex items-center justify-center gap-2 border border-primary/30 p-5 font-mono text-xs text-primary">
        <span className="size-2 animate-pulse rounded-full bg-primary" />
        TARGET REACHED // STAY TUNED
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {units.map(({ key, label }) => (
        <Card
          key={key}
          className="countdown-panel flex min-w-0 flex-col items-center justify-center gap-2 rounded-none border-primary/30 bg-primary/3 px-1 py-4 shadow-none sm:py-5"
        >
          <span className="font-mono text-2xl font-semibold tabular-nums text-primary sm:text-4xl">
            {String(time[key]).padStart(2, "0")}
          </span>

          <span className="text-[9px] tracking-[0.16em] text-muted-foreground sm:text-xs">
            {label}
          </span>
        </Card>
      ))}
    </div>
  );
}

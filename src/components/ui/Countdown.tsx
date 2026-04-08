import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

interface CountdownProps {
  targetDate: Date;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = differenceInSeconds(targetDate, now);

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (60 * 60 * 24)),
        hours: Math.floor((diff / (60 * 60)) % 24),
        minutes: Math.floor((diff / 60) % 60),
        seconds: Math.floor(diff % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 md:gap-8 justify-center">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl md:text-5xl font-display font-bold text-white glow-text-blue">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 font-medium">
        {label}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { formatTime } from '@/lib/utils';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  isRunning: boolean;
  onComplete: (time: number) => void;
}

export function Timer({ isRunning, onComplete }: TimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (time > 0) {
      onComplete(time);
      setTime(0);
    }

    return () => clearInterval(interval);
  }, [isRunning, time, onComplete]);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      <TimerIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#38F8AC]" />
      <div className="text-2xl sm:text-4xl font-mono font-bold text-[#38F8AC]">
        {formatTime(time)}
      </div>
    </div>
  );
}
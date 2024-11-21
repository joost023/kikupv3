import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface NumberPadProps {
  onNumberClick: (number: number) => void;
}

export function NumberPad({ onNumberClick }: NumberPadProps) {
  return (
    <div className="grid grid-cols-3 gap-2 max-w-[200px]">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <motion.button
          key={number}
          onClick={() => onNumberClick(number)}
          className={cn(
            "w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center",
            "text-lg sm:text-xl font-bold rounded-lg",
            "bg-[#1C1C1E] hover:bg-[#2C2C2E] text-[#38F8AC]",
            "transition-colors"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {number}
        </motion.button>
      ))}
    </div>
  );
}
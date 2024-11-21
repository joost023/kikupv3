import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { MemoryCard } from '@/types/memory';

interface MemoryBoardProps {
  cards: MemoryCard[];
  flippedIndices: number[];
  matchedPairs: number[];
  onCardClick: (index: number) => void;
}

export function MemoryBoard({ cards, flippedIndices, matchedPairs, onCardClick }: MemoryBoardProps) {
  return (
    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
      {cards.map((card, index) => {
        const isFlipped = flippedIndices.includes(index);
        const isMatched = matchedPairs.includes(index);
        
        return (
          <motion.div
            key={index}
            className={cn(
              "aspect-square cursor-pointer perspective-1000",
              (!isFlipped && !isMatched) && "hover:scale-105",
              "transition-transform duration-200"
            )}
            onClick={() => !isFlipped && !isMatched && onCardClick(index)}
            whileHover={{ scale: isFlipped || isMatched ? 1 : 1.05 }}
          >
            <motion.div
              className="relative w-full h-full transition-all duration-500 transform-style-3d"
              animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
            >
              {/* Front of card */}
              <div className={cn(
                "absolute w-full h-full backface-hidden bg-[#2C2C2E] rounded-xl",
                "flex items-center justify-center border-2",
                "border-[#38F8AC]/20"
              )}>
                <div className="w-12 h-12 rounded-full bg-[#38F8AC]/10" />
              </div>

              {/* Back of card */}
              <div className={cn(
                "absolute w-full h-full backface-hidden bg-[#38F8AC] rounded-xl rotate-y-180",
                "flex items-center justify-center",
                isMatched && "bg-opacity-50"
              )}>
                {card.icon}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
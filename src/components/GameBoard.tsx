import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GameBoardProps {
  currentWord: string;
  guesses: string[];
  currentGuess: string;
  isWinner: boolean;
  wordLength: number;
}

export function GameBoard({ currentWord, guesses, currentGuess, isWinner, wordLength }: GameBoardProps) {
  const rows = Array(6).fill(null);

  const colors = [
    'rgb(56, 248, 172)', // KIKUP green
    '#FFD700',          // Gold
    '#FF69B4',          // Hot Pink
    '#00CED1',          // Dark Turquoise
    '#9370DB',          // Medium Purple
  ];

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-[6px]">
      {rows.map((_, rowIndex) => {
        const isCurrentRow = rowIndex === guesses.length;
        const guess = isCurrentRow ? currentGuess : guesses[rowIndex] || '';
        const isCompletedRow = guesses[rowIndex] && guesses[rowIndex].toLowerCase() === currentWord;
        
        return (
          <div key={rowIndex} className="flex gap-1 sm:gap-[6px]">
            {Array(wordLength).fill(null).map((_, colIndex) => {
              const letter = guess[colIndex] || '';
              let status = '';
              
              if (guesses[rowIndex]) {
                if (letter === currentWord[colIndex]) {
                  status = 'correct';
                } else if (currentWord.includes(letter)) {
                  status = 'present';
                } else {
                  status = 'absent';
                }
              }

              const letterComponent = (
                <motion.div
                  key={colIndex}
                  className={cn(
                    "w-11 h-11 sm:w-14 sm:h-14 border flex items-center justify-center text-xl sm:text-2xl font-bold rounded transition-colors uppercase",
                    status === 'correct' && "bg-[#38F8AC] border-[#38F8AC] text-black",
                    status === 'present' && "bg-yellow-500 border-yellow-500",
                    status === 'absent' && "bg-[#3A3A3C] border-[#3A3A3C]",
                    !status && letter && "border-[#565656]",
                    !status && !letter && "border-[#3A3A3C]"
                  )}
                  animate={
                    isCompletedRow
                      ? {
                          rotateX: [0, 360],
                          backgroundColor: colors.map(color => color),
                          transition: {
                            duration: 2,
                            repeat: 1,
                            delay: colIndex * 0.1,
                            backgroundColor: {
                              repeat: Infinity,
                              duration: 2,
                            }
                          }
                        }
                      : {}
                  }
                >
                  {letter}
                </motion.div>
              );

              return letterComponent;
            })}
          </div>
        );
      })}
    </div>
  );
}
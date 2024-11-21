import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { RotateCcw, Send } from 'lucide-react';

interface LetterRondoProps {
  centerLetter: string;
  surroundingLetters: string[];
  currentWord: string;
  foundWords: string[];
  longestWord: string;
  onLetterClick: (letter: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}

export function LetterRondo({
  centerLetter,
  surroundingLetters,
  currentWord,
  foundWords,
  longestWord,
  onLetterClick,
  onSubmit,
  onReset
}: LetterRondoProps) {
  return (
    <div className="flex flex-col items-center gap-8 max-w-full">
      {/* Current Word and Longest Word */}
      <div className="text-center space-y-4 w-full">
        <div className="h-12 min-w-[200px] max-w-full bg-[#2C2C2E] rounded-lg flex items-center justify-center text-xl font-bold px-4">
          {currentWord || "Klik op letters om een woord te maken..."}
        </div>
        {longestWord && (
          <div className="text-[#38F8AC]">
            Langste woord: <span className="font-bold">{longestWord}</span> ({longestWord.length} letters)
          </div>
        )}
      </div>

      {/* Letter Circle */}
      <div className="relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] touch-manipulation">
        {/* Center Letter */}
        <motion.button
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-16 h-16 sm:w-20 sm:h-20",
            "rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold",
            "bg-[#38F8AC] text-black hover:bg-[#2ce49d] active:bg-[#2ce49d]",
            "transition-colors duration-200 touch-manipulation"
          )}
          onClick={() => onLetterClick(centerLetter)}
          whileTap={{ scale: 0.95 }}
        >
          {centerLetter}
        </motion.button>

        {/* Surrounding Letters */}
        {surroundingLetters.map((letter, index) => {
          const angle = (index * 360) / surroundingLetters.length;
          const radius = 110; // Slightly smaller radius for better mobile layout
          const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
          const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

          return (
            <motion.button
              key={`${letter}-${index}`}
              className={cn(
                "absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center",
                "text-xl sm:text-2xl font-bold transition-colors duration-200 touch-manipulation",
                "bg-[#38F8AC] text-black hover:bg-[#2ce49d] active:bg-[#2ce49d]"
              )}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                left: '50%',
                top: '50%',
                marginLeft: '-24px',
                marginTop: '-24px'
              }}
              onClick={() => onLetterClick(letter)}
              whileTap={{ scale: 0.95 }}
            >
              {letter}
            </motion.button>
          );
        })}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="w-14 h-14 touch-manipulation"
          onClick={onReset}
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
        <Button
          className="w-14 h-14 bg-[#38F8AC] text-black hover:bg-[#2ce49d] touch-manipulation"
          onClick={onSubmit}
        >
          <Send className="w-6 h-6" />
        </Button>
      </div>

      {/* Found Words */}
      {foundWords.length > 0 && (
        <div className="w-full max-w-md">
          <h3 className="text-lg font-medium mb-2">Gevonden woorden:</h3>
          <div className="flex flex-wrap gap-2">
            {foundWords.map((word, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-[#2C2C2E] rounded-full text-sm"
              >
                {word} ({word.length})
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center text-gray-400 max-w-md px-4">
        <p>Maak het langste woord dat je kunt vinden. Gebruik de middelste letter in je woord.</p>
        <p className="mt-2">Een woord van 8 of meer letters is een perfecte score!</p>
      </div>
    </div>
  );
}
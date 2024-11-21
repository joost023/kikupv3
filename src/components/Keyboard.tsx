import { cn } from '@/lib/utils';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  guesses: string[];
  currentWord: string;
}

export function Keyboard({ onKeyPress, guesses, currentWord }: KeyboardProps) {
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
  ];

  const getKeyStatus = (key: string) => {
    const guessedLetters = guesses.join('').split('');
    
    if (guessedLetters.includes(key)) {
      if (currentWord.split('').some((letter, i) => 
        guesses.some(guess => guess[i] === key && letter === key)
      )) {
        return 'correct';
      }
      if (currentWord.includes(key)) {
        return 'present';
      }
      return 'absent';
    }
    return '';
  };

  return (
    <div className="grid gap-1.5 sm:gap-2 w-full max-w-[500px] mx-auto px-1 sm:px-2">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 sm:gap-1.5">
          {row.map((key) => {
            const status = key.length === 1 ? getKeyStatus(key) : '';
            
            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={cn(
                  "h-12 sm:h-14 rounded text-sm sm:text-base font-medium transition-colors flex-1",
                  "flex items-center justify-center",
                  key.length > 1 && "text-xs sm:text-sm px-1 sm:px-2 min-w-[4em] sm:min-w-[4.5em]",
                  key.length === 1 && "px-1 sm:px-2 min-w-[2em] sm:min-w-[2.5em]",
                  status === 'correct' && "bg-[#38F8AC] text-black",
                  status === 'present' && "bg-yellow-500",
                  status === 'absent' && "bg-[#3A3A3C]",
                  !status && "bg-[#2C2C2E] hover:bg-[#3A3A3C]",
                  "uppercase"
                )}
              >
                {key === 'Backspace' ? '←' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
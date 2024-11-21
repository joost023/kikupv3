import { useEffect } from 'react';
import { GameBoard } from '@/components/GameBoard';
import { Keyboard } from '@/components/Keyboard';
import { Timer } from '@/components/Timer';
import { HighScores } from '@/components/HighScores';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { NameDialog } from '@/components/NameDialog';
import { getLocalHighScores, saveHighScore } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/hooks/useGameState';
import { useConfetti } from '@/hooks/useConfetti';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function GamePage() {
  const [highScores, setHighScores] = useState(getLocalHighScores());
  const { triggerWinAnimation } = useConfetti();
  const {
    currentWord,
    guesses,
    currentGuess,
    isWinner,
    timerRunning,
    showNameDialog,
    currentTime,
    wordLength,
    handleTimerComplete,
    setShowNameDialog,
    resetGame,
    handleKeyPress
  } = useGameState();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleKeyPress('Enter');
      } else if (e.key === 'Backspace') {
        handleKeyPress('Backspace');
      } else if (/^[A-Za-z]$/.test(e.key)) {
        handleKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  useEffect(() => {
    if (isWinner) {
      triggerWinAnimation();
    }
  }, [isWinner, triggerWinAnimation]);

  const handleNameSubmit = (name: string) => {
    const newScore = {
      name,
      time: currentTime,
      word: currentWord,
      date: new Date().toLocaleDateString(),
    };
    const updatedScores = saveHighScore(newScore);
    setHighScores(updatedScores);
    setShowNameDialog(false);
    resetGame();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex flex-col">
        <div className="container mx-auto px-2 sm:px-4 py-4 flex flex-col flex-grow">
          <div className="bg-[#1C1C1E] rounded-2xl p-4 sm:p-8 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-4 sm:mb-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#2C2C2E] text-white hover:bg-[#3C3C3E]">
                    {wordLength} letters
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#2C2C2E] border-gray-700">
                  <DropdownMenuItem 
                    className="text-white hover:bg-[#3C3C3E] cursor-pointer"
                    onClick={() => resetGame(5)}
                  >
                    5 letters
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-white hover:bg-[#3C3C3E] cursor-pointer"
                    onClick={() => resetGame(6)}
                  >
                    6 letters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                onClick={() => resetGame()}
                className="bg-[#38F8AC] text-black hover:bg-[#2ce49d] px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base"
              >
                Nieuw spel
              </Button>
            </div>
            
            <div className="text-center mb-4 sm:mb-8">
              <p className="text-white mb-2">Tijd</p>
              <Timer isRunning={timerRunning} onComplete={handleTimerComplete} />
            </div>

            <div className="flex-grow flex flex-col justify-between">
              <div className="mb-4 sm:mb-8">
                <GameBoard 
                  currentWord={currentWord}
                  guesses={guesses}
                  currentGuess={currentGuess}
                  isWinner={isWinner}
                  wordLength={wordLength}
                />
              </div>
              
              <div>
                <Keyboard 
                  onKeyPress={handleKeyPress}
                  guesses={guesses}
                  currentWord={currentWord}
                />
              </div>
            </div>
          </div>
          
          {highScores.length > 0 && (
            <HighScores scores={highScores} />
          )}
        </div>
      </main>

      <Footer />
      
      <NameDialog 
        isOpen={showNameDialog} 
        onSubmit={handleNameSubmit}
      />
    </div>
  );
}
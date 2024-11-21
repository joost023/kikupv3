import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LetterRondo } from '@/components/LetterRondo';
import { Timer } from '@/components/Timer';
import { Button } from '@/components/ui/button';
import { HighScores } from '@/components/HighScores';
import { NameDialog } from '@/components/NameDialog';
import { useLetterRondo } from '@/hooks/useLetterRondo';
import { useConfetti } from '@/hooks/useConfetti';
import { RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

export default function LetterRondoPage() {
  const {
    centerLetter,
    surroundingLetters,
    currentWord,
    foundWords,
    longestWord,
    isWinner,
    timerRunning,
    showNameDialog,
    currentTime,
    highScores,
    handleLetterClick,
    handleSubmitWord,
    handleReset,
    handleTimerComplete,
    handleNameSubmit,
    initGame
  } = useLetterRondo();

  const { triggerWinAnimation } = useConfetti();

  useEffect(() => {
    if (isWinner) {
      triggerWinAnimation();
    }
  }, [isWinner, triggerWinAnimation]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <div className="container mx-auto px-2 sm:px-4 py-4">
          <div className="bg-[#1C1C1E] rounded-2xl p-4 sm:p-8">
            <div className="flex justify-between items-center mb-4 sm:mb-8">
              <div className="flex items-center gap-4">
                <span className="text-[#38F8AC] font-medium">
                  {longestWord ? `${longestWord.length} letters` : 'Nog geen woord gevonden'}
                </span>
              </div>
              <Button
                onClick={initGame}
                className="bg-[#38F8AC] text-black hover:bg-[#2ce49d] px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Nieuw spel
              </Button>
            </div>
            
            <div className="text-center mb-4 sm:mb-8">
              <p className="text-white mb-2">Tijd</p>
              <Timer isRunning={timerRunning} onComplete={handleTimerComplete} />
            </div>

            <LetterRondo
              centerLetter={centerLetter}
              surroundingLetters={surroundingLetters}
              currentWord={currentWord}
              foundWords={foundWords}
              longestWord={longestWord}
              onLetterClick={handleLetterClick}
              onSubmit={handleSubmitWord}
              onReset={handleReset}
            />
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
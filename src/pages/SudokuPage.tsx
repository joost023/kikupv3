import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SudokuBoard } from '@/components/SudokuBoard';
import { NumberPad } from '@/components/NumberPad';
import { Timer } from '@/components/Timer';
import { Button } from '@/components/ui/button';
import { HighScores } from '@/components/HighScores';
import { NameDialog } from '@/components/NameDialog';
import { useSudoku } from '@/hooks/useSudoku';
import { useConfetti } from '@/hooks/useConfetti';
import { RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

export default function SudokuPage() {
  const {
    grid,
    selectedCell,
    initialGrid,
    difficulty,
    isWinner,
    timerRunning,
    showNameDialog,
    currentTime,
    highScores,
    handleCellClick,
    handleNumberInput,
    handleTimerComplete,
    handleNameSubmit,
    initGame
  } = useSudoku();

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
                <select
                  value={difficulty}
                  onChange={(e) => initGame(e.target.value as 'easy' | 'medium' | 'hard')}
                  className="px-3 py-2 rounded-lg bg-[#2C2C2E] text-white border-none"
                >
                  <option value="easy">Makkelijk</option>
                  <option value="medium">Gemiddeld</option>
                  <option value="hard">Moeilijk</option>
                </select>
              </div>
              <Button
                onClick={() => initGame()}
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

            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
              <SudokuBoard
                grid={grid}
                initialGrid={initialGrid}
                selectedCell={selectedCell}
                onCellClick={handleCellClick}
              />
              
              <div>
                <NumberPad onNumberClick={handleNumberInput} />
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
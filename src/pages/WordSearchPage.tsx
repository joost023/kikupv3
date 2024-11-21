import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WordSearchBoard } from '@/components/WordSearchBoard';
import { WordList } from '@/components/WordList';
import { Timer } from '@/components/Timer';
import { Button } from '@/components/ui/button';
import { HighScores } from '@/components/HighScores';
import { NameDialog } from '@/components/NameDialog';
import { useWordSearch } from '@/hooks/useWordSearch';
import { useConfetti } from '@/hooks/useConfetti';
import { RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

export default function WordSearchPage() {
  const {
    grid,
    words,
    foundWords,
    selectedCells,
    isWinner,
    timerRunning,
    showNameDialog,
    currentTime,
    highScores,
    handleCellClick,
    handleMouseEnter,
    handleMouseUp,
    handleTimerComplete,
    handleNameSubmit,
    resetGame
  } = useWordSearch();

  const { triggerWinAnimation } = useConfetti();

  useEffect(() => {
    if (isWinner) {
      triggerWinAnimation();
    }
  }, [isWinner, triggerWinAnimation]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex flex-col">
        <div className="container mx-auto px-2 sm:px-4 py-4 flex flex-col flex-grow">
          <div className="bg-[#1C1C1E] rounded-2xl p-4 sm:p-8 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-4 sm:mb-8">
              <div className="flex items-center gap-4">
                <span className="text-[#38F8AC] font-medium text-sm sm:text-base">
                  Gevonden: {foundWords.length} / {words.length}
                </span>
              </div>
              <Button
                onClick={resetGame}
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

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 flex-grow">
              <div className="flex-grow flex items-center justify-center">
                <WordSearchBoard
                  grid={grid}
                  selectedCells={selectedCells}
                  foundWords={foundWords}
                  onCellClick={handleCellClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                />
              </div>
              
              <div className="lg:w-64">
                <WordList 
                  words={words}
                  foundWords={foundWords}
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
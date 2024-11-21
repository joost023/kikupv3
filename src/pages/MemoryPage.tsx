import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MemoryBoard } from '@/components/MemoryBoard';
import { Timer } from '@/components/Timer';
import { Button } from '@/components/ui/button';
import { HighScores } from '@/components/HighScores';
import { NameDialog } from '@/components/NameDialog';
import { useMemoryGame } from '@/hooks/useMemoryGame';
import { useConfetti } from '@/hooks/useConfetti';
import { RotateCcw } from 'lucide-react';

export default function MemoryPage() {
  const {
    cards,
    flippedIndices,
    matchedPairs,
    moves,
    isWinner,
    timerRunning,
    showNameDialog,
    currentTime,
    highScores,
    handleCardClick,
    handleTimerComplete,
    handleNameSubmit,
    resetGame
  } = useMemoryGame();

  const { triggerWinAnimation } = useConfetti();

  useEffect(() => {
    if (isWinner && !showNameDialog) {
      triggerWinAnimation();
    }
  }, [isWinner, showNameDialog, triggerWinAnimation]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-[#1C1C1E] rounded-2xl p-8">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-4">
                <span className="text-[#38F8AC] font-medium">Moves: {moves}</span>
                <span className="text-[#38F8AC] font-medium">
                  Pairs: {matchedPairs.length / 2} / {cards.length / 2}
                </span>
              </div>
              <Button
                onClick={resetGame}
                className="bg-[#38F8AC] text-black hover:bg-[#2ce49d] px-6 py-2 rounded-lg font-medium"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Nieuw spel
              </Button>
            </div>
            
            <div className="text-center mb-12">
              <p className="text-white mb-2">Tijd</p>
              <Timer isRunning={timerRunning} onComplete={handleTimerComplete} />
            </div>

            <MemoryBoard
              cards={cards}
              flippedIndices={flippedIndices}
              matchedPairs={matchedPairs}
              onCardClick={handleCardClick}
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
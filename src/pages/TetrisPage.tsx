import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { TetrisBoard } from '@/components/TetrisBoard';
import { NextPiece } from '@/components/NextPiece';
import { Button } from '@/components/ui/button';
import { HighScores } from '@/components/HighScores';
import { NameDialog } from '@/components/NameDialog';
import { useTetris } from '@/hooks/useTetris';
import { Play, Pause, RotateCcw, ArrowDown, ArrowLeft, ArrowRight, RotateCw, Trophy, Target } from 'lucide-react';
import { useEffect } from 'react';

export default function TetrisPage() {
  const {
    board,
    currentPiece,
    nextPiece,
    score,
    level,
    linesCleared,
    gameOver,
    isPaused,
    showNameDialog,
    highScores,
    showTutorial,
    initGame,
    movePiece,
    dropPiece,
    rotatePiece,
    handleNameSubmit,
    setIsPaused,
    handleTouchStart
  } = useTetris();

  useEffect(() => {
    initGame();
  }, [initGame]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex flex-col">
        <div className="container mx-auto px-2 sm:px-4 py-4 flex flex-col flex-grow">
          <div className="bg-[#1C1C1E] rounded-2xl p-4 sm:p-8 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-4 sm:mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#38F8AC]" />
                  <span className="text-[#38F8AC] font-medium text-sm sm:text-base">
                    Score: {score}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#38F8AC]" />
                  <span className="text-[#38F8AC] font-medium text-sm sm:text-base">
                    Level: {level}
                  </span>
                </div>
              </div>
              <Button
                onClick={initGame}
                className="bg-[#38F8AC] text-black hover:bg-[#2ce49d] px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Nieuw spel
              </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 flex-grow items-center justify-center">
              <div className="relative">
                <TetrisBoard 
                  board={board}
                  currentPiece={currentPiece}
                  showTutorial={showTutorial}
                  onTouchStart={handleTouchStart}
                />
                
                {(gameOver || isPaused) && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-4">
                        {gameOver ? 'Game Over!' : 'Pauze'}
                      </h2>
                      {gameOver && (
                        <div className="mb-4 text-[#38F8AC]">
                          <p>Score: {score}</p>
                          <p>Level: {level}</p>
                          <p>Lijnen: {linesCleared}</p>
                        </div>
                      )}
                      {gameOver ? (
                        <Button
                          onClick={initGame}
                          className="bg-[#38F8AC] text-black hover:bg-[#2ce49d]"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Opnieuw spelen
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setIsPaused(false)}
                          className="bg-[#38F8AC] text-black hover:bg-[#2ce49d]"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Doorgaan
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <NextPiece piece={nextPiece} />
                
                <div className="bg-[#2C2C2E] p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-gray-400 mb-4">Besturing</h3>
                  <div className="grid grid-cols-3 gap-2 max-w-[200px]">
                    <div />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => currentPiece && rotatePiece(currentPiece)}
                      className="bg-[#1C1C1E]"
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <div />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => movePiece(-1)}
                      className="bg-[#1C1C1E]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => dropPiece()}
                      className="bg-[#1C1C1E]"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => movePiece(1)}
                      className="bg-[#1C1C1E]"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsPaused(p => !p)}
                      className="bg-[#1C1C1E]"
                    >
                      {isPaused ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Doorgaan
                        </>
                      ) : (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pauze
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={initGame}
                      className="bg-[#1C1C1E]"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
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
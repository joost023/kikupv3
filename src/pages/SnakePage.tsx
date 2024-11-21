import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SnakeBoard } from '@/components/SnakeBoard';
import { Button } from '@/components/ui/button';
import { HighScores } from '@/components/HighScores';
import { NameDialog } from '@/components/NameDialog';
import { useSnake } from '@/hooks/useSnake';
import { Play, Pause, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export default function SnakePage() {
  const {
    snake,
    food,
    gameOver,
    score,
    isPaused,
    showNameDialog,
    highScores,
    handleSwipe,
    handleNameSubmit,
    setIsPaused,
    resetGame,
    GRID_SIZE
  } = useSnake();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <div className="container mx-auto px-2 sm:px-4 py-4">
          <div className="bg-[#1C1C1E] rounded-2xl p-4 sm:p-8">
            <div className="flex justify-between items-center mb-4 sm:mb-8">
              <div className="flex items-center gap-4">
                <span className="text-[#38F8AC] font-medium text-sm sm:text-base">
                  Score: {score}
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

            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-grow w-full max-w-2xl">
                <SnakeBoard
                  snake={snake}
                  food={food}
                  gridSize={GRID_SIZE}
                  onSwipe={handleSwipe}
                />
              </div>
              
              <div className="w-full lg:w-64 space-y-8">
                {/* Controls Info */}
                <div className="bg-[#2C2C2E] p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-gray-400 mb-4">Besturing</h3>
                  
                  {/* Mobile Controls */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-2">Mobiel:</p>
                    <p className="text-sm text-white">Swipe in de richting waar je naartoe wilt</p>
                  </div>

                  {/* Keyboard Controls */}
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Toetsenbord:</p>
                    <div className="grid grid-cols-3 gap-2 max-w-[150px] mx-auto">
                      <div />
                      <div className="flex justify-center">
                        <div className="w-8 h-8 bg-[#1C1C1E] rounded flex items-center justify-center">
                          <ArrowUp className="w-4 h-4" />
                        </div>
                      </div>
                      <div />
                      <div className="flex justify-center">
                        <div className="w-8 h-8 bg-[#1C1C1E] rounded flex items-center justify-center">
                          <ArrowLeft className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-8 h-8 bg-[#1C1C1E] rounded flex items-center justify-center">
                          <ArrowDown className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-8 h-8 bg-[#1C1C1E] rounded flex items-center justify-center">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Controls */}
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setIsPaused(p => !p)}
                    className="w-14 h-14"
                    disabled={gameOver}
                  >
                    {isPaused ? (
                      <Play className="w-6 h-6" />
                    ) : (
                      <Pause className="w-6 h-6" />
                    )}
                  </Button>
                  <Button
                    onClick={resetGame}
                    className="w-14 h-14 bg-[#38F8AC] text-black hover:bg-[#2ce49d]"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
                <div className="text-center p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                  <p className="text-[#38F8AC] font-bold mb-6">Score: {score}</p>
                  <Button
                    onClick={resetGame}
                    className="bg-[#38F8AC] text-black hover:bg-[#2ce49d]"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Opnieuw spelen
                  </Button>
                </div>
              </div>
            )}
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
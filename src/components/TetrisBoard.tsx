import { cn } from '@/lib/utils';
import { TETRIS_COLORS } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Pointer } from 'lucide-react';

type TetrisBoardProps = {
  board: number[][];
  currentPiece: {
    shape: number[][];
    type: keyof typeof TETRIS_COLORS;
    x: number;
    y: number;
  } | null;
  showTutorial: boolean;
  onTouchStart: (e: React.TouchEvent) => void;
};

export function TetrisBoard({ board, currentPiece, showTutorial, onTouchStart }: TetrisBoardProps) {
  // Create a copy of the board to draw the current piece
  const displayBoard = board.map(row => [...row]);
  
  // Draw current piece on the board
  if (currentPiece) {
    currentPiece.shape.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell && currentPiece.y + dy >= 0) {
          displayBoard[currentPiece.y + dy][currentPiece.x + dx] = cell;
        }
      });
    });
  }

  return (
    <div className="relative">
      <div 
        className="grid gap-px bg-gray-800 p-px rounded-lg touch-none"
        onTouchStart={onTouchStart}
      >
        {displayBoard.map((row, y) => (
          <div key={y} className="flex gap-px">
            {row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-sm",
                  cell ? "bg-[#38F8AC]" : "bg-[#2C2C2E]"
                )}
              />
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showTutorial && (
          <>
            {/* Left side tutorial */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white flex flex-col items-center"
            >
              <Pointer className="w-6 h-6 text-[#38F8AC] rotate-[225deg] animate-bounce" />
              <span className="text-xs mt-2 text-gray-400">Links</span>
            </motion.div>

            {/* Right side tutorial */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white flex flex-col items-center"
            >
              <Pointer className="w-6 h-6 text-[#38F8AC] rotate-[315deg] animate-bounce" />
              <span className="text-xs mt-2 text-gray-400">Rechts</span>
            </motion.div>

            {/* Center tutorial */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 text-white flex flex-col items-center"
            >
              <Pointer className="w-6 h-6 text-[#38F8AC] animate-bounce" />
              <span className="text-xs mt-2 text-gray-400">Draaien</span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
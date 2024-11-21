import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SudokuBoardProps {
  grid: number[][];
  initialGrid: number[][];
  selectedCell: [number, number] | null;
  onCellClick: (row: number, col: number) => void;
}

export function SudokuBoard({ grid, initialGrid, selectedCell, onCellClick }: SudokuBoardProps) {
  return (
    <div className="grid gap-px bg-gray-800 p-px rounded-lg">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-px">
          {row.map((cell, colIndex) => {
            const isInitial = initialGrid[rowIndex][colIndex] !== 0;
            const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
            const isSameBox = selectedCell && 
              Math.floor(rowIndex / 3) === Math.floor(selectedCell[0] / 3) && 
              Math.floor(colIndex / 3) === Math.floor(selectedCell[1] / 3);
            const isSameRowOrCol = selectedCell && 
              (rowIndex === selectedCell[0] || colIndex === selectedCell[1]);
            
            return (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center",
                  "text-base sm:text-lg md:text-xl font-bold rounded-sm transition-colors",
                  isInitial ? "text-white" : "text-[#38F8AC]",
                  isSelected ? "bg-[#38F8AC] text-black" : 
                  isSameBox ? "bg-[#2C2C2E]" :
                  isSameRowOrCol ? "bg-[#1C1C1E]" : "bg-black",
                  !isInitial && "hover:bg-[#2C2C2E]",
                  (rowIndex + 1) % 3 === 0 && "mb-px",
                  (colIndex + 1) % 3 === 0 && "mr-px"
                )}
                onClick={() => onCellClick(rowIndex, colIndex)}
                whileHover={!isInitial ? { scale: 1.05 } : undefined}
                whileTap={!isInitial ? { scale: 0.95 } : undefined}
              >
                {cell !== 0 ? cell : ''}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface WordSearchBoardProps {
  grid: string[][];
  selectedCells: [number, number][];
  foundWords: string[];
  onCellClick: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

export function WordSearchBoard({ 
  grid, 
  selectedCells,
  foundWords,
  onCellClick, 
  onMouseEnter,
  onMouseUp
}: WordSearchBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);

  // Create a map of cells that are part of found words
  const foundCells = new Set<string>();
  foundWords.forEach(word => {
    // Find the word in the grid
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        // Check horizontally
        if (col + word.length <= grid[0].length) {
          const horizontalWord = grid[row].slice(col, col + word.length).join('');
          if (horizontalWord === word) {
            for (let i = 0; i < word.length; i++) {
              foundCells.add(`${row}-${col + i}`);
            }
          }
        }
        // Check vertically
        if (row + word.length <= grid.length) {
          const verticalWord = Array.from({length: word.length}, (_, i) => grid[row + i][col]).join('');
          if (verticalWord === word) {
            for (let i = 0; i < word.length; i++) {
              foundCells.add(`${row + i}-${col}`);
            }
          }
        }
        // Check diagonally
        if (row + word.length <= grid.length && col + word.length <= grid[0].length) {
          const diagonalWord = Array.from({length: word.length}, (_, i) => grid[row + i][col + i]).join('');
          if (diagonalWord === word) {
            for (let i = 0; i < word.length; i++) {
              foundCells.add(`${row + i}-${col + i}`);
            }
          }
        }
      }
    }
  });

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      
      if (!boardRef.current) return;
      
      const touch = e.touches[0];
      const board = boardRef.current;
      const rect = board.getBoundingClientRect();
      
      // Get the cell size by measuring the first cell
      const cell = board.querySelector('div[data-cell]') as HTMLElement;
      if (!cell) return;
      
      const cellRect = cell.getBoundingClientRect();
      const cellSize = cellRect.width;
      const gap = 4; // Gap between cells
      
      // Calculate row and column from touch position
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      const col = Math.floor(x / (cellSize + gap));
      const row = Math.floor(y / (cellSize + gap));
      
      // Check if within grid bounds
      if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
        onMouseEnter(row, col);
      }
    };

    const board = boardRef.current;
    if (board) {
      board.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (board) {
        board.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [grid, onMouseEnter]);

  if (!grid || !grid[0]) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      ref={boardRef}
      className="grid gap-1 sm:gap-2"
      style={{ 
        gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))` 
      }}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchEnd={onMouseUp}
    >
      {grid.map((row, rowIndex) => (
        row.map((letter, colIndex) => {
          const isSelected = selectedCells.some(
            ([r, c]) => r === rowIndex && c === colIndex
          );
          const isFoundCell = foundCells.has(`${rowIndex}-${colIndex}`);

          return (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              data-cell
              className={cn(
                "w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-base sm:text-lg md:text-xl font-bold cursor-pointer select-none",
                "transition-colors duration-200",
                isSelected && "bg-[#38F8AC] text-black",
                isFoundCell && !isSelected && "bg-[#38F8AC]/30 text-[#38F8AC]",
                !isSelected && !isFoundCell && "bg-[#2C2C2E] text-white hover:bg-[#3A3A3C]"
              )}
              whileHover={{ scale: isSelected ? 1 : 1.05 }}
              onMouseDown={() => onCellClick(rowIndex, colIndex)}
              onTouchStart={() => onCellClick(rowIndex, colIndex)}
              onMouseEnter={() => onMouseEnter(rowIndex, colIndex)}
            >
              {letter}
            </motion.div>
          );
        })
      ))}
    </div>
  );
}
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface SnakeBoardProps {
  snake: Array<{ x: number; y: number }>;
  food: { x: number; y: number };
  gridSize: number;
  onSwipe: (startX: number, startY: number, endX: number, endY: number) => void;
}

export function SnakeBoard({ snake, food, gridSize, onSwipe }: SnakeBoardProps) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setTouchStart({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart) return;
      
      const touch = e.changedTouches[0];
      onSwipe(
        touchStart.x,
        touchStart.y,
        touch.clientX,
        touch.clientY
      );
      setTouchStart(null);
    };

    const board = boardRef.current;
    if (board) {
      board.addEventListener('touchstart', handleTouchStart);
      board.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (board) {
        board.removeEventListener('touchstart', handleTouchStart);
        board.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [touchStart, onSwipe]);

  const grid = Array(gridSize).fill(null);

  return (
    <div 
      ref={boardRef}
      className="relative aspect-square w-full max-w-[500px] bg-[#1C1C1E] rounded-lg p-2 touch-none"
    >
      <div 
        className="grid gap-1"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          height: '100%'
        }}
      >
        {grid.map((_, y) =>
          grid.map((_, x) => {
            const isSnake = snake.some(segment => segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;
            const isHead = snake[0].x === x && snake[0].y === y;

            return (
              <motion.div
                key={`${x}-${y}`}
                className={cn(
                  "rounded-sm",
                  isHead ? "bg-[#38F8AC]" :
                  isSnake ? "bg-[#2ce49d]" :
                  isFood ? "bg-red-500" :
                  "bg-[#2C2C2E]"
                )}
                animate={isFood ? {
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 0.5,
                    repeat: Infinity
                  }
                } : undefined}
              />
            );
          })
        )}
      </div>

      {/* Touch Controls Overlay */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-0">
        <div className="col-start-2" />
        <div className="col-start-2 row-start-3" />
        <div className="row-start-2" />
        <div className="col-start-3 row-start-2" />
      </div>
    </div>
  );
}
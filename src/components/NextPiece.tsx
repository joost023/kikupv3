import { cn } from '@/lib/utils';
import { TETRIS_COLORS } from '@/lib/utils';

interface NextPieceProps {
  piece: {
    shape: number[][];
    type: keyof typeof TETRIS_COLORS;
  } | null;
}

export function NextPiece({ piece }: NextPieceProps) {
  if (!piece) return null;

  return (
    <div className="bg-[#2C2C2E] p-4 rounded-xl">
      <h3 className="text-sm font-medium text-gray-400 mb-2">Volgende</h3>
      <div className="grid gap-px bg-gray-800 p-px rounded-lg w-fit">
        {piece.shape.map((row, y) => (
          <div key={y} className="flex gap-px">
            {row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className={cn(
                  "w-6 h-6 rounded-sm",
                  cell ? "bg-[#38F8AC]" : "bg-[#2C2C2E]"
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
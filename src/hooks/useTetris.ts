import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getLocalHighScores, saveHighScore, isNewHighScore, GAME_IDS } from '@/lib/utils';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_SPEED = 1000;
const SPEED_INCREASE_PER_LEVEL = 100;
const MIN_SPEED = 100;
const POINTS_PER_LINE = 100;
const POINTS_MULTIPLIER = 2; // Points multiplier for multiple lines cleared at once
const POINTS_PER_LEVEL = 1000; // Points needed for level up

type Piece = {
  shape: number[][];
  type: 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';
  x: number;
  y: number;
};

const PIECES = {
  I: { shape: [[1, 1, 1, 1]], type: 'I' as const },
  O: { shape: [[1, 1], [1, 1]], type: 'O' as const },
  T: { shape: [[0, 1, 0], [1, 1, 1]], type: 'T' as const },
  S: { shape: [[0, 1, 1], [1, 1, 0]], type: 'S' as const },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], type: 'Z' as const },
  J: { shape: [[1, 0, 0], [1, 1, 1]], type: 'J' as const },
  L: { shape: [[0, 0, 1], [1, 1, 1]], type: 'L' as const },
};

export function useTetris() {
  const [board, setBoard] = useState<number[][]>([]);
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [linesCleared, setLinesCleared] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [highScores, setHighScores] = useState(() => 
    getLocalHighScores(GAME_IDS.TETRIS)
  );
  const { toast } = useToast();

  const createNewPiece = useCallback(() => {
    const pieces = Object.values(PIECES);
    const piece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
      ...piece,
      x: Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2),
      y: 0
    };
  }, []);

  const checkCollision = useCallback((piece: Piece, board: number[][], offsetX = 0, offsetY = 0) => {
    return piece.shape.some((row, dy) =>
      row.some((cell, dx) => {
        if (!cell) return false;
        const newX = piece.x + dx + offsetX;
        const newY = piece.y + dy + offsetY;
        return (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX])
        );
      })
    );
  }, []);

  const mergePieceToBoard = useCallback((piece: Piece, board: number[][]) => {
    const newBoard = board.map(row => [...row]);
    piece.shape.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell && piece.y + dy >= 0) {
          newBoard[piece.y + dy][piece.x + dx] = cell;
        }
      });
    });
    return newBoard;
  }, []);

  const clearLines = useCallback((board: number[][]) => {
    let linesCleared = 0;
    const newBoard = board.filter(row => {
      if (row.every(cell => cell)) {
        linesCleared++;
        return false;
      }
      return true;
    });
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }
    
    return { newBoard, linesCleared };
  }, []);

  const updateScore = useCallback((clearedLines: number) => {
    if (clearedLines === 0) return;
    
    // Calculate points based on number of lines cleared
    const points = POINTS_PER_LINE * clearedLines * Math.pow(POINTS_MULTIPLIER, clearedLines - 1) * level;
    
    setScore(prev => {
      const newScore = prev + points;
      // Level up every POINTS_PER_LEVEL points
      const newLevel = Math.floor(newScore / POINTS_PER_LEVEL) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        setSpeed(prev => Math.max(MIN_SPEED, INITIAL_SPEED - (newLevel - 1) * SPEED_INCREASE_PER_LEVEL));
      }
      return newScore;
    });
    setLinesCleared(prev => prev + clearedLines);
  }, [level]);

  // Level up notification
  useEffect(() => {
    if (level > 1) {
      toast({
        title: "Level Up!",
        description: `Level ${level} bereikt! Het spel wordt nu sneller.`,
      });
    }
  }, [level, toast]);

  const movePiece = useCallback((dx: number) => {
    if (!currentPiece || gameOver || isPaused) return;
    
    if (!checkCollision(currentPiece, board, dx, 0)) {
      setCurrentPiece(prev => prev && {
        ...prev,
        x: prev.x + dx
      });
    }
  }, [currentPiece, board, gameOver, isPaused, checkCollision]);

  const rotatePiece = useCallback((piece: Piece) => {
    const rotated = {
      ...piece,
      shape: piece.shape[0].map((_, i) =>
        piece.shape.map(row => row[i]).reverse()
      )
    };
    
    if (!checkCollision(rotated, board)) {
      return rotated;
    }
    
    return piece;
  }, [board, checkCollision]);

  const dropPiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    
    if (!checkCollision(currentPiece, board, 0, 1)) {
      setCurrentPiece(prev => prev && {
        ...prev,
        y: prev.y + 1
      });
    } else {
      // Merge piece and check for game over
      const newBoard = mergePieceToBoard(currentPiece, board);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      
      updateScore(linesCleared);
      setBoard(clearedBoard);
      
      if (checkCollision(nextPiece!, clearedBoard)) {
        setGameOver(true);
        if (score > 0 && isNewHighScore(score, GAME_IDS.TETRIS)) {
          setShowNameDialog(true);
        }
      } else {
        setCurrentPiece(nextPiece);
        setNextPiece(createNewPiece());
      }
    }
  }, [
    currentPiece, nextPiece, board, gameOver, isPaused, score,
    checkCollision, mergePieceToBoard, clearLines, createNewPiece, updateScore
  ]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (gameOver || isPaused) return;
    
    const touch = e.touches[0];
    const board = e.currentTarget as HTMLElement;
    const rect = board.getBoundingClientRect();
    
    // Calculate relative touch position
    const touchX = touch.clientX - rect.left;
    const boardWidth = rect.width;
    const touchXRatio = touchX / boardWidth;

    // Determine action based on touch position
    if (touchXRatio < 0.3) {
      // Left side - move left
      movePiece(-1);
    } else if (touchXRatio > 0.7) {
      // Right side - move right
      movePiece(1);
    } else {
      // Middle - rotate
      if (currentPiece) {
        setCurrentPiece(rotatePiece(currentPiece));
      }
    }
  }, [gameOver, isPaused, movePiece, currentPiece, rotatePiece]);

  const handleNameSubmit = useCallback((name: string) => {
    const newScore = {
      name,
      time: score,
      word: `KIKUP Bloks - Level ${level}`,
      date: new Date().toLocaleDateString(),
      gameId: GAME_IDS.TETRIS
    };
    const updatedScores = saveHighScore(newScore);
    setHighScores(updatedScores);
    setShowNameDialog(false);
  }, [score, level]);

  // Score saved notification
  useEffect(() => {
    if (highScores.length > 0 && !showNameDialog) {
      toast({
        title: "Score opgeslagen!",
        description: `Je hebt ${score} punten behaald op level ${level}!`,
      });
    }
  }, [highScores, showNameDialog, score, level, toast]);

  const initGame = useCallback(() => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0)));
    const firstPiece = createNewPiece();
    const secondPiece = createNewPiece();
    setCurrentPiece(firstPiece);
    setNextPiece(secondPiece);
    setScore(0);
    setLevel(1);
    setLinesCleared(0);
    setGameOver(false);
    setIsPaused(false);
    setSpeed(INITIAL_SPEED);
    setShowNameDialog(false);
    setShowTutorial(true);
    
    // Hide tutorial after 5 seconds
    setTimeout(() => {
      setShowTutorial(false);
    }, 5000);
  }, [createNewPiece]);

  // Game loop
  useEffect(() => {
    let dropInterval: NodeJS.Timeout;

    if (!gameOver && !isPaused) {
      dropInterval = setInterval(dropPiece, speed);
    }

    return () => clearInterval(dropInterval);
  }, [gameOver, isPaused, speed, dropPiece]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || isPaused) return;

      switch (e.key) {
        case 'ArrowLeft':
          movePiece(-1);
          break;
        case 'ArrowRight':
          movePiece(1);
          break;
        case 'ArrowDown':
          dropPiece();
          break;
        case 'ArrowUp':
          if (currentPiece) {
            setCurrentPiece(rotatePiece(currentPiece));
          }
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, isPaused, currentPiece, movePiece, dropPiece, rotatePiece]);

  return {
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
  };
}
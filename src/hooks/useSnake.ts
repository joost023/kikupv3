import { useState, useCallback, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getLocalHighScores, saveHighScore, isNewHighScore, GAME_IDS } from '@/lib/utils';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const INITIAL_SPEED = 200;
const SPEED_INCREASE = 10;
const MIN_SPEED = 80;

export function useSnake() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScores, setHighScores] = useState(() => 
    getLocalHighScores(GAME_IDS.SNAKE)
  );
  const { toast } = useToast();
  
  const directionRef = useRef(direction);
  const gameLoopRef = useRef<number>();
  const lastMoveRef = useRef<Direction>(direction);

  const generateFood = useCallback(() => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const checkCollision = useCallback((head: Position) => {
    // Check wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    
    // Check self collision (skip the last segment as it will move)
    return snake.slice(0, -1).some(segment => 
      segment.x === head.x && segment.y === head.y
    );
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused || !gameStarted) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      
      switch (directionRef.current) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      if (checkCollision(head)) {
        setGameOver(true);
        if (score > 0 && isNewHighScore(score, GAME_IDS.SNAKE)) {
          setShowNameDialog(true);
        }
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];
      
      // Check if snake ate food
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
        setSpeed(prev => Math.max(prev - SPEED_INCREASE, MIN_SPEED));
      } else {
        newSnake.pop();
      }

      lastMoveRef.current = directionRef.current;
      return newSnake;
    });
  }, [checkCollision, food, gameOver, generateFood, isPaused, score, gameStarted]);

  const changeDirection = useCallback((newDirection: Direction) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    // Prevent moving in opposite direction
    const opposites = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT'
    };

    if (opposites[newDirection] !== lastMoveRef.current) {
      directionRef.current = newDirection;
      setDirection(newDirection);
    }
  }, [gameStarted]);

  const handleSwipe = useCallback((startX: number, startY: number, endX: number, endY: number) => {
    if (gameOver) return;

    const diffX = endX - startX;
    const diffY = endY - startY;
    const minSwipeDistance = 30; // Minimum swipe distance to trigger direction change
    
    if (Math.abs(diffX) < minSwipeDistance && Math.abs(diffY) < minSwipeDistance) {
      return; // Ignore small swipes
    }
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (diffX > 0) {
        changeDirection('RIGHT');
      } else {
        changeDirection('LEFT');
      }
    } else {
      // Vertical swipe
      if (diffY > 0) {
        changeDirection('DOWN');
      } else {
        changeDirection('UP');
      }
    }
  }, [changeDirection, gameOver]);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    lastMoveRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
    setShowNameDialog(false);
    setGameStarted(false);
  }, [generateFood]);

  const handleNameSubmit = useCallback((name: string) => {
    const newScore = {
      name,
      time: score,
      word: `Snake - ${score} punten`,
      date: new Date().toLocaleDateString(),
      gameId: GAME_IDS.SNAKE
    };
    const updatedScores = saveHighScore(newScore);
    setHighScores(updatedScores);
    setShowNameDialog(false);
    toast({
      title: "Score opgeslagen!",
      description: `Je hebt ${score} punten behaald!`,
    });
  }, [score, toast]);

  // Game loop
  useEffect(() => {
    if (!gameOver && !isPaused && gameStarted) {
      gameLoopRef.current = window.setInterval(moveSnake, speed);
    }
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameOver, isPaused, moveSnake, speed, gameStarted]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      switch (e.key) {
        case 'ArrowUp':
          changeDirection('UP');
          break;
        case 'ArrowDown':
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
          changeDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [changeDirection, gameOver]);

  return {
    snake,
    food,
    direction,
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
  };
}
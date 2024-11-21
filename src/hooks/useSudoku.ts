import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateSudoku, checkSolution } from '@/lib/sudoku';
import { getLocalHighScores, saveHighScore, isNewHighScore, GAME_IDS } from '@/lib/utils';

export function useSudoku() {
  const [grid, setGrid] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [initialGrid, setInitialGrid] = useState<number[][]>([]);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isWinner, setIsWinner] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [highScores, setHighScores] = useState(() => 
    getLocalHighScores(GAME_IDS.SUDOKU)
  );
  const { toast } = useToast();

  const initGame = useCallback((newDifficulty?: 'easy' | 'medium' | 'hard') => {
    const diff = newDifficulty || difficulty;
    const { initial, solution: newSolution } = generateSudoku(diff);
    setGrid(initial.map(row => [...row]));
    setInitialGrid(initial.map(row => [...row]));
    setSolution(newSolution);
    setSelectedCell(null);
    setIsWinner(false);
    setGameStarted(false);
    setTimerRunning(false);
    setCurrentTime(0);
    setShowNameDialog(false);
    if (newDifficulty) setDifficulty(newDifficulty);
  }, [difficulty]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (initialGrid[row][col] !== 0) return;
    
    if (!gameStarted) {
      setGameStarted(true);
      setTimerRunning(true);
    }
    
    setSelectedCell([row, col]);
  }, [initialGrid, gameStarted]);

  const handleNumberInput = useCallback((number: number) => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    if (initialGrid[row][col] !== 0) return;

    const newGrid = grid.map(row => [...row]);
    newGrid[row][col] = number;
    setGrid(newGrid);

    // Check if puzzle is solved
    if (checkSolution(newGrid, solution)) {
      setIsWinner(true);
      setTimerRunning(false);
      toast({
        title: "Gefeliciteerd!",
        description: "Je hebt de Sudoku opgelost!",
      });
    }
  }, [selectedCell, initialGrid, grid, solution, toast]);

  const handleTimerComplete = useCallback((time: number) => {
    if (isWinner) {
      setCurrentTime(time);
      if (isNewHighScore(time, GAME_IDS.SUDOKU)) {
        setShowNameDialog(true);
      }
    }
  }, [isWinner]);

  const handleNameSubmit = useCallback((name: string) => {
    const newScore = {
      name,
      time: currentTime,
      word: `Sudoku - ${difficulty}`,
      date: new Date().toLocaleDateString(),
      gameId: GAME_IDS.SUDOKU
    };
    const updatedScores = saveHighScore(newScore);
    setHighScores(updatedScores);
    setShowNameDialog(false);
    initGame();
  }, [currentTime, difficulty, initGame]);

  return {
    grid,
    selectedCell,
    initialGrid,
    difficulty,
    isWinner,
    timerRunning,
    showNameDialog,
    currentTime,
    highScores,
    handleCellClick,
    handleNumberInput,
    handleTimerComplete,
    handleNameSubmit,
    initGame
  };
}
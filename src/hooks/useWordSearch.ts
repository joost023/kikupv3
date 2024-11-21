import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getLocalHighScores, saveHighScore, isNewHighScore, GAME_IDS } from '@/lib/utils';
import { generateWordSearch } from '@/lib/wordSearch';
import { WORD_SEARCH_WORDS } from '@/data/wordSearchWords';

// Number of words to use in each puzzle
const WORDS_PER_PUZZLE = 8;

// Function to get random words
const getRandomWords = (count: number) => {
  const shuffled = [...WORD_SEARCH_WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export function useWordSearch() {
  const [grid, setGrid] = useState<string[][]>(() => {
    return Array(12).fill(null).map(() => Array(12).fill(''));
  });
  
  const [words, setWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<[number, number] | null>(null);
  const [isWinner, setIsWinner] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [highScores, setHighScores] = useState(() => 
    getLocalHighScores(GAME_IDS.WORD_SEARCH)
  );
  const { toast } = useToast();

  const resetGame = useCallback(() => {
    const newWords = getRandomWords(WORDS_PER_PUZZLE);
    const { grid: newGrid } = generateWordSearch(newWords);
    
    setGrid(newGrid);
    setWords(newWords);
    setFoundWords([]);
    setSelectedCells([]);
    setIsSelecting(false);
    setStartCell(null);
    setIsWinner(false);
    setGameStarted(false);
    setTimerRunning(false);
    setCurrentTime(0);
    setShowNameDialog(false);
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const handleTimerComplete = useCallback((time: number) => {
    if (isWinner) {
      setCurrentTime(time);
      if (isNewHighScore(time, GAME_IDS.WORD_SEARCH)) {
        setShowNameDialog(true);
      }
    }
  }, [isWinner]);

  const checkSelection = useCallback(() => {
    if (selectedCells.length < 3) return;

    const selectedWord = selectedCells
      .map(([row, col]) => grid[row][col])
      .join('');
    
    const reversedWord = selectedWord.split('').reverse().join('');
    
    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords(prev => [...prev, selectedWord]);
      toast({
        title: "Woord gevonden!",
        description: selectedWord,
      });
    } else if (words.includes(reversedWord) && !foundWords.includes(reversedWord)) {
      setFoundWords(prev => [...prev, reversedWord]);
      toast({
        title: "Woord gevonden!",
        description: reversedWord,
      });
    }
  }, [grid, selectedCells, words, foundWords, toast]);

  useEffect(() => {
    if (foundWords.length === words.length && words.length > 0) {
      setIsWinner(true);
      setTimerRunning(false);
      toast({
        title: "Gefeliciteerd!",
        description: "Je hebt alle woorden gevonden!",
      });
    }
  }, [foundWords.length, words.length, toast]);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (!gameStarted) {
      setGameStarted(true);
      setTimerRunning(true);
    }

    setIsSelecting(true);
    setStartCell([row, col]);
    setSelectedCells([[row, col]]);
  }, [gameStarted]);

  const handleMouseEnter = useCallback((row: number, col: number) => {
    if (!isSelecting || !startCell) return;

    const [startRow, startCol] = startCell;
    const newSelectedCells: [number, number][] = [];

    const rowDiff = row - startRow;
    const colDiff = col - startCol;
    
    if (rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff)) {
      const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
      const rowStep = rowDiff === 0 ? 0 : rowDiff / steps;
      const colStep = colDiff === 0 ? 0 : colDiff / steps;

      for (let i = 0; i <= steps; i++) {
        const currentRow = startRow + Math.round(i * rowStep);
        const currentCol = startCol + Math.round(i * colStep);
        newSelectedCells.push([currentRow, currentCol]);
      }
    }

    setSelectedCells(newSelectedCells);
  }, [isSelecting, startCell]);

  const handleMouseUp = useCallback(() => {
    if (isSelecting) {
      checkSelection();
      setIsSelecting(false);
      setStartCell(null);
      setSelectedCells([]);
    }
  }, [isSelecting, checkSelection]);

  const handleNameSubmit = useCallback((name: string) => {
    const newScore = {
      name,
      time: currentTime,
      word: `Woordzoeker - ${words.length} woorden`,
      date: new Date().toLocaleDateString(),
      gameId: GAME_IDS.WORD_SEARCH
    };
    const updatedScores = saveHighScore(newScore);
    setHighScores(updatedScores);
    setShowNameDialog(false);
    toast({
      title: "Score opgeslagen!",
      description: `Je hebt alle woorden gevonden in ${currentTime} seconden!`,
    });
  }, [currentTime, words.length, toast]);

  return {
    grid,
    words,
    foundWords,
    selectedCells,
    isWinner,
    timerRunning,
    showNameDialog,
    currentTime,
    highScores,
    handleCellClick,
    handleMouseEnter,
    handleMouseUp,
    handleTimerComplete,
    handleNameSubmit,
    resetGame
  };
}
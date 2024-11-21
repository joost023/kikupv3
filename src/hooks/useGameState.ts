import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import words from '@/data/words.json';
import { isNewHighScore, GAME_IDS } from '@/lib/utils';

export function useGameState() {
  const [currentWord, setCurrentWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [wordLength, setWordLength] = useState(5);
  const { toast } = useToast();

  const getRandomWord = useCallback((length: number) => {
    const filteredWords = words.filter(word => word.length === length);
    return filteredWords[Math.floor(Math.random() * filteredWords.length)].toLowerCase();
  }, []);

  const resetGame = useCallback((length?: number) => {
    const newLength = length || wordLength;
    const randomWord = getRandomWord(newLength);
    setCurrentWord(randomWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setIsWinner(false);
    setGameStarted(false);
    setTimerRunning(false);
    setCurrentTime(0);
    setShowNameDialog(false);
    if (length) setWordLength(length);
  }, [wordLength, getRandomWord]);

  useEffect(() => {
    const randomWord = getRandomWord(wordLength);
    setCurrentWord(randomWord);
  }, [wordLength, getRandomWord]);

  const handleTimerComplete = useCallback((time: number) => {
    if (isWinner) {
      setCurrentTime(time);
      if (isNewHighScore(time, GAME_IDS.WORD_GAME)) {
        setShowNameDialog(true);
      }
    }
  }, [isWinner]);

  const handleGameWin = useCallback(() => {
    setGameOver(true);
    setIsWinner(true);
    setTimerRunning(false);
    toast({
      title: "Gefeliciteerd!",
      description: "Je hebt het woord geraden!",
    });
  }, [toast]);

  const handleGameOver = useCallback(() => {
    setGameOver(true);
    setTimerRunning(false);
    toast({
      title: "Game Over",
      description: `Het woord was: ${currentWord}`,
      variant: "destructive",
    });
    setTimeout(resetGame, 3000);
  }, [currentWord, resetGame, toast]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameOver) return;
    
    if (!gameStarted) {
      setGameStarted(true);
      setTimerRunning(true);
    }
    
    if (key === 'Enter') {
      if (currentGuess.length !== wordLength) {
        toast({
          title: `Woord moet ${wordLength} letters zijn`,
          variant: "destructive",
        });
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (currentGuess.toLowerCase() === currentWord) {
        handleGameWin();
      } else if (newGuesses.length >= 6) {
        handleGameOver();
      }
    } else if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < wordLength && /^[A-Za-z]$/.test(key)) {
      setCurrentGuess(prev => prev + key.toLowerCase());
    }
  }, [currentGuess, currentWord, gameOver, gameStarted, guesses, handleGameOver, handleGameWin, toast, wordLength]);

  return {
    currentWord,
    guesses,
    currentGuess,
    gameOver,
    isWinner,
    gameStarted,
    timerRunning,
    showNameDialog,
    currentTime,
    wordLength,
    handleTimerComplete,
    setShowNameDialog,
    resetGame,
    handleKeyPress
  };
}